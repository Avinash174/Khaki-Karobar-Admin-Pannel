'use client';

import React from 'react';
import { Shield, Plus, CheckCircle2, Lock, Users } from 'lucide-react';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

export default function RolesAndPermissionsPage() {
  const roles = [
    { name: 'SUPER_ADMIN', label: 'Super Administrator', users: 1, desc: 'Unrestricted full access across multi-business settings, database audits, and billing.' },
    { name: 'STORE_MANAGER', label: 'Store & Godown Manager', users: 2, desc: 'Manage stock inwards, dispatch orders, warehouse transfers, and view stock valuation.' },
    { name: 'ACCOUNTANT', label: 'Senior Accountant', users: 1, desc: 'General ledger, journal entries, P&L generation, GSTR-1, and payment reconciliations.' },
    { name: 'SALES_EXECUTIVE', label: 'Counter Sales Executive', users: 4, desc: 'Create invoices, register walk-in retail customers, and collect counter cash/UPI.' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-150 max-w-4xl">
      <AdminBreadcrumb customItems={[{ label: 'Roles & Permissions' }]} />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Shield className="w-6 h-6 text-red-600" />
            <span>Roles & Access Control (RBAC)</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Configure permission matrices for billing, inventory, reporting, and settings modules.
          </p>
        </div>

        <button
          onClick={() => alert('Create Custom Role Dialog')}
          className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-red-600/30 flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create Custom Role</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roles.map((r) => (
          <div
            key={r.name}
            className="p-5 rounded-2xl bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-red-600 dark:text-red-400">
                {r.name}
              </span>
              <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                {r.users} Users Assigned
              </span>
            </div>

            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              {r.label}
            </h3>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {r.desc}
            </p>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" /> Active in Production
              </span>
              <button
                onClick={() => alert(`Editing permissions for ${r.label}`)}
                className="text-red-600 hover:underline font-bold"
              >
                Edit Matrix
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
