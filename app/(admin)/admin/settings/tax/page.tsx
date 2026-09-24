'use client';

import React, { useState } from 'react';
import {
  Percent,
  Save,
  CheckCircle2,
  FileCheck2,
  AlertTriangle,
  HelpCircle,
  Calculator,
  ShieldCheck,
} from 'lucide-react';

export default function TaxSettingsPage() {
  const [saving, setSaving] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  // GST Master Switches
  const [gstEnabled, setGstEnabled] = useState(true);
  const [gstin, setGstin] = useState('27AABCK1234D1ZX');
  const [registrationType, setRegistrationType] = useState('REGULAR');
  const [defaultTaxRate, setDefaultTaxRate] = useState('18');
  const [pricingModel, setPricingModel] = useState<'EXCLUSIVE' | 'INCLUSIVE'>('EXCLUSIVE');

  // Advanced Compliance Rules
  const [requireHsn, setRequireHsn] = useState(true);
  const [enableRcm, setEnableRcm] = useState(false);
  const [enableEWayBill, setEnableEWayBill] = useState(true);
  const [ewaybillThreshold, setEwaybillThreshold] = useState('50000');
  const [enableEInvoice, setEnableEInvoice] = useState(false);

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
          <span>GST tax configuration and calculation preferences updated successfully.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Master GST Activation Card */}
        <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Percent className="w-5 h-5 text-red-600" />
                <span>Goods & Services Tax (GST) Configuration</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Configure your Indian tax regime, GSTIN identifiers, and automated tax calculations.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                GST Active
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={gstEnabled}
                  onChange={(e) => setGstEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>
          </div>

          {gstEnabled ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    GSTIN (Goods and Services Tax Identification Number)
                  </label>
                  <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Valid format
                  </span>
                </div>
                <input
                  type="text"
                  maxLength={15}
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value.toUpperCase())}
                  placeholder="27AABCK1234D1ZX"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50/50 dark:bg-[#0B0F19] text-xs font-mono font-bold tracking-wider text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 uppercase"
                />
                <p className="text-[10px] text-slate-400">State code: 27 (Maharashtra) • PAN: AABCK1234D</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Tax Registration Type
                </label>
                <select
                  value={registrationType}
                  onChange={(e) => setRegistrationType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50/50 dark:bg-[#0B0F19] text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                >
                  <option value="REGULAR">Regular Taxpayer (Monthly / Quarterly GSTR-1, GSTR-3B)</option>
                  <option value="COMPOSITION">Composition Scheme (Quarterly CMP-08)</option>
                  <option value="SEZ_DEVELOPER">Special Economic Zone (SEZ Developer)</option>
                  <option value="OVERSEAS">Overseas / Export Unit (Zero Rated)</option>
                </select>
                <p className="text-[10px] text-slate-400">Determines invoice tax categorization and input credit eligibility</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Default GST Slab Rate for Products
                </label>
                <select
                  value={defaultTaxRate}
                  onChange={(e) => setDefaultTaxRate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50/50 dark:bg-[#0B0F19] text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                >
                  <option value="0">0% (Nil / Exempted Items)</option>
                  <option value="5">5% (CGST 2.5% + SGST 2.5% / IGST 5%)</option>
                  <option value="12">12% (CGST 6% + SGST 6% / IGST 12%)</option>
                  <option value="18">18% (Standard Rate: CGST 9% + SGST 9% / IGST 18%)</option>
                  <option value="28">28% (Luxury / High Tax Goods)</option>
                </select>
                <p className="text-[10px] text-slate-400">Can be overridden per specific product/SKU catalog item</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Inter-State Calculation Rule
                </label>
                <div className="p-2.5 rounded-xl bg-slate-50/80 dark:bg-[#0B0F19]/60 border border-slate-200/60 dark:border-[#222E42] text-xs text-slate-600 dark:text-slate-400">
                  <p className="font-semibold text-slate-800 dark:text-slate-200">Automated Place of Supply Split:</p>
                  <p className="text-[11px] mt-0.5">
                    Same State (MH → MH): <span className="font-mono text-red-600 font-bold">CGST + SGST</span> (50/50 split)<br />
                    Out of State (MH → Other): <span className="font-mono text-red-600 font-bold">IGST</span> (Integrated GST)
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-amber-800 dark:text-amber-300 flex items-start gap-3 text-xs">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">GST Invoicing is currently turned OFF</p>
                <p className="mt-0.5 text-[11px] text-amber-700 dark:text-amber-400">
                  Invoices will be printed as non-tax estimation bills without CGST/SGST breakdowns or HSN codes.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Pricing Strategy: Tax Inclusive vs Exclusive */}
        <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calculator className="w-4 h-4 text-red-600" />
              <span>Catalog Pricing Model</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Select how product sale prices are displayed and entered across sales screens.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div
              onClick={() => setPricingModel('EXCLUSIVE')}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                pricingModel === 'EXCLUSIVE'
                  ? 'border-red-600 bg-red-50/30 dark:bg-red-950/20 shadow-sm'
                  : 'border-slate-200 dark:border-[#222E42] hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Tax-Exclusive Pricing (Recommended for B2B)
                </span>
                <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  pricingModel === 'EXCLUSIVE' ? 'border-red-600 bg-red-600' : 'border-slate-300'
                }`}>
                  {pricingModel === 'EXCLUSIVE' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Item price is entered without tax. GST (e.g. 18%) is added on top at billing checkout.
              </p>
              <div className="mt-2 text-[10px] font-mono p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300">
                Item: ₹1,000 + GST (₹180) = Total: ₹1,180
              </div>
            </div>

            <div
              onClick={() => setPricingModel('INCLUSIVE')}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                pricingModel === 'INCLUSIVE'
                  ? 'border-red-600 bg-red-50/30 dark:bg-red-950/20 shadow-sm'
                  : 'border-slate-200 dark:border-[#222E42] hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Tax-Inclusive Pricing (Retail / MRP)
                </span>
                <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  pricingModel === 'INCLUSIVE' ? 'border-red-600 bg-red-600' : 'border-slate-300'
                }`}>
                  {pricingModel === 'INCLUSIVE' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Item price entered already includes tax. The system back-calculates base price and GST.
              </p>
              <div className="mt-2 text-[10px] font-mono p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300">
                MRP: ₹1,000 (Base: ₹847.46 + GST 18%: ₹152.54)
              </div>
            </div>
          </div>
        </div>

        {/* E-Way Bill & Advanced Compliance Controls */}
        <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-red-600" />
              <span>Statutory Compliance & E-Waybill Rules</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Enforce mandatory HSN codes, reverse charges, and E-Waybill triggers on high-value dispatches.
            </p>
          </div>

          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/70 dark:bg-[#0B0F19]/60 border border-slate-200/60 dark:border-[#222E42]">
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Mandatory HSN / SAC Codes</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Prevent saving products or line items without 6-digit or 8-digit HSN code</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={requireHsn}
                  onChange={(e) => setRequireHsn(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/70 dark:bg-[#0B0F19]/60 border border-slate-200/60 dark:border-[#222E42]">
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Enable Reverse Charge Mechanism (RCM)</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Allow marking purchases from unregistered suppliers under RCM</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={enableRcm}
                  onChange={(e) => setEnableRcm(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-slate-50/70 dark:bg-[#0B0F19]/60 border border-slate-200/60 dark:border-[#222E42]">
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Automated E-Way Bill Alerts</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Alert and prompt for vehicle & transporter details when invoice total exceeds threshold</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-medium text-slate-500">Above ₹</span>
                  <input
                    type="number"
                    value={ewaybillThreshold}
                    onChange={(e) => setEwaybillThreshold(e.target.value)}
                    className="w-24 px-2 py-1 rounded-lg border border-slate-200 dark:border-[#222E42] bg-white dark:bg-[#0B0F19] text-xs font-mono text-slate-900 dark:text-white"
                  />
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableEWayBill}
                    onChange={(e) => setEnableEWayBill(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-3">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-md shadow-red-600/25 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Tax Settings'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
