import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pdfPath = path.join(__dirname, '../public/forms/fw9.pdf');
const pdfBytes = fs.readFileSync(pdfPath);
const pdfDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });

const form = pdfDoc.getForm();
const fields = form.getFields();

console.log(`\nTotal fields: ${fields.length}\n`);
fields.forEach((field, i) => {
  const name = field.getName();
  const type = field.constructor.name;
  const widgets = field.acroField.getWidgets();
  widgets.forEach((widget, wi) => {
    const rect = widget.getRectangle();
    console.log(`[${i}] ${type.padEnd(20)} | name: "${name}" | rect: x=${Math.round(rect.x)}, y=${Math.round(rect.y)}, w=${Math.round(rect.width)}, h=${Math.round(rect.height)}`);
  });
});

const pages = pdfDoc.getPages();
console.log(`\nPage 0 size: ${pages[0].getWidth()} x ${pages[0].getHeight()} pts`);
