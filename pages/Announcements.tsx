
import React, { useState } from 'react';
import { Megaphone, Calendar, Tag, Plus, MoreHorizontal, Bell } from 'lucide-react';

const Announcements: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) => {
  const announcements = [
    { 
      id: '1', 
      title: 'Monthly Water Maintenance', 
      content: 'Please be advised that water supply will be interrupted on 15th Oct from 10 AM to 4 PM for routine maintenance.',
      date: 'Oct 10, 2023',
      author: 'Admin',
      category: 'URGENT'
    },
    { 
      id: '2', 
      title: 'Community Garden Cleanup', 
      content: 'Join us this Saturday for our monthly garden cleanup. Refreshments will be provided!',
      date: 'Oct 8, 2023',
      author: 'Social Committee',
      category: 'EVENT'
    },
    { 
      id: '3', 
      title: 'Security System Upgrade', 
      content: 'We are installing new CCTV cameras at the main entrance. Residents may experience minor delays.',
      date: 'Oct 5, 2023',
      author: 'Security Dept',
      category: 'GENERAL'
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
            <Megaphone className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Community Board</h2>
            <p className="text-gray-500">Stay updated with the latest village news.</p>
          </div>
        </div>
        {isAdmin && (
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-200 transition-all active:scale-95">
            <Plus className="w-5 h-5" />
            New Announcement
          </button>
        )}
      </div>

      <div className="space-y-4">
        {announcements.map((item) => (
          <div key={item.id} className={`bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow relative ${
            item.category === 'URGENT' ? 'border-l-4 border-l-red-500' : 'border-l-4 border-l-blue-500'
          }`}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    item.category === 'URGENT' ? 'bg-red-50 text-red-600' : 
                    item.category === 'EVENT' ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {item.category}
                  </span>
                  {item.category === 'URGENT' && <Bell className="w-4 h-4 text-red-500 animate-bounce" />}
                </div>
                <div className="text-xs text-gray-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {item.date}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{item.content}</p>
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-[10px] font-bold text-blue-700">
                    A
                  </div>
                  <span className="text-xs font-semibold text-gray-700">Posted by {item.author}</span>
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 text-center">
        <p className="text-sm text-blue-700 font-medium italic">"A connected community is a safe community."</p>
      </div>
    </div>
  );
};

export default Announcements;
