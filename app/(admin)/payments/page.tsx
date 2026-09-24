'use client';

import React, { useState, useEffect } from 'react';
import { paymentService } from '@/lib/api';

export default function PaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div>
        <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Payment Reconciliation Ledger</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Receipts received via Cash, UPI, and Bank transfer
        </p>
      </div>

      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm space-y-4">
        {loading ? (
          <div className="py-16 text-center text-slate-400 text-xs">Loading payments...</div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-200/80 dark:border-[#222E42]">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-[#1A2333] border-b border-slate-200/80 dark:border-[#222E42] text-slate-400 font-semibold uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4">Receipt #</th>
                  <th className="py-3 px-4">Method</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#1E293B]">
                {payments.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-400">
                      No payment receipts recorded yet.
                    </td>
                  </tr>
                ) : (
                  payments.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white font-mono">
                        {p.receiptNumber ?? `REC-${p.id.slice(0, 6)}`}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {p.paymentMethod}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-500 text-[11px]">
                        {new Date(p.createdAt || Date.now()).toLocaleDateString('en-IN')}
                      </td>
                      <td className="py-3 px-4 text-right font-black font-mono text-emerald-600 dark:text-emerald-400">
                        ₹{Number(p.amount ?? 0).toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
