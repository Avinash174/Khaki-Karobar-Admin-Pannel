'use client';

import React, { useState } from 'react';
import {
  Bell,
  Mail,
  Smartphone,
  MessageSquare,
  Save,
  CheckCircle2,
  AlertCircle,
  Send,
} from 'lucide-react';

export default function NotificationSettingsPage() {
  const [saving, setSaving] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  // Email Notification States
  const [emailNewLead, setEmailNewLead] = useState(true);
  const [emailInvoiceCreated, setEmailInvoiceCreated] = useState(true);
  const [emailPaymentReceived, setEmailPaymentReceived] = useState(true);
  const [emailLowStock, setEmailLowStock] = useState(true);
  const [emailOrderCreated, setEmailOrderCreated] = useState(false);
  const [emailDailySummary, setEmailDailySummary] = useState(true);

  // Push / In-App Notification States
  const [pushImportantAlerts, setPushImportantAlerts] = useState(true);
  const [pushPaymentUpdates, setPushPaymentUpdates] = useState(true);
  const [pushInventoryAlerts, setPushInventoryAlerts] = useState(true);
  const [pushSecurityAlerts, setPushSecurityAlerts] = useState(true);

  // WhatsApp Notification States
  const [waSendInvoicePdf, setWaSendInvoicePdf] = useState(true);
  const [waPaymentReceipt, setWaPaymentReceipt] = useState(true);
  const [waPaymentReminder, setWaPaymentReminder] = useState(true);
  const [waOrderConfirmation, setWaOrderConfirmation] = useState(true);

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
          <span>Notification rules and channel delivery preferences saved successfully.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Header Bar */}
        <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Bell className="w-5 h-5 text-red-600" />
                <span>Notification Preferences & Automated Dispatches</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Configure which transactional events trigger Email, In-App Push, and WhatsApp notifications to clients and staff.
              </p>
            </div>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-sm shadow-red-600/25 disabled:opacity-50 self-start sm:self-auto"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saving ? 'Saving...' : 'Save Notification Preferences'}</span>
            </button>
          </div>
        </div>

        {/* 1. WhatsApp Notifications Card */}
        <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  WhatsApp Business Dispatches
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Automated customer updates delivered directly via verified WhatsApp Cloud API.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border border-emerald-200/60 dark:border-emerald-900/40">
              Active WABA Connected
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {[
              {
                title: 'Send Invoice PDF on WhatsApp',
                desc: 'Automatically dispatches signed PDF link to customer mobile on invoice finalization.',
                checked: waSendInvoicePdf,
                toggle: setWaSendInvoicePdf,
              },
              {
                title: 'Payment Receipt Confirmation',
                desc: 'Delivers instant payment acknowledgement with remaining balance statement.',
                checked: waPaymentReceipt,
                toggle: setWaPaymentReceipt,
              },
              {
                title: 'Overdue Payment Reminders',
                desc: 'Polite automated reminder sent on due date and +3 days post due date.',
                checked: waPaymentReminder,
                toggle: setWaPaymentReminder,
              },
              {
                title: 'Sales Order Confirmation',
                desc: 'Dispatches order summary when a new sales order is booked by team.',
                checked: waOrderConfirmation,
                toggle: setWaOrderConfirmation,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between gap-3 p-3.5 rounded-xl bg-slate-50/70 dark:bg-[#0B0F19]/60 border border-slate-200/60 dark:border-[#222E42]"
              >
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{item.title}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</p>
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

        {/* 2. Email Notifications Card */}
        <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Email Notifications & Daily Digests
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Transactional notifications dispatched via connected SMTP relay.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {[
              {
                title: 'New Lead Inbound',
                desc: 'Alert admin when a prospect submits an inquiry via website or WhatsApp.',
                checked: emailNewLead,
                toggle: setEmailNewLead,
              },
              {
                title: 'Invoice Created & Dispatched',
                desc: 'Send copy of invoice to administrative accounts inbox for filing.',
                checked: emailInvoiceCreated,
                toggle: setEmailInvoiceCreated,
              },
              {
                title: 'Payment Received Alert',
                desc: 'Notify management on client bank or UPI payment confirmation.',
                checked: emailPaymentReceived,
                toggle: setEmailPaymentReceived,
              },
              {
                title: 'Low Stock & Reorder Alert',
                desc: 'Trigger email when product inventory drops below safety threshold.',
                checked: emailLowStock,
                toggle: setEmailLowStock,
              },
              {
                title: 'Order Created Alert',
                desc: 'Notify store manager when a new purchase order or sales dispatch is created.',
                checked: emailOrderCreated,
                toggle: setEmailOrderCreated,
              },
              {
                title: 'Daily Business Summary Digest',
                desc: 'Receive end-of-day summary of sales revenue, collections, and pending orders at 9:00 PM.',
                checked: emailDailySummary,
                toggle: setEmailDailySummary,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between gap-3 p-3.5 rounded-xl bg-slate-50/70 dark:bg-[#0B0F19]/60 border border-slate-200/60 dark:border-[#222E42]"
              >
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{item.title}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</p>
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

        {/* 3. In-App & Push Notifications Card */}
        <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 flex items-center justify-center">
                <Smartphone className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Push & In-App Bell Notifications
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Real-time alerts displayed inside the top navigation bell icon and browser popups.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {[
              {
                title: 'Important System & Security Alerts',
                desc: 'Unusual logins, new device authorizations, and system maintenance advisories.',
                checked: pushSecurityAlerts,
                toggle: setPushSecurityAlerts,
              },
              {
                title: 'Real-time Payment Updates',
                desc: 'Instant audio ping & notification banner when client makes online payment.',
                checked: pushPaymentUpdates,
                toggle: setPushPaymentUpdates,
              },
              {
                title: 'Critical Inventory Alerts',
                desc: 'Real-time badge counter when any item reaches zero inventory stock.',
                checked: pushInventoryAlerts,
                toggle: setPushInventoryAlerts,
              },
              {
                title: 'High-Priority Business Alerts',
                desc: 'Tax filing deadlines, GSTR-1 due date alerts, and contract renewals.',
                checked: pushImportantAlerts,
                toggle: setPushImportantAlerts,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between gap-3 p-3.5 rounded-xl bg-slate-50/70 dark:bg-[#0B0F19]/60 border border-slate-200/60 dark:border-[#222E42]"
              >
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{item.title}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</p>
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

          <div className="flex justify-end pt-3">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-md shadow-red-600/25 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Notification Preferences'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
