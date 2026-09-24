'use client';

import React, { useState } from 'react';
import { UserCheck, Plus, Search, Phone, Mail, Shield, Building2 } from 'lucide-react';
import { AdminBreadcrumb } from '@/components/AdminBreadcrumb';

interface Employee {
  id: string;
  name: string;
  designation: string;
  department: string;
  phone: string;
  email: string;
  role: string;
  status: 'ACTIVE' | 'ON_LEAVE';
}

const INITIAL_EMPLOYEES: Employee[] = [
  { id: 'emp-1', name: 'Avinash Magar', designation: 'Managing Director & Founder', department: 'Executive Management', phone: '9876543210', email: 'avinash@khaki.in', role: 'SUPER_ADMIN', status: 'ACTIVE' },
  { id: 'emp-2', name: 'Sanjay More', designation: 'Central Godown Manager', department: 'Logistics & Warehousing', phone: '9822998877', email: 'sanjay@khaki.in', role: 'STORE_MANAGER', status: 'ACTIVE' },
  { id: 'emp-3', name: 'Sunita Deshmukh', designation: 'Senior Accountant & GST Auditor', department: 'Finance & Compliance', phone: '9845112233', email: 'sunita@khaki.in', role: 'ACCOUNTANT', status: 'ACTIVE' },
  { id: 'emp-4', name: 'Rahul Joshi', designation: 'Counter Sales Representative', department: 'Retail Operations', phone: '9766443322', email: 'rahul@khaki.in', role: 'SALES_EXECUTIVE', status: 'ACTIVE' },
];

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [search, setSearch] = useState('');

  const filtered = employees.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.designation.toLowerCase().includes(search.toLowerCase()) ||
      e.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <AdminBreadcrumb customItems={[{ label: 'Employees & Staff' }]} />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-red-600" />
            <span>Employees & Staff Directory</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Enterprise staff members, departmental designations, and system roles.
          </p>
        </div>

        <button
          onClick={() => alert('Add Employee Dialog')}
          className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-red-600/30 flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Employee</span>
        </button>
      </div>

      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl p-4 shadow-sm">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search staff by name, designation, or department..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#2A364F] rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-red-600"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-[#121927] border border-slate-200/80 dark:border-[#222E42] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#0B0F19] border-b border-slate-200/80 dark:border-[#222E42] text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">Staff Member</th>
                <th className="p-4">Department & Designation</th>
                <th className="p-4">Contact Phone</th>
                <th className="p-4">System Role</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((e) => (
                <tr key={e.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-slate-900 dark:text-white text-sm">{e.name}</div>
                    <div className="text-slate-400 text-[11px]">{e.email}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-slate-800 dark:text-slate-200">{e.designation}</div>
                    <div className="text-slate-500 dark:text-slate-400 text-[11px]">{e.department}</div>
                  </td>
                  <td className="p-4 font-mono text-slate-700 dark:text-slate-300">{e.phone}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-[10px] font-bold text-slate-700 dark:text-slate-300">
                      {e.role}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200">
                      {e.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
