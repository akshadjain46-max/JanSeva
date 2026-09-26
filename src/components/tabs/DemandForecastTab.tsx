import React, { useState } from 'react';
import { AmbulanceTelemetry } from '../../types';
import {
  TrendingUp,
  Users,
  CheckCircle2,
  AlertTriangle,
  Brain,
  Ambulance,
  Calendar,
  Send,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface DemandForecastTabProps {
  ambulances: AmbulanceTelemetry[];
}

export const DemandForecastTab: React.FC<DemandForecastTabProps> = ({ ambulances }) => {
  const [prescriptions, setPrescriptions] = useState([
    {
      id: 'p1',
      action: 'Deploy +2 Triage Nurses to St. Jude ER for 18:00-22:00 shift.',
      facility: 'St. Jude Medical Center',
      impact: 'Mitigates 62m peak ER wait bottleneck down to ~28m',
      status: 'pending',
    },
    {
      id: 'p2',
      action: 'Pre-activate Secondary Cath Lab team at Metro West for 10:00-14:00.',
      facility: 'Metro West Central',
      impact: 'Accommodates predicted +34% coronary referral surge',
      status: 'pending',
    },
    {
      id: 'p3',
      action: 'Pre-position 8 Units O-Negative Blood at St. Jude Trauma Center.',
      facility: 'Regional Blood Bank Hub',
      impact: 'Eliminates transit lag for anticipated highway trauma cases',
      status: 'approved',
    },
  ]);

  const [notificationDispatched, setNotificationDispatched] = useState<string | null>(null);

  const handleApprovePrescription = (id: string, actionText: string) => {
    setPrescriptions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'approved' } : p))
    );
    setNotificationDispatched(`Prescriptive action approved: "${actionText}" dispatched to shift supervisor.`);
    setTimeout(() => setNotificationDispatched(null), 4000);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-['Plus_Jakarta_Sans'] font-extrabold text-xl sm:text-2xl text-[#131a33] tracking-tight">
            Demand & Neural Forecast Command
          </h1>
          <p className="text-xs text-[#707881] mt-0.5">
            Predictive machine-learning patient surge modeling and algorithmic staffing interventions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#ffdad6] text-[#ba1a1a] flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#ba1a1a] animate-ping" />
            <span>Tomorrow: +34% OPD Surge Predicted</span>
          </span>
        </div>
      </div>

      {notificationDispatched && (
        <div className="p-3.5 bg-[#6df5e1]/30 border border-[#006b5f]/40 rounded-xl text-xs text-[#00201c] flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#006b5f]" />
            <span>{notificationDispatched}</span>
          </div>
          <button onClick={() => setNotificationDispatched(null)} className="font-bold text-xs text-[#006b5f]">
            ✕
          </button>
        </div>
      )}

      {/* Forecast Metric Bento Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col justify-between">
          <span className="text-[11px] font-bold uppercase text-[#707881]">Tomorrow Inflow</span>
          <div className="my-2 flex items-baseline justify-between">
            <span className="font-['Plus_Jakarta_Sans'] text-3xl font-extrabold text-[#006194] tabular-nums">
              +34%
            </span>
            <span className="text-xs font-bold text-[#ba1a1a]">Surge Alert</span>
          </div>
          <span className="text-xs text-[#707881]">840 projected patient visits</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col justify-between">
          <span className="text-[11px] font-bold uppercase text-[#707881]">Peak Specialty</span>
          <div className="my-2 flex items-baseline justify-between">
            <span className="font-['Plus_Jakarta_Sans'] text-2xl font-extrabold text-[#131a33]">
              Ortho & Pulm
            </span>
            <span className="text-xs font-semibold text-[#006b5f]">+42% load</span>
          </div>
          <span className="text-xs text-[#707881]">Weather / Seasonal air quality driver</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col justify-between">
          <span className="text-[11px] font-bold uppercase text-[#707881]">Peak Hour Window</span>
          <div className="my-2 flex items-baseline justify-between">
            <span className="font-['Plus_Jakarta_Sans'] text-2xl font-extrabold text-[#ba1a1a] tabular-nums">
              10:00 - 12:30
            </span>
            <span className="text-xs font-semibold text-[#ba1a1a]">OPD Clustered</span>
          </div>
          <span className="text-xs text-[#707881]">Secondary spike at 18:00 (ER Influx)</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col justify-between">
          <span className="text-[11px] font-bold uppercase text-[#707881]">Model Confidence</span>
          <div className="my-2 flex items-baseline justify-between">
            <span className="font-['Plus_Jakarta_Sans'] text-3xl font-extrabold text-[#006b5f] tabular-nums">
              96.8%
            </span>
            <span className="text-xs text-[#006b5f]">High Fidelity</span>
          </div>
          <span className="text-xs text-[#707881]">Trained on 36-month regional telemetry</span>
        </div>
      </div>

      {/* Prescriptive Interventions & Ambulance Fleet */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Prescriptive AI Staffing Actions (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-[#f1f3f9] mb-4">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-[#006194]" />
                <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#131a33]">
                  AI Prescriptive Staffing & Allocation Actions
                </h2>
              </div>
              <span className="text-[10px] font-bold text-[#006b5f] bg-[#6df5e1]/30 px-2 py-0.5 rounded">
                Real-Time Rebalancer
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {prescriptions.map((p) => {
                const isApproved = p.status === 'approved';
                return (
                  <div
                    key={p.id}
                    className="p-4 rounded-xl bg-[#f3f3ff] border border-[#ebedff] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#131a33]">{p.facility}</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                            isApproved
                              ? 'bg-[#6df5e1]/40 text-[#006f64]'
                              : 'bg-[#ffdad6] text-[#ba1a1a]'
                          }`}
                        >
                          {isApproved ? 'Approved & Dispatched' : 'Action Required'}
                        </span>
                      </div>
                      <p className="text-xs text-[#131a33] font-semibold mt-1">{p.action}</p>
                      <span className="text-[11px] text-[#006b5f] font-medium block mt-0.5">
                        Impact: {p.impact}
                      </span>
                    </div>

                    <div className="shrink-0">
                      {isApproved ? (
                        <div className="flex items-center gap-1 text-xs text-[#006b5f] font-bold">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Active</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleApprovePrescription(p.id, p.action)}
                          className="px-3.5 py-1.5 rounded-lg bg-[#006194] text-white text-xs font-bold hover:bg-[#007bb9] transition-colors shadow-xs"
                        >
                          Approve Action
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Active Ambulance Fleet Telemetry (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col h-full">
            <div className="flex items-center justify-between pb-3 border-b border-[#f1f3f9] mb-4">
              <div className="flex items-center gap-2">
                <Ambulance className="w-5 h-5 text-[#ba1a1a]" />
                <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#131a33]">
                  Ambulance Fleet Intercept Telemetry
                </h2>
              </div>
              <span className="text-[10px] font-bold text-[#131a33] bg-[#f3f3ff] px-2 py-0.5 rounded">
                4 Active Transits
              </span>
            </div>

            <div className="flex flex-col gap-2.5 flex-1">
              {ambulances.map((amb) => {
                const isRerouted = amb.status === 'Rerouted';
                return (
                  <div
                    key={amb.id}
                    className="p-3 rounded-xl bg-[#f3f3ff] border border-[#ebedff] flex flex-col gap-1"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[#ba1a1a] text-[18px]">
                          ambulance
                        </span>
                        <span className="text-xs font-bold text-[#131a33]">{amb.callsign}</span>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                          isRerouted
                            ? 'bg-[#6df5e1]/40 text-[#006f64]'
                            : 'bg-[#ebedff] text-[#006194]'
                        }`}
                      >
                        {amb.status} (ETA {amb.etaMins}m)
                      </span>
                    </div>

                    <div className="text-[11px] text-[#3f4850] mt-0.5">
                      <span>Condition: <strong>{amb.condition}</strong></span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-[#707881] pt-1 border-t border-black/5">
                      <span>Origin: {amb.origin}</span>
                      <span className="text-[#006194] font-semibold">
                        Dest: {amb.divertedTo}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
