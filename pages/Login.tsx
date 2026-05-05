
import React, { useState } from 'react';
import { UserRole, User } from '../types';
import { Building2, LogIn } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [role] = useState<UserRole>(UserRole.SUPERADMIN);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mockUser: User = {
      id: 'super_1',
      name: 'System Superadmin',
      email: email || 'superadmin@bliss3.com',
      role: UserRole.SUPERADMIN,
      avatar: `https://picsum.photos/seed/SUPERADMIN/200`
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
          <h1 className="text-2xl font-black text-[#003067] tracking-tight mb-1">Pasig Bliss III</h1>
          <p className="text-gray-500 font-medium text-sm">Admin Information System</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 pt-4 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">Username</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 bg-gray-50 text-black font-semibold border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0068B6] focus:border-[#0068B6] transition-all outline-none placeholder:text-gray-300"
                placeholder="Enter Username"
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
            AUTHORIZE ACCESS
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
