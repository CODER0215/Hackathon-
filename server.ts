import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// Initialize GoogleGenAI if key is present
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  try {
    aiClient = new GoogleGenAI({ apiKey });
  } catch (err) {
    console.warn('Failed to initialize GoogleGenAI client:', err);
  }
}

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ONLINE',
    engine: 'SentinelAI On-Device & Hybrid Threat Shield',
    version: '1.0.0',
    cloudAiAvailable: !!aiClient,
    localFirstPrivacy: true,
  });
});

// AI Security Copilot Endpoint
app.post('/api/copilot', async (req: Request, res: Response) => {
  try {
    const { message, scanContext, language = 'en', optInCloud = false } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Strict privacy gate: only query cloud if explicitly opted-in and key exists
    if (optInCloud && aiClient) {
      try {
        const systemInstruction = `You are Sentinel Copilot, an elite private cybersecurity assistant for SentinelAI.
Your goal is to provide concise, authoritative, and direct security advice regarding scams, phishing, social engineering, UPI fraud, fake KYC, and digital arrest threats.
Rules:
1. Always prioritize user safety and privacy.
2. Be concise: 2 to 4 actionable bullet points or short paragraphs.
3. If asked in Gujarati or Hindi, reply natively in Gujarati (ગુજરાતી) or Hindi (हिंदी) with simple terms.
4. Mention official Indian resources when appropriate (e.g., National Cyber Crime Helpline 1930, cybercrime.gov.in).
5. Never ask the user for sensitive credentials, OTPs, or passwords.
6. Clearly explain why a threat is dangerous and what immediate actions to take.`;

        let promptContent = `User query: "${message}"\n`;
        if (scanContext) {
          promptContent += `\nCurrent Scan Context (Sanitized):\nVerdict: ${scanContext.verdict}\nCategory: ${scanContext.categoryLabel}\nRisk Score: ${scanContext.riskScore}/100\nKey Factors: ${scanContext.factors?.map((f: { title: string }) => f.title).join(', ')}\n`;
        }
        if (language === 'gu') {
          promptContent += `\nPlease answer in Gujarati (ગુજરાતી).\n`;
        } else if (language === 'hi') {
          promptContent += `\nPlease answer in Hindi (हिंदी).\n`;
        }

        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: promptContent,
          config: {
            systemInstruction,
            temperature: 0.2,
          },
        });

        const reply = response.text || 'Security analysis complete.';
        return res.json({
          reply,
          mode: 'CLOUD_GEMINI_ASSISTED',
          timestamp: Date.now(),
        });
      } catch (geminiErr) {
        console.warn('Gemini API call error, falling back to local copilot knowledge:', geminiErr);
        // Fallback to local expert system response below
      }
    }

    // Local Expert System Response (Offline / Privacy-First mode)
    const localReply = generateLocalCopilotResponse(message, scanContext, language);
    return res.json({
      reply: localReply,
      mode: 'LOCAL_KNOWLEDGE_ENGINE',
      timestamp: Date.now(),
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Internal error';
    return res.status(500).json({ error: errorMsg });
  }
});

