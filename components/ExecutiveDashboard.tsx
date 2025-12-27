
import React, { useState, useEffect } from 'react';
import { ClientProfile, AssemblyState, MeshEvent, ModuleInfo, TelemetryStats, ChatMessage, SpecialistAgent, DNASheet, WithdrawalReport, PayoutTransaction } from '../types';
import Logo from './Logo';
import Tooltip from './Tooltip';
import ModuleGrid from './ModuleGrid';
import Terminal from './Terminal';
import CommandBar from './CommandBar';
import { SPECIALIST_AGENTS } from '../constants';
import { detectAndCalibrateVault } from '../services/withdrawalService';

interface Props {
   profile: ClientProfile;
   assemblyState: AssemblyState;
   onStartSynthesis: (profile: ClientProfile) => void;
   onFinalDelivery: (dna: DNASheet) => void;
   events: MeshEvent[];
   modules: ModuleInfo[];
   telemetry: TelemetryStats;
   onToggleView: () => void;
   onBuildModule: (id: string) => void;
   onAuditModule: (id: string) => void;
   onTrainModule: (id: string) => void;
   onForgeModule: (id: string) => void;
   onOpenConsole: (id: string) => void;
   onDeepInvestigate: (id: string) => void;
   onTriggerScan: () => void;
   onTriggerIntegration: () => void;
   onTriggerGaps: () => void;
   onTriggerHealing: () => void;
   chatMessages: ChatMessage[];
   selectedAgent: SpecialistAgent;
   onSelectAgent: (id: string) => void;
   onTerminalSend: (msg: string) => void;
}

const MetricCard: React.FC<{ label: string; value: string; sub: string; color?: string }> = ({ label, value, sub, color = "text-blue-400" }) => (
   <div className="p-6 glass border border-white/5 rounded-3xl relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">{label}</span>
      <div className="flex flex-col gap-1">
         <span className={`text-3xl font-mono font-black ${color}`}>{value}</span>
         <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">{sub}</span>
      </div>
   </div>
);

