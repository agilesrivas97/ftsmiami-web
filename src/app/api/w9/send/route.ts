import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { W9FormData } from '../../../w9/types';

// Actual AcroForm field names from the IRS W-9 PDF (inspected via pdf-lib)
const F = {
  name:         'topmostSubform[0].Page1[0].f1_01[0]',
  businessName: 'topmostSubform[0].Page1[0].f1_02[0]',
  // Tax classification checkboxes (c1_1[0]–[6])
  cb_individual:  'topmostSubform[0].Page1[0].Boxes3a-b_ReadOrder[0].c1_1[0]',
  cb_c_corp:      'topmostSubform[0].Page1[0].Boxes3a-b_ReadOrder[0].c1_1[1]',
  cb_s_corp:      'topmostSubform[0].Page1[0].Boxes3a-b_ReadOrder[0].c1_1[2]',
  cb_partnership: 'topmostSubform[0].Page1[0].Boxes3a-b_ReadOrder[0].c1_1[3]',
  cb_trust:       'topmostSubform[0].Page1[0].Boxes3a-b_ReadOrder[0].c1_1[4]',
  cb_llc:         'topmostSubform[0].Page1[0].Boxes3a-b_ReadOrder[0].c1_1[5]',
  cb_other:       'topmostSubform[0].Page1[0].Boxes3a-b_ReadOrder[0].c1_1[6]',
  llcCode:        'topmostSubform[0].Page1[0].Boxes3a-b_ReadOrder[0].f1_03[0]',
  otherDesc:      'topmostSubform[0].Page1[0].Boxes3a-b_ReadOrder[0].f1_04[0]',
  exemptPayee:    'topmostSubform[0].Page1[0].f1_05[0]',
  fatca:          'topmostSubform[0].Page1[0].f1_06[0]',
  address:        'topmostSubform[0].Page1[0].Address_ReadOrder[0].f1_07[0]',
  cityStateZip:   'topmostSubform[0].Page1[0].Address_ReadOrder[0].f1_08[0]',
  accountNumbers: 'topmostSubform[0].Page1[0].f1_10[0]',
  ssn1:           'topmostSubform[0].Page1[0].f1_11[0]',
  ssn2:           'topmostSubform[0].Page1[0].f1_12[0]',
  ssn3:           'topmostSubform[0].Page1[0].f1_13[0]',
  ein1:           'topmostSubform[0].Page1[0].f1_14[0]',
  ein2:           'topmostSubform[0].Page1[0].f1_15[0]',
  dateMonth:      'topmostSubform[0].Page1[0].f1_16[0]',
  dateDay:        'topmostSubform[0].Page1[0].f1_17[0]',
  dateYear:       'topmostSubform[0].Page1[0].f1_18[0]',
} as const;

const TAX_CLASS_CB: Record<string, keyof typeof F> = {
  individual:  'cb_individual',
  c_corp:      'cb_c_corp',
  s_corp:      'cb_s_corp',
  partnership: 'cb_partnership',
  trust:       'cb_trust',
  llc:         'cb_llc',
  other:       'cb_other',
};

