'use client';

import React from 'react';
import { Landmark, Download } from 'lucide-react';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

export default function BalanceSheetPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-150 max-w-4xl">
      <AdminBreadcrumb
        customItems={[
          { label: 'Reports', href: '/admin/reports' },
          { label: 'Balance Sheet' },
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Landmark className="w-6 h-6 text-red-600" />
            <span>Balance Sheet (Assets & Liabilities)</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            As of 24 September 2026 • Financial position and business capitalization statement.
          </p>
        </div>

        <button
          onClick={() => alert('Exporting Balance Sheet to PDF')}
          className="px-4 py-2 bg-white dark:bg-[#121927] border border-slate-200 dark:border-[#222E42] text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm flex items-center gap-1.5"
        >
          <Download className="w-4 h-4 text-red-600" />
          <span>Export PDF</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Assets Card */}
        <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Assets (₹)
            </h2>
            <span className="text-xs font-mono font-bold text-emerald-600">Total: ₹14,20,500</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="font-semibold text-slate-800 dark:text-slate-200">Current Assets</div>
            <div className="flex justify-between pl-3 text-slate-500">
              <span>Cash & Bank Balances (HDFC Operating)</span>
              <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">₹3,40,000</span>
            </div>
            <div className="flex justify-between pl-3 text-slate-500">
              <span>Accounts Receivable (Sundry Debtors)</span>
              <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">₹1,85,500</span>
            </div>
            <div className="flex justify-between pl-3 text-slate-500">
              <span>Closing Stock / Inventory Valuation</span>
              <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">₹6,45,000</span>
            </div>

            <div className="font-semibold text-slate-800 dark:text-slate-200 pt-2">Fixed / Non-Current Assets</div>
            <div className="flex justify-between pl-3 text-slate-500">
              <span>Plant Machinery & Sewing Tools</span>
              <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">₹1,80,000</span>
            </div>
            <div className="flex justify-between pl-3 text-slate-500">
              <span>Office IT Infrastructure & Computers</span>
              <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">₹70,000</span>
            </div>

            <div className="flex justify-between pt-3 border-t-2 border-slate-900 dark:border-white font-black text-sm text-slate-900 dark:text-white">
              <span>Total Assets</span>
              <span className="font-mono text-emerald-600">₹14,20,500</span>
            </div>
          </div>
        </div>

        {/* Liabilities Card */}
        <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Liabilities & Equity (₹)
            </h2>
            <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">Total: ₹14,20,500</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="font-semibold text-slate-800 dark:text-slate-200">Current Liabilities</div>
            <div className="flex justify-between pl-3 text-slate-500">
              <span>Accounts Payable (Sundry Creditors)</span>
              <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">₹85,000</span>
            </div>
            <div className="flex justify-between pl-3 text-slate-500">
              <span>GST Statutory Tax Payable (Net)</span>
              <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">₹12,500</span>
            </div>

            <div className="font-semibold text-slate-800 dark:text-slate-200 pt-2">Owner's Equity & Reserves</div>
            <div className="flex justify-between pl-3 text-slate-500">
              <span>Initial Partner Capital</span>
              <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">₹10,00,000</span>
            </div>
            <div className="flex justify-between pl-3 text-slate-500">
              <span>Retained Business Earnings (Cumulative)</span>
              <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">₹3,23,000</span>
            </div>

            <div className="flex justify-between pt-3 border-t-2 border-slate-900 dark:border-white font-black text-sm text-slate-900 dark:text-white">
              <span>Total Liabilities & Equity</span>
              <span className="font-mono text-slate-900 dark:text-white">₹14,20,500</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
