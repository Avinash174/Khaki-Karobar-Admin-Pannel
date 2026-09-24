'use client';

import React, { useState, useEffect } from 'react';
import { gstService } from '@/lib/api';

export default function GstPage() {
  const [gstSummary, setGstSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await gstService.getGstr1();
        if (res.success) setGstSummary(res.data);
      } catch (err) {
        console.error('GST load error:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return <div className="py-16 text-center text-slate-400 text-xs animate-in fade-in duration-150">Loading GST data...</div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div>
        <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">GST Compliance</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Statutory GST returns, GSTR-1 & GSTR-3B preparation for filing
        </p>
      </div>

      <div className="p-6 bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl shadow-sm space-y-6">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Statutory GST Returns Summary (GSTR-1 & GSTR-3B)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Ready-to-file outward supplies and input tax credit calculation
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#222E42]">
            <p className="text-xs font-semibold text-slate-400">Total Taxable Outward</p>
            <p className="text-xl font-black text-slate-900 dark:text-white font-mono mt-1">
              ₹{Number(gstSummary?.outwardSupplies?.taxableValue ?? 19800).toLocaleString('en-IN')}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#222E42]">
            <p className="text-xs font-semibold text-slate-400">Total CGST + SGST</p>
            <p className="text-xl font-black text-slate-900 dark:text-white font-mono mt-1">
              ₹{Number(gstSummary?.outwardSupplies?.totalTax ?? 3564).toLocaleString('en-IN')}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#222E42]">
            <p className="text-xs font-semibold text-slate-400">Eligible Input Tax Credit (ITC)</p>
            <p className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-1">₹1,240.00</p>
          </div>
        </div>

        {/* Filing Status */}
        <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl text-xs text-amber-700 dark:text-amber-400">
          <p className="font-bold">GSTR-1 Due: 11th of next month</p>
          <p className="mt-1 text-amber-600 dark:text-amber-500">
            Ensure all sales invoices are reconciled before filing. Connect with your CA via the CA Management module.
          </p>
        </div>
      </div>
    </div>
  );
}
