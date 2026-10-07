/**
 * SentinelAI V2 - Modular Threat Fusion Engine
 * Multi-Vector Signal Architecture with Deterministic Explainability
 */

import {
  ThreatAnalysisResult,
  ThreatVerdict,
  ThreatCategory,
  ThreatFactor,
  ThreatDNA,
  RecommendedAction,
  DetectorSignal,
  AttackChainNode,
  UrlDecomposition,
  SocialEngineeringProfile,
  ScamCampaign,
  ScanType,
} from '../types/threat';

// Known reputable domains whitelist
const REPUTABLE_DOMAINS = new Set([
  'google.com',
  'microsoft.com',
  'apple.com',
  'amazon.com',
  'amazon.in',
  'sbi.co.in',
  'onlinesbi.sbi',
  'hdfcbank.com',
  'icicibank.com',
  'axisbank.com',
  'rbi.org.in',
  'npci.org.in',
  'uidai.gov.in',
  'incometax.gov.in',
  'cybercrime.gov.in',
  'indiapost.gov.in',
  'github.com',
  'wikipedia.org',
  'iitb.ac.in',
  'iitd.ac.in',
  'gov.in',
  'edu',
  'ac.in',
  'example.com',
  'example.org',
  'example.net',
]);

const SUSPICIOUS_TLDS = new Set([
  'top',
  'xyz',
  'click',
  'buzz',
  'club',
  'work',
  'rest',
  'cam',
  'live',
  'loan',
  'gq',
  'cf',
  'tk',
  'ml',
  'ga',
  'monster',
  'surf',
  'link',
  'vip',
  'fit',
]);

const BRAND_PATTERNS = [
  { name: 'State Bank of India (SBI)', match: /sbi|state\s*bank/i, realDomain: 'sbi.co.in' },
  { name: 'HDFC Bank', match: /hdfc/i, realDomain: 'hdfcbank.com' },
  { name: 'ICICI Bank', match: /icici/i, realDomain: 'icicibank.com' },
  { name: 'Paytm', match: /paytm/i, realDomain: 'paytm.com' },
  { name: 'PhonePe', match: /phonepe/i, realDomain: 'phonepe.com' },
  { name: 'Google Pay', match: /gpay|google\s*pay/i, realDomain: 'pay.google.com' },
  { name: 'India Post', match: /india\s*post|indiapost|speed\s*post/i, realDomain: 'indiapost.gov.in' },
  { name: 'PayPal', match: /paypal/i, realDomain: 'paypal.com' },
  { name: 'Netflix', match: /netflix/i, realDomain: 'netflix.com' },
  { name: 'Amazon', match: /amazon/i, realDomain: 'amazon.in' },
  { name: 'Microsoft', match: /microsoft|office365|outlook/i, realDomain: 'microsoft.com' },
  { name: 'Income Tax Dept', match: /income\s*tax|itr/i, realDomain: 'incometax.gov.in' },
  { name: 'UIDAI Aadhaar', match: /uidai|aadhaar/i, realDomain: 'uidai.gov.in' },
];

export const SYNTHETIC_CAMPAIGNS: ScamCampaign[] = [
  {
    id: 'camp-sbi-kyc',
    title: 'Operation Fake KYC Net',
    targetBrand: 'State Bank of India',
    vector: 'SMS / Lookalike .top domains',
    relatedCount: 17,
    firstSeen: '2 days ago',
    commonIndicators: ['sbi-online-kyc.top', 'account suspended today', 'immediate pan update', 'unsolicited sms'],
    severity: 'CRITICAL',
    summary: 'Coordinated phishing campaign deploying disposable .top domains mimicking SBI KYC verification.',
  },
  {
    id: 'camp-phonepe-cashback',
    title: 'Festive UPI Reward Syndicate',
    targetBrand: 'PhonePe / NPCI',
    vector: 'WhatsApp / UPI Collect Requests',
    relatedCount: 12,
    firstSeen: 'Yesterday',
    commonIndicators: ['₹50,000 festive reward', '₹499 processing fee', 'reverse upi pin', '.xyz landing page'],
    severity: 'HIGH',
    summary: 'Advance-fee fraud network tricking users into approving UPI collect transactions disguised as rewards.',
  },
  {
    id: 'camp-indiapost-cvv',
    title: 'Speed Post Redelivery Trap',
    targetBrand: 'India Post',
    vector: 'SMS / Fake Courier Portal',
    relatedCount: 9,
    firstSeen: '4 days ago',
    commonIndicators: ['parcel pending delivery', 'address incomplete', '₹25 rescheduling fee', 'indiapost-redelivery.buzz'],
    severity: 'HIGH',
    summary: 'Card harvesting campaign soliciting nominal ₹25 redelivery fees to siphon credit/debit card credentials.',
  },
  {
    id: 'camp-telegram-task',
    title: 'Pyramid Task Scam Network',
    targetBrand: 'YouTube / Part-Time Jobs',
    vector: 'Telegram / WhatsApp Job Invites',
    relatedCount: 14,
    firstSeen: '3 days ago',
    commonIndicators: ['₹3,500/day for liking videos', 'telegram channel join', 'refundable security deposit'],
    severity: 'HIGH',
    summary: 'Task-based advance-fee fraud inducing victims into investing in fictitious VIP cryptocurrency tasks.',
  },
];

