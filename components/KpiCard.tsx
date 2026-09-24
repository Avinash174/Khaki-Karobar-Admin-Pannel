'use client';

import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string;
  subtitle?: string;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  iconColor?: string;
  accentColor?: string;
}

export function KpiCard({
  title,
  value,
  subtitle = 'vs last month',
  change,
  isPositive = true,
  icon: Icon,
  iconColor = 'text-red-600 dark:text-red-500',
  accentColor = 'bg-red-500/10 dark:bg-red-500/15',
}: KpiCardProps) {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 group">
      {/* Subtle top accent bar on hover */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {title}
          </p>
          <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {value}
          </p>
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${accentColor} ${iconColor} transition-transform group-hover:scale-105`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {change && (
        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-[#1E293B] flex items-center gap-2 text-xs">
          <span
            className={`inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded-md ${
              isPositive
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50'
                : 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50'
            }`}
          >
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {change}
          </span>
          <span className="text-slate-400 text-[11px]">{subtitle}</span>
        </div>
      )}
    </div>
  );
}
