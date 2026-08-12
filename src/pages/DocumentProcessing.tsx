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
  scenarioType: string;
  scenarioNum: number;
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
    customer: 'M/s. EATON FZE', 
    scenarioType: 'Scenario 1: Price List Match (Tier 2)',
    scenarioNum: 1,
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
    customer: 'M/s. Verger Delporte UAE Ltd', 
    scenarioType: 'Scenario 2: Quotation Match (Matching Part Refs)',
    scenarioNum: 2,
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
    customer: 'M/s. CAN SERV OIL & GAS', 
    scenarioType: 'Scenario 3: Quotation (Without Part Refs)',
    scenarioNum: 3,
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
    customer: 'M/s. ENCOM TRADING LLC', 
    scenarioType: 'Scenario 4: Customer Part Cross-Match',
    scenarioNum: 4,
    category: 'Email Quote',
    receivedDate: 'May 02, 2026 11:30 AM', 
    source: 'orders@infratech.ae', 
    amount: 'AED 520.80',
    status: 'Ready for Review', 
    confidence: '97.2%' 
  },
];

export const DocumentProcessing = () => {
  const [activeTab, setActiveTab] = useState<'All' | 'Scenario 1' | 'Scenario 2' | 'Scenario 3' | 'Scenario 4'>('All');

  const filteredPOs = inboundPOs.filter(item => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Scenario 1') return item.scenarioNum === 1;
    if (activeTab === 'Scenario 2') return item.scenarioNum === 2;
    if (activeTab === 'Scenario 3') return item.scenarioNum === 3;
    if (activeTab === 'Scenario 4') return item.scenarioNum === 4;
    return true;
  });

  const columns: Column<InboundPO>[] = [
    { 
      header: 'Customer PO Number', 
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
      header: 'Customer & Match Method', 
      accessor: (row) => (
        <div>
          <p className="font-bold text-slate-900 text-xs">{row.customer}</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            {row.category === 'Price List' && <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
            {row.category === 'Quotation' && <MessageSquare className="w-3.5 h-3.5 text-indigo-600 shrink-0" />}
            {row.scenarioNum === 3 && <Layers className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
            {row.scenarioNum === 4 && <ArrowRightLeft className="w-3.5 h-3.5 text-amber-600 shrink-0" />}
            <span className="text-[10px] font-semibold text-slate-600">{row.scenarioType}</span>
          </div>
        </div>
      ) 
    },
    { 
      header: 'Order Value', 
      accessor: (row) => <span className="font-mono font-bold text-slate-900 text-xs">{row.amount}</span> 
    },
    { 
      header: 'Received Via', 
      accessor: (row) => (
        <div className="flex flex-col">
          <span className="text-xs text-slate-700 font-mono">{row.source}</span>
          <span className="text-[10px] text-slate-400">{row.receivedDate}</span>
        </div>
      ) 
    },
    { 
      header: 'Status', 
      accessor: (row) => (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold border border-emerald-200 bg-emerald-50 text-emerald-700 shadow-xs">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {row.status}
        </span>
      ) 
    },
    { 
      header: 'OCR Confidence', 
      accessor: (row) => (
        <span className="px-2 py-0.5 rounded font-mono text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200">
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
            className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-all shadow-xs"
            title="Open Document Verification"
          >
            <span>Review & Verify</span> <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      ),
      className: 'text-right'
    }
  ];

  return (
    <div className="space-y-5 animate-in fade-in duration-300 pb-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Inbound Document Ingestion Queue
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            OCR extraction pipeline supporting all 4 client scenarios (Price List, Quote with Part Refs, Quote without Part Refs, and Customer Part Cross-Matching).
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {(['All', 'Scenario 1', 'Scenario 2', 'Scenario 3', 'Scenario 4'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-all ${
              activeTab === tab
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            {tab === 'All' ? 'All Inbound Orders (4)' : tab}
          </button>
        ))}
      </div>

      {/* Table Card */}
      <Card className="shadow-sm border-slate-200">
        <CardContent className="p-0 overflow-hidden flex flex-col">
          <DataTable data={filteredPOs} columns={columns} keyExtractor={(row) => row.id} />
        </CardContent>
      </Card>
    </div>
  );
};
