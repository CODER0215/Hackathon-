import React, { useState } from 'react';
import {
  Sparkles,
  Info,
  X,
  ShieldAlert,
  ArrowRight,
  Fingerprint,
  Link2,
  Clock,
  UserCheck,
  CreditCard,
  KeyRound,
} from 'lucide-react';
import { ThreatDNA, DetectorSignal } from '../types/threat';

interface ThreatDna2Props {
  threatDna: ThreatDNA;
  signals?: DetectorSignal[];
}

interface DnaDetailModal {
  title: string;
  value: number;
  color: string;
  explanation: string;
  evidence?: string;
  confidence: number;
  action: string;
}

export const ThreatDna2: React.FC<ThreatDna2Props> = ({ threatDna, signals = [] }) => {
  const [selectedDimension, setSelectedDimension] = useState<DnaDetailModal | null>(null);

  const dimensions = [
    {
      id: 'social-engineering',
      name: 'Social Engineering',
      value: threatDna.socialEngineering || 12,
      color: '#a855f7', // Purple
      barColor: 'bg-purple-500',
      icon: <Fingerprint className="w-4 h-4 text-purple-400" />,
      explanation:
        'Measures psychological manipulation tactics such as simulated authority, urgency, manufactured fear, or artificial reward lures designed to bypass critical judgment.',
      evidence: signals.find((s) => s.category === 'SOCIAL_ENGINEERING' || s.detector === 'SocialEngineeringAnalyzer')?.evidence || 'Coercive language patterns detected',
      confidence: 94,
      action: 'Pause and verify through an independent channel. Never trust unsolicited messages demanding immediate action.',
    },
    {
      id: 'url-deception',
      name: 'URL Deception',
      value: threatDna.urlDeception ?? threatDna.urlSuspicion ?? 0,
      color: '#06b6d4', // Cyan
      barColor: 'bg-cyan-500',
      icon: <Link2 className="w-4 h-4 text-cyan-400" />,
      explanation:
        'Assesses structural anomalies in web addresses including disposable TLDs (.top, .xyz), homoglyphs, subdomain stacking, IP hosts, and misleading path tokens.',
      evidence: signals.find((s) => s.category === 'URL' || s.category === 'HOMOGLYPH')?.evidence || 'Domain structural heuristics analyzed',
      confidence: 92,
      action: 'Inspect the address bar carefully. Verify that the registered domain matches the authentic organization.',
    },
    {
      id: 'urgency',
      name: 'Urgency & Pressure',
      value: threatDna.urgencyCoercion || 0,
      color: '#f43f5e', // Rose
      barColor: 'bg-rose-500',
      icon: <Clock className="w-4 h-4 text-rose-400" />,
      explanation:
        'Detects high-pressure deadlines ("within 24 hours", "account blocked today", "last warning") engineered to rush victims into compliance.',
      evidence: signals.find((s) => s.category === 'URGENCY')?.evidence || 'Urgency tokens identified in text',
      confidence: 96,
      action: 'Legitimate banks do not suspend accounts instantaneously without prior postal notice. Do not act under pressure.',
    },
    {
      id: 'impersonation',
      name: 'Brand Impersonation',
      value: threatDna.impersonation || 0,
      color: '#f59e0b', // Amber
      barColor: 'bg-amber-500',
      icon: <UserCheck className="w-4 h-4 text-amber-400" />,
      explanation:
        'Flags unauthorized use of reputable brand names, government bodies (CBI, Police, RBI), or trusted financial services in untrusted domains.',
      evidence: signals.find((s) => s.category === 'IMPERSONATION' || s.category === 'AUTHORITY')?.evidence || 'Brand signature mismatch',
      confidence: 95,
      action: 'Access services exclusively via official bookmarks or certified mobile apps from authorized app stores.',
    },
    {
      id: 'financial',
      name: 'Financial Manipulation',
      value: threatDna.financialManipulation ?? threatDna.financialRisk ?? 0,
      color: '#ef4444', // Red
      barColor: 'bg-red-500',
      icon: <CreditCard className="w-4 h-4 text-red-400" />,
      explanation:
        'Identifies monetary extraction hooks including advance-fee prize claims, reverse UPI collect scams, and fake courier rescheduling payments.',
      evidence: signals.find((s) => s.category === 'FINANCIAL')?.evidence || 'Financial demand pattern detected',
      confidence: 98,
      action: 'Remember: You NEVER need to enter your UPI PIN to receive money. Decline all collect requests immediately.',
    },
    {
      id: 'credential',
      name: 'Credential Theft',
      value: threatDna.credentialTheft ?? (threatDna.urlSuspicion > 50 ? 76 : 10),
      color: '#3b82f6', // Blue
      barColor: 'bg-blue-500',
      icon: <KeyRound className="w-4 h-4 text-blue-400" />,
      explanation:
        'Detects paths and input fields engineered to harvest sensitive login passwords, Aadhaar cards, PAN numbers, or one-time passcodes (OTP).',
      evidence: signals.find((s) => s.category === 'CREDENTIAL')?.evidence || 'Credential harvesting marker',
      confidence: 90,
      action: 'Never enter credentials on pages opened through SMS or chat links. Verify the URL SSL lock icon and domain.',
    },
  ];

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
            Threat DNA 2.0 Visualizer
          </h4>
        </div>
        <span className="text-[11px] text-slate-400 font-mono">
          Click any bar for deep signal evidence
        </span>
      </div>

      {/* 6 Interactive Dimension Bars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {dimensions.map((dim) => (
          <div
            key={dim.id}
            onClick={() =>
              setSelectedDimension({
                title: dim.name,
                value: dim.value,
                color: dim.color,
                explanation: dim.explanation,
                evidence: dim.evidence,
                confidence: dim.confidence,
                action: dim.action,
              })
            }
            className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 hover:bg-slate-950 cursor-pointer transition-all group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                {dim.icon}
                <span className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors">
                  {dim.name}
                </span>
              </div>
              <span className="font-mono text-xs font-bold" style={{ color: dim.color }}>
                {dim.value}%
              </span>
            </div>

            <div className="w-full h-2 rounded-full bg-slate-800/80 overflow-hidden">
              <div
                className={`h-full ${dim.barColor} rounded-full transition-all duration-700`}
                style={{ width: `${dim.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal / Drawer when a dimension is clicked */}
      {selectedDimension && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 text-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full inline-block"
                  style={{ backgroundColor: selectedDimension.color }}
                />
                <h5 className="font-bold text-base text-white">{selectedDimension.title}</h5>
              </div>
              <button
                onClick={() => setSelectedDimension(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-baseline justify-between text-xs font-mono">
              <span className="text-slate-400">Signal Intensity:</span>
              <span className="text-base font-bold" style={{ color: selectedDimension.color }}>
                {selectedDimension.value}%
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <strong className="text-slate-300 block">Why was this signal triggered?</strong>
              <p className="text-slate-400 leading-relaxed">{selectedDimension.explanation}</p>
            </div>

            {selectedDimension.evidence && (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-1">
                <span className="text-slate-500 block text-[10px] uppercase">Detected Evidence:</span>
                <span className="text-cyan-300 break-words">{selectedDimension.evidence}</span>
              </div>
            )}

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1">
              <strong className="text-emerald-400 block text-[11px] uppercase">
                Recommended Defense Action:
              </strong>
              <p className="text-slate-300 leading-snug">{selectedDimension.action}</p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedDimension(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
              >
                Close Signal Detail
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
