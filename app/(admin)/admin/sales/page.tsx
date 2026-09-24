'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, FileText, ShoppingBag, RotateCcw, CreditCard, ArrowRight, TrendingUp } from 'lucide-react';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

export default function SalesOverviewPage() {
  const cards = [
    {
      title: 'Tax Invoices',
      desc: 'Create, print, dispatch, and track GST invoices with live payments.',
      href: '/admin/sales/invoices',
      icon: FileText,
      stat: '47 Issued',
      statLabel: 'This Month',
    },
    {
      title: 'Sales Orders',
      desc: 'Manage customer bookings, dispatch dates, and partial fulfillments.',
      href: '/admin/sales/orders',
      icon: ShoppingBag,
      stat: '12 Active',
      statLabel: 'Pending Dispatch',
    },
    {
      title: 'Sales Returns (Credit Notes)',
      desc: 'Process merchandise returns, credit notes, and tax reversals.',
      href: '/admin/sales/returns',
      icon: RotateCcw,
      stat: '2 Returns',
      statLabel: 'Total: ₹3,400',
    },
    {
      title: 'Payment Receipts',
      desc: 'Cash, UPI, and Bank transfer reconciliation for billing accounts.',
      href: '/admin/payments',
      icon: CreditCard,
      stat: '₹1,84,200',
      statLabel: 'Collected',
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <AdminBreadcrumb />

      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <ShoppingCart className="w-6 h-6 text-red-600" />
          <span>Sales & Billing Operations</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Complete point-of-sale, B2B wholesale orders, returns, and receivables.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
