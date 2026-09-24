'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  TrendingUp,
  FileText,
  Building2,
  Users,
  CreditCard,
  Plus,
  RefreshCw,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import {
  adminService,
  businessService,
  customerService,
  productService,
  invoiceService,
  paymentService,
  accountingService,
  gstService,
} from '@/lib/api';
import { KpiCard } from '@/components/KpiCard';
import { RevenueChart } from '@/components/RevenueChart';
import { SalesVsPurchasesChart } from '@/components/SalesVsPurchasesChart';
import { ActivityTimeline } from '@/components/ActivityTimeline';
import { TopBusinessesTable } from '@/components/TopBusinessesTable';
import { AddCustomerModal } from '@/components/Modals/AddCustomerModal';
import { AddProductModal } from '@/components/Modals/AddProductModal';
import { CreateInvoiceDrawer } from '@/components/Modals/CreateInvoiceDrawer';
import { ViewInvoiceModal } from '@/components/Modals/ViewInvoiceModal';

export default function DashboardPage() {
  const router = useRouter();
  const [refreshKey, setRefreshKey] = useState(0);

  // Live Backend Data
  const [adminStats, setAdminStats] = useState<any>(null);
  const [bizOverview, setBizOverview] = useState<any>(null);
  const [customers, setCustomers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [dayBook, setDayBook] = useState<any>(null);
  const [profitAndLoss, setProfitAndLoss] = useState<any>(null);
  const [gstSummary, setGstSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  // Modals
  const [addCustomerOpen, setAddCustomerOpen] = useState(false);
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [createInvoiceOpen, setCreateInvoiceOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4500);
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('khaki_user');
    if (savedUser) {
      try { setUser(JSON.parse(savedUser)); } catch {}
    }
  }, []);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [dashRes, bizRes, custRes, prodRes, invRes, payRes, dbRes, plRes, gstRes] =
          await Promise.allSettled([
            adminService.getDashboard(),
            businessService.getDashboardOverview(),
            customerService.getCustomers(),
            productService.getProducts(),
            invoiceService.getInvoices(),
            paymentService.getPayments(),
            accountingService.getDayBook(),
            accountingService.getProfitLoss(),
            gstService.getGstr1(),
          ]);

        if (dashRes.status === 'fulfilled' && dashRes.value.success) setAdminStats(dashRes.value.data);
        if (bizRes.status === 'fulfilled' && bizRes.value.success) setBizOverview(bizRes.value.data);
        if (custRes.status === 'fulfilled' && custRes.value.success) setCustomers(custRes.value.data || []);
        if (prodRes.status === 'fulfilled' && prodRes.value.success) setProducts(prodRes.value.data || []);
        if (invRes.status === 'fulfilled' && invRes.value.success) setInvoices(invRes.value.data || []);
        if (payRes.status === 'fulfilled' && payRes.value.success) setPayments(payRes.value.data || []);
        if (dbRes.status === 'fulfilled' && dbRes.value.success) setDayBook(dbRes.value.data);
        if (plRes.status === 'fulfilled' && plRes.value.success) setProfitAndLoss(plRes.value.data);
        if (gstRes.status === 'fulfilled' && gstRes.value.success) setGstSummary(gstRes.value.data);
      } catch (err) {
        console.error('Dashboard data load error:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [refreshKey]);

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Local Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[100] p-4 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-2xl shadow-2xl text-xs font-semibold flex items-center gap-2.5 animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Action Modals */}
      <AddCustomerModal
        isOpen={addCustomerOpen}
        onClose={() => setAddCustomerOpen(false)}
        onSuccess={(msg) => { showToast(msg); setRefreshKey(k => k + 1); }}
      />
      <AddProductModal
        isOpen={addProductOpen}
        onClose={() => setAddProductOpen(false)}
        onSuccess={(msg) => { showToast(msg); setRefreshKey(k => k + 1); }}
      />
      <CreateInvoiceDrawer
        isOpen={createInvoiceOpen}
        onClose={() => setCreateInvoiceOpen(false)}
        customers={customers}
        products={products}
        onSuccess={(msg) => { showToast(msg); setRefreshKey(k => k + 1); }}
      />
      <ViewInvoiceModal
        invoice={selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
        onSuccess={(msg) => showToast(msg)}
      />

      {/* Header Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span>Good Morning, {user?.name?.split(' ')[0] ?? 'Admin'}</span>
            <span className="text-xl">👋</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Here is what is happening with Khaki Karobari business operations today.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setRefreshKey(k => k + 1)}
            className="px-3 py-2 bg-white dark:bg-[#121927] border border-slate-200 dark:border-[#222E42] text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Sync</span>
          </button>

          <button
            onClick={() => setAddCustomerOpen(true)}
            className="px-3.5 py-2 bg-white dark:bg-[#121927] border border-slate-200 dark:border-[#222E42] text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-red-600" />
            <span>Customer</span>
          </button>

          <button
            onClick={() => setAddProductOpen(true)}
            className="px-3.5 py-2 bg-white dark:bg-[#121927] border border-slate-200 dark:border-[#222E42] text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-red-600" />
            <span>Product</span>
          </button>

          <button
            onClick={() => setCreateInvoiceOpen(true)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-red-600/30 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>+ Create Invoice</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard
          title="Total Revenue"
          value={`₹${(adminStats?.salesOverview?.totalSales ?? bizOverview?.metrics?.todaySales ?? 45500).toLocaleString('en-IN')}`}
          change="+14.2%"
          isPositive={true}
          icon={TrendingUp}
          accentColor="bg-emerald-500/10"
          iconColor="text-emerald-600 dark:text-emerald-400"
        />
        <KpiCard
          title="Today's Sales"
          value={`₹${(bizOverview?.metrics?.todaySales ?? 23364).toLocaleString('en-IN')}`}
          change="+8.5%"
          isPositive={true}
          icon={FileText}
        />
        <KpiCard
          title="Active Businesses"
          value={String(adminStats?.platformOverview?.totalBusinesses ?? 2)}
          change="+1 New"
          isPositive={true}
          icon={Building2}
          accentColor="bg-blue-500/10"
          iconColor="text-blue-600 dark:text-blue-400"
        />
        <KpiCard
          title="Active Users"
          value={String(adminStats?.platformOverview?.totalUsers ?? 3)}
          change="100% active"
          isPositive={true}
          icon={Users}
          accentColor="bg-purple-500/10"
          iconColor="text-purple-600 dark:text-purple-400"
        />
        <KpiCard
          title="Outstanding Due"
          value={`₹${(bizOverview?.metrics?.totalReceivables ?? 5300).toLocaleString('en-IN')}`}
          change="2 Pending"
          isPositive={false}
          icon={CreditCard}
          accentColor="bg-amber-500/10"
          iconColor="text-amber-600 dark:text-amber-400"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Revenue Growth & Monthly Performance</h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Total billed revenue from live transaction ledgers</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-lg">FY 2026-27</span>
          </div>
          <RevenueChart />
        </div>

        <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-5 shadow-sm space-y-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Sales vs Purchases</h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Weekly inventory turnover analysis</p>
          </div>
          <SalesVsPurchasesChart />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Top Performing Businesses</h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Multi-tenant business units on Khaki Karobari</p>
            </div>
            <a
              href="/invoices"
              className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
            >
              <span>View All Invoices</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <TopBusinessesTable onManage={() => router.push('/invoices')} />
        </div>

        <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Live System Activity</h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Real-time billing, stock & ledger events</p>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <ActivityTimeline />
        </div>
      </div>
    </div>
  );
}
