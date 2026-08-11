import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  FileText, 
  Files,
  DownloadCloud,
  Database,
  Package, 
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
  ChevronDown
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Quotations', path: '/quotations', icon: MessageSquare },
  { name: 'Purchase Orders', path: '/purchase-orders', icon: ShoppingCart },
  { name: 'Sales Orders', path: '/sales-orders', icon: FileText },
  { name: 'Document Collection', path: '/document-collection', icon: DownloadCloud },
  { name: 'Document Processing', path: '/document-processing', icon: Files },
  { name: 'Inventory', path: '/inventory', icon: Package },
  { 
    name: 'Master Data', 
    icon: Database,
    subItems: [
      { name: 'Customers', path: '/customers', icon: Users },
      { name: 'Suppliers', path: '/suppliers', icon: Truck },
      { name: 'Items', path: '/items', icon: Box },
      { name: 'Warehouse', path: '/warehouse', icon: Warehouse },
      { name: 'Master Data Hub', path: '/master-data', icon: Database },
    ]
  },
  { name: 'Reports', path: '/reports', icon: BarChart3 },
  { name: 'Exception Queue', path: '/exception-queue', icon: AlertCircle },
  { name: 'ERP Integration', path: '/erp-integration', icon: Network },
  { name: 'Audit Logs', path: '/audit-logs', icon: ClipboardList },
  { name: 'Settings', path: '/settings', icon: Settings },
  { name: 'User Management', path: '/user-management', icon: UserCog },
];

export const DashboardLayout = () => {
  const location = useLocation();
  const [isMasterDataOpen, setIsMasterDataOpen] = useState(
    location.pathname.startsWith('/customers') ||
    location.pathname.startsWith('/suppliers') ||
    location.pathname.startsWith('/items') ||
    location.pathname.startsWith('/warehouse') ||
    location.pathname.startsWith('/master-data')
  );

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Complete Full-Featured Sidebar */}
      <aside className="w-64 bg-slate-900 text-white border-r border-slate-800 flex-col hidden lg:flex shadow-2xl z-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-purple-500/10 pointer-events-none"></div>
        <div className="h-16 flex items-center px-6 border-b border-slate-800/60 relative z-10 backdrop-blur-sm bg-slate-900/50">
          <Link to="/" className="flex items-center gap-3 group w-full">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-black text-white text-xs shadow-md group-hover:scale-105 transition-transform">
              iAT
            </div>
            <div>
              <p className="font-bold text-sm tracking-tight text-white leading-tight">INFRATECH</p>
              <p className="text-[10px] text-indigo-400 font-semibold tracking-wider uppercase">PO Automation</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 custom-scrollbar relative z-10">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              
              if (item.subItems) {
                return (
                  <li key={item.name} className="pt-0.5 pb-0.5">
                    <button 
                      onClick={() => setIsMasterDataOpen(!isMasterDataOpen)}
                      className="flex items-center w-full px-3 py-2 text-xs font-semibold rounded-xl transition-all duration-200 group text-slate-400 hover:bg-slate-800/80 hover:text-slate-100 border border-transparent"
                    >
                      <Icon className="w-4 h-4 mr-3 flex-shrink-0 text-slate-500 group-hover:text-indigo-300 transition-colors" />
                      <span className="flex-1 text-left">{item.name}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMasterDataOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isMasterDataOpen && (
                      <ul className="mt-1 space-y-1 pl-10 relative before:absolute before:left-5 before:top-0 before:bottom-3 before:w-px before:bg-slate-700">
                        {item.subItems.map((subItem) => {
                          const isSubActive = location.pathname === subItem.path || location.pathname.startsWith(subItem.path + '/');
                          return (
                            <li key={subItem.name} className="relative">
                              <div className="absolute left-[-20px] top-1/2 w-2.5 h-px bg-slate-700"></div>
                              <Link 
                                to={subItem.path}
                                className={`flex items-center px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                                  isSubActive
                                    ? 'bg-indigo-500/20 text-indigo-300 font-bold' 
                                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                                }`}
                              >
                                {subItem.name}
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </li>
                );
              }

              const isActive = location.pathname === item.path || 
                (item.path !== '/' && location.pathname.startsWith(item.path + '/')) ||
                (item.path === '/document-processing' && location.pathname.startsWith('/document-processing'));

              return (
                <li key={item.name}>
                  <Link 
                    to={item.path!} 
                    className={`flex items-center px-3 py-2 text-xs font-semibold rounded-xl transition-all duration-200 group ${
                      isActive
                        ? 'bg-indigo-500/20 text-indigo-300 shadow-sm border border-indigo-500/20 font-bold' 
                        : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-100 border border-transparent'
                    }`}
                  >
                    <Icon className={`w-4 h-4 mr-3 flex-shrink-0 transition-transform duration-200 ${isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-indigo-300'}`} />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        {/* User profile at bottom */}
        <div className="p-3 border-t border-slate-800/80 relative z-10 bg-slate-900/80">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-800/60 border border-slate-800">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
              BP
            </div>
            <div className="text-left flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-200 leading-none truncate">Bhavani Prasad</p>
              <p className="text-[10px] text-slate-400 mt-1 font-medium truncate">Commercial Manager</p>
            </div>
            <Settings className="w-3.5 h-3.5 text-slate-500" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-8 shrink-0 z-10 shadow-xs sticky top-0">
          <div className="flex items-center flex-1">
            <div className="max-w-md w-full hidden md:block relative group">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search POs, Quotations, Items, or ERP records..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-transparent rounded-xl text-xs font-medium focus:bg-white focus:border-indigo-500 outline-none transition-all shadow-xs"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-md border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Sage 300 ERP Live
            </span>
            <button className="p-2 relative text-slate-400 hover:text-indigo-600 transition-all rounded-full hover:bg-indigo-50">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>
        
        {/* Page Content */}
        <div className="flex-1 overflow-auto bg-slate-50 relative">
          <div className="max-w-7xl mx-auto w-full p-6 lg:p-8">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};
