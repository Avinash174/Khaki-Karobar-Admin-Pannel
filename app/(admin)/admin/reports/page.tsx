'use client';

import React from 'react';
import Link from 'next/link';
import {
  BarChart3,
  TrendingUp,
  ShoppingCart,
  Boxes,
  Users,
  Building2,
  Landmark,
  FileSpreadsheet,
  ArrowRight,
  Download,
} from 'lucide-react';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

export default function ReportsHubPage() {
  const reports = [
    { title: 'Sales Report', desc: 'Item-wise, customer-wise and date-wise revenue and tax reports.', href: '/admin/reports/sales', icon: TrendingUp, tag: 'Revenue' },
    { title: 'Purchase Report', desc: 'Vendor purchases, inward tax credit, and material procurement.', href: '/admin/reports/purchase', icon: ShoppingCart, tag: 'Procurement' },
    { title: 'Inventory Aging Report', desc: 'Dead stock, fast-moving items, and stock valuation breakdown.', href: '/admin/reports/inventory', icon: Boxes, tag: 'Stock' },
    { title: 'Customer Outstanding', desc: 'Aging receivables, credit balances, and payment recovery ledger.', href: '/admin/reports/customer', icon: Users, tag: 'Receivables' },
    { title: 'Profit & Loss Statement', desc: 'Accrual-based income vs expenses statement with gross and net margins.', href: '/admin/reports/profit-loss', icon: FileSpreadsheet, tag: 'Financials' },
    { title: 'Balance Sheet', desc: 'Assets vs liabilities statement for accounting audit and tax filings.', href: '/admin/reports/balance-sheet', icon: Landmark, tag: 'Audit' },
    { title: 'GST Compliance (GSTR-1 & 3B)', desc: 'B2B/B2C invoice summaries, HSN tables, and monthly return sheets.', href: '/admin/reports/gst', icon: Building2, tag: 'Statutory' },
    { title: 'Business Analytics', desc: 'Interactive KPI charts, customer retention cohorts, and growth trends.', href: '/admin/reports/analytics', icon: BarChart3, tag: 'BI Insights' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <AdminBreadcrumb />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-red-600" />
            <span>Reports & Business Intelligence Hub</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Comprehensive financial statements, GST filings, sales audits, and inventory analytics.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {reports.map((r) => {
          const Icon = r.icon;
          return (
            <Link
              key={r.title}
              href={r.href}
              className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-red-600/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-red-600/10 text-red-600 dark:text-red-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {r.tag}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-red-600 transition-colors">
                  {r.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {r.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-red-600 transition-colors">
                <span>Generate Report</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
