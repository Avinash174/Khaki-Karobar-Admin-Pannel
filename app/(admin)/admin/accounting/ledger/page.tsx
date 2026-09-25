'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, Search, RefreshCw, Calendar } from 'lucide-react';
import { accountingService } from '@/lib/api';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

export default function GeneralLedgerPage() {
  const [dayBook, setDayBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);

  const loadData = async (dateStr: string) => {
    setLoading(true);
    try {
      const res = await accountingService.getDayBook(dateStr);
      if (res.success) {
        setDayBook(res.data);
      }
    } catch (err) {
      console.error('Daybook load error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(selectedDate);
  }, [selectedDate]);

  // Construct double-entry records from real daybook transactions
  const entries: any[] = [];

  if (dayBook) {
    (dayBook.invoices || []).forEach((inv: any) => {
      entries.push({
        id: `inv-${inv.id}`,
        date: new Date(inv.invoiceDate || inv.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        account: 'Sales & Debtors',
        description: `Tax Invoice #${inv.invoiceNumber} - ${inv.customer?.name || 'Retail Customer'}`,
        type: 'DEBIT',
        amount: Number(inv.grandTotal || 0),
      });
    });

    (dayBook.payments || []).forEach((pmt: any) => {
      const isReceived = pmt.type === 'RECEIVED';
      entries.push({
        id: `pmt-${pmt.id}`,
        date: new Date(pmt.paymentDate || pmt.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        account: `Cash / Bank (${pmt.paymentMethod})`,
        description: isReceived
          ? `Receipt from ${pmt.customer?.name || 'Customer'}${pmt.referenceNumber ? ` (${pmt.referenceNumber})` : ''}`
          : `Payout to ${pmt.supplier?.name || 'Vendor'}${pmt.referenceNumber ? ` (${pmt.referenceNumber})` : ''}`,
        type: isReceived ? 'DEBIT' : 'CREDIT',
        amount: Number(pmt.amount || 0),
      });
    });

    (dayBook.purchases || []).forEach((pur: any) => {
      entries.push({
        id: `pur-${pur.id}`,
        date: new Date(pur.purchaseDate || pur.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        account: 'Purchases & Creditors',
        description: `Inward Purchase #${pur.purchaseNumber} - ${pur.supplier?.name || 'Vendor'}`,
        type: 'CREDIT',
        amount: Number(pur.grandTotal || 0),
      });
    });

    (dayBook.expenses || []).forEach((exp: any) => {
      entries.push({
        id: `exp-${exp.id}`,
        date: new Date(exp.paymentDate || exp.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        account: `Operational Expense (${exp.category?.name || 'General'})`,
        description: exp.title || exp.notes || 'Operating expense voucher',
        type: 'CREDIT',
        amount: Number(exp.amount || 0),
      });
    });
  }

  const totalDebits = entries.filter((e) => e.type === 'DEBIT').reduce((acc, curr) => acc + curr.amount, 0);
  const totalCredits = entries.filter((e) => e.type === 'CREDIT').reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <AdminBreadcrumb
        customItems={[
          { label: 'Accounting', href: '/admin/accounting' },
          { label: 'General Ledger' },
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-red-600" />
            <span>General Ledger & Day Book</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time double entry debits and credits ledger with date filter and account heads.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-white dark:bg-[#121927] border border-slate-200 dark:border-[#222E42] rounded-xl px-3 py-1.5 shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
            />
          </div>

          <button
            onClick={() => loadData(selectedDate)}
            className="px-3 py-2 bg-white dark:bg-[#121927] border border-slate-200 dark:border-[#222E42] text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Sync</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-slate-400">Total Debits (Inward)</p>
          <p className="font-mono font-bold text-base text-emerald-600 dark:text-emerald-400 mt-1">
            ₹{totalDebits.toLocaleString('en-IN')}
          </p>
        </div>
        <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-slate-400">Total Credits (Outward)</p>
          <p className="font-mono font-bold text-base text-slate-900 dark:text-white mt-1">
            ₹{totalCredits.toLocaleString('en-IN')}
          </p>
        </div>
        <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-4 shadow-sm col-span-2 sm:col-span-1">
          <p className="text-xs text-slate-400">Day Balance Variance</p>
          <p className="font-mono font-bold text-base text-blue-600 dark:text-blue-400 mt-1">
            ₹{(totalDebits - totalCredits).toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#0B0F19] border-b border-slate-200/80 dark:border-[#222E42] text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">Time</th>
                <th className="p-4">Account Head</th>
                <th className="p-4">Transaction Narration</th>
                <th className="p-4 text-right">Debit (₹)</th>
                <th className="p-4 text-right">Credit (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">Loading daybook ledger...</td>
                </tr>
              ) : entries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">
                    No transactions recorded on {selectedDate}.
                  </td>
                </tr>
              ) : (
                entries.map((en) => (
                  <tr key={en.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 font-mono text-slate-500">{en.date}</td>
                    <td className="p-4 font-bold text-slate-900 dark:text-white">{en.account}</td>
                    <td className="p-4 text-slate-600 dark:text-slate-300">{en.description}</td>
                    <td className="p-4 text-right font-mono font-bold">
                      {en.type === 'DEBIT' ? (
                        <span className="text-emerald-600 dark:text-emerald-400">
                          ₹{Number(en.amount).toLocaleString('en-IN')}
                        </span>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="p-4 text-right font-mono font-bold">
                      {en.type === 'CREDIT' ? (
                        <span className="text-slate-900 dark:text-white">
                          ₹{Number(en.amount).toLocaleString('en-IN')}
                        </span>
                      ) : (
                        '—'
                      )}
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
