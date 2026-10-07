import React, { useState } from 'react';
import {
  X,
  PhoneCall,
  Lock,
  WifiOff,
  CreditCard,
  Key,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

interface EmergencyDecisionTreeProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyDecisionTree: React.FC<EmergencyDecisionTreeProps> = ({
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState<number>(1);
  const [enteredCredentials, setEnteredCredentials] = useState<boolean | null>(null);
  const [sharedOtp, setSharedOtp] = useState<boolean | null>(null);
  const [madePayment, setMadePayment] = useState<boolean | null>(null);
  const [downloadedApk, setDownloadedApk] = useState<boolean | null>(null);

  if (!isOpen) return null;

  const handleReset = () => {
    setStep(1);
    setEnteredCredentials(null);
    setSharedOtp(null);
    setMadePayment(null);
    setDownloadedApk(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-2xl rounded-2xl bg-slate-900 border border-rose-500/50 shadow-2xl overflow-hidden text-slate-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-rose-950/80 via-slate-900 to-slate-900 border-b border-rose-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-rose-600/20 border border-rose-500/40 text-rose-400">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Emergency Scam Decision Tree 2.0
              </h3>
              <p className="text-xs text-rose-300">
                Guided triage: Answer 4 quick questions to receive an exact containment checklist
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
          {step < 5 ? (
            /* Interactive Decision Questions */
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>QUESTION {step} OF 4</span>
                <span className="text-cyan-400">{Math.round((step / 4) * 100)}% COMPLETE</span>
              </div>

              {step === 1 && (
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-white">
                    Did you enter passwords, usernames, or bank account numbers on the site?
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        setEnteredCredentials(true);
                        setStep(2);
                      }}
                      className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/80 hover:bg-rose-950/60 text-white font-bold text-center transition-all"
                    >
                      YES, I entered credentials
                    </button>
                    <button
                      onClick={() => {
                        setEnteredCredentials(false);
                        setStep(2);
                      }}
                      className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 font-semibold text-center transition-all"
                    >
                      NO, only viewed the link
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-white">
                    Did you share or enter an OTP (One-Time Password)?
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        setSharedOtp(true);
                        setStep(3);
                      }}
                      className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/80 hover:bg-rose-950/60 text-white font-bold text-center transition-all"
                    >
                      YES, I disclosed/entered an OTP
                    </button>
                    <button
                      onClick={() => {
                        setSharedOtp(false);
                        setStep(3);
                      }}
                      className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 font-semibold text-center transition-all"
                    >
                      NO OTP was shared
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-white">
                    Did you transfer funds, pay a fee, or authorize a UPI collect request?
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        setMadePayment(true);
                        setStep(4);
                      }}
                      className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/80 hover:bg-rose-950/60 text-white font-bold text-center transition-all"
                    >
                      YES, money was transferred / debited
                    </button>
                    <button
                      onClick={() => {
                        setMadePayment(false);
                        setStep(4);
                      }}
                      className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 font-semibold text-center transition-all"
                    >
                      NO payment made
                    </button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-white">
                    Did you install any APK file or remote support software (AnyDesk, TeamViewer)?
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        setDownloadedApk(true);
                        setStep(5);
                      }}
                      className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/80 hover:bg-rose-950/60 text-white font-bold text-center transition-all"
                    >
                      YES, an app/APK was installed
                    </button>
                    <button
                      onClick={() => {
                        setDownloadedApk(false);
                        setStep(5);
                      }}
                      className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 font-semibold text-center transition-all"
                    >
                      NO software was installed
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Tailored Immediate Containment Checklist */
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block">
                    CUSTOM TRIAGE PLAYBOOK GENERATED
                  </span>
                  <h4 className="text-base font-bold text-white">Immediate Prioritized Actions</h4>
                </div>
                <button
                  onClick={handleReset}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Retake Triage
                </button>
              </div>

              {/* If money was paid */}
              {madePayment && (
                <div className="p-4 rounded-xl bg-rose-950/50 border border-rose-500/80 space-y-1.5">
                  <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
                    <PhoneCall className="w-4 h-4 animate-bounce" />
                    CRITICAL: Dial National Cyber Helpline 1930 NOW (India)
                  </div>
                  <p className="text-xs text-rose-200 leading-relaxed">
                    Money was transferred. Dialing <strong>1930</strong> within the <strong>Golden Hour (first 2 hours)</strong> triggers immediate banking inter-branch freezing of the recipient mule account before cash is withdrawn.
                  </p>
                </div>
              )}

              {/* If APK was installed */}
              {downloadedApk && (
                <div className="p-4 rounded-xl bg-amber-950/50 border border-amber-500/80 space-y-1.5">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                    <WifiOff className="w-4 h-4" />
                    Turn on Airplane Mode & Uninstall Malicious App
                  </div>
                  <p className="text-xs text-amber-200 leading-relaxed">
                    Cut off internet immediately to halt remote accessibility and keystroke harvesting. Boot into Safe Mode to remove the APK.
                  </p>
                </div>
              )}

              {/* Prioritized Steps */}
              <div className="space-y-2.5">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <CreditCard className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-white block text-xs">
                      1. Freeze Cards & Netbanking via Official App
                    </strong>
                    <p className="text-slate-400 text-xs mt-0.5">
                      Log into your official bank mobile app to toggle "Card Freeze" and disable online e-commerce transactions.
                    </p>
                  </div>
                </div>

                {enteredCredentials && (
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                    <Key className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-white block text-xs">
                        2. Reset Credentials From a Different Device
                      </strong>
                      <p className="text-slate-400 text-xs mt-0.5">
                        Do not use the compromised phone/browser. From a clean PC, change passwords for primary email and netbanking.
                      </p>
                    </div>
                  </div>
                )}

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-white block text-xs">
                      3. File Evidence Report on cybercrime.gov.in
                    </strong>
                    <p className="text-slate-400 text-xs mt-0.5">
                      Preserve screenshots of the message, caller phone number, and transaction UTR before deleting anything.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors"
          >
            Close Triage Guide
          </button>
        </div>
      </div>
    </div>
  );
};
