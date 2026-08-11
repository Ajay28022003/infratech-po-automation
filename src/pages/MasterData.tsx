import { useState } from 'react';
import { Database, CreditCard, Receipt, Scale, MapPin, Building, Shield, Users } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { DataTable, type Column } from '../components/ui/DataTable';
import { Modal } from '../components/ui/Modal';

const masterTabs = [
  { id: 'company', label: 'Company Entity', icon: Building },
  { id: 'tax', label: 'Tax Codes', icon: Receipt },
  { id: 'payment', label: 'Payment Terms', icon: CreditCard },
  { id: 'uom', label: 'Units of Measure', icon: Scale },
  { id: 'location', label: 'Locations & Plants', icon: MapPin },
  { id: 'bp', label: 'Business Partners', icon: Users },
  { id: 'roles', label: 'Roles & Permissions', icon: Shield },
];

const mockDataMap: Record<string, any[]> = {
  company: [
    { id: '1', code: '11975', name: 'INFRATECH FZ LLC', country: 'United Arab Emirates', trn: '100383847900003', jurisdiction: 'Ras Al Khaimah Free Trade Zone', status: 'Active' },
  ],
  tax: [
    { id: '1', code: 'VAT-05', name: 'UAE Standard VAT', rate: '5%', description: 'Standard rate for domestic UAE transactions', status: 'Active' },
    { id: '2', code: 'VAT-00', name: 'Designated Freezone / Export Exempt', rate: '0%', description: 'Exempt supply under UAE Federal Tax Authority', status: 'Active' },
  ],
  payment: [
    { id: '1', code: '90D-CR', name: '90 Days Credit', days: 90, customerRef: 'EATON FZE Contract', status: 'Active' },
    { id: '2', code: '90D-PDC', name: '90 Days PDC from Delivery', days: 90, customerRef: 'Verger Delporte UAE', status: 'Active' },
    { id: '3', code: '30D-CR', name: '30 Days Credit', days: 30, customerRef: 'Can Serv Oil & Gas', status: 'Active' },
    { id: '4', code: '30D-PDC', name: '30 Days PDC', days: 30, customerRef: 'Encom Trading LLC', status: 'Active' },
  ],
  uom: [
    { id: '1', code: 'NOS', name: 'Numbers / Units', type: 'Quantity', status: 'Active' },
    { id: '2', code: 'SET', name: 'Panel Set / Assembly', type: 'Assembly', status: 'Active' },
    { id: '3', code: 'MTR', name: 'Meter (Busbar/Conduit)', type: 'Length', status: 'Active' },
  ],
  location: [
    { id: '1', code: 'RAK-PLANT-01', name: 'Ras Al Khaimah Enclosure Works', type: 'Manufacturing Plant', status: 'Active' },
    { id: '2', code: 'JAFZA-LOG-11', name: 'DP World Unit 11, JAFZA Logistics Park', type: 'Delivery & Staging', status: 'Active' },
    { id: '3', code: 'AUH-HUB-02', name: 'Musaffah Distribution Depot', type: 'Regional Hub', status: 'Active' },
  ],
  bp: [
    { id: '1', code: 'CUST-EATON', name: 'M/s. EATON FZE', type: 'Customer', trn: '100296552100003', status: 'Active' },
    { id: '2', code: 'CUST-VERGER', name: 'M/s. Verger Delporte UAE Ltd', type: 'Customer', trn: '100412893100003', status: 'Active' },
    { id: '3', code: 'CUST-CANSERV', name: 'M/s. CAN SERV OIL & GAS', type: 'Customer', trn: '100998124500003', status: 'Active' },
    { id: '4', code: 'CUST-ENCOM', name: 'M/s. ENCOM TRADING LLC', type: 'Customer', trn: '100881923100003', status: 'Active' },
  ],
  roles: [
    { id: '1', code: 'COMM_MGR', name: 'Commercial Operations Manager', users: 1, access: 'Single-Level Approval & Sage 300 Post', status: 'Active' },
    { id: '2', code: 'ORDER_CLERK', name: 'Order Processing Specialist', users: 3, access: 'OCR Verification & Exception Mapping', status: 'Active' },
    { id: '3', code: 'AUDITOR', name: 'Compliance Auditor', users: 2, access: 'Read-only Reporting & Audit Trail', status: 'Active' },
  ],
};

