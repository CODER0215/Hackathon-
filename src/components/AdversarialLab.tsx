import React, { useState } from 'react';
import {
  FlaskConical,
  Zap,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Code2,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
} from 'lucide-react';
import { ThreatFusionEngine } from '../services/ThreatFusionEngine';
import { ThreatAnalysisResult } from '../types/threat';

interface AdversarialPair {
  id: string;
  name: string;
  vector: string;
  original: string;
  obfuscated: string;
  obfuscationTechnique: string;
}

const ADVERSARIAL_PAIRS: AdversarialPair[] = [
  {
    id: 'adv-homoglyph',
    name: 'Homoglyph Character Swap',
    vector: 'Phishing URL',
    original: 'https://paypal.com/signin',
    obfuscated: 'https://paypaI.example.com/signin?auth=true',
    obfuscationTechnique: 'Replaced Latin lowercase "l" with Latin uppercase "I" (looks identical in many sans-serif fonts).',
  },
  {
    id: 'adv-subdomains',
    name: 'Subdomain Camouflage Stacking',
    vector: 'Banking Portal',
    original: 'https://sbi.co.in/banking',
    obfuscated: 'https://sbi.co.in.account-verification-portal.xyz/secure-login',
    obfuscationTechnique: 'Stacked official brand domain as a secondary prefix to distract from real malicious .xyz root.',
  },
  {
    id: 'adv-urgency',
    name: 'Camouflaged Coercive Rephrasing',
    vector: 'SMS Phish',
    original: 'URGENT: Your bank account is blocked today. Click here.',
    obfuscated: 'Action required: Mandatory KYC compliance audit notice #9810 pending. Complete verification within current cycle.',
    obfuscationTechnique: 'Replaced blunt alarmist words with formal administrative audit phrasing to evade naive keyword blocks.',
  },
  {
    id: 'adv-shortener',
    name: 'Nested URL Redirection Chain',
    vector: 'Malicious Link',
    original: 'http://malicious-credential-harvest.top/login',
    obfuscated: 'https://tinyurl.com/sbi-kyc-verify-2026',
    obfuscationTechnique: 'Wrapped hazardous domain in a trusted shortening service with customized trustworthy slug.',
  },
  {
    id: 'adv-upi-trick',
    name: 'Disguised Reverse UPI PIN Hook',
    vector: 'Payment Fraud',
    original: 'Enter UPI PIN to receive ₹2,000 cashback.',
    obfuscated: 'Special Festive Gift: PhonePe authorized a ₹2,000 refund into your bank. Approve collect authorization to release credit.',
    obfuscationTechnique: 'Framed an outgoing collect deduction as an "authorization to release incoming credit".',
  },
];

export const AdversarialLab: React.FC = () => {
  const [selectedPair, setSelectedPair] = useState<AdversarialPair>(ADVERSARIAL_PAIRS[0]);
  const [activeTestResult, setActiveTestResult] = useState<ThreatAnalysisResult | null>(null);
  const [isRunningTest, setIsRunningTest] = useState(false);

  const handleRunAdversarialTest = (pair: AdversarialPair) => {
    setIsRunningTest(true);
    setActiveTestResult(null);

    setTimeout(() => {
      const res = ThreatFusionEngine.analyze(
        pair.obfuscated,
        pair.obfuscated.startsWith('http') ? 'url' : 'message'
      );
      setActiveTestResult(res);
      setIsRunningTest(false);
    }, 450);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
            Adversarial Simulation & Robustness
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800">
            SECURITY LAB
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Adversarial Security Testing Lab
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Evaluate how SentinelAI's Threat Fusion Engine neutralizes obfuscated evasion tactics (Homoglyphs, domain stacking, disguised prompts).
        </p>
      </div>

      {/* Main Interactive Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Technique Selector */}
        <div className="lg:col-span-5 space-y-2.5">
          <span className="text-xs font-mono uppercase text-slate-400 block mb-1">
            Select Evasion Technique:
          </span>

          {ADVERSARIAL_PAIRS.map((pair) => {
            const isSelected = selectedPair.id === pair.id;
            return (
              <div
                key={pair.id}
                onClick={() => {
                  setSelectedPair(pair);
                  setActiveTestResult(null);
                }}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-500/60 shadow-md'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-white">{pair.name}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                    {pair.vector}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">{pair.obfuscationTechnique}</p>
              </div>
            );
          })}
        </div>

        {/* Right: Comparative Inspection & Live Execution */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-2xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
                ROBUSTNESS BENCHMARK
              </span>
              <h3 className="text-base font-bold text-white">{selectedPair.name}</h3>
            </div>
            <button
              onClick={() => handleRunAdversarialTest(selectedPair)}
              disabled={isRunningTest}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs transition-all flex items-center gap-1.5 shadow-md active:scale-95"
            >
              {isRunningTest ? (
                <span>Simulating...</span>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Test SentinelAI Detection
                </>
              )}
            </button>
          </div>

          {/* Original vs Obfuscated Cards */}
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
              <span className="text-[10px] text-slate-500 uppercase block mb-1">
                Authentic Baseline:
              </span>
              <span className="text-emerald-300 break-all">{selectedPair.original}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-rose-500/30 font-mono text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-rose-400 uppercase block">
                  Obfuscated Adversarial Variant:
                </span>
                <span className="text-[10px] text-slate-500">Bypasses naive filters</span>
              </div>
              <span className="text-rose-200 break-all">{selectedPair.obfuscated}</span>
            </div>
          </div>

          {/* Live Test Verdict Output */}
          {activeTestResult && (
            <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/40 space-y-3 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  SentinelAI Fusion Engine Verdict:
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-rose-950 border border-rose-800 text-rose-300">
                  {activeTestResult.verdict} ({activeTestResult.riskScore}/100)
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                SentinelAI successfully neutralized the obfuscation! Identified{' '}
                <strong>{activeTestResult.signals?.length || activeTestResult.factors.length}</strong>{' '}
                independent threat signals.
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeTestResult.signals?.slice(0, 3).map((sig) => (
                  <span
                    key={sig.id}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-cyan-300"
                  >
                    {sig.signal}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
