import React from 'react';
import { TabType } from '../types';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  targetFacility: string;
  setTargetFacility: (facility: string) => void;
  facilitiesList: string[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  targetFacility,
  setTargetFacility,
  facilitiesList,
}) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const navItems = [
    {
      id: 'overview-network-map' as TabType,
      label: 'Overview & Network Map',
      icon: 'hub',
      isEmergency: false,
    },
    {
      id: 'hospital-search-comparison' as TabType,
      label: 'Hospital Directory & Matrix',
      icon: 'local_hospital',
      isEmergency: false,
    },
    {
      id: 'ai-queue-token-tracker' as TabType,
      label: 'AI Queue & Live Tokens',
      icon: 'hourglass_top',
      isEmergency: false,
    },
    {
      id: 'emergency-ai-triage' as TabType,
      label: 'Emergency & AI Triage',
      icon: 'emergency',
      isEmergency: true,
    },
    {
      id: 'bed-resource-allocation' as TabType,
      label: 'Beds & Critical Resources',
      icon: 'bed',
      isEmergency: false,
    },
    {
      id: 'smart-pharmacy-blood-bank' as TabType,
      label: 'Pharmacy & Blood Bank',
      icon: 'vaccines',
      isEmergency: false,
    },
    {
      id: 'ai-reports-patient-timeline' as TabType,
      label: 'AI Diagnostics & Timeline',
      icon: 'neurology',
      isEmergency: false,
    },
    {
      id: 'admin-predictive-insights' as TabType,
      label: 'Demand & Neural Forecast',
      icon: 'analytics',
      isEmergency: false,
    },
  ];

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 lg:w-72 bg-white border-r border-[#e2e8f0] z-30 flex flex-col justify-between overflow-y-auto">
      <div className="flex flex-col">
        {/* Facility Selector */}
        <div className="p-3">
          <div className="p-2.5 rounded-xl bg-[#f3f3ff] border border-[#ebedff] flex flex-col gap-1.5 relative">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#707881]">
                Target Facility
              </span>
              <span className="h-2 w-2 rounded-full bg-[#006b5f] animate-pulse" />
            </div>

            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center justify-between text-left text-xs font-semibold text-[#131a33] bg-white p-2 rounded-lg shadow-xs hover:bg-[#faf8ff] transition-colors"
            >
              <span className="truncate">{targetFacility}</span>
              <span className="material-symbols-outlined text-[#707881] text-[18px]">
                {dropdownOpen ? 'expand_less' : 'expand_more'}
              </span>
            </button>

            {dropdownOpen && (
              <div className="absolute top-16 left-2 right-2 bg-white border border-[#e2e8f0] rounded-lg shadow-xl z-50 overflow-hidden">
                {facilitiesList.map((fac) => (
                  <button
                    key={fac}
                    onClick={() => {
                      setTargetFacility(fac);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-medium transition-colors ${
                      targetFacility === fac
                        ? 'bg-[#006194] text-white'
                        : 'text-[#131a33] hover:bg-[#f3f3ff]'
                    }`}
                  >
                    {fac}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Feature Navigation Tabs */}
        <nav className="flex flex-col gap-1 px-3 mt-1" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-xs font-semibold text-left group ${
                  isActive
                    ? item.isEmergency
                      ? 'bg-[#ffdad6] text-[#ba1a1a] shadow-xs'
                      : 'bg-[#007bb9] text-white shadow-xs'
                    : item.isEmergency
                    ? 'text-[#ba1a1a] hover:bg-[#ffdad6]/60'
                    : 'text-[#3f4850] hover:bg-[#ebedff] hover:text-[#131a33]'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[20px] transition-transform group-hover:scale-110 ${
                    item.isEmergency
                      ? 'text-[#ba1a1a]'
                      : isActive
                      ? 'text-white'
                      : 'text-[#006194]'
                  }`}
                >
                  {item.icon}
                </span>
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Grid Synchronization Metric Footer */}
      <div className="p-3 bg-[#f3f3ff]/80 m-3 rounded-xl border border-[#ebedff] flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#707881]">
            Grid Synchronization
          </span>
          <span className="text-xs font-bold text-[#006b5f] tabular-nums">99.98%</span>
        </div>
        <div className="w-full bg-[#dbe1ff] rounded-full h-1.5 overflow-hidden">
          <div className="bg-[#006b5f] h-full rounded-full w-[94%]" />
        </div>
        <span className="text-[10px] text-[#707881] font-medium">Zero-latency algorithmic sync</span>
      </div>
    </aside>
  );
};
