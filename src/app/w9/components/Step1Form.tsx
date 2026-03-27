'use client';

import { useRef } from 'react';
import { W9FormData } from '../types';

interface Props {
  formData: W9FormData;
  onChange: (data: W9FormData) => void;
  onNext: () => void;
}

const TAX_CLASSIFICATIONS = [
  { value: 'individual', label: 'Individual / Sole proprietor' },
  { value: 'c_corp', label: 'C Corporation' },
  { value: 's_corp', label: 'S Corporation' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'trust', label: 'Trust / Estate' },
  { value: 'llc', label: 'LLC' },
  { value: 'other', label: 'Other' },
];

const inputClass =
  'w-full border border-gray-300 rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:border-transparent';
const focusStyle = { '--tw-ring-color': '#842c30' } as React.CSSProperties;
const labelClass = 'block text-sm font-medium text-gray-700 mb-1';

export default function Step1Form({ formData, onChange, onNext }: Props) {
  const ssn1Ref = useRef<HTMLInputElement>(null);
  const ssn2Ref = useRef<HTMLInputElement>(null);
  const ssn3Ref = useRef<HTMLInputElement>(null);
  const ein1Ref = useRef<HTMLInputElement>(null);
  const ein2Ref = useRef<HTMLInputElement>(null);

  const set = (field: keyof W9FormData, value: string) =>
    onChange({ ...formData, [field]: value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const isValid =
    formData.name.trim() !== '' &&
    formData.address.trim() !== '' &&
    formData.cityStateZip.trim() !== '' &&
    (formData.tinType === 'ssn'
      ? formData.ssn1.trim() !== '' && formData.ssn2.trim() !== '' && formData.ssn3.trim() !== ''
      : formData.ein.trim() !== '');

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Personal / Entity Information</h2>

      {/* Line 1 */}
      <div>
        <label className={labelClass}>
          Name <span className="text-red-500">*</span>
          <span className="ml-1 font-normal text-gray-400 text-xs">(as shown on your tax return)</span>
        </label>
        <input
          className={inputClass}
          style={focusStyle}
          value={formData.name}
          onChange={(e) => set('name', e.target.value)}
          placeholder="Full legal name"
          required
        />
      </div>

      {/* Line 2 */}
      <div>
        <label className={labelClass}>Business / DBA name</label>
        <input
          className={inputClass}
          style={focusStyle}
          value={formData.businessName}
          onChange={(e) => set('businessName', e.target.value)}
          placeholder="If different from above"
        />
      </div>

      {/* Line 3a – Tax classification */}
      <div>
        <label className={labelClass}>
          Federal tax classification <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {TAX_CLASSIFICATIONS.map((tc) => (
            <label
              key={tc.value}
              className="flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer text-sm"
              style={{
                borderColor: formData.taxClassification === tc.value ? '#842c30' : '#d1d5db',
                backgroundColor: formData.taxClassification === tc.value ? '#fef2f2' : 'white',
              }}
            >
              <input
                type="radio"
                name="taxClassification"
                value={tc.value}
                checked={formData.taxClassification === tc.value}
                onChange={() => set('taxClassification', tc.value)}
                className="hidden"
              />
              <span
                className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                style={{
                  borderColor: formData.taxClassification === tc.value ? '#842c30' : '#9ca3af',
                }}
              >
                {formData.taxClassification === tc.value && (
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: '#842c30' }}
                  />
                )}
              </span>
              {tc.label}
            </label>
          ))}
        </div>
      </div>

      {/* LLC code */}
      {formData.taxClassification === 'llc' && (
        <div>
          <label className={labelClass}>
            LLC tax classification code <span className="text-red-500">*</span>
          </label>
          <select
            className={inputClass}
            value={formData.llcCode}
            onChange={(e) => set('llcCode', e.target.value)}
            required
          >
            <option value="">Select code</option>
            <option value="C">C – C Corporation</option>
            <option value="S">S – S Corporation</option>
            <option value="P">P – Partnership</option>
          </select>
        </div>
      )}

      {/* Line 4 – Exemptions */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Exempt payee code</label>
          <input
            className={inputClass}
            style={focusStyle}
            value={formData.exemptPayeeCode}
            onChange={(e) => set('exemptPayeeCode', e.target.value)}
            placeholder="Optional"
            maxLength={2}
          />
        </div>
        <div>
          <label className={labelClass}>FATCA exemption code</label>
          <input
            className={inputClass}
            style={focusStyle}
            value={formData.fatcaCode}
            onChange={(e) => set('fatcaCode', e.target.value)}
            placeholder="Optional"
            maxLength={1}
          />
        </div>
      </div>

      {/* Line 5 – Address */}
      <div>
        <label className={labelClass}>
          Address <span className="text-red-500">*</span>
        </label>
        <input
          className={inputClass}
          style={focusStyle}
          value={formData.address}
          onChange={(e) => set('address', e.target.value)}
          placeholder="Number, street, apt. or suite no."
          required
        />
      </div>

      {/* Line 6 – City, State, ZIP */}
      <div>
        <label className={labelClass}>
          City, State, and ZIP code <span className="text-red-500">*</span>
        </label>
        <input
          className={inputClass}
          style={focusStyle}
          value={formData.cityStateZip}
          onChange={(e) => set('cityStateZip', e.target.value)}
          placeholder="Miami, FL 33101"
          required
        />
      </div>

      {/* Line 7 – Account numbers */}
      <div>
        <label className={labelClass}>Account number(s)</label>
        <input
          className={inputClass}
          style={focusStyle}
          value={formData.accountNumbers}
          onChange={(e) => set('accountNumbers', e.target.value)}
          placeholder="Optional"
        />
      </div>

      {/* Part I – TIN */}
      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Part I – Taxpayer Identification Number (TIN)
        </h3>
        <div className="flex gap-4 mb-3">
          {(['ssn', 'ein'] as const).map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="radio"
                name="tinType"
                value={type}
                checked={formData.tinType === type}
                onChange={() => set('tinType', type)}
              />
              <span>{type.toUpperCase()}</span>
            </label>
          ))}
        </div>

        {formData.tinType === 'ssn' ? (
          <div>
            <label className={labelClass}>
              Social Security Number <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                ref={ssn1Ref}
                className="border border-gray-300 rounded-lg px-3 py-2 text-base w-20 text-center focus:outline-none focus:ring-2"
                style={focusStyle}
                inputMode="numeric"
                pattern="\d*"
                value={formData.ssn1}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 3);
                  set('ssn1', val);
                  if (val.length === 3) ssn2Ref.current?.focus();
                }}
                placeholder="XXX"
                maxLength={3}
                required
              />
              <span className="text-gray-400">–</span>
              <input
                ref={ssn2Ref}
                className="border border-gray-300 rounded-lg px-3 py-2 text-base w-16 text-center focus:outline-none focus:ring-2"
                style={focusStyle}
                inputMode="numeric"
                pattern="\d*"
                value={formData.ssn2}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 2);
                  set('ssn2', val);
                  if (val.length === 2) ssn3Ref.current?.focus();
                }}
                placeholder="XX"
                maxLength={2}
                required
              />
              <span className="text-gray-400">–</span>
              <input
                ref={ssn3Ref}
                className="border border-gray-300 rounded-lg px-3 py-2 text-base w-24 text-center focus:outline-none focus:ring-2"
                style={focusStyle}
                inputMode="numeric"
                pattern="\d*"
                value={formData.ssn3}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                  set('ssn3', val);
                }}
                placeholder="XXXX"
                maxLength={4}
                required
              />
            </div>
          </div>
        ) : (
          <div>
            <label className={labelClass}>
              Employer Identification Number <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                ref={ein1Ref}
                className="border border-gray-300 rounded-lg px-3 py-2 text-base w-20 text-center focus:outline-none focus:ring-2"
                style={focusStyle}
                inputMode="numeric"
                pattern="\d*"
                value={formData.ein.split('-')[0] || ''}
                onChange={(e) => {
                  const part1 = e.target.value.replace(/\D/g, '').slice(0, 2);
                  const part2 = formData.ein.split('-')[1] || '';
                  set('ein', part2 ? `${part1}-${part2}` : part1);
                  if (part1.length === 2) ein2Ref.current?.focus();
                }}
                placeholder="XX"
                maxLength={2}
                required
              />
              <span className="text-gray-400">–</span>
              <input
                ref={ein2Ref}
                className="border border-gray-300 rounded-lg px-3 py-2 text-base w-32 text-center focus:outline-none focus:ring-2"
                style={focusStyle}
                inputMode="numeric"
                pattern="\d*"
                value={formData.ein.split('-')[1] || ''}
                onChange={(e) => {
                  const part1 = formData.ein.split('-')[0] || '';
                  const part2 = e.target.value.replace(/\D/g, '').slice(0, 7);
                  set('ein', `${part1}-${part2}`);
                }}
                placeholder="XXXXXXX"
                maxLength={7}
                required
              />
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className="w-full py-3 rounded-lg text-white font-semibold text-sm transition-opacity disabled:opacity-40"
        style={{ backgroundColor: '#842c30' }}
      >
        Continue to Signature →
      </button>
    </form>
  );
}
