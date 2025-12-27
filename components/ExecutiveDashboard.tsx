
import React, { useState, useEffect } from 'react';
import { ClientProfile, AssemblyState, MeshEvent, ModuleInfo, TelemetryStats, ChatMessage, SpecialistAgent, DNASheet } from '../types';
import Logo from './Logo';
import Tooltip from './Tooltip';
import ModuleGrid from './ModuleGrid';
import Terminal from './Terminal';
import CommandBar from './CommandBar';
import { SPECIALIST_AGENTS } from '../constants';

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

const DNAReticle: React.FC<{ label: string; value: string; unit: string }> = ({ label, value, unit }) => (
   <div className="relative p-6 glass border border-white/5 overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-blue-500/20 group-hover:bg-blue-500 transition-colors"></div>
      <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest block mb-1">{label}</span>
      <div className="flex items-baseline gap-2">
         <span className="text-xl font-mono font-black text-white">{value}</span>
         <span className="text-[9px] font-bold text-slate-500 uppercase">{unit}</span>
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
   const [manifest, setManifest] = useState({ fullName: '', email: '', brandName: '' });
   const [isForging, setIsForging] = useState(false);
   const [forgeProgress, setForgeProgress] = useState(0);
   const [forgeStatus, setForgeStatus] = useState("Initializing System...");
   const [dnaDelivered, setDnaDelivered] = useState<DNASheet | null>(null);

   const isDataComplete = manifest.fullName.trim().length > 3 && manifest.email.includes('@') && manifest.brandName.trim().length > 2;

   // The "ONE CLICK" Sovereign Run Sequence
   const handleOneClickRun = async () => {
      if (!isDataComplete) return;
      setIsForging(true);
      setForgeProgress(0);

      // Step 1: Initialize Manifest with Variant Identity
      const variantId = `SOV-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
      onStartSynthesis({ ...profile, name: manifest.fullName, email: manifest.email, brandName: manifest.brandName, variantId });

      // Step 2: High-Performance Synthesis Animation representing Deployment
      const deploymentSteps = [
         "Compiling Solidity Contracts...",
         "Optimizing Bytecode (Via-IR)...",
         "Deploying AineonFlashLoan.sol...",
         "Verifying Contract Source...",
         "Linking Oracle Oracles...",
         "Injecting Liquidity Routes...",
         "Finalizing Sovereign Instance..."
      ];

      for (let i = 0; i < deploymentSteps.length; i++) {
         setForgeStatus(deploymentSteps[i]);
         const progress = Math.floor(((i + 1) / deploymentSteps.length) * 100);
         setForgeProgress(progress);
         await new Promise(r => setTimeout(r, 800)); // Simulate work
      }

      const finalDNA: DNASheet = {
         brandName: manifest.brandName,
         variantId,
         engineCoreDNA: {
            latencyBenchmark: "0.042ms",
            mevShieldStrength: "99.98%",
            atomicCohesion: "100%",
            gasEfficiency: "Elite-v9"
         },
         forgeSignature: "AION-GENESIS-0x" + Math.random().toString(16).slice(2, 12).toUpperCase(),
         blockAnchor: 19452312
      };

      setDnaDelivered(finalDNA);
      setIsForging(false);
   };

   const handleDeliverAndLaunch = () => {
      if (dnaDelivered) {
         onFinalDelivery(dnaDelivered);
         onToggleView(); // Switch to the rebranded Trader Mode
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
                        Sovereign <span className="text-blue-500">Synthesis Hub</span>
                     </h1>
                     <p className="text-[11px] text-slate-500 uppercase font-black tracking-[1em]">
                        VARIANT INSTANTIATION PROTOCOL ACTIVE
                     </p>
                  </div>
                  <div className="flex items-center gap-4 px-6 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                     <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
                     <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Sovereign Benchmark Status: Active</span>
                  </div>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                  {/* Engine Core Physics (Shared Identity) */}
                  <div className="lg:col-span-4 space-y-8">
                     <div className="p-8 glass rounded-[3rem] border border-blue-500/20 bg-blue-600/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full"></div>
                        <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.5em] mb-8">AION Kernel DNA</h3>
                        <div className="grid grid-cols-2 gap-4">
                           <DNAReticle label="Latency" value="0.042" unit="ms" />
                           <DNAReticle label="MEV Shield" value="99.98" unit="%" />
                           <DNAReticle label="Efficiency" value="Elite" unit="v9" />
                           <DNAReticle label="Cohesion" value="5/5" unit="act" />
                        </div>
                        <div className="mt-8 pt-8 border-t border-white/5 text-[9px] text-slate-500 font-mono italic">
                           CORE: ATOMIC_SETTLE_07_ALPHA_IX
                        </div>
                     </div>

                     <div className="p-8 glass rounded-[3rem] border border-white/5 bg-black/40">
                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] mb-8">Synthesis Mesh Units</h3>
                        <div className="space-y-6">
                           {SPECIALIST_AGENTS.map(agent => (
                              <div key={agent.id} className="flex items-center justify-between">
                                 <div className="flex items-center gap-3">
                                    <span className="text-xl">{agent.icon}</span>
                                    <span className="text-[10px] font-bold text-white uppercase">{agent.name}</span>
                                 </div>
                                 <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                    <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Linked</span>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>

                  {/* Entity Synthesis & Run Control */}
                  <div className="lg:col-span-8 space-y-10">
                     <div className="p-12 glass rounded-[4rem] border border-white/5 bg-gradient-to-br from-blue-900/10 to-transparent relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
                        <h3 className="text-xs font-black text-white uppercase tracking-[0.6em] mb-12">Entity Identity Synthesis</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-2">Architect Principal</label>
                              <input
                                 placeholder="Full Name"
                                 value={manifest.fullName}
                                 onChange={(e) => setManifest({ ...manifest, fullName: e.target.value })}
                                 className="w-full bg-[#050508] border border-white/10 rounded-2xl px-6 py-5 text-sm font-mono text-blue-400 outline-none focus:border-blue-500/50 transition-all"
                              />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-2">Secure Comms Relay</label>
                              <input
                                 placeholder="Relay Email"
                                 value={manifest.email}
                                 onChange={(e) => setManifest({ ...manifest, email: e.target.value })}
                                 className="w-full bg-[#050508] border border-white/10 rounded-2xl px-6 py-5 text-sm font-mono text-blue-400 outline-none focus:border-blue-500/50 transition-all"
                              />
                           </div>
                           <div className="md:col-span-2 space-y-2">
                              <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-2">Variant Identity Projection</label>
                              <input
                                 placeholder="Variant Name (e.g., QUANTUM ARB)"
                                 value={manifest.brandName}
                                 onChange={(e) => setManifest({ ...manifest, brandName: e.target.value })}
                                 className="w-full bg-[#050508] border border-[#D4AF37]/30 rounded-2xl px-6 py-5 text-xl font-mono font-black text-[#D4AF37] outline-none focus:border-[#D4AF37]/60 transition-all text-center tracking-tighter"
                              />
                              <p className="text-[9px] text-slate-700 text-center uppercase tracking-widest mt-2">Core physics remain AION constant. Identity will be synthesized into the execution layer.</p>
                           </div>
                        </div>

                        {/* ONE CLICK ACTION */}
                        <div className="mt-16 space-y-8">
                           {isForging ? (
                              <div className="space-y-4">
                                 <div className="flex justify-between items-end">
                                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{forgeStatus}</span>
                                    <span className="text-2xl font-mono font-black text-white">{forgeProgress}%</span>
                                 </div>
                                 <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                    <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${forgeProgress}%` }}></div>
                                 </div>
                              </div>
                           ) : dnaDelivered ? (
                              <div className="p-10 bg-emerald-500/5 border border-emerald-500/30 rounded-[3rem] text-center animate-in zoom-in duration-1000">
                                 <h4 className="text-2xl font-black text-emerald-400 uppercase tracking-tighter mb-4">Synthesis Confirmed</h4>
                                 <p className="text-xs text-slate-400 italic mb-8">"Variant Identity: {dnaDelivered.brandName} successfully instantiated on AION core."</p>
                                 <button
                                    onClick={handleDeliverAndLaunch}
                                    className="px-16 py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] transition-all shadow-xl shadow-emerald-500/20"
                                 >
                                    Receive DNA Manifest & Run
                                 </button>
                              </div>
                           ) : (
                              <button
                                 onClick={handleOneClickRun}
                                 disabled={!isDataComplete}
                                 className={`w-full py-8 rounded-[3rem] text-[14px] font-black uppercase tracking-[1em] transition-all shadow-2xl active:scale-95 ${isDataComplete ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/40' : 'bg-white/5 text-slate-700 border border-white/5 cursor-not-allowed opacity-40'
                                    }`}
                              >
                                 INITIALIZE SOVEREIGN RUN
                              </button>
                           )}
                        </div>
                     </div>
                  </div>
               </div>

               <div className="space-y-12">
                  <h3 className="text-sm font-black text-slate-500 uppercase tracking-[0.6em] px-4">Cluster Unit Dissection</h3>
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

         {/* Sovereign DNA Manifest Overlay */}
         {dnaDelivered && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-10 bg-black/95 backdrop-blur-3xl animate-in fade-in duration-500">
               <div className="glass w-full max-w-2xl p-16 rounded-[4rem] border border-[#D4AF37]/40 relative overflow-hidden shadow-[0_0_150px_rgba(212,175,55,0.2)]">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                     <Logo size={100} color="#D4AF37" />
                  </div>
                  <h2 className="text-4xl font-black text-[#D4AF37] uppercase tracking-tighter mb-4">SOVEREIGN DNA SHEET</h2>
                  <div className="h-px w-full bg-white/10 mb-10"></div>

                  <div className="space-y-8 mb-12">
                     <div className="grid grid-cols-2 gap-8">
                        <div>
                           <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest block mb-1">Variant Identity</span>
                           <span className="text-xl font-mono font-bold text-white">{dnaDelivered.brandName}</span>
                        </div>
                        <div className="text-right">
                           <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest block mb-1">Synthesis ID</span>
                           <span className="text-xl font-mono font-bold text-blue-400">{dnaDelivered.variantId}</span>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-6 bg-white/[0.02] p-8 rounded-3xl border border-white/5">
                        {Object.entries(dnaDelivered.engineCoreDNA).map(([k, v]) => (
                           <div key={k}>
                              <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest block mb-1">{k.replace(/([A-Z])/g, ' $1')}</span>
                              <span className="text-sm font-mono font-black text-white">{v}</span>
                           </div>
                        ))}
                     </div>

                     <div>
                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest block mb-2">Cryptographic Origin Seal</span>
                        <div className="text-[10px] font-mono text-[#D4AF37]/60 break-all leading-relaxed bg-black p-4 rounded-xl shadow-inner border border-white/5">
                           {dnaDelivered.forgeSignature}
                        </div>
                     </div>
                  </div>

                  <button
                     onClick={handleDeliverAndLaunch}
                     className="w-full py-6 bg-[#D4AF37] text-black rounded-2xl text-[12px] font-black uppercase tracking-[0.5em] transition-all hover:scale-105 active:scale-95"
                  >
                     INITIALIZE VARIANT PRODUCTION
                  </button>
               </div>
            </div>
         )}
      </div>
   );
};

export default ExecutiveDashboard;