const ExecutiveDashboard: React.FC<Props> = ({
   profile, onToggleView, onFinalDelivery, onStartSynthesis,
   events, modules, telemetry,
   onBuildModule, onAuditModule, onTrainModule, onForgeModule, onOpenConsole, onDeepInvestigate,
   onTriggerScan, onTriggerIntegration, onTriggerGaps, onTriggerHealing,
   chatMessages, selectedAgent, onSelectAgent, onTerminalSend
}) => {
   const [withdrawalState, setWithdrawalState] = useState<WithdrawalReport | null>(null);
   const [isAutoMode, setIsAutoMode] = useState(false);
   const [walletInput, setWalletInput] = useState("");
   const [isWalletValidating, setIsWalletValidating] = useState(false);
   const [validatedWallet, setValidatedWallet] = useState<string | null>(null);

   useEffect(() => {
      const loadVault = async () => {
         const report = await detectAndCalibrateVault();
         setWithdrawalState(report);
         setIsAutoMode(report.autoWithdrawal.enabled);
      };
      loadVault();
   }, []);

   const validateWallet = async () => {
      if (!walletInput.startsWith("0x") || walletInput.length !== 42) return;
      setIsWalletValidating(true);
      await new Promise(r => setTimeout(r, 1500));
      setValidatedWallet(walletInput);
      setIsWalletValidating(false);
   };

   const handleWithdraw = () => {
      if (!validatedWallet && !isAutoMode) return;
      alert("Withdrawal Sequence Initiated: Handshaking with execution layer...");
   };

   // Mock Profit Metrics
   const metrics = {
      profitPerHour: "$412.80",
      profitPerTrade: "$8.45",
      tradesPerHour: "48.2",
      totalProfit: "$12,450.85"
   };

   const [manifest, setManifest] = useState({ fullName: '', email: '', brandName: '' });
   const [isForging, setIsForging] = useState(false);
   const [forgeProgress, setForgeProgress] = useState(0);
   const [forgeStatus, setForgeStatus] = useState("Initializing System...");
   const [dnaDelivered, setDnaDelivered] = useState<DNASheet | null>(null);

   const isDataComplete = manifest.fullName.trim().length > 3 && manifest.email.includes('@') && manifest.brandName.trim().length > 2;

   const handleOneClickRun = async () => {
      if (!isDataComplete) return;
      setIsForging(true);
      setForgeProgress(0);
      const variantId = `SOV-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
      onStartSynthesis({ ...profile, name: manifest.fullName, email: manifest.email, brandName: manifest.brandName, variantId });
      const deploymentSteps = ["Compiling Solidity Contracts...", "Optimizing Bytecode...", "Deploying AineonFlashLoan.sol...", "Verifying Source...", "Linking Oracles...", "Injecting Liquidity...", "Finalizing Instance..."];
      for (let i = 0; i < deploymentSteps.length; i++) {
         setForgeStatus(deploymentSteps[i]);
         setForgeProgress(Math.floor(((i + 1) / deploymentSteps.length) * 100));
         await new Promise(r => setTimeout(r, 800));
      }
      const finalDNA: DNASheet = {
         brandName: manifest.brandName,
         variantId,
         engineCoreDNA: { latencyBenchmark: "0.042ms", mevShieldStrength: "99.98%", atomicCohesion: "100%", gasEfficiency: "Elite-v9" },
         forgeSignature: "AION-GENESIS-0x" + Math.random().toString(16).slice(2, 12).toUpperCase(),
         blockAnchor: 19452312
      };
      setDnaDelivered(finalDNA);
      setIsForging(false);
   };

   const handleDeliverAndLaunch = () => {
      if (dnaDelivered) {
         onFinalDelivery(dnaDelivered);
         onToggleView();
      }
   };

   return (
      <div className="min-h-screen flex flex-col bg-[#020204] text-slate-200 font-sans">
         <CommandBar telemetry={telemetry} branding={{ brandName: manifest.brandName || 'AION V IX', primaryColor: '#00A3FF', isWhiteLabeled: !!manifest.brandName }} />

         <div className="flex-1 flex overflow-hidden">
            <main className="flex-1 overflow-y-auto custom-scrollbar p-10 space-y-12 pb-40">
               <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/5 pb-10 gap-6">
                  <div className="space-y-2">
                     <h1 className="text-6xl font-black text-white uppercase tracking-tighter leading-none">
                        Executive <span className="text-[#D4AF37]">Command Center</span>
                     </h1>
                     <p className="text-[11px] text-slate-500 uppercase font-black tracking-[1em]">SOVEREIGN WITHDRAWAL & PROFIT PROTOCOL</p>
                  </div>
               </div>

               {/* Profit Metrics Grid */}
               <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <MetricCard label="Profit Velocity" value={metrics.profitPerHour} sub="per hour // sync" />
                  <MetricCard label="Trade Efficiency" value={metrics.profitPerTrade} sub="avg per trade" color="text-emerald-400" />
                  <MetricCard label="Execution Rate" value={metrics.tradesPerHour} sub="trades / hour" color="text-amber-400" />
                  <MetricCard label="Total Harvested" value={metrics.totalProfit} sub="realized yield" color="text-[#D4AF37]" />
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  {/* Withdrawal System */}
                  <div className="lg:col-span-7 space-y-8">
                     <div className="p-10 glass rounded-[3rem] border border-[#D4AF37]/20 bg-[#D4AF37]/5 relative overflow-hidden">
                        <div className="flex justify-between items-center mb-10">
                           <h3 className="text-xs font-black text-[#D4AF37] uppercase tracking-[0.6em]">Profit Withdrawal System</h3>
                           <div className="flex bg-white/5 p-1 rounded-full border border-white/10">
                              <button onClick={() => setIsAutoMode(false)} className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${!isAutoMode ? 'bg-[#D4AF37] text-black' : 'text-slate-500'}`}>Manual</button>
                              <button onClick={() => setIsAutoMode(true)} className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${isAutoMode ? 'bg-emerald-500 text-black' : 'text-slate-500'}`}>Auto</button>
                           </div>
                        </div>

                        {isAutoMode ? (
                           <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
                              <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                                 <div className="flex items-center gap-4 mb-4">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Auto-Relay Active</span>
                                 </div>
                                 <div className="flex justify-between items-end">
                                    <div className="space-y-1">
                                       <span className="text-[9px] text-slate-500 uppercase font-black">Detected Vault</span>
                                       <div className="text-sm font-mono text-white break-all">{withdrawalState?.activeAddress || 'Scanning...'}</div>
                                    </div>
                                    <div className="text-right">
                                       <span className="text-[9px] text-slate-500 uppercase font-black">Threshold</span>
                                       <div className="text-xl font-mono font-black text-emerald-400">${withdrawalState?.autoWithdrawal.threshold}</div>
                                    </div>
                                 </div>
                              </div>
                              <p className="text-[10px] text-slate-500 italic">"Sovereign engine will automatically flush profits to the detected vault once the threshold is exceeded."</p>
                           </div>
                        ) : (
                           <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
                              <div className="space-y-4">
                                 <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-2">Execution Target (Wallet Address)</label>
                                 <div className="flex gap-4">
                                    <input
                                       placeholder="0x..."
                                       value={walletInput}
                                       onChange={(e) => setWalletInput(e.target.value)}
                                       className="flex-1 bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-sm font-mono text-blue-400 outline-none focus:border-[#D4AF37]/50"
                                    />
                                    <button 
                                       onClick={validateWallet}
                                       disabled={isWalletValidating}
                                       className="px-8 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all"
                                    >
                                       {isWalletValidating ? 'Verifying...' : 'Validate'}
                                    </button>
                                 </div>
                              </div>
                              {validatedWallet && (
                                 <div className="p-6 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-2xl flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                       <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                       <span className="text-[10px] font-black text-white uppercase tracking-widest">Identity Validated: Sovereign Authorized</span>
                                    </div>
                                    <button onClick={handleWithdraw} className="px-8 py-3 bg-[#D4AF37] text-black rounded-xl text-[9px] font-black uppercase tracking-widest hover:scale-105 transition-all">Execute Transfer</button>
                                 </div>
                              )}
                           </div>
                        )}
                     </div>

                     <div className="p-8 glass rounded-[3rem] border border-white/5 bg-black/40">
                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] mb-8">Payout Telemetry</h3>
                        <div className="space-y-4">
                           {withdrawalState?.transactionHistory.map(tx => (
                              <div key={tx.id} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                                 <div className="flex flex-col">
                                    <span className="text-[10px] font-mono text-white">{tx.amount} ETH</span>
                                    <span className="text-[8px] font-mono text-slate-600 uppercase">To: {tx.destination.slice(0, 10)}...</span>
                                 </div>
                                 <div className="flex items-center gap-2">
                                    <div className={`w-1 h-1 rounded-full ${tx.status === 'Confirmed' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{tx.status}</span>
                                 </div>
                              </div>
                           ))}
                           {withdrawalState?.transactionHistory.length === 0 && (
                              <div className="text-center py-10 opacity-20">
                                 <span className="text-[10px] font-black uppercase tracking-widest">No Recent Payouts</span>
                              </div>
                           )}
                        </div>
                     </div>
                  </div>

                  {/* Identity Layer */}
                  <div className="lg:col-span-5 space-y-8">
                     <div className="p-10 glass rounded-[3rem] border border-white/5 bg-gradient-to-br from-blue-900/10 to-transparent">
                        <h3 className="text-[10px] font-black text-white uppercase tracking-[0.5em] mb-10">System Identity Projection</h3>
                        <div className="space-y-6">
                           <div className="space-y-2">
                              <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-2">Architect</label>
                              <input
                                 placeholder="Full Name"
                                 value={manifest.fullName}
                                 onChange={(e) => setManifest({ ...manifest, fullName: e.target.value })}
                                 className="w-full bg-[#050508] border border-white/10 rounded-2xl px-6 py-4 text-sm font-mono text-blue-400 outline-none"
                              />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-2">Secure Relay</label>
                              <input
                                 placeholder="Relay Email"
                                 value={manifest.email}
                                 onChange={(e) => setManifest({ ...manifest, email: e.target.value })}
                                 className="w-full bg-[#050508] border border-white/10 rounded-2xl px-6 py-4 text-sm font-mono text-blue-400 outline-none"
                              />
                           </div>
                           <button
                              onClick={handleOneClickRun}
                              disabled={!isDataComplete || isForging}
                              className={`w-full py-6 rounded-3xl text-[10px] font-black uppercase tracking-[0.8em] transition-all ${isDataComplete ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-white/5 text-slate-700 cursor-not-allowed opacity-40'}`}
                           >
                              {isForging ? 'Synthesizing...' : 'Re-Initialize Core'}
                           </button>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="space-y-12">
                  <h3 className="text-sm font-black text-slate-500 uppercase tracking-[0.6em] px-4">Engine Components</h3>
                  <ModuleGrid
                     modules={modules}
                     onBuild={onBuildModule}
                     onAudit={onAuditModule}
                     onTrainModule={onTrainModule}
                     onForgeModule={onForgeModule}
                     onOpenConsole={onOpenConsole}
                     onInvestigate={onDeepInvestigate}
                  />
               </div>
            </main>

            <aside className="w-[500px] border-l border-white/5 bg-[#030306]/80 backdrop-blur-3xl flex flex-col hidden 2xl:flex">
               <Terminal
                  messages={chatMessages}
                  selectedAgent={selectedAgent}
                  onSendMessage={onTerminalSend}
                  onSelectAgent={onSelectAgent}
                  agents={SPECIALIST_AGENTS}
               />
            </aside>
         </div>
      </div>
   );
};

export default ExecutiveDashboard;
