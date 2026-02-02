
import React from 'react';
import { User } from '../types';
import { 
  Home, 
  PlusCircle, 
  History, 
  Bell, 
  PhoneCall, 
  ArrowRight,
  ShieldCheck,
  Building2,
  CalendarDays
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Welcome: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Hero Welcome */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#003067] to-[#0068B6] p-8 md:p-12 text-white">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Good day, {user.name.split(' ')[0]}!</h2>
          <p className="text-blue-100 text-lg mb-8 opacity-90">
            Welcome to the Bliss III Admin Office. How can we assist you with your community needs today?
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/resident/submit-request" 
              className="bg-white text-[#003067] px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-50 transition-colors"
            >
              <PlusCircle size={20} />
              New Service Request
            </Link>
            <Link 
              to="/emergency" 
              className="bg-red-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-red-600 transition-colors shadow-lg shadow-red-900/20"
            >
              <PhoneCall size={20} />
              Emergency Support
            </Link>
          </div>
        </div>
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 mr-12 mb-12 opacity-10">
          <Building2 size={200} />
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickActionCard 
          to="/resident/history"
          title="Payment History"
          desc="View recent dues & receipts"
          icon={History}
          color="blue"
        />
        <QuickActionCard 
          to="/announcements"
          title="Community Board"
          desc="Latest news & updates"
          icon={Bell}
          color="blue"
        />
        <QuickActionCard 
          to="/resident/profile"
          title="My Property"
          desc="Manage profile & house info"
          icon={Home}
          color="blue"
        />
        <QuickActionCard 
          to="/emergency"
          title="Security Office"
          desc="Direct line to safety"
          icon={ShieldCheck}
          color="blue"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Office Status */}
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-lg font-bold text-[#003067] mb-4 flex items-center gap-2">
            <CalendarDays className="text-[#0068B6]" />
            Office Status
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-gray-500 font-medium">Monday - Friday</span>
              <span className="font-bold text-black">08:00 AM - 05:00 PM</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-gray-500 font-medium">Saturday</span>
              <span className="font-bold text-black">09:00 AM - 12:00 PM</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-500 font-medium">Sunday</span>
              <span className="text-red-500 font-bold">Closed</span>
            </div>
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-xl flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <p className="text-sm font-semibold text-[#003067]">The Admin Office is currently OPEN</p>
          </div>
        </div>

        {/* Community Highlight */}
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-lg font-bold text-[#003067] mb-4 flex items-center gap-2">
            <Bell className="text-[#0068B6]" />
            Recent Announcements
          </h3>
          <div className="space-y-4">
            <div className="p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">URGENT</span>
                <span className="text-[10px] text-gray-400">2h ago</span>
              </div>
              <h4 className="font-bold text-black group-hover:text-[#0068B6] transition-colors">Water Maintenance: Block B</h4>
              <p className="text-xs text-gray-500 line-clamp-1">Scheduled maintenance will occur tomorrow...</p>
            </div>
            <div className="p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-[#0068B6] bg-blue-50 px-2 py-0.5 rounded">EVENT</span>
                <span className="text-[10px] text-gray-400">1d ago</span>
              </div>
              <h4 className="font-bold text-black group-hover:text-[#0068B6] transition-colors">Bliss III Community BBQ</h4>
              <p className="text-xs text-gray-500 line-clamp-1">Join us this Saturday for a neighborhood social...</p>
            </div>
          </div>
          <Link to="/announcements" className="mt-4 block text-center text-sm font-bold text-[#0068B6] hover:underline">
            View all announcements
          </Link>
        </div>
      </div>
    </div>
  );
};

const QuickActionCard: React.FC<{ to: string; title: string; desc: string; icon: React.ElementType; color: string }> = ({ to, title, desc, icon: Icon }) => (
  <Link 
    to={to} 
    className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group"
  >
    <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0068B6] flex items-center justify-center mb-4 group-hover:bg-[#0068B6] group-hover:text-white transition-colors">
      <Icon size={24} />
    </div>
    <h3 className="font-bold text-black mb-1 flex items-center gap-2">
      {title}
      <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
    </h3>
    <p className="text-xs text-gray-500 font-medium">{desc}</p>
  </Link>
);

export default Welcome;
