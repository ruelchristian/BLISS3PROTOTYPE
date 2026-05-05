
import React, { useState } from 'react';
import { 
  Building2, 
  Plus, 
  Trash2, 
  Edit2, 
  ChevronRight, 
  ChevronLeft,
  User, 
  Home,
  Search,
  PlusCircle,
  ChevronFirst,
  ChevronLast,
  X,
  Calendar,
  Clock
} from 'lucide-react';
import { Building, Unit, TaxSchedule } from '../../types';

const ITEMS_PER_PAGE = 5;

interface BuildingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (building: Partial<Building>) => void;
  initialData?: Building;
}

const BuildingModal: React.FC<BuildingModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [genDay, setGenDay] = useState(initialData?.taxSchedule?.generationDay || 1);
  const [dueDay, setDueDay] = useState(initialData?.taxSchedule?.dueDay || 15);
  const [frequency, setFrequency] = useState<TaxSchedule['frequency']>(initialData?.taxSchedule?.frequency || 'MONTHLY');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#003067]/60 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-8 border-b bg-gray-50/50 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-black text-[#003067]">{initialData ? 'Edit Building' : 'Add New Building'}</h3>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Infrastructure & Tax Schedule</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400">
            <X size={24} />
          </button>
        </div>

        <form className="p-8 space-y-6" onSubmit={(e) => {
          e.preventDefault();
          onSave({
            name,
            taxSchedule: {
              generationDay: genDay,
              dueDay: dueDay,
              frequency
            }
          });
        }}>
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Building Name</label>
            <div className="relative">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                required
                type="text" 
                placeholder="e.g. Building A"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 text-gray-900 font-bold border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#0068B6] transition-all"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-black text-[#0068B6] uppercase tracking-widest border-b pb-2">Real Property Tax Schedule</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Generation Day</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input 
                    required
                    type="number" 
                    min="1" 
                    max="31"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 text-gray-900 font-bold border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0068B6]"
                    value={genDay}
                    onChange={(e) => setGenDay(parseInt(e.target.value))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Due Day</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input 
                    required
                    type="number" 
                    min="1" 
                    max="31"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 text-gray-900 font-bold border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0068B6]"
                    value={dueDay}
                    onChange={(e) => setDueDay(parseInt(e.target.value))}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Billing Frequency</label>
              <div className="flex gap-2">
                {(['MONTHLY', 'QUARTERLY', 'ANNUALLY'] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFrequency(f)}
                    className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                      frequency === f 
                        ? 'bg-[#0068B6] text-white border-[#0068B6] shadow-lg shadow-blue-100' 
                        : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 py-4 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 py-4 bg-[#0068B6] text-white font-bold rounded-2xl hover:bg-[#003067] shadow-xl shadow-blue-100 transition-all active:scale-95"
            >
              {initialData ? 'Update Building' : 'Create Building'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Buildings: React.FC = () => {
  const [buildings, setBuildings] = useState<Building[]>([
    { 
      id: '1', 
      name: 'Building A', 
      taxSchedule: { generationDay: 1, dueDay: 15, frequency: 'MONTHLY' },
      units: [
        { id: '101', number: 'A-101', ownerName: 'John Smith', status: 'OCCUPIED' },
        { id: '102', number: 'A-102', ownerName: 'Maria Garcia', status: 'OCCUPIED' },
        { id: '103', number: 'A-103', ownerName: 'None', status: 'VACANT' },
        { id: '104', number: 'A-104', ownerName: 'David Wilson', status: 'OCCUPIED' },
        { id: '105', number: 'A-105', ownerName: 'Sarah Jones', status: 'OCCUPIED' },
        { id: '106', number: 'A-106', ownerName: 'Michael Brown', status: 'OCCUPIED' },
        { id: '107', number: 'A-107', ownerName: 'Emma Davis', status: 'VACANT' },
      ]
    },
    { 
      id: '2', 
      name: 'Building B', 
      taxSchedule: { generationDay: 1, dueDay: 15, frequency: 'MONTHLY' },
      units: [
        { id: '201', number: 'B-201', ownerName: 'Robert Chen', status: 'OCCUPIED' },
        { id: '202', number: 'B-202', ownerName: 'Sarah Miller', status: 'OCCUPIED' },
      ]
    },
  ]);

  const [selectedBuildingId, setSelectedBuildingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [unitSearchTerm, setUnitSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBuilding, setEditingBuilding] = useState<Building | undefined>(undefined);

  const selectedBuilding = buildings.find(b => b.id === selectedBuildingId);

  const handleSaveBuilding = (data: Partial<Building>) => {
    if (editingBuilding) {
      setBuildings(buildings.map(b => b.id === editingBuilding.id ? { ...b, ...data } : b));
    } else {
      const newBuilding: Building = {
        id: Math.random().toString(36).substr(2, 9),
        name: data.name || '',
        taxSchedule: data.taxSchedule as TaxSchedule,
        units: []
      };
      setBuildings([...buildings, newBuilding]);
    }
    setIsModalOpen(false);
    setEditingBuilding(undefined);
  };

  const removeBuilding = (id: string) => {
    if (window.confirm('Are you sure you want to remove this building and all its units?')) {
      const newBuildings = buildings.filter(b => b.id !== id);
      setBuildings(newBuildings);
      if (selectedBuildingId === id) {
        setSelectedBuildingId(null);
      }
    }
  };

  const addUnit = (buildingId: string) => {
    const building = buildings.find(b => b.id === buildingId);
    if (!building) return;

    const unitNum = prompt('Enter Unit Number (e.g. A-104):');
    const owner = prompt('Enter Owner Name:');
    
    if (unitNum && owner) {
      const newUnit: Unit = {
        id: Math.random().toString(36).substr(2, 9),
        number: unitNum,
        ownerName: owner,
        status: 'OCCUPIED'
      };

      setBuildings(buildings.map(b => 
        b.id === buildingId ? { ...b, units: [...b.units, newUnit] } : b
      ));
    }
  };

  const removeUnit = (buildingId: string, unitId: string) => {
    if (window.confirm('Remove this unit?')) {
      setBuildings(buildings.map(b => 
        b.id === buildingId ? { ...b, units: b.units.filter(u => u.id !== unitId) } : b
      ));
    }
  };

  const filteredBuildings = buildings.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUnits = selectedBuilding?.units.filter(u => 
    u.number.toLowerCase().includes(unitSearchTerm.toLowerCase()) ||
    u.ownerName.toLowerCase().includes(unitSearchTerm.toLowerCase())
  ) || [];

  const totalPages = Math.ceil(filteredUnits.length / ITEMS_PER_PAGE);
  const paginatedUnits = filteredUnits.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSelectBuilding = (id: string) => {
    setSelectedBuildingId(id);
    setCurrentPage(1);
    setUnitSearchTerm('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 min-h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-4">
          {selectedBuildingId && (
            <button 
              onClick={() => setSelectedBuildingId(null)}
              className="p-2 bg-white border rounded-xl hover:bg-gray-50 transition-colors text-gray-500"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          <div>
            <h2 className="text-2xl font-black text-[#003067]">
              {selectedBuilding ? selectedBuilding.name : 'Buildings & Units'}
            </h2>
            <p className="text-gray-500 font-medium text-sm">
              {selectedBuilding ? `Managing units for ${selectedBuilding.name}` : 'Manage community infrastructure and unit ownership.'}
            </p>
          </div>
        </div>
        {!selectedBuildingId && (
          <button 
            onClick={() => { setEditingBuilding(undefined); setIsModalOpen(true); }}
            className="bg-[#0068B6] hover:bg-[#003067] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-100 transition-all active:scale-95"
          >
            <PlusCircle size={20} />
            Add New Building
          </button>
        )}
      </div>

      {!selectedBuildingId ? (
        /* Grid of Building Cards */
        <div className="space-y-6 flex-1">
          <div className="bg-white p-4 rounded-3xl border shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search buildings..." 
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 text-sm font-bold border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0068B6]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="text-xs font-black text-gray-400 uppercase tracking-widest">
              Total Buildings: {buildings.length}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBuildings.map((building) => (
              <div 
                key={building.id}
                onClick={() => handleSelectBuilding(building.id)}
                className="bg-white rounded-[2.5rem] border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group flex flex-col overflow-hidden"
              >
                <div className="p-8 flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-3xl bg-blue-50 text-[#0068B6] flex items-center justify-center group-hover:bg-[#0068B6] group-hover:text-white transition-all duration-300">
                    <Building2 size={32} />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-[#003067] group-hover:text-[#0068B6] transition-colors">{building.name}</h4>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">{building.units.length} Units Registered</p>
                    {building.taxSchedule && (
                      <div className="mt-3 flex items-center justify-center gap-2 text-[10px] font-black text-blue-500 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
                        <Calendar size={12} /> {building.taxSchedule.frequency} Tax
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-auto p-4 bg-gray-50/50 border-t flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setEditingBuilding(building); setIsModalOpen(true); }}
                      className="p-2 text-gray-300 hover:text-[#0068B6] transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); removeBuilding(building.id); }}
                      className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-black text-[#0068B6] uppercase tracking-widest">
                    Manage Units <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Detailed Units Table with Pagination */
        <div className="bg-white rounded-[2.5rem] border shadow-sm overflow-hidden flex flex-col flex-1">
          <div className="p-6 border-b flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0 bg-gray-50/30">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0068B6] text-white flex items-center justify-center shadow-lg shadow-blue-100">
                <Building2 size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black text-[#003067]">{selectedBuilding.name}</h3>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Detailed Unit Directory</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                <input 
                  type="text" 
                  placeholder="Filter units..." 
                  className="pl-9 pr-4 py-2 bg-white text-xs font-bold border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0068B6] w-48"
                  value={unitSearchTerm}
                  onChange={(e) => {
                    setUnitSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              <button 
                onClick={() => addUnit(selectedBuilding.id)}
                className="bg-[#0068B6] hover:bg-[#003067] text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all active:scale-95"
              >
                <Plus size={16} /> Add Unit
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-white z-10">
                <tr className="border-b bg-gray-50/50">
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Unit Number</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Owner / Resident</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginatedUnits.length > 0 ? (
                  paginatedUnits.map((unit) => (
                    <tr key={unit.id} className="group hover:bg-gray-50/80 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0068B6] flex items-center justify-center">
                            <Home size={16} />
                          </div>
                          <span className="font-black text-gray-900">{unit.number}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                            <User size={12} className="text-gray-400" />
                          </div>
                          <span className="text-sm font-bold text-gray-700">{unit.ownerName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
                          unit.status === 'OCCUPIED' ? 'bg-green-50 text-green-600 border border-green-100' : 
                          unit.status === 'VACANT' ? 'bg-gray-100 text-gray-500 border border-gray-200' : 
                          'bg-amber-50 text-amber-600 border border-amber-100'
                        }`}>
                          {unit.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                          <button className="p-2 text-gray-400 hover:text-[#0068B6] transition-colors">
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={() => removeUnit(selectedBuilding.id, unit.id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-3 text-gray-400">
                        <Home size={48} className="opacity-20" />
                        <p className="font-medium">No units found matching your search.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          {totalPages > 1 && (
            <div className="p-4 border-t bg-gray-50/30 flex items-center justify-between shrink-0">
              <p className="text-xs text-gray-500 font-bold">
                Showing <span className="text-[#003067]">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="text-[#003067]">{Math.min(currentPage * ITEMS_PER_PAGE, filteredUnits.length)}</span> of <span className="text-[#003067]">{filteredUnits.length}</span> units
              </p>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="p-2 text-gray-400 hover:text-[#0068B6] disabled:opacity-30 disabled:hover:text-gray-400 transition-colors"
                >
                  <ChevronFirst size={18} />
                </button>
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-2 text-gray-400 hover:text-[#0068B6] disabled:opacity-30 disabled:hover:text-gray-400 transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                
                <div className="flex items-center gap-1 px-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-lg text-xs font-black transition-all ${
                        currentPage === page 
                          ? 'bg-[#0068B6] text-white shadow-md' 
                          : 'text-gray-500 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 text-gray-400 hover:text-[#0068B6] disabled:opacity-30 disabled:hover:text-gray-400 transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
                <button 
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="p-2 text-gray-400 hover:text-[#0068B6] disabled:opacity-30 disabled:hover:text-gray-400 transition-colors"
                >
                  <ChevronLast size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Building Modal */}
      <BuildingModal 
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingBuilding(undefined); }}
        onSave={handleSaveBuilding}
        initialData={editingBuilding}
      />
    </div>
  );
};

export default Buildings;
