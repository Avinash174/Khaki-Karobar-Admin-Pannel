'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Truck, Plus, Search, Phone, Mail, Building, ArrowRight, ExternalLink } from 'lucide-react';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

interface Supplier {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  gstin: string;
  payable: number;
  category: string;
}

const INITIAL_SUPPLIERS: Supplier[] = [
  {
    id: 'sup-1',
    name: 'Vikas Agarwal',
    company: 'Agarwal Textiles Mills',
    phone: '9822445566',
    email: 'orders@agarwaltextiles.in',
    gstin: '27AABCA1234D1ZX',
    payable: 34500,
    category: 'Raw Materials & Fabric',
  },
  {
    id: 'sup-2',
    name: 'Suresh Patil',
    company: 'Maharashtra Paper & Packaging',
    phone: '9890112233',
    email: 'info@mahapackaging.com',
    gstin: '27XYZPA9876E1Z2',
    payable: 12800,
    category: 'Packaging & Labels',
  },
  {
    id: 'sup-3',
    name: 'Gaurav Jain',
    company: 'Jain Buttons & Accessories',
    phone: '9422001122',
    email: 'sales@jainbuttons.com',
    gstin: '24AAACJ5544B1ZM',
    payable: 6400,
    category: 'Hardware & Trims',
  },
];

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(INITIAL_SUPPLIERS);
  const [search, setSearch] = useState('');

  const filtered = suppliers.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.company.toLowerCase().includes(search.toLowerCase()) ||
      s.phone.includes(search) ||
      s.gstin.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <AdminBreadcrumb />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Truck className="w-6 h-6 text-red-600" />
            <span>Suppliers & Vendors</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Supplier accounts, GST compliance verification, and outstanding payables.
          </p>
        </div>

        <Link
          href="/admin/suppliers/new"
          className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-red-600/30 flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Supplier</span>
        </Link>
      </div>

      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-4 shadow-sm">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by supplier, company, phone, or GSTIN..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-red-600"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#0B0F19] border-b border-slate-200/80 dark:border-[#222E42] text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">Vendor / Company</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Category</th>
                <th className="p-4">GSTIN</th>
                <th className="p-4">Balance Payable</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-slate-900 dark:text-white text-sm">{s.company}</div>
                    <div className="text-slate-400 text-[11px] flex items-center gap-1 mt-0.5">
                      <Building className="w-3 h-3" />
                      <span>{s.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-mono text-slate-700 dark:text-slate-300">{s.phone}</div>
                    <div className="text-slate-400 text-[11px]">{s.email}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                      {s.category}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-slate-600 dark:text-slate-400 font-semibold">
                    {s.gstin}
                  </td>
                  <td className="p-4 font-mono font-bold text-rose-600 dark:text-rose-400 text-sm">
                    ₹{s.payable.toLocaleString('en-IN')}
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/admin/suppliers/${s.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold transition-colors"
                    >
                      <span>Ledger</span>
                      <ArrowRight className="w-3 h-3" />
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
