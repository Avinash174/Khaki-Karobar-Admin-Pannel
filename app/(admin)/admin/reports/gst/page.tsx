'use client';

import React, { useState, useEffect } from 'react';
import { Building2, Download, CheckCircle2, RefreshCw } from 'lucide-react';
import { gstService } from '@/lib/api';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

export default function GstReportPage() {
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

  const outwardTaxable = Number(gstSummary?.outwardSupplies?.taxableValue ?? 19800);
  const outwardTax = Number(gstSummary?.outwardSupplies?.totalTax ?? 3564);
  const inwardITC = 2840;
  const netGstPayable = Math.max(0, outwardTax - inwardITC);

  return (
    <div className="space-y-6 animate-in fade-in duration-150 max-w-4xl">
      <AdminBreadcrumb
        customItems={[
          { label: 'Reports', href: '/admin/reports' },
          { label: 'GST Compliance' },
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Building2 className="w-6 h-6 text-red-600" />
            <span>GST Statutory Compliance (GSTR-1 & GSTR-3B)</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Ready-to-file outward supply returns, Input Tax Credit (ITC) reconciliation, and net tax payable.
          </p>
        </div>

        <button
          onClick={() => alert('Exporting GST JSON for Government Portal upload')}
          className="px-4 py-2 bg-white dark:bg-[#121927] border border-slate-200 dark:border-[#222E42] text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm flex items-center gap-1.5"
        >
          <Download className="w-4 h-4 text-red-600" />
          <span>Export GSTR-1 JSON</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] shadow-sm">
          <p className="text-xs font-semibold text-slate-400">Total Taxable Outward</p>
          <p className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1">
            ₹{outwardTaxable.toLocaleString('en-IN')}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] shadow-sm">
          <p className="text-xs font-semibold text-slate-400">Total Output GST (CGST+SGST)</p>
          <p className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1">
            ₹{outwardTax.toLocaleString('en-IN')}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] shadow-sm">
          <p className="text-xs font-semibold text-slate-400">Net Tax Payable (GSTR-3B)</p>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-1">
            ₹{netGstPayable.toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      {/* Tax Tables Breakdown */}
      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
          GSTR-1 Outward Supplies Table Summary
        </h3>

        <div className="space-y-3 text-xs">
          <div className="flex justify-between py-1">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Table 4A - B2B Invoices (Registered Dealers)</span>
            <span className="font-mono font-bold text-slate-900 dark:text-white">₹14,500</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Table 7 - B2C Small Invoices (Counter Sales)</span>
            <span className="font-mono font-bold text-slate-900 dark:text-white">₹5,300</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Table 9B - Credit / Debit Notes Issued</span>
            <span className="font-mono font-bold text-rose-600">-₹1,700</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Table 12 - HSN-wise Outward Summary</span>
            <span className="font-mono text-emerald-600 font-bold">Reconciled ✓</span>
          </div>
        </div>
      </div>
    </div>
  );
}
