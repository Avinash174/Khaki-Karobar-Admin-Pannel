'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Truck, ArrowLeft, Save } from 'lucide-react';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

export default function NewSupplierPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    gstin: '',
    category: 'Raw Materials',
    address: '',
    paymentTerms: '30 Days Net',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/admin/suppliers');
    }, 500);
  };

  return (
    <div className="max-w-3xl space-y-6 animate-in fade-in duration-150">
      <AdminBreadcrumb
        customItems={[
          { label: 'Suppliers', href: '/admin/suppliers' },
          { label: 'Add Supplier' },
        ]}
      />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Truck className="w-6 h-6 text-red-600" />
            <span>Add New Supplier</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Register a vendor for raw materials, inventory supplies, or services.
          </p>
        </div>

        <Link
          href="/admin/suppliers"
          className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#222E42] text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Company / Enterprise Name *</label>
            <input
              type="text"
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="e.g. Apex Textiles Pvt Ltd"
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Contact Person Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Manoj Patil"
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Phone Number *</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="9822112233"
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600 font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">GSTIN Number</label>
            <input
              type="text"
              value={formData.gstin}
              onChange={(e) => setFormData({ ...formData, gstin: e.target.value.toUpperCase() })}
              placeholder="27AAACA1234E1Z1"
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600 font-mono uppercase"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600"
            >
              <option value="Raw Materials">Raw Materials</option>
              <option value="Packaging & Labels">Packaging & Labels</option>
              <option value="Hardware & Trims">Hardware & Trims</option>
              <option value="Machinery & Spares">Machinery & Spares</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Payment Terms</label>
            <input
              type="text"
              value={formData.paymentTerms}
              onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
              placeholder="30 Days Net / Advance / COD"
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <Link
            href="/admin/suppliers"
            className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-red-600/30 flex items-center gap-1.5 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Saving...' : 'Register Supplier'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
