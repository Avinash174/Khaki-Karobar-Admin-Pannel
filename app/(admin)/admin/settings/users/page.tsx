'use client';

import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Shield,
  CheckCircle2,
  XCircle,
  Mail,
  Phone,
  Lock,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  X,
} from 'lucide-react';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Super Admin' | 'Admin' | 'Manager' | 'Accountant' | 'Sales' | 'Employee';
  status: 'Active' | 'Disabled';
  lastLogin: string;
  avatarColor: string;
}

const INITIAL_USERS: AdminUser[] = [
  {
    id: 'usr_1',
    name: 'Avinash Magar',
    email: 'avinash@khaki.in',
    phone: '+91 98765 43210',
    role: 'Super Admin',
    status: 'Active',
    lastLogin: 'Just now (Pune, IN)',
    avatarColor: 'bg-red-600',
  },
  {
    id: 'usr_2',
    name: 'Rajesh Sharma',
    email: 'rajesh.sharma@khaki.in',
    phone: '+91 98234 56781',
    role: 'Admin',
    status: 'Active',
    lastLogin: 'Today at 10:15 AM',
    avatarColor: 'bg-indigo-600',
  },
  {
    id: 'usr_3',
    name: 'Pooja Kulkarni',
    email: 'pooja.accountant@khaki.in',
    phone: '+91 97654 32190',
    role: 'Accountant',
    status: 'Active',
    lastLogin: 'Yesterday at 4:40 PM',
    avatarColor: 'bg-emerald-600',
  },
  {
    id: 'usr_4',
    name: 'Sameer Deshmukh',
    email: 'sameer.sales@khaki.in',
    phone: '+91 91234 56789',
    role: 'Sales',
    status: 'Active',
    lastLogin: '2 days ago',
    avatarColor: 'bg-amber-600',
  },
  {
    id: 'usr_5',
    name: 'Vikram Shinde',
    email: 'vikram.manager@khaki.in',
    phone: '+91 94567 89012',
    role: 'Manager',
    status: 'Active',
    lastLogin: 'Sep 21, 2026',
    avatarColor: 'bg-blue-600',
  },
  {
    id: 'usr_6',
    name: 'Anjali Verma',
    email: 'anjali.ops@khaki.in',
    phone: '+91 98901 23456',
    role: 'Employee',
    status: 'Disabled',
    lastLogin: 'Aug 14, 2026',
    avatarColor: 'bg-slate-600',
  },
];

