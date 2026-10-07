/**
 * SentinelAI V2 - Threat Detection & Intelligence Types
 */

export type ThreatVerdict = 'SAFE' | 'SUSPICIOUS' | 'HIGH_RISK' | 'DANGEROUS';

export type ScanType = 'url' | 'message' | 'email' | 'text' | 'qr';

export type ThreatCategory =
  | 'PHISHING'
  | 'UPI_SCAM'
  | 'BANK_KYC_SCAM'
  | 'DIGITAL_ARREST'
  | 'JOB_INTERNSHIP_SCAM'
  | 'LOTTERY_PRIZE_SCAM'
  | 'COURIER_DELIVERY_SCAM'
  | 'LOAN_APP_FRAUD'
  | 'TECH_SUPPORT_SCAM'
  | 'MALICIOUS_ATTACHMENT'
  | 'SCHOLARSHIP_SCAM'
  | 'HOMOGLYPH_SPOOF'
  | 'LEGITIMATE';

export type FactorSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface ThreatFactor {
  id: string;
  title: string;
  severity: FactorSeverity;
  explanation: string;
  evidence?: string;
  confidence: number; // 0 - 100
  category?: string;
}

export interface DetectorSignal {
  id: string;
  detector:
    | 'URLAnalyzer'
    | 'NLPAnalyzer'
    | 'SocialEngineeringAnalyzer'
    | 'ImpersonationAnalyzer'
    | 'HomoglyphDetector'
    | 'FinancialAnalyzer'
    | 'RuleEngine'
    | 'LocalMLModel'
    | 'ThreatIntel';
  signal: string;
  severity: number;   // 0.0 - 1.0
  confidence: number; // 0.0 - 1.0
  explanation: string;
  evidence?: string;
  category?: string;
}

export interface ThreatDNA {
  socialEngineering: number;    // 0 - 100
  urlSuspicion: number;         // 0 - 100
  urlDeception?: number;        // 0 - 100
  urgencyCoercion: number;      // 0 - 100
  impersonation: number;        // 0 - 100
  financialRisk: number;        // 0 - 100
  financialManipulation?: number; // 0 - 100
  credentialTheft?: number;     // 0 - 100
}

export interface RecommendedAction {
  id: string;
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'info';
  icon?: string;
}

export interface AttackChainNode {
  id: string;
  stage:
    | 'RECON / ORIGIN'
    | 'FAKE AUTHORITY'
    | 'URGENCY / MANIPULATION'
    | 'FEAR / REWARD HOOK'
    | 'SUSPICIOUS LINK / GATEWAY'
    | 'CREDENTIAL / PIN SOLICITATION'
    | 'ACCOUNT TAKEOVER / MONETARY LOSS';
  title: string;
  status: 'DETECTED' | 'LIKELY' | 'POSSIBLE';
  description: string;
  evidence?: string;
}

export interface UrlDecomposition {
  rawUrl: string;
  protocol: string;
  isHttps: boolean;
  subdomain: string;
  registeredDomain: string;
  tld: string;
  port?: string;
  path: string;
  query: string;
  fragment: string;
  isIpHost: boolean;
  hasPunycode: boolean;
  hasHomoglyph: boolean;
  isShortener: boolean;
  suspiciousIndicators: {
    title: string;
    severity: FactorSeverity;
    explanation: string;
  }[];
}

export interface SocialEngineeringProfile {
  urgency: 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH';
  fear: 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH';
  authority: 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH';
  reward: 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH';
  financialPressure: 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH';
  secrecy: 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH';
  scarcity: 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH';
  explanation: string;
}

export interface ScamCampaign {
  id: string;
  title: string;
  targetBrand: string;
  vector: string;
  relatedCount: number;
  firstSeen: string;
  commonIndicators: string[];
  severity: 'HIGH' | 'CRITICAL';
  summary: string;
}

export interface ThreatAnalysisResult {
  id: string;
  timestamp: number;
  scanType: ScanType;
  inputContent: string;
  sanitizedPreview: string;
  verdict: ThreatVerdict;
  riskScore: number;       // 0 - 100 (overallRisk)
  trustScore: number;      // 0 - 100
  confidence: number;      // 0 - 100 (Separated: Risk != Confidence)
  severity?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  privacyRisk?: 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH';
  category: ThreatCategory;
  categoryLabel: string;
  summary: string;
  summaryGujarati?: string;
  summaryHindi?: string;
  threatDna: ThreatDNA;
  factors: ThreatFactor[];
  signals?: DetectorSignal[];
  attackChain?: AttackChainNode[];
  urlDecomposition?: UrlDecomposition;
  seProfile?: SocialEngineeringProfile;
  campaignMatch?: ScamCampaign;
  potentialFalsePositive?: string;
  recommendedActions: RecommendedAction[];
  detectedLanguage?: 'en' | 'gu' | 'hi' | 'hinglish';
  analysisTimeMs: number;
  engineMode: 'LOCAL_HEURISTICS' | 'HYBRID_INTELLIGENCE';
}

export interface ScanPreset {
  id: string;
  name: string;
  category: ThreatCategory;
  scanType: ScanType;
  description: string;
  tag: string;
  content: string;
  language: 'en' | 'gu' | 'hi' | 'hinglish';
  qrImageUrl?: string;
  campaignId?: string;
}

export interface SimulationEvent {
  id: string;
  timestamp: string;
  type: 'SMS' | 'URL' | 'UPI' | 'QR' | 'EMAIL';
  senderOrDomain: string;
  preview: string;
  threat: string;
  riskScore: number;
  action: 'BLOCKED' | 'FLAGGED' | 'ALLOWED';
}

export interface SecurityStats {
  threatsDetected: number;
  linksScanned: number;
  messagesAnalyzed: number;
  qrCodesScanned: number;
  healthScore: number;
}

export type FamilyProfileType = 'student' | 'parent' | 'senior' | 'professional';

export interface SecurityIncident {
  id: string;
  timestamp: number;
  incidentType: string;
  category: string;
  riskScore: number;
  actionsTaken: string[];
  status: 'New' | 'Investigating' | 'Contained' | 'Resolved';
  notes: string;
  hash: string;
}

export interface PrivacyAuditEntry {
  id: string;
  timestamp: string;
  action: string;
  detail: string;
  status: 'LOCAL_ONLY' | 'ENCRYPTED' | 'ZERO_RETENTION';
}
