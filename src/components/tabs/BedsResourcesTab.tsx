import React, { useState } from 'react';
import { Hospital } from '../../types';
import {
  Bed,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Wind,
  Droplet,
  Plus,
  RefreshCw,
  LogOut,
  ArrowRight,
} from 'lucide-react';

interface BedsResourcesTabProps {
  hospitals: Hospital[];
}

interface BedUnit {
  id: string;
  number: string;
  type: 'ICU' | 'ER Bay' | 'General' | 'Isolation';
  status: 'occupied' | 'vacant' | 'cleaning' | 'reserved';
  patientName?: string;
  acuity?: string;
  ventilatorAttached: boolean;
}

export const BedsResourcesTab: React.FC<BedsResourcesTabProps> = ({ hospitals }) => {
  const [selectedHospital, setSelectedHospital] = useState(hospitals[0]?.name || 'Metro West Central');
  const [filterType, setFilterType] = useState('All');

  // Interactive Bed Units Mock
  const [bedUnits, setBedUnits] = useState<BedUnit[]>([
    { id: 'b1', number: 'ICU-01', type: 'ICU', status: 'occupied', patientName: 'Marcus Vance', acuity: 'High', ventilatorAttached: true },
    { id: 'b2', number: 'ICU-02', type: 'ICU', status: 'reserved', patientName: 'Inbound Medic-04 (STEMI)', acuity: 'Critical', ventilatorAttached: true },
    { id: 'b3', number: 'ICU-03', type: 'ICU', status: 'occupied', patientName: 'Arthur Dent', acuity: 'Moderate', ventilatorAttached: false },
    { id: 'b4', number: 'ICU-04', type: 'ICU', status: 'vacant', ventilatorAttached: true },
    { id: 'b5', number: 'ICU-05', type: 'ICU', status: 'cleaning', ventilatorAttached: false },
    { id: 'b6', number: 'ICU-06', type: 'ICU', status: 'vacant', ventilatorAttached: true },
    { id: 'b7', number: 'ER-01', type: 'ER Bay', status: 'occupied', patientName: 'Elena Sorokin', acuity: 'Urgent', ventilatorAttached: false },
    { id: 'b8', number: 'ER-02', type: 'ER Bay', status: 'occupied', patientName: 'David Chen', acuity: 'Urgent', ventilatorAttached: false },
    { id: 'b9', number: 'ER-03', type: 'ER Bay', status: 'vacant', ventilatorAttached: true },
    { id: 'b10', number: 'ER-04', type: 'ER Bay', status: 'vacant', ventilatorAttached: false },
    { id: 'b11', number: 'GEN-101', type: 'General', status: 'occupied', patientName: 'Clara Oswald', acuity: 'Stable', ventilatorAttached: false },
    { id: 'b12', number: 'GEN-102', type: 'General', status: 'vacant', ventilatorAttached: false },
    { id: 'b13', number: 'ISO-01', type: 'Isolation', status: 'occupied', patientName: 'Bacterial Meningitis (Monitored)', acuity: 'High', ventilatorAttached: true },
    { id: 'b14', number: 'ISO-02', type: 'Isolation', status: 'vacant', ventilatorAttached: true },
  ]);

  const [selectedBed, setSelectedBed] = useState<BedUnit | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const handleToggleBedStatus = (bedId: string) => {
    setBedUnits((prev) =>
      prev.map((b) => {
        if (b.id === bedId) {
          if (b.status === 'vacant') {
            return { ...b, status: 'occupied', patientName: 'Direct Emergency Admission', acuity: 'High' };
          }
          if (b.status === 'occupied') {
            return { ...b, status: 'cleaning', patientName: undefined, acuity: undefined };
          }
          if (b.status === 'cleaning') {
            return { ...b, status: 'vacant' };
          }
          if (b.status === 'reserved') {
            return { ...b, status: 'occupied' };
          }
        }
        return b;
      })
    );
    setActionSuccess('Bed status updated in real-time grid telemetry.');
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const filteredBeds = bedUnits.filter(
    (b) => filterType === 'All' || b.type === filterType
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-['Plus_Jakarta_Sans'] font-extrabold text-xl sm:text-2xl text-[#131a33] tracking-tight">
            Beds & Critical Care Resource Allocation
          </h1>
          <p className="text-xs text-[#707881] mt-0.5">
            Regional telemetry for ICU bays, ventilators, oxygen supplies, and rapid bed sanitation turnarounds
          </p>
        </div>

        {/* Hospital Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#707881] font-semibold">Active Matrix:</span>
          <select
            value={selectedHospital}
            onChange={(e) => setSelectedHospital(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-[#f3f3ff] text-xs font-bold text-[#006194] border border-[#ebedff] focus:outline-none"
          >
            {hospitals.map((h) => (
              <option key={h.id} value={h.name}>
                {h.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {actionSuccess && (
        <div className="p-3 bg-[#6df5e1]/30 border border-[#006b5f]/40 rounded-xl text-xs text-[#00201c] flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#006b5f]" />
            <span>{actionSuccess}</span>
          </div>
          <button onClick={() => setActionSuccess(null)} className="font-bold text-xs text-[#006b5f]">
            ✕
          </button>
        </div>
      )}

      {/* Critical Equipment Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase text-[#707881]">
              Mechanical Ventilators
            </span>
            <Wind className="w-4 h-4 text-[#006194]" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-['Plus_Jakarta_Sans'] text-2xl font-extrabold text-[#131a33] tabular-nums">
              42/50
            </span>
            <span className="text-xs font-semibold text-[#006b5f]">8 Free</span>
          </div>
          <div className="w-full bg-[#ebedff] rounded-full h-1.5 mt-2 overflow-hidden">
            <div className="bg-[#006194] h-full rounded-full w-[84%]" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase text-[#707881]">
              ECMO Circuits
            </span>
            <Activity className="w-4 h-4 text-[#ba1a1a]" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-['Plus_Jakarta_Sans'] text-2xl font-extrabold text-[#131a33] tabular-nums">
              4/6
            </span>
            <span className="text-xs font-semibold text-[#006b5f]">2 Free</span>
          </div>
          <div className="w-full bg-[#ebedff] rounded-full h-1.5 mt-2 overflow-hidden">
            <div className="bg-[#ba1a1a] h-full rounded-full w-[66%]" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase text-[#707881]">
              Liquid O2 Central Grid
            </span>
            <Droplet className="w-4 h-4 text-[#006b5f]" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-['Plus_Jakarta_Sans'] text-2xl font-extrabold text-[#006b5f] tabular-nums">
              98.4%
            </span>
            <span className="text-xs text-[#707881]">14-Day Reserve</span>
          </div>
          <div className="w-full bg-[#ebedff] rounded-full h-1.5 mt-2 overflow-hidden">
            <div className="bg-[#006b5f] h-full rounded-full w-[98%]" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase text-[#707881]">
              Dialysis (CRRT) Units
            </span>
            <RefreshCw className="w-4 h-4 text-[#525b7a]" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-['Plus_Jakarta_Sans'] text-2xl font-extrabold text-[#131a33] tabular-nums">
              8/10
            </span>
            <span className="text-xs font-semibold text-[#006b5f]">2 Free</span>
          </div>
          <div className="w-full bg-[#ebedff] rounded-full h-1.5 mt-2 overflow-hidden">
            <div className="bg-[#525b7a] h-full rounded-full w-[80%]" />
          </div>
        </div>
      </div>

      {/* Bed Bay Interactive Allocation Matrix */}
      <div className="p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#f1f3f9] mb-4">
          <div>
            <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#131a33]">
              Live Ward Bed Floor Plan & Status ({selectedHospital})
            </h2>
            <p className="text-xs text-[#707881]">
              Click any bed unit to toggle admission, cleaning cycle, or rapid allocation
            </p>
          </div>

          {/* Type filters */}
          <div className="flex items-center gap-1.5 bg-[#f3f3ff] p-1 rounded-xl border border-[#ebedff] text-xs">
            {['All', 'ICU', 'ER Bay', 'General', 'Isolation'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                  filterType === type
                    ? 'bg-[#006194] text-white'
                    : 'text-[#3f4850] hover:text-[#131a33]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs text-[#3f4850] mb-4 flex-wrap">
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#006b5f]" /> Vacant / Ready
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ba1a1a]" /> Occupied
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#007bb9]" /> Reserved (Inbound EMS)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#f59e0b]" /> Sanitizing / Prep
          </span>
        </div>

        {/* Interactive Bed Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
          {filteredBeds.map((bed) => {
            const isVacant = bed.status === 'vacant';
            const isOccupied = bed.status === 'occupied';
            const isReserved = bed.status === 'reserved';
            const isCleaning = bed.status === 'cleaning';

            return (
              <div
                key={bed.id}
                onClick={() => setSelectedBed(bed)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer hover:shadow-md flex flex-col justify-between ${
                  isVacant
                    ? 'bg-[#6df5e1]/10 border-[#006b5f]/30 hover:border-[#006b5f]'
                    : isOccupied
                    ? 'bg-[#ffdad6]/20 border-[#ba1a1a]/30 hover:border-[#ba1a1a]'
                    : isReserved
                    ? 'bg-[#cce5ff]/30 border-[#007bb9]/30 hover:border-[#007bb9]'
                    : 'bg-[#fef3c7]/30 border-[#f59e0b]/30 hover:border-[#f59e0b]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-[#131a33]">
                      {bed.number}
                    </span>
                    <span className="text-[10px] font-semibold text-[#707881]">
                      {bed.type}
                    </span>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                      isVacant
                        ? 'bg-[#6df5e1]/40 text-[#006f64]'
                        : isOccupied
                        ? 'bg-[#ffdad6] text-[#ba1a1a]'
                        : isReserved
                        ? 'bg-[#cce5ff] text-[#004b73]'
                        : 'bg-[#fef3c7] text-[#92400e]'
                    }`}
                  >
                    {bed.status}
                  </span>
                </div>

                <div className="my-2.5">
                  {bed.patientName ? (
                    <div>
                      <span className="text-xs font-bold text-[#131a33] block truncate">
                        {bed.patientName}
                      </span>
                      <span className="text-[10px] text-[#707881]">
                        Acuity: <strong className="text-[#ba1a1a]">{bed.acuity}</strong>
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-[#707881] italic">
                      {isCleaning ? 'Sanitization protocol in progress' : 'Ready for immediate intake'}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-black/5 text-[10px]">
                  <span className="text-[#3f4850] flex items-center gap-1">
                    <Wind className="w-3 h-3 text-[#006194]" />
                    {bed.ventilatorAttached ? 'Ventilator Active' : 'Oxygen Line'}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleBedStatus(bed.id);
                    }}
                    className="text-[#006194] font-bold hover:underline"
                  >
                    Quick Toggle
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