// Local Expert System Rules for 100% Offline Copilot Queries
function generateLocalCopilotResponse(query: string, scanContext: any, lang: string): string {
  const q = query.toLowerCase();

  // Gujarati queries
  if (lang === 'gu' || /ગુજરાતી|કેવાયસી|ઓટીપી|પૈસા/.test(query)) {
    if (q.includes('kyc') || q.includes('કેવાયસી') || q.includes('બેંક')) {
      return `ગુજરાતી સુરક્ષા સલાહ:\n1. કોઈ પણ બેંક SMS કે WhatsApp લિંક દ્વારા તમારું એકાઉન્ટ તાત્કાલિક બ્લોક કરવાની ધમકી આપીને KYC કરાવતી નથી.\n2. અજાણી લિંક પર ક્લિક કરીને પાન કાર્ડ, આધાર કાર્ડ કે નેટ બેંકિંગ પાસવર્ડ નાખશો નહીં.\n3. શંકા જણાય તો તમારી બેંકની શાખામાં રૂબરૂ જઈને જ તપાસ કરો.\n4. સાયબર ફ્રોડ થાય તો તુરંત ૧૯૩૦ (1930) નંબર પર કોલ કરો.`;
    }
    if (q.includes('upi') || q.includes('પીન') || q.includes('ઇનામ')) {
      return `યુપીઆઈ (UPI) છેતરપિંડીથી બચવા:\n1. પૈસા મેળવવા માટે ક્યારેય UPI PIN નાખવાની જરૂર નથી હોતી. PIN ફક્ત પૈસા મોકલવા માટે હોય છે.\n2. લૉટરી કે કેશબેક ઇનામના નામે નાની રકમ ટ્રાન્સફર કરવા કોઈ કહે તો તે ૧૦૦% છેતરપિંડી છે.`;
    }
    return `Sentinel Copilot સુરક્ષા સહાયક:\nહંમેશા શંકાસ્પદ લિંક અને મેસેજથી સાવધ રહો. કોઈ પણ અજાણી વ્યક્તિ સાથે તમારો OTP કે UPI PIN શેર કરશો નહીં. જો તમે કોઈ લિંક પર ક્લિક કર્યું હોય તો તાત્કાલિક બેંક એકાઉન્ટ ફ્રીઝ કરો.`;
  }

  // Hindi queries
  if (lang === 'hi' || /हिंदी|केवाईसी|ओटीपी|पैसे/.test(query)) {
    if (q.includes('kyc') || q.includes('केवाईसी') || q.includes('बैंक')) {
      return `हिंदी सुरक्षा सलाह:\n1. कोई भी अधिकृत बैंक एसएमएस या व्हाट्सएप लिंक भेजकर तुरंत खाता बंद करने की धमकी नहीं देता।\n2. ऐसी लिंक पर अपना पैन, आधार या पासवर्ड दर्ज न करें।\n3. हमेशा बैंक की आधिकारिक शाखा या ऐप से ही सत्यापन करें।\n4. साइबर धोखाधड़ी होने पर तुरंत 1930 नंबर पर शिकायत दर्ज कराएं।`;
    }
    return `Sentinel Copilot सुरक्षा सहायक:\nअज्ञात संदेशों और आकर्षक इनाम के वादों से सावधान रहें। पैसे प्राप्त करने के लिए कभी भी UPI PIN दर्ज करने की आवश्यकता नहीं होती। आपातकाल में नेशनल साइबर हेल्पलाइन 1930 पर कॉल करें।`;
  }

  // English queries
  if (q.includes('clicked') || q.includes('what should i do if i clicked') || q.includes('compromised')) {
    return `Emergency Response Checklist:\n1. Disconnect Internet Immediately: Turn off Wi-Fi and mobile data to halt active background data exfiltration.\n2. Freeze Bank & Cards: If you entered banking or UPI details, call your bank's emergency hotline or toggle "Card Freeze" in your official banking app.\n3. Change Credentials: From a different safe device, update passwords for your email and financial accounts.\n4. Enable 2-Factor Authentication (MFA) using an authenticator app.\n5. File a Complaint: In India, call 1930 or submit details at cybercrime.gov.in.`;
  }

  if (q.includes('digital arrest') || q.includes('cbi') || q.includes('police')) {
    return `Digital Arrest Scam Reality Check:\n• What it is: Extortionists impersonate police, CBI, or customs officials claiming an illegal parcel was found in your name.\n• Key Fact: Real law enforcement agencies NEVER place individuals under "digital arrest" via Skype or WhatsApp video calls.\n• What to do: Disconnect the call immediately. Do NOT transfer funds to any "government escrow" account. Report the phone number to 1930.`;
  }

  if (q.includes('upi') || q.includes('pin') || q.includes('receive money')) {
    return `Golden Rule of UPI Security:\n• You NEVER need to enter your UPI PIN or scan a QR code to RECEIVE money.\n• Scammers send "Collect Request" notifications disguised as cashbacks or refunds.\n• If a prompt asks for your 4-digit or 6-digit PIN, money WILL leave your account. Decline and block immediately.`;
  }

  if (q.includes('job') || q.includes('internship') || q.includes('task') || q.includes('part-time')) {
    return `Identifying Fake Job Schemes:\n• Signs of a scam: Guaranteed high daily income (₹3,000+/day) for trivial tasks (e.g., liking YouTube videos or Google reviews).\n• The Hook: They pay a tiny trial sum (₹150) to build trust, then ask for a "security deposit" or Telegram VIP task investment.\n• Rule: Legitimate companies never charge candidates money to start working.`;
  }

  if (scanContext && scanContext.categoryLabel) {
    return `Regarding your recent scan (${scanContext.categoryLabel} - Risk Score ${scanContext.riskScore}/100):\nThis content was flagged because of ${scanContext.factors?.length || 'multiple'} suspicious markers. The primary danger is unauthorized financial loss or credential theft. We advise against clicking associated links or contacting the sender.`;
  }

  return `SentinelAI Security Recommendation:\n• Never trust unsolicited messages demanding immediate action or claiming your account will be suspended.\n• Always verify domain names in your browser address bar.\n• Keep 2FA active across all accounts.\n• Report suspicious Indian cyber fraud at National Helpline 1930 or cybercrime.gov.in.`;
}

// Dev & Production serving
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SentinelAI] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
