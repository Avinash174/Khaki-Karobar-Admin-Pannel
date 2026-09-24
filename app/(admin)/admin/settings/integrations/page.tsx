'use client';

import React, { useState } from 'react';
import {
  Boxes,
  MessageSquare,
  Mail,
  CreditCard,
  FileSpreadsheet,
  Smartphone,
  CheckCircle2,
  ExternalLink,
  Settings2,
  Power,
  X,
  Lock,
  Eye,
  EyeOff,
  KeyRound,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  category: 'Communication' | 'Payment' | 'Accounting' | 'Messaging';
  description: string;
  status: 'CONNECTED' | 'DISCONNECTED' | 'NEEDS_SETUP';
  icon: any;
  iconBg: string;
  details: string;
  configKey?: string;
  maskedSecret?: string;
}

const INITIAL_INTEGRATIONS: Integration[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp Business API',
    category: 'Communication',
    description: 'Official Meta Cloud API for automated dispatch of PDF invoices, receipts, and order alerts.',
    status: 'CONNECTED',
    icon: MessageSquare,
    iconBg: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    details: 'WABA ID: 109283746591028 • Phone: +91 98765 43210',
    configKey: 'EAABwzL128s... (Token Valid)',
    maskedSecret: '••••••••••••••••••••••••••••••••',
  },
  {
    id: 'razorpay',
    name: 'Razorpay Payment Gateway',
    category: 'Payment',
    description: 'Accept customer online settlements via UPI, Cards, NetBanking, and automated webhooks.',
    status: 'CONNECTED',
    icon: CreditCard,
    iconBg: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    details: 'Key ID: rzp_live_8w9X3kQjL901ab • Webhook: Active (200 OK)',
    configKey: 'rzp_live_8w9X3kQjL901ab',
    maskedSecret: '••••••••••••••••••••',
  },
  {
    id: 'email_smtp',
    name: 'Transactional Email Relay (Resend / SMTP)',
    category: 'Communication',
    description: 'High deliverability cloud email dispatch for tax invoices, account alerts, and staff notifications.',
    status: 'CONNECTED',
    icon: Mail,
    iconBg: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
    details: 'Host: smtp.resend.com • Port: 587 • Sender: billing@khaki.in',
    configKey: 're_K891mNzP90q...',
    maskedSecret: '••••••••••••••••••••••••',
  },
  {
    id: 'tally',
    name: 'Tally Prime Cloud Sync',
    category: 'Accounting',
    description: 'Two-way automated XML voucher sync for sales invoices, purchase bills, and general ledgers.',
    status: 'NEEDS_SETUP',
    icon: FileSpreadsheet,
    iconBg: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    details: 'Requires Tally .NET server connector listening on port 9000',
  },
  {
    id: 'sms_gateway',
    name: 'DLT Approved SMS Gateway',
    category: 'Messaging',
    description: 'Govt. DLT registered transactional SMS routes for OTPs and critical dispatch alerts.',
    status: 'CONNECTED',
    icon: Smartphone,
    iconBg: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20',
    details: 'Sender ID: KHKIKR • Route: Transactional • DLT Entity: 110123984',
    configKey: 'DLT-110123984-ENT',
    maskedSecret: '••••••••••••••••',
  },
];

