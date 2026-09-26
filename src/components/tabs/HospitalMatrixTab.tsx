import React, { useState } from 'react';
import { Hospital } from '../../types';
import {
  Search,
  Filter,
  MapPin,
  Clock,
  Phone,
  Bed,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  TrendingDown,
  TrendingUp,
  Stethoscope,
  ShieldAlert,
} from 'lucide-react';

interface HospitalMatrixTabProps {
  hospitals: Hospital[];
  onOpenTokenModal: (hospitalName: string, department: string) => void;
}

export const HospitalMatrixTab: React.FC<HospitalMatrixTabProps> = ({
  hospitals,
  onOpenTokenModal,
}) => {
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [reservedHospital, setReservedHospital] = useState<string | null>(null);

  const departments = [
    'All',
    'Cardiology',
    'Trauma',
    'Neuro',
    'Pediatric',
    'Ortho',
    'Pulmonology',
    'Oncology',
  ];

  const filteredHospitals = hospitals.filter((h) => {
    const matchesSearch =
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.departments.some((d) => d.toLowerCase().includes(search.toLowerCase())) ||
      h.address.toLowerCase().includes(search.toLowerCase());

    const matchesDept =
      selectedDept === 'All' ||
      h.departments.some((d) => d.toLowerCase().includes(selectedDept.toLowerCase()));

    const matchesStatus =
      selectedStatus === 'All' ||
      (selectedStatus === 'Optimal' && h.statusType === 'optimal') ||
      (selectedStatus === 'Overcapacity' && h.statusType === 'warning') ||
      (selectedStatus === 'Priority' && h.statusType === 'priority');

    return matchesSearch && matchesDept && matchesStatus;
  });

  const handleReserveBed = (hospitalName: string) => {
    setReservedHospital(hospitalName);
    setTimeout(() => {
      setReservedHospital(null);
    }, 4000);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Header and Filter Row */}
      <div className="p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h1 className="font-['Plus_Jakarta_Sans'] font-extrabold text-xl sm:text-2xl text-[#131a33] tracking-tight">
              Hospital Directory & Regional Load Matrix
            </h1>
            <p className="text-xs text-[#707881] mt-0.5">
              Live algorithmic matching across 14 municipal tertiary & secondary care centers
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 text-xs bg-[#f3f3ff] p-2 rounded-xl border border-[#ebedff]">
            <div>
              <span className="text-[#707881] font-medium">Synchronized:</span>
              <strong className="text-[#006194] ml-1">4 Centers</strong>
            </div>
            <span>·</span>
            <div>
              <span className="text-[#707881] font-medium">Beds Open:</span>
              <strong className="text-[#006b5f] ml-1">68 Units</strong>
            </div>
            <span>·</span>
            <div>
              <span className="text-[#707881] font-medium">Load Balance:</span>
              <strong className="text-[#006b5f] ml-1">98% Efficient</strong>
            </div>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-2 border-t border-[#f1f3f9]">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#707881] w-4 h-4" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by facility name, medical department, address..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#f3f3ff] text-xs text-[#131a33] placeholder:text-[#707881] focus:outline-none focus:ring-2 focus:ring-[#006194]"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 bg-[#f3f3ff] p-1 rounded-lg border border-[#ebedff] text-xs">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                    selectedDept === dept
                      ? 'bg-[#006194] text-white shadow-xs'
                      : 'text-[#3f4850] hover:text-[#131a33]'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-[#f3f3ff] text-xs font-semibold text-[#131a33] border border-[#ebedff] focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Optimal">Optimal Flow</option>
              <option value="Overcapacity">Overcapacity Alert</option>
              <option value="Priority">Pediatric Priority</option>
            </select>
          </div>
        </div>
      </div>

      {reservedHospital && (
        <div className="p-3 bg-[#6df5e1]/30 border border-[#006b5f]/40 rounded-xl text-xs text-[#00201c] flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#006b5f]" />
            <span>
              <strong>Emergency Bed Reserved:</strong> 1 ICU Bed at {reservedHospital} held for 30 minutes. Telemetry dispatched to hospital intake desk.
            </span>
          </div>
          <button onClick={() => setReservedHospital(null)} className="font-bold text-xs text-[#006b5f]">
            ✕
          </button>
        </div>
      )}

      {/* Hospital Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredHospitals.map((h) => {
          const isOptimal = h.statusType === 'optimal';
          const isOvercap = h.statusType === 'warning';
          const isPriority = h.statusType === 'priority';

          const occupancyPercent = Math.round((h.occupiedBeds / h.totalBeds) * 100);

          return (
            <div
              key={h.id}
              className="p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow gap-4"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-12 w-12 rounded-xl flex flex-col items-center justify-center shrink-0 text-white font-bold ${
                        isOptimal
                          ? 'bg-[#006b5f]'
                          : isOvercap
                          ? 'bg-[#ba1a1a]'
                          : isPriority
                          ? 'bg-[#007bb9]'
                          : 'bg-[#525b7a]'
                      }`}
                    >
                      <span className="text-base leading-none tabular-nums">{h.matchScore}</span>
                      <span className="text-[10px] uppercase tracking-tighter opacity-90">
                        {h.scoreType}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#131a33]">
                        {h.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-[#707881] mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-[#006194]" />
                        <span>{h.address}</span>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0 ${
                      isOptimal
                        ? 'bg-[#6df5e1]/40 text-[#006f64]'
                        : isOvercap
                        ? 'bg-[#ffdad6] text-[#ba1a1a]'
                        : isPriority
                        ? 'bg-[#cce5ff] text-[#004b73]'
                        : 'bg-[#e3e7ff] text-[#3f4850]'
                    }`}
                  >
                    {h.statusBadge}
                  </span>
                </div>

                {/* Distance and Travel */}
                <div className="mt-3 flex items-center gap-4 text-xs text-[#3f4850] bg-[#f3f3ff] p-2 rounded-xl border border-[#ebedff]">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#006194]" />
                    <span>
                      ETA: <strong>{h.travelTimeMins} mins</strong> ({h.distanceKm} km)
                    </span>
                  </div>
                  <span>·</span>
                  <div className="flex items-center gap-1.5">
                    <Stethoscope className="w-3.5 h-3.5 text-[#006b5f]" />
                    <span>
                      Doctors: <strong>{h.doctorsOnDuty} on-duty</strong>
                    </span>
                  </div>
                  <span>·</span>
                  <div className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#707881]" />
                    <span className="font-mono text-[11px]">{h.phone}</span>
                  </div>
                </div>

                {/* Bed Allocation Breakdown */}
                <div className="mt-3 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#707881] font-semibold">Total Bed Occupancy:</span>
                    <span className="font-bold text-[#131a33] tabular-nums">
                      {h.occupiedBeds}/{h.totalBeds} ({occupancyPercent}%)
                    </span>
                  </div>
                  <div className="w-full bg-[#ebedff] rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        occupancyPercent > 90
                          ? 'bg-[#ba1a1a]'
                          : occupancyPercent > 75
                          ? 'bg-[#007bb9]'
                          : 'bg-[#006b5f]'
                      }`}
                      style={{ width: `${occupancyPercent}%` }}
                    />
                  </div>

                  {/* Bed Chips */}
                  <div className="grid grid-cols-3 gap-2 mt-2 text-center text-xs">
                    <div className="p-2 rounded-lg bg-[#f8fafc] border border-[#e2e8f0]">
                      <span className="text-[10px] text-[#707881] block">ICU Available</span>
                      <strong
                        className={`text-sm tabular-nums ${
                          h.bedsOpen.icu <= 2 ? 'text-[#ba1a1a]' : 'text-[#006b5f]'
                        }`}
                      >
                        {h.bedsOpen.icu} Beds
                      </strong>
                    </div>
                    <div className="p-2 rounded-lg bg-[#f8fafc] border border-[#e2e8f0]">
                      <span className="text-[10px] text-[#707881] block">ER Critical Bays</span>
                      <strong className="text-sm text-[#131a33] tabular-nums">
                        {h.bedsOpen.er} Bays
                      </strong>
                    </div>
                    <div className="p-2 rounded-lg bg-[#f8fafc] border border-[#e2e8f0]">
                      <span className="text-[10px] text-[#707881] block">General Wards</span>
                      <strong className="text-sm text-[#006194] tabular-nums">
                        {h.bedsOpen.general} Beds
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Specialties */}
                <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-bold text-[#707881] uppercase tracking-wider">
                    Specialties:
                  </span>
                  {h.departments.map((dept, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#f3f3ff] text-[#131a33] border border-[#ebedff]"
                    >
                      {dept}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-3 border-t border-[#f1f3f9]">
                <button
                  onClick={() => onOpenTokenModal(h.name, h.departments[0] || 'OPD')}
                  className="flex-1 py-2 rounded-lg bg-[#006194] text-white text-xs font-bold hover:bg-[#007bb9] transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span className="material-symbols-outlined text-[16px]">confirmation_number</span>
                  <span>Get OPD Token</span>
                </button>

                <button
                  onClick={() => handleReserveBed(h.name)}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 ${
                    isOvercap
                      ? 'bg-[#ffdad6] text-[#ba1a1a] hover:bg-[#ffc2be]'
                      : 'bg-[#ebedff] text-[#006194] hover:bg-[#dbe1ff]'
                  }`}
                >
                  <Bed className="w-3.5 h-3.5" />
                  <span>{isOvercap ? 'Standby Bed Wait' : 'Reserve ICU Bed'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
