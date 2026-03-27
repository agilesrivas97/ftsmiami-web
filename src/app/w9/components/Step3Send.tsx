'use client';

import { useState } from 'react';
import { W9FormData } from '../types';

interface Props {
  formData: W9FormData;
  signatureDataUrl: string;
  onBack: () => void;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Step3Send({ formData, signatureDataUrl, onBack }: Props) {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [downloading, setDownloading] = useState(false);

  const handleSend = async () => {
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/w9/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData, signatureDataUrl, recipientEmail: recipientEmail || undefined }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMsg(json.error || 'Unknown error occurred.');
      }
    } catch (e) {
      setStatus('error');
      setErrorMsg((e as Error).message);
    }
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const res = await fetch('/api/w9/send', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData, signatureDataUrl }),
      });
      if (!res.ok) throw new Error('Could not generate PDF');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `W9_${formData.name.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      alert('Could not generate PDF: ' + (e as Error).message);
    } finally {
      setDownloading(false);
    }
  };

  const tinDisplay =
    formData.tinType === 'ssn'
      ? `SSN: ${formData.ssn1}-${formData.ssn2}-${formData.ssn3}`
      : `EIN: ${formData.ein}`;

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl"
          style={{ backgroundColor: '#16a34a' }}
        >
          ✓
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">W-9 Submitted Successfully</h2>
        <p className="text-sm text-gray-500 mb-6">
          Your signed W-9 has been sent successfully.
        </p>
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="w-full py-3 rounded-lg border-2 text-sm font-semibold transition-colors disabled:opacity-40"
          style={{ borderColor: '#842c30', color: '#842c30' }}
        >
          {downloading ? 'Generating PDF…' : '⬇ Download a copy of your W-9'}
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Review & Send</h2>

      {/* Summary */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-5 space-y-1.5 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Name</span>
          <span className="font-medium text-gray-800">{formData.name}</span>
        </div>
        {formData.businessName && (
          <div className="flex justify-between">
            <span className="text-gray-500">Business</span>
            <span className="font-medium text-gray-800">{formData.businessName}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-gray-500">Address</span>
          <span className="font-medium text-gray-800 text-right max-w-[60%]">
            {formData.address}, {formData.cityStateZip}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">TIN</span>
          <span className="font-medium text-gray-800">{tinDisplay}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Date</span>
          <span className="font-medium text-gray-800">{new Date().toLocaleDateString('en-US')}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Signature</span>
          {signatureDataUrl ? (
            <img src={signatureDataUrl} alt="Signature" className="h-8 object-contain" />
          ) : (
            <span className="text-red-500 text-xs">Missing</span>
          )}
        </div>
      </div>

      {/* Optional recipient email */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Your email address <span className="text-gray-400 font-normal">(optional – to receive a copy)</span>
        </label>
        <input
          type="email"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </div>

      {/* Error state */}
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-5">
          <p className="text-sm font-semibold text-red-700 mb-1">Failed to send the form</p>
          <p className="text-xs text-red-600 mb-3">{errorMsg}</p>
          <p className="text-xs text-gray-600 mb-3">
            You can download the completed PDF and send it manually to:
          </p>
          <p
            className="text-sm font-bold mb-3"
            style={{ color: '#842c30' }}
          >
            {process.env.NEXT_PUBLIC_W9_DESTINATION_EMAIL || 'admin@ftsmiami.com'}
          </p>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="w-full py-2 rounded-lg border-2 text-sm font-semibold transition-colors disabled:opacity-40"
            style={{ borderColor: '#842c30', color: '#842c30' }}
          >
            {downloading ? 'Generating PDF...' : '⬇ Download W-9 PDF'}
          </button>
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={status === 'loading'}
          className="flex-1 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors disabled:opacity-40"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={handleSend}
          disabled={status === 'loading'}
          className="flex-1 py-3 rounded-lg text-white font-semibold text-sm transition-opacity disabled:opacity-40 flex items-center justify-center gap-2"
          style={{ backgroundColor: '#842c30' }}
        >
          {status === 'loading' ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Sending…
            </>
          ) : (
            'Send W-9 ✉'
          )}
        </button>
      </div>
    </div>
  );
}
