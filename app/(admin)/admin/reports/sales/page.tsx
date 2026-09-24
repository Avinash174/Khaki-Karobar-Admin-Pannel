'use client';

import React from 'react';
import { TrendingUp, Download, Calendar, Filter } from 'lucide-react';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

export default function SalesReportPage() {
  const data = [
    { period: 'Week 1 (Sep 01 - Sep 07)', count: 18, revenue: 64200, gst: 11556, netSales: 52644 },
    { period: 'Week 2 (Sep 08 - Sep 14)', count: 24, revenue: 89400, gst: 16092, netSales: 73308 },
    { period: 'Week 3 (Sep 15 - Sep 21)', count: 31, revenue: 112000, gst: 20160, netSales: 91840 },
    { period: 'Week 4 (Sep 22 - Sep 28)', count: 14, revenue: 45500, gst: 8190, netSales: 37310 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <AdminBreadcrumb
        customItems={[
          { label: 'Reports', href: '/admin/reports' },
          { label: 'Sales Report' },
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-red-600" />
            <span>Periodic Sales Analytics & Tax Breakdown</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Weekly and monthly billed revenue, outward tax liability, and sales velocity.
          </p>
        </div>

        <button
          onClick={() => alert('Exporting Sales Report to Excel / CSV')}
          className="px-4 py-2 bg-white dark:bg-[#121927] border border-slate-200 dark:border-[#222E42] text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm flex items-center gap-1.5"
        >
          <Download className="w-4 h-4 text-red-600" />
          <span>Export CSV</span>
        </button>
      </div>

      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#0B0F19] border-b border-slate-200/80 dark:border-[#222E42] text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">Billing Period</th>
                <th className="p-4">Invoices Issued</th>
                <th className="p-4">Taxable Outward (₹)</th>
                <th className="p-4">GST Collected (₹)</th>
                <th className="p-4 text-right">Gross Total Revenue (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {data.map((d, i) => (
                <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-bold text-slate-900 dark:text-white">{d.period}</td>
                  <td className="p-4 font-mono">{d.count} Invoices</td>
                  <td className="p-4 font-mono text-slate-700 dark:text-slate-300">₹{d.netSales.toLocaleString('en-IN')}</td>
                  <td className="p-4 font-mono text-slate-500">₹{d.gst.toLocaleString('en-IN')}</td>
                  <td className="p-4 text-right font-mono font-bold text-slate-900 dark:text-white text-sm">
                    ₹{d.revenue.toLocaleString('en-IN')}
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
