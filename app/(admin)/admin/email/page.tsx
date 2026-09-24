'use client';

import React from 'react';
import { Mail, CheckCircle2, Clock, Send, AlertTriangle } from 'lucide-react';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

export default function EmailManagementPage() {
  const emailLogs = [
    { recipient: 'rajesh@sharmatrading.in', subject: 'Tax Invoice #INV-202609-0005 PDF Attached', status: 'Delivered', time: '10:45 AM' },
    { recipient: 'pooja@nexusretail.com', subject: 'Receipt Voucher for Payment Confirmation', status: 'Delivered', time: '09:12 AM' },
    { recipient: 'amit@gujaratsteels.com', subject: 'Monthly Statement of Accounts (Sep 2026)', status: 'Delivered', time: 'Yesterday' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-150 max-w-4xl">
      <AdminBreadcrumb customItems={[{ label: 'Email' }]} />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Mail className="w-6 h-6 text-red-600" />
            <span>Email Delivery & Transactional SMTP</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Automated PDF billing statements, invoice emails, and customer account ledgers.
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          SMTP Server Active
        </span>
      </div>

      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-5 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white">Recent Outbound Dispatch Logs</h2>
        <div className="space-y-2.5">
          {emailLogs.map((log, i) => (
            <div key={i} className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs">
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">{log.subject}</p>
                <p className="text-slate-400 text-[11px] font-mono mt-0.5">{log.recipient}</p>
              </div>
              <div className="text-right">
                <span className="text-emerald-600 font-bold flex items-center gap-1 justify-end text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {log.status}
                </span>
                <span className="text-slate-400 text-[10px]">{log.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
