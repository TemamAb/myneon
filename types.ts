
export enum UserRole {
  EXECUTIVE_OWNER = 'EXECUTIVE_OWNER',
  TRADER_CLIENT = 'TRADER_CLIENT'
}

export enum Environment {
  SIMULATION = 'SIMULATION',
  PRODUCTION = 'PRODUCTION'
}

export enum CertLevel {
  UNCERTIFIED = 'UNCERTIFIED',
  SILVER = 'SILVER',
  GOLD = 'GOLD',
  PLATINUM = 'PLATINUM'
}

export enum ModuleTier {
  SCANNER = 'Tier-1: Scanner',
  CAPTAIN = 'Tier-2: Captain',
  EXECUTOR = 'Tier-3: Executor',
  SYSTEM = 'Tier-X: System',
  GOVERNANCE = 'Tier-0: Governance'
}

export enum AssemblyState {
  IDLE = 'IDLE',
  PROJECTING = 'PROJECTING',
  FORGING = 'FORGING',
  CERTIFIED = 'CERTIFIED',
  COMPLETED = 'COMPLETED'
}

export interface DominanceDelta {
  label: string;
  category: 'Latency' | 'Security' | 'Efficiency' | 'AI-Logic' | 'Capital' | 'Infrastructure';
  currentValue: number;
  unit: string;
  topThreeAverage: number;
  description: string;
  status: 'Behind' | 'Parity' | 'Leading';
  reactionTriggered: string;
}

export interface TacticalReaction {
  id: string;
  timestamp: string;
  targetMetric: string;
  actionTaken: string;
  competitorOvertaken: string;
}

export interface TraderEngineStats {
  realizedProfit: number;
  gasSaved: number;
  globalRank: number;
  dominanceDeltas: DominanceDelta[];
  recentTacticalReactions: TacticalReaction[];
  projection: {
    daysToTarget: number;
    currentMaturity: number;
  };
}

export interface ClientProfile {
  name: string;
  email: string;
  brandName: string;
  primaryColor: string;
  focus: string;
  riskTolerance: number;
  reinvestmentRate: number;
  isSynthesized: boolean;
  serialCode: string;
  rankEpoch: string;
  variantId: string; // Sophisticated identifier for the synthesized instance
  avatarUrl?: string; // Optional avatar for identity layer
}

export interface ModuleInfo {
  id: string;
  name: string;
  purpose: string;
  features: string[];
  certLevel: string;
  tier: string;
  score: number;
  status: 'idle' | 'analyzing' | 'building' | 'auditing' | 'investigating' | 'deploying' | 'architecting' | 'healing' | 'certified' | 'training';
  isIntegrated: boolean;
  adaptiveFeatures: {
    comparativeLogic: boolean;
    shadowSecurity: boolean;
    elasticOptimization: boolean;
    externalTelemetry: boolean;
    synthesisIntelligence: boolean;
  };
  dedicatedAgentId: string;
  precisionGaps?: string[];
}

export interface MeshEvent {
  id: string;
  timestamp: string;
  source: string;
  target: string;
  type: string;
  payload: string;
}