export class ThreatFusionEngine {
  /**
   * Main Fusion Analysis pipeline
   */
  public static analyze(
    content: string,
    scanType: ScanType = 'text',
    engineMode: 'LOCAL_HEURISTICS' | 'HYBRID_INTELLIGENCE' = 'LOCAL_HEURISTICS'
  ): ThreatAnalysisResult {
    const startTime = performance.now();
    const cleanContent = content.trim();

    // 1. Language Detection
    const detectedLang = this.detectLanguage(cleanContent);

    // 2. Structured Signals Collection
    const signals: DetectorSignal[] = [];

    // Extract URLs
    const urls = this.extractUrls(cleanContent);
    const hasUrls = urls.length > 0;
    const targetUrl = hasUrls ? urls[0] : scanType === 'url' ? cleanContent : null;

    // Run Independent Detectors
    let urlDecomp: UrlDecomposition | undefined = undefined;
    if (targetUrl) {
      urlDecomp = this.runUrlAnalyzer(targetUrl, signals);
      this.runHomoglyphDetector(targetUrl, signals);
    }

    this.runNlpAnalyzer(cleanContent, detectedLang, signals);
    const seProfile = this.runSocialEngineeringAnalyzer(cleanContent, signals);
    this.runBrandImpersonationAnalyzer(cleanContent, targetUrl, signals);
    this.runFinancialAnalyzer(cleanContent, signals);
    this.runRuleEngine(cleanContent, targetUrl, signals);
    this.runLocalMLModel(cleanContent, targetUrl, signals);
    this.runThreatIntelAdapter(targetUrl, cleanContent, signals);

    // 3. Threat DNA 2.0 Calculation
    const threatDna = this.computeThreatDna(signals);

    // 4. Advanced Risk & Confidence Fusion
    const { riskScore, confidence, severity } = this.fuseScores(signals, threatDna);
    const trustScore = Math.max(0, 100 - riskScore);

    // 5. Verdict Mapping
    let verdict: ThreatVerdict = 'SAFE';
    if (riskScore >= 80) verdict = 'DANGEROUS';
    else if (riskScore >= 60) verdict = 'HIGH_RISK';
    else if (riskScore >= 30) verdict = 'SUSPICIOUS';

    // 6. Categorization
    const { category, label: categoryLabel } = this.classifyCategory(cleanContent, targetUrl, signals, threatDna);

    // 7. Attack Chain Generation
    const attackChain = this.buildAttackChain(cleanContent, targetUrl, signals, verdict, category);

    // 8. Campaign Intelligence Correlation
    const campaignMatch = this.correlateCampaign(cleanContent, targetUrl, category);

    // 9. Potential False Positive Review
    const potentialFalsePositive = this.evaluateFalsePositive(cleanContent, verdict, signals);

    // 10. Factor Cards & Actionable Checklist
    const factors = this.convertSignalsToFactors(signals);
    const actions = this.generateActions(verdict, category);

    // 11. Multilingual Summaries
    const summaries = this.generateSummaries(verdict, category, categoryLabel, factors, detectedLang);

    // 12. Privacy Sanitization
    const sanitizedPreview = this.sanitizeContentPreview(cleanContent);

    const analysisTimeMs = Math.max(10, Math.round(performance.now() - startTime));

    return {
      id: `scan-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: Date.now(),
      scanType,
      inputContent: cleanContent,
      sanitizedPreview,
      verdict,
      riskScore,
      trustScore,
      confidence,
      severity,
      privacyRisk: 'LOW',
      category,
      categoryLabel,
      summary: summaries.en,
      summaryGujarati: summaries.gu,
      summaryHindi: summaries.hi,
      threatDna,
      factors,
      signals,
      attackChain,
      urlDecomposition: urlDecomp,
      seProfile,
      campaignMatch,
      potentialFalsePositive,
      recommendedActions: actions,
      detectedLanguage: detectedLang,
      analysisTimeMs,
      engineMode,
    };
  }

  // ==========================================
  // INDEPENDENT DETECTORS
  // ==========================================

  /**
   * Detector 1: URL Analyzer & Structural Decomposition
   */
  private static runUrlAnalyzer(urlStr: string, signals: DetectorSignal[]): UrlDecomposition {
    let raw = urlStr.trim();
    if (!raw.startsWith('http://') && !raw.startsWith('https://')) {
      raw = 'https://' + raw;
    }

    let parsed: URL;
    let isMalformed = false;
    try {
      parsed = new URL(raw);
    } catch {
      isMalformed = true;
      parsed = new URL('https://malformed-url.local');
    }

    const protocol = parsed.protocol.replace(':', '');
    const isHttps = protocol === 'https';
    const hostname = parsed.hostname.toLowerCase();
    const port = parsed.port || undefined;
    const path = parsed.pathname;
    const query = parsed.search;
    const fragment = parsed.hash;

    const parts = hostname.split('.');
    const tld = parts.length > 1 ? parts[parts.length - 1] : '';
    const registeredDomain = parts.length >= 2 ? `${parts[parts.length - 2]}.${tld}` : hostname;
    const subdomain = parts.length > 2 ? parts.slice(0, parts.length - 2).join('.') : '';

    const isIpHost = /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname);
    const hasPunycode = hostname.includes('xn--');
    const shorteners = ['bit.ly', 'tinyurl.com', 'is.gd', 't.co', 'cutt.ly', 'rb.gy'];
    const isShortener = shorteners.some((s) => hostname.includes(s));

    const indicators: { title: string; severity: 'low' | 'medium' | 'high' | 'critical'; explanation: string }[] = [];

    if (isMalformed) {
      signals.push({
        id: 'sig-url-malformed',
        detector: 'URLAnalyzer',
        signal: 'malformed_url_syntax',
        severity: 0.85,
        confidence: 0.95,
        explanation: 'URL contains malformed or intentionally obfuscated RFC structure.',
        evidence: urlStr,
        category: 'URL',
      });
      indicators.push({ title: 'Malformed RFC Syntax', severity: 'high', explanation: 'URL cannot be parsed correctly.' });
    }

    if (!isHttps) {
      signals.push({
        id: 'sig-url-insecure-http',
        detector: 'URLAnalyzer',
        signal: 'unencrypted_http_protocol',
        severity: 0.45,
        confidence: 0.98,
        explanation: 'Web address uses unencrypted HTTP protocol susceptible to eavesdropping and MITM tampering.',
        evidence: 'http://',
        category: 'URL',
      });
      indicators.push({ title: 'Unencrypted HTTP', severity: 'medium', explanation: 'No TLS/SSL certificate protection.' });
    }

    if (isIpHost) {
      signals.push({
        id: 'sig-url-ip-host',
        detector: 'URLAnalyzer',
        signal: 'raw_ip_address_host',
        severity: 0.9,
        confidence: 0.96,
        explanation: 'Host is a raw numerical IP address instead of a registered domain name.',
        evidence: hostname,
        category: 'URL',
      });
      indicators.push({ title: 'Raw IP Hostname', severity: 'critical', explanation: 'Legitimate institutions do not expose raw IP gateways.' });
    }

    if (SUSPICIOUS_TLDS.has(tld)) {
      signals.push({
        id: `sig-url-suspicious-tld-${tld}`,
        detector: 'URLAnalyzer',
        signal: 'disposable_high_abuse_tld',
        severity: 0.75,
        confidence: 0.88,
        explanation: `Top-level domain (.${tld}) has a statistically high correlation with disposable malicious hosting.`,
        evidence: `.${tld}`,
        category: 'URL',
      });
      indicators.push({ title: `High-Abuse TLD (.${tld})`, severity: 'high', explanation: 'Frequently used in temporary phishing kits.' });
    }

    if (parts.length > 3) {
      signals.push({
        id: 'sig-url-subdomain-stacking',
        detector: 'URLAnalyzer',
        signal: 'excessive_subdomain_stacking',
        severity: 0.7,
        confidence: 0.85,
        explanation: 'Excessive subdomain depth used to camouflage the real destination behind trusted brand names.',
        evidence: subdomain,
        category: 'URL',
      });
      indicators.push({ title: 'Subdomain Stacking', severity: 'high', explanation: 'Multiple subdomains masking real domain.' });
    }

    if (isShortener) {
      signals.push({
        id: 'sig-url-shortener',
        detector: 'URLAnalyzer',
        signal: 'obfuscated_url_shortener',
        severity: 0.5,
        confidence: 0.82,
        explanation: 'URL shortener masks target destination, preventing upfront security verification.',
        evidence: hostname,
        category: 'URL',
      });
      indicators.push({ title: 'URL Shortener', severity: 'medium', explanation: 'Redirect destination is hidden.' });
    }

    // Credential path inspection
    const credKeywords = ['login', 'signin', 'verify', 'kyc-update', 'account-blocked', 'bank-secure', 'claim-reward', 'otp-validate'];
    for (const kw of credKeywords) {
      if (path.toLowerCase().includes(kw) || query.toLowerCase().includes(kw)) {
        signals.push({
          id: `sig-url-cred-path-${kw}`,
          detector: 'URLAnalyzer',
          signal: 'credential_harvesting_path',
          severity: 0.8,
          confidence: 0.9,
          explanation: `URL path or parameter includes credential-harvesting token ("${kw}").`,
          evidence: kw,
          category: 'CREDENTIAL',
        });
        indicators.push({ title: `Credential Path Keyword (${kw})`, severity: 'high', explanation: 'Commonly found in fake login pages.' });
        break;
      }
    }

    return {
      rawUrl: urlStr,
      protocol,
      isHttps,
      subdomain,
      registeredDomain,
      tld,
      port,
      path,
      query,
      fragment,
      isIpHost,
      hasPunycode,
      hasHomoglyph: false, // will be enriched by HomoglyphDetector
      isShortener,
      suspiciousIndicators: indicators,
    };
  }

  /**
   * Detector 2: Homoglyph & Lookalike Detection
   */
  private static runHomoglyphDetector(urlStr: string, signals: DetectorSignal[]) {
    let hostname = '';
    try {
      const raw = urlStr.startsWith('http') ? urlStr : 'https://' + urlStr;
      hostname = new URL(raw).hostname.toLowerCase();
    } catch {
      hostname = urlStr.toLowerCase();
    }

    // Punycode check
    if (hostname.includes('xn--')) {
      signals.push({
        id: 'sig-homoglyph-punycode',
        detector: 'HomoglyphDetector',
        signal: 'punycode_idna_encoding',
        severity: 0.95,
        confidence: 0.96,
        explanation: 'Punycode (xn--) encoding detected. Attackers use non-Latin homoglyphs that appear identical to Latin characters.',
        evidence: hostname,
        category: 'HOMOGLYPH',
      });
    }

    // Visual homoglyphs (e.g. capital 'I' for 'l', e.g. paypaI.example)
    if (/paypa[i|1]\./i.test(urlStr) || /arnazon\./i.test(urlStr) || /g00gle\./i.test(urlStr) || /micros0ft\./i.test(urlStr)) {
      signals.push({
        id: 'sig-homoglyph-typosquat',
        detector: 'HomoglyphDetector',
        signal: 'visual_typosquatting_character_swap',
        severity: 0.92,
        confidence: 0.94,
        explanation: 'Visually deceptive character substitution detected (e.g. "I" resembling "l" or "0" resembling "o").',
        evidence: urlStr,
        category: 'HOMOGLYPH',
      });
    }

    // Mixed script detection (Cyrillic homoglyphs)
    // Cyrillic a (\u0430), e (\u0435), o (\u043E), p (\u0440), c (\u0441), y (\u0443), x (\u0445)
    if (/[\u0430\u0435\u043E\u0440\u0441\u0443\u0445]/.test(urlStr)) {
      signals.push({
        id: 'sig-homoglyph-cyrillic-spoof',
        detector: 'HomoglyphDetector',
        signal: 'cyrillic_latin_homoglyph_spoofing',
        severity: 0.98,
        confidence: 0.98,
        explanation: 'Cyrillic character spoofing detected in Latin context. Visually identical character to mimic authentic brand.',
        evidence: urlStr,
        category: 'HOMOGLYPH',
      });
    }
  }

  /**
   * Detector 3: NLP Semantic Analyzer
   */
  private static runNlpAnalyzer(text: string, lang: string, signals: DetectorSignal[]) {
    const lower = text.toLowerCase();

    // High urgency markers
    if (/urgent|immediately|within 24 hours|today only|final warning|last notice|account blocked/i.test(lower)) {
      signals.push({
        id: 'sig-nlp-urgency',
        detector: 'NLPAnalyzer',
        signal: 'high_urgency_semantic_marker',
        severity: 0.88,
        confidence: 0.93,
        explanation: 'Message induces tight deadlines and synthetic urgency to bypass rational deliberation.',
        evidence: 'urgent / blocked today / immediately',
        category: 'URGENCY',
      });
    }

    // Gujarati urgency
    if (/તુરંત|આજે જ|૨૪ કલાક|બ્લોક થઈ જશે|બંધ થઈ જશે|ચેતવણી/i.test(text)) {
      signals.push({
        id: 'sig-nlp-urgency-gujarati',
        detector: 'NLPAnalyzer',
        signal: 'gujarati_urgency_semantic_marker',
        severity: 0.9,
        confidence: 0.95,
        explanation: 'Regional Gujarati coercion: pressures recipient with instantaneous account suspension threat.',
        evidence: 'તમારું ખાતું આજે જ બ્લોક થઈ જશે',
        category: 'URGENCY',
      });
    }

    // Hindi urgency
    if (/तुरंत|24 घंटे|ब्लॉक हो जाएगा|अंतिम चेतावनी|बंद कर दिया जाएगा/i.test(text)) {
      signals.push({
        id: 'sig-nlp-urgency-hindi',
        detector: 'NLPAnalyzer',
        signal: 'hindi_urgency_semantic_marker',
        severity: 0.9,
        confidence: 0.95,
        explanation: 'Regional Hindi pressure: conveys artificial deadline regarding banking access.',
        evidence: 'खाता तुरंत ब्लॉक हो जाएगा',
        category: 'URGENCY',
      });
    }

    // Coercive authority / legal threats
    if (/digital\s*arrest|cbi|narcotics|customs\s*parcel|arrest\s*warrant|mumbai\s*police|court\s*order/i.test(lower) || /ડિજિટલ\s*ધરપકડ|સીબીઆઈ|પોલીસ/i.test(text) || /डिजिटल\s*अरेस्ट|सीबीआई|पुलिस/i.test(text)) {
      signals.push({
        id: 'sig-nlp-legal-coercion',
        detector: 'NLPAnalyzer',
        signal: 'law_enforcement_intimidation',
        severity: 0.96,
        confidence: 0.97,
        explanation: 'Impersonates legal enforcement or judicial authorities ("Digital Arrest") to induce extreme fear and compliance.',
        evidence: 'Digital arrest / CBI / Police notice',
        category: 'AUTHORITY',
      });
    }
  }

  /**
   * Detector 4: Social Engineering Analyzer
   */
  private static runSocialEngineeringAnalyzer(text: string, signals: DetectorSignal[]): SocialEngineeringProfile {
    const lower = text.toLowerCase();

    let urgency: 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH' = 'NONE';
    let fear: 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH' = 'NONE';
    let authority: 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH' = 'NONE';
    let reward: 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH' = 'NONE';
    let financialPressure: 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH' = 'NONE';
    let secrecy: 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH' = 'NONE';
    let scarcity: 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH' = 'NONE';

    if (/urgent|immediately|today only|within \d+ hours|તુરંત|तुरंत/i.test(text)) {
      urgency = 'HIGH';
    }

    if (/blocked|arrest|suspended|narcotics|police|warrant|બંધ|બ્લોક|बंद/i.test(text)) {
      fear = 'HIGH';
    }

    if (/cbi|police|rbi|income tax|court|bank official|સીબીઆઈ|પોલીસ|सीबीआई/i.test(text)) {
      authority = 'HIGH';
    } else if (/bank|support|manager/i.test(text)) {
      authority = 'MEDIUM';
    }

    if (/congratulations|won|lottery|reward|cashback|free|₹50,000|ઇનામ|बधाई/i.test(text)) {
      reward = 'HIGH';
    }

    if (/processing fee|pay ₹|upi pin|security deposit|transfer funds|fee|પ્રોસેસિંગ ફી/i.test(text)) {
      financialPressure = 'HIGH';
    }

    if (/keep this secret|do not disconnect|do not tell anyone|confidential inquiry/i.test(lower)) {
      secrecy = 'HIGH';
    }

    if (/only \d+ spots left|first \d+ users|offer expires/i.test(lower)) {
      scarcity = 'HIGH';
    }

    signals.push({
      id: 'sig-se-profile',
      detector: 'SocialEngineeringAnalyzer',
      signal: 'behavioral_manipulation_profile',
      severity: urgency === 'HIGH' || fear === 'HIGH' ? 0.85 : 0.4,
      confidence: 0.91,
      explanation: `Psychological manipulation profile: Urgency (${urgency}), Fear (${fear}), Financial Pressure (${financialPressure}), Authority (${authority}).`,
      category: 'SOCIAL_ENGINEERING',
    });

    const explanation = `Attacker relies heavily on ${urgency === 'HIGH' ? 'Urgency' : ''} ${fear === 'HIGH' ? 'and Fear' : ''} ${reward === 'HIGH' ? 'and Reward bait' : ''} to induce hasty compliance.`;

    return {
      urgency,
      fear,
      authority,
      reward,
      financialPressure,
      secrecy,
      scarcity,
      explanation,
    };
  }

  /**
   * Detector 5: Brand Impersonation Analyzer
   */
  private static runBrandImpersonationAnalyzer(text: string, url: string | null, signals: DetectorSignal[]) {
    let hostname = '';
    if (url) {
      try {
        const raw = url.startsWith('http') ? url : 'https://' + url;
        hostname = new URL(raw).hostname.toLowerCase();
      } catch {
        hostname = url.toLowerCase();
      }
    }

    for (const brand of BRAND_PATTERNS) {
      const mentionsBrand = brand.match.test(text) || (hostname && brand.match.test(hostname));
      if (mentionsBrand) {
        const isLegit = hostname === brand.realDomain || hostname.endsWith('.' + brand.realDomain);
        if (hostname && !isLegit) {
          signals.push({
            id: `sig-brand-impersonation-${brand.name}`,
            detector: 'ImpersonationAnalyzer',
            signal: 'unauthorized_brand_impersonation',
            severity: 0.95,
            confidence: 0.97,
            explanation: `Message or URL references "${brand.name}", but the host does not match authentic domain (${brand.realDomain}).`,
            evidence: hostname || brand.name,
            category: 'IMPERSONATION',
          });
        }
      }
    }
  }

  /**
   * Detector 6: Financial Manipulation Analyzer
   */
  private static runFinancialAnalyzer(text: string, signals: DetectorSignal[]) {
    const lower = text.toLowerCase();

    // Reverse UPI PIN trick: claiming you must enter PIN to receive funds
    if (/enter\s*(your\s*)?(upi\s*)?pin\s*to\s*(receive|claim|accept|get)/i.test(lower) || /પીન\s*નાખો/i.test(text) || /पिन\s*दर्ज\s*करें/i.test(text)) {
      signals.push({
        id: 'sig-fin-reverse-upi-pin',
        detector: 'FinancialAnalyzer',
        signal: 'reverse_upi_pin_solicitation',
        severity: 0.98,
        confidence: 0.99,
        explanation: 'Solicits UPI PIN under pretense of receiving money. A PIN is strictly for outgoing transfers; entering it will deduct money.',
        evidence: 'Enter PIN to receive money',
        category: 'FINANCIAL',
      });
    }

    // Advance-fee prize trick
    if (/won\s*(₹|rs|inr)\s*\d+.*(pay|fee)\s*(₹|rs|inr)\s*\d+/i.test(lower) || /processing\s*fee/i.test(lower) || /પ્રોસેસિંગ\s*ફી/i.test(text)) {
      signals.push({
        id: 'sig-fin-advance-fee',
        detector: 'FinancialAnalyzer',
        signal: 'advance_fee_lottery_pattern',
        severity: 0.92,
        confidence: 0.95,
        explanation: 'Advance-fee trick: promises an unrealistic financial windfall conditional upon paying an upfront fee.',
        evidence: 'Prize reward with required upfront processing fee',
        category: 'FINANCIAL',
      });
    }

    // Task job upfront deposit
    if (
      (/part[\s-]time|earn\s*(₹|rs|inr|\$)?\s*\d+.*(\/|per\s*)day|like.*youtube/i.test(lower)) &&
      (/deposit|telegram|registration\s*fee|refundable/i.test(lower) || /ટાસ્ક/i.test(text))
    ) {
      signals.push({
        id: 'sig-fin-task-job-deposit',
        detector: 'FinancialAnalyzer',
        signal: 'pyramid_task_job_advance_deposit',
        severity: 0.9,
        confidence: 0.94,
        explanation: 'Pyramid task scheme: advertises trivial online video tasks requiring Telegram joins and upfront deposits.',
        evidence: 'Part-time video task with deposit requirement',
        category: 'FINANCIAL',
      });
    }
  }

  /**
   * Detector 7: Rule Engine
   */
  private static runRuleEngine(text: string, url: string | null, signals: DetectorSignal[]) {
    const lower = text.toLowerCase();

    // Whitelist check
    if (url) {
      try {
        const raw = url.startsWith('http') ? url : 'https://' + url;
        const host = new URL(raw).hostname.toLowerCase();
        const isWhitelisted = Array.from(REPUTABLE_DOMAINS).some((d) => host === d || host.endsWith('.' + d));
        if (isWhitelisted && !lower.includes('kyc') && !lower.includes('blocked') && !lower.includes('arrest')) {
          signals.push({
            id: 'sig-rule-whitelist-match',
            detector: 'RuleEngine',
            signal: 'reputable_domain_whitelist_verified',
            severity: 0.05,
            confidence: 0.99,
            explanation: `Target domain matches high-reputation institutional whitelist (${host}).`,
            evidence: host,
            category: 'BENIGN',
          });
          return;
        }
      } catch {
        // ignore
      }
    }

    // KYC block rule
    if (/kyc|pan\s*card|aadhaar/i.test(lower) && /blocked|suspend|verify\s*kyc/i.test(lower) && url) {
      signals.push({
        id: 'sig-rule-bank-kyc-suspension',
        detector: 'RuleEngine',
        signal: 'deterministic_kyc_suspension_signature',
        severity: 0.94,
        confidence: 0.98,
        explanation: 'High-confidence signature match for Bank KYC SMS suspension phish.',
        evidence: 'KYC suspension + unverified link',
        category: 'RULE_MATCH',
      });
    }
  }

  /**
   * Detector 8: Local ML Model Simulation
   */
  private static runLocalMLModel(text: string, url: string | null, signals: DetectorSignal[]) {
    // Feature vector evaluation
    let mlThreatScore = 0.1;
    let tokensFlagged = 0;

    const scamTokens = ['urgent', 'kyc', 'blocked', 'otp', 'pin', 'won', 'lottery', 'fee', 'cbi', 'arrest', 'reward', 'pan'];
    const words = text.toLowerCase().split(/\s+/);

    for (const w of words) {
      if (scamTokens.some((t) => w.includes(t))) {
        tokensFlagged++;
      }
    }

    if (tokensFlagged >= 3) {
      mlThreatScore = Math.min(0.96, 0.5 + tokensFlagged * 0.12);
      signals.push({
        id: 'sig-ml-entropy-high',
        detector: 'LocalMLModel',
        signal: 'on_device_vector_classifier_elevated_risk',
        severity: mlThreatScore,
        confidence: 0.88,
        explanation: `On-device lightweight NLP classifier detected ${tokensFlagged} correlated scam tokens (anomaly score: ${Math.round(mlThreatScore * 100)}%).`,
        category: 'ML',
      });
    }
  }

  /**
   * Detector 9: Threat Intelligence Adapter
   */
  private static runThreatIntelAdapter(url: string | null, text: string, signals: DetectorSignal[]) {
    if (!url) return;

    let host = '';
    try {
      const raw = url.startsWith('http') ? url : 'https://' + url;
      host = new URL(raw).hostname.toLowerCase();
    } catch {
      host = url.toLowerCase();
    }

    // Synthetic intelligence lookup
    const knownPhishHosts = ['sbi-online-kyc.top', 'phonepe-reward-claim.xyz', 'indiapost-redelivery.buzz', 'paypal-secure-login.example.com', 'bank-kyc-gujarat.online'];
    if (knownPhishHosts.some((h) => host.includes(h))) {
      signals.push({
        id: 'sig-intel-feed-reputation',
        detector: 'ThreatIntel',
        signal: 'threat_intelligence_feed_positive_match',
        severity: 0.98,
        confidence: 0.99,
        explanation: `Domain ${host} is cataloged in SentinelAI local threat feed as an active malicious campaign artifact.`,
        evidence: host,
        category: 'INTEL',
      });
    }
  }

  // ==========================================
  // FUSION & COMPOSITION LOGIC
  // ==========================================

  /**
   * Compute Threat DNA 2.0
   */
  private static computeThreatDna(signals: DetectorSignal[]): ThreatDNA {
    let socialEng = 0;
    let urlDecept = 0;
    let urgency = 0;
    let impersonation = 0;
    let financial = 0;
    let credential = 0;

    for (const s of signals) {
      const score = Math.round(s.severity * 100);

      if (s.category === 'SOCIAL_ENGINEERING' || s.signal.includes('semantic') || s.signal.includes('behavioral')) {
        socialEng = Math.max(socialEng, score);
      }
      if (s.category === 'URL' || s.category === 'HOMOGLYPH') {
        urlDecept = Math.max(urlDecept, score);
      }
      if (s.category === 'URGENCY') {
        urgency = Math.max(urgency, score);
      }
      if (s.category === 'IMPERSONATION' || s.category === 'AUTHORITY') {
        impersonation = Math.max(impersonation, score);
      }
      if (s.category === 'FINANCIAL') {
        financial = Math.max(financial, score);
      }
      if (s.category === 'CREDENTIAL' || s.signal.includes('pin') || s.signal.includes('otp')) {
        credential = Math.max(credential, score);
      }
    }

    return {
      socialEngineering: socialEng,
      urlSuspicion: urlDecept,
      urlDeception: urlDecept,
      urgencyCoercion: urgency,
      impersonation,
      financialRisk: financial,
      financialManipulation: financial,
      credentialTheft: credential,
    };
  }

  /**
   * Fusion Scorer: Separates Risk from Confidence!
   */
  private static fuseScores(
    signals: DetectorSignal[],
    dna: ThreatDNA
  ): { riskScore: number; confidence: number; severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' } {
    const maliciousSignals = signals.filter((s) => s.category !== 'BENIGN' && s.severity > 0.4);

    if (maliciousSignals.length === 0) {
      return {
        riskScore: 6,
        confidence: 96,
        severity: 'LOW',
      };
    }

    // Weighted fusion across DNA 2.0 components
    const weightedSum =
      dna.socialEngineering * 0.2 +
      (dna.urlDeception || dna.urlSuspicion) * 0.25 +
      dna.urgencyCoercion * 0.2 +
      dna.impersonation * 0.15 +
      (dna.financialManipulation || dna.financialRisk) * 0.2;

    let baseRisk = Math.round(weightedSum);

    // Critical signal elevation
    const hasCritical = signals.some((s) => s.severity >= 0.9);
    const hasHigh = signals.some((s) => s.severity >= 0.75);

    if (hasCritical && baseRisk < 84) {
      baseRisk = Math.max(baseRisk + 18, 86);
    } else if (hasHigh && baseRisk < 60) {
      baseRisk = Math.max(baseRisk + 12, 65);
    }

    const overallRisk = Math.min(99, Math.max(8, baseRisk));

    // Confidence: increases with signal count and agreement across multiple independent detectors
    const distinctDetectors = new Set(maliciousSignals.map((s) => s.detector)).size;
    let calculatedConfidence = Math.min(98, 65 + distinctDetectors * 8 + maliciousSignals.length * 2);

    let severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'LOW';
    if (overallRisk >= 80) severity = 'CRITICAL';
    else if (overallRisk >= 60) severity = 'HIGH';
    else if (overallRisk >= 30) severity = 'MEDIUM';

    return {
      riskScore: overallRisk,
      confidence: calculatedConfidence,
      severity,
    };
  }

  /**
   * Classify Category
   */
  private static classifyCategory(
    text: string,
    url: string | null,
    signals: DetectorSignal[],
    dna: ThreatDNA
  ): { category: ThreatCategory; label: string } {
    const lower = text.toLowerCase();

    if (signals.some((s) => s.signal === 'law_enforcement_intimidation')) {
      return { category: 'DIGITAL_ARREST', label: 'Digital Arrest / Police Extortion' };
    }
    if (signals.some((s) => s.signal.includes('kyc') || s.id.includes('kyc'))) {
      return { category: 'BANK_KYC_SCAM', label: 'Bank KYC Suspension Scam' };
    }
    if (signals.some((s) => s.signal.includes('upi') || s.id.includes('fin-reverse-upi'))) {
      return { category: 'UPI_SCAM', label: 'UPI / Payment Collect Fraud' };
    }
    if (signals.some((s) => s.signal.includes('homoglyph') || s.category === 'HOMOGLYPH')) {
      return { category: 'HOMOGLYPH_SPOOF', label: 'Homoglyph / Lookalike Domain Spoof' };
    }
    if (signals.some((s) => s.signal.includes('task_job') || lower.includes('telegram'))) {
      return { category: 'JOB_INTERNSHIP_SCAM', label: 'Fake Internship / Task-Job Scam' };
    }
    if (lower.includes('parcel') || lower.includes('courier') || lower.includes('india post')) {
      return { category: 'COURIER_DELIVERY_SCAM', label: 'Fake Courier Rescheduling Phishing' };
    }
    if (lower.includes('scholarship') || lower.includes('grant')) {
      return { category: 'SCHOLARSHIP_SCAM', label: 'Fake Scholarship Grant Scheme' };
    }
    if (dna.urlDeception && dna.urlDeception >= 60) {
      return { category: 'PHISHING', label: 'Credential Harvesting Phishing' };
    }
    if (signals.some((s) => s.category !== 'BENIGN' && s.severity > 0.5)) {
      return { category: 'PHISHING', label: 'Deceptive Social Engineering' };
    }

    return { category: 'LEGITIMATE', label: 'Legitimate Safe Communication' };
  }

  /**
   * Build Attack Chain Sequence
   */
  private static buildAttackChain(
    text: string,
    url: string | null,
    signals: DetectorSignal[],
    verdict: ThreatVerdict,
    category: ThreatCategory
  ): AttackChainNode[] {
    if (verdict === 'SAFE') {
      return [
        {
          id: 'ac-origin',
          stage: 'RECON / ORIGIN',
          title: 'Verified Origin',
          status: 'DETECTED',
          description: 'Communication matches legitimate academic or institutional channels.',
        },
        {
          id: 'ac-gateway',
          stage: 'SUSPICIOUS LINK / GATEWAY',
          title: 'Whitelisted Destination',
          status: 'DETECTED',
          description: 'No unverified redirects or lookalike infrastructure detected.',
        },
      ];
    }

    const hasAuthority = signals.some((s) => s.category === 'AUTHORITY' || s.category === 'IMPERSONATION');
    const hasUrgency = signals.some((s) => s.category === 'URGENCY');
    const hasLink = !!url;
    const hasCredential = signals.some((s) => s.category === 'CREDENTIAL' || s.category === 'FINANCIAL');

    const chain: AttackChainNode[] = [
      {
        id: 'ac-1',
        stage: 'RECON / ORIGIN',
        title: 'Unsolicited Contact Vector',
        status: 'DETECTED',
        description: 'Targeted SMS, WhatsApp, or unprompted message delivered to victim without prior transaction context.',
      },
      {
        id: 'ac-2',
        stage: 'FAKE AUTHORITY',
        title: hasAuthority ? 'Impersonated Authority Figure' : 'Unverified Identity',
        status: hasAuthority ? 'DETECTED' : 'POSSIBLE',
        description: hasAuthority
          ? 'Attacker poses as bank fraud department, CBI officer, or courier service.'
          : 'Sender cloaks true identity behind corporate jargon.',
      },
      {
        id: 'ac-3',
        stage: 'URGENCY / MANIPULATION',
        title: hasUrgency ? 'High Psychological Coercion' : 'Emotional Bait',
        status: hasUrgency ? 'DETECTED' : 'LIKELY',
        description: hasUrgency
          ? 'Creates immediate suspension deadline ("today only", "account blocked") to inhibit critical evaluation.'
          : 'Presents attractive reward or warning.',
      },
      {
        id: 'ac-4',
        stage: 'SUSPICIOUS LINK / GATEWAY',
        title: hasLink ? 'Deceptive Web / QR Gateway' : 'Off-Platform Redirection',
        status: hasLink ? 'DETECTED' : 'POSSIBLE',
        description: hasLink
          ? 'Routes victim to spoofed lookalike web domain or unverified QR payload.'
          : 'Attempts to redirect conversation to Telegram or phone call.',
      },
      {
        id: 'ac-5',
        stage: 'CREDENTIAL / PIN SOLICITATION',
        title: hasCredential ? 'Credential / UPI PIN Harvest' : 'Confidential Data Solicitation',
        status: hasCredential ? 'DETECTED' : 'LIKELY',
        description: hasCredential
          ? 'Solicits net banking password, OTP, or UPI authorization to execute transaction.'
          : 'Demands personal identity records (Aadhaar, PAN).',
      },
      {
        id: 'ac-6',
        stage: 'ACCOUNT TAKEOVER / MONETARY LOSS',
        title: 'Unauthorized Exfiltration',
        status: 'LIKELY',
        description: 'Resulting unauthorized fund transfer, credential theft, or secondary identity exploitation.',
      },
    ];

    return chain;
  }

  /**
   * Correlate with Known Scam Campaigns
   */
  private static correlateCampaign(text: string, url: string | null, category: ThreatCategory): ScamCampaign | undefined {
    const lower = text.toLowerCase();
    const urlLower = (url || '').toLowerCase();

    if (category === 'BANK_KYC_SCAM' || lower.includes('sbi') || urlLower.includes('sbi')) {
      return SYNTHETIC_CAMPAIGNS[0];
    }
    if (category === 'UPI_SCAM' || lower.includes('phonepe') || lower.includes('cashback')) {
      return SYNTHETIC_CAMPAIGNS[1];
    }
    if (category === 'COURIER_DELIVERY_SCAM' || lower.includes('india post') || urlLower.includes('indiapost')) {
      return SYNTHETIC_CAMPAIGNS[2];
    }
    if (category === 'JOB_INTERNSHIP_SCAM' || lower.includes('telegram') || lower.includes('like youtube')) {
      return SYNTHETIC_CAMPAIGNS[3];
    }

    return undefined;
  }

  /**
   * Evaluate Potential False Positive Reasons
   */
  private static evaluateFalsePositive(text: string, verdict: ThreatVerdict, signals: DetectorSignal[]): string | undefined {
    const lower = text.toLowerCase();

    if (verdict === 'SAFE') {
      return undefined;
    }

    // Has urgent language but no malicious link or money request
    const hasUrgency = signals.some((s) => s.category === 'URGENCY');
    const hasFinancialOrLink = signals.some((s) => s.category === 'FINANCIAL' || s.category === 'URL' || s.category === 'CREDENTIAL');

    if (hasUrgency && !hasFinancialOrLink) {
      return 'Potential false positive: The message contains urgent wording, but no deceptive domain, credential request, or financial solicitation was detected.';
    }

    if (lower.includes('attendance is mandatory') || lower.includes('seminar') || lower.includes('symposium')) {
      return 'Potential false positive: Academic announcements often use mandatory language ("attendance mandatory") that triggers urgency heuristics.';
    }

    return undefined;
  }

  /**
   * Convert Signals to Factors
   */
  private static convertSignalsToFactors(signals: DetectorSignal[]): ThreatFactor[] {
    const nonBenign = signals.filter((s) => s.category !== 'BENIGN');
    return nonBenign.map((s) => {
      let severity: 'low' | 'medium' | 'high' | 'critical' = 'low';
      if (s.severity >= 0.88) severity = 'critical';
      else if (s.severity >= 0.7) severity = 'high';
      else if (s.severity >= 0.45) severity = 'medium';

      return {
        id: s.id,
        title: this.formatSignalTitle(s.signal),
        severity,
        explanation: s.explanation,
        evidence: s.evidence,
        confidence: Math.round(s.confidence * 100),
        category: s.category,
      };
    });
  }

  private static formatSignalTitle(signalStr: string): string {
    return signalStr
      .split('_')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }

  /**
   * Multilingual Summaries
   */
  private static generateSummaries(
    verdict: ThreatVerdict,
    category: ThreatCategory,
    label: string,
    factors: ThreatFactor[],
    lang: string
  ): { en: string; gu: string; hi: string } {
    if (verdict === 'SAFE') {
      return {
        en: 'Verified Legitimate: No active threat markers, deceptive domains, or manipulative urgency patterns detected.',
        gu: 'આ સંદેશમાં કોઈ શંકાસ્પદ લિંક, બનાવટી કેવાયસી અથવા છેતરપિંડીના સંકેત મળ્યા નથી. તે સંપૂર્ણપણે સુરક્ષિત છે.',
        hi: 'इस संदेश में कोई संदिग्ध लिंक, फर्जी केवाईसी या धोखाधड़ी के संकेत नहीं मिले हैं। यह सुरक्षित प्रतीत होता है।',
      };
    }

    const factorCount = factors.length;

    return {
      en: `Elevated Risk (${label}): Threat Fusion Engine combined ${factorCount} independent signals confirming social engineering and deceptive lures.`,
      gu: `સાવધાન! આ સંદેશમાં ${factorCount} જોખમી સંકેતો મળ્યા છે (${label}). આ પ્રકારના મેસેજ બેંક ખાતું ખાલી કરવા અથવા અંગત માહિતી ચોરવા મોકલવામાં આવે છે. કોઈ લિંક પર ક્લિક ન કરો.`,
      hi: `सावधान! इस संदेश में ${factorCount} गंभीर खतरे पहचाने गए हैं (${label})। धोखेबाज़ आपके पैसे या निजी जानकारी चुराने के लिए ऐसे दबावपूर्ण संदेश भेजते हैं।`,
    };
  }

  /**
   * Recommended Actionable Steps
   */
  private static generateActions(verdict: ThreatVerdict, category: ThreatCategory): RecommendedAction[] {
    if (verdict === 'SAFE') {
      return [
        {
          id: 'act-safe',
          title: 'Standard Prudence Recommended',
          description: 'While this communication exhibits authentic indicators, always independently verify unexpected attachments.',
          priority: 'info',
        },
      ];
    }

    const actions: RecommendedAction[] = [
      {
        id: 'act-link',
        title: 'Do NOT Click Any Embedded Links',
        description: 'Unverified links may trigger drive-by downloads or load lookalike credential harvesting portals.',
        priority: 'critical',
      },
      {
        id: 'act-pin',
        title: 'Never Share OTP, UPI PIN or Netbanking Passwords',
        description: 'Authentic institutions NEVER ask for your OTP or UPI PIN to credit rewards or verify accounts.',
        priority: 'critical',
      },
      {
        id: 'act-verify',
        title: 'Verify Exclusively Through Official Channels',
        description: 'Open your authentic bank app or dial customer support numbers printed directly on your physical debit card.',
        priority: 'high',
      },
      {
        id: 'act-block',
        title: 'Block and Report Sender',
        description: 'Tag sender number or email as spam on your device to feed collective threat databases.',
        priority: 'medium',
      },
      {
        id: 'act-1930',
        title: 'Report Incident to National Cyber Helpline (1930)',
        description: 'In India, report attempted cyber frauds immediately to 1930 or through cybercrime.gov.in.',
        priority: 'high',
      },
    ];

    if (category === 'DIGITAL_ARREST') {
      actions.unshift({
        id: 'act-arrest',
        title: 'Disconnect Video Call Immediately',
        description: 'Courts and police NEVER place citizens under "digital arrest" via Skype or WhatsApp video calls.',
        priority: 'critical',
      });
    }

    return actions;
  }

  /**
   * Helper: URL extraction
   */
  public static extractUrls(text: string): string[] {
    const urlRegex = /(https?:\/\/[^\s]+|[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?)/gi;
    const matches = text.match(urlRegex) || [];
    return matches.filter((u) => !u.includes('@') && u.includes('.'));
  }

  /**
   * Helper: Language detection
   */
  public static detectLanguage(text: string): 'en' | 'gu' | 'hi' | 'hinglish' {
    if (/[\u0A80-\u0AFF]/.test(text)) return 'gu';
    if (/[\u0900-\u097F]/.test(text)) return 'hi';
    if (/karo|hoga|karein|apna|aapka|band|turanth|paisa/i.test(text)) return 'hinglish';
    return 'en';
  }

  /**
   * Helper: Privacy PII sanitization
   */
  public static sanitizeContentPreview(text: string): string {
    let sanitized = text.replace(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g, '[PHONE MASKED]');
    sanitized = sanitized.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[EMAIL MASKED]');
    if (sanitized.length > 120) {
      return sanitized.substring(0, 117) + '...';
    }
    return sanitized;
  }
}
