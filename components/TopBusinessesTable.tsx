'use client';

import React, { useState } from 'react';
import {
  Building2,
  Search,
  MoreVertical,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  Filter,
} from 'lucide-react';

export interface BusinessItem {
  id: string;
  name: string;
  owner: string;
  email?: string;
  phone?: string;
  plan: 'Starter' | 'Pro' | 'Enterprise';
  sales: number;
  status: 'Active' | 'Pending' | 'Suspended' | 'Trial';
  joinedDate: string;
}

interface TopBusinessesTableProps {
  businesses?: BusinessItem[];
  onManage?: (b: BusinessItem) => void;
}

const defaultBusinesses: BusinessItem[] = [
  {
    id: 'biz-1',
    name: 'Khaki General Store & Electronics',
    owner: 'Avinash Magar',
    email: 'avinash@khaki.com',
    phone: '9876543210',
    plan: 'Pro',
    sales: 45500,
    status: 'Active',
    joinedDate: 'Jan 2026',
  },
  {
    id: 'biz-2',
    name: 'Sharma Traders & Co.',
    owner: 'Ramesh Sharma',
    email: 'sharma@traders.in',
    phone: '9880103235',
    plan: 'Pro',
    sales: 28400,
    status: 'Active',
    joinedDate: 'Feb 2026',
  },
  {
    id: 'biz-3',
    name: 'KrypTech Retail Outlets',
    owner: 'Sanjay Magar',
    email: 'store@kryptech.com',
    phone: '9822001122',
    plan: 'Enterprise',
    sales: 82300,
    status: 'Active',
    joinedDate: 'Dec 2025',
  },
  {
    id: 'biz-4',
    name: 'Patil Medical & Distributors',
    owner: 'Dr. Anand Patil',
    email: 'patil@medical.in',
    phone: '9923114455',
    plan: 'Starter',
    sales: 15600,
    status: 'Trial',
    joinedDate: 'Mar 2026',
  },
];

export function TopBusinessesTable({
  businesses = defaultBusinesses,
  onManage,
}: TopBusinessesTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlan, setFilterPlan] = useState('ALL');

  const filtered = businesses.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = filterPlan === 'ALL' || b.plan === filterPlan;
    return matchesSearch && matchesPlan;
  });

  const getStatusBadge = (status: BusinessItem['status']) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-3 h-3" /> Active
          </span>
        );
      case 'Trial':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
            <Clock className="w-3 h-3" /> Trial
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
            <AlertCircle className="w-3 h-3" /> Pending
          </span>
        );
      case 'Suspended':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
            Suspended
          </span>
        );
    }
  };

  return (
    <div className="space-y-3">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter businesses by name, owner..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-red-600"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterPlan}
            onChange={(e) => setFilterPlan(e.target.value)}
            className="bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
          >
            <option value="ALL">All Subscription Plans</option>
            <option value="Starter">Starter Plan</option>
            <option value="Pro">Business Pro</option>
            <option value="Enterprise">Enterprise</option>
          </select>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-200/80 dark:border-[#222E42]">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-[#1A2333] border-b border-slate-200/80 dark:border-[#222E42] text-slate-400 font-semibold uppercase text-[10px]">
            <tr>
              <th className="py-3 px-4">Business</th>
              <th className="py-3 px-4">Owner</th>
              <th className="py-3 px-4">Plan</th>
              <th className="py-3 px-4 text-right">Revenue</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4">Joined</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-[#1E293B]">
            {filtered.map((b) => (
              <tr
                key={b.id}
                className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
              >
                <td className="py-3 px-4 font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-red-600/10 text-red-600 flex items-center justify-center shrink-0">
                    <Building2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="truncate max-w-[200px]">{b.name}</span>
                </td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                  <p className="font-semibold">{b.owner}</p>
                  <p className="text-[10px] text-slate-400">{b.phone}</p>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`font-semibold px-2 py-0.5 rounded text-[10px] ${
                      b.plan === 'Pro'
                        ? 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400'
                        : b.plan === 'Enterprise'
                        ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {b.plan}
                  </span>
                </td>
                <td className="py-3 px-4 text-right font-black text-slate-900 dark:text-white font-mono">
                  ₹{b.sales.toLocaleString('en-IN')}
                </td>
                <td className="py-3 px-4 text-center">{getStatusBadge(b.status)}</td>
                <td className="py-3 px-4 text-slate-400 text-[11px]">{b.joinedDate}</td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => onManage && onManage(b)}
                    className="px-2.5 py-1 text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-[11px] font-semibold"
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Responsive View */}
      <div className="grid grid-cols-1 gap-2.5 md:hidden">
        {filtered.map((b) => (
          <div
            key={b.id}
            className="p-3.5 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#222E42] rounded-xl space-y-2 text-xs"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-bold text-slate-900 dark:text-white text-sm">{b.name}</p>
                <p className="text-slate-500 text-[11px]">{b.owner} • {b.phone}</p>
              </div>
              {getStatusBadge(b.status)}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-[#222E42] text-[11px]">
              <div>
                <span className="text-slate-400">Revenue: </span>
                <span className="font-bold text-slate-900 dark:text-white font-mono">
                  ₹{b.sales.toLocaleString('en-IN')}
                </span>
              </div>
              <span className="font-semibold px-2 py-0.5 rounded text-[10px] bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400">
                {b.plan}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
