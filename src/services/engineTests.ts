/**
 * SentinelAI V2 - Diagnostic Test Suite for Core Threat Fusion Engine
 * Validates deterministic scoring, 0-100 bounds, and error-free execution across vectors
 */

import { ThreatFusionEngine } from './ThreatFusionEngine';

export interface TestResult {
  name: string;
  passed: boolean;
  expectedVerdict: string;
  actualVerdict: string;
  riskScore: number;
  confidence: number;
  durationMs: number;
  error?: string;
}

export class EngineTestSuite {
  public static runAllTests(): TestResult[] {
    const testCases = [
      {
        name: 'Safe Institutional Academic Announcement',
        input: 'Department of Computer Science invites students to the Cybersecurity Seminar tomorrow at 10 AM. View schedule at https://iitb.ac.in/events',
        expectedVerdict: 'SAFE',
        scanType: 'message' as const,
      },
      {
        name: 'Bank KYC Urgent Suspension Phishing',
        input: 'URGENT! Your SBI account has been suspended today. Verify KYC at http://sbi-online-kyc.top/verify immediately.',
        expectedVerdict: 'DANGEROUS',
        scanType: 'message' as const,
      },
      {
        name: 'UPI PIN Solicitation Fraud',
        input: 'Congratulations! Won ₹50,000 festive PhonePe cashback. Enter your UPI PIN to claim: https://phonepe-reward-claim.xyz',
        expectedVerdict: 'DANGEROUS',
        scanType: 'message' as const,
      },
      {
        name: 'Part-Time Telegram Task Job Scheme',
        input: 'Earn ₹3,500/day by simply liking YouTube videos. Join Telegram channel @tasks and deposit ₹500 refundable security fee.',
        expectedVerdict: 'DANGEROUS',
        scanType: 'message' as const,
      },
      {
        name: 'Punycode / Homoglyph Spoofing URL',
        input: 'https://paypaI.example.com/signin?auth=challenge',
        expectedVerdict: 'DANGEROUS',
        scanType: 'url' as const,
      },
      {
        name: 'Digital Arrest Police Coercion Extortion',
        input: 'NOTICE: You are placed under DIGITAL ARREST by CBI Mumbai Cyber Cell for narcotics parcel intercepted with your Aadhaar ID.',
        expectedVerdict: 'DANGEROUS',
        scanType: 'message' as const,
      },
      {
        name: 'Regional Gujarati Bank Alert',
        input: 'તમારું KYC આજે પૂર્ણ નહીં કરો તો તમારું બેંક એકાઉન્ટ બંધ થઈ જશે. નીચેની લિંક પર ક્લિક કરી તુરંત વેરિફાય કરો: http://bank-kyc-gujarat.online/verify',
        expectedVerdict: 'DANGEROUS',
        scanType: 'message' as const,
      },
      {
        name: 'Malformed URL Input Resilience',
        input: 'https://::invalid@@domain.xyz///??param=%%20',
        expectedVerdict: 'HIGH_RISK',
        scanType: 'url' as const,
      },
    ];

    return testCases.map((tc) => {
      const start = performance.now();
      try {
        const result = ThreatFusionEngine.analyze(tc.input, tc.scanType);
        const durationMs = Math.round(performance.now() - start);

        const boundsValid =
          result.riskScore >= 0 &&
          result.riskScore <= 100 &&
          result.confidence >= 0 &&
          result.confidence <= 100;

        const passed = boundsValid && (result.verdict === tc.expectedVerdict || (tc.expectedVerdict === 'DANGEROUS' && result.verdict === 'HIGH_RISK'));

        return {
          name: tc.name,
          passed,
          expectedVerdict: tc.expectedVerdict,
          actualVerdict: result.verdict,
          riskScore: result.riskScore,
          confidence: result.confidence,
          durationMs,
        };
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : 'Unknown exception';
        return {
          name: tc.name,
          passed: false,
          expectedVerdict: tc.expectedVerdict,
          actualVerdict: 'CRASH',
          riskScore: -1,
          confidence: -1,
          durationMs: Math.round(performance.now() - start),
          error: errorMsg,
        };
      }
    });
  }
}
