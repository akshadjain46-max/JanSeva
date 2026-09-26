import React, { useState } from 'react';
import {
  Hospital,
  PatientToken,
  MedicineItem,
  BloodStock,
  BiomarkerFinding,
  TimelineMilestone,
  AmbulanceTelemetry,
  TabType,
  UserRole,
} from '../../types';
import {
  Activity,
  Bed,
  CheckCircle2,
  Clock,
  ExternalLink,
  Flame,
  HeartPulse,
  MapPin,
  RefreshCw,
  Search,
  Sparkles,
  Stethoscope,
  TrendingDown,
  TrendingUp,
  SlidersHorizontal,
} from 'lucide-react';

interface OverviewTabProps {
  hospitals: Hospital[];
  tokens: PatientToken[];
  medicines: MedicineItem[];
  bloodStocks: BloodStock[];
  biomarkers: BiomarkerFinding[];
  milestones: TimelineMilestone[];
  ambulances: AmbulanceTelemetry[];
  activeRole: UserRole;
  setActiveTab: (tab: TabType) => void;
  onOpenTokenModal: (hospitalName: string, department: string) => void;
  onCrossMatchRequest: () => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  hospitals,
  tokens,
  medicines,
  bloodStocks,
  biomarkers,
  milestones,
  ambulances,
  activeRole,
  setActiveTab,
  onOpenTokenModal,
  onCrossMatchRequest,
}) => {
  // Triage state
  const [hr, setHr] = useState(132);
  const [bp, setBp] = useState('84/52');
  const [spo2, setSpo2] = useState(88);
  const [gcs, setGcs] = useState(11);
  const [chiefComplaint, setChiefComplaint] = useState(
    'Acute crushing retrosternal chest pain radiating to left arm with diaphoresis & syncope'
  );
  const [triageOutput, setTriageOutput] = useState({
    level: 'ESI LEVEL 1: RESUSCITATION',
    confidence: '99.1%',
    assessment:
      'Immediate hemodynamic compromise detected. Hypotension + hypoxia with ST elevation risk profile.',
    dispatch: 'Metro West - Cath Lab Bay 02 Ready',
    protocol: 'ACC/AHA STEMI Rapid Track',
    signOff: 'Dr. Rostova',
    isCritical: true,
  });

  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [selectedAmbulance, setSelectedAmbulance] = useState<string | null>(null);

  const handleRunTriage = (e: React.FormEvent) => {
    e.preventDefault();
    if (spo2 < 90 || hr > 130 || gcs < 12) {
      setTriageOutput({
        level: 'ESI LEVEL 1: RESUSCITATION / IMMEDIATE',
        confidence: '99.4%',
        assessment:
          'Critical hemodynamic & oxygenation failure detected. Immediate catheterization / resuscitation bay required.',
        dispatch: 'Metro West - Cath Lab Bay 02 Allocated',
        protocol: 'ACC/AHA STEMI Rapid Track',
        signOff: 'Dr. Rostova (Mandatory)',
        isCritical: true,
      });
    } else if (spo2 < 94 || hr > 105 || gcs < 14) {
      setTriageOutput({
        level: 'ESI LEVEL 2: EMERGENT',
        confidence: '96.8%',
        assessment:
          'High-acuity clinical risk identified. Potential organ hypoperfusion. Bed assignment required within 10 minutes.',
        dispatch: 'Metro West - Trauma Bay 04 Ready',
        protocol: 'Emergency Sepsis / Cardiac Protocol',
        signOff: 'Dr. Rostova',
        isCritical: true,
      });
    } else {
      setTriageOutput({
        level: 'ESI LEVEL 3: URGENT / STABLE',
        confidence: '94.2%',
        assessment:
          'Vitals stabilized within acceptable clinical thresholds. Assigned to monitored telemetry bed within standard consult window.',
        dispatch: 'Memorial Grace - General ER Observation',
        protocol: 'Standard Clinical Evaluation Protocol',
        signOff: 'Attending Physician',
        isCritical: false,
      });
    }
  };

  const filteredHospitals = hospitals.filter((h) => {
    if (departmentFilter === 'All') return true;
    return h.departments.some((d) => d.toLowerCase().includes(departmentFilter.toLowerCase()));
  });

  return (
    <div className="flex flex-col gap-6">
      {/* 4 High-Velocity Executive Telemetry Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-4 rounded-xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#707881]">
              Network Bed Occupancy
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#e3e7ff] text-[#3f4850]">
              Grid-wide
            </span>
          </div>
          <div className="mt-2.5 flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="font-['Plus_Jakarta_Sans'] text-3xl font-extrabold text-[#131a33] leading-none tabular-nums">
                84%
              </span>
              <span className="text-xs font-semibold text-[#ba1a1a]">+2.4% vs yday</span>
            </div>
            {/* Sparkline */}
            <svg className="w-20 h-7 text-[#006194]" fill="none" viewBox="0 0 100 30">
              <path
                d="M0,22 Q20,18 40,24 T80,10 L100,6"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2.5"
              />
              <path
                d="M0,22 Q20,18 40,24 T80,10 L100,6 L100,30 L0,30 Z"
                fill="currentColor"
                fillOpacity="0.08"
              />
            </svg>
          </div>
          <div className="mt-2.5 pt-1.5 flex items-center justify-between text-xs text-[#3f4850] bg-[#f3f3ff] rounded-lg px-2.5 py-1 tabular-nums border border-[#ebedff]">
            <span>
              ICU: <strong className="text-[#ba1a1a]">92%</strong>
            </span>
            <span>·</span>
            <span>
              ER: <strong className="text-[#131a33]">78%</strong>
            </span>
            <span>·</span>
            <span>
              Gen: <strong className="text-[#006b5f]">81%</strong>
            </span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-4 rounded-xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#707881]">
              Wait-Time Accuracy Index
            </span>
            <span className="material-symbols-outlined text-[#006b5f] text-[18px]">verified</span>
          </div>
          <div className="mt-2.5 flex items-baseline justify-between">
            <span className="font-['Plus_Jakarta_Sans'] text-3xl font-extrabold text-[#131a33] leading-none tabular-nums">
              96.4%
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#6df5e1]/30 text-[#006f64] tabular-nums">
              ±1.8m dev
            </span>
          </div>
          <div className="mt-2.5 pt-1.5 flex items-center gap-1.5 text-xs text-[#3f4850]">
            <span className="material-symbols-outlined text-[15px] text-[#006b5f]">insights</span>
            <span>Calibrated across 210 on-duty doctors</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-4 rounded-xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#707881]">
              Emergency Inflow Queue
            </span>
            <span className="flex items-center gap-1 text-[10px] text-[#ba1a1a] font-bold uppercase">
              <span className="h-2 w-2 rounded-full bg-[#ba1a1a] animate-ping" /> Live
            </span>
          </div>
          <div className="mt-2.5 flex items-baseline justify-between">
            <span className="font-['Plus_Jakarta_Sans'] text-3xl font-extrabold text-[#ba1a1a] leading-none tabular-nums">
              18
            </span>
            <span className="text-xs font-semibold text-[#3f4850]">Critical cases</span>
          </div>
          <div className="mt-2.5 pt-1.5 flex items-center justify-between text-xs text-[#3f4850] bg-[#f3f3ff] rounded-lg px-2.5 py-1 tabular-nums border border-[#ebedff]">
            <span className="text-[#006b5f] font-semibold">0 unassigned beds</span>
            <span>·</span>
            <span>
              Avg ESI: <strong>2.1</strong>
            </span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-4 rounded-xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#707881]">
              Tomorrow OPD Neural Forecast
            </span>
            <span className="material-symbols-outlined text-[#006194] text-[18px]">query_stats</span>
          </div>
          <div className="mt-2.5 flex items-baseline justify-between">
            <span className="font-['Plus_Jakarta_Sans'] text-3xl font-extrabold text-[#006194] leading-none tabular-nums">
              +34%
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ffdad6] text-[#93000a]">
              Surge Alert
            </span>
          </div>
          <div className="mt-2.5 pt-1.5 flex items-center justify-between text-xs text-[#3f4850]">
            <span>Peak: Ortho & Pulmonology</span>
            <span className="text-[#006194] font-semibold">Staffing adjusted</span>
          </div>
        </div>
      </div>

      {/* Main Center Grid: Left 7 Cols / Right 5 Cols */}
      <div className="grid grid-cols-1 2xl:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Regional Hospital Matrix & Live Map */}
        <div className="2xl:col-span-7 flex flex-col gap-6">
          {/* Hospital Directory & AI Live Comparison Matrix */}
          <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#006194] text-[24px]">
                  domain_verification
                </span>
                <div>
                  <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-base sm:text-lg text-[#131a33] leading-tight">
                    Regional Hospital Matrix & Live Queues
                  </h2>
                  <p className="text-xs text-[#707881]">
                    Real-time load scoring computed via travel ETA, queued tokens, and active critical bays
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-[#f3f3ff] p-1 rounded-lg border border-[#ebedff] text-xs">
                  {['All', 'Cardiology', 'Trauma', 'Pediatric'].map((dept) => (
                    <button
                      key={dept}
                      onClick={() => setDepartmentFilter(dept)}
                      className={`px-2 py-1 rounded text-xs font-semibold transition-colors ${
                        departmentFilter === dept
                          ? 'bg-[#006194] text-white'
                          : 'text-[#3f4850] hover:text-[#131a33]'
                      }`}
                    >
                      {dept}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setActiveTab('hospital-search-comparison')}
                  className="px-2.5 py-1.5 rounded-lg bg-[#006194] text-white text-xs font-semibold hover:bg-[#007bb9] transition-colors flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Full Matrix</span>
                </button>
              </div>
            </div>

            {/* Hospital Cards List */}
            <div className="flex flex-col gap-3">
              {filteredHospitals.map((h) => {
                const isOptimal = h.statusType === 'optimal';
                const isOvercap = h.statusType === 'warning';
                const isPriority = h.statusType === 'priority';

                return (
                  <div
                    key={h.id}
                    className="p-3.5 sm:p-4 rounded-xl bg-[#f3f3ff] hover:bg-[#ebedff] border border-[#ebedff] transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-3"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div
                        className={`h-11 w-11 rounded-xl flex flex-col items-center justify-center shrink-0 text-white font-bold ${
                          isOptimal
                            ? 'bg-[#006b5f]'
                            : isOvercap
                            ? 'bg-[#ba1a1a]'
                            : isPriority
                            ? 'bg-[#007bb9]'
                            : 'bg-[#525b7a]'
                        }`}
                      >
                        <span className="text-sm leading-none tabular-nums">{h.matchScore}</span>
                        <span className="text-[9px] uppercase tracking-tighter opacity-90">
                          {h.scoreType}
                        </span>
                      </div>

                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-sm sm:text-base text-[#131a33] truncate">
                            {h.name}
                          </h3>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
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
                          <span className="text-xs text-[#707881] font-medium tabular-nums">
                            {h.distanceKm} km · {h.travelTimeMins} min
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-[#3f4850] mt-1 flex-wrap">
                          <span className="truncate">Depts: {h.departments.join(', ')}</span>
                          <span aria-hidden="true">·</span>
                          <span>
                            Doctors: <strong className="text-[#131a33]">{h.doctorsOnDuty} on-duty</strong>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Stats & CTA */}
                    <div className="flex items-center gap-4 shrink-0 justify-between lg:justify-end pt-2 lg:pt-0 border-t lg:border-t-0 border-[#e2e8f0]">
                      <div className="flex items-center gap-3 text-right">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-[#707881] uppercase tracking-wider">
                            AI Wait
                          </span>
                          <span
                            className={`text-xs font-bold tabular-nums flex items-center gap-0.5 ${
                              isOvercap ? 'text-[#ba1a1a]' : 'text-[#006b5f]'
                            }`}
                          >
                            {h.queueTrend === 'up' ? (
                              <TrendingUp className="w-3.5 h-3.5" />
                            ) : (
                              <TrendingDown className="w-3.5 h-3.5" />
                            )}
                            {h.queueWaitMins} mins
                          </span>
                        </div>

                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-[#707881] uppercase tracking-wider">
                            Beds Open
                          </span>
                          <span
                            className={`text-xs font-bold tabular-nums ${
                              isOvercap ? 'text-[#ba1a1a]' : 'text-[#131a33]'
                            }`}
                          >
                            {h.bedsOpen.nicu !== undefined
                              ? `NICU: ${h.bedsOpen.nicu} | PICU: ${h.bedsOpen.picu}`
                              : `ICU: ${h.bedsOpen.icu} | ER: ${h.bedsOpen.er}`}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => onOpenTokenModal(h.name, h.departments[0] || 'Emergency')}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 ${
                          isOvercap
                            ? 'bg-[#e3e7ff] text-[#131a33] hover:bg-[#dbe1ff]'
                            : 'bg-[#006194] text-white hover:bg-[#007bb9]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {isOvercap ? 'hourglass_empty' : 'confirmation_number'}
                        </span>
                        <span>{isOvercap ? 'Standby Token' : 'Get Token'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Metropolitan Grid Map & Ambulance Intercept */}
          <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006194] text-[22px]">map</span>
                <span className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#131a33]">
                  Metropolitan Grid Map & Ambulance Intercept
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#3f4850]">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-[#006b5f]" /> Free (&lt;15m)
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-[#525b7a]" /> Moderate (~30m)
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-[#ba1a1a]" /> Divert (&gt;60m)
                </span>
              </div>
            </div>

            {/* Map Canvas HUD */}
            <div className="relative w-full h-80 rounded-xl overflow-hidden bg-[#e3e7ff] border border-[#bfc7d2]/40">
              {/* Actual Map Backdrop */}
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBhk8FRlmNCOY0SVRS5kB5XJuwdLSKQ2ICaH_gx8pXyhKSTl3Md5EsD1zMtIw0soBaBG-yZlwZTWygCfot_xVcQfXXa4i1GhnR7Y5nfehhrNC7qdACg_sYI_Ra7xoKocuoZKXWr-Cf3f99UqHDbwUh8iblIbwHZOfLO46eKHdf7y2EBVgCw3ZQ9UtIH4HY_c8XIeV8WO2x3iVkUUjRQhaAROLFJkCgjaFw2IbRafDQIg7ja_ZuZN4PlWg')",
                }}
              />

              {/* HUD Overlay */}
              <div className="absolute inset-0 bg-[#282f49]/35 backdrop-blur-[1px] p-3 flex flex-col justify-between">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-md shadow-sm flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#006b5f] animate-pulse" />
                    <span className="text-[11px] font-bold text-[#131a33] uppercase tracking-wider">
                      Live Telemetry: 7 Ambulances In-Transit
                    </span>
                  </div>
                  <div className="px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-md text-[11px] font-mono text-[#131a33] font-semibold tabular-nums">
                    GIS Grid Lat: 41.8781° N, Long: 87.6298° W
                  </div>
                </div>

                {/* Tactical Hospital & Ambulance Pins */}
                <div className="relative w-full h-full">
                  {/* Pin 1: St Jude Overflow */}
                  <div className="absolute top-[28%] left-[22%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="relative flex items-center justify-center">
                      <span className="absolute h-8 w-8 rounded-full bg-[#ba1a1a]/40 animate-ping" />
                      <div className="h-6 w-6 rounded-full bg-[#ba1a1a] text-white flex items-center justify-center shadow-lg">
                        <span className="material-symbols-outlined text-[13px]">local_hospital</span>
                      </div>
                    </div>
                    <div className="mt-1 px-2 py-0.5 rounded bg-white/95 shadow-sm text-center border border-[#ffdad6]">
                      <p className="text-[9px] font-bold text-[#ba1a1a] uppercase leading-tight">
                        St. Jude [OVERFLOW]
                      </p>
                      <p className="text-[8px] font-semibold text-[#131a33]">Wait: 62m | 94% Occ</p>
                    </div>
                  </div>

                  {/* Pin 2: Metro West Target */}
                  <div className="absolute top-[52%] left-[64%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="relative flex items-center justify-center">
                      <span className="absolute h-8 w-8 rounded-full bg-[#006b5f]/40 animate-ping" />
                      <div className="h-6 w-6 rounded-full bg-[#006b5f] text-white flex items-center justify-center shadow-lg">
                        <span className="material-symbols-outlined text-[13px]">local_hospital</span>
                      </div>
                    </div>
                    <div className="mt-1 px-2 py-0.5 rounded bg-white/95 shadow-sm text-center border border-[#6df5e1]">
                      <p className="text-[9px] font-bold text-[#006b5f] uppercase leading-tight">
                        Metro West [TARGET]
                      </p>
                      <p className="text-[8px] font-semibold text-[#131a33]">Wait: 14m | Rec Route</p>
                    </div>
                  </div>

                  {/* Pin 3: Memorial Grace */}
                  <div className="absolute bottom-[20%] left-[38%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="h-5 w-5 rounded-full bg-[#525b7a] text-white flex items-center justify-center shadow-md">
                      <span className="material-symbols-outlined text-[12px]">local_hospital</span>
                    </div>
                    <div className="mt-1 px-1.5 py-0.5 rounded bg-white/90 shadow-sm text-center">
                      <p className="text-[8px] font-bold text-[#131a33] leading-tight">Memorial Grace</p>
                      <p className="text-[8px] text-[#707881]">22m Wait</p>
                    </div>
                  </div>

                  {/* Moving Ambulance Intercept Marker */}
                  <div
                    onClick={() => setSelectedAmbulance('Medic-04')}
                    className="absolute top-[36%] left-[45%] flex items-center gap-1.5 bg-white/95 border border-[#ba1a1a]/30 px-2 py-1 rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform"
                  >
                    <span className="material-symbols-outlined text-[#ba1a1a] text-[16px] animate-pulse">
                      ambulance
                    </span>
                    <div className="flex flex-col text-left">
                      <span className="text-[9px] font-bold text-[#131a33] uppercase leading-none">
                        Medic-04 (STEMI)
                      </span>
                      <span className="text-[8px] text-[#006b5f] font-bold">
                        Diverted → Metro West (ETA 6m)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Legend Bar */}
                <div className="p-2 rounded-lg bg-white/90 backdrop-blur-md flex items-center justify-between text-xs">
                  <span className="text-[#131a33] font-medium">
                    Algorithmic Load Balancer: Routing Efficiency <strong>+38%</strong>
                  </span>
                  <button
                    onClick={() => setActiveTab('admin-predictive-insights')}
                    className="text-[11px] font-bold text-[#006194] hover:underline flex items-center gap-1"
                  >
                    <span>View Telemetry Fleet</span>
                    <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Emergency Mode, AI Triage & Smart Bank */}
        <div className="2xl:col-span-5 flex flex-col gap-6">
          {/* Emergency Mode & AI Clinical Triage System */}
          <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">e911_emergency</span>
                </div>
                <div>
                  <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#ba1a1a] leading-tight">
                    Emergency Clinical AI Triage
                  </h2>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#707881]">
                    Mission Critical ESI Predictor
                  </span>
                </div>
              </div>

              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ffdad6] text-[#ba1a1a] uppercase animate-pulse">
                RAPID ENTRY
              </span>
            </div>

            {/* Vital-Sign Form */}
            <form onSubmit={handleRunTriage} className="flex flex-col gap-2.5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-[#707881] uppercase tracking-wider mb-0.5">
                    HR (BPM)
                  </label>
                  <input
                    type="number"
                    value={hr}
                    onChange={(e) => setHr(Number(e.target.value))}
                    className="px-2 py-1 rounded bg-[#f3f3ff] text-[#131a33] font-mono text-xs font-bold focus:outline-none focus:ring-1 focus:ring-[#006194]"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-[#707881] uppercase tracking-wider mb-0.5">
                    BP (mmHg)
                  </label>
                  <input
                    type="text"
                    value={bp}
                    onChange={(e) => setBp(e.target.value)}
                    className="px-2 py-1 rounded bg-[#f3f3ff] text-[#131a33] font-mono text-xs font-bold focus:outline-none focus:ring-1 focus:ring-[#006194]"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-[#707881] uppercase tracking-wider mb-0.5">
                    SpO2 (%)
                  </label>
                  <input
                    type="number"
                    value={spo2}
                    onChange={(e) => setSpo2(Number(e.target.value))}
                    className="px-2 py-1 rounded bg-[#f3f3ff] text-[#131a33] font-mono text-xs font-bold focus:outline-none focus:ring-1 focus:ring-[#006194]"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-[#707881] uppercase tracking-wider mb-0.5">
                    GCS (3-15)
                  </label>
                  <input
                    type="number"
                    value={gcs}
                    onChange={(e) => setGcs(Number(e.target.value))}
                    className="px-2 py-1 rounded bg-[#f3f3ff] text-[#131a33] font-mono text-xs font-bold focus:outline-none focus:ring-1 focus:ring-[#006194]"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-[#707881] uppercase tracking-wider mb-0.5">
                  Chief Complaint / Observed Syndrome
                </label>
                <input
                  type="text"
                  value={chiefComplaint}
                  onChange={(e) => setChiefComplaint(e.target.value)}
                  className="px-2.5 py-1.5 rounded bg-[#f3f3ff] text-[#131a33] text-xs focus:outline-none focus:ring-1 focus:ring-[#006194]"
                />
              </div>

              <button
                type="submit"
                className="py-2 rounded-lg bg-[#ba1a1a] hover:bg-[#93000a] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <span className="material-symbols-outlined text-[16px]">neurology</span>
                <span>Run Neural Triage Classification</span>
              </button>
            </form>

            {/* AI Result Box */}
            <div className="mt-3 p-3.5 rounded-xl bg-[#ffdad6]/40 border border-[#ffdad6] flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#ba1a1a] text-white">
                  {triageOutput.level}
                </span>
                <span className="text-xs font-bold text-[#ba1a1a] tabular-nums">
                  Confidence: {triageOutput.confidence}
                </span>
              </div>
              <p className="text-xs text-[#131a33] leading-relaxed">{triageOutput.assessment}</p>

              <div className="p-2 rounded-lg bg-white/90 flex items-center justify-between text-xs mt-1 border border-[#ebedff]">
                <span className="text-[#3f4850] font-medium">Optimal Facility Dispatch:</span>
                <strong className="text-[#006194] font-bold">{triageOutput.dispatch}</strong>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#707881] pt-1">
                <span>Protocol: {triageOutput.protocol}</span>
                <span className="text-[#ba1a1a] font-bold">Sign-off Req: {triageOutput.signOff}</span>
              </div>
            </div>
          </div>

          {/* Smart Medicine Inventory & Emergency Blood Bank */}
          <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col gap-4">
            {/* Medicine Stocks */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#006b5f] text-[18px]">
                    medication
                  </span>
                  <span className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#131a33]">
                    Smart Medicine Stock Forecast
                  </span>
                </div>
                <span className="text-[10px] font-bold text-[#006b5f] uppercase tracking-wider">
                  AI Auto-Reorder On
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {medicines.slice(0, 2).map((med) => (
                  <div
                    key={med.id}
                    className="p-2.5 rounded-lg bg-[#f3f3ff] border border-[#ebedff] flex items-center justify-between"
                  >
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#131a33]">{med.name}</span>
                      <span className="text-[10px] text-[#707881]">
                        Batch: {med.batchNumber} | Exp: {med.daysToExpiry}d
                      </span>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-xs font-bold tabular-nums ${
                          med.status === 'critical' ? 'text-[#ba1a1a]' : 'text-[#006b5f]'
                        }`}
                      >
                        {med.currentStock} {med.stockUnit}
                      </span>
                      <p
                        className={`text-[9px] font-semibold ${
                          med.status === 'critical' ? 'text-[#ba1a1a]' : 'text-[#707881]'
                        }`}
                      >
                        {med.status === 'critical'
                          ? `Depletes in ${med.depletionForecastHours}h (Auto-ordered)`
                          : `Adequate supply (${(med.depletionForecastHours / 24).toFixed(1)} days)`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Blood Bank Matrix */}
            <div className="flex flex-col pt-1 border-t border-[#e2e8f0]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#ba1a1a] text-[18px]">bloodtype</span>
                  <span className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#131a33]">
                    Emergency Blood Bank Reserves
                  </span>
                </div>
                <button
                  onClick={onCrossMatchRequest}
                  className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-[#ffdad6] text-[#ba1a1a] hover:bg-[#ba1a1a] hover:text-white transition-colors"
                >
                  Stat Crossmatch
                </button>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5 text-center">
                {bloodStocks.slice(0, 6).map((b) => {
                  const isCritical = b.status === 'Critical' || b.status === 'Low';
                  return (
                    <div
                      key={b.type}
                      className={`p-1.5 rounded-lg flex flex-col items-center border ${
                        isCritical
                          ? 'bg-[#ffdad6]/40 border-[#ffdad6]'
                          : 'bg-[#f3f3ff] border-[#ebedff]'
                      }`}
                    >
                      <span
                        className={`text-[10px] font-bold ${
                          isCritical ? 'text-[#ba1a1a]' : 'text-[#131a33]'
                        }`}
                      >
                        {b.type}
                      </span>
                      <span className="font-mono text-xs font-extrabold text-[#131a33] tabular-nums">
                        {b.units} U
                      </span>
                      <span
                        className={`text-[8px] font-bold ${
                          isCritical ? 'text-[#ba1a1a]' : 'text-[#006b5f]'
                        }`}
                      >
                        {b.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Multi-Pane Grid: AI Diagnostics, Timeline & Doctor Workstation */}
      <div className="grid grid-cols-1 2xl:grid-cols-12 gap-6">
        {/* Left Bottom: AI Diagnostic Report Synthesizer & Patient Timeline (7 cols) */}
        <div className="2xl:col-span-7 flex flex-col gap-6">
          <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006194] text-[22px]">
                  document_scanner
                </span>
                <div>
                  <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#131a33] leading-tight">
                    AI Diagnostic Report Synthesizer
                  </h2>
                  <span className="text-[10px] text-[#707881]">
                    Document Ingest: Comprehensive Metabolic & Cardiac Biomarker Panel
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#6df5e1]/40 text-[#006f64] text-[10px] font-bold">
                Parsed with 99.4% Optical Fidelity
              </span>
            </div>

            {/* Biomarker Bento Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
              {biomarkers.map((bio, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-[#f3f3ff] border border-[#ebedff] flex flex-col justify-between"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#707881]">
                    {bio.name}
                  </span>
                  <div className="mt-1 flex items-baseline justify-between">
                    <span
                      className={`text-xs font-bold tabular-nums ${
                        bio.statusColor === 'error'
                          ? 'text-[#ba1a1a]'
                          : bio.statusColor === 'warning'
                          ? 'text-[#131a33]'
                          : 'text-[#006194]'
                      }`}
                    >
                      {bio.value}
                    </span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                        bio.statusColor === 'error'
                          ? 'bg-[#ba1a1a] text-white'
                          : 'bg-[#e3e7ff] text-[#3f4850]'
                      }`}
                    >
                      {bio.status}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#707881] mt-1">{bio.referenceRange}</span>
                </div>
              ))}
            </div>

            {/* Longitudinal Clinical Trajectory Timeline */}
            <div className="flex flex-col pt-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#707881] mb-3">
                Longitudinal Clinical Trajectory
              </span>
              <div className="relative flex items-center justify-between w-full px-4 py-3 bg-[#f3f3ff]/60 border border-[#ebedff] rounded-xl overflow-x-auto">
                {/* Connecting Track */}
                <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-0.5 bg-[#dbe1ff] z-0" />

                {milestones.map((m) => {
                  const isActive = m.status === 'active';
                  const isDone = m.status === 'completed';

                  return (
                    <div
                      key={m.id}
                      className="relative z-10 flex flex-col items-center text-center px-2 min-w-[90px]"
                    >
                      <div
                        className={`h-7 w-7 rounded-full flex items-center justify-center shadow-sm text-xs ${
                          isActive
                            ? 'bg-[#ba1a1a] text-white animate-pulse'
                            : isDone
                            ? 'bg-[#006194] text-white'
                            : 'bg-[#e3e7ff] text-[#707881]'
                        }`}
                      >
                        {isActive ? (
                          <span className="material-symbols-outlined text-[15px]">priority_high</span>
                        ) : isDone ? (
                          <span className="material-symbols-outlined text-[14px]">check</span>
                        ) : (
                          <span className="material-symbols-outlined text-[14px]">update</span>
                        )}
                      </div>
                      <span
                        className={`text-[10px] font-bold mt-1.5 ${
                          isActive ? 'text-[#ba1a1a]' : 'text-[#131a33]'
                        }`}
                      >
                        {m.date}
                      </span>
                      <span className="text-[9px] text-[#707881] font-medium">{m.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Bottom: Doctor OPD Queue & Neural Resource Prediction (5 cols) */}
        <div className="2xl:col-span-5 flex flex-col gap-6">
          <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006194] text-[20px]">
                  clinical_notes
                </span>
                <div>
                  <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#131a33] leading-tight">
                    Dr. Rostova's Active Workstation
                  </h2>
                  <span className="text-[10px] text-[#707881]">
                    Cardiology Department · Consultation Room 3B
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#6df5e1]/40 text-[#006f64]">
                On Schedule
              </span>
            </div>

            {/* Currently Called Token */}
            <div className="p-3 rounded-xl bg-[#ebedff] border border-[#dbe1ff] flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-[#006194] text-white flex items-center justify-center font-mono font-bold text-sm">
                  #408
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#131a33]">Marcus Vance (54y, Male)</span>
                  <span className="text-[11px] text-[#3f4850]">Post-Angioplasty Follow-up · Stable</span>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('ai-queue-token-tracker')}
                className="px-3 py-1 rounded-lg bg-[#006194] text-white text-xs font-bold hover:bg-[#007bb9] transition-all"
              >
                Complete
              </button>
            </div>

            {/* Up Next in Stream */}
            <div className="flex flex-col gap-1.5 mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#707881]">
                Up Next in Stream
              </span>

              {tokens.slice(1, 4).map((t) => (
                <div
                  key={t.id}
                  className="p-2 rounded-lg bg-[#f3f3ff] border border-[#ebedff] flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#131a33]">{t.tokenCode}</span>
                    <span className="font-medium text-[#131a33]">{t.patientName}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                        t.priorityLevel === 'Urgent'
                          ? 'bg-[#ffdad6] text-[#ba1a1a]'
                          : 'bg-[#e3e7ff] text-[#3f4850]'
                      }`}
                    >
                      {t.symptoms?.split('·')[0] || t.priorityLevel}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#707881] tabular-nums">
                    ETA {t.estimatedCallTime}
                  </span>
                </div>
              ))}
            </div>

            {/* AI Patient-Flow Heatmap & Staffing Advice */}
            <div className="p-3 rounded-xl bg-[#f3f3ff] border border-[#ebedff] flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-[#006194]">
                  Neural Resource Rebalancer
                </span>
                <span className="text-[10px] text-[#707881]">Hourly Shift Prediction</span>
              </div>

              {/* Spectrum Bars */}
              <div className="flex items-end gap-1.5 h-8 w-full pt-1">
                <div className="flex-1 bg-[#006b5f] rounded-t h-[40%]" title="08:00 - 32 patients" />
                <div className="flex-1 bg-[#006b5f] rounded-t h-[65%]" title="09:00 - 58 patients" />
                <div className="flex-1 bg-[#006194] rounded-t h-[95%]" title="10:00 - 89 patients (Peak)" />
                <div className="flex-1 bg-[#006194] rounded-t h-[88%]" title="11:00 - 82 patients" />
                <div className="flex-1 bg-[#006b5f] rounded-t h-[50%]" title="12:00 - 45 patients" />
                <div className="flex-1 bg-[#006b5f] rounded-t h-[45%]" title="13:00 - 40 patients" />
                <div className="flex-1 bg-[#006194] rounded-t h-[75%]" title="14:00 - 70 patients" />
                <div className="flex-1 bg-[#ba1a1a] rounded-t h-[100%]" title="18:00 - ER Influx Spike" />
              </div>

              <div className="flex justify-between text-[9px] text-[#707881] tabular-nums">
                <span>08:00</span>
                <span>10:00 (Peak OPD)</span>
                <span>14:00</span>
                <span className="text-[#ba1a1a] font-bold">18:00 (ER Influx)</span>
              </div>

              <div className="mt-1 flex items-center gap-2 text-xs text-[#131a33] bg-white p-2 rounded-lg border border-[#e2e8f0]">
                <span className="material-symbols-outlined text-[#006194] text-[18px]">psychology</span>
                <span>
                  <strong>Prescriptive Action:</strong> Deploy +2 Triage Nurses to St. Jude ER for 18:00-22:00 shift.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
