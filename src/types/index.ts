export type TabType =
  | 'overview-network-map'
  | 'hospital-search-comparison'
  | 'ai-queue-token-tracker'
  | 'emergency-ai-triage'
  | 'bed-resource-allocation'
  | 'smart-pharmacy-blood-bank'
  | 'ai-reports-patient-timeline'
  | 'admin-predictive-insights';

export type UserRole = 'patient' | 'doctor' | 'admin';

export interface Hospital {
  id: string;
  name: string;
  matchScore: number;
  scoreType: 'Match' | 'Load' | 'Spec';
  statusBadge: string;
  statusType: 'optimal' | 'warning' | 'normal' | 'priority';
  distanceKm: number;
  travelTimeMins: number;
  departments: string[];
  doctorsOnDuty: number;
  queueWaitMins: number;
  queueTrend: 'up' | 'down' | 'stable';
  bedsOpen: {
    icu: number;
    er: number;
    general: number;
    nicu?: number;
    picu?: number;
  };
  totalBeds: number;
  occupiedBeds: number;
  isOvercapacity: boolean;
  address: string;
  phone: string;
}

export interface PatientToken {
  id: string;
  tokenCode: string;
  patientName: string;
  age: number;
  gender: string;
  hospitalName: string;
  department: string;
  consultationRoom: string;
  doctorName: string;
  status: 'called' | 'waiting' | 'in-consultation' | 'completed';
  estimatedCallTime: string;
  queuePosition: number;
  symptoms?: string;
  priorityLevel: 'Normal' | 'Senior' | 'Pediatric' | 'Urgent';
}

export interface VitalSigns {
  heartRate: number;
  bloodPressure: string;
  spo2: number;
  gcs: number;
  temperature: number;
  respiratoryRate: number;
  chiefComplaint: string;
  painScale: number;
}

export interface TriageResult {
  esiLevel: number;
  levelName: string;
  badgeColor: string;
  confidence: number;
  assessment: string;
  recommendedFacility: string;
  recommendedBay: string;
  protocolName: string;
  requiredSignOff: string;
  urgencyColor: string;
}

export interface MedicineItem {
  id: string;
  name: string;
  batchNumber: string;
  daysToExpiry: number;
  currentStock: number;
  stockUnit: string;
  status: 'critical' | 'adequate' | 'optimal';
  depletionForecastHours: number;
  autoReordered: boolean;
  minThreshold: number;
}

export interface BloodStock {
  type: string;
  units: number;
  status: 'Critical' | 'Optimal' | 'Adequate' | 'Low';
  statusClass: 'critical' | 'optimal' | 'adequate' | 'low';
}

export interface BiomarkerFinding {
  name: string;
  value: string;
  status: 'Out of range' | 'Elevated' | 'Optimal' | 'Critical';
  referenceRange: string;
  interpretation: string;
  statusColor: 'error' | 'warning' | 'primary' | 'secondary';
}

export interface TimelineMilestone {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  status: 'completed' | 'active' | 'upcoming';
  notes: string;
  doctor: string;
}

export interface AmbulanceTelemetry {
  id: string;
  callsign: string;
  condition: string;
  origin: string;
  divertedTo: string;
  etaMins: number;
  coordinates: [number, number];
  status: 'En Route' | 'Rerouted' | 'Arrived';
}
