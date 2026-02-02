
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  ClipboardList, 
  Bell, 
  LogOut, 
  Menu, 
  X, 
  PhoneCall, 
  User as UserIcon,
  Home,
  PlusCircle,
  History,
  ShieldCheck
} from 'lucide-react';
import { User, UserRole } from './types';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Welcome from './pages/Welcome';
import ResidentsList from './pages/Admin/ResidentsList';
import ServiceRequests from './pages/Admin/ServiceRequests';
import Payments from './pages/Admin/Payments';
import Announcements from './pages/Announcements';
import Profile from './pages/Resident/Profile';
import SubmitRequest from './pages/Resident/SubmitRequest';
import EmergencyContacts from './pages/EmergencyContacts';

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
          <Route path="/" element={user?.role === UserRole.ADMIN ? <Navigate to="/admin/dashboard" /> : <Navigate to="/welcome" />} />
          
          {/* Admin Routes */}
          <Route 
            path="/admin/dashboard" 
            element={user?.role === UserRole.ADMIN ? <Dashboard user={user!} /> : <Navigate to="/welcome" />} 
          />
          <Route 
            path="/admin/residents" 
            element={user?.role === UserRole.ADMIN ? <ResidentsList /> : <Navigate to="/welcome" />} 
          />
          <Route 
            path="/admin/requests" 
            element={user?.role === UserRole.ADMIN ? <ServiceRequests /> : <Navigate to="/welcome" />} 
          />
          <Route 
            path="/admin/payments" 
            element={user?.role === UserRole.ADMIN ? <Payments /> : <Navigate to="/welcome" />} 
          />
          
          {/* Resident Routes */}
          <Route path="/welcome" element={<Welcome user={user!} />} />
          <Route 
            path="/resident/profile" 
            element={user?.role === UserRole.RESIDENT ? <Profile user={user!} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/resident/submit-request" 
            element={user?.role === UserRole.RESIDENT ? <SubmitRequest user={user!} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/resident/history" 
            element={user?.role === UserRole.RESIDENT ? <Payments residentId={user?.id} /> : <Navigate to="/" />} 
          />

          {/* Shared Routes */}
          <Route path="/announcements" element={<Announcements isAdmin={user?.role === UserRole.ADMIN} />} />
          <Route path="/emergency" element={<EmergencyContacts isAdmin={user?.role === UserRole.ADMIN} />} />
        </Route>
      </Routes>
    </Router>
  );
};

const MainLayout: React.FC<{ user: User; onLogout: () => void }> = ({ user, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const adminNav = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: 'Residents', icon: Users, path: '/admin/residents' },
    { name: 'Service Queue', icon: ClipboardList, path: '/admin/requests' },
    { name: 'Payments', icon: CreditCard, path: '/admin/payments' },
    { name: 'Announcements', icon: Bell, path: '/announcements' },
    { name: 'Emergency', icon: PhoneCall, path: '/emergency' },
  ];

  const residentNav = [
    { name: 'Home', icon: Home, path: '/welcome' },
    { name: 'Announcements', icon: Bell, path: '/announcements' },
    { name: 'Request', icon: PlusCircle, path: '/resident/submit-request' },
    { name: 'Payments', icon: History, path: '/resident/history' },
    { name: 'Emergency', icon: PhoneCall, path: '/emergency' },
    { name: 'Profile', icon: UserIcon, path: '/resident/profile' },
  ];

  const currentNav = user.role === UserRole.ADMIN ? adminNav : residentNav;

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
              <span className="text-white font-bold text-sm">B3</span>
            </div>
            <h1 className="font-bold text-lg text-[#003067] hidden sm:block">Bliss III Admin Office</h1>
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
                    <span className="text-[#003067] font-bold text-xs">B</span>
                  </div>
                  <span className="font-bold">Bliss III</span>
                </div>
                <button onClick={() => setSidebarOpen(false)}><X className="w-6 h-6 text-white/70" /></button>
              </div>
              <nav className="p-4 flex flex-col gap-2">
                {currentNav.map((item) => (
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
          {currentNav.map((item) => (
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
              Admin Control Panel
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

      {/* Mobile Bottom Navigation (Resident Only) */}
      {user.role === UserRole.RESIDENT && (
        <nav className="md:hidden bg-white/80 glass-card border-t flex justify-around py-2 px-2 sticky bottom-0 z-50">
          {residentNav.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                location.pathname === item.path ? 'text-[#0068B6]' : 'text-gray-400'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-tight">{item.name}</span>
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
};

export default App;
