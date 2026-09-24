'use client';

import React, { useState } from 'react';
import {
  Receipt,
  Save,
  CheckCircle2,
  Eye,
  Sliders,
  FileText,
  FileCheck,
  Building,
  QrCode,
  Sparkles,
} from 'lucide-react';

export default function InvoiceSettingsPage() {
  const [saving, setSaving] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  // Configuration Fields
  const [prefix, setPrefix] = useState('KK-INV-');
  const [startingNumber, setStartingNumber] = useState('1001');
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');
  const [currency, setCurrency] = useState('INR (₹)');
  const [decimalPrecision, setDecimalPrecision] = useState('2');
  const [dueDays, setDueDays] = useState('15');

  // Appearance Toggles
  const [showLogo, setShowLogo] = useState(true);
  const [showAddress, setShowAddress] = useState(true);
  const [showGstDetails, setShowGstDetails] = useState(true);
  const [showCustomerDetails, setShowCustomerDetails] = useState(true);
  const [showTerms, setShowTerms] = useState(true);
  const [showSignature, setShowSignature] = useState(true);
  const [showQrCode, setShowQrCode] = useState(true);

  // Footer Content
  const [termsAndConditions, setTermsAndConditions] = useState(
    '1. Payment is strictly due within 15 days of invoice date.\n2. Interest @ 18% p.a. will be levied on delayed payments.\n3. Goods once sold will not be taken back or exchanged.\n4. Subject to Pune jurisdiction only.'
  );
  const [invoiceNote, setInvoiceNote] = useState(
    'Thank you for partnering with Khaki Karobar! For any queries regarding this invoice, write to billing@khaki.in'
  );

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
          <span>Invoice numbering, layout rules, and live preview preferences saved successfully.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Top Header Card */}
        <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Receipt className="w-5 h-5 text-red-600" />
                <span>Invoice Configuration & Billing Rules</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Customize invoice numbering sequencing, date formatting, layout elements, and terms.
              </p>
            </div>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-sm shadow-red-600/25 disabled:opacity-50 self-start sm:self-auto"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saving ? 'Saving...' : 'Save Invoice Settings'}</span>
            </button>
          </div>

          {/* Numbering & Formatting Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Invoice Prefix
              </label>
              <input
                type="text"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                placeholder="e.g. KK-INV-"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50/50 dark:bg-[#0B0F19] text-xs font-mono font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              />
              <p className="text-[10px] text-slate-400">Appended before numeric sequence</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Starting / Next Number
              </label>
              <input
                type="number"
                value={startingNumber}
                onChange={(e) => setStartingNumber(e.target.value)}
                placeholder="1001"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50/50 dark:bg-[#0B0F19] text-xs font-mono font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              />
              <p className="text-[10px] text-slate-400">Next invoice will be: <span className="font-mono font-bold text-slate-700 dark:text-slate-200">{prefix}{startingNumber}</span></p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Default Due Period
              </label>
              <select
                value={dueDays}
                onChange={(e) => setDueDays(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50/50 dark:bg-[#0B0F19] text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              >
                <option value="0">Due upon Receipt</option>
                <option value="7">Net 7 Days</option>
                <option value="15">Net 15 Days</option>
                <option value="30">Net 30 Days</option>
                <option value="60">Net 60 Days</option>
              </select>
              <p className="text-[10px] text-slate-400">Sets default due date on new invoices</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Date Format
              </label>
              <select
                value={dateFormat}
                onChange={(e) => setDateFormat(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50/50 dark:bg-[#0B0F19] text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              >
                <option value="DD/MM/YYYY">DD/MM/YYYY (24/09/2026)</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD (2026-09-24)</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY (09/24/2026)</option>
                <option value="DD-MMM-YYYY">DD-MMM-YYYY (24-Sep-2026)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Billing Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50/50 dark:bg-[#0B0F19] text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              >
                <option value="INR (₹)">INR - Indian Rupee (₹)</option>
                <option value="USD ($)">USD - US Dollar ($)</option>
                <option value="EUR (€)">EUR - Euro (€)</option>
                <option value="AED (د.إ)">AED - UAE Dirham (د.إ)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Decimal Precision
              </label>
              <select
                value={decimalPrecision}
                onChange={(e) => setDecimalPrecision(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50/50 dark:bg-[#0B0F19] text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              >
                <option value="2">2 Decimals (e.g. ₹1,450.50)</option>
                <option value="0">0 Decimals (Round to ₹1,451)</option>
                <option value="3">3 Decimals (e.g. ₹1,450.500)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Invoice Appearance Controls & Live Interactive Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Controls Column (5 cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm space-y-4">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-red-600" />
                <span>Invoice Sections Display</span>
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Toggle components visible on customer invoices and PDFs.
              </p>
            </div>

            <div className="space-y-3 pt-1">
              {[
                { label: 'Business Brand Logo', checked: showLogo, toggle: setShowLogo, desc: 'Display logo at top-left of the invoice header' },
                { label: 'Business Address & Contact', checked: showAddress, toggle: setShowAddress, desc: 'Include full registered address, phone, and email' },
                { label: 'GSTIN & PAN Details', checked: showGstDetails, toggle: setShowGstDetails, desc: 'Tax compliance identifier blocks for input tax credit' },
                { label: 'Customer Billing Details', checked: showCustomerDetails, toggle: setShowCustomerDetails, desc: 'Show customer legal name, phone, state, and GSTIN' },
                { label: 'Terms & Conditions', checked: showTerms, toggle: setShowTerms, desc: 'Append payment conditions and legal clauses at footer' },
                { label: 'Digital Authorized Signature', checked: showSignature, toggle: setShowSignature, desc: 'Include signature space for authorized signatory' },
                { label: 'Dynamic UPI QR Code', checked: showQrCode, toggle: setShowQrCode, desc: 'Instant scan-to-pay QR for fast client settlement' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start justify-between gap-3 p-3 rounded-xl bg-slate-50/70 dark:bg-[#0B0F19]/60 border border-slate-200/60 dark:border-[#222E42]"
                >
                  <div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{item.label}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={(e) => item.toggle(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Live Preview Panel (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-red-600" />
                <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Live Invoice Preview
                </span>
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200/60 dark:border-red-900/40">
                <Sparkles className="w-3 h-3" /> Real-time
              </span>
            </div>

            {/* Document Paper Preview */}
            <div className="bg-slate-50 dark:bg-[#0B0F19] rounded-xl p-5 border border-slate-200 dark:border-[#222E42] text-slate-800 dark:text-slate-200 space-y-5 text-xs shadow-inner">
              {/* Header */}
              <div className="flex justify-between items-start border-b border-slate-200 dark:border-slate-800 pb-4">
                <div className="space-y-1">
                  {showLogo && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-red-600 text-white font-black flex items-center justify-center text-sm shadow-sm">
                        KK
                      </div>
                      <span className="font-black text-sm tracking-tight text-slate-900 dark:text-white">
                        Khaki Karobar
                      </span>
                    </div>
                  )}
                  {showAddress && (
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                      Survey No. 45/2, Baner Business Hub<br />
                      Pune, Maharashtra - 411045<br />
                      contact@khaki.in | +91 98765 43210
                    </p>
                  )}
                  {showGstDetails && (
                    <p className="text-[10px] font-mono text-slate-600 dark:text-slate-400 mt-1">
                      <span className="font-semibold text-slate-800 dark:text-slate-300">GSTIN:</span> 27AABCK1234D1ZX
                    </p>
                  )}
                </div>

                <div className="text-right space-y-1">
                  <span className="text-xs font-black uppercase tracking-widest text-red-600 dark:text-red-400">
                    Tax Invoice
                  </span>
                  <p className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                    {prefix}{startingNumber}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Date: <span className="font-medium text-slate-700 dark:text-slate-300">24/09/2026</span>
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Due Date: <span className="font-medium text-slate-700 dark:text-slate-300">09/10/2026 ({dueDays} days)</span>
                  </p>
                </div>
              </div>

              {/* Bill To */}
              {showCustomerDetails && (
                <div className="p-3 bg-white dark:bg-[#121927] rounded-lg border border-slate-200/80 dark:border-[#222E42] text-[11px] space-y-0.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Billed To:</p>
                  <p className="font-bold text-slate-900 dark:text-white">Apex Retailers Pvt Ltd</p>
                  <p className="text-slate-500 dark:text-slate-400">Shivaji Nagar, Pune, Maharashtra (27)</p>
                  <p className="text-[10px] font-mono text-slate-600 dark:text-slate-400">GSTIN: 27AABCA5678B1Z9</p>
                </div>
              )}

              {/* Sample Line Items Table */}
              <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-slate-100 dark:bg-slate-800/60 font-semibold text-slate-600 dark:text-slate-300">
                    <tr>
                      <th className="p-2">Item</th>
                      <th className="p-2 text-center">Qty</th>
                      <th className="p-2 text-right">Rate</th>
                      <th className="p-2 text-right">Tax</th>
                      <th className="p-2 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    <tr>
                      <td className="p-2 font-medium">Khaki Uniform Shirt (Grade A)</td>
                      <td className="p-2 text-center">10</td>
                      <td className="p-2 text-right">₹450.00</td>
                      <td className="p-2 text-right">18%</td>
                      <td className="p-2 text-right font-medium">₹5,310.00</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-medium">Tactical Cargo Trouser</td>
                      <td className="p-2 text-center">5</td>
                      <td className="p-2 text-right">₹800.00</td>
                      <td className="p-2 text-right">18%</td>
                      <td className="p-2 text-right font-medium">₹4,720.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Totals & UPI QR */}
              <div className="flex justify-between items-end pt-2">
                <div>
                  {showQrCode && (
                    <div className="flex items-center gap-2 p-2 bg-white dark:bg-[#121927] rounded-lg border border-slate-200 dark:border-slate-800">
                      <div className="w-12 h-12 bg-slate-900 dark:bg-white rounded flex items-center justify-center text-white dark:text-slate-900">
                        <QrCode className="w-8 h-8" />
                      </div>
                      <div className="text-[10px]">
                        <p className="font-bold text-slate-900 dark:text-white">Scan & Pay via UPI</p>
                        <p className="text-slate-500 font-mono">khaki@upi</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="w-48 space-y-1 text-[11px] text-right">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal:</span>
                    <span className="font-mono">₹8,500.00</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>CGST + SGST (18%):</span>
                    <span className="font-mono">₹1,530.00</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-800 pt-1">
                    <span>Total:</span>
                    <span className="text-red-600 font-mono">₹10,030.00</span>
                  </div>
                </div>
              </div>

              {/* Terms & Signature */}
              <div className="grid grid-cols-2 gap-4 border-t border-slate-200 dark:border-slate-800 pt-3 text-[10px]">
                <div>
                  {showTerms && (
                    <div>
                      <p className="font-bold text-slate-700 dark:text-slate-300">Terms & Conditions:</p>
                      <p className="text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                        {termsAndConditions}
                      </p>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  {showSignature && (
                    <div>
                      <p className="font-bold text-slate-700 dark:text-slate-300">For Khaki Karobar</p>
                      <div className="h-8 flex items-center justify-end">
                        <span className="font-serif italic text-red-600 text-xs">Avinash Magar</span>
                      </div>
                      <p className="text-slate-400 text-[9px]">Authorized Signatory</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Invoice Footer Terms Editor */}
        <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-red-600" />
              <span>Standard Terms, Conditions & Invoice Footer Note</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              These legal clauses will automatically print on the bottom of all dispatched invoices and estimation vouchers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Terms & Conditions (One rule per line)
              </label>
              <textarea
                rows={5}
                value={termsAndConditions}
                onChange={(e) => setTermsAndConditions(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50/50 dark:bg-[#0B0F19] text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Client Thank You Note & Inquiry Line
              </label>
              <textarea
                rows={5}
                value={invoiceNote}
                onChange={(e) => setInvoiceNote(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50/50 dark:bg-[#0B0F19] text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-md shadow-red-600/25 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Invoice Settings'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
