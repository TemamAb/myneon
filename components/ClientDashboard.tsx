
import React, { useState, useEffect } from 'react';
import { TraderEngineStats, ClientProfile } from '../types';

interface Props {
  profile: ClientProfile;
  onToggleView: () => void;
  isEngineActive?: boolean;
  engineStats: TraderEngineStats;
}

const ClientDashboard: React.FC<Props> = ({ profile, onToggleView, engineStats: initialStats }) => {
  const [stats, setStats] = useState<TraderEngineStats>(initialStats);
  const [blockHeight, setBlockHeight] = useState(19452312);
  const [marketTrend, setMarketTrend] = useState(0);
  // NEW: Trader Mode Sub-States
  const [traderMode, setTraderMode] = useState<'SIMULATION' | 'LIVE'>('SIMULATION');

  // SIMULATION ENGINE (Active only in SIMULATION mode)
  useEffect(() => {
    if (traderMode !== 'SIMULATION') return;

    const interval = setInterval(() => {
      setBlockHeight(prev => prev + 1);
      setMarketTrend(prev => Math.max(-1, Math.min(1, prev + (Math.random() - 0.5) * 0.2)));
      setStats(prev => {
        const volatility = 0.85;
        const drift = 0.05;
        const shock = (Math.random() - 0.5 + drift + (marketTrend * 0.1)) * volatility;
        return { ...prev, realizedProfit: prev.realizedProfit + Math.max(0, shock) };
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [marketTrend, traderMode]);

  // LIVE MODE LISTENER (Placeholder for Real Contract Events)
  useEffect(() => {
    if (traderMode !== 'LIVE') return;
    // In a real app, this would use ethers.js/wagmi to listen to the deployed AineonFlashLoan.sol
    const interval = setInterval(() => {
      setBlockHeight(prev => prev + 1); // Real blocks move faster? No, strictly 12s on Mainnet
    }, 12000);
    return () => clearInterval(interval);
  }, [traderMode]);

  const isLive = traderMode === 'LIVE';

  return (
    <div className={`fixed inset-0 flex flex-col overflow-hidden font-sans transition-colors duration-1000 ${isLive ? 'bg-black text-amber-50 selection:bg-amber-500/30' : 'bg-[#020204] text-slate-200 selection:bg-blue-500/30'
      }`}>

      {/* HEADER */}
      <header className="w-full h-32 px-10 md:px-20 flex justify-between items-center z-50">
        <div className="flex flex-col">
          <h1 className={`text-2xl font-black uppercase tracking-tighter select-none ${isLive ? 'text-amber-500' : 'text-white'}`}>
            {profile.brandName || 'AION V IX'}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isLive ? 'bg-red-500' : 'bg-blue-500'}`}></div>
            <span className={`text-[9px] font-bold uppercase tracking-widest ${isLive ? 'text-red-500' : 'text-slate-500'}`}>
              {isLive ? 'MAINNET LIQUIDITY UPLINK' : 'SIMULATION MESH ACTIVE'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-8">
          {/* TRADER SUB-MODE TOGGLE */}
          <div className="flex bg-white/[0.03] p-1 rounded-full border border-white/5 backdrop-blur-md">
            <button
              onClick={() => setTraderMode('SIMULATION')}
              className={`px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${!isLive ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:text-white'
                }`}
            >
              Sim
            </button>
            <div className="w-px h-4 bg-white/10 my-auto mx-1"></div>
            <button
              onClick={() => setTraderMode('LIVE')}
              className={`px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${isLive ? 'bg-amber-600 text-black shadow-lg shadow-amber-500/20' : 'text-slate-500 hover:text-white'
                }`}
            >
              Live {isLive && <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span></span>}
            </button>
          </div>

          {/* VIEW TOGGLE */}
          <div className="flex bg-white/[0.03] p-1 rounded-full border border-white/5 backdrop-blur-md">
            <button onClick={onToggleView} className="px-8 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-all">
              System
            </button>
            <button className={`px-8 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-xl ${isLive ? 'bg-amber-500 text-black' : 'bg-white text-black'}`}>
              Trader
            </button>
          </div>
        </div>
      </header>

      {/* CORE DISPLAY */}
      <main className="flex-1 flex flex-col items-center justify-center relative px-20">
        {/* Dynamic Background */}
        <div className="absolute inset-0 pointer-events-none transition-opacity duration-1000">
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] blur-[150px] rounded-full animate-pulse-slow ${isLive ? 'bg-amber-600/[0.08]' : 'bg-blue-600/[0.03]'
            }`}></div>
        </div>

        <div className="w-full max-w-7xl flex flex-col items-center relative z-10">
          <div className="text-center space-y-4">
            <span className={`text-[10px] font-black uppercase tracking-[1.5em] block mb-12 ${isLive ? 'text-amber-500/50' : 'text-slate-600'}`}>
              {isLive ? 'LIVE LIQUIDITY YIELD' : 'PROJECTED SIMULATION YIELD'}
            </span>

            <div className="flex items-baseline justify-center gap-4 md:gap-10 scale-75 md:scale-100 transition-transform duration-500">
              <span className={`text-4xl md:text-6xl font-light tabular-nums select-none ${isLive ? 'text-amber-500' : 'text-slate-800'}`}>$</span>
              <div className={`text-[12rem] md:text-[18rem] lg:text-[20rem] font-black leading-none tracking-tighter wealth-pulse select-none tabular-nums font-feature-settings-zero transition-colors duration-500 ${isLive ? 'text-amber-500 drop-shadow-[0_0_100px_rgba(245,158,11,0.3)]' : 'text-white drop-shadow-[0_0_80px_rgba(255,255,255,0.05)]'
                }`}>
                {stats.realizedProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>

            <div className="pt-20 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
              <div className={`flex flex-col items-center gap-1 px-6 py-3 rounded-2xl border bg-white/[0.01] ${isLive ? 'border-amber-500/20' : 'border-white/5'}`}>
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Profit / Hr</span>
                <span className={`text-lg font-mono font-black ${isLive ? 'text-amber-400' : 'text-blue-400'}`}>$412.80</span>
              </div>
              <div className={`flex flex-col items-center gap-1 px-6 py-3 rounded-2xl border bg-white/[0.01] ${isLive ? 'border-amber-500/20' : 'border-white/5'}`}>
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Profit / Trade</span>
                <span className={`text-lg font-mono font-black ${isLive ? 'text-amber-400' : 'text-emerald-400'}`}>$8.45</span>
              </div>
              <div className={`flex flex-col items-center gap-1 px-6 py-3 rounded-2xl border bg-white/[0.01] ${isLive ? 'border-amber-500/20' : 'border-white/5'}`}>
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Trades / Hr</span>
                <span className={`text-lg font-mono font-black ${isLive ? 'text-amber-400' : 'text-amber-400'}`}>48.2</span>
              </div>
            </div>

            <div className="pt-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
              <div className={`flex items-center gap-3 px-6 py-2 rounded-full border bg-white/[0.01] ${isLive ? 'border-amber-500/20' : 'border-white/5'}`}>
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Protocol</span>
                <span className={`text-[9px] font-black uppercase tracking-widest ${isLive ? 'text-amber-400' : 'text-blue-400'}`}>AION-V9</span>
              </div>

              <div className="hidden md:block h-px w-12 bg-white/5"></div>

              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.2em]">Block</span>
                <span className={`text-[10px] font-mono uppercase tracking-[0.2em] ${isLive ? 'text-amber-500' : 'text-emerald-500'}`}>{blockHeight.toLocaleString()}</span>
              </div>

              <div className="hidden md:block h-px w-12 bg-white/5"></div>

              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Gas</span>
                <span className={`text-[9px] font-mono ${isLive ? 'text-amber-500' : 'text-slate-300'}`}>
                  {isLive ? '42 gwei' : '12 gwei'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full h-24 px-10 md:px-20 flex justify-between items-center opacity-30 hover:opacity-100 transition-opacity duration-700">
        <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.6em]">
          EXECUTION ENVIRONMENT: {profile.variantId || 'SOV-GEN-01'}
        </span>
        <div className="flex items-center gap-4">
          <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-amber-500' : 'bg-green-500'}`}></span>
          <span className="text-[8px] font-mono text-slate-600 uppercase tracking-[0.6em]">
            {isLive ? 'CAPITAL AT RISK' : 'SAFE MODE ACTIVE'}
          </span>
        </div>
      </footer>
    </div>
  );
};

export default ClientDashboard;
