'use client';

import React, { useState } from 'react';
import { FileSpreadsheet, Plus, Search, CheckCircle2 } from 'lucide-react';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

interface JournalVoucher {
  id: string;
  voucherNumber: string;
  date: string;
  narration: string;
  debitAccount: string;
  creditAccount: string;
  amount: number;
}

const INITIAL_VOUCHERS: JournalVoucher[] = [
  { id: 'jv-1', voucherNumber: 'JV-2026-012', date: '2026-09-24', narration: 'Depreciation on Office IT & Sewing Machines for Q2', debitAccount: 'Depreciation Expense', creditAccount: 'Accumulated Depreciation', amount: 4500 },
  { id: 'jv-2', voucherNumber: 'JV-2026-011', date: '2026-09-21', narration: 'Reclassification of sample fabric to Marketing Expense', debitAccount: 'Marketing & Samples', creditAccount: 'Raw Material Inventory', amount: 2800 },
];

export default function JournalEntriesPage() {
  const [vouchers, setVouchers] = useState<JournalVoucher[]>(INITIAL_VOUCHERS);

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <AdminBreadcrumb
        customItems={[
          { label: 'Accounting', href: '/admin/accounting' },
          { label: 'Journal Entries' },
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <FileSpreadsheet className="w-6 h-6 text-red-600" />
            <span>Manual Journal Vouchers</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Create double-entry adjustment entries, depreciation postings, and year-end audits.
          </p>
        </div>

        <button
          onClick={() => alert('New Journal Voucher Dialog')}
          className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-red-600/30 flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create Journal Voucher</span>
        </button>
      </div>

      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#0B0F19] border-b border-slate-200/80 dark:border-[#222E42] text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">Voucher #</th>
                <th className="p-4">Date</th>
                <th className="p-4">Debit Account</th>
                <th className="p-4">Credit Account</th>
                <th className="p-4">Narration</th>
                <th className="p-4 text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {vouchers.map((jv) => (
                <tr key={jv.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-mono font-bold text-slate-900 dark:text-white">{jv.voucherNumber}</td>
                  <td className="p-4 font-mono text-slate-500">{jv.date}</td>
                  <td className="p-4 font-semibold text-emerald-600 dark:text-emerald-400">{jv.debitAccount}</td>
                  <td className="p-4 font-semibold text-rose-600 dark:text-rose-400">{jv.creditAccount}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-300 max-w-xs">{jv.narration}</td>
                  <td className="p-4 text-right font-mono font-bold text-slate-900 dark:text-white text-sm">
                    ₹{jv.amount.toLocaleString('en-IN')}
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
