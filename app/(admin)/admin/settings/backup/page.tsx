'use client';

import React, { useState } from 'react';
import {
  Database,
  Download,
  Upload,
  Clock,
  CheckCircle2,
  HardDrive,
  FileSpreadsheet,
  AlertTriangle,
  RefreshCw,
  FileText,
  Trash2,
  ShieldAlert,
  X,
  FileArchive,
} from 'lucide-react';

interface BackupSnapshot {
  id: string;
  name: string;
  timestamp: string;
  size: string;
  type: 'Automated' | 'Manual';
  status: 'Completed';
}

const INITIAL_BACKUPS: BackupSnapshot[] = [
  {
    id: 'bk_1',
    name: 'Khaki_Karobar_Full_Snapshot_2026-09-24_02-00.enc',
    timestamp: 'Today at 02:14 AM',
    size: '42.8 MB',
    type: 'Automated',
    status: 'Completed',
  },
  {
    id: 'bk_2',
    name: 'Khaki_Karobar_Pre_GST_Audit_2026-09-23_18-30.enc',
    timestamp: 'Yesterday at 06:30 PM',
    size: '41.9 MB',
    type: 'Manual',
    status: 'Completed',
  },
  {
    id: 'bk_3',
    name: 'Khaki_Karobar_Full_Snapshot_2026-09-22_02-00.enc',
    timestamp: 'Sep 22, 2026 at 02:00 AM',
    size: '40.6 MB',
    type: 'Automated',
    status: 'Completed',
  },
];

