'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { RotateCcw, Plus, Search, CheckCircle2 } from 'lucide-react';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

interface SalesReturn {
  id: string;
  cnNumber: string;
  originalInvoice: string;
  customerName: string;
  returnDate: string;
  reason: string;
  amount: number;
  status: 'PROCESSED' | 'PENDING_APPROVAL';
}

const INITIAL_RETURNS: SalesReturn[] = [
  { id: 'ret-1', cnNumber: 'CN-2026-004', originalInvoice: 'INV-202609-0002', customerName: 'Ramesh Chandra', returnDate: '2026-09-22', reason: 'Size Mismatch (Exchanged for Size L)', amount: 1700, status: 'PROCESSED' },
  { id: 'ret-2', cnNumber: 'CN-2026-005', originalInvoice: 'INV-202609-0005', customerName: 'Pooja Kulkarni', returnDate: '2026-09-23', reason: 'Transit Packaging Defect', amount: 3400, status: 'PENDING_APPROVAL' },
];

export default function SalesReturnsPage() {
  const [returns, setReturns] = useState<SalesReturn[]>(INITIAL_RETURNS);
  const [search, setSearch] = useState('');

  const filtered = returns.filter(
    (r) =>
      r.cnNumber.toLowerCase().includes(search.toLowerCase()) ||
      r.customerName.toLowerCase().includes(search.toLowerCase()) ||
      r.originalInvoice.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <AdminBreadcrumb
        customItems={[
          { label: 'Sales', href: '/admin/sales' },
          { label: 'Sales Returns' },
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <RotateCcw className="w-6 h-6 text-red-600" />
            <span>Sales Returns & Credit Notes</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage merchandise returns, credit note issuances, and GST output tax reversals.
          </p>
        </div>

        <button
          onClick={() => alert('New Credit Note created')}
          className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-red-600/30 flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>+ Issue Credit Note</span>
        </button>
      </div>

      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-4 shadow-sm">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Credit Note #, Invoice #, or customer..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-red-600"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#0B0F19] border-b border-slate-200/80 dark:border-[#222E42] text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">Credit Note #</th>
                <th className="p-4">Original Invoice</th>
                <th className="p-4">Customer Name</th>
                <th className="p-4">Date</th>
                <th className="p-4">Return Reason</th>
                <th className="p-4">Credit Amount</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-mono font-bold text-slate-900 dark:text-white">
                    {r.cnNumber}
                  </td>
                  <td className="p-4 font-mono text-slate-600 dark:text-slate-300">
                    {r.originalInvoice}
                  </td>
                  <td className="p-4 font-semibold text-slate-800 dark:text-slate-200">
                    {r.customerName}
                  </td>
                  <td className="p-4 text-slate-500">{r.returnDate}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">{r.reason}</td>
                  <td className="p-4 font-mono font-bold text-rose-600 dark:text-rose-400 text-sm">
                    ₹{r.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="p-4 text-right">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        r.status === 'PROCESSED'
                          ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200'
                          : 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 border border-amber-200'
                      }`}
                    >
                      {r.status}
                    </span>
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
