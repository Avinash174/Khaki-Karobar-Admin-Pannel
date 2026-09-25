'use client';

import React, { useState, useEffect } from 'react';
import { SlidersHorizontal, Plus, Search, CheckCircle2, X } from 'lucide-react';
import { productService, extractItems } from '@/lib/api';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

export default function StockAdjustmentsPage() {
  const [movements, setMovements] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    productId: '',
    adjustmentType: 'ADD', // 'ADD' | 'SUBTRACT' | 'SET'
    quantity: 1,
    notes: '',
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [movementsRes, productsRes] = await Promise.all([
        productService.getStockMovements(),
        productService.getProducts(),
      ]);

      if (movementsRes.success) {
        setMovements(extractItems(movementsRes.data));
      }
      if (productsRes.success) {
        setProducts(extractItems(productsRes.data));
      }
    } catch (err) {
      console.error('Failed to load adjustments data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRecordAdjustment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.productId) {
      alert('Please select a product.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await productService.adjustStock({
        productId: formData.productId,
        adjustmentType: formData.adjustmentType as 'ADD' | 'SUBTRACT' | 'SET',
        quantity: Number(formData.quantity),
        notes: formData.notes,
      });

      if (res.success) {
        setIsModalOpen(false);
        setFormData({ productId: '', adjustmentType: 'ADD', quantity: 1, notes: '' });
        await loadData();
      } else {
        alert(res.message || 'Failed to adjust stock');
      }
    } catch (err: any) {
      alert(err.response?.data?.message || err.message || 'Stock adjustment error');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredMovements = movements.filter((m) => {
    const prodName = m.product?.name || '';
    const sku = m.product?.sku || '';
    const notes = m.notes || '';
    const query = search.toLowerCase();
    return prodName.toLowerCase().includes(query) || sku.toLowerCase().includes(query) || notes.toLowerCase().includes(query);
  });

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
            <span>Stock Adjustments & Movements</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Audit physical stock discrepancies, write-offs, surplus counts, and live inventory movements.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-red-600/30 flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>+ Record Adjustment</span>
        </button>
      </div>

      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-4 shadow-sm">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search movements by item, SKU, or notes..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-red-600"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#0B0F19] border-b border-slate-200/80 dark:border-[#222E42] text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">Item Details</th>
                <th className="p-4">Movement Type</th>
                <th className="p-4">Reference</th>
                <th className="p-4">Qty Change</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4 text-right">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    Loading inventory movements...
                  </td>
                </tr>
              ) : filteredMovements.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    No stock adjustments or movements recorded yet.
                  </td>
                </tr>
              ) : (
                filteredMovements.map((m) => {
                  const isPositive = m.quantity > 0 || m.type === 'IN' || m.type === 'PURCHASE';
                  return (
                    <tr key={m.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-slate-900 dark:text-white">{m.product?.name || 'Item'}</div>
                        <div className="font-mono text-slate-400 text-[10px] mt-0.5">{m.product?.sku || m.productId}</div>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[10px] font-bold">
                          {m.type}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-slate-600 dark:text-slate-400">
                        {m.referenceType || 'MANUAL'}
                      </td>
                      <td className="p-4 font-mono font-bold">
                        <span className={isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}>
                          {m.quantity > 0 ? `+${m.quantity}` : m.quantity} {m.product?.unit || 'Units'}
                        </span>
                      </td>
                      <td className="p-4 text-slate-500">
                        {m.date ? new Date(m.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '-'}
                      </td>
                      <td className="p-4 text-right text-slate-600 dark:text-slate-400 font-medium">
                        {m.notes || '-'}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Adjustment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white dark:bg-[#121927] border border-slate-200 dark:border-[#222E42] rounded-2xl w-full max-w-lg p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-red-600" />
                Record Stock Adjustment
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRecordAdjustment} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Select Product *
                </label>
                <select
                  value={formData.productId}
                  onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-red-600"
                >
                  <option value="">-- Choose a Product --</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (Current Stock: {p.currentStock ?? p.stock ?? 0} {p.unit || 'PCS'})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Adjustment Type *
                  </label>
                  <select
                    value={formData.adjustmentType}
                    onChange={(e) => setFormData({ ...formData, adjustmentType: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-red-600 font-bold"
                  >
                    <option value="ADD">+ Add Stock (Surplus / Inward)</option>
                    <option value="SUBTRACT">- Subtract Stock (Damage / Loss)</option>
                    <option value="SET">= Set Exact Count (Audit Recon)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: parseFloat(e.target.value) || 0 })}
                    required
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-red-600 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Reason / Audit Notes
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Broken in godown transit, surplus counted in monthly audit..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-red-600"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-600/30 flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  {submitting ? 'Applying...' : 'Apply Adjustment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
