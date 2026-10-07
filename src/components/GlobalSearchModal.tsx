import React, { useState, useEffect } from 'react';
import { Search, X, Shield, ArrowRight, BookOpen, Layers, Terminal, AlertTriangle } from 'lucide-react';
import { NavTab } from './Navbar';
import { DEMO_PRESETS } from '../services/demoPresets';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: NavTab) => void;
  onSelectPreset: (presetId: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
  onSelectPreset,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle or open handled at App level
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickNavItems = [
    { label: 'Universal Threat Scanner', tab: 'scanner' as NavTab, icon: <Shield className="w-4 h-4 text-cyan-400" /> },
    { label: 'Threat DNA 2.0 & Attack Chain', tab: 'scanner' as NavTab, icon: <Layers className="w-4 h-4 text-purple-400" /> },
    { label: 'Scam Campaign Intelligence', tab: 'campaigns' as NavTab, icon: <Layers className="w-4 h-4 text-amber-400" /> },
    { label: 'Student Shield & Family Profiles', tab: 'student-family' as NavTab, icon: <BookOpen className="w-4 h-4 text-emerald-400" /> },
    { label: 'Adversarial Security Lab', tab: 'adversarial' as NavTab, icon: <Terminal className="w-4 h-4 text-rose-400" /> },
    { label: 'Security Incident Center', tab: 'incidents' as NavTab, icon: <AlertTriangle className="w-4 h-4 text-rose-400" /> },
    { label: 'SOC Health & System Trace', tab: 'soc-view' as NavTab, icon: <Terminal className="w-4 h-4 text-blue-400" /> },
  ];

  const filteredPresets = DEMO_PRESETS.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.tag.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden text-slate-100 flex flex-col">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-cyan-400 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search threats, presets, lessons, tools (e.g. 'UPI', 'KYC', 'Homoglyph')..."
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="p-4 max-h-96 overflow-y-auto space-y-4 text-xs">
          {/* Quick Tools */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1">
              Modules & Features
            </span>
            <div className="space-y-1">
              {quickNavItems.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    onNavigateTab(item.tab);
                    onClose();
                  }}
                  className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800/80 cursor-pointer flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span className="text-slate-200 group-hover:text-white font-medium">
                      {item.label}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Hackathon Presets */}
          <div className="space-y-1 pt-2 border-t border-slate-800/80">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1">
              Demo Threat Presets ({filteredPresets.length})
            </span>
            <div className="space-y-1">
              {filteredPresets.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    onSelectPreset(p.id);
                    onClose();
                  }}
                  className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800/80 cursor-pointer flex items-center justify-between transition-colors group"
                >
                  <div>
                    <span className="text-white font-semibold block">{p.name}</span>
                    <span className="text-[11px] text-slate-400 truncate block max-w-sm">
                      {p.description}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400 whitespace-nowrap">
                    {p.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>Esc to exit</span>
          <span>SentinelAI Global Omnibar</span>
        </div>
      </div>
    </div>
  );
};
