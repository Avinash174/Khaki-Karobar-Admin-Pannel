'use client';

import React, { useState, useEffect } from 'react';
import { Plus, CheckCircle2, FileText, Search, Eye, ArrowRight, Printer } from 'lucide-react';
import { invoiceService, customerService, productService, extractItems } from '@/lib/api';
import { CreateInvoiceDrawer } from '@/components/Modals/CreateInvoiceDrawer';
import { ViewInvoiceModal } from '@/components/Modals/ViewInvoiceModal';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

export default function SalesInvoicesPage() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [createInvoiceOpen, setCreateInvoiceOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  const [search, setSearch] = useState('');

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
        if (invRes.status === 'fulfilled' && invRes.value.success) setInvoices(extractItems(invRes.value.data));
        if (custRes.status === 'fulfilled' && custRes.value.success) setCustomers(extractItems(custRes.value.data));
        if (prodRes.status === 'fulfilled' && prodRes.value.success) setProducts(extractItems(prodRes.value.data));
      } catch (err) {
        console.error('Invoices load error:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [refreshKey]);

  const filtered = invoices.filter(
    (inv) =>
      inv.invoiceNumber?.toLowerCase().includes(search.toLowerCase()) ||
      inv.customer?.name?.toLowerCase().includes(search.toLowerCase()) ||
      inv.customerName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <AdminBreadcrumb
        customItems={[
          { label: 'Sales', href: '/admin/sales' },
          { label: 'Invoices' },
        ]}
      />

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

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-red-600" />
            <span>Sales & Tax Invoices</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Generate GST compliant tax invoices, WhatsApp dispatches, and thermal print slips.
          </p>
        </div>

        <button
          onClick={() => setCreateInvoiceOpen(true)}
          className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-red-600/30 flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create Invoice</span>
        </button>
      </div>

      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-4 shadow-sm">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search invoices by number or customer name..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-red-600"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#0B0F19] border-b border-slate-200/80 dark:border-[#222E42] text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">Invoice #</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Date</th>
                <th className="p-4">Payment Status</th>
                <th className="p-4">Tax (GST)</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">Loading invoices...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">No invoices found.</td>
                </tr>
              ) : (
                filtered.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 font-mono font-bold text-slate-900 dark:text-white">
                      {inv.invoiceNumber}
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">
                        {inv.customer?.name || inv.customerName || 'Cash Retail Sale'}
                      </div>
                      <div className="text-[11px] text-slate-400">{inv.customer?.phone}</div>
                    </td>
                    <td className="p-4 text-slate-500">
                      {new Date(inv.invoiceDate || inv.createdAt || Date.now()).toLocaleDateString('en-IN')}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          inv.status === 'PAID'
                            ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200'
                            : inv.status === 'CANCELLED'
                            ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 border border-rose-200'
                            : 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 border border-amber-200'
                        }`}
                      >
                        {inv.status || 'ISSUED'}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-slate-500">
                      ₹{Number(inv.totalTax ?? inv.taxAmount ?? 0).toLocaleString('en-IN')}
                    </td>
                    <td className="p-4 font-mono font-bold text-slate-900 dark:text-white text-sm">
                      ₹{Number(inv.grandTotal ?? inv.totalAmount ?? 0).toLocaleString('en-IN')}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setSelectedInvoice(inv)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
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
