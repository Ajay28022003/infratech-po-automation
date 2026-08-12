import { useState } from 'react';
import { CheckCircle2, ArrowRight, MessageSquare, FileSpreadsheet, Layers, ArrowRightLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DataTable, type Column } from '../components/ui/DataTable';
import { Card, CardContent } from '../components/ui/Card';

interface InboundPO {
  id: string;
  poNumber: string;
  filename: string;
  customer: string;
  matchType: string;
  filterKey: string;
  category: 'Price List' | 'Quotation' | 'Email Quote';
  receivedDate: string;
  source: string;
  amount: string;
  status: 'Ready for Review' | 'Variance Flagged' | 'Posted to ERP';
  confidence: string;
}

const inboundPOs: InboundPO[] = [
  { 
    id: 'PO-4517145590', 
    poNumber: '4517145590',
    filename: 'PO 4517145590 - Infratech.pdf', 
    customer: 'EATON FZE', 
    matchType: 'Contract Price List (Tier 2)',
    filterKey: 'contract',
    category: 'Price List',
    receivedDate: 'May 12, 2026 10:45 AM', 
    source: 'invoices@infratech.ae', 
    amount: 'AED 64,682.00',
    status: 'Ready for Review', 
    confidence: '99.4%' 
  },
  { 
    id: 'PO-VD-44192', 
    poNumber: 'PO-VD-44192',
    filename: 'PO-1 - Verger Delporte.pdf', 
    customer: 'Verger Delporte UAE Ltd', 
    matchType: 'Quote ENQ-26-E-0164',
    filterKey: 'quote',
    category: 'Quotation',
    receivedDate: 'Jul 10, 2026 09:15 AM', 
    source: 'orders@infratech.ae', 
    amount: 'AED 28,831.00',
    status: 'Ready for Review', 
    confidence: '99.1%' 
  },
  { 
    id: 'PO-CSO-9912', 
    poNumber: 'PO-CSO-9912',
    filename: 'PO.pdf (Can Serv Oil)', 
    customer: 'Can Serv Oil & Gas', 
    matchType: 'Email Quote Match',
    filterKey: 'text',
    category: 'Email Quote',
    receivedDate: 'May 04, 2026 03:55 PM', 
    source: 'bhavani@infratech.ae', 
    amount: 'AED 107,152.00',
    status: 'Ready for Review', 
    confidence: '94.8%' 
  },
  { 
    id: 'PO-EN-7296', 
    poNumber: 'PO-EN-7296',
    filename: 'PO.pdf (Encom Trading)', 
    customer: 'Encom Trading LLC', 
    matchType: 'Customer Part Cross-Match',
    filterKey: 'part',
    category: 'Email Quote',
    receivedDate: 'May 02, 2026 11:30 AM', 
    source: 'orders@infratech.ae', 
    amount: 'AED 520.80',
    status: 'Ready for Review', 
    confidence: '97.2%' 
  },
];

export const DocumentProcessing = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredPOs = inboundPOs.filter(item => {
    if (activeTab === 'all') return true;
    return item.filterKey === activeTab;
  });

  const columns: Column<InboundPO>[] = [
    { 
      header: 'Customer PO', 
      accessor: (row) => (
        <div className="flex flex-col">
          <Link 
            to={`/document-processing/${row.id}`} 
            className="font-mono font-bold text-indigo-600 hover:text-indigo-800 hover:underline text-xs"
          >
            {row.poNumber}
          </Link>
          <span className="text-[11px] text-slate-500 font-mono">{row.filename}</span>
        </div>
      ) 
    },
    { 
      header: 'Customer & Source', 
      accessor: (row) => (
        <div>
          <p className="font-bold text-slate-900 text-xs">{row.customer}</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            {row.category === 'Price List' && <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
            {row.category === 'Quotation' && <MessageSquare className="w-3.5 h-3.5 text-indigo-600 shrink-0" />}
            {row.filterKey === 'text' && <Layers className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
            {row.filterKey === 'part' && <ArrowRightLeft className="w-3.5 h-3.5 text-purple-600 shrink-0" />}
            <span className="text-[11px] text-slate-600">{row.matchType}</span>
          </div>
        </div>
      ) 
    },
    { 
      header: 'Amount', 
      accessor: (row) => <span className="font-mono font-bold text-slate-900 text-xs">{row.amount}</span> 
    },
    { 
      header: 'Received Via', 
      accessor: (row) => (
        <div className="flex flex-col">
          <span className="text-xs text-slate-700 font-mono">{row.source}</span>
          <span className="text-[11px] text-slate-400">{row.receivedDate}</span>
        </div>
      ) 
    },
    { 
      header: 'Status', 
      accessor: (row) => (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-semibold border border-emerald-200 bg-emerald-50 text-emerald-700">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {row.status}
        </span>
      ) 
    },
    { 
      header: 'Match Score', 
      accessor: (row) => (
        <span className="px-2 py-0.5 rounded font-mono text-xs font-semibold bg-slate-100 text-slate-700">
          {row.confidence}
        </span>
      ) 
    },
    { 
      header: 'Action', 
      accessor: (row) => (
        <div className="flex items-center gap-2 justify-end">
          <Link 
            to={`/document-processing/${row.id}`} 
            className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition-all shadow-2xs"
            title="Review Order"
          >
            <span>Review Order</span> <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      ),
      className: 'text-right'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Inbound Purchase Orders
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Incoming customer purchase orders matched against contract price lists, quotations, and part dictionaries.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 border-b border-slate-200/80 pb-2 overflow-x-auto">
        {[
          { key: 'all', label: 'All Orders (4)' },
          { key: 'contract', label: 'Contract Match' },
          { key: 'quote', label: 'Quote Match' },
          { key: 'text', label: 'Text Match' },
          { key: 'part', label: 'Part Mapping' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
              activeTab === tab.key
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table Card */}
      <Card className="shadow-2xs border-slate-200/80">
        <CardContent className="p-0 overflow-hidden flex flex-col">
          <DataTable data={filteredPOs} columns={columns} keyExtractor={(row) => row.id} />
        </CardContent>
      </Card>
    </div>
  );
};
