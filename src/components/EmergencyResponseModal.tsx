import React, { useState } from 'react';
import {
  X,
  AlertTriangle,
  PhoneCall,
  Lock,
  WifiOff,
  CreditCard,
  Key,
  ShieldAlert,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';

interface EmergencyResponseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type IncidentType =
  | 'clicked_link'
  | 'shared_otp'
  | 'entered_upi_pin'
  | 'transferred_money'
  | 'installed_apk'
  | 'shared_aadhaar';

export const EmergencyResponseModal: React.FC<EmergencyResponseModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedIncident, setSelectedIncident] = useState<IncidentType | null>(null);

  if (!isOpen) return null;

  const incidentOptions: { id: IncidentType; title: string; desc: string; icon: string }[] = [
    {
      id: 'entered_upi_pin',
      title: 'Entered UPI PIN / Authorized Collect Request',
      desc: 'Money was debited or collect request was approved thinking it was a prize or refund.',
      icon: '💸',
    },
    {
      id: 'transferred_money',
      title: 'Transferred Money (Advance Fee / Digital Arrest)',
      desc: 'Sent funds via IMPS, NEFT, or UPI under police coercion or job deposit pretense.',
      icon: '🏦',
    },
    {
      id: 'shared_otp',
      title: 'Shared OTP with Caller or Phishing Site',
      desc: 'Disclosed one-time password for bank login, SIM swap, or Aadhaar authentication.',
      icon: '🔑',
    },
    {
      id: 'clicked_link',
      title: 'Clicked Suspicious Link & Entered Passwords',
      desc: 'Navigated to lookalike portal and submitted net banking credentials or email logins.',
      icon: '🎣',
    },
    {
      id: 'installed_apk',
      title: 'Installed Unknown APK or Remote Screen App',
      desc: 'Installed APK via WhatsApp link or installed AnyDesk/TeamViewer at caller direction.',
      icon: '📱',
    },
    {
      id: 'shared_aadhaar',
      title: 'Shared Aadhaar / PAN / Identity Documents',
      desc: 'Uploaded identity cards to an unverified web form or impersonated government agency.',
      icon: '🪪',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-rose-500/50 shadow-2xl overflow-hidden text-slate-100 max-h-[90vh] flex flex-col">
        {/* Header Bar */}
        <div className="p-5 bg-gradient-to-r from-rose-950/80 via-slate-900 to-slate-900 border-b border-rose-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-rose-600/20 border border-rose-500/40 text-rose-400">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Emergency Incident Triage
              </h3>
              <p className="text-xs text-rose-300">
                Immediate containment playbook for active cyber fraud
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          {!selectedIncident ? (
            /* Step 1: Select Incident */
            <div className="space-y-4">
              <div className="border-l-2 border-rose-500 pl-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-rose-400">
                  Step 1 of 2
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white">
                  What happened? Select your primary incident:
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {incidentOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedIncident(opt.id)}
                    className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-rose-500/60 text-left transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-xl mb-2 block">{opt.icon}</span>
                      <strong className="text-white text-xs block group-hover:text-rose-300 transition-colors">
                        {opt.title}
                      </strong>
                      <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                        {opt.desc}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400 flex items-center gap-1 mt-3">
                      View Triage Steps <ChevronRight className="w-3 h-3" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Step 2: Tailored Immediate Mitigation */
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="border-l-2 border-emerald-500 pl-3">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400">
                    Step 2 of 2 · Action Plan
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-white">
                    Execute Immediate Containment Steps
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedIncident(null)}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Change Incident
                </button>
              </div>

              {/* Priority Indian Cyber Helpline Callout */}
              <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/60 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <PhoneCall className="w-4 h-4 animate-bounce" />
                  National Cyber Crime Helpline: Call 1930 (Toll-Free, India)
                </div>
                <p className="text-xs text-rose-200 leading-relaxed">
                  If funds were stolen, dial <strong>1930</strong> immediately within the <strong>Golden Hour (first 2-3 hours)</strong>. The National Cyber Crime Reporting Portal coordinates with NPCI and recipient banks to freeze the fraudster's mule account before cash withdrawal.
                </p>
                <div className="pt-1 flex items-center gap-2 text-[11px] font-mono text-rose-300">
                  <span>Portal: cybercrime.gov.in</span>
                </div>
              </div>

              {/* Step Checklist */}
              <div className="space-y-3">
                <h5 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Prioritized Checklist:
                </h5>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-slate-800 text-rose-400 mt-0.5">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block text-xs">
                      1. Freeze Cards & Block Netbanking Immediately
                    </strong>
                    <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                      Log into your official banking app (or call your bank's 24x7 emergency helpline) to temporarily freeze debit/credit cards and disable UPI transactions.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-slate-800 text-cyan-400 mt-0.5">
                    <WifiOff className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block text-xs">
                      2. Disconnect Device from Internet / Turn on Airplane Mode
                    </strong>
                    <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                      If you downloaded an unknown APK or clicked a suspicious link, cut Wi-Fi and cellular data immediately to stop background data exfiltration.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-slate-800 text-amber-400 mt-0.5">
                    <Key className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block text-xs">
                      3. Change Critical Passwords from a Clean Device
                    </strong>
                    <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                      Use a different trustworthy device to reset passwords for your primary email, banking portal, and password manager. Enable 2FA with an authenticator app.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-slate-800 text-emerald-400 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block text-xs">
                      4. Preserve Digital Evidence
                    </strong>
                    <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                      Take screenshots of the SMS, sender phone number, transaction UTR numbers, and call logs before deleting anything. Police and banks require this proof.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Golden Warning Notice */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
            <strong className="text-slate-300">Important Safety Reminder:</strong> NEVER look up bank customer care numbers on Google Search ads or social media. Scammers post fake helpline numbers. Always check the back of your physical ATM card or official bank statements.
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors"
          >
            Close Incident Playbook
          </button>
        </div>
      </div>
    </div>
  );
};
