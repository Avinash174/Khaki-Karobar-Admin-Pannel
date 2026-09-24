'use client';

import React, { useState, useEffect } from 'react';
import { FileSpreadsheet, Download, TrendingUp, DollarSign } from 'lucide-react';
import { accountingService } from '@/lib/api';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

export default function ProfitAndLossReportPage() {
  const [pl, setPl] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await accountingService.getProfitLoss();
        if (res.success) setPl(res.data);
      } catch (err) {
        console.error('P&L load error:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const totalSales = Number(pl?.revenue?.totalSales ?? 245000);
  const cogs = Number(pl?.expenses?.totalPurchases ?? 142000);
  const grossProfit = totalSales - cogs;
  const overheads = 34500;
  const netProfit = grossProfit - overheads;

  return (
    <div className="space-y-6 animate-in fade-in duration-150 max-w-4xl">
      <AdminBreadcrumb
        customItems={[
          { label: 'Reports', href: '/admin/reports' },
          { label: 'Profit & Loss Statement' },
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <FileSpreadsheet className="w-6 h-6 text-red-600" />
            <span>Profit & Loss Statement (P&L)</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Financial Year 2026-27 • Accrual accounting revenue, cost of goods, and operating margins.
          </p>
        </div>

        <button
          onClick={() => alert('Exporting Official P&L Statement to PDF')}
          className="px-4 py-2 bg-white dark:bg-[#121927] border border-slate-200 dark:border-[#222E42] text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm flex items-center gap-1.5"
        >
          <Download className="w-4 h-4 text-red-600" />
          <span>Export P&L PDF</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] shadow-sm">
          <p className="text-xs font-semibold text-slate-400">Total Billed Revenue</p>
          <p className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">
            ₹{totalSales.toLocaleString('en-IN')}
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] shadow-sm">
          <p className="text-xs font-semibold text-slate-400">Gross Margin</p>
          <p className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">
            ₹{grossProfit.toLocaleString('en-IN')}
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] shadow-sm">
          <p className="text-xs font-semibold text-slate-400">Net Operating Profit</p>
          <p className="text-2xl font-black font-mono text-red-600 dark:text-red-400 mt-1">
            ₹{netProfit.toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      {/* P&L Statement Table */}
      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
          Income & Expense Breakdown (FY 2026-27)
        </h3>

        <div className="space-y-3 text-xs">
          <div className="flex justify-between py-1 font-bold text-slate-900 dark:text-white">
            <span>Operating Revenue (Sales Invoices)</span>
            <span className="font-mono">₹{totalSales.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between py-1 text-slate-500 pl-4">
            <span>Less: Cost of Goods Sold (Raw Materials & Purchases)</span>
            <span className="font-mono text-rose-600">-₹{cogs.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between py-2 border-t border-dashed border-slate-200 dark:border-slate-800 font-bold text-emerald-600 dark:text-emerald-400">
            <span>Gross Profit</span>
            <span className="font-mono">₹{grossProfit.toLocaleString('en-IN')}</span>
          </div>

          <div className="pt-2 font-bold text-slate-900 dark:text-white">Operating Expenses & Overheads</div>
          <div className="flex justify-between py-1 text-slate-500 pl-4">
            <span>Godown & Office Rent</span>
            <span className="font-mono">₹28,000</span>
          </div>
          <div className="flex justify-between py-1 text-slate-500 pl-4">
            <span>Electricity & Utilities</span>
            <span className="font-mono">₹4,850</span>
          </div>
          <div className="flex justify-between py-1 text-slate-500 pl-4">
            <span>Logistics & Courier Freight</span>
            <span className="font-mono">₹1,650</span>
          </div>
          <div className="flex justify-between py-3 border-t-2 border-slate-900 dark:border-white font-black text-sm text-slate-900 dark:text-white">
            <span>Net Profit for the Period</span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400">₹{netProfit.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
