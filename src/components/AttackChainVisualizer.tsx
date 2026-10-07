import React, { useState } from 'react';
import {
  GitCommit,
  CheckCircle,
  HelpCircle,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Info,
  X,
  ShieldCheck,
} from 'lucide-react';
import { AttackChainNode } from '../types/threat';

interface AttackChainVisualizerProps {
  nodes?: AttackChainNode[];
  verdict?: string;
}

export const AttackChainVisualizer: React.FC<AttackChainVisualizerProps> = ({
  nodes = [],
  verdict = 'DANGEROUS',
}) => {
  const [selectedNode, setSelectedNode] = useState<AttackChainNode | null>(null);

  if (!nodes || nodes.length === 0) return null;

  const isSafe = verdict === 'SAFE';

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <GitCommit className="w-4 h-4 text-cyan-400" />
            <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
              Attack Progression Chain
            </h4>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Step-by-step reconstruction of the adversary's social engineering pipeline.
          </p>
        </div>

        <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span> Detected
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Likely
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-slate-600"></span> Possible
          </span>
        </div>
      </div>

      {/* Visual Sequence Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2.5 pt-2">
        {nodes.map((node, idx) => {
          const isDetected = node.status === 'DETECTED';
          const isLikely = node.status === 'LIKELY';

          let borderClass = 'border-slate-800 bg-slate-950/50 hover:border-slate-700';
          let tagClass = 'bg-slate-900 text-slate-500 border-slate-800';
          let titleClass = 'text-slate-300';

          if (isSafe) {
            borderClass = 'border-emerald-500/30 bg-emerald-950/20';
            tagClass = 'bg-emerald-950 text-emerald-300 border-emerald-800';
            titleClass = 'text-emerald-200';
          } else if (isDetected) {
            borderClass = 'border-rose-500/50 bg-rose-950/20 hover:border-rose-500';
            tagClass = 'bg-rose-950/80 text-rose-300 border-rose-800';
            titleClass = 'text-rose-200';
          } else if (isLikely) {
            borderClass = 'border-amber-500/40 bg-amber-950/20 hover:border-amber-500';
            tagClass = 'bg-amber-950/80 text-amber-300 border-amber-800';
            titleClass = 'text-amber-200';
          }

          return (
            <div
              key={node.id}
              onClick={() => setSelectedNode(node)}
              className={`p-3.5 rounded-xl border ${borderClass} cursor-pointer transition-all flex flex-col justify-between group relative`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-slate-500 font-bold">
                    STEP 0{idx + 1}
                  </span>
                  <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border ${tagClass}`}>
                    {node.status}
                  </span>
                </div>

                <span className="text-[10px] font-mono text-cyan-400 block mb-1">
                  {node.stage}
                </span>

                <h5 className={`text-xs font-bold ${titleClass} group-hover:text-white transition-colors leading-snug`}>
                  {node.title}
                </h5>
              </div>

              <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-3 group-hover:text-slate-300 transition-colors">
                View rationale <ArrowRight className="w-2.5 h-2.5" />
              </span>
            </div>
          );
        })}
      </div>

      {/* Detail Dialog */}
      {selectedNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 text-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 block uppercase">
                  {selectedNode.stage}
                </span>
                <h5 className="font-bold text-base text-white">{selectedNode.title}</h5>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-400">Threat Status:</span>
              <span className="font-bold text-white px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                {selectedNode.status}
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <strong className="text-slate-300 block">Stage Analysis & Context:</strong>
              <p className="text-slate-400 leading-relaxed">{selectedNode.description}</p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedNode(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
              >
                Close Attack Stage
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
