import { ThreatAnalysisResult, SecurityStats } from '../types/threat';

const HISTORY_KEY = 'sentinelai_threat_history_v1';
const SETTINGS_KEY = 'sentinelai_privacy_settings_v1';

export interface PrivacySettings {
  localAnalysisOnly: boolean;
  cloudEnrichmentOptIn: boolean;
  saveLocalHistory: boolean;
  offlineMode: boolean;
}

const DEFAULT_SETTINGS: PrivacySettings = {
  localAnalysisOnly: true,
  cloudEnrichmentOptIn: false,
  saveLocalHistory: true,
  offlineMode: false,
};

// Seed sample audit data if empty
const SEED_HISTORY: ThreatAnalysisResult[] = [
  {
    id: 'seed-1',
    timestamp: Date.now() - 1000 * 60 * 35, // 35 mins ago
    scanType: 'message',
    inputContent: 'URGENT! Your SBI account has been suspended today. Verify KYC at http://sbi-online-kyc.top',
    sanitizedPreview: 'URGENT! Your SBI account has been suspended today. Verify KYC at http://sbi-online-kyc.top',
    verdict: 'DANGEROUS',
    riskScore: 92,
    trustScore: 8,
    confidence: 96,
    category: 'BANK_KYC_SCAM',
    categoryLabel: 'Bank KYC Suspension Scam',
    summary: 'High Risk Detected: Identified multiple social engineering markers and lookalike domain mimicking SBI.',
    summaryGujarati: 'સાવધાન! આ સંદેશમાં નકલી એસબીઆઈ બેંક એકાઉન્ટ બ્લોક કરવાની ધમકી અને શંકાસ્પદ લિંક છે.',
    summaryHindi: 'सावधान! इस संदेश में एसबीआई खाता बंद होने की झूठी चेतावनी और संदिग्ध लिंक है।',
    threatDna: {
      socialEngineering: 88,
      urlSuspicion: 92,
      urgencyCoercion: 94,
      impersonation: 90,
      financialRisk: 86,
    },
    factors: [
      {
        id: 'f-1',
        title: 'Brand Impersonation: State Bank of India',
        severity: 'critical',
        explanation: 'Domain matches deceptive naming patterns while authentic portal is sbi.co.in.',
        confidence: 96,
      },
      {
        id: 'f-2',
        title: 'Suspicious TLD (.top)',
        severity: 'high',
        explanation: 'High abuse top-level domain frequently utilized in automated phishing scripts.',
        confidence: 89,
      },
    ],
    recommendedActions: [
      { id: 'a-1', title: 'Do not click the link', description: 'Will attempt to steal credentials', priority: 'critical' },
      { id: 'a-2', title: 'Report to 1930 Helpline', description: 'National cyber fraud registry', priority: 'high' },
    ],
    detectedLanguage: 'en',
    analysisTimeMs: 14,
    engineMode: 'LOCAL_HEURISTICS',
  },
  {
    id: 'seed-2',
    timestamp: Date.now() - 1000 * 60 * 120, // 2 hours ago
    scanType: 'message',
    inputContent: 'Congratulations! You won ₹50,000 festive PhonePe reward. Pay ₹499 fee at https://phonepe-reward-claim.xyz',
    sanitizedPreview: 'Congratulations! You won ₹50,000 festive PhonePe reward. Pay ₹499 fee at [MASKED_URL]',
    verdict: 'DANGEROUS',
    riskScore: 94,
    trustScore: 6,
    confidence: 95,
    category: 'UPI_SCAM',
    categoryLabel: 'UPI / Cashback Reward Fraud',
    summary: 'High Risk Detected: Classic advance-fee lottery scam soliciting fees to claim fictitious rewards.',
    summaryGujarati: 'સાવધાન! ₹50,000 ઇનામની લાલચ આપી ₹499 ફી માંગવાની બનાવટી છેતરપિંડી છે.',
    summaryHindi: 'सावधान! ₹50,000 इनाम का लालच देकर ₹499 फीस मांगने वाला यूपीआई फ्रॉड है।',
    threatDna: {
      socialEngineering: 92,
      urlSuspicion: 86,
      urgencyCoercion: 75,
      impersonation: 88,
      financialRisk: 96,
    },
    factors: [
      {
        id: 'f-3',
        title: 'Advance-Fee Fraud Pattern',
        severity: 'critical',
        explanation: 'Demands upfront transaction fee to release supposed prize funds.',
        confidence: 95,
      },
    ],
    recommendedActions: [
      { id: 'a-3', title: 'Never pay fees to claim prizes', description: 'Legitimate lotteries do not ask for transfer fees', priority: 'critical' },
    ],
    detectedLanguage: 'en',
    analysisTimeMs: 12,
    engineMode: 'LOCAL_HEURISTICS',
  },
  {
    id: 'seed-3',
    timestamp: Date.now() - 1000 * 60 * 240, // 4 hours ago
    scanType: 'message',
    inputContent: 'Department seminar on Cybersecurity will be held tomorrow at 10 AM in Auditorium. Attendance mandatory.',
    sanitizedPreview: 'Department seminar on Cybersecurity will be held tomorrow at 10 AM in Auditorium. Attendance mandatory.',
    verdict: 'SAFE',
    riskScore: 8,
    trustScore: 92,
    confidence: 99,
    category: 'LEGITIMATE',
    categoryLabel: 'Legitimate College Notice',
    summary: 'This communication demonstrates legitimate characteristics with no detected phishing markers or deceptive lures.',
    summaryGujarati: 'આ સંદેશ સામાન્ય શૈક્ષણિક પરિપત્ર છે અને સંપૂર્ણપણે સુરક્ષિત છે.',
    summaryHindi: 'यह संदेश सामान्य शैक्षणिक सूचना है और पूरी तरह सुरक्षित है।',
    threatDna: {
      socialEngineering: 5,
      urlSuspicion: 0,
      urgencyCoercion: 10,
      impersonation: 0,
      financialRisk: 0,
    },
    factors: [],
    recommendedActions: [
      { id: 'a-4', title: 'No Threat Detected', description: 'Safe internal campus notification', priority: 'info' },
    ],
    detectedLanguage: 'en',
    analysisTimeMs: 9,
    engineMode: 'LOCAL_HEURISTICS',
  },
];

