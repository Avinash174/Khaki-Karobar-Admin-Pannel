'use client';

import React, { useState, useEffect } from 'react';
import { Plus, CheckCircle2 } from 'lucide-react';
import { invoiceService, customerService, productService } from '@/lib/api';
import { CreateInvoiceDrawer } from '@/components/Modals/CreateInvoiceDrawer';
import { ViewInvoiceModal } from '@/components/Modals/ViewInvoiceModal';

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [createInvoiceOpen, setCreateInvoiceOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);
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
        const [invRes, custRes, prodRes] = await Promise.allSettled([
          invoiceService.getInvoices(),
          customerService.getCustomers(),
          productService.getProducts(),
        ]);
        if (invRes.status === 'fulfilled' && invRes.value.success) setInvoices(invRes.value.data || []);
        if (custRes.status === 'fulfilled' && custRes.value.success) setCustomers(custRes.value.data || []);
        if (prodRes.status === 'fulfilled' && prodRes.value.success) setProducts(prodRes.value.data || []);
      } catch (err) {
        console.error('Invoices load error:', err);
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

      <CreateInvoiceDrawer
        isOpen={createInvoiceOpen}
        onClose={() => setCreateInvoiceOpen(false)}
        customers={customers}
        products={products}
        onSuccess={(msg) => { showToast(msg); setRefreshKey(k => k + 1); }}
      />
      <ViewInvoiceModal
        invoice={selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
        onSuccess={(msg) => showToast(msg)}
      />

      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-base font-bold text-slate-900 dark:text-white">GST Sales Invoices</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Real-time tax invoices with atomic inventory reduction and WhatsApp dispatch
            </p>
          </div>
          <button
            onClick={() => setCreateInvoiceOpen(true)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-md shadow-red-600/30 flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Create Invoice</span>
          </button>
        </div>

        {loading ? (
          <div className="py-16 text-center text-slate-400 text-xs">Loading invoices...</div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-200/80 dark:border-[#222E42]">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-[#1A2333] border-b border-slate-200/80 dark:border-[#222E42] text-slate-400 font-semibold uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4">Invoice #</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4 text-right">Taxable</th>
                  <th className="py-3 px-4 text-right">Tax</th>
                  <th className="py-3 px-4 text-right">Grand Total</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#1E293B]">
                {invoices.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      No invoices recorded. Click &quot;+ Create Invoice&quot; to generate one.
                    </td>
                  </tr>
                ) : (
                  invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white font-mono">{inv.invoiceNumber}</td>
                      <td className="py-3 px-4 text-slate-700 dark:text-slate-300">{inv.customer?.name ?? 'Walk-in Customer'}</td>
                      <td className="py-3 px-4 text-right font-mono">₹{Number(inv.subtotal ?? 0).toFixed(2)}</td>
                      <td className="py-3 px-4 text-right font-mono text-slate-500">₹{Number(inv.taxAmount ?? 0).toFixed(2)}</td>
                      <td className="py-3 px-4 text-right font-bold text-slate-900 dark:text-white font-mono">₹{Number(inv.grandTotal ?? 0).toFixed(2)}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          inv.status === 'PAID'
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                            : 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
                        }`}>
                          {inv.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setSelectedInvoice(inv)}
                          className="px-2.5 py-1 text-slate-600 dark:text-slate-300 hover:text-red-600 font-semibold"
                        >
                          View & Print
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
