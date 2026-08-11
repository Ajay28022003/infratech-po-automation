import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Building2, MapPin, CheckCircle2, Phone, Mail, Activity } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';

interface SupplierProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  category: string;
  creditLimit: string;
  paymentTerms: string;
}

const supplierProfiles: Record<string, SupplierProfile> = {
  'SUPP-EATON': {
    name: 'Eaton Industries Middle East',
    email: 'me.sales@eaton.com',
    phone: '+971 4 806 6100',
    address: 'Plot S30805, JAFZA South, Dubai, UAE',
    category: 'Busbar Components & Breakers',
    creditLimit: 'AED 1,500,000.00',
    paymentTerms: '90 Days Credit'
  },
  'SUPP-SCHNEIDER': {
    name: 'Schneider Electric UAE',
    email: 'orders.uae@se.com',
    phone: '+971 4 709 9100',
    address: 'Dubai Silicon Oasis, HQ Building, Dubai, UAE',
    category: 'Switchgear & Enclosure Hardware',
    creditLimit: 'AED 2,000,000.00',
    paymentTerms: '60 Days Credit'
  },
  'SUPP-ABB': {
    name: 'ABB Electrification UAE',
    email: 'orders.electrification@abb.com',
    phone: '+971 4 314 7500',
    address: 'Al Quoz Industrial Area 3, Dubai, UAE',
    category: 'Contactors & Relays',
    creditLimit: 'AED 1,200,000.00',
    paymentTerms: '60 Days PDC'
  },
  'SUPP-RITTAL': {
    name: 'Rittal Middle East FZE',
    email: 'info@rittal-middle-east.com',
    phone: '+971 4 341 6855',
    address: 'JAFZA North, Dubai, UAE',
    category: 'Enclosure Gland Plates & Accessories',
    creditLimit: 'AED 800,000.00',
    paymentTerms: '30 Days Credit'
  },
  'SUPP-EMSTEEL': {
    name: 'Emirates Steel Arkan',
    email: 'sales@emiratessteel.com',
    phone: '+971 2 550 1111',
    address: 'ICAD 1, Musaffah, Abu Dhabi, UAE',
    category: 'CRCA & Galvanized Sheet Metal',
    creditLimit: 'AED 3,000,000.00',
    paymentTerms: '90 Days LC'
  }
};

export const SupplierDetails = () => {
  const { id } = useParams();
  const profileKey = (id && supplierProfiles[id]) ? id : 'SUPP-EATON';
  const profile = supplierProfiles[profileKey] || supplierProfiles['SUPP-EATON'];
  
  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Header Navigation */}
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <Link to="/suppliers" className="hover:text-indigo-600 transition-colors flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to Suppliers
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-mono font-bold">{id || 'SUPP-EATON'}</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{profile.name}</h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5" /> Approved Vendor
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-mono">Supplier Code: <strong className="text-slate-800">{id || 'SUPP-EATON'}</strong> • Category: <strong className="text-slate-800">{profile.category}</strong></p>
        </div>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2 shadow-md">
          <CardHeader className="py-3.5 border-b border-slate-100 bg-slate-50/50">
            <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-900"><Building2 className="w-4 h-4 text-indigo-600" /> Vendor Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5 flex items-center gap-1">
                <Mail className="w-3 h-3" /> Orders Email
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
                <MapPin className="w-3 h-3" /> Supply Facility Address
              </p>
              <p className="text-xs font-medium text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                {profile.address}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="py-3.5 border-b border-slate-100 bg-slate-50/50">
            <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-900"><Activity className="w-4 h-4 text-emerald-600" /> Procurement Terms</CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-4 text-xs">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-0.5">Credit Facility</span>
              <span className="text-xl font-black font-mono text-slate-900">{profile.creditLimit}</span>
            </div>
            <div className="h-px bg-slate-100 w-full"></div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-semibold">Payment Terms</span>
              <span className="font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-md">{profile.paymentTerms}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
