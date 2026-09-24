'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  User,
  Shield,
  Building2,
  Receipt,
  Percent,
  CreditCard,
  Users,
  KeyRound,
  Bell,
  Mail,
  MessageSquare,
  Palette,
  Globe,
  Boxes,
  Database,
  ChevronRight,
  Settings,
} from 'lucide-react';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

interface SettingsNavSection {
  title: string;
  items: {
    label: string;
    href: string;
    icon: any;
    badge?: string;
  }[];
}

const SETTINGS_SECTIONS: SettingsNavSection[] = [
  {
    title: 'Account',
    items: [
      { label: 'Profile', href: '/admin/settings/profile', icon: User },
      { label: 'Security & 2FA', href: '/admin/settings/security', icon: Shield },
    ],
  },
  {
    title: 'Business',
    items: [
      { label: 'Business Profile', href: '/admin/settings/business', icon: Building2 },
      { label: 'Invoice & Billing', href: '/admin/settings/invoice', icon: Receipt },
      { label: 'Tax & GST', href: '/admin/settings/tax', icon: Percent },
      { label: 'Payment Settings', href: '/admin/settings/payments', icon: CreditCard },
    ],
  },
  {
    title: 'Team',
    items: [
      { label: 'Users', href: '/admin/settings/users', icon: Users },
      { label: 'Roles & Permissions', href: '/admin/settings/roles', icon: KeyRound },
    ],
  },
  {
    title: 'Communication',
    items: [
      { label: 'Notifications', href: '/admin/settings/notifications', icon: Bell },
      { label: 'Email', href: '/admin/settings/email', icon: Mail },
      { label: 'WhatsApp', href: '/admin/settings/whatsapp', icon: MessageSquare },
    ],
  },
  {
    title: 'Application',
    items: [
      { label: 'Appearance', href: '/admin/settings/appearance', icon: Palette },
      { label: 'Language & Region', href: '/admin/settings/preferences', icon: Globe },
      { label: 'Integrations', href: '/admin/settings/integrations', icon: Boxes },
    ],
  },
  {
    title: 'Data',
    items: [
      { label: 'Backup & Data', href: '/admin/settings/backup', icon: Database },
    ],
  },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="space-y-6 animate-in fade-in duration-150 max-w-7xl">
      {/* Header with Breadcrumb */}
      <div>
        <AdminBreadcrumb
          customItems={[
            { label: 'Settings', href: '/admin/settings' },
          ]}
        />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-2">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Settings className="w-6 h-6 text-red-600" />
              <span>Settings</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Manage your business, account, security and application preferences.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Horizontal Navigation Tabs */}
      <div className="lg:hidden bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-2 shadow-sm">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none]">
          {SETTINGS_SECTIONS.flatMap(s => s.items).map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all shrink-0 ${
                  active
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Desktop Split Layout */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Settings Sidebar Menu */}
        <aside className="hidden lg:block w-64 bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-3 shadow-sm shrink-0 space-y-4 sticky top-20">
          {SETTINGS_SECTIONS.map((section) => (
            <div key={section.title} className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 py-1">
                {section.title}
              </p>
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all relative group ${
                      active
                        ? 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-bold shadow-sm shadow-red-500/10'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          active
                            ? 'text-red-600 dark:text-red-400'
                            : 'text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-normal">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </aside>

        {/* Right Settings Content Canvas */}
        <main className="flex-1 min-w-0 w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
