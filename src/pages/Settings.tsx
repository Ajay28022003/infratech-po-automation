import { useState } from 'react';
import { 
  Building2, 
  Scan, 
  Network, 
  FolderSync, 
  Mail, 
  BellRing, 
  Activity, 
  Save,
  Server,
  Database
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';

const settingTabs = [
  { id: 'company', label: 'Company Profile', icon: Building2 },
  { id: 'ocr', label: 'OCR & AI Engine', icon: Scan },
  { id: 'erp', label: 'Sage 300 ERP Connector', icon: Network },
  { id: 'network', label: 'Network Hotfolders', icon: FolderSync },
  { id: 'email', label: 'Mailbox Ingestion', icon: Mail },
  { id: 'notifications', label: 'Approval Alerts', icon: BellRing },
  { id: 'health', label: 'System Health', icon: Activity },
];

export const Settings = () => {
  const [activeTab, setActiveTab] = useState('company');

  const renderContent = () => {
    switch (activeTab) {
      case 'company':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Company Legal Entity</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Company Registered Name</label>
                <input type="text" defaultValue="INFRATECH FZ LLC" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-900 outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Federal Tax Authority TRN</label>
                <input type="text" defaultValue="100383847900003" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-900 outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Sage 300 Company ID</label>
                <input type="text" defaultValue="11975" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono font-bold text-indigo-700 outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Jurisdiction / Free Zone</label>
                <input type="text" defaultValue="Ras Al Khaimah Economic Zone (RAKEZ)" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs text-slate-800 outline-none focus:border-indigo-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Plant & Head Office Address</label>
                <textarea rows={2} defaultValue="Al Jazeera Al - Hamra, Industrial Area, P.O Box 11975, Ras Al Khaimah, United Arab Emirates" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs text-slate-800 outline-none focus:border-indigo-500 custom-scrollbar" />
              </div>
            </div>
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 mt-6">Financial & VAT Preferences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Base Currency</label>
                <input type="text" defaultValue="AED (United Arab Emirates Dirham)" disabled className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50 font-bold text-slate-700" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Standard VAT Rate</label>
                <input type="text" defaultValue="5% (UAE Federal Decree-Law No. 8)" disabled className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50 font-bold text-slate-700" />
              </div>
            </div>
          </div>
        );
      case 'ocr':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">OCR & NLP Recognition Pipeline</h2>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Confidence Threshold (%)</label>
                <div className="flex items-center gap-4">
                  <input type="range" min="50" max="100" defaultValue="90" className="flex-1 accent-indigo-600" />
                  <span className="font-bold text-slate-800 text-xs w-12 font-mono">90%</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Inbound POs with confidence scores above 90% are marked ready for commercial manager sign-off.</p>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="lineItems" defaultChecked className="w-4 h-4 text-indigo-600 rounded" />
                <label htmlFor="lineItems" className="text-xs font-semibold text-slate-800">Automated NLP text description mapping for Scenario 3 (Non-SKU Quotations)</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="customerPart" defaultChecked className="w-4 h-4 text-indigo-600 rounded" />
                <label htmlFor="customerPart" className="text-xs font-semibold text-slate-800">Customer Part Number Cross-Referencing for Scenario 4</label>
              </div>
            </div>
          </div>
        );
      case 'erp':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Sage 300 ERP Web Services Gateway</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Sage 300 API Host URL</label>
                <input type="text" defaultValue="https://sage300.infratech.ae/Sage300WebApi/v2/11975" className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 font-mono text-xs" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Service Account</label>
                  <input type="text" defaultValue="SVC_PO_AUTOMATION" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">OAuth Token Secret</label>
                  <input type="password" defaultValue="************************" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono" />
                </div>
              </div>
            </div>
          </div>
        );
      case 'health':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-900">System Diagnostics & Connectivity</h2>
              <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800">Ping All Gateways</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg"><Database className="w-4 h-4" /></div>
                  <h3 className="text-xs font-bold text-slate-900">Sage 300 ERP Connection</h3>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Status</span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">Connected (Company 11975)</span>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg"><Server className="w-4 h-4" /></div>
                  <h3 className="text-xs font-bold text-slate-900">OCR & Extraction Engine</h3>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Latency</span>
                  <span className="font-mono font-bold text-slate-800">0.85s (Fast)</span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-48 text-slate-500 text-xs">
            <p>Active and configured for Infratech FZ LLC.</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System Settings & Configuration</h1>
          <p className="text-xs text-slate-500 mt-1 font-normal">Global parameters, Sage 300 ERP endpoints, and AI recognition rules for Infratech FZ LLC.</p>
        </div>
        <div className="flex gap-2.5">
          <button className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 shadow-2xs transition-all">
            <Save className="w-3.5 h-3.5" /> Save Preferences
          </button>
        </div>
      </div>

      <Card className="shadow-2xs border-slate-200/80 overflow-hidden">
        <div className="flex flex-col md:flex-row min-h-[450px]">
          {/* Left Menu */}
          <div className="w-full md:w-60 border-b md:border-b-0 md:border-r border-slate-100 bg-slate-50/50 p-3 shrink-0">
            <div className="space-y-0.5">
              {settingTabs.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                    isActive 
                      ? 'bg-white text-indigo-700 shadow-xs border border-slate-200' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Right Content */}
        <CardContent className="flex-1 p-6 overflow-y-auto custom-scrollbar">
          {renderContent()}
        </CardContent>
        </div>
      </Card>
    </div>
  );
};
