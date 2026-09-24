'use client';

import React from 'react';
import { ShoppingCart, Download } from 'lucide-react';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

export default function PurchaseReportPage() {
  const data = [
    { vendor: 'Agarwal Textiles Mills', category: 'Raw Materials & Fabric', poCount: 5, taxable: 84000, itc: 15120, total: 99120 },
    { vendor: 'Maharashtra Paper & Packaging', category: 'Packaging Materials', poCount: 3, taxable: 22000, itc: 2640, total: 24640 },
    { vendor: 'Jain Buttons & Accessories', category: 'Hardware & Trims', poCount: 2, taxable: 14500, itc: 2610, total: 17110 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <AdminBreadcrumb
        customItems={[
          { label: 'Reports', href: '/admin/reports' },
          { label: 'Purchase Report' },
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-red-600" />
            <span>Vendor Purchases & ITC Ledger</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Supplier-wise purchases, raw material costs, and eligible input tax credits.
          </p>
        </div>

        <button
          onClick={() => alert('Exporting Purchase Report')}
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
                <th className="p-4">Vendor / Supplier</th>
                <th className="p-4">Category</th>
                <th className="p-4">Orders Inward</th>
                <th className="p-4">Taxable Cost (₹)</th>
                <th className="p-4">Input Tax Credit (₹)</th>
                <th className="p-4 text-right">Total Inward Bill (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {data.map((d, i) => (
                <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-bold text-slate-900 dark:text-white">{d.vendor}</td>
                  <td className="p-4 text-slate-500">{d.category}</td>
                  <td className="p-4 font-mono">{d.poCount} POs</td>
                  <td className="p-4 font-mono text-slate-700 dark:text-slate-300">₹{d.taxable.toLocaleString('en-IN')}</td>
                  <td className="p-4 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">₹{d.itc.toLocaleString('en-IN')}</td>
                  <td className="p-4 text-right font-mono font-bold text-slate-900 dark:text-white text-sm">
                    ₹{d.total.toLocaleString('en-IN')}
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
