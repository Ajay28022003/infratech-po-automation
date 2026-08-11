import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Building2, MapPin, CheckCircle2, Phone, Mail, Activity, FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';

interface CustomerProfile {
  name: string;
  trn: string;
  email: string;
  phone: string;
  address: string;
  creditLimit: string;
  paymentTerms: string;
  scenarioRef: string;
  recentPo: string;
}

const customerProfiles: Record<string, CustomerProfile> = {
  'CUST-EATON': {
    name: 'M/s. EATON FZE',
    trn: '100296552100003',
    email: 'orders.fze@eaton.com',
    phone: '+971 4 806 6100',
    address: 'Plot No: S30805, Jebel Ali Free Zone (South), Dubai, UAE',
    creditLimit: 'AED 2,500,000.00',
    paymentTerms: '90 Days Credit',
    scenarioRef: 'Scenario 1: Price List Match (Tier 2 Contract)',
    recentPo: '4517145590'
  },
  'CUST-VERGER': {
    name: 'M/s. Verger Delporte UAE Ltd',
    trn: '100412893100003',
    email: 'purchasing@verger-delporte.ae',
    phone: '+971 6 534 3456',
    address: 'P.O Box 5629, Industrial Road 1, Industrial Area 5, Sharjah, UAE',
    creditLimit: 'AED 1,000,000.00',
    paymentTerms: '90 Days PDC from delivery',
    scenarioRef: 'Scenario 2: Quotation Match (ENQ-26-E-0164)',
    recentPo: 'PO-VD-44192'
  },
  'CUST-CANSERV': {
    name: 'M/s. CAN SERV OIL & GAS',
    trn: '100998124500003',
    email: 'procurement@canserv.ae',
    phone: '+971 2 554 9900',
    address: 'Sector M-34, Musaffah Industrial Area, Abu Dhabi, UAE',
    creditLimit: 'AED 1,500,000.00',
    paymentTerms: '30 Days Credit',
    scenarioRef: 'Scenario 3: Quotation without Part Numbers',
    recentPo: 'PO-CSO-9912'
  },
  'CUST-ENCOM': {
    name: 'M/s. ENCOM TRADING LLC',
    trn: '100881923100003',
    email: 'enquiries@electrorakgroup.com',
    phone: '+971 7 244 7890',
    address: 'P.O Box 17421, Electro RAK Group, Ras Al Khaimah, UAE',
    creditLimit: 'AED 500,000.00',
    paymentTerms: '30 Days PDC',
    scenarioRef: 'Scenario 4: Customer Part Cross-Match',
    recentPo: 'PO-EN-7296'
  },
};

export const CustomerDetails = () => {
  const { id } = useParams();
  const profileKey = (id && customerProfiles[id]) ? id : 'CUST-EATON';
  const profile = customerProfiles[profileKey] || customerProfiles['CUST-EATON'];
  
  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Header Navigation */}
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <Link to="/customers" className="hover:text-indigo-600 transition-colors flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to Customers
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-mono font-bold">{id || 'CUST-EATON'}</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{profile.name}</h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5" /> Approved Enterprise Buyer
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-mono">Customer Code: <strong className="text-slate-800">{id || 'CUST-EATON'}</strong> • TRN: <strong className="text-slate-800">{profile.trn}</strong></p>
        </div>
        <div className="flex gap-2">
          <Link 
            to={`/document-processing/${profile.recentPo}`}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all">
            <FileText className="w-4 h-4" /> View Linked PO ({profile.recentPo})
          </Link>
        </div>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2 shadow-md">
          <CardHeader className="py-3.5 border-b border-slate-100 bg-slate-50/50">
            <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-900"><Building2 className="w-4 h-4 text-indigo-600" /> Commercial Contact Profile</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5 flex items-center gap-1">
                <Mail className="w-3 h-3" /> Purchasing Email
              </p>
              <p className="text-xs font-mono font-bold text-slate-800">{profile.email}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5 flex items-center gap-1">
                <Phone className="w-3 h-3" /> Official Phone
              </p>
              <p className="text-xs font-bold text-slate-800">{profile.phone}</p>
            </div>
            <div className="col-span-1 md:col-span-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Registered Facility Address
              </p>
              <p className="text-xs font-medium text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                {profile.address}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="py-3.5 border-b border-slate-100 bg-slate-50/50">
            <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-900"><Activity className="w-4 h-4 text-emerald-600" /> Credit & Terms Agreement</CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-4 text-xs">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-0.5">Approved Credit Limit</span>
              <span className="text-xl font-black font-mono text-slate-900">{profile.creditLimit}</span>
            </div>
            <div className="h-px bg-slate-100 w-full"></div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-semibold">Payment Terms</span>
              <span className="font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-md">{profile.paymentTerms}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-semibold">Active Scenario</span>
              <span className="font-bold text-slate-800 text-[11px]">{profile.scenarioRef}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
