
import React from 'react';
import { User, UserRole } from '../types';
import { Navigate } from 'react-router-dom';
import { 
  Users, 
  ClipboardList, 
  CreditCard, 
  Bell, 
  TrendingUp, 
  Activity,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Jan', requests: 120, payments: 450 },
  { name: 'Feb', requests: 150, payments: 380 },
  { name: 'Mar', requests: 200, payments: 890 },
  { name: 'Apr', requests: 178, payments: 620 },
  { name: 'May', requests: 210, payments: 540 },
  { name: 'Jun', requests: 190, payments: 700 },
];

const Dashboard: React.FC<{ user: User }> = ({ user }) => {
  // Security check - double-ensure residents can't see this even if they try routing
  if (user.role !== UserRole.ADMIN) {
    return <Navigate to="/welcome" />;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#003067] tracking-tight">Bliss III Command Center</h2>
          <p className="text-gray-500 font-medium">Administrative overview of community operations.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-blue-50 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-xs font-bold text-gray-700 uppercase tracking-tight">Live Terminal Connected</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Residents" 
          value="842" 
          icon={Users}
          trend="+4 this week"
          color="blue"
        />
        <StatCard 
          title="Pending Requests" 
          value="14" 
          icon={ClipboardList}
          trend="3 High Priority"
          color="blue"
        />
        <StatCard 
          title="Revenue (Jun)" 
          value="$24,800" 
          icon={Activity}
          trend="98% collected"
          color="blue"
        />
        <StatCard 
          title="Security Alerts" 
          value="0" 
          icon={ShieldCheck}
          trend="All clear"
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-[#003067]">Administrative Performance</h3>
            <select className="text-xs font-bold bg-gray-50 border-gray-200 rounded-lg py-1 px-3 outline-none">
              <option>Last 6 months</option>
              <option>Year-to-date</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 'bold'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 'bold'}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="payments" fill="#0068B6" radius={[4, 4, 0, 0]} name="Payments ($)" />
                <Bar dataKey="requests" fill="#003067" radius={[4, 4, 0, 0]} name="Svc Requests" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Action Queue */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h3 className="font-bold text-[#003067] mb-6">Action Queue</h3>
          <div className="space-y-4">
            {[
              { label: 'Verify Payment', user: 'Unit 402', time: '10m ago', icon: CreditCard },
              { label: 'Plumbing Emergency', user: 'Unit 104', time: '45m ago', icon: ClipboardList, urgent: true },
              { label: 'New Resident Auth', user: 'Unit 612', time: '2h ago', icon: Users },
              { label: 'CCTV Review', user: 'Admin', time: '4h ago', icon: ShieldCheck },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group border border-transparent hover:border-gray-100">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  item.urgent ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-[#0068B6]'
                }`}>
                  <item.icon size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="text-sm font-bold text-gray-900">{item.label}</p>
                    {item.urgent && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>}
                  </div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{item.user} • {item.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 text-xs font-black uppercase tracking-widest text-[#0068B6] hover:bg-blue-50 rounded-xl transition-all flex items-center justify-center gap-2">
            Full Operations Queue <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ 
  title: string; 
  value: string; 
  icon: React.ElementType; 
  trend: string;
  color: string;
}> = ({ title, value, icon: Icon, trend, color }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-lg transition-all border-b-4 border-b-transparent hover:border-b-[#0068B6]">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-blue-50 text-[#0068B6]`}>
          <Icon size={24} />
        </div>
        <div className="flex items-center text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full text-[#0068B6] bg-blue-50">
          <TrendingUp className="w-3 h-3 mr-1" />
          {trend}
        </div>
      </div>
      <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{title}</h3>
      <p className="text-2xl font-black text-[#003067] tracking-tight">{value}</p>
    </div>
  );
};

export default Dashboard;
