'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { adminService } from '@/lib/api';
import { ThemeToggle } from '@/components/ThemeProvider';

export default function LoginPage() {
  const router = useRouter();
  const [loginPhone, setLoginPhone] = useState('9876543210');
  const [loginPassword, setLoginPassword] = useState('AdminPassword@123');
  const [loginMode, setLoginMode] = useState<'password' | 'otp'>('password');
  const [otpCode, setOtpCode] = useState('123456');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    const savedToken = localStorage.getItem('khaki_access_token');
    if (savedToken) {
      router.replace('/dashboard');
    }
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
          setLoginError(res.error || 'Authentication failed');
        }
      } else {
        const res = await adminService.verifyOtp(loginPhone, otpCode);
        if (res.success) {
          localStorage.setItem('khaki_access_token', res.data.token);
          localStorage.setItem('khaki_user', JSON.stringify(res.data.user));
          router.replace('/dashboard');
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
