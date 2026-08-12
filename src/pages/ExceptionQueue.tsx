import { Copy, DollarSign, Layers, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { DataTable, type Column } from '../components/ui/DataTable';
import { Card, CardContent } from '../components/ui/Card';
import { StatisticCard } from '../components/ui/StatisticCard';
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
  { id: '4', type: 'Customer Part Cross-Match', customer: 'M/s. ENCOM TRADING LLC', poNumber: 'PO-EN-7296', status: 'Resolved', priority: 'Low', severity: 'Info', assignedUser: 'Sarah Jenkins', createdDate: '2026-05-02 11:30 AM', details: 'Customer code EG30119 mapped to Infratech SKU INF-ENC-2R16M.' },
  { id: '5', type: 'ERP Sync Queue', customer: 'M/s. Al Shariq Switchgear', poNumber: 'PO-AS-10492', status: 'In Progress', priority: 'High', severity: 'Warning', assignedUser: 'Ahmed Al-Farsi', createdDate: '2026-07-15 02:20 PM', details: 'Awaiting commercial manager approval prior to Sage 300 creation.' },
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
    { 
      header: 'Customer / Buyer', 
      accessor: 'customer', 
      className: 'font-semibold text-slate-800 text-xs' 
    },
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
        const isResolved = row.status === 'Resolved';
        return (
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-semibold border ${
            isResolved ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-blue-700 bg-blue-50 border-blue-200'
          }`}>
            <CheckCircle2 className="w-3 h-3" /> {row.status}
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
          <Link to={`/document-processing/${row.poNumber}`} className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-semibold transition-colors border border-indigo-100">
            Open Validation
          </Link>
        </div>
      ),
      className: 'text-right'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Order Verification & Exception Ledger</h1>
          <p className="text-xs text-slate-500 mt-1 font-normal">Audit ledger for price variance resolutions, custom part mappings, and AI cross-referencing exceptions.</p>
        </div>
      </div>

      {/* 4 Focused Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatisticCard 
          title="Contract Matches" 
          value="18" 
          subtitle="Tier 2 price schedule"
          icon={DollarSign} 
          colorClass="text-indigo-600" 
          bgClass="bg-indigo-50"
        />
        <StatisticCard 
          title="Quote Matches" 
          value="24" 
          subtitle="Reference quotation offers"
          icon={Copy} 
          colorClass="text-emerald-600" 
          bgClass="bg-emerald-50"
        />
        <StatisticCard 
          title="Text Mapped" 
          value="8" 
          subtitle="Learned SKU dictionary rules"
          icon={Layers} 
          colorClass="text-blue-600" 
          bgClass="bg-blue-50"
        />
        <StatisticCard 
          title="Active Exceptions" 
          value="0" 
          subtitle="No unresolved price variances"
          icon={ShieldCheck} 
          colorClass="text-emerald-600" 
          bgClass="bg-emerald-50"
        />
      </div>

      {/* Exception Queue Table */}
      <Card className="shadow-2xs border-slate-200/80">
        <div className="p-3.5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">Verification Ledger Activity</h2>
          <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold rounded">
            All Scenarios Resolved
          </span>
        </div>

        <CardContent className="p-0 overflow-hidden flex flex-col">
          <DataTable data={mockExceptions} columns={columns} keyExtractor={(row) => row.id} />
        </CardContent>
      </Card>
    </div>
  );
};
