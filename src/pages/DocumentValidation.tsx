import { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, ArrowLeft, FileSpreadsheet, Check,
  FileText, MessageSquare, UserCheck, Layers, ArrowRightLeft,
  ExternalLink, Download
} from 'lucide-react';

interface LineItem {
  id: string;
  itemCode: string;
  customerItemCode?: string;
  description: string;
  qty: number;
  extractedPrice: number;
  referencePrice: number;
  total: number;
  matchStatus: 'matched' | 'price_mismatch' | 'mapped_from_text' | 'cross_referenced';
}

interface ScenarioData {
  id: string;
  scenarioNumber: 1 | 2 | 3 | 4;
  title: string;
  badge: string;
  scenarioDescription: string;
  customer: string;
  customerAddress: string;
  customerTRN: string;
  poNumber: string;
  poDate: string;
  quoteRef?: string;
  deliveryTerms: string;
  paymentTerms: string;
  rawPoUrl: string;
  rawPoFilename: string;
  rawQuoteUrl?: string;
  rawQuoteFilename?: string;
  referenceDocument: {
    type: 'Price List' | 'Quotation' | 'Email Quote';
    name: string;
    description: string;
    referenceCode: string;
  };
  items: LineItem[];
  hasSurcharge?: boolean;
  surchargePercent?: number;
  surchargeAmount?: number;
  vatRate: number;
  targetSalesOrder: string;
  targetInvoice: string;
}

