import { useState } from 'react';
import { Package, AlertTriangle, XOctagon, DollarSign, PieChart as PieChartIcon, Layers, Plus, ScanLine, FileText } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { StatisticCard } from '../components/ui/StatisticCard';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { DataTable, type Column } from '../components/ui/DataTable';
import { Modal } from '../components/ui/Modal';

interface InventoryItem {
  id: string;
  sku: string;
  description: string;
  warehouse: string;
  available: number;
  reserved: number;
  minStock: number;
  maxStock: number;
  status: string;
}

const mockInventory: InventoryItem[] = [
  { id: '1', sku: 'XPSN22506B', description: 'xPowerS PB 250A Bot 6W TPN-NZM1/PDE1 OG', warehouse: 'Ras Al Khaimah Plant', available: 45, reserved: 15, minStock: 20, maxStock: 200, status: 'In Stock' },
  { id: '2', sku: 'XPSN22510B', description: 'xPowerS PB 250A Bot 10W TPN-NZM1/PDE1 OG', warehouse: 'Ras Al Khaimah Plant', available: 60, reserved: 28, minStock: 30, maxStock: 250, status: 'In Stock' },
  { id: '3', sku: 'XPSN22512B', description: 'xPowerS PB 250A Bot 12W TPN-NZM1/PDE1 OG', warehouse: 'Ras Al Khaimah Plant', available: 32, reserved: 18, minStock: 25, maxStock: 150, status: 'In Stock' },
  { id: '4', sku: 'IFC86/200+MP', description: '800H x 600W x 200D Compact Enclosure with MP', warehouse: 'JAFZA Logistics Park', available: 85, reserved: 27, minStock: 50, maxStock: 300, status: 'In Stock' },
  { id: '5', sku: 'IFC128/300+MP+SD', description: '1200H x 800W x 300D Single Door Compact Enclosure', warehouse: 'JAFZA Logistics Park', available: 40, reserved: 17, minStock: 20, maxStock: 150, status: 'In Stock' },
  { id: '6', sku: 'INF-DB-2000-1423-A', description: '2000H x 1423W x 331D Distribution Panel Enclosure IP55', warehouse: 'Ras Al Khaimah Plant', available: 12, reserved: 4, minStock: 10, maxStock: 50, status: 'In Stock' },
  { id: '7', sku: 'INF-ENC-2R16M', description: '1200H x 600W x 200D Single Door Compact Enclosure IP65', warehouse: 'Ras Al Khaimah Plant', available: 90, reserved: 35, minStock: 40, maxStock: 400, status: 'In Stock' },
];

const distributionData = [
  { name: 'Ras Al Khaimah Plant', value: 3200000, fill: '#6366f1' },
  { name: 'JAFZA Logistics Park', value: 1850000, fill: '#14b8a6' },
  { name: 'Abu Dhabi Hub', value: 750000, fill: '#f59e0b' },
];
const COLORS = ['#6366f1', '#14b8a6', '#f59e0b'];

const columns: Column<InventoryItem>[] = [
  { 
    header: 'Infratech SKU & Description', 
    accessor: (row) => (
      <div className="flex flex-col">
        <span className="font-bold text-indigo-600 font-mono text-xs">
          {row.sku}
        </span>
        <span className="text-xs text-slate-600 font-medium">{row.description}</span>
      </div>
    ) 
  },
  { header: 'Warehouse Location', accessor: 'warehouse', className: 'font-semibold text-slate-700 text-xs' },
  { 
    header: 'Stock Levels', 
    accessor: (row) => (
      <div className="flex flex-col text-right">
        <span className="text-xs font-bold text-slate-800">{row.available} Available</span>
        <span className="text-[11px] font-medium text-slate-500 font-mono">{row.reserved} Reserved</span>
      </div>
    ),
    className: 'text-right'
  },
  { 
    header: 'Min/Max Limit', 
    accessor: (row) => (
      <span className="text-xs font-medium text-slate-600 font-mono">{row.minStock} / {row.maxStock}</span>
    ),
    className: 'text-right'
  },
  { 
    header: 'Status', 
    accessor: (row) => (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-bold border text-emerald-700 bg-emerald-50 border-emerald-200 shadow-xs whitespace-nowrap">
        {row.status}
      </span>
    ) 
  },
];

export const Inventory = () => {
  const [isReceiveModalOpen, setIsReceiveModalOpen] = useState(false);
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Enclosures & Switchgear Inventory</h1>
          <p className="text-slate-500 mt-1 font-medium text-sm">Real-time stock availability for Infratech electrical enclosures, panels, and busbar assemblies.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsReceiveModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5">
            <Plus className="w-4 h-4" /> Receive Inbound Stock
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatisticCard 
          title="Total Stock Value" value="AED 5.8M" trend="+4.2%" isPositive={true} trendLabel="vs last month"
          icon={DollarSign} colorClass="text-emerald-500" bgClass="bg-emerald-50" borderClass="border-emerald-100" gradientClass="from-emerald-500/20 to-emerald-500/5"
        />
        <StatisticCard 
          title="Active Switchgear SKUs" value="482" trend="+8 New" isPositive={true} trendLabel="Catalog items"
          icon={Package} colorClass="text-indigo-500" bgClass="bg-indigo-50" borderClass="border-indigo-100" gradientClass="from-indigo-500/20 to-indigo-500/5"
        />
        <StatisticCard 
          title="Low Stock Warning" value="4" trend="Replenishment" isPositive={false} trendLabel="Below threshold"
          icon={AlertTriangle} colorClass="text-amber-500" bgClass="bg-amber-50" borderClass="border-amber-100" gradientClass="from-amber-500/20 to-amber-500/5"
        />
        <StatisticCard 
          title="Out of Stock" value="0" trend="100% Ready" isPositive={true} trendLabel="Zero stockout"
          icon={XOctagon} colorClass="text-emerald-500" bgClass="bg-emerald-50" borderClass="border-emerald-100" gradientClass="from-emerald-500/20 to-emerald-500/5"
        />
      </div>

      {/* Dashboard Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Inventory Table */}
        <Card className="xl:col-span-2 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" /> Active Enclosure & Panel Stock
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <DataTable data={mockInventory} columns={columns} keyExtractor={(row) => row.id} />
          </CardContent>
        </Card>

        {/* Warehouse Distribution Chart */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <PieChartIcon className="w-4 h-4 text-indigo-600" /> Stock by Warehouse Facility
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[360px] flex items-center justify-center flex-col">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={distributionData} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={4} dataKey="value" stroke="none">
                  {distributionData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none' }} formatter={(value: any) => `AED ${value?.toLocaleString()}`} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Modal isOpen={isReceiveModalOpen} onClose={() => setIsReceiveModalOpen(false)} title="Receive Production Stock">
        <div className="space-y-4">
          <p className="text-sm text-slate-500">Scan or enter the Production Batch or ASN Number to receive manufactured switchgear into inventory.</p>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Batch / ASN Number</label>
              <div className="relative">
                <input type="text" placeholder="e.g. BATCH-INF-2026-081" className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-xs focus:border-indigo-500 outline-none" />
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 hover:border-indigo-300 transition-colors cursor-pointer mt-4">
              <ScanLine className="w-8 h-8 text-indigo-500 mb-2" />
              <p className="text-sm font-bold text-slate-700">Scan Barcode / QR Label</p>
              <p className="text-xs text-slate-500 mt-1">Infratech RAK Factory Scanner</p>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button onClick={() => setIsReceiveModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors">
              Cancel
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-all">
              Confirm Receipt
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
