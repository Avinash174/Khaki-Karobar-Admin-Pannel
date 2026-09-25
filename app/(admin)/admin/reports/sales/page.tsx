'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, Download, RefreshCw, Calendar } from 'lucide-react';
import { reportService, extractItems } from '@/lib/api';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

export default function SalesReportPage() {
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await reportService.getSalesReport();
      if (res.success) {
        setReport(res.data);
      }
    } catch (err) {
      console.error('Failed to load sales report:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const invoices = report?.invoices || [];
  const summary = report?.summary || {};

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <AdminBreadcrumb
        customItems={[
          { label: 'Reports', href: '/admin/reports' },
          { label: 'Sales Report' },
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-red-600" />
            <span>Periodic Sales Analytics & Tax Breakdown</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Weekly and monthly billed revenue, outward tax liability, and sales velocity.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadData}
            className="px-3 py-2 bg-white dark:bg-[#121927] border border-slate-200 dark:border-[#222E42] text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Sync</span>
          </button>
          <button
            onClick={() => alert('Consolidated sales report exported.')}
            className="px-4 py-2 bg-white dark:bg-[#121927] border border-slate-200 dark:border-[#222E42] text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-red-600" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-slate-400">Total Billed</p>
          <p className="font-mono font-bold text-lg text-slate-900 dark:text-white mt-1">
            ₹{Number(summary.totalInvoiced || 0).toLocaleString('en-IN')}
          </p>
          <span className="text-[10px] text-slate-400 font-medium">{summary.invoiceCount || 0} Invoices</span>
        </div>

        <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-slate-400">Taxable Outward</p>
          <p className="font-mono font-bold text-lg text-slate-900 dark:text-white mt-1">
            ₹{Number(summary.totalTaxable || 0).toLocaleString('en-IN')}
          </p>
          <span className="text-[10px] text-emerald-500 font-medium">Net Sales</span>
        </div>

        <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-slate-400">GST Collected</p>
          <p className="font-mono font-bold text-lg text-purple-600 dark:text-purple-400 mt-1">
            ₹{Number(summary.totalTax || 0).toLocaleString('en-IN')}
          </p>
          <span className="text-[10px] text-purple-500 font-medium">Output Liability</span>
        </div>

        <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-slate-400">Collected Revenue</p>
          <p className="font-mono font-bold text-lg text-emerald-600 dark:text-emerald-400 mt-1">
            ₹{Number(summary.totalReceived || 0).toLocaleString('en-IN')}
          </p>
          <span className="text-[10px] text-slate-400 font-medium">₹{Number(summary.totalPending || 0).toLocaleString('en-IN')} Pending</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#0B0F19] border-b border-slate-200/80 dark:border-[#222E42] text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">Invoice #</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Date</th>
                <th className="p-4">Taxable Amount</th>
                <th className="p-4">GST (₹)</th>
                <th className="p-4 text-right">Grand Total (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">Generating live sales report...</td>
                </tr>
              ) : invoices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">No sales transactions found for this period.</td>
                </tr>
              ) : (
                invoices.map((inv: any) => (
                  <tr key={inv.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 font-mono font-bold text-slate-900 dark:text-white">{inv.invoiceNumber}</td>
                    <td className="p-4 font-semibold text-slate-800 dark:text-slate-200">
                      {inv.customer?.name || 'Cash Retail Customer'}
                    </td>
                    <td className="p-4 text-slate-500">
                      {new Date(inv.invoiceDate || inv.createdAt).toLocaleDateString('en-IN')}
                    </td>
                    <td className="p-4 font-mono text-slate-600 dark:text-slate-400">
                      ₹{Number(inv.taxableAmount || 0).toLocaleString('en-IN')}
                    </td>
                    <td className="p-4 font-mono text-purple-600 dark:text-purple-400 font-bold">
                      ₹{Number(inv.totalTax || 0).toLocaleString('en-IN')}
                    </td>
                    <td className="p-4 text-right font-mono font-bold text-slate-900 dark:text-white">
                      ₹{Number(inv.grandTotal || 0).toLocaleString('en-IN')}
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
