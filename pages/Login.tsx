
import React, { useState } from 'react';
import { UserRole, User } from '../types';
import { Building2, LogIn } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.RESIDENT);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mockUser: User = {
      id: role === UserRole.ADMIN ? 'admin_1' : 'res_1',
      name: role === UserRole.ADMIN ? 'Head Administrator' : 'Alex Resident',
      email: email || (role === UserRole.ADMIN ? 'admin@bliss3.com' : 'resident@bliss3.com'),
      role,
      houseNumber: role === UserRole.RESIDENT ? 'Block B, #104' : undefined,
      avatar: `https://picsum.photos/seed/${role}/200`
    };
    onLogin(mockUser);
  };

  return (
    <div className="min-h-screen bg-[#003067] flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[120px]"></div>
      </div>
      
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10 border border-white/20">
        <div className="p-8 text-center bg-gradient-to-b from-blue-50 to-white">
          <div className="w-16 h-16 bg-[#0068B6] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-200">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-black text-[#003067] tracking-tight mb-1">Bliss III Admin Office</h1>
          <p className="text-gray-500 font-medium text-sm">Community Administrative Access</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 pt-4 space-y-6">
          <div className="flex bg-gray-100 p-1 rounded-2xl border border-gray-200">
            <button
              type="button"
              onClick={() => setRole(UserRole.RESIDENT)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                role === UserRole.RESIDENT ? 'bg-white text-[#0068B6] shadow-sm' : 'text-gray-400'
              }`}
            >
              Resident
            </button>
            <button
              type="button"
              onClick={() => setRole(UserRole.ADMIN)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                role === UserRole.ADMIN ? 'bg-white text-[#0068B6] shadow-sm' : 'text-gray-400'
              }`}
            >
              Admin
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">Email Address</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 bg-gray-50 text-black font-semibold border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0068B6] focus:border-[#0068B6] transition-all outline-none placeholder:text-gray-300"
                placeholder="office@bliss3.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 bg-gray-50 text-black font-semibold border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0068B6] focus:border-[#0068B6] transition-all outline-none placeholder:text-gray-300"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#0068B6] hover:bg-[#003067] text-white font-black py-4 px-4 rounded-xl shadow-xl shadow-blue-100 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <LogIn size={20} />
            SIGN IN
          </button>
        </form>

        <div className="p-6 bg-gray-50 text-center border-t border-gray-100">
          <p className="text-xs text-gray-400 font-bold">
            Authorized Personnel & Residents Only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
