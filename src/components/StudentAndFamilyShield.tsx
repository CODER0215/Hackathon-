import React, { useState } from 'react';
import {
  GraduationCap,
  Users,
  ShieldCheck,
  ShieldAlert,
  Briefcase,
  Award,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  DollarSign,
  UserCheck,
} from 'lucide-react';
import { FamilyProfileType } from '../types/threat';

interface StudentAndFamilyShieldProps {
  onTestScenario: (presetId: string) => void;
}

export const StudentAndFamilyShield: React.FC<StudentAndFamilyShieldProps> = ({ onTestScenario }) => {
  const [activeProfile, setActiveProfile] = useState<FamilyProfileType>('student');

  const profileConfigs = {
    student: {
      title: 'Student Shield Mode',
      subtitle: 'Engineered for college students, interns, and young jobseekers',
      riskLevel: 'LOW (Optimal)',
      topThreat: 'Task-Based Telegram Pyramid & Fake Tech Internships',
      priorityThreats: [
        { name: 'Fake Remote Internships', desc: 'Demands ₹799 "document processing" fee to issue offer letters.', testPreset: 'demo-internship' },
        { name: 'Part-Time Telegram Tasks', desc: 'Promises ₹3,500/day for liking videos, extracting deposits.', testPreset: 'demo-job' },
        { name: 'Fake Scholarship Grants', desc: 'Spoofs national scholarship portals to siphon netbanking logins.', testPreset: 'demo-scholarship' },
        { name: 'Exam Fee Phishing Portals', desc: 'Unofficial domains claiming to collect semester re-evaluation fees.', testPreset: 'demo-phishing-url' },
      ],
      goldenRules: [
        'Legitimate companies NEVER ask candidates to pay for internships or equipment.',
        'Never submit Aadhaar or netbanking credentials to claim unsolicited educational grants.',
        'Always check company email domains (e.g., @company.com, not free @gmail.com addresses).',
      ],
    },
    parent: {
      title: 'Parent & Household Shield',
      subtitle: 'Defends household finances, school fees, and domestic utility payments',
      riskLevel: 'LOW',
      topThreat: 'Electricity Bill Disconnection & School Fee Gateways',
      priorityThreats: [
        { name: 'Electricity Disconnection Scam', desc: 'SMS claiming power will be cut tonight at 9:30 PM due to unpaid bill.', testPreset: 'demo-kyc' },
        { name: 'Fake School/Tuition Fees', desc: 'Spoofed payment links requesting direct UPI transfer for child fees.', testPreset: 'demo-upi' },
        { name: 'Predatory Loan App Harassment', desc: 'Instant loan APKs demanding contact access and extorting funds.', testPreset: 'demo-digital-arrest' },
      ],
      goldenRules: [
        'Utility providers never shut off electricity at night via third-party WhatsApp numbers.',
        'Verify tuition payments exclusively via the official school ERP portal.',
      ],
    },
    senior: {
      title: 'Senior Citizen Care Shield',
      subtitle: 'High-contrast, simplified protection against fear coercion and bank scams',
      riskLevel: 'ELEVATED (High Target)',
      topThreat: 'Digital Arrest Police Extortion & Bank KYC Suspension',
      priorityThreats: [
        { name: 'Digital Arrest Video Extortion', desc: 'Extortionists in police uniforms claiming narcotics in Aadhaar package.', testPreset: 'demo-digital-arrest' },
        { name: 'Bank KYC Immediate Suspension', desc: 'Threatens pension or savings account freeze unless link is clicked.', testPreset: 'demo-kyc' },
        { name: 'Fake Pension / Life Certificate', desc: 'Bogus biometric verification links stealing login PINs.', testPreset: 'demo-gujarati-kyc' },
      ],
      goldenRules: [
        'Police and courts NEVER interrogate or arrest citizens over WhatsApp video calls.',
        'Never read SMS numbers (OTPs) to anyone calling claiming to be your bank manager.',
        'If scared or pressured, hang up and call your children or National Helpline 1930.',
      ],
    },
    professional: {
      title: 'Professional & Freelancer Shield',
      subtitle: 'Guards freelance contracts, invoice payments, and corporate credentials',
      riskLevel: 'LOW',
      topThreat: 'Bogus Upwork Freelance Deposits & Fake Recruiter PDFs',
      priorityThreats: [
        { name: 'Fake LinkedIn Recruiter Phish', desc: 'Sends malicious PDF or lookalike portal to harvest Google/Outlook logins.', testPreset: 'demo-phishing-url' },
        { name: 'Wire Payment Divert / Invoice Fraud', desc: 'Spoofed vendor emails requesting bank account updates for payout.', testPreset: 'demo-upi' },
        { name: 'Freelance Security Deposit Scam', desc: 'Client demands upfront payment before releasing escrow contract.', testPreset: 'demo-job' },
      ],
      goldenRules: [
        'Keep communications and escrow payments strictly within verified freelance platforms.',
        'Always verify sudden changes to vendor bank accounts via direct voice call.',
      ],
    },
  };

  const current = profileConfigs[activeProfile];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
            Tailored Persona Defense
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800">
            ROLE-BASED HEURISTICS
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Student Shield & Family Protection Profiles
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Different family members face vastly different digital deception vectors. Switch profiles to view tailored protection priorities.
        </p>
      </div>

      {/* Profile Selector Buttons */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
        {[
          { id: 'student' as const, label: '🎓 Student / Intern', desc: 'Internships, Jobs, Scholarships' },
          { id: 'senior' as const, label: '🛡️ Senior Citizen', desc: 'Digital Arrest, KYC, Pension' },
          { id: 'parent' as const, label: '👨‍👩‍👧 Parent / Home', desc: 'Bills, School Fees, Loan Apps' },
          { id: 'professional' as const, label: '💼 Professional', desc: 'Invoices, Freelancing, Credentials' },
        ].map((prof) => {
          const isActive = activeProfile === prof.id;
          return (
            <button
              key={prof.id}
              onClick={() => setActiveProfile(prof.id)}
              className={`flex-1 min-w-[160px] p-3 rounded-xl text-left transition-all ${
                isActive
                  ? 'bg-slate-800 border border-cyan-500/50 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-950/50'
              }`}
            >
              <span className="font-bold text-xs sm:text-sm block">{prof.label}</span>
              <span className="text-[11px] text-slate-400 block">{prof.desc}</span>
            </button>
          );
        })}
      </div>

      {/* Active Profile Dashboard Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
              ACTIVE DEFENSE MATRIX
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">{current.title}</h3>
            <p className="text-xs text-slate-400 mt-0.5">{current.subtitle}</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-[10px] text-slate-500 font-mono block">THREAT POSTURE</span>
              <span className="text-sm font-mono font-bold text-emerald-400">{current.riskLevel}</span>
            </div>
          </div>
        </div>

        {/* Priority Threats Grid */}
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase text-slate-400 block">
            High-Risk Threats Targeting This Profile:
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {current.priorityThreats.map((pt, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 flex flex-col justify-between space-y-2 group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <strong className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {pt.name}
                    </strong>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                      HIGH RISK
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-snug">{pt.desc}</p>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => onTestScenario(pt.testPreset)}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold inline-flex items-center gap-1"
                  >
                    Test In Scanner <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Golden Rules */}
        <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-800/40 space-y-2">
          <span className="text-xs font-mono uppercase text-cyan-300 font-bold block">
            🛡️ Essential Defense Golden Rules:
          </span>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {current.goldenRules.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">✓</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
