'use client';

import React, { useState, useEffect } from 'react';
import { CreditCard, Plus, Search, CheckCircle2, ArrowRight, X, User, Truck } from 'lucide-react';
import { paymentService, customerService, supplierService, extractItems } from '@/lib/api';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterMode, setFilterMode] = useState('ALL');
  const [filterType, setFilterType] = useState('ALL'); // ALL, RECEIVED, MADE
  const [refreshKey, setRefreshKey] = useState(0);
  const [toastMessage, setToastMessage] = useState('');

  // Record Payment Modal State
  const [recordModalOpen, setRecordModalOpen] = useState(false);
  const [payType, setPayType] = useState<'RECEIVED' | 'MADE'>('RECEIVED');
  const [partyType, setPartyType] = useState<'CUSTOMER' | 'SUPPLIER'>('CUSTOMER');
  const [selectedPartyId, setSelectedPartyId] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4500);
  };

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [payRes, custRes, suppRes] = await Promise.allSettled([
          paymentService.getPayments(),
          customerService.getCustomers(),
          supplierService.getSuppliers(),
        ]);
        if (payRes.status === 'fulfilled' && payRes.value.success) {
          setPayments(extractItems(payRes.value.data));
        }
        if (custRes.status === 'fulfilled' && custRes.value.success) {
          setCustomers(extractItems(custRes.value.data));
        }
        if (suppRes.status === 'fulfilled' && suppRes.value.success) {
          setSuppliers(extractItems(suppRes.value.data));
        }
      } catch (err) {
        console.error('Payments load error:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [refreshKey]);

  const handleRecordPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    const payAmt = Number(amount);
    if (!selectedPartyId || !payAmt || payAmt <= 0) {
      setFormError('Please select a party and enter a valid positive payment amount.');
      return;
    }

    setSaving(true);
    setFormError('');
    try {
      const res = await paymentService.create({
        type: payType,
        partyType: partyType,
        customerId: partyType === 'CUSTOMER' ? selectedPartyId : undefined,
        supplierId: partyType === 'SUPPLIER' ? selectedPartyId : undefined,
        amount: payAmt,
        paymentMethod,
        referenceNumber: referenceNumber.trim() || undefined,
        notes: notes.trim() || undefined,
      });

      if (res.success) {
        showToast(`Payment of ₹${payAmt.toLocaleString('en-IN')} recorded & ledgers updated!`);
        setRecordModalOpen(false);
        setAmount('');
        setSelectedPartyId('');
        setReferenceNumber('');
        setNotes('');
        setRefreshKey((k) => k + 1);
      } else {
        setFormError(res.message || 'Failed to record payment');
      }
    } catch (err: any) {
      setFormError(err?.response?.data?.message || err.message || 'Error processing payment');
    } finally {
      setSaving(false);
    }
  };

  const filtered = payments.filter((p) => {
    const partyName = p.customer?.name || p.supplier?.name || p.customerName || '';
    const refNum = p.referenceNumber || p.receiptNumber || p.id || '';
    const notesStr = p.notes || '';

    const matchesSearch =
      partyName.toLowerCase().includes(search.toLowerCase()) ||
      refNum.toLowerCase().includes(search.toLowerCase()) ||
      notesStr.toLowerCase().includes(search.toLowerCase());

    const matchesMode = filterMode === 'ALL' || p.paymentMethod === filterMode;
    const matchesType = filterType === 'ALL' || p.type === filterType;

    return matchesSearch && matchesMode && matchesType;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <AdminBreadcrumb />

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[100] p-4 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-2xl shadow-2xl text-xs font-semibold flex items-center gap-2.5 animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Record Payment Modal */}
      {recordModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121927] border border-slate-200 dark:border-[#2A364F] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-red-600/10 text-red-600 flex items-center justify-center">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">Record Transaction</h3>
                  <p className="text-[11px] text-slate-400">Post collection or payout with atomic ledger entry</p>
                </div>
              </div>
              <button
                onClick={() => setRecordModalOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleRecordPayment} className="p-5 space-y-4">
              {formError && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-600 dark:text-rose-400">
                  {formError}
                </div>
              )}

              {/* Type Switcher */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setPayType('RECEIVED');
                    setPartyType('CUSTOMER');
                    setSelectedPartyId('');
                  }}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                    payType === 'RECEIVED'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                      : 'border-slate-200 dark:border-[#2A364F] text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  Payment In (Received)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPayType('MADE');
                    setPartyType('SUPPLIER');
                    setSelectedPartyId('');
                  }}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                    payType === 'MADE'
                      ? 'bg-red-600 text-white border-red-600 shadow-md'
                      : 'border-slate-200 dark:border-[#2A364F] text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  Payment Out (Paid)
                </button>
              </div>

              {/* Party Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Select {partyType === 'CUSTOMER' ? 'Customer' : 'Supplier'} <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={selectedPartyId}
                  onChange={(e) => setSelectedPartyId(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600"
                >
                  <option value="">-- Choose Party --</option>
                  {partyType === 'CUSTOMER'
                    ? customers.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.phone}) - Due: ₹{Number(c.currentBalance || 0)}
                        </option>
                      ))
                    : suppliers.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.companyName || s.name} ({s.phone}) - Payable: ₹{Number(s.currentBalance || 0)}
                        </option>
                      ))}
                </select>
              </div>

              {/* Amount & Method */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Amount (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="e.g. 5000"
                    className="w-full bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Payment Method
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600"
                  >
                    <option value="UPI">UPI / QR</option>
                    <option value="CASH">Cash</option>
                    <option value="BANK_TRANSFER">Bank Transfer (NEFT/RTGS)</option>
                    <option value="CHEQUE">Cheque</option>
                    <option value="CARD">Debit / Credit Card</option>
                  </select>
                </div>
              </div>

              {/* Reference & Notes */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Transaction / Cheque Ref #
                  </label>
                  <input
                    type="text"
                    value={referenceNumber}
                    onChange={(e) => setReferenceNumber(e.target.value)}
                    placeholder="e.g. UPI-92817293"
                    className="w-full bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Notes
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Cleared bill balance"
                    className="w-full bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setRecordModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-[#222E42] text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-red-600/30 disabled:opacity-50"
                >
                  {saving ? 'Processing...' : 'Confirm & Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-red-600" />
            <span>Payments & Collections Ledger</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Receipt reconciliation across Cash, UPI, and Bank transfer payment modes.
          </p>
        </div>

        <button
          onClick={() => setRecordModalOpen(true)}
          className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-red-600/30 flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>+ Record Payment</span>
        </button>
      </div>

      {/* Search Toolbar & Filter */}
      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search payments by party, receipt # or notes..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-red-600"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            {['ALL', 'RECEIVED', 'MADE'].map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-colors shrink-0 text-[11px] ${
                  filterType === t
                    ? 'bg-white dark:bg-[#121927] text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {t === 'ALL' ? 'All Types' : t === 'RECEIVED' ? 'Inward' : 'Outward'}
              </button>
            ))}
          </div>

          {['ALL', 'UPI', 'CASH', 'BANK_TRANSFER'].map((mode) => (
            <button
              key={mode}
              onClick={() => setFilterMode(mode)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors shrink-0 ${
                filterMode === mode
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#0B0F19] border-b border-slate-200/80 dark:border-[#222E42] text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">Reference / Receipt #</th>
                <th className="p-4">Type</th>
                <th className="p-4">Party Account</th>
                <th className="p-4">Payment Method</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4 text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">Loading payments...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">No payment records found.</td>
                </tr>
              ) : (
                filtered.map((p) => {
                  const isReceived = p.type === 'RECEIVED';
                  const partyName = p.customer?.name || p.supplier?.name || p.customerName || 'Direct Counter Billing';

                  return (
                    <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="p-4 font-mono font-bold text-slate-900 dark:text-white">
                        {p.referenceNumber || `REC-${p.id.slice(0, 8)}`}
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            isReceived
                              ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200'
                              : 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 border border-rose-200'
                          }`}
                        >
                          {isReceived ? 'RECEIVED' : 'PAID OUT'}
                        </span>
                      </td>
                      <td className="p-4 font-semibold text-slate-800 dark:text-slate-200">
                        {partyName}
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold font-mono text-[11px]">
                          {p.paymentMethod || 'UPI'}
                        </span>
                      </td>
                      <td className="p-4 text-slate-500">
                        {new Date(p.paymentDate || p.createdAt || Date.now()).toLocaleString('en-IN')}
                      </td>
                      <td className={`p-4 text-right font-mono font-bold text-sm ${
                        isReceived ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                      }`}>
                        {isReceived ? '+' : '-'}₹{Number(p.amount || 0).toLocaleString('en-IN')}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
