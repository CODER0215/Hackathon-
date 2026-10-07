import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  PlusCircle,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Download,
  Trash2,
  X,
  FileText,
} from 'lucide-react';
import { SecurityIncident } from '../types/threat';

const INCIDENTS_KEY = 'sentinelai_incidents_v1';

const SEED_INCIDENTS: SecurityIncident[] = [
  {
    id: 'inc-101',
    timestamp: Date.now() - 1000 * 60 * 60 * 3, // 3 hours ago
    incidentType: 'Suspicious Bank KYC SMS Clicked',
    category: 'BANK_KYC_SCAM',
    riskScore: 92,
    actionsTaken: ['Closed browser tab immediately', 'Verified debit card status in official YONO app', 'Reported number as spam'],
    status: 'Contained',
    notes: 'Did not submit PAN or OTP. Card confirmed safe.',
    hash: 'sha256:7f83b1657ff1...[MASKED]',
  },
  {
    id: 'inc-102',
    timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    incidentType: 'PhonePe Cashback Collect Request Received',
    category: 'UPI_SCAM',
    riskScore: 95,
    actionsTaken: ['Declined collect notification', 'Blocked fraudster UPI VPA in payment app'],
    status: 'Resolved',
    notes: 'Attempted to extract ₹499 disguised as prize.',
    hash: 'sha256:8812c441aa20...[MASKED]',
  },
];

export const IncidentCenter: React.FC = () => {
  const [incidents, setIncidents] = useState<SecurityIncident[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form state
  const [newType, setNewType] = useState('Phishing Link Clicked');
  const [newCategory, setNewCategory] = useState('PHISHING');
  const [newRisk, setNewRisk] = useState(85);
  const [newNotes, setNewNotes] = useState('');
  const [actionsSelected, setActionsSelected] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(INCIDENTS_KEY);
      if (!raw) {
        localStorage.setItem(INCIDENTS_KEY, JSON.stringify(SEED_INCIDENTS));
        setIncidents(SEED_INCIDENTS);
      } else {
        setIncidents(JSON.parse(raw));
      }
    } catch {
      setIncidents(SEED_INCIDENTS);
    }
  }, []);

  const saveIncidents = (updated: SecurityIncident[]) => {
    setIncidents(updated);
    try {
      localStorage.setItem(INCIDENTS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save incidents', e);
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newInc: SecurityIncident = {
      id: `inc-${Date.now()}`,
      timestamp: Date.now(),
      incidentType: newType,
      category: newCategory,
      riskScore: newRisk,
      actionsTaken: actionsSelected.length > 0 ? actionsSelected : ['Incident containment initiated'],
      status: 'New',
      notes: newNotes || 'Incident logged for local auditing.',
      hash: `sha256:${Math.random().toString(36).substring(2, 10)}...[MASKED]`,
    };

    const updated = [newInc, ...incidents];
    saveIncidents(updated);
    setShowCreateModal(false);
    setNewNotes('');
    setActionsSelected([]);
  };

  const handleUpdateStatus = (id: string, newStatus: SecurityIncident['status']) => {
    const updated = incidents.map((inc) => (inc.id === id ? { ...inc, status: newStatus } : inc));
    saveIncidents(updated);
  };

  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(incidents, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `sentinelai-incidents-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleClear = () => {
    if (window.confirm('Clear all local incident logs?')) {
      saveIncidents([]);
    }
  };

  const availableActions = [
    'Closed deceptive webpage immediately',
    'Froze debit / credit cards in official banking app',
    'Reported to National Cyber Helpline 1930',
    'Changed email and banking passwords from clean device',
    'Preserved screenshots / UTR transaction numbers',
    'Blocked sender phone / email / UPI ID',
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              Local Incident Management
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800">
              PRIVACY COMPLIANT
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Security Incident Response Center
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Log, track, and remediate suspected security incidents locally without disclosing sensitive content.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            Log New Incident
          </button>
          <button
            onClick={handleExport}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-300 transition-colors"
            title="Export JSON incident log"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={handleClear}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 hover:bg-rose-950/50 text-rose-400 transition-colors"
            title="Clear all records"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Incidents Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl overflow-hidden shadow-2xl">
        <div className="divide-y divide-slate-800/80">
          {incidents.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">
              No incidents logged yet. Click "Log New Incident" to record a security event.
            </div>
          ) : (
            incidents.map((inc) => {
              const statusColors = {
                New: 'bg-rose-950/80 text-rose-300 border-rose-800',
                Investigating: 'bg-amber-950/80 text-amber-300 border-amber-800',
                Contained: 'bg-blue-950/80 text-blue-300 border-blue-800',
                Resolved: 'bg-emerald-950/80 text-emerald-300 border-emerald-800',
              }[inc.status];

              return (
                <div key={inc.id} className="p-5 space-y-3 hover:bg-slate-800/20 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-slate-400">
                        {new Date(inc.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })} at{' '}
                        {new Date(inc.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${statusColors}`}>
                        {inc.status}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">{inc.hash}</span>
                    </div>

                    {/* Status Dropdown */}
                    <div className="flex items-center gap-2">
                      <label className="text-[11px] text-slate-500">Status:</label>
                      <select
                        value={inc.status}
                        onChange={(e) => handleUpdateStatus(inc.id, e.target.value as any)}
                        className="px-2 py-1 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300"
                      >
                        <option value="New">New</option>
                        <option value="Investigating">Investigating</option>
                        <option value="Contained">Contained</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white">{inc.incidentType}</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-snug">{inc.notes}</p>
                  </div>

                  {/* Actions Taken */}
                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-500 font-mono uppercase">Containment Actions Executed:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {inc.actionsTaken.map((act, i) => (
                        <span
                          key={i}
                          className="text-[11px] px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800 flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          {act}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Create Incident Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <form
            onSubmit={handleCreate}
            className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 text-slate-100 space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="font-bold text-base text-white">Log Security Incident</h4>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Incident Type</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                >
                  <option value="Phishing Link Clicked">Phishing Link Clicked</option>
                  <option value="Unsolicited Bank OTP Disclosed">Unsolicited Bank OTP Disclosed</option>
                  <option value="UPI Collect Request Approved">UPI Collect Request Approved</option>
                  <option value="Fake Job / Task Deposit Sent">Fake Job / Task Deposit Sent</option>
                  <option value="Digital Arrest Video Call Received">Digital Arrest Video Call Received</option>
                  <option value="Suspicious APK Downloaded">Suspicious APK Downloaded</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Notes / Context (No raw passwords)</label>
                <textarea
                  rows={3}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Describe what occurred (e.g., received SMS from unknown number claiming KYC suspension)..."
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Immediate Actions Taken:</label>
                <div className="space-y-1.5 max-h-40 overflow-y-auto p-2 rounded-xl bg-slate-950 border border-slate-800">
                  {availableActions.map((act, i) => (
                    <label key={i} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={actionsSelected.includes(act)}
                        onChange={(e) => {
                          if (e.target.checked) setActionsSelected([...actionsSelected, act]);
                          else setActionsSelected(actionsSelected.filter((a) => a !== act));
                        }}
                        className="rounded border-slate-700 text-cyan-500 bg-slate-900"
                      />
                      <span className="text-slate-300">{act}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 text-xs font-bold"
              >
                Save Incident Log
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
