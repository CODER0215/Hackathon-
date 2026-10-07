import React from 'react';
import {
  ShieldCheck,
  Zap,
  Lock,
  ArrowRight,
  Fingerprint,
  Cpu,
  Globe2,
  CheckCircle2,
  Radio,
  FileSearch,
} from 'lucide-react';
import { NavTab } from './Navbar';

interface HeroSectionProps {
  setActiveTab: (tab: NavTab) => void;
  onQuickDemo: (presetId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ setActiveTab, onQuickDemo }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 cyber-grid-bg">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-cyan-500/10 via-blue-600/10 to-indigo-500/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Status Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-md text-xs text-slate-300">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-emerald-400">Device Protection: ACTIVE</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400 hidden sm:inline">Zero-Cloud On-Device Analysis</span>
          </div>
        </div>

        {/* Hero Copy */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            Your First Line of Defense <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
              Against Digital Scams.
            </span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            SentinelAI analyzes suspicious links, messages and digital content in real time —
            with privacy-first, on-device intelligence. Your data is protected{' '}
            <strong className="text-cyan-300 font-medium">before</strong> it becomes a victim.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setActiveTab('scanner')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-950/60 transition-all hover:shadow-cyan-500/25 active:scale-95"
            >
              <FileSearch className="w-4 h-4 text-slate-950" />
              Scan a Threat
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>

            <button
              onClick={() => setActiveTab('live-stream')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700/80 transition-all active:scale-95"
            >
              <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
              Live Attack Simulation
            </button>

            <button
              onClick={() => setActiveTab('architecture')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 text-slate-300 font-medium text-sm border border-slate-800 transition-all"
            >
              <Cpu className="w-4 h-4 text-slate-400" />
              Tech Architecture
            </button>
          </div>
        </div>

        {/* Interactive Architecture Flowchart */}
        <div className="mt-12 max-w-5xl mx-auto p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800/90 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 px-3 py-1 bg-cyan-950/80 border-b border-l border-cyan-800/60 rounded-bl-lg text-[11px] font-mono text-cyan-300">
            PIPELINE FLOW: ZERO-LEAKAGE
          </div>

          <div className="text-center sm:text-left mb-6">
            <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              Interactive Defense Pipeline
            </h2>
            <p className="text-lg font-semibold text-white mt-1">
              How SentinelAI neutralizes threats without leaking data
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
            {/* Step 1 */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/50 transition-all group">
              <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 mb-3 group-hover:bg-cyan-950 group-hover:text-cyan-400 transition-colors">
                <span className="font-mono text-xs font-bold">01</span>
              </div>
              <h3 className="text-sm font-bold text-white mb-1">USER INPUT</h3>
              <p className="text-xs text-slate-400 leading-snug">
                Suspicious SMS, URL, UPI message, email, or scanned QR.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/50 transition-all group">
              <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 mb-3 group-hover:bg-cyan-950 group-hover:text-cyan-400 transition-colors">
                <Lock className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">PRIVATE LOCAL ENGINE</h3>
              <p className="text-xs text-slate-400 leading-snug">
                Client-side regex, semantic tokenization & PII redaction.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/50 transition-all group">
              <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 mb-3 group-hover:bg-cyan-950 group-hover:text-cyan-400 transition-colors">
                <Fingerprint className="w-4 h-4 text-blue-400" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">AI THREAT ENGINE</h3>
              <p className="text-xs text-slate-400 leading-snug">
                Punycode, lookalike heuristics & India fraud dictionaries.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/50 transition-all group">
              <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 mb-3 group-hover:bg-cyan-950 group-hover:text-cyan-400 transition-colors">
                <Zap className="w-4 h-4 text-amber-400" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">RISK & THREAT DNA</h3>
              <p className="text-xs text-slate-400 leading-snug">
                0-100 composite scoring across 5 distinct deception dimensions.
              </p>
            </div>

            {/* Step 5 */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/50 transition-all group">
              <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 mb-3 group-hover:bg-cyan-950 group-hover:text-cyan-400 transition-colors">
                <ShieldCheck className="w-4 h-4 text-rose-400" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">ACTIONABLE DEFENSE</h3>
              <p className="text-xs text-slate-400 leading-snug">
                Clear plain-language explanation and immediate incident steps.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Demo Launchpad */}
        <div className="mt-10 max-w-4xl mx-auto text-center">
          <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
            Quick Test: Click a realistic hackathon scenario to scan immediately
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'demo-kyc', label: '🏦 Fake Bank KYC', color: 'hover:border-rose-500/70' },
              { id: 'demo-upi', label: '💸 PhonePe ₹50,000 Fraud', color: 'hover:border-amber-500/70' },
              { id: 'demo-digital-arrest', label: '⚖️ Digital Arrest Scam', color: 'hover:border-rose-500/70' },
              { id: 'demo-gujarati-kyc', label: '🇮🇳 ગુજરાતી બેંક સ્કેમ', color: 'hover:border-cyan-500/70' },
              { id: 'demo-safe-seminar', label: '🎓 Safe College Notice', color: 'hover:border-emerald-500/70' },
            ].map((preset) => (
              <button
                key={preset.id}
                onClick={() => onQuickDemo(preset.id)}
                className={`px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white transition-all ${preset.color} active:scale-95`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800">
            <div className="flex items-center gap-3 mb-2">
              <Lock className="w-5 h-5 text-cyan-400" />
              <h4 className="text-sm font-bold text-white">100% On-Device First</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sensitive messages and URLs evaluate in browser memory. Zero plaintext transmission to external cloud services.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800">
            <div className="flex items-center gap-3 mb-2">
              <Globe2 className="w-5 h-5 text-blue-400" />
              <h4 className="text-sm font-bold text-white">India Fraud Matrix</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Specialized models for UPI PIN theft, Digital Arrest extortion, fake courier fees, and multi-lingual regional scams.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <h4 className="text-sm font-bold text-white">&lt;15ms Latency</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Blazing fast deterministic heuristic engine executes without waiting for network round-trips or cold starts.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h4 className="text-sm font-bold text-white">Explainable AI</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Never just a "dangerous" tag. Transparent Threat DNA breakdown reveals urgency, impersonation, and social engineering.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
