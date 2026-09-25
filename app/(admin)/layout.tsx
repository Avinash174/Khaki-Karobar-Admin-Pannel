'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminSidebar } from '@/components/AdminSidebar';
import { AdminHeader } from '@/components/AdminHeader';
import { CommandPalette } from '@/components/CommandPalette';
import { CheckCircle2 } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [user, setUser] = useState<any>(null);
  const [activeBusiness, setActiveBusiness] = useState<any>({ name: 'Khaki General Store' });
  const [authStatus, setAuthStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4500);
  };

  // Check auth on mount — redirect unauthenticated users to /login
  useEffect(() => {
    const savedToken = localStorage.getItem('khaki_access_token');
    const savedUser = localStorage.getItem('khaki_user');

    if (!savedToken || savedToken === 'undefined' || savedToken === 'null' || savedToken.trim().length <= 10) {
      localStorage.removeItem('khaki_access_token');
      localStorage.removeItem('khaki_refresh_token');
      localStorage.removeItem('khaki_user');
      localStorage.removeItem('khaki_active_business_id');
      setAuthStatus('unauthenticated');
      router.replace('/login');
      return;
    }

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {}
    }
    setAuthStatus('authenticated');
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('khaki_access_token');
    localStorage.removeItem('khaki_refresh_token');
    localStorage.removeItem('khaki_user');
    localStorage.removeItem('khaki_active_business_id');
    setAuthStatus('unauthenticated');
    router.replace('/login');
  };

  // ⌘K keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  if (authStatus === 'loading') {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-50 dark:bg-[#090D16]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-500 font-medium">Verifying Khaki Karobar Session...</p>
        </div>
      </div>
    );
  }

  if (authStatus === 'unauthenticated') {
    return null;
  }

  return (
    <div className="h-screen overflow-hidden bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-slate-100 flex transition-colors duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[100] p-4 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-2xl shadow-2xl text-xs font-semibold flex items-center gap-2.5 animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />

      {/* Left Sidebar */}
      <AdminSidebar
        isOpenMobile={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onLogout={handleLogout}
      />

      {/* Main area: header + scrollable content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <AdminHeader
          user={user}
          activeBusiness={activeBusiness}
          onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          onLogout={handleLogout}
        />

        {/* Page content — only this scrolls */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
