
import React, { useState } from 'react';
import { User, ServiceCategory, Building, Unit } from '../../types';
import { 
  Send, X, 
  HardHat, Wifi, Tent, Hammer, PenTool, MessageSquare, 
  Check, Info, FileText, Search, Building2, Home, ChevronRight
} from 'lucide-react';

const MOCK_BUILDINGS: Building[] = [
  { id: '1', name: 'Building A', units: [
    { id: '101', number: 'A-101', ownerName: 'John Smith', status: 'OCCUPIED' },
    { id: '102', number: 'A-102', ownerName: 'Maria Garcia', status: 'OCCUPIED' },
    { id: '103', number: 'A-103', ownerName: 'None', status: 'VACANT' },
  ]},
  { id: '2', name: 'Building B', units: [
    { id: '201', number: 'B-201', ownerName: 'Robert Chen', status: 'OCCUPIED' },
    { id: '202', number: 'B-202', ownerName: 'Sarah Miller', status: 'OCCUPIED' },
  ]},
  { id: '3', name: 'Building C', units: [] },
  { id: '4', name: 'Building D', units: [] },
];

const SubmitRequest: React.FC<{ user: User }> = ({ user }) => {
  const [category, setCategory] = useState<ServiceCategory | ''>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [residentName, setResidentName] = useState('');
  const [unitNumber, setUnitNumber] = useState('');
  const [formData, setFormData] = useState<any>({});
  const [showUnitSelector, setShowUnitSelector] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!unitNumber) {
      alert('Please select a unit first.');
      return;
    }
    alert(`The ${category?.replace('_', ' ')} request for ${residentName} (Unit ${unitNumber}) has been recorded in the system.`);
    resetForm();
  };

  const resetForm = () => {
    setCategory('');
    setTitle('');
    setDescription('');
    setResidentName('');
    setUnitNumber('');
    setFormData({});
  };

  const handleUnitSelect = (unit: Unit) => {
    setUnitNumber(unit.number);
    setResidentName(unit.ownerName === 'None' ? '' : unit.ownerName);
    setShowUnitSelector(false);
  };

  if (!category) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-3xl font-black text-[#003067]">Internal Permit Issuance</h2>
          <p className="text-gray-500 font-medium">Select the permit type to generate for a resident.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ServiceTypeCard 
            title="Maintenance Permit" 
            icon={Hammer} 
            desc="Record repairs, leaks, or electrical issues reported by a resident."
            onClick={() => setCategory('MAINTENANCE_PERMIT')}
          />
          <ServiceTypeCard 
            title="Construction Permit" 
            icon={HardHat} 
            desc="Issue permits for renovations, painting, or structural works."
            onClick={() => setCategory('CONSTRUCTION_PERMIT')}
          />
          <ServiceTypeCard 
            title="Venue & Common Area" 
            icon={Tent} 
            desc="Reserve Multi-Purpose Halls, Parks, or Basketball Courts."
            onClick={() => setCategory('VENUE_PERMIT')}
          />
          <ServiceTypeCard 
            title="Internet / Utilities" 
            icon={Wifi} 
            desc="Log installation requests for internet, cable, or phone services."
            onClick={() => setCategory('INTERNET_INSTALL')}
          />
          <ServiceTypeCard 
            title="Borrower's Slip" 
            icon={PenTool} 
            desc="Issue slips for tools, equipment, or assets borrowed by residents."
            onClick={() => setCategory('BORROWERS_SLIP')}
          />
          <ServiceTypeCard 
            title="Satisfaction Feedback" 
            icon={MessageSquare} 
            desc="Log feedback received from residents regarding admin services."
            onClick={() => setCategory('SATISFACTION_FEEDBACK')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto pb-12 animate-in zoom-in-95 duration-200">
      <div className="bg-white rounded-3xl shadow-xl border overflow-hidden">
        {/* Sub-header */}
        <div className="bg-[#003067] p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
             <button onClick={resetForm} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
               <X size={20} />
             </button>
             <div>
               <h2 className="font-black text-lg uppercase tracking-tight">{category.replace('_', ' ')}</h2>
               <p className="text-xs text-blue-200">Pasig Bliss III Admin Internal System</p>
             </div>
          </div>
          <FileText className="opacity-20" size={32} />
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-4">
            {/* Common Header Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Unit / Building</label>
                <button 
                  type="button"
                  onClick={() => setShowUnitSelector(true)}
                  className="w-full px-4 py-3 bg-gray-50 text-left text-black font-semibold border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0068B6] transition-all flex items-center justify-between group"
                >
                  <span className={unitNumber ? 'text-black' : 'text-gray-400'}>
                    {unitNumber || 'Select Unit...'}
                  </span>
                  <ChevronRight size={18} className="text-gray-400 group-hover:text-[#0068B6] transition-colors" />
                </button>
              </div>
              <FormField 
                label="Resident Name" 
                placeholder="Auto-filled from unit" 
                value={residentName} 
                onChange={(e) => setResidentName(e.target.value)} 
              />
            </div>

            {/* DYNAMIC FORM LOGIC BASED ON CATEGORY */}
            {category === 'CONSTRUCTION_PERMIT' && (
              <div className="space-y-4 pt-4 border-t">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Work Checklist</p>
                <div className="grid grid-cols-2 gap-2">
                  {['Interior Painting', 'Ceiling Install', 'Tiling', 'Carpentry', 'Plumbing', 'Electrical'].map(work => (
                    <label key={work} className="flex items-center gap-2 p-2 rounded-xl bg-gray-50 border text-xs font-bold text-gray-700 cursor-pointer hover:bg-white hover:border-[#0068B6] transition-all">
                      <input type="checkbox" className="w-4 h-4 rounded text-[#0068B6]" />
                      {work}
                    </label>
                  ))}
                </div>
                <FormField label="Contractor Name" placeholder="Agency or Individual name" />
              </div>
            )}

            {category === 'VENUE_PERMIT' && (
              <div className="space-y-4 pt-4 border-t">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Venue Requested</p>
                <select className="w-full px-4 py-3 bg-gray-50 text-black font-semibold border rounded-xl outline-none focus:ring-2 focus:ring-[#0068B6]">
                  <option>Select Facility...</option>
                  <option>Multi-Purpose Hall 1</option>
                  <option>Multi-Purpose Hall 2</option>
                  <option>Basketball Half Court</option>
                  <option>Park / Nagsabado Hall</option>
                </select>
                <div className="grid grid-cols-2 gap-4">
                   <FormField label="Event Date" type="date" />
                   <FormField label="Start Time" type="time" />
                </div>
              </div>
            )}

            {category === 'BORROWERS_SLIP' && (
              <div className="space-y-4 pt-4 border-t">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Items Requested</p>
                <textarea 
                  rows={3} 
                  placeholder="List items, quantity, and purpose of use..."
                  className="w-full px-4 py-3 bg-gray-50 text-black font-semibold border rounded-xl outline-none focus:ring-2 focus:ring-[#0068B6]"
                />
              </div>
            )}

            {category === 'SATISFACTION_FEEDBACK' && (
              <div className="space-y-4 pt-4 border-t">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Service Rating</p>
                <div className="flex justify-between gap-2">
                  {['😡', '😐', '🙂', '🤩'].map((emoji, i) => (
                    <button type="button" key={i} className="flex-1 py-4 bg-gray-50 rounded-2xl border hover:border-[#0068B6] transition-all text-2xl grayscale hover:grayscale-0">
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Standard Description Area */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Additional Notes</label>
              <textarea 
                rows={3}
                className="w-full px-4 py-3 bg-gray-50 text-black font-semibold border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0068B6] transition-all"
                placeholder="Provide any extra details here..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-6 border-t flex flex-col gap-4">
             <div className="flex gap-2 items-start bg-amber-50 p-4 rounded-xl border border-amber-100">
               <Info size={18} className="text-amber-600 mt-1 shrink-0" />
               <p className="text-[10px] text-amber-800 font-bold leading-relaxed">
                 By submitting, you agree to the Pasig Bliss III Admin terms & conditions. Permits are subject to inspection and approval within 1-2 working days.
               </p>
             </div>
             
             <button
              type="submit"
              className="w-full bg-[#0068B6] hover:bg-[#003067] text-white font-black py-4 px-4 rounded-xl shadow-xl shadow-blue-100 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Send className="w-5 h-5" />
              SUBMIT E-PERMIT
            </button>
          </div>
        </form>
      </div>

      {showUnitSelector && (
        <UnitSelectorModal 
          onClose={() => setShowUnitSelector(false)} 
          onSelect={handleUnitSelect} 
        />
      )}
    </div>
  );
};

const UnitSelectorModal: React.FC<{ onClose: () => void; onSelect: (unit: Unit) => void }> = ({ onClose, onSelect }) => {
  const [selectedBuildingId, setSelectedBuildingId] = useState<string | null>(MOCK_BUILDINGS[0].id);
  const [searchTerm, setSearchTerm] = useState('');

  const selectedBuilding = MOCK_BUILDINGS.find(b => b.id === selectedBuildingId);
  const filteredUnits = selectedBuilding?.units.filter(u => 
    u.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl h-[600px] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0068B6] text-white flex items-center justify-center">
              <Building2 size={20} />
            </div>
            <div>
              <h3 className="font-black text-[#003067]">Select Unit</h3>
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Resident Directory Lookup</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Buildings Sidebar */}
          <div className="w-64 border-r bg-gray-50/30 overflow-y-auto p-4 space-y-2">
            <p className="px-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Buildings</p>
            {MOCK_BUILDINGS.map(b => (
              <button
                key={b.id}
                onClick={() => setSelectedBuildingId(b.id)}
                className={`w-full text-left p-3 rounded-xl text-sm font-bold transition-all flex items-center justify-between group ${
                  selectedBuildingId === b.id ? 'bg-[#0068B6] text-white shadow-md' : 'hover:bg-white text-gray-600'
                }`}
              >
                <span>{b.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  selectedBuildingId === b.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'
                }`}>{b.units.length}</span>
              </button>
            ))}
          </div>

          {/* Units Table */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search unit number or owner..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 text-sm font-bold border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0068B6]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-white z-10">
                  <tr className="border-b bg-gray-50/50">
                    <th className="px-6 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">Unit</th>
                    <th className="px-6 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">Owner</th>
                    <th className="px-6 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredUnits.map(u => (
                    <tr 
                      key={u.id} 
                      onClick={() => onSelect(u)}
                      className="cursor-pointer hover:bg-blue-50/50 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Home size={14} className="text-gray-400 group-hover:text-[#0068B6]" />
                          <span className="font-black text-gray-900">{u.number}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-600">{u.ownerName}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                          u.status === 'OCCUPIED' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'
                        }`}>
                          {u.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServiceTypeCard: React.FC<{ title: string; desc: string; icon: any; onClick: () => void }> = ({ title, desc, icon: Icon, onClick }) => (
  <button 
    onClick={onClick}
    className="bg-white p-6 rounded-3xl border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group text-left flex flex-col h-full"
  >
    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0068B6] flex items-center justify-center mb-4 group-hover:bg-[#0068B6] group-hover:text-white transition-colors">
      <Icon size={24} />
    </div>
    <h3 className="font-black text-gray-900 mb-2 group-hover:text-[#0068B6] transition-colors">{title}</h3>
    <p className="text-xs text-gray-500 font-medium leading-relaxed flex-grow">{desc}</p>
    <div className="mt-4 pt-4 border-t border-gray-50 flex items-center gap-2 text-[10px] font-black text-[#0068B6] uppercase tracking-widest">
      Open Form <Check size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  </button>
);

const FormField: React.FC<{ label: string; placeholder?: string; type?: string; value?: string; disabled?: boolean; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ label, placeholder, type = 'text', value, disabled, onChange }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</label>
    <input 
      type={type}
      disabled={disabled}
      className={`w-full px-4 py-3 bg-gray-50 text-black font-semibold border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0068B6] transition-all ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default SubmitRequest;
