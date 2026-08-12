import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  FileText, 
  Files,
  DownloadCloud,
  Database,
  Users, 
  Box, 
  Warehouse, 
  BarChart3, 
  AlertCircle, 
  ClipboardList, 
  Settings, 
  UserCog,
  Bell,
  Search,
  Network,
  Truck,
  MessageSquare,
  ChevronDown,
  Building,
  CheckCircle2
} from 'lucide-react';

interface NavItem {
  name: string;
  path?: string;
  icon: any;
  subItems?: { name: string; path: string; icon: any }[];
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: 'Core Workflows',
    items: [
      { name: 'Dashboard', path: '/', icon: LayoutDashboard },
      { name: 'Inbound PO Queue', path: '/document-processing', icon: Files },
      { name: 'Quotations', path: '/quotations', icon: MessageSquare },
      { name: 'Purchase Orders', path: '/purchase-orders', icon: ShoppingCart },
      { name: 'Sales Orders', path: '/sales-orders', icon: FileText },
    ]
  },
  {
    title: 'Ingestion & ERP',
    items: [
      { name: 'Document Collection', path: '/document-collection', icon: DownloadCloud },
      { name: 'Exception Queue', path: '/exception-queue', icon: AlertCircle },
      { name: 'ERP Gateway', path: '/erp-integration', icon: Network },
      { name: 'Audit Logs', path: '/audit-logs', icon: ClipboardList },
    ]
  },
  {
    title: 'System & Masters',
    items: [
      { 
        name: 'Master Data', 
        icon: Database,
        subItems: [
          { name: 'Master Data Hub', path: '/master-data', icon: Database },
          { name: 'Customers', path: '/customers', icon: Users },
          { name: 'Suppliers', path: '/suppliers', icon: Truck },
          { name: 'Items & Panels', path: '/items', icon: Box },
          { name: 'Warehouses', path: '/warehouse', icon: Warehouse },
        ]
      },
      { name: 'Reports & Analytics', path: '/reports', icon: BarChart3 },
      { name: 'Settings', path: '/settings', icon: Settings },
      { name: 'User Management', path: '/user-management', icon: UserCog },
    ]
  }
];

