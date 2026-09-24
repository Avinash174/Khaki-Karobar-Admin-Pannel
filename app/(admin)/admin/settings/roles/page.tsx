'use client';

import React, { useState } from 'react';
import {
  KeyRound,
  Shield,
  ShieldAlert,
  Save,
  CheckCircle2,
  Lock,
  Check,
  RotateCcw,
  Info,
} from 'lucide-react';

type RoleKey = 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'ACCOUNTANT' | 'SALES' | 'EMPLOYEE';

interface PermissionSet {
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  export: boolean;
}

const MODULES = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'leads', label: 'Leads & Inquiries' },
  { key: 'customers', label: 'Customers & CRM' },
  { key: 'products', label: 'Products & Catalog' },
  { key: 'inventory', label: 'Inventory & Stock' },
  { key: 'sales', label: 'Sales & Invoices' },
  { key: 'purchases', label: 'Purchases & Vendors' },
  { key: 'accounting', label: 'Accounting & Ledgers' },
  { key: 'reports', label: 'Reports & Analytics' },
  { key: 'settings', label: 'Settings & Security' },
];

const DEFAULT_ROLE_PERMS: Record<RoleKey, Record<string, PermissionSet>> = {
  SUPER_ADMIN: MODULES.reduce((acc, m) => {
    acc[m.key] = { view: true, create: true, edit: true, delete: true, export: true };
    return acc;
  }, {} as Record<string, PermissionSet>),

  ADMIN: MODULES.reduce((acc, m) => {
    acc[m.key] = {
      view: true,
      create: true,
      edit: true,
      delete: m.key !== 'settings',
      export: true,
    };
    return acc;
  }, {} as Record<string, PermissionSet>),

  MANAGER: MODULES.reduce((acc, m) => {
    acc[m.key] = {
      view: true,
      create: m.key !== 'settings',
      edit: m.key !== 'settings',
      delete: false,
      export: true,
    };
    return acc;
  }, {} as Record<string, PermissionSet>),

  ACCOUNTANT: MODULES.reduce((acc, m) => {
    const isFinance = ['dashboard', 'customers', 'sales', 'purchases', 'accounting', 'reports'].includes(m.key);
    acc[m.key] = {
      view: isFinance,
      create: ['sales', 'purchases', 'accounting'].includes(m.key),
      edit: ['sales', 'purchases', 'accounting'].includes(m.key),
      delete: false,
      export: isFinance,
    };
    return acc;
  }, {} as Record<string, PermissionSet>),

  SALES: MODULES.reduce((acc, m) => {
    const isSales = ['dashboard', 'leads', 'customers', 'products', 'sales'].includes(m.key);
    acc[m.key] = {
      view: isSales,
      create: ['leads', 'customers', 'sales'].includes(m.key),
      edit: ['leads', 'customers'].includes(m.key),
      delete: false,
      export: false,
    };
    return acc;
  }, {} as Record<string, PermissionSet>),

  EMPLOYEE: MODULES.reduce((acc, m) => {
    acc[m.key] = {
      view: ['dashboard', 'products', 'inventory'].includes(m.key),
      create: false,
      edit: false,
      delete: false,
      export: false,
    };
    return acc;
  }, {} as Record<string, PermissionSet>),
};

