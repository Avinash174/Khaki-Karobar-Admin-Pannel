'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

const SEGMENT_NAMES: Record<string, string> = {
  admin: 'Admin',
  dashboard: 'Dashboard',
  leads: 'Leads CRM',
  customers: 'Customers',
  suppliers: 'Suppliers',
  products: 'Products',
  categories: 'Categories',
  sales: 'Sales',
  invoices: 'Invoices',
  orders: 'Orders',
  returns: 'Returns',
  purchases: 'Purchases',
  inventory: 'Inventory',
  stock: 'Stock',
  warehouses: 'Warehouses',
  adjustments: 'Stock Adjustments',
  'low-stock': 'Low Stock',
  accounting: 'Accounting',
  ledger: 'General Ledger',
  journal: 'Journal Entries',
  payments: 'Payments',
  expenses: 'Expenses',
  reports: 'Reports',
  'profit-loss': 'Profit & Loss',
  'balance-sheet': 'Balance Sheet',
  customer: 'Customer Reports',
  purchase: 'Purchase Reports',
  gst: 'GST Compliance',
  analytics: 'Business Analytics',
  notifications: 'Notifications',
  whatsapp: 'WhatsApp Business',
  email: 'Email Delivery',
  employees: 'Employees & Staff',
  roles: 'Roles & Permissions',
  settings: 'Settings',
  profile: 'Profile',
  business: 'Business Settings',
  users: 'User Management',
  security: 'Security',
  integrations: 'Integrations',
  new: 'Create New',
};

export function AdminBreadcrumb({ customItems }: { customItems?: { label: string; href?: string }[] }) {
  const pathname = usePathname();

  if (customItems && customItems.length > 0) {
    return (
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-2">
        <Link href="/admin/dashboard" className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors">
          <Home className="w-3.5 h-3.5 text-slate-400" />
        </Link>
        {customItems.map((item, idx) => {
          const isLast = idx === customItems.length - 1;
          return (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3 h-3 text-slate-300 dark:text-slate-600 shrink-0" />
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className={`font-semibold ${isLast ? 'text-slate-900 dark:text-white' : ''}`}>
                  {item.label}
                </span>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    );
  }

  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0 || (segments.length === 1 && segments[0] === 'admin')) {
    return null;
  }

  // Filter out 'admin' from visible crumbs if preferred, but keep it in links
  const visibleSegments = segments.filter((s, i) => !(i === 0 && s === 'admin'));

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-3">
      <Link href="/admin/dashboard" className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors" title="Dashboard">
        <Home className="w-3.5 h-3.5 text-slate-400" />
        <span>Dashboard</span>
      </Link>

      {visibleSegments.map((seg, idx) => {
        // Skip dashboard since Home already links to it
        if (seg === 'dashboard') return null;

        const isLast = idx === visibleSegments.length - 1;
        const href = '/admin/' + visibleSegments.slice(0, idx + 1).join('/');
        const label = SEGMENT_NAMES[seg] || seg.charAt(0).toUpperCase() + seg.slice(1);

        return (
          <React.Fragment key={seg + idx}>
            <ChevronRight className="w-3 h-3 text-slate-300 dark:text-slate-600 shrink-0" />
            {isLast ? (
              <span className="font-semibold text-slate-900 dark:text-white truncate">
                {label}
              </span>
            ) : (
              <Link href={href} className="hover:text-slate-900 dark:hover:text-white transition-colors truncate">
                {label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