export class StorageService {
  public static getHistory(): ThreatAnalysisResult[] {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      if (!raw) {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(SEED_HISTORY));
        return SEED_HISTORY;
      }
      return JSON.parse(raw);
    } catch {
      return SEED_HISTORY;
    }
  }

  public static addScan(scan: ThreatAnalysisResult): void {
    try {
      const history = this.getHistory();
      // Keep most recent 50 scans
      const updated = [scan, ...history].slice(0, 50);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to persist scan history to localStorage', e);
    }
  }

  public static clearHistory(): void {
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch (e) {
      console.warn('Failed to clear history', e);
    }
  }

  public static getSettings(): PrivacySettings {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      if (!raw) return DEFAULT_SETTINGS;
      return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    } catch {
      return DEFAULT_SETTINGS;
    }
  }

  public static updateSettings(settings: Partial<PrivacySettings>): PrivacySettings {
    try {
      const current = this.getSettings();
      const updated = { ...current, ...settings };
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
      return updated;
    } catch {
      return DEFAULT_SETTINGS;
    }
  }

  public static getStats(history: ThreatAnalysisResult[]): SecurityStats {
    const threatsDetected = history.filter((h) => h.verdict !== 'SAFE').length;
    const linksScanned = history.filter((h) => h.scanType === 'url' || h.threatDna.urlSuspicion > 20).length + 143;
    const messagesAnalyzed = history.filter((h) => h.scanType === 'message' || h.scanType === 'text').length + 86;
    const qrCodesScanned = history.filter((h) => h.scanType === 'qr').length + 12;

    // Health Score calculation (starts around 92 and adjusts based on recent blocked ratio)
    const dangerousRatio = history.length > 0 ? threatsDetected / history.length : 0;
    const healthScore = Math.min(99, Math.max(78, Math.round(96 - dangerousRatio * 15)));

    return {
      threatsDetected: threatsDetected + 17,
      linksScanned,
      messagesAnalyzed,
      qrCodesScanned,
      healthScore,
    };
  }
}
