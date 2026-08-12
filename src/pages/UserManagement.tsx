import { useState } from 'react';
import { UserPlus, Search, Shield, MoreVertical, CheckCircle2, XCircle } from 'lucide-react';
import { DataTable, type Column } from '../components/ui/DataTable';
import { Card, CardContent } from '../components/ui/Card';
import { StatisticCard } from '../components/ui/StatisticCard';
import { Modal } from '../components/ui/Modal';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'Active' | 'Inactive' | 'Invited';
  lastLogin: string;
}

const mockUsers: UserData[] = [
  { id: '1', name: 'Bhavani Prasad', email: 'bhavani@infratech.ae', role: 'Commercial Operations Manager', department: 'Commercial & Approvals', status: 'Active', lastLogin: 'Just now' },
  { id: '2', name: 'Sarah Jenkins', email: 's.jenkins@infratech.ae', role: 'Order Processing Specialist', department: 'Sales Operations', status: 'Active', lastLogin: '12 mins ago' },
  { id: '3', name: 'Prasanth V.K', email: 'prasanth@infratech.ae', role: 'Senior Quotations Estimator', department: 'Tendering & Estimation', status: 'Active', lastLogin: '45 mins ago' },
  { id: '4', name: 'Ahmed Al-Farsi', email: 'ahmed.f@infratech.ae', role: 'Sage 300 ERP Administrator', department: 'IT & Enterprise Systems', status: 'Active', lastLogin: 'Yesterday' },
  { id: '5', name: 'Mohammed Tareq', email: 'm.tareq@infratech.ae', role: 'Warehouse & Logistics Lead', department: 'RAK Plant Logistics', status: 'Active', lastLogin: '2 days ago' },
  { id: '6', name: 'Emily Chen', email: 'e.chen@infratech.ae', role: 'Finance & VAT Controller', department: 'Finance & Accounting', status: 'Active', lastLogin: '3 days ago' },
];

export const UserManagement = () => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const columns: Column<UserData>[] = [
    { 
      header: 'User', 
      accessor: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-xs">
            {row.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 text-xs">{row.name}</span>
            <span className="text-[11px] text-slate-500 font-mono">{row.email}</span>
          </div>
        </div>
      ) 
    },
    { 
      header: 'Role & Department', 
      accessor: (row) => (
        <div className="flex flex-col">
          <span className="font-bold text-slate-800 text-xs">{row.role}</span>
          <span className="text-[11px] text-slate-500">{row.department}</span>
        </div>
      ) 
    },
    { 
      header: 'Status', 
      accessor: (row) => {
        let color = 'bg-slate-100 text-slate-600 border-slate-200';
        if (row.status === 'Active') color = 'bg-emerald-50 text-emerald-700 border-emerald-200';
        if (row.status === 'Inactive') color = 'bg-rose-50 text-rose-700 border-rose-200';
        if (row.status === 'Invited') color = 'bg-amber-50 text-amber-700 border-amber-200';
        
        const Icon = row.status === 'Active' ? CheckCircle2 : (row.status === 'Inactive' ? XCircle : UserPlus);
        
        return (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-bold border ${color} shadow-xs`}>
            <Icon className="w-3 h-3" /> {row.status}
          </span>
        );
      } 
    },
    { header: 'Last Active', accessor: 'lastLogin', className: 'text-xs text-slate-500' },
    { 
      header: 'Actions', 
      accessor: () => (
        <button className="p-1 text-slate-400 hover:text-indigo-600 rounded transition-colors float-right">
          <MoreVertical className="w-4 h-4" />
        </button>
      ),
      className: 'text-right'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">User Management & Access Controls</h1>
          <p className="text-xs text-slate-500 mt-1 font-normal">
            Commercial team members, role-based approval privileges, and ERP posting permissions.
          </p>
        </div>
        <div className="flex gap-2.5">
          <button 
            onClick={() => setIsInviteModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 shadow-2xs transition-all"
          >
            <UserPlus className="w-3.5 h-3.5" /> Invite Team Member
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatisticCard title="Team Members" value="6" subtitle="Active users in organization" icon={UserPlus} />
        <StatisticCard title="Approvers" value="2" subtitle="Authorized sign-off managers" icon={CheckCircle2} colorClass="text-emerald-600" bgClass="bg-emerald-50" />
        <StatisticCard title="Sage 300 ERP" value="Connected" subtitle="Company ID: 11975" icon={Shield} colorClass="text-indigo-600" bgClass="bg-indigo-50" />
      </div>

      {/* Main Table Card */}
      <Card className="shadow-2xs border-slate-200/80">
        <div className="p-3.5 border-b border-slate-100 bg-slate-50/50 flex flex-col xl:flex-row gap-4 justify-between">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input 
              type="text"
              placeholder="Search team members by name or email..."
              className="w-full pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:border-indigo-500 outline-none transition-all"
            />
          </div>
        </div>

        <CardContent className="p-0 overflow-hidden flex flex-col">
          <DataTable data={mockUsers} columns={columns} keyExtractor={(row) => row.id} />
        </CardContent>
      </Card>

      <Modal isOpen={isInviteModalOpen} onClose={() => setIsInviteModalOpen(false)} title="Invite Infratech Team Member">
        <div className="space-y-4">
          <p className="text-sm text-slate-500">Add an Infratech staff member to the PO Automation portal.</p>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Corporate Email Address <span className="text-rose-500">*</span></label>
              <input type="email" placeholder="e.g. employee@infratech.ae" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:border-indigo-500 outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Role Permission</label>
                <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:border-indigo-500 outline-none">
                  <option>Commercial Operations Manager</option>
                  <option>Order Processing Specialist</option>
                  <option>Quotations Estimator</option>
                  <option>Sage 300 ERP Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
                <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:border-indigo-500 outline-none">
                  <option>Commercial & Approvals</option>
                  <option>Sales Operations</option>
                  <option>Tendering & Estimation</option>
                  <option>Finance & Accounting</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button onClick={() => setIsInviteModalOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg">
              Cancel
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700">
              Send Invite
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
