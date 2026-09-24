'use client';

import React, { useEffect, useState } from 'react';
import {
  Search,
  FileText,
  Users,
  Package,
  CreditCard,
  Building2,
  X,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: any) => void;
}

export function CommandPalette({ isOpen, onClose, onSelectTab }: CommandPaletteProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickActions = [
    {
      category: 'Navigation',
      items: [
        { label: 'Go to Dashboard & Overview', tab: 'dashboard', icon: TrendingUp },
        { label: 'View Invoices & Create Bill', tab: 'invoices', icon: FileText },
        { label: 'Customer CRM Directory', tab: 'customers', icon: Users },
        { label: 'Catalog Products & Inventory Stock', tab: 'products', icon: Package },
        { label: 'Ledgers & Double-Entry P&L', tab: 'accounting', icon: CreditCard },
        { label: 'GST Compliance (GSTR-1 & 3B)', tab: 'gst', icon: Building2 },
      ],
    },
  ];

  const filteredItems = quickActions[0].items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-xl bg-white dark:bg-[#121927] border border-slate-200 dark:border-[#2A364F] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 border-b border-slate-200 dark:border-[#222E42]">
          <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search customers, bills, stock..."
            className="w-full py-4 bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3 max-h-80 overflow-y-auto space-y-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">
            Quick Navigation
          </p>
          {filteredItems.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">No matching commands found.</p>
          ) : (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    onSelectTab(item.tab);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-600 dark:hover:text-red-400 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-red-100 dark:group-hover:bg-red-900/40 text-slate-600 dark:text-slate-400 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span>{item.label}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              );
            })
          )}
        </div>

        <div className="bg-slate-50 dark:bg-[#0B0F19] px-4 py-2 border-t border-slate-200 dark:border-[#222E42] flex items-center justify-between text-[11px] text-slate-400">
          <span>Khaki Karobari Command Assistant</span>
          <div className="flex items-center gap-2">
            <span>Press</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono text-[10px]">
              ESC
            </kbd>
            <span>to close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