async function generateFilledPdf(
  formData: W9FormData,
  signatureDataUrl: string,
  date: string
): Promise<Uint8Array> {
  const pdfPath = path.join(process.cwd(), 'public', 'forms', 'fw9.pdf');
  const existingPdfBytes = fs.readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(existingPdfBytes, { ignoreEncryption: true });
  const form = pdfDoc.getForm();

  const setText = (fieldName: string, value: string) => {
    if (!value) return;
    try { form.getTextField(fieldName).setText(value); } catch { /* field not found */ }
  };

  const checkBox = (fieldName: string) => {
    try { form.getCheckBox(fieldName).check(); } catch { /* field not found */ }
  };

  // Lines 1 & 2
  setText(F.name, formData.name);
  setText(F.businessName, formData.businessName);

  // Tax classification
  const cbKey = TAX_CLASS_CB[formData.taxClassification];
  if (cbKey) checkBox(F[cbKey]);
  if (formData.taxClassification === 'llc') setText(F.llcCode, formData.llcCode);

  // Exemptions
  setText(F.exemptPayee, formData.exemptPayeeCode);
  setText(F.fatca, formData.fatcaCode);

  // Address
  setText(F.address, formData.address);
  setText(F.cityStateZip, formData.cityStateZip);
  setText(F.accountNumbers, formData.accountNumbers);

  // TIN
  if (formData.tinType === 'ssn') {
    setText(F.ssn1, formData.ssn1);
    setText(F.ssn2, formData.ssn2);
    setText(F.ssn3, formData.ssn3);
  } else {
    const [ein1, ein2] = formData.ein.split('-');
    setText(F.ein1, ein1 || '');
    setText(F.ein2, ein2 || '');
  }

  // Date (MM/DD/YYYY)
  const [mm, dd, yyyy] = date.split('/');
  setText(F.dateMonth, mm);
  setText(F.dateDay, dd);
  setText(F.dateYear, yyyy);

  // Signature image on page index 1 (the form page), before flatten
  if (signatureDataUrl?.startsWith('data:image/png;base64,')) {
    const signatureBytes = Buffer.from(
      signatureDataUrl.replace('data:image/png;base64,', ''),
      'base64'
    );
    const signatureImage = await pdfDoc.embedPng(signatureBytes);
    const formPage = pdfDoc.getPages()[1];
    if (formPage) {
      formPage.drawImage(signatureImage, {
        x: 130,
        y: 85,
        width: 280,
        height: 22,
        opacity: 0.85,
      });
    }
  }

  // Flatten so fields are baked into the PDF
  form.flatten();

  // Remove cover page last, after all operations
  pdfDoc.removePage(0);

  return pdfDoc.save();
}

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const raw = await req.text();
    let body: Record<string, unknown>;
    try {
      body = JSON.parse(raw);
    } catch {
      return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 });
    }
    const { formData, signatureDataUrl, recipientEmail } = body as {
      formData: W9FormData;
      signatureDataUrl: string;
      recipientEmail?: string;
    };


    const date = new Date().toLocaleDateString('en-US');
    const pdfBytes = await generateFilledPdf(formData, signatureDataUrl, date);

    const smtpConfig = {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    };

    console.log('[W9 smtp] config:', { host: smtpConfig.host, port: smtpConfig.port, secure: smtpConfig.secure, user: smtpConfig.auth.user });

    const transporter = nodemailer.createTransport(smtpConfig);

    const attachment = {
      filename: `W9_${formData.name.replace(/\s+/g, '_')}_${date.replace(/\//g, '-')}.pdf`,
      content: Buffer.from(pdfBytes),
      contentType: 'application/pdf',
    };

    // Main email to destination
    const mainInfo = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.W9_DESTINATION_EMAIL!,
      subject: `W-9 Form – ${formData.name}`,
      html: `
        <p>A new W-9 form has been submitted.</p>
        <ul>
          <li><strong>Name:</strong> ${formData.name}</li>
          <li><strong>Business:</strong> ${formData.businessName || 'N/A'}</li>
          <li><strong>Address:</strong> ${formData.address}, ${formData.cityStateZip}</li>
          <li><strong>TIN type:</strong> ${formData.tinType.toUpperCase()}</li>
          <li><strong>Date:</strong> ${date}</li>
        </ul>
        <p>The completed and signed W-9 is attached.</p>
      `,
      attachments: [attachment],
    });
    console.log('[W9 main] messageId:', mainInfo.messageId, '| response:', mainInfo.response, '| accepted:', mainInfo.accepted, '| rejected:', mainInfo.rejected);

    // Separate copy to the signer — isolated so it never fails the main request
    let copyError: string | null = null;
    if (recipientEmail) {
      try {
        console.log('[W9 copy] attempting to send to:', recipientEmail);
        const copyInfo = await transporter.sendMail({
          from: process.env.SMTP_FROM,
          to: recipientEmail,
          subject: `Your W-9 Form – ${formData.name}`,
          html: `
            <p>Hi ${formData.name},</p>
            <p>Here is a copy of your completed and signed W-9 form submitted on ${date}.</p>
            <p>Please keep this for your records.</p>
          `,
          attachments: [attachment],
        });
        console.log('[W9 copy] messageId:', copyInfo.messageId, '| response:', copyInfo.response, '| accepted:', copyInfo.accepted, '| rejected:', copyInfo.rejected, '| pending:', copyInfo.pending);
      } catch (copyErr) {
        copyError = (copyErr as Error).message;
        console.error('[W9 copy] FAILED | error:', copyError);
      }
    }

    return NextResponse.json({ success: true, copyError });
  } catch (error) {
    console.error('W-9 send error:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

// Separate endpoint to just generate the PDF (for download)
export async function PUT(req: NextRequest) {
  try {
    const raw = await req.text();
    const body = JSON.parse(raw);
    const { formData, signatureDataUrl } = body as {
      formData: W9FormData;
      signatureDataUrl: string;
    };

    const date = new Date().toLocaleDateString('en-US');
    const pdfBytes = await generateFilledPdf(formData, signatureDataUrl, date);

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="W9_${formData.name.replace(/\s+/g, '_')}.pdf"`,
      },
    });
  } catch (error) {
    console.error('W-9 generate error:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

