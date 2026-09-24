'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Truck, RotateCcw, ArrowRight, DollarSign } from 'lucide-react';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

export default function PurchasesOverviewPage() {
  const cards = [
    {
      title: 'Purchase Orders',
      desc: 'Create, dispatch, and track inward stock orders to raw material suppliers.',
      href: '/admin/purchases/orders',
      icon: ShoppingBag,
      stat: '8 Inward POs',
      statLabel: 'This Month',
    },
    {
      title: 'Purchase Returns (Debit Notes)',
      desc: 'Record returned defective stock to vendors and claim input tax reversals.',
      href: '/admin/purchases/returns',
      icon: RotateCcw,
      stat: '1 Return',
      statLabel: '₹6,400 Claimed',
    },
    {
      title: 'Suppliers Directory',
      desc: 'Verified vendor directory with ledger accounts, bank info, and GSTINs.',
      href: '/admin/suppliers',
      icon: Truck,
      stat: '14 Active',
      statLabel: 'Suppliers',
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <AdminBreadcrumb />

      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <ShoppingBag className="w-6 h-6 text-red-600" />
          <span>Procurement & Purchases</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Vendor purchase orders, inventory inwards, debit notes, and payables.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.title}
              href={c.href}
              className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-red-600/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-red-600/10 text-red-600 dark:text-red-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-red-600 transition-colors">
                  {c.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {c.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-slate-900 dark:text-white text-xs">{c.stat}</span>
                  <span className="text-[10px] text-slate-400 block">{c.statLabel}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
