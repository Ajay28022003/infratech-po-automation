import { Link } from 'react-router-dom';
import { 
  Package, ShoppingCart, Users, Activity, TrendingUp, Bell, 
  Files, Link2, CheckCircle2, Clock, XCircle, ArrowRight, ShieldCheck, 
  FileSpreadsheet, MessageSquare, Layers, ArrowRightLeft, Download, Plus 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
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
  { name: 'Encom Trading', value: 18600 },
];
const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ec4899'];

interface PurchaseOrder {
  id: string;
  customer: string;
  status: string;
  time: string;
  salesOrder: string;
  scenarioRef: string;
  totalAmount: string;
}

const recentPOs: PurchaseOrder[] = [
  { id: '4517145590', customer: 'M/s. EATON FZE', status: 'Processed', time: '10 mins ago', salesOrder: 'SO-S00006715', scenarioRef: 'Scenario 1: Price List Match', totalAmount: 'AED 64,682.00' },
  { id: 'PO-VD-44192', customer: 'M/s. Verger Delporte UAE Ltd', status: 'Processed', time: '45 mins ago', salesOrder: 'SO-S00007526', scenarioRef: 'Scenario 2: Quote ENQ-26-E-0164', totalAmount: 'AED 28,831.00' },
  { id: 'PO-CSO-9912', customer: 'M/s. CAN SERV OIL & GAS', status: 'Processed', time: '1 hr ago', salesOrder: 'SO-S00007469', scenarioRef: 'Scenario 3: NLP Description Match', totalAmount: 'AED 107,152.00' },
  { id: 'PO-EN-7296', customer: 'M/s. ENCOM TRADING LLC', status: 'Processed', time: '2 hrs ago', salesOrder: 'SO-S00007296', scenarioRef: 'Scenario 4: Customer Part Map', totalAmount: 'AED 520.80' },
  { id: 'PO-AS-10492', customer: 'M/s. Al Shariq Switchgear', status: 'Pending', time: '3 hrs ago', salesOrder: 'Pending Review', scenarioRef: 'Manual Scan Hotfolder', totalAmount: 'AED 42,500.00' },
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
    header: 'Customer / Buyer', 
    accessor: (row) => (
      <div>
        <p className="font-bold text-slate-900 text-xs">{row.customer}</p>
        <span className="text-[10px] text-slate-500">{row.scenarioRef}</span>
      </div>
    )
  },
  { 
    header: 'Order Value', 
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
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold border ${color} shadow-xs whitespace-nowrap`}>
          <Icon className="w-3.5 h-3.5" /> {row.status}
        </span>
      );
    } 
  },
  { header: 'Received', accessor: 'time', className: 'text-xs text-slate-500' },
  { header: 'Sage 300 Order', accessor: 'salesOrder', className: 'font-mono text-xs font-bold text-indigo-700' },
];

export const Dashboard = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Executive Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800 tracking-tight">
            Commercial Operations Dashboard
          </h1>
          <p className="text-slate-500 mt-1 font-medium text-sm">
            AI-driven customer PO ingestion, master data cross-referencing & Sage 300 ERP sync for Infratech FZ LLC.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 shadow-sm transition-all">
            <Download className="w-4 h-4 text-slate-400" /> Export Summary
          </button>
          <Link 
            to="/document-processing"
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" /> Ingest New PO
          </Link>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <StatisticCard 
          title="Inbound Purchase Orders" value="1,248" trend="+12.5%" isPositive={true} trendLabel="vs last week"
          icon={ShoppingCart} colorClass="text-indigo-600" bgClass="bg-indigo-50" borderClass="border-indigo-100" gradientClass="from-indigo-500/20 to-indigo-500/5"
        />
        <StatisticCard 
          title="OCR Processing Queue" value="4 Active" trend="0.85s Speed" isPositive={true} trendLabel="99.2% Accuracy"
          icon={Files} colorClass="text-blue-600" bgClass="bg-blue-50" borderClass="border-blue-100" gradientClass="from-blue-500/20 to-blue-500/5"
        />
        <StatisticCard 
          title="Sage 300 Orders Posted" value="1,190" trend="+8.2%" isPositive={true} trendLabel="AED 219,265"
          icon={Package} colorClass="text-emerald-600" bgClass="bg-emerald-50" borderClass="border-emerald-100" gradientClass="from-emerald-500/20 to-emerald-500/5"
        />
        <StatisticCard 
          title="Pending Sign-Off" value="1 PO" trend="Bhavani Prasad" isPositive={true} trendLabel="Single-level"
          icon={Activity} colorClass="text-amber-600" bgClass="bg-amber-50" borderClass="border-amber-100" gradientClass="from-amber-500/20 to-amber-500/5"
        />
        <StatisticCard 
          title="Price & Item Variances" value="0 Blockers" trend="Auto-resolved" isPositive={true} trendLabel="Rules Engine"
          icon={ShieldCheck} colorClass="text-emerald-600" bgClass="bg-emerald-50" borderClass="border-emerald-100" gradientClass="from-emerald-500/20 to-emerald-500/5"
        />
        <StatisticCard 
          title="ERP Gateway Connectivity" value="Live (11975)" trend="45ms Latency" isPositive={true} trendLabel="100% Synced"
          icon={Link2} colorClass="text-purple-600" bgClass="bg-purple-50" borderClass="border-purple-100" gradientClass="from-purple-500/20 to-purple-500/5"
        />
      </div>

      {/* Quick Launch Scenario Workflows */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Commercial Verification Scenarios</h2>
            <p className="text-xs text-slate-500">Select any scenario to open the real document split-screen workspace</p>
          </div>
          <Link to="/document-processing" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
            View All Inbound Queue →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { 
              title: 'Scenario 1: Price List Match', 
              buyer: 'M/s. EATON FZE', 
              po: 'PO 4517145590', 
              desc: 'Contract Price List match without prior quote (AED 64,682.00)',
              path: '/document-processing/PO-4517145590',
              icon: FileSpreadsheet,
              iconBg: 'bg-indigo-50 text-indigo-600',
              accent: 'hover:border-indigo-300'
            },
            { 
              title: 'Scenario 2: Quotation Match', 
              buyer: 'M/s. Verger Delporte UAE', 
              po: 'PO-VD-44192', 
              desc: 'Quote ENQ-26-E-0164 match + 10% ex-works surcharge (AED 28,831.00)',
              path: '/document-processing/PO-VD-44192',
              icon: MessageSquare,
              iconBg: 'bg-emerald-50 text-emerald-600',
              accent: 'hover:border-emerald-300'
            },
            { 
              title: 'Scenario 3: NLP Text Matching', 
              buyer: 'M/s. CAN SERV OIL & GAS', 
              po: 'PO-CSO-9912', 
              desc: 'Freeform panel text mapped to SKU INF-DB-2000-1423-A (AED 107,152.00)',
              path: '/document-processing/PO-CSO-9912',
              icon: Layers,
              iconBg: 'bg-amber-50 text-amber-600',
              accent: 'hover:border-amber-300'
            },
            { 
              title: 'Scenario 4: Part Cross-Match', 
              buyer: 'M/s. ENCOM TRADING LLC', 
              po: 'PO-EN-7296', 
              desc: 'Customer code EG30119 mapped to SKU INF-ENC-2R16M (AED 520.80)',
              path: '/document-processing/PO-EN-7296',
              icon: ArrowRightLeft,
              iconBg: 'bg-purple-50 text-purple-600',
              accent: 'hover:border-purple-300'
            },
          ].map((sc, idx) => {
            const Icon = sc.icon;
            return (
              <Link 
                to={sc.path} 
                key={idx} 
                className={`p-5 rounded-2xl bg-white border border-slate-200 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group ${sc.accent}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2.5 rounded-xl ${sc.iconBg}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      {sc.po}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{sc.title}</h3>
                  <p className="text-xs font-semibold text-slate-700 mt-1">{sc.buyer}</p>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{sc.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
                  <span>Open Split-Screen</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Analytics Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-xl shadow-slate-200/40">
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-500" /> Weekly PO Volume Trend
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={poTrendData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-xl shadow-slate-200/40">
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-500" /> Order Value Breakdown by Customer (AED)
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={customerDistributionData} cx="50%" cy="50%" innerRadius={75} outerRadius={105} paddingAngle={4} dataKey="value" stroke="none">
                  {customerDistributionData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} formatter={(val: any) => `AED ${val?.toLocaleString()}`} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>

      {/* Bottom Section: Table and Timeline */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2 shadow-xl shadow-slate-200/40">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Files className="w-5 h-5 text-indigo-500" /> Recent Inbound Customer Purchase Orders
            </CardTitle>
            <Link to="/document-processing" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
              View All Queue →
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <DataTable data={recentPOs} columns={columns} keyExtractor={(row) => row.id} />
          </CardContent>
        </Card>

        <Card className="shadow-xl shadow-slate-200/40">
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Bell className="w-5 h-5 text-purple-500" /> Recent Audit Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {[
                { title: 'PO 4517145590 posted to Sage 300 (SO-S00006715)', time: '10 mins ago', type: 'success' },
                { title: 'Quotation ENQ-26-E-0164 verified for Verger Delporte', time: '45 mins ago', type: 'success' },
                { title: 'NLP mapped Can Serv PO text to INF-DB-2000-1423-A', time: '1 hr ago', type: 'info' },
                { title: 'Part ER-ENC-200 cross-matched to INF-ENC-2R16M', time: '2 hrs ago', type: 'info' },
                { title: 'Hotfolder scan imported from \\\\INFRATECH-RAK', time: '3 hrs ago', type: 'default' },
              ].map((activity, i) => (
                <div key={i} className="flex gap-3 group cursor-pointer relative">
                  <div className="relative mt-1 shrink-0">
                    <div className={`w-3 h-3 rounded-full relative z-10 ${activity.type === 'success' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : activity.type === 'info' ? 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]' : 'bg-slate-400'}`}></div>
                    {i !== 4 && <div className="absolute top-3 left-1.5 bottom-[-24px] w-px bg-slate-200 -translate-x-1/2"></div>}
                  </div>
                  <div className="flex-1 bg-slate-50/70 p-3 rounded-xl transition-all duration-200 group-hover:bg-indigo-50/50">
                    <p className="text-xs font-bold text-slate-800">{activity.title}</p>
                    <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};
