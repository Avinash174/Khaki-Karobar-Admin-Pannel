'use client';

import React, { useState } from 'react';
import { Shield, Smartphone, KeyRound, Clock, AlertTriangle, CheckCircle2, Laptop } from 'lucide-react';

export default function SecuritySettingsPage() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [successToast, setSuccessToast] = useState('');

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(''), 4000);
  };

  const sessions = [
    { device: 'MacBook Pro (Apple Silicon) • macOS 14.6', browser: 'Chrome 128.0', ip: '103.24.120.45 (Pune, MH)', status: 'Current Active Session', isCurrent: true },
    { device: 'iPhone 15 Pro • iOS 17.5', browser: 'Mobile Safari', ip: '152.58.21.12 (Mumbai, MH)', status: 'Active 2h ago', isCurrent: false },
  ];

  return (
    <div className="space-y-6">
      {successToast && (
        <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* 2FA Card */}
      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm space-y-5">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-600" />
            <span>Two-Factor Authentication (2FA)</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Require a time-sensitive 6-digit OTP code sent via SMS/WhatsApp on login.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">Mobile SMS / WhatsApp OTP Verification</p>
              <p className="text-[11px] text-slate-400">Protects administrative accounts against credential stuffing.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setTwoFactorEnabled(!twoFactorEnabled);
              showToast(twoFactorEnabled ? '2FA disabled.' : '2FA activated.');
            }}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
              twoFactorEnabled ? 'bg-red-600 justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-white shadow-md" />
          </button>
        </div>
      </div>

      {/* Session Management */}
      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm space-y-5">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-red-600" />
            <span>Active Login Sessions</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Review devices currently authenticated with your JWT token.
          </p>
        </div>

        <div className="space-y-3">
          {sessions.map((s, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <Laptop className="w-5 h-5 text-slate-400" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white">{s.device}</span>
                    {s.isCurrent && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200">
                        This Device
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">{s.ip} • {s.browser}</p>
                </div>
              </div>

              {!s.isCurrent && (
                <button
                  onClick={() => showToast('Session revoked.')}
                  className="px-2.5 py-1 text-[11px] text-rose-600 font-semibold hover:underline"
                >
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
          <div className="space-y-0.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">Idle Session Timeout</label>
            <p className="text-[11px] text-slate-400">Lock console after inactivity period.</p>
          </div>
          <select
            value={sessionTimeout}
            onChange={(e) => {
              setSessionTimeout(e.target.value);
              showToast('Session timeout updated.');
            }}
            className="px-3 py-1.5 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600"
          >
            <option value="15">15 Minutes</option>
            <option value="30">30 Minutes (Recommended)</option>
            <option value="60">1 Hour</option>
            <option value="240">4 Hours</option>
          </select>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-rose-600" />
          <h3 className="text-sm font-bold text-rose-900 dark:text-rose-200 uppercase tracking-wider">
            Danger Zone
          </h3>
        </div>
        <p className="text-xs text-rose-700 dark:text-rose-300">
          Force termination of all active sessions across all devices for this account. You will be required to log in again immediately.
        </p>
        <button
          type="button"
          onClick={() => {
            if (confirm('Are you sure you want to sign out all other devices?')) {
              showToast('All other sessions terminated.');
            }
          }}
          className="px-4 py-2 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-bold rounded-xl text-xs shadow-md shadow-rose-600/20 transition-all"
        >
          Terminate All Other Sessions
        </button>
      </div>
    </div>
  );
}