export default function IntegrationsSettingsPage() {
  const [integrations, setIntegrations] = useState<Integration[]>(INITIAL_INTEGRATIONS);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [showSecret, setShowSecret] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [testingPing, setTestingPing] = useState(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleToggleConnection = (id: string) => {
    setIntegrations(
      integrations.map((item) => {
        if (item.id === id) {
          const nextStatus = item.status === 'CONNECTED' ? 'DISCONNECTED' : 'CONNECTED';
          triggerToast(`${item.name} is now ${nextStatus.toLowerCase()}.`);
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
    if (selectedIntegration && selectedIntegration.id === id) {
      setSelectedIntegration(null);
    }
  };

  const handleTestConnection = (name: string) => {
    setTestingPing(true);
    setTimeout(() => {
      setTestingPing(false);
      triggerToast(`Connection handshake successful: 200 OK from ${name} servers.`);
    }, 900);
  };

  return (
    <div className="space-y-6">
      {toastMessage && (
        <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Info Card */}
      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Boxes className="w-5 h-5 text-red-600" />
              <span>Connected Business Integrations & APIs</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Connect external billing, communication, payment gateway, and accounting services securely without plain-text exposure.
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 self-start sm:self-auto">
            {integrations.filter((i) => i.status === 'CONNECTED').length} of {integrations.length} Active
          </span>
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {integrations.map((item) => {
          const Icon = item.icon;
          const isConnected = item.status === 'CONNECTED';
          const isPending = item.status === 'NEEDS_SETUP';

          return (
            <div
              key={item.id}
              className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center border ${item.iconBg}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                        {item.name}
                      </h3>
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0 ${
                      isConnected
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border border-emerald-200/60 dark:border-emerald-900/40'
                        : isPending
                        ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 border border-amber-200/60 dark:border-amber-900/40'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isConnected ? 'bg-emerald-500' : isPending ? 'bg-amber-500' : 'bg-slate-400'
                      }`}
                    />
                    <span>{isConnected ? 'Connected' : isPending ? 'Setup Required' : 'Disconnected'}</span>
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#0B0F19] text-[10px] font-mono text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-800/80 truncate">
                  {item.details}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80">
                <button
                  type="button"
                  onClick={() => setSelectedIntegration(item)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400 hover:underline"
                >
                  <Settings2 className="w-3.5 h-3.5" />
                  <span>Configure Settings</span>
                </button>

                <div className="flex items-center gap-2">
                  {isConnected ? (
                    <button
                      type="button"
                      onClick={() => handleToggleConnection(item.id)}
                      className="px-3 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900/40 bg-rose-50/50 dark:bg-rose-950/20 text-rose-600 text-xs font-semibold hover:bg-rose-100 transition-colors"
                    >
                      Disconnect
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleToggleConnection(item.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-sm shadow-red-600/25"
                    >
                      Connect
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Configuration Modal */}
      {selectedIntegration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#121927] border border-slate-200 dark:border-[#222E42] rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center border ${selectedIntegration.iconBg}`}
                >
                  <selectedIntegration.icon className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Configure {selectedIntegration.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedIntegration(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-slate-400" />
                  <span>Public / App Identifier</span>
                </label>
                <input
                  type="text"
                  readOnly
                  value={selectedIntegration.configKey || 'API_IDENTIFIER_DEFAULT'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50 dark:bg-[#0B0F19] text-xs font-mono font-medium text-slate-700 dark:text-slate-300"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Secret API Key / Authentication Token</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowSecret(!showSecret)}
                    className="text-[11px] font-semibold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1"
                  >
                    {showSecret ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    <span>{showSecret ? 'Hide' : 'Reveal'}</span>
                  </button>
                </div>
                <input
                  type={showSecret ? 'text' : 'password'}
                  readOnly
                  value={
                    showSecret
                      ? 'sec_live_9941a8fd21c7e94b8931b2'
                      : selectedIntegration.maskedSecret || '••••••••••••••••••••••••'
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50 dark:bg-[#0B0F19] text-xs font-mono font-medium text-slate-700 dark:text-slate-300"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B0F19] text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Encrypted with AES-256 in production vault. Never displayed to non-administrators.</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                disabled={testingPing}
                onClick={() => handleTestConnection(selectedIntegration.name)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-[#222E42] text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${testingPing ? 'animate-spin' : ''}`} />
                <span>{testingPing ? 'Testing Handshake...' : 'Send Test Ping'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedIntegration(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedIntegration(null);
                    triggerToast(`Configuration updated for ${selectedIntegration.name}`);
                  }}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-600/25"
                >
                  Save Config
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
