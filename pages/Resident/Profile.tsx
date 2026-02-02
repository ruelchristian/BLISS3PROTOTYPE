
import React from 'react';
import { User } from '../../types';
import { User as UserIcon, Mail, Home, Shield, Phone, Camera, Settings } from 'lucide-react';

const Profile: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-800 rounded-t-2xl"></div>
        <div className="px-8 pb-8 bg-white rounded-b-2xl shadow-sm border border-t-0 -mt-0 relative">
          <div className="absolute -top-12 left-8 p-1 bg-white rounded-full">
            <div className="w-24 h-24 rounded-full bg-blue-50 border-4 border-white flex items-center justify-center overflow-hidden">
              {user.avatar ? (
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <UserIcon className="w-12 h-12 text-blue-600" />
              )}
              <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                <Camera className="text-white" />
              </div>
            </div>
          </div>
          
          <div className="pt-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-gray-500">{user.role} • {user.houseNumber || 'Staff member'}</p>
            </div>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-semibold transition-colors">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-6">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" /> Personal Information
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Email Address</p>
                <p className="text-sm font-semibold text-gray-900">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Phone Number</p>
                <p className="text-sm font-semibold text-gray-900">+1 (234) 567-890</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                <Home size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Assigned Property</p>
                <p className="text-sm font-semibold text-gray-900">{user.houseNumber || 'Administrative Office'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-6">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-600" /> Account Security
          </h3>
          
          <div className="space-y-4">
            <button className="w-full text-left p-3 rounded-xl border hover:bg-gray-50 transition-colors group">
              <p className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Change Password</p>
              <p className="text-xs text-gray-500 mt-0.5">Last changed 3 months ago</p>
            </button>
            <button className="w-full text-left p-3 rounded-xl border hover:bg-gray-50 transition-colors group">
              <p className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Two-Factor Auth</p>
              <p className="text-xs text-gray-500 mt-0.5">Currently enabled via Email</p>
            </button>
            <button className="w-full text-left p-3 rounded-xl border hover:bg-red-50 transition-colors group">
              <p className="text-sm font-bold text-red-600">Delete Account</p>
              <p className="text-xs text-red-400 mt-0.5">Permanently remove your data</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
