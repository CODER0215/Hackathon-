import React, { useState, useEffect } from 'react';
import {
  Radio,
  Play,
  Pause,
  PlusCircle,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Lock,
  ExternalLink,
  Zap,
} from 'lucide-react';
import { SimulationEvent } from '../types/threat';

interface LiveProtectionFeedProps {
  onInspectEvent: (payload: string, type: 'url' | 'message') => void;
}

const INITIAL_EVENTS: SimulationEvent[] = [
  {
    id: 'ev-1',
    timestamp: '09:41:02',
    type: 'SMS',
    senderOrDomain: '+91 98210 44211',
    preview: 'Your bank account will be blocked today. Verify KYC immediately at http://sbi-online-kyc.top',
    threat: 'Fake Bank KYC Threat',
    riskScore: 92,
    action: 'BLOCKED',
  },
  {
    id: 'ev-2',
    timestamp: '09:41:08',
    type: 'URL',
    senderOrDomain: 'paypal-secure-login.example.com',
    preview: 'Navigation attempt intercepted via background listener',
    threat: 'Brand Impersonation Phishing',
    riskScore: 88,
    action: 'BLOCKED',
  },
  {
    id: 'ev-3',
    timestamp: '09:41:19',
    type: 'UPI',
    senderOrDomain: 'merchant.claim-payout@paytm',
    preview: 'Collect request ₹499 disguised as "PhonePe ₹50,000 festive reward"',
    threat: 'UPI Advance-Fee Fraud',
    riskScore: 95,
    action: 'BLOCKED',
  },
  {
    id: 'ev-4',
    timestamp: '09:41:27',
    type: 'EMAIL',
    senderOrDomain: 'cbi-investigation-notice@mail-alert.work',
    preview: 'Digital Arrest notice: narcotics parcel intercepted with your Aadhaar ID',
    threat: 'Digital Arrest Extortion',
    riskScore: 97,
    action: 'BLOCKED',
  },
  {
    id: 'ev-5',
    timestamp: '09:41:40',
    type: 'SMS',
    senderOrDomain: 'IIT-BOMBAY',
    preview: 'Annual Cybersecurity Seminar scheduled tomorrow at 10 AM in Auditorium',
    threat: 'Legitimate College Notice',
    riskScore: 8,
    action: 'ALLOWED',
  },
];

const RANDOM_SCENARIOS = [
  {
    type: 'SMS' as const,
    senderOrDomain: '+91 79822 10932',
    preview: 'તમારું KYC પૂર્ણ કરો નહીંતર ખાતું બ્લોક થઈ જશે: http://bank-kyc-gujarat.online',
    threat: 'Regional Gujarati Bank Scam',
    riskScore: 91,
    action: 'BLOCKED' as const,
  },
  {
    type: 'UPI' as const,
    senderOrDomain: 'reward-upi-bot@ybl',
    preview: 'Enter UPI PIN to accept cashback ₹1,999 in Google Pay',
    threat: 'Reverse UPI PIN Trap',
    riskScore: 94,
    action: 'BLOCKED' as const,
  },
  {
    type: 'URL' as const,
    senderOrDomain: 'indiapost-redelivery.buzz',
    preview: 'Speed Post parcel pending delivery. Pay ₹25 update fee',
    threat: 'Fake Courier Fee Phishing',
    riskScore: 86,
    action: 'BLOCKED' as const,
  },
  {
    type: 'QR' as const,
    senderOrDomain: 'Parking Lot Sticker',
    preview: 'QR pointing to unencrypted parking payment APK download',
    threat: 'Malicious Quishing / APK Drop',
    riskScore: 89,
    action: 'BLOCKED' as const,
  },
];

