'use client';

import { useRef, useEffect, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

interface Props {
  signatureDataUrl: string;
  onSignatureChange: (dataUrl: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function Step2Signature({
  signatureDataUrl,
  onSignatureChange,
  onBack,
  onNext,
}: Props) {
  const sigRef = useRef<SignatureCanvas>(null);
  const [isEmpty, setIsEmpty] = useState(true);

  // Restore previous signature if navigating back
  useEffect(() => {
    if (signatureDataUrl && sigRef.current) {
      sigRef.current.fromDataURL(signatureDataUrl);
      setIsEmpty(false);
    }
  }, []);

  const handleClear = () => {
    sigRef.current?.clear();
    onSignatureChange('');
    setIsEmpty(true);
  };

  // Compress signature to a small PNG (max 400x120) to keep request size small
  const compressSignature = (): string => {
    const raw = sigRef.current!.getCanvas();
    const out = document.createElement('canvas');
    out.width = 400;
    out.height = 120;
    out.getContext('2d')!.drawImage(raw, 0, 0, 400, 120);
    return out.toDataURL('image/png');
  };

  const handleEnd = () => {
    if (!sigRef.current?.isEmpty()) {
      onSignatureChange(compressSignature());
      setIsEmpty(false);
    }
  };

  const handleNext = () => {
    if (sigRef.current && !sigRef.current.isEmpty()) {
      onSignatureChange(compressSignature());
      onNext();
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Signature</h2>
      <p className="text-sm text-gray-500 mb-6">
        By signing below, you certify that the information provided is correct under penalties of
        perjury (Part II certification of Form W-9).
      </p>

      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Draw your signature <span className="text-red-500">*</span>
        </label>

        <div
          className="border-2 rounded-xl overflow-hidden touch-none"
          style={{ borderColor: '#842c30', backgroundColor: '#fafafa' }}
        >
          <SignatureCanvas
            ref={sigRef}
            penColor="#1a1a1a"
            canvasProps={{
              className: 'w-full',
              style: { height: '180px', display: 'block' },
            }}
            onEnd={handleEnd}
          />
        </div>

        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-gray-400">
            ☝️ Use your finger or stylus to sign above
          </p>
          <button
            type="button"
            onClick={handleClear}
            className="text-xs text-gray-500 underline hover:text-gray-700"
          >
            Clear
          </button>
        </div>
      </div>

      {isEmpty && (
        <p className="text-xs text-amber-600 mb-4">Please draw your signature to continue.</p>
      )}

      <div className="mt-6">
        <p className="text-xs text-gray-400 mb-6 leading-relaxed">
          Under penalties of perjury, I certify that: (1) the TIN shown is my correct taxpayer
          identification number, (2) I am not subject to backup withholding, (3) I am a U.S.
          citizen or other U.S. person, and (4) the FATCA code(s) entered are correct.
        </p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors"
          >
            ← Back
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={isEmpty}
            className="flex-1 py-3 rounded-lg text-white font-semibold text-sm transition-opacity disabled:opacity-40"
            style={{ backgroundColor: '#842c30' }}
          >
            Review & Send →
          </button>
        </div>
      </div>
    </div>
  );
}
