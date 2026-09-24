'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowRight, BarChart3, FileText, Shield, Zap, CheckCircle } from 'lucide-react';
import { adminService } from '@/lib/api';
import { ThemeToggle } from '@/components/ThemeProvider';

/* ─────────────────────────────────────────────────────────────────
   BUSINESS ILLUSTRATION COMPONENTS
   Inline SVGs — crisp outline style, brand-neutral
   ───────────────────────────────────────────────────────────────── */

// 🧾 Invoice / Bill
const IlluInvoice = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 48 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="2" y="2" width="44" height="56" rx="5" stroke="currentColor" strokeWidth="2.2"/>
    <line x1="10" y1="14" x2="38" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="10" y1="22" x2="38" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="10" y1="30" x2="28" y2="30" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="10" y1="38" x2="24" y2="38" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="28" y1="46" x2="38" y2="46" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="10" cy="46" r="3" fill="#dc2626" fillOpacity="0.7"/>
  </svg>
);

// 🧮 Calculator
const IlluCalculator = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 52 68" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="2" y="2" width="48" height="64" rx="7" stroke="currentColor" strokeWidth="2.2"/>
    <rect x="9" y="10" width="34" height="16" rx="3" stroke="currentColor" strokeWidth="1.8"/>
    <text x="26" y="23" textAnchor="middle" fontSize="10" fill="currentColor" fontFamily="monospace" fontWeight="bold">₹</text>
    <rect x="9" y="34" width="9" height="9" rx="2" fill="currentColor" fillOpacity="0.25"/>
    <rect x="21.5" y="34" width="9" height="9" rx="2" fill="currentColor" fillOpacity="0.25"/>
    <rect x="34" y="34" width="9" height="9" rx="2" fill="#dc2626" fillOpacity="0.4"/>
    <rect x="9" y="47" width="9" height="9" rx="2" fill="currentColor" fillOpacity="0.25"/>
    <rect x="21.5" y="47" width="9" height="9" rx="2" fill="currentColor" fillOpacity="0.25"/>
    <rect x="34" y="47" width="9" height="9" rx="2" fill="currentColor" fillOpacity="0.25"/>
  </svg>
);

// 📦 Package / Inventory
const IlluPackage = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 60 56" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M30 4L56 18V38L30 52L4 38V18L30 4Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
    <path d="M30 4L30 52" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 3"/>
    <path d="M4 18L30 32L56 18" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <line x1="17" y1="11" x2="43" y2="25" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.8"/>
  </svg>
);

// 📊 Bar Chart / Analytics
const IlluChart = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 56 52" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="2" y="2" width="52" height="48" rx="5" stroke="currentColor" strokeWidth="2"/>
    <rect x="10" y="28" width="8" height="16" rx="2" fill="currentColor" fillOpacity="0.3"/>
    <rect x="24" y="18" width="8" height="26" rx="2" fill="currentColor" fillOpacity="0.3"/>
    <rect x="38" y="10" width="8" height="34" rx="2" fill="#dc2626" fillOpacity="0.5"/>
    <polyline points="10,28 24,18 38,10" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

// 💳 Payment Card
const IlluCard = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 68 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="2" y="2" width="64" height="44" rx="8" stroke="currentColor" strokeWidth="2.2"/>
    <rect x="2" y="14" width="64" height="10" fill="currentColor" fillOpacity="0.12"/>
    <rect x="10" y="32" width="18" height="5" rx="2" fill="currentColor" fillOpacity="0.3"/>
    <rect x="34" y="32" width="12" height="5" rx="2" fill="currentColor" fillOpacity="0.3"/>
    <circle cx="52" cy="34.5" r="5" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="57" cy="34.5" r="5" fill="#dc2626" fillOpacity="0.3" stroke="#dc2626" strokeWidth="1.2"/>
  </svg>
);

