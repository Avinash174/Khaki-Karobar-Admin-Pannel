'use client';

import React, { useState } from 'react';
import {
  Globe,
  Clock,
  Coins,
  Calendar,
  Save,
  CheckCircle2,
  Sliders,
  Hash,
} from 'lucide-react';

export default function PreferencesSettingsPage() {
  const [saving, setSaving] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  // Form State
  const [language, setLanguage] = useState('en');
  const [country, setCountry] = useState('IN');
  const [currency, setCurrency] = useState('INR');
  const [timezone, setTimezone] = useState('Asia/Kolkata');
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');
  const [timeFormat, setTimeFormat] = useState('12h');
  const [numberFormat, setNumberFormat] = useState('INDIAN'); // Lakhs / Crores
  const [fiscalYearStart, setFiscalYearStart] = useState('04-01'); // 1st April

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessToast(false);

    try {
      localStorage.setItem(
        'khaki_preferences',
        JSON.stringify({
          language,
          country,
          currency,
          timezone,
          dateFormat,
          timeFormat,
          numberFormat,
          fiscalYearStart,
        })
      );
    } catch {}

    setTimeout(() => {
      setSaving(false);
      setSuccessToast(true);
      setTimeout(() => setSuccessToast(false), 4000);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {successToast && (
        <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>Regional formats, localization, and number conventions updated successfully.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Header Card */}
        <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-red-600" />
                <span>Language, Region & Localization Preferences</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Customize operational timezone, Indian number formatting (Lakhs/Crores), and statutory fiscal year cycles.
              </p>
            </div>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-sm shadow-red-600/25 disabled:opacity-50 self-start sm:self-auto"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saving ? 'Saving...' : 'Save Preferences'}</span>
            </button>
          </div>

          {/* Localization Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span>Primary Interface Language</span>
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50/50 dark:bg-[#0B0F19] text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              >
                <option value="en">English (India) - Default</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="mr">मराठी (Marathi)</option>
                <option value="gu">ગુજરાતી (Gujarati)</option>
              </select>
              <p className="text-[10px] text-slate-400">Controls dashboard labels and standard menus</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-slate-400" />
                <span>Default Currency</span>
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50/50 dark:bg-[#0B0F19] text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              >
                <option value="INR">INR - Indian Rupee (₹)</option>
                <option value="USD">USD - US Dollar ($)</option>
                <option value="AED">AED - UAE Dirham (د.إ)</option>
                <option value="EUR">EUR - Euro (€)</option>
              </select>
              <p className="text-[10px] text-slate-400">Base currency applied to vouchers & reports</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Operational Timezone</span>
              </label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50/50 dark:bg-[#0B0F19] text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              >
                <option value="Asia/Kolkata">Asia/Kolkata (IST, UTC +05:30)</option>
                <option value="Asia/Dubai">Asia/Dubai (GST, UTC +04:00)</option>
                <option value="UTC">UTC (Coordinated Universal Time)</option>
                <option value="America/New_York">America/New_York (EST / EDT)</option>
              </select>
              <p className="text-[10px] text-slate-400">Timestamps on audit logs and invoices</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Date Representation</span>
              </label>
              <select
                value={dateFormat}
                onChange={(e) => setDateFormat(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50/50 dark:bg-[#0B0F19] text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              >
                <option value="DD/MM/YYYY">DD/MM/YYYY (24/09/2026) - India Standard</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD (2026-09-24) - ISO Standard</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY (09/24/2026) - US Standard</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Time Format</span>
              </label>
              <select
                value={timeFormat}
                onChange={(e) => setTimeFormat(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50/50 dark:bg-[#0B0F19] text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              >
                <option value="12h">12-Hour (02:30 PM)</option>
                <option value="24h">24-Hour Military (14:30)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Financial Year Cycle Start</span>
              </label>
              <select
                value={fiscalYearStart}
                onChange={(e) => setFiscalYearStart(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50/50 dark:bg-[#0B0F19] text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              >
                <option value="04-01">1st April - 31st March (Indian Standard FY)</option>
                <option value="01-01">1st January - 31st December (Calendar Year)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Number Formatting Conventions */}
        <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Hash className="w-4 h-4 text-red-600" />
              <span>Numeral & Delimiter Formatting System</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Choose how large ledger sums, profit margins, and inventory quantities are punctuated.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div
              onClick={() => setNumberFormat('INDIAN')}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                numberFormat === 'INDIAN'
                  ? 'border-red-600 bg-red-50/30 dark:bg-red-950/20 shadow-sm'
                  : 'border-slate-200 dark:border-[#222E42] hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Indian Numbering System (Lakhs & Crores)
                </span>
                <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  numberFormat === 'INDIAN' ? 'border-red-600 bg-red-600' : 'border-slate-300'
                }`}>
                  {numberFormat === 'INDIAN' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Separated as thousands, then two-digit clusters (lakhs, crores). Recommended for Indian businesses.
              </p>
              <div className="mt-2 text-xs font-mono font-bold p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-800 dark:text-slate-200">
                ₹ 12,34,56,789.50
              </div>
            </div>

            <div
              onClick={() => setNumberFormat('INTERNATIONAL')}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                numberFormat === 'INTERNATIONAL'
                  ? 'border-red-600 bg-red-50/30 dark:bg-red-950/20 shadow-sm'
                  : 'border-slate-200 dark:border-[#222E42] hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  International Standard (Millions & Billions)
                </span>
                <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  numberFormat === 'INTERNATIONAL' ? 'border-red-600 bg-red-600' : 'border-slate-300'
                }`}>
                  {numberFormat === 'INTERNATIONAL' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Separated uniformly by three digits (thousands, millions).
              </p>
              <div className="mt-2 text-xs font-mono font-bold p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-800 dark:text-slate-200">
                ₹ 123,456,789.50
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
              <span>{saving ? 'Saving...' : 'Save Preferences'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