export interface TelemetryStats {
  switches: number;
  errors: number;
  breaches: number;
  riskScore: number;
  simulationState?: 'IDLE' | 'STRESS_TESTING' | 'OPTIMIZING';
  activePerformance?: ModulePerformance[];
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

export interface SpecialistAgent {
  id: string;
  name: string;
  role: string;
  color: string;
  icon: string;
  specialty: string;
  responsibility: string;
  missionBacklog: { task: string; status: 'verified' | 'active' | 'pending' }[];
}

export interface DNASheet {
  brandName: string;
  variantId: string;
  engineCoreDNA: {
    latencyBenchmark: string;
    mevShieldStrength: string;
    atomicCohesion: string;
    gasEfficiency: string;
  };
  forgeSignature: string;
  blockAnchor: number;
}

export interface ModulePerformance {
  moduleId: string;
  moduleName: string;
  latencyNs: number;
  throughputTps: number;
  resourceLoad: number;
  peakJitterNs: number;
  packetLossRate: number;
}

export interface RankingReport {
  overallRank: number;
  percentile: number;
  status: 'Dominant' | 'Contested' | 'Losing-Alpha';
  topThree: {
    name: string;
    latencyNs: number;
    atomicSuccess: number;
    gasEfficiency: number;
    blockShare: number;
    lastTraceHash: string;
  }[];
  evidence: {
    dominanceRatio: number;
    victoryCount: number;
    comparativeLatencyDelta: number;
    explainabilityLog: string;
  };
  blockchainProofHash: string;
  timestamp: string;
}

export interface IntelligenceMissionReport {
  targetEngines: string[];
  scanDepth: number;
  discoveredModules: any[];
  aineonBenefitAnalysis: string;
  suggestedModuleInjections: string[];
  threatLevel: 'Low' | 'Elevated' | 'Critical';
  timestamp: string;
}

export interface BrandingConfig {
  brandName: string;
  primaryColor: string;
  isWhiteLabeled: boolean;
}

export interface OrchestratorResponse {
  text: string;
  suggestedActions: {
    type: string;
    payload: any;
  }[];
}

// Added missing interfaces for application services and components

export interface ScaffoldResult {
  templateName: string;
  filesGenerated: {
    name: string;
    content: string;
  }[];
  testResults: {
    passed: boolean;
    coverage: number;
    logs: string[];
  };
}

export interface AuditReport {
  score: number;
  report: string;
  recommendations: string[];
  signature: string;
  timestamp: string;
  criteria: {
    codeQuality: number;
    testCoverage: number;
    schemaCompliance: number;
  };
}

export interface KnowledgeShard {
  id: string;
  label: string;
  description: string;
  performanceDelta: number;
  category: 'Logic' | 'Security' | 'Efficiency' | 'Telemetry';
}

export interface SwarmTrainingReport {
  moduleId: string;
  trainerId: string;
  knowledgeVelocity: number;
  shardsInjected: KnowledgeShard[];
  neuralConvergenceScore: number;
  trainingLogs: string[];
  timestamp: string;
}

export interface InvestigationReport {
  target: string;
  securityScore: number;
  findings: string;
  deepScanLogs: string[];
  vulnerabilities: {
    severity: string;
    issue: string;
    description: string;
    remediation: string;
  }[];
  optimizations: {
    type: string;
    improvement: string;
    impact: string;
  }[];
  attackSimulations: {
    vector: string;
    outcome: string;
    notes: string;
  }[];
  formalInvariants: {
    invariant: string;
    status: string;
    proofMethod: string;
  }[];
  logicFlows: {
    source: string;
    target: string;
    payload: string;
  }[];
}

export interface DeploymentReport {
  txHash: string;
  gasUsed: number;
  status: string;
  deploymentSummary: string;
  logs: string[];
  environment: Environment;
  timestamp: string;
}

export interface DirectoryNode {
  name: string;
  type: 'file' | 'directory';
  description?: string;
  children?: DirectoryNode[];
}

export interface DirectoryStructure {
  projectName: string;
  architectureStyle: string;
  rationale: string;
  root: DirectoryNode[];
}

export interface SelfHealingReport {
  timestamp: string;
  anomaliesDetected: {
    module: string;
    severity: string;
    description: string;
    rootCause: string;
  }[];
  fixesApplied: {
    action: string;
    result: string;
    impactOnRisk: number;
  }[];
  systemIntegrityScore: number;
  healingLogs: string[];
}

export interface TotalUpgradeReport {
  originalName: string;
  gapsIdentified: {
    category: 'Security' | 'Performance' | 'Architecture' | 'Logic';
    description: string;
    impact: 'Critical' | 'High' | 'Medium';
  }[];
  reorganizationPlan: DirectoryStructure;
  upgradedModules: {
    name: string;
    oldStatus: string;
    newFeatures: string[];
    improvementScore: number;
  }[];
  executiveSummary: string;
  deliveryTimestamp: string;
}

export interface EliteParameters {
  executionLatencyNs: number;
  gasEfficiencyPercent: number;
  mevProtectionLevel: string;
  multiHopComplexity: number;
  formalVerification: boolean;
  benchmarkVsTop001: number;
}

export interface GlobalForgeReport {
  timestamp: string;
  eliteConfig: EliteParameters;
  moduleUpgrades: {
    id: string;
    originalGrade: string;
    newGrade: string;
    keyUpgrade: string;
    performanceDelta: number;
  }[];
  logicDirectives: string[];
  systemRebirthSummary: string;
}

export interface ModuleForgeSpec {
  moduleName: string;
  eliteFeatures: string[];
  bytecodeOptimization: string;
  latencyTargetNs: number;
  safetyInvariants: string[];
  complianceScore: number;
}

export interface ProfitCalculationResult {
  path: string[];
  grossProfit: number;
  gasCostUsd: number;
  slippageUsd: number;
  protocolFeesUsd: number;
  netRoi: number;
  riskRating: 'Safe' | 'Moderate' | 'High' | 'Extreme';
  isViable: boolean;
  isEtherscanVerified: boolean;
  timestamp: string;
}

export interface GaslessRelayResult {
  bundleId: string;
  targetBlock: number;
  estimatedPriorityFeeGwei: number;
  stealthLevel: 'Ghost' | 'Shadow' | 'Standard';
  relayNodes: string[];
  submissionStatus: 'Pending' | 'Included' | 'Failed';
  miningProbability: number;
  gasSavingsUsd: number;
  timestamp: string;
}

export interface WorkflowTask {
  id: string;
  label: string;
  done: boolean;
}

export interface WorkflowPhase {
  id: string;
  name: string;
  status: 'pending' | 'active' | 'completed';
  description: string;
  tasks: WorkflowTask[];
}

export interface WorkflowAlert {
  moduleId: string;
  message: string;
  severity: 'critical' | 'warning';
}

export interface WorkflowState {
  currentPhaseId: string;
  overallProgress: number;
  engineStatus: string;
  phases: WorkflowPhase[];
  alerts: WorkflowAlert[];
}

export interface LatencyHop {
  hop: string;
  latencyNs: number;
  jitterNs: number;
  status: 'Optimal' | 'Degraded' | 'Critical';
}

export interface LatencyReport {
  overallLatencyNs: number;
  hopBreakdown: LatencyHop[];
  bottleneckAnalysis: string;
  optimizationRecommendations: string[];
  nodeTopologyScore: number;
  timestamp: string;
}

export interface ThreatVector {
  type: string;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  mitigationStrategy: string;
  detectionProbability: number;
}

export interface MEVProtectionReport {
  shieldStrength: number;
  threatVectors: ThreatVector[];
  activeDefenses: string[];
  simulationLogs: string[];
  isCompromised: boolean;
  timestamp: string;
}

export interface EliteBenchmarkComparison {
  metric: string;
  astraEliteValue: string;
  top001Value: string;
  gapAnalysis: string;
}

export interface SubmissionManifest {
  sealId: string;
  checksum: string;
  authorizedRoles: string[];
  priorityLevel: 'Standard' | 'Elevated' | 'Immediate-Forge';
  integrityGrade: string;
}

export interface ProtocolReport {
  requirementAnalysis: string;
  eliteBenchmarkComparison: EliteBenchmarkComparison[];
  deliverablesPrepared: string[];
  submissionManifest: SubmissionManifest;
  protocolSignature: string;
  timestamp: string;
}

export interface DetectedWallet {
  name: string;
  icon: string;
  isDetected: boolean;
  status: 'Connected' | 'Disconnected' | 'Locked';
}

export interface PayoutTransaction {
  id: string;
  amount: number;
  destination: string;
  timestamp: string;
  status: 'Confirmed' | 'Pending';
}

export interface WithdrawalReport {
  detectedWallets: DetectedWallet[];
  activeAddress: string;
  isAddressValidated: boolean;
  profitAvailableUsd: number;
  autoWithdrawal: {
    enabled: boolean;
    threshold: number;
  };
  transactionHistory: PayoutTransaction[];
  timestamp: string;
}

export interface TunedParam {
  key: string;
  originalValue: string;
  optimizedValue: string;
  impactLabel: string;
}

export interface IntegrityProof {
  isBlockchainAnchored: boolean;
  blockHeight: number;
  blockHash: string;
  dataLatencyMs: number;
  nodeProvider: string;
  noMockVerified: boolean;
  cryptographicProof: string;
}

export interface OptimizationReport {
  overallReward: number;
  convergenceDelta: number;
  integrityProof: IntegrityProof;
  tunedParams: TunedParam[];
  trainingLogs: string[];
  neuralPolicySignature: string;
  timestamp: string;
}

export interface HealthKPI {
  moduleId: string;
  uptime: number;
  latencyNs: number;
  errorRate: number;
  integrityScore: number;
}

export interface AlphaSpread {
  pair: string;
  exchanges: string[];
  spreadPercent: number;
  estimatedNetProfitUsd: number;
  confidence: number;
  isEtherscanValidated: boolean;
  timestamp: string;
}

export interface ExecutionProof {
  proofId: string;
  outcome: 'Success' | 'Revert' | 'Slippage-Failure';
  executionTimeMs: number;
  gasOptimality: number;
  bnipVerified: boolean;
}

export interface GlobalAnalyticsReport {
  healthMatrix: HealthKPI[];
  topSpreads: AlphaSpread[];
  recentProofs: ExecutionProof[];
  aiStrategicDirectives: string[];
  systemEfficiency: number;
  timestamp: string;
}

export interface OpportunityStats {
  zScore: number;
  meanReversionProbability: number;
  standardDeviation: number;
  volatilityWaveFactor: number;
  historicalPercentile: number;
}

export interface Opportunity {
  id: string;
  pair: string;
  spread: number;
  estimatedProfitUsd: number;
  path: string[];
  confidence: number;
  volatilityStatus: 'Stable' | 'Volatile' | 'Extreme';
  stats: OpportunityStats;
}

export interface OpportunityReport {
  opportunities: Opportunity[];
  thresholdProtocol: {
    minSpreadFloor: number;
    gasAdjustedPremium: number;
    liquidityDepthFactor: number;
  };
  volatilityFilter: {
    globalIndex: number;
    activeExclusions: string[];
    riskAdjustment: string;
    waveFilteringStatus: 'Active' | 'Throttled' | 'Suspended';
  };
  specialistRationale: string;
  timestamp: string;
}

export interface AgentHandshake {
  id: string;
  sourceAgentId: string;
  targetAgentId: string;
  payloadType: string;
  summary: string;
  intensity: number;
  timestamp: string;
}

export interface MeshIntelligenceState {
  globalCohesion: number;
  activeLoops: number;
  lastBrokerSynthesis: string;
  brokerDirectives: string[];
}

export interface DirectorySplit {
  folder: string;
  env: Environment;
  status: 'Isolated' | 'Shared-Risk' | 'Strict-Lock';
  path: string;
}

export interface LeakageCheck {
  source: string;
  target: string;
  risk: 'Critical' | 'None';
  detail: string;
}

export interface IronWallReport {
  isolationScore: number;
  boundaryVerified: boolean;
  directorySplits: DirectorySplit[];
  leakageCheck: LeakageCheck[];
  guardianRationale: string;
  activeBarrierProtocol: string;
  timestamp: string;
}

export interface TotalScanIssue {
  id: string;
  moduleId: string;
  moduleName: string;
  severity: 'Critical' | 'Warning' | 'Optimization';
  description: string;
  remediation: string;
  status: 'Detected' | 'Fixing' | 'Resolved';
}

export interface TotalScanReport {
  overallHealth: number;
  issues: TotalScanIssue[];
  scanLogs: string[];
  scanSignature: string;
  timestamp: string;
}

export interface DockerManifest {
  name: string;
  content: string;
  language: string;
}

export interface DockerReport {
  manifests: DockerManifest[];
  securityAnalysis: {
    layerScore: number;
    vulnerabilitiesDetected: number;
    hardenedStatus: boolean;
  };
  resourceLimits: {
    cpuCores: number;
    memoryLimitMb: number;
    networkMode: string;
  };
  buildLogs: string[];
  timestamp: string;
}

export interface FinalityCheckItem {
  label: string;
  status: 'PASS' | 'FAIL' | 'WARN';
  detail: string;
}

export interface FinalityReport {
  engineSignature: string;
  gradeVerified: string;
  integrityChecklist: FinalityCheckItem[];
  genesisHash: string;
  arbiterRationale: string;
  isSealed: boolean;
  timestamp: string;
}

export interface EarlyHealthScore {
  moduleId: string;
  moduleName: string;
  predictedScore: number;
  confidenceInterval: number;
  riskFactors: string[];
}

export interface AdaptiveRule {
  parameter: string;
  currentThreshold: string;
  adjustment: string;
  reasoning: string;
  severity: 'Passive' | 'Active' | 'Strict';
}

export interface RuleEngineReport {
  globalStrictnessScore: number;
  earlyHealthMatrix: EarlyHealthScore[];
  adaptiveRules: AdaptiveRule[];
  performanceInsights: string[];
  engineSignature: string;
  timestamp: string;
  telemetrySnapshot: TelemetryStats;
}

export interface ModuleGap {
  moduleId: string;
  moduleName: string;
  currentGrade: number;
  targetGrade: number;
  discrepancies: string[];
  impact: 'Low' | 'Medium' | 'High' | 'Critical';
  remediationPath: string;
}

export interface GapsReport {
  globalGapScore: number;
  moduleGaps: ModuleGap[];
  precisionDirectives: string[];
  benchmarkingRationale: string;
  analyzerSignature: string;
  timestamp: string;
}

export interface HandshakeLog {
  source: string;
  target: string;
  protocol: string;
  latencyNs: number;
  status: 'Verified' | 'Calibrated' | 'Optimized';
}

export interface StressTestResult {
  name: string;
  result: 'PASS' | 'FAIL';
  throughput: string;
  bottleneck: string;
}

export interface IntegrationReport {
  cohesionScore: number;
  integratedModules: string[];
  handshakeLogs: HandshakeLog[];
  systemStressTests: StressTestResult[];
  eliteComplianceSignature: string;
  assemblyManifest: string;
  blockchainAnchoredProof: string;
  industryBenchmarkVerified: boolean;
  timestamp: string;
}

export interface IndustryMetric {
  metric: string;
  aineonValue: string;
  topCompetitorValue: string;
  advantagePercent: number;
}

export interface EliteBenchmarkAnalysis {
  grade: 'Astra-Elite' | 'Sub-Elite' | 'Standard';
  competitiveScore: number;
  ranking: number;
  industryMetrics: IndustryMetric[];
  executiveSummary: string;
  timestamp: string;
}

export interface LeaderboardEntry {
  name: string;
  rank: number;
  latencyMs: number;
  mevDeflection: number;
  atomicSuccessRate: number;
  isAineon: boolean;
  notes: string;
}

export interface LeaderboardReport {
  leaderboard: LeaderboardEntry[];
  globalEliteScore: number;
  marketDominancePercent: number;
  competitiveGapAnalysis: string;
  timestamp: string;
}

export interface RemainingTask {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'verified';
  priority: 'CRITICAL' | 'HIGH' | 'ELITE';
  tier: string;
}

export interface MaturityAnalysis {
  overallMaturity: number;
  remainingTasks: RemainingTask[];
  agentRationale: string;
  eliteBenchmarkGap: string;
  timestamp: string;
}
