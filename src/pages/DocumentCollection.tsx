import { useState } from 'react';
import { Mail, FolderSync, Clock, RefreshCw, FileText, AlertCircle, HardDrive, DownloadCloud, Activity, ShieldCheck, Server } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { DataTable, type Column } from '../components/ui/DataTable';

const mockWaitingDocs = [
  { id: '1', filename: 'PO 4517145590 - Infratech.pdf', source: 'invoices@infratech.ae', receivedAt: '2 mins ago', size: '1.4 MB', status: 'Pending OCR Extraction', scenario: 'Scenario 1: EATON FZE' },
  { id: '2', filename: 'PO-1 - Verger Delporte.pdf', source: 'orders@infratech.ae', receivedAt: '12 mins ago', size: '2.1 MB', status: 'Pending OCR Extraction', scenario: 'Scenario 2: Verger Delporte' },
  { id: '3', filename: 'PO.pdf (Can Serv Oil)', source: 'bhavani@infratech.ae', receivedAt: '45 mins ago', size: '820 KB', status: 'Pending NLP Parsing', scenario: 'Scenario 3: Can Serv Oil' },
  { id: '4', filename: 'PO.pdf (Encom Trading)', source: 'orders@infratech.ae', receivedAt: '1 hour ago', size: '1.8 MB', status: 'Pending Cross-Match', scenario: 'Scenario 4: Encom Trading' },
];

const mockFailedDocs = [
  { id: '1', filename: 'Damaged_Scan_Page3.tif', source: 'Shared Folder (\\\\INFRATECH-RAK\\Scans)', error: 'Low DPI / Resolution below 200 DPI threshold', timestamp: '2 hours ago' },
  { id: '2', filename: 'Vendor_Statement_Unrecognized.zip', source: 'invoices@infratech.ae', error: 'Unsupported Archive Format (Expected PDF/PNG)', timestamp: '4 hours ago' },
];

export const DocumentCollection = () => {
  const [isScanning, setIsScanning] = useState(false);

  const triggerScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 1500);
  };

  const waitingColumns: Column<any>[] = [
    { 
      header: 'Inbound Document', 
      accessor: (row) => (
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-indigo-600 shrink-0" />
          <div>
            <p className="font-bold text-slate-900 text-xs font-mono">{row.filename}</p>
            <p className="text-[10px] text-slate-500">{row.scenario}</p>
          </div>
        </div>
      ) 
    },
    { header: 'Ingestion Channel', accessor: 'source', className: 'text-slate-600 text-xs font-mono' },
    { header: 'File Size', accessor: 'size', className: 'text-xs text-slate-500 font-mono' },
    { header: 'Timestamp', accessor: 'receivedAt', className: 'text-xs font-medium text-slate-500' },
    { 
      header: 'Pipeline Status', 
      accessor: (row) => (
        <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold rounded-md flex items-center gap-1 w-max">
          <Clock className="w-3 h-3 text-amber-600" /> {row.status}
        </span>
      ) 
    },
  ];

  const failedColumns: Column<any>[] = [
    { 
      header: 'Filename', 
      accessor: (row) => (
        <span className="font-bold font-mono text-rose-600 text-xs">{row.filename}</span>
      ) 
    },
    { header: 'Source', accessor: 'source', className: 'text-slate-600 text-xs' },
    { header: 'Ingestion Error', accessor: 'error', className: 'font-semibold text-slate-700 text-xs' },
    { header: 'Logged', accessor: 'timestamp', className: 'text-xs text-slate-400' },
    { 
      header: 'Action', 
      accessor: () => (
        <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded">
          Retry OCR
        </button>
      ) 
    },
  ];

  return (
    <div className="space-y-6 h-full flex flex-col animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <DownloadCloud className="w-8 h-8 text-indigo-600" /> Automated Document Ingestion
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Monitors inbound corporate mailboxes and shared network scanner hotfolders for customer purchase orders.
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={triggerScan}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all hover:-translate-y-0.5"
          >
            <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} /> 
            {isScanning ? 'Syncing Inboxes...' : 'Poll Mailboxes Now'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Email Inbox Monitor */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2 text-base font-bold text-slate-900">
                <Mail className="w-4 h-4 text-indigo-600" /> Active Corporate Mailboxes
              </CardTitle>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Microsoft 365 OAuth
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 border border-slate-100 rounded-lg bg-slate-50">
                <div>
                  <p className="font-bold text-slate-900 font-mono text-xs">orders@infratech.ae</p>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5"><Clock className="w-3 h-3" /> Polling interval: 2 minutes</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-indigo-600">3 POs Received</p>
                  <p className="text-[10px] text-slate-400">Last poll: 45s ago</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 border border-slate-100 rounded-lg bg-slate-50">
                <div>
                  <p className="font-bold text-slate-900 font-mono text-xs">invoices@infratech.ae</p>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5"><Clock className="w-3 h-3" /> Polling interval: 5 minutes</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-indigo-600">1 PO Received</p>
                  <p className="text-[10px] text-slate-400">Last poll: 2 mins ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shared Folder Monitor */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2 text-base font-bold text-slate-900">
                <FolderSync className="w-4 h-4 text-amber-600" /> Network Hotfolders & SFTP
              </CardTitle>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded flex items-center gap-1">
                <Activity className="w-3.5 h-3.5" /> File Watcher Active
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 border border-slate-100 rounded-lg bg-slate-50">
                <div>
                  <p className="font-bold text-slate-900 font-mono text-xs">\\\\INFRATECH-RAK\\ScannedPOs</p>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5"><HardDrive className="w-3 h-3" /> RAK Plant High-Speed Scanner</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-emerald-600">Watching</p>
                  <p className="text-[10px] text-slate-400">Real-time daemon</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 border border-slate-100 rounded-lg bg-slate-50">
                <div>
                  <p className="font-bold text-slate-900 font-mono text-xs">sftp://edi.infratech.ae/customer_pos</p>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5"><Server className="w-3 h-3" /> B2B EDI Secure Gateway</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-indigo-600">Connected</p>
                  <p className="text-[10px] text-slate-400">Last sync: 10 mins ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 flex-1 min-h-[400px]">
        <Card className="xl:col-span-2 flex flex-col overflow-hidden shadow-md">
          <CardHeader className="py-3.5 border-b border-slate-100 bg-slate-50/50 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" /> Documents Queued for OCR & Matching
            </CardTitle>
            <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full border border-indigo-200 font-mono">
              4 Documents in Queue
            </span>
          </CardHeader>
          <CardContent className="p-0 overflow-auto flex-1">
            <DataTable data={mockWaitingDocs} columns={waitingColumns} keyExtractor={(row) => row.id} />
          </CardContent>
        </Card>

        <Card className="flex flex-col overflow-hidden shadow-md border-rose-100">
          <CardHeader className="py-3.5 border-b border-rose-50 bg-rose-50/30 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-bold flex items-center gap-2 text-rose-800">
              <AlertCircle className="w-4 h-4 text-rose-600" /> Ingestion Exceptions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-auto flex-1">
            <DataTable data={mockFailedDocs} columns={failedColumns} keyExtractor={(row) => row.id} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
