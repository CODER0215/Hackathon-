import React from 'react';
import {
  Lock,
  Sparkles,
  Globe2,
  Layers,
  Zap,
  Users,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const WhySentinelCards: React.FC = () => {
  const cards = [
    {
      num: '01',
      title: 'Privacy First',
      tagline: 'Zero-Cloud On-Device Analysis',
      desc: 'Sensitive SMS, confidential emails, and personal messages never leave your browser memory. We protect your data before it becomes a victim.',
      icon: <Lock className="w-5 h-5 text-cyan-400" />,
      highlight: '100% In-Memory Sandbox',
    },
    {
      num: '02',
      title: 'Explainable AI',
      tagline: 'Threat DNA 2.0 & Attack Chains',
      desc: 'Never a vague "dangerous" label. Decomposes attacks across 6 orthogonal dimensions and reconstructs the adversary attack chain with clear evidence.',
      icon: <Sparkles className="w-5 h-5 text-purple-400" />,
      highlight: 'Transparent Evidence Scoring',
    },
    {
      num: '03',
      title: 'India-Specific Protection',
      tagline: 'Tailored for Local Cyber Frauds',
      desc: 'Dedicated detection matrix for UPI reverse PIN traps, Digital Arrest police extortion, fake courier fees, and multi-lingual Gujarati and Hindi threats.',
      icon: <Globe2 className="w-5 h-5 text-emerald-400" />,
      highlight: 'Native Gujarati & Hindi Support',
    },
    {
      num: '04',
      title: 'Hybrid Threat Intelligence',
      tagline: 'Multi-Vector Fusion Engine',
      desc: 'Combines 9 independent detectors: RFC URL analyzer, homoglyph detector, NLP semantics, rule engine, brand impersonation, and on-device ML.',
      icon: <Layers className="w-5 h-5 text-blue-400" />,
      highlight: 'No Single Point of Failure',
    },
    {
      num: '05',
      title: 'Low-Latency Local Detection',
      tagline: 'Deterministic Sub-15ms Execution',
      desc: 'Immediate results without network round-trips, rate limit choke points, or expensive cloud compute dependencies. Works 100% offline.',
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      highlight: 'Offline Self-Sufficiency',
    },
    {
      num: '06',
      title: 'Human-Centered Security',
      tagline: 'Actionable Containment & Education',
      desc: 'Empowers users with prioritized remediation steps, Student & Family persona shields, and 1930 National Cyber Helpline integration during Golden Hour.',
      icon: <Users className="w-5 h-5 text-rose-400" />,
      highlight: 'Empowers Rather Than Scares',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
          Why SentinelAI?
        </span>
        <h2 className="text-3xl font-extrabold text-white mt-1">
          Six Pillars of Next-Generation Cyber Defense
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Engineered to win: How SentinelAI solves the critical shortcomings of legacy cloud anti-virus tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((c) => (
          <div
            key={c.num}
            className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl shadow-xl hover:border-slate-700 transition-all flex flex-col justify-between group space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-500 group-hover:text-cyan-400 transition-colors">
                  {c.num}
                </span>
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                  {c.icon}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white leading-snug">{c.title}</h3>
                <span className="text-[11px] font-mono text-cyan-400 block mt-0.5">
                  {c.tagline}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{c.desc}</p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>{c.highlight}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