export default function UsersSettingsPage() {
  const [users, setUsers] = useState<AdminUser[]>(INITIAL_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPhone, setNewUserPhone] = useState('');
  const [newUserRole, setNewUserRole] = useState<AdminUser['role']>('Sales');
  const [newUserPassword, setNewUserPassword] = useState('');

  // Toast / Feedback
  const [feedback, setFeedback] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3500);
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;

    const newUser: AdminUser = {
      id: `usr_${Date.now()}`,
      name: newUserName,
      email: newUserEmail,
      phone: newUserPhone || '+91 98000 00000',
      role: newUserRole,
      status: 'Active',
      lastLogin: 'Never',
      avatarColor: 'bg-red-600',
    };

    setUsers([newUser, ...users]);
    setIsAddModalOpen(false);
    setNewUserName('');
    setNewUserEmail('');
    setNewUserPhone('');
    setNewUserPassword('');
    showNotification(`New user ${newUser.name} created with role ${newUser.role}`);
  };

  const toggleUserStatus = (id: string) => {
    setUsers(
      users.map((u) => {
        if (u.id === id) {
          if (u.role === 'Super Admin') {
            showNotification('Super Admin account status cannot be modified.');
            return u;
          }
          const newStatus = u.status === 'Active' ? 'Disabled' : 'Active';
          showNotification(`${u.name} status updated to ${newStatus}`);
          return { ...u, status: newStatus };
        }
        return u;
      })
    );
  };

  const handleDeleteUser = (id: string, name: string, role: string) => {
    if (role === 'Super Admin') {
      showNotification('Super Admin account cannot be deleted.');
      return;
    }
    if (confirm(`Are you sure you want to permanently remove user "${name}"?`)) {
      setUsers(users.filter((u) => u.id !== id));
      showNotification(`User ${name} has been removed.`);
    }
  };

  // Filtered List
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.phone.includes(searchTerm);
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'ALL' || u.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Toast Feedback */}
      {feedback && (
        <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300 animate-in fade-in duration-150">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Header Actions Card */}
      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-red-600" />
              <span>Admin & Staff Users Directory</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Manage internal administrative accounts, roles, access permissions, and session activity.
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-sm shadow-red-600/25 shrink-0 self-start sm:self-auto"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add New User</span>
          </button>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, email, or phone..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50/50 dark:bg-[#0B0F19] text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
            />
          </div>

          <div className="flex items-center gap-2.5">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50/50 dark:bg-[#0B0F19] text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
            >
              <option value="ALL">All Roles</option>
              <option value="Super Admin">Super Admin</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Accountant">Accountant</option>
              <option value="Sales">Sales</option>
              <option value="Employee">Employee</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50/50 dark:bg-[#0B0F19] text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
            >
              <option value="ALL">All Status</option>
              <option value="Active">Active</option>
              <option value="Disabled">Disabled</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="border border-slate-200 dark:border-[#222E42] rounded-xl overflow-x-auto shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#0B0F19] font-bold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-[#222E42]">
              <tr>
                <th className="p-3.5 pl-4">User</th>
                <th className="p-3.5">Contact Phone</th>
                <th className="p-3.5">Assigned Role</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Last Login Activity</th>
                <th className="p-3.5 text-right pr-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-[#1E293B]">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center p-8 text-slate-500 dark:text-slate-400">
                    No users found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  return (
                    <tr
                      key={u.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-[#1A2333]/50 transition-colors"
                    >
                      <td className="p-3.5 pl-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl ${u.avatarColor} text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm`}
                          >
                            {u.name[0]}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white leading-tight">
                              {u.name}
                            </p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                              <Mail className="w-3 h-3 text-slate-400" />
                              <span>{u.email}</span>
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="p-3.5 text-slate-700 dark:text-slate-300 font-mono text-[11px]">
                        {u.phone}
                      </td>

                      <td className="p-3.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            u.role === 'Super Admin'
                              ? 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200/60 dark:border-red-900/40'
                              : u.role === 'Admin'
                              ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-900/40'
                              : u.role === 'Accountant'
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-900/40'
                              : u.role === 'Manager'
                              ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-900/40'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <Shield className="w-3 h-3" />
                          <span>{u.role}</span>
                        </span>
                      </td>

                      <td className="p-3.5">
                        <button
                          type="button"
                          onClick={() => toggleUserStatus(u.id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all ${
                            u.status === 'Active'
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 hover:bg-emerald-100'
                              : 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 hover:bg-rose-100'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              u.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'
                            }`}
                          />
                          <span>{u.status}</span>
                        </button>
                      </td>

                      <td className="p-3.5 text-slate-500 dark:text-slate-400 text-[11px]">
                        {u.lastLogin}
                      </td>

                      <td className="p-3.5 text-right pr-4">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => toggleUserStatus(u.id)}
                            title={u.status === 'Active' ? 'Disable Account' : 'Enable Account'}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                          >
                            {u.status === 'Active' ? (
                              <XCircle className="w-4 h-4 text-amber-500" />
                            ) : (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            )}
                          </button>

                          {u.role !== 'Super Admin' && (
                            <button
                              type="button"
                              onClick={() => handleDeleteUser(u.id, u.name, u.role)}
                              title="Delete User"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between pt-2 text-xs text-slate-500">
          <span>Showing {filteredUsers.length} of {users.length} users</span>
          <div className="flex items-center gap-1">
            <button
              disabled
              className="p-1.5 rounded-lg border border-slate-200 dark:border-[#222E42] opacity-40 cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 rounded-lg bg-red-600 text-white font-bold text-xs">1</span>
            <button
              disabled
              className="p-1.5 rounded-lg border border-slate-200 dark:border-[#222E42] opacity-40 cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Add New User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#121927] border border-slate-200 dark:border-[#222E42] rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-red-600" />
                <span>Invite / Create Admin User</span>
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="e.g. Ramesh Patel"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50/50 dark:bg-[#0B0F19] text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    placeholder="ramesh@khaki.in"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50/50 dark:bg-[#0B0F19] text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={newUserPhone}
                    onChange={(e) => setNewUserPhone(e.target.value)}
                    placeholder="+91 98765 00000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50/50 dark:bg-[#0B0F19] text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Role & Access Level
                  </label>
                  <select
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value as AdminUser['role'])}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50/50 dark:bg-[#0B0F19] text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Accountant">Accountant</option>
                    <option value="Sales">Sales</option>
                    <option value="Employee">Employee</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Temporary Password
                  </label>
                  <input
                    type="password"
                    value={newUserPassword}
                    onChange={(e) => setNewUserPassword(e.target.value)}
                    placeholder="Auto-generated or custom"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#222E42] bg-slate-50/50 dark:bg-[#0B0F19] text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B0F19] text-[11px] text-slate-500 dark:text-slate-400">
                An invitation email will be dispatched with initial password setup link valid for 48 hours.
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-[#222E42] text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-md shadow-red-600/25"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
