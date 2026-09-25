'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, ShoppingCart, RefreshCw, ArrowRight, CheckCircle2 } from 'lucide-react';
import { productService, extractItems } from '@/lib/api';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

export default function LowStockAlertsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await productService.getLowStockAlerts();
      if (res.success) {
        setItems(extractItems(res.data));
      }
    } catch (err) {
      console.error('Failed to load low stock alerts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <AdminBreadcrumb
        customItems={[
          { label: 'Inventory', href: '/admin/inventory' },
          { label: 'Low Stock Alerts' },
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-rose-600" />
            <span>Low Stock Warnings & Reorder Triggers</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Products with inventory below safety thresholds requiring inward purchase orders.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadData}
            className="px-3 py-2 bg-white dark:bg-[#121927] border border-slate-200 dark:border-[#222E42] text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Sync</span>
          </button>
          <Link
            href="/admin/purchases/orders"
            className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-red-600/30 flex items-center gap-1.5 transition-all"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>+ Create Purchase Order</span>
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#0B0F19] border-b border-slate-200/80 dark:border-[#222E42] text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">SKU / Item Name</th>
                <th className="p-4">Current Stock</th>
                <th className="p-4">Reorder Safety Level</th>
                <th className="p-4">Deficit Units</th>
                <th className="p-4">Category</th>
                <th className="p-4 text-right">Quick Order</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">Loading low stock warnings...</td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center">
                    <div className="flex flex-col items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-8 h-8" />
                      <p className="font-bold text-sm">All Inventory Healthy</p>
                      <p className="text-xs text-slate-400">No products are currently below their minimum stock threshold.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                items.map((it) => {
                  const stock = Number(it.currentStock ?? it.stock ?? 0);
                  const reorder = Number(it.minStockAlert ?? it.reorderLevel ?? 5);
                  const deficit = Math.max(0, reorder - stock);
                  return (
                    <tr key={it.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-slate-900 dark:text-white text-sm">{it.name}</div>
                        <div className="font-mono text-slate-400 text-[11px] mt-0.5">{it.sku || it.barcode || '—'}</div>
                      </td>
                      <td className="p-4 font-mono font-bold text-rose-600 dark:text-rose-400 text-sm">
                        {stock} {it.unit || 'PCS'}
                      </td>
                      <td className="p-4 font-mono text-slate-600 dark:text-slate-300">
                        {reorder} {it.unit || 'PCS'}
                      </td>
                      <td className="p-4 font-mono font-bold text-amber-600 dark:text-amber-400">
                        -{deficit} {it.unit || 'PCS'}
                      </td>
                      <td className="p-4 text-slate-600 dark:text-slate-400">
                        {it.category?.name || 'General Inventory'}
                      </td>
                      <td className="p-4 text-right">
                        <Link
                          href="/admin/purchases/orders"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-bold transition-colors"
                        >
                          <span>Reorder</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