export const LiveProtectionFeed: React.FC<LiveProtectionFeedProps> = ({ onInspectEvent }) => {
  const [events, setEvents] = useState<SimulationEvent[]>(INITIAL_EVENTS);
  const [isRunning, setIsRunning] = useState(true);
  const [speedMs, setSpeedMs] = useState(4000); // 4 seconds between events

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const randomItem = RANDOM_SCENARIOS[Math.floor(Math.random() * RANDOM_SCENARIOS.length)];
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(
        now.getMinutes()
      ).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

      const newEvent: SimulationEvent = {
        id: `ev-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
        timestamp: timeStr,
        ...randomItem,
      };

      setEvents((prev) => [newEvent, ...prev.slice(0, 19)]); // Keep last 20
    }, speedMs);

    return () => clearInterval(interval);
  }, [isRunning, speedMs]);

  const handleInjectAttack = () => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    const attack: SimulationEvent = {
      id: `ev-manual-${Date.now()}`,
      timestamp: timeStr,
      type: 'SMS',
      senderOrDomain: '+91 99110 88299 [INJECTED]',
      preview: 'URGENT: Police Arrest Warrant #MH-8812 issued for Aadhaar illegal transactions. Call immediately.',
      threat: 'Digital Arrest Extortion Attack',
      riskScore: 98,
      action: 'BLOCKED',
    };

    setEvents((prev) => [attack, ...prev]);
  };

  const handleReset = () => {
    setEvents(INITIAL_EVENTS);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              Endpoint Daemon Simulator
            </span>
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              PROTECTION ENGINE: ACTIVE
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Real-Time Threat Interception Stream
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Simulates device background monitoring for incoming SMS, UPI notifications, URLs and QR scans.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
              isRunning
                ? 'bg-slate-900 border-slate-700 text-amber-300 hover:bg-slate-800'
                : 'bg-emerald-950/80 border-emerald-600 text-emerald-300 hover:bg-emerald-900'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-3.5 h-3.5" /> Pause Feed
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" /> Resume Feed
              </>
            )}
          </button>

          <button
            onClick={handleInjectAttack}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white text-xs font-bold shadow-md shadow-rose-950/50 transition-all active:scale-95"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            Inject Simulated Attack
          </button>

          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Reset to initial state"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Transparent Disclaimer Box */}
      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3 text-xs text-slate-400">
        <Lock className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
        <p leading-relaxed>
          <strong className="text-slate-200">Hackathon Simulation Demonstration:</strong> In web browsers, sandboxing restricts direct OS-level SMS interception. SentinelAI's architecture simulates background daemon telemetry, demonstrating how our planned Android Notification Listener & Browser Extension inspect and neutralize incoming attacks.
        </p>
      </div>

      {/* Live Stream Table / Feed Cards */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>INTERCEPT LOG STREAM ({events.length} EVENTS)</span>
          </div>
          <span className="text-[11px] text-slate-500">CLICK ANY EVENT TO SCAN IN-DEPTH</span>
        </div>

        <div className="divide-y divide-slate-800/80 max-h-[580px] overflow-y-auto">
          {events.map((ev) => {
            const isBlocked = ev.action === 'BLOCKED';
            const actionStyle = isBlocked
              ? 'bg-rose-950/50 text-rose-300 border-rose-800/60'
              : 'bg-emerald-950/50 text-emerald-300 border-emerald-800/60';

            return (
              <div
                key={ev.id}
                onClick={() => onInspectEvent(ev.preview, ev.type === 'URL' ? 'url' : 'message')}
                className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-800/40 cursor-pointer transition-colors group"
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`p-2 rounded-lg border mt-0.5 ${
                      isBlocked
                        ? 'bg-rose-950/30 border-rose-800/50 text-rose-400'
                        : 'bg-emerald-950/30 border-emerald-800/50 text-emerald-400'
                    }`}
                  >
                    {isBlocked ? (
                      <ShieldAlert className="w-5 h-5" />
                    ) : (
                      <ShieldCheck className="w-5 h-5" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs text-slate-400">{ev.timestamp}</span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {ev.type}
                      </span>
                      <span className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors">
                        {ev.threat}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 font-mono line-clamp-2 max-w-2xl">
                      {ev.preview}
                    </p>

                    <div className="text-[11px] text-slate-500 font-mono">
                      Source: {ev.senderOrDomain}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end md:self-center">
                  <div className="text-right">
                    <span className="block text-[10px] text-slate-500 font-mono">RISK SCORE</span>
                    <span
                      className={`text-sm font-bold font-mono ${
                        ev.riskScore >= 70
                          ? 'text-rose-400'
                          : ev.riskScore >= 40
                          ? 'text-amber-400'
                          : 'text-emerald-400'
                      }`}
                    >
                      {ev.riskScore}/100
                    </span>
                  </div>

                  <span className={`px-2.5 py-1 rounded text-xs font-mono font-bold border ${actionStyle}`}>
                    {ev.action}
                  </span>

                  <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
