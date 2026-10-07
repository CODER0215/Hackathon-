import React from 'react';
import {
  Activity,
  Cpu,
  Radio,
  Server,
  ShieldCheck,
  ShieldAlert,
  Zap,
  Terminal,
  Layers,
  Database,
  Lock,
} from 'lucide-react';
import { SecurityStats } from '../types/threat';

interface SocViewProps {
  stats: SecurityStats;
  offlineMode: boolean;
}

export const SocView: React.FC<SocViewProps> = ({ stats, offlineMode }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              Operational Telemetry
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800">
              SOC NODE: HEALTHY
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Security Operations Center (SOC) Health
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time telemetry on threat engine pipelines, local memory usage, and background detection layers.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span>SYSTEM HEARTBEAT: 100% UPTIME</span>
        </div>
      </div>

      {/* 5 Core Subsystem Status Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400">Detection Engine</span>
            <Cpu className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="text-sm font-bold text-emerald-400 font-mono">ONLINE</span>
          <span className="text-[10px] text-slate-500 block mt-1">V2 Threat Fusion</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400">Rule Engine</span>
            <Layers className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="text-sm font-bold text-emerald-400 font-mono">ACTIVE (64 RULES)</span>
          <span className="text-[10px] text-slate-500 block mt-1">Deterministic Regex</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400">Local Model</span>
            <Zap className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="text-sm font-bold text-emerald-400 font-mono">READY (IN-MEMORY)</span>
          <span className="text-[10px] text-slate-500 block mt-1">Vector Classifier</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400">Threat Intel</span>
            <Database className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="text-sm font-bold text-cyan-300 font-mono">SYNTHETIC FEED</span>
          <span className="text-[10px] text-slate-500 block mt-1">4 Campaigns Active</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400">Privacy Layer</span>
            <Lock className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="text-sm font-bold text-emerald-400 font-mono">STRICT AIR-GAP</span>
          <span className="text-[10px] text-slate-500 block mt-1">Zero Remote Leaks</span>
        </div>
      </div>

      {/* Real-Time Telemetry Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 flex items-center gap-1.5 font-bold">
              <Terminal className="w-4 h-4 text-cyan-400" />
              Engine Event Log (Simulated Daemon Trace)
            </h3>
            <span className="text-[10px] font-mono text-slate-500">POLLING AT 60 FPS</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2 max-h-64 overflow-y-auto">
            <p className="text-slate-400">[09:42:01.102] <span className="text-cyan-400">INIT</span> Threat Fusion Engine V2 mounted into browser thread.</p>
            <p className="text-slate-400">[09:42:01.144] <span className="text-emerald-400">CHECK</span> HomoglyphDetector initialized with Cyrillic & Greek confusion table.</p>
            <p className="text-slate-400">[09:42:02.012] <span className="text-emerald-400">CHECK</span> India Scam Matrix armed: UPI reverse PIN, Digital Arrest, India Post CVV.</p>
            <p className="text-slate-400">[09:42:04.288] <span className="text-cyan-400">PRIVACY</span> Zero-cloud telemetry invariant enforced: 0 bytes outbound.</p>
            <p className="text-slate-400">[09:42:06.812] <span className="text-emerald-400">HEALTH</span> Health Score index normalized at {stats.healthScore}/100.</p>
            <p className="text-slate-400">[09:42:08.919] <span className="text-cyan-400">MEMORY</span> Heuristic scratchpad allocated: 11.4 MB heap.</p>
          </div>
        </div>

        {/* Operational Highlights */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-2xl space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold mb-3">
              Performance Invariants
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Analysis Latency</span>
                <span className="font-mono text-cyan-300 font-bold">&lt;15 ms</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Active Campaign Feeds</span>
                <span className="font-mono text-white font-bold">4 Verified</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Memory Footprint</span>
                <span className="font-mono text-emerald-400 font-bold">~12 MB Heap</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Execution Runtime</span>
                <span className="font-mono text-cyan-300 font-bold">Client WebAssembly / V8</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 leading-snug">
            All algorithms execute inside browser sandbox memory. Zero reliance on cold starts or remote server latency.
          </div>
        </div>
      </div>
    </div>
  );
};
