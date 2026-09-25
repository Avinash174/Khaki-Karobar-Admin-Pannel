'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Package, Barcode, Tag, Layers, CheckCircle2, TrendingUp } from 'lucide-react';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';
import { productService } from '@/lib/api';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!id) return;
      setLoading(true);
      try {
        const res = await productService.getById(id);
        if (res.success && res.data) {
          setProduct(res.data);
        }
      } catch (err) {
        console.error('Product fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const price = Number(product?.sellingPrice ?? product?.price ?? 0);
  const purchasePrice = Number(product?.purchasePrice ?? 0);
  const stock = Number(product?.currentStock ?? product?.stock ?? 0);
  const minStock = Number(product?.minStockAlert ?? 10);
  const gstRate = Number(product?.gstRate ?? 18);

  return (
    <div className="space-y-6 animate-in fade-in duration-150 max-w-4xl">
      <AdminBreadcrumb
        customItems={[
          { label: 'Products', href: '/admin/products' },
          { label: product?.name || `Product #${id}` },
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {loading ? 'Loading Product...' : (product?.name || 'Product Overview')}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
              Active Catalog Item
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Item ID: <span className="font-mono">{id}</span> • SKU: <span className="font-mono font-bold">{product?.sku || 'N/A'}</span>
          </p>
        </div>

        <Link
          href="/admin/products"
          className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-[#222E42] text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Products</span>
        </Link>
      </div>

      {loading ? (
        <div className="p-12 text-center text-xs text-slate-400">Loading product details...</div>
      ) : !product ? (
        <div className="p-12 text-center text-xs text-rose-500">Product not found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-5 shadow-sm space-y-4">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Selling Price</h2>
            <div className="text-3xl font-black font-mono text-slate-900 dark:text-white">
              ₹{price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-[11px] text-slate-400">Inclusive of {gstRate}% GST</p>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-500">
              <div className="flex justify-between">
                <span>HSN Code</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{product.hsnCode || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span>GST Slab</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{gstRate}%</span>
              </div>
              {purchasePrice > 0 && (
                <div className="flex justify-between">
                  <span>Purchase Rate</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">₹{purchasePrice.toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-2 bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-5 shadow-sm space-y-4">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Stock & Inventory Health</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200/60 dark:border-slate-800">
                <span className="text-slate-400 block text-[10px]">Current Available Stock</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200 text-sm">
                  {stock} {product.unit || 'PCS'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200/60 dark:border-slate-800">
                <span className="text-slate-400 block text-[10px]">Reorder Threshold</span>
                <span className="font-mono font-bold text-rose-600 dark:text-rose-400 text-sm">
                  {minStock} {product.unit || 'PCS'}
                </span>
              </div>
              <div className="sm:col-span-2 p-3 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200/60 dark:border-slate-800">
                <span className="text-slate-400 block text-[10px]">Item Description</span>
                <p className="text-slate-700 dark:text-slate-300 mt-0.5">
                  {product.description || 'No detailed description provided for this catalog product.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
