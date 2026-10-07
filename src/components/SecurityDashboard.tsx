import React from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Link as LinkIcon,
  MessageSquare,
  Lock,
  Activity,
  AlertTriangle,
  TrendingUp,
  Sparkles,
  ArrowUpRight,
  Shield,
  Zap,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie,
} from 'recharts';
import { SecurityStats, ThreatAnalysisResult } from '../types/threat';
import { NavTab } from './Navbar';

interface SecurityDashboardProps {
  stats: SecurityStats;
  history: ThreatAnalysisResult[];
  setActiveTab: (tab: NavTab) => void;
  onScanShortcut: () => void;
}

export const SecurityDashboard: React.FC<SecurityDashboardProps> = ({
  stats,
  history,
  setActiveTab,
  onScanShortcut,
}) => {
  // Chart category data
  const categoryData = [
    { name: 'Phishing URLs', count: 18, color: '#06b6d4' },
    { name: 'Bank KYC', count: 14, color: '#f43f5e' },
    { name: 'UPI & Payment', count: 12, color: '#f59e0b' },
    { name: 'Digital Arrest', count: 6, color: '#8b5cf6' },
    { name: 'Job Scams', count: 8, color: '#3b82f6' },
    { name: 'Safe Messages', count: 24, color: '#10b981' },
  ];

  const distributionData = [
    { name: 'Dangerous', value: 26, color: '#f43f5e' },
    { name: 'High Risk', value: 16, color: '#f97316' },
    { name: 'Suspicious', value: 14, color: '#f59e0b' },
    { name: 'Safe', value: 44, color: '#10b981' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Top Banner & Quick Trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              Security Operations Center (SOC)
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800">
              ZERO-TELEMETRY DASHBOARD
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Personal Cyber Threat Posture
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Aggregated local analytics on scanned communications, blocked vectors, and defense health.
          </p>
        </div>

        <button
          onClick={onScanShortcut}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-950/60 transition-all self-start sm:self-auto active:scale-95"
        >
          <Zap className="w-4 h-4 fill-current text-slate-950" />
          Run Threat Scan
        </button>
      </div>

      {/* 6 Key Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* 1. Protection Status */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Protection</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-lg sm:text-xl font-extrabold text-emerald-400 font-mono">
            ACTIVE
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">Heuristics Armed</span>
        </div>

        {/* 2. Threats Detected */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Threats Neutralized</span>
            <ShieldAlert className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-lg sm:text-xl font-extrabold text-rose-400 font-mono">
            {stats.threatsDetected}
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">Phishing & Scams</span>
        </div>

        {/* 3. Links Scanned */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">URLs Evaluated</span>
            <LinkIcon className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-lg sm:text-xl font-extrabold text-white font-mono">
            {stats.linksScanned}
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">Domain Heuristics</span>
        </div>

        {/* 4. Messages Analyzed */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Messages Analyzed</span>
            <MessageSquare className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-lg sm:text-xl font-extrabold text-white font-mono">
            {stats.messagesAnalyzed}
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">SMS & WhatsApp</span>
        </div>

        {/* 5. Current Risk Level */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Risk Posture</span>
            <Activity className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-lg sm:text-xl font-extrabold text-cyan-300 font-mono">
            LOW
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">No Active Breaches</span>
        </div>

        {/* 6. Privacy Status */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Privacy Status</span>
            <Lock className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xs font-bold text-emerald-400 font-mono leading-tight mt-1">
            LOCAL ENGINE
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">Zero Telemetry</span>
        </div>
      </div>

      {/* Main Section: Health Score + AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Security Health Score Card */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                Security Health Index
              </span>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                OPTIMAL
              </span>
            </div>

            <div className="flex items-baseline gap-3 my-2">
              <span className="text-5xl font-extrabold text-white font-mono tracking-tight">
                {stats.healthScore}
              </span>
              <span className="text-xl font-mono text-slate-500">/ 100</span>
            </div>

            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Your overall defense index is calculated continuously based on promptness of blocking suspicious URLs, verification of unsolicited OTPs, and avoidance of lookalike domains.
            </p>

            <div className="mt-5 space-y-2 border-t border-slate-800 pt-4">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Heuristic Engine Health</span>
                <span className="font-mono text-emerald-400 font-bold">100%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">India Scam Filter Coverage</span>
                <span className="font-mono text-cyan-400 font-bold">98%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Credential Leak Prevention</span>
                <span className="font-mono text-emerald-400 font-bold">Secured</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Score formula transparently audited</span>
            <button
              onClick={() => setActiveTab('privacy')}
              className="text-cyan-400 hover:underline flex items-center gap-1"
            >
              Privacy Spec <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Security Insights & Telemetry */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Automated AI Security Insights
            </h3>
            <span className="text-[11px] text-slate-500">Generated On-Device</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="text-rose-400 font-bold text-sm mb-1">
                62% Used Urgency Tactics
              </div>
              <p className="text-xs text-slate-400 leading-snug">
                The majority of flagged messages attempted to induce panic by claiming "account suspended today" or "24-hour deadline".
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="text-amber-400 font-bold text-sm mb-1">
                3 Fake UPI Requests
              </div>
              <p className="text-xs text-slate-400 leading-snug">
                Attackers attempted advance-fee collection disguised as cashback. Remember: PIN is NEVER required to receive money.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="text-purple-400 font-bold text-sm mb-1">
                Digital Arrest Awareness
              </div>
              <p className="text-xs text-slate-400 leading-snug">
                Extortionists posing as CBI or Mumbai police are heavily active. Law enforcement never questions via WhatsApp video calls.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="text-cyan-400 font-bold text-sm mb-1">
                Lookalike Domain Surge
              </div>
              <p className="text-xs text-slate-400 leading-snug">
                Phishing campaigns are registering .top, .xyz and .buzz extensions targeting SBI, PhonePe, and India Post customers.
              </p>
            </div>
          </div>

          {/* Actionable Tip Banner */}
          <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-200 flex items-start gap-2.5">
            <Shield className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Core Defense Principle:</strong> "Think Before You Trust." Always verify unexpected financial and KYC communications directly in official banking apps or by dialing your bank's verified helpline.
            </p>
          </div>
        </div>
      </div>

      {/* Visual Analytics Grid: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Category Breakdown Bar Chart */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Detected Vectors by Threat Category
            </h3>
            <span className="text-[11px] text-slate-500 font-mono">Cumulative Scans</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <XAxis
                  dataKey="name"
                  stroke="#64748b"
                  fontSize={10}
                  tickLine={false}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#f8fafc',
                  }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Distribution Pie Chart */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Risk Severity Breakdown
            </h3>
            <span className="text-[11px] text-slate-500 font-mono">Ratio</span>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#f8fafc',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800">
            {distributionData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                <span className="text-slate-400">{item.name}</span>
                <span className="font-mono text-slate-200 ml-auto">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
