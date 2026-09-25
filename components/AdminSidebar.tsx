'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Users,
  Truck,
  Package,
  Tags,
  UserRound,
  ReceiptText,
  ShoppingCart,
  Undo2,
  CreditCard,
  ClipboardList,
  Boxes,
  Warehouse,
  SlidersHorizontal,
  TriangleAlert,
  BookOpen,
  BookText,
  Receipt,
  ChartNoAxesCombined,
  Scale,
  BarChart3,
  ShoppingBag,
  FileText,
  TrendingUp,
  Bell,
  MessageCircle,
  Mail,
  Settings,
  User,
  ShieldCheck,
  Plug,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  icon: any;
  href: string;
  isAction?: boolean;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

const NAV_STRUCTURE: NavSection[] = [
  {
    title: 'MAIN',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
    ],
  },
  {
    title: 'BUSINESS',
    items: [
      { id: 'customers', label: 'Customers', icon: Users, href: '/admin/customers' },
      { id: 'suppliers', label: 'Suppliers', icon: Truck, href: '/admin/suppliers' },
      { id: 'products', label: 'Products', icon: Package, href: '/admin/products' },
      { id: 'categories', label: 'Categories', icon: Tags, href: '/admin/categories' },
      { id: 'employees', label: 'Employees', icon: UserRound, href: '/admin/employees' },
    ],
  },
  {
    title: 'SALES',
    items: [
      { id: 'invoices', label: 'Invoices', icon: ReceiptText, href: '/admin/sales/invoices' },
      { id: 'orders', label: 'Orders', icon: ShoppingCart, href: '/admin/sales/orders' },
      { id: 'returns', label: 'Returns', icon: Undo2, href: '/admin/sales/returns' },
      { id: 'payments', label: 'Payments', icon: CreditCard, href: '/admin/payments' },
    ],
  },
  {
    title: 'PURCHASE',
    items: [
      { id: 'purchase-orders', label: 'Purchase Orders', icon: ClipboardList, href: '/admin/purchases/orders' },
      { id: 'purchase-returns', label: 'Purchase Returns', icon: Undo2, href: '/admin/purchases/returns' },
    ],
  },
  {
    title: 'INVENTORY',
    items: [
      { id: 'inventory-stock', label: 'Stock', icon: Boxes, href: '/admin/inventory/stock' },
      { id: 'inventory-warehouses', label: 'Warehouses', icon: Warehouse, href: '/admin/inventory/warehouses' },
      { id: 'inventory-adjustments', label: 'Stock Adjustments', icon: SlidersHorizontal, href: '/admin/inventory/adjustments' },
      { id: 'inventory-low-stock', label: 'Low Stock', icon: TriangleAlert, href: '/admin/inventory/low-stock' },
    ],
  },
  {
    title: 'ACCOUNTING',
    items: [
      { id: 'accounting-ledger', label: 'Ledger', icon: BookOpen, href: '/admin/accounting/ledger' },
      { id: 'accounting-journal', label: 'Journal', icon: BookText, href: '/admin/accounting/journal' },
      { id: 'expenses', label: 'Expenses', icon: Receipt, href: '/admin/expenses' },
      { id: 'profit-loss', label: 'Profit & Loss', icon: ChartNoAxesCombined, href: '/admin/reports/profit-loss' },
      { id: 'balance-sheet', label: 'Balance Sheet', icon: Scale, href: '/admin/reports/balance-sheet' },
    ],
  },
  {
    title: 'REPORTS',
    items: [
      { id: 'rep-sales', label: 'Sales Report', icon: BarChart3, href: '/admin/reports/sales' },
      { id: 'rep-purchase', label: 'Purchase Report', icon: ShoppingBag, href: '/admin/reports/purchase' },
      { id: 'rep-inventory', label: 'Inventory Report', icon: Boxes, href: '/admin/reports/inventory' },
      { id: 'rep-customers', label: 'Customer Report', icon: Users, href: '/admin/reports/customers' },
      { id: 'rep-gst', label: 'GST Report', icon: FileText, href: '/admin/reports/gst' },
      { id: 'rep-analytics', label: 'Business Analytics', icon: TrendingUp, href: '/admin/reports/analytics' },
    ],
  },
  {
    title: 'COMMUNICATION',
    items: [
      { id: 'notifications', label: 'Notifications', icon: Bell, href: '/admin/notifications' },
      { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, href: '/admin/whatsapp' },
      { id: 'email', label: 'Email', icon: Mail, href: '/admin/email' },
    ],
  },
  {
    title: 'SYSTEM',
    items: [
      { id: 'settings', label: 'Settings', icon: Settings, href: '/admin/settings' },
      { id: 'profile', label: 'Profile', icon: User, href: '/admin/settings/profile' },
      { id: 'security', label: 'Security', icon: ShieldCheck, href: '/admin/settings/security' },
      { id: 'integrations', label: 'Integrations', icon: Plug, href: '/admin/settings/integrations' },
      { id: 'logout', label: 'Logout', icon: LogOut, href: '#logout', isAction: true },
    ],
  },
];

// Flatten all items to compute active specificity
const ALL_NAV_ITEMS = NAV_STRUCTURE.flatMap((section) => section.items);

interface AdminSidebarProps {
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onLogout?: () => void;
}