// 🏪 Shop / Store
const IlluShop = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 64 58" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M4 22L12 4H52L60 22H4Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
    <path d="M4 22C4 22 4 30 12 30C20 30 20 22 20 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M20 22C20 22 20 30 28 30C36 30 36 22 36 22" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.8"/>
    <path d="M36 22C36 22 36 30 44 30C52 30 52 22 52 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M4 22H60V22C60 22 60 30 52 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.4"/>
    <rect x="10" y="30" width="44" height="26" rx="2" stroke="currentColor" strokeWidth="2"/>
    <rect x="24" y="40" width="16" height="16" rx="2" fill="currentColor" fillOpacity="0.15"/>
    <line x1="10" y1="38" x2="24" y2="38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// 🔔 Notification Bell
const IlluBell = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 48 56" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M24 6C14 6 10 14 10 22V38H38V22C38 14 34 6 24 6Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
    <path d="M10 38H38" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M20 38C20 40.2 21.8 42 24 42C26.2 42 28 40.2 28 38" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="36" cy="10" r="6" fill="#dc2626" fillOpacity="0.7"/>
    <line x1="24" y1="2" x2="24" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// 📋 Clipboard / Orders
const IlluClipboard = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 48 58" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="4" y="8" width="40" height="48" rx="5" stroke="currentColor" strokeWidth="2.2"/>
    <rect x="16" y="2" width="16" height="12" rx="4" stroke="currentColor" strokeWidth="2" fill="none"/>
    <rect x="16" y="2" width="16" height="12" rx="4" fill="currentColor" fillOpacity="0.15"/>
    <line x1="12" y1="24" x2="36" y2="24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="12" y1="32" x2="36" y2="32" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="12" y1="40" x2="26" y2="40" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="9" cy="24" r="2" fill="currentColor" fillOpacity="0.4"/>
    <circle cx="9" cy="32" r="2" fill="currentColor" fillOpacity="0.4"/>
    <circle cx="9" cy="40" r="2" fill="#dc2626" fillOpacity="0.6"/>
  </svg>
);

// 📱 Mobile / Digital
const IlluPhone = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 36 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="2" y="2" width="32" height="60" rx="7" stroke="currentColor" strokeWidth="2.2"/>
    <rect x="8" y="10" width="20" height="36" rx="2" fill="currentColor" fillOpacity="0.1"/>
    <line x1="14" y1="56" x2="22" y2="56" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <rect x="11" y="14" width="14" height="3" rx="1" fill="currentColor" fillOpacity="0.3"/>
    <rect x="11" y="21" width="9" height="3" rx="1" fill="#dc2626" fillOpacity="0.4"/>
    <rect x="11" y="28" width="14" height="3" rx="1" fill="currentColor" fillOpacity="0.3"/>
  </svg>
);

// 🏷️ Price Tag
const IlluTag = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M4 4H26L48 26L30 44L8 44L4 26V4Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
    <circle cx="15" cy="15" r="4" stroke="currentColor" strokeWidth="2"/>
    <line x1="22" y1="30" x2="36" y2="16" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7"/>
    <line x1="22" y1="36" x2="40" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4"/>
  </svg>
);

// 📈 Trend / Growth arrow
const IlluTrend = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <polyline points="4,40 18,28 30,34 44,14 60,8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <polyline points="52,6 60,8 58,16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <polyline points="4,40 18,28 30,34 44,14 60,8" stroke="#dc2626" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeOpacity="0.5"/>
  </svg>
);

/* ─────────────────────────────────────────────────────────────────
   ILLUSTRATION LAYER — Left panel background scattering
   Each element: absolute position, fixed opacity, float class
   ───────────────────────────────────────────────────────────────── */
