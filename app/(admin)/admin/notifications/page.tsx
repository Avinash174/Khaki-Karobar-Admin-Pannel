'use client';

import React, { useState } from 'react';
import { Bell, CheckCircle2, AlertTriangle, Info, Clock, Trash2 } from 'lucide-react';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  type: 'ALERT' | 'SUCCESS' | 'INFO';
  read: boolean;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  { id: 'notif-1', title: 'Low Stock Alert: Thermal Paper Rolls', desc: 'Current stock is 4 units, which is below the reorder point of 20 units.', time: '10 mins ago', type: 'ALERT', read: false },
  { id: 'notif-2', title: 'WhatsApp Invoice Dispatched', desc: 'Tax Invoice #INV-202609-0005 successfully delivered to customer phone +91 9822012345.', time: '45 mins ago', type: 'SUCCESS', read: false },
  { id: 'notif-3', title: 'Payment Reconciled (₹14,750)', desc: 'Received via UPI for invoice #INV-1024 into HDFC bank account.', time: '2 hours ago', type: 'SUCCESS', read: true },
  { id: 'notif-4', title: 'GST GSTR-1 Draft Ready', desc: 'Monthly outward return for September 2026 has been generated with 47 invoices.', time: '5 hours ago', type: 'INFO', read: true },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150 max-w-4xl">
      <AdminBreadcrumb customItems={[{ label: 'Notifications' }]} />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Bell className="w-6 h-6 text-red-600" />
            <span>System Notifications & Event Alerts</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time transaction alerts, WhatsApp dispatches, and inventory warnings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={markAllAsRead}
            className="px-3.5 py-2 bg-white dark:bg-[#121927] border border-slate-200 dark:border-[#222E42] text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
          >
            Mark all read
          </button>
          <button
            onClick={clearAll}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
          >
            Clear all
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="p-12 text-center text-slate-400 bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl">
            No active notifications. You are all caught up!
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                n.read
                  ? 'bg-white dark:bg-[#121927] border-slate-200/80 dark:border-[#222E42] opacity-80'
                  : 'bg-white dark:bg-[#141A28] border-red-500/30 dark:border-red-500/20 shadow-sm'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {n.type === 'ALERT' && <AlertTriangle className="w-5 h-5 text-amber-500" />}
                {n.type === 'SUCCESS' && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                {n.type === 'INFO' && <Info className="w-5 h-5 text-blue-500" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    {n.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 shrink-0 font-mono">
                    <Clock className="w-3 h-3" />
                    {n.time}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {n.desc}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
