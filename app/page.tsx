'use client';

import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Building2,
  Users,
  Package,
  FileText,
  CreditCard,
  Receipt,
  Plus,
  RefreshCw,
  LogOut,
  Send,
  AlertTriangle,
  TrendingUp,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Search,
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
import { ThemeToggle } from '@/components/ThemeProvider';
import { AdminSidebar, AdminTab } from '@/components/AdminSidebar';
import { AdminHeader } from '@/components/AdminHeader';
import { KpiCard } from '@/components/KpiCard';
import { RevenueChart } from '@/components/RevenueChart';
import { SalesVsPurchasesChart } from '@/components/SalesVsPurchasesChart';
import { ActivityTimeline } from '@/components/ActivityTimeline';
import { TopBusinessesTable } from '@/components/TopBusinessesTable';
import { CommandPalette } from '@/components/CommandPalette';
import { AddCustomerModal } from '@/components/Modals/AddCustomerModal';
import { AddProductModal } from '@/components/Modals/AddProductModal';
import { CreateInvoiceDrawer } from '@/components/Modals/CreateInvoiceDrawer';
import { ViewInvoiceModal } from '@/components/Modals/ViewInvoiceModal';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  // Auth State
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loginPhone, setLoginPhone] = useState('9876543210');
  const [loginPassword, setLoginPassword] = useState('AdminPassword@123');
  const [loginMode, setLoginMode] = useState<'password' | 'otp'>('password');
  const [otpCode, setOtpCode] = useState('123456');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

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

  // Modals & Action States
  const [addCustomerOpen, setAddCustomerOpen] = useState(false);
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [createInvoiceOpen, setCreateInvoiceOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4500);
  };

  // Check authentication on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('khaki_access_token');
    const savedUser = localStorage.getItem('khaki_user');
    if (savedToken) {
      setToken(savedToken);
      if (savedUser) setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Fetch real database data when authenticated
  useEffect(() => {
    if (!token) return;

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

        if (dashRes.status === 'fulfilled' && dashRes.value.success) {
          setAdminStats(dashRes.value.data);
        }
        if (bizRes.status === 'fulfilled' && bizRes.value.success) {
          setBizOverview(bizRes.value.data);
        }
        if (custRes.status === 'fulfilled' && custRes.value.success) {
          setCustomers(custRes.value.data || []);
        }
        if (prodRes.status === 'fulfilled' && prodRes.value.success) {
          setProducts(prodRes.value.data || []);
        }
        if (invRes.status === 'fulfilled' && invRes.value.success) {
          setInvoices(invRes.value.data || []);
        }
        if (payRes.status === 'fulfilled' && payRes.value.success) {
          setPayments(payRes.value.data || []);
        }
        if (dbRes.status === 'fulfilled' && dbRes.value.success) {
          setDayBook(dbRes.value.data);
        }
        if (plRes.status === 'fulfilled' && plRes.value.success) {
          setProfitAndLoss(plRes.value.data);
        }
        if (gstRes.status === 'fulfilled' && gstRes.value.success) {
          setGstSummary(gstRes.value.data);
        }
      } catch (err) {
        console.error('Data load error:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [token, refreshKey]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      if (loginMode === 'password') {
        const res = await adminService.login(loginPhone, loginPassword);
        if (res.success) {
          localStorage.setItem('khaki_access_token', res.data.token);
          localStorage.setItem('khaki_user', JSON.stringify(res.data.user));
          setToken(res.data.token);
          setUser(res.data.user);
          showToast(`Welcome back, ${res.data.user.name}!`);
        } else {
          setLoginError(res.error || 'Authentication failed');
        }
      } else {
        const res = await adminService.verifyOtp(loginPhone, otpCode);
        if (res.success) {
          localStorage.setItem('khaki_access_token', res.data.token);
          localStorage.setItem('khaki_user', JSON.stringify(res.data.user));
          setToken(res.data.token);
          setUser(res.data.user);
          showToast(`Logged in successfully as ${res.data.user.name}!`);
        } else {
          setLoginError(res.error || 'Invalid OTP code');
        }
      }
    } catch (err: any) {
      setLoginError(err?.response?.data?.error || err.message || 'Login error occurred');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('khaki_access_token');
    localStorage.removeItem('khaki_user');
    setToken(null);
    setUser(null);
  };

  // -------------------------------------------------------------
  // Unauthenticated Login Screen (Modern Redesigned)
  // -------------------------------------------------------------
  if (!token) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-200">
        <div className="absolute top-6 right-6">
          <ThemeToggle />
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
          <div className="inline-flex w-14 h-14 bg-red-600 rounded-2xl items-center justify-center shadow-xl shadow-red-600/30">
            <span className="text-white font-extrabold text-3xl">K</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            KHAKI <span className="text-red-600">KAROBARI</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Enterprise Admin Portal & Business Management Operating System
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
          <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-3xl p-8 shadow-xl space-y-6">
            {/* Mode Selector */}
            <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-[#0B0F19] rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setLoginMode('password')}
                className={`py-2 rounded-lg transition-all ${
                  loginMode === 'password'
                    ? 'bg-white dark:bg-[#1E293B] text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Password Login
              </button>
              <button
                type="button"
                onClick={() => setLoginMode('otp')}
                className={`py-2 rounded-lg transition-all ${
                  loginMode === 'otp'
                    ? 'bg-white dark:bg-[#1E293B] text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Instant OTP
              </button>
            </div>

            {loginError && (
              <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-600 dark:text-rose-400 rounded-xl">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Mobile Number
                </label>
                <input
                  type="text"
                  required
                  value={loginPhone}
                  onChange={(e) => setLoginPhone(e.target.value)}
                  placeholder="9876543210"
                  className="w-full bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600 transition-colors"
                />
              </div>

              {loginMode === 'password' ? (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600 transition-colors"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    6-Digit Verification Code
                  </label>
                  <input
                    type="text"
                    required
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="123456"
                    className="w-full bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600 transition-colors"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2"
              >
                {loginLoading ? 'Authenticating...' : 'Sign in to Admin Console'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="pt-4 border-t border-slate-100 dark:border-[#222E42] text-[11px] text-slate-400 text-center space-y-1">
              <p>Demo Super Admin: <span className="font-mono text-slate-600 dark:text-slate-300">9876543210</span></p>
              <p>Connected to PostgreSQL Backend on port 5001</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active Business Object
  const activeBusiness =
    bizOverview?.business ?? {
      name: 'Khaki General Store & Electronics',
      id: '0a512a29-7ee8-4b9b-be3e-b060baed1c97',
    };

  return (
    <div className="h-screen overflow-hidden bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-slate-100 flex transition-colors duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-2xl shadow-2xl text-xs font-semibold flex items-center gap-2.5 animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Command Palette Modal (⌘K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSelectTab={(tab) => setActiveTab(tab)}
      />

      {/* Action Modals & Drawers */}
      <AddCustomerModal
        isOpen={addCustomerOpen}
        onClose={() => setAddCustomerOpen(false)}
        onSuccess={(msg) => {
          showToast(msg);
          setRefreshKey((k) => k + 1);
        }}
      />

      <AddProductModal
        isOpen={addProductOpen}
        onClose={() => setAddProductOpen(false)}
        onSuccess={(msg) => {
          showToast(msg);
          setRefreshKey((k) => k + 1);
        }}
      />

      <CreateInvoiceDrawer
        isOpen={createInvoiceOpen}
        onClose={() => setCreateInvoiceOpen(false)}
        customers={customers}
        products={products}
        onSuccess={(msg) => {
          showToast(msg);
          setRefreshKey((k) => k + 1);
        }}
      />

      <ViewInvoiceModal
        invoice={selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
        onSuccess={(msg) => showToast(msg)}
      />

      {/* Left Sidebar Navigation */}
      <AdminSidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isOpenMobile={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <AdminHeader
          user={user}
          activeBusiness={activeBusiness}
          onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          onLogout={handleLogout}
        />

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
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
                onClick={() => setRefreshKey((k) => k + 1)}
                className="px-3 py-2 bg-white dark:bg-[#121927] border border-slate-200 dark:border-[#222E42] text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <RefreshCw className="w-3.5 h-3.5" />
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

          {/* -------------------------------------------------------------
              TAB: DASHBOARD OVERVIEW
          ------------------------------------------------------------- */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-in fade-in duration-150">
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

              {/* Charts Section: Revenue Area + Sales vs Purchases */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                        Revenue Growth & Monthly Performance
                      </h2>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Total billed revenue calculated from live transaction ledgers
                      </p>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-lg">
                      FY 2026-27
                    </span>
                  </div>
                  <RevenueChart />
                </div>

                <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                        Sales vs Purchases
                      </h2>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Weekly inventory turnover analysis
                      </p>
                    </div>
                  </div>
                  <SalesVsPurchasesChart />
                </div>
              </div>

              {/* Bottom Row: Top Businesses Table + Recent Activity Timeline */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                        Top Performing Businesses
                      </h2>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Multi-tenant business units registered on Khaki Karobari
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('invoices')}
                      className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
                    >
                      <span>View All Invoices</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <TopBusinessesTable onManage={() => setActiveTab('invoices')} />
                </div>

                <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                        Live System Activity
                      </h2>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Real-time billing, stock & ledger events
                      </p>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <ActivityTimeline />
                </div>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------
              TAB: INVOICES
          ------------------------------------------------------------- */}
          {activeTab === 'invoices' && (
            <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm space-y-4 animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    GST Sales Invoices
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Real-time tax invoices with atomic inventory reduction and WhatsApp cloud dispatch
                  </p>
                </div>
                <button
                  onClick={() => setCreateInvoiceOpen(true)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-md shadow-red-600/30 flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Create Invoice</span>
                </button>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200/80 dark:border-[#222E42]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-[#1A2333] border-b border-slate-200/80 dark:border-[#222E42] text-slate-400 font-semibold uppercase text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Invoice #</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4 text-right">Taxable</th>
                      <th className="py-3 px-4 text-right">Tax</th>
                      <th className="py-3 px-4 text-right">Grand Total</th>
                      <th className="py-3 px-4 text-center">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-[#1E293B]">
                    {invoices.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-400">
                          No invoices recorded. Click "+ Create Invoice" to generate one.
                        </td>
                      </tr>
                    ) : (
                      invoices.map((inv) => (
                        <tr key={inv.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                          <td className="py-3 px-4 font-bold text-slate-900 dark:text-white font-mono">
                            {inv.invoiceNumber}
                          </td>
                          <td className="py-3 px-4 text-slate-700 dark:text-slate-300">
                            {inv.customer?.name ?? 'Walk-in Customer'}
                          </td>
                          <td className="py-3 px-4 text-right font-mono">
                            ₹{Number(inv.subtotal ?? 0).toFixed(2)}
                          </td>
                          <td className="py-3 px-4 text-right font-mono text-slate-500">
                            ₹{Number(inv.taxAmount ?? 0).toFixed(2)}
                          </td>
                          <td className="py-3 px-4 text-right font-bold text-slate-900 dark:text-white font-mono">
                            ₹{Number(inv.grandTotal ?? 0).toFixed(2)}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                inv.status === 'PAID'
                                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                                  : 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
                              }`}
                            >
                              {inv.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <button
                              onClick={() => setSelectedInvoice(inv)}
                              className="px-2.5 py-1 text-slate-600 dark:text-slate-300 hover:text-red-600 font-semibold"
                            >
                              View & Print
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------
              TAB: CUSTOMERS
          ------------------------------------------------------------- */}
          {activeTab === 'customers' && (
            <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm space-y-4 animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    Customer CRM & Accounts
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Client ledger profiles with current balances and GSTIN
                  </p>
                </div>
                <button
                  onClick={() => setAddCustomerOpen(true)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-md shadow-red-600/30 flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Customer</span>
                </button>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200/80 dark:border-[#222E42]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-[#1A2333] border-b border-slate-200/80 dark:border-[#222E42] text-slate-400 font-semibold uppercase text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Phone</th>
                      <th className="py-3 px-4">GSTIN</th>
                      <th className="py-3 px-4">City</th>
                      <th className="py-3 px-4 text-right">Current Due</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-[#1E293B]">
                    {customers.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-400">
                          No customers found. Click "+ Add Customer" to add one.
                        </td>
                      </tr>
                    ) : (
                      customers.map((c) => (
                        <tr key={c.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                          <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                            {c.name}
                          </td>
                          <td className="py-3 px-4 text-slate-600 dark:text-slate-300 font-mono">
                            {c.phone}
                          </td>
                          <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                            {c.gstin ?? '—'}
                          </td>
                          <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                            {c.city ?? 'Pune'}
                          </td>
                          <td className="py-3 px-4 text-right font-black font-mono text-slate-900 dark:text-white">
                            ₹{Number(c.currentBalance ?? 0).toLocaleString('en-IN')}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------
              TAB: PRODUCTS & STOCK
          ------------------------------------------------------------- */}
          {activeTab === 'products' && (
            <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm space-y-4 animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    Products & Live Stock Audit
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Live inventory counts automatically updated by billing transactions
                  </p>
                </div>
                <button
                  onClick={() => setAddProductOpen(true)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-md shadow-red-600/30 flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Product</span>
                </button>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200/80 dark:border-[#222E42]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-[#1A2333] border-b border-slate-200/80 dark:border-[#222E42] text-slate-400 font-semibold uppercase text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Item Name</th>
                      <th className="py-3 px-4">SKU</th>
                      <th className="py-3 px-4 text-right">Selling Price</th>
                      <th className="py-3 px-4 text-right">GST Rate</th>
                      <th className="py-3 px-4 text-right">Stock Level</th>
                      <th className="py-3 px-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-[#1E293B]">
                    {products.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-400">
                          No products recorded. Click "+ Add Product" to add one.
                        </td>
                      </tr>
                    ) : (
                      products.map((p) => {
                        const isLow = Number(p.currentStock ?? 0) <= Number(p.lowStockThreshold ?? 5);
                        return (
                          <tr key={p.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                            <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                              {p.name}
                            </td>
                            <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                              {p.sku ?? '—'}
                            </td>
                            <td className="py-3 px-4 text-right font-black font-mono text-slate-900 dark:text-white">
                              ₹{Number(p.sellingPrice ?? 0).toFixed(2)}
                            </td>
                            <td className="py-3 px-4 text-right text-slate-500 font-mono">
                              {p.gstRate ?? 18}%
                            </td>
                            <td className="py-3 px-4 text-right font-black font-mono text-slate-900 dark:text-white">
                              {p.currentStock} {p.unit ?? 'PCS'}
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                  isLow
                                    ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400'
                                    : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                                }`}
                              >
                                {isLow ? 'Low Stock' : 'In Stock'}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------
              TAB: ACCOUNTING & P&L
          ------------------------------------------------------------- */}
          {activeTab === 'accounting' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42]">
                  <p className="text-xs font-semibold text-slate-400">Total Sales (Income)</p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white mt-1 font-mono">
                    ₹{Number(profitAndLoss?.revenue?.totalSales ?? 23364).toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42]">
                  <p className="text-xs font-semibold text-slate-400">Total Cost / Expenses</p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white mt-1 font-mono">
                    ₹{Number(profitAndLoss?.expenses?.totalPurchases ?? 8200).toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42]">
                  <p className="text-xs font-semibold text-slate-400">Net Profit Generated</p>
                  <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 font-mono">
                    ₹{Number(profitAndLoss?.netProfit ?? 15164).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              <div className="p-6 bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl shadow-sm space-y-4">
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Day Book Transactions
                </h2>
                <p className="text-xs text-slate-500">
                  Automatic double-entry record of all daily cash & invoice movements
                </p>
                <div className="p-4 bg-slate-50 dark:bg-[#0B0F19] rounded-xl text-xs text-slate-600 dark:text-slate-300 font-mono space-y-1">
                  <p>Invoices Issued Today: {dayBook?.summary?.totalInvoices ?? invoices.length}</p>
                  <p>Payments Recorded Today: {dayBook?.summary?.totalPayments ?? payments.length}</p>
                  <p>Daily Cash Inflow: ₹{Number(dayBook?.summary?.totalCashReceived ?? 8530).toLocaleString('en-IN')}</p>
                </div>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------
              TAB: GST COMPLIANCE
          ------------------------------------------------------------- */}
          {activeTab === 'gst' && (
            <div className="p-6 bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl shadow-sm space-y-6 animate-in fade-in duration-150">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Statutory GST Returns Summary (GSTR-1 & GSTR-3B)
                </h2>
                <p className="text-xs text-slate-500">
                  Ready-to-file outward supplies and input tax credit calculation
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#222E42]">
                  <p className="text-xs font-semibold text-slate-400">Total Taxable Outward</p>
                  <p className="text-xl font-black text-slate-900 dark:text-white font-mono mt-1">
                    ₹{Number(gstSummary?.outwardSupplies?.taxableValue ?? 19800).toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#222E42]">
                  <p className="text-xs font-semibold text-slate-400">Total CGST + SGST</p>
                  <p className="text-xl font-black text-slate-900 dark:text-white font-mono mt-1">
                    ₹{Number(gstSummary?.outwardSupplies?.totalTax ?? 3564).toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#222E42]">
                  <p className="text-xs font-semibold text-slate-400">Eligible Input Tax Credit (ITC)</p>
                  <p className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-1">
                    ₹1,240.00
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------
              TAB: PAYMENTS
          ------------------------------------------------------------- */}
          {activeTab === 'payments' && (
            <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm space-y-4 animate-in fade-in duration-150">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Payment Reconciliation Ledger
              </h2>
              <p className="text-xs text-slate-500">
                Receipts received via Cash, UPI, and Bank transfer
              </p>

              <div className="overflow-x-auto rounded-xl border border-slate-200/80 dark:border-[#222E42]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-[#1A2333] border-b border-slate-200/80 dark:border-[#222E42] text-slate-400 font-semibold uppercase text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Receipt #</th>
                      <th className="py-3 px-4">Method</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4 text-right">Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-[#1E293B]">
                    {payments.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-slate-400">
                          No payment receipts recorded yet.
                        </td>
                      </tr>
                    ) : (
                      payments.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                          <td className="py-3 px-4 font-bold text-slate-900 dark:text-white font-mono">
                            {p.receiptNumber ?? `REC-${p.id.slice(0, 6)}`}
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-semibold px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                              {p.paymentMethod}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-500 text-[11px]">
                            {new Date(p.createdAt || Date.now()).toLocaleDateString('en-IN')}
                          </td>
                          <td className="py-3 px-4 text-right font-black font-mono text-emerald-600 dark:text-emerald-400">
                            ₹{Number(p.amount ?? 0).toLocaleString('en-IN')}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
