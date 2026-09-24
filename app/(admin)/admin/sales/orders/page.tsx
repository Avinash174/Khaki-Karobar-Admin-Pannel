'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, Plus, Filter, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

interface SalesOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  orderDate: string;
  deliveryDate: string;
  totalAmount: number;
  status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  itemCount: number;
}

const INITIAL_ORDERS: SalesOrder[] = [
  { id: 'so-1', orderNumber: 'SO-2026-081', customerName: 'Ramesh Chandra (Shree Traders)', orderDate: '2026-09-23', deliveryDate: '2026-09-28', totalAmount: 34500, status: 'CONFIRMED', itemCount: 3 },
  { id: 'so-2', orderNumber: 'SO-2026-082', customerName: 'Pooja Kulkarni', orderDate: '2026-09-24', deliveryDate: '2026-09-30', totalAmount: 18200, status: 'PENDING', itemCount: 2 },
  { id: 'so-3', orderNumber: 'SO-2026-079', customerName: 'Deepak Verma (Verma Uniforms)', orderDate: '2026-09-21', deliveryDate: '2026-09-25', totalAmount: 56000, status: 'SHIPPED', itemCount: 6 },
  { id: 'so-4', orderNumber: 'SO-2026-075', customerName: 'Amit Patel', orderDate: '2026-09-19', deliveryDate: '2026-09-23', totalAmount: 42000, status: 'DELIVERED', itemCount: 4 },
];

export default function SalesOrdersPage() {
  const [orders, setOrders] = useState<SalesOrder[]>(INITIAL_ORDERS);
  const [search, setSearch] = useState('');

  const filtered = orders.filter(
    (o) =>
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status: SalesOrder['status']) => {
    switch (status) {
      case 'PENDING':
        return 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 border border-amber-200';
      case 'CONFIRMED':
        return 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 border border-blue-200';
      case 'SHIPPED':
        return 'bg-purple-50 dark:bg-purple-950/50 text-purple-600 border border-purple-200';
      case 'DELIVERED':
        return 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200';
      case 'CANCELLED':
        return 'bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <AdminBreadcrumb
        customItems={[
          { label: 'Sales', href: '/admin/sales' },
          { label: 'Sales Orders' },
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-red-600" />
            <span>Sales Orders & Bookings</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Fulfill wholesale commercial orders, schedule delivery dispatches, and convert to invoices.
          </p>
        </div>

        <button
          onClick={() => alert('New Sales Order created!')}
          className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-red-600/30 flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create Sales Order</span>
        </button>
      </div>

      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-4 shadow-sm">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders by SO number or customer name..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-red-600"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#0B0F19] border-b border-slate-200/80 dark:border-[#222E42] text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">Order #</th>
                <th className="p-4">Customer Name</th>
                <th className="p-4">Order Date</th>
                <th className="p-4">Expected Delivery</th>
                <th className="p-4">Order Status</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((o) => (
                <tr key={o.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-mono font-bold text-slate-900 dark:text-white">
                    {o.orderNumber}
                  </td>
                  <td className="p-4 font-semibold text-slate-800 dark:text-slate-200">
                    {o.customerName}
                  </td>
                  <td className="p-4 text-slate-500">{o.orderDate}</td>
                  <td className="p-4 text-slate-500 font-medium">{o.deliveryDate}</td>
                  <td className="p-4">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${getStatusBadge(o.status)}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-bold text-slate-900 dark:text-white text-sm">
                    ₹{o.totalAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      href="/admin/sales/invoices"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-bold hover:bg-red-100 transition-colors"
                    >
                      <span>Convert to Invoice</span>
                    </Link>
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
