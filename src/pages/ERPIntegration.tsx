import { useState } from 'react';
import { ArrowRightLeft, CheckCircle2, RefreshCw, FileJson, Activity, Save, ArrowRight } from 'lucide-react';
import { DataTable, type Column } from '../components/ui/DataTable';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';

interface ApiLog {
  id: string;
  timestamp: string;
  endpoint: string;
  executionTime: string;
  status: 'Success' | 'Failure' | 'Retrying';
  payload: string;
}

const mockLogs: ApiLog[] = [
  { id: '1', timestamp: '2026-05-12 10:46:12', endpoint: 'POST /api/v2/sage300/oe/sales-orders (Eaton FZE)', executionTime: '0.8s', status: 'Success', payload: '{\n  "orderNumber": "SO-S00006715",\n  "customerPoNumber": "4517145590",\n  "customerNumber": "100296552100003",\n  "invoiceNumber": "IN00007477",\n  "currency": "AED",\n  "subtotal": 64682.00,\n  "vatAmount": 3234.10,\n  "totalAmount": 67916.10,\n  "paymentTerms": "90 DAYS CREDIT",\n  "status": "POSTED_SAGE_300"\n}' },
  { id: '2', timestamp: '2026-07-10 09:16:45', endpoint: 'POST /api/v2/sage300/oe/sales-orders (Verger Delporte)', executionTime: '0.9s', status: 'Success', payload: '{\n  "orderNumber": "SO-S00007526",\n  "customerPoNumber": "PO-VD-44192",\n  "quotationOffer": "ENQ-26-E-0164",\n  "invoiceNumber": "IN00007526",\n  "currency": "AED",\n  "netAmount": 26210.00,\n  "surcharge": 2621.00,\n  "totalAmount": 28831.00,\n  "paymentTerms": "90 Days PDC",\n  "status": "POSTED_SAGE_300"\n}' },
  { id: '3', timestamp: '2026-05-04 03:56:30', endpoint: 'POST /api/v2/sage300/oe/sales-orders (Can Serv Oil)', executionTime: '1.1s', status: 'Success', payload: '{\n  "orderNumber": "SO-S00007469",\n  "customerPoNumber": "PO-CSO-9912",\n  "invoiceNumber": "IN00007469",\n  "itemCode": "INF-DB-2000-1423-A",\n  "quantity": 4,\n  "unitPrice": 24350.00,\n  "surcharge": 9752.00,\n  "totalAmount": 107152.00,\n  "status": "POSTED_SAGE_300"\n}' },
  { id: '4', timestamp: '2026-05-02 11:31:18', endpoint: 'POST /api/v2/sage300/oe/sales-orders (Encom Trading)', executionTime: '0.7s', status: 'Success', payload: '{\n  "orderNumber": "SO-S00007296",\n  "customerPoNumber": "PO-EN-7296",\n  "invoiceNumber": "IN00007296",\n  "itemCode": "INF-ENC-2R16M",\n  "customerPartRef": "ER-ENC-200",\n  "quantity": 35,\n  "unitPrice": 460.00,\n  "surcharge": 2500.00,\n  "totalAmount": 18600.00,\n  "status": "POSTED_SAGE_300"\n}' },
];

const fieldMappings = [
  { id: '1', type: 'Header', infratech: 'Customer PO Number', sage: 'CUSTOMER_PO_NUMBER', required: true },
  { id: '2', type: 'Header', infratech: 'Infratech Customer Code', sage: 'CUSTOMER_NUMBER', required: true },
  { id: '3', type: 'Header', infratech: 'Buyer TRN Tax Number', sage: 'TAX_REGISTRATION_NO', required: true },
  { id: '4', type: 'Header', infratech: 'PO Extracted Date', sage: 'ORDER_DATE', required: true },
  { id: '5', type: 'Header', infratech: 'Agreed Delivery Terms', sage: 'EXPECTED_SHIP_DATE', required: false },
  { id: '6', type: 'Header', infratech: 'Delivery Destination', sage: 'SHIP_TO_ADDRESS_1', required: false },
  { id: '7', type: 'Header', infratech: 'Currency (AED)', sage: 'CURRENCY_CODE', required: true },
  { id: '8', type: 'Header', infratech: 'Credit & Payment Terms', sage: 'TERM_CODE', required: true },
  { id: '9', type: 'Line Item', infratech: 'Infratech Item SKU', sage: 'ITEM_NUMBER', required: true },
  { id: '10', type: 'Line Item', infratech: 'Customer Part Reference', sage: 'CUSTOMER_ITEM_CODE', required: false },
  { id: '11', type: 'Line Item', infratech: 'Ordered Quantity', sage: 'ORDERED_QTY', required: true },
  { id: '12', type: 'Line Item', infratech: 'Unit Price (AED)', sage: 'UNIT_PRICE', required: true },
];

