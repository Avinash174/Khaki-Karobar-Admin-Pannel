'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, CheckCircle2, Users, Search, Phone, Mail, ArrowRight, ExternalLink } from 'lucide-react';
import { customerService } from '@/lib/api';
import { AddCustomerModal } from '@/components/Modals/AddCustomerModal';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [addCustomerOpen, setAddCustomerOpen] = useState(false);
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

  const filtered = customers.filter(
    (c) =>
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.phone?.includes(search) ||
      c.email?.toLowerCase().includes(search.toLowerCase()) ||
      c.gstin?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <AdminBreadcrumb />

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

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-red-600" />
            <span>Customers CRM & Ledgers</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Client profiles with live ledger balances, GSTIN compliance, and transaction history.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/customers/new"
            className="px-3.5 py-2.5 bg-white dark:bg-[#121927] border border-slate-200 dark:border-[#222E42] text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
          >
            Full Form
          </Link>
          <button
            onClick={() => setAddCustomerOpen(true)}
            className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-red-600/30 flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Customer</span>
          </button>
        </div>
      </div>

      {/* Search Toolbar */}
      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-4 shadow-sm">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer name, phone, email, or GSTIN..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-red-600"
          />
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#0B0F19] border-b border-slate-200/80 dark:border-[#222E42] text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">Customer Name</th>
                <th className="p-4">Contact</th>
                <th className="p-4">GSTIN / Tax ID</th>
                <th className="p-4">Ledger Balance</th>
                <th className="p-4">Credit Limit</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">Loading customers...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">No customers found.</td>
                </tr>
              ) : (
                filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-slate-900 dark:text-white text-sm">{c.name}</div>
                      <div className="text-slate-400 text-[11px]">{c.businessName || 'Individual Account'}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-mono text-slate-700 dark:text-slate-300">{c.phone || '—'}</div>
                      <div className="text-slate-400 text-[11px]">{c.email || '—'}</div>
                    </td>
                    <td className="p-4 font-mono text-slate-600 dark:text-slate-400">
                      {c.gstin ? (
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-semibold">{c.gstin}</span>
                      ) : (
                        <span className="text-slate-400 italic">Unregistered</span>
                      )}
                    </td>
                    <td className="p-4 font-mono font-bold">
                      <span className={Number(c.balance || 0) > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}>
                        ₹{Number(c.balance || 0).toLocaleString('en-IN')}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-slate-500">
                      ₹{Number(c.creditLimit || 50000).toLocaleString('en-IN')}
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        href={`/admin/customers/${c.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold transition-colors"
                      >
                        <span>Profile</span>
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
