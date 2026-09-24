'use client';

import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  Receipt,
  CheckCircle2,
  CreditCard,
  ShoppingBag,
} from 'lucide-react';
import { invoiceService } from '@/lib/api';

interface CreateInvoiceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  customers: any[];
  products: any[];
  onSuccess: (msg: string) => void;
}

export function CreateInvoiceDrawer({
  isOpen,
  onClose,
  customers,
  products,
  onSuccess,
}: CreateInvoiceDrawerProps) {
  const [customerId, setCustomerId] = useState('');
  const [items, setItems] = useState<Array<{ productId: string; quantity: number; unitPrice: number; gstRate: number }>>([]);
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'UPI' | 'BANK'>('CASH');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const addItem = (product: any) => {
    const existing = items.find((i) => i.productId === product.id);
    if (existing) {
      setItems(
        items.map((i) =>
          i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setItems([
        ...items,
        {
          productId: product.id,
          quantity: 1,
          unitPrice: Number(product.sellingPrice),
          gstRate: Number(product.gstRate ?? 18),
        },
      ]);
    }
  };

  const removeItem = (productId: string) => {
    setItems(items.filter((i) => i.productId !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setItems(
      items
        .map((i) => {
          if (i.productId === productId) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as any
    );
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
  };

  const calculateTax = () => {
    return items.reduce(
      (sum, i) => sum + (i.quantity * i.unitPrice * i.gstRate) / 100,
      0
    );
  };

  const grandTotal = calculateSubtotal() + calculateTax();

  const handleCreate = async () => {
    if (!customerId) {
      setError('Please select a customer for this invoice.');
      return;
    }
    if (items.length === 0) {
      setError('Please add at least one product item.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await invoiceService.createInvoice({
        customerId,
        items,
        initialPayment: {
          amount: grandTotal,
          paymentMethod,
        },
      });

      if (res.success) {
        onSuccess(`Tax Invoice #${res.data?.invoiceNumber ?? ''} created & stock atomically updated!`);
        setItems([]);
        setCustomerId('');
        onClose();
      } else {
        setError(res.error || 'Failed to create invoice');
      }
    } catch (err: any) {
      setError(err?.response?.data?.error || err.message || 'Error creating invoice');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-white dark:bg-[#121927] border-l border-slate-200 dark:border-[#2A364F] shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-100 dark:border-[#222E42] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center font-bold">
                <Receipt className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  Fast GST Billing Counter
                </h2>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Instant invoice creation with atomic live stock audit
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-600 dark:text-rose-400">
                {error}
              </div>
            )}

            {/* Customer Picker */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Select Customer <span className="text-red-500">*</span>
              </label>
              <select
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600"
              >
                <option value="">-- Choose Customer --</option>
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.phone})
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Catalog Item Picker */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Quick Catalog Add
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto p-1">
                {products.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => addItem(p)}
                    className="p-2.5 text-left rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] hover:border-red-500/50 hover:bg-red-50/50 dark:hover:bg-red-950/20 transition-all text-xs"
                  >
                    <p className="font-bold text-slate-800 dark:text-slate-200 truncate">{p.name}</p>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                      <span>₹{p.sellingPrice}</span>
                      <span className="text-emerald-500 text-[10px]">+{p.gstRate}%</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Cart Items */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Cart Items ({items.length})
                </span>
              </div>

              {items.length === 0 ? (
                <div className="py-8 text-center border-2 border-dashed border-slate-200 dark:border-[#2A364F] rounded-2xl text-slate-400 text-xs">
                  Click on catalog items above to add them to this invoice.
                </div>
              ) : (
                <div className="space-y-2">
                  {items.map((item) => {
                    const prod = products.find((p) => p.id === item.productId);
                    const lineTotal = item.quantity * item.unitPrice * (1 + item.gstRate / 100);

                    return (
                      <div
                        key={item.productId}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#222E42] flex items-center justify-between text-xs"
                      >
                        <div className="min-w-0 flex-1 mr-3">
                          <p className="font-bold text-slate-900 dark:text-white truncate">
                            {prod?.name ?? 'Product'}
                          </p>
                          <p className="text-[10px] text-slate-500">
                            ₹{item.unitPrice} + {item.gstRate}% GST
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center border border-slate-200 dark:border-[#2A364F] rounded-lg overflow-hidden bg-white dark:bg-[#121927]">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.productId, -1)}
                              className="px-2 py-1 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                              -
                            </button>
                            <span className="px-2 py-1 font-bold text-[11px] text-slate-900 dark:text-white">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.productId, 1)}
                              className="px-2 py-1 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                              +
                            </button>
                          </div>

                          <span className="font-extrabold text-slate-900 dark:text-white w-16 text-right">
                            ₹{lineTotal.toFixed(0)}
                          </span>

                          <button
                            type="button"
                            onClick={() => removeItem(item.productId)}
                            className="p-1 text-slate-400 hover:text-rose-500 rounded"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Payment Received Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['CASH', 'UPI', 'BANK'] as const).map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                      paymentMethod === method
                        ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-600/20'
                        : 'bg-slate-50 dark:bg-[#0B0F19] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-[#2A364F] hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Summary & Checkout */}
          <div className="p-6 bg-slate-50 dark:bg-[#0B0F19] border-t border-slate-200 dark:border-[#222E42] space-y-3">
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Taxable Amount</span>
                <span>₹{calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Applicable GST Tax</span>
                <span>₹{calculateTax().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-[#222E42]">
                <span>Grand Total:</span>
                <span className="text-red-600 dark:text-red-500">₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCreate}
              disabled={loading || items.length === 0}
              className="w-full py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2"
            >
              {loading ? 'Creating Bill & Reducing Stock...' : `Generate Tax Invoice & Pay (₹${grandTotal.toFixed(0)})`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
