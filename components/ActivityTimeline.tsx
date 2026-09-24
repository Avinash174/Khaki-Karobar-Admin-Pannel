'use client';

import React from 'react';
import {
  FileText,
  CreditCard,
  Building2,
  Package,
  CheckCircle2,
  AlertCircle,
  Clock,
} from 'lucide-react';

export interface ActivityItem {
  id: string;
  type: 'invoice' | 'payment' | 'business' | 'stock' | 'system';
  title: string;
  subtitle: string;
  amount?: string;
  time: string;
}

interface ActivityTimelineProps {
  activities?: ActivityItem[];
}

const defaultActivities: ActivityItem[] = [
  {
    id: 'act-1',
    type: 'invoice',
    title: 'New GST Invoice Created',
    subtitle: 'INV-202609-0005 for Sharma Traders & Co.',
    amount: '₹5,310',
    time: '2 mins ago',
  },
  {
    id: 'act-2',
    type: 'payment',
    title: 'Payment Received',
    subtitle: 'Via UPI from KrypTech Retail Store',
    amount: '₹2,000',
    time: '15 mins ago',
  },
  {
    id: 'act-3',
    type: 'stock',
    title: 'Atomic Stock Reduction',
    subtitle: 'Thermal Billing Rolls 80mm (-2 Units)',
    time: '42 mins ago',
  },
  {
    id: 'act-4',
    type: 'business',
    title: 'New Business Onboarded',
    subtitle: 'Mahalaxmi Supermarket, Pune (Pro Plan)',
    time: '1 hour ago',
  },
  {
    id: 'act-5',
    type: 'invoice',
    title: 'WhatsApp Invoice Dispatched',
    subtitle: 'Delivered to customer WhatsApp +91 98801...',
    time: '2 hours ago',
  },
];

export function ActivityTimeline({ activities = defaultActivities }: ActivityTimelineProps) {
  const getIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'invoice':
        return <FileText className="w-3.5 h-3.5 text-blue-500" />;
      case 'payment':
        return <CreditCard className="w-3.5 h-3.5 text-emerald-500" />;
      case 'business':
        return <Building2 className="w-3.5 h-3.5 text-red-500" />;
      case 'stock':
        return <Package className="w-3.5 h-3.5 text-amber-500" />;
      default:
        return <CheckCircle2 className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  const getBadgeBg = (type: ActivityItem['type']) => {
    switch (type) {
      case 'invoice':
        return 'bg-blue-500/10 border-blue-500/20';
      case 'payment':
        return 'bg-emerald-500/10 border-emerald-500/20';
      case 'business':
        return 'bg-red-500/10 border-red-500/20';
      case 'stock':
        return 'bg-amber-500/10 border-amber-500/20';
      default:
        return 'bg-slate-500/10 border-slate-500/20';
    }
  };

  return (
    <div className="space-y-4">
      {activities.map((item, index) => (
        <div key={item.id} className="relative flex items-start gap-3 group">
          {/* Connector line */}
          {index !== activities.length - 1 && (
            <div className="absolute left-[15px] top-7 bottom-0 w-0.5 bg-slate-200 dark:bg-[#1E293B] -mb-4" />
          )}

          <div
            className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 z-10 ${getBadgeBg(
              item.type
            )} transition-transform group-hover:scale-110`}
          >
            {getIcon(item.type)}
          </div>

          <div className="flex-1 min-w-0 pb-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                {item.title}
              </p>
              {item.amount && (
                <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 shrink-0">
                  {item.amount}
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
              {item.subtitle}
            </p>
            <div className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500 mt-1">
              <Clock className="w-3 h-3" />
              <span>{item.time}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
