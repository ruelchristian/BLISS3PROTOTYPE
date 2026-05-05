
import React, { useState, useMemo } from 'react';
import { 
  DollarSign, Search, Calendar, Download, TrendingUp, 
  Plus, Filter, CheckCircle, AlertCircle, X, Edit3, 
  ArrowUpRight, Trash2, User, RefreshCw, ChevronDown,
  FileText, Upload, Check
} from 'lucide-react';
import { Payment } from '../../types';

const Payments: React.FC<{ residentId?: string }> = ({ residentId }) => {
  const isResidentView = !!residentId;
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PAID' | 'PENDING' | 'OVERDUE'>('ALL');
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  // Initial Mock Payments (Real Property Tax)
  const [payments, setPayments] = useState<Payment[]>([
    { id: 'TAX-2024-001', unitId: '101', residentName: 'John Smith', amount: 2500.00, billingDate: '2024-01-01', dueDate: '2024-01-31', status: 'PAID', paymentDate: '2024-01-15', receiptUrl: 'https://example.com/receipt1.pdf', remarks: 'Paid via Bank Transfer' },
    { id: 'TAX-2024-002', unitId: '102', residentName: 'Maria Garcia', amount: 2500.00, billingDate: '2024-01-01', dueDate: '2024-01-31', status: 'PENDING', remarks: 'Waiting for receipt submission' },
    { id: 'TAX-2024-003', unitId: '201', residentName: 'Robert Chen', amount: 3200.00, billingDate: '2024-01-01', dueDate: '2024-01-31', status: 'OVERDUE', remarks: 'Follow-up sent' },
  ]);

  const recordReceipt = (id: string) => {
    const receiptRef = prompt('Enter Receipt Reference Number or URL:');
    if (receiptRef) {
      setPayments(prev => prev.map(p => p.id === id ? { 
        ...p, 
        status: 'PAID', 
        paymentDate: new Date().toISOString().split('T')[0],
        receiptUrl: receiptRef,
        remarks: 'Receipt recorded by office'
      } : p));
    }
  };

  const deletePayment = (id: string) => {
    if (confirm('Are you sure you want to remove this tax record?')) {
      setPayments(prev => prev.filter(p => p.id !== id));
    }
  };

  const filteredPayments = useMemo(() => {
    return payments.filter(p => {
      const matchesSearch = 
        p.residentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.unitId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;
      const matchesResident = !isResidentView || p.unitId === residentId; // Simplified for demo

      return matchesSearch && matchesStatus && matchesResident;
    });
  }, [payments, searchTerm, statusFilter, isResidentView, residentId]);

  const stats = useMemo(() => {
    const collected = filteredPayments.filter(p => p.status === 'PAID').reduce((acc, curr) => acc + curr.amount, 0);
    const outstanding = filteredPayments.filter(p => p.status !== 'PAID').reduce((acc, curr) => acc + curr.amount, 0);
    const collectionRate = filteredPayments.length ? Math.round((filteredPayments.filter(p => p.status === 'PAID').length / filteredPayments.length) * 100) : 0;
    return { collected, outstanding, collectionRate };
  }, [filteredPayments]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20 md:pb-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#003067] tracking-tight">
            {isResidentView ? 'My Tax Payments' : 'Real Property Tax Management'}
          </h2>
          <p className="text-gray-500 font-medium">
            {isResidentView ? 'View and track your property tax records.' : 'Manage and record community real property tax payments.'}
          </p>
        </div>
        {!isResidentView && (
          <div className="flex gap-2">
            <button 
              onClick={() => setShowRecordModal(true)}
              className="bg-[#0068B6] hover:bg-[#003067] text-white px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all active:scale-95"
            >
              <Plus className="w-5 h-5" />
              Record Receipt
            </button>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center gap-4 group hover:border-green-200 transition-colors">
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Collected</p>
            <p className="text-2xl font-black text-gray-900">₱{stats.collected.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center gap-4 group hover:border-orange-200 transition-colors">
          <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all">
            <Calendar size={24} />
          </div>
          <div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Outstanding</p>
            <p className="text-2xl font-black text-gray-900">₱{stats.outstanding.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center gap-4 group hover:border-blue-200 transition-colors">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 group-hover:bg-[#0068B6] group-hover:text-white transition-all">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Collection Rate</p>
            <p className="text-2xl font-black text-gray-900">{stats.collectionRate}%</p>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
        <div className="p-4 border-b bg-gray-50/50 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search by ID, Resident, or Unit..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white text-black font-semibold border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0068B6] outline-none transition-all placeholder:text-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 w-full md:w-auto relative">
            <button 
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest px-4 py-2.5 rounded-xl border transition-all ${
                showFilterMenu ? 'bg-[#0068B6] text-white border-[#0068B6]' : 'text-[#0068B6] bg-blue-50 border-blue-100 hover:bg-blue-100'
              }`}
            >
              <Filter size={14} /> Filter {statusFilter !== 'ALL' && '•'}
            </button>

            {showFilterMenu && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border rounded-2xl shadow-2xl z-50 p-4 animate-in zoom-in-95 duration-150">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Status</p>
                <div className="flex flex-col gap-1">
                  {['ALL', 'PAID', 'PENDING', 'OVERDUE'].map(s => (
                    <button
                      key={s}
                      onClick={() => { setStatusFilter(s as any); setShowFilterMenu(false); }}
                      className={`text-left px-3 py-2 rounded-lg text-xs font-bold uppercase transition-all ${
                        statusFilter === s ? 'bg-[#0068B6] text-white' : 'hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
              <tr>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Tax Record</th>
                <th className="px-6 py-4">Resident / Unit</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredPayments.map((p) => (
                <tr key={p.id} className="hover:bg-blue-50/30 transition-all group">
                  <td className="px-6 py-5 align-top">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
                      p.status === 'PAID' ? 'bg-green-50 text-green-700 border-green-200' :
                      p.status === 'PENDING' ? 'bg-orange-50 text-orange-700 border-orange-200' : 'bg-red-50 text-red-700 border-red-200'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 align-top">
                    <p className="text-xs font-black text-gray-400 uppercase mb-1">{p.id}</p>
                    <p className="text-sm font-bold text-gray-900">{p.remarks}</p>
                    <div className="flex items-center gap-2 mt-1.5 text-[10px] font-bold text-gray-500 uppercase">
                      <Calendar size={12} /> Due: {p.dueDate}
                    </div>
                  </td>
                  <td className="px-6 py-5 align-top">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 font-black">
                        {p.residentName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{p.residentName}</p>
                        <p className="text-xs text-gray-500 font-medium">Unit {p.unitId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 align-top">
                    <p className="text-lg font-black text-[#003067] tracking-tight">₱{p.amount.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-5 text-right align-top">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {p.status !== 'PAID' && !isResidentView && (
                        <button 
                          onClick={() => recordReceipt(p.id)}
                          className="flex items-center gap-2 px-3 py-1.5 bg-[#0068B6] text-white text-[10px] font-black uppercase rounded-lg hover:bg-[#003067] transition-all"
                        >
                          <Check size={14} /> Record Receipt
                        </button>
                      )}
                      {p.receiptUrl && (
                        <a 
                          href={p.receiptUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="p-2 text-gray-400 hover:text-[#0068B6] hover:bg-blue-50 rounded-lg transition-all"
                          title="View Receipt"
                        >
                          <FileText size={18} />
                        </a>
                      )}
                      {!isResidentView && (
                        <button 
                          onClick={() => deletePayment(p.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Modal */}
      {showRecordModal && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#003067]/60 backdrop-blur-md" onClick={() => setShowRecordModal(false)} />
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 bg-gray-50 border-b flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-[#003067]">Record Tax Receipt</h3>
                <p className="text-xs text-gray-500 font-medium">Record a resident's tax payment receipt.</p>
              </div>
              <button onClick={() => setShowRecordModal(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <form className="p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); setShowRecordModal(false); alert('Receipt recorded successfully!'); }}>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Resident / Unit</label>
                <select required className="w-full px-4 py-3 bg-gray-50 text-black font-semibold border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0068B6] transition-all">
                  <option value="">Select Resident...</option>
                  <option>John Smith (Unit 101)</option>
                  <option>Maria Garcia (Unit 102)</option>
                  <option>Robert Chen (Unit 201)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount (₱)</label>
                  <input required type="number" placeholder="0.00" className="w-full px-4 py-3 bg-gray-50 text-black font-semibold border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0068B6]" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Payment Date</label>
                  <input required type="date" className="w-full px-4 py-3 bg-gray-50 text-black font-semibold border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0068B6]" defaultValue={new Date().toISOString().split('T')[0]} />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Receipt Reference / URL</label>
                <div className="relative">
                  <Upload className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input required type="text" placeholder="e.g. OR-12345678" className="w-full pl-10 pr-4 py-3 bg-gray-50 text-black font-semibold border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0068B6]" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Remarks</label>
                <textarea rows={2} className="w-full px-4 py-3 bg-gray-50 text-black font-semibold border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0068B6]" placeholder="Optional notes..."></textarea>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowRecordModal(false)} className="flex-1 px-6 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-all">Cancel</button>
                <button type="submit" className="flex-1 px-6 py-3 bg-[#0068B6] text-white font-bold rounded-xl hover:bg-[#003067] shadow-lg shadow-blue-200 transition-all">Record Payment</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;