export const DashboardLayout = () => {
  const location = useLocation();
  const isValidationView = location.pathname.startsWith('/document-processing/') && location.pathname !== '/document-processing';

  const [isMasterDataOpen, setIsMasterDataOpen] = useState(
    location.pathname.startsWith('/customers') ||
    location.pathname.startsWith('/suppliers') ||
    location.pathname.startsWith('/items') ||
    location.pathname.startsWith('/warehouse') ||
    location.pathname.startsWith('/master-data')
  );

  return (
    <div className="flex h-screen w-screen bg-slate-100/70 text-slate-900 font-sans overflow-hidden antialiased">
      {/* Refined Enterprise Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-200 border-r border-slate-800/80 flex flex-col shrink-0 z-30 select-none">
        {/* Brand Header */}
        <div className="h-16 flex items-center px-5 border-b border-slate-800/80 bg-slate-950/50">
          <Link to="/" className="flex items-center gap-3 w-full">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-xs shadow-sm ring-1 ring-indigo-400/30">
              INF
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-white tracking-tight leading-none">INFRATECH</span>
                <span className="text-[9px] font-mono font-bold bg-slate-800 text-indigo-300 px-1.5 py-0.5 rounded">FZ LLC</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium mt-0.5 truncate">PO Automation & Sage 300</p>
            </div>
          </Link>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 overflow-y-auto py-4 custom-scrollbar px-3 space-y-5">
          {navSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1">
              <span className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                {section.title}
              </span>
              {section.items.map((item) => {
                const Icon = item.icon;
                
                if (item.subItems) {
                  const isAnySubActive = item.subItems.some(sub => 
                    location.pathname === sub.path || location.pathname.startsWith(sub.path + '/')
                  );

                  return (
                    <div key={item.name} className="pt-0.5">
                      <button 
                        onClick={() => setIsMasterDataOpen(!isMasterDataOpen)}
                        className={`flex items-center w-full px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
                          isAnySubActive ? 'text-slate-200 bg-slate-800/60' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                        }`}
                      >
                        <Icon className="w-4 h-4 mr-2.5 shrink-0 text-slate-500" />
                        <span className="flex-1 text-left">{item.name}</span>
                        <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${isMasterDataOpen ? 'rotate-180 text-slate-300' : ''}`} />
                      </button>
                      {isMasterDataOpen && (
                        <div className="mt-1 space-y-0.5 pl-6 border-l border-slate-800 ml-5">
                          {item.subItems.map((subItem) => {
                            const isSubActive = location.pathname === subItem.path || location.pathname.startsWith(subItem.path + '/');
                            return (
                              <Link 
                                key={subItem.name}
                                to={subItem.path}
                                className={`flex items-center px-3 py-1.5 text-xs rounded-md transition-colors ${
                                  isSubActive
                                    ? 'bg-indigo-600/20 text-indigo-300 font-bold' 
                                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                                }`}
                              >
                                {subItem.name}
                              </Link>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                const isActive = location.pathname === item.path || 
                  (item.path !== '/' && location.pathname.startsWith(item.path + '/')) ||
                  (item.path === '/document-processing' && location.pathname.startsWith('/document-processing'));

                return (
                  <Link 
                    key={item.name}
                    to={item.path!} 
                    className={`flex items-center px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-2xs font-bold' 
                        : 'text-slate-400 hover:bg-slate-800/70 hover:text-slate-200'
                    }`}
                  >
                    <Icon className={`w-4 h-4 mr-2.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
        
        {/* User Context Footer */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/40">
          <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-800/40 border border-slate-800">
            <div className="w-7 h-7 rounded-md bg-indigo-700 flex items-center justify-center text-white text-xs font-bold shrink-0 font-mono">
              BP
            </div>
            <div className="text-left flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-200 truncate">Bhavani Prasad</p>
              <p className="text-[10px] text-slate-400 truncate">Commercial Manager</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Header - Hidden in Full Validation Split View */}
        {!isValidationView && (
          <header className="h-14 bg-white border-b border-slate-200/80 flex items-center justify-between px-6 shrink-0 z-10 sticky top-0 shadow-2xs">
            <div className="flex items-center gap-4 flex-1">
              {/* Search Input */}
              <div className="max-w-md w-full hidden md:block relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search POs (e.g. 4517145590), Quotes, or SKUs..." 
                  className="w-full pl-9 pr-8 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:bg-white focus:border-indigo-500 outline-none transition-all"
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 bg-slate-200/60 px-1 py-0.5 rounded">⌘K</span>
              </div>

              {/* Plant & Entity Context */}
              <div className="hidden xl:flex items-center gap-2 text-xs text-slate-500 border-l border-slate-200 pl-4">
                <Building className="w-3.5 h-3.5 text-slate-400" />
                <span>Plant: <strong className="text-slate-700 font-semibold">Ras Al Khaimah Works</strong></span>
                <span className="text-slate-300">•</span>
                <span>Sage 300: <strong className="text-slate-700 font-semibold">Co. 11975</strong></span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-md border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Sage 300 Connected
              </span>
              <button className="p-1.5 relative text-slate-400 hover:text-slate-600 transition-colors rounded-lg hover:bg-slate-100" title="Notifications">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
              </button>
            </div>
          </header>
        )}
        
        {/* Page Container */}
        {isValidationView ? (
          <div className="flex-1 flex flex-col min-h-0 w-full overflow-hidden bg-slate-100">
            <Outlet />
          </div>
        ) : (
          <div className="flex-1 overflow-auto bg-slate-50/70 custom-scrollbar">
            <div className="max-w-7xl mx-auto w-full p-6 lg:p-8">
              <Outlet />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
