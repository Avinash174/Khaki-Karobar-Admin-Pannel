'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, Plus, Filter, ArrowRight, CheckCircle2 } from 'lucide-react';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierName: string;
  orderDate: string;
  deliveryDate: string;
  totalAmount: number;
  status: 'DRAFT' | 'ISSUED' | 'RECEIVED' | 'CANCELLED';
  itemCount: number;
}

const INITIAL_PURCHASE_ORDERS: PurchaseOrder[] = [
  { id: 'po-1', poNumber: 'PO-2026-031', supplierName: 'Agarwal Textiles Mills', orderDate: '2026-09-20', deliveryDate: '2026-09-26', totalAmount: 48000, status: 'RECEIVED', itemCount: 4 },
  { id: 'po-2', poNumber: 'PO-2026-032', supplierName: 'Maharashtra Paper & Packaging', orderDate: '2026-09-22', deliveryDate: '2026-09-27', totalAmount: 14200, status: 'ISSUED', itemCount: 2 },
  { id: 'po-3', poNumber: 'PO-2026-033', supplierName: 'Jain Buttons & Accessories', orderDate: '2026-09-24', deliveryDate: '2026-09-29', totalAmount: 8500, status: 'DRAFT', itemCount: 1 },
];

export default function PurchaseOrdersPage() {
  const [orders, setOrders] = useState<PurchaseOrder[]>(INITIAL_PURCHASE_ORDERS);
  const [search, setSearch] = useState('');

  const filtered = orders.filter(
    (o) =>
      o.poNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.supplierName.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status: PurchaseOrder['status']) => {
    switch (status) {
      case 'DRAFT':
        return 'bg-slate-100 dark:bg-slate-800 text-slate-600 border border-slate-200';
      case 'ISSUED':
        return 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 border border-blue-200';
      case 'RECEIVED':
        return 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200';
      case 'CANCELLED':
        return 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 border border-rose-200';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <AdminBreadcrumb
        customItems={[
          { label: 'Purchases', href: '/admin/purchases' },
          { label: 'Purchase Orders' },
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-red-600" />
            <span>Purchase Orders & Inwards</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Order raw materials, uniforms stock, and packing supplies from registered vendors.
          </p>
        </div>

        <button
          onClick={() => alert('New Purchase Order Created!')}
          className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-red-600/30 flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create Purchase Order</span>
        </button>
      </div>

      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-4 shadow-sm">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search purchase orders by PO # or vendor..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-red-600"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#0B0F19] border-b border-slate-200/80 dark:border-[#222E42] text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">PO #</th>
                <th className="p-4">Supplier / Vendor</th>
                <th className="p-4">Order Date</th>
                <th className="p-4">Delivery Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((po) => (
                <tr key={po.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-mono font-bold text-slate-900 dark:text-white">
                    {po.poNumber}
                  </td>
                  <td className="p-4 font-semibold text-slate-800 dark:text-slate-200">
                    {po.supplierName}
                  </td>
                  <td className="p-4 text-slate-500">{po.orderDate}</td>
                  <td className="p-4 text-slate-500 font-medium">{po.deliveryDate}</td>
                  <td className="p-4">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${getStatusBadge(po.status)}`}>
                      {po.status}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-bold text-slate-900 dark:text-white text-sm">
                    ₹{po.totalAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => alert(`Receiving PO #${po.poNumber}`)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold transition-colors"
                    >
                      <span>Inward Stock</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
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
