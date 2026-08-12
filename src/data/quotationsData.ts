export interface QuotationItem {
  id: string;
  itemCode: string;
  customerItemCode?: string;
  description: string;
  qty: number;
  unitPrice: number;
  total: number;
}

export interface QuotationRecord {
  id: string;
  customer: string;
  customerAddress: string;
  customerTRN: string;
  contact: string;
  email: string;
  date: string;
  validUntil: string;
  amount: string;
  status: 'Approved' | 'Sent' | 'Draft' | 'Pending Review';
  scenarioRef: string;
  poRef?: string;
  scenarioNum?: number;
  docType: 'pdf' | 'image' | 'schedule';
  docUrl?: string;
  docFilename?: string;
  paymentTerms: string;
  deliveryTerms: string;
  salesRep: string;
  notes: string;
  subtotal: number;
  hasSurcharge?: boolean;
  surchargePercent?: number;
  surchargeAmount?: number;
  vatRate: number;
  vatAmount: number;
  grandTotal: number;
  items: QuotationItem[];
}

export const mockQuotations: QuotationRecord[] = [
  {
    id: 'ENQ-26-E-0164',
    customer: 'M/s. Verger Delporte UAE Ltd',
    customerAddress: 'P.O Box 5629, Industrial Road 1, Industrial Area 5, Sharjah, UAE',
    customerTRN: '100412893100003',
    contact: 'Prasanth.V.K',
    email: 'prasanth.vk@verger-delporte.ae',
    date: 'Jul 09, 2026',
    validUntil: 'Jul 16, 2026',
    amount: 'AED 28,831.00',
    status: 'Approved',
    scenarioRef: 'Scenario 2: Quotation Match (Quotation-02.pdf)',
    poRef: 'PO-VD-44192',
    scenarioNum: 2,
    docType: 'pdf',
    docUrl: '/samples/scenario2_quote.pdf',
    docFilename: 'Quotation-02 - ENQ-26-E-0164.pdf',
    paymentTerms: '90 Days PDC from the date of delivery',
    deliveryTerms: 'Ex-works, 5% Customs & Clearance charge applicable',
    salesRep: 'Bhavani Prasad',
    notes: 'Formal quotation for 8 IFC & IFL enclosure models. Includes 10% ex-works factory surcharge (AED 2,621.00). VAT Not Applicable.',
    subtotal: 26210.00,
    hasSurcharge: true,
    surchargePercent: 10,
    surchargeAmount: 2621.00,
    vatRate: 0.00,
    vatAmount: 0.00,
    grandTotal: 28831.00,
    items: [
      { id: '1', itemCode: 'IFC86/200+MP', description: '800H x 600W x 200D Single Door Compact Enclosure with MP + Gland Plate, Ral 7035', qty: 27, unitPrice: 315.00, total: 8505.00 },
      { id: '2', itemCode: 'IFC128/300+MP+SD', description: '1200H x 800W x 300D Single Door Compact Enclosure with MP + Gland Plate, Ral 7035', qty: 17, unitPrice: 600.00, total: 10200.00 },
      { id: '3', itemCode: 'IFC66/150+MP', description: '600H x 600W x 150D Single Door Compact Enclosure with MP + Gland Plate, Ral 7035', qty: 2, unitPrice: 225.00, total: 450.00 },
      { id: '4', itemCode: 'IFC148/300+MP+SD', description: '1400H x 800W x 300D Single Door Compact Enclosure with MP + Gland Plate, Ral 7035', qty: 7, unitPrice: 685.00, total: 4795.00 },
      { id: '5', itemCode: 'IFC126/200+MP', description: '1200H x 600W x 200D Single Door Compact Enclosure with MP + Gland Plate, Ral 7035', qty: 1, unitPrice: 460.00, total: 460.00 },
      { id: '6', itemCode: 'IFC106/200+MP', description: '1000H x 600W x 200D Single Door Compact Enclosure with MP + Gland Plate, Ral 7035', qty: 1, unitPrice: 390.00, total: 390.00 },
      { id: '7', itemCode: 'IFC88/300+MP', description: '800H x 800W x 300D Single Door Compact Enclosure with MP + Gland Plate, Ral 7035', qty: 1, unitPrice: 430.00, total: 430.00 },
      { id: '8', itemCode: 'IFL168/300+MP+SD', description: '1600H x 800W x 300D Single Door Large Enclosure with MP + Gland Plate, Ral 7035', qty: 1, unitPrice: 980.00, total: 980.00 },
    ]
  },
  {
    id: 'QT-EMAIL-PO00670',
    customer: 'M/s. CAN SERV OIL & GAS',
    customerAddress: 'WIZ07-19 Shed n 07, Al Mabmra Industrial Zone, RAK, UAE',
    customerTRN: '100998124500003',
    contact: 'Noel Alden / Procurement',
    email: 'procurement@canservoil.com',
    date: 'Apr 28, 2026',
    validUntil: 'May 28, 2026',
    amount: 'AED 107,152.00',
    status: 'Approved',
    scenarioRef: 'Scenario 3: Email Quote (Quotation.png)',
    poRef: 'PO-CSO-9912',
    scenarioNum: 3,
    docType: 'image',
    docUrl: '/samples/scenario3_quote.png',
    docFilename: 'Quotation Email Can Serv.png',
    paymentTerms: '30 Days credit from the date of delivery',
    deliveryTerms: 'DDP, Lead Time: 2-6 Weeks from receipt of PO',
    salesRep: 'Bhavani Prasad',
    notes: 'Quotation confirmed via email offer for 2000H x 1423W x 331D distribution panel enclosures with drawing pockets & DIN rail closing plates. 5% VAT included.',
    subtotal: 102050.00,
    hasSurcharge: false,
    vatRate: 0.05,
    vatAmount: 5102.00,
    grandTotal: 107152.00,
    items: [
      { id: '1', itemCode: 'INF-DB-2000-1423-A', description: '2000H x 1423W x 331D Distribution Panel Enclosure, Ral 9003 Matt (Drawing Pocket, Brackets & Din Rail)', qty: 6, unitPrice: 7850.00, total: 47100.00 },
      { id: '2', itemCode: 'INF-DB-2000-1423-B', description: '2000H x 1423W x 331D Distribution Panel Enclosure, Ral 9003 Matt (Drawing Pocket, Brackets & Din Rail)', qty: 7, unitPrice: 7850.00, total: 54950.00 },
    ]
  },
  {
    id: 'QT-EMAIL-ENCOM',
    customer: 'M/s. ENCOM TRADING LLC',
    customerAddress: 'P.O Box 14521, Electro RAK Group, Ras Al Khaimah, UAE',
    customerTRN: '100028651600003',
    contact: 'Ashraf / Purchase Dept',
    email: 'purchase@electrorak.com',
    date: 'May 04, 2026',
    validUntil: 'Jun 04, 2026',
    amount: 'AED 520.80',
    status: 'Approved',
    scenarioRef: 'Scenario 4: Email Quote (Quotation without part number.png)',
    poRef: 'PO-EN-7296',
    scenarioNum: 4,
    docType: 'image',
    docUrl: '/samples/scenario4_quote.png',
    docFilename: 'Quotation Email Encom Group.png',
    paymentTerms: '90 Days PDC',
    deliveryTerms: 'DELIVERY AT ENCOM, Ras Al Khaimah',
    salesRep: 'Bhavani Prasad (bhavani@infratech.ae)',
    notes: 'Email price confirmation: 2 Row 16 Module Enclosure Surface at AED 124.00 per unit (Subject: eng-p100137-rak ind).',
    subtotal: 496.00,
    hasSurcharge: false,
    vatRate: 0.05,
    vatAmount: 24.80,
    grandTotal: 520.80,
    items: [
      { id: '1', itemCode: 'INF-ENC-2R16M', customerItemCode: 'EG30119', description: '2 Row 16 Module DB Enclosure Surface (Cust Ref: EG30119)', qty: 4, unitPrice: 124.00, total: 496.00 },
    ]
  },
  {
    id: 'CONTRACT-EATON-T2',
    customer: 'M/s. EATON FZE',
    customerAddress: 'Plot No: S30805, Jebel Ali Free Zone, Dubai, UAE',
    customerTRN: '100296552100003',
    contact: 'EATON Regional Procurement',
    email: 'invoices@eaton.com',
    date: 'Jan 01, 2026',
    validUntil: 'Dec 31, 2026',
    amount: 'Annual Schedule',
    status: 'Approved',
    scenarioRef: 'Scenario 1: Tier 2 Contract Master Price List',
    poRef: 'PO-4517145590',
    scenarioNum: 1,
    docType: 'schedule',
    docFilename: 'Tier 2 xPower Price List - Rev 1.5.xlsx',
    paymentTerms: 'Net 90 Days',
    deliveryTerms: 'EXW (Ex Works) / AL HAMRA FREE ZONE, RAK',
    salesRep: 'Bhavani Prasad',
    notes: 'Master Contract Pricing Agreement INF-EAT-2026-T2 for Eaton xPower Low Voltage switchboard enclosures. Zero-rated Freezone transaction.',
    subtotal: 64682.00,
    hasSurcharge: false,
    vatRate: 0.00,
    vatAmount: 0.00,
    grandTotal: 64682.00,
    items: [
      { id: '1', itemCode: 'XPSN22506B', description: 'xPowerS PB 250A Bot 6W TPN-NZM1/PDE1 OG', qty: 15, unitPrice: 856.00, total: 12840.00 },
      { id: '2', itemCode: 'XPSN22510B', description: 'xPowerS PB 250A Bot 10W TPN-NZM1/PDE1 OG', qty: 28, unitPrice: 1064.00, total: 29792.00 },
      { id: '3', itemCode: 'XPSN22512B', description: 'xPowerS PB 250A Bot 12W TPN-NZM1/PDE1 OG', qty: 18, unitPrice: 1225.00, total: 22050.00 },
    ]
  },
  {
    id: 'ENQ-26-E-0166',
    customer: 'M/s. Al Shariq Switchgear LLC',
    customerAddress: 'Industrial Area 13, Sharjah, UAE',
    customerTRN: '100778819200003',
    contact: 'Eng. Tariq Mansoor',
    email: 'tariq@alshariq.ae',
    date: 'Jul 12, 2026',
    validUntil: 'Aug 12, 2026',
    amount: 'AED 42,500.00',
    status: 'Sent',
    scenarioRef: 'Tender Quotation for Switchboards',
    poRef: 'PO-AS-10492',
    docType: 'schedule',
    docFilename: 'Quotation_ENQ_26_E_0166.pdf',
    paymentTerms: '30 Days PDC',
    deliveryTerms: 'Ex-works RAK Plant',
    salesRep: 'Sarah Jenkins',
    notes: 'Tender quote for Main Switchboard Panels and Sub-Distribution enclosures. 5% UAE VAT applicable.',
    subtotal: 40476.19,
    hasSurcharge: false,
    vatRate: 0.05,
    vatAmount: 2023.81,
    grandTotal: 42500.00,
    items: [
      { id: '1', itemCode: 'IFL-LV-400A-8W', description: '400A Main Switchboard Panel Enclosure IP55 Ral 7035', qty: 2, unitPrice: 15000.00, total: 30000.00 },
      { id: '2', itemCode: 'IFC-SUB-100A', description: '100A Sub-Distribution Panel IP55 with Mounting Plate', qty: 5, unitPrice: 2500.00, total: 12500.00 },
    ]
  }
];

export const getQuotationById = (id?: string): QuotationRecord => {
  if (!id) return mockQuotations[0];
  const found = mockQuotations.find(q => q.id === id || q.id.toLowerCase() === id.toLowerCase() || (q.poRef && q.poRef.includes(id)));
  return found || mockQuotations[0];
};
