'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  BarChart2,
  Cloud,
  Lock,
  Smartphone,
  CheckCircle2,
  Sparkles,
  CreditCard,
  Box,
  TrendingUp,
  Receipt,
  Building2,
  Calculator,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { adminService } from '@/lib/api';
import { ThemeToggle } from '@/components/ThemeProvider';

/* ─────────────────────────────────────────────────────────────────
   Subtle Business SVGs for the background aura
   ───────────────────────────────────────────────────────────────── */
const SvgInvoice = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 48 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="2" y="2" width="44" height="56" rx="5" stroke="currentColor" strokeWidth="2" />
    <line x1="10" y1="14" x2="38" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="10" y1="22" x2="38" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="10" y1="30" x2="28" y2="30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="10" y1="38" x2="24" y2="38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="28" y1="46" x2="38" y2="46" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="10" cy="46" r="3" fill="#dc2626" fillOpacity="0.7" />
  </svg>
);

const SvgCalculator = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 52 68" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="2" y="2" width="48" height="64" rx="7" stroke="currentColor" strokeWidth="2" />
    <rect x="9" y="10" width="34" height="16" rx="3" stroke="currentColor" strokeWidth="1.8" />
    <text x="26" y="22" textAnchor="middle" fontSize="10" fill="currentColor" fontFamily="monospace" fontWeight="bold">₹</text>
    <rect x="9" y="34" width="9" height="9" rx="2" fill="currentColor" fillOpacity="0.25" />
    <rect x="21.5" y="34" width="9" height="9" rx="2" fill="currentColor" fillOpacity="0.25" />
    <rect x="34" y="34" width="9" height="9" rx="2" fill="#dc2626" fillOpacity="0.5" />
    <rect x="9" y="47" width="9" height="9" rx="2" fill="currentColor" fillOpacity="0.25" />
    <rect x="21.5" y="47" width="9" height="9" rx="2" fill="currentColor" fillOpacity="0.25" />
    <rect x="34" y="47" width="9" height="9" rx="2" fill="currentColor" fillOpacity="0.25" />
  </svg>
);

const SvgStore = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 64 58" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M4 22L12 4H52L60 22H4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M4 22C4 22 4 30 12 30C20 30 20 22 20 22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M20 22C20 22 20 30 28 30C36 30 36 22 36 22" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
    <path d="M36 22C36 22 36 30 44 30C52 30 52 22 52 22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <rect x="10" y="30" width="44" height="26" rx="2" stroke="currentColor" strokeWidth="2" />
    <rect x="24" y="40" width="16" height="16" rx="2" fill="currentColor" fillOpacity="0.15" />
  </svg>
);

