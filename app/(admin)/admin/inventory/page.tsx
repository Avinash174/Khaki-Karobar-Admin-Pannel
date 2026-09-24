'use client';

import React from 'react';
import Link from 'next/link';
import { Boxes, Package, Building2, SlidersHorizontal, AlertTriangle, ArrowRight } from 'lucide-react';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

export default function InventoryOverviewPage() {
  const cards = [
    {
      title: 'Stock Registry',
      desc: 'Catalog inventory quantities, batches, selling prices, and reorder levels.',
      href: '/admin/inventory/stock',
      icon: Package,
      stat: '1,420 Units',
      statLabel: 'Total Stock Available',
    },
    {
      title: 'Godowns & Warehouses',
      desc: 'Multi-location inventory tracking across central godowns and branch stores.',
      href: '/admin/inventory/warehouses',
      icon: Building2,
      stat: '3 Locations',
      statLabel: 'Operational Godowns',
    },
    {
      title: 'Stock Adjustments',
      desc: 'Reconciliation of physical counts against digital ledgers, write-offs and damages.',
      href: '/admin/inventory/adjustments',
      icon: SlidersHorizontal,
      stat: '2 Audits',
      statLabel: 'Pending Review',
    },
    {
      title: 'Low Stock Alerts',
      desc: 'Automated warnings for products currently below safety threshold levels.',
      href: '/admin/inventory/low-stock',
      icon: AlertTriangle,
      stat: '2 Items Alert',
      statLabel: 'Needs Inward PO',
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <AdminBreadcrumb />

      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <Boxes className="w-6 h-6 text-red-600" />
          <span>Inventory & Warehouse Management</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Real-time stock valuation, godown locations, SKU reconciliation, and reorder management.
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
