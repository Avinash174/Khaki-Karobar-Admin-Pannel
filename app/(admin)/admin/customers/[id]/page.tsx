'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, User, Phone, Mail, Building2, Receipt, ArrowRight, ShieldCheck } from 'lucide-react';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

export default function CustomerDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  return (
    <div className="space-y-6 animate-in fade-in duration-150 max-w-4xl">
      <AdminBreadcrumb
        customItems={[
          { label: 'Customers', href: '/admin/customers' },
          { label: `Customer Profile #${id}` },
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Customer Account
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
              Active Client
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Account ID: <span className="font-mono">{id}</span> • Customer ledger and invoices summary
          </p>
        </div>

        <Link
          href="/admin/customers"
          className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-[#222E42] text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Customers</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-5 shadow-sm space-y-4">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Current Balance</h2>
          <div className="text-3xl font-black font-mono text-amber-600 dark:text-amber-400">
            ₹12,450
          </div>
          <p className="text-[11px] text-slate-400">Outstanding payment due</p>
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between text-xs text-slate-500">
            <span>Credit Limit</span>
            <span className="font-mono font-bold text-slate-800 dark:text-slate-200">₹50,000</span>
          </div>
        </div>

        <div className="md:col-span-2 bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-5 shadow-sm space-y-4">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tax & Contact Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200/60 dark:border-slate-800">
              <span className="text-slate-400 block text-[10px]">GSTIN Status</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200 text-sm">27ABCDE1234F1Z5</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200/60 dark:border-slate-800">
              <span className="text-slate-400 block text-[10px]">Phone</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200 text-sm">+91 9823012345</span>
            </div>
            <div className="sm:col-span-2 p-3 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200/60 dark:border-slate-800">
              <span className="text-slate-400 block text-[10px]">Registered Address</span>
              <p className="text-slate-700 dark:text-slate-300 mt-0.5">
                Shop No 14, APMC Market Yard, Gultekdi, Pune, Maharashtra - 411037
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
