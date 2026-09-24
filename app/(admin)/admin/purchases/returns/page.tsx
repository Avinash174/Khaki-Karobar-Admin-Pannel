'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { RotateCcw, Search, Plus, CheckCircle2 } from 'lucide-react';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

interface PurchaseReturn {
  id: string;
  dnNumber: string;
  vendorName: string;
  originalPO: string;
  returnDate: string;
  reason: string;
  amount: number;
  status: 'CLAIMED' | 'SETTLED';
}

const INITIAL_PURCHASE_RETURNS: PurchaseReturn[] = [
  { id: 'pr-1', dnNumber: 'DN-2026-002', vendorName: 'Maharashtra Paper & Packaging', originalPO: 'PO-2026-028', returnDate: '2026-09-21', reason: 'Damaged Corrugated Boxes in Transit', amount: 6400, status: 'SETTLED' },
  { id: 'pr-2', dnNumber: 'DN-2026-003', vendorName: 'Agarwal Textiles Mills', originalPO: 'PO-2026-031', returnDate: '2026-09-24', reason: 'Fabric Color Shade Variance (Batch B)', amount: 12200, status: 'CLAIMED' },
];

export default function PurchaseReturnsPage() {
  const [returns, setReturns] = useState<PurchaseReturn[]>(INITIAL_PURCHASE_RETURNS);
  const [search, setSearch] = useState('');

  const filtered = returns.filter(
    (r) =>
      r.dnNumber.toLowerCase().includes(search.toLowerCase()) ||
      r.vendorName.toLowerCase().includes(search.toLowerCase()) ||
      r.originalPO.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <AdminBreadcrumb
        customItems={[
          { label: 'Purchases', href: '/admin/purchases' },
          { label: 'Purchase Returns' },
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <RotateCcw className="w-6 h-6 text-red-600" />
            <span>Purchase Returns & Debit Notes</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Issue debit notes to vendors for damaged goods, wrong shipments, and input tax credit adjustments.
          </p>
        </div>

        <button
          onClick={() => alert('New Debit Note Created!')}
          className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-red-600/30 flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>+ Issue Debit Note</span>
        </button>
      </div>

      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-4 shadow-sm">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search debit notes by DN #, PO #, or vendor..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-red-600"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#0B0F19] border-b border-slate-200/80 dark:border-[#222E42] text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">Debit Note #</th>
                <th className="p-4">Vendor / Supplier</th>
                <th className="p-4">Original PO</th>
                <th className="p-4">Date</th>
                <th className="p-4">Reason</th>
                <th className="p-4">Claimed Amount</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-mono font-bold text-slate-900 dark:text-white">
                    {r.dnNumber}
                  </td>
                  <td className="p-4 font-semibold text-slate-800 dark:text-slate-200">
                    {r.vendorName}
                  </td>
                  <td className="p-4 font-mono text-slate-600 dark:text-slate-300">
                    {r.originalPO}
                  </td>
                  <td className="p-4 text-slate-500">{r.returnDate}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">{r.reason}</td>
                  <td className="p-4 font-mono font-bold text-rose-600 dark:text-rose-400 text-sm">
                    ₹{r.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="p-4 text-right">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        r.status === 'SETTLED'
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
