import { useState } from 'react';
import { Plus, Download, Search, CheckCircle2, Eye } from 'lucide-react';
import { DataTable, type Column } from '../components/ui/DataTable';
import { Card, CardContent } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';

interface Quotation {
  id: string;
  customer: string;
  date: string;
  validUntil: string;
  amount: string;
  status: string;
  scenarioRef: string;
}

const mockData: Quotation[] = [
  { id: 'ENQ-26-E-0164', customer: 'M/s. Verger Delporte UAE Ltd', date: 'Jul 05, 2026', validUntil: 'Aug 05, 2026', amount: 'AED 28,831.00', status: 'Approved', scenarioRef: 'Scenario 2: Quotation Match (Quotation-02.pdf)' },
  { id: 'QT-EMAIL-PO00670', customer: 'M/s. CAN SERV OIL & GAS', date: 'Apr 28, 2026', validUntil: 'May 28, 2026', amount: 'AED 107,152.00', status: 'Approved', scenarioRef: 'Scenario 3: Email Quote (Quotation.png)' },
  { id: 'QT-EMAIL-ENCOM', customer: 'M/s. ENCOM TRADING LLC', date: 'Apr 25, 2026', validUntil: 'May 25, 2026', amount: 'AED 18,600.00', status: 'Approved', scenarioRef: 'Scenario 4: Email Quote (Quotation without part number.png)' },
  { id: 'ENQ-26-E-0166', customer: 'M/s. Al Shariq Switchgear LLC', date: 'Jul 12, 2026', validUntil: 'Aug 12, 2026', amount: 'AED 42,500.00', status: 'Sent', scenarioRef: 'Tender Quotation for Switchboards' },
  { id: 'CONTRACT-EATON-T2', customer: 'M/s. EATON FZE', date: 'Jan 01, 2026', validUntil: 'Dec 31, 2026', amount: 'Annual Schedule', status: 'Approved', scenarioRef: 'Scenario 1: Tier 2 Contract Master Price List' },
];

const columns: Column<Quotation>[] = [
  { 
    header: 'Quote Ref Number', 
    accessor: (row) => (
      <div className="flex flex-col">
        <span className="font-bold font-mono text-indigo-600 text-xs">{row.id}</span>
        <span className="text-[10px] text-slate-400">{row.scenarioRef}</span>
      </div>
    ) 
  },
  { header: 'Customer / Buyer', accessor: 'customer', className: 'font-semibold text-slate-900 text-xs' },
  { header: 'Quote Date', accessor: 'date', className: 'text-xs text-slate-600' },
  { header: 'Validity', accessor: 'validUntil', className: 'text-xs text-slate-500' },
  { header: 'Quoted Total', accessor: 'amount', className: 'font-bold font-mono text-slate-900 text-xs' },
  { 
    header: 'Status', 
    accessor: (row) => {
      const isApproved = row.status === 'Approved';
      return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold border ${isApproved ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-indigo-700 bg-indigo-50 border-indigo-200'} shadow-xs whitespace-nowrap`}>
          <CheckCircle2 className="w-3 h-3" /> {row.status}
        </span>
      );
    } 
  },
  { 
    header: 'Actions', 
    accessor: () => (
      <div className="flex items-center gap-1 justify-end">
        <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors" title="View Quote">
          <Eye className="w-4 h-4" />
        </button>
      </div>
    ),
    className: 'text-right'
  }
];

export const Quotations = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  return (
    <div className="space-y-6 h-full flex flex-col animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Formal Quotations & Price Schedules</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Infratech sales estimates and reference quotation offers for customer PO cross-matching.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all">
            <Download className="w-4 h-4 text-slate-400" /> Export CSV
          </button>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5">
            <Plus className="w-4 h-4" /> Create Quotation Offer
          </button>
        </div>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden shadow-md">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col xl:flex-row gap-4 justify-between">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by quote number (e.g. ENQ-26-E-0164, Verger Delporte)..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:border-indigo-500 outline-none transition-all shadow-xs"
            />
          </div>
        </div>

        <CardContent className="p-0 overflow-hidden flex flex-col">
          <DataTable data={mockData} columns={columns} keyExtractor={(row) => row.id} />
        </CardContent>
      </Card>

      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Create Quotation Offer">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Customer / Buyer <span className="text-rose-500">*</span></label>
              <input type="text" placeholder="e.g. Verger Delporte UAE" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:border-indigo-500 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Quotation Validity</label>
              <input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:border-indigo-500 outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Quotation Terms & Conditions</label>
            <textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:border-indigo-500 outline-none resize-none" rows={3} placeholder="e.g. Ex-works Sharjah factory, 5% customs extra, 90 Days PDC..."></textarea>
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button onClick={() => setIsCreateModalOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg">
              Cancel
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700">
              Save Quotation
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
