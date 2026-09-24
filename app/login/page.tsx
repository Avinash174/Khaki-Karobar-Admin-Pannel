'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowRight, BarChart3, FileText, Shield, Zap, CheckCircle } from 'lucide-react';
import { adminService } from '@/lib/api';
import { ThemeToggle } from '@/components/ThemeProvider';

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
    <div className="min-h-screen bg-slate-50 dark:bg-[#08090F] flex transition-colors duration-200">
      {/* ─── LEFT PANEL — Brand & Features ────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[52%] xl:w-[55%] flex-col justify-between bg-[#0A0C14] relative overflow-hidden p-10 xl:p-14">

        {/* Abstract ambient glows */}
        <div className="absolute top-[-80px] left-[-60px] w-[480px] h-[480px] bg-red-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-60px] right-[-40px] w-[360px] h-[360px] bg-red-700/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Top brand */}
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

        {/* Center hero copy */}
        <div className="relative z-10 space-y-8">
          {/* Decorative grid mockup */}
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

        {/* Bottom footer */}
        <div className="relative z-10">
          <p className="text-[11px] text-slate-500">
            © 2026 Khaki KrypTech (India) Pvt. Ltd. · Pune, Maharashtra
          </p>
        </div>
      </div>

      {/* ─── RIGHT PANEL — Login Form ───────────────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center items-center px-5 sm:px-8 py-12 relative">

        {/* Theme toggle top-right */}
        <div className="absolute top-5 right-5">
          <ThemeToggle />
        </div>

        <div className="w-full max-w-[420px] space-y-8">

          {/* Mobile-only brand header */}
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

          {/* Card */}
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
              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                  Mobile Number
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-mono">+91</span>
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
                    <button type="button" className="text-[11px] text-red-600 hover:text-red-700 font-semibold">
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

              {/* Submit */}
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

            {/* Demo hint */}
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