export function AdminSidebar({
  isOpenMobile,
  onCloseMobile,
  collapsed,
  onToggleCollapse,
  onLogout,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Precise route active matching: guarantees only one item is active at a time
  const isItemActive = (href: string) => {
    if (!href || href === '#logout') return false;
    const cleanHref = href.split('?')[0];
    const cleanPath = pathname.split('?')[0];

    // Direct exact match
    if (cleanHref === cleanPath) return true;

    // Special dashboard aliases
    if (cleanHref === '/admin/dashboard' && (cleanPath === '/admin' || cleanPath === '/' || cleanPath === '/dashboard')) {
      return true;
    }

    // Special customer report alias check
    if (cleanHref === '/admin/reports/customers' && cleanPath === '/admin/reports/customer') {
      return true;
    }

    // Direct top-level alias matches
    if (cleanHref.startsWith('/admin/')) {
      const aliasPath = cleanHref.replace('/admin/', '/');
      if (cleanPath === aliasPath || cleanPath.startsWith(aliasPath + '/')) {
        return true;
      }
      if (cleanHref === '/admin/sales/invoices' && (cleanPath === '/invoices' || cleanPath.startsWith('/invoices/'))) {
        return true;
      }
      if (cleanHref === '/admin/accounting/ledger' && (cleanPath === '/accounting' || cleanPath.startsWith('/accounting/'))) {
        return true;
      }
      if (cleanHref === '/admin/reports/gst' && (cleanPath === '/gst' || cleanPath.startsWith('/gst/'))) {
        return true;
      }
    }

    // If current path starts with cleanHref + '/', verify there's no more specific route in the sidebar
    if (cleanPath.startsWith(cleanHref + '/')) {
      const hasMoreSpecific = ALL_NAV_ITEMS.some((other) => {
        if (other.isAction || other.href === cleanHref) return false;
        const otherHref = other.href.split('?')[0];
        return (
          otherHref.length > cleanHref.length &&
          (cleanPath === otherHref || cleanPath.startsWith(otherHref + '/'))
        );
      });
      return !hasMoreSpecific;
    }

    return false;
  };

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem('khaki_access_token');
      localStorage.removeItem('khaki_refresh_token');
      localStorage.removeItem('khaki_user');
      router.replace('/login');
    }
  };

  const content = (
    <aside
      className={`h-screen sticky top-0 bg-white dark:bg-[#0E131F] border-r border-slate-200/80 dark:border-[#1E293B] flex flex-col justify-between transition-all duration-300 select-none ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Header / Brand */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-slate-100 dark:border-[#1E293B] shrink-0 bg-white dark:bg-[#0E131F]">
        <Link
          href="/admin/dashboard"
          onClick={onCloseMobile}
          className="flex items-center overflow-hidden group"
        >
          {!collapsed ? (
            <div className="bg-white px-2.5 py-1 rounded-xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex items-center group-hover:border-red-200 transition-colors">
              <img
                src="/logo.png"
                alt="Khaki Karobar"
                className="h-8 w-auto max-w-[185px] object-contain"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 dark:border-slate-800/80 p-1 flex items-center justify-center overflow-hidden shadow-xs group-hover:scale-105 transition-transform">
              <img
                src="/logo.png"
                alt="Khaki Karobar"
                className="max-w-none h-6 -translate-x-3.5 object-cover"
              />
            </div>
          )}
        </Link>

        {/* Mobile close button */}
        <button
          onClick={onCloseMobile}
          className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg lg:hidden"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Menu — Single Scrollable Container, All Items Directly Visible (NO Accordions/Dropdowns) */}
      <nav className="p-3 space-y-4 flex-1 overflow-y-auto overflow-x-hidden [scrollbar-width:thin] scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800 scrollbar-track-transparent">
        {NAV_STRUCTURE.map((section) => (
          <div key={section.title} className="space-y-0.5">
            {/* Section Header */}
            {!collapsed ? (
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 pt-2 pb-1">
                {section.title}
              </p>
            ) : (
              <div className="w-8 h-px bg-slate-100 dark:bg-slate-800/80 mx-auto my-2" />
            )}

            {/* Individual Navigation Items */}
            {section.items.map((item) => {
              const Icon = item.icon;
              const active = isItemActive(item.href);

              // Special action for Logout
              if (item.isAction) {
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={handleLogoutClick}
                    title={collapsed ? item.label : undefined}
                    className={`w-full flex items-center ${
                      collapsed ? 'justify-center p-2.5' : 'gap-3 px-3 py-2'
                    } rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors group relative`}
                  >
                    <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </button>
                );
              }

              // Standard Link Item
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onCloseMobile}
                  title={collapsed ? item.label : undefined}
                  className={`w-full flex items-center ${
                    collapsed ? 'justify-center p-2.5' : 'gap-3 px-3 py-2'
                  } rounded-xl text-xs font-semibold transition-all relative group ${
                    active
                      ? 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 shadow-sm shadow-red-500/10 font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {/* Left Active Red Accent Indicator */}
                  {active && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-red-600 rounded-r-full" />
                  )}

                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      active
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white'
                    }`}
                  />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer Controls: Desktop Collapse Trigger */}
      <div className="p-3 border-t border-slate-100 dark:border-[#1E293B] shrink-0 bg-slate-50/50 dark:bg-[#0B0E17]/60">
        <button
          type="button"
          onClick={onToggleCollapse}
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          className="w-full flex items-center justify-center gap-2 p-1.5 rounded-lg text-xs text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span className="text-[11px] font-medium">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <div className="hidden lg:block h-screen shrink-0">{content}</div>

      {/* Mobile Slide-over Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
