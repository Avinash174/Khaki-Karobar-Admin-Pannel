'use client';

import React from 'react';
import { MessageSquare, Send, CheckCheck, Clock, Settings } from 'lucide-react';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

export default function WhatsAppManagementPage() {
  const templates = [
    { name: 'tax_invoice_dispatch', category: 'Transactional', status: 'Approved', sentCount: 142 },
    { name: 'payment_received_receipt', category: 'Transactional', status: 'Approved', sentCount: 88 },
    { name: 'payment_due_reminder', category: 'Utility', status: 'Approved', sentCount: 34 },
    { name: 'order_dispatched_tracking', category: 'Transactional', status: 'Approved', sentCount: 65 },
  ];

  const recentLogs = [
    { phone: '+91 9822012345', customer: 'Ramesh Chandra', doc: 'Invoice #INV-202609-0005', status: 'Delivered', time: '10:45 AM' },
    { phone: '+91 9845098765', customer: 'Pooja Kulkarni', doc: 'Invoice #INV-202609-0004', status: 'Read', time: '09:12 AM' },
    { phone: '+91 9712345678', customer: 'Amit Patel', doc: 'Receipt #REC-0019', status: 'Delivered', time: 'Yesterday' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-150 max-w-4xl">
      <AdminBreadcrumb customItems={[{ label: 'WhatsApp' }]} />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-emerald-600" />
            <span>WhatsApp Cloud API Integration</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Meta Cloud API connection for automated PDF invoice delivery and customer payment receipts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            API Connected
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Approved Templates */}
        <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-5 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">Active Message Templates</h2>
          <div className="space-y-2.5">
            {templates.map((t) => (
              <div key={t.name} className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <p className="font-mono font-bold text-slate-900 dark:text-white">{t.name}</p>
                  <p className="text-slate-400 text-[10px]">{t.category} • Sent {t.sentCount} times</p>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200">
                  {t.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Delivery Logs */}
        <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-5 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">Recent WhatsApp Dispatches</h2>
          <div className="space-y-2.5">
            {recentLogs.map((log, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{log.customer}</p>
                  <p className="text-slate-400 text-[10px] font-mono">{log.doc} • {log.phone}</p>
                </div>
                <div className="text-right">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 justify-end text-[11px]">
                    <CheckCheck className="w-3.5 h-3.5" /> {log.status}
                  </span>
                  <span className="text-slate-400 text-[10px]">{log.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
