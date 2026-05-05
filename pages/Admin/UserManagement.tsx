
import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  MoreVertical, 
  Shield, 
  ShieldCheck, 
  ShieldAlert,
  Mail,
  Calendar,
  Trash2,
  Edit2
} from 'lucide-react';
import { UserRole } from '../../types';

interface ManagedUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  lastLogin: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<ManagedUser[]>([
    { id: '1', name: 'Head Administrator', email: 'admin@bliss3.com', role: UserRole.SUPERADMIN, status: 'ACTIVE', lastLogin: '2023-10-12 09:45' },
    { id: '2', name: 'Sarah Miller', email: 'sarah.m@bliss3.com', role: UserRole.ADMIN, status: 'ACTIVE', lastLogin: '2023-10-11 14:20' },
    { id: '3', name: 'Robert Chen', email: 'robert.c@bliss3.com', role: UserRole.ADMIN, status: 'INACTIVE', lastLogin: '2023-10-05 11:10' },
    { id: '4', name: 'Office Staff A', email: 'staff.a@bliss3.com', role: UserRole.ADMIN, status: 'PENDING', lastLogin: 'Never' },
  ]);

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case UserRole.SUPERADMIN: return <ShieldAlert className="text-red-500" size={16} />;
      case UserRole.ADMIN: return <ShieldCheck className="text-blue-500" size={16} />;
      default: return <Shield className="text-gray-400" size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-50 text-green-700 border-green-100';
      case 'INACTIVE': return 'bg-red-50 text-red-700 border-red-100';
      case 'PENDING': return 'bg-amber-50 text-amber-700 border-amber-100';
      default: return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#003067]">User Management</h2>
          <p className="text-gray-500 font-medium">Manage administrative access and system permissions.</p>
        </div>
        <button className="bg-[#0068B6] hover:bg-[#003067] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-100 transition-all active:scale-95">
          <UserPlus size={20} />
          Add New User
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-3xl border shadow-sm">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Admins</p>
          <p className="text-3xl font-black text-black">{users.length}</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border shadow-sm">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Active Now</p>
          <p className="text-3xl font-black text-green-600">2</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border shadow-sm">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Pending Invites</p>
          <p className="text-3xl font-black text-amber-500">1</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
        <div className="p-4 border-b flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 text-black font-bold border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#0068B6] outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl text-xs font-black uppercase tracking-widest text-gray-500 border">
              <Filter size={14} /> Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b">User</th>
                <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b">Role</th>
                <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b">Status</th>
                <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b">Last Login</th>
                <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center border text-[#0068B6] font-bold">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-black text-gray-900 group-hover:text-[#0068B6] transition-colors">{u.name}</p>
                        <p className="text-xs text-gray-500 font-medium flex items-center gap-1">
                          <Mail size={12} /> {u.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {getRoleIcon(u.role)}
                      <span className="text-xs font-bold text-gray-700">{u.role}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(u.status)}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <p className="text-xs text-gray-500 font-medium flex items-center gap-1">
                      <Calendar size={12} /> {u.lastLogin}
                    </p>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-[#0068B6] hover:bg-blue-50 rounded-lg transition-all">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
