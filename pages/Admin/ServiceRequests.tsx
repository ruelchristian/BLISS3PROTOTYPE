
import React from 'react';
import { 
  Search, Filter, CheckCircle, Clock, AlertTriangle, 
  ArrowRight, HardHat, Tent, Wifi, PenTool, Hammer, 
  MessageSquare, FileText, PlusCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ServiceCategory } from '../../types';

const ServiceRequests: React.FC = () => {
  const navigate = useNavigate();
  const requests = [
    { id: 'REQ-C01', resident: 'John Smith', title: 'Tiling & Painting', category: 'CONSTRUCTION_PERMIT' as ServiceCategory, status: 'PENDING', date: '2023-10-10' },
    { id: 'REQ-V02', resident: 'Maria Garcia', title: 'Basketball Court Usage', category: 'VENUE_PERMIT' as ServiceCategory, status: 'IN_PROGRESS', date: '2023-10-11' },
    { id: 'REQ-M03', resident: 'Robert Chen', title: 'Sink Pipe Leakage', category: 'MAINTENANCE_PERMIT' as ServiceCategory, status: 'COMPLETED', date: '2023-10-09' },
    { id: 'REQ-B04', resident: 'Sarah Miller', title: 'Drill & Ladder Borrow', category: 'BORROWERS_SLIP' as ServiceCategory, status: 'PENDING', date: '2023-10-12' },
  ];

  const getCategoryIcon = (category: ServiceCategory) => {
    switch (category) {
      case 'CONSTRUCTION_PERMIT': return <HardHat size={18} />;
      case 'VENUE_PERMIT': return <Tent size={18} />;
      case 'INTERNET_INSTALL': return <Wifi size={18} />;
      case 'BORROWERS_SLIP': return <PenTool size={18} />;
      case 'MAINTENANCE_PERMIT': return <Hammer size={18} />;
      case 'SATISFACTION_FEEDBACK': return <MessageSquare size={18} />;
      default: return <FileText size={18} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-orange-50 text-orange-700';
      case 'IN_PROGRESS': return 'bg-blue-50 text-[#0068B6]';
      case 'COMPLETED': return 'bg-blue-50 text-[#0068B6]';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#003067]">Service Requests</h2>
          <p className="text-gray-500 font-medium">Permit approvals and service dispatch management.</p>
        </div>
        <button 
          onClick={() => navigate('/admin/create-request')}
          className="bg-[#0068B6] hover:bg-[#003067] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-100 transition-all active:scale-95"
        >
          <PlusCircle size={20} />
          Create New Permit
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatSummary title="Active Permits" count="2" icon={HardHat} color="orange" />
        <StatSummary title="Venue Bookings" count="1" icon={Tent} color="blue" />
        <StatSummary title="Resolved Today" count="1" icon={CheckCircle} color="blue" />
      </div>

      <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
        <div className="p-4 border-b flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search e-Permits..." 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 text-black font-bold border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#0068B6] outline-none"
            />
          </div>
          <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#0068B6]">
            <Filter size={16} /> Advanced Filters
          </button>
        </div>

        <div className="divide-y divide-gray-50">
          {requests.map((req) => (
            <div key={req.id} className="p-5 hover:bg-gray-50 transition-colors flex items-center justify-between group cursor-pointer">
              <div className="flex items-start gap-4">
                <div className={`mt-1 p-3 rounded-2xl ${getStatusColor(req.status)} flex items-center justify-center`}>
                  {getCategoryIcon(req.category)}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{req.id}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span className="text-[10px] font-black text-[#0068B6] uppercase tracking-widest">{req.category.replace('_', ' ')}</span>
                  </div>
                  <h4 className="font-black text-gray-900 group-hover:text-[#0068B6] transition-colors">{req.title}</h4>
                  <p className="text-xs text-gray-500 font-bold">Resident: {req.resident} • Received {req.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2">
                   <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(req.status)}`}>
                    {req.status}
                  </div>
                </div>
                <button className="p-2 text-gray-300 group-hover:text-[#0068B6] transition-all">
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatSummary: React.FC<{ title: string; count: string; icon: any; color: string }> = ({ title, count, icon: Icon, color }) => (
  <div className={`bg-white p-5 rounded-3xl border border-l-8 ${color === 'orange' ? 'border-l-orange-500' : 'border-l-[#0068B6]'} flex justify-between items-center shadow-sm`}>
    <div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{title}</p>
      <p className="text-3xl font-black text-black tracking-tight">{count}</p>
    </div>
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color === 'orange' ? 'bg-orange-50 text-orange-500' : 'bg-blue-50 text-[#0068B6]'}`}>
      <Icon size={24} />
    </div>
  </div>
);

export default ServiceRequests;
