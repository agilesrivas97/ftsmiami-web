'use client';

import { useState } from 'react';
import Step1Form from './components/Step1Form';
import Step2Signature from './components/Step2Signature';
import Step3Send from './components/Step3Send';
import { W9FormData } from './types';

const STEPS = ['Your Information', 'Signature', 'Review & Send'];

export default function W9Page() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<W9FormData>({
    name: '',
    businessName: '',
    taxClassification: 'individual',
    llcCode: '',
    exemptPayeeCode: '',
    fatcaCode: '',
    address: '',
    cityStateZip: '',
    accountNumbers: '',
    tinType: 'ssn',
    ssn1: '',
    ssn2: '',
    ssn3: '',
    ein: '',
  });
  const [signatureDataUrl, setSignatureDataUrl] = useState('');

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Form W-9</h1>
        <p className="text-sm text-gray-500">
          Request for Taxpayer Identification Number and Certification
        </p>
      </div>

      {/* Stepper */}
      <div className="flex items-center mb-8">
        {STEPS.map((label, i) => (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
                style={{
                  backgroundColor: i <= step ? '#842c30' : '#e5e7eb',
                  color: i <= step ? 'white' : '#6b7280',
                }}
              >
                {i < step ? '✓' : i + 1}
              </div>
              <span className="text-xs mt-1 text-gray-500 hidden sm:block">{label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className="h-0.5 flex-1 mx-2"
                style={{ backgroundColor: i < step ? '#842c30' : '#e5e7eb' }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {step === 0 && (
          <Step1Form
            formData={formData}
            onChange={setFormData}
            onNext={() => setStep(1)}
          />
        )}
        {step === 1 && (
          <Step2Signature
            signatureDataUrl={signatureDataUrl}
            onSignatureChange={setSignatureDataUrl}
            onBack={() => setStep(0)}
            onNext={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <Step3Send
            formData={formData}
            signatureDataUrl={signatureDataUrl}
            onBack={() => setStep(1)}
          />
        )}
      </div>

      <p className="text-xs text-center text-gray-400 mt-6">
        This form is for informational purposes. Do not file draft forms with the IRS.
      </p>
    </div>
  );
}
