'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, Plus, ArrowRight, CheckCircle2, X } from 'lucide-react';
import { purchaseService, supplierService, productService, extractItems } from '@/lib/api';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

export default function PurchaseOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  const [toastMessage, setToastMessage] = useState('');

  // Create Purchase Modal State
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedSupplierId, setSelectedSupplierId] = useState('');
  const [orderItems, setOrderItems] = useState<Array<{ productId: string; quantity: number; unitPrice: number; gstRate: number }>>([]);
  const [paymentMethod, setPaymentMethod] = useState('BANK_TRANSFER');
  const [paidNow, setPaidNow] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4500);
  };

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [poRes, suppRes, prodRes] = await Promise.allSettled([
          purchaseService.getPurchases(),
          supplierService.getSuppliers(),
          productService.getProducts(),
        ]);
        if (poRes.status === 'fulfilled' && poRes.value.success) {
          setOrders(extractItems(poRes.value.data));
        }
        if (suppRes.status === 'fulfilled' && suppRes.value.success) {
          setSuppliers(extractItems(suppRes.value.data));
        }
        if (prodRes.status === 'fulfilled' && prodRes.value.success) {
          setProducts(extractItems(prodRes.value.data));
        }
      } catch (err) {
        console.error('Failed to load purchase orders:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [refreshKey]);

  const addOrderItem = (product: any) => {
    const existing = orderItems.find((i) => i.productId === product.id);
    if (existing) {
      setOrderItems(orderItems.map((i) => (i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i)));
    } else {
      setOrderItems([
        ...orderItems,
        {
          productId: product.id,
          quantity: 1,
          unitPrice: Number(product.purchasePrice || product.sellingPrice * 0.8),
          gstRate: Number(product.gstRate ?? 18),
        },
      ]);
    }
  };

  const removeOrderItem = (productId: string) => {
    setOrderItems(orderItems.filter((i) => i.productId !== productId));
  };

  const calculateSubtotal = () => orderItems.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
  const calculateTax = () => orderItems.reduce((sum, i) => sum + (i.quantity * i.unitPrice * i.gstRate) / 100, 0);
  const grandTotal = Math.round(calculateSubtotal() + calculateTax());

  const handleCreatePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSupplierId) {
      setFormError('Please select a supplier.');
      return;
    }
    if (orderItems.length === 0) {
      setFormError('Please add at least one item to purchase.');
      return;
    }

    setSaving(true);
    setFormError('');
    try {
      const res = await purchaseService.create({
        supplierId: selectedSupplierId,
        items: orderItems,
        initialPayment: paidNow
          ? {
              amount: grandTotal,
              paymentMethod,
            }
          : undefined,
      });

      if (res.success) {
        showToast(`Purchase bill #${res.data?.purchaseNumber || ''} created & inventory increased!`);
        setCreateModalOpen(false);
        setSelectedSupplierId('');
        setOrderItems([]);
        setPaidNow(false);
        setRefreshKey((k) => k + 1);
      } else {
        setFormError(res.message || 'Failed to create purchase');
      }
    } catch (err: any) {
      setFormError(err?.response?.data?.message || err.message || 'Error saving purchase');
    } finally {
      setSaving(false);
    }
  };

  const filtered = orders.filter((o) => {
    const poNum = o.purchaseNumber || o.poNumber || '';
    const suppName = o.supplier?.name || o.supplierName || '';
    return poNum.toLowerCase().includes(search.toLowerCase()) || suppName.toLowerCase().includes(search.toLowerCase());
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'RECEIVED':
        return 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200';
      case 'CANCELLED':
        return 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 border border-rose-200';
      default:
        return 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 border border-blue-200';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <AdminBreadcrumb
        customItems={[
          { label: 'Purchases', href: '/admin/purchases' },
          { label: 'Purchase Orders' },
        ]}
      />

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[100] p-4 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-2xl shadow-2xl text-xs font-semibold flex items-center gap-2.5 animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Create Purchase Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121927] border border-slate-200 dark:border-[#2A364F] rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-red-600/10 text-red-600 flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">Record Purchase Bill / Order</h3>
                  <p className="text-[11px] text-slate-400">Inward inventory from supplier & update payables</p>
                </div>
              </div>
              <button
                onClick={() => setCreateModalOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePurchase} className="p-5 space-y-4 overflow-y-auto flex-1">
              {formError && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-600 dark:text-rose-400">
                  {formError}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Supplier / Vendor <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={selectedSupplierId}
                  onChange={(e) => setSelectedSupplierId(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600"
                >
                  <option value="">-- Choose Vendor --</option>
                  {suppliers.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.companyName || s.name} ({s.phone})
                    </option>
                  ))}
                </select>
              </div>

              {/* Quick Products Add */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Quick Add Products to Purchase
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto p-1 bg-slate-50 dark:bg-[#0B0F19] rounded-xl border border-slate-200 dark:border-[#2A364F]">
                  {products.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => addOrderItem(p)}
                      className="p-2 text-left rounded-lg bg-white dark:bg-[#121927] border border-slate-200 dark:border-[#222E42] hover:border-red-500 transition-all text-xs"
                    >
                      <p className="font-bold text-slate-800 dark:text-slate-200 truncate">{p.name}</p>
                      <span className="text-[11px] text-slate-400">Cost: ₹{p.purchasePrice || p.sellingPrice * 0.8}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Items List */}
              {orderItems.length > 0 && (
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Selected Items ({orderItems.length})
                  </label>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-[#222E42] rounded-xl p-2 bg-white dark:bg-[#121927]">
                    {orderItems.map((item) => {
                      const prod = products.find((p) => p.id === item.productId);
                      return (
                        <div key={item.productId} className="py-2 flex items-center justify-between text-xs">
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white">{prod?.name || 'Item'}</p>
                            <span className="text-slate-400">₹{item.unitPrice} each + {item.gstRate}% GST</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => {
                                const q = Math.max(1, parseInt(e.target.value) || 1);
                                setOrderItems(orderItems.map((i) => (i.productId === item.productId ? { ...i, quantity: q } : i)));
                              }}
                              className="w-16 px-2 py-1 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-lg text-center font-bold"
                            />
                            <button
                              type="button"
                              onClick={() => removeOrderItem(item.productId)}
                              className="text-rose-500 hover:text-rose-700 p-1"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Payment Option */}
              <div className="p-3 bg-slate-50 dark:bg-[#0B0F19] rounded-xl border border-slate-200 dark:border-[#2A364F] space-y-2 text-xs">
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-800 dark:text-slate-200">
                  <input
                    type="checkbox"
                    checked={paidNow}
                    onChange={(e) => setPaidNow(e.target.checked)}
                    className="rounded text-red-600 focus:ring-red-500"
                  />
                  <span>Mark as Paid now to Supplier (₹{grandTotal.toLocaleString('en-IN')})</span>
                </label>
                {paidNow && (
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full bg-white dark:bg-[#121927] border border-slate-200 dark:border-[#2A364F] rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white"
                  >
                    <option value="BANK_TRANSFER">Bank Transfer (NEFT/RTGS)</option>
                    <option value="UPI">UPI</option>
                    <option value="CASH">Cash</option>
                    <option value="CHEQUE">Cheque</option>
                  </select>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-slate-400 text-xs">Total Bill:</span>
                  <p className="font-mono font-bold text-base text-slate-900 dark:text-white">₹{grandTotal.toLocaleString('en-IN')}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCreateModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-[#222E42] text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving || orderItems.length === 0}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-red-600/30 disabled:opacity-50"
                  >
                    {saving ? 'Creating...' : 'Confirm Inward PO'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-red-600" />
            <span>Purchase Orders & Inwards</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Order raw materials, inventory stock, and supplies from registered vendors.
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-red-600/30 flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create Purchase Order</span>
        </button>
      </div>

      {/* Search Toolbar */}
      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-4 shadow-sm">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search purchase orders by PO # or vendor..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-red-600"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#0B0F19] border-b border-slate-200/80 dark:border-[#222E42] text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">PO / Bill #</th>
                <th className="p-4">Supplier / Vendor</th>
                <th className="p-4">Order Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Total Amount (₹)</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">Loading purchase orders...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">No purchase orders found.</td>
                </tr>
              ) : (
                filtered.map((po) => (
                  <tr key={po.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 font-mono font-bold text-slate-900 dark:text-white">
                      {po.purchaseNumber || `PO-${po.id.slice(0, 8)}`}
                    </td>
                    <td className="p-4 font-semibold text-slate-800 dark:text-slate-200">
                      {po.supplier?.name || po.supplierName || 'Vendor'}
                    </td>
                    <td className="p-4 text-slate-500">
                      {new Date(po.purchaseDate || po.createdAt || Date.now()).toLocaleDateString('en-IN')}
                    </td>
                    <td className="p-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${getStatusBadge(po.status)}`}>
                        {po.status || 'RECEIVED'}
                      </span>
                    </td>
                    <td className="p-4 font-mono font-bold text-slate-900 dark:text-white text-sm">
                      ₹{Number(po.grandTotal || po.totalAmount || 0).toLocaleString('en-IN')}
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        href={`/admin/suppliers/${po.supplierId || ''}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold transition-colors"
                      >
                        <span>Vendor Ledger</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
