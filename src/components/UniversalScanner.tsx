import React, { useState, useRef, useEffect } from 'react';
import {
  Link as LinkIcon,
  MessageSquare,
  Mail,
  FileText,
  QrCode,
  Upload,
  Play,
  RotateCcw,
  Clipboard,
  Shield,
  Loader2,
  AlertCircle,
  Sparkles,
  Zap,
} from 'lucide-react';
import { ScanType, ThreatAnalysisResult } from '../types/threat';
import { ThreatEngine } from '../services/ThreatEngine';
import { QRScannerService } from '../services/qrScanner';
import { DEMO_PRESETS } from '../services/demoPresets';
import { StorageService } from '../services/storage';
import { ThreatResultCard } from './ThreatResultCard';

interface UniversalScannerProps {
  onScanCompleted: (result: ThreatAnalysisResult) => void;
  onAskCopilot: (contextResult: ThreatAnalysisResult) => void;
  initialPresetId?: string | null;
  offlineMode: boolean;
}

export const UniversalScanner: React.FC<UniversalScannerProps> = ({
  onScanCompleted,
  onAskCopilot,
  initialPresetId,
  offlineMode,
}) => {
  const [activeTab, setActiveTab] = useState<ScanType>('message');
  const [inputText, setInputText] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState<string>('');
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [analysisResult, setAnalysisResult] = useState<ThreatAnalysisResult | null>(null);
  const [qrFileError, setQrFileError] = useState<string | null>(null);
  const [qrPreviewUrl, setQrPreviewUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load preset if initialPresetId changes
  useEffect(() => {
    if (initialPresetId) {
      const preset = DEMO_PRESETS.find((p) => p.id === initialPresetId);
      if (preset) {
        setActiveTab(preset.scanType);
        setInputText(preset.content);
        setAnalysisResult(null);
        // Automatically analyze
        executeScan(preset.content, preset.scanType);
      }
    }
  }, [initialPresetId]);

  const handleSelectPreset = (presetId: string) => {
    const preset = DEMO_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setActiveTab(preset.scanType);
    setInputText(preset.content);
    setAnalysisResult(null);
    executeScan(preset.content, preset.scanType);
  };

  const executeScan = (contentToScan: string, type: ScanType) => {
    if (!contentToScan.trim()) return;

    setIsScanning(true);
    setScanProgress(15);
    setScanStep('1/5 Sanitizing input & masking PII...');

    // Multi-stage realistic inspection simulation (fast, total ~600ms)
    setTimeout(() => {
      setScanProgress(38);
      setScanStep('2/5 Evaluating domain structures & punycode anomalies...');
    }, 120);

    setTimeout(() => {
      setScanProgress(62);
      setScanStep('3/5 Inspecting linguistic urgency & psychological coercion...');
    }, 280);

    setTimeout(() => {
      setScanProgress(85);
      setScanStep('4/5 Cross-referencing India scam vectors (UPI / Digital Arrest / KYC)...');
    }, 440);

    setTimeout(() => {
      setScanProgress(100);
      setScanStep('5/5 Synthesizing Threat DNA and risk score...');

      const result = ThreatEngine.analyze(
        contentToScan,
        type,
        offlineMode ? 'LOCAL_HEURISTICS' : 'HYBRID_INTELLIGENCE'
      );

      // Persist to local audit history
      StorageService.addScan(result);

      setAnalysisResult(result);
      setIsScanning(false);
      onScanCompleted(result);
    }, 620);
  };

  const handleAnalyze = () => {
    executeScan(inputText, activeTab);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputText(text);
    } catch {
      // Fallback
    }
  };

  const handleClear = () => {
    setInputText('');
    setAnalysisResult(null);
    setQrPreviewUrl(null);
    setQrFileError(null);
  };

  const handleQRUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setQrFileError(null);
    setQrPreviewUrl(URL.createObjectURL(file));

    const qrResult = await QRScannerService.decodeQRFromFile(file);
    if (qrResult.success && qrResult.data) {
      setInputText(qrResult.data);
      executeScan(qrResult.data, 'qr');
    } else {
      setQrFileError(qrResult.error || 'Failed to detect QR code.');
    }
  };

  // Tab configurations
  const tabs: { id: ScanType; label: string; icon: React.ReactNode; placeholder: string }[] = [
    {
      id: 'url',
      label: 'URL',
      icon: <LinkIcon className="w-4 h-4" />,
      placeholder: 'Paste website address (e.g. https://sbi-online-kyc.top/verify or bit.ly/3x8...)',
    },
    {
      id: 'message',
      label: 'SMS / WhatsApp',
      icon: <MessageSquare className="w-4 h-4" />,
      placeholder:
        'Paste suspicious message (e.g. "URGENT! Your bank account will be blocked today...", or Gujarati/Hindi text)',
    },
    {
      id: 'email',
      label: 'Email',
      icon: <Mail className="w-4 h-4" />,
      placeholder: 'Paste suspicious email subject, headers, or body content...',
    },
    {
      id: 'text',
      label: 'Raw Text',
      icon: <FileText className="w-4 h-4" />,
      placeholder: 'Paste any suspicious communication, payment alert, or job notification...',
    },
    {
      id: 'qr',
      label: 'QR Code',
      icon: <QrCode className="w-4 h-4" />,
      placeholder: 'Upload or drop a QR code image to safely decode and analyze destination link...',
    },
  ];

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Module Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              Universal Threat Engine
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800">
              {offlineMode ? 'OFFLINE HEURISTICS' : 'HYBRID SCANNER'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Analyze Suspicious Links & Messages
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Private, on-device detection of phishing, UPI scams, fake KYC alerts, and social engineering.
          </p>
        </div>

        {/* Quick Demo Scenario Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400 whitespace-nowrap">Demo Scenario:</label>
          <select
            onChange={(e) => handleSelectPreset(e.target.value)}
            defaultValue=""
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-medium text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="" disabled>
              Select Hackathon Demo...
            </option>
            {DEMO_PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.tag})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Scanner Box */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-5 sm:p-7 shadow-2xl relative overflow-hidden">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-slate-800 mb-5">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setAnalysisResult(null);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-slate-800 text-cyan-400 border border-slate-700 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        {activeTab === 'qr' ? (
          <div className="space-y-4">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-700 hover:border-cyan-500/60 rounded-xl p-8 text-center cursor-pointer bg-slate-950/40 hover:bg-slate-950/70 transition-all group"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleQRUpload}
                className="hidden"
              />
              <div className="w-12 h-12 mx-auto rounded-xl bg-slate-800 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-105 transition-transform">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-white">Click or drag & drop QR Code image</p>
              <p className="text-xs text-slate-400 mt-1">
                Decodes entirely in-browser. Safe inspection prevents automatic redirect.
              </p>
            </div>

            {qrPreviewUrl && (
              <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-950 border border-slate-800">
                <img
                  src={qrPreviewUrl}
                  alt="Scanned QR Preview"
                  className="w-16 h-16 object-contain rounded-lg border border-slate-700 bg-white p-1"
                />
                <div className="flex-1 text-xs">
                  <span className="text-slate-400 block">Extracted Payload:</span>
                  <span className="font-mono text-cyan-300 break-all">{inputText || 'Decoding...'}</span>
                </div>
              </div>
            )}

            {qrFileError && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-950/30 border border-rose-800/60 text-xs text-rose-300">
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <span>{qrFileError}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="relative">
            <textarea
              rows={5}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={currentTab.placeholder}
              className="w-full rounded-xl bg-slate-950/90 border border-slate-800 p-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all resize-y font-sans leading-relaxed"
            />

            {/* Quick Action Overlay Inside Textarea */}
            <div className="flex items-center justify-between mt-2 px-1 text-xs">
              <span className="text-slate-500 font-mono">
                {inputText.length} characters · Zero cloud transmission
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePaste}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                >
                  <Clipboard className="w-3.5 h-3.5" />
                  Paste
                </button>
                {inputText && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Scan Progress Bar Animation */}
        {isScanning && (
          <div className="my-5 p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-cyan-300 flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                {scanStep}
              </span>
              <span className="font-mono text-slate-400">{scanProgress}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-200"
                style={{ width: `${scanProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Primary Action Button */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Local sandbox isolated analysis</span>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!inputText.trim() || isScanning}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 ${
              !inputText.trim() || isScanning
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-950/60 hover:shadow-cyan-500/20'
            }`}
          >
            {isScanning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                Analyzing Security Markers...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current text-slate-950" />
                Analyze Threat
              </>
            )}
          </button>
        </div>
      </div>

      {/* Render Scan Result */}
      {analysisResult && !isScanning && (
        <ThreatResultCard result={analysisResult} onAskCopilot={onAskCopilot} />
      )}
    </div>
  );
};
