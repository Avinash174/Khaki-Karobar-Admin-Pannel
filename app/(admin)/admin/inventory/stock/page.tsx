'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Package, Search, Plus, Filter, ArrowRight, AlertTriangle } from 'lucide-react';
import { productService, extractItems } from '@/lib/api';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

export default function InventoryStockPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await productService.getProducts();
        if (res.success) {
          setProducts(extractItems(res.data));
        }
      } catch (err) {
        console.error('Stock load error:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.sku?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <AdminBreadcrumb
        customItems={[
          { label: 'Inventory', href: '/admin/inventory' },
          { label: 'Stock Registry' },
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Package className="w-6 h-6 text-red-600" />
            <span>Stock Registry & Item Valuation</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time quantity on hand, unit costing, and warehouse stock distribution.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-red-600/30 flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Stock Item</span>
        </Link>
      </div>

      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-4 shadow-sm">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search stock by SKU, product name..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-red-600"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#0B0F19] border-b border-slate-200/80 dark:border-[#222E42] text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">SKU / Item</th>
                <th className="p-4">Unit</th>
                <th className="p-4">Selling Rate</th>
                <th className="p-4">Available Stock</th>
                <th className="p-4">Est. Valuation</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((p) => {
                const stock = Number(p.currentStock ?? p.stock ?? 0);
                const price = Number(p.sellingPrice ?? p.price ?? 0);
                const valuation = stock * price;
                return (
                  <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-slate-900 dark:text-white text-sm">{p.name}</div>
                      <div className="font-mono text-slate-400 text-[11px] mt-0.5">{p.sku || 'SKU-001'}</div>
                    </td>
                    <td className="p-4 font-mono text-slate-600 dark:text-slate-400">{p.unit || 'PCS'}</td>
                    <td className="p-4 font-mono font-semibold text-slate-800 dark:text-slate-200">
                      ₹{price.toLocaleString('en-IN')}
                    </td>
                    <td className="p-4 font-mono font-bold text-slate-900 dark:text-white">
                      {stock}
                    </td>
                    <td className="p-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      ₹{valuation.toLocaleString('en-IN')}
                    </td>
                    <td className="p-4 text-right">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          stock < 10
                            ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 border border-rose-200'
                            : 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200'
                        }`}
                      >
                        {stock < 10 ? 'Low Stock' : 'Optimal'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