// Desktop left-panel illustration positions (relative to panel)
const LEFT_ILLUSTRATIONS = [
  // Top-right corner cluster
  { Component: IlluInvoice,    cls: 'float-a', style: { top: '4%',  right: '6%',  width: 44, opacity: 0.10 } },
  { Component: IlluCalculator, cls: 'float-b', style: { top: '8%',  right: '20%', width: 36, opacity: 0.08 } },
  { Component: IlluBell,       cls: 'float-c', style: { top: '2%',  left: '40%',  width: 30, opacity: 0.09 } },
  // Mid-left edge
  { Component: IlluPackage,    cls: 'float-b', style: { top: '38%', left: '2%',   width: 42, opacity: 0.08 } },
  { Component: IlluTag,        cls: 'float-a', style: { top: '30%', left: '12%',  width: 32, opacity: 0.07 } },
  // Mid-right
  { Component: IlluCard,       cls: 'float-c', style: { top: '26%', right: '2%',  width: 50, opacity: 0.08 } },
  { Component: IlluChart,      cls: 'float-a', style: { top: '44%', right: '5%',  width: 40, opacity: 0.07 } },
  // Bottom cluster
  { Component: IlluShop,       cls: 'float-b', style: { bottom: '18%', left: '4%',  width: 48, opacity: 0.09 } },
  { Component: IlluClipboard,  cls: 'float-c', style: { bottom: '12%', right: '8%', width: 36, opacity: 0.08 } },
  { Component: IlluPhone,      cls: 'float-a', style: { bottom: '6%',  left: '20%', width: 30, opacity: 0.07 } },
  { Component: IlluTrend,      cls: 'float-b', style: { bottom: '22%', right: '22%', width: 46, opacity: 0.09 } },
  // Sparse filler
  { Component: IlluInvoice,    cls: 'float-c', style: { top: '60%',  left: '32%', width: 28, opacity: 0.06 } },
  { Component: IlluCalculator, cls: 'float-a', style: { bottom: '34%', left: '28%', width: 32, opacity: 0.06 } },
];

// Mobile right-panel — only a few very subtle ones
const RIGHT_MOBILE_ILLUSTRATIONS = [
  { Component: IlluChart,    cls: 'float-a', style: { top: '8%',    right: '4%',  width: 34, opacity: 0.06 } },
  { Component: IlluInvoice,  cls: 'float-b', style: { bottom: '12%', left: '3%',  width: 30, opacity: 0.05 } },
  { Component: IlluPackage,  cls: 'float-c', style: { bottom: '6%',  right: '5%', width: 36, opacity: 0.05 } },
  { Component: IlluCard,     cls: 'float-a', style: { top: '14%',   left: '2%',   width: 32, opacity: 0.05 } },
  { Component: IlluTrend,    cls: 'float-b', style: { top: '72%',   left: '8%',   width: 40, opacity: 0.04 } },
];

const FEATURES = [
  { icon: FileText, text: 'GST-compliant Invoicing & Billing' },
  { icon: BarChart3, text: 'Real-time P&L & Double-Entry Accounting' },
  { icon: Shield, text: 'GSTR-1 & GSTR-3B Automated Filing' },
  { icon: Zap, text: 'WhatsApp Invoice Dispatch in 1 click' },
];

