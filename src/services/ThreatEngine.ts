/**
 * SentinelAI - ThreatEngine Wrapper
 * Backward-compatible bridge delegating to the Modular Threat Fusion Engine V2
 */

import { ThreatAnalysisResult, ScanType } from '../types/threat';
import { ThreatFusionEngine } from './ThreatFusionEngine';

export class ThreatEngine {
  public static analyze(
    content: string,
    scanType: ScanType = 'text',
    engineMode: 'LOCAL_HEURISTICS' | 'HYBRID_INTELLIGENCE' = 'LOCAL_HEURISTICS'
  ): ThreatAnalysisResult {
    return ThreatFusionEngine.analyze(content, scanType, engineMode);
  }

  public static extractUrls(text: string): string[] {
    return ThreatFusionEngine.extractUrls(text);
  }

  public static detectLanguage(text: string): 'en' | 'gu' | 'hi' | 'hinglish' {
    return ThreatFusionEngine.detectLanguage(text);
  }
}
