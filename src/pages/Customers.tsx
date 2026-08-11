import { useState } from 'react';
import { Plus, Search, Download, Edit, Eye, CheckCircle2, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DataTable, type Column } from '../components/ui/DataTable';
import { Card, CardContent } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { CustomerForm } from '../components/forms/CustomerForm';

interface CustomerModel {
  id: string;
  code: string;
  name: string;
  trn: string;
  email: string;
  phone: string;
  creditLimit: string;
  paymentTerms: string;
  location: string;
  status: string;
}

const mockData: CustomerModel[] = [
  { id: '1', code: 'CUST-EATON', name: 'M/s. EATON FZE', trn: '100296552100003', email: 'orders.fze@eaton.com', phone: '+971 4 806 6100', creditLimit: 'AED 2,500,000.00', paymentTerms: '90 Days Credit', location: 'JAFZA South, Dubai', status: 'Active' },
  { id: '2', code: 'CUST-VERGER', name: 'M/s. Verger Delporte UAE Ltd', trn: '100412893100003', email: 'purchasing@verger-delporte.ae', phone: '+971 6 534 3456', creditLimit: 'AED 1,000,000.00', paymentTerms: '90 Days PDC', location: 'Industrial Area 5, Sharjah', status: 'Active' },
  { id: '3', code: 'CUST-CANSERV', name: 'M/s. CAN SERV OIL & GAS', trn: '100998124500003', email: 'procurement@canserv.ae', phone: '+971 2 554 9900', creditLimit: 'AED 1,500,000.00', paymentTerms: '30 Days Credit', location: 'Musaffah, Abu Dhabi', status: 'Active' },
  { id: '4', code: 'CUST-ENCOM', name: 'M/s. ENCOM TRADING LLC', trn: '100881923100003', email: 'enquiries@electrorakgroup.com', phone: '+971 7 244 7890', creditLimit: 'AED 500,000.00', paymentTerms: '30 Days PDC', location: 'RAK Industrial Zone, RAK', status: 'Active' },
  { id: '5', code: 'CUST-ALSHARIQ', name: 'M/s. Al Shariq Switchgear LLC', trn: '100772184100003', email: 'commercial@alshariq.ae', phone: '+971 6 543 2199', creditLimit: 'AED 750,000.00', paymentTerms: '60 Days Credit', location: 'Industrial Area 13, Sharjah', status: 'Active' },
];

export const Customers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerModel | null>(null);

  const handleCreate = () => {
    setModalMode('create');
    setSelectedCustomer(null);
    setIsModalOpen(true);
  };

  const handleEdit = (customer: CustomerModel) => {
    setModalMode('edit');
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const columns: Column<CustomerModel>[] = [
    { 
      header: 'Customer Code', 
      accessor: (row) => (
        <Link to={`/customers/${row.code}`} className="font-bold font-mono text-indigo-600 hover:text-indigo-800 hover:underline transition-colors text-xs">
          {row.code}
        </Link>
      ) 
    },
    { 
      header: 'Customer Name & TRN', 
      accessor: (row) => (
        <div>
          <p className="font-bold text-slate-900 text-xs">{row.name}</p>
          <span className="text-[10px] text-slate-500 font-mono">TRN: {row.trn}</span>
        </div>
      )
    },
    { 
      header: 'Contact & Location', 
      accessor: (row) => (
        <div className="flex flex-col">
          <span className="text-xs text-slate-700 font-mono">{row.email}</span>
          <span className="text-[10px] text-slate-500">{row.location}</span>
        </div>
      ) 
    },
    { header: 'Credit Limit', accessor: 'creditLimit', className: 'font-bold font-mono text-slate-800 text-xs text-right' },
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
          <Link to={`/customers/${row.code}`} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors" title="View">
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
        {modalMode === 'create' ? 'Create Customer' : 'Save Changes'}
      </button>
    </>
  );

  return (
    <div className="space-y-6 h-full flex flex-col animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Customer Master Database</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Authorized buyers, registered UAE TRN numbers, and contract credit terms for Infratech FZ LLC.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all">
            <Download className="w-4 h-4 text-slate-400" /> Export CSV
          </button>
          <button 
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" /> Add Customer
          </button>
        </div>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden shadow-md">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by customer name, code (e.g. EATON, Verger Delporte)..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:border-indigo-500 outline-none transition-all shadow-xs"
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
        title={modalMode === 'create' ? 'Add Enterprise Customer' : 'Edit Customer'}
        footer={modalFooter}
      >
        <CustomerForm initialData={selectedCustomer} />
      </Modal>
    </div>
  );
};
