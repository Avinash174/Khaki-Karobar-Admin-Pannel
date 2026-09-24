'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Truck, Phone, Mail, Building, FileText, CheckCircle2 } from 'lucide-react';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

export default function SupplierDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  return (
    <div className="space-y-6 animate-in fade-in duration-150 max-w-4xl">
      <AdminBreadcrumb
        customItems={[
          { label: 'Suppliers', href: '/admin/suppliers' },
          { label: `Supplier #${id}` },
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Agarwal Textiles Mills
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60">
              Verified Vendor
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Supplier ID: <span className="font-mono">{id}</span> • Raw Materials & Fabric
          </p>
        </div>

        <Link
          href="/admin/suppliers"
          className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-[#222E42] text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-5 shadow-sm space-y-4">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Payable Balance</h2>
          <div className="text-3xl font-black font-mono text-rose-600 dark:text-rose-400">
            ₹34,500
          </div>
          <p className="text-[11px] text-slate-400">Current dues pending payment</p>
        </div>

        <div className="md:col-span-2 bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-5 shadow-sm space-y-4">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Vendor Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200/60 dark:border-slate-800">
              <span className="text-slate-400 block text-[10px]">Contact Person</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">Vikas Agarwal</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200/60 dark:border-slate-800">
              <span className="text-slate-400 block text-[10px]">GSTIN</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200 text-sm">27AABCA1234D1ZX</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
