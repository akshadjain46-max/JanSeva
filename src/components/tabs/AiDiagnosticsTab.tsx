import React, { useState } from 'react';
import { BiomarkerFinding, TimelineMilestone } from '../../types';
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileSearch,
  Sparkles,
  Calendar,
  User,
  ShieldCheck,
} from 'lucide-react';

interface AiDiagnosticsTabProps {
  biomarkers: BiomarkerFinding[];
  milestones: TimelineMilestone[];
}

export const AiDiagnosticsTab: React.FC<AiDiagnosticsTabProps> = ({
  biomarkers: initialBiomarkers,
  milestones: initialMilestones,
}) => {
  const [selectedReport, setSelectedReport] = useState('cardiac');
  const [activeMilestone, setActiveMilestone] = useState<TimelineMilestone | null>(
    initialMilestones[3] || null
  );

  const reports = {
    cardiac: {
      title: 'Comprehensive Metabolic & Cardiac Biomarker Panel',
      fidelity: '99.4%',
      findings: initialBiomarkers,
      narrative:
        'Biomarker analysis indicates acute myocardial injury with elevated Troponin-I (0.18 ng/mL) and concomitant hemodynamic strain reflected by elevated BNP (460 pg/mL). Coronary catheterization recommended.',
    },
    stroke: {
      title: 'Multimodal Brain CT Perfusion & Angiogram Ingest',
      fidelity: '98.9%',
      findings: [
        {
          name: 'Core Infarct Volume',
          value: '18 mL (ASPECTS: 8)',
          status: 'Optimal' as const,
          referenceRange: 'Target: <70 mL',
          interpretation: 'Favorable penumbra ratio (mismatch volume: 82 mL)',
          statusColor: 'secondary' as const,
        },
        {
          name: 'Vessel Occlusion',
          value: 'Right MCA (M1 Segment)',
          status: 'Critical' as const,
          referenceRange: 'Patent Vasculature',
          interpretation: 'Large vessel occlusion confirmed, candidate for thrombectomy',
          statusColor: 'error' as const,
        },
        {
          name: 'Intracranial Hemorrhage',
          value: 'None Detected',
          status: 'Optimal' as const,
          referenceRange: 'Negative',
          interpretation: 'Safe for IV thrombolysis administration',
          statusColor: 'secondary' as const,
        },
      ],
      narrative:
        'Cerebral perfusion scan reveals large salvageable penumbra in right MCA distribution. Immediate mechanical thrombectomy protocol authorized.',
    },
    metabolic: {
      title: 'Renal & Comprehensive Metabolic Panel',
      fidelity: '99.7%',
      findings: [
        {
          name: 'Serum Creatinine',
          value: '1.1 mg/dL',
          status: 'Optimal' as const,
          referenceRange: 'Normal: 0.7 - 1.3 mg/dL',
          interpretation: 'Adequate baseline renal clearance for IV contrast',
          statusColor: 'secondary' as const,
        },
        {
          name: 'eGFR',
          value: '78 mL/min/1.73m²',
          status: 'Optimal' as const,
          referenceRange: 'Normal: >60 mL/min',
          interpretation: 'Preserved glomerular filtration rate',
          statusColor: 'secondary' as const,
        },
        {
          name: 'Serum Potassium (K+)',
          value: '4.4 mmol/L',
          status: 'Optimal' as const,
          referenceRange: 'Normal: 3.5 - 5.0 mmol/L',
          interpretation: 'Electrolyte balance normal for antiarrhythmic therapy',
          statusColor: 'secondary' as const,
        },
      ],
      narrative:
        'Metabolic profile demonstrates satisfactory renal and electrolyte baseline without contraindications for standard angiographic interventions.',
    },
  };

  const currentReport = reports[selectedReport as keyof typeof reports];

  return (
    <div className="flex flex-col gap-6">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-['Plus_Jakarta_Sans'] font-extrabold text-xl sm:text-2xl text-[#131a33] tracking-tight">
            AI Diagnostic Report Synthesizer & Patient Timeline
          </h1>
          <p className="text-xs text-[#707881] mt-0.5">
            Automated clinical document parsing, optical biomarker extraction, and longitudinal care tracking
          </p>
        </div>

        {/* Report Selector */}
        <div className="flex items-center gap-1.5 bg-[#f3f3ff] p-1 rounded-xl border border-[#ebedff] text-xs">
          <button
            onClick={() => setSelectedReport('cardiac')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              selectedReport === 'cardiac'
                ? 'bg-[#006194] text-white shadow-xs'
                : 'text-[#3f4850] hover:text-[#131a33]'
            }`}
          >
            Cardiac Panel
          </button>
          <button
            onClick={() => setSelectedReport('stroke')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              selectedReport === 'stroke'
                ? 'bg-[#006194] text-white shadow-xs'
                : 'text-[#3f4850] hover:text-[#131a33]'
            }`}
          >
            Stroke CT
          </button>
          <button
            onClick={() => setSelectedReport('metabolic')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              selectedReport === 'metabolic'
                ? 'bg-[#006194] text-white shadow-xs'
                : 'text-[#3f4850] hover:text-[#131a33]'
            }`}
          >
            Renal / Metabolic
          </button>
        </div>
      </div>

      {/* Main Grid: AI Synthesizer Findings + Longitudinal Trajectory */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Document Ingest & Findings (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-[#f1f3f9] mb-4">
              <div className="flex items-center gap-2">
                <FileSearch className="w-5 h-5 text-[#006194]" />
                <div>
                  <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#131a33]">
                    {currentReport.title}
                  </h2>
                  <span className="text-[10px] text-[#707881]">
                    Patient: Marcus Vance (MRN: #99402) · Metro West Cath Lab
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#6df5e1]/40 text-[#006f64] text-[10px] font-bold">
                Parsed: {currentReport.fidelity} Fidelity
              </span>
            </div>

            {/* Synthesized Biomarker Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              {currentReport.findings.map((finding, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#f3f3ff] border border-[#ebedff] flex flex-col justify-between"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#707881]">
                    {finding.name}
                  </span>
                  <div className="my-1.5 flex items-baseline justify-between">
                    <span
                      className={`text-sm font-bold tabular-nums ${
                        finding.statusColor === 'error'
                          ? 'text-[#ba1a1a]'
                          : finding.statusColor === 'warning'
                          ? 'text-[#131a33]'
                          : 'text-[#006194]'
                      }`}
                    >
                      {finding.value}
                    </span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                        finding.statusColor === 'error'
                          ? 'bg-[#ba1a1a] text-white'
                          : 'bg-[#e3e7ff] text-[#3f4850]'
                      }`}
                    >
                      {finding.status}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#707881]">{finding.referenceRange}</span>
                  <p className="text-[10px] text-[#3f4850] mt-1 pt-1 border-t border-black/5 leading-snug">
                    {finding.interpretation}
                  </p>
                </div>
              ))}
            </div>

            {/* AI Clinical Summary Narrative */}
            <div className="p-3.5 rounded-xl bg-[#cce5ff]/20 border border-[#93ccff]/40 text-xs text-[#131a33] leading-relaxed">
              <strong className="block text-[#006194] font-semibold mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#006194]" />
                <span>AI Clinical Synthesis:</span>
              </strong>
              {currentReport.narrative}
            </div>
          </div>
        </div>

        {/* Right: Patient Profile & Milestone Details (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col">
            <div className="flex items-center gap-3 pb-3 border-b border-[#f1f3f9] mb-3">
              <img
                alt="Patient Avatar"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces"
                className="w-12 h-12 rounded-xl object-cover border border-[#e2e8f0]"
              />
              <div>
                <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#131a33]">
                  Marcus Vance (54y, Male)
                </h3>
                <span className="text-[11px] text-[#707881]">
                  MRN: #MV-2918 · Blood Group: O Positive
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#f3f3ff]">
                <span className="text-[#707881]">Primary Diagnosis:</span>
                <strong className="text-[#131a33]">Acute STEMI / Anterior Wall</strong>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#f3f3ff]">
                <span className="text-[#707881]">Attending Physician:</span>
                <strong className="text-[#006194]">Dr. Elena Rostova (CMO)</strong>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#f3f3ff]">
                <span className="text-[#707881]">Allergies:</span>
                <strong className="text-[#ba1a1a]">Penicillin (Mild urticaria)</strong>
              </div>
            </div>

            {/* Selected Milestone Detail */}
            {activeMilestone && (
              <div className="mt-4 p-3.5 rounded-xl bg-[#ebedff] border border-[#dbe1ff] flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#006194]">
                    Selected Milestone ({activeMilestone.date})
                  </span>
                  <span className="text-[10px] font-semibold text-[#006b5f]">
                    {activeMilestone.doctor}
                  </span>
                </div>
                <h4 className="font-bold text-xs text-[#131a33]">{activeMilestone.title}</h4>
                <p className="text-xs text-[#3f4850]">{activeMilestone.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Full Horizontal Interactive Timeline */}
      <div className="p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col">
        <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#131a33] mb-4">
          Longitudinal Clinical Trajectory Roadmap
        </h3>

        <div className="relative flex items-center justify-between w-full px-6 py-4 bg-[#f3f3ff]/60 border border-[#ebedff] rounded-2xl overflow-x-auto">
          {/* Timeline Bar */}
          <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-0.5 bg-[#dbe1ff] z-0" />

          {initialMilestones.map((m) => {
            const isSelected = activeMilestone?.id === m.id;
            const isActive = m.status === 'active';
            const isDone = m.status === 'completed';

            return (
              <button
                key={m.id}
                onClick={() => setActiveMilestone(m)}
                className={`relative z-10 flex flex-col items-center text-center px-3 py-1 rounded-xl transition-all ${
                  isSelected ? 'bg-white shadow-sm ring-2 ring-[#006194]' : 'hover:bg-white/50'
                }`}
              >
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-transform ${
                    isActive
                      ? 'bg-[#ba1a1a] text-white animate-pulse scale-110'
                      : isDone
                      ? 'bg-[#006194] text-white'
                      : 'bg-[#e3e7ff] text-[#707881]'
                  }`}
                >
                  {isActive ? (
                    <span className="material-symbols-outlined text-[16px]">priority_high</span>
                  ) : isDone ? (
                    <span className="material-symbols-outlined text-[15px]">check</span>
                  ) : (
                    <span className="material-symbols-outlined text-[15px]">update</span>
                  )}
                </div>
                <span
                  className={`text-[11px] font-bold mt-2 ${
                    isActive ? 'text-[#ba1a1a]' : 'text-[#131a33]'
                  }`}
                >
                  {m.date}
                </span>
                <span className="text-[10px] text-[#707881] font-medium">{m.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