export const MasterData = () => {
  const [activeTab, setActiveTab] = useState('company');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const getColumns = (): Column<any>[] => {
    const commonStatus = {
      header: 'Status', accessor: (row: any) => (
        <span className={`px-2 py-0.5 rounded text-xs font-bold ${row.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
          {row.status}
        </span>
      )
    };

    switch (activeTab) {
      case 'company':
        return [
          { header: 'Sage Code', accessor: 'code', className: 'font-bold font-mono text-indigo-600' },
          { header: 'Company Legal Name', accessor: 'name', className: 'font-bold text-slate-900 text-sm' },
          { header: 'TRN Number', accessor: 'trn', className: 'font-mono text-xs font-semibold text-slate-700' },
          { header: 'Freezone Jurisdiction', accessor: 'jurisdiction', className: 'text-xs text-slate-600' },
          commonStatus
        ];
      case 'tax':
        return [
          { header: 'Tax Code', accessor: 'code', className: 'font-bold font-mono text-indigo-600' },
          { header: 'Tax Description', accessor: 'name', className: 'font-semibold text-slate-800' },
          { header: 'VAT Rate', accessor: 'rate', className: 'font-bold text-emerald-700' },
          { header: 'Application Rule', accessor: 'description', className: 'text-xs text-slate-500' },
          commonStatus
        ];
      case 'payment':
        return [
          { header: 'Terms Code', accessor: 'code', className: 'font-bold font-mono text-indigo-600' },
          { header: 'Terms Description', accessor: 'name', className: 'font-semibold text-slate-800' },
          { header: 'Credit Days', accessor: 'days', className: 'font-bold text-slate-700 text-right' },
          { header: 'Applicable Scenario', accessor: 'customerRef', className: 'text-xs text-slate-500' },
          commonStatus
        ];
      case 'uom':
        return [
          { header: 'UOM Code', accessor: 'code', className: 'font-bold font-mono text-indigo-600' },
          { header: 'Unit Name', accessor: 'name', className: 'font-medium text-slate-700' },
          { header: 'Measurement Type', accessor: 'type', className: 'text-xs text-slate-600' },
          commonStatus
        ];
      case 'location':
        return [
          { header: 'Location Code', accessor: 'code', className: 'font-bold font-mono text-indigo-600' },
          { header: 'Plant / Facility Name', accessor: 'name', className: 'font-semibold text-slate-800' },
          { header: 'Facility Role', accessor: 'type', className: 'text-xs text-slate-600' },
          commonStatus
        ];
      case 'bp':
        return [
          { header: 'Partner Code', accessor: 'code', className: 'font-bold font-mono text-indigo-600' },
          { header: 'Customer / Buyer Name', accessor: 'name', className: 'font-bold text-slate-900' },
          { header: 'Customer TRN ID', accessor: 'trn', className: 'font-mono text-xs text-slate-700' },
          { header: 'Entity Type', accessor: 'type', className: 'text-xs text-slate-600 font-semibold' },
          commonStatus
        ];
      case 'roles':
        return [
          { header: 'Role Code', accessor: 'code', className: 'font-bold font-mono text-indigo-600' },
          { header: 'Role Title', accessor: 'name', className: 'font-semibold text-slate-800' },
          { header: 'Permissions Scope', accessor: 'access', className: 'text-xs text-slate-600' },
          { header: 'Users Count', accessor: 'users', className: 'font-bold text-slate-800 text-right' },
          commonStatus
        ];
      default:
        return [{ header: 'Code', accessor: 'code' }];
    }
  };

  return (
    <div className="space-y-6 h-full flex flex-col animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <Database className="w-8 h-8 text-indigo-600" /> Infratech Master Data Hub
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Centralized dictionary for Infratech FZ LLC company parameters, UAE tax codes, credit terms, and ERP business partners.
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all">
            + Add Master Record
          </button>
        </div>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden shadow-md">
        {/* Horizontal Navigation */}
        <div className="flex gap-1 overflow-x-auto p-3 border-b border-slate-100 bg-slate-50/50 custom-scrollbar">
          {masterTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  isActive 
                    ? 'bg-white text-indigo-700 shadow-sm border border-slate-200' 
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} /> {tab.label}
              </button>
            )
          })}
        </div>

        <CardContent className="p-0 overflow-auto flex-1">
          <DataTable data={mockDataMap[activeTab] || []} columns={getColumns()} keyExtractor={(row) => row.id} />
        </CardContent>
      </Card>

      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Add Master Data Record">
        <div className="space-y-4">
          <p className="text-sm text-slate-500">Create a new entry in Infratech's master enterprise dictionary.</p>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Record Code <span className="text-rose-500">*</span></label>
              <input type="text" placeholder="e.g. TERMS-60D" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:border-indigo-500 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Description / Title <span className="text-rose-500">*</span></label>
              <input type="text" placeholder="e.g. 60 Days Post-Dated Cheque" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:border-indigo-500 outline-none" />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button onClick={() => setIsCreateModalOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg">
              Cancel
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700">
              Save to Master DB
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
