import { Download, Shield, MonitorPlay } from 'lucide-react';
import { DataTable, type Column } from '../components/ui/DataTable';
import { Card, CardContent } from '../components/ui/Card';

interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  module: string;
  action: string;
  status: 'Success' | 'Failure' | 'Warning';
  correlationId: string;
  duration: string;
  details: string;
}

const mockAuditData: AuditLogEntry[] = [
  { id: '1', timestamp: '2026-05-12 10:46:12', user: 'Bhavani Prasad', role: 'Commercial Manager', module: 'Approval & Sage 300', action: 'Post Sales Order', status: 'Success', correlationId: 'req_eaton_99', duration: '0.8s', details: 'Approved & Created SO-S00006715 for EATON FZE (PO 4517145590, Value: AED 67,916.10)' },
  { id: '2', timestamp: '2026-07-10 09:16:45', user: 'Bhavani Prasad', role: 'Commercial Manager', module: 'Approval & Sage 300', action: 'Post Sales Order', status: 'Success', correlationId: 'req_vd_0164', duration: '0.9s', details: 'Approved & Created SO-S00007526 for Verger Delporte UAE (PO-VD-44192, 10% Surcharge Applied)' },
  { id: '3', timestamp: '2026-05-04 03:56:30', user: 'Sarah Jenkins', role: 'Order Specialist', module: 'NLP Matching', action: 'Map Freeform Text', status: 'Success', correlationId: 'req_cso_9912', duration: '0.5s', details: 'NLP mapped 2000H x 1423W x 331D panel description to internal SKU INF-DB-2000-1423-A' },
  { id: '4', timestamp: '2026-05-02 11:31:18', user: 'Sarah Jenkins', role: 'Order Specialist', module: 'Cross-Referencing', action: 'Map Customer Part', status: 'Success', correlationId: 'req_encom_7296', duration: '0.4s', details: 'Mapped customer part code ER-ENC-200 to Infratech SKU INF-ENC-2R16M' },
  { id: '5', timestamp: '2026-07-15 08:30:00', user: 'System Service', role: 'Daemon', module: 'Document Ingestion', action: 'Poll Mailbox', status: 'Success', correlationId: 'job_sync_orders', duration: '1.2s', details: 'Fetched 3 new PDF attachments from orders@infratech.ae' },
];

export const AuditLogs = () => {
  const columns: Column<AuditLogEntry>[] = [
    { 
      header: 'Timestamp', 
      accessor: (row) => (
        <span className="text-xs font-medium text-slate-500 whitespace-nowrap font-mono">{row.timestamp}</span>
      ) 
    },
    { 
      header: 'Operator', 
      accessor: (row) => (
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 text-xs font-bold shrink-0">
            {row.user === 'System Service' ? <MonitorPlay className="w-3.5 h-3.5" /> : row.user.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 text-xs">{row.user}</span>
            <span className="text-[10px] uppercase font-semibold text-slate-400">{row.role}</span>
          </div>
        </div>
      ) 
    },
    { 
      header: 'Module', 
      accessor: (row) => (
        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[11px] font-bold rounded-md whitespace-nowrap">{row.module}</span>
      ) 
    },
    { header: 'Action', accessor: 'action', className: 'font-semibold text-slate-800 text-xs whitespace-nowrap' },
    { 
      header: 'Status', 
      accessor: (row) => (
        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
          {row.status}
        </span>
      )
    },
    { 
      header: 'Trace ID', 
      accessor: (row) => (
        <div className="flex flex-col gap-0.5">
          <span className="font-mono text-[10px] text-slate-600 bg-slate-100 px-1.5 py-0.2 rounded w-max">{row.correlationId}</span>
          <span className="text-[10px] text-slate-400 font-mono">{row.duration}</span>
        </div>
      ) 
    },
    { header: 'Action Audit Details', accessor: 'details', className: 'text-xs text-slate-600 max-w-sm truncate' },
  ];

  return (
    <div className="space-y-6 h-full flex flex-col animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <Shield className="w-8 h-8 text-indigo-600" /> Commercial Audit Trail & System Logs
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Immutable trace of manager approvals, OCR validations, and Sage 300 ERP postings for Infratech FZ LLC.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 shadow-sm transition-all">
            <Download className="w-4 h-4 text-slate-400" /> Export Audit CSV
          </button>
        </div>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden shadow-md">
        <CardContent className="p-0 overflow-hidden flex flex-col">
          <DataTable data={mockAuditData} columns={columns} keyExtractor={(row) => row.id} />
        </CardContent>
      </Card>
    </div>
  );
};
