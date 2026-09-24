'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  UserPlus,
  Users,
  Truck,
  Package,
  Tags,
  ShoppingCart,
  ShoppingBag,
  Boxes,
  Calculator,
  BarChart3,
  Bell,
  MessageSquare,
  Mail,
  UserCheck,
  Shield,
  Settings,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  X,
  LogOut,
  Sparkles,
} from 'lucide-react';

export interface NavSubItem {
  id: string;
  label: string;
  href: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: any;
  href?: string;
  subItems?: NavSubItem[];
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
      { id: 'leads', label: 'Leads', icon: UserPlus, href: '/admin/leads' },
      { id: 'customers', label: 'Customers', icon: Users, href: '/admin/customers' },
      { id: 'suppliers', label: 'Suppliers', icon: Truck, href: '/admin/suppliers' },
      { id: 'products', label: 'Products', icon: Package, href: '/admin/products' },
      { id: 'categories', label: 'Categories', icon: Tags, href: '/admin/categories' },
    ],
  },
  {
    title: 'SALES',
    items: [
      {
        id: 'sales-group',
        label: 'Sales',
        icon: ShoppingCart,
        subItems: [
          { id: 'invoices', label: 'Invoices', href: '/admin/sales/invoices' },
          { id: 'orders', label: 'Orders', href: '/admin/sales/orders' },
          { id: 'returns', label: 'Returns', href: '/admin/sales/returns' },
          { id: 'payments', label: 'Payments', href: '/admin/payments' },
        ],
      },
    ],
  },
  {
    title: 'PURCHASE',
    items: [
      {
        id: 'purchases-group',
        label: 'Purchases',
        icon: ShoppingBag,
        subItems: [
          { id: 'purchase-orders', label: 'Purchase Orders', href: '/admin/purchases/orders' },
          { id: 'purchase-returns', label: 'Purchase Returns', href: '/admin/purchases/returns' },
          { id: 'purchase-suppliers', label: 'Suppliers', href: '/admin/suppliers' },
        ],
      },
    ],
  },
  {
    title: 'INVENTORY',
    items: [
      {
        id: 'inventory-group',
        label: 'Inventory',
        icon: Boxes,
        subItems: [
          { id: 'inventory-stock', label: 'Stock', href: '/admin/inventory/stock' },
          { id: 'inventory-warehouses', label: 'Warehouses', href: '/admin/inventory/warehouses' },
          { id: 'inventory-adjustments', label: 'Stock Adjustments', href: '/admin/inventory/adjustments' },
          { id: 'inventory-low-stock', label: 'Low Stock', href: '/admin/inventory/low-stock' },
        ],
      },
    ],
  },
  {
    title: 'ACCOUNTING',
    items: [
      {
        id: 'accounting-group',
        label: 'Accounting',
        icon: Calculator,
        subItems: [
          { id: 'acc-ledger', label: 'Ledger', href: '/admin/accounting/ledger' },
          { id: 'acc-journal', label: 'Journal', href: '/admin/accounting/journal' },
          { id: 'acc-expenses', label: 'Expenses', href: '/admin/expenses' },
          { id: 'acc-pl', label: 'Profit & Loss', href: '/admin/reports/profit-loss' },
          { id: 'acc-bs', label: 'Balance Sheet', href: '/admin/reports/balance-sheet' },
        ],
      },
    ],
  },
  {
    title: 'REPORTS',
    items: [
      {
        id: 'reports-group',
        label: 'Reports',
        icon: BarChart3,
        subItems: [
          { id: 'rep-sales', label: 'Sales Report', href: '/admin/reports/sales' },
          { id: 'rep-purchase', label: 'Purchase Report', href: '/admin/reports/purchase' },
          { id: 'rep-inventory', label: 'Inventory Report', href: '/admin/reports/inventory' },
          { id: 'rep-customer', label: 'Customer Report', href: '/admin/reports/customer' },
          { id: 'rep-gst', label: 'GST Report', href: '/admin/reports/gst' },
          { id: 'rep-pl', label: 'Profit & Loss', href: '/admin/reports/profit-loss' },
          { id: 'rep-analytics', label: 'Business Analytics', href: '/admin/reports/analytics' },
        ],
      },
    ],
  },
  {
    title: 'COMMUNICATION',
    items: [
      { id: 'notifications', label: 'Notifications', icon: Bell, href: '/admin/notifications' },
      { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare, href: '/admin/whatsapp' },
      { id: 'email', label: 'Email', icon: Mail, href: '/admin/email' },
    ],
  },
  {
    title: 'TEAM',
    items: [
      { id: 'employees', label: 'Employees', icon: UserCheck, href: '/admin/employees' },
      { id: 'roles', label: 'Roles & Permissions', icon: Shield, href: '/admin/roles' },
    ],
  },
  {
    title: 'SYSTEM',
    items: [
      {
        id: 'settings-group',
        label: 'Settings',
        icon: Settings,
        href: '/admin/settings',
        subItems: [
          { id: 'set-profile', label: 'Profile', href: '/admin/settings?tab=profile' },
          { id: 'set-business', label: 'Business Settings', href: '/admin/settings?tab=business' },
          { id: 'set-users', label: 'Users', href: '/admin/settings?tab=users' },
          { id: 'set-roles', label: 'Roles & Permissions', href: '/admin/settings?tab=roles' },
          { id: 'set-notif', label: 'Notifications', href: '/admin/settings?tab=notifications' },
          { id: 'set-security', label: 'Security', href: '/admin/settings?tab=security' },
          { id: 'set-integrations', label: 'Integrations', href: '/admin/settings?tab=integrations' },
        ],
      },
    ],
  },
];

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
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  // Auto-expand group if any of its subItems match the current pathname
  useEffect(() => {
    const updated: Record<string, boolean> = { ...openGroups };
    NAV_STRUCTURE.forEach((sec) => {
      sec.items.forEach((item) => {
        if (item.subItems) {
          const hasActiveChild = item.subItems.some((sub) => {
            const cleanSub = sub.href.split('?')[0];
            return pathname === cleanSub || pathname.startsWith(cleanSub + '/');
          });
          if (hasActiveChild) {
            updated[item.id] = true;
          }
        }
      });
    });
    setOpenGroups(updated);
  }, [pathname]);

  const toggleGroup = (groupId: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  // Match item active state accurately without partial confusion
  const isItemActive = (href?: string) => {
    if (!href) return false;
    const cleanHref = href.split('?')[0];
    if (cleanHref === '/admin/dashboard' || cleanHref === '/dashboard') {
      return pathname === '/admin/dashboard' || pathname === '/dashboard' || pathname === '/';
    }
    return pathname === cleanHref || pathname.startsWith(cleanHref + '/');
  };

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem('khaki_access_token');
      localStorage.removeItem('khaki_refresh_token');
      localStorage.removeItem('khaki_user');
      window.location.href = '/login';
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
          className="flex items-center gap-3 overflow-hidden group"
        >
          <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center font-black text-white text-xl shadow-lg shadow-red-600/30 shrink-0 group-hover:scale-105 transition-transform">
            K
          </div>
          {!collapsed && (
            <div className="truncate">
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                Khaki <span className="text-red-600">Karobar</span>
              </span>
              <p className="text-[9px] text-slate-400 uppercase tracking-widest font-mono">
                Business Management
              </p>
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

      {/* Navigation Menu — Clean, unified, single scrollable area if needed, no double scrollbars */}
      <nav className="p-3 space-y-5 flex-1 overflow-y-auto overflow-x-hidden [scrollbar-width:thin]">
        {NAV_STRUCTURE.map((section) => (
          <div key={section.title} className="space-y-1">
            {!collapsed && (
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 py-1">
                {section.title}
              </p>
            )}

            {section.items.map((item) => {
              const Icon = item.icon;
              const hasSubItems = item.subItems && item.subItems.length > 0;
              const isGroupOpen = !!openGroups[item.id];
              const active = item.href ? isItemActive(item.href) : false;
              const anyChildActive = item.subItems?.some((sub) => isItemActive(sub.href));

              // If item has sub-items (Collapsible group)
              if (hasSubItems) {
                return (
                  <div key={item.id} className="space-y-1">
                    <button
                      type="button"
                      onClick={() => toggleGroup(item.id)}
                      title={collapsed ? item.label : undefined}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all relative group ${
                        anyChildActive
                          ? 'text-red-600 dark:text-red-400 bg-red-50/70 dark:bg-red-950/30'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3 truncate">
                        <Icon
                          className={`w-4 h-4 shrink-0 transition-colors ${
                            anyChildActive
                              ? 'text-red-600 dark:text-red-400'
                              : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white'
                          }`}
                        />
                        {!collapsed && <span className="truncate">{item.label}</span>}
                      </div>

                      {!collapsed && (
                        <div className="shrink-0 text-slate-400 transition-transform duration-200">
                          {isGroupOpen ? (
                            <ChevronDown className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5" />
                          )}
                        </div>
                      )}
                    </button>

                    {/* Submenu items */}
                    {!collapsed && isGroupOpen && (
                      <div className="pl-9 pr-1 space-y-0.5 border-l border-slate-100 dark:border-slate-800 ml-4 py-1">
                        {item.subItems!.map((sub) => {
                          const subActive = isItemActive(sub.href);
                          return (
                            <Link
                              key={sub.id}
                              href={sub.href}
                              onClick={onCloseMobile}
                              className={`block px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                subActive
                                  ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 font-semibold'
                                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/40'
                              }`}
                            >
                              {sub.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              // Standard Link Item
              return (
                <Link
                  key={item.id}
                  href={item.href!}
                  onClick={onCloseMobile}
                  title={collapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all relative group ${
                    active
                      ? 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 shadow-sm shadow-red-500/10'
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

      {/* Footer Controls: Settings + Logout + Collapse Toggle */}
      <div className="p-3 border-t border-slate-100 dark:border-[#1E293B] shrink-0 bg-slate-50/50 dark:bg-[#0B0E17]/60 space-y-1">
        {/* Settings */}
        <Link
          href="/admin/settings"
          onClick={onCloseMobile}
          title={collapsed ? 'Settings' : undefined}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
            isItemActive('/admin/settings')
              ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Settings className="w-4 h-4 shrink-0 text-slate-400 dark:text-slate-500" />
          {!collapsed && <span>Settings</span>}
        </Link>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogoutClick}
          title={collapsed ? 'Sign Out' : undefined}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>

        {/* Desktop Collapse Trigger */}
        <div className="hidden lg:block pt-1">
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
