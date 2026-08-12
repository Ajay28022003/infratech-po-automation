import { useState } from 'react';
import { Plus, Search, Download, Edit, Trash2 } from 'lucide-react';
import { DataTable, type Column } from '../components/ui/DataTable';
import { Card, CardContent } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { ItemForm } from '../components/forms/ItemForm';

interface ItemMaster {
  id: string;
  sku: string;
  code: string;
  description: string;
  category: string;
  uom: string;
  purchasePrice: string;
  salesPrice: string;
  hscode: string;
}

const mockData: ItemMaster[] = [
  { id: '1', sku: 'XPSN22506B', code: 'ITM-XP-06', description: 'xPowerS PB 250A Bot 6W TPN-NZM1/PDE1 OG', category: 'xPower Switchgear', uom: 'NOS', purchasePrice: 'AED 650.00', salesPrice: 'AED 856.00', hscode: '853810009999' },
  { id: '2', sku: 'XPSN22510B', code: 'ITM-XP-10', description: 'xPowerS PB 250A Bot 10W TPN-NZM1/PDE1 OG', category: 'xPower Switchgear', uom: 'NOS', purchasePrice: 'AED 820.00', salesPrice: 'AED 1,064.00', hscode: '853810009999' },
  { id: '3', sku: 'XPSN22512B', code: 'ITM-XP-12', description: 'xPowerS PB 250A Bot 12W TPN-NZM1/PDE1 OG', category: 'xPower Switchgear', uom: 'NOS', purchasePrice: 'AED 950.00', salesPrice: 'AED 1,225.00', hscode: '853810009999' },
  { id: '4', sku: 'IFC86/200+MP', code: 'ITM-IFC-86', description: '800H x 600W x 200D Single Door Compact Enclosure with MP + Gland Plate', category: 'IFC Compact Enclosures', uom: 'NOS', purchasePrice: 'AED 210.00', salesPrice: 'AED 315.00', hscode: '853810009999' },
  { id: '5', sku: 'IFC128/300+MP+SD', code: 'ITM-IFC-128', description: '1200H x 800W x 300D Single Door Compact Enclosure with MP + Gland Plate', category: 'IFC Compact Enclosures', uom: 'NOS', purchasePrice: 'AED 420.00', salesPrice: 'AED 600.00', hscode: '853810009999' },
  { id: '6', sku: 'IFC66/150+MP', code: 'ITM-IFC-66', description: '600H x 600W x 150D Single Door Compact Enclosure with MP + Gland Plate', category: 'IFC Compact Enclosures', uom: 'NOS', purchasePrice: 'AED 150.00', salesPrice: 'AED 225.00', hscode: '853810009999' },
  { id: '7', sku: 'IFC148/300+MP+SD', code: 'ITM-IFC-148', description: '1400H x 800W x 300D Single Door Compact Enclosure with MP + Gland Plate', category: 'IFC Compact Enclosures', uom: 'NOS', purchasePrice: 'AED 480.00', salesPrice: 'AED 685.00', hscode: '853810009999' },
  { id: '8', sku: 'IFL168/300+MP+SD', code: 'ITM-IFL-168', description: '1600H x 800W x 300D Single Door Large Enclosure with MP + Gland Plate', category: 'IFL Large Enclosures', uom: 'NOS', purchasePrice: 'AED 690.00', salesPrice: 'AED 980.00', hscode: '853810009999' },
  { id: '9', sku: 'INF-DB-2000-1423-A', code: 'ITM-DB-2000', description: '2000H x 1423W x 331D Distribution Panel Enclosure IP55 Double Door', category: 'Distribution Boards', uom: 'SET', purchasePrice: 'AED 18,500.00', salesPrice: 'AED 24,350.00', hscode: '853710900000' },
  { id: '10', sku: 'INF-ENC-2R16M', code: 'ITM-ENC-2R16', description: '1200H x 600W x 200D Single Door Enclosure IP65 (Cust Code: ER-ENC-200)', category: 'Custom Enclosures', uom: 'NOS', purchasePrice: 'AED 320.00', salesPrice: 'AED 460.00', hscode: '853810009999' },
];

export const Items = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedItem, setSelectedItem] = useState<ItemMaster | null>(null);

  const handleCreate = () => {
    setModalMode('create');
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: ItemMaster) => {
    setModalMode('edit');
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const columns: Column<ItemMaster>[] = [
    { 
      header: 'Part Number / SKU', 
      accessor: (row) => (
        <div className="flex flex-col">
          <span className="font-bold font-mono text-indigo-600 text-xs">{row.sku}</span>
          <span className="text-[10px] text-slate-400 font-mono">HS: {row.hscode}</span>
        </div>
      ) 
    },
    { 
      header: 'Product Description & Range', 
      accessor: (row) => (
        <div>
          <p className="font-bold text-slate-900 text-xs">{row.description}</p>
          <span className="text-[10px] text-indigo-600 font-medium">{row.category}</span>
        </div>
      ) 
    },
    { 
      header: 'UOM', 
      accessor: (row) => <span className="text-xs font-bold text-slate-600">{row.uom}</span> 
    },
    { header: 'Cost Price', accessor: 'purchasePrice', className: 'font-mono text-xs font-semibold text-slate-500 text-right' },
    { header: 'Standard Sales Price', accessor: 'salesPrice', className: 'font-mono text-xs font-bold text-emerald-700 text-right' },
    { 
      header: 'Actions', 
      accessor: (row) => (
        <div className="flex items-center gap-1 justify-end">
          <button onClick={() => handleEdit(row)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Edit">
            <Edit className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors" title="Delete">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
      className: 'text-right'
    }
  ];

  const modalFooter = (
    <>
      <button 
        onClick={() => setIsModalOpen(false)}
        className="px-4 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
      >
        Cancel
      </button>
      <button 
        onClick={() => setIsModalOpen(false)}
        className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
      >
        {modalMode === 'create' ? 'Create Item' : 'Save Changes'}
      </button>
    </>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Item Master Catalog</h1>
          <p className="text-xs text-slate-500 mt-1 font-normal">
            Master catalog of sheet metal enclosures, switchgear assemblies, and distribution boards.
          </p>
        </div>
        <div className="flex gap-2.5">
          <button className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 shadow-2xs transition-all">
            <Download className="w-3.5 h-3.5 text-slate-400" /> Export Catalog
          </button>
          <button 
            onClick={handleCreate}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 shadow-2xs transition-all"
          >
            <Plus className="w-3.5 h-3.5" /> Add Item
          </button>
        </div>
      </div>

      <Card className="shadow-2xs border-slate-200/80">
        <div className="p-3.5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by SKU, Code, or Description..."
              className="w-full pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:border-indigo-500 outline-none transition-all"
            />
          </div>
        </div>

        <CardContent className="p-0 overflow-hidden flex flex-col">
          <DataTable data={mockData} columns={columns} keyExtractor={(row) => row.id} />
        </CardContent>
      </Card>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={modalMode === 'create' ? 'Add Enclosure / Part SKU' : 'Edit Item'}
        footer={modalFooter}
      >
        <ItemForm initialData={selectedItem} />
      </Modal>
    </div>
  );
};
