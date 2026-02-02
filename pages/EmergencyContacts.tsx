
import React from 'react';
import { Phone, Shield, HeartPulse, Flame, Building, PhoneCall, Plus } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  number: string;
  description: string;
  category: 'EMERGENCY' | 'ESSENTIAL' | 'ADMIN';
}

const EmergencyContacts: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) => {
  const contacts: Contact[] = [
    {
      id: '1',
      name: 'Village Security',
      number: '911-000-1234',
      description: '24/7 Patrol and Entrance Security',
      category: 'EMERGENCY'
    },
    {
      id: '2',
      name: 'Ambulance / Medical',
      number: '911-000-5678',
      description: 'Paramedic and First Aid Dispatch',
      category: 'EMERGENCY'
    },
    {
      id: '3',
      name: 'Fire Department',
      number: '911-000-9999',
      description: 'Immediate Fire Response',
      category: 'EMERGENCY'
    },
    {
      id: '4',
      name: 'Management Office',
      number: '012-345-6789',
      description: 'Administrative and General Queries',
      category: 'ADMIN'
    },
    {
      id: '5',
      name: 'Utility Support (Water/Electricity)',
      number: '088-777-6655',
      description: 'Main Line Bursts and Power Outages',
      category: 'ESSENTIAL'
    },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'EMERGENCY': return <Shield className="w-6 h-6 text-red-600" />;
      case 'ADMIN': return <Building className="w-6 h-6 text-[#0068B6]" />;
      case 'ESSENTIAL': return <PhoneCall className="w-6 h-6 text-orange-600" />;
      default: return <Phone className="w-6 h-6 text-gray-600" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'EMERGENCY': return 'border-red-200 bg-red-50';
      case 'ADMIN': return 'border-blue-200 bg-blue-50';
      case 'ESSENTIAL': return 'border-orange-200 bg-orange-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#003067]">Emergency Contacts</h2>
          <p className="text-gray-500 font-bold">Important numbers at your fingertips.</p>
        </div>
        {isAdmin && (
          <button className="bg-[#0068B6] hover:bg-[#003067] text-white px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all active:scale-95">
            <Plus className="w-5 h-5" />
            Manage Contacts
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contacts.map((contact) => (
          <div 
            key={contact.id} 
            className={`p-6 rounded-2xl border-2 transition-all hover:shadow-md ${getCategoryColor(contact.category)}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                {getCategoryIcon(contact.category)}
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${
                contact.category === 'EMERGENCY' ? 'bg-red-600 text-white' : 
                contact.category === 'ADMIN' ? 'bg-[#0068B6] text-white' : 'bg-orange-600 text-white'
              }`}>
                {contact.category}
              </span>
            </div>
            
            <h3 className="text-lg font-black text-black mb-1">{contact.name}</h3>
            <p className="text-sm text-gray-600 font-bold mb-4">{contact.description}</p>
            
            <div className="flex items-center justify-between gap-2">
              <span className="text-xl font-black text-black font-mono">{contact.number}</span>
              <a 
                href={`tel:${contact.number}`}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-black text-white shadow-lg active:scale-95 transition-all ${
                  contact.category === 'EMERGENCY' ? 'bg-red-600 hover:bg-red-700' : 
                  contact.category === 'ADMIN' ? 'bg-[#0068B6] hover:bg-[#003067]' : 'bg-orange-600 hover:bg-orange-700'
                }`}
              >
                <PhoneCall size={18} />
                CALL
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center shadow-sm">
        <p className="text-black font-black uppercase tracking-tight mb-2">Notice</p>
        <p className="text-sm text-gray-500 font-bold">
          For non-urgent issues, please use the Service Request form. 
          Use these numbers only for critical situations.
        </p>
      </div>
    </div>
  );
};

export default EmergencyContacts;
