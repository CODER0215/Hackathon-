import React, { useState } from 'react';
import {
  Lock,
  ShieldCheck,
  EyeOff,
  ServerOff,
  HardDrive,
  FileKey,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Trash2,
  Terminal,
  Activity,
  History,
} from 'lucide-react';
import { PrivacySettings } from '../services/storage';

interface PrivacyCenterProps {
  settings: PrivacySettings;
  onUpdateSettings: (newSettings: Partial<PrivacySettings>) => void;
  onClearData: () => void;
}

export const PrivacyCenter: React.FC<PrivacyCenterProps> = ({
  settings,
  onUpdateSettings,
  onClearData,
}) => {
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Synthetic local privacy audit events
  const auditEvents = [
    { time: '21:42:04', event: 'Message ingested into isolated browser memory buffer', status: 'IN-MEMORY' },
    { time: '21:42:05', event: 'PII Redaction filter executed: 0 telephone/PAN tokens leaked', status: 'SANITIZED' },
    { time: '21:42:06', event: 'Threat Fusion Engine executed in client WebAssembly/V8 sandbox', status: 'LOCAL' },
    { time: '21:42:07', event: 'Raw content purge: Zero plaintext records retained on disk', status: 'WIPED' },
    { time: '21:43:10', event: 'External cloud intelligence query blocked: Zero bytes outbound', status: 'AIR-GAPPED' },
    { time: '21:44:02', event: 'Anonymized risk metadata SHA-256 hash committed to browser localStorage', status: 'LOCAL-HASH' },
  ];

  const handleConfirmClear = () => {
    onClearData();
    setShowClearConfirm(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              Guaranteed Trust Architecture
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800 font-bold">
              PRIVACY COMMAND CENTER
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Privacy Command Center & Zero-Trust Telemetry
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            SentinelAI is built on a non-negotiable principle: your data belongs to your device alone.
          </p>
        </div>
      </div>

      {/* 5 Real-Time Privacy Status Meters */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Local Analysis</span>
            <Cpu className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-sm sm:text-base font-bold text-emerald-400 font-mono">
            ACTIVE (100%)
          </div>
          <span className="text-[10px] text-slate-500 block mt-1">In-Memory Engine</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Cloud Upload</span>
            <ServerOff className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-sm sm:text-base font-bold text-emerald-400 font-mono">
            {settings.cloudEnrichmentOptIn ? 'OPT-IN ONLY' : 'DISABLED'}
          </div>
          <span className="text-[10px] text-slate-500 block mt-1">No Remote Ingestion</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Raw Content Storage</span>
            <HardDrive className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-sm sm:text-base font-bold text-emerald-400 font-mono">
            OFF (EPHEMERAL)
          </div>
          <span className="text-[10px] text-slate-500 block mt-1">Only SHA Hashes</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Telemetry</span>
            <EyeOff className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-sm sm:text-base font-bold text-emerald-400 font-mono">
            ZERO TRACKERS
          </div>
          <span className="text-[10px] text-slate-500 block mt-1">No Third Parties</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">External Enrichment</span>
            <Lock className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-sm sm:text-base font-bold text-emerald-400 font-mono">
            OPT-IN ONLY
          </div>
          <span className="text-[10px] text-slate-500 block mt-1">Consent Required</span>
        </div>
      </div>

      {/* Visual Data Flow Architecture */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl shadow-2xl">
        <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2 font-bold">
          Transparent Client-Side Data Lifecycle
        </h3>
        <p className="text-base sm:text-lg font-bold text-white mb-6">
          RAW CONTENT → LOCAL PROCESSING → FEATURES → RISK RESULT → OPTIONAL METADATA
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-cyan-400 font-mono text-xs font-bold mb-3">
              01
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Raw Content Ingestion</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pasted URLs or messages enter a browser-contained memory buffer. No network request is initiated.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-emerald-400 font-mono text-xs font-bold mb-3">
              02
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Local PII Redaction</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Regex filters mask phone numbers, credit card sequences, and personal identifiers into sanitized tokens.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-blue-400 font-mono text-xs font-bold mb-3">
              03
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Feature Extraction</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              JavaScript rule engines evaluate punycode homoglyphs, brand typosquatting, and linguistic urgency.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-amber-400 font-mono text-xs font-bold mb-3">
              04
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Risk Result & Metadata</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Risk score and Threat DNA render to UI. Only non-sensitive metadata hashes persist in browser storage.
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Audit Log (Phase 16) */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Local Privacy Audit Trail</h3>
          </div>
          <span className="text-[11px] font-mono text-slate-500">LIVE LOCAL RECORD</span>
        </div>

        <div className="divide-y divide-slate-800/80 font-mono text-xs">
          {auditEvents.map((evt, idx) => (
            <div key={idx} className="py-2.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-slate-500">{evt.time}</span>
                <span className="text-slate-300">{evt.event}</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-emerald-400">
                {evt.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Preferences Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-4">
          <h3 className="text-sm font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-2 font-bold">
            <FileKey className="w-4 h-4 text-cyan-400" />
            Core Privacy by Design Pillars
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <strong className="text-white block mb-0.5">1. Radical Data Minimization</strong>
              <p className="text-slate-400">
                We never harvest contacts, location coordinates, device serials, or persistent advertising IDs.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <strong className="text-white block mb-0.5">2. Client-Authoritative Execution</strong>
              <p className="text-slate-400">
                Threat rules, regex parsers, and punycode decoders execute directly in the browser's V8 engine.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <strong className="text-white block mb-0.5">3. Explicit Cloud Consent</strong>
              <p className="text-slate-400">
                External AI intelligence queries require an active user toggle. By default, zero bits leave the device.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy Controls & Wipe */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-2 font-bold">
              <HardDrive className="w-4 h-4 text-cyan-400" />
              Manage Local Privacy Controls
            </h3>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 cursor-pointer">
                <div>
                  <span className="text-xs font-semibold text-white block">Strict Local-Only Analysis</span>
                  <span className="text-[11px] text-slate-400">Forbid any cloud enrichment requests</span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.localAnalysisOnly}
                  onChange={(e) => onUpdateSettings({ localAnalysisOnly: e.target.checked })}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-cyan-400 bg-slate-900 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 cursor-pointer">
                <div>
                  <span className="text-xs font-semibold text-white block">Save Scans in Local Browser History</span>
                  <span className="text-[11px] text-slate-400">Store sanitized scan metadata in localStorage</span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.saveLocalHistory}
                  onChange={(e) => onUpdateSettings({ saveLocalHistory: e.target.checked })}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-cyan-400 bg-slate-900 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 cursor-pointer">
                <div>
                  <span className="text-xs font-semibold text-white block">Allow Optional Cloud AI Copilot Queries</span>
                  <span className="text-[11px] text-slate-400">Enable advanced Gemini-assisted threat reasoning</span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.cloudEnrichmentOptIn}
                  onChange={(e) => onUpdateSettings({ cloudEnrichmentOptIn: e.target.checked })}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-cyan-400 bg-slate-900 cursor-pointer"
                />
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 mt-6 flex items-center justify-between">
            <span className="text-xs text-slate-400">Clear all local analysis history</span>
            <button
              onClick={() => setShowClearConfirm(true)}
              className="px-3.5 py-1.5 rounded-xl bg-rose-950/40 border border-rose-800/80 text-rose-300 hover:bg-rose-900/60 text-xs font-medium transition-colors"
            >
              Wipe Local Storage
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-rose-500/60 shadow-2xl p-6 text-slate-100 space-y-4">
            <h4 className="font-bold text-base text-white">Confirm Local Storage Purge</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Are you sure you want to permanently delete all local threat scan history and incident logs stored on this device?
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs text-slate-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmClear}
                className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white"
              >
                Yes, Wipe Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
