'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Search,
  Bell,
  Building2,
  ChevronDown,
  User,
  LogOut,
  Settings,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { ThemeToggle } from './ThemeProvider';

interface AdminHeaderProps {
  user: any;
  activeBusiness: any;
  onToggleSidebar: () => void;
  onOpenCommandPalette: () => void;
  onLogout: () => void;
}

export function AdminHeader({
  user,
  activeBusiness,
  onToggleSidebar,
  onOpenCommandPalette,
  onLogout,
}: AdminHeaderProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 dark:bg-[#121927]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-[#222E42] px-4 sm:px-6 flex items-center justify-between transition-colors">
      {/* Left: Mobile Toggle & Command Search */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors lg:hidden"
          title="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Command Search Bar */}
        <button
          onClick={onOpenCommandPalette}
          className="flex items-center gap-2.5 px-3 py-1.5 bg-slate-100 dark:bg-[#0B0F19] hover:bg-slate-200/80 dark:hover:bg-[#161F30] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-500 dark:text-slate-400 transition-all w-52 sm:w-72 justify-between group shadow-inner"
        >
          <div className="flex items-center gap-2 truncate">
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-500 transition-colors shrink-0" />
            <span className="truncate">Search records, invoices...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-[#1E293B] text-slate-600 dark:text-slate-300 rounded border border-slate-300 dark:border-slate-700 shadow-sm shrink-0">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Controls: Business Selector, Notifications, Theme Toggle, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Active Business Badge */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#222E42] rounded-xl text-xs">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <Building2 className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-800 dark:text-slate-200 max-w-[150px] truncate">
            {activeBusiness?.name ?? 'Khaki General Store'}
          </span>
        </div>

        {/* Theme Toggle Component */}
        <ThemeToggle />

        {/* Notifications Popover */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl relative transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-600 rounded-full" />
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#1A2333] border border-slate-200 dark:border-[#2A364F] rounded-2xl shadow-2xl p-4 z-50 text-xs animate-in zoom-in-95 duration-100">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#2A364F]">
                <span className="font-bold text-slate-900 dark:text-white">Notifications</span>
                <span className="px-1.5 py-0.5 rounded-full bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 text-[10px] font-bold">
                  2 New
                </span>
              </div>
              <div className="py-2 space-y-2.5">
                <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-[#121927]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200 text-[11px]">
                      WhatsApp Cloud Dispatched
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-[10px]">
                      Invoice #INV-202609-0005 sent to customer
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-[#121927]">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200 text-[11px]">
                      Low Stock Threshold
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-[10px]">
                      Thermal Billing Rolls at 24 units
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1 sm:px-2 sm:py-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 text-white flex items-center justify-center font-bold text-xs shadow-sm shadow-red-500/20">
              {user?.name ? user.name[0].toUpperCase() : 'A'}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                {user?.name ?? 'Super Admin'}
              </p>
              <p className="text-[10px] text-slate-400 leading-none">
                {user?.role ?? 'Owner'}
              </p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#1A2333] border border-slate-200 dark:border-[#2A364F] rounded-2xl shadow-2xl p-2 z-50 text-xs animate-in zoom-in-95 duration-100 space-y-1">
              <div className="px-3 py-2 border-b border-slate-100 dark:border-[#2A364F]">
                <p className="font-bold text-slate-900 dark:text-white truncate">
                  {user?.name ?? 'Admin'}
                </p>
                <p className="text-[10px] text-slate-400 truncate">
                  {user?.phone ? `+91 ${user.phone}` : 'admin@khaki.com'}
                </p>
              </div>

              <div className="px-3 py-1.5 flex items-center gap-2 text-slate-600 dark:text-slate-300 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Role: <strong className="text-slate-900 dark:text-white">{user?.role ?? 'SUPER_ADMIN'}</strong></span>
              </div>

              <div className="pt-1 border-t border-slate-100 dark:border-[#2A364F] space-y-0.5">
                <a
                  href="/admin/settings?tab=profile"
                  onClick={() => setProfileOpen(false)}
                  className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Profile</span>
                </a>
                <a
                  href="/admin/settings"
                  onClick={() => setProfileOpen(false)}
                  className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Settings className="w-3.5 h-3.5 text-slate-400" />
                  <span>Settings</span>
                </a>
              </div>

              <div className="pt-1 border-t border-slate-100 dark:border-[#2A364F]">
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    onLogout();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 font-semibold transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
