'use client';

import React, { useState, useEffect } from 'react';
import { Plus, CheckCircle2 } from 'lucide-react';
import { productService } from '@/lib/api';
import { AddProductModal } from '@/components/Modals/AddProductModal';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4500);
  };

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await productService.getProducts();
        if (res.success) setProducts(res.data || []);
      } catch (err) {
        console.error('Products load error:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [refreshKey]);

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[100] p-4 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-2xl shadow-2xl text-xs font-semibold flex items-center gap-2.5 animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>{toastMessage}</span>
        </div>
      )}

      <AddProductModal
        isOpen={addProductOpen}
        onClose={() => setAddProductOpen(false)}
        onSuccess={(msg) => { showToast(msg); setRefreshKey(k => k + 1); }}
      />

      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-base font-bold text-slate-900 dark:text-white">Products & Live Stock Audit</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Live inventory counts automatically updated by billing transactions
            </p>
          </div>
          <button
            onClick={() => setAddProductOpen(true)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-md shadow-red-600/30 flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Product</span>
          </button>
        </div>

        {loading ? (
          <div className="py-16 text-center text-slate-400 text-xs">Loading products...</div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-200/80 dark:border-[#222E42]">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-[#1A2333] border-b border-slate-200/80 dark:border-[#222E42] text-slate-400 font-semibold uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4">Item Name</th>
                  <th className="py-3 px-4">SKU</th>
                  <th className="py-3 px-4 text-right">Selling Price</th>
                  <th className="py-3 px-4 text-right">GST Rate</th>
                  <th className="py-3 px-4 text-right">Stock Level</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#1E293B]">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      No products recorded. Click &quot;+ Add Product&quot; to add one.
                    </td>
                  </tr>
                ) : (
                  products.map((p) => {
                    const isLow = Number(p.currentStock ?? 0) <= Number(p.lowStockThreshold ?? 5);
                    return (
                      <tr key={p.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                        <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{p.name}</td>
                        <td className="py-3 px-4 font-mono text-[11px] text-slate-500">{p.sku ?? '—'}</td>
                        <td className="py-3 px-4 text-right font-black font-mono text-slate-900 dark:text-white">₹{Number(p.sellingPrice ?? 0).toFixed(2)}</td>
                        <td className="py-3 px-4 text-right text-slate-500 font-mono">{p.gstRate ?? 18}%</td>
                        <td className="py-3 px-4 text-right font-black font-mono text-slate-900 dark:text-white">
                          {p.currentStock} {p.unit ?? 'PCS'}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            isLow
                              ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400'
                              : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                          }`}>
                            {isLow ? 'Low Stock' : 'In Stock'}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
