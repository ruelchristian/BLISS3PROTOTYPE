
import React, { useState, useMemo } from 'react';
import { 
  DollarSign, Search, Calendar, Download, TrendingUp, 
  Plus, Filter, CheckCircle, AlertCircle, X, Edit3, 
  ArrowUpRight, Trash2, User, RefreshCw
} from 'lucide-react';

interface Transaction {
  id: string;
  residentId: string;
  residentName: string;
  residentType: 'OWNER' | 'TENANT';
  unit: string;
  amount: number;
  date: string;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
  method: string;
  description: string;
}

const Payments: React.FC<{ residentId?: string }> = ({ residentId }) => {
  const isResidentView = !!residentId;
  const [searchTerm, setSearchTerm] = useState('');
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Initial Mock Transactions
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 'TRX-1024', residentId: '1', residentName: 'Alice Thompson', residentType: 'OWNER', unit: 'Block A, #12', amount: 150.00, date: '2023-10-01', status: 'PAID', method: 'Online', description: 'Monthly Maintenance Fee' },
    { id: 'TRX-1025', residentId: '2', residentName: 'Bob Smith', residentType: 'TENANT', unit: 'Block C, #05', amount: 150.00, date: '2023-10-02', status: 'PAID', method: 'Cash', description: 'Security Levy' },
    { id: 'TRX-1026', residentId: '3', residentName: 'Charlie Davis', residentType: 'TENANT', unit: 'Block B, #22', amount: 120.00, date: '2023-10-03', status: 'PENDING', method: 'Bank Transfer', description: 'Utilities Deposit' },
    { id: 'TRX-1027', residentId: '4', residentName: 'Diana Prince', residentType: 'OWNER', unit: 'Block A, #42', amount: 200.00, date: '2023-10-04', status: 'OVERDUE', method: '-', description: 'Sinking Fund contribution' },
    { id: 'TRX-1028', residentId: '1', residentName: 'Alice Thompson', residentType: 'OWNER', unit: 'Block A, #12', amount: 150.00, date: '2023-09-01', status: 'PAID', method: 'Online', description: 'Monthly Maintenance Fee' },
  ]);

  // Handle generating dues for the current month
  const handleGenerateDues = () => {
    setIsGenerating(true);
    // Simulate finding all owners (mocking 3 more owners from the system)
    const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
    
    // In a real app, we would fetch residents and filter by type 'OWNER'
    const newDues: Transaction[] = [
      { id: `TRX-${Date.now()}-1`, residentId: '1', residentName: 'Alice Thompson', residentType: 'OWNER', unit: 'Block A, #12', amount: 150.00, date: new Date().toISOString().split('T')[0], status: 'PENDING', method: '-', description: `Monthly Maintenance Fee - ${currentMonth}` },
      { id: `TRX-${Date.now()}-2`, residentId: '4', residentName: 'Diana Prince', residentType: 'OWNER', unit: 'Block A, #42', amount: 150.00, date: new Date().toISOString().split('T')[0], status: 'PENDING', method: '-', description: `Monthly Maintenance Fee - ${currentMonth}` },
      { id: `TRX-${Date.now()}-3`, residentId: '5', residentName: 'Edward Norton', residentType: 'OWNER', unit: 'Block D, #18', amount: 150.00, date: new Date().toISOString().split('T')[0], status: 'PENDING', method: '-', description: `Monthly Maintenance Fee - ${currentMonth}` },
    ];

    setTimeout(() => {
      setTransactions(prev => [...newDues, ...prev]);
      setIsGenerating(false);
      alert(`Dues generated for ${currentMonth}. ${newDues.length} pending records created.`);
    }, 1000);
  };

  const updateStatus = (id: string, newStatus: Transaction['status']) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: newStatus, method: newStatus === 'PAID' ? 'Updated by Admin' : t.method } : t));
  };

  const deleteTransaction = (id: string) => {
    if (confirm('Are you sure you want to remove this transaction?')) {
      setTransactions(prev => prev.filter(t => t.id !== id));
    }
  };

  // Financial Stats
  const stats = useMemo(() => {
    const paid = transactions.filter(t => t.status === 'PAID').reduce((acc, curr) => acc + curr.amount, 0);
    const pending = transactions.filter(t => t.status !== 'PAID').reduce((acc, curr) => acc + curr.amount, 0);
    const ratio = transactions.length ? Math.round((transactions.filter(t => t.status === 'PAID').length / transactions.length) * 100) : 0;
    return { paid, pending, ratio };
  }, [transactions]);

  const filteredTransactions = transactions.filter(t => 
    t.residentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20 md:pb-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#003067] tracking-tight">
            {isResidentView ? 'My Payments' : 'Billing & Collections'}
          </h2>
          <p className="text-gray-500 font-medium">
            {isResidentView ? 'View and track your community fees.' : 'Admin panel for generating dues and recording resident payments.'}
          </p>
        </div>
        {!isResidentView && (
          <div className="flex gap-2">
            <button 
              onClick={handleGenerateDues}
              disabled={isGenerating}
              className="bg-white border border-blue-200 text-[#0068B6] px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-50 transition-all active:scale-95 shadow-sm disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
              Generate Monthly Dues
            </button>
            <button 
              onClick={() => setShowRecordModal(true)}
              className="bg-[#0068B6] hover:bg-[#003067] text-white px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all active:scale-95"
            >
              <Plus className="w-5 h-5" />
              Record Payment
            </button>
          </div>
        )}
      </div>

      {/* Dynamic Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center gap-4 group hover:border-green-200 transition-colors">
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Collected</p>
            <p className="text-2xl font-black text-gray-900">${stats.paid.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center gap-4 group hover:border-orange-200 transition-colors">
          <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all">
            <Calendar size={24} />
          </div>
          <div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Outstanding Due</p>
            <p className="text-2xl font-black text-gray-900">${stats.pending.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center gap-4 group hover:border-blue-200 transition-colors">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 group-hover:bg-[#0068B6] group-hover:text-white transition-all">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Collection Rate</p>
            <p className="text-2xl font-black text-gray-900">{stats.ratio}%</p>
          </div>
        </div>
      </div>

      {/* Transaction Management Section */}
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
          <div className="flex gap-2">
            <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#0068B6] bg-blue-50 px-4 py-2 rounded-xl border border-blue-100 hover:bg-blue-100 transition-colors">
              <Filter size={14} /> Filter
            </button>
            <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-500 bg-white px-4 py-2 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
              <Download size={14} /> Export
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
              <tr>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Transaction Details</th>
                {!isResidentView && <th className="px-6 py-4">Resident Info</th>}
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredTransactions.map((trx) => (
                <tr key={trx.id} className="hover:bg-blue-50/30 transition-all group">
                  <td className="px-6 py-5 align-top">
                    <button 
                      onClick={() => {
                        if (isResidentView) return;
                        const next: Record<string, Transaction['status']> = { 'PAID': 'PENDING', 'PENDING': 'OVERDUE', 'OVERDUE': 'PAID' };
                        updateStatus(trx.id, next[trx.status]);
                      }}
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
                        trx.status === 'PAID' ? 'bg-green-50 text-green-700 border-green-200' :
                        trx.status === 'PENDING' ? 'bg-orange-50 text-orange-700 border-orange-200' : 'bg-red-50 text-red-700 border-red-200'
                      } ${!isResidentView && 'hover:scale-105 active:scale-95 shadow-sm'}`}
                    >
                      {trx.status}
                    </button>
                  </td>
                  <td className="px-6 py-5 align-top">
                    <p className="text-xs font-black text-gray-400 uppercase mb-1">{trx.id}</p>
                    <p className="text-sm font-bold text-gray-900">{trx.description}</p>
                    <div className="flex items-center gap-2 mt-1.5 text-[10px] font-bold text-gray-500 uppercase">
                      <Calendar size={12} /> {trx.date} 
                      <span className="opacity-30">•</span> 
                      {trx.method}
                    </div>
                  </td>
                  {!isResidentView && (
                    <td className="px-6 py-5 align-top">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 font-black">
                          {trx.residentName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{trx.residentName}</p>
                          <p className="text-xs text-gray-500 font-medium">{trx.unit}</p>
                          <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${trx.residentType === 'OWNER' ? 'bg-amber-100 text-amber-700' : 'bg-blue-50 text-blue-600'}`}>
                            {trx.residentType}
                          </span>
                        </div>
                      </div>
                    </td>
                  )}
                  <td className="px-6 py-5 align-top">
                    <p className="text-lg font-black text-[#003067] tracking-tight">${trx.amount.toFixed(2)}</p>
                  </td>
                  <td className="px-6 py-5 text-right align-top">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-gray-400 hover:text-[#0068B6] hover:bg-blue-50 rounded-lg transition-all">
                        <Edit3 size={18} />
                      </button>
                      {!isResidentView && (
                        <button 
                          onClick={() => deleteTransaction(trx.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                      <button className="p-2 text-gray-400 hover:text-gray-900 transition-all">
                        <ArrowUpRight size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <div className="flex flex-col items-center gap-4 text-gray-300">
                      <DollarSign size={48} className="opacity-20" />
                      <div>
                        <p className="text-lg font-black text-gray-400">No records found</p>
                        <p className="text-sm font-medium">Try adjusting your search or filters.</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
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
                <h3 className="text-xl font-black text-[#003067]">Record New Payment</h3>
                <p className="text-xs text-gray-500 font-medium">Manual ledger entry for resident dues.</p>
              </div>
              <button onClick={() => setShowRecordModal(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <form className="p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); setShowRecordModal(false); alert('Payment recorded successfully!'); }}>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Resident / Unit</label>
                <select className="w-full px-4 py-3 bg-gray-50 text-black font-semibold border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0068B6] transition-all">
                  <option>Select Resident...</option>
                  <option>Alice Thompson (Block A, #12)</option>
                  <option>Bob Smith (Block C, #05)</option>
                  <option>Diana Prince (Block A, #42)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount ($)</label>
                  <input type="number" placeholder="0.00" className="w-full px-4 py-3 bg-gray-50 text-black font-semibold border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0068B6]" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</label>
                  <input type="date" className="w-full px-4 py-3 bg-gray-50 text-black font-semibold border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0068B6]" defaultValue={new Date().toISOString().split('T')[0]} />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Payment Method</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Cash', 'Transfer', 'Cheque'].map(m => (
                    <button key={m} type="button" className="py-2 text-[10px] font-black uppercase tracking-tight border rounded-lg hover:bg-[#0068B6] hover:text-white transition-all">{m}</button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</label>
                <textarea rows={2} className="w-full px-4 py-3 bg-gray-50 text-black font-semibold border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0068B6]" placeholder="e.g. Oct Maintenance Fee"></textarea>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowRecordModal(false)} className="flex-1 px-6 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-all">Cancel</button>
                <button type="submit" className="flex-1 px-6 py-3 bg-[#0068B6] text-white font-bold rounded-xl hover:bg-[#003067] shadow-lg shadow-blue-200 transition-all">Submit Entry</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;
