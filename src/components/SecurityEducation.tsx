import React, { useState } from 'react';
import {
  GraduationCap,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  RefreshCw,
  QrCode,
  DollarSign,
  AlertTriangle,
  Briefcase,
  Smartphone,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizQuestion {
  id: number;
  question: string;
  scenario?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'You receive an urgent SMS: "Your SBI bank account is blocked today. Verify KYC immediately at this link". What is the safest course of action?',
    options: [
      'Click the link quickly before the deadline expires',
      'Ignore the link and check your official banking app or visit the branch',
      'Reply to the SMS asking for confirmation',
      'Forward the message to family members to ask them',
    ],
    correctAnswer: 1,
    explanation: 'Legitimate banks NEVER threaten instantaneous suspension via SMS or provide third-party web links for mandatory KYC updates.',
  },
  {
    id: 2,
    question: 'A buyer on an online marketplace sends a QR code claiming to send you payment for your old furniture. They ask you to scan it and enter your 6-digit UPI PIN. What will happen?',
    options: [
      'The payment will be safely credited to your bank account',
      'Money will be deducted from YOUR account, not credited',
      'Your bank will verify your identity without moving funds',
      'You will receive double cashback',
    ],
    correctAnswer: 1,
    explanation: 'Golden Rule of UPI: You NEVER need to scan a QR code or enter your UPI PIN to RECEIVE money. Entering your PIN authorizes money leaving your account.',
  },
  {
    id: 3,
    question: 'A video caller in a police uniform shows an arrest warrant with your Aadhaar ID, claiming a narcotics package was seized in your name and ordering a "Digital Arrest". What should you do?',
    options: [
      'Transfer funds to the "police verification escrow" to prove innocence',
      'Remain on video call for 24 hours until clearance is granted',
      'Hang up immediately, do not pay, and report the number to 1930',
      'Share your Aadhaar and bank statements to clear your name',
    ],
    correctAnswer: 2,
    explanation: 'Indian courts, CBI, and police NEVER conduct "digital arrests" via WhatsApp or Skype, nor do they demand money transfers to verify identity.',
  },
  {
    id: 4,
    question: 'A Telegram channel promises ₹3,500/day for liking YouTube videos. They pay ₹150 for the first task, then ask for a ₹1,000 "registration deposit". Is this legitimate?',
    options: [
      'Yes, they proved credibility by paying the first ₹150',
      'No, this is a classic task-based advance-fee scam',
      'Yes, if they provide a company certificate PDF',
      'Yes, it is a recognized government work-from-home initiative',
    ],
    correctAnswer: 1,
    explanation: 'Scammers deliberately send small initial payments (the "sweetener") to establish false trust before extracting thousands in non-refundable task deposits.',
  },
  {
    id: 5,
    question: 'What is a "Punycode" (e.g. xn--) or Homoglyph attack in URL phishing?',
    options: [
      'A method to speed up webpage loading speeds',
      'Using visually identical characters from foreign alphabets to mimic legitimate domains',
      'A type of encrypted QR code',
      'An official security certificate issued by Google',
    ],
    correctAnswer: 1,
    explanation: 'Homoglyph attacks exploit characters like Cyrillic "а" that look identical to Latin "a" to create spoofed websites (e.g., lookalike banking portals).',
  },
];

