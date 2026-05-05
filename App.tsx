
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
// Fix: Import icons from 'lucide-react' instead of './types'
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  ClipboardList, 
  LogOut, 
  Menu, 
  X, 
  User as UserIcon,
  BarChart3,
  ShieldCheck
} from 'lucide-react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Buildings from './pages/Admin/Buildings';
import ServiceRequests from './pages/Admin/ServiceRequests';
import Payments from './pages/Admin/Payments';
import Analytics from './pages/Admin/Analytics';
import UserManagement from './pages/Admin/UserManagement';
import SubmitRequest from './pages/Resident/SubmitRequest';
// Import User and UserRole from types.ts
import { User, UserRole } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('village_user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('village_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('village_user');
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
        
        {/* Protected Layout Route */}
        <Route 
          element={user ? <MainLayout user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}
        >
          {/* Landing page logic */}
          <Route path="/" element={<Navigate to="/admin/dashboard" />} />
          
          {/* Admin Routes */}
          <Route 
            path="/admin/dashboard" 
            element={<Dashboard user={user!} />} 
          />
          <Route 
            path="/admin/buildings" 
            element={<Buildings />} 
          />
          <Route 
            path="/admin/requests" 
            element={<ServiceRequests />} 
          />
          <Route 
            path="/admin/payments" 
            element={<Payments />} 
          />
          <Route 
            path="/admin/analytics" 
            element={<Analytics />} 
          />
          <Route 
            path="/admin/users" 
            element={<UserManagement />} 
          />
          <Route 
            path="/admin/create-request" 
            element={<SubmitRequest user={user!} />} 
          />
          
          {/* Catch-all redirect to dashboard */}
          <Route path="*" element={<Navigate to="/admin/dashboard" />} />
        </Route>
      </Routes>
    </Router>
  );
};

const MainLayout: React.FC<{ user: User; onLogout: () => void }> = ({ user, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: 'Buildings', icon: Users, path: '/admin/buildings' },
    { name: 'Service Request', icon: ClipboardList, path: '/admin/requests' },
    { name: 'Payments', icon: CreditCard, path: '/admin/payments' },
    { name: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
    { name: 'User Management', icon: ShieldCheck, path: '/admin/users' },
  ];

  const handleLogoutClick = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Top Header */}
      <header className="bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden p-1">
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#0068B6] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <h1 className="font-bold text-lg text-[#003067] hidden sm:block">Pasig Bliss III</h1>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-black">{user.name}</p>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{user.role}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center border-2 border-[#0068B6] overflow-hidden shadow-sm">
            {user.avatar ? (
              <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <UserIcon className="w-6 h-6 text-[#0068B6]" />
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
            <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl animate-in slide-in-from-left duration-200">
              <div className="p-6 border-b flex justify-between items-center bg-[#003067] text-white">
                <div className="flex items-center gap-2">
                   <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
                    <span className="text-[#003067] font-bold text-xs">P</span>
                  </div>
                  <span className="font-bold">Pasig Bliss III</span>
                </div>
                <button onClick={() => setSidebarOpen(false)}><X className="w-6 h-6 text-white/70" /></button>
              </div>
              <nav className="p-4 flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                      location.pathname === item.path ? 'bg-blue-50 text-[#0068B6] font-bold shadow-sm' : 'text-gray-600 font-medium hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                ))}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <button
                    onClick={handleLogoutClick}
                    className="w-full flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-bold"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </nav>
            </div>
          </div>
        )}

        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-[#003067] p-4 gap-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                location.pathname === item.path ? 'bg-[#0068B6] text-white shadow-lg' : 'text-blue-100/70 hover:bg-[#0068B6]/20 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-bold">{item.name}</span>
            </Link>
          ))}
          <div className="mt-auto pt-4 border-t border-blue-900/50">
             <div className="p-3 bg-blue-900/30 rounded-xl mb-4 text-[10px] text-blue-200 font-bold uppercase tracking-widest text-center">
              Admin Information System
            </div>
            <button
              onClick={handleLogoutClick}
              className="w-full flex items-center gap-3 p-3 text-blue-100/70 hover:bg-red-500/20 hover:text-red-400 rounded-xl transition-colors font-bold"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#f8fafc]">
          <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-full">
            <React.Suspense fallback={<div className="flex items-center justify-center h-full"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0068B6]"></div></div>}>
              <Outlet />
            </React.Suspense>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