export default function LoginPage() {
  const router = useRouter();
  const [loginPhone, setLoginPhone] = useState('9876543210');
  const [loginPassword, setLoginPassword] = useState('AdminPassword@123');
  const [loginMode, setLoginMode] = useState<'password' | 'otp'>('password');
  const [otpCode, setOtpCode] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    const savedToken = localStorage.getItem('khaki_access_token');
    if (savedToken) router.replace('/dashboard');
  }, [router]);

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
          router.replace('/dashboard');
        } else {
          setLoginError(res.error || 'Authentication failed. Please check your credentials.');
        }
      } else {
        const res = await adminService.verifyOtp(loginPhone, otpCode);
        if (res.success) {
          localStorage.setItem('khaki_access_token', res.data.token);
          localStorage.setItem('khaki_user', JSON.stringify(res.data.user));
          router.replace('/dashboard');
        } else {
          setLoginError(res.error || 'Invalid OTP code. Please try again.');
        }
      }
    } catch (err: any) {
      setLoginError(err?.response?.data?.error || err.message || 'Unable to connect. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#08090F] flex transition-colors duration-200 overflow-x-hidden">

      {/* ╔═══════════════════════════════════════════════════════════════
          LEFT PANEL — Brand, features & business illustrations
          ═══════════════════════════════════════════════════════════════╗ */}
      <div className="hidden lg:flex lg:w-[52%] xl:w-[55%] flex-col justify-between bg-[#0A0C14] relative overflow-hidden p-10 xl:p-14">

        {/* ── Ambient glow blobs ──────────────────────────────────────── */}
        <div className="absolute top-[-80px] left-[-60px] w-[480px] h-[480px] bg-red-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-60px] right-[-40px] w-[360px] h-[360px] bg-red-700/10 rounded-full blur-[100px] pointer-events-none" />

        {/* ── Business Illustration Layer ─────────────────────────────── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {LEFT_ILLUSTRATIONS.map(({ Component, cls, style }, i) => (
            <div
              key={i}
              className={`absolute text-white ${cls}`}
              style={{
                top: style.top,
                right: style.right,
                bottom: style.bottom,
                left: style.left,
                width: style.width,
                height: style.width,
                opacity: style.opacity,
                animationDelay: `${(i * 1.3) % 6}s`,
              }}
            >
              <Component className="w-full h-full" />
            </div>
          ))}
        </div>

        {/* ── Top brand ────────────────────────────────────────────────── */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/40">
            <span className="text-white font-black text-xl leading-none">K</span>
          </div>
          <div>
            <span className="font-black text-white text-lg tracking-tight">
              Khaki <span className="text-red-500">Karobar</span>
            </span>
            <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">by KrypTech™</p>
          </div>
        </div>

        {/* ── Center hero copy ─────────────────────────────────────────── */}
        <div className="relative z-10 space-y-8">
          {/* KPI mockup cards */}
          <div className="grid grid-cols-2 gap-3 mb-10">
            {[
              { label: 'Today Revenue', value: '₹2,34,500', up: true },
              { label: 'Invoices Issued', value: '47', up: true },
              { label: 'GST Payable', value: '₹12,340', up: false },
              { label: 'Active Clients', value: '218', up: true },
            ].map((card) => (
              <div key={card.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{card.label}</p>
                <p className="text-xl font-black text-white mt-1">{card.value}</p>
                <span className={`text-[10px] font-semibold ${card.up ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {card.up ? '▲' : '▼'} Live
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl xl:text-5xl font-black text-white leading-tight tracking-tight">
              Manage your<br />
              business <span className="text-red-500">smarter.</span>
            </h1>
            <p className="text-slate-300 text-base max-w-md leading-relaxed">
              The complete business operating system for Indian enterprises — billing, inventory, accounting & GST in one place.
            </p>
          </div>

          {/* Feature pills */}
          <ul className="space-y-3">
            {FEATURES.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-red-600/15 border border-red-600/30 flex items-center justify-center shrink-0">
                  <Icon className="w-3.5 h-3.5 text-red-400" />
                </div>
                <span className="text-sm text-slate-300">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Bottom copyright ─────────────────────────────────────────── */}
        <div className="relative z-10">
          <p className="text-[11px] text-slate-500">
            © 2026 Khaki KrypTech (India) Pvt. Ltd. · Pune, Maharashtra
          </p>
        </div>
      </div>

      {/* ╔═══════════════════════════════════════════════════════════════
          RIGHT PANEL — Login form
          ═══════════════════════════════════════════════════════════════╗ */}
      <div className="flex-1 flex flex-col justify-center items-center px-5 sm:px-8 py-12 relative overflow-hidden">

        {/* ── Mobile illustration layer (3-5 elements only) ────────── */}
        <div className="lg:hidden absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {RIGHT_MOBILE_ILLUSTRATIONS.map(({ Component, cls, style }, i) => (
            <div
              key={i}
              className={`absolute text-slate-800 dark:text-white ${cls}`}
              style={{
                top: style.top,
                right: style.right,
                bottom: style.bottom,
                left: style.left,
                width: style.width,
                height: style.width,
                opacity: style.opacity,
                animationDelay: `${(i * 1.7) % 7}s`,
              }}
            >
              <Component className="w-full h-full" />
            </div>
          ))}
        </div>

        {/* Theme toggle */}
        <div className="absolute top-5 right-5 z-10">
          <ThemeToggle />
        </div>

        <div className="w-full max-w-[420px] space-y-8 relative z-10">

          {/* ── Mobile brand header ───────────────────────────────────── */}
          <div className="lg:hidden flex flex-col items-center text-center space-y-3">
            <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center shadow-xl shadow-red-600/30">
              <span className="text-white font-black text-3xl">K</span>
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Khaki <span className="text-red-600">Karobar</span>
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">by KrypTech™</p>
            </div>
          </div>

          {/* ── Login Card ────────────────────────────────────────────── */}
          <div className="bg-white dark:bg-[#111520] border border-slate-200 dark:border-[#1E2A40] rounded-3xl p-8 shadow-xl shadow-slate-200/60 dark:shadow-black/40 space-y-7">

            {/* Heading */}
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                Welcome back
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Sign in to your Khaki Karobar console
              </p>
            </div>

            {/* Mode Tabs */}
            <div className="flex p-1 bg-slate-100 dark:bg-[#0D1117] rounded-xl gap-1">
              {(['password', 'otp'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setLoginMode(mode)}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                    loginMode === mode
                      ? 'bg-white dark:bg-[#1A2235] text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  {mode === 'password' ? 'Password' : 'OTP / Passwordless'}
                </button>
              ))}
            </div>

            {/* Error Alert */}
            {loginError && (
              <div className="flex items-start gap-2.5 p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 rounded-xl">
                <span className="text-rose-500 shrink-0 mt-0.5">⚠</span>
                <p className="text-xs text-rose-600 dark:text-rose-400 leading-relaxed">{loginError}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Phone input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                  Mobile Number
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-mono select-none">+91</span>
                  <input
                    type="tel"
                    required
                    value={loginPhone}
                    onChange={(e) => setLoginPhone(e.target.value)}
                    placeholder="9876543210"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-[#1E2A40] rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-red-500 dark:focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition-all"
                  />
                </div>
              </div>

              {/* Password or OTP */}
              {loginMode === 'password' ? (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Password</label>
                    <button type="button" className="text-[11px] text-red-600 hover:text-red-700 font-semibold transition-colors">
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-4 pr-10 py-3 bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-[#1E2A40] rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-red-500 dark:focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                    6-Digit OTP Code
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    required
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="123456"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-[#1E2A40] rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition-all tracking-widest font-mono text-center"
                  />
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3.5 bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-xl text-sm shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition-all flex items-center justify-center gap-2 mt-2"
              >
                {loginLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span>Sign in to Console</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Demo credentials */}
            <div className="pt-4 border-t border-slate-100 dark:border-[#1E2A40] space-y-2">
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Demo Credentials</p>
              <div className="flex gap-2">
                <div className="flex-1 px-3 py-2 bg-slate-50 dark:bg-[#0D1117] rounded-lg border border-slate-200 dark:border-[#1E2A40]">
                  <p className="text-[10px] text-slate-400">Phone</p>
                  <p className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">9876543210</p>
                </div>
                <div className="flex-1 px-3 py-2 bg-slate-50 dark:bg-[#0D1117] rounded-lg border border-slate-200 dark:border-[#1E2A40]">
                  <p className="text-[10px] text-slate-400">Password</p>
                  <p className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">AdminPassword@123</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 pt-1">
                <CheckCircle className="w-3 h-3 text-emerald-500" />
                <p className="text-[10px] text-slate-400">Connected to PostgreSQL Backend · Port 5001</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
