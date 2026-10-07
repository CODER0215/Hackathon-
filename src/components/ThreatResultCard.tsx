import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronUp,
  Languages,
  CheckCircle,
  Copy,
  ExternalLink,
  MessageSquareQuote,
  Clock,
  Sparkles,
  Lock,
  GitCommit,
  Network,
  HelpCircle,
} from 'lucide-react';
import { ThreatAnalysisResult, ThreatFactor, RecommendedAction } from '../types/threat';
import { ThreatDna2 } from './ThreatDna2';
import { AttackChainVisualizer } from './AttackChainVisualizer';
import { UrlDeceptionLab } from './UrlDeceptionLab';

interface ThreatResultCardProps {
  result: ThreatAnalysisResult;
  onAskCopilot: (contextResult: ThreatAnalysisResult) => void;
}

export const ThreatResultCard: React.FC<ThreatResultCardProps> = ({ result, onAskCopilot }) => {
  const [selectedLang, setSelectedLang] = useState<'en' | 'gu' | 'hi'>('en');
  const [expandedFactors, setExpandedFactors] = useState<Record<string, boolean>>({});
  const [completedActions, setCompletedActions] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);
  const [showFalsePositiveReview, setShowFalsePositiveReview] = useState(false);

  // Toggle factor expansion
  const toggleFactor = (id: string) => {
    setExpandedFactors((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Toggle action completion
  const toggleAction = (id: string) => {
    setCompletedActions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopySummary = () => {
    const textToCopy = `SentinelAI V2 Threat Report\nVerdict: ${result.verdict}\nRisk Score: ${result.riskScore}/100\nConfidence: ${result.confidence}%\nCategory: ${result.categoryLabel}\nSummary: ${result.summary}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Verdict style mapping
  const verdictConfig = {
    SAFE: {
      label: 'VERIFIED SAFE',
      bg: 'bg-emerald-950/40',
      border: 'border-emerald-500/50',
      text: 'text-emerald-400',
      icon: <ShieldCheck className="w-8 h-8 text-emerald-400" />,
      subtext: 'No active threat markers or phishing indicators detected.',
    },
    SUSPICIOUS: {
      label: 'SUSPICIOUS',
      bg: 'bg-amber-950/40',
      border: 'border-amber-500/50',
      text: 'text-amber-400',
      icon: <AlertTriangle className="w-8 h-8 text-amber-400" />,
      subtext: 'Contains anomalous or coercive language. Proceed with heightened caution.',
    },
    HIGH_RISK: {
      label: 'HIGH RISK',
      bg: 'bg-orange-950/40',
      border: 'border-orange-500/50',
      text: 'text-orange-400',
      icon: <ShieldAlert className="w-8 h-8 text-orange-400" />,
      subtext: 'Significant social engineering or suspicious domain patterns present.',
    },
    DANGEROUS: {
      label: 'DANGEROUS SCAM / PHISHING',
      bg: 'bg-rose-950/40',
      border: 'border-rose-500/60',
      text: 'text-rose-400',
      icon: <ShieldAlert className="w-8 h-8 text-rose-400 animate-pulse" />,
      subtext: 'Active fraud attempt detected. Do not click links, share OTPs, or transfer money.',
    },
  }[result.verdict];

  // Circular progress calculations
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (result.riskScore / 100) * circumference;

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#f43f5e'; // Rose
    if (score >= 60) return '#f97316'; // Orange
    if (score >= 30) return '#f59e0b'; // Amber
    return '#10b981'; // Emerald
  };

  const currentSummary =
    selectedLang === 'gu' && result.summaryGujarati
      ? result.summaryGujarati
      : selectedLang === 'hi' && result.summaryHindi
      ? result.summaryHindi
      : result.summary;

  return (
    <div className={`rounded-2xl border ${verdictConfig.border} ${verdictConfig.bg} backdrop-blur-xl p-5 sm:p-8 shadow-2xl transition-all space-y-6`}>
      {/* Top Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 shadow-inner">
            {verdictConfig.icon}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-xl sm:text-2xl font-extrabold tracking-tight ${verdictConfig.text}`}>
                {verdictConfig.label}
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                {result.categoryLabel}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">{verdictConfig.subtext}</p>
          </div>
        </div>

        {/* Engine and Privacy Badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-mono text-cyan-400 flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            100% On-Device · {result.analysisTimeMs}ms
          </span>
          <button
            onClick={handleCopySummary}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Copy Scan Summary"
          >
            {copied ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Campaign Match Alert if applicable */}
      {result.campaignMatch && (
        <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-800/60 flex items-start justify-between gap-3 text-xs">
          <div className="flex items-start gap-2.5 text-purple-200">
            <Network className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="block font-semibold">
                Correlated Scam Campaign: {result.campaignMatch.title}
              </strong>
              <p className="text-purple-300/80 mt-0.5">
                Shared indicators match {result.campaignMatch.relatedCount}+ regional intercepts targeting{' '}
                {result.campaignMatch.targetBrand}.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-900/60 text-purple-300 border border-purple-700 whitespace-nowrap">
            COORDINATED
          </span>
        </div>
      )}

      {/* Main Stats Grid: Circular Meter & DNA & Separated Scores */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Risk Score Circular Meter (Separating Risk != Confidence) */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-5 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="text-slate-800"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r={radius}
                stroke={getScoreColor(result.riskScore)}
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                style={{ transition: 'stroke-dashoffset 0.8s ease-in-out' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-white font-mono tracking-tight">
                {result.riskScore}
              </span>
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                Risk / 100
              </span>
            </div>
          </div>

          <div className="w-full mt-4 pt-3 border-t border-slate-800 grid grid-cols-2 text-center text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Digital Trust</span>
              <span className="font-mono font-bold text-white text-sm">
                {result.trustScore}/100
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]" title="Risk != Confidence">
                Confidence
              </span>
              <span className="font-mono font-bold text-cyan-400 text-sm">
                {result.confidence}%
              </span>
            </div>
          </div>
        </div>

        {/* Threat DNA 2.0 Component Embedded */}
        <div className="lg:col-span-8">
          <ThreatDna2 threatDna={result.threatDna} signals={result.signals} />
        </div>
      </div>

      {/* Attack Chain Visualizer Component Embedded */}
      {result.attackChain && result.attackChain.length > 0 && (
        <AttackChainVisualizer nodes={result.attackChain} verdict={result.verdict} />
      )}

      {/* URL Deception Lab Embedded (if URL is present) */}
      {result.urlDecomposition && (
        <UrlDeceptionLab decomposition={result.urlDecomposition} />
      )}

      {/* Multilingual Explanation Box */}
      <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5 font-bold">
            <Languages className="w-4 h-4 text-cyan-400" />
            AI Threat Summary & Native Explanation
          </h4>

          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setSelectedLang('en')}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                selectedLang === 'en'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setSelectedLang('gu')}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                selectedLang === 'gu'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ગુજરાતી
            </button>
            <button
              onClick={() => setSelectedLang('hi')}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                selectedLang === 'hi'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              हिंदी
            </button>
          </div>
        </div>

        <p className="text-sm text-slate-200 leading-relaxed font-sans">{currentSummary}</p>
      </div>

      {/* Potential False Positive Banner (Phase 18) */}
      {result.potentialFalsePositive && (
        <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-300 font-semibold">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>AI Decision Review & False Positive Check</span>
            </div>
            <button
              onClick={() => setShowFalsePositiveReview(!showFalsePositiveReview)}
              className="text-[11px] text-amber-400 underline"
            >
              {showFalsePositiveReview ? 'Hide Review' : 'Review Result'}
            </button>
          </div>
          <p className="text-slate-300 leading-relaxed">{result.potentialFalsePositive}</p>
        </div>
      )}

      {/* Why was this flagged? (Explainable AI Factors Accordion) */}
      {result.factors.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
            Explainable AI: Why was this flagged? ({result.factors.length} Evidence Signals)
          </h4>

          {result.factors.map((factor) => {
            const isExpanded = !!expandedFactors[factor.id];
            const severityColors = {
              critical: 'text-rose-400 border-rose-500/30 bg-rose-950/30',
              high: 'text-orange-400 border-orange-500/30 bg-orange-950/30',
              medium: 'text-amber-400 border-amber-500/30 bg-amber-950/30',
              low: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/30',
            }[factor.severity];

            return (
              <div
                key={factor.id}
                className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFactor(factor.id)}
                  className="w-full flex items-center justify-between p-3.5 text-left hover:bg-slate-800/40 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${severityColors}`}>
                      {factor.severity}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white">{factor.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
                      {factor.confidence}% conf.
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-300 border-t border-slate-800/60 bg-slate-950/40 space-y-2">
                    <p className="leading-relaxed">{factor.explanation}</p>
                    {factor.evidence && (
                      <div className="p-2 rounded bg-slate-900 border border-slate-800 font-mono text-[11px] text-cyan-300">
                        <span className="text-slate-500">Detected Trigger: </span>
                        {factor.evidence}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Prioritized Actionable Protection Steps */}
      <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-mono uppercase tracking-wider text-rose-400 flex items-center gap-1.5 font-bold">
            <CheckCircle className="w-4 h-4 text-rose-400" />
            Actionable Incident Checklist
          </h4>
          <span className="text-[11px] text-slate-500 font-mono">Mark steps as completed</span>
        </div>

        <div className="space-y-2">
          {result.recommendedActions.map((action) => {
            const isDone = !!completedActions[action.id];
            return (
              <div
                key={action.id}
                onClick={() => toggleAction(action.id)}
                className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                  isDone
                    ? 'bg-emerald-950/20 border-emerald-500/40 opacity-70'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isDone}
                  onChange={() => toggleAction(action.id)}
                  className="mt-0.5 rounded border-slate-700 text-cyan-500 focus:ring-cyan-400 bg-slate-900 cursor-pointer"
                />
                <div className="flex-1 text-xs">
                  <span className={`font-semibold block ${isDone ? 'line-through text-slate-400' : 'text-white'}`}>
                    {action.title}
                  </span>
                  <span className="text-slate-400 leading-snug">{action.description}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Copilot Action Shortcut */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
        <p className="text-xs text-slate-400">
          Need personalized help or suspect you already entered information?
        </p>
        <button
          onClick={() => onAskCopilot(result)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold border border-slate-700 transition-all active:scale-95"
        >
          <MessageSquareQuote className="w-4 h-4 text-cyan-400" />
          Ask Sentinel Copilot About This Threat
        </button>
      </div>
    </div>
  );
};
