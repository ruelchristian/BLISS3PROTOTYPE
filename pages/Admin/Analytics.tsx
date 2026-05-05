
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';
import { 
  TrendingUp, TrendingDown, DollarSign, ClipboardList, 
  Users, CheckCircle, Calendar, Filter, Download, 
  ArrowUpRight, Target, Activity
} from 'lucide-react';

const revenueData = [
  { month: 'Jan', amount: 18500, target: 20000 },
  { month: 'Feb', amount: 21000, target: 20000 },
  { month: 'Mar', amount: 19800, target: 20000 },
  { month: 'Apr', amount: 24500, target: 22000 },
  { month: 'May', amount: 22000, target: 22000 },
  { month: 'Jun', amount: 26800, target: 24000 },
];

const categoryData = [
  { name: 'Maintenance', value: 45, color: '#0068B6' },
  { name: 'Construction', value: 25, color: '#003067' },
  { name: 'Venue', value: 15, color: '#3B82F6' },
  { name: 'Other', value: 15, color: '#94A3B8' },
];

const resolutionData = [
  { day: 'Mon', solved: 12, received: 14 },
  { day: 'Tue', solved: 18, received: 16 },
  { day: 'Wed', solved: 15, received: 15 },
  { day: 'Thu', solved: 22, received: 20 },
  { day: 'Fri', solved: 10, received: 12 },
];

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('Last 6 Months');

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#003067] tracking-tight uppercase">Operational Intelligence</h2>
          <p className="text-gray-500 font-medium">Deep dive into Pasig Bliss III community performance and financial health.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="appearance-none bg-white border border-gray-200 px-10 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-[#0068B6] shadow-sm cursor-pointer"
            >
              <option>Last 30 Days</option>
              <option>Last 6 Months</option>
              <option>Year to Date</option>
            </select>
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0068B6] w-4 h-4 pointer-events-none" />
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-3 h-3 pointer-events-none" />
          </div>
          <button className="bg-[#003067] text-white px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-900/10 hover:bg-[#002045] transition-all active:scale-95">
            <Download size={18} />
            <span className="hidden sm:inline">Export Report</span>
          </button>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard 
          title="Collection Efficiency" 
          value="96.4%" 
          trend="+2.1%" 
          isPositive={true} 
          icon={Target} 
          desc="vs Last Month"
        />
        <KPICard 
          title="Avg. Resolution Time" 
          value="1.8 Days" 
          trend="-0.4" 
          isPositive={true} 
          icon={Activity} 
          desc="Days per request"
        />
        <KPICard 
          title="Net Revenue" 
          value="$132.4K" 
          trend="+$12K" 
          isPositive={true} 
          icon={DollarSign} 
          desc="Q2 Performance"
        />
        <KPICard 
          title="Resident Activity" 
          value="84%" 
          trend="-1.2%" 
          isPositive={false} 
          icon={Users} 
          desc="Digital portal usage"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Financial Trends Area Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-black text-[#003067] uppercase tracking-tight">Revenue Stream</h3>
              <p className="text-xs text-gray-400 font-bold uppercase">Monthly Actual vs Target Collection</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#0068B6]"></div>
                <span className="text-[10px] font-black text-gray-400 uppercase">Actual</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                <span className="text-[10px] font-black text-gray-400 uppercase">Target</span>
              </div>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0068B6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0068B6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 10, fontWeight: 900, fill: '#94A3B8'}} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 10, fontWeight: 900, fill: '#94A3B8'}} 
                />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold'}}
                />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#0068B6" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorAmount)" 
                  animationDuration={2000}
                />
                <Area 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#e2e8f0" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  fill="transparent"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Pie Chart */}
        <div className="bg-white p-6 rounded-3xl border shadow-sm flex flex-col">
          <h3 className="text-lg font-black text-[#003067] uppercase tracking-tight mb-2">Service Allocation</h3>
          <p className="text-xs text-gray-400 font-bold uppercase mb-8">Request Volume by Category</p>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full space-y-2 mt-4">
              {categoryData.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{backgroundColor: item.color}}></div>
                    <span className="text-[10px] font-black uppercase text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-xs font-black text-[#003067]">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Line Chart */}
        <div className="bg-white p-6 rounded-3xl border shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-black text-[#003067] uppercase tracking-tight">Support Velocity</h3>
              <p className="text-xs text-gray-400 font-bold uppercase">Requests Received vs Resolved</p>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={resolutionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#94A3B8'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#94A3B8'}} />
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', paddingTop: '20px'}} />
                <Line type="stepAfter" dataKey="received" stroke="#003067" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} name="Incoming Tickets" />
                <Line type="monotone" dataKey="solved" stroke="#10B981" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} name="Completed Tasks" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Delinquent/Risk Units */}
        <div className="bg-white p-6 rounded-3xl border shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-black text-red-600 uppercase tracking-tight">Risk Spotlight</h3>
              <p className="text-xs text-gray-400 font-bold uppercase">Accounts requiring attention</p>
            </div>
            <button className="text-[10px] font-black text-[#0068B6] uppercase hover:underline">Full Audit Log</button>
          </div>
          <div className="space-y-3">
            {[
              { unit: 'Block A, #42', resident: 'Diana Prince', overdue: '$2,450', risk: 'High', color: 'bg-red-50 text-red-600' },
              { unit: 'Block B, #10', resident: 'James Logan', overdue: '$1,200', risk: 'Medium', color: 'bg-orange-50 text-orange-600' },
              { unit: 'Block D, #04', resident: 'Yolanda Hadid', overdue: '$840', risk: 'Medium', color: 'bg-orange-50 text-orange-600' },
              { unit: 'Block C, #22', resident: 'Charlie Davis', overdue: '$450', risk: 'Low', color: 'bg-blue-50 text-blue-600' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-transparent hover:border-gray-200 transition-all cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border flex items-center justify-center font-black text-[#003067]">
                    {item.unit.split('#')[1]}
                  </div>
                  <div>
                    <p className="text-sm font-black text-gray-900 group-hover:text-[#0068B6] transition-colors">{item.resident}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">{item.unit}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-red-500">{item.overdue}</p>
                  <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${item.color}`}>
                    {item.risk} Risk
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const KPICard: React.FC<{ 
  title: string; 
  value: string; 
  trend: string; 
  isPositive: boolean; 
  icon: React.ElementType; 
  desc: string;
}> = ({ title, value, trend, isPositive, icon: Icon, desc }) => (
  <div className="bg-white p-6 rounded-3xl border shadow-sm hover:shadow-md transition-all group">
    <div className="flex items-center justify-between mb-4">
      <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0068B6] flex items-center justify-center group-hover:bg-[#0068B6] group-hover:text-white transition-all">
        <Icon size={20} />
      </div>
      <div className={`flex items-center gap-1 text-[10px] font-black uppercase px-2 py-1 rounded-full ${
        isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
      }`}>
        {isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
        {trend}
      </div>
    </div>
    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{title}</h3>
    <div className="flex items-baseline gap-2">
      <p className="text-2xl font-black text-[#003067] tracking-tight">{value}</p>
      <p className="text-[10px] font-medium text-gray-400">{desc}</p>
    </div>
  </div>
);

export default Analytics;
