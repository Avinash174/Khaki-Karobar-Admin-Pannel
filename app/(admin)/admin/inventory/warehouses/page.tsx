'use client';

import React, { useState } from 'react';
import { Building2, Search, Plus, MapPin, Package, Phone, CheckCircle2 } from 'lucide-react';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

interface Warehouse {
  id: string;
  name: string;
  code: string;
  city: string;
  address: string;
  manager: string;
  phone: string;
  capacityPct: number;
  totalItems: number;
  isPrimary: boolean;
}

const INITIAL_WAREHOUSES: Warehouse[] = [
  { id: 'wh-1', name: 'Central Distribution Godown (Pune)', code: 'WH-PUN-01', city: 'Pune', address: 'Plot 42, Marketyard Logistics Park, Pune', manager: 'Sanjay More', phone: '9822998877', capacityPct: 78, totalItems: 980, isPrimary: true },
  { id: 'wh-2', name: 'Bhiwandi Regional Depot (Mumbai)', code: 'WH-MUM-02', city: 'Mumbai', address: 'Bhiwandi Warehousing Hub, Mumbai', manager: 'Nilesh Sawant', phone: '9820112233', capacityPct: 45, totalItems: 340, isPrimary: false },
  { id: 'wh-3', name: 'Kolhapur Retail Annex Godown', code: 'WH-KOL-03', city: 'Kolhapur', address: 'Shiroli MIDC, Kolhapur', manager: 'Vinay Jadhav', phone: '9422556677', capacityPct: 32, totalItems: 100, isPrimary: false },
];

export default function WarehousesPage() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>(INITIAL_WAREHOUSES);
  const [search, setSearch] = useState('');

  const filtered = warehouses.filter(
    (w) =>
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.code.toLowerCase().includes(search.toLowerCase()) ||
      w.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <AdminBreadcrumb
        customItems={[
          { label: 'Inventory', href: '/admin/inventory' },
          { label: 'Warehouses' },
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Building2 className="w-6 h-6 text-red-600" />
            <span>Godowns & Multi-Warehouse Hubs</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage multi-location inventory storage, storage capacity, and dispatch depots.
          </p>
        </div>

        <button
          onClick={() => alert('New Warehouse Dialog')}
          className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-red-600/30 flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Godown / Depot</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {filtered.map((w) => (
          <div
            key={w.id}
            className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-5 shadow-sm space-y-4 hover:border-red-600/40 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider block">
                  {w.code}
                </span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white mt-0.5">
                  {w.name}
                </h3>
              </div>
              {w.isPrimary && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 dark:bg-red-950/50 text-red-600 border border-red-200">
                  Primary Hub
                </span>
              )}
            </div>

            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span className="text-[11px] text-slate-500">{w.address}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-mono text-[11px]">{w.manager} ({w.phone})</span>
              </div>
            </div>

            {/* Capacity Progress Bar */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">Occupancy</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{w.capacityPct}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-600 rounded-full"
                  style={{ width: `${w.capacityPct}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 pt-1">
                <span>Total Items Stored</span>
                <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{w.totalItems} Units</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
