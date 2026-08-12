import { Link } from 'react-router-dom';
import { 
  Package, ShoppingCart, CheckCircle2, Clock, XCircle, ArrowRight, ShieldCheck, 
  FileSpreadsheet, MessageSquare, Layers, ArrowRightLeft, Download, Plus, Zap
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

import { StatisticCard } from '../components/ui/StatisticCard';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { DataTable, type Column } from '../components/ui/DataTable';

const poTrendData = [
  { name: 'Mon', value: 120 }, { name: 'Tue', value: 180 }, { name: 'Wed', value: 150 }, 
  { name: 'Thu', value: 240 }, { name: 'Fri', value: 290 }, { name: 'Sat', value: 110 }, { name: 'Sun', value: 90 }
];

const customerDistributionData = [
  { name: 'EATON FZE', value: 64682 },
  { name: 'Verger Delporte', value: 28831 },
  { name: 'Can Serv Oil', value: 107152 },
  { name: 'Encom Trading', value: 520.8 },
];
const COLORS = ['#4f46e5', '#059669', '#d97706', '#7c3aed'];

interface PurchaseOrder {
  id: string;
  customer: string;
  status: string;
  time: string;
  salesOrder: string;
  sourceType: string;
  totalAmount: string;
}

const recentPOs: PurchaseOrder[] = [
  { id: '4517145590', customer: 'EATON FZE', status: 'Processed', time: '10 mins ago', salesOrder: 'SO-S00006715', sourceType: 'Contract Price List', totalAmount: 'AED 64,682.00' },
  { id: 'PO-VD-44192', customer: 'Verger Delporte UAE Ltd', status: 'Processed', time: '45 mins ago', salesOrder: 'SO-S00007526', sourceType: 'Quote ENQ-26-E-0164', totalAmount: 'AED 28,831.00' },
  { id: 'PO-CSO-9912', customer: 'Can Serv Oil & Gas', status: 'Processed', time: '1 hr ago', salesOrder: 'SO-S00007469', sourceType: 'Email Quote Match', totalAmount: 'AED 107,152.00' },
  { id: 'PO-EN-7296', customer: 'Encom Trading LLC', status: 'Processed', time: '2 hrs ago', salesOrder: 'SO-S00007296', sourceType: 'Part Code Mapping', totalAmount: 'AED 520.80' },
  { id: 'PO-AS-10492', customer: 'Al Shariq Switchgear', status: 'Pending', time: '3 hrs ago', salesOrder: 'Pending Review', sourceType: 'Standard Ingestion', totalAmount: 'AED 42,500.00' },
];

const columns: Column<PurchaseOrder>[] = [
  { 
    header: 'PO Number', 
    accessor: (row) => (
      <Link to={`/document-processing/${row.id}`} className="font-bold text-indigo-600 hover:text-indigo-800 hover:underline font-mono text-xs">
        {row.id}
      </Link>
    ) 
  },
  { 
    header: 'Customer', 
    accessor: (row) => (
      <div>
        <p className="font-bold text-slate-900 text-xs">{row.customer}</p>
        <span className="text-[11px] text-slate-500">{row.sourceType}</span>
      </div>
    )
  },
  { 
    header: 'Amount', 
    accessor: 'totalAmount', 
    className: 'font-mono text-xs font-bold text-slate-800' 
  },
  { 
    header: 'Status', 
    accessor: (row) => {
      const isSuccess = row.status === 'Processed';
      const isPending = row.status === 'Pending';
      const Icon = isSuccess ? CheckCircle2 : (isPending ? Clock : XCircle);
      const color = isSuccess ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 
                   (isPending ? 'text-amber-700 bg-amber-50 border-amber-200' : 'text-rose-700 bg-rose-50 border-rose-200');
      return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-semibold border ${color} whitespace-nowrap`}>
          <Icon className="w-3.5 h-3.5" /> {row.status}
        </span>
      );
    } 
  },
  { header: 'Received', accessor: 'time', className: 'text-xs text-slate-500' },
  { header: 'Sales Order (Sage 300)', accessor: 'salesOrder', className: 'font-mono text-xs font-semibold text-indigo-700' },
];

const orderCards = [
  { 
    title: 'Contract Price List', 
    tag: 'Contract',
    buyer: 'EATON FZE', 
    po: 'PO 4517145590', 
    desc: 'Matched against contracted Tier 2 master price list.',
    amount: 'AED 64,682.00',
    path: '/document-processing/PO-4517145590',
    icon: FileSpreadsheet,
    tagBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  },
  { 
    title: 'Quotation Match', 
    tag: 'Quote Match',
    buyer: 'Verger Delporte UAE', 
    po: 'PO-VD-44192', 
    desc: '8 enclosure items matched to Quote ENQ-26-E-0164 (+10% surcharge).',
    amount: 'AED 28,831.00',
    path: '/document-processing/PO-VD-44192',
    icon: MessageSquare,
    tagBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  { 
    title: 'Item Text Match', 
    tag: 'Text Match',
    buyer: 'Can Serv Oil & Gas', 
    po: 'PO-CSO-9912', 
    desc: 'Description matched to panel SKU INF-DB-2000-1423.',
    amount: 'AED 107,152.00',
    path: '/document-processing/PO-CSO-9912',
    icon: Layers,
    tagBg: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  { 
    title: 'Part Code Cross-Match', 
    tag: 'Part Map',
    buyer: 'Encom Trading LLC', 
    po: 'PO-EN-7296', 
    desc: 'Customer code EG30119 mapped to SKU INF-ENC-2R16M.',
    amount: 'AED 520.80',
    path: '/document-processing/PO-EN-7296',
    icon: ArrowRightLeft,
    tagBg: 'bg-purple-50 text-purple-700 border-purple-200',
  },
];

export const Dashboard = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-slate-500 mt-0.5 text-xs">
            Customer order processing, quote matching, and Sage 300 ERP sync.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 shadow-2xs transition-all">
            <Download className="w-3.5 h-3.5 text-slate-400" /> Export Summary
          </button>
          <Link 
            to="/document-processing"
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 shadow-2xs transition-all"
          >
            <Plus className="w-3.5 h-3.5" /> Ingest PO
          </Link>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatisticCard 
          title="Inbound Orders" 
          value="1,248" 
          trend="+12.5%" 
          isPositive={true} 
          trendLabel="vs last month"
          icon={ShoppingCart} 
          colorClass="text-indigo-600" 
          bgClass="bg-indigo-50"
        />
        <StatisticCard 
          title="Matched Rate" 
          value="99.4%" 
          subtitle="Quote & contract rate accuracy"
          icon={Zap} 
          colorClass="text-emerald-600" 
          bgClass="bg-emerald-50"
        />
        <StatisticCard 
          title="Pending Review" 
          value="4 Orders" 
          subtitle="Awaiting manager sign-off"
          icon={ShieldCheck} 
          colorClass="text-blue-600" 
          bgClass="bg-blue-50"
        />
        <StatisticCard 
          title="ERP Synced Total" 
          value="AED 219,265" 
          subtitle="Posted to Sage 300 ERP"
          icon={Package} 
          colorClass="text-purple-600" 
          bgClass="bg-purple-50"
        />
      </div>

      {/* Active Orders for Review */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Orders Ready for Review</h2>
            <p className="text-xs text-slate-500">Select an order to review line items, pricing, and terms against quotes.</p>
          </div>
          <Link to="/document-processing" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1">
            <span>View All ({orderCards.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {orderCards.map((sc, idx) => {
            const Icon = sc.icon;
            return (
              <Link 
                to={sc.path} 
                key={idx} 
                className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-xs hover:border-slate-300 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${sc.tagBg}`}>
                      {sc.tag}
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-800">{sc.amount}</span>
                  </div>

                  <h3 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{sc.buyer}</span>
                  </h3>
                  <p className="text-[11px] font-mono text-slate-500 mt-0.5">{sc.po}</p>
                  <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed line-clamp-2">{sc.desc}</p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-medium">{sc.title}</span>
                  <span className="font-semibold text-indigo-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    Review & Post →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Analytics Charts & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Volume Chart */}
        <Card className="lg:col-span-2 shadow-2xs">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Weekly Order Volume</CardTitle>
              <p className="text-xs text-slate-400 mt-0.5">Orders received and processed over the last 7 days</p>
            </div>
            <span className="text-[11px] font-mono font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
              Current Week
            </span>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={poTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="poColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', border: 'none', color: '#fff', fontSize: '11px' }}
                    itemStyle={{ color: '#818cf8' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={2} fillOpacity={1} fill="url(#poColor)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Revenue by Customer */}
        <Card className="shadow-2xs">
          <CardHeader>
            <CardTitle>Revenue by Customer</CardTitle>
            <p className="text-xs text-slate-400 mt-0.5">Current month volume distribution</p>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {customerDistributionData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    formatter={(value: any) => [`AED ${Number(value).toLocaleString()}`, 'Value']}
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', border: 'none', color: '#fff', fontSize: '11px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full space-y-1.5 pt-2 border-t border-slate-100 text-xs">
              {customerDistributionData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx] }}></span>
                    <span className="font-medium text-slate-800">{item.name}</span>
                  </div>
                  <span className="font-mono font-semibold text-slate-900">AED {item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="shadow-2xs">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Orders</CardTitle>
            <p className="text-xs text-slate-400 mt-0.5">Latest purchase orders and ERP sync status</p>
          </div>
          <Link to="/document-processing" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
            View All Orders →
          </Link>
        </CardHeader>
        <CardContent className="p-0 overflow-hidden">
          <DataTable data={recentPOs} columns={columns} keyExtractor={(row) => row.id} />
        </CardContent>
      </Card>
    </div>
  );
};