export default function BackupSettingsPage() {
  const [backups, setBackups] = useState<BackupSnapshot[]>(INITIAL_BACKUPS);
  const [creatingBackup, setCreatingBackup] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Danger Zone Confirmation Dialog
  const [isDangerModalOpen, setIsDangerModalOpen] = useState(false);
  const [dangerConfirmText, setDangerConfirmText] = useState('');
  const [dangerActionType, setDangerActionType] = useState<'DEMO' | 'WIPE'>('DEMO');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCreateBackup = () => {
    setCreatingBackup(true);
    setTimeout(() => {
      const now = new Date();
      const newBackup: BackupSnapshot = {
        id: `bk_${Date.now()}`,
        name: `Khaki_Karobar_Manual_Snapshot_${now.toISOString().split('T')[0]}.enc`,
        timestamp: 'Just now',
        size: '43.2 MB',
        type: 'Manual',
        status: 'Completed',
      };
      setBackups([newBackup, ...backups]);
      setCreatingBackup(false);
      triggerToast('Database snapshot encrypted and saved to secure cloud bucket.');
    }, 1500);
  };

  const handleExportData = (type: string) => {
    triggerToast(`Exporting ${type} dataset. Download starting...`);
  };

  const handleConfirmDanger = (e: React.FormEvent) => {
    e.preventDefault();
    if (dangerConfirmText !== 'DELETE KHAKI KAROBAR') {
      alert('Confirmation text does not match.');
      return;
    }
    setIsDangerModalOpen(false);
    setDangerConfirmText('');
    if (dangerActionType === 'DEMO') {
      triggerToast('Sample demo transactions have been purged.');
    } else {
      triggerToast('Business data reset requested. Audit log generated.');
    }
  };

  return (
    <div className="space-y-6">
      {toastMessage && (
        <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Cloud Backup Status & Immediate Trigger */}
      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-red-600" />
              <span>Automated Database Backups</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              AES-256 encrypted daily snapshots backed up to redundant cloud vaults with 30-day retention.
            </p>
          </div>

          <button
            type="button"
            disabled={creatingBackup}
            onClick={handleCreateBackup}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-sm shadow-red-600/25 disabled:opacity-50 self-start sm:self-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${creatingBackup ? 'animate-spin' : ''}`} />
            <span>{creatingBackup ? 'Creating Snapshot...' : 'Create Backup Now'}</span>
          </button>
        </div>

        {/* Quick Snapshot Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200/70 dark:border-[#222E42] space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Last Backup Completed
            </span>
            <p className="text-sm font-black text-slate-900 dark:text-white">
              Today at 02:14 AM
            </p>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Status: Verified Healthy
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200/70 dark:border-[#222E42] space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Active Retention Policy
            </span>
            <p className="text-sm font-black text-slate-900 dark:text-white">
              30 Days Rolling Vault
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Auto-rotated every midnight
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200/70 dark:border-[#222E42] space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Encryption Protocol
            </span>
            <p className="text-sm font-black text-slate-900 dark:text-white">
              AES-256 GCM
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Zero-knowledge server-side key
            </p>
          </div>
        </div>

        {/* Backup Snapshot History Table */}
        <div className="space-y-2 pt-2">
          <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Available Cloud Snapshots
          </h3>
          <div className="border border-slate-200 dark:border-[#222E42] rounded-xl overflow-x-auto shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-[#0B0F19] font-bold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-[#222E42]">
                <tr>
                  <th className="p-3 pl-4">Snapshot Archive Name</th>
                  <th className="p-3">Created Timestamp</th>
                  <th className="p-3">File Size</th>
                  <th className="p-3">Type</th>
                  <th className="p-3 text-right pr-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#1E293B]">
                {backups.map((bk) => (
                  <tr
                    key={bk.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-[#1A2333]/50 transition-colors"
                  >
                    <td className="p-3 pl-4 font-mono font-medium text-slate-800 dark:text-slate-200 text-[11px] truncate max-w-xs">
                      {bk.name}
                    </td>
                    <td className="p-3 text-slate-500 dark:text-slate-400 text-[11px]">
                      {bk.timestamp}
                    </td>
                    <td className="p-3 text-slate-700 dark:text-slate-300 font-mono text-[11px]">
                      {bk.size}
                    </td>
                    <td className="p-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          bk.type === 'Automated'
                            ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600'
                            : 'bg-purple-50 dark:bg-purple-950/40 text-purple-600'
                        }`}
                      >
                        {bk.type}
                      </span>
                    </td>
                    <td className="p-3 text-right pr-4">
                      <button
                        type="button"
                        onClick={() => triggerToast(`Downloading snapshot ${bk.name}...`)}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 dark:text-red-400 hover:underline"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Data Export & Import Center */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export Data */}
        <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Download className="w-4 h-4 text-red-600" />
              <span>Export Business Data</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Download structured CSV files for auditing, chartered accountant review, or backup.
            </p>
          </div>

          <div className="space-y-2.5">
            {[
              { title: 'Tax Invoices & Billing Registers', format: 'CSV / Excel', desc: 'All sales vouchers with customer GSTIN, HSN, tax breakup', type: 'Invoices' },
              { title: 'Customer & Supplier Ledgers', format: 'CSV', desc: 'Contact details, outstanding balances, GSTIN numbers', type: 'Contacts & Ledgers' },
              { title: 'Product Catalog & Inventory Balances', format: 'CSV', desc: 'SKUs, stock in hand, buy/sale rates, HSN codes', type: 'Catalog & Stock' },
              { title: 'Complete Business Archive (Full Dump)', format: 'ZIP / JSON', desc: 'Comprehensive data package including audit logs', type: 'Full Database' },
            ].map((exp, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50/70 dark:bg-[#0B0F19]/60 border border-slate-200/60 dark:border-[#222E42]"
              >
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{exp.title}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">{exp.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleExportData(exp.type)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-[#222E42] text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
                >
                  Export {exp.format.split(' ')[0]}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Import Data */}
        <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Upload className="w-4 h-4 text-red-600" />
              <span>Import Data & Opening Balances</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Bulk upload inventory catalogs, customers, or historical ledgers via CSV templates.
            </p>
          </div>

          {/* Upload Dropzone */}
          <div className="border-2 border-dashed border-slate-200 dark:border-[#222E42] rounded-xl p-6 text-center space-y-2 hover:border-red-500/50 transition-colors bg-slate-50/50 dark:bg-[#0B0F19]/40">
            <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-950/40 text-red-600 flex items-center justify-center mx-auto">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Drag and drop CSV / Excel spreadsheet here
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">Supports .CSV, .XLSX up to 25 MB</p>
            </div>
            <button
              type="button"
              onClick={() => triggerToast('Select CSV file to import...')}
              className="px-4 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              Browse Local Files
            </button>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>Need sample CSV formatting?</span>
            <button
              type="button"
              onClick={() => triggerToast('Sample import templates downloaded.')}
              className="font-bold text-red-600 dark:text-red-400 hover:underline"
            >
              Download Sample CSV Templates
            </button>
          </div>
        </div>
      </div>

      {/* DANGER ZONE (Required by Section 17) */}
      <div className="bg-rose-50/40 dark:bg-rose-950/20 border-2 border-rose-200 dark:border-rose-900/40 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="border-b border-rose-200/80 dark:border-rose-900/50 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="text-sm font-black uppercase tracking-wider">Danger Zone</h3>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300">
            Irreversible Operations
          </span>
        </div>

        <p className="text-xs text-rose-700 dark:text-rose-300">
          The following destructive actions permanently alter or reset database tables. Every action requires typed confirmation.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className="p-4 rounded-xl bg-white dark:bg-[#121927] border border-rose-200 dark:border-rose-900/50 flex flex-col justify-between space-y-3">
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">Purge Sample & Demo Data</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Cleans all sample test leads, dummy invoices, and mock customers while retaining your business profile and configurations.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setDangerActionType('DEMO');
                setIsDangerModalOpen(true);
              }}
              className="px-4 py-2 rounded-xl border border-rose-300 dark:border-rose-800 text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 self-start transition-colors"
            >
              Purge Demo Records
            </button>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-[#121927] border border-rose-200 dark:border-rose-900/50 flex flex-col justify-between space-y-3">
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">Factory Reset Business Data</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Permanently wipes all transactions, invoices, customers, and inventory records. Only Super Admin can authorize.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setDangerActionType('WIPE');
                setIsDangerModalOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/25 self-start transition-all"
            >
              Factory Reset Business Data
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone Modal Confirmation */}
      {isDangerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#121927] border border-rose-200 dark:border-rose-900 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-950/60 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Confirm Destructive Action
                </h3>
                <p className="text-[11px] text-rose-600 font-semibold">
                  This operation cannot be undone.
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400">
              To proceed with resetting {dangerActionType === 'DEMO' ? 'sample transactions' : 'complete business records'}, please type <strong className="text-slate-900 dark:text-white font-mono">DELETE KHAKI KAROBAR</strong> below:
            </p>

            <form onSubmit={handleConfirmDanger} className="space-y-4">
              <input
                type="text"
                value={dangerConfirmText}
                onChange={(e) => setDangerConfirmText(e.target.value)}
                placeholder="DELETE KHAKI KAROBAR"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50/50 dark:bg-[#0B0F19] text-xs font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
              />

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsDangerModalOpen(false);
                    setDangerConfirmText('');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={dangerConfirmText !== 'DELETE KHAKI KAROBAR'}
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold disabled:opacity-40 transition-all shadow-md shadow-rose-600/25"
                >
                  Confirm & Execute
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
