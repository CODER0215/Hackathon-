import React from 'react';
import {
  Cpu,
  Layers,
  ShieldCheck,
  ServerOff,
  Sparkles,
  GitMerge,
  ArrowRight,
  Database,
  Lock,
  Compass,
  AlertCircle,
  Code2,
} from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* Top Banner */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
            Technical Specification & Hackathon Blueprint
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800">
            HYBRID AI ARCHITECTURE
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          System Architecture & Detection Engine
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Deep-dive into SentinelAI's multi-layered heuristic pipeline, deterministic scoring formulas, and expansion roadmap.
        </p>
      </div>

      {/* Visual System Pipeline */}
      <div className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl shadow-2xl space-y-6">
        <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400">
          Deterministic 6-Layer Defense Pipeline
        </h3>

        <div className="space-y-4">
          {[
            {
              layer: 'Layer 1: Secure Input & Sandboxing',
              desc: 'Accepts URLs, SMS, raw text, or QR uploads into an isolated browser memory buffer without triggering external network calls.',
              tech: 'W3C Clipboard API · Canvas ImageData · Web Workers Sandbox',
              badge: 'ON-DEVICE',
              color: 'border-cyan-500/50 bg-cyan-950/20 text-cyan-300',
            },
            {
              layer: 'Layer 2: Local Preprocessing & PII Redaction',
              desc: 'Regex-based tokenizers redact Aadhaar sequences, credit card PAN numbers, and telephone digits before semantic scoring to prevent leakage.',
              tech: 'Deterministic Regex Tokenizer · Zero Telemetry Masking',
              badge: 'ON-DEVICE',
              color: 'border-emerald-500/50 bg-emerald-950/20 text-emerald-300',
            },
            {
              layer: 'Layer 3: Feature Extraction (Syntactic & Lexical)',
              desc: 'Extracts domain homoglyphs (xn--), suspicious TLD ratios (.top, .xyz), lookalike typosquatting distances, and entropy metrics.',
              tech: 'Levenshtein Distance · Punycode Decoder · TLD Risk Registry',
              badge: 'ON-DEVICE',
              color: 'border-blue-500/50 bg-blue-950/20 text-blue-300',
            },
            {
              layer: 'Layer 4: Hybrid Detection & Semantic Reasoning',
              desc: 'Multi-vector evaluation across India fraud patterns (UPI collect traps, fake KYC, Digital Arrest coercion, and fake courier notices).',
              tech: 'Rule Engine + Multi-lingual Pattern Matcher (EN / GU / HI)',
              badge: 'HYBRID',
              color: 'border-amber-500/50 bg-amber-950/20 text-amber-300',
            },
            {
              layer: 'Layer 5: Threat DNA & Transparent Risk Scoring',
              desc: 'Calculates weighted composite risk (0-100) across 5 orthogonal threat dimensions: Social Engineering, URL, Urgency, Impersonation, and Financial Danger.',
              tech: 'Transparent Risk Function: Risk = ∑(wᵢ × DNAᵢ) + SeverityMultiplier',
              badge: 'ON-DEVICE',
              color: 'border-rose-500/50 bg-rose-950/20 text-rose-300',
            },
            {
              layer: 'Layer 6: Explainable AI & Actionable Containment',
              desc: 'Synthesizes transparent "Why was this flagged?" factor evidence cards and produces prioritized step-by-step victim remediation actions.',
              tech: 'Explainable AI Decomposition · Multi-lingual Translation',
              badge: 'ON-DEVICE',
              color: 'border-purple-500/50 bg-purple-950/20 text-purple-300',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border ${item.color} flex flex-col md:flex-row md:items-center justify-between gap-4`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{item.layer}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700">
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-snug">{item.desc}</p>
              </div>
              <div className="text-[11px] font-mono text-slate-400 whitespace-nowrap bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800 self-start md:self-auto">
                {item.tech}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hybrid Formula Mathematical Model */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 flex items-center gap-2">
            <GitMerge className="w-4 h-4 text-cyan-400" />
            Mathematical Risk Formula
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Rather than a black-box model, SentinelAI utilizes a transparent multi-dimensional scoring matrix designed to guarantee explainability to non-technical users and judges:
          </p>

          <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-cyan-300 border border-slate-800 leading-relaxed space-y-1">
            <p className="text-slate-500">// Composite Weighted Formula</p>
            <p>RiskScore = (URL_Suspicion × 0.25)</p>
            <p className="pl-6">+ (Social_Engineering × 0.25)</p>
            <p className="pl-6">+ (Urgency_Coercion × 0.20)</p>
            <p className="pl-6">+ (Impersonation_Risk × 0.15)</p>
            <p className="pl-6">+ (Financial_Danger × 0.15)</p>
            <p className="text-amber-400 mt-2">// Critical Signal Override:</p>
            <p className="text-amber-300">if (HasCriticalMarker && RiskScore &lt; 84) RiskScore = 84</p>
          </div>
        </div>

        {/* Responsible AI Principles */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-widest text-emerald-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Responsible AI & Honesty Standards
          </h3>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <strong className="text-white block mb-0.5">Probabilistic, Not Absolute</strong>
              <p className="text-slate-400">
                SentinelAI never claims "100% infallible protection". Cyber threats constantly evolve, and the system transparently reports confidence ratings to prevent false trust.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <strong className="text-white block mb-0.5">Offline Self-Sufficiency</strong>
              <p className="text-slate-400">
                Core protection runs locally without dependency on remote LLM APIs, ensuring functionality during network blackouts or roaming.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <strong className="text-white block mb-0.5">No Unverified Authority Claims</strong>
              <p className="text-slate-400">
                Official contact directories (e.g. 1930 Cyber Helpline) are strictly grounded in genuine verified government programs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic 7-Phase Roadmap */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-2xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              Strategic Product Roadmap
            </h3>
            <p className="text-lg font-bold text-white mt-1">
              Path to nationwide user & endpoint deployment
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-lg border border-cyan-800">
            HACKATHON → PRODUCTION
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/40 relative">
            <span className="text-[10px] font-mono text-cyan-400 block mb-1">PHASE 1 · COMPLETE</span>
            <strong className="text-white text-xs block mb-1">Web Threat Scanner</strong>
            <p className="text-[11px] text-slate-400 leading-snug">
              Interactive universal scanner, Threat DNA, multi-lingual Gujarati/Hindi heuristics, and QR sandbox.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 block mb-1">PHASE 2 · IN PROGRESS</span>
            <strong className="text-white text-xs block mb-1">On-Device Mini Model</strong>
            <p className="text-[11px] text-slate-400 leading-snug">
              WebAssembly / ONNX Runtime Web quantization of a lightweight 15MB transformer for local semantic inference.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 block mb-1">PHASE 3</span>
            <strong className="text-white text-xs block mb-1">Browser Extension</strong>
            <p className="text-[11px] text-slate-400 leading-snug">
              Chrome/Firefox background extension intercepting lookalike URLs before DOM rendering and navigation.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 block mb-1">PHASE 4</span>
            <strong className="text-white text-xs block mb-1">Android Security Daemon</strong>
            <p className="text-[11px] text-slate-400 leading-snug">
              Notification listener service analyzing incoming SMS and WhatsApp alerts on mobile without cloud upload.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 block mb-1">PHASE 5</span>
            <strong className="text-white text-xs block mb-1">Live SMS Firewall</strong>
            <p className="text-[11px] text-slate-400 leading-snug">
              Native carrier/SIM spam blocking with automatic report forwarding to National Cyber Crime portal 1930.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 block mb-1">PHASE 6</span>
            <strong className="text-white text-xs block mb-1">College & SME Portal</strong>
            <p className="text-[11px] text-slate-400 leading-snug">
              Campus-wide threat telemetry dashboard alerting students about localized exam & scholarship phishing scams.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 block mb-1">PHASE 7</span>
            <strong className="text-white text-xs block mb-1">Federated Learning</strong>
            <p className="text-[11px] text-slate-400 leading-snug">
              Differential privacy and federated updates: models learn from new scams across devices without sharing user messages.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
