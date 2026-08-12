import { useState } from 'react';
import { Plus, Download, Search, CheckCircle2, Clock, Eye, Cloud } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DataTable, type Column } from '../components/ui/DataTable';
import { Card, CardContent } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';

interface PurchaseOrder {
  id: string;
  customer: string;
  poDate: string;
  deliveryDate: string;
  amount: string;
  status: string;
  erpStatus: string;
  source: string;
  scenarioRef: string;
}

const mockData: PurchaseOrder[] = [
  { id: '4517145590', customer: 'M/s. EATON FZE', poDate: 'May 12, 2026', deliveryDate: 'Jun 30, 2026', amount: 'AED 64,682.00', status: 'Approved', erpStatus: 'Synced (Sage 300)', source: 'Email (invoices@infratech.ae)', scenarioRef: 'Scenario 1: Price List Match' },
  { id: 'PO-VD-44192', customer: 'M/s. Verger Delporte UAE Ltd', poDate: 'Jul 10, 2026', deliveryDate: 'Aug 10, 2026', amount: 'AED 28,831.00', status: 'Approved', erpStatus: 'Synced (Sage 300)', source: 'Email (orders@infratech.ae)', scenarioRef: 'Scenario 2: Quote Match (ENQ-26-E-0164)' },
  { id: 'PO-CSO-9912', customer: 'M/s. CAN SERV OIL & GAS', poDate: 'May 04, 2026', deliveryDate: 'May 25, 2026', amount: 'AED 107,152.00', status: 'Approved', erpStatus: 'Synced (Sage 300)', source: 'Email (bhavani@infratech.ae)', scenarioRef: 'Scenario 3: Quote (No SKU)' },
  { id: 'PO-EN-7296', customer: 'M/s. ENCOM TRADING LLC', poDate: 'May 02, 2026', deliveryDate: 'May 20, 2026', amount: 'AED 520.80', status: 'Approved', erpStatus: 'Synced (Sage 300)', source: 'Email (orders@infratech.ae)', scenarioRef: 'Scenario 4: Part Cross-Match' },
  { id: 'PO-AS-10492', customer: 'M/s. Al Shariq Switchgear', poDate: 'Jul 15, 2026', deliveryDate: 'Aug 05, 2026', amount: 'AED 34,200.00', status: 'Pending Review', erpStatus: 'Pending', source: 'Scan Hotfolder', scenarioRef: 'Manual Scan Ingestion' },
];

const columns: Column<PurchaseOrder>[] = [
  { 
    header: 'PO Number', 
    accessor: (row) => (
      <Link to={`/document-processing/${row.id}`} className="font-bold text-indigo-600 hover:text-indigo-800 hover:underline transition-colors flex flex-col font-mono">
        {row.id}
        <span className="text-[11px] font-normal text-slate-400 no-underline">{row.scenarioRef}</span>
      </Link>
    ) 
  },
  { header: 'Customer', accessor: 'customer', className: 'font-semibold text-slate-800 text-xs' },
  { header: 'PO Date', accessor: 'poDate', className: 'text-xs font-medium text-slate-600' },
  { header: 'Delivery Date', accessor: 'deliveryDate', className: 'text-xs font-medium text-slate-600' },
  { header: 'Amount', accessor: 'amount', className: 'font-bold font-mono text-slate-900 text-xs' },
  { 
    header: 'Status', 
    accessor: (row) => {
      const isSuccess = row.status === 'Approved';
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-bold border ${isSuccess ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-amber-700 bg-amber-50 border-amber-200'} shadow-xs whitespace-nowrap`}>
          {isSuccess ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />} {row.status}
        </span>
      );
    } 
  },
  { 
    header: 'ERP Status', 
    accessor: (row) => (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold border border-indigo-200 bg-indigo-50 text-indigo-700 shadow-xs whitespace-nowrap font-mono">
        <Cloud className="w-3.5 h-3.5 text-indigo-500" /> {row.erpStatus}
      </span>
    ) 
  },
  { 
    header: 'Actions', 
    accessor: (row) => (
      <div className="flex items-center gap-1 justify-end">
        <Link to={`/document-processing/${row.id}`} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors" title="View in Validation Console">
          <Eye className="w-4 h-4" />
        </Link>
      </div>
    ),
    className: 'text-right'
  }
];

export const PurchaseOrders = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  return (
    <div className="space-y-6 h-full flex flex-col animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Customer Purchase Orders</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Repository of customer purchase orders across all 4 automation scenarios.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all">
            <Download className="w-4 h-4 text-slate-400" /> Export CSV
          </button>
          <button 
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5">
            <Plus className="w-4 h-4" /> Ingest PO
          </button>
        </div>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden shadow-md">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col xl:flex-row gap-4 justify-between">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by PO number or Customer (e.g. EATON, Verger Delporte)..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:border-indigo-500 outline-none transition-all shadow-xs"
            />
          </div>
        </div>

        {/* Table */}
        <CardContent className="p-0 overflow-hidden flex flex-col">
          <DataTable data={mockData} columns={columns} keyExtractor={(row) => row.id} />
        </CardContent>
      </Card>

      <Modal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} title="Upload Purchase Order">
        <div className="space-y-4">
          <p className="text-sm text-slate-500">Upload a PDF or Image of the Purchase Order to process it automatically via Infratech OCR.</p>
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-12 flex flex-col items-center justify-center text-center hover:bg-slate-50 hover:border-indigo-300 transition-colors cursor-pointer group">
            <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Cloud className="w-8 h-8 text-indigo-500" />
            </div>
            <p className="text-base font-bold text-slate-700">Click to browse or drag and drop</p>
            <p className="text-sm text-slate-500 mt-1">Supported formats: PDF, PNG, EML (Max 15MB)</p>
          </div>
          <div className="flex justify-end pt-4">
            <button onClick={() => setIsUploadModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
