'use client';

import React, { useState } from 'react';
import { Building2, Save, Upload, Trash2, CheckCircle2, ShieldCheck, Globe } from 'lucide-react';

export default function BusinessSettingsPage() {
  const [saving, setSaving] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  const [businessName, setBusinessName] = useState('Khaki Karobar');
  const [businessType, setBusinessType] = useState('PRIVATE_LIMITED');
  const [email, setEmail] = useState('contact@khaki.in');
  const [phone, setPhone] = useState('9876543210');
  const [website, setWebsite] = useState('https://khakikarobar.com');
  const [address, setAddress] = useState('Survey No. 45/2, Baner Business Hub');
  const [city, setCity] = useState('Pune');
  const [state, setState] = useState('Maharashtra');
  const [pincode, setPincode] = useState('411045');
  const [country, setCountry] = useState('India');

  const [gstin, setGstin] = useState('27AABCK1234D1ZX');
  const [pan, setPan] = useState('AABCK1234D');
  const [regType, setRegType] = useState('REGULAR');
  const [stateCode, setStateCode] = useState('27 (Maharashtra)');

  const [logoPreview, setLogoPreview] = useState<string | null>('/branding/logo.png');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessToast(false);
    setTimeout(() => {
      setSaving(false);
      setSuccessToast(true);
      setTimeout(() => setSuccessToast(false), 4000);
    }, 700);
  };

  return (
    <div className="space-y-6">
      {successToast && (
        <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>Business profile & tax configuration updated successfully.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Business Logo Section */}
        <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-red-600" />
              <span>Business Brand & Logo</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              This logo appears on tax invoices, WhatsApp dispatches, and thermal receipts.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-dashed border-slate-300 dark:border-slate-700">
            <div className="w-24 h-24 rounded-2xl bg-white dark:bg-[#121927] border border-slate-200 dark:border-slate-700 p-2 flex items-center justify-center shadow-md shrink-0">
              <div className="w-full h-full rounded-xl bg-red-600 flex items-center justify-center font-black text-white text-3xl shadow-inner">
                K
              </div>
            </div>

            <div className="space-y-2 text-center sm:text-left">
              <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                <button
                  type="button"
                  onClick={() => alert('Logo upload dialog')}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md shadow-red-600/20 flex items-center gap-1.5 transition-all"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload New Logo</span>
                </button>
                <button
                  type="button"
                  onClick={() => alert('Removed custom logo')}
                  className="px-3.5 py-2 border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-400">
                Recommended: High-resolution PNG or SVG with transparent background (min. 500x500px).
              </p>
            </div>
          </div>
        </div>

        {/* Business Information Card */}
        <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Business Information</h2>
            <p className="text-xs text-slate-500">Legal entity registration name and operating office address.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Business Display Name *</label>
              <input
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600 font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Entity Type</label>
              <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600"
              >
                <option value="PRIVATE_LIMITED">Private Limited Company</option>
                <option value="SOLE_PROPRIETORSHIP">Sole Proprietorship</option>
                <option value="PARTNERSHIP">Partnership Firm</option>
                <option value="LLP">Limited Liability Partnership (LLP)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Business Email *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Business Phone *</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600 font-mono"
              />
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Official Website URL</label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600"
              />
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Street Address *</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">City *</label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">State *</label>
              <input
                type="text"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Pincode *</label>
              <input
                type="text"
                required
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Country</label>
              <input
                type="text"
                disabled
                value={country}
                className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-[#080B12] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-500"
              />
            </div>
          </div>
        </div>

        {/* Tax Registration Details */}
        <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-red-600" />
              <span>Tax & GST Information</span>
            </h2>
            <p className="text-xs text-slate-500">Government statutory tax registration for GSTR filings.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">GSTIN Number *</label>
              <input
                type="text"
                required
                value={gstin}
                onChange={(e) => setGstin(e.target.value.toUpperCase())}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600 font-mono uppercase"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Permanent Account Number (PAN) *</label>
              <input
                type="text"
                required
                value={pan}
                onChange={(e) => setPan(e.target.value.toUpperCase())}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600 font-mono uppercase"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">GST Registration Type</label>
              <select
                value={regType}
                onChange={(e) => setRegType(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600"
              >
                <option value="REGULAR">Regular Taxpayer</option>
                <option value="COMPOSITION">Composition Scheme</option>
                <option value="SEZ">Special Economic Zone (SEZ)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">State Code</label>
              <input
                type="text"
                disabled
                value={stateCode}
                className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-[#080B12] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-500 font-mono"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:opacity-60 text-white rounded-xl text-xs font-bold shadow-lg shadow-red-600/30 flex items-center gap-2 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving Changes...' : 'Save Business Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
