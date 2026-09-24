'use client';

import React, { useState, useEffect } from 'react';
import { Plus, CheckCircle2 } from 'lucide-react';
import { customerService } from '@/lib/api';
import { AddCustomerModal } from '@/components/Modals/AddCustomerModal';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [addCustomerOpen, setAddCustomerOpen] = useState(false);
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
        const res = await customerService.getCustomers();
        if (res.success) setCustomers(res.data || []);
      } catch (err) {
        console.error('Customers load error:', err);
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

      <AddCustomerModal
        isOpen={addCustomerOpen}
        onClose={() => setAddCustomerOpen(false)}
        onSuccess={(msg) => { showToast(msg); setRefreshKey(k => k + 1); }}
      />

      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-base font-bold text-slate-900 dark:text-white">Customer CRM & Accounts</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Client ledger profiles with current balances and GSTIN
            </p>
          </div>
          <button
            onClick={() => setAddCustomerOpen(true)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-md shadow-red-600/30 flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Customer</span>
          </button>
        </div>

        {loading ? (
          <div className="py-16 text-center text-slate-400 text-xs">Loading customers...</div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-200/80 dark:border-[#222E42]">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-[#1A2333] border-b border-slate-200/80 dark:border-[#222E42] text-slate-400 font-semibold uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">GSTIN</th>
                  <th className="py-3 px-4">City</th>
                  <th className="py-3 px-4 text-right">Current Due</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#1E293B]">
                {customers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400">
                      No customers found. Click &quot;+ Add Customer&quot; to add one.
                    </td>
                  </tr>
                ) : (
                  customers.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{c.name}</td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-300 font-mono">{c.phone}</td>
                      <td className="py-3 px-4 font-mono text-[11px] text-slate-500">{c.gstin ?? '—'}</td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{c.city ?? 'Pune'}</td>
                      <td className="py-3 px-4 text-right font-black font-mono text-slate-900 dark:text-white">
                        ₹{Number(c.currentBalance ?? 0).toLocaleString('en-IN')}
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
