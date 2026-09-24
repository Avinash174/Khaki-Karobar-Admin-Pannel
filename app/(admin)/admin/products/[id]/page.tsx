'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Package, Barcode, Tag, Layers, CheckCircle2, TrendingUp } from 'lucide-react';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  return (
    <div className="space-y-6 animate-in fade-in duration-150 max-w-4xl">
      <AdminBreadcrumb
        customItems={[
          { label: 'Products', href: '/admin/products' },
          { label: `Product #${id}` },
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Product SKU Overview
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
              Active Catalog Item
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Item ID: <span className="font-mono">{id}</span> • Pricing, stock audit & taxation
          </p>
        </div>

        <Link
          href="/admin/products"
          className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-[#222E42] text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Products</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-5 shadow-sm space-y-4">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Selling Price</h2>
          <div className="text-3xl font-black font-mono text-slate-900 dark:text-white">
            ₹850.00
          </div>
          <p className="text-[11px] text-slate-400">Inclusive of 18% GST</p>
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-500">
            <div className="flex justify-between">
              <span>HSN Code</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200">6203</span>
            </div>
            <div className="flex justify-between">
              <span>GST Slab</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200">18%</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-5 shadow-sm space-y-4">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Stock & Inventory Health</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200/60 dark:border-slate-800">
              <span className="text-slate-400 block text-[10px]">Current Available Stock</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200 text-sm">48 Units</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200/60 dark:border-slate-800">
              <span className="text-slate-400 block text-[10px]">Reorder Threshold</span>
              <span className="font-mono font-bold text-rose-600 dark:text-rose-400 text-sm">10 Units</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
