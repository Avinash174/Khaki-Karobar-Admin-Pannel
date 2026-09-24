'use client';

import React, { useState } from 'react';
import {
  Mail,
  Save,
  CheckCircle2,
  Lock,
  Send,
  Server,
  KeyRound,
  ShieldCheck,
  Eye,
  EyeOff,
  RefreshCw,
} from 'lucide-react';

export default function EmailSettingsPage() {
  const [saving, setSaving] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  const [provider, setProvider] = useState<'SMTP' | 'RESEND' | 'SES'>('SMTP');
  const [host, setHost] = useState('smtp.resend.com');
  const [port, setPort] = useState('587');
  const [encryption, setEncryption] = useState('TLS');
  const [senderEmail, setSenderEmail] = useState('billing@khaki.in');
  const [senderName, setSenderName] = useState('Khaki Karobar Billing Desk');
  const [smtpUser, setSmtpUser] = useState('resend');
  const [smtpPassword, setSmtpPassword] = useState('re_9012384a_bc891028');
  const [showPassword, setShowPassword] = useState(false);

  const [testEmailTo, setTestEmailTo] = useState('avinash@khaki.in');
  const [sendingTest, setSendingTest] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessToast(false);
    setTimeout(() => {
      setSaving(false);
      setSuccessToast(true);
      setTimeout(() => setSuccessToast(false), 4000);
    }, 600);
  };

  const handleSendTest = () => {
    setSendingTest(true);
    setTimeout(() => {
      setSendingTest(false);
      alert(`Test email successfully dispatched to ${testEmailTo} via ${host}:${port}.`);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {successToast && (
        <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>SMTP and email dispatch configuration saved successfully.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Mail className="w-5 h-5 text-red-600" />
                <span>Email & SMTP Dispatch Settings</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Configure SMTP server credentials and transactional mailer relays for invoices and customer notifications.
              </p>
            </div>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-sm shadow-red-600/25 disabled:opacity-50 self-start sm:self-auto"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saving ? 'Saving...' : 'Save Email Settings'}</span>
            </button>
          </div>

          {/* Email Provider Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-5">
            {[
              { id: 'SMTP', label: 'Custom SMTP Server', desc: 'Connect any standard SMTP host' },
              { id: 'RESEND', label: 'Resend API', desc: 'Modern transactional email service' },
              { id: 'SES', label: 'Amazon SES', desc: 'AWS Simple Email Service' },
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setProvider(p.id as any)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  provider === p.id
                    ? 'border-red-600 bg-red-50/40 dark:bg-red-950/20 shadow-sm'
                    : 'border-slate-200 dark:border-[#222E42] hover:bg-slate-50 dark:hover:bg-slate-800/40'
                }`}
              >
                <p className={`text-xs font-bold ${provider === p.id ? 'text-red-600 dark:text-red-400' : 'text-slate-900 dark:text-white'}`}>
                  {p.label}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">{p.desc}</p>
              </button>
            ))}
          </div>

          {/* Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">SMTP Host / Server</label>
              <input
                type="text"
                value={host}
                onChange={(e) => setHost(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50/50 dark:bg-[#0B0F19] text-xs font-mono font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Port</label>
              <input
                type="text"
                value={port}
                onChange={(e) => setPort(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50/50 dark:bg-[#0B0F19] text-xs font-mono font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Encryption</label>
              <select
                value={encryption}
                onChange={(e) => setEncryption(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50/50 dark:bg-[#0B0F19] text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              >
                <option value="TLS">TLS (Recommended - Port 587)</option>
                <option value="SSL">SSL (Port 465)</option>
                <option value="NONE">None (Port 25)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">From / Sender Email</label>
              <input
                type="email"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50/50 dark:bg-[#0B0F19] text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Sender Display Name</label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50/50 dark:bg-[#0B0F19] text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Password / API Key</label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[11px] font-semibold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1"
                >
                  {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  <span>{showPassword ? 'Hide' : 'Reveal'}</span>
                </button>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={smtpPassword}
                onChange={(e) => setSmtpPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50/50 dark:bg-[#0B0F19] text-xs font-mono font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              />
            </div>
          </div>
        </div>

        {/* Send Test Email Card */}
        <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Send className="w-4 h-4 text-red-600" />
              <span>Verify & Send Test Email</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Send a diagnostic ping to ensure firewall ports and TLS certificates are valid.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <input
              type="email"
              value={testEmailTo}
              onChange={(e) => setTestEmailTo(e.target.value)}
              placeholder="recipient@example.com"
              className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50/50 dark:bg-[#0B0F19] text-xs font-medium text-slate-900 dark:text-white"
            />
            <button
              type="button"
              disabled={sendingTest}
              onClick={handleSendTest}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold transition-colors disabled:opacity-50 shrink-0"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${sendingTest ? 'animate-spin' : ''}`} />
              <span>{sendingTest ? 'Dispatching...' : 'Send Test Mail'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