export const ERPIntegration = () => {
  const [activeTab, setActiveTab] = useState<'monitor' | 'mapping'>('monitor');
  const [selectedLog, setSelectedLog] = useState<ApiLog | null>(mockLogs[0]);

  const columns: Column<ApiLog>[] = [
    { header: 'Timestamp', accessor: 'timestamp', className: 'text-xs font-medium text-slate-500 font-mono' },
    { 
      header: 'Sage 300 ERP Endpoint', 
      accessor: (row) => (
        <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">{row.endpoint}</span>
      ) 
    },
    { header: 'Latency', accessor: 'executionTime', className: 'text-xs font-semibold text-slate-700 font-mono' },
    { 
      header: 'Sync Status', 
      accessor: (row) => (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold border text-emerald-700 bg-emerald-50 border-emerald-200 shadow-xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> {row.status}
        </span>
      ) 
    },
    { 
      header: 'Payload', 
      accessor: (row) => (
        <div className="flex items-center gap-1 justify-end">
          <button 
            onClick={() => setSelectedLog(row)}
            className={`p-1.5 rounded-md transition-colors ${selectedLog?.id === row.id ? 'bg-indigo-100 text-indigo-700' : 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50'}`}
            title="Inspect JSON Payload"
          >
            <FileJson className="w-4 h-4" />
          </button>
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
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Sage 300 ERP Live Gateway
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-normal">
            Real-time bi-directional connector syncing validated customer POs into Infratech Sage 300 ERP (Company 11975).
          </p>
        </div>
        <div className="flex gap-2">
          {activeTab === 'monitor' ? (
            <button className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 shadow-2xs transition-all">
              <RefreshCw className="w-3.5 h-3.5 text-slate-400" /> Ping Gateway
            </button>
          ) : (
            <button className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 shadow-2xs transition-all">
              <Save className="w-3.5 h-3.5" /> Save Schema
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1.5 border-b border-slate-200/80 pb-2">
        <button 
          onClick={() => setActiveTab('monitor')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'monitor' ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Activity className="w-3.5 h-3.5" /> Sage 300 API Transactions
        </button>
        <button 
          onClick={() => setActiveTab('mapping')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'mapping' ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <ArrowRightLeft className="w-3.5 h-3.5" /> Field Schema Mappings
        </button>
      </div>

      {activeTab === 'monitor' && (
        <div className="space-y-6">
          {/* Refined System Status Row */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3.5">
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Target ERP</span>
              <div className="mt-2 flex items-baseline justify-between">
                <p className="text-sm font-bold text-slate-900">Sage 300 (11975)</p>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Gateway Status</span>
              <div className="mt-2 flex items-baseline justify-between">
                <p className="text-sm font-bold text-emerald-700">100% Online</p>
                <span className="text-[11px] font-medium text-slate-400">REST v2</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Middleware Bridge</span>
              <div className="mt-2 flex items-baseline justify-between">
                <p className="text-sm font-bold text-slate-800">Infratech Core</p>
                <span className="text-[11px] font-mono text-slate-400">v2.4</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Security Auth</span>
              <div className="mt-2 flex items-baseline justify-between">
                <p className="text-sm font-bold text-slate-800">OAuth 2.0</p>
                <span className="text-[11px] font-semibold text-emerald-600">Active</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mean Latency</span>
              <div className="mt-2 flex items-baseline justify-between">
                <p className="text-sm font-bold text-slate-900 font-mono">0.85s</p>
                <span className="text-[11px] font-medium text-emerald-600">Optimal</span>
              </div>
            </div>
          </div>

          {/* Logs & JSON Viewer Split */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 flex-1 min-h-[400px]">
            {/* Logs Table */}
            <Card className="xl:col-span-2 flex flex-col overflow-hidden shadow-md">
              <CardHeader className="py-3.5 border-b border-slate-100 bg-slate-50/50">
                <CardTitle className="text-sm font-bold flex items-center gap-2"><Activity className="w-4 h-4 text-indigo-600" /> Sage 300 Order Creation Transactions</CardTitle>
              </CardHeader>
              <CardContent className="p-0 overflow-auto custom-scrollbar flex-1">
                <DataTable data={mockLogs} columns={columns} keyExtractor={(row) => row.id} />
              </CardContent>
            </Card>

            {/* JSON Viewer */}
            <Card className="flex flex-col overflow-hidden border-slate-800 bg-slate-900 shadow-xl">
              <CardHeader className="py-3 px-4 border-b border-slate-800 bg-slate-950 flex flex-row items-center justify-between">
                <CardTitle className="text-xs font-mono text-slate-300 flex items-center gap-2">
                  <FileJson className="w-4 h-4 text-indigo-400" /> Sage 300 ERP Payload
                </CardTitle>
                {selectedLog && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 font-mono">
                    HTTP 201 Created
                  </span>
                )}
              </CardHeader>
              <CardContent className="p-0 flex-1 relative">
                {selectedLog && (
                  <pre className="p-4 text-xs font-mono text-indigo-200 overflow-auto h-full absolute inset-0 custom-scrollbar">
                    <code>{selectedLog.payload}</code>
                  </pre>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'mapping' && (
        <Card className="flex-1 shadow-sm border-slate-200">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50 py-4 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-sm font-bold text-slate-900">Infratech PO to Sage 300 OE Field Schema</CardTitle>
              <p className="text-xs text-slate-500 mt-0.5">Map extracted PO fields to target Sage 300 Order Entry parameters.</p>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="py-2.5 px-4">Type</th>
                    <th className="py-2.5 px-4">Infratech Extracted Field</th>
                    <th className="py-2.5 px-4 w-10 text-center"></th>
                    <th className="py-2.5 px-4">Sage 300 ERP Target Field</th>
                    <th className="py-2.5 px-4">Required</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {fieldMappings.map((mapping) => (
                    <tr key={mapping.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${mapping.type === 'Header' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'}`}>
                          {mapping.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-800">
                        {mapping.infratech}
                      </td>
                      <td className="py-3 px-4 text-center text-slate-300">
                        <ArrowRight className="w-3.5 h-3.5 mx-auto" />
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-indigo-700">
                        {mapping.sage}
                      </td>
                      <td className="py-3 px-4">
                        {mapping.required ? (
                          <span className="text-[11px] font-bold text-rose-600">Yes</span>
                        ) : (
                          <span className="text-[11px] text-slate-400">Optional</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
