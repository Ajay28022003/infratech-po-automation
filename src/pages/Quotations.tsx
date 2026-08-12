import { useState } from 'react';
import { 
  Plus, Download, Search, CheckCircle2, Eye, FileText, 
  ExternalLink, Layers, ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { DataTable, type Column } from '../components/ui/DataTable';
import { Card, CardContent } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { mockQuotations, type QuotationRecord } from '../data/quotationsData';

export const Quotations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuotation, setSelectedQuotation] = useState<QuotationRecord | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filteredData = mockQuotations.filter((row) => {
    const term = searchTerm.toLowerCase();
    return (
      row.id.toLowerCase().includes(term) ||
      row.customer.toLowerCase().includes(term) ||
      row.scenarioRef.toLowerCase().includes(term)
    );
  });

  const columns: Column<QuotationRecord>[] = [
    { 
      header: 'Quote Ref Number', 
      accessor: (row) => (
        <div className="flex flex-col">
          <button 
            onClick={() => setSelectedQuotation(row)}
            className="font-bold font-mono text-indigo-600 hover:text-indigo-800 hover:underline text-xs text-left flex items-center gap-1.5"
          >
            <span>{row.id}</span>
            {row.docType === 'pdf' && (
              <span className="text-[10px] bg-rose-50 text-rose-700 px-1.5 py-0.2 rounded font-bold border border-rose-200">
                PDF
              </span>
            )}
            {row.docType === 'image' && (
              <span className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.2 rounded font-bold border border-blue-200">
                Email
              </span>
            )}
            {row.docType === 'schedule' && (
              <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded font-bold border border-emerald-200">
                Master
              </span>
            )}
          </button>
          <span className="text-[10px] text-slate-400 font-medium">{row.scenarioRef}</span>
        </div>
      ) 
    },
    { 
      header: 'Customer / Buyer', 
      accessor: (row) => (
        <div>
          <p className="font-bold text-slate-900 text-xs">{row.customer}</p>
          <span className="text-[11px] text-slate-500">{row.contact}</span>
        </div>
      ) 
    },
    { header: 'Quote Date', accessor: 'date', className: 'text-xs text-slate-600' },
    { header: 'Validity', accessor: 'validUntil', className: 'text-xs text-slate-500' },
    { 
      header: 'Quoted Total', 
      accessor: (row) => <span className="font-bold font-mono text-slate-900 text-xs">{row.amount}</span> 
    },
    { 
      header: 'Status', 
      accessor: (row) => {
        const isApproved = row.status === 'Approved';
        return (
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold border ${
            isApproved 
              ? 'text-emerald-700 bg-emerald-50 border-emerald-200' 
              : 'text-indigo-700 bg-indigo-50 border-indigo-200'
          } shadow-xs whitespace-nowrap`}>
            <CheckCircle2 className="w-3 h-3" /> {row.status}
          </span>
        );
      } 
    },
    { 
      header: 'Actions', 
      accessor: (row) => (
        <div className="flex items-center gap-1.5 justify-end">
          <button 
            onClick={() => setSelectedQuotation(row)}
            className="flex items-center gap-1 px-2.5 py-1 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg text-xs font-bold transition-colors border border-slate-200" 
            title="View Quotation Document & Line Items"
          >
            <Eye className="w-3.5 h-3.5 text-indigo-600" />
            <span>View Quote</span>
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
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Formal Quotations & Price Schedules</h1>
          <p className="text-xs text-slate-500 mt-1 font-normal">
            Infratech sales offers, price lists, and reference quotation records for customer PO cross-matching.
          </p>
        </div>
        <div className="flex gap-2.5">
          <button className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 shadow-2xs transition-all">
            <Download className="w-3.5 h-3.5 text-slate-400" /> Export CSV
          </button>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 shadow-2xs transition-all"
          >
            <Plus className="w-3.5 h-3.5" /> Create Quotation Offer
          </button>
        </div>
      </div>

      {/* Main Card */}
      <Card className="shadow-2xs border-slate-200/80">
        <div className="p-3.5 border-b border-slate-100 bg-slate-50/50 flex flex-col xl:flex-row gap-4 justify-between">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by quote ref (e.g. ENQ-26-E-0164, Can Serv, Encom)..."
              className="w-full pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:border-indigo-500 outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
            <span>Showing <strong className="text-slate-900 font-semibold">{filteredData.length}</strong> quotations</span>
          </div>
        </div>

        <CardContent className="p-0 overflow-hidden flex flex-col">
          <DataTable data={filteredData} columns={columns} keyExtractor={(row) => row.id} />
        </CardContent>
      </Card>

      {/* High-Fidelity Quotation Viewer Modal */}
      {selectedQuotation && (
        <Modal 
          isOpen={!!selectedQuotation} 
          onClose={() => setSelectedQuotation(null)} 
          title={`Quotation Reference: ${selectedQuotation.id}`}
          maxWidth="max-w-5xl"
        >
          <div className="space-y-4 text-slate-900 max-h-[80vh] overflow-y-auto custom-scrollbar p-1">
            {/* Top Info Banner */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 text-sm">{selectedQuotation.customer}</h3>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[10px] font-bold">
                    {selectedQuotation.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{selectedQuotation.scenarioRef}</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {selectedQuotation.poRef && (
                  <Link 
                    to={`/document-processing/${selectedQuotation.poRef}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-xs transition-all"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Cross-Check PO in Console</span>
                  </Link>
                )}
                <Link
                  to={`/quotations/${selectedQuotation.id}`}
                  className="flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-bold border border-slate-200 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  <span>Full Details Page</span>
                </Link>
              </div>
            </div>

            {/* Split View: Document Preview (Left) & Quotation Breakdown (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              
              {/* Left Column: Authentic Quotation Document Viewer (6 cols) */}
              <div className="lg:col-span-6 bg-slate-900 rounded-xl border border-slate-300 overflow-hidden flex flex-col min-h-[420px]">
                <div className="h-9 bg-slate-950 border-b border-slate-800 px-3 flex items-center justify-between text-slate-300 text-xs shrink-0">
                  <div className="flex items-center gap-2 truncate font-mono text-[11px]">
                    <FileText className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span className="truncate">{selectedQuotation.docFilename || selectedQuotation.id}</span>
                  </div>
                  {selectedQuotation.docUrl && (
                    <div className="flex items-center gap-1.5">
                      <a 
                        href={selectedQuotation.docUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                        title="Open document in new tab"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <a 
                        href={selectedQuotation.docUrl} 
                        download
                        className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                        title="Download file"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>

                <div className="flex-1 bg-slate-900 flex items-center justify-center p-2 overflow-hidden relative">
                  {selectedQuotation.docType === 'pdf' && selectedQuotation.docUrl && (
                    <iframe 
                      src={`${selectedQuotation.docUrl}#toolbar=0&navpanes=0&scrollbar=1`}
                      title={selectedQuotation.id}
                      className="w-full h-full min-h-[400px] border-none bg-slate-900 rounded"
                    />
                  )}

                  {selectedQuotation.docType === 'image' && selectedQuotation.docUrl && (
                    <div className="w-full h-full overflow-auto flex items-center justify-center p-2 custom-scrollbar bg-slate-950 rounded">
                      <img 
                        src={selectedQuotation.docUrl} 
                        alt={selectedQuotation.id}
                        className="max-w-full max-h-[400px] object-contain rounded shadow-lg border border-slate-700 bg-white"
                      />
                    </div>
                  )}

                  {selectedQuotation.docType === 'schedule' && (
                    <div className="w-full h-full bg-slate-950 p-6 flex flex-col justify-center text-slate-200 rounded space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-sm">Master Contract Price Schedule</h4>
                          <p className="text-xs text-slate-400 font-mono">{selectedQuotation.docFilename}</p>
                        </div>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Approved tier pricing schedule for {selectedQuotation.customer}. Valid through 31 Dec 2026. All inbound orders are matched against pre-approved contracted unit rates.
                      </p>
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1 text-xs">
                        <div className="flex justify-between text-slate-400">
                          <span>Contract Reference:</span>
                          <span className="font-mono text-white font-bold">{selectedQuotation.id}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Jurisdiction / Supply:</span>
                          <span className="text-emerald-400 font-medium">Designated Free Zone (0% VAT)</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Quoted Line Items & Commercial Breakdown (6 cols) */}
              <div className="lg:col-span-6 flex flex-col space-y-3">
                {/* Customer & Terms Summary */}
                <div className="bg-white border border-slate-200 rounded-xl p-3.5 text-xs shadow-2xs grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Buyer & Contact</span>
                    <p className="font-bold text-slate-900">{selectedQuotation.contact}</p>
                    <p className="text-[11px] text-indigo-600 truncate">{selectedQuotation.email}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Commercial Terms</span>
                    <p className="text-slate-800"><strong>Pay:</strong> {selectedQuotation.paymentTerms}</p>
                    <p className="text-slate-500 text-[11px] truncate"><strong>Delivery:</strong> {selectedQuotation.deliveryTerms}</p>
                  </div>
                </div>

                {/* Line Items Table */}
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs flex-1 flex flex-col">
                  <div className="p-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                      Quotation Line Items ({selectedQuotation.items.length})
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">Ref: {selectedQuotation.id}</span>
                  </div>

                  <div className="overflow-x-auto max-h-[220px] custom-scrollbar flex-1">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-100/60 text-[10px] text-slate-500 font-bold uppercase">
                          <th className="py-2 px-2.5">Item Code & Details</th>
                          <th className="py-2 px-2 text-center w-8">Qty</th>
                          <th className="py-2 px-2 text-right">Rate</th>
                          <th className="py-2 px-2.5 text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {selectedQuotation.items.map((item) => (
                          <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-2 px-2.5">
                              <p className="font-bold font-mono text-indigo-700 text-xs">{item.itemCode}</p>
                              <p className="text-[10px] text-slate-500 leading-tight truncate max-w-[200px]">{item.description}</p>
                            </td>
                            <td className="py-2 px-2 text-center font-bold text-slate-800">{item.qty}</td>
                            <td className="py-2 px-2 text-right font-mono text-slate-700">AED {item.unitPrice.toFixed(2)}</td>
                            <td className="py-2 px-2.5 text-right font-mono font-bold text-slate-900">AED {item.total.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Financial Calculation Block */}
                  <div className="p-3 bg-slate-50 border-t border-slate-200 space-y-1 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal:</span>
                      <span className="font-mono font-bold text-slate-800">AED {selectedQuotation.subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    {selectedQuotation.hasSurcharge && selectedQuotation.surchargeAmount && (
                      <div className="flex justify-between text-indigo-700 font-medium">
                        <span>Ex-works Factory Surcharge ({selectedQuotation.surchargePercent}%):</span>
                        <span className="font-mono font-bold">+ AED {selectedQuotation.surchargeAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                    )}
                    {selectedQuotation.vatRate > 0 ? (
                      <div className="flex justify-between text-slate-600">
                        <span>UAE VAT ({(selectedQuotation.vatRate * 100).toFixed(0)}%):</span>
                        <span className="font-mono font-bold text-slate-800">AED {selectedQuotation.vatAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                    ) : (
                      <div className="flex justify-between text-slate-500">
                        <span>UAE VAT (Not Applicable / 0%):</span>
                        <span className="font-mono text-slate-600">AED 0.00</span>
                      </div>
                    )}
                    <div className="h-px bg-slate-200 my-1"></div>
                    <div className="flex justify-between text-sm font-bold text-slate-900">
                      <span>Quoted Total Value:</span>
                      <span className="font-mono font-black text-indigo-700">AED {selectedQuotation.grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Create Quotation Modal */}
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Create Quotation Offer">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Customer / Buyer <span className="text-rose-500">*</span></label>
              <input type="text" placeholder="e.g. Verger Delporte UAE" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:border-indigo-500 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Quotation Validity</label>
              <input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:border-indigo-500 outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Quotation Terms & Conditions</label>
            <textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:border-indigo-500 outline-none resize-none" rows={3} placeholder="e.g. Ex-works Sharjah factory, 5% customs extra, 90 Days PDC..."></textarea>
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button onClick={() => setIsCreateModalOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg">
              Cancel
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700">
              Save Quotation
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
