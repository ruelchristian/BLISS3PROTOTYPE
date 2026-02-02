import React, { useState } from 'react';
import { Search, Filter, CheckCircle, Clock, AlertTriangle, ArrowRight } from 'lucide-react';

const ServiceRequests: React.FC = () => {
  const requests = [
    { id: 'REQ-001', resident: 'John Smith', title: 'Streetlight Broken', category: 'MAINTENANCE', status: 'PENDING', date: '2023-10-10' },
    { id: 'REQ-002', resident: 'Maria Garcia', title: 'Unidentified Vehicle', category: 'SECURITY', status: 'IN_PROGRESS', date: '2023-10-11' },
    { id: 'REQ-003', resident: 'Robert Chen', title: 'Pipe Leakage', category: 'UTILITIES', status: 'COMPLETED', date: '2023-10-09' },
    { id: 'REQ-004', resident: 'Sarah Miller', title: 'Gym Equipment Repair', category: 'MAINTENANCE', status: 'PENDING', date: '2023-10-12' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING': return <Clock className="w-4 h-4 text-orange-500" />;
      case 'IN_PROGRESS': return <AlertTriangle className="w-4 h-4 text-[#0068B6]" />;
      case 'COMPLETED': return <CheckCircle className="w-4 h-4 text-[#0068B6]" />;
      default: return null;
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
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-[#003067]">Service Request Queue</h2>
        <p className="text-gray-500 font-medium">Track and manage maintenance and security requests.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-l-4 border-l-orange-500 flex justify-between items-center shadow-sm">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pending</p>
            <p className="text-2xl font-bold text-black">12</p>
          </div>
          <Clock className="text-orange-200 w-10 h-10" />
        </div>
        <div className="bg-white p-4 rounded-xl border border-l-4 border-l-[#0068B6] flex justify-between items-center shadow-sm">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">In Progress</p>
            <p className="text-2xl font-bold text-black">5</p>
          </div>
          <AlertTriangle className="text-blue-200 w-10 h-10" />
        </div>
        <div className="bg-white p-4 rounded-xl border border-l-4 border-l-[#003067] flex justify-between items-center shadow-sm">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Completed Today</p>
            <p className="text-2xl font-bold text-black">8</p>
          </div>
          <CheckCircle className="text-blue-200 w-10 h-10" />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="p-4 border-b flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Filter by ID, resident, or title..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 text-black font-bold border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#0068B6] outline-none placeholder:text-gray-400"
            />
          </div>
          <button className="flex items-center gap-2 text-sm font-bold text-[#0068B6] hover:underline">
            <Filter size={16} /> Filters
          </button>
        </div>

        <div className="divide-y divide-gray-100">
          {requests.map((req) => (
            <div key={req.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between group">
              <div className="flex items-start gap-4">
                <div className={`mt-1 p-2 rounded-lg ${getStatusColor(req.status)}`}>
                  {getStatusIcon(req.status)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-400">{req.id}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-tight">{req.category}</span>
                  </div>
                  <h4 className="font-bold text-black group-hover:text-[#0068B6] transition-colors">{req.title}</h4>
                  <p className="text-sm text-black font-medium opacity-60">Requested by {req.resident} • {req.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden md:block">
                   <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${getStatusColor(req.status)}`}>
                    {req.status.replace('_', ' ')}
                  </span>
                </div>
                <button className="p-2 text-gray-400 hover:text-[#0068B6] transition-all hover:bg-blue-50 rounded-lg">
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

export default ServiceRequests;