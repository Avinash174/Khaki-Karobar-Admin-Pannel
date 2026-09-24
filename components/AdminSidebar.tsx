'use client';

import React from 'react';
import {
  LayoutDashboard,
  FileText,
  Users,
  Package,
  CreditCard,
  Building2,
  Receipt,
  ShoppingBag,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';

export type AdminTab =
  | 'dashboard'
  | 'invoices'
  | 'customers'
  | 'products'
  | 'accounting'
  | 'gst'
  | 'payments';

interface AdminSidebarProps {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function AdminSidebar({
  activeTab,
  onSelectTab,
  isOpenMobile,
  onCloseMobile,
  collapsed,
  onToggleCollapse,
}: AdminSidebarProps) {
  const navSections = [
    {
      title: 'Operations',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'invoices', label: 'Sales & Invoices', icon: FileText },
        { id: 'customers', label: 'Customers CRM', icon: Users },
        { id: 'products', label: 'Products & Stock', icon: Package },
      ],
    },
    {
      title: 'Finance & Statutory',
      items: [
        { id: 'accounting', label: 'Accounting & P&L', icon: CreditCard },
        { id: 'gst', label: 'GST Compliance', icon: Building2 },
        { id: 'payments', label: 'Payment Ledger', icon: Receipt },
      ],
    },
  ];

  const content = (
    <aside
      className={`h-full bg-white dark:bg-[#121927] border-r border-slate-200/80 dark:border-[#222E42] flex flex-col justify-between transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div>
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-100 dark:border-[#222E42]">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center font-extrabold text-white text-xl shadow-lg shadow-red-600/30 shrink-0">
              K
            </div>
            {!collapsed && (
              <div className="truncate">
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                  KHAKI <span className="text-red-600">KAROBARI</span>
                </span>
                <p className="text-[9px] text-slate-400 uppercase tracking-widest font-mono">
                  By Khaki KrypTech
                </p>
              </div>
            )}
          </div>

          {/* Mobile close button */}
          <button
            onClick={onCloseMobile}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Groups */}
        <div className="p-3 space-y-6 overflow-y-auto">
          {navSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1.5">
              {!collapsed && (
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3">
                  {section.title}
                </p>
              )}
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectTab(item.id as AdminTab);
                      onCloseMobile();
                    }}
                    title={collapsed ? item.label : undefined}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all relative ${
                      isActive
                        ? 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 shadow-sm shadow-red-500/10'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {/* Active Red Pill Indicator */}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-red-600 rounded-r-full" />
                    )}

                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-slate-400 dark:text-slate-500'
                      }`}
                    />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Collapse Action (Desktop) */}
      <div className="p-3 border-t border-slate-100 dark:border-[#222E42] hidden lg:block">
        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center gap-2 p-2 rounded-xl text-xs text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span className="text-[11px] font-medium">Collapse Menu</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <div className="hidden lg:block shrink-0">{content}</div>

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
