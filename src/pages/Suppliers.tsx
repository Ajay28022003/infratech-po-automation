import { useState } from 'react';
import { Plus, Search, Download, Edit, Eye, CheckCircle2, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DataTable, type Column } from '../components/ui/DataTable';
import { Card, CardContent } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { SupplierForm } from '../components/forms/SupplierForm';

interface SupplierModel {
  id: string;
  code: string;
  name: string;
  email: string;
  phone: string;
  creditLimit: string;
  paymentTerms: string;
  category: string;
  status: string;
}

const mockData: SupplierModel[] = [
  { id: '1', code: 'SUPP-EATON', name: 'Eaton Industries Middle East', email: 'me.sales@eaton.com', phone: '+971 4 806 6100', creditLimit: 'AED 1,500,000.00', paymentTerms: '90 Days Credit', category: 'Busbar Components & Breakers', status: 'Active' },
  { id: '2', code: 'SUPP-SCHNEIDER', name: 'Schneider Electric UAE', email: 'orders.uae@se.com', phone: '+971 4 709 9100', creditLimit: 'AED 2,000,000.00', paymentTerms: '60 Days Credit', category: 'Switchgear & Enclosure Hardware', status: 'Active' },
  { id: '3', code: 'SUPP-ABB', name: 'ABB Electrification UAE', email: 'orders.electrification@abb.com', phone: '+971 4 314 7500', creditLimit: 'AED 1,200,000.00', paymentTerms: '60 Days PDC', category: 'Contactors & Relays', status: 'Active' },
  { id: '4', code: 'SUPP-RITTAL', name: 'Rittal Middle East FZE', email: 'info@rittal-middle-east.com', phone: '+971 4 341 6855', creditLimit: 'AED 800,000.00', paymentTerms: '30 Days Credit', category: 'Enclosure Gland Plates & Accessories', status: 'Active' },
  { id: '5', code: 'SUPP-EMSTEEL', name: 'Emirates Steel Arkan', email: 'sales@emiratessteel.com', phone: '+971 2 550 1111', creditLimit: 'AED 3,000,000.00', paymentTerms: '90 Days LC', category: 'CRCA & Galvanized Sheet Metal', status: 'Active' },
];

export const Suppliers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierModel | null>(null);

  const handleCreate = () => {
    setModalMode('create');
    setSelectedSupplier(null);
    setIsModalOpen(true);
  };

  const handleEdit = (supplier: SupplierModel) => {
    setModalMode('edit');
    setSelectedSupplier(supplier);
    setIsModalOpen(true);
  };

  const columns: Column<SupplierModel>[] = [
    { 
      header: 'Supplier Code', 
      accessor: (row) => (
        <Link to={`/suppliers/${row.code}`} className="font-bold font-mono text-indigo-600 hover:text-indigo-800 hover:underline transition-colors text-xs">
          {row.code}
        </Link>
      ) 
    },
    { 
      header: 'Supplier Name & Category', 
      accessor: (row) => (
        <div>
          <p className="font-bold text-slate-900 text-xs">{row.name}</p>
          <span className="text-[10px] text-slate-500">{row.category}</span>
        </div>
      )
    },
    { 
      header: 'Contact Details', 
      accessor: (row) => (
        <div className="flex flex-col">
          <span className="text-xs text-slate-700 font-mono">{row.email}</span>
          <span className="text-[10px] text-slate-500">{row.phone}</span>
        </div>
      ) 
    },
    { header: 'Credit Facility', accessor: 'creditLimit', className: 'font-bold font-mono text-slate-800 text-xs text-right' },
    { header: 'Agreed Terms', accessor: 'paymentTerms', className: 'text-xs font-medium text-slate-600' },
    { 
      header: 'Status', 
      accessor: (row) => {
        const isActive = row.status === 'Active';
        return (
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold border ${isActive ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-slate-600 bg-slate-100 border-slate-200'} shadow-xs whitespace-nowrap`}>
            {isActive ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />} {row.status}
          </span>
        );
      } 
    },
    { 
      header: 'Actions', 
      accessor: (row) => (
        <div className="flex items-center gap-1 justify-end">
          <Link to={`/suppliers/${row.code}`} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors" title="View">
            <Eye className="w-4 h-4" />
          </Link>
          <button onClick={() => handleEdit(row)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Edit">
            <Edit className="w-4 h-4" />
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
        {modalMode === 'create' ? 'Create Supplier' : 'Save Changes'}
      </button>
    </>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Suppliers & Component Vendors</h1>
          <p className="text-xs text-slate-500 mt-1 font-normal">
            Master directory of sheet metal, switchgear, and electrical component suppliers.
          </p>
        </div>
        <div className="flex gap-2.5">
          <button className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 shadow-2xs transition-all">
            <Download className="w-3.5 h-3.5 text-slate-400" /> Export CSV
          </button>
          <button 
            onClick={handleCreate}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 shadow-2xs transition-all"
          >
            <Plus className="w-3.5 h-3.5" /> Add Supplier
          </button>
        </div>
      </div>

      <Card className="shadow-2xs border-slate-200/80">
        <div className="p-3.5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by supplier name, code, contact..."
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
        title={modalMode === 'create' ? 'Add Component Supplier' : 'Edit Supplier'}
        footer={modalFooter}
      >
        <SupplierForm initialData={selectedSupplier} />
      </Modal>
    </div>
  );
};
