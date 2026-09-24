'use client';

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { useTheme } from './ThemeProvider';

interface ComparisonProps {
  data?: Array<{ name: string; sales: number; purchases: number }>;
}

const defaultData = [
  { name: 'Mon', sales: 12500, purchases: 8400 },
  { name: 'Tue', sales: 18900, purchases: 12300 },
  { name: 'Wed', sales: 14200, purchases: 9100 },
  { name: 'Thu', sales: 22400, purchases: 15600 },
  { name: 'Fri', sales: 27800, purchases: 19400 },
  { name: 'Sat', sales: 34500, purchases: 22100 },
  { name: 'Sun', sales: 16800, purchases: 7500 },
];

export function SalesVsPurchasesChart({ data = defaultData }: ComparisonProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke={isDark ? '#1F293D' : '#E2E8F0'}
          />
          <XAxis
            dataKey="name"
            stroke={isDark ? '#64748B' : '#94A3B8'}
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke={isDark ? '#64748B' : '#94A3B8'}
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `₹${value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}`}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white dark:bg-[#1A2333] border border-slate-200 dark:border-[#2A364F] rounded-xl p-3 shadow-xl text-xs space-y-1">
                    <p className="font-bold text-slate-700 dark:text-slate-300">{label}</p>
                    <p className="text-red-600 dark:text-red-400 font-semibold flex items-center justify-between gap-4">
                      <span>Sales:</span> <span>₹{Number(payload[0]?.value).toLocaleString('en-IN')}</span>
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 font-semibold flex items-center justify-between gap-4">
                      <span>Purchases:</span> <span>₹{Number(payload[1]?.value).toLocaleString('en-IN')}</span>
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            wrapperStyle={{ paddingBottom: '10px', fontSize: '12px' }}
          />
          <Bar dataKey="sales" name="Sales Revenue" fill="#DC2626" radius={[4, 4, 0, 0]} maxBarSize={32} />
          <Bar
            dataKey="purchases"
            name="Stock Purchases"
            fill={isDark ? '#334155' : '#94A3B8'}
            radius={[4, 4, 0, 0]}
            maxBarSize={32}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
