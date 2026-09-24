'use client';

import React, { useState, useEffect } from 'react';
import {
  Palette,
  Sun,
  Moon,
  Laptop,
  Check,
  Layout,
  Table,
  Eye,
  Sliders,
  Sparkles,
  Save,
  CheckCircle2,
} from 'lucide-react';
import { useTheme, ThemeMode } from '@/components/ThemeProvider';

export default function AppearanceSettingsPage() {
  const { themeMode, resolvedTheme, setThemeMode } = useTheme();

  const [saving, setSaving] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  // UI Local Preferences
  const [compactTables, setCompactTables] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [sidebarDefaultOpen, setSidebarDefaultOpen] = useState(true);

  useEffect(() => {
    try {
      const savedTables = localStorage.getItem('khaki_compact_tables');
      if (savedTables) setCompactTables(JSON.parse(savedTables));
      const savedAnim = localStorage.getItem('khaki_animations');
      if (savedAnim) setAnimationsEnabled(JSON.parse(savedAnim));
      const savedSidebar = localStorage.getItem('khaki_sidebar_default');
      if (savedSidebar) setSidebarDefaultOpen(JSON.parse(savedSidebar));
    } catch {}
  }, []);

  const handleSelectTheme = (mode: ThemeMode) => {
    setThemeMode(mode);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessToast(false);

    try {
      localStorage.setItem('khaki_compact_tables', JSON.stringify(compactTables));
      localStorage.setItem('khaki_animations', JSON.stringify(animationsEnabled));
      localStorage.setItem('khaki_sidebar_default', JSON.stringify(sidebarDefaultOpen));
    } catch {}

    setTimeout(() => {
      setSaving(false);
      setSuccessToast(true);
      setTimeout(() => setSuccessToast(false), 4000);
    }, 500);
  };

  return (
    <div className="space-y-6">
      {successToast && (
        <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>Appearance styling and UI density preferences saved successfully.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Theme Selection Section */}
        <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm space-y-5">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Palette className="w-5 h-5 text-red-600" />
              <span>Color Theme & Mode</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Select your interface theme. Changes take effect instantly across the entire admin suite.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            {/* 1. Light Theme Card */}
            <div
              onClick={() => handleSelectTheme('light')}
              className={`group cursor-pointer rounded-2xl border-2 p-4 transition-all relative ${
                themeMode === 'light'
                  ? 'border-red-600 bg-red-50/20 dark:bg-red-950/20 shadow-md ring-2 ring-red-500/20'
                  : 'border-slate-200 dark:border-[#222E42] hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-[#0B0F19]'
              }`}
            >
              {/* Visual Preview Graphic */}
              <div className="w-full h-28 rounded-xl bg-white border border-slate-200 p-2.5 shadow-sm space-y-2 overflow-hidden mb-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-12 h-2 rounded bg-slate-200" />
                  </div>
                  <div className="w-3 h-3 rounded-full bg-slate-200" />
                </div>
                <div className="flex gap-2">
                  <div className="w-1/4 h-14 bg-slate-100 rounded p-1 space-y-1">
                    <div className="w-full h-1.5 bg-red-500/30 rounded" />
                    <div className="w-3/4 h-1.5 bg-slate-200 rounded" />
                    <div className="w-2/3 h-1.5 bg-slate-200 rounded" />
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <div className="w-full h-5 bg-slate-50 rounded border border-slate-100" />
                    <div className="w-full h-6 bg-slate-50 rounded border border-slate-100" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sun className={`w-4 h-4 ${themeMode === 'light' ? 'text-red-600' : 'text-slate-500'}`} />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Light Theme</span>
                </div>
                {themeMode === 'light' && (
                  <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                High contrast white background with crisp slate typography.
              </p>
            </div>

            {/* 2. Dark Theme Card */}
            <div
              onClick={() => handleSelectTheme('dark')}
              className={`group cursor-pointer rounded-2xl border-2 p-4 transition-all relative ${
                themeMode === 'dark'
                  ? 'border-red-600 bg-red-50/20 dark:bg-red-950/20 shadow-md ring-2 ring-red-500/20'
                  : 'border-slate-200 dark:border-[#222E42] hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-[#0B0F19]'
              }`}
            >
              {/* Visual Preview Graphic */}
              <div className="w-full h-28 rounded-xl bg-[#0B0F19] border border-[#222E42] p-2.5 shadow-sm space-y-2 overflow-hidden mb-3">
                <div className="flex items-center justify-between border-b border-[#1E293B] pb-1.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-600" />
                    <div className="w-12 h-2 rounded bg-slate-700" />
                  </div>
                  <div className="w-3 h-3 rounded-full bg-slate-700" />
                </div>
                <div className="flex gap-2">
                  <div className="w-1/4 h-14 bg-[#121927] rounded p-1 space-y-1">
                    <div className="w-full h-1.5 bg-red-900/60 rounded" />
                    <div className="w-3/4 h-1.5 bg-slate-700 rounded" />
                    <div className="w-2/3 h-1.5 bg-slate-700 rounded" />
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <div className="w-full h-5 bg-[#121927] rounded border border-[#222E42]" />
                    <div className="w-full h-6 bg-[#121927] rounded border border-[#222E42]" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Moon className={`w-4 h-4 ${themeMode === 'dark' ? 'text-red-600' : 'text-slate-400'}`} />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Dark Theme</span>
                </div>
                {themeMode === 'dark' && (
                  <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Signature deep navy #0B0F19 canvas engineered for low eye fatigue.
              </p>
            </div>

            {/* 3. System Theme Card */}
            <div
              onClick={() => handleSelectTheme('system')}
              className={`group cursor-pointer rounded-2xl border-2 p-4 transition-all relative ${
                themeMode === 'system'
                  ? 'border-red-600 bg-red-50/20 dark:bg-red-950/20 shadow-md ring-2 ring-red-500/20'
                  : 'border-slate-200 dark:border-[#222E42] hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-[#0B0F19]'
              }`}
            >
              {/* Visual Split Preview Graphic */}
              <div className="w-full h-28 rounded-xl border border-slate-200 dark:border-[#222E42] overflow-hidden mb-3 relative flex">
                <div className="w-1/2 h-full bg-white p-2 border-r border-slate-200 space-y-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-full h-8 bg-slate-100 rounded" />
                </div>
                <div className="w-1/2 h-full bg-[#0B0F19] p-2 space-y-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-600 ml-auto" />
                  <div className="w-full h-8 bg-[#121927] rounded" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Laptop className={`w-4 h-4 ${themeMode === 'system' ? 'text-red-600' : 'text-slate-500'}`} />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">System Sync</span>
                </div>
                {themeMode === 'system' && (
                  <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Synchronizes with OS light/dark schedule. Active: <span className="font-semibold capitalize text-red-600">{resolvedTheme}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Interface Density & Layout Preferences */}
        <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-red-600" />
              <span>Interface Density & Display Controls</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Customize data density, table row compacting, and transition animations.
            </p>
          </div>

          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/70 dark:bg-[#0B0F19]/60 border border-slate-200/60 dark:border-[#222E42]">
              <div className="flex items-center gap-3">
                <Table className="w-5 h-5 text-red-600 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Dense & Compact Data Tables</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Reduces vertical padding across sales, product, and inventory lists to view more rows per screen.
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={compactTables}
                  onChange={(e) => setCompactTables(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/70 dark:bg-[#0B0F19]/60 border border-slate-200/60 dark:border-[#222E42]">
              <div className="flex items-center gap-3">
                <Layout className="w-5 h-5 text-red-600 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Expanded Sidebar by Default</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Keep primary left navigation sidebar expanded showing complete text labels on desktop displays.
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={sidebarDefaultOpen}
                  onChange={(e) => setSidebarDefaultOpen(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/70 dark:bg-[#0B0F19]/60 border border-slate-200/60 dark:border-[#222E42]">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-red-600 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Fluid Micro-Animations</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Enable subtle card hover transitions and fade-in screen switches.
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={animationsEnabled}
                  onChange={(e) => setAnimationsEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>
          </div>

          <div className="flex justify-end pt-3">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-md shadow-red-600/25 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Appearance Preferences'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
