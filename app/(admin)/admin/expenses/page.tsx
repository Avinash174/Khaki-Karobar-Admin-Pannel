'use client';

import React, { useState } from 'react';
import { DollarSign, Plus, Search, Tag, Calendar, CheckCircle2 } from 'lucide-react';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

interface Expense {
  id: string;
  expenseNumber: string;
  title: string;
  category: 'RENT' | 'UTILITIES' | 'SALARIES' | 'LOGISTICS' | 'OFFICE_SUPPLIES' | 'MAINTENANCE';
  paymentMode: 'BANK_TRANSFER' | 'UPI' | 'CASH';
  amount: number;
  date: string;
  paidTo: string;
}

const INITIAL_EXPENSES: Expense[] = [
  { id: 'exp-1', expenseNumber: 'EXP-2026-041', title: 'Marketyard Godown Rental (Sep 2026)', category: 'RENT', paymentMode: 'BANK_TRANSFER', amount: 28000, date: '2026-09-20', paidTo: 'Patil Real Estate Hub' },
  { id: 'exp-2', expenseNumber: 'EXP-2026-042', title: 'MSEDCL Electricity Power Bill', category: 'UTILITIES', paymentMode: 'UPI', amount: 4850, date: '2026-09-22', paidTo: 'MSEDCL Maharashtra' },
  { id: 'exp-3', expenseNumber: 'EXP-2026-043', title: 'Intra-city Courier & Goods Dispatch', category: 'LOGISTICS', paymentMode: 'UPI', amount: 1650, date: '2026-09-23', paidTo: 'DTDC Logistics' },
  { id: 'exp-4', expenseNumber: 'EXP-2026-044', title: 'Office Stationery & Thermal Billing Paper', category: 'OFFICE_SUPPLIES', paymentMode: 'CASH', amount: 1200, date: '2026-09-24', paidTo: 'National Stationery' },
];

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>(INITIAL_EXPENSES);
  const [search, setSearch] = useState('');

  const filtered = expenses.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.paidTo.toLowerCase().includes(search.toLowerCase()) ||
      e.expenseNumber.toLowerCase().includes(search.toLowerCase())
  );

  const totalSpent = filtered.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <AdminBreadcrumb
        customItems={[
          { label: 'Accounting', href: '/admin/accounting' },
          { label: 'Expenses' },
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-red-600" />
            <span>Business Expenses & Overheads</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track non-merchandise operating expenditures, utility bills, rent, and staff costs.
          </p>
        </div>

        <button
          onClick={() => alert('New Expense Record Modal')}
          className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-red-600/30 flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>+ Record Expense</span>
        </button>
      </div>

      {/* Summary KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] shadow-sm">
          <p className="text-xs text-slate-400 font-medium">Total Filtered Spend</p>
          <p className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">
            ₹{totalSpent.toLocaleString('en-IN')}
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] shadow-sm">
          <p className="text-xs text-slate-400 font-medium">Recorded Vouchers</p>
          <p className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">
            {filtered.length} Items
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] shadow-sm">
          <p className="text-xs text-slate-400 font-medium">Tax Deductible Ratio</p>
          <p className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">
            100% Valid
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#0B0F19] border-b border-slate-200/80 dark:border-[#222E42] text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">Expense #</th>
                <th className="p-4">Title / Purpose</th>
                <th className="p-4">Category</th>
                <th className="p-4">Paid To</th>
                <th className="p-4">Payment Mode</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((e) => (
                <tr key={e.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-mono font-bold text-slate-900 dark:text-white">{e.expenseNumber}</td>
                  <td className="p-4 font-semibold text-slate-800 dark:text-slate-200">{e.title}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-[10px] text-slate-700 dark:text-slate-300">
                      {e.category}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">{e.paidTo}</td>
                  <td className="p-4 font-mono text-slate-500">{e.paymentMode}</td>
                  <td className="p-4 text-slate-500">{e.date}</td>
                  <td className="p-4 text-right font-mono font-bold text-rose-600 dark:text-rose-400 text-sm">
                    ₹{e.amount.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
