'use client';

import React, { useState, useEffect } from 'react';
import { CreditCard, Plus, Search, CheckCircle2, ArrowRight } from 'lucide-react';
import { paymentService } from '@/lib/api';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterMode, setFilterMode] = useState('ALL');

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await paymentService.getPayments();
        if (res.success) setPayments(res.data || []);
      } catch (err) {
        console.error('Payments load error:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = payments.filter((p) => {
    const matchesSearch =
      (p.receiptNumber ?? '').toLowerCase().includes(search.toLowerCase()) ||
      (p.customerName ?? '').toLowerCase().includes(search.toLowerCase()) ||
      (p.notes ?? '').toLowerCase().includes(search.toLowerCase());
    const matchesMode = filterMode === 'ALL' || p.method === filterMode;
    return matchesSearch && matchesMode;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <AdminBreadcrumb />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-red-600" />
            <span>Payments & Collections Ledger</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Receipt reconciliation across Cash, UPI, and Bank transfer payment modes.
          </p>
        </div>

        <button
          onClick={() => alert('Record Payment modal')}
          className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-red-600/30 flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>+ Record Payment</span>
        </button>
      </div>

      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search payments by receipt # or customer..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-red-600"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          {['ALL', 'UPI', 'CASH', 'BANK_TRANSFER'].map((mode) => (
            <button
              key={mode}
              onClick={() => setFilterMode(mode)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors shrink-0 ${
                filterMode === mode
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#0B0F19] border-b border-slate-200/80 dark:border-[#222E42] text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">Receipt #</th>
                <th className="p-4">Payment Method</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Customer Account</th>
                <th className="p-4 text-right">Amount Received</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">Loading payments...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">No payment receipts found.</td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 font-mono font-bold text-slate-900 dark:text-white">
                      {p.receiptNumber ?? `REC-${p.id.slice(0, 6)}`}
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold font-mono text-[11px]">
                        {p.method || 'UPI'}
                      </span>
                    </td>
                    <td className="p-4 text-slate-500">
                      {new Date(p.createdAt || Date.now()).toLocaleString('en-IN')}
                    </td>
                    <td className="p-4 font-semibold text-slate-800 dark:text-slate-200">
                      {p.customerName || 'Direct Counter Billing'}
                    </td>
                    <td className="p-4 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                      ₹{Number(p.amount || 0).toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
