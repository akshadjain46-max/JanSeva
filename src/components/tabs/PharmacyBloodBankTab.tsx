import React, { useState } from 'react';
import { MedicineItem, BloodStock } from '../../types';
import {
  Droplet,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Plus,
  Send,
  Radio,
  FileSpreadsheet,
} from 'lucide-react';

interface PharmacyBloodBankTabProps {
  medicines: MedicineItem[];
  bloodStocks: BloodStock[];
  onRequestCrossMatch: () => void;
}

export const PharmacyBloodBankTab: React.FC<PharmacyBloodBankTabProps> = ({
  medicines: initialMedicines,
  bloodStocks: initialBloodStocks,
  onRequestCrossMatch,
}) => {
  const [medicines, setMedicines] = useState<MedicineItem[]>(initialMedicines);
  const [bloodStocks, setBloodStocks] = useState<BloodStock[]>(initialBloodStocks);
  const [donorAppealSent, setDonorAppealSent] = useState(false);
  const [crossmatchSuccess, setCrossmatchSuccess] = useState<string | null>(null);

  const [patientId, setPatientId] = useState('PT-88402 (Marcus Vance)');
  const [requiredBloodType, setRequiredBloodType] = useState('O NEG');
  const [unitsRequested, setUnitsRequested] = useState(2);

  const handleRestockMedicine = (id: string) => {
    setMedicines((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          return {
            ...m,
            currentStock: m.currentStock + 50,
            status: 'optimal' as const,
            depletionForecastHours: 240,
            autoReordered: true,
          };
        }
        return m;
      })
    );
  };

  const handleTriggerCrossmatch = (e: React.FormEvent) => {
    e.preventDefault();
    setCrossmatchSuccess(
      `STAT Crossmatch Confirmed: ${unitsRequested} Units of ${requiredBloodType} reserved for ${patientId}. Lab dispatch ticket #CM-901 issued.`
    );
    setTimeout(() => setCrossmatchSuccess(null), 5000);
  };

  const handleTriggerDonorAppeal = () => {
    setDonorAppealSent(true);
    setTimeout(() => setDonorAppealSent(false), 6000);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-['Plus_Jakarta_Sans'] font-extrabold text-xl sm:text-2xl text-[#131a33] tracking-tight">
            Smart Pharmacy & Emergency Blood Bank
          </h1>
          <p className="text-xs text-[#707881] mt-0.5">
            Predictive pharmaceutical depletion tracking and life-critical regional blood bank reserves
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleTriggerDonorAppeal}
            className="px-3.5 py-2 rounded-xl bg-[#ba1a1a] hover:bg-[#93000a] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Broadcast Donor Drive</span>
          </button>
        </div>
      </div>

      {donorAppealSent && (
        <div className="p-3.5 rounded-xl bg-[#ffdad6] border border-[#ba1a1a] text-xs text-[#ba1a1a] flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 animate-pulse" />
            <span>
              <strong>Regional Donor Drive Broadcasted:</strong> Urgent appeal for O-Negative & Universal Plasma dispatched to 4,200 registered donors via SMS & Municipal Health App.
            </span>
          </div>
          <button onClick={() => setDonorAppealSent(false)} className="font-bold">
            ✕
          </button>
        </div>
      )}

      {crossmatchSuccess && (
        <div className="p-3.5 rounded-xl bg-[#6df5e1]/30 border border-[#006b5f]/40 text-xs text-[#00201c] flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#006b5f]" />
            <span>{crossmatchSuccess}</span>
          </div>
          <button onClick={() => setCrossmatchSuccess(null)} className="font-bold text-[#006b5f]">
            ✕
          </button>
        </div>
      )}

      {/* Main Grid: Blood Bank Hub + Smart Medicine Inventory */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Blood Bank Reserves & Crossmatch (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-[#f1f3f9] mb-4">
              <div className="flex items-center gap-2">
                <Droplet className="w-5 h-5 text-[#ba1a1a]" />
                <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#131a33]">
                  Emergency Blood Bank Reserve Matrix
                </h2>
              </div>
              <span className="text-[10px] font-bold text-[#006b5f] bg-[#6df5e1]/30 px-2 py-0.5 rounded">
                Live Serology Vault
              </span>
            </div>

            {/* Blood Type Grid */}
            <div className="grid grid-cols-4 gap-2.5 mb-5">
              {bloodStocks.map((b) => {
                const isCrit = b.status === 'Critical' || b.status === 'Low';
                return (
                  <div
                    key={b.type}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                      isCrit
                        ? 'bg-[#ffdad6]/40 border-[#ffdad6]'
                        : 'bg-[#f3f3ff] border-[#ebedff]'
                    }`}
                  >
                    <span
                      className={`text-xs font-bold ${
                        isCrit ? 'text-[#ba1a1a]' : 'text-[#131a33]'
                      }`}
                    >
                      {b.type}
                    </span>
                    <span className="font-mono text-lg font-extrabold text-[#131a33] my-0.5 tabular-nums">
                      {b.units} <span className="text-[10px] font-normal text-[#707881]">Units</span>
                    </span>
                    <span
                      className={`text-[9px] font-bold uppercase ${
                        isCrit ? 'text-[#ba1a1a]' : 'text-[#006b5f]'
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Stat Crossmatch Form */}
            <div className="p-4 rounded-xl bg-[#f3f3ff] border border-[#ebedff] flex flex-col">
              <span className="text-xs font-bold text-[#131a33] mb-2 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#ba1a1a]">bloodtype</span>
                <span>Direct STAT Crossmatch Dispatch</span>
              </span>

              <form onSubmit={handleTriggerCrossmatch} className="flex flex-col gap-2.5">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-[#707881] uppercase tracking-wider mb-0.5">
                      Target Blood Group
                    </label>
                    <select
                      value={requiredBloodType}
                      onChange={(e) => setRequiredBloodType(e.target.value)}
                      className="px-2.5 py-1.5 rounded-lg bg-white text-xs text-[#131a33] font-semibold border border-[#e2e8f0] focus:outline-none"
                    >
                      {bloodStocks.map((b) => (
                        <option key={b.type} value={b.type}>
                          {b.type} ({b.units} U available)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-[#707881] uppercase tracking-wider mb-0.5">
                      Units Required
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={unitsRequested}
                      onChange={(e) => setUnitsRequested(Number(e.target.value))}
                      className="px-2.5 py-1.5 rounded-lg bg-white text-xs text-[#131a33] font-mono font-bold border border-[#e2e8f0] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-[#707881] uppercase tracking-wider mb-0.5">
                    Patient Reference / Hospital Bay
                  </label>
                  <input
                    type="text"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                    className="px-2.5 py-1.5 rounded-lg bg-white text-xs text-[#131a33] border border-[#e2e8f0] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-1 py-2 rounded-lg bg-[#ba1a1a] hover:bg-[#93000a] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Execute STAT Crossmatch</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Right: Smart Medicine Stock Inventory (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col h-full">
            <div className="flex items-center justify-between pb-3 border-b border-[#f1f3f9] mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006b5f] text-[20px]">
                  medication
                </span>
                <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#131a33]">
                  Smart Medicine Stock & Depletion Forecast
                </h2>
              </div>
              <span className="text-[10px] font-bold text-[#006194] bg-[#cce5ff] px-2 py-0.5 rounded">
                AI Auto-Reorder
              </span>
            </div>

            <div className="divide-y divide-[#f1f3f9] flex-1">
              {medicines.map((med) => {
                const isCrit = med.status === 'critical';

                return (
                  <div
                    key={med.id}
                    className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#faf8ff] px-2 rounded-lg transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#131a33]">{med.name}</span>
                        <span
                          className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                            isCrit ? 'bg-[#ffdad6] text-[#ba1a1a]' : 'bg-[#e3e7ff] text-[#3f4850]'
                          }`}
                        >
                          {med.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-[#707881] mt-0.5">
                        <span>Batch: {med.batchNumber}</span>
                        <span>·</span>
                        <span>Exp: {med.daysToExpiry} days</span>
                        <span>·</span>
                        <span>Min Threshold: {med.minThreshold}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <span
                          className={`text-xs font-mono font-bold tabular-nums block ${
                            isCrit ? 'text-[#ba1a1a]' : 'text-[#006b5f]'
                          }`}
                        >
                          {med.currentStock} {med.stockUnit}
                        </span>
                        <span className="text-[9px] text-[#707881]">
                          Depletes in ~{med.depletionForecastHours}h
                        </span>
                      </div>

                      <button
                        onClick={() => handleRestockMedicine(med.id)}
                        className={`px-2.5 py-1 rounded text-xs font-bold transition-colors ${
                          isCrit
                            ? 'bg-[#ba1a1a] text-white hover:bg-[#93000a]'
                            : 'bg-[#f3f3ff] text-[#006194] hover:bg-[#ebedff]'
                        }`}
                      >
                        Restock
                      </button>
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