const BACKGROUND_ICONS = [
  { Comp: SvgInvoice, cls: 'float-a', style: { top: '5%', right: '8%', width: 44, opacity: 0.12 } },
  { Comp: SvgCalculator, cls: 'float-b', style: { top: '12%', left: '8%', width: 36, opacity: 0.10 } },
  { Comp: SvgStore, cls: 'float-c', style: { bottom: '8%', right: '12%', width: 48, opacity: 0.10 } },
  { Comp: SvgInvoice, cls: 'float-a', style: { bottom: '15%', left: '6%', width: 38, opacity: 0.08 } },
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
  const [showForgotNotice, setShowForgotNotice] = useState(false);

  useEffect(() => {
    document.title = 'Khaki Karobar | Login';
    const savedToken = localStorage.getItem('khaki_access_token');
    if (savedToken && savedToken !== 'undefined' && savedToken !== 'null' && savedToken.trim().length > 10) {
      router.replace('/admin/dashboard');
    } else {
      localStorage.removeItem('khaki_access_token');
      localStorage.removeItem('khaki_refresh_token');
      localStorage.removeItem('khaki_user');
      localStorage.removeItem('khaki_active_business_id');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    setShowForgotNotice(false);

    try {
      if (loginMode === 'password') {
        const res = await adminService.login(loginPhone, loginPassword);
        const token = res.data?.accessToken || res.data?.token || res.accessToken || res.token;
        const refreshToken = res.data?.refreshToken || res.refreshToken;
        const userData = res.data?.user || res.user;
        const activeBiz = res.data?.activeBusiness || res.activeBusiness;

        if (res.success && token) {
          localStorage.setItem('khaki_access_token', token);
          if (refreshToken) {
            localStorage.setItem('khaki_refresh_token', refreshToken);
          }
          if (userData) {
            localStorage.setItem('khaki_user', JSON.stringify(userData));
          }
          if (activeBiz?.id) {
            localStorage.setItem('khaki_active_business_id', activeBiz.id);
          }
          router.replace('/admin/dashboard');
        } else {
          setLoginError(res.error || res.message || 'Authentication failed. Please verify your credentials.');
        }
      } else {
        const res = await adminService.verifyOtp(loginPhone, otpCode);
        const token = res.data?.accessToken || res.data?.token || res.accessToken || res.token;
        const refreshToken = res.data?.refreshToken || res.refreshToken;
        const userData = res.data?.user || res.user;
        const activeBiz = res.data?.activeBusiness || res.activeBusiness;

        if (res.success && token) {
          localStorage.setItem('khaki_access_token', token);
          if (refreshToken) {
            localStorage.setItem('khaki_refresh_token', refreshToken);
          }
          if (userData) {
            localStorage.setItem('khaki_user', JSON.stringify(userData));
          }
          if (activeBiz?.id) {
            localStorage.setItem('khaki_active_business_id', activeBiz.id);
          }
          router.replace('/admin/dashboard');
        } else {
          setLoginError(res.error || res.message || 'Invalid OTP code. Please enter a valid 6-digit code.');
        }
      }
    } catch (err: any) {
      setLoginError(err?.response?.data?.error || err?.response?.data?.message || err.message || 'Unable to connect to the server. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setLoginPhone('9876543210');
    setLoginPassword('AdminPassword@123');
    setOtpCode('123456');
    setLoginError('');
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-slate-50 dark:bg-[#07090E] text-slate-900 dark:text-slate-100 transition-colors duration-200 overflow-x-hidden">

      {/* ╔══════════════════════════════════════════════════════════════════╗
          LEFT SIDE — Brand & Interactive Business Visual (approx 56%)
          ══════════════════════════════════════════════════════════════════╝ */}
      <section className="hidden lg:flex lg:w-[56%] xl:w-[58%] flex-col justify-between p-10 xl:p-14 relative overflow-hidden bg-gradient-to-br from-slate-100 via-slate-50 to-red-50/20 dark:from-[#090C14] dark:via-[#0D111D] dark:to-[#12080A] border-r border-slate-200/80 dark:border-white/5">

        {/* Subtle Ambient Red Glows */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-500/10 dark:bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 right-0 w-96 h-96 bg-red-600/10 dark:bg-red-700/10 rounded-full blur-3xl pointer-events-none" />

        {/* Subtle Background Pattern Dots */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Floating Outline Business SVGs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {BACKGROUND_ICONS.map(({ Comp, cls, style }, i) => (
            <div
              key={i}
              className={`absolute text-slate-700 dark:text-slate-300 ${cls}`}
              style={{
                top: style.top,
                right: style.right,
                bottom: style.bottom,
                left: style.left,
                width: style.width,
                height: style.width,
                opacity: style.opacity,
                animationDelay: `${i * 1.5}s`,
              }}
            >
              <Comp className="w-full h-full" />
            </div>
          ))}
        </div>

        {/* Brand Header */}
        <header className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="bg-white px-3 py-1.5 rounded-2xl border border-slate-200/90 dark:border-white/10 shadow-md">
              <img
                src="/logo.png"
                alt="Khaki Karobar"
                className="h-10 w-auto object-contain"
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 dark:bg-red-950/40 border border-red-200/80 dark:border-red-900/50 text-red-600 dark:text-red-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>v2.4 Production</span>
          </div>
        </header>

        {/* Center Content: Headline + Cohesive Business Dashboard Composition */}
        <div className="relative z-10 my-auto py-8">
          <div className="max-w-xl space-y-4 mb-8">
            <h1 className="text-4xl xl:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
              Run Your Business <span className="text-red-600">Smarter.</span>
            </h1>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Billing, inventory, customers, payments and business insights — all in one place.
            </p>
          </div>

          {/* ── Cohesive Business Illustration Visual Composition ── */}
          <div className="relative w-full max-w-lg min-h-[380px] flex items-center justify-center">

            {/* Central Floating Invoice Card */}
            <div className="relative z-20 w-80 bg-white/95 dark:bg-[#111624]/95 backdrop-blur-md rounded-2xl p-6 border border-slate-200/90 dark:border-white/10 shadow-2xl shadow-slate-300/40 dark:shadow-black/60 float-a">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-red-600/10 dark:bg-red-500/20 flex items-center justify-center text-red-600 dark:text-red-400">
                    <Receipt className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Tax Invoice</span>
                    <p className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">INV-1024</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
                  Paid • UPI
                </span>
              </div>

              <div className="py-4 space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-mono font-semibold text-slate-900 dark:text-slate-200">₹12,500</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>GST (18%)</span>
                  <span className="font-mono font-semibold text-slate-900 dark:text-slate-200">₹2,250</span>
                </div>
                <div className="pt-2 border-t border-dashed border-slate-200 dark:border-white/10 flex justify-between items-baseline">
                  <span className="font-bold text-slate-900 dark:text-white">Total Amount</span>
                  <span className="font-mono font-extrabold text-base text-red-600 dark:text-red-400">₹14,750</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-white/5">
                <span className="flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-red-500" /> Khaki Retail Store
                </span>
                <span className="font-mono text-[10px]">GSTIN Verified</span>
              </div>
            </div>

            {/* Orbiting Element 1: Mini Calculator Widget (Top-Right) */}
            <div className="absolute -top-3 -right-2 z-30 bg-white/95 dark:bg-[#141A29]/95 backdrop-blur-md rounded-xl p-3 border border-slate-200 dark:border-white/10 shadow-lg shadow-slate-200/50 dark:shadow-black/50 float-b w-44">
              <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b border-slate-100 dark:border-white/10">
                <Calculator className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Quick Calc</span>
              </div>
              <div className="bg-slate-100 dark:bg-[#0B0E17] rounded px-2 py-1 text-right font-mono text-xs font-bold text-slate-900 dark:text-slate-100 mb-2">
                ₹14,750.00
              </div>
              <div className="grid grid-cols-4 gap-1 text-[10px] font-mono text-center">
                <span className="bg-slate-50 dark:bg-white/5 py-1 rounded text-slate-500 font-semibold">C</span>
                <span className="bg-slate-50 dark:bg-white/5 py-1 rounded text-slate-500 font-semibold">÷</span>
                <span className="bg-slate-50 dark:bg-white/5 py-1 rounded text-slate-500 font-semibold">×</span>
                <span className="bg-red-600 text-white py-1 rounded font-bold">=</span>
              </div>
            </div>

            {/* Orbiting Element 2: Payment Card Element (Bottom-Left) */}
            <div className="absolute -bottom-4 -left-4 z-30 bg-white/95 dark:bg-[#141A29]/95 backdrop-blur-md rounded-xl p-3.5 border border-slate-200 dark:border-white/10 shadow-lg shadow-slate-200/50 dark:shadow-black/50 float-c w-52">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-white">
                  <CreditCard className="w-4 h-4 text-red-600 dark:text-red-400" />
                  <span>UPI / Card</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="font-mono text-xs text-slate-500 dark:text-slate-400 tracking-wider">
                •••• 4829
              </div>
              <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 pt-1.5 border-t border-slate-100 dark:border-white/5">
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Instant Settlement</span>
                <span className="font-bold text-slate-700 dark:text-slate-300">₹14,750</span>
              </div>
            </div>

            {/* Orbiting Element 3: Inventory / Package Badge (Top-Left) */}
            <div className="absolute top-2 -left-6 z-25 bg-white/90 dark:bg-[#131826]/90 backdrop-blur-md rounded-xl px-3 py-2 border border-slate-200/80 dark:border-white/10 shadow-md shadow-slate-200/40 dark:shadow-black/40 float-c flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-red-600/10 dark:bg-red-500/20 flex items-center justify-center text-red-600 dark:text-red-400">
                <Box className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200">SKU-9021</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">In Stock: 1,420 units</p>
              </div>
            </div>

            {/* Orbiting Element 4: Analytics Stat Badge (Bottom-Right) */}
            <div className="absolute -bottom-2 -right-4 z-25 bg-white/90 dark:bg-[#131826]/90 backdrop-blur-md rounded-xl px-3.5 py-2.5 border border-slate-200/80 dark:border-white/10 shadow-md shadow-slate-200/40 dark:shadow-black/40 float-b flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-black text-slate-900 dark:text-white">+24.8%</span>
                  <span className="text-[10px] text-emerald-500 font-semibold">Growth</span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Monthly Revenue</p>
              </div>
            </div>

          </div>
        </div>

        {/* Left Footer: Trust / Compliance Notice */}
        <footer className="relative z-10 pt-4 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>© 2026 Khaki Karobar • All rights reserved</span>
          <span className="flex items-center gap-1 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-red-600" /> Enterprise-grade 256-bit SSL
          </span>
        </footer>

      </section>

      {/* ╔══════════════════════════════════════════════════════════════════╗
          RIGHT SIDE — Login Experience (approx 44%)
          ══════════════════════════════════════════════════════════════════╝ */}
      <section className="flex-1 flex flex-col justify-between p-6 sm:p-10 xl:p-14 relative bg-white dark:bg-[#0B0E17]">

        {/* Top bar with Theme Toggle & Mobile Logo */}
        <div className="w-full flex items-center justify-between pb-6">
          <div className="lg:hidden flex items-center">
            <div className="bg-white px-2 py-1 rounded-xl border border-slate-200/90 dark:border-white/10 shadow-xs">
              <img
                src="/logo.png"
                alt="Khaki Karobar"
                className="h-7 w-auto object-contain"
              />
            </div>
          </div>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>

        {/* Center Container: Login Card */}
        <div className="w-full max-w-[440px] mx-auto my-auto space-y-6">

          {/* Mobile Illustration Teaser (visible only on mobile) */}
          <div className="lg:hidden p-4 rounded-2xl bg-slate-50 dark:bg-[#121624] border border-slate-200 dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-600/10 text-red-600 flex items-center justify-center">
                <Receipt className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Run Your Business Smarter</p>
                <p className="text-[11px] text-slate-500">Billing, Inventory, Accounting & GST</p>
              </div>
            </div>
            <span className="text-xs font-bold font-mono text-red-600 dark:text-red-400">INV-1024</span>
          </div>

          {/* Heading */}
          <div className="space-y-1.5 text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider">
              <span>Admin Console</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Welcome back 👋
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Sign in to manage your business.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="p-1 bg-slate-100 dark:bg-[#151A28] rounded-xl flex gap-1 border border-slate-200/80 dark:border-white/5">
            <button
              type="button"
              onClick={() => {
                setLoginMode('password');
                setLoginError('');
              }}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                loginMode === 'password'
                  ? 'bg-white dark:bg-[#20273B] text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
              }`}
            >
              Password
            </button>
            <button
              type="button"
              onClick={() => {
                setLoginMode('otp');
                setLoginError('');
              }}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                loginMode === 'otp'
                  ? 'bg-white dark:bg-[#20273B] text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
              }`}
            >
              OTP / Passwordless
            </button>
          </div>

          {/* Error Banner */}
          {loginError && (
            <div className="flex items-start gap-2.5 p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 rounded-xl animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              <div className="text-xs text-rose-700 dark:text-rose-300 leading-relaxed font-medium">
                {loginError}
              </div>
            </div>
          )}

          {/* Forgot Password Feedback Banner */}
          {showForgotNotice && (
            <div className="flex items-start gap-2.5 p-3.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-xl">
              <HelpCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
                For security, admin password resets must be authorized by your primary enterprise administrator. Or sign in using the OTP method with your registered phone number.
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">

            {/* Email or Phone Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                Email / Mobile Number
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4" />
                  <span className="text-xs font-mono font-medium text-slate-400">+91</span>
                </div>
                <input
                  type="tel"
                  required
                  value={loginPhone}
                  onChange={(e) => setLoginPhone(e.target.value)}
                  placeholder="9876543210"
                  className="w-full pl-16 pr-4 py-3 bg-slate-50 dark:bg-[#121624] border border-slate-200 dark:border-[#222B3F] rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-red-600 dark:focus:border-red-500 focus:ring-2 focus:ring-red-600/10 dark:focus:ring-red-500/20 transition-all font-medium"
                />
              </div>
            </div>

            {/* Password or OTP */}
            {loginMode === 'password' ? (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotNotice(!showForgotNotice)}
                    className="text-xs text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-semibold transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 text-slate-400 pointer-events-none">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-3 bg-slate-50 dark:bg-[#121624] border border-slate-200 dark:border-[#222B3F] rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-red-600 dark:focus:border-red-500 focus:ring-2 focus:ring-red-600/10 dark:focus:ring-red-500/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    6-Digit OTP Code
                  </label>
                  <span className="text-[11px] text-slate-400">Default demo OTP: 123456</span>
                </div>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 text-slate-400 pointer-events-none">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    required
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="123456"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-[#121624] border border-slate-200 dark:border-[#222B3F] rounded-xl text-base tracking-[0.3em] font-mono text-center text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-red-600 dark:focus:border-red-500 focus:ring-2 focus:ring-red-600/10 dark:focus:ring-red-500/20 transition-all"
                  />
                </div>
              </div>
            )}

            {/* Primary Sign In Button */}
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 px-4 bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-xl text-sm shadow-lg shadow-red-600/25 hover:shadow-red-600/40 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 dark:focus:ring-offset-[#0B0E17] transition-all flex items-center justify-center gap-2 mt-2 group"
            >
              {loginLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Trust / Feature Indicators */}
          <div className="py-2 flex items-center justify-center gap-4 text-[11px] text-slate-500 dark:text-slate-400 font-medium border-y border-slate-100 dark:border-white/5">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-red-600 dark:text-red-500" />
              Secure Login
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="flex items-center gap-1.5">
              <BarChart2 className="w-3.5 h-3.5 text-red-600 dark:text-red-500" />
              Business Management
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="flex items-center gap-1.5">
              <Cloud className="w-3.5 h-3.5 text-red-600 dark:text-red-500" />
              Data Backup
            </span>
          </div>

          {/* Demo Credentials Quick Fill Helper */}
          <div className="bg-slate-50 dark:bg-[#121624] border border-slate-200/80 dark:border-[#222B3F] rounded-2xl p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Demo Credentials
              </span>
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="text-[11px] font-semibold text-red-600 dark:text-red-400 hover:underline"
              >
                Auto-fill
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white dark:bg-[#181E30] px-2.5 py-1.5 rounded-lg border border-slate-200/60 dark:border-white/5">
                <span className="text-[10px] text-slate-400 block">Phone</span>
                <span className="font-mono font-bold text-slate-700 dark:text-slate-300">9876543210</span>
              </div>
              <div className="bg-white dark:bg-[#181E30] px-2.5 py-1.5 rounded-lg border border-slate-200/60 dark:border-white/5">
                <span className="text-[10px] text-slate-400 block">Password</span>
                <span className="font-mono font-bold text-slate-700 dark:text-slate-300">AdminPassword@123</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 pt-1 text-[11px] text-slate-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Connected to PostgreSQL Backend · Port 5001</span>
            </div>
          </div>

        </div>

        {/* Right Footer */}
        <div className="pt-6 text-center text-xs text-slate-400 dark:text-slate-500">
          Khaki Karobar by KrypTech™ · ISO 27001 Certified Architecture
        </div>

      </section>

    </div>
  );
}
