import { useState } from 'react';
import { 
  Plus, Download, Search, CheckCircle2, Cloud, FileText, Printer, Check, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { DataTable, type Column } from '../components/ui/DataTable';
import { Card, CardContent } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';

interface SalesOrder {
  id: string;
  invoiceNo: string;
  customer: string;
  customerPoRef: string;
  soDate: string;
  deliveryDate: string;
  paymentTerms: string;
  amount: string;
  status: string;
  erpStatus: string;
  source: string;
  surcharge?: string;
  items: {
    sn: number;
    hsCode: string;
    coo: string;
    itemCode: string;
    description: string;
    qty: number;
    unitPrice: number;
    total: number;
  }[];
}

const mockOrders: SalesOrder[] = [
  { 
    id: 'SO-S00006715', 
    invoiceNo: 'IN00007477',
    customer: 'M/s. EATON FZE', 
    customerPoRef: '4517145590',
    soDate: '12/05/2026', 
    deliveryDate: '30/06/2026', 
    paymentTerms: '90 DAYS CREDIT',
    amount: 'AED 64,682.00', 
    status: 'Approved', 
    erpStatus: 'Synced (Sage 300)', 
    source: 'Scenario 1: Price List Match',
    items: [
      { sn: 12, hsCode: '853810009999', coo: 'UAE', itemCode: 'XPSN22506B', description: 'xPowerS PB 250A Bot 6W TPN-NZM1/PDE1 OG', qty: 15, unitPrice: 856.00, total: 12840.00 },
      { sn: 13, hsCode: '853810009999', coo: 'UAE', itemCode: 'XPSN22510B', description: 'xPowerS PB 250A Bot 10W TPN-NZM1/PDE1 OG', qty: 28, unitPrice: 1064.00, total: 29792.00 },
      { sn: 14, hsCode: '853810009999', coo: 'UAE', itemCode: 'XPSN22512B', description: 'xPowerS PB 250A Bot 12W TPN-NZM1/PDE1 OG', qty: 18, unitPrice: 1225.00, total: 22050.00 },
    ]
  },
  { 
    id: 'SO-S00007526', 
    invoiceNo: 'IN00007526',
    customer: 'M/s. Verger Delporte UAE Ltd', 
    customerPoRef: 'PO-VD-44192',
    soDate: '10/07/2026', 
    deliveryDate: '10/08/2026', 
    paymentTerms: '90 Days PDC',
    amount: 'AED 28,831.00', 
    status: 'Approved', 
    erpStatus: 'Synced (Sage 300)', 
    source: 'Scenario 2: Quotation Match (ENQ-26-E-0164)',
    surcharge: '10% Surcharge (AED 2,621.00)',
    items: [
      { sn: 1, hsCode: '853810009999', coo: 'UAE', itemCode: 'IFC86/200+MP', description: '800H x 600W x 200D Single Door Compact Enclosure with Mounting Plate', qty: 27, unitPrice: 315.00, total: 8505.00 },
      { sn: 2, hsCode: '853810009999', coo: 'UAE', itemCode: 'IFC128/300+MP+SD', description: '1200H x 800W x 300D Single Door Compact Enclosure with Mounting Plate', qty: 17, unitPrice: 600.00, total: 10200.00 },
      { sn: 3, hsCode: '853810009999', coo: 'UAE', itemCode: 'IFC66/150+MP', description: '600H x 600W x 150D Single Door Compact Enclosure with Mounting Plate', qty: 2, unitPrice: 225.00, total: 450.00 },
      { sn: 4, hsCode: '853810009999', coo: 'UAE', itemCode: 'IFC148/300+MP+SD', description: '1400H x 800W x 300D Single Door Compact Enclosure with Mounting Plate', qty: 7, unitPrice: 685.00, total: 4795.00 },
      { sn: 5, hsCode: '853810009999', coo: 'UAE', itemCode: 'IFC126/200+MP', description: '1200H x 600W x 200D Single Door Compact Enclosure with Mounting Plate', qty: 1, unitPrice: 460.00, total: 460.00 },
      { sn: 6, hsCode: '853810009999', coo: 'UAE', itemCode: 'IFC106/200+MP', description: '1000H x 600W x 200D Single Door Compact Enclosure with Mounting Plate', qty: 1, unitPrice: 390.00, total: 390.00 },
      { sn: 7, hsCode: '853810009999', coo: 'UAE', itemCode: 'IFC88/300+MP', description: '800H x 800W x 300D Single Door Compact Enclosure with Mounting Plate', qty: 1, unitPrice: 430.00, total: 430.00 },
      { sn: 8, hsCode: '853810009999', coo: 'UAE', itemCode: 'IFL168/300+MP+SD', description: '1600H x 800W x 300D Single Door Large Enclosure with Mounting Plate', qty: 1, unitPrice: 980.00, total: 980.00 },
    ]
  },
  { 
    id: 'SO-S00007469', 
    invoiceNo: 'IN00007469',
    customer: 'M/s. CAN SERV OIL & GAS', 
    customerPoRef: 'PO-CSO-9912',
    soDate: '29/06/2026', 
    deliveryDate: '25/07/2026', 
    paymentTerms: '30 DAYS CREDIT',
    amount: 'AED 107,152.00', 
    status: 'Approved', 
    erpStatus: 'Synced (Sage 300)', 
    source: 'Scenario 3: Quotation (Without Part Ref)',
    surcharge: 'UAE VAT 5% (AED 5,102.00)',
    items: [
      { sn: 1, hsCode: '853810009999', coo: 'UAE', itemCode: 'INF-DB-2000-1423-A', description: '2000H x 1423W x 331D Distribution Panel Enclosure, Ral 9003 Matt (Pocket, Brackets & Din Rail)', qty: 6, unitPrice: 7850.00, total: 47100.00 },
      { sn: 2, hsCode: '853810009999', coo: 'UAE', itemCode: 'INF-DB-2000-1423-B', description: '2000H x 1423W x 331D Distribution Panel Enclosure, Ral 9003 Matt (Pocket, Brackets & Din Rail)', qty: 7, unitPrice: 7850.00, total: 54950.00 },
    ]
  },
  { 
    id: 'SO-S00007296', 
    invoiceNo: 'IN00007296',
    customer: 'M/s. ENCOM TRADING LLC', 
    customerPoRef: 'PO-EN-7296',
    soDate: '07/05/2026', 
    deliveryDate: '31/05/2026', 
    paymentTerms: '90 Days PDC',
    amount: 'AED 520.80', 
    status: 'Approved', 
    erpStatus: 'Synced (Sage 300)', 
    source: 'Scenario 4: Customer Part Cross-Match',
    surcharge: 'UAE VAT 5% (AED 24.80)',
    items: [
      { sn: 1, hsCode: '853810009999', coo: 'UAE', itemCode: 'INF-ENC-2R16M', description: '2 Row 16 Module DB Enclosure Surface (Cust Ref: EG30119)', qty: 4, unitPrice: 124.00, total: 496.00 },
    ]
  },
];

export const SalesOrders = () => {
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<SalesOrder | null>(null);

  const columns: Column<SalesOrder>[] = [
    { 
      header: 'SO / Invoice No', 
      accessor: (row) => (
        <div className="flex flex-col">
          <button 
            onClick={() => setSelectedInvoiceOrder(row)}
            className="font-bold text-indigo-600 hover:text-indigo-800 hover:underline text-left text-sm font-mono flex items-center gap-1.5"
          >
            <span>{row.id}</span>
            <span className="text-[10px] bg-indigo-50 text-indigo-700 px-1.5 py-0.2 rounded font-bold border border-indigo-200">{row.invoiceNo}</span>
          </button>
          <span className="text-xs text-slate-400 font-medium">Customer Ref: {row.customerPoRef}</span>
        </div>
      ) 
    },
    { 
      header: 'Customer', 
      accessor: (row) => (
        <div>
          <p className="font-bold text-slate-900 text-sm">{row.customer}</p>
          <span className="text-[11px] text-emerald-700 font-semibold">{row.source}</span>
        </div>
      )
    },
    { header: 'SO Date', accessor: 'soDate', className: 'text-xs font-mono text-slate-600' },
    { header: 'Payment Terms', accessor: 'paymentTerms', className: 'text-xs font-semibold text-slate-700' },
    { header: 'Total Amount', accessor: 'amount', className: 'font-mono font-bold text-slate-900 text-sm' },
    { 
      header: 'Status', 
      accessor: (row) => (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border border-emerald-200 bg-emerald-50 text-emerald-700 shadow-xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> {row.status}
        </span>
      )
    },
    { 
      header: 'ERP Status', 
      accessor: (row) => (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border border-indigo-200 bg-indigo-50 text-indigo-700 shadow-xs">
          <Cloud className="w-3.5 h-3.5 text-indigo-500" /> {row.erpStatus}
        </span>
      )
    },
    { 
      header: 'Actions', 
      accessor: (row) => (
        <div className="flex items-center gap-2 justify-end">
          <button 
            onClick={() => setSelectedInvoiceOrder(row)}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 rounded-lg text-xs font-bold transition-colors border border-slate-200"
            title="View Official Infratech Tax Invoice"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-600" />
            <span>Tax Invoice</span>
          </button>
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
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Sales Orders & Tax Invoices</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Posted and synced to Infratech Sage 300 ERP across all 4 customer order scenarios.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 shadow-sm transition-all">
            <Download className="w-4 h-4 text-slate-400" /> Export All
          </button>
          <Link 
            to="/document-processing"
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" /> Ingest New PO
          </Link>
        </div>
      </div>

      {/* Main Table */}
      <Card className="flex-1 flex flex-col overflow-hidden shadow-md">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col xl:flex-row gap-4 justify-between">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by SO, Invoice, or Customer..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:border-indigo-500 outline-none transition-all shadow-xs"
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-500">ERP Sync Status:</span>
            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-md flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> 100% Synced to Sage 300
            </span>
          </div>
        </div>

        <CardContent className="p-0 overflow-hidden flex flex-col">
          <DataTable data={mockOrders} columns={columns} keyExtractor={(row) => row.id} />
        </CardContent>
      </Card>

      {/* Authentic Infratech Tax Invoice Modal */}
      {selectedInvoiceOrder && (
        <Modal 
          isOpen={!!selectedInvoiceOrder} 
          onClose={() => setSelectedInvoiceOrder(null)} 
          title={`Infratech Official Tax Invoice - ${selectedInvoiceOrder.invoiceNo}`}
        >
          <div className="space-y-6 text-slate-900 max-h-[80vh] overflow-y-auto custom-scrollbar p-1">
            <div className="bg-white border border-slate-300 rounded-lg p-6 shadow-sm text-xs">
              {/* Invoice Header */}
              <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-indigo-900 text-white font-black flex items-center justify-center text-base rounded">
                      iAT
                    </div>
                    <div>
                      <h2 className="text-xl font-black tracking-tight text-slate-900">INFRATECH FZ LLC</h2>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                        Manufacturing of Sheet Metal Enclosures & Switchgear
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <h3 className="text-lg font-black text-slate-900">TAX INVOICE</h3>
                  <p className="font-mono font-bold text-indigo-700">Invoice No: {selectedInvoiceOrder.invoiceNo}</p>
                  <p className="text-slate-500">Date: {selectedInvoiceOrder.soDate}</p>
                </div>
              </div>

              {/* Customer & Order Metadata Grid */}
              <div className="grid grid-cols-2 gap-4 border border-slate-200 p-3 rounded bg-slate-50 mb-4">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Customer:</p>
                  <p className="font-black text-slate-900 text-sm">{selectedInvoiceOrder.customer}</p>
                  <p className="text-slate-600 mt-1">Your Ref / PO: <strong className="text-slate-900 font-mono">{selectedInvoiceOrder.customerPoRef}</strong></p>
                </div>
                <div className="text-right">
                  <p className="text-slate-600">Company Code: <strong className="text-slate-900 font-mono">11975</strong></p>
                  <p className="text-slate-600">Our SO No: <strong className="text-indigo-700 font-mono font-bold">{selectedInvoiceOrder.id}</strong></p>
                  <p className="text-slate-600">Payment Terms: <strong className="text-slate-900">{selectedInvoiceOrder.paymentTerms}</strong></p>
                  <p className="text-slate-600">Infratech TRN: <strong className="text-slate-900 font-mono">100383847900003</strong></p>
                </div>
              </div>

              {/* Line Items Table */}
              <table className="w-full text-left text-xs border-collapse mb-4">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-100 font-bold uppercase text-[10px] text-slate-800">
                    <th className="py-2 px-2 w-8">S.No</th>
                    <th className="py-2 px-2 w-24">H.S. Code</th>
                    <th className="py-2 px-2 w-12">COO</th>
                    <th className="py-2 px-2 w-28">Item Code</th>
                    <th className="py-2 px-2">Description</th>
                    <th className="py-2 px-2 text-right w-12">Qty</th>
                    <th className="py-2 px-2 text-right w-20">Unit Price</th>
                    <th className="py-2 px-2 text-right w-24">Total (AED)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {selectedInvoiceOrder.items.map((item) => (
                    <tr key={item.sn}>
                      <td className="py-2 px-2 font-mono text-slate-500">{item.sn}</td>
                      <td className="py-2 px-2 font-mono text-slate-600">{item.hsCode}</td>
                      <td className="py-2 px-2 text-slate-600">{item.coo}</td>
                      <td className="py-2 px-2 font-mono font-bold text-slate-900">{item.itemCode}</td>
                      <td className="py-2 px-2 text-slate-700">{item.description}</td>
                      <td className="py-2 px-2 text-right font-bold text-slate-900">{item.qty}</td>
                      <td className="py-2 px-2 text-right font-mono">{item.unitPrice.toFixed(2)}</td>
                      <td className="py-2 px-2 text-right font-mono font-bold text-slate-900">{item.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Bottom Totals and Stamp */}
              <div className="border-t-2 border-slate-900 pt-3 flex justify-between items-end">
                <div className="text-[10px] text-slate-500">
                  <p>Al Jazeera Al - Hamra, Ras Al Khaimah, U.A.E.</p>
                  <p>INF/SA/03_Rev_00 • Generated by AI Sales Order Engine</p>
                  {selectedInvoiceOrder.surcharge && (
                    <p className="text-indigo-700 font-semibold mt-0.5">{selectedInvoiceOrder.surcharge}</p>
                  )}
                </div>
                <div className="w-56 space-y-1 text-right">
                  <div className="flex justify-between border-t border-slate-300 pt-1 text-sm font-black text-slate-900">
                    <span>Total Amount:</span>
                    <span className="font-mono text-indigo-700">{selectedInvoiceOrder.amount}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal action bar */}
            <div className="flex justify-between items-center pt-2">
              <Link 
                to="/erp-integration" 
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <span>View Sage 300 Sync Status</span> <ArrowRight className="w-3 h-3" />
              </Link>
              <div className="flex gap-2">
                <button 
                  onClick={() => setSelectedInvoiceOrder(null)} 
                  className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-200"
                >
                  Close
                </button>
                <button 
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 flex items-center gap-1.5 shadow-sm"
                >
                  <Printer className="w-3.5 h-3.5" /> Print / Export PDF
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
