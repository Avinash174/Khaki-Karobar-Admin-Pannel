'use client';

import React from 'react';
import { Users, Download } from 'lucide-react';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

export default function CustomerReportPage() {
  const data = [
    { name: 'Ramesh Chandra (Shree Traders)', totalPurchased: 84500, outstanding: 12450, paymentScore: '98%', status: 'Active' },
    { name: 'Pooja Kulkarni (Nexus Retail)', totalPurchased: 45000, outstanding: 0, paymentScore: '100%', status: 'Prompt Pay' },
    { name: 'Amit Patel (Gujarat Steels)', totalPurchased: 120000, outstanding: 34000, paymentScore: '85%', status: 'Credit Active' },
    { name: 'Deepak Verma', totalPurchased: 28000, outstanding: 0, paymentScore: '100%', status: 'Prompt Pay' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <AdminBreadcrumb
        customItems={[
          { label: 'Reports', href: '/admin/reports' },
          { label: 'Customer Report' },
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-red-600" />
            <span>Customer Sales Ledger & Outstanding Aging</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Lifetime billed volume, collection aging, and customer payment consistency.
          </p>
        </div>

        <button
          onClick={() => alert('Exporting Customer Report')}
          className="px-4 py-2 bg-white dark:bg-[#121927] border border-slate-200 dark:border-[#222E42] text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm flex items-center gap-1.5"
        >
          <Download className="w-4 h-4 text-red-600" />
          <span>Export Receivables</span>
        </button>
      </div>

      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#0B0F19] border-b border-slate-200/80 dark:border-[#222E42] text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">Customer Account</th>
                <th className="p-4">Lifetime Billed (₹)</th>
                <th className="p-4">Outstanding Due (₹)</th>
                <th className="p-4">Payment Health</th>
                <th className="p-4 text-right">Account Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {data.map((d, i) => (
                <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-bold text-slate-900 dark:text-white">{d.name}</td>
                  <td className="p-4 font-mono font-semibold text-slate-900 dark:text-white">₹{d.totalPurchased.toLocaleString('en-IN')}</td>
                  <td className="p-4 font-mono font-bold text-amber-600 dark:text-amber-400">
                    ₹{d.outstanding.toLocaleString('en-IN')}
                  </td>
                  <td className="p-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">{d.paymentScore}</td>
                  <td className="p-4 text-right">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {d.status}
                    </span>
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
