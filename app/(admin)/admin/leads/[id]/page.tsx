'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Building,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  UserCheck,
} from 'lucide-react';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  return (
    <div className="space-y-6 animate-in fade-in duration-150 max-w-4xl">
      <AdminBreadcrumb
        customItems={[
          { label: 'Leads', href: '/admin/leads' },
          { label: `Lead #${id}` },
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Rajesh Sharma
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 border border-purple-200/60 dark:border-purple-800/60">
              QUALIFIED
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
            <Building className="w-3.5 h-3.5" /> Sharma Trading Co. • Inquiry Source: Website
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/leads"
            className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-[#222E42] text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </Link>
          <button
            onClick={() => {
              alert('Lead successfully converted to Customer account!');
              router.push('/admin/customers');
            }}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition-all"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Convert to Customer</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Deal Overview Card */}
        <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-5 shadow-sm space-y-4">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Opportunity Value</h2>
          <div className="text-3xl font-black font-mono text-slate-900 dark:text-white">
            ₹85,000
          </div>
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Expected Close</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">15 Oct 2026</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Probability</span>
              <span className="font-semibold text-emerald-600">75%</span>
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="md:col-span-2 bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-5 shadow-sm space-y-4">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Contact Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200/60 dark:border-slate-800">
              <span className="text-slate-400 block text-[10px]">Mobile Phone</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200 text-sm">+91 9822012345</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200/60 dark:border-slate-800">
              <span className="text-slate-400 block text-[10px]">Email Address</span>
              <span className="font-medium text-slate-800 dark:text-slate-200 text-sm">rajesh@sharmatrading.in</span>
            </div>
            <div className="sm:col-span-2 p-3 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200/60 dark:border-slate-800">
              <span className="text-slate-400 block text-[10px]">Notes</span>
              <p className="text-slate-700 dark:text-slate-300 mt-1">
                Requested quote for 500 units of Khaki cotton uniforms. Needs delivery within 10 days of order confirmation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
