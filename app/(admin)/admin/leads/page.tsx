'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  UserPlus,
  Search,
  Filter,
  Phone,
  Mail,
  Building,
  ArrowRight,
  Plus,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

interface Lead {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  stage: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL' | 'WON' | 'LOST';
  value: number;
  source: string;
  createdAt: string;
}

const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-1',
    name: 'Rajesh Sharma',
    company: 'Sharma Trading Co.',
    phone: '9822012345',
    email: 'rajesh@sharmatrading.in',
    stage: 'QUALIFIED',
    value: 85000,
    source: 'Website Inquiry',
    createdAt: '2026-09-22',
  },
  {
    id: 'lead-2',
    name: 'Pooja Kulkarni',
    company: 'Nexus Retail Mart',
    phone: '9845098765',
    email: 'pooja@nexusretail.com',
    stage: 'PROPOSAL',
    value: 140000,
    source: 'Referral',
    createdAt: '2026-09-20',
  },
  {
    id: 'lead-3',
    name: 'Amit Patel',
    company: 'Gujarat Steels Ltd',
    phone: '9712345678',
    email: 'amit@gujaratsteels.com',
    stage: 'WON',
    value: 220000,
    source: 'Cold Outreach',
    createdAt: '2026-09-18',
  },
  {
    id: 'lead-4',
    name: 'Deepak Verma',
    company: 'Verma Electronics',
    phone: '9988776655',
    email: 'deepak@vermaelec.in',
    stage: 'NEW',
    value: 45000,
    source: 'Trade Fair 2026',
    createdAt: '2026-09-24',
  },
];

export default function LeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('ALL');

  const filtered = leads.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.company.toLowerCase().includes(search.toLowerCase()) ||
      item.phone.includes(search);
    const matchesStage = stageFilter === 'ALL' || item.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const getStageBadge = (stage: Lead['stage']) => {
    switch (stage) {
      case 'NEW':
        return 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border-blue-200/60 dark:border-blue-800/60';
      case 'CONTACTED':
        return 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border-amber-200/60 dark:border-amber-800/60';
      case 'QUALIFIED':
        return 'bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 border-purple-200/60 dark:border-purple-800/60';
      case 'PROPOSAL':
        return 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border-indigo-200/60 dark:border-indigo-800/60';
      case 'WON':
        return 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/60';
      case 'LOST':
        return 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <AdminBreadcrumb />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <UserPlus className="w-6 h-6 text-red-600" />
            <span>Leads CRM & Pipeline</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track prospect inquiries, potential deals, and conversion pipelines.
          </p>
        </div>

        <Link
          href="/admin/leads/new"
          className="px-4 py-2.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded-xl text-xs font-bold shadow-lg shadow-red-600/30 transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Lead</span>
        </Link>
      </div>

      {/* Filters and Search Toolbar */}
      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-4 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by lead name, company, or phone..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-red-600"
            />
          </div>

          {/* Stage Filter Pills */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 text-xs">
            {['ALL', 'NEW', 'QUALIFIED', 'PROPOSAL', 'WON'].map((st) => (
              <button
                key={st}
                onClick={() => setStageFilter(st)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors shrink-0 ${
                  stageFilter === st
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#0B0F19] border-b border-slate-200/80 dark:border-[#222E42] text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">Prospect / Company</th>
                <th className="p-4">Contact Info</th>
                <th className="p-4">Pipeline Stage</th>
                <th className="p-4">Est. Deal Value</th>
                <th className="p-4">Lead Source</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    No leads found matching your criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-slate-900 dark:text-white text-sm">{lead.name}</div>
                      <div className="text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                        <Building className="w-3 h-3" />
                        <span>{lead.company}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span className="font-mono">{lead.phone}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500 text-[11px] mt-0.5">
                        <Mail className="w-3 h-3 text-slate-400" />
                        <span>{lead.email}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStageBadge(lead.stage)}`}>
                        {lead.stage}
                      </span>
                    </td>
                    <td className="p-4 font-mono font-bold text-slate-900 dark:text-white text-sm">
                      ₹{lead.value.toLocaleString('en-IN')}
                    </td>
                    <td className="p-4 text-slate-500">
                      {lead.source}
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold transition-colors"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