const scenarios: Record<string, ScenarioData> = {
  'PO-4517145590': {
    id: 'PO-4517145590',
    scenarioNumber: 1,
    title: 'Scenario 1: Customer PO without Quotation (Price List Based)',
    badge: 'Price List Match',
    scenarioDescription: 'Customer order matched directly against approved Tier 2 Contract Price List schedule.',
    customer: 'EATON FZE',
    customerAddress: 'Plot No: S30805, Jebel Ali Free Zone, Dubai, UAE',
    customerTRN: '100296552100003',
    poNumber: '4517145590',
    poDate: '12 May 2026',
    deliveryTerms: 'DP World Unit 11, JAFZA Logistics Park, Dubai',
    paymentTerms: '90 Days Credit',
    rawPoUrl: '/samples/scenario1_po.pdf',
    rawPoFilename: 'PO 4517145590 - Infratech.pdf',
    referenceDocument: {
      type: 'Price List',
      name: 'Tier 2 xPower Price List - Rev 1.5.xlsx',
      description: 'Master Contract Pricing for Eaton FZE',
      referenceCode: 'CONTRACT-EATON-T2'
    },
    items: [
      { id: '1', itemCode: 'XPSN22506B', description: 'xPowerS PB 250A Bot 6W TPN-NZM1/PDE1 OG', qty: 15, extractedPrice: 856.00, referencePrice: 856.00, total: 12840.00, matchStatus: 'matched' },
      { id: '2', itemCode: 'XPSN22510B', description: 'xPowerS PB 250A Bot 10W TPN-NZM1/PDE1 OG', qty: 28, extractedPrice: 1064.00, referencePrice: 1064.00, total: 29792.00, matchStatus: 'matched' },
      { id: '3', itemCode: 'XPSN22512B', description: 'xPowerS PB 250A Bot 12W TPN-NZM1/PDE1 OG', qty: 18, extractedPrice: 1225.00, referencePrice: 1225.00, total: 22050.00, matchStatus: 'matched' },
    ],
    vatRate: 0.05,
    targetSalesOrder: 'SO-S00006715',
    targetInvoice: 'IN00007477'
  },
  'PO-VD-44192': {
    id: 'PO-VD-44192',
    scenarioNumber: 2,
    title: 'Scenario 2: Customer PO based on Quotation (Matching Part References)',
    badge: 'Quotation Match',
    scenarioDescription: 'Customer order matched against approved Quotation ENQ-26-E-0164 with exact panel part codes.',
    customer: 'Verger Delporte UAE Ltd',
    customerAddress: 'P.O Box 5629, Industrial Road 1, Industrial Area 5, Sharjah, UAE',
    customerTRN: '100412893100003',
    poNumber: 'PO-VD-44192',
    poDate: '10 July 2026',
    quoteRef: 'ENQ-26-E-0164',
    deliveryTerms: 'Ex-works, Sharjah Factory (5% Customs & Clearance)',
    paymentTerms: '90 Days PDC from delivery',
    rawPoUrl: '/samples/scenario2_po.pdf',
    rawPoFilename: 'PO-1 - Verger Delporte.pdf',
    rawQuoteUrl: '/samples/scenario2_quote.pdf',
    rawQuoteFilename: 'Quotation Offer ENQ-26-E-0164.pdf',
    referenceDocument: {
      type: 'Quotation',
      name: 'Quotation Offer No: ENQ-26-E-0164',
      description: 'Formal Quote for Verger Delporte UAE (Attn: Prasanth V.K)',
      referenceCode: 'ENQ-26-E-0164'
    },
    items: [
      { id: '1', itemCode: 'IFC86/200+MP', description: '800H x 600W x 200D Single Door Compact Enclosure with Mounting Plate + Gland Plate', qty: 27, extractedPrice: 315.00, referencePrice: 315.00, total: 8505.00, matchStatus: 'matched' },
      { id: '2', itemCode: 'IFC128/300+MP+SD', description: '1200H x 800W x 300D Single Door Compact Enclosure with Mounting Plate + Gland Plate', qty: 17, extractedPrice: 600.00, referencePrice: 600.00, total: 10200.00, matchStatus: 'matched' },
      { id: '3', itemCode: 'IFC66/150+MP', description: '600H x 600W x 150D Single Door Compact Enclosure with Mounting Plate + Gland Plate', qty: 2, extractedPrice: 225.00, referencePrice: 225.00, total: 450.00, matchStatus: 'matched' },
      { id: '4', itemCode: 'IFC148/300+MP+SD', description: '1400H x 800W x 300D Single Door Compact Enclosure with Mounting Plate + Gland Plate', qty: 7, extractedPrice: 685.00, referencePrice: 685.00, total: 4795.00, matchStatus: 'matched' },
      { id: '5', itemCode: 'IFC126/200+MP', description: '1200H x 600W x 200D Single Door Compact Enclosure with Mounting Plate + Gland Plate', qty: 1, extractedPrice: 460.00, referencePrice: 460.00, total: 460.00, matchStatus: 'matched' },
      { id: '6', itemCode: 'IFC106/200+MP', description: '1000H x 600W x 200D Single Door Compact Enclosure with Mounting Plate + Gland Plate', qty: 1, extractedPrice: 390.00, referencePrice: 390.00, total: 390.00, matchStatus: 'matched' },
      { id: '7', itemCode: 'IFC88/300+MP', description: '800H x 800W x 300D Single Door Compact Enclosure with Mounting Plate + Gland Plate', qty: 1, extractedPrice: 430.00, referencePrice: 430.00, total: 430.00, matchStatus: 'matched' },
      { id: '8', itemCode: 'IFL168/300+MP+SD', description: '1600H x 800W x 300D Single Door Large Enclosure with Mounting Plate + Gland Plate', qty: 1, extractedPrice: 980.00, referencePrice: 980.00, total: 980.00, matchStatus: 'matched' },
    ],
    hasSurcharge: true,
    surchargePercent: 10,
    surchargeAmount: 2621.00,
    vatRate: 0.00,
    targetSalesOrder: 'SO-S00007526',
    targetInvoice: 'IN00007526'
  },
  'PO-CSO-9912': {
    id: 'PO-CSO-9912',
    scenarioNumber: 3,
    title: 'Scenario 3: Customer PO based on Quotation (Without Part References)',
    badge: 'NLP Description Match',
    scenarioDescription: 'Customer order specified dimensional text without SKU. AI NLP matched text to internal ERP part code.',
    customer: 'Can Serv Oil & Gas',
    customerAddress: 'Musaffah Industrial Area, Abu Dhabi, UAE',
    customerTRN: '100998124500003',
    poNumber: 'PO-CSO-9912',
    poDate: '04 May 2026',
    quoteRef: 'QT-EMAIL-PO00670',
    deliveryTerms: 'Abu Dhabi Free Zone Site Delivery',
    paymentTerms: '30 Days Credit',
    rawPoUrl: '/samples/scenario3_po.pdf',
    rawPoFilename: 'PO.pdf (Can Serv Oil)',
    rawQuoteUrl: '/samples/scenario3_quote.png',
    rawQuoteFilename: 'Quotation Email Confirmation.png',
    referenceDocument: {
      type: 'Email Quote',
      name: 'Approved Email Quotation - PO00670',
      description: 'Dimensional specification quote (2000H x 1423W x 331D Double Door)',
      referenceCode: 'QT-EMAIL-PO00670'
    },
    items: [
      { id: '1', itemCode: 'INF-DB-2000-1423-A', description: '2000H x 1423W x 331D Distribution Panel Enclosure IP55 with Mounting Plate & Double Door', qty: 4, extractedPrice: 24350.00, referencePrice: 24350.00, total: 97400.00, matchStatus: 'mapped_from_text' },
    ],
    hasSurcharge: true,
    surchargePercent: 10,
    surchargeAmount: 9752.00,
    vatRate: 0.00,
    targetSalesOrder: 'SO-S00007469',
    targetInvoice: 'IN00007469'
  },
  'PO-EN-7296': {
    id: 'PO-EN-7296',
    scenarioNumber: 4,
    title: 'Scenario 4: Quotation without Part Number & Customer PO with Customer Part Number',
    badge: 'Customer Part Cross-Match',
    scenarioDescription: 'Customer order used customer part number ER-ENC-200. Cross-matched to internal SKU INF-ENC-2R16M.',
    customer: 'Encom Trading LLC',
    customerAddress: 'P.O Box 17421, Electro RAK Group, Ras Al Khaimah, UAE',
    customerTRN: '100881923100003',
    poNumber: 'PO-EN-7296',
    poDate: '02 May 2026',
    quoteRef: 'QT-EMAIL-ENCOM',
    deliveryTerms: 'Ras Al Khaimah Central Warehouse',
    paymentTerms: '30 Days PDC',
    rawPoUrl: '/samples/scenario4_po.pdf',
    rawPoFilename: 'PO.pdf (Encom Trading)',
    rawQuoteUrl: '/samples/scenario4_quote.png',
    rawQuoteFilename: 'Quotation Email Encom Group.png',
    referenceDocument: {
      type: 'Email Quote',
      name: 'Email Quote - Encom Group',
      description: 'Cross-referenced customer SKU ER-ENC-200 to Infratech item INF-ENC-2R16M',
      referenceCode: 'QT-EMAIL-ENCOM'
    },
    items: [
      { id: '1', itemCode: 'INF-ENC-2R16M', customerItemCode: 'ER-ENC-200', description: '1200H x 600W x 200D Single Door Compact Enclosure IP65 with Gland Plate', qty: 35, extractedPrice: 460.00, referencePrice: 460.00, total: 16100.00, matchStatus: 'cross_referenced' },
    ],
    hasSurcharge: true,
    surchargePercent: 15.5,
    surchargeAmount: 2500.00,
    vatRate: 0.00,
    targetSalesOrder: 'SO-S00007296',
    targetInvoice: 'IN00007296'
  }
};

