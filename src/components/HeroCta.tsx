import React from 'react';
import { ShieldAlert, Activity, Bed, User, Stethoscope, Shield, ArrowRight } from 'lucide-react';
import { TabType, UserRole } from '../types';

interface HeroCtaProps {
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  setActiveTab: (tab: TabType) => void;
  onQuickToken: () => void;
}

export const HeroCta: React.FC<HeroCtaProps> = ({
  activeRole,
  setActiveRole,
  setActiveTab,
  onQuickToken,
}) => {
  return (
    <div className="flex flex-col gap-3 mb-6">
      {/* Primary Hero Banner with Clear User Call-To-Action */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#004b73] via-[#006194] to-[#007bb9] text-white p-6 sm:p-7 shadow-sm border border-[#004b73]/20">
        {/* Subtle geometric medical grid pattern overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#71f8e4]/20 text-[#71f8e4] border border-[#71f8e4]/30">
                JanSEVA National Health Grid
              </span>
              <span className="text-white/60 text-xs hidden sm:inline">·</span>
              <span className="text-white/80 text-xs hidden sm:inline font-medium">
                Live Algorithmic Balancing Active
              </span>
            </div>

            <h1 className="font-['Plus_Jakarta_Sans'] text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Rapid Emergency Response & Unified Hospital Grid
            </h1>
            <p className="text-white/90 text-sm mt-2 leading-relaxed">
              Find immediate open ICU and trauma beds, run neural emergency clinical triage (ESI 1–5), or secure zero-wait digital OPD tokens across 14 interconnected facilities.
            </p>

            {/* Clear Primary Call-To-Actions */}
            <div className="mt-5 flex items-center gap-3 flex-wrap">
              <button
                onClick={() => setActiveTab('emergency-ai-triage')}
                className="px-4 py-2.5 rounded-xl bg-[#ba1a1a] hover:bg-[#93000a] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              >
                <ShieldAlert className="w-4 h-4 text-white animate-pulse" />
                <span>Emergency AI Triage (ESI 1-5)</span>
              </button>

              <button
                onClick={() => setActiveTab('hospital-search-comparison')}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#f3f3ff] text-[#006194] text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Bed className="w-4 h-4 text-[#006194]" />
                <span>Find & Reserve Open Bed</span>
              </button>

              <button
                onClick={onQuickToken}
                className="px-4 py-2.5 rounded-xl bg-[#6df5e1] hover:bg-[#4fdbc8] text-[#00201c] text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">confirmation_number</span>
                <span>Get Instant Digital Token</span>
              </button>
            </div>
          </div>

          {/* Quick Real-Time Grid Status Box */}
          <div className="bg-[#00201c]/30 backdrop-blur-md border border-white/15 rounded-xl p-4 xl:w-72 shrink-0">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#71f8e4]">
                Grid Health Index
              </span>
              <span className="text-xs font-bold text-white tabular-nums">98.2% Optimal</span>
            </div>
            <div className="mt-2.5 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-white/80">Open ICU Bays:</span>
                <strong className="text-white font-semibold">18 units available</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80">Ambulance Dispatch:</span>
                <strong className="text-[#71f8e4] font-semibold">7 in-transit (Zero delay)</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80">Avg ER Wait Saved:</span>
                <strong className="text-[#6df5e1] font-semibold">-45 mins via Load Balancer</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Operational Load Balancing Broadcast Bar + Role Switcher */}
      <div className="p-3.5 rounded-xl bg-[#e3e7ff] border border-[#dbe1ff] flex flex-col xl:flex-row xl:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-[#007bb9] text-white flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">alt_route</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#006194]">
                Smart Balancing Active
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#006b5f]" />
              <span className="text-xs text-[#707881]">Network Protocol #882-Delta</span>
            </div>
            <p className="text-xs sm:text-sm text-[#131a33] mt-0.5">
              St. Jude Medical Center at <strong className="text-[#ba1a1a] font-bold">94% capacity</strong>. Automated triage is rerouting non-critical OPD patient streams to <strong>Metro West Central</strong>.
              <span className="text-[#006b5f] font-semibold ml-1.5">Estimated patient wait savings: -45 mins</span>
            </p>
          </div>
        </div>

        {/* Persona / Role View Switcher */}
        <div className="flex items-center gap-1 bg-[#f3f3ff] p-1 rounded-lg shrink-0 border border-[#ebedff]">
          <button
            onClick={() => setActiveRole('patient')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeRole === 'patient'
                ? 'bg-white text-[#131a33] shadow-xs'
                : 'text-[#3f4850] hover:text-[#131a33]'
            }`}
          >
            <User className={`w-3.5 h-3.5 ${activeRole === 'patient' ? 'text-[#006194]' : 'text-[#707881]'}`} />
            <span>Patient Navigation</span>
          </button>

          <button
            onClick={() => setActiveRole('doctor')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeRole === 'doctor'
                ? 'bg-white text-[#131a33] shadow-xs'
                : 'text-[#3f4850] hover:text-[#131a33]'
            }`}
          >
            <Stethoscope className={`w-3.5 h-3.5 ${activeRole === 'doctor' ? 'text-[#006194]' : 'text-[#707881]'}`} />
            <span>Doctor Workstation</span>
          </button>

          <button
            onClick={() => setActiveRole('admin')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeRole === 'admin'
                ? 'bg-white text-[#131a33] shadow-xs'
                : 'text-[#3f4850] hover:text-[#131a33]'
            }`}
          >
            <Shield className={`w-3.5 h-3.5 ${activeRole === 'admin' ? 'text-[#006194]' : 'text-[#707881]'}`} />
            <span>Admin Command</span>
          </button>
        </div>
      </div>
    </div>
  );
};
