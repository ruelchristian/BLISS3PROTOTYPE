
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, Plus, MoreVertical, Edit2, Trash2, Mail, Phone, X, 
  Check, Download, ChevronLeft, ChevronRight, User, Home, 
  CreditCard, Calendar, ShieldCheck, MapPin, ArrowUpRight,
  TrendingUp, Clock, AlertCircle
} from 'lucide-react';

interface Payment {
  id: string;
  date: string;
  amount: number;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
  description: string;
}

interface Resident {
  id: string;
  name: string;
  email: string;
  house: string;
  status: 'ACTIVE' | 'INACTIVE';
  phone: string;
  type: 'OWNER' | 'TENANT';
  joinDate: string;
}

const ResidentsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'INACTIVE'>('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedResident, setSelectedResident] = useState<Resident | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  // Mock Residents with Type added
  const [residents, setResidents] = useState<Resident[]>([
    { id: '1', name: 'Alice Thompson', email: 'alice@example.com', house: 'Block A, #12', status: 'ACTIVE', phone: '+1 234 567 890', type: 'OWNER', joinDate: '2022-05-12' },
    { id: '2', name: 'Bob Smith', email: 'bob@example.com', house: 'Block C, #05', status: 'ACTIVE', phone: '+1 234 567 891', type: 'TENANT', joinDate: '2023-01-15' },
    { id: '3', name: 'Charlie Davis', email: 'charlie@example.com', house: 'Block B, #22', status: 'INACTIVE', phone: '+1 234 567 892', type: 'TENANT', joinDate: '2021-11-20' },
    { id: '4', name: 'Diana Prince', email: 'diana@example.com', house: 'Block A, #42', status: 'ACTIVE', phone: '+1 234 567 893', type: 'OWNER', joinDate: '2020-03-10' },
    { id: '5', name: 'Edward Norton', email: 'edward@example.com', house: 'Block D, #18', status: 'ACTIVE', phone: '+1 234 567 894', type: 'OWNER', joinDate: '2022-08-01' },
    { id: '6', name: 'Fiona Gallagher', email: 'fiona@example.com', house: 'Block B, #09', status: 'ACTIVE', phone: '+1 234 567 895', type: 'TENANT', joinDate: '2023-04-12' },
    { id: '7', name: 'George Miller', email: 'george@example.com', house: 'Block C, #14', status: 'INACTIVE', phone: '+1 234 567 896', type: 'TENANT', joinDate: '2022-12-05' },
    { id: '8', name: 'Hannah Abbott', email: 'hannah@example.com', house: 'Block A, #33', status: 'ACTIVE', phone: '+1 234 567 897', type: 'OWNER', joinDate: '2021-06-25' },
    { id: '9', name: 'Ian Wright', email: 'ian@example.com', house: 'Block D, #02', status: 'ACTIVE', phone: '+1 234 567 898', type: 'OWNER', joinDate: '2023-02-28' },
    { id: '10', name: 'Jenny Kim', email: 'jenny@example.com', house: 'Block B, #11', status: 'ACTIVE', phone: '+1 234 567 899', type: 'TENANT', joinDate: '2023-05-19' },
    { id: '11', name: 'Kevin Hart', email: 'kevin@example.com', house: 'Block C, #21', status: 'INACTIVE', phone: '+1 234 567 900', type: 'TENANT', joinDate: '2022-09-14' },
    { id: '12', name: 'Laura Palmer', email: 'laura@example.com', house: 'Block A, #05', status: 'ACTIVE', phone: '+1 234 567 901', type: 'OWNER', joinDate: '2020-11-11' },
    { id: '13', name: 'Mike Ross', email: 'mike@example.com', house: 'Block D, #24', status: 'ACTIVE', phone: '+1 234 567 902', type: 'TENANT', joinDate: '2023-06-01' },
    { id: '14', name: 'Nina Simone', email: 'nina@example.com', house: 'Block B, #18', status: 'INACTIVE', phone: '+1 234 567 903', type: 'TENANT', joinDate: '2021-02-15' },
    { id: '15', name: 'Oscar Wilde', email: 'oscar@example.com', house: 'Block C, #12', status: 'ACTIVE', phone: '+1 234 567 904', type: 'OWNER', joinDate: '2021-08-30' },
    { id: '16', name: 'Peter Parker', email: 'peter@example.com', house: 'Block A, #15', status: 'ACTIVE', phone: '+1 234 567 905', type: 'TENANT', joinDate: '2023-07-20' },
    { id: '17', name: 'Quinn Fabray', email: 'quinn@example.com', house: 'Block D, #07', status: 'ACTIVE', phone: '+1 234 567 906', type: 'OWNER', joinDate: '2022-01-05' },
    { id: '18', name: 'Riley Reid', email: 'riley@example.com', house: 'Block B, #04', status: 'INACTIVE', phone: '+1 234 567 907', type: 'TENANT', joinDate: '2023-02-14' },
    { id: '19', name: 'Steve Rogers', email: 'steve@example.com', house: 'Block C, #30', status: 'ACTIVE', phone: '+1 234 567 908', type: 'OWNER', joinDate: '2020-07-04' },
    { id: '20', name: 'Tony Stark', email: 'tony@example.com', house: 'Block A, #01', status: 'ACTIVE', phone: '+1 234 567 909', type: 'OWNER', joinDate: '2019-12-25' },
    { id: '21', name: 'Uma Thurman', email: 'uma@example.com', house: 'Block D, #13', status: 'INACTIVE', phone: '+1 234 567 910', type: 'TENANT', joinDate: '2023-03-03' },
    { id: '22', name: 'Victor Von Doom', email: 'victor@example.com', house: 'Block B, #25', status: 'ACTIVE', phone: '+1 234 567 911', type: 'OWNER', joinDate: '2021-10-31' },
    { id: '23', name: 'Wanda Maximoff', email: 'wanda@example.com', house: 'Block C, #08', status: 'ACTIVE', phone: '+1 234 567 912', type: 'OWNER', joinDate: '2022-11-01' },
    { id: '24', name: 'Xavier Renegade', email: 'xavier@example.com', house: 'Block A, #19', status: 'INACTIVE', phone: '+1 234 567 913', type: 'TENANT', joinDate: '2023-08-15' },
    { id: '25', name: 'Yolanda Hadid', email: 'yolanda@example.com', house: 'Block D, #04', status: 'ACTIVE', phone: '+1 234 567 914', type: 'OWNER', joinDate: '2022-04-18' },
  ]);

  // Mock Payment history data per resident
  const mockPayments: Record<string, Payment[]> = {
    '1': [
      { id: 'PMT-001', date: '2023-10-01', amount: 150.00, status: 'PAID', description: 'Monthly Maintenance Fee' },
      { id: 'PMT-002', date: '2023-09-01', amount: 150.00, status: 'PAID', description: 'Monthly Maintenance Fee' },
      { id: 'PMT-003', date: '2023-08-01', amount: 200.00, status: 'PAID', description: 'Clubhouse Event Fee' },
    ],
    '2': [
      { id: 'PMT-004', date: '2023-10-05', amount: 150.00, status: 'PAID', description: 'Monthly Maintenance Fee' },
      { id: 'PMT-005', date: '2023-09-05', amount: 150.00, status: 'PENDING', description: 'Monthly Maintenance Fee' },
    ],
    'default': [
      { id: 'PMT-MOCK', date: '2023-10-10', amount: 150.00, status: 'PAID', description: 'Community Sinking Fund' },
      { id: 'PMT-MOCK-2', date: '2023-09-10', amount: 150.00, status: 'OVERDUE', description: 'Security Levy' },
    ]
  };

  const filteredResidents = useMemo(() => {
    return residents.filter(r => {
      const matchesSearch = 
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.house.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || r.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [residents, searchTerm, statusFilter]);

  useEffect(() => setCurrentPage(1), [searchTerm, statusFilter]);

  const exportToCSV = () => {
    if (filteredResidents.length === 0) return alert("No data to export.");
    const headers = ['ID', 'Name', 'Email', 'House', 'Type', 'Phone', 'Status', 'Joined'];
    const dataRows = filteredResidents.map(r => [r.id, `"${r.name}"`, r.email, `"${r.house}"`, r.type, r.phone, r.status, r.joinDate]);
    const csvContent = [headers, ...dataRows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `bliss_residents_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const paginatedResidents = filteredResidents.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  const totalPages = Math.ceil(filteredResidents.length / rowsPerPage);

  const stats = {
    total: residents.length,
    active: residents.filter(r => r.status === 'ACTIVE').length,
    inactive: residents.filter(r => r.status === 'INACTIVE').length,
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20 md:pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#003067]">Resident Directory</h2>
          <p className="text-gray-500 font-medium">Detailed community registry and profile management.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={exportToCSV}
            className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
          >
            <Download size={18} /> Export List
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-[#0068B6] hover:bg-[#003067] text-white px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all active:scale-95"
          >
            <Plus size={18} /> Add Resident
          </button>
        </div>
      </div>

      {/* Filter Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { key: 'ALL', label: 'Total', count: stats.total, color: 'blue' },
          { key: 'ACTIVE', label: 'Active', count: stats.active, color: 'blue' },
          { key: 'INACTIVE', label: 'Inactive', count: stats.inactive, color: 'red' }
        ].map((item) => (
          <button 
            key={item.key}
            onClick={() => setStatusFilter(item.key as any)}
            className={`p-4 rounded-2xl border text-left transition-all ${
              statusFilter === item.key 
                ? item.color === 'blue' ? 'bg-[#0068B6] border-[#0068B6] text-white shadow-md' : 'bg-red-600 border-red-600 text-white shadow-md'
                : 'bg-white border-gray-200 text-gray-600 hover:border-[#0068B6]/30'
            }`}
          >
            <p className="text-[10px] font-black uppercase opacity-60 tracking-widest">{item.label}</p>
            <p className="text-2xl font-black">{item.count}</p>
          </button>
        ))}
      </div>

      {/* Search area */}
      <div className="bg-white p-3 rounded-2xl shadow-sm border">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search by name, block, or email..." 
            className="w-full pl-10 pr-4 py-3 bg-gray-50 text-black font-semibold border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-[#0068B6] outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* List Display */}
      {paginatedResidents.length > 0 ? (
        <>
          {/* Mobile UI */}
          <div className="md:hidden space-y-4">
            {paginatedResidents.map((r) => (
              <div 
                key={r.id} 
                onClick={() => setSelectedResident(r)}
                className="bg-white p-4 rounded-2xl shadow-sm border border-l-4 border-l-[#0068B6] active:scale-95 transition-transform"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center font-bold text-[#0068B6]">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-black">{r.name}</h4>
                      <p className="text-xs text-gray-500 font-medium">{r.house}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                    r.type === 'OWNER' ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-blue-50 text-blue-700 border border-blue-100'
                  }`}>
                    {r.type}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-bold text-gray-400 mt-3 pt-3 border-t">
                  <span>Joined {r.joinDate}</span>
                  <span className={r.status === 'ACTIVE' ? 'text-[#0068B6]' : 'text-red-500'}>{r.status}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-2xl shadow-sm border overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-xs font-black text-black uppercase tracking-widest">Resident</th>
                  <th className="px-6 py-4 text-xs font-black text-black uppercase tracking-widest">Type</th>
                  <th className="px-6 py-4 text-xs font-black text-black uppercase tracking-widest">Property</th>
                  <th className="px-6 py-4 text-xs font-black text-black uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-xs font-black text-black uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedResidents.map((r) => (
                  <tr 
                    key={r.id} 
                    onClick={() => setSelectedResident(r)}
                    className="hover:bg-blue-50/50 cursor-pointer transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center font-bold text-[#0068B6] text-sm group-hover:bg-[#0068B6] group-hover:text-white transition-colors">
                          {r.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-black">{r.name}</div>
                          <div className="text-xs text-gray-400 font-medium">{r.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border ${
                        r.type === 'OWNER' ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-blue-50 text-blue-600 border-blue-100'
                      }`}>
                        {r.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-black font-bold">{r.house}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                         <div className={`w-1.5 h-1.5 rounded-full ${r.status === 'ACTIVE' ? 'bg-[#0068B6]' : 'bg-red-500'}`} />
                         <span className="text-xs font-bold text-gray-600">{r.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-gray-300 group-hover:text-[#0068B6] transition-colors">
                        <ArrowUpRight size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 bg-white p-4 rounded-2xl border">
              <p className="text-sm text-gray-500 font-bold hidden sm:block">
                Page <span className="text-[#0068B6] font-black">{currentPage}</span> of {totalPages}
              </p>
              <div className="flex items-center gap-2 mx-auto sm:mx-0">
                <button 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  className="p-2 rounded-xl bg-gray-50 border text-gray-600 disabled:opacity-30 hover:bg-gray-100 transition-all"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-xl font-black transition-all text-xs ${
                        currentPage === page ? 'bg-[#0068B6] text-white shadow-md' : 'bg-gray-50 text-gray-600 border hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="p-2 rounded-xl bg-gray-50 border text-gray-600 disabled:opacity-30 hover:bg-gray-100 transition-all"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white p-12 rounded-2xl border border-dashed text-center flex flex-col items-center justify-center gap-4">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
            <Search className="text-gray-200 w-10 h-10" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">No results found</h3>
          <button onClick={() => { setSearchTerm(''); setStatusFilter('ALL'); }} className="text-[#0068B6] font-bold hover:underline">Clear all filters</button>
        </div>
      )}

      {/* Resident Detail Modal */}
      {selectedResident && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#003067]/60 backdrop-blur-md" onClick={() => setSelectedResident(null)} />
          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 duration-300 flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-6 md:p-8 bg-[#003067] text-white flex justify-between items-start">
              <div className="flex gap-4 items-center">
                <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center font-black text-3xl border border-white/20">
                  {selectedResident.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-2xl font-black">{selectedResident.name}</h3>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${
                      selectedResident.type === 'OWNER' ? 'bg-amber-500 text-white' : 'bg-blue-500 text-white'
                    }`}>
                      {selectedResident.type}
                    </span>
                  </div>
                  <p className="text-blue-100 font-medium opacity-80 flex items-center gap-2">
                    <Home size={16} /> {selectedResident.house}
                  </p>
                </div>
              </div>
              <button onClick={() => setSelectedResident(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-[#f8fafc]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DetailCard label="Contact Details" icon={Mail} content={selectedResident.email} secondary={selectedResident.phone} />
                <DetailCard label="Status & Joining" icon={Calendar} content={selectedResident.status} secondary={`Member since ${selectedResident.joinDate}`} />
                <DetailCard label="Admin Tags" icon={ShieldCheck} content="Verified" secondary={`Unique ID: BL-0${selectedResident.id}`} />
              </div>

              {/* Payment History Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-black text-[#003067] flex items-center gap-2">
                    <CreditCard size={20} className="text-[#0068B6]" />
                    Payment History
                  </h4>
                  <button className="text-sm font-bold text-[#0068B6] hover:underline flex items-center gap-1">
                    View Ledger <ArrowUpRight size={14} />
                  </button>
                </div>

                <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-3 text-[10px] font-black uppercase text-gray-400">Date</th>
                        <th className="px-6 py-3 text-[10px] font-black uppercase text-gray-400">Description</th>
                        <th className="px-6 py-3 text-[10px] font-black uppercase text-gray-400">Amount</th>
                        <th className="px-6 py-3 text-[10px] font-black uppercase text-gray-400">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {(mockPayments[selectedResident.id] || mockPayments['default']).map((pmt) => (
                        <tr key={pmt.id} className="text-sm">
                          <td className="px-6 py-4 font-bold text-gray-600">{pmt.date}</td>
                          <td className="px-6 py-4 text-gray-500 font-medium">{pmt.description}</td>
                          <td className="px-6 py-4 font-black text-[#003067]">${pmt.amount.toFixed(2)}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                              pmt.status === 'PAID' ? 'bg-green-50 text-green-700' : 
                              pmt.status === 'PENDING' ? 'bg-orange-50 text-orange-700' : 'bg-red-50 text-red-700'
                            }`}>
                              {pmt.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t bg-white flex gap-3 justify-end">
              <button className="px-6 py-2.5 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-all">
                Close
              </button>
              <button className="px-6 py-2.5 bg-[#0068B6] text-white font-bold rounded-xl hover:bg-[#003067] shadow-lg shadow-blue-100 transition-all flex items-center gap-2">
                <Edit2 size={16} /> Edit Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal (Unchanged structurally, just ensuring z-index) */}
      {showAddModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#003067]/40 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Modal Form Content ... (existing add resident form) */}
            <div className="p-6 bg-gray-50 border-b flex justify-between items-center">
              <h3 className="text-xl font-black text-[#003067]">Register Resident</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-gray-200 rounded-lg"><X size={20}/></button>
            </div>
            <div className="p-8">
               <p className="text-center text-gray-400 font-medium">Standard registration form would appear here.</p>
               <button onClick={() => setShowAddModal(false)} className="w-full mt-6 bg-[#0068B6] text-white py-3 rounded-xl font-bold">Close Form</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DetailCard: React.FC<{ label: string, icon: any, content: string, secondary: string }> = ({ label, icon: Icon, content, secondary }) => (
  <div className="bg-white p-5 rounded-2xl border shadow-sm group hover:border-[#0068B6]/30 transition-all">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0068B6] flex items-center justify-center group-hover:bg-[#0068B6] group-hover:text-white transition-colors">
        <Icon size={18} />
      </div>
      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
    </div>
    <p className="text-black font-black text-sm mb-1">{content}</p>
    <p className="text-xs text-gray-500 font-medium">{secondary}</p>
  </div>
);

export default ResidentsList;
