import React, { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Lock,
  Zap,
  Globe2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Cpu,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Radio,
  FileSearch,
  Layers,
  Network,
  Users,
  FlaskConical,
} from 'lucide-react';
import { NavTab } from './Navbar';
import { HeroSection } from './HeroSection';
import { WhySentinelCards } from './WhySentinelCards';

interface LandingPageProps {
  setActiveTab: (tab: NavTab) => void;
  onQuickDemo: (presetId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ setActiveTab, onQuickDemo }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: 'Does SentinelAI send my private messages or URLs to external cloud servers?',
      a: 'No. By design, SentinelAI operates with an on-device first architecture. All regular heuristic parsing, regex tokenization, punycode evaluations, and linguistic threat scoring happen in browser memory. Even when optional cloud intelligence is enabled, users must grant explicit consent and sensitive PII is stripped beforehand.',
    },
    {
      q: 'Does SentinelAI work without an active internet connection?',
      a: 'Yes! The entire threat detection engine, URL structure analyzer, scam keyword dictionaries, and Threat DNA scoring run fully offline. You can test this anytime by clicking the "Offline Mode" toggle in the navbar.',
    },
    {
      q: 'How does SentinelAI detect UPI scams and Digital Arrest threats?',
      a: 'SentinelAI incorporates specialized behavioral signatures for Indian cyber fraud vectors: detecting collect-request coercion, reverse PIN solicitation ("enter PIN to receive money"), and fear-inducing keywords related to CBI, police video calls, and narcotics parcel extortion.',
    },
    {
      q: 'Why does SentinelAI support Gujarati and Hindi?',
      a: 'Cyber fraudsters increasingly target victims in regional languages like Gujarati (ગુજરાતી) and Hindi to exploit language barriers. SentinelAI recognizes deceptive regional phrasing and provides native warnings in simple terms.',
    },
    {
      q: 'Is any AI scanner 100% guaranteed to catch every threat?',
      a: 'No ethical cybersecurity system guarantees 100% immunity. SentinelAI provides transparent, explainable probabilistic risk assessments to alert you before you click or transfer money, empowering you with critical thinking and verified next steps.',
    },
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* 1. Hero Section */}
      <HeroSection setActiveTab={setActiveTab} onQuickDemo={onQuickDemo} />

      {/* 2. The Problem: Why Current Protection Isn't Enough */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-rose-400">
            The Fundamental Flaw
          </span>
          <h2 className="text-3xl font-extrabold text-white mt-2">
            Why Traditional Security Fails Today's Users
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Attackers have shifted from technical software exploits to human psychological manipulation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-950/60 border border-rose-800/80 flex items-center justify-center text-rose-400">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Privacy Sacrificed for Cloud Scans</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Traditional cloud anti-virus and URL checkers upload entire emails and SMS to third-party data centers, exposing sensitive private conversations and confidential OTPs.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-800/80 flex items-center justify-center text-amber-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Blind to Social Engineering</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Modern scams rarely involve malicious binaries. They manipulate psychology: "Digital Arrest", urgent KYC blocking, and fake lottery rewards that bypass signature antivirus.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-800/80 flex items-center justify-center text-cyan-400">
              <Globe2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Ignoring Regional Realities</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Global security vendors ignore localized Indian threats like UPI PIN traps, fake speed post courier alerts, and regional language scam messages in Gujarati and Hindi.
            </p>
          </div>
        </div>
      </section>

      {/* 3. India-Specific Protection Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-blue-950/30 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                Localized Defense Matrix
              </span>
              <h2 className="text-3xl font-extrabold text-white">
                Engineered for Indian Cyber Threats
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                SentinelAI features dedicated threat intelligence tailored for everyday mobile users, college students, and senior citizens in India.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>UPI PIN Solicitation Filter</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Digital Arrest Extortion Alerts</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Fake Bank KYC Suspension</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Full Gujarati & Hindi Analysis</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onQuickDemo('demo-gujarati-kyc')}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold border border-slate-700 transition-colors"
                >
                  Test Gujarati Bank Scam Demo
                </button>
                <button
                  onClick={() => onQuickDemo('demo-digital-arrest')}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-300 text-xs font-semibold border border-slate-700 transition-colors"
                >
                  Test Digital Arrest Demo
                </button>
              </div>
            </div>

            {/* Visual Box */}
            <div className="w-full lg:w-96 p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-3 shadow-xl">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px] text-slate-500">
                <span>REGIONAL HEURISTIC ENGINE</span>
                <span className="text-emerald-400">100% OFFLINE</span>
              </div>
              <div className="space-y-1.5 text-[11px]">
                <p className="text-cyan-400">// Gujarati Sample Query</p>
                <p className="text-slate-400 italic">"તમારું KYC આજે પૂર્ણ નહીં કરો તો બેંક એકાઉન્ટ બંધ થઈ જશે..."</p>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 text-rose-400 font-semibold mt-2">
                  ✓ VERDICT: DANGEROUS (91/100)
                </div>
                <p className="text-slate-400 pt-1 leading-snug">
                  Explains risk to users in clear Gujarati without complicated jargon.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How Sentinel Protects College Students & Youth */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
            Campus Cyber Defense
          </span>
          <h2 className="text-3xl font-extrabold text-white mt-2">
            Built for Students, Interns & Young Jobseekers
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            College students are the #1 target for task-based Telegram job scams and fake scholarship links.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-800 flex items-center justify-center text-cyan-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Work-From-Home Task Schemes</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Detects pyramid Telegram task scams promising ₹3,500/day for liking YouTube videos and requesting upfront deposits.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-950/60 border border-blue-800 flex items-center justify-center text-blue-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Fake Exam & Scholarship Portals</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Flags lookalike domains spoofing university portals, national scholarship schemes, and exam fee gateways.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-800 flex items-center justify-center text-purple-400">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Campus Peer Sharing</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Easily generate one-click verified reports to share in batch WhatsApp groups to prevent mass student compromise.
            </p>
          </div>
        </div>
      </section>

      {/* 5. V2 Feature Launchpad */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                V2 Modular Architecture
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">
                Explore Advanced Defense Intelligence Modules
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              onClick={() => setActiveTab('campaigns')}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 cursor-pointer transition-all group"
            >
              <Network className="w-5 h-5 text-amber-400 mb-2" />
              <h4 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors">
                Campaign Intelligence
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Correlates scans into coordinated syndicates (e.g. 17 related attacks).
              </p>
            </div>

            <div
              onClick={() => setActiveTab('student-family')}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all group"
            >
              <Users className="w-5 h-5 text-emerald-400 mb-2" />
              <h4 className="font-bold text-sm text-white group-hover:text-emerald-300 transition-colors">
                Family & Student Shield
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Switch profiles (Student, Senior, Parent, Professional) for custom protection.
              </p>
            </div>

            <div
              onClick={() => setActiveTab('adversarial')}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-rose-500/50 cursor-pointer transition-all group"
            >
              <FlaskConical className="w-5 h-5 text-rose-400 mb-2" />
              <h4 className="font-bold text-sm text-white group-hover:text-rose-300 transition-colors">
                Adversarial Security Lab
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Benchmark SentinelAI robustness against homoglyphs and disguised prompts.
              </p>
            </div>

            <div
              onClick={() => setActiveTab('soc-view')}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 cursor-pointer transition-all group"
            >
              <Cpu className="w-5 h-5 text-blue-400 mb-2" />
              <h4 className="font-bold text-sm text-white group-hover:text-blue-300 transition-colors">
                SOC Health & Telemetry
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Inspect real-time memory footprint, daemon traces, and heuristic engines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Why SentinelAI 6-Card Executive Pillar Section (Phase 39) */}
      <WhySentinelCards />

      {/* 7. Frequently Asked Questions (FAQ) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
            Clear Answers
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors"
                >
                  <span className="text-sm font-semibold text-white">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 bg-slate-950/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. Final Call to Action */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-blue-950/60 border border-cyan-500/30 text-center relative overflow-hidden shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Think Before You Trust.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Protect your accounts, family, and hard-earned money with privacy-first on-device AI.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setActiveTab('scanner')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-950/60 transition-all flex items-center gap-2 active:scale-95"
            >
              <FileSearch className="w-4 h-4 text-slate-950" />
              Launch Universal Scanner Now
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className="px-5 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200 font-semibold text-sm transition-all"
            >
              Explore SOC Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="border-t border-slate-800/80 pt-10 text-xs text-slate-500 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-white">SentinelAI</span>
            <span className="text-slate-600">·</span>
            <span>Private AI Threat Shield V2</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button onClick={() => setActiveTab('privacy')} className="hover:text-white transition-colors">
              Privacy Spec
            </button>
            <button onClick={() => setActiveTab('architecture')} className="hover:text-white transition-colors">
              Architecture
            </button>
            <button onClick={() => setActiveTab('learn')} className="hover:text-white transition-colors">
              Academy
            </button>
            <button onClick={() => setActiveTab('soc-view')} className="hover:text-white transition-colors">
              SOC Health
            </button>
          </div>
        </div>

        <div className="text-center text-[11px] text-slate-600 pb-4">
          Built for National Hackathon 2026 · On-Device Privacy Architecture · National Cyber Helpline: 1930
        </div>
      </footer>
    </div>
  );
};
