import { useState } from 'react';
import { Download, BarChart3, Activity, Clock, DollarSign, PackageX, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { DataTable, type Column } from '../components/ui/DataTable';

const clientReportTabs = [
  { id: 'ocr-status', label: 'OCR Processing Status', icon: Activity },
  { id: 'pending-approvals', label: 'Pending Approvals', icon: Clock },
  { id: 'price-differences', label: 'Price Difference Report', icon: DollarSign },
  { id: 'exceptions', label: 'Exceptions & Errors', icon: ShieldAlert },
  { id: 'unmatched-items', label: 'Unmatched Item Report', icon: PackageX },
];

export const Reports = () => {
  const [activeTab, setActiveTab] = useState('ocr-status');

  // 1. OCR Processing Status
  const ocrData = [
    { id: '1', doc: 'PO 4517145590 - Infratech.pdf', customer: 'EATON FZE', status: 'Success (100%)', duration: '0.8s', ocrScore: '99.4%', date: '12/05/2026 10:45 AM' },
    { id: '2', doc: 'PO-1 - Verger Delporte.pdf', customer: 'VERGER DELPORTE UAE', status: 'Success (100%)', duration: '0.6s', ocrScore: '99.1%', date: '10/07/2026 09:15 AM' },
    { id: '3', doc: 'Quotation_Email_PO00670.eml', customer: 'CAN SERV OIL & GAS', status: 'Processed with Note', duration: '1.2s', ocrScore: '94.8%', date: '04/05/2026 03:55 PM' },
    { id: '4', doc: 'PO_Encom_Trading_7296.pdf', customer: 'ENCOM TRADING LLC', status: 'Success (100%)', duration: '0.7s', ocrScore: '97.2%', date: '02/05/2026 11:30 AM' },
  ];

  // 2. Pending Approvals
  const approvalData = [
    { id: '1', po: '4517145590', customer: 'EATON FZE', value: 'AED 64,682.00', matchMethod: 'Tier 2 Price List', approver: 'Bhavani Prasad', priority: 'Standard' },
    { id: '2', po: 'PO-VD-44192', customer: 'VERGER DELPORTE', value: 'AED 28,831.00', matchMethod: 'Quotation ENQ-26-E-0164', approver: 'Bhavani Prasad', priority: 'Standard' },
    { id: '3', po: 'PO-CSO-9912', customer: 'CAN SERV OIL', value: 'AED 107,152.00', matchMethod: 'Email Quote Match', approver: 'Bhavani Prasad', priority: 'High' },
  ];

  // 3. Price Differences
  const priceDiffData = [
    { id: '1', po: 'PO-VD-44192', item: 'IFC86/200+MP', poPrice: 'AED 315.00', quotePrice: 'AED 315.00', variance: 'AED 0.00 (Exact)', status: 'Verified' },
    { id: '2', po: '4517145590', item: 'XPSN22510B', poPrice: 'AED 1,064.00', quotePrice: 'AED 1,064.00', variance: 'AED 0.00 (Exact)', status: 'Verified' },
    { id: '3', po: 'PO-EN-7296', item: 'INF-ENC-2R16M', poPrice: 'AED 460.00', quotePrice: 'AED 460.00', variance: 'AED 0.00 (Exact)', status: 'Verified' },
  ];

  // 4. Exceptions & Errors
  const exceptionData = [
    { id: '1', po: 'PO-CSO-9912', error: 'Unmapped Item Description', detail: 'Email text has no SKU. Cross-mapped to INF-DB-2000-1423-A', severity: 'Info', status: 'Auto-Resolved' },
    { id: '2', po: 'PO-EN-7296', error: 'Payment Terms Cross-Check', detail: '30 Days Credit approved per Master DB', severity: 'Info', status: 'Approved' },
  ];

  // 5. Unmatched Items
  const unmatchedData = [
    { id: '1', po: 'PO-CSO-9912', rawText: '2000H x 1423W x 331D Distribution Panel Enclosure', mappedCode: 'INF-DB-2000-1423-A', confidence: '94.8%', action: 'Rule Saved' },
  ];

  const getColumns = (): Column<any>[] => {
    switch (activeTab) {
      case 'ocr-status':
        return [
          { header: 'File Name', accessor: 'doc', className: 'font-mono text-xs font-bold text-indigo-700' },
          { header: 'Customer', accessor: 'customer', className: 'font-bold text-slate-800 text-xs' },
          { header: 'OCR Confidence', accessor: 'ocrScore', className: 'font-mono font-bold text-emerald-600 text-xs' },
          { header: 'Processing Time', accessor: 'duration', className: 'text-xs text-slate-500' },
          { header: 'Ingestion Time', accessor: 'date', className: 'text-xs text-slate-500' },
          { 
            header: 'Status', 
            accessor: (row) => (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle2 className="w-3 h-3" /> {row.status}
              </span>
            ) 
          }
        ];
      case 'pending-approvals':
        return [
          { header: 'PO Ref', accessor: 'po', className: 'font-mono font-bold text-indigo-600 text-xs' },
          { header: 'Customer', accessor: 'customer', className: 'font-bold text-slate-800 text-xs' },
          { header: 'Order Value', accessor: 'value', className: 'font-mono font-bold text-slate-900 text-xs' },
          { header: 'Match Rule', accessor: 'matchMethod', className: 'text-xs text-slate-600 font-semibold' },
          { header: 'Assigned Approver', accessor: 'approver', className: 'text-xs text-slate-700' },
          { 
            header: 'Priority', 
            accessor: (row) => (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-indigo-50 text-indigo-700 border border-indigo-200">
                {row.priority}
              </span>
            ) 
          }
        ];
      case 'price-differences':
        return [
          { header: 'PO Number', accessor: 'po', className: 'font-mono font-bold text-indigo-600 text-xs' },
          { header: 'Item Code', accessor: 'item', className: 'font-mono text-xs font-bold text-slate-800' },
          { header: 'PO Unit Price', accessor: 'poPrice', className: 'font-mono text-xs text-slate-700' },
          { header: 'Contract/Quote Rate', accessor: 'quotePrice', className: 'font-mono text-xs font-bold text-slate-900' },
          { header: 'Calculated Variance', accessor: 'variance', className: 'font-mono text-xs font-bold text-emerald-600' },
          { 
            header: 'Result', 
            accessor: () => (
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Verified
              </span>
            ) 
          }
        ];
      case 'exceptions':
        return [
          { header: 'PO Number', accessor: 'po', className: 'font-mono font-bold text-indigo-600 text-xs' },
          { header: 'Exception Category', accessor: 'error', className: 'font-bold text-slate-800 text-xs' },
          { header: 'Resolution Details', accessor: 'detail', className: 'text-xs text-slate-600' },
          { 
            header: 'Severity', 
            accessor: (row) => (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-50 text-blue-700 border border-blue-200">
                {row.severity}
              </span>
            ) 
          },
          { 
            header: 'Status', 
            accessor: (row) => (
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                {row.status}
              </span>
            ) 
          }
        ];
      case 'unmatched-items':
        return [
          { header: 'PO Number', accessor: 'po', className: 'font-mono font-bold text-indigo-600 text-xs' },
          { header: 'Extracted Freeform Description', accessor: 'rawText', className: 'text-xs text-slate-700' },
          { header: 'Mapped ERP Item Code', accessor: 'mappedCode', className: 'font-mono font-bold text-indigo-700 text-xs' },
          { header: 'Match Confidence', accessor: 'confidence', className: 'font-mono font-bold text-emerald-600 text-xs' },
          { 
            header: 'System Action', 
            accessor: (row) => (
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                {row.action}
              </span>
            ) 
          }
        ];
      default:
        return [];
    }
  };

  const getTableData = () => {
    switch (activeTab) {
      case 'ocr-status': return ocrData;
      case 'pending-approvals': return approvalData;
      case 'price-differences': return priceDiffData;
      case 'exceptions': return exceptionData;
      case 'unmatched-items': return unmatchedData;
      default: return [];
    }
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-300 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-indigo-600" /> Commercial Reports & Audit Hub
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Operational analytics covering OCR accuracy, pending commercial approvals, price differences, and exceptions.
          </p>
        </div>
        <button className="flex items-center gap-2 px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50 shadow-xs">
          <Download className="w-3.5 h-3.5 text-slate-400" /> Export CSV
        </button>
      </div>

      {/* 5 Client Report Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {clientReportTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Table Card */}
      <Card className="shadow-sm border-slate-200">
        <CardHeader className="py-3 px-4 bg-slate-50/70 border-b border-slate-200 flex flex-row items-center justify-between">
          <CardTitle className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            {clientReportTabs.find(t => t.id === activeTab)?.label}
          </CardTitle>
          <span className="text-[11px] font-mono text-slate-500">Live Infratech Audit Feed</span>
        </CardHeader>
        <CardContent className="p-0 overflow-hidden flex flex-col">
          <DataTable data={getTableData()} columns={getColumns()} keyExtractor={(row) => row.id} />
        </CardContent>
      </Card>
    </div>
  );
};
