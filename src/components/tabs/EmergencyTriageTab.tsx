import React, { useState } from 'react';
import {
  ShieldAlert,
  Activity,
  HeartPulse,
  Flame,
  CheckCircle2,
  AlertTriangle,
  Send,
  Zap,
  Radio,
  FileCheck,
} from 'lucide-react';
import { Hospital } from '../../types';

interface EmergencyTriageTabProps {
  hospitals: Hospital[];
  onOpenTokenModal: (hospitalName: string, department: string) => void;
}

export const EmergencyTriageTab: React.FC<EmergencyTriageTabProps> = ({
  hospitals,
  onOpenTokenModal,
}) => {
  const [hr, setHr] = useState(132);
  const [bp, setBp] = useState('84/52');
  const [spo2, setSpo2] = useState(88);
  const [gcs, setGcs] = useState(11);
  const [temp, setTemp] = useState(38.2);
  const [rr, setRr] = useState(28);
  const [pain, setPain] = useState(9);
  const [complaint, setComplaint] = useState(
    'Acute crushing retrosternal chest pain radiating to left arm with diaphoresis & syncope'
  );

  const [triageResult, setTriageResult] = useState({
    esiLevel: 1,
    levelName: 'ESI LEVEL 1: RESUSCITATION',
    confidence: '99.4%',
    badgeColor: 'bg-[#ba1a1a] text-white',
    assessment:
      'Immediate hemodynamic compromise detected. Severe hypotension + hypoxia with acute coronary syndrome / ST elevation risk.',
    facility: 'Metro West Central',
    bay: 'Cath Lab Bay 02 Allocated',
    protocol: 'ACC/AHA STEMI Rapid Reperfusion Protocol',
    signOff: 'Dr. Elena Rostova',
    actionRequired: 'Immediate Cath Lab Activation & Interventional Cardiologist on Standby',
  });

  const [dispatched, setDispatched] = useState(false);
  const [signedOff, setSignedOff] = useState(false);

  const handleApplyPreset = (type: string) => {
    if (type === 'stemi') {
      setHr(132);
      setBp('84/52');
      setSpo2(88);
      setGcs(11);
      setTemp(37.1);
      setRr(26);
      setPain(9);
      setComplaint('Acute crushing retrosternal chest pain radiating to left arm with diaphoresis');
      calculateTriage(132, 88, 11, 'stemi');
    } else if (type === 'stroke') {
      setHr(98);
      setBp('188/104');
      setSpo2(95);
      setGcs(12);
      setTemp(36.8);
      setRr(18);
      setPain(4);
      setComplaint('Sudden onset right-sided hemiparesis, facial droop, and expressive aphasia (onset 35m)');
      calculateTriage(98, 95, 12, 'stroke');
    } else if (type === 'trauma') {
      setHr(144);
      setBp('78/40');
      setSpo2(89);
      setGcs(9);
      setTemp(35.9);
      setRr(32);
      setPain(10);
      setComplaint('High-velocity motor vehicle accident with pelvic instability & abdominal guarding');
      calculateTriage(144, 89, 9, 'trauma');
    } else if (type === 'copd') {
      setHr(118);
      setBp('135/85');
      setSpo2(84);
      setGcs(14);
      setTemp(37.8);
      setRr(34);
      setPain(6);
      setComplaint('Severe respiratory distress, wheezing, unable to speak in full sentences');
      calculateTriage(118, 84, 14, 'copd');
    } else {
      // Normal / Moderate
      setHr(82);
      setBp('120/78');
      setSpo2(98);
      setGcs(15);
      setTemp(38.0);
      setRr(16);
      setPain(3);
      setComplaint('Low-grade fever with mild productive cough for 3 days');
      calculateTriage(82, 98, 15, 'stable');
    }
  };

  const calculateTriage = (
    cHr: number,
    cSpo2: number,
    cGcs: number,
    presetHint?: string
  ) => {
    setSignedOff(false);
    setDispatched(false);

    if (cSpo2 < 90 || cHr > 130 || cGcs < 11 || presetHint === 'stemi' || presetHint === 'trauma') {
      setTriageResult({
        esiLevel: 1,
        levelName: 'ESI LEVEL 1: RESUSCITATION',
        confidence: '99.4%',
        badgeColor: 'bg-[#ba1a1a] text-white',
        assessment:
          'Critical life threat detected. Hemodynamic instability / severe respiratory insufficiency. Immediate intervention mandated.',
        facility: presetHint === 'trauma' ? 'St. Jude Medical Center' : 'Metro West Central',
        bay: presetHint === 'trauma' ? 'Trauma Resus Bay 1' : 'Cath Lab Bay 02 Ready',
        protocol:
          presetHint === 'trauma'
            ? 'Massive Transfusion Protocol & Surgical Trauma Call'
            : 'ACC/AHA STEMI Rapid Track (Door-to-Balloon <60m)',
        signOff: 'Dr. Elena Rostova',
        actionRequired: 'Mobilize Resuscitation Team & Blood Bank crossmatch',
      });
    } else if (cSpo2 < 94 || cHr > 110 || cGcs < 14 || presetHint === 'stroke' || presetHint === 'copd') {
      setTriageResult({
        esiLevel: 2,
        levelName: 'ESI LEVEL 2: EMERGENT',
        confidence: '97.2%',
        badgeColor: 'bg-[#ffdad6] text-[#ba1a1a]',
        assessment:
          'High acuity clinical condition. Potential for rapid clinical deterioration. Dedicated bedside nursing required within 10 minutes.',
        facility: 'Metro West Central',
        bay: 'Emergency Bay 03 Monitored',
        protocol:
          presetHint === 'stroke'
            ? 'Acute Stroke Protocol / Non-Contrast Head CT Stat'
            : 'High-Flow BiPAP / Bronchodilator Protocol',
        signOff: 'Dr. Elena Rostova',
        actionRequired: 'Initiate continuous cardiac & pulse oximetry monitoring',
      });
    } else {
      setTriageResult({
        esiLevel: 3,
        levelName: 'ESI LEVEL 3: URGENT / STABLE',
        confidence: '95.1%',
        badgeColor: 'bg-[#ebedff] text-[#006194]',
        assessment:
          'Vital parameters stable. Requires diagnostic evaluation (labs / radiology) without acute hemodynamic compromise.',
        facility: 'Memorial Grace Pavilion',
        bay: 'General OPD Evaluation Room',
        protocol: 'Standard Clinical Evaluation & Observation',
        signOff: 'Attending Physician',
        actionRequired: 'Routine lab draw & physician examination within 30 minutes',
      });
    }
  };

  const handleDispatchStat = () => {
    setDispatched(true);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center shrink-0">
            <ShieldAlert className="w-6 h-6 text-[#ba1a1a]" />
          </div>
          <div>
            <h1 className="font-['Plus_Jakarta_Sans'] font-extrabold text-xl sm:text-2xl text-[#ba1a1a] tracking-tight">
              Emergency Clinical AI Triage Command
            </h1>
            <p className="text-xs text-[#707881] mt-0.5">
              Mission-critical ESI acuity prediction algorithm with automated bed & bay routing
            </p>
          </div>
        </div>

        {/* Rapid Clinical Presets */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-bold uppercase text-[#707881] mr-1">
            Simulate Cases:
          </span>
          <button
            onClick={() => handleApplyPreset('stemi')}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#ffdad6] text-[#ba1a1a] hover:bg-[#ba1a1a] hover:text-white transition-colors"
          >
            STEMI
          </button>
          <button
            onClick={() => handleApplyPreset('stroke')}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#cce5ff] text-[#004b73] hover:bg-[#006194] hover:text-white transition-colors"
          >
            Acute Stroke
          </button>
          <button
            onClick={() => handleApplyPreset('trauma')}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#ffdad6] text-[#ba1a1a] hover:bg-[#ba1a1a] hover:text-white transition-colors"
          >
            Severe Trauma
          </button>
          <button
            onClick={() => handleApplyPreset('copd')}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#ebedff] text-[#006194] hover:bg-[#006194] hover:text-white transition-colors"
          >
            Respiratory
          </button>
          <button
            onClick={() => handleApplyPreset('stable')}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#6df5e1]/40 text-[#006f64] hover:bg-[#006b5f] hover:text-white transition-colors"
          >
            Stable
          </button>
        </div>
      </div>

      {dispatched && (
        <div className="p-4 rounded-xl bg-[#ba1a1a] text-white flex items-center justify-between shadow-lg animate-in fade-in">
          <div className="flex items-center gap-3">
            <Radio className="w-5 h-5 text-white animate-pulse" />
            <div>
              <strong className="text-sm block">STAT CODE RED DISPATCH ACTIVATED</strong>
              <span className="text-xs text-white/90">
                Trauma bay intake alerted at {triageResult.facility}. Inbound ambulance team synchronized.
              </span>
            </div>
          </div>
          <button
            onClick={() => setDispatched(false)}
            className="px-3 py-1 bg-white text-[#ba1a1a] text-xs font-bold rounded-lg hover:bg-white/90"
          >
            Acknowledge
          </button>
        </div>
      )}

      {/* Main Grid: Form + Evaluation Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Vitals & Findings (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-[#f1f3f9] mb-4">
              <span className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#131a33]">
                Patient Physiological Telemetry
              </span>
              <span className="text-[10px] font-bold text-[#ba1a1a] uppercase bg-[#ffdad6] px-2 py-0.5 rounded">
                Rapid Intake
              </span>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                calculateTriage(hr, spo2, gcs);
              }}
              className="flex flex-col gap-3.5"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-[#707881] uppercase tracking-wider mb-1">
                    Heart Rate (BPM)
                  </label>
                  <input
                    type="number"
                    value={hr}
                    onChange={(e) => setHr(Number(e.target.value))}
                    className="px-3 py-2 rounded-xl bg-[#f3f3ff] text-xs font-mono font-bold text-[#131a33] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                  />
                  <span className="text-[9px] text-[#707881] mt-0.5">Norm: 60-100</span>
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-[#707881] uppercase tracking-wider mb-1">
                    BP (mmHg)
                  </label>
                  <input
                    type="text"
                    value={bp}
                    onChange={(e) => setBp(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-[#f3f3ff] text-xs font-mono font-bold text-[#131a33] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                  />
                  <span className="text-[9px] text-[#707881] mt-0.5">Norm: 120/80</span>
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-[#707881] uppercase tracking-wider mb-1">
                    SpO2 (%)
                  </label>
                  <input
                    type="number"
                    value={spo2}
                    onChange={(e) => setSpo2(Number(e.target.value))}
                    className={`px-3 py-2 rounded-xl bg-[#f3f3ff] text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#006194] ${
                      spo2 < 90 ? 'text-[#ba1a1a]' : 'text-[#131a33]'
                    }`}
                  />
                  <span className="text-[9px] text-[#707881] mt-0.5">Norm: &gt;95%</span>
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-[#707881] uppercase tracking-wider mb-1">
                    GCS (3-15)
                  </label>
                  <input
                    type="number"
                    min={3}
                    max={15}
                    value={gcs}
                    onChange={(e) => setGcs(Number(e.target.value))}
                    className="px-3 py-2 rounded-xl bg-[#f3f3ff] text-xs font-mono font-bold text-[#131a33] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                  />
                  <span className="text-[9px] text-[#707881] mt-0.5">Norm: 15</span>
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-[#707881] uppercase tracking-wider mb-1">
                    Resp Rate (/min)
                  </label>
                  <input
                    type="number"
                    value={rr}
                    onChange={(e) => setRr(Number(e.target.value))}
                    className="px-3 py-2 rounded-xl bg-[#f3f3ff] text-xs font-mono font-bold text-[#131a33] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                  />
                  <span className="text-[9px] text-[#707881] mt-0.5">Norm: 12-20</span>
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-[#707881] uppercase tracking-wider mb-1">
                    Pain (0-10)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={10}
                    value={pain}
                    onChange={(e) => setPain(Number(e.target.value))}
                    className="px-3 py-2 rounded-xl bg-[#f3f3ff] text-xs font-mono font-bold text-[#131a33] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                  />
                  <span className="text-[9px] text-[#707881] mt-0.5">Numeric scale</span>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-[#707881] uppercase tracking-wider mb-1">
                  Chief Complaint / Observed Syndrome
                </label>
                <textarea
                  rows={2}
                  value={complaint}
                  onChange={(e) => setComplaint(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#f3f3ff] text-xs text-[#131a33] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                />
              </div>

              <button
                type="submit"
                className="py-2.5 rounded-xl bg-[#ba1a1a] hover:bg-[#93000a] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Re-Calculate Neural Triage</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Output: Decision Support & Protocol (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#f1f3f9] mb-4">
                <span className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#131a33]">
                  AI Algorithmic Classification Matrix
                </span>
                <span className="text-xs font-mono font-bold text-[#006b5f] tabular-nums">
                  Neural Confidence: {triageResult.confidence}
                </span>
              </div>

              {/* Big ESI Badge */}
              <div
                className={`p-4 rounded-xl flex items-center justify-between mb-4 ${
                  triageResult.esiLevel === 1
                    ? 'bg-[#ba1a1a] text-white'
                    : triageResult.esiLevel === 2
                    ? 'bg-[#ffdad6] text-[#ba1a1a] border border-[#ffdad6]'
                    : 'bg-[#cce5ff] text-[#004b73] border border-[#93ccff]'
                }`}
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-90 block">
                    Calculated Triage Severity
                  </span>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-extrabold tracking-tight mt-0.5">
                    {triageResult.levelName}
                  </h3>
                </div>
                <div className="h-12 w-12 rounded-xl bg-black/10 flex items-center justify-center text-2xl font-black tabular-nums">
                  {triageResult.esiLevel}
                </div>
              </div>

              {/* Assessment Narrative */}
              <div className="p-3.5 rounded-xl bg-[#f3f3ff] border border-[#ebedff] text-xs text-[#131a33] leading-relaxed mb-4">
                <strong className="block text-[#006194] font-semibold mb-1">
                  Clinical Syndrome Analysis:
                </strong>
                {triageResult.assessment}
              </div>

              {/* Facility & Protocol Specifications */}
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-between">
                  <span className="text-[#707881] font-medium">Optimal Facility Dispatch:</span>
                  <strong className="text-[#006194]">{triageResult.facility}</strong>
                </div>
                <div className="p-2.5 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-between">
                  <span className="text-[#707881] font-medium">Bed / Bay Allocation:</span>
                  <strong className="text-[#006b5f]">{triageResult.bay}</strong>
                </div>
                <div className="p-2.5 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-between">
                  <span className="text-[#707881] font-medium">Mandatory Protocol:</span>
                  <strong className="text-[#ba1a1a]">{triageResult.protocol}</strong>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 mt-4 border-t border-[#f1f3f9] flex items-center gap-3">
              <button
                onClick={() => setSignedOff(true)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  signedOff
                    ? 'bg-[#6df5e1]/40 text-[#006f64] border border-[#006b5f]/30'
                    : 'bg-[#ebedff] text-[#006194] hover:bg-[#dbe1ff]'
                }`}
              >
                <FileCheck className="w-4 h-4" />
                <span>{signedOff ? 'Physician Sign-Off Confirmed' : 'Sign-Off as Dr. Rostova'}</span>
              </button>

              <button
                onClick={handleDispatchStat}
                className="flex-1 py-2.5 rounded-xl bg-[#ba1a1a] hover:bg-[#93000a] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                <span>Trigger STAT Dispatch</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
