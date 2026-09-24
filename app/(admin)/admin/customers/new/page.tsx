'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserPlus, ArrowLeft, Save } from 'lucide-react';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';
import { customerService } from '@/lib/api';

export default function NewCustomerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    gstin: '',
    address: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
    creditLimit: '50000',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await customerService.createCustomer({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        gstin: formData.gstin,
        address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
      });
      router.push('/admin/customers');
    } catch (err) {
      console.error('Create customer error:', err);
      router.push('/admin/customers');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6 animate-in fade-in duration-150">
      <AdminBreadcrumb
        customItems={[
          { label: 'Customers', href: '/admin/customers' },
          { label: 'Add Customer' },
        ]}
      />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <UserPlus className="w-6 h-6 text-red-600" />
            <span>Add New Customer</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Register a commercial client or retail purchaser with GST details.
          </p>
        </div>

        <Link
          href="/admin/customers"
          className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#222E42] text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Customer / Entity Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Ramesh Chandra"
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Mobile Phone *</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="9823012345"
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600 font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="ramesh@client.com"
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">GSTIN / Tax ID</label>
            <input
              type="text"
              value={formData.gstin}
              onChange={(e) => setFormData({ ...formData, gstin: e.target.value.toUpperCase() })}
              placeholder="27ABCDE1234F1Z5"
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600 font-mono uppercase"
            />
          </div>

          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Billing Street Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Shop No. 12, Main Market Road"
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">City / District</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              placeholder="Pune"
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Credit Limit (₹)</label>
            <input
              type="number"
              value={formData.creditLimit}
              onChange={(e) => setFormData({ ...formData, creditLimit: e.target.value })}
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600 font-mono"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <Link
            href="/admin/customers"
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
            <span>{loading ? 'Saving...' : 'Create Customer'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
