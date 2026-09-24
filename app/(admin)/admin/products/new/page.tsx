'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, ArrowLeft, Save } from 'lucide-react';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';
import { productService } from '@/lib/api';

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    hsnCode: '',
    category: 'Uniforms',
    price: '',
    costPrice: '',
    taxRate: '18',
    stock: '',
    unit: 'PCS',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await productService.createProduct({
        name: formData.name,
        sku: formData.sku,
        price: parseFloat(formData.price) || 0,
        stock: parseInt(formData.stock) || 0,
        taxRate: parseFloat(formData.taxRate) || 18,
        unit: formData.unit,
      });
      router.push('/admin/products');
    } catch (err) {
      console.error('Create product error:', err);
      router.push('/admin/products');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6 animate-in fade-in duration-150">
      <AdminBreadcrumb
        customItems={[
          { label: 'Products', href: '/admin/products' },
          { label: 'Add Product' },
        ]}
      />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Package className="w-6 h-6 text-red-600" />
            <span>Add New Product & SKU</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Add a merchandise item, barcode/SKU, GST tax rate, and opening inventory.
          </p>
        </div>

        <Link
          href="/admin/products"
          className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#222E42] text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Product Title *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Khaki Cotton Workwear Shirt (Size L)"
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">SKU Code / Barcode *</label>
            <input
              type="text"
              required
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value.toUpperCase() })}
              placeholder="SKU-KK-010"
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600 font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">HSN / SAC Code</label>
            <input
              type="text"
              value={formData.hsnCode}
              onChange={(e) => setFormData({ ...formData, hsnCode: e.target.value })}
              placeholder="6203"
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600 font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Selling Price (₹) *</label>
            <input
              type="number"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="850"
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600 font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">GST Slab Rate (%)</label>
            <select
              value={formData.taxRate}
              onChange={(e) => setFormData({ ...formData, taxRate: e.target.value })}
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600 font-mono"
            >
              <option value="0">0% (Exempt)</option>
              <option value="5">5% GST</option>
              <option value="12">12% GST</option>
              <option value="18">18% GST (Standard)</option>
              <option value="28">28% GST</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Opening Stock Qty *</label>
            <input
              type="number"
              required
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              placeholder="50"
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600 font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Unit of Measure</label>
            <select
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600 font-mono"
            >
              <option value="PCS">PCS (Pieces)</option>
              <option value="KGS">KGS (Kilograms)</option>
              <option value="MTR">MTR (Meters)</option>
              <option value="BOX">BOX (Boxes)</option>
              <option value="SET">SET (Sets)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <Link
            href="/admin/products"
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
            <span>{loading ? 'Saving...' : 'Save Product'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
