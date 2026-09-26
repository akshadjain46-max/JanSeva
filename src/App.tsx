import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { HeroCta } from './components/HeroCta';
import { TokenModal } from './components/TokenModal';

// Tabs
import { OverviewTab } from './components/tabs/OverviewTab';
import { HospitalMatrixTab } from './components/tabs/HospitalMatrixTab';
import { AiQueueTab } from './components/tabs/AiQueueTab';
import { EmergencyTriageTab } from './components/tabs/EmergencyTriageTab';
import { BedsResourcesTab } from './components/tabs/BedsResourcesTab';
import { PharmacyBloodBankTab } from './components/tabs/PharmacyBloodBankTab';
import { AiDiagnosticsTab } from './components/tabs/AiDiagnosticsTab';
import { DemandForecastTab } from './components/tabs/DemandForecastTab';

// Mock Data
import {
  INITIAL_HOSPITALS,
  INITIAL_TOKENS,
  INITIAL_MEDICINES,
  INITIAL_BLOOD_STOCKS,
  BIOMARKER_FINDINGS,
  TIMELINE_MILESTONES,
  ACTIVE_AMBULANCES,
} from './data/mockData';
import { TabType, UserRole } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<TabType>('overview-network-map');
  const [activeRole, setActiveRole] = useState<UserRole>('patient');
  const [targetFacility, setTargetFacility] = useState('Metro Grid (14 Active)');

  // Token Modal State
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);
  const [modalHospital, setModalHospital] = useState('Metro West Central');
  const [modalDept, setModalDept] = useState('Cardiology');
  const [modalTokenCode, setModalTokenCode] = useState('#TK-409');

  // Facilities list for dropdown
  const facilitiesList = [
    'Metro Grid (14 Active)',
    'Metro West Central',
    'St. Jude Medical Center',
    'Memorial Grace Pavilion',
    'Apex Children’s Hospital',
  ];

  const handleOpenTokenModal = (hospitalName: string, department: string) => {
    setModalHospital(hospitalName);
    setModalDept(department);
    const randCode = Math.floor(400 + Math.random() * 90);
    setModalTokenCode(`#TK-${randCode}`);
    setIsTokenModalOpen(true);
  };

  const handleQuickToken = () => {
    handleOpenTokenModal('Metro West Central', 'Cardiology (Rapid OPD)');
  };

  const handleCrossmatchStat = () => {
    setActiveTab('smart-pharmacy-blood-bank');
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131a33] font-['Inter'] antialiased flex flex-col">
      {/* Fixed Header Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onQuickToken={handleQuickToken}
      />

      <div className="flex pt-16 flex-1">
        {/* Left Sidebar Navigation */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          targetFacility={targetFacility}
          setTargetFacility={setTargetFacility}
          facilitiesList={facilitiesList}
        />

        {/* Main Content Workspace (shifted right by sidebar width on laptop) */}
        <main className="flex-1 ml-64 lg:ml-72 p-5 sm:p-6 lg:p-8 max-w-[1600px] min-w-0">
          {/* Hero Section with Clear User Call-To-Action & Operational Bar */}
          <HeroCta
            activeRole={activeRole}
            setActiveRole={setActiveRole}
            setActiveTab={setActiveTab}
            onQuickToken={handleQuickToken}
          />

          {/* Active Tab Screen */}
          <section aria-label="Feature Workspace" className="animate-in fade-in duration-150">
            {activeTab === 'overview-network-map' && (
              <OverviewTab
                hospitals={INITIAL_HOSPITALS}
                tokens={INITIAL_TOKENS}
                medicines={INITIAL_MEDICINES}
                bloodStocks={INITIAL_BLOOD_STOCKS}
                biomarkers={BIOMARKER_FINDINGS}
                milestones={TIMELINE_MILESTONES}
                ambulances={ACTIVE_AMBULANCES}
                activeRole={activeRole}
                setActiveTab={setActiveTab}
                onOpenTokenModal={handleOpenTokenModal}
                onCrossMatchRequest={handleCrossmatchStat}
              />
            )}

            {activeTab === 'hospital-search-comparison' && (
              <HospitalMatrixTab
                hospitals={INITIAL_HOSPITALS}
                onOpenTokenModal={handleOpenTokenModal}
              />
            )}

            {activeTab === 'ai-queue-token-tracker' && (
              <AiQueueTab
                tokens={INITIAL_TOKENS}
                hospitals={INITIAL_HOSPITALS}
                onOpenTokenModal={handleOpenTokenModal}
              />
            )}

            {activeTab === 'emergency-ai-triage' && (
              <EmergencyTriageTab
                hospitals={INITIAL_HOSPITALS}
                onOpenTokenModal={handleOpenTokenModal}
              />
            )}

            {activeTab === 'bed-resource-allocation' && (
              <BedsResourcesTab hospitals={INITIAL_HOSPITALS} />
            )}

            {activeTab === 'smart-pharmacy-blood-bank' && (
              <PharmacyBloodBankTab
                medicines={INITIAL_MEDICINES}
                bloodStocks={INITIAL_BLOOD_STOCKS}
                onRequestCrossMatch={() => {}}
              />
            )}

            {activeTab === 'ai-reports-patient-timeline' && (
              <AiDiagnosticsTab
                biomarkers={BIOMARKER_FINDINGS}
                milestones={TIMELINE_MILESTONES}
              />
            )}

            {activeTab === 'admin-predictive-insights' && (
              <DemandForecastTab ambulances={ACTIVE_AMBULANCES} />
            )}
          </section>
        </main>
      </div>

      {/* Global Digital Pass Modal */}
      <TokenModal
        isOpen={isTokenModalOpen}
        onClose={() => setIsTokenModalOpen(false)}
        hospitalName={modalHospital}
        department={modalDept}
        tokenCode={modalTokenCode}
      />
    </div>
  );
}

export default App;
