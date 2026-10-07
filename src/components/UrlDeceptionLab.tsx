import React, { useState } from 'react';
import {
  Link2,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  Lock,
  Unlock,
  Layers,
  FileSearch,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';
import { UrlDecomposition } from '../types/threat';

interface UrlDeceptionLabProps {
  decomposition?: UrlDecomposition;
}

export const UrlDeceptionLab: React.FC<UrlDeceptionLabProps> = ({ decomposition }) => {
  const [showWarningModal, setShowWarningModal] = useState(false);

  if (!decomposition) return null;

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Link2 className="w-4 h-4 text-cyan-400" />
          <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
            URL Deception Lab & Anatomy Inspector
          </h4>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          Deterministic RFC Decomposition
        </span>
      </div>

      {/* URL Visual Dissection Ribbon */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
        <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
          Structural Anatomy Breakdown:
        </span>

        <div className="flex flex-wrap items-center gap-1 text-slate-300 break-all text-xs sm:text-sm">
          {/* Protocol */}
          <span
            className={`px-2 py-1 rounded border ${
              decomposition.isHttps
                ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300'
                : 'bg-rose-950/60 border-rose-800 text-rose-300'
            }`}
            title="Protocol (Scheme)"
          >
            {decomposition.protocol}://
          </span>

          {/* Subdomain */}
          {decomposition.subdomain && (
            <span
              className="px-2 py-1 rounded bg-amber-950/50 border border-amber-800/80 text-amber-300"
              title="Subdomain (Often used for brand camouflage)"
            >
              {decomposition.subdomain}.
            </span>
          )}

          {/* Registered Domain */}
          <span
            className="px-2 py-1 rounded bg-cyan-950/60 border border-cyan-800/80 text-cyan-300 font-bold"
            title="Registered Authority Domain"
          >
            {decomposition.registeredDomain}
          </span>

          {/* Port */}
          {decomposition.port && (
            <span className="px-2 py-1 rounded bg-slate-800 text-slate-300" title="Custom Port">
              :{decomposition.port}
            </span>
          )}

          {/* Path */}
          {decomposition.path && (
            <span
              className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300"
              title="Path"
            >
              {decomposition.path}
            </span>
          )}

          {/* Query */}
          {decomposition.query && (
            <span
              className="px-2 py-1 rounded bg-purple-950/40 border border-purple-800 text-purple-300 text-xs"
              title="Query Parameters"
            >
              {decomposition.query}
            </span>
          )}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded bg-emerald-500"></span> Protocol
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded bg-amber-500"></span> Subdomain
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded bg-cyan-500"></span> Real Destination
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded bg-purple-500"></span> Parameters
          </span>
        </div>
      </div>

      {/* Indicator Chips */}
      {decomposition.suspiciousIndicators.length > 0 ? (
        <div className="space-y-2">
          <span className="text-[11px] font-mono uppercase text-slate-400 block">
            Deceptive Characteristics Identified:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {decomposition.suspiciousIndicators.map((ind, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5 text-xs"
              >
                <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-xs">{ind.title}</strong>
                  <p className="text-slate-400 leading-snug text-[11px] mt-0.5">
                    {ind.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-800/40 text-xs text-emerald-300 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>No deceptive structural camouflage or homoglyphs found in this URL.</span>
        </div>
      )}

      {/* Zero Trust Link Preview Guard */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div>
          <span className="font-semibold text-white block">
            Zero-Trust Preview Guard: Destination Is Isolated
          </span>
          <span className="text-slate-400 text-[11px]">
            SentinelAI blocks automatic browser navigation to prevent drive-by exploits.
          </span>
        </div>

        <button
          onClick={() => setShowWarningModal(true)}
          className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Open Destination Preview
        </button>
      </div>

      {/* Caution Modal */}
      {showWarningModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-rose-500/60 shadow-2xl p-6 text-slate-100 space-y-4">
            <div className="flex items-center gap-3 text-rose-400">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
              <h5 className="font-bold text-base text-white">Untrusted Destination Warning</h5>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              You are about to view{' '}
              <strong className="text-cyan-400 font-mono break-all">{decomposition.rawUrl}</strong>.
              If this site requests passwords, OTPs, or downloads, do not proceed.
            </p>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] space-y-1 text-slate-400">
              <div>Destination Host: {decomposition.registeredDomain}</div>
              <div>HTTPS Security: {decomposition.isHttps ? 'Encrypted' : 'Insecure HTTP'}</div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowWarningModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
              >
                Go Back (Safe)
              </button>
              <a
                href={decomposition.rawUrl.startsWith('http') ? decomposition.rawUrl : `https://${decomposition.rawUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowWarningModal(false)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition-colors"
              >
                Open Only If You Trust It
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
