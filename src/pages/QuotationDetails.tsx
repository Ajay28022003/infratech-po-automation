import { useState, useMemo } from 'react';
import { 
  ArrowLeft, Edit, Share2, CheckCircle2, XCircle, Printer, 
  Mail, Copy, Link as LinkIcon, Download, ExternalLink, 
  Layers, FileText, ShieldCheck
} from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { getQuotationById } from '../data/quotationsData';

export const QuotationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const quote = useMemo(() => getQuotationById(id), [id]);
  const [status, setStatus] = useState<string>(quote.status || 'Approved');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isConvertModalOpen, setIsConvertModalOpen] = useState(false);

  const handleApprove = () => {
    setStatus('Approved');
  };

  const handleReject = () => {
    setStatus('Rejected');
  };

  const handleShare = () => {
    setIsShareModalOpen(false);
  };

  const handleConvertToSO = () => {
    setIsConvertModalOpen(false);
    navigate('/sales-orders');
  };

  return (
    <div className="space-y-6 h-full flex flex-col animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to="/quotations" className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-mono">{quote.id}</h1>
              <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${
                status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                status === 'Rejected' ? 'bg-rose-50 text-rose-600 border-rose-200' :
                'bg-indigo-50 text-indigo-600 border-indigo-200'
              }`}>
                {status}
              </span>
              {quote.poRef && (
                <Link
                  to={`/document-processing/${quote.poRef}`}
                  className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-lg border border-indigo-200 transition-colors"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Validation Console</span>
                </Link>
              )}
            </div>
            <p className="text-sm text-slate-500 mt-1 font-medium">
              Customer: <span className="text-slate-800 font-bold">{quote.customer}</span> • {quote.scenarioRef}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {status === 'Approved' && (
            <button 
              onClick={() => setIsConvertModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-all shadow-md shadow-emerald-200"
            >
              <CheckCircle2 className="w-4 h-4" /> Convert to Sales Order
            </button>
          )}
          {status !== 'Approved' && status !== 'Rejected' && (
            <>
              <button 
                onClick={handleApprove}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 border border-emerald-200 text-sm font-semibold rounded-lg hover:bg-emerald-200 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" /> Approve
              </button>
              <button 
                onClick={handleReject}
                className="flex items-center gap-2 px-4 py-2 bg-rose-100 text-rose-700 border border-rose-200 text-sm font-semibold rounded-lg hover:bg-rose-200 transition-all"
              >
                <XCircle className="w-4 h-4" /> Reject
              </button>
            </>
          )}
          <button 
            onClick={() => setIsShareModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200"
          >
            <Share2 className="w-4 h-4" /> Share with Customer
          </button>
          <button 
            onClick={() => window.print()}
            className="p-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-all"
            title="Print Quotation"
          >
            <Printer className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Column: Authentic Document View (5 cols) */}
        <div className="xl:col-span-5 flex flex-col space-y-4">
          <Card className="flex flex-col overflow-hidden shadow-md h-full min-h-[480px]">
            <CardHeader className="border-b border-slate-100 bg-slate-900 text-white p-3 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-xs truncate">
                <FileText className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="truncate">{quote.docFilename || quote.id}</span>
              </div>
              {quote.docUrl && (
                <div className="flex items-center gap-2">
                  <a 
                    href={quote.docUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-1 text-slate-400 hover:text-white rounded"
                    title="Open document"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a 
                    href={quote.docUrl} 
                    download
                    className="p-1 text-slate-400 hover:text-white rounded"
                    title="Download file"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </CardHeader>
            <CardContent className="p-0 bg-slate-900 flex-1 flex items-center justify-center min-h-[450px]">
              {quote.docType === 'pdf' && quote.docUrl && (
                <iframe 
                  src={`${quote.docUrl}#toolbar=0&navpanes=0&scrollbar=1`}
                  title={quote.id}
                  className="w-full h-full min-h-[450px] border-none bg-slate-900"
                />
              )}
              {quote.docType === 'image' && quote.docUrl && (
                <div className="w-full h-full overflow-auto flex items-center justify-center p-4 bg-slate-950">
                  <img 
                    src={quote.docUrl} 
                    alt={quote.id}
                    className="max-w-full max-h-[450px] object-contain rounded shadow-lg border border-slate-700 bg-white"
                  />
                </div>
              )}
              {quote.docType === 'schedule' && (
                <div className="w-full h-full bg-slate-950 p-6 flex flex-col justify-center text-slate-200 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">Tier 2 Master Price Schedule</h4>
                      <p className="text-xs text-slate-400 font-mono">{quote.docFilename}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Master contracted schedule pricing for {quote.customer}. Valid through 31 Dec 2026. Zero-rated Free Zone transaction.
                  </p>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Contract Ref:</span>
                      <span className="font-mono text-white font-bold">{quote.id}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Terms:</span>
                      <span className="text-slate-200">{quote.paymentTerms}</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Line Items & Info (7 cols) */}
        <div className="xl:col-span-7 space-y-6">
          <Card>
            <CardHeader className="border-b border-slate-100 bg-slate-50/50">
              <div className="flex justify-between items-center">
                <CardTitle>Line Items ({quote.items.length})</CardTitle>
                <button className="text-xs font-semibold text-indigo-600 flex items-center gap-1 hover:text-indigo-800">
                  <Edit className="w-3.5 h-3.5" /> Edit Items
                </button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/80 text-xs uppercase tracking-wider text-slate-500 font-bold">
                      <th className="p-3">Item Code & Details</th>
                      <th className="p-3 text-center">Qty</th>
                      <th className="p-3 text-right">Unit Price</th>
                      <th className="p-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {quote.items.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-3">
                          <p className="font-bold font-mono text-indigo-700">{item.itemCode}</p>
                          {item.customerItemCode && (
                            <p className="text-[10px] text-amber-700 font-mono">Cust Code: {item.customerItemCode}</p>
                          )}
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{item.description}</p>
                        </td>
                        <td className="p-3 text-center font-semibold text-slate-700">{item.qty}</td>
                        <td className="p-3 text-right font-mono text-slate-600">AED {item.unitPrice.toFixed(2)}</td>
                        <td className="p-3 text-right font-mono font-bold text-slate-900">AED {item.total.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Financial Calculation Block */}
              <div className="p-5 bg-slate-50 border-t border-slate-200 flex justify-end">
                <div className="w-80 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal:</span>
                    <span className="font-mono font-bold text-slate-800">AED {quote.subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  {quote.hasSurcharge && quote.surchargeAmount && (
                    <div className="flex justify-between text-indigo-700 font-medium">
                      <span>Ex-works Factory Surcharge ({quote.surchargePercent}%):</span>
                      <span className="font-mono font-bold">+ AED {quote.surchargeAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  )}
                  {quote.vatRate > 0 ? (
                    <div className="flex justify-between text-slate-600">
                      <span>UAE VAT ({(quote.vatRate * 100).toFixed(0)}%):</span>
                      <span className="font-mono font-bold text-slate-800">AED {quote.vatAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  ) : (
                    <div className="flex justify-between text-slate-500">
                      <span>UAE VAT (Exempt / Free Zone 0%):</span>
                      <span className="font-mono text-slate-600">AED 0.00</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-slate-200 flex justify-between text-base font-black text-slate-900">
                    <span>Total Quoted Value:</span>
                    <span className="font-mono text-indigo-700">AED {quote.grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quotation Metadata Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="border-b border-slate-100 p-4">
                <CardTitle className="text-xs uppercase tracking-wider text-slate-500">Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-2 text-xs">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Customer Legal Entity</p>
                  <p className="font-bold text-slate-800 text-sm">{quote.customer}</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">{quote.customerAddress}</p>
                </div>
                <div className="pt-2 border-t border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">TRN Number</p>
                  <p className="font-mono font-semibold text-slate-700">{quote.customerTRN}</p>
                </div>
                <div className="pt-2 border-t border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Contact Person</p>
                  <p className="font-semibold text-slate-800">{quote.contact}</p>
                  <p className="text-indigo-600">{quote.email}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="border-b border-slate-100 p-4">
                <CardTitle className="text-xs uppercase tracking-wider text-slate-500">Terms & Quotation Details</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-2 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Quote Date</p>
                    <p className="font-semibold text-slate-800">{quote.date}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Validity</p>
                    <p className="font-semibold text-slate-800">{quote.validUntil}</p>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Payment Terms</p>
                  <p className="font-semibold text-indigo-700">{quote.paymentTerms}</p>
                </div>
                <div className="pt-2 border-t border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Delivery Terms</p>
                  <p className="text-slate-700">{quote.deliveryTerms}</p>
                </div>
                <div className="pt-2 border-t border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Sales Specialist</p>
                  <p className="font-semibold text-slate-800">{quote.salesRep}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <Modal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} title="Share Quotation Offer">
        <div className="space-y-4">
          <p className="text-xs text-slate-500">Send this quotation offer to the customer or copy link.</p>
          
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
              <LinkIcon className="w-4 h-4 text-slate-400 shrink-0" />
              <p className="text-xs font-mono text-slate-600 truncate">https://infratech.ae/quotes/{quote.id}</p>
            </div>
            <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors shrink-0 text-slate-500 hover:text-indigo-600">
              <Copy className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">To:</label>
              <input type="email" defaultValue={quote.email} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none focus:border-indigo-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Message:</label>
              <textarea 
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none focus:border-indigo-500 resize-none" 
                rows={3}
                defaultValue={`Dear ${quote.contact},\n\nPlease find attached the official quotation offer ${quote.id} for your review.\n\nBest regards,\n${quote.salesRep}\nINFRATECH FZ LLC`}
              ></textarea>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button onClick={() => setIsShareModalOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg">
              Cancel
            </button>
            <button onClick={handleShare} className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700">
              <Mail className="w-3.5 h-3.5" /> Send Quotation
            </button>
          </div>
        </div>
      </Modal>

      {/* Convert to SO Modal */}
      <Modal isOpen={isConvertModalOpen} onClose={() => setIsConvertModalOpen(false)} title="Convert Quotation to Sales Order">
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
            <div className="bg-emerald-100 p-2 rounded-full text-emerald-600 shrink-0 mt-0.5">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-emerald-900 text-xs">Ready for ERP Posting</h4>
              <p className="text-xs text-emerald-700 mt-1">
                Quotation <strong>{quote.id}</strong> has been approved. Converting will generate the corresponding Sales Order and sync to Sage 300 ERP.
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button onClick={() => setIsConvertModalOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg">
              Cancel
            </button>
            <button onClick={handleConvertToSO} className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700">
              Confirm & Create Sales Order
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
