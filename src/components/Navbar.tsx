import React, { useState } from 'react';
import { Search, Bell, Grid, ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight, UserCheck } from 'lucide-react';
import { TabType, UserRole } from '../types';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  activeRole?: UserRole;
  setActiveRole?: (role: UserRole) => void;
  onOpenQuickAction?: (action: string) => void;
  onQuickToken?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  activeRole = 'patient',
  setActiveRole = () => {},
  onOpenQuickAction = () => {},
  onQuickToken,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showTraumaAlert, setShowTraumaAlert] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'Trauma Diversion Active',
      time: '2 mins ago',
      desc: 'St. Jude ER diverted Medic-04 to Metro West Cath Lab 02.',
      type: 'critical',
    },
    {
      id: 2,
      title: 'Critical Lab Value Alert',
      time: '7 mins ago',
      desc: 'Troponin-I 0.18 ng/mL reported for Marcus Vance (Room 3B).',
      type: 'warning',
    },
    {
      id: 3,
      title: 'Pharmacy Auto-Order Sent',
      time: '14 mins ago',
      desc: 'Automated restock for Epinephrine 1mg/mL (Batch #EP-9921) submitted.',
      type: 'info',
    },
  ];

  const quickSearchResults = [
    { title: 'Metro West Central (ICU: 6, ER: 12)', tab: 'hospital-search-comparison' as TabType },
    { title: 'Emergency AI Triage Calculator', tab: 'emergency-ai-triage' as TabType },
    { title: 'Blood Bank O-Negative Reserves', tab: 'smart-pharmacy-blood-bank' as TabType },
    { title: 'Cardiology Queue Token Pass', tab: 'ai-queue-token-tracker' as TabType },
    { title: 'Marcus Vance Patient Timeline', tab: 'ai-reports-patient-timeline' as TabType },
  ].filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#ffffff]/95 backdrop-blur-xl border-b border-[#e2e8f0] z-40 px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Brand & Left Quick Alert */}
      <div className="flex items-center gap-4 lg:gap-6 shrink-0">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('overview-network-map');
          }}
          className="flex items-center gap-2.5 text-left group"
        >
          <img
            alt="JanSEVA Healthcare Grid"
            className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida/AEtjO1XVSbNXrYwey7mbQxMqd2GXwY2atm1tkncbE7wPIWtOUFkzPx9vptmt6oA3kbXhZ5cAAJXv0VzZRoUJCV-fjBuNJB6Npk2EjwQvPfXDaSlVoqqL2eFjolqoG9kfboqdMo_5KM3ddbC5876kbRlNhrFlRXtnyk4yaDJHwiifI8TVk_XMEB-WgbODVoQLLgMsflvwZ9zLKUFrlZ1mmpqxWaHVR_gmdmyb2D4ndibpd5chAIzgrgsUbGbqZX0C"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-['Plus_Jakarta_Sans'] font-bold text-xl sm:text-2xl text-[#006194] tracking-tight leading-none">
                JanSEVA
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider bg-[#006194]/10 text-[#006194] px-1.5 py-0.5 rounded">
                Grid OS
              </span>
            </div>
            <span className="text-[11px] text-[#707881] font-medium hidden sm:inline-block">
              Unified Healthcare & Emergency Grid
            </span>
          </div>
        </a>

        {/* Active Trauma Protocol Badge */}
        <div className="relative">
          <button
            onClick={() => setShowTraumaAlert(!showTraumaAlert)}
            className="flex items-center gap-2 bg-[#ffdad6]/80 hover:bg-[#ffdad6] text-[#ba1a1a] px-3 py-1.5 rounded-full transition-colors text-xs font-semibold shadow-xs"
            title="Click to view Code Red Details"
          >
            <span className="h-2 w-2 rounded-full bg-[#ba1a1a] animate-ping" />
            <span className="uppercase tracking-wider hidden md:inline">Active Trauma Protocol</span>
            <span className="font-bold">CODE RED BALANCING</span>
          </button>

          {/* Trauma Details Popup */}
          {showTraumaAlert && (
            <div className="absolute top-12 left-0 w-80 sm:w-96 bg-white border border-[#ffdad6] rounded-xl shadow-xl p-4 z-50 text-left">
              <div className="flex items-center justify-between pb-2 border-b border-[#ffdad6]">
                <div className="flex items-center gap-2 text-[#ba1a1a] font-bold text-sm">
                  <ShieldAlert className="w-4 h-4 text-[#ba1a1a]" />
                  <span>Regional Trauma Diversion Active</span>
                </div>
                <button
                  onClick={() => setShowTraumaAlert(false)}
                  className="text-xs text-[#707881] hover:text-[#131a33]"
                >
                  ✕
                </button>
              </div>
              <p className="text-xs text-[#3f4850] mt-2 leading-relaxed">
                St. Jude Medical Center has surpassed <strong>94% ICU capacity</strong>. Algorithmic load balancer has rerouted incoming non-critical ambulances and OPD volume to <strong>Metro West Central</strong>.
              </p>
              <div className="mt-3 flex items-center justify-between bg-[#f3f3ff] p-2 rounded-lg text-xs">
                <span className="text-[#006b5f] font-semibold">Net wait saved: -45 min</span>
                <button
                  onClick={() => {
                    setShowTraumaAlert(false);
                    setActiveTab('emergency-ai-triage');
                  }}
                  className="text-[#006194] font-bold hover:underline flex items-center gap-1"
                >
                  Open Triage <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Center Search Input */}
      <div className="relative flex-1 max-w-md hidden lg:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#707881] w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchDropdown(true);
            }}
            onFocus={() => setShowSearchDropdown(true)}
            placeholder="Search emergency bed, specialist, diagnosis, hospital..."
            className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-[#f3f3ff] text-[#131a33] placeholder:text-[#707881] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#006194] transition-all"
          />
        </div>

        {/* Quick Search Dropdown */}
        {showSearchDropdown && searchQuery.trim().length > 0 && (
          <div className="absolute top-10 left-0 right-0 bg-white border border-[#e2e8f0] rounded-lg shadow-lg overflow-hidden z-50">
            <div className="p-2 text-[11px] font-semibold text-[#707881] uppercase tracking-wider bg-[#f8fafc]">
              Quick Jumps
            </div>
            {quickSearchResults.length > 0 ? (
              quickSearchResults.map((result, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveTab(result.tab);
                    setShowSearchDropdown(false);
                    setSearchQuery('');
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-[#131a33] hover:bg-[#f3f3ff] flex items-center justify-between transition-colors"
                >
                  <span>{result.title}</span>
                  <ArrowRight className="w-3 h-3 text-[#707881]" />
                </button>
              ))
            ) : (
              <div className="px-3 py-3 text-xs text-[#707881] text-center">
                No direct match found. Try "Cardiology", "ICU", or "Triage".
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Stats & Actions */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        {/* High-Level Telemetry Chips */}
        <div className="hidden xl:flex items-center gap-4 bg-[#f3f3ff] px-4 py-1.5 rounded-lg border border-[#ebedff] text-xs">
          <div className="flex flex-col">
            <span className="text-[10px] text-[#707881] font-bold uppercase tracking-wider">Total Beds</span>
            <span className="font-semibold text-[#131a33] tabular-nums">
              1,420<span className="text-[#707881] font-normal">/1,650</span>
            </span>
          </div>
          <div className="h-6 w-[1px] bg-[#bfc7d2]/50" />
          <div className="flex flex-col">
            <span className="text-[10px] text-[#707881] font-bold uppercase tracking-wider">Avg Wait</span>
            <span className="font-bold text-[#006b5f] tabular-nums">24m</span>
          </div>
          <div className="h-6 w-[1px] bg-[#bfc7d2]/50" />
          <div className="flex flex-col">
            <span className="text-[10px] text-[#707881] font-bold uppercase tracking-wider">Blood Reserve</span>
            <span className="font-bold text-[#006194] tabular-nums">94%</span>
          </div>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg bg-[#f3f3ff] hover:bg-[#e3e7ff] text-[#3f4850] transition-colors"
            title="System Telemetry Alerts"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#ba1a1a]" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 bg-white border border-[#e2e8f0] rounded-xl shadow-xl p-3 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-[#e2e8f0]">
                <span className="text-xs font-bold text-[#131a33]">Telemetry Notifications (3)</span>
                <span className="text-[10px] text-[#006b5f] font-semibold bg-[#6df5e1]/30 px-1.5 py-0.5 rounded">
                  Live Feed
                </span>
              </div>
              <div className="divide-y divide-[#f1f3f9] max-h-64 overflow-y-auto mt-1">
                {notifications.map((n) => (
                  <div key={n.id} className="py-2.5 px-1 hover:bg-[#f8fafc] transition-colors rounded">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#131a33]">{n.title}</span>
                      <span className="text-[10px] text-[#707881]">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-[#3f4850] mt-0.5 leading-snug">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User / Doctor Profile Badge */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#e2e8f0]">
          <img
            alt="Dr. Elena Rostova"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpGTWGYrR_kfGTZPucviCkoL6uiqJpUXaPmWQZemqm9qxoOgy-fMoFg0oYk0jM4e5x_6B4NjjqnoO3EAtzrJG8V4doc9GsfNmJHuKA6l-4fgl9YK2bHyuzA5TUlYwQjivZnOKiw60wtVz6TKT1iX9KMAq8c-Rh5kFX7hzUjz-3f1MK817W2-FoIjwf4E27Haj4EiDLu4pA8tTINlEAQtx5iPyXp5vDWVxS_Yjp0fK7ks2-rRmHEPE8dw"
            className="w-8 h-8 rounded-full object-cover border border-[#93ccff]"
          />
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-bold text-[#131a33] leading-none">Dr. Elena Rostova</span>
            <span className="text-[10px] text-[#006194] font-semibold uppercase tracking-wider mt-0.5">
              Chief Medical Officer
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
