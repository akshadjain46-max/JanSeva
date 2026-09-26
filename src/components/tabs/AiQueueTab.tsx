import React, { useState } from 'react';
import { PatientToken, Hospital } from '../../types';
import {
  Clock,
  User,
  CheckCircle2,
  AlertCircle,
  QrCode,
  Smartphone,
  Plus,
  Play,
  Check,
  ChevronRight,
  Filter,
} from 'lucide-react';

interface AiQueueTabProps {
  tokens: PatientToken[];
  hospitals: Hospital[];
  onOpenTokenModal: (hospitalName: string, department: string) => void;
}

export const AiQueueTab: React.FC<AiQueueTabProps> = ({
  tokens: initialTokens,
  hospitals,
  onOpenTokenModal,
}) => {
  const [tokens, setTokens] = useState<PatientToken[]>(initialTokens);
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [hospital, setHospital] = useState(hospitals[0]?.name || 'Metro West Central');
  const [department, setDepartment] = useState('Cardiology');
  const [priority, setPriority] = useState<'Normal' | 'Senior' | 'Pediatric' | 'Urgent'>('Normal');
  const [symptoms, setSymptoms] = useState('');
  const [createdPass, setCreatedPass] = useState<PatientToken | null>(null);

  const handleCreateToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) return;

    const randomNum = Math.floor(413 + Math.random() * 80);
    const newToken: PatientToken = {
      id: `tk-${randomNum}`,
      tokenCode: `#TK-${randomNum}`,
      patientName: patientName.trim(),
      age: Number(age) || 35,
      gender,
      hospitalName: hospital,
      department,
      consultationRoom: 'Room 3B',
      doctorName: 'Dr. Elena Rostova',
      status: 'waiting',
      estimatedCallTime: '12:15 PM',
      queuePosition: tokens.length,
      symptoms: symptoms || 'Routine Consultation',
      priorityLevel: priority,
    };

    setTokens([...tokens, newToken]);
    setCreatedPass(newToken);
    setPatientName('');
    setAge('');
    setSymptoms('');
  };

  const handleCallNext = () => {
    const waitingIdx = tokens.findIndex((t) => t.status === 'waiting');
    if (waitingIdx !== -1) {
      const updated = tokens.map((t, idx) => {
        if (t.status === 'in-consultation') return { ...t, status: 'completed' as const };
        if (idx === waitingIdx) return { ...t, status: 'in-consultation' as const };
        return t;
      });
      setTokens(updated);
    }
  };

  const handleCompleteCurrent = (id: string) => {
    setTokens(
      tokens.map((t) => (t.id === id ? { ...t, status: 'completed' as const } : t))
    );
  };

  const currentPatient = tokens.find((t) => t.status === 'in-consultation');
  const waitingPatients = tokens.filter((t) => t.status === 'waiting');

  return (
    <div className="flex flex-col gap-6">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-['Plus_Jakarta_Sans'] font-extrabold text-xl sm:text-2xl text-[#131a33] tracking-tight">
            AI Queue & Live Token Management
          </h1>
          <p className="text-xs text-[#707881] mt-0.5">
            Algorithmic patient dispatch with dynamic wait calibration and SMS turn alerts
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCallNext}
            className="px-4 py-2 rounded-xl bg-[#006194] hover:bg-[#007bb9] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Call Next Patient</span>
          </button>
        </div>
      </div>

      {createdPass && (
        <div className="p-4 rounded-xl bg-[#6df5e1]/30 border border-[#006b5f]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[#006b5f] text-white flex items-center justify-center font-bold">
              ✓
            </div>
            <div>
              <span className="text-xs font-bold text-[#00201c] block">
                Digital Token Issued: {createdPass.tokenCode} for {createdPass.patientName}
              </span>
              <span className="text-[11px] text-[#005048]">
                {createdPass.hospitalName} · {createdPass.department} · Est. Call: {createdPass.estimatedCallTime}
              </span>
            </div>
          </div>
          <button
            onClick={() => onOpenTokenModal(createdPass.hospitalName, createdPass.department)}
            className="px-3 py-1.5 rounded-lg bg-[#006b5f] text-white text-xs font-bold hover:bg-[#005048] transition-colors"
          >
            View QR Pass
          </button>
        </div>
      )}

      {/* Main Grid: Create Token Form + Active Queue Board */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Instant Token Generator (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#f1f3f9]">
              <div className="h-8 w-8 rounded-lg bg-[#cce5ff] text-[#006194] flex items-center justify-center">
                <Plus className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#131a33]">
                  Issue New Digital Token
                </h2>
                <span className="text-[10px] text-[#707881]">
                  Instantly book verified slot into live waiting line
                </span>
              </div>
            </div>

            <form onSubmit={handleCreateToken} className="flex flex-col gap-3">
              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-[#707881] uppercase tracking-wider mb-1">
                  Patient Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#f3f3ff] text-xs text-[#131a33] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-[#707881] uppercase tracking-wider mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    placeholder="35"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-[#f3f3ff] text-xs text-[#131a33] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-[#707881] uppercase tracking-wider mb-1">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-[#f3f3ff] text-xs text-[#131a33] focus:outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-[#707881] uppercase tracking-wider mb-1">
                  Target Facility
                </label>
                <select
                  value={hospital}
                  onChange={(e) => setHospital(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#f3f3ff] text-xs text-[#131a33] focus:outline-none"
                >
                  {hospitals.map((h) => (
                    <option key={h.id} value={h.name}>
                      {h.name} ({h.travelTimeMins}m away)
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-[#707881] uppercase tracking-wider mb-1">
                    Department
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-[#f3f3ff] text-xs text-[#131a33] focus:outline-none"
                  >
                    <option value="Cardiology">Cardiology</option>
                    <option value="Level 1 Trauma">Trauma / ER</option>
                    <option value="General Surgery">General Surgery</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Neurology">Neurology</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-[#707881] uppercase tracking-wider mb-1">
                    Priority Level
                  </label>
                  <select
                    value={priority}
                    onChange={(e) =>
                      setPriority(e.target.value as 'Normal' | 'Senior' | 'Pediatric' | 'Urgent')
                    }
                    className="px-3 py-2 rounded-xl bg-[#f3f3ff] text-xs text-[#131a33] focus:outline-none"
                  >
                    <option value="Normal">Normal</option>
                    <option value="Senior">Senior Citizen</option>
                    <option value="Pediatric">Pediatric</option>
                    <option value="Urgent">Urgent Review</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-[#707881] uppercase tracking-wider mb-1">
                  Primary Symptoms / Reason
                </label>
                <input
                  type="text"
                  placeholder="e.g. Chest tightness, follow-up, ECG review"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#f3f3ff] text-xs text-[#131a33] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                />
              </div>

              <button
                type="submit"
                className="mt-2 py-2.5 rounded-xl bg-[#006194] hover:bg-[#007bb9] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">qr_code_2</span>
                <span>Generate Verified Token</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Board: Live Queue Stream (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Active In-Consultation Patient Banner */}
          {currentPatient ? (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-[#006194] to-[#007bb9] text-white shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-mono text-xl font-extrabold text-white border border-white/20">
                  {currentPatient.tokenCode}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#6df5e1] text-[#00201c]">
                      Now Inside Consultation
                    </span>
                    <span className="text-xs text-white/80">{currentPatient.consultationRoom}</span>
                  </div>
                  <h3 className="font-['Plus_Jakarta_Sans'] font-extrabold text-lg text-white mt-1">
                    {currentPatient.patientName} ({currentPatient.age}y, {currentPatient.gender})
                  </h3>
                  <p className="text-xs text-white/90">
                    {currentPatient.symptoms} · Attending: {currentPatient.doctorName}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleCompleteCurrent(currentPatient.id)}
                className="px-4 py-2 rounded-xl bg-white hover:bg-[#f3f3ff] text-[#006194] text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 shrink-0"
              >
                <Check className="w-4 h-4 text-[#006194]" />
                <span>Mark Completed</span>
              </button>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-[#ebedff] text-xs text-[#006194] font-medium text-center">
              No patient currently called. Click "Call Next Patient" to advance stream.
            </div>
          )}

          {/* Queue Stream List */}
          <div className="p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-[#f1f3f9] mb-3">
              <div>
                <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#131a33]">
                  Up Next in Queue ({waitingPatients.length} Waiting)
                </h3>
                <span className="text-[11px] text-[#707881]">
                  Average consultation turnaround: 12.4 minutes
                </span>
              </div>
              <span className="text-xs font-bold text-[#006b5f] bg-[#6df5e1]/30 px-2 py-0.5 rounded">
                Live Calibrated
              </span>
            </div>

            <div className="divide-y divide-[#f1f3f9]">
              {waitingPatients.map((patient, idx) => (
                <div
                  key={patient.id}
                  className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#faf8ff] px-2 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-[#f3f3ff] text-[#006194] border border-[#ebedff] flex items-center justify-center font-mono font-bold text-xs">
                      #{idx + 1}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-[#131a33]">
                          {patient.tokenCode}
                        </span>
                        <span className="text-xs font-semibold text-[#131a33]">
                          {patient.patientName}
                        </span>
                        <span
                          className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                            patient.priorityLevel === 'Urgent'
                              ? 'bg-[#ffdad6] text-[#ba1a1a]'
                              : patient.priorityLevel === 'Senior'
                              ? 'bg-[#cce5ff] text-[#004b73]'
                              : 'bg-[#e3e7ff] text-[#3f4850]'
                          }`}
                        >
                          {patient.priorityLevel}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#707881]">
                        {patient.hospitalName} · {patient.department} · {patient.symptoms}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <span className="text-[10px] text-[#707881] block">Est. Call Time</span>
                      <strong className="text-xs font-mono text-[#006194]">
                        {patient.estimatedCallTime}
                      </strong>
                    </div>

                    <button
                      onClick={() => onOpenTokenModal(patient.hospitalName, patient.department)}
                      className="p-1.5 rounded-lg bg-[#f3f3ff] hover:bg-[#ebedff] text-[#006194] transition-colors"
                      title="View Digital Pass"
                    >
                      <QrCode className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {waitingPatients.length === 0 && (
                <div className="py-8 text-center text-xs text-[#707881]">
                  Queue is clear. All patients have been attended to.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
