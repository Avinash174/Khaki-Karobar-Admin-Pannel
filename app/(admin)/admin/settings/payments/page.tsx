'use client';

import React, { useState } from 'react';
import {
  CreditCard,
  Banknote,
  QrCode,
  Building,
  Layers,
  Save,
  CheckCircle2,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  HelpCircle,
  KeyRound,
  ShieldCheck,
} from 'lucide-react';

export default function PaymentSettingsPage() {
  const [saving, setSaving] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  // Payment Methods State
  const [cashEnabled, setCashEnabled] = useState(true);
  const [cashMaxLimit, setCashMaxLimit] = useState('199000');

  const [upiEnabled, setUpiEnabled] = useState(true);
  const [upiId, setUpiId] = useState('khakikarobar@icici');
  const [upiName, setUpiName] = useState('Khaki Karobar Pvt Ltd');

  const [cardEnabled, setCardEnabled] = useState(true);
  const [cardPosTerminalId, setCardPosTerminalId] = useState('POS-MH-PUNE-091');

  const [bankEnabled, setBankEnabled] = useState(true);
  const [bankName, setBankName] = useState('ICICI Bank Ltd');
  const [accountNumber, setAccountNumber] = useState('004505001234');
  const [ifscCode, setIfscCode] = useState('ICIC0000045');
  const [branch, setBranch] = useState('Baner Business Park, Pune');

  const [creditEnabled, setCreditEnabled] = useState(true);
  const [creditDefaultDays, setCreditDefaultDays] = useState('30');

  const [otherEnabled, setOtherEnabled] = useState(true);

  // Online Gateway Config (Razorpay)
  const [gatewayEnabled, setGatewayEnabled] = useState(true);
  const [gatewayEnv, setGatewayEnv] = useState<'live' | 'test'>('live');
  const [razorpayKeyId, setRazorpayKeyId] = useState('rzp_live_8w9X3kQjL901ab');
  const [razorpaySecret, setRazorpaySecret] = useState('sec_live_9941a8fd21c7e94b8931');
  const [showSecret, setShowSecret] = useState(false);

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
          <span>Payment methods, banking parameters, and gateway credentials successfully saved.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Header Save Bar */}
        <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-red-600" />
                <span>Accepted Payment Methods & Gateway</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Enable payment channels, configure VPA QR codes, bank accounts, and secure gateway credentials.
              </p>
            </div>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-sm shadow-red-600/25 disabled:opacity-50 self-start sm:self-auto"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saving ? 'Saving...' : 'Save Payment Settings'}</span>
            </button>
          </div>
        </div>

        {/* Payment Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* 1. Cash Payment */}
          <div className={`p-5 rounded-2xl border transition-all ${
            cashEnabled
              ? 'bg-white dark:bg-[#121927] border-slate-200/80 dark:border-[#222E42] shadow-sm'
              : 'bg-slate-50/70 dark:bg-[#0B0F19]/40 border-slate-200/50 dark:border-slate-800 opacity-75'
          }`}>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center">
                  <Banknote className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">Cash In Hand</h3>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Direct cash register payment</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={cashEnabled}
                  onChange={(e) => setCashEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>

            {cashEnabled && (
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  Income Tax Section 269ST Single Transaction Limit (₹)
                </label>
                <input
                  type="number"
                  value={cashMaxLimit}
                  onChange={(e) => setCashMaxLimit(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50/50 dark:bg-[#0B0F19] text-xs font-mono font-medium text-slate-900 dark:text-white"
                />
                <p className="text-[10px] text-slate-400">Alerts if cash invoice total exceeds ₹1,99,000</p>
              </div>
            )}
          </div>

          {/* 2. UPI / QR Payment */}
          <div className={`p-5 rounded-2xl border transition-all ${
            upiEnabled
              ? 'bg-white dark:bg-[#121927] border-slate-200/80 dark:border-[#222E42] shadow-sm'
              : 'bg-slate-50/70 dark:bg-[#0B0F19]/40 border-slate-200/50 dark:border-slate-800 opacity-75'
          }`}>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 flex items-center justify-center">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">UPI & QR Code</h3>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">BHIM, PhonePe, GPay, Paytm</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={upiEnabled}
                  onChange={(e) => setUpiEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>

            {upiEnabled && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    Merchant UPI ID (VPA)
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50/50 dark:bg-[#0B0F19] text-xs font-mono font-medium text-slate-900 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    Merchant Name for QR String
                  </label>
                  <input
                    type="text"
                    value={upiName}
                    onChange={(e) => setUpiName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50/50 dark:bg-[#0B0F19] text-xs font-medium text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 3. Bank Account / NEFT / RTGS */}
          <div className={`p-5 rounded-2xl border transition-all md:col-span-2 ${
            bankEnabled
              ? 'bg-white dark:bg-[#121927] border-slate-200/80 dark:border-[#222E42] shadow-sm'
              : 'bg-slate-50/70 dark:bg-[#0B0F19]/40 border-slate-200/50 dark:border-slate-800 opacity-75'
          }`}>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">Bank Transfer (NEFT / RTGS / IMPS)</h3>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Direct account details printed on invoices</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={bankEnabled}
                  onChange={(e) => setBankEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>

            {bankEnabled && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Bank Name</label>
                  <input
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50/50 dark:bg-[#0B0F19] text-xs text-slate-900 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Account Number</label>
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50/50 dark:bg-[#0B0F19] text-xs font-mono text-slate-900 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">IFSC Code</label>
                  <input
                    type="text"
                    value={ifscCode}
                    onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50/50 dark:bg-[#0B0F19] text-xs font-mono uppercase text-slate-900 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Branch Name</label>
                  <input
                    type="text"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50/50 dark:bg-[#0B0F19] text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 4. Debit / Credit Card */}
          <div className={`p-5 rounded-2xl border transition-all ${
            cardEnabled
              ? 'bg-white dark:bg-[#121927] border-slate-200/80 dark:border-[#222E42] shadow-sm'
              : 'bg-slate-50/70 dark:bg-[#0B0F19]/40 border-slate-200/50 dark:border-slate-800 opacity-75'
          }`}>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">Card / POS Swiping</h3>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Debit, Credit card machine</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={cardEnabled}
                  onChange={(e) => setCardEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>

            {cardEnabled && (
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">POS Terminal Identifier</label>
                <input
                  type="text"
                  value={cardPosTerminalId}
                  onChange={(e) => setCardPosTerminalId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50/50 dark:bg-[#0B0F19] text-xs font-mono text-slate-900 dark:text-white"
                />
              </div>
            )}
          </div>

          {/* 5. Khata / Store Credit */}
          <div className={`p-5 rounded-2xl border transition-all ${
            creditEnabled
              ? 'bg-white dark:bg-[#121927] border-slate-200/80 dark:border-[#222E42] shadow-sm'
              : 'bg-slate-50/70 dark:bg-[#0B0F19]/40 border-slate-200/50 dark:border-slate-800 opacity-75'
          }`}>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">Customer Khata / Credit</h3>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">B2B ledger account credit</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={creditEnabled}
                  onChange={(e) => setCreditEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>

            {creditEnabled && (
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Default Credit Term Period</label>
                <select
                  value={creditDefaultDays}
                  onChange={(e) => setCreditDefaultDays(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50/50 dark:bg-[#0B0F19] text-xs text-slate-900 dark:text-white"
                >
                  <option value="15">15 Days</option>
                  <option value="30">30 Days</option>
                  <option value="45">45 Days</option>
                  <option value="60">60 Days</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Payment Gateway Configuration (Razorpay Integration) */}
        <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 flex items-center justify-center font-bold text-sm">
                RZP
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Razorpay Payment Gateway</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border border-emerald-200/60 dark:border-emerald-800/40">
                    PCI-DSS Level 1
                  </span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Accept instant online payments via WhatsApp payment links, SMS reminders, and web checkout.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setGatewayEnv('live')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    gatewayEnv === 'live'
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Live Mode
                </button>
                <button
                  type="button"
                  onClick={() => setGatewayEnv('test')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    gatewayEnv === 'test'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Test Sandbox
                </button>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={gatewayEnabled}
                  onChange={(e) => setGatewayEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>
          </div>

          {gatewayEnabled && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-slate-400" />
                  <span>Key ID ({gatewayEnv === 'live' ? 'Live' : 'Test'})</span>
                </label>
                <input
                  type="text"
                  value={razorpayKeyId}
                  onChange={(e) => setRazorpayKeyId(e.target.value)}
                  placeholder="rzp_live_..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50/50 dark:bg-[#0B0F19] text-xs font-mono font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Key Secret (Never exposed publicly)</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowSecret(!showSecret)}
                    className="text-[11px] font-semibold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1"
                  >
                    {showSecret ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    <span>{showSecret ? 'Hide Secret' : 'Reveal Secret'}</span>
                  </button>
                </div>
                <input
                  type={showSecret ? 'text' : 'password'}
                  value={razorpaySecret}
                  onChange={(e) => setRazorpaySecret(e.target.value)}
                  placeholder="••••••••••••••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50/50 dark:bg-[#0B0F19] text-xs font-mono font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                />
              </div>

              <div className="md:col-span-2 p-3 bg-slate-50 dark:bg-[#0B0F19]/60 rounded-xl border border-slate-200/70 dark:border-[#222E42] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Webhook Endpoint:</span>
                  <code className="text-[11px] font-mono font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-[#121927] px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                    https://api.khaki.in/v1/webhooks/razorpay
                  </code>
                </div>
                <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                  Listening
                </span>
              </div>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-md shadow-red-600/25 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Payment Settings'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
