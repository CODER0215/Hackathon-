import React, { useState, useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  ShieldAlert,
  Lock,
  Layers,
  Sparkles,
  GitCommit,
  PhoneCall,
  CheckCircle2,
  Cpu,
  RotateCcw,
} from 'lucide-react';

interface PresentationModeProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchScanner: () => void;
}

export const PresentationMode: React.FC<PresentationModeProps> = ({
  isOpen,
  onClose,
  onLaunchScanner,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 'slide-problem',
      step: '01 / 07',
      title: 'THE CORE CRISIS',
      subtitle: 'The Explosion of High-Pressure Digital Scams',
      points: [
        'Over ₹1,750 Crore lost in India to UPI fraud, fake KYC suspensions, and Digital Arrest extortion.',
        'Attackers exploit psychological pressure (urgency, panic, fear) rather than software vulnerabilities.',
        'Cloud-based antivirus upload private user emails and SMS to external servers, violating fundamental personal privacy.',
      ],
      icon: <ShieldAlert className="w-10 h-10 text-rose-400" />,
      callout: 'Current limitation: Users are forced to act before they understand the risk.',
    },
    {
      id: 'slide-solution',
      step: '02 / 07',
      title: 'OUR INNOVATION: SENTINELAI',
      subtitle: 'Think Before You Trust — On-Device Threat Shield',
      points: [
        'Analyzes suspicious messages, links, and QR codes instantly before the user clicks or pays.',
        '100% On-Device First: Sensitive communications stay in browser memory. Zero plaintext transmitted to third-party clouds.',
        'Sub-15ms deterministic execution latency — runs anywhere, even offline with zero internet connection.',
      ],
      icon: <Lock className="w-10 h-10 text-cyan-400" />,
      callout: 'Guaranteed privacy: Your data is protected before it becomes a victim.',
    },
    {
      id: 'slide-engine',
      step: '03 / 07',
      title: 'THREAT FUSION ENGINE',
      subtitle: 'Multi-Vector Independent Detectors (No Single Point of AI Failure)',
      points: [
        'URL Analyzer: RFC decomposition, homoglyphs, subdomain stacking, disposable .top/.xyz TLDs.',
        'NLP Semantic Engine: Coercion entropy, multi-lingual Gujarati, Hindi & Hinglish signatures.',
        'India Scam Matrix: UPI reverse PIN traps, Digital Arrest coercion, fake India Post courier fees.',
        'Rule Engine & ML Classifier: Probabilistic signal fusion producing structured evidence factors.',
      ],
      icon: <Layers className="w-10 h-10 text-blue-400" />,
      callout: 'Multi-signal fusion: Robust against evasive prompt rephrasing and typosquatting.',
    },
    {
      id: 'slide-dna',
      step: '04 / 07',
      title: 'THREAT DNA 2.0',
      subtitle: 'Explainable AI Decomposed Across 6 Orthogonal Dimensions',
      points: [
        'Social Engineering Entropy: Psychological manipulation and authority lures.',
        'URL Deception: Structural camouflages, IP hosts, and homoglyphs.',
        'Urgency & Coercion: Manufactured artificial deadlines ("account blocked today").',
        'Impersonation, Financial Danger & Credential Theft: Real-time risk decomposition.',
      ],
      icon: <Sparkles className="w-10 h-10 text-purple-400" />,
      callout: 'Judges never see a mysterious black box: Every score is fully explainable with evidence.',
    },
    {
      id: 'slide-chain',
      step: '05 / 07',
      title: 'ATTACK CHAIN VISUALIZER',
      subtitle: 'Dynamic Scam Progression Reconstruction',
      points: [
        'Reconstructs the adversary lifecycle: Unknown Sender → Fake Authority → Urgency Hook → Deceptive Gateway → PIN Solicitation → Account Takeover.',
        'Nodes dynamically flagged as DETECTED, LIKELY, or POSSIBLE based on extracted signals.',
        'Interactive node inspection reveals exact evidence triggers.',
      ],
      icon: <GitCommit className="w-10 h-10 text-amber-400" />,
      callout: 'Educates users by demonstrating how the scam evolves from bait to theft.',
    },
    {
      id: 'slide-privacy',
      step: '06 / 07',
      title: 'ZERO-TRUST PRIVACY ARCHITECTURE',
      subtitle: 'True Edge Execution Without Telemetry',
      points: [
        'Raw Content Storage: Disabled by default. Only anonymized SHA-256 hashes are persisted locally.',
        'Offline Mode: Entire heuristic engine functions with zero network connectivity.',
        'Explicit Cloud Consent: External Gemini API calls are strictly opt-in for advanced advisory only.',
      ],
      icon: <ShieldCheck className="w-10 h-10 text-emerald-400" />,
      callout: 'Verifiable integrity: Audited client-side data flow.',
    },
    {
      id: 'slide-action',
      step: '07 / 07',
      title: 'ACTIONABLE PROTECTION & ROADMAP',
      subtitle: 'Incident Containment & Nationwide Scale',
      points: [
        'Emergency Mode: 2-step decision tree guiding victims through card freezes and National Helpline 1930 within the Golden Hour.',
        'Roadmap: Web Scanner → Lightweight ONNX Model → Chrome Extension → Android Notification Listener Daemon → Enterprise Campus Portal.',
      ],
      icon: <PhoneCall className="w-10 h-10 text-rose-400" />,
      callout: 'Ready for demonstration: Run live scanner tests now.',
    },
  ];

  const current = slides[currentSlide];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        if (currentSlide < slides.length - 1) setCurrentSlide((prev) => prev + 1);
      } else if (e.key === 'ArrowLeft') {
        if (currentSlide > 0) setCurrentSlide((prev) => prev - 1);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentSlide, slides.length, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#070a13] flex flex-col justify-between p-6 sm:p-12 animate-fade-in text-slate-100 select-none">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-sm text-white">SentinelAI Hackathon Showcase</span>
            <span className="text-[11px] text-slate-500 font-mono block">
              3-Minute Executive Presentation Walkthrough
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-cyan-400 font-bold bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
            {current.step}
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Exit presentation mode (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Slide Card */}
      <div className="max-w-4xl mx-auto w-full my-auto py-8 space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
            {current.icon}
          </div>
          <div>
            <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-bold">
              {current.title}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1 leading-tight">
              {current.subtitle}
            </h2>
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
          <ul className="space-y-3.5 text-sm sm:text-base text-slate-300">
            {current.points.map((p, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-cyan-400 font-bold mt-0.5">✦</span>
                <span className="leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>

          <div className="pt-4 border-t border-slate-800/80">
            <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-800/50 text-xs sm:text-sm text-cyan-200 font-mono">
              💡 {current.callout}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between border-t border-slate-800 pt-4">
        <button
          onClick={() => {
            setCurrentSlide(0);
          }}
          className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1 font-mono"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Restart Deck
        </button>

        <div className="flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                currentSlide === idx ? 'w-8 bg-cyan-400' : 'bg-slate-800 hover:bg-slate-700'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
            disabled={currentSlide === 0}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 border transition-colors ${
              currentSlide === 0
                ? 'bg-slate-900 text-slate-700 border-slate-800 cursor-not-allowed'
                : 'bg-slate-900 text-slate-200 border-slate-700 hover:bg-slate-800'
            }`}
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          {currentSlide < slides.length - 1 ? (
            <button
              onClick={() => setCurrentSlide((prev) => Math.min(slides.length - 1, prev + 1))}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs transition-all flex items-center gap-1"
            >
              Next Slide <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                onClose();
                onLaunchScanner();
              }}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-xs transition-all flex items-center gap-1"
            >
              Launch Live Scanner <CheckCircle2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
