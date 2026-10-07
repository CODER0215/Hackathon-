/**
 * SentinelAI V2 – Private AI Threat Shield
 * Privacy-First, On-Device Personal Cybersecurity Defense Platform
 */

import React, { useState, useEffect } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { UniversalScanner } from './components/UniversalScanner';
import { SecurityDashboard } from './components/SecurityDashboard';
import { LiveProtectionFeed } from './components/LiveProtectionFeed';
import { ThreatHistoryView } from './components/ThreatHistoryView';
import { CopilotChat } from './components/CopilotChat';
import { PrivacyCenter } from './components/PrivacyCenter';
import { SecurityEducation } from './components/SecurityEducation';
import { ArchitectureView } from './components/ArchitectureView';
import { CampaignIntelligence } from './components/CampaignIntelligence';
import { StudentAndFamilyShield } from './components/StudentAndFamilyShield';
import { AdversarialLab } from './components/AdversarialLab';
import { IncidentCenter } from './components/IncidentCenter';
import { SocView } from './components/SocView';
import { EmergencyDecisionTree } from './components/EmergencyDecisionTree';
import { PresentationMode } from './components/PresentationMode';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { StorageService, PrivacySettings } from './services/storage';
import { ThreatAnalysisResult, SecurityStats } from './types/threat';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('overview');
  const [offlineMode, setOfflineMode] = useState<boolean>(false);
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>(StorageService.getSettings());
  const [history, setHistory] = useState<ThreatAnalysisResult[]>(StorageService.getHistory());
  const [stats, setStats] = useState<SecurityStats>(StorageService.getStats(history));
  const [activeScanContext, setActiveScanContext] = useState<ThreatAnalysisResult | null>(null);
  const [initialPresetId, setInitialPresetId] = useState<string | null>(null);

  // Modals state
  const [emergencyModalOpen, setEmergencyModalOpen] = useState<boolean>(false);
  const [presentationModalOpen, setPresentationModalOpen] = useState<boolean>(false);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);

  // Sync offline mode with settings
  useEffect(() => {
    setOfflineMode(privacySettings.offlineMode);
  }, [privacySettings.offlineMode]);

  // Global keyboard shortcut for Search (Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleOfflineMode = (enabled: boolean) => {
    const updated = StorageService.updateSettings({ offlineMode: enabled });
    setPrivacySettings(updated);
    setOfflineMode(enabled);
  };

  const handleUpdatePrivacySettings = (newSettings: Partial<PrivacySettings>) => {
    const updated = StorageService.updateSettings(newSettings);
    setPrivacySettings(updated);
  };

  const handleScanCompleted = (result: ThreatAnalysisResult) => {
    setActiveScanContext(result);
    const updatedHistory = StorageService.getHistory();
    setHistory(updatedHistory);
    setStats(StorageService.getStats(updatedHistory));
  };

  const handleSelectHistoryScan = (scan: ThreatAnalysisResult) => {
    setActiveScanContext(scan);
    setActiveTab('scanner');
  };

  const handleRefreshHistory = () => {
    const updated = StorageService.getHistory();
    setHistory(updated);
    setStats(StorageService.getStats(updated));
  };

  const handleClearAllData = () => {
    StorageService.clearHistory();
    setHistory([]);
    setStats(StorageService.getStats([]));
    setActiveScanContext(null);
  };

  const handleQuickDemo = (presetId: string) => {
    setInitialPresetId(presetId);
    setActiveTab('scanner');
  };

  const handleInspectLiveEvent = (_payload: string, _type: 'url' | 'message') => {
    setActiveTab('scanner');
  };

  const handleAskCopilot = (contextResult: ThreatAnalysisResult) => {
    setActiveScanContext(contextResult);
    setActiveTab('copilot');
  };

  return (
    <div className="min-h-screen bg-[#070a13] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'scanner') {
            setInitialPresetId(null);
          }
        }}
        offlineMode={offlineMode}
        setOfflineMode={handleToggleOfflineMode}
        onOpenEmergency={() => setEmergencyModalOpen(true)}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenPresentation={() => setPresentationModalOpen(true)}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {activeTab === 'overview' && (
          <LandingPage setActiveTab={setActiveTab} onQuickDemo={handleQuickDemo} />
        )}

        {activeTab === 'scanner' && (
          <UniversalScanner
            onScanCompleted={handleScanCompleted}
            onAskCopilot={handleAskCopilot}
            initialPresetId={initialPresetId}
            offlineMode={offlineMode}
          />
        )}

        {activeTab === 'dashboard' && (
          <SecurityDashboard
            stats={stats}
            history={history}
            setActiveTab={setActiveTab}
            onScanShortcut={() => setActiveTab('scanner')}
          />
        )}

        {activeTab === 'live-stream' && (
          <LiveProtectionFeed onInspectEvent={handleInspectLiveEvent} />
        )}

        {activeTab === 'campaigns' && (
          <CampaignIntelligence onTestCampaign={handleQuickDemo} />
        )}

        {activeTab === 'student-family' && (
          <StudentAndFamilyShield onTestScenario={handleQuickDemo} />
        )}

        {activeTab === 'adversarial' && <AdversarialLab />}

        {activeTab === 'incidents' && <IncidentCenter />}

        {activeTab === 'soc-view' && <SocView stats={stats} offlineMode={offlineMode} />}

        {activeTab === 'history' && (
          <ThreatHistoryView
            history={history}
            onSelectScan={handleSelectHistoryScan}
            onRefreshHistory={handleRefreshHistory}
          />
        )}

        {activeTab === 'copilot' && (
          <CopilotChat
            activeScanContext={activeScanContext}
            offlineMode={offlineMode}
          />
        )}

        {activeTab === 'learn' && <SecurityEducation />}

        {activeTab === 'privacy' && (
          <PrivacyCenter
            settings={privacySettings}
            onUpdateSettings={handleUpdatePrivacySettings}
            onClearData={handleClearAllData}
          />
        )}

        {activeTab === 'architecture' && <ArchitectureView />}
      </main>

      {/* Emergency Decision Tree Modal 2.0 */}
      <EmergencyDecisionTree
        isOpen={emergencyModalOpen}
        onClose={() => setEmergencyModalOpen(false)}
      />

      {/* Presentation Pitch Deck Full-Screen Modal */}
      <PresentationMode
        isOpen={presentationModalOpen}
        onClose={() => setPresentationModalOpen(false)}
        onLaunchScanner={() => {
          setPresentationModalOpen(false);
          setActiveTab('scanner');
        }}
      />

      {/* Global Search Omnibar Modal */}
      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onNavigateTab={(t) => {
          setActiveTab(t);
          setSearchModalOpen(false);
        }}
        onSelectPreset={(pId) => {
          setInitialPresetId(pId);
          setActiveTab('scanner');
          setSearchModalOpen(false);
        }}
      />
    </div>
  );
}