export default function RolesSettingsPage() {
  const [selectedRole, setSelectedRole] = useState<RoleKey>('ADMIN');
  const [rolePermissions, setRolePermissions] = useState(DEFAULT_ROLE_PERMS);
  const [saving, setSaving] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  const isSuperAdmin = selectedRole === 'SUPER_ADMIN';

  const handleToggle = (moduleKey: string, permKey: keyof PermissionSet) => {
    if (isSuperAdmin) return; // Super admin cannot be downgraded

    setRolePermissions((prev) => ({
      ...prev,
      [selectedRole]: {
        ...prev[selectedRole],
        [moduleKey]: {
          ...prev[selectedRole][moduleKey],
          [permKey]: !prev[selectedRole][moduleKey][permKey],
        },
      },
    }));
  };

  const handleToggleRow = (moduleKey: string) => {
    if (isSuperAdmin) return;
    const current = rolePermissions[selectedRole][moduleKey];
    const allChecked = current.view && current.create && current.edit && current.delete && current.export;
    const targetState = !allChecked;

    setRolePermissions((prev) => ({
      ...prev,
      [selectedRole]: {
        ...prev[selectedRole],
        [moduleKey]: {
          view: targetState,
          create: targetState,
          edit: targetState,
          delete: targetState,
          export: targetState,
        },
      },
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessToast(false);

    setTimeout(() => {
      setSaving(false);
      setSuccessToast(true);
      setTimeout(() => setSuccessToast(false), 4000);
    }, 700);
  };

  const ROLES_LIST: { key: RoleKey; label: string; desc: string; usersCount: number }[] = [
    { key: 'SUPER_ADMIN', label: 'Super Admin', desc: 'Root access across all modules & settings', usersCount: 1 },
    { key: 'ADMIN', label: 'Admin', desc: 'Full business management & operational controls', usersCount: 2 },
    { key: 'MANAGER', label: 'Manager', desc: 'Supervises sales, purchase, and inventory workflows', usersCount: 3 },
    { key: 'ACCOUNTANT', label: 'Accountant', desc: 'Bookkeeping, ledgers, vouchers, and tax audits', usersCount: 2 },
    { key: 'SALES', label: 'Sales Executive', desc: 'Lead management, customer orders, and quotes', usersCount: 8 },
    { key: 'EMPLOYEE', label: 'Staff / Employee', desc: 'Read-only access to catalogs and assigned inventory', usersCount: 14 },
  ];

  return (
    <div className="space-y-6">
      {successToast && (
        <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>RBAC permission matrix saved successfully for role: {selectedRole}.</span>
        </div>
      )}

      {/* Role Selection Tabs */}
      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-red-600" />
              <span>Roles & Permission Matrix</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Define granular access controls, view/create/edit/delete/export privileges for every staff role.
            </p>
          </div>

          <button
            onClick={handleSave}
            disabled={saving || isSuperAdmin}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-sm shadow-red-600/25 disabled:opacity-50 self-start sm:self-auto"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? 'Saving...' : 'Save Permissions'}</span>
          </button>
        </div>

        {/* Roles Pill Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-1">
          {ROLES_LIST.map((r) => {
            const isSelected = selectedRole === r.key;
            return (
              <button
                key={r.key}
                type="button"
                onClick={() => setSelectedRole(r.key)}
                className={`p-3 rounded-xl text-left border transition-all ${
                  isSelected
                    ? 'border-red-600 bg-red-50/50 dark:bg-red-950/30 shadow-sm'
                    : 'border-slate-200 dark:border-[#222E42] hover:bg-slate-50 dark:hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold ${
                      isSelected ? 'text-red-600 dark:text-red-400' : 'text-slate-900 dark:text-white'
                    }`}
                  >
                    {r.label}
                  </span>
                  {r.key === 'SUPER_ADMIN' && <Lock className="w-3 h-3 text-red-600" />}
                </div>
                <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">{r.usersCount} users</p>
              </button>
            );
          })}
        </div>

        {/* Super Admin Notice */}
        {isSuperAdmin && (
          <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 rounded-xl flex items-center gap-2 text-xs text-red-700 dark:text-red-300">
            <Lock className="w-4 h-4 text-red-600 shrink-0" />
            <span>
              <strong>Super Admin</strong> retains absolute system privileges. Permissions cannot be downgraded or restricted.
            </span>
          </div>
        )}

        {/* Permissions Table Matrix */}
        <div className="border border-slate-200 dark:border-[#222E42] rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#0B0F19] font-bold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-[#222E42]">
              <tr>
                <th className="p-3.5 pl-4">System Module</th>
                <th className="p-3.5 text-center">View</th>
                <th className="p-3.5 text-center">Create</th>
                <th className="p-3.5 text-center">Edit</th>
                <th className="p-3.5 text-center">Delete</th>
                <th className="p-3.5 text-center">Export</th>
                <th className="p-3.5 text-right pr-4">Quick Toggle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-[#1E293B]">
              {MODULES.map((m) => {
                const perms = rolePermissions[selectedRole][m.key] || {
                  view: false,
                  create: false,
                  edit: false,
                  delete: false,
                  export: false,
                };

                return (
                  <tr
                    key={m.key}
                    className="hover:bg-slate-50/80 dark:hover:bg-[#1A2333]/50 transition-colors"
                  >
                    <td className="p-3.5 pl-4 font-bold text-slate-800 dark:text-slate-200">
                      {m.label}
                    </td>

                    {/* View */}
                    <td className="p-3.5 text-center">
                      <input
                        type="checkbox"
                        disabled={isSuperAdmin}
                        checked={perms.view}
                        onChange={() => handleToggle(m.key, 'view')}
                        className="w-4 h-4 rounded text-red-600 focus:ring-red-500 accent-red-600 cursor-pointer disabled:cursor-not-allowed"
                      />
                    </td>

                    {/* Create */}
                    <td className="p-3.5 text-center">
                      <input
                        type="checkbox"
                        disabled={isSuperAdmin}
                        checked={perms.create}
                        onChange={() => handleToggle(m.key, 'create')}
                        className="w-4 h-4 rounded text-red-600 focus:ring-red-500 accent-red-600 cursor-pointer disabled:cursor-not-allowed"
                      />
                    </td>

                    {/* Edit */}
                    <td className="p-3.5 text-center">
                      <input
                        type="checkbox"
                        disabled={isSuperAdmin}
                        checked={perms.edit}
                        onChange={() => handleToggle(m.key, 'edit')}
                        className="w-4 h-4 rounded text-red-600 focus:ring-red-500 accent-red-600 cursor-pointer disabled:cursor-not-allowed"
                      />
                    </td>

                    {/* Delete */}
                    <td className="p-3.5 text-center">
                      <input
                        type="checkbox"
                        disabled={isSuperAdmin}
                        checked={perms.delete}
                        onChange={() => handleToggle(m.key, 'delete')}
                        className="w-4 h-4 rounded text-red-600 focus:ring-red-500 accent-red-600 cursor-pointer disabled:cursor-not-allowed"
                      />
                    </td>

                    {/* Export */}
                    <td className="p-3.5 text-center">
                      <input
                        type="checkbox"
                        disabled={isSuperAdmin}
                        checked={perms.export}
                        onChange={() => handleToggle(m.key, 'export')}
                        className="w-4 h-4 rounded text-red-600 focus:ring-red-500 accent-red-600 cursor-pointer disabled:cursor-not-allowed"
                      />
                    </td>

                    {/* Quick Toggle Row */}
                    <td className="p-3.5 text-right pr-4">
                      <button
                        type="button"
                        disabled={isSuperAdmin}
                        onClick={() => handleToggleRow(m.key)}
                        className="text-[11px] font-semibold text-slate-500 hover:text-red-600 dark:hover:text-red-400 disabled:opacity-40"
                      >
                        All / None
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
