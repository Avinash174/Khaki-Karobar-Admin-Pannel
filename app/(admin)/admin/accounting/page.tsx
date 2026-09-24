'use client';

import React from 'react';
import Link from 'next/link';
import { Calculator, BookOpen, FileSpreadsheet, TrendingUp, DollarSign, ArrowRight, Landmark } from 'lucide-react';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

export default function AccountingOverviewPage() {
  const cards = [
    {
      title: 'General Ledger',
      desc: 'Double-entry account balances, debits, credits, and customer/vendor transaction statements.',
      href: '/admin/accounting/ledger',
      icon: BookOpen,
      stat: 'Live Day Book',
      statLabel: 'Real-time Ledgers',
    },
    {
      title: 'Journal Entries',
      desc: 'Create manual journal vouchers, adjustment entries, and asset depreciation postings.',
      href: '/admin/accounting/journal',
      icon: FileSpreadsheet,
      stat: '18 Vouchers',
      statLabel: 'Current Month',
    },
    {
      title: 'Expenses Tracker',
      desc: 'Operational overheads, utility bills, logistics costs, and staff salaries.',
      href: '/admin/expenses',
      icon: DollarSign,
      stat: '₹14,250',
      statLabel: 'Recorded Expenses',
    },
    {
      title: 'Profit & Loss Statement',
      desc: 'Accrual-based income vs expenses statement with gross margin and net profit.',
      href: '/admin/reports/profit-loss',
      icon: TrendingUp,
      stat: '₹15,164 Net',
      statLabel: 'Net Profit Margin',
    },
    {
      title: 'Balance Sheet',
      desc: 'Assets, current liabilities, proprietor capital, and reserves statement.',
      href: '/admin/reports/balance-sheet',
      icon: Landmark,
      stat: 'Balanced',
      statLabel: 'Accounting Health',
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <AdminBreadcrumb />

      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <Calculator className="w-6 h-6 text-red-600" />
          <span>Accounting & Financial Ledgers</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Double-entry bookkeeping, Day Book, manual journal vouchers, and audit statements.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.title}
              href={c.href}
              className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-red-600/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-red-600/10 text-red-600 dark:text-red-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-red-600 transition-colors">
                  {c.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {c.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-slate-900 dark:text-white text-xs">{c.stat}</span>
                  <span className="text-[10px] text-slate-400 block">{c.statLabel}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