export const DocumentValidation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Resolve scenario key
  const currentScenarioKey = (id && scenarios[id]) ? id : 'PO-4517145590';
  const activeScenario = scenarios[currentScenarioKey] || scenarios['PO-4517145590'];

  // View state: toggle between 'po' (Customer PO) and 'quote' (Reference Quote)
  const [activeDocView, setActiveDocView] = useState<'po' | 'quote'>('po');
  const [approvalNote, setApprovalNote] = useState('Commercial review verified. Quantities, prices, and terms match approved master data.');

  // Subtotal & Totals
  const subtotal = useMemo(() => {
    return activeScenario.items.reduce((sum, item) => sum + item.total, 0);
  }, [activeScenario]);

  const surchargeAmount = useMemo(() => {
    return activeScenario.hasSurcharge ? (activeScenario.surchargeAmount || subtotal * 0.10) : 0;
  }, [activeScenario, subtotal]);

  const vatAmount = useMemo(() => {
    return (subtotal + surchargeAmount) * activeScenario.vatRate;
  }, [activeScenario, subtotal, surchargeAmount]);

  const grandTotal = useMemo(() => {
    return subtotal + surchargeAmount + vatAmount;
  }, [subtotal, surchargeAmount, vatAmount]);

  const handleApproveAndPost = () => {
    navigate('/sales-orders');
  };

  const currentDocUrl = activeDocView === 'po' ? activeScenario.rawPoUrl : (activeScenario.rawQuoteUrl || activeScenario.rawPoUrl);
  const currentDocFilename = activeDocView === 'po' ? activeScenario.rawPoFilename : (activeScenario.rawQuoteFilename || activeScenario.rawPoFilename);
  const isImageFile = currentDocUrl.endsWith('.png') || currentDocUrl.endsWith('.jpg');

  return (
    <div className="h-full flex flex-col animate-in fade-in duration-300 absolute inset-0 bg-slate-100 text-slate-900 overflow-hidden font-sans">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-slate-200 shrink-0 z-20 shadow-xs px-6 py-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link 
              to="/document-processing" 
              className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-indigo-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Inbound Queue</span>
            </Link>

            <div className="h-4 w-px bg-slate-300"></div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                Scenario {activeScenario.scenarioNumber}: {activeScenario.badge}
              </span>
              <span className="text-xs font-bold text-slate-800">
                {activeScenario.customer}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                (PO: {activeScenario.poNumber})
              </span>
            </div>
          </div>

          {/* Scenario Selector */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
            {Object.values(scenarios).map((sc) => (
              <button
                key={sc.id}
                onClick={() => {
                  setActiveDocView('po');
                  navigate(`/document-processing/${sc.id}`);
                }}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                  currentScenarioKey === sc.id
                    ? 'bg-white text-indigo-700 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                Scenario {sc.scenarioNumber}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <a 
              href={currentDocUrl} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-all shadow-xs"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" /> Open Raw File
            </a>
            <button 
              onClick={handleApproveAndPost}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer hover:shadow-md"
            >
              <CheckCircle2 className="w-4 h-4" /> Approve & Post to Sage 300
            </button>
          </div>
        </div>
      </header>

      {/* Main Split Screen Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Real Raw Document Viewer */}
        <div className="w-1/2 flex flex-col bg-slate-900 border-r border-slate-300 relative overflow-hidden">
          {/* Document Switcher Toolbar */}
          <div className="h-11 bg-slate-950 border-b border-slate-800 px-4 flex items-center justify-between z-10 shrink-0">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveDocView('po')}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-md transition-all ${
                  activeDocView === 'po'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Raw Customer PO ({activeScenario.poNumber})</span>
              </button>

              {activeScenario.rawQuoteUrl && (
                <button
                  onClick={() => setActiveDocView('quote')}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-md transition-all ${
                    activeDocView === 'quote'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Raw Quotation Offer</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <span className="text-[11px] font-mono truncate max-w-[200px] text-slate-300">
                {currentDocFilename}
              </span>
              <a 
                href={currentDocUrl} 
                download
                className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                title="Download Raw File"
              >
                <Download className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Genuine Raw Document Embed */}
          <div className="flex-1 bg-slate-950 flex items-center justify-center relative overflow-hidden">
            {isImageFile ? (
              <div className="w-full h-full overflow-auto flex items-center justify-center p-4 custom-scrollbar">
                <img 
                  src={currentDocUrl} 
                  alt={currentDocFilename}
                  className="max-w-full max-h-full object-contain rounded shadow-2xl border border-slate-700 bg-white"
                />
              </div>
            ) : (
              <iframe 
                src={`${currentDocUrl}#toolbar=1&navpanes=0&scrollbar=1`}
                className="w-full h-full border-0 bg-slate-900"
                title={currentDocFilename}
              />
            )}
          </div>
        </div>

        {/* Right Side: Human Commercial Review & Sage 300 Matching Console */}
        <div className="w-1/2 flex flex-col bg-white overflow-y-auto custom-scrollbar p-6 space-y-5">
          {/* Header Review Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800">
                  Ready for Manager Approval
                </span>
                <span className="text-xs text-slate-500 font-medium">All OCR line items verified</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 mt-1">
                Order Verification & Cross-Match Console
              </h3>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-slate-500">Target ERP Order:</span>
              <p className="font-mono font-bold text-indigo-600 text-sm">{activeScenario.targetSalesOrder}</p>
            </div>
          </div>

          {/* Customer Metadata Card */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Extracted Customer & Terms
              </span>
              <span className="text-xs font-mono font-semibold text-slate-600">
                TRN: {activeScenario.customerTRN}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Customer / Buyer:</p>
                <p className="font-bold text-slate-900 text-xs mt-0.5">{activeScenario.customer}</p>
                <p className="text-slate-500 text-[11px] mt-0.5 leading-snug">{activeScenario.customerAddress}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Commercial Terms:</p>
                <p className="text-slate-800 text-[11px] font-medium mt-0.5">Terms: <strong>{activeScenario.paymentTerms}</strong></p>
                <p className="text-slate-500 text-[11px] mt-0.5 leading-snug">{activeScenario.deliveryTerms}</p>
              </div>
            </div>
          </div>

          {/* Reference Source Match Card */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Matched Master Reference
              </span>
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <Check className="w-3.5 h-3.5" /> Rate Agreement Active
              </span>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                {activeScenario.referenceDocument.type === 'Price List' && <FileSpreadsheet className="w-4 h-4" />}
                {activeScenario.referenceDocument.type === 'Quotation' && <MessageSquare className="w-4 h-4" />}
                {activeScenario.referenceDocument.type === 'Email Quote' && <FileText className="w-4 h-4" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-900">{activeScenario.referenceDocument.name}</p>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{activeScenario.referenceDocument.description}</p>
                <span className="inline-block text-[10px] font-mono font-semibold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded mt-1.5 border border-indigo-100">
                  Ref Code: {activeScenario.referenceDocument.referenceCode}
                </span>
              </div>
            </div>
          </div>

          {/* Line Item Verification Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Line Items Verification ({activeScenario.items.length} Lines)</span>
              <span className="text-[11px] text-slate-500">Extracted vs Master Rate</span>
            </div>

            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50 text-slate-500 text-[10px] font-bold uppercase">
                  <th className="py-2 px-3">Item Code & Description</th>
                  <th className="py-2 px-3 text-right">PO Price</th>
                  <th className="py-2 px-3 text-right">Master Rate</th>
                  <th className="py-2 px-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {activeScenario.items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3">
                      <p className="font-mono font-bold text-slate-900 text-xs">
                        {item.itemCode}
                      </p>
                      {item.customerItemCode && (
                        <p className="text-[10px] text-amber-700 font-mono">Customer Ref: {item.customerItemCode}</p>
                      )}
                      <p className="text-[11px] text-slate-500 truncate max-w-[200px] mt-0.5">{item.description}</p>
                      <span className="text-[10px] text-slate-400 font-semibold">Qty: {item.qty} units</span>
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-semibold text-slate-700">
                      AED {item.extractedPrice.toFixed(2)}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                      AED {item.referencePrice.toFixed(2)}
                    </td>
                    <td className="py-3 px-3 text-center">
                      {item.matchStatus === 'matched' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <Check className="w-3 h-3" /> Exact
                        </span>
                      )}
                      {item.matchStatus === 'mapped_from_text' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                          <Layers className="w-3 h-3" /> NLP Mapped
                        </span>
                      )}
                      {item.matchStatus === 'cross_referenced' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          <ArrowRightLeft className="w-3 h-3" /> Cross-Matched
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Financial Summary */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/70 text-xs">
            <div className="space-y-1 text-right">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-mono font-bold text-slate-800">AED {subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              {activeScenario.hasSurcharge && (
                <div className="flex justify-between text-slate-600">
                  <span>Surcharge ({activeScenario.surchargePercent}%):</span>
                  <span className="font-mono font-bold text-slate-800">AED {surchargeAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
              )}
              {activeScenario.vatRate > 0 && (
                <div className="flex justify-between text-slate-600">
                  <span>VAT (5%):</span>
                  <span className="font-mono font-bold text-slate-800">AED {vatAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-slate-300 pt-2 text-sm font-black text-slate-900">
                <span>Total Amount:</span>
                <span className="font-mono text-indigo-700">AED {grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          {/* Commercial Manager Sign-off Box */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-indigo-600" /> Commercial Manager Sign-off Notes
              </label>
              <span className="text-[10px] font-bold text-slate-500">Sign-off Approver: Bhavani Prasad</span>
            </div>
            <textarea
              value={approvalNote}
              onChange={(e) => setApprovalNote(e.target.value)}
              rows={2}
              className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:border-indigo-500 outline-none transition-all resize-none shadow-xs"
            />
          </div>

          {/* Sticky Approval Action Bar */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-200 mt-auto">
            <div>
              <span className="text-xs text-slate-500 font-medium">Approved Sage 300 Amount:</span>
              <p className="text-base font-black font-mono text-slate-900">
                AED {grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link 
                to="/document-processing"
                className="px-3.5 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </Link>
              <button 
                onClick={handleApproveAndPost}
                className="flex items-center gap-1.5 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all hover:shadow-md cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" /> Single-Level Approval & Post to Sage 300
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
