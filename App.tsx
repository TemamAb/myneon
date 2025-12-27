
import React, { useState, useEffect, useCallback } from 'react';
import { 
  ClientProfile, 
  ModuleInfo, 
  TelemetryStats, 
  MeshEvent,
  AssemblyState,
  CertLevel,
  AuditReport,
  ScaffoldResult,
  ChatMessage,
  SpecialistAgent,
  SwarmTrainingReport,
  TraderEngineStats,
  RankingReport,
  IntelligenceMissionReport,
  DNASheet
} from './types';
import { CORE_MODULES, SPECIALIST_AGENTS } from './constants';
import ExecutiveDashboard from './components/ExecutiveDashboard';
import ClientDashboard from './components/ClientDashboard';
import ProductCover from './components/ProductCover';

// Services
import { performSpecialistAudit } from './services/auditorService';
import { scaffoldModuleWithAI } from './services/specialistService';
import { initiateSwarmTraining } from './services/swarmTrainingService';
import { getOrchestratorResponse } from './services/orchestratorService';
import { performRankingAudit } from './services/rankingService';
import { performIntelligenceMission } from './services/intelligenceService';
import RankingModal from './components/RankingModal';
import IntelligenceMissionModal from './components/IntelligenceMissionModal';

const App: React.FC = () => {
  const [hasEntered, setHasEntered] = useState(false);
  const [isAdminView, setIsAdminView] = useState(true);
  const [assemblyState, setAssemblyState] = useState<AssemblyState>(AssemblyState.IDLE);
  const [isPublished, setIsPublished] = useState(false);
  const [dnaManifest, setDnaManifest] = useState<DNASheet | null>(null);
  
  const [clientProfile, setClientProfile] = useState<ClientProfile>({
    name: 'AION V IX Executive',
    email: 'architect@aion.mesh',
    brandName: 'AION V IX',
    primaryColor: '#00A3FF',
    focus: 'Aggressive-MEV',
    riskTolerance: 85,
    reinvestmentRate: 50,
    isSynthesized: false,
    serialCode: 'VIX-IX-PRO-000',
    rankEpoch: 'Oct 14, 2025',
    variantId: 'PROTOTYPE-001'
  });

  const [modules, setModules] = useState<ModuleInfo[]>(CORE_MODULES);
  const [events, setEvents] = useState<MeshEvent[]>([]);
  const [telemetry, setTelemetry] = useState<TelemetryStats>({
    switches: 142, errors: 0, breaches: 0, riskScore: 0.001, simulationState: 'IDLE'
  });

  const [engineStats, setEngineStats] = useState<TraderEngineStats>({
    realizedProfit: 184520.42,
    gasSaved: 1241.50,
    globalRank: 1,
    dominanceDeltas: [
      { label: 'Latency', category: 'Latency', currentValue: 0.042, unit: 'ms', topThreeAverage: 0.410, description: "Mempool-to-Kernel execution lag.", status: 'Leading', reactionTriggered: 'Kernel-Reclock-v9' },
      { label: 'MEV Shield', category: 'Security', currentValue: 99.98, unit: '%', topThreeAverage: 98.4, description: "Front-running and sandwich deflection rate.", status: 'Leading', reactionTriggered: 'Ghost-Relay-Patch' },
      { label: 'Arb Efficiency', category: 'Efficiency', currentValue: 94.2, unit: '%', topThreeAverage: 88.5, description: "Opportunity detection vs execution ratio.", status: 'Leading', reactionTriggered: 'Scanner-Sensitivity-Boost' },
      { label: 'Gasless Gain', category: 'Efficiency', currentValue: 18.5, unit: '%', topThreeAverage: 12.4, description: "Relative cost savings of private relay bundles.", status: 'Leading', reactionTriggered: 'Relay-Bundle-Compress' }
    ],
    recentTacticalReactions: [],
    projection: { daysToTarget: 0, currentMaturity: 100 }
  });

  const [activeRanking, setActiveRanking] = useState<RankingReport | null>(null);
  const [activeIntelligence, setActiveIntelligence] = useState<IntelligenceMissionReport | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<SpecialistAgent>(SPECIALIST_AGENTS[0]);

  const addEvent = useCallback((source: string, target: string, type: string, payload: string) => {
    const newEvent: MeshEvent = { id: Math.random().toString(36).substr(2, 9), timestamp: new Date().toISOString(), source, target, type, payload };
    setEvents(prev => [...prev.slice(-19), newEvent]);
  }, []);

  const handleToggleView = () => {
    setIsAdminView(!isAdminView);
  };

  const handleTrainModule = useCallback(async (id: string, isSilent = false) => {
    const mod = modules.find(m => m.id === id);
    if (!mod) return;
    if (!isSilent) setModules(prev => prev.map(m => m.id === id ? { ...m, status: 'training' } : m));
    
    try {
      const agent = SPECIALIST_AGENTS.find(a => a.id === mod.dedicatedAgentId);
      await initiateSwarmTraining(mod.id, mod.name, agent?.specialty || 'Logic');
      setModules(prev => prev.map(m => m.id === id ? { ...m, status: 'certified', score: 100, isIntegrated: true } : m));
    } catch (e) {
      if (!isSilent) setModules(prev => prev.map(m => m.id === id ? { ...m, status: 'idle' } : m));
    }
  }, [modules]);

  const handleFinalDelivery = (dna: DNASheet) => {
    setDnaManifest(dna);
    setIsPublished(true);
    setClientProfile(prev => ({ 
      ...prev, 
      isSynthesized: true, 
      brandName: dna.brandName,
      variantId: dna.variantId 
    }));
  };

  const handleSendMessage = async (content: string) => {
    const userMsg: ChatMessage = { role: 'user', content, timestamp: new Date().toLocaleTimeString() };
    setChatMessages(prev => [...prev, userMsg]);
    try {
      const response = await getOrchestratorResponse(content, { telemetry, modules });
      const assistantMsg: ChatMessage = { role: 'assistant', content: response.text, timestamp: new Date().toLocaleTimeString() };
      setChatMessages(prev => [...prev, assistantMsg]);
    } catch (e) { console.error(e); }
  };

  if (!hasEntered) return <ProductCover onEnter={() => setHasEntered(true)} branding={{ brandName: clientProfile.brandName, primaryColor: '#00A3FF', isWhiteLabeled: false }} />;

  return (
    <div className="min-h-screen bg-[#020204] text-slate-200">
      {isAdminView ? (
        <ExecutiveDashboard 
          profile={clientProfile} 
          assemblyState={assemblyState}
          onStartSynthesis={(newProfile) => { 
            setClientProfile({ ...clientProfile, ...newProfile }); 
            setAssemblyState(AssemblyState.FORGING); 
          }}
          onFinalDelivery={handleFinalDelivery}
          events={events}
          modules={modules}
          telemetry={telemetry}
          onToggleView={handleToggleView}
          onBuildModule={async (id) => {
             setModules(prev => prev.map(m => m.id === id ? { ...m, status: 'building' } : m));
             await scaffoldModuleWithAI(modules.find(m => m.id === id)!.name, [], modules.find(m => m.id === id)!.dedicatedAgentId);
             setModules(prev => prev.map(m => m.id === id ? { ...m, status: 'analyzing', score: 40 } : m));
          }}
          onAuditModule={async (id) => {
             setModules(prev => prev.map(m => m.id === id ? { ...m, status: 'auditing' } : m));
             const res = await performSpecialistAudit(modules.find(m => m.id === id)!.name, []);
             setModules(prev => prev.map(m => m.id === id ? { ...m, status: 'certified', score: res.score, certLevel: CertLevel.PLATINUM } : m));
          }}
          onTrainModule={(id) => handleTrainModule(id, false)}
          onForgeModule={(id) => setModules(prev => prev.map(m => m.id === id ? { ...m, isIntegrated: true } : m))}
          onOpenConsole={(id) => handleSendMessage(`Generate diagnostic for ${id}`)}
          onDeepInvestigate={(id) => handleSendMessage(`Deep scan module ${id}`)}
          onTriggerScan={() => addEvent('Sentinel', 'Mesh', 'SCAN', 'Global Static Scan triggered.')}
          onTriggerIntegration={() => addEvent('Architect', 'Kernel', 'SYNC', 'System Handshake broadcast.')}
          onTriggerGaps={async () => setActiveRanking(await performRankingAudit(modules))}
          onTriggerHealing={async () => setActiveIntelligence(await performIntelligenceMission(''))}
          chatMessages={chatMessages}
          selectedAgent={selectedAgent}
          onSelectAgent={(id) => setSelectedAgent(SPECIALIST_AGENTS.find(a => a.id === id) || SPECIALIST_AGENTS[0])}
          onTerminalSend={handleSendMessage}
        />
      ) : (
        <ClientDashboard profile={clientProfile} onToggleView={handleToggleView} isEngineActive={isPublished} engineStats={engineStats} />
      )}

      {activeRanking && <RankingModal report={activeRanking} onClose={() => setActiveRanking(null)} />}
      {activeIntelligence && <IntelligenceMissionModal report={activeIntelligence} onClose={() => setActiveIntelligence(null)} />}
    </div>
  );
};

export default App;
