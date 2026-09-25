'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Truck, Phone, Mail, Building, FileText, CheckCircle2 } from 'lucide-react';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';
import { supplierService } from '@/lib/api';

export default function SupplierDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [supplier, setSupplier] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!id) return;
      setLoading(true);
      try {
        const res = await supplierService.getById(id);
        if (res.success && res.data) {
          setSupplier(res.data);
        }
      } catch (err) {
        console.error('Supplier fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const balance = Number(supplier?.currentBalance ?? supplier?.balance ?? 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-150 max-w-4xl">
      <AdminBreadcrumb
        customItems={[
          { label: 'Suppliers', href: '/admin/suppliers' },
          { label: supplier?.name || `Supplier #${id}` },
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {loading ? 'Loading Vendor...' : (supplier?.name || 'Supplier Account')}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60">
              Verified Vendor
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Supplier ID: <span className="font-mono">{id}</span> • {supplier?.contactPerson ? `Contact: ${supplier.contactPerson}` : 'Vendor Ledger & Details'}
          </p>
        </div>

        <Link
          href="/admin/suppliers"
          className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-[#222E42] text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </Link>
      </div>

      {loading ? (
        <div className="p-12 text-center text-xs text-slate-400">Loading supplier account...</div>
      ) : !supplier ? (
        <div className="p-12 text-center text-xs text-rose-500">Supplier account not found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-5 shadow-sm space-y-4">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Payable Balance</h2>
            <div className={`text-3xl font-black font-mono ${balance > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600'}`}>
              ₹{balance.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-slate-400">
              {balance > 0 ? 'Current dues pending payment' : 'No pending dues'}
            </p>
          </div>

          <div className="md:col-span-2 bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-5 shadow-sm space-y-4">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Vendor Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200/60 dark:border-slate-800">
                <span className="text-slate-400 block text-[10px]">Contact Person</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                  {supplier.contactPerson || supplier.name}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200/60 dark:border-slate-800">
                <span className="text-slate-400 block text-[10px]">GSTIN Status</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200 text-sm">
                  {supplier.gstin || 'Unregistered'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200/60 dark:border-slate-800">
                <span className="text-slate-400 block text-[10px]">Phone Number</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200 text-sm">
                  {supplier.phone || '-'}
                </span>
              </div>
              {supplier.email && (
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200/60 dark:border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Email</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200 text-sm">
                    {supplier.email}
                  </span>
                </div>
              )}
              <div className="sm:col-span-2 p-3 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200/60 dark:border-slate-800">
                <span className="text-slate-400 block text-[10px]">Vendor Address</span>
                <p className="text-slate-700 dark:text-slate-300 mt-0.5">
                  {supplier.address || supplier.city ? `${supplier.address || ''}, ${supplier.city || ''} ${supplier.state || ''} ${supplier.pincode || ''}` : 'No address specified'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
