import { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, ArrowLeft,
  FileText, MessageSquare, Layers, ArrowRightLeft,
  ExternalLink, Download, ShieldCheck, Check, Info,
  AlertTriangle, RefreshCw, Send, ChevronDown
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
  matchDetail?: string;
}

interface ScenarioData {
  id: string;
  scenarioNumber: 1 | 2 | 3 | 4;
  title: string;
  shortTitle: string;
  badge: string;
  scenarioDescription: string;
  crossCheckSummary: string;
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
    matchedDate: string;
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
    shortTitle: 'Sc 1: EATON FZE (Price List)',
    badge: 'Price List Match',
    scenarioDescription: 'Customer order matched directly against approved Tier 2 Contract Price List schedule.',
    crossCheckSummary: 'All 3 line items matched 100% against Eaton Tier 2 Contract Master Price List (0.00% Variance). Payment terms (90 Days Credit) and TRN verified.',
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
      description: 'Master Contract Pricing for Eaton FZE (Agreement: INF-EAT-2026-T2)',
      referenceCode: 'CONTRACT-EATON-T2',
      matchedDate: 'Valid through 31 Dec 2026'
    },
    items: [
      { id: '1', itemCode: 'XPSN22506B', description: 'xPowerS PB 250A Bot 6W TPN-NZM1/PDE1 OG', qty: 15, extractedPrice: 856.00, referencePrice: 856.00, total: 12840.00, matchStatus: 'matched', matchDetail: 'Contract rate row 14' },
      { id: '2', itemCode: 'XPSN22510B', description: 'xPowerS PB 250A Bot 10W TPN-NZM1/PDE1 OG', qty: 28, extractedPrice: 1064.00, referencePrice: 1064.00, total: 29792.00, matchStatus: 'matched', matchDetail: 'Contract rate row 18' },
      { id: '3', itemCode: 'XPSN22512B', description: 'xPowerS PB 250A Bot 12W TPN-NZM1/PDE1 OG', qty: 18, extractedPrice: 1225.00, referencePrice: 1225.00, total: 22050.00, matchStatus: 'matched', matchDetail: 'Contract rate row 22' },
    ],
    vatRate: 0.05,
    targetSalesOrder: 'SO-S00006715',
    targetInvoice: 'IN00007477'
  },
  '4517145590': {
    id: 'PO-4517145590',
    scenarioNumber: 1,
    title: 'Scenario 1: Customer PO without Quotation (Price List Based)',
    shortTitle: 'Sc 1: EATON FZE (Price List)',
    badge: 'Price List Match',
    scenarioDescription: 'Customer order matched directly against approved Tier 2 Contract Price List schedule.',
    crossCheckSummary: 'All 3 line items matched 100% against Eaton Tier 2 Contract Master Price List (0.00% Variance). Payment terms (90 Days Credit) and TRN verified.',
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
      description: 'Master Contract Pricing for Eaton FZE (Agreement: INF-EAT-2026-T2)',
      referenceCode: 'CONTRACT-EATON-T2',
      matchedDate: 'Valid through 31 Dec 2026'
    },
    items: [
      { id: '1', itemCode: 'XPSN22506B', description: 'xPowerS PB 250A Bot 6W TPN-NZM1/PDE1 OG', qty: 15, extractedPrice: 856.00, referencePrice: 856.00, total: 12840.00, matchStatus: 'matched', matchDetail: 'Contract rate row 14' },
      { id: '2', itemCode: 'XPSN22510B', description: 'xPowerS PB 250A Bot 10W TPN-NZM1/PDE1 OG', qty: 28, extractedPrice: 1064.00, referencePrice: 1064.00, total: 29792.00, matchStatus: 'matched', matchDetail: 'Contract rate row 18' },
      { id: '3', itemCode: 'XPSN22512B', description: 'xPowerS PB 250A Bot 12W TPN-NZM1/PDE1 OG', qty: 18, extractedPrice: 1225.00, referencePrice: 1225.00, total: 22050.00, matchStatus: 'matched', matchDetail: 'Contract rate row 22' },
    ],
    vatRate: 0.05,
    targetSalesOrder: 'SO-S00006715',
    targetInvoice: 'IN00007477'
  },
  'PO-VD-44192': {
    id: 'PO-VD-44192',
    scenarioNumber: 2,
    title: 'Scenario 2: Customer PO based on Quotation (Matching Part References)',
    shortTitle: 'Sc 2: Verger Delporte (Quote)',
    badge: 'Quotation Match',
    scenarioDescription: 'Customer order matched against approved Quotation ENQ-26-E-0164 with exact panel part codes.',
    crossCheckSummary: 'All 8 enclosure part numbers matched approved quote ENQ-26-E-0164. 10% ex-works factory surcharge (AED 2,621.00) calculated per agreed terms.',
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
    rawQuoteFilename: 'Quotation-02 - ENQ-26-E-0164.pdf',
    referenceDocument: {
      type: 'Quotation',
      name: 'ENQ-26-E-0164 (Verger Delporte Offer)',
      description: 'Formal quote for IFC & IFL sheet metal enclosures with 10% ex-works surcharge',
      referenceCode: 'ENQ-26-E-0164',
      matchedDate: 'Approved on 05 Jul 2026'
    },
    items: [
      { id: '1', itemCode: 'IFC86/200+MP', description: '800H x 600W x 200D Single Door Compact Enclosure with MP + Gland Plate', qty: 10, extractedPrice: 315.00, referencePrice: 315.00, total: 3150.00, matchStatus: 'matched', matchDetail: 'Quote Line #1' },
      { id: '2', itemCode: 'IFC86/250+MP', description: '800H x 600W x 250D Single Door Compact Enclosure with MP + Gland Plate', qty: 10, extractedPrice: 345.00, referencePrice: 345.00, total: 3450.00, matchStatus: 'matched', matchDetail: 'Quote Line #2' },
      { id: '3', itemCode: 'IFC108/300+MP+SD', description: '1000H x 800W x 300D Single Door Compact Enclosure with MP + Gland Plate', qty: 10, extractedPrice: 520.00, referencePrice: 520.00, total: 5200.00, matchStatus: 'matched', matchDetail: 'Quote Line #3' },
      { id: '4', itemCode: 'IFC128/300+MP+SD', description: '1200H x 800W x 300D Single Door Compact Enclosure with MP + Gland Plate', qty: 10, extractedPrice: 600.00, referencePrice: 600.00, total: 6000.00, matchStatus: 'matched', matchDetail: 'Quote Line #4' },
      { id: '5', itemCode: 'IFC66/150+MP', description: '600H x 600W x 150D Single Door Compact Enclosure with MP + Gland Plate', qty: 4, extractedPrice: 225.00, referencePrice: 225.00, total: 900.00, matchStatus: 'matched', matchDetail: 'Quote Line #5' },
      { id: '6', itemCode: 'IFC148/300+MP+SD', description: '1400H x 800W x 300D Single Door Compact Enclosure with MP + Gland Plate', qty: 4, extractedPrice: 685.00, referencePrice: 685.00, total: 2740.00, matchStatus: 'matched', matchDetail: 'Quote Line #6' },
      { id: '7', itemCode: 'IFL168/300+MP+SD', description: '1600H x 800W x 300D Single Door Large Enclosure with MP + Gland Plate', qty: 4, extractedPrice: 980.00, referencePrice: 980.00, total: 3920.00, matchStatus: 'matched', matchDetail: 'Quote Line #7' },
      { id: '8', itemCode: 'IFL188/400+MP+SD', description: '1800H x 800W x 400D Single Door Large Enclosure with MP + Gland Plate', qty: 1, extractedPrice: 850.00, referencePrice: 850.00, total: 850.00, matchStatus: 'matched', matchDetail: 'Quote Line #8' },
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
    shortTitle: 'Sc 3: Can Serv Oil (NLP Match)',
    badge: 'NLP Text Match',
    scenarioDescription: 'PO text description mapped to internal SKU INF-DB-2000-1423-A using AI NLP parameter extraction.',
    crossCheckSummary: 'Freeform text description extracted parameters (2000H x 1423W x 331D IP55 Double Door) and successfully mapped to internal SKU INF-DB-2000-1423-A with 98.5% confidence.',
    customer: 'Can Serv Oil & Gas',
    customerAddress: 'Sector M-34, Musaffah Industrial Area, Abu Dhabi, UAE',
    customerTRN: '100998124500003',
    poNumber: 'PO-CSO-9912',
    poDate: '04 May 2026',
    quoteRef: 'QT-EMAIL-PO00670',
    deliveryTerms: 'Musaffah Depot, Abu Dhabi',
    paymentTerms: '30 Days Credit',
    rawPoUrl: '/samples/scenario3_po.pdf',
    rawPoFilename: 'PO.pdf (Can Serv Oil)',
    rawQuoteUrl: '/samples/scenario3_quote.png',
    rawQuoteFilename: 'Quotation Email Can Serv.png',
    referenceDocument: {
      type: 'Email Quote',
      name: 'Quotation Email Offer - PO-00670',
      description: 'Quote confirmation for 2000H x 1423W x 331D distribution panel without SKU numbers',
      referenceCode: 'QT-EMAIL-PO00670',
      matchedDate: 'Email confirmed 28 Apr 2026'
    },
    items: [
      { id: '1', itemCode: 'INF-DB-2000-1423-A', description: '2000H x 1423W x 331D Distribution Panel Enclosure IP55 with Mounting Plate & Double Door', qty: 4, extractedPrice: 24350.00, referencePrice: 24350.00, total: 97400.00, matchStatus: 'mapped_from_text', matchDetail: 'NLP mapped from freeform text (98.5%)' },
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
    shortTitle: 'Sc 4: Encom (Part Cross-Ref)',
    badge: 'Customer Part Cross-Ref',
    scenarioDescription: 'Customer order used customer part number ER-ENC-200. Cross-matched to internal SKU INF-ENC-2R16M.',
    crossCheckSummary: 'Customer code ER-ENC-200 found in customer cross-reference dictionary. Translated directly to Infratech SKU INF-ENC-2R16M (Rate: AED 460.00).',
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
      referenceCode: 'QT-EMAIL-ENCOM',
      matchedDate: 'Email confirmed 25 Apr 2026'
    },
    items: [
      { id: '1', itemCode: 'INF-ENC-2R16M', customerItemCode: 'ER-ENC-200', description: '1200H x 600W x 200D Single Door Compact Enclosure IP65 with Gland Plate', qty: 35, extractedPrice: 460.00, referencePrice: 460.00, total: 16100.00, matchStatus: 'cross_referenced', matchDetail: 'Cust SKU ER-ENC-200 -> INF-ENC-2R16M' },
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
  
  // Resolve scenario key reliably
  const currentScenarioKey = useMemo(() => {
    if (!id) return 'PO-4517145590';
    if (scenarios[id]) return scenarios[id].id;
    if (id.includes('4517145590')) return 'PO-4517145590';
    if (id.includes('44192') || id.includes('VD')) return 'PO-VD-44192';
    if (id.includes('9912') || id.includes('CSO')) return 'PO-CSO-9912';
    if (id.includes('7296') || id.includes('EN')) return 'PO-EN-7296';
    return 'PO-4517145590';
  }, [id]);

  const activeScenario = scenarios[currentScenarioKey] || scenarios['PO-4517145590'];

  // View state: toggle between 'po' (Customer PO) and 'quote' (Reference Quote)
  const [activeDocView, setActiveDocView] = useState<'po' | 'quote'>('po');
  const [approvalNote, setApprovalNote] = useState('Commercial review verified. Quantities, prices, and terms match approved master data.');

  // Interactive Blocker Simulation State
  const [hasSimulatedBlocker, setHasSimulatedBlocker] = useState(false);
  const [blockerResolved, setBlockerResolved] = useState(false);

  // Line items (with simulated price variance if toggled)
  const currentItems = useMemo(() => {
    return activeScenario.items.map((item, index) => {
      if (index === 0 && hasSimulatedBlocker && !blockerResolved) {
        const discountedPrice = item.referencePrice * 0.85; // 15% discrepancy
        return {
          ...item,
          extractedPrice: discountedPrice,
          total: discountedPrice * item.qty,
          matchStatus: 'price_mismatch' as const,
          matchDetail: `Variance: PO is AED ${discountedPrice.toFixed(2)} vs Master AED ${item.referencePrice.toFixed(2)} (-15%)`
        };
      }
      return item;
    });
  }, [activeScenario, hasSimulatedBlocker, blockerResolved]);

  const isBlockerActive = hasSimulatedBlocker && !blockerResolved;

  // Subtotal & Totals
  const subtotal = useMemo(() => {
    return currentItems.reduce((sum, item) => sum + item.total, 0);
  }, [currentItems]);

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
    if (isBlockerActive) {
      alert('Cannot post to Sage 300 while a price variance blocker is unresolved. Please resolve or override the discrepancy.');
      return;
    }
    navigate('/sales-orders');
  };

  const handleAutoCorrectRate = () => {
    setBlockerResolved(true);
    setApprovalNote('Commercial Manager auto-corrected Line 1 to Master Contract Rate (AED 856.00). Approved for Sage 300 batch creation.');
  };

  const handleOverrideDiscount = () => {
    setBlockerResolved(true);
    setApprovalNote('Special commercial concession approved by Commercial Manager Bhavani Prasad. 15% discount accepted as per email authorization.');
  };

  const handleRouteToExceptionQueue = () => {
    navigate('/exception-queue');
  };

  const currentDocUrl = activeDocView === 'po' ? activeScenario.rawPoUrl : (activeScenario.rawQuoteUrl || activeScenario.rawPoUrl);
  const currentDocFilename = activeDocView === 'po' ? activeScenario.rawPoFilename : (activeScenario.rawQuoteFilename || activeScenario.rawPoFilename);
  const isImageFile = currentDocUrl.endsWith('.png') || currentDocUrl.endsWith('.jpg');

  return (
    <div className="w-full h-full flex flex-col bg-slate-100/80 text-slate-900 overflow-hidden font-sans">
      {/* Sleek, Uncongested Top Navigation Bar */}
      <header className="h-14 bg-white border-b border-slate-200 shrink-0 z-20 px-6 flex items-center justify-between shadow-2xs">
        {/* Left: Clean Breadcrumb & Context */}
        <div className="flex items-center gap-3 min-w-0">
          <Link 
            to="/document-processing" 
            className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-900 px-2 py-1 rounded-md hover:bg-slate-100 transition-colors shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Inbound Queue</span>
          </Link>

          <span className="text-slate-300">/</span>

          <div className="flex items-center gap-2 truncate">
            <span className="font-mono font-bold text-slate-900 text-xs">{activeScenario.poNumber}</span>
            <span className="text-xs text-slate-600 font-medium truncate">• {activeScenario.customer}</span>
            <span className="hidden md:inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
              {activeScenario.badge}
            </span>
          </div>
        </div>

        {/* Right: Refined Secondary Actions & Primary CTA */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Compact Scenario Selector Dropdown */}
          <div className="relative">
            <select
              value={currentScenarioKey}
              onChange={(e) => {
                setActiveDocView('po');
                setHasSimulatedBlocker(false);
                setBlockerResolved(false);
                navigate(`/document-processing/${e.target.value}`);
              }}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 outline-none hover:bg-slate-100 transition-all cursor-pointer pr-7 appearance-none"
            >
              {Object.values(scenarios).map((sc) => (
                <option key={sc.id} value={sc.id}>
                  {sc.shortTitle}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Simulate Issue Toggle */}
          <button
            onClick={() => {
              setHasSimulatedBlocker(!hasSimulatedBlocker);
              setBlockerResolved(false);
            }}
            className={`px-2.5 py-1.5 text-xs font-bold rounded-lg border transition-all flex items-center gap-1.5 ${
              isBlockerActive 
                ? 'bg-amber-100 border-amber-300 text-amber-900' 
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
            title="Simulate a price discrepancy blocker"
          >
            <AlertTriangle className={`w-3.5 h-3.5 ${isBlockerActive ? 'text-amber-700' : 'text-slate-400'}`} />
            <span>{isBlockerActive ? 'Blocker Active' : 'Simulate Issue'}</span>
          </button>

          {/* Primary Action Button */}
          <button 
            onClick={handleApproveAndPost}
            className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-lg shadow-2xs transition-all ${
              isBlockerActive 
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer hover:shadow-sm'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Approve & Post to Sage 300
          </button>
        </div>
      </header>

      {/* Main Split Screen Workspace */}
      <div className="flex-1 flex overflow-hidden w-full">
        {/* Left Side: Real Raw Document Viewer (50%) */}
        <div className="w-1/2 flex flex-col bg-slate-900 border-r border-slate-300 relative overflow-hidden h-full">
          {/* Clean Document Switcher Toolbar */}
          <div className="h-10 bg-slate-950 border-b border-slate-800 px-4 flex items-center justify-between z-10 shrink-0">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveDocView('po')}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded transition-colors ${
                  activeDocView === 'po'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Customer PO</span>
              </button>

              {activeScenario.rawQuoteUrl && (
                <button
                  onClick={() => setActiveDocView('quote')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded transition-colors ${
                    activeDocView === 'quote'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Quotation Offer</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 text-slate-400 text-xs">
              <span className="text-[11px] font-mono truncate max-w-[200px] text-slate-400">
                {currentDocFilename}
              </span>
              <a 
                href={currentDocUrl} 
                target="_blank" 
                rel="noreferrer"
                className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                title="Open in new window"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a 
                href={currentDocUrl} 
                download
                className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                title="Download original document"
              >
                <Download className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Genuine Raw Document Content */}
          <div className="flex-1 w-full h-full bg-slate-900 overflow-hidden relative flex items-center justify-center">
            {isImageFile ? (
              <div className="w-full h-full overflow-auto flex items-center justify-center p-4 custom-scrollbar bg-slate-950">
                <img 
                  src={currentDocUrl} 
                  alt={currentDocFilename}
                  className="max-w-full max-h-full object-contain rounded shadow-2xl border border-slate-700 bg-white"
                />
              </div>
            ) : (
              <iframe
                src={`${currentDocUrl}#toolbar=0&navpanes=0&scrollbar=1`}
                title={currentDocFilename}
                className="w-full h-full border-none bg-slate-900"
              />
            )}
          </div>
        </div>

        {/* Right Side: Commercial Review & Cross-Match Console (50%) */}
        <div className="w-1/2 flex flex-col bg-slate-50 overflow-y-auto custom-scrollbar h-full p-6 space-y-4">
          
          {/* Automated Cross-Check Verification Checklist Banner / Blocker Alert */}
          {isBlockerActive ? (
            <div className="bg-amber-50/90 rounded-xl border border-amber-300 p-4 shadow-2xs animate-in fade-in">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wide">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Commercial Price Variance Blocker</span>
                </div>
                <span className="px-2 py-0.5 bg-amber-200 text-amber-900 text-[10px] font-bold rounded">
                  Posting Paused
                </span>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed font-medium mb-3">
                Unit price extracted from PO (AED {currentItems[0].extractedPrice.toFixed(2)}) is lower than Master Contract Rate (AED {currentItems[0].referencePrice.toFixed(2)}) by 15.0%. Posting to Sage 300 is blocked until resolved.
              </p>

              {/* Blocker Resolution Options */}
              <div className="bg-white p-3 rounded-lg border border-amber-200 space-y-2">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Manager Resolution Action:</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={handleAutoCorrectRate}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-2xs"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Adjust to Master Rate (AED {currentItems[0].referencePrice.toFixed(2)})
                  </button>
                  <button
                    onClick={handleOverrideDiscount}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 text-white text-xs font-bold rounded-lg hover:bg-amber-700 transition-colors shadow-2xs"
                  >
                    <Check className="w-3.5 h-3.5" /> Approve Concession & Override
                  </button>
                  <button
                    onClick={handleRouteToExceptionQueue}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-rose-700 text-xs font-bold rounded-lg hover:bg-rose-50 border border-slate-200 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" /> Send to Exception Queue
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-emerald-200/80 p-4 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-emerald-900 uppercase tracking-wide">
                    Commercial Cross-Check Passed (5/5 Points Verified)
                  </span>
                </div>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 text-[10px] font-bold rounded border border-emerald-200">
                  0 Blockers • Ready for Posting
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium mb-3">
                {activeScenario.crossCheckSummary}
              </p>

              {/* 5 Visual Verification Points */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Buyer TRN Verified</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Payment Terms Matched</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Unit Rates: 0% Variance</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Quantities Validated</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Surcharges Computed</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Ready for Sage 300</span>
                </div>
              </div>
            </div>
          )}

          {/* Unified Customer & Master Reference Details Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Buyer & Terms</span>
              <p className="font-bold text-slate-900 text-sm">{activeScenario.customer}</p>
              <p className="text-[11px] text-slate-500 font-mono mt-0.5">TRN: {activeScenario.customerTRN}</p>
              <p className="text-slate-700 mt-1">Payment: <strong className="text-indigo-700">{activeScenario.paymentTerms}</strong></p>
            </div>
            <div className="border-t md:border-t-0 md:border-l border-slate-100 md:pl-4 pt-2 md:pt-0">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Cross-Referenced Source</span>
              <p className="font-bold text-slate-900">{activeScenario.referenceDocument.name}</p>
              <span className="inline-block font-mono text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded mt-1">
                Ref: {activeScenario.referenceDocument.referenceCode}
              </span>
              <p className="text-[10px] text-slate-400 mt-1">{activeScenario.referenceDocument.matchedDate}</p>
            </div>
          </div>

          {/* Line Items Side-by-Side Comparison Table */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="p-3 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Line Items Cross-Check ({currentItems.length} Lines)
                </h3>
              </div>
              {isBlockerActive ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  Variance Detected
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3" /> 0.00% Rate Variance
                </span>
              )}
            </div>
            
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-100/60 text-[10px] text-slate-500 font-bold uppercase">
                  <th className="py-2.5 px-3">Item SKU & Description</th>
                  <th className="py-2.5 px-2 text-center w-10">Qty</th>
                  <th className="py-2.5 px-2 text-right">PO Rate</th>
                  <th className="py-2.5 px-2 text-right">Master Rate</th>
                  <th className="py-2.5 px-2 text-right">Total (AED)</th>
                  <th className="py-2.5 px-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentItems.map((item) => (
                  <tr key={item.id} className={`transition-colors ${item.matchStatus === 'price_mismatch' ? 'bg-amber-50/70' : 'hover:bg-slate-50'}`}>
                    <td className="py-3 px-3">
                      <div className="flex flex-col">
                        <span className="font-bold font-mono text-indigo-700 text-xs">{item.itemCode}</span>
                        {item.customerItemCode && (
                          <span className="text-[10px] text-amber-700 font-mono">Cust Ref: {item.customerItemCode}</span>
                        )}
                        <span className="text-[11px] text-slate-600 mt-0.5 leading-snug">{item.description}</span>
                        {item.matchDetail && (
                          <span className={`text-[10px] mt-0.5 flex items-center gap-1 ${item.matchStatus === 'price_mismatch' ? 'text-amber-800 font-semibold' : 'text-slate-400'}`}>
                            <Info className="w-2.5 h-2.5" /> {item.matchDetail}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-2 text-center font-bold text-slate-800">{item.qty}</td>
                    <td className={`py-3 px-2 text-right font-mono font-semibold ${item.matchStatus === 'price_mismatch' ? 'text-rose-600 bg-rose-50' : 'text-slate-800'}`}>
                      AED {item.extractedPrice.toFixed(2)}
                    </td>
                    <td className="py-3 px-2 text-right font-mono text-emerald-700 font-bold bg-emerald-50/40">
                      AED {item.referencePrice.toFixed(2)}
                    </td>
                    <td className="py-3 px-2 text-right font-mono font-bold text-slate-900">
                      AED {item.total.toFixed(2)}
                    </td>
                    <td className="py-3 px-3 text-center">
                      {item.matchStatus === 'price_mismatch' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 whitespace-nowrap">
                          <AlertTriangle className="w-3 h-3 text-rose-600" /> Price Variance
                        </span>
                      )}
                      {item.matchStatus === 'matched' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 whitespace-nowrap">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Exact Match
                        </span>
                      )}
                      {item.matchStatus === 'mapped_from_text' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 whitespace-nowrap">
                          <Layers className="w-3 h-3 text-blue-600" /> NLP Matched
                        </span>
                      )}
                      {item.matchStatus === 'cross_referenced' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 whitespace-nowrap">
                          <ArrowRightLeft className="w-3 h-3 text-amber-600" /> Cross-Matched
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Financial Totals Calculation Block */}
            <div className="p-3.5 bg-slate-50 border-t border-slate-200 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal (Net Items):</span>
                <span className="font-mono font-bold text-slate-800">AED {subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              {activeScenario.hasSurcharge && (
                <div className="flex justify-between text-indigo-700 font-medium">
                  <span>Ex-works Factory Surcharge ({activeScenario.surchargePercent}% per terms):</span>
                  <span className="font-mono font-bold">+ AED {surchargeAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>UAE VAT ({activeScenario.vatRate * 100}%):</span>
                <span className="font-mono font-bold text-slate-800">AED {vatAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="h-px bg-slate-200 my-1"></div>
              <div className="flex justify-between text-sm font-bold text-slate-900">
                <span>Verified Sage 300 Order Total:</span>
                <span className="font-mono font-black text-indigo-700">AED {grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          {/* Single-Level Manager Approval Notes */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Commercial Manager Approval Notes
              </label>
              <span className="text-[10px] text-slate-400 font-medium">Sign-off Approver: Bhavani Prasad</span>
            </div>
            <textarea
              rows={2}
              value={approvalNote}
              onChange={(e) => setApprovalNote(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs text-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none resize-none bg-slate-50/50"
            />
          </div>

          {/* Clean Bottom Sticky Bar */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-200">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Sage 300 Posting Amount</span>
              <span className="text-base font-black font-mono text-slate-900">
                AED {grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex gap-2">
              <Link 
                to="/document-processing" 
                className="px-3.5 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
              >
                Back to Queue
              </Link>
              <button 
                onClick={handleApproveAndPost}
                disabled={isBlockerActive}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg shadow-sm transition-all ${
                  isBlockerActive 
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer'
                }`}
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
