'use client';

import React, { useState } from 'react';
import { SlidersHorizontal, Plus, Search, CheckCircle2 } from 'lucide-react';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

interface StockAdjustment {
  id: string;
  reference: string;
  productName: string;
  warehouse: string;
  adjustmentType: 'DAMAGED' | 'PHYSICAL_COUNT_DISCREPANCY' | 'WRITE_OFF' | 'SURPLUS_FOUND';
  qtyChange: number;
  date: string;
  author: string;
}

const INITIAL_ADJUSTMENTS: StockAdjustment[] = [
  { id: 'adj-1', reference: 'ADJ-2026-001', productName: 'Khaki Cotton Workwear Shirt (Size L)', warehouse: 'Central Pune Godown', adjustmentType: 'DAMAGED', qtyChange: -2, date: '2026-09-22', author: 'Sanjay More' },
  { id: 'adj-2', reference: 'ADJ-2026-002', productName: 'Safety Work Shoes (Steel Toe)', warehouse: 'Bhiwandi Depot', adjustmentType: 'SURPLUS_FOUND', qtyChange: +3, date: '2026-09-23', author: 'Nilesh Sawant' },
];

export default function StockAdjustmentsPage() {
  const [adjustments, setAdjustments] = useState<StockAdjustment[]>(INITIAL_ADJUSTMENTS);

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <AdminBreadcrumb
        customItems={[
          { label: 'Inventory', href: '/admin/inventory' },
          { label: 'Stock Adjustments' },
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <SlidersHorizontal className="w-6 h-6 text-red-600" />
            <span>Stock Adjustments & Write-Offs</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Audit inventory discrepancies, write off damaged transit items, and adjust physical ledger counts.
          </p>
        </div>

        <button
          onClick={() => alert('New Stock Adjustment Dialog')}
          className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-red-600/30 flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>+ Record Adjustment</span>
        </button>
      </div>

      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#0B0F19] border-b border-slate-200/80 dark:border-[#222E42] text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">Reference #</th>
                <th className="p-4">Item Name</th>
                <th className="p-4">Warehouse Godown</th>
                <th className="p-4">Adjustment Reason</th>
                <th className="p-4">Qty Adjustment</th>
                <th className="p-4">Audited Date</th>
                <th className="p-4 text-right">Auditor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {adjustments.map((adj) => (
                <tr key={adj.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-mono font-bold text-slate-900 dark:text-white">
                    {adj.reference}
                  </td>
                  <td className="p-4 font-semibold text-slate-800 dark:text-slate-200">
                    {adj.productName}
                  </td>
                  <td className="p-4 text-slate-500">{adj.warehouse}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[10px]">
                      {adj.adjustmentType}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-bold">
                    <span className={adj.qtyChange < 0 ? 'text-rose-600' : 'text-emerald-600'}>
                      {adj.qtyChange > 0 ? `+${adj.qtyChange}` : adj.qtyChange} Units
                    </span>
                  </td>
                  <td className="p-4 text-slate-500">{adj.date}</td>
                  <td className="p-4 text-right text-slate-600 dark:text-slate-300 font-medium">
                    {adj.author}
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