export const SecurityEducation: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    setIsAnswerSubmitted(true);
    if (selectedAnswer === currentQ.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
      // Trigger confetti celebration!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* Top Banner */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
            Cyber Defense Academy
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800">
            AWARENESS MODULE
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Threat Intelligence Guides & Interactive Quiz
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Master the psychological markers of social engineering before you become a target.
        </p>
      </div>

      {/* Interactive Mini Quiz Component */}
      <div className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm sm:text-base font-bold text-white">
              Sentinel Security Awareness Challenge
            </h3>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
            Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}
          </span>
        </div>

        {!quizFinished ? (
          <div className="space-y-6">
            <h4 className="text-base sm:text-lg font-semibold text-white leading-relaxed">
              {currentQ.question}
            </h4>

            {/* Options */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrect = idx === currentQ.correctAnswer;
                let optionStyle = 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-300';

                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    optionStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-semibold';
                  } else if (isSelected && !isCorrect) {
                    optionStyle = 'bg-rose-950/40 border-rose-500 text-rose-300';
                  } else {
                    optionStyle = 'bg-slate-950/40 border-slate-900 text-slate-600 opacity-50';
                  }
                } else if (isSelected) {
                  optionStyle = 'bg-cyan-950/40 border-cyan-500 text-cyan-200';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswerSubmitted}
                    className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm flex items-start gap-3 transition-all ${optionStyle}`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-center font-mono text-xs font-bold flex-shrink-0 text-slate-300">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-snug pt-0.5">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Explanation box on submit */}
            {isAnswerSubmitted && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2">
                  {selectedAnswer === currentQ.correctAnswer ? (
                    <span className="text-emerald-400 font-bold text-xs flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Correct Decision!
                    </span>
                  ) : (
                    <span className="text-rose-400 font-bold text-xs flex items-center gap-1">
                      <XCircle className="w-4 h-4" /> Dangerous Trap!
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{currentQ.explanation}</p>
              </div>
            )}

            {/* Action Bar */}
            <div className="flex justify-end pt-2">
              {!isAnswerSubmitted ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedAnswer === null
                      ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                  }`}
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                >
                  {currentQuestionIndex < QUIZ_QUESTIONS.length - 1 ? (
                    <>
                      Next Question <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  ) : (
                    <>
                      Complete Challenge <Sparkles className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Finished Quiz Summary */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
              <Sparkles className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-white">Challenge Completed!</h4>
            <p className="text-sm text-slate-300">
              Your Awareness Score:{' '}
              <strong className="text-cyan-400 font-mono text-lg">
                {score} / {QUIZ_QUESTIONS.length}
              </strong>{' '}
              ({Math.round((score / QUIZ_QUESTIONS.length) * 100)}%)
            </p>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              {score >= 4
                ? 'Outstanding cyber hygiene! You successfully identified high-urgency manipulation and deceptive financial lures.'
                : 'Good attempt! Review the threat knowledge cards below to strengthen your defenses against social engineering.'}
            </p>
            <button
              onClick={handleRestartQuiz}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold border border-slate-700 transition-colors inline-flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Retake Quiz
            </button>
          </div>
        )}
      </div>

      {/* 8 Core Knowledge Cards */}
      <div className="space-y-4">
        <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400">
          Core Threat Identification Blueprints
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400">
              <AlertTriangle className="w-4 h-4" />
              <h4 className="text-sm font-bold text-white">1. Urgency Manipulation</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Attackers invent artificial deadlines ("Account suspended in 2 hours") to trigger adrenaline and bypass critical thinking.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400">
              <DollarSign className="w-4 h-4" />
              <h4 className="text-sm font-bold text-white">2. UPI PIN Rule</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              A PIN is strictly used to AUTHORIZE outgoing payments. You never enter a PIN or scan a merchant QR to receive cashback.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-rose-400">
              <ShieldAlert className="w-4 h-4" />
              <h4 className="text-sm font-bold text-white">3. Digital Arrest Scam</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Extortionists pose as police on video calls claiming narcotics were seized. Disconnect immediately; legal arrests are never virtual.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-purple-400">
              <Briefcase className="w-4 h-4" />
              <h4 className="text-sm font-bold text-white">4. Telegram Job Schemes</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Promises of ₹3,000/day for liking videos are pyramid advance-fee traps. Legitimate jobs never charge candidates to work.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400">
              <Smartphone className="w-4 h-4" />
              <h4 className="text-sm font-bold text-white">5. Unsolicited OTPs</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Never read an OTP to a caller, even if they claim to be your bank manager or telecom provider updating your SIM.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-blue-400">
              <QrCode className="w-4 h-4" />
              <h4 className="text-sm font-bold text-white">6. Malicious QR Codes</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Quishing involves replacing parking or counter QR codes with links to malicious APK droppers or payment redirection pages.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-orange-400">
              <BookOpen className="w-4 h-4" />
              <h4 className="text-sm font-bold text-white">7. Fake Courier Alerts</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              SMS claiming India Post parcel failed delivery requiring ₹25 fee is designed to harvest full debit card CVV credentials.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400">
              <ShieldCheck className="w-4 h-4" />
              <h4 className="text-sm font-bold text-white">8. Golden Hour Defense</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              If scammed financially in India, call National Helpline 1930 within the first hour to freeze funds before the scammer cashes out.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
