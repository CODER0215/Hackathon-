import React from 'react';
import {
  Layers,
  Network,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Fingerprint,
  Radio,
  FileSearch,
} from 'lucide-react';
import { SYNTHETIC_CAMPAIGNS } from '../services/ThreatFusionEngine';

interface CampaignIntelligenceProps {
  onTestCampaign: (presetId: string) => void;
}

export const CampaignIntelligence: React.FC<CampaignIntelligenceProps> = ({ onTestCampaign }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
            Coordinated Threat Intelligence
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800">
            CORRELATION ENGINE
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Scam Campaign Intelligence & Correlation
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Correlates disparate user scans to detect coordinated threat syndicates, shared phishing kits, and recurring fraud templates.
        </p>
      </div>

      {/* Campaign Highlights Banner */}
      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3 text-xs text-slate-400">
        <Network className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-200">Collective Correlation:</strong> Individual phishing messages are rarely isolated. When 10+ users scan messages with identical payment gateway parameters or disposable domains, SentinelAI clusters them into an active coordinated threat campaign.
        </p>
      </div>

      {/* Grid of 4 Active Coordinated Campaigns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {SYNTHETIC_CAMPAIGNS.map((camp) => (
          <div
            key={camp.id}
            className="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-xl space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400 font-bold">
                  {camp.targetBrand}
                </span>
                <span
                  className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${
                    camp.severity === 'CRITICAL'
                      ? 'bg-rose-950/80 text-rose-300 border-rose-800'
                      : 'bg-amber-950/80 text-amber-300 border-amber-800'
                  }`}
                >
                  {camp.severity} ALERT
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                {camp.title}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">{camp.summary}</p>

              {/* Shared Indicators */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-mono text-slate-400 block uppercase">
                  Shared Attack Indicators:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {camp.commonIndicators.map((ind, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-mono px-2 py-1 rounded bg-slate-950 text-slate-300 border border-slate-800"
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Campaign Stats & Scan Trigger */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-500 block text-[10px] font-mono">RELATED REPORTS</span>
                <span className="font-mono text-cyan-300 font-bold">
                  {camp.relatedCount} Intercepts · {camp.firstSeen}
                </span>
              </div>

              <button
                onClick={() => {
                  if (camp.id === 'camp-sbi-kyc') onTestCampaign('demo-kyc');
                  else if (camp.id === 'camp-phonepe-cashback') onTestCampaign('demo-upi');
                  else if (camp.id === 'camp-indiapost-cvv') onTestCampaign('demo-courier');
                  else if (camp.id === 'camp-telegram-task') onTestCampaign('demo-job');
                }}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5"
              >
                Inspect Sample <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
