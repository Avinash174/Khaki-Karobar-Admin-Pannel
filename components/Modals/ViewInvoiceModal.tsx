'use client';

import React, { useState } from 'react';
import { X, Printer, Send, CheckCircle2, FileText } from 'lucide-react';
import { invoiceService } from '@/lib/api';

interface ViewInvoiceModalProps {
  invoice: any | null;
  onClose: () => void;
  onSuccess: (msg: string) => void;
}

export function ViewInvoiceModal({ invoice, onClose, onSuccess }: ViewInvoiceModalProps) {
  const [sharing, setSharing] = useState(false);

  if (!invoice) return null;

  const handleShareWhatsApp = async () => {
    setSharing(true);
    try {
      const res = await invoiceService.shareWhatsApp(invoice.id);
      if (res.success) {
        onSuccess(`Invoice #${invoice.invoiceNumber} shared to customer via WhatsApp!`);
      }
    } catch (e: any) {
      alert('Error sharing WhatsApp invoice: ' + (e?.message || e));
    } finally {
      setSharing(false);
    }
  };

  const isPaid = invoice.status === 'PAID';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white dark:bg-[#121927] border border-slate-200 dark:border-[#2A364F] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-[#222E42] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-slate-900 dark:text-white">
              Tax Invoice #{invoice.invoiceNumber}
            </span>
            <span
              className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                isPaid
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                  : 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
              }`}
            >
              {invoice.status}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              title="Print Invoice"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Invoice Printable Sheet */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-slate-800 dark:text-slate-200">
          {/* Header Info */}
          <div className="flex justify-between items-start pb-4 border-b border-slate-200 dark:border-[#222E42]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 bg-red-600 rounded-lg flex items-center justify-center text-white font-extrabold text-sm">
                  K
                </div>
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                  KHAKI KAROBARI
                </span>
              </div>
              <p className="text-slate-500">GST Registration: 27AABCK1234F1Z8</p>
              <p className="text-slate-500">Khaki KrypTech (India) Pvt. Ltd., Pune, Maharashtra</p>
            </div>

            <div className="text-right">
              <p className="font-bold text-slate-900 dark:text-white">ORIGINAL FOR RECIPIENT</p>
              <p className="text-slate-500">Invoice: #{invoice.invoiceNumber}</p>
              <p className="text-slate-500">Date: {new Date(invoice.createdAt || Date.now()).toLocaleDateString('en-IN')}</p>
            </div>
          </div>

          {/* Bill To */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#222E42]">
            <p className="font-bold text-slate-400 uppercase text-[10px] mb-1">Bill To / Customer</p>
            <p className="font-bold text-sm text-slate-900 dark:text-white">
              {invoice.customer?.name ?? 'Walk-in Customer'}
            </p>
            <p className="text-slate-500">Phone: {invoice.customer?.phone ?? '—'}</p>
            {invoice.customer?.gstin && (
              <p className="text-slate-500 font-mono">GSTIN: {invoice.customer.gstin}</p>
            )}
            <p className="text-slate-500">City: {invoice.customer?.city ?? 'Pune'}, {invoice.customer?.state ?? 'Maharashtra'}</p>
          </div>

          {/* Line Items Table */}
          <div>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-[#222E42] text-[11px] font-bold text-slate-400 uppercase">
                  <th className="py-2">Item Description</th>
                  <th className="py-2 text-center">Qty</th>
                  <th className="py-2 text-right">Unit Rate</th>
                  <th className="py-2 text-right">GST %</th>
                  <th className="py-2 text-right">Total (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#222E42]">
                {(invoice.items ?? []).map((item: any, idx: number) => {
                  const lineTotal = Number(item.totalAmount ?? (item.quantity * item.unitPrice * (1 + (item.gstRate ?? 18) / 100)));
                  return (
                    <tr key={idx}>
                      <td className="py-2.5 font-semibold text-slate-900 dark:text-white">
                        {item.product?.name ?? item.description ?? 'Product'}
                      </td>
                      <td className="py-2.5 text-center">{item.quantity}</td>
                      <td className="py-2.5 text-right font-mono">₹{Number(item.unitPrice).toFixed(2)}</td>
                      <td className="py-2.5 text-right text-slate-500">{item.gstRate ?? 18}%</td>
                      <td className="py-2.5 text-right font-bold text-slate-900 dark:text-white font-mono">
                        ₹{lineTotal.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="pt-4 border-t border-slate-200 dark:border-[#222E42] flex justify-end">
            <div className="w-64 space-y-1.5 text-right">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal:</span>
                <span className="font-mono">₹{Number(invoice.subtotal ?? 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Total Tax (CGST+SGST):</span>
                <span className="font-mono">₹{Number(invoice.taxAmount ?? 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-black text-sm text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-[#222E42]">
                <span>Grand Total:</span>
                <span className="text-red-600 dark:text-red-500 font-mono">
                  ₹{Number(invoice.grandTotal ?? 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-emerald-600 font-semibold pt-1">
                <span>Paid Amount:</span>
                <span className="font-mono">₹{Number(invoice.paidAmount ?? 0).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 bg-slate-50 dark:bg-[#0B0F19] border-t border-slate-100 dark:border-[#222E42] flex items-center justify-between">
          <p className="text-[11px] text-slate-400">
            Automated statutory GST billing by Khaki Karobari
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShareWhatsApp}
              disabled={sharing}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{sharing ? 'Dispatching...' : 'Share on WhatsApp'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold rounded-xl text-xs hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
