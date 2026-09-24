'use client';

import React from 'react';
import { Boxes, Download } from 'lucide-react';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

export default function InventoryReportPage() {
  const data = [
    { category: 'Workwear Uniforms', items: 14, inStockQty: 680, valuation: 578000, turnover: 'Fast' },
    { category: 'Security Equipment', items: 8, inStockQty: 240, valuation: 192000, turnover: 'Moderate' },
    { category: 'Footwear & Boots', items: 6, inStockQty: 180, valuation: 270000, turnover: 'Fast' },
    { category: 'Safety Accessories & Belts', items: 11, inStockQty: 320, valuation: 80000, turnover: 'Slow' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <AdminBreadcrumb
        customItems={[
          { label: 'Reports', href: '/admin/reports' },
          { label: 'Inventory Report' },
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Boxes className="w-6 h-6 text-red-600" />
            <span>Inventory Valuation & Turnover Audit</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Category-wise stock holdings, asset valuation at cost, and moving velocity.
          </p>
        </div>

        <button
          onClick={() => alert('Exporting Inventory Report')}
          className="px-4 py-2 bg-white dark:bg-[#121927] border border-slate-200 dark:border-[#222E42] text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm flex items-center gap-1.5"
        >
          <Download className="w-4 h-4 text-red-600" />
          <span>Export Valuation</span>
        </button>
      </div>

      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#0B0F19] border-b border-slate-200/80 dark:border-[#222E42] text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">Category</th>
                <th className="p-4">Catalog SKUs</th>
                <th className="p-4">Total Stock Qty</th>
                <th className="p-4">Turnover Speed</th>
                <th className="p-4 text-right">Total Valuation (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {data.map((d, i) => (
                <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-bold text-slate-900 dark:text-white">{d.category}</td>
                  <td className="p-4 font-mono">{d.items} SKUs</td>
                  <td className="p-4 font-mono text-slate-700 dark:text-slate-300">{d.inStockQty} Units</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {d.turnover}
                    </span>
                  </td>
                  <td className="p-4 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                    ₹{d.valuation.toLocaleString('en-IN')}
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
