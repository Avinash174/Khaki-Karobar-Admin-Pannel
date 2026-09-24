'use client';

import React, { useState } from 'react';
import { Tags, Plus, Search, Layers, Edit2, Trash2 } from 'lucide-react';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

interface Category {
  id: string;
  name: string;
  code: string;
  hsn: string;
  gstRate: number;
  itemCount: number;
  status: 'ACTIVE' | 'INACTIVE';
}

const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Workwear Uniforms', code: 'UNIFORM', hsn: '6203', gstRate: 18, itemCount: 14, status: 'ACTIVE' },
  { id: 'cat-2', name: 'Security Equipment', code: 'SECURITY', hsn: '8531', gstRate: 18, itemCount: 8, status: 'ACTIVE' },
  { id: 'cat-3', name: 'Footwear & Boots', code: 'BOOTS', hsn: '6403', gstRate: 12, itemCount: 6, status: 'ACTIVE' },
  { id: 'cat-4', name: 'Safety Accessories & Belts', code: 'ACC', hsn: '3926', gstRate: 18, itemCount: 11, status: 'ACTIVE' },
  { id: 'cat-5', name: 'Packaging & Labels', code: 'PACK', hsn: '4819', gstRate: 12, itemCount: 4, status: 'ACTIVE' },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatHsn, setNewCatHsn] = useState('');
  const [newCatGst, setNewCatGst] = useState('18');

  const filtered = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.hsn.includes(search)
  );

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;
    const newCat: Category = {
      id: `cat-${Date.now()}`,
      name: newCatName,
      code: newCatName.toUpperCase().replace(/\s+/g, '_').slice(0, 8),
      hsn: newCatHsn || '9999',
      gstRate: parseFloat(newCatGst) || 18,
      itemCount: 0,
      status: 'ACTIVE',
    };
    setCategories([...categories, newCat]);
    setNewCatName('');
    setNewCatHsn('');
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <AdminBreadcrumb />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Tags className="w-6 h-6 text-red-600" />
            <span>Product Categories & HSN Codes</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Organize catalog inventory, assign HSN tax codes, and default GST slabs.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-red-600/30 flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Category</span>
        </button>
      </div>

      {/* Quick Search */}
      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-4 shadow-sm">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search categories by name, code, or HSN..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-red-600"
          />
        </div>
      </div>

      {/* Categories Table */}
      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#0B0F19] border-b border-slate-200/80 dark:border-[#222E42] text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">Category Name</th>
                <th className="p-4">Short Code</th>
                <th className="p-4">HSN Code</th>
                <th className="p-4">GST Slab</th>
                <th className="p-4">Products Linked</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((cat) => (
                <tr key={cat.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-slate-900 dark:text-white text-sm">{cat.name}</div>
                  </td>
                  <td className="p-4 font-mono font-semibold text-slate-600 dark:text-slate-400">
                    {cat.code}
                  </td>
                  <td className="p-4 font-mono text-slate-800 dark:text-slate-200 font-bold">
                    {cat.hsn}
                  </td>
                  <td className="p-4 font-mono text-red-600 dark:text-red-400 font-bold">
                    {cat.gstRate}%
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold font-mono">
                      {cat.itemCount} Items
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200/60">
                      {cat.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => alert(`Editing category: ${cat.name}`)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                      title="Edit Category"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Category Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-100">
          <div className="bg-white dark:bg-[#121927] border border-slate-200 dark:border-[#222E42] rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Add New Category</h3>
            <form onSubmit={handleAddCategory} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Category Name *</label>
                <input
                  type="text"
                  required
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="e.g. Industrial Footwear"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">HSN Code</label>
                <input
                  type="text"
                  value={newCatHsn}
                  onChange={(e) => setNewCatHsn(e.target.value)}
                  placeholder="6403"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600 font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">GST Slab (%)</label>
                <select
                  value={newCatGst}
                  onChange={(e) => setNewCatGst(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600 font-mono"
                >
                  <option value="0">0% (Exempt)</option>
                  <option value="5">5%</option>
                  <option value="12">12%</option>
                  <option value="18">18%</option>
                  <option value="28">28%</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md shadow-red-600/30"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
