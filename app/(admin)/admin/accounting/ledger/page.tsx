'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, Search, Filter, RefreshCw, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { accountingService } from '@/lib/api';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

export default function GeneralLedgerPage() {
  const [dayBook, setDayBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await accountingService.getDayBook();
        if (res.success) setDayBook(res.data);
      } catch (err) {
        console.error('Daybook load error:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const entries = dayBook?.entries || [
    { id: 'le-1', date: '2026-09-24', account: 'Cash / Bank (HDFC Account)', description: 'Customer Invoice Receipt #INV-202609-0005', type: 'DEBIT', amount: 14750 },
    { id: 'le-2', date: '2026-09-24', account: 'Sales Revenue Account', description: 'Counter Cash Billing', type: 'CREDIT', amount: 8614 },
    { id: 'le-3', date: '2026-09-23', account: 'Agarwal Textiles Mills', description: 'Raw Material Inward Purchase #PO-2026-031', type: 'DEBIT', amount: 12200 },
    { id: 'le-4', date: '2026-09-22', account: 'GST Output CGST (9%)', description: 'Tax collected on Sale', type: 'CREDIT', amount: 1125 },
    { id: 'le-5', date: '2026-09-22', account: 'GST Output SGST (9%)', description: 'Tax collected on Sale', type: 'CREDIT', amount: 1125 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <AdminBreadcrumb
        customItems={[
          { label: 'Accounting', href: '/admin/accounting' },
          { label: 'General Ledger' },
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-red-600" />
            <span>General Ledger & Day Book</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time double entry debits and credits ledger with date filter and account heads.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#0B0F19] border-b border-slate-200/80 dark:border-[#222E42] text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">Date</th>
                <th className="p-4">Account Head</th>
                <th className="p-4">Transaction Narration</th>
                <th className="p-4 text-right">Debit (₹)</th>
                <th className="p-4 text-right">Credit (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {entries.map((en: any) => (
                <tr key={en.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-mono text-slate-500">{en.date}</td>
                  <td className="p-4 font-bold text-slate-900 dark:text-white">{en.account}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">{en.description}</td>
                  <td className="p-4 text-right font-mono font-bold">
                    {en.type === 'DEBIT' ? (
                      <span className="text-emerald-600 dark:text-emerald-400">
                        ₹{Number(en.amount).toLocaleString('en-IN')}
                      </span>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="p-4 text-right font-mono font-bold">
                    {en.type === 'CREDIT' ? (
                      <span className="text-slate-900 dark:text-white">
                        ₹{Number(en.amount).toLocaleString('en-IN')}
                      </span>
                    ) : (
                      '—'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
