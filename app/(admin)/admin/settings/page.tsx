'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Settings,
  User,
  Building2,
  Users,
  Shield,
  Bell,
  Lock,
  Boxes,
  Save,
  CheckCircle2,
  Smartphone,
  Mail,
  KeyRound,
  CreditCard,
  MessageSquare,
  Globe,
  Upload,
} from 'lucide-react';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

type TabKey = 'profile' | 'business' | 'users' | 'roles' | 'notifications' | 'security' | 'integrations';

export default function AdminSettingsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialTab = (searchParams.get('tab') as TabKey) || 'profile';
  const [activeTab, setActiveTab] = useState<TabKey>(initialTab);
  const [saveToast, setSaveToast] = useState(false);

  useEffect(() => {
    const tab = searchParams.get('tab') as TabKey;
    if (tab && ['profile', 'business', 'users', 'roles', 'notifications', 'security', 'integrations'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    router.push(`/admin/settings?tab=${tab}`);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const tabs: { key: TabKey; label: string; icon: any }[] = [
    { key: 'profile', label: 'My Profile', icon: User },
    { key: 'business', label: 'Business Profile', icon: Building2 },
    { key: 'users', label: 'Admin Users', icon: Users },
    { key: 'roles', label: 'Roles & Access', icon: Shield },
    { key: 'notifications', label: 'Notification Settings', icon: Bell },
    { key: 'security', label: 'Security & 2FA', icon: Lock },
    { key: 'integrations', label: 'API Integrations', icon: Globe },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-150 max-w-5xl">
      <AdminBreadcrumb
        customItems={[
          { label: 'Settings', href: '/admin/settings' },
          { label: tabs.find(t => t.key === activeTab)?.label || 'General' },
        ]}
      />

      {saveToast && (
        <div className="fixed bottom-6 right-6 z-[100] p-4 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-2xl shadow-2xl text-xs font-semibold flex items-center gap-2.5 animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>Settings successfully saved and synchronized.</span>
        </div>
      )}

      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <Settings className="w-6 h-6 text-red-600" />
          <span>System & Enterprise Settings</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Configure business metadata, GST billing prefixes, administrator accounts, and security parameters.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Settings Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-2 shadow-sm shrink-0 space-y-1">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isCurrent = activeTab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => handleTabChange(t.key)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                  isCurrent
                    ? 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-bold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isCurrent ? 'text-red-600 dark:text-red-400' : 'text-slate-400'}`} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Tab Content Canvas */}
        <main className="flex-1 w-full bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm">
          {/* 1. PROFILE */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSave} className="space-y-5">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">Admin Personal Profile</h2>
                <p className="text-xs text-slate-500">Update your personal administrator identity and credentials.</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-500 text-white flex items-center justify-center font-black text-2xl shadow-lg shadow-red-600/20">
                  A
                </div>
                <div>
                  <button type="button" className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50">
                    Upload Avatar
                  </button>
                  <p className="text-[10px] text-slate-400 mt-1">PNG, JPG up to 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
                  <input
                    type="text"
                    defaultValue="Avinash Magar"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                  <input
                    type="email"
                    defaultValue="avinash@khaki.in"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Phone Number</label>
                  <input
                    type="tel"
                    defaultValue="9876543210"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600 font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Current Role</label>
                  <input
                    type="text"
                    disabled
                    value="SUPER_ADMIN (Managing Director)"
                    className="w-full px-3 py-2 bg-slate-100 dark:bg-[#080B12] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-500 font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-red-600/30 flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          )}

          {/* 2. BUSINESS */}
          {activeTab === 'business' && (
            <form onSubmit={handleSave} className="space-y-5">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">Business Enterprise Details</h2>
                <p className="text-xs text-slate-500">Legal entity name, GSTIN registration, and default invoice configuration.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Registered Business Name</label>
                  <input
                    type="text"
                    defaultValue="Khaki Karobar (Khaki KrypTech India Pvt Ltd)"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">GSTIN / Tax ID</label>
                  <input
                    type="text"
                    defaultValue="27AABCK1234D1ZX"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600 font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Permanent Account Number (PAN)</label>
                  <input
                    type="text"
                    defaultValue="AABCK1234D"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600 font-mono uppercase"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Invoice Series Prefix</label>
                  <input
                    type="text"
                    defaultValue="INV-202609-"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600 font-mono"
                  />
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Head Office Address</label>
                  <input
                    type="text"
                    defaultValue="Survey No. 45/2, Baner Business Hub, Pune, Maharashtra - 411045"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-red-600/30 flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Update Business Profile</span>
                </button>
              </div>
            </form>
          )}

          {/* 3. USERS */}
          {activeTab === 'users' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white">Admin Users & Staff Accounts</h2>
                  <p className="text-xs text-slate-500">Manage user access credentials, invitations, and active sessions.</p>
                </div>
                <button
                  onClick={() => alert('Invite User Dialog')}
                  className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold shadow-md shadow-red-600/20"
                >
                  + Add User
                </button>
              </div>

              <div className="space-y-2">
                {[
                  { name: 'Avinash Magar', email: 'avinash@khaki.in', role: 'SUPER_ADMIN', status: 'Active' },
                  { name: 'Sanjay More', email: 'sanjay@khaki.in', role: 'STORE_MANAGER', status: 'Active' },
                  { name: 'Sunita Deshmukh', email: 'sunita@khaki.in', role: 'ACCOUNTANT', status: 'Active' },
                ].map((u) => (
                  <div key={u.email} className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{u.name}</p>
                      <p className="text-slate-400 text-[11px]">{u.email} • {u.role}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200">
                      {u.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. ROLES */}
          {activeTab === 'roles' && (
            <div className="space-y-4">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">Role-Based Access Control (RBAC)</h2>
                <p className="text-xs text-slate-500">Permissions matrix for Invoicing, Products, Customers, Accounting, and Reports.</p>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                All roles and granular permissions are managed under the{' '}
                <a href="/admin/roles" className="text-red-600 font-bold hover:underline">
                  Roles & Permissions Module →
                </a>
              </p>
            </div>
          )}

          {/* 5. NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">Notification Preferences</h2>
                <p className="text-xs text-slate-500">Select communication channels for system warnings and transaction receipts.</p>
              </div>

              <div className="space-y-3">
                {[
                  { title: 'WhatsApp Instant Invoicing', desc: 'Automatically dispatch PDF tax invoices to client mobile numbers.', checked: true },
                  { title: 'Low Stock Safety Thresholds', desc: 'Trigger alerts when merchandise inventory falls below reorder points.', checked: true },
                  { title: 'Daily Revenue & P&L Digest', desc: 'Receive daily summary of billed counter sales and UPI receipts.', checked: false },
                  { title: 'Customer Credit Limit Breach Warnings', desc: 'Alert store manager if a billing exceeds registered customer credit limit.', checked: true },
                ].map((pref, idx) => (
                  <label key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200/60 dark:border-slate-800 flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked={pref.checked} className="mt-1 accent-red-600" />
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{pref.title}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{pref.desc}</p>
                    </div>
                  </label>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-red-600/30 flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Preferences</span>
                </button>
              </div>
            </form>
          )}

          {/* 6. SECURITY */}
          {activeTab === 'security' && (
            <form onSubmit={handleSave} className="space-y-5">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">Login Security & Two-Factor Authentication</h2>
                <p className="text-xs text-slate-500">Configure administrative password policies, active JWT sessions, and 2FA.</p>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">Two-Factor Authentication (OTP on Mobile)</p>
                    <p className="text-[11px] text-slate-400">Require 6-digit SMS/WhatsApp OTP code on every login session.</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 font-bold text-xs">
                    Enabled
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">Session Timeout</p>
                    <p className="text-[11px] text-slate-400">Automatically lock console after 30 minutes of inactivity.</p>
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
                    30 Minutes
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-red-600/30 flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Update Security</span>
                </button>
              </div>
            </form>
          )}

          {/* 7. INTEGRATIONS */}
          {activeTab === 'integrations' && (
            <div className="space-y-4">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">Connected Platforms & APIs</h2>
                <p className="text-xs text-slate-500">Live connectors for messaging, payment gateways, and accounting exports.</p>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-6 h-6 text-emerald-600" />
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">WhatsApp Cloud API</p>
                      <p className="text-[11px] text-slate-400">Official Meta WhatsApp Business Platform</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200">
                    Connected
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">Razorpay / UPI Payment Gateway</p>
                      <p className="text-[11px] text-slate-400">Instant QR code payments on invoice receipts</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200">
                    Live
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="w-6 h-6 text-amber-600" />
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">Transactional SMTP Mailer</p>
                      <p className="text-[11px] text-slate-400">Automated PDF email dispatch engine</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200">
                    Active
                  </span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
