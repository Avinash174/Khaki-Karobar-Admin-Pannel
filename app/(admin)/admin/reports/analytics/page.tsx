'use client';

import React from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { RevenueChart } from '@/components/RevenueChart';
import { SalesVsPurchasesChart } from '@/components/SalesVsPurchasesChart';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

export default function BusinessAnalyticsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <AdminBreadcrumb
        customItems={[
          { label: 'Reports', href: '/admin/reports' },
          { label: 'Business Analytics' },
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-red-600" />
            <span>Business Analytics & Growth Trends</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Predictive sales curves, customer retention metrics, and gross profit velocity.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] shadow-sm">
          <p className="text-xs text-slate-400">Monthly Run-rate</p>
          <p className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">₹3,40,000</p>
          <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-0.5 mt-1">
            <ArrowUpRight className="w-3 h-3" /> +18.4% MoM
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] shadow-sm">
          <p className="text-xs text-slate-400">Avg. Basket Size</p>
          <p className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">₹2,450</p>
          <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-0.5 mt-1">
            <ArrowUpRight className="w-3 h-3" /> +4.2% Higher
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] shadow-sm">
          <p className="text-xs text-slate-400">Customer Retention</p>
          <p className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">84.2%</p>
          <span className="text-[10px] text-purple-500 font-bold mt-1 block">Repeat Buyers</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] shadow-sm">
          <p className="text-xs text-slate-400">Inventory Turnover</p>
          <p className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">4.2x</p>
          <span className="text-[10px] text-emerald-500 font-bold mt-1 block">Annualized Turns</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-5 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">Revenue Trajectory</h2>
          <RevenueChart />
        </div>
        <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-5 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">Sales vs Purchases Spread</h2>
          <SalesVsPurchasesChart />
        </div>
      </div>
    </div>
  );
}
