'use client';

import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { useTheme } from './ThemeProvider';

interface RevenueChartProps {
  data?: Array<{ name: string; revenue: number; orders: number }>;
}

const defaultData = [
  { name: 'Apr', revenue: 18400, orders: 12 },
  { name: 'May', revenue: 24200, orders: 18 },
  { name: 'Jun', revenue: 19800, orders: 15 },
  { name: 'Jul', revenue: 31500, orders: 24 },
  { name: 'Aug', revenue: 28900, orders: 21 },
  { name: 'Sep', revenue: 45500, orders: 32 },
];

export function RevenueChart({ data = defaultData }: RevenueChartProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#DC2626" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#DC2626" stopOpacity={0.0} />
            </linearGradient>
          </defs>
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
                  <div className="bg-white dark:bg-[#1A2333] border border-slate-200 dark:border-[#2A364F] rounded-xl p-3 shadow-xl text-xs">
                    <p className="font-bold text-slate-700 dark:text-slate-300 mb-1">{label} Overview</p>
                    <p className="text-red-600 dark:text-red-400 font-extrabold text-sm">
                      ₹{payload[0].value?.toLocaleString('en-IN')}
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                      {payload[0].payload.orders} Transactions
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#DC2626"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#revenueGradient)"
            activeDot={{ r: 6, stroke: '#DC2626', strokeWidth: 2, fill: isDark ? '#121927' : '#FFFFFF' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
