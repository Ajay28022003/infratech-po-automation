import { useState } from 'react';
import { Plus, MapPin, AlertTriangle, Building2, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';

const warehouses = [
  { 
    id: 'RAK-PLANT-01', 
    name: 'Ras Al Khaimah Enclosure Works', 
    type: 'Primary Manufacturing & Assembly Plant',
    address: 'Al Jazeera Al - Hamra, Industrial Zone, Ras Al Khaimah, UAE',
    manager: 'Bhavani Prasad',
    capacity: '78%',
    activeSkus: 482,
    stockValue: 'AED 3.8M',
    status: 'Operational'
  },
  { 
    id: 'JAFZA-LOG-11', 
    name: 'JAFZA DP World Unit 11 Hub', 
    type: 'Finished Goods & Staging Logistics Hub',
    address: 'Plot S30805, Jebel Ali Free Zone (South), Dubai, UAE',
    manager: 'Sarah Jenkins',
    capacity: '64%',
    activeSkus: 215,
    stockValue: 'AED 1.6M',
    status: 'Operational'
  },
  { 
    id: 'AUH-DEPOT-02', 
    name: 'Abu Dhabi Musaffah Distribution Depot', 
    type: 'Oil & Gas Sector Buffer Depot',
    address: 'Sector M-34, Musaffah Industrial Area, Abu Dhabi, UAE',
    manager: 'Mohammed Tareq',
    capacity: '92%',
    activeSkus: 110,
    stockValue: 'AED 850K',
    status: 'Near Capacity'
  },
];

export const Warehouse = () => {
  const [isAddWarehouseOpen, setIsAddWarehouseOpen] = useState(false);
  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Plant & Warehouse Facilities</h1>
          <p className="text-xs text-slate-500 mt-1 font-normal">Physical production plants, staging facilities, and regional distribution depots.</p>
        </div>
        <div className="flex gap-2.5">
          <button 
            onClick={() => setIsAddWarehouseOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 shadow-2xs transition-all"
          >
            <Plus className="w-3.5 h-3.5" /> Add Facility
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {warehouses.map((wh) => {
          const isNearCapacity = wh.status === 'Near Capacity';
          const StatusIcon = isNearCapacity ? AlertTriangle : CheckCircle2;
          const statusColor = isNearCapacity ? 'text-amber-700 bg-amber-50 border-amber-200' : 'text-emerald-700 bg-emerald-50 border-emerald-200';
          const capacityNum = parseInt(wh.capacity);
          
          return (
            <Card key={wh.id} className="group hover:-translate-y-1 transition-transform duration-300 shadow-md">
              <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-slate-900 leading-tight">{wh.name}</h2>
                      <p className="text-[11px] font-mono font-semibold text-indigo-600 mt-0.5">{wh.id}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 p-4">
                <div className="flex items-start gap-2 text-xs text-slate-600">
                  <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                  <p className="leading-relaxed">{wh.address}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Active SKUs</p>
                    <p className="text-base font-black text-slate-900">{wh.activeSkus.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Facility Value</p>
                    <p className="text-base font-black text-indigo-600 font-mono">{wh.stockValue}</p>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex justify-between items-center mb-1.5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Capacity Utilization</p>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border ${statusColor}`}>
                      <StatusIcon className="w-3 h-3" /> {wh.status}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${capacityNum > 90 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                      style={{ width: wh.capacity }}
                    ></div>
                  </div>
                  <p className="text-right text-[10px] font-mono font-bold text-slate-500 mt-1">{wh.capacity} Utilization</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Modal isOpen={isAddWarehouseOpen} onClose={() => setIsAddWarehouseOpen(false)} title="Add Production / Storage Facility">
        <div className="space-y-4">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Facility Name <span className="text-rose-500">*</span></label>
              <input type="text" placeholder="e.g. Sharjah Staging Depot" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:border-indigo-500 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Facility Role</label>
              <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:border-indigo-500 outline-none">
                <option>Manufacturing & Assembly Plant</option>
                <option>Finished Goods Hub</option>
                <option>Regional Buffer Depot</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button onClick={() => setIsAddWarehouseOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg">
              Cancel
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700">
              Save Facility
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
