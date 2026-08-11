import { AlertCircle, Copy, UserX, PackageX, DollarSign, Layers, Database } from 'lucide-react';
import { DataTable, type Column } from '../components/ui/DataTable';
import { Card, CardContent } from '../components/ui/Card';
import { Link } from 'react-router-dom';

interface ExceptionItem {
  id: string;
  type: string;
  customer: string;
  poNumber: string;
  status: string;
  priority: 'High' | 'Medium' | 'Low';
  severity: 'Critical' | 'Warning' | 'Info';
  assignedUser: string;
  createdDate: string;
  details: string;
}

const mockExceptions: ExceptionItem[] = [
  { id: '1', type: 'Pricing Verification', customer: 'M/s. EATON FZE', poNumber: '4517145590', status: 'Resolved', priority: 'High', severity: 'Info', assignedUser: 'Bhavani Prasad', createdDate: '2026-05-12 10:45 AM', details: 'Auto-verified with Tier 2 xPower Price List Rev 1.5. Unit prices match.' },
  { id: '2', type: 'Surcharge Computation', customer: 'M/s. Verger Delporte UAE Ltd', poNumber: 'PO-VD-44192', status: 'Resolved', priority: 'Medium', severity: 'Info', assignedUser: 'Bhavani Prasad', createdDate: '2026-07-10 09:15 AM', details: '10% Ex-works factory surcharge (AED 2,621.00) calculated per Quotation ENQ-26-E-0164.' },
  { id: '3', type: 'Freeform Description NLP', customer: 'M/s. CAN SERV OIL & GAS', poNumber: 'PO-CSO-9912', status: 'Resolved', priority: 'Medium', severity: 'Warning', assignedUser: 'Bhavani Prasad', createdDate: '2026-05-04 03:55 PM', details: 'Freeform panel text mapped to Infratech SKU INF-DB-2000-1423-A.' },
  { id: '4', type: 'Customer Part Cross-Match', customer: 'M/s. ENCOM TRADING LLC', poNumber: 'PO-EN-7296', status: 'Resolved', priority: 'Low', severity: 'Info', assignedUser: 'Sarah Jenkins', createdDate: '2026-05-02 11:30 AM', details: 'Customer code ER-ENC-200 mapped to Infratech SKU INF-ENC-2R16M.' },
  { id: '5', type: 'ERP Sync Queue', customer: 'M/s. Al Shariq Switchgear', poNumber: 'PO-AS-10492', status: 'In Progress', priority: 'High', severity: 'Warning', assignedUser: 'Ahmed Al-Farsi', createdDate: '2026-07-15 02:20 PM', details: 'Awaiting commercial manager approval prior to Sage 300 creation.' },
];

const validationMetrics = [
  { title: 'Contract Match', count: 18, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { title: 'Quote Linked', count: 24, icon: Copy, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { title: 'NLP Mapped', count: 8, icon: Layers, color: 'text-blue-600', bg: 'bg-blue-50' },
  { title: 'Customer SKUs', count: 12, icon: PackageX, color: 'text-amber-600', bg: 'bg-amber-50' },
  { title: 'VAT Validated', count: 52, icon: AlertCircle, color: 'text-purple-600', bg: 'bg-purple-50' },
  { title: 'Credit Terms', count: 45, icon: UserX, color: 'text-slate-600', bg: 'bg-slate-100' },
  { title: 'Sage 300 Synced', count: 62, icon: Database, color: 'text-emerald-600', bg: 'bg-emerald-50' },
];

export const ExceptionQueue = () => {

  const columns: Column<ExceptionItem>[] = [
    { 
      header: 'Workflow Verification Type', 
      accessor: (row) => (
        <div className="flex flex-col">
          <span className="font-bold text-slate-900 text-xs">{row.type}</span>
          <span className="text-[11px] text-slate-500 truncate max-w-[240px]" title={row.details}>{row.details}</span>
        </div>
      ) 
    },
    { header: 'Customer', accessor: 'customer', className: 'font-semibold text-slate-800 text-xs' },
    { 
      header: 'Customer PO Number', 
      accessor: (row) => (
        <Link to={`/document-processing/${row.poNumber}`} className="font-bold font-mono text-indigo-600 hover:text-indigo-800 hover:underline text-xs">
          {row.poNumber}
        </Link>
      ) 
    },
    { 
      header: 'Resolution Status', 
      accessor: (row) => {
        let color = 'text-slate-600 bg-slate-100 border-slate-200';
        if (row.status === 'In Progress') color = 'text-blue-700 bg-blue-50 border-blue-200';
        if (row.status === 'Resolved') color = 'text-emerald-700 bg-emerald-50 border-emerald-200';
        
        return (
          <span className={`inline-flex px-2.5 py-0.5 rounded-md text-xs font-bold border ${color} shadow-xs whitespace-nowrap`}>
            {row.status}
          </span>
        );
      } 
    },
    { 
      header: 'Assigned Specialist', 
      accessor: (row) => (
        <div className="flex flex-col">
          <span className="text-xs font-medium text-slate-800">{row.assignedUser}</span>
          <span className="text-[10px] text-slate-400">{row.createdDate}</span>
        </div>
      ) 
    },
    { 
      header: 'Action', 
      accessor: (row) => (
        <div className="flex items-center gap-1 justify-end">
          <Link to={`/document-processing/${row.poNumber}`} className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded text-xs font-bold transition-colors">
            Open Validation
          </Link>
        </div>
      ),
      className: 'text-right'
    }
  ];

  return (
    <div className="space-y-6 h-full flex flex-col animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Order Verification & Exception Center</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Traceability hub for AI cross-referencing, price variance resolutions, and NLP text mappings.</p>
        </div>
      </div>

      {/* Validation Dashboard Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {validationMetrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <Card key={idx} className="hover:-translate-y-0.5 transition-transform shadow-xs">
              <CardContent className="p-3 flex flex-col items-center justify-center text-center h-full gap-2">
                <div className={`p-2.5 rounded-full ${metric.bg} ${metric.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider leading-tight">{metric.title}</h3>
                  <p className={`text-xl font-black ${metric.color}`}>{metric.count}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Exception Queue Table */}
      <Card className="flex-1 flex flex-col overflow-hidden shadow-md">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col xl:flex-row gap-4 justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-800">Verification Ledger</h2>
            <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">All Scenarios Resolved</span>
          </div>
        </div>

        <CardContent className="p-0 overflow-hidden flex flex-col">
          <DataTable data={mockExceptions} columns={columns} keyExtractor={(row) => row.id} />
        </CardContent>
      </Card>
    </div>
  );
};
