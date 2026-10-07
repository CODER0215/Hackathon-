import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquareQuote,
  Send,
  Sparkles,
  Bot,
  User,
  Lock,
  Cpu,
  Globe2,
  AlertTriangle,
  RotateCcw,
  Languages,
} from 'lucide-react';
import { ThreatAnalysisResult } from '../types/threat';

interface CopilotChatProps {
  activeScanContext: ThreatAnalysisResult | null;
  offlineMode: boolean;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  mode?: string;
}

export const CopilotChat: React.FC<CopilotChatProps> = ({ activeScanContext, offlineMode }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'assistant',
      text: `Hello, I'm Sentinel Copilot. I analyze social-engineering tactics, lookalike domains, UPI frauds, and digital arrest coercion.\n\nHow can I protect you today? You can ask me to evaluate a threat, advise on emergency mitigation, or explain security concepts in English, ગુજરાતી, or हिंदी.`,
      timestamp: 'Just now',
      mode: 'ON-DEVICE EXPERT ENGINE',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cloudOptIn, setCloudOptIn] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const quickPrompts = [
    'What should I do if I clicked a phishing link?',
    'Why is an unsolicited KYC SMS dangerous?',
    'How do Digital Arrest scams operate?',
    'Explain UPI cashback scams in Gujarati (ગુજરાતી)',
    'Signs of a fake Telegram job offer?',
  ];

  const handleSendMessage = async (textToSend: string) => {
    const text = textToSend.trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      // If offline mode is enabled, we strictly use client-side rules; otherwise we hit /api/copilot
      if (offlineMode || !cloudOptIn) {
        // Instant client-side response
        setTimeout(() => {
          const reply = getClientLocalResponse(text, activeScanContext);
          setMessages((prev) => [
            ...prev,
            {
              id: `ast-${Date.now()}`,
              sender: 'assistant',
              text: reply,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              mode: '100% LOCAL HEURISTIC ENGINE',
            },
          ]);
          setIsLoading(false);
        }, 350);
      } else {
        // Server route /api/copilot (calls Gemini if available or returns local fallback)
        const response = await fetch('/api/copilot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text,
            scanContext: activeScanContext,
            language: /ગુજરાતી|gujarati/i.test(text) ? 'gu' : /hindi|हिंदी/i.test(text) ? 'hi' : 'en',
            optInCloud: cloudOptIn,
          }),
        });

        if (!response.ok) throw new Error('Failed to reach Copilot service');
        const data = await response.json();

        setMessages((prev) => [
          ...prev,
          {
            id: `ast-${Date.now()}`,
            sender: 'assistant',
            text: data.reply || 'Security assessment ready.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            mode: data.mode === 'CLOUD_GEMINI_ASSISTED' ? 'GEMINI 3.8-FLASH CLOUD CO-PILOT' : 'LOCAL ENGINE',
          },
        ]);
        setIsLoading(false);
      }
    } catch {
      // Fallback to local
      const reply = getClientLocalResponse(text, activeScanContext);
      setMessages((prev) => [
        ...prev,
        {
          id: `ast-${Date.now()}`,
          sender: 'assistant',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          mode: 'LOCAL ENGINE FALLBACK',
        },
      ]);
      setIsLoading(false);
    }
  };

  const getClientLocalResponse = (q: string, context: ThreatAnalysisResult | null): string => {
    const lower = q.toLowerCase();

    if (lower.includes('gujarati') || lower.includes('ગુજરાતી') || /કેવાયસી|ઓટીપી/.test(q)) {
      return `ગુજરાતી સુરક્ષા સલાહ:\n\n1. કોઈપણ બેંક SMS કે WhatsApp દ્વારા એકાઉન્ટ બ્લોક કરવાની ધમકી આપીને KYC કરાવતી નથી.\n2. પૈસા મેળવવા માટે ક્યારેય UPI PIN નાખવાની જરૂર પડતી નથી.\n3. શંકાસ્પદ લિંક પર ક્લિક કરી દીધું હોય તો તાત્કાલિક તમારા કાર્ડ બ્લોક કરો અને ૧૯૩૦ (1930) નંબર પર સાયબર ક્રાઈમ હેલ્પલાઈન પર કોલ કરો.`;
    }

    if (lower.includes('clicked') || lower.includes('what should i do')) {
      return `Emergency Actions If You Clicked a Suspicious Link:\n\n1. Disconnect Internet Immediately: Switch on Airplane Mode to stop potential active data exfiltration or background malware installation.\n2. Freeze Bank Cards & UPI: Open your official bank app (or phone bank helpline) to immediately lock your debit cards and UPI.\n3. Change Passwords: From a separate secure device, reset credentials for your primary email, banking portal, and password manager.\n4. Call 1930 (India): Report the fraud immediately to the National Cyber Crime Portal at 1930 within the critical "golden hour".`;
    }

    if (lower.includes('digital arrest') || lower.includes('cbi') || lower.includes('police')) {
      return `Digital Arrest Scam Advisory:\n\n• The Fraud: Extortionists disguise themselves in police uniforms, claiming illegal parcels with narcotics were sent using your identity, and order you to stay on video call.\n• The Truth: Real Indian Police, CBI, ED, and courts NEVER conduct "digital arrests" over Skype or WhatsApp video calls.\n• What to do: Hang up immediately. Do not transfer funds to any supposed "court verification account". Report the number to 1930.`;
    }

    if (lower.includes('upi') || lower.includes('cashback') || lower.includes('pin')) {
      return `Golden Rule of UPI Security:\n\n• PIN IS ONLY FOR SENDING MONEY. You NEVER enter a PIN to receive cash, lottery prizes, or cashbacks.\n• When scammers send a request claiming to "refund" or "credit" you ₹50,000, entering your PIN will instantly deduct money from your account.\n• Reject all collect requests and block the UPI ID immediately.`;
    }

    if (lower.includes('job') || lower.includes('telegram')) {
      return `Fake Job & Task Scheme Red Flags:\n\n1. "Earn ₹3,000–₹5,000/day by liking YouTube videos."\n2. First task pays ₹150 to build trust, then demands a ₹1,000 "prepaid task deposit" on Telegram.\n3. Legitimate employers NEVER demand money from candidates to initiate work.`;
    }

    if (context) {
      return `Security Assessment for Active Scan:\n• Threat Category: ${context.categoryLabel}\n• Risk Score: ${context.riskScore}/100\n• Threat DNA: Urgency (${context.threatDna.urgencyCoercion}%), Impersonation (${context.threatDna.impersonation}%).\n\nKey Advice: The content exhibits classic indicators of malicious social engineering. Avoid opening links or sharing information.`;
    }

    return `Sentinel Copilot Advice:\nAlways practice zero-trust with digital communications. Verify links by inspecting the real top-level domain. Never share OTPs or passwords over the phone or via web links. Contact the official customer helpline if in doubt.`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header and Privacy Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              Cybersecurity Assistant
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700">
              {offlineMode || !cloudOptIn ? '100% LOCAL PRIVACY' : 'CLOUD ENRICHED'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Sentinel Copilot
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Ask questions about deceptive messages, emergency mitigation, and Indian cyber fraud vectors.
          </p>
        </div>

        {/* Cloud Intelligence Consent Toggle */}
        <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          <label className="text-slate-300 font-medium cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={cloudOptIn}
              disabled={offlineMode}
              onChange={(e) => setCloudOptIn(e.target.checked)}
              className="rounded border-slate-700 text-cyan-500 focus:ring-cyan-400 bg-slate-950 cursor-pointer"
            />
            <span>Cloud Model AI</span>
          </label>
        </div>
      </div>

      {/* Active Scan Context Banner if exists */}
      {activeScanContext && (
        <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-800/50 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-cyan-200">
            <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span>
              <strong>Active Scan Loaded:</strong> {activeScanContext.categoryLabel} (Risk {activeScanContext.riskScore}/100)
            </span>
          </div>
          <span className="text-[11px] font-mono text-cyan-400">Context Linked</span>
        </div>
      )}

      {/* Chat Messages Container */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-5 shadow-2xl flex flex-col h-[520px]">
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {messages.map((m) => {
            const isUser = m.sender === 'user';
            return (
              <div
                key={m.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-cyan-600 text-slate-950 font-medium rounded-tr-none'
                      : 'bg-slate-950/80 border border-slate-800 text-slate-200 rounded-tl-none whitespace-pre-line'
                  }`}
                >
                  <p>{m.text}</p>
                  <div className="flex items-center justify-between gap-2 mt-2 pt-1 border-t border-slate-800/40 text-[10px] text-slate-400 font-mono">
                    <span>{m.timestamp}</span>
                    {m.mode && <span className="text-cyan-400">{m.mode}</span>}
                  </div>
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 flex-shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
          {isLoading && (
            <div className="flex gap-3 items-center text-xs text-cyan-400 font-mono">
              <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <span>Sentinel Copilot is evaluating threat intelligence...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        <div className="mt-4 pt-3 border-t border-slate-800/80">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 text-[11px]">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white whitespace-nowrap transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="flex items-center gap-2 mt-1"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask Copilot (e.g. 'How can I tell if a job offer is legitimate?')..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-sans"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className={`p-2.5 rounded-xl transition-all ${
                !inputValue.trim() || isLoading
                  ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold hover:from-cyan-400 hover:to-blue-500'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
