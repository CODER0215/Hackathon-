import React, { useState } from 'react';
import {
  History,
  Search,
  Filter,
  Trash2,
  Download,
  Eye,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Lock,
} from 'lucide-react';
import { ThreatAnalysisResult } from '../types/threat';
import { StorageService } from '../services/storage';

interface ThreatHistoryViewProps {
  history: ThreatAnalysisResult[];
  onSelectScan: (scan: ThreatAnalysisResult) => void;
  onRefreshHistory: () => void;
}

export const ThreatHistoryView: React.FC<ThreatHistoryViewProps> = ({
  history,
  onSelectScan,
  onRefreshHistory,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [selectedScanModal, setSelectedScanModal] = useState<ThreatAnalysisResult | null>(null);

  // Filter history
  const filtered = history.filter((item) => {
    const matchesSearch =
      item.categoryLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sanitizedPreview.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.verdict.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (categoryFilter === 'ALL') return true;
    if (categoryFilter === 'DANGEROUS') return item.verdict === 'DANGEROUS';
    if (categoryFilter === 'HIGH_RISK') return item.verdict === 'HIGH_RISK';
    if (categoryFilter === 'SUSPICIOUS') return item.verdict === 'SUSPICIOUS';
    if (categoryFilter === 'SAFE') return item.verdict === 'SAFE';

    return true;
  });

  const handleClear = () => {
    if (window.confirm('Clear all local threat history? (Data is stored only in your browser)')) {
      StorageService.clearHistory();
      onRefreshHistory();
    }
  };

  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(history, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `sentinelai-audit-log-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const formatTime = (ts: number) => {
    const d = new Date(ts);
    return `${d.toLocaleDateString([], { month: 'short', day: 'numeric' })} ${d.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              Local Audit Log
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800">
              ON-DEVICE PERSISTENCE
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Threat History & Audit Records
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Review past scans, risk breakdowns, and intercepted social engineering attempts.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-200 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Export JSON
          </button>
          <button
            onClick={handleClear}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-rose-950/50 border border-slate-800 hover:border-rose-800 text-xs font-medium text-rose-300 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by threat category, keyword, or risk..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Segmented Filter Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'ALL', label: 'All' },
            { id: 'DANGEROUS', label: 'Dangerous' },
            { id: 'HIGH_RISK', label: 'High Risk' },
            { id: 'SUSPICIOUS', label: 'Suspicious' },
            { id: 'SAFE', label: 'Safe' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setCategoryFilter(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                categoryFilter === f.id
                  ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* History Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/70 text-[11px] font-mono uppercase text-slate-400">
                <th className="py-3.5 px-4 font-semibold">Timestamp</th>
                <th className="py-3.5 px-4 font-semibold">Type</th>
                <th className="py-3.5 px-4 font-semibold">Threat Vector</th>
                <th className="py-3.5 px-4 font-semibold">Preview (Sanitized)</th>
                <th className="py-3.5 px-4 font-semibold">Risk Score</th>
                <th className="py-3.5 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No threat logs found matching criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => {
                  const isDangerous = item.verdict === 'DANGEROUS';
                  const isSafe = item.verdict === 'SAFE';

                  const badgeClass = isDangerous
                    ? 'text-rose-400 bg-rose-950/40 border-rose-800/60'
                    : isSafe
                    ? 'text-emerald-400 bg-emerald-950/40 border-emerald-800/60'
                    : 'text-amber-400 bg-amber-950/40 border-amber-800/60';

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                      onClick={() => onSelectScan(item)}
                    >
                      <td className="py-3.5 px-4 font-mono text-slate-400 whitespace-nowrap">
                        {formatTime(item.timestamp)}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-300">
                        <span className="uppercase text-[11px] px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                          {item.scanType}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-white group-hover:text-cyan-300 transition-colors">
                        {item.categoryLabel}
                      </td>
                      <td className="py-3.5 px-4 text-slate-400 max-w-xs truncate font-mono text-[11px]">
                        {item.sanitizedPreview}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold">
                        <span className={`px-2 py-0.5 rounded border text-[11px] ${badgeClass}`}>
                          {item.riskScore}/100
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectScan(item);
                          }}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-medium inline-flex items-center gap-1 transition-colors"
                        >
                          View <ArrowRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
