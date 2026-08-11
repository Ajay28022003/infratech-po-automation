import { Link } from 'react-router-dom';
import { 
  Package, ShoppingCart, Users, Activity, TrendingUp, Bell, 
  Files, FileWarning, Link2, CheckCircle2, Clock, XCircle 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

import { StatisticCard } from '../components/ui/StatisticCard';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { DataTable, type Column } from '../components/ui/DataTable';

const poTrendData = [
  { name: 'Mon', value: 14 }, { name: 'Tue', value: 22 }, { name: 'Wed', value: 18 }, 
  { name: 'Thu', value: 31 }, { name: 'Fri', value: 27 }, { name: 'Sat', value: 8 }, { name: 'Sun', value: 5 }
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
}

const recentPOs: PurchaseOrder[] = [
  { id: '4517145590', customer: 'M/s. EATON FZE', status: 'Processed', time: '10 mins ago', salesOrder: 'SO-S00006715', scenarioRef: 'Scenario 1: Price List Match' },
  { id: 'PO-VD-44192', customer: 'M/s. Verger Delporte UAE Ltd', status: 'Processed', time: '45 mins ago', salesOrder: 'SO-S00007526', scenarioRef: 'Scenario 2: Quote ENQ-26-E-0164' },
  { id: 'PO-CSO-9912', customer: 'M/s. CAN SERV OIL & GAS', status: 'Processed', time: '1 hr ago', salesOrder: 'SO-S00007469', scenarioRef: 'Scenario 3: NLP Description Match' },
  { id: 'PO-EN-7296', customer: 'M/s. ENCOM TRADING LLC', status: 'Processed', time: '2 hrs ago', salesOrder: 'SO-S00007296', scenarioRef: 'Scenario 4: Customer Part Map' },
  { id: 'PO-AS-10492', customer: 'M/s. Al Shariq Switchgear', status: 'Pending', time: '3 hrs ago', salesOrder: 'Pending Review', scenarioRef: 'Manual Scan Hotfolder' },
];

const columns: Column<PurchaseOrder>[] = [
  { 
    header: 'PO Number', 
    accessor: (row) => (
      <Link to={`/document-processing/${row.id}`} className="font-bold text-indigo-600 hover:underline font-mono text-xs">
        {row.id}
      </Link>
    ) 
  },
  { 
    header: 'Customer & Scenario', 
    accessor: (row) => (
      <div>
        <p className="font-bold text-slate-900 text-xs">{row.customer}</p>
        <span className="text-[10px] text-slate-500">{row.scenarioRef}</span>
      </div>
    )
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
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold border ${color} shadow-xs whitespace-nowrap`}>
          <Icon className="w-3 h-3" /> {row.status}
        </span>
      );
    } 
  },
  { header: 'Ingested Time', accessor: 'time', className: 'text-xs font-medium text-slate-500' },
  { header: 'Sage 300 Order', accessor: 'salesOrder', className: 'font-mono text-xs font-bold text-indigo-700' },
];

export const Dashboard = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">INFRATECH Commercial Operations Dashboard</h1>
          <p className="text-slate-500 mt-1 font-medium text-sm">Real-time monitoring for AI-driven customer PO ingestion, quotation cross-matching, and Sage 300 ERP creation.</p>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <StatisticCard 
          title="Inbound POs Received" value="125" trend="+14.2%" isPositive={true} trendLabel="This month"
          icon={ShoppingCart} colorClass="text-indigo-600" bgClass="bg-indigo-50" borderClass="border-indigo-100" gradientClass="from-indigo-500/20 to-indigo-500/5"
        />
        <StatisticCard 
          title="OCR Processing Queue" value="4 Active" trend="Instant parsing" isPositive={true} trendLabel="99.2% Accuracy"
          icon={Files} colorClass="text-blue-600" bgClass="bg-blue-50" borderClass="border-blue-100" gradientClass="from-blue-500/20 to-blue-500/5"
        />
        <StatisticCard 
          title="Sage 300 Orders Created" value="118" trend="AED 219,265" isPositive={true} trendLabel="100% Synced"
          icon={Package} colorClass="text-emerald-600" bgClass="bg-emerald-50" borderClass="border-emerald-100" gradientClass="from-emerald-500/20 to-emerald-500/5"
        />
        <StatisticCard 
          title="Pending Commercial Approval" value="1 PO" trend="Bhavani Prasad" isPositive={true} trendLabel="Single-level"
          icon={Activity} colorClass="text-amber-600" bgClass="bg-amber-50" borderClass="border-amber-100" gradientClass="from-amber-500/20 to-amber-500/5"
        />
        <StatisticCard 
          title="Price & Item Variances" value="0 Critical" trend="Resolved via AI" isPositive={true} trendLabel="Auto-mapped"
          icon={FileWarning} colorClass="text-emerald-600" bgClass="bg-emerald-50" borderClass="border-emerald-100" gradientClass="from-emerald-500/20 to-emerald-500/5"
        />
        <StatisticCard 
          title="Sage 300 ERP Live Gateway" value="Online" trend="Latency: 45ms" isPositive={true} trendLabel="Company 11975"
          icon={Link2} colorClass="text-purple-600" bgClass="bg-purple-50" borderClass="border-purple-100" gradientClass="from-purple-500/20 to-purple-500/5"
        />
      </div>

      {/* Quick Actions */}
      <section>
        <h2 className="text-base font-bold text-slate-800 mb-3">Workflow Quick Launch</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Scenario 1: Price List Match', desc: 'EATON FZE (PO 4517145590)', path: '/document-processing/PO-4517145590', color: 'text-indigo-700', bg: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200' },
            { label: 'Scenario 2: Quotation Match', desc: 'Verger Delporte (PO-VD-44192)', path: '/document-processing/PO-VD-44192', color: 'text-emerald-700', bg: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200' },
            { label: 'Scenario 3: NLP Text Matching', desc: 'Can Serv Oil (PO-CSO-9912)', path: '/document-processing/PO-CSO-9912', color: 'text-amber-700', bg: 'bg-amber-50 hover:bg-amber-100 border-amber-200' },
            { label: 'Scenario 4: Part Cross-Match', desc: 'Encom Trading (PO-EN-7296)', path: '/document-processing/PO-EN-7296', color: 'text-purple-700', bg: 'bg-purple-50 hover:bg-purple-100 border-purple-200' },
          ].map((action, idx) => (
            <Link to={action.path} key={idx} className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${action.bg} flex flex-col justify-between`}>
              <span className={`text-xs font-bold ${action.color}`}>{action.label}</span>
              <p className="text-[11px] text-slate-600 mt-1 font-mono">{action.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Analytics Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-600" /> Weekly Customer PO Volume
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[280px]">
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
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
                <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-600" /> Order Value Breakdown by Customer (AED)
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[280px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={customerDistributionData} cx="50%" cy="50%" innerRadius={70} outerRadius={95} paddingAngle={4} dataKey="value" stroke="none">
                  {customerDistributionData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none' }} formatter={(val: any) => `AED ${val?.toLocaleString()}`} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>

      {/* Bottom Section: Table and Timeline */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Files className="w-4 h-4 text-indigo-600" /> Recent Inbound Customer Orders
            </CardTitle>
            <Link to="/document-processing" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors">View All Inbound Queue</Link>
          </CardHeader>
          <CardContent className="p-0">
            <DataTable data={recentPOs} columns={columns} keyExtractor={(row) => row.id} />
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Bell className="w-4 h-4 text-purple-600" /> Audit & Ingestion Trail
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              {[
                { title: 'PO 4517145590 posted to Sage 300 (SO-S00006715)', time: '10 mins ago', type: 'success' },
                { title: 'Quotation ENQ-26-E-0164 verified for Verger Delporte', time: '45 mins ago', type: 'success' },
                { title: 'NLP mapped Can Serv PO text to INF-DB-2000-1423-A', time: '1 hr ago', type: 'info' },
                { title: 'Part ER-ENC-200 cross-matched to INF-ENC-2R16M', time: '2 hrs ago', type: 'info' },
                { title: 'Hotfolder scan imported from \\\\INFRATECH-RAK', time: '3 hrs ago', type: 'default' },
              ].map((activity, i) => (
                <div key={i} className="flex gap-3 relative">
                  <div className="relative mt-1 shrink-0">
                    <div className={`w-2.5 h-2.5 rounded-full ${activity.type === 'success' ? 'bg-emerald-500' : activity.type === 'info' ? 'bg-indigo-500' : 'bg-slate-400'}`}></div>
                  </div>
                  <div className="flex-1 bg-slate-50 p-2 rounded-lg">
                    <p className="text-xs font-bold text-slate-800">{activity.title}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{activity.time}</p>
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
