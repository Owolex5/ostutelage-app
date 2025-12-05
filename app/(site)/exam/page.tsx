"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { osTutelageExam, type ExamQuestion, MCQ, ShortAnswer } from "@/data/examData";
import { schoolsData } from "@/data/schoolsData";
import { Loader2, Clock, AlertCircle, Trophy, ChevronDown, Mail } from "lucide-react";
import dynamic from "next/dynamic";
import { getScholarshipByScore } from "@/lib/getScholarship";

const ResultPDF = dynamic(() => import("@/components/ResultPDF"), {
  ssr: false,
  loading: () => <p className="text-center py-8">Generating your result PDF...</p>,
});

type Step = "form" | "exam" | "result";

interface FormData {
  name: string;
  email: string;
  phone: string;
  school: string;
}

interface ShortAnswerResult {
  question: string;
  userAnswer: string;
  aiScore: number;
  scaledShortScore: number;
  feedback: string;
}

interface ResultData extends FormData {
  score: number;
  mcqCorrect: number;
  mcqMarks: number;           // out of 70
  shortMarks: number;         // out of 30
  scholarship: string;
  promoCode: string;
  discountPercent: number;
  badgeColor: string;
  message: string;
  string;
  shortAnswers: ShortAnswerResult[];
  timestamp: string;
}

export default function ExamPage() {
  const [step, setStep] = useState<Step>("form");
  const [form, setForm] = useState<FormData>({ name: "", email: "", phone: "", school: "" });
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [shortAnswers, setShortAnswers] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [showWarning, setShowWarning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultData, setResultData] = useState<ResultData | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (step === "exam" && questions.length === 0) {
      setQuestions(osTutelageExam.getQuestions());
      setAnswers(new Array(45).fill(null));
      setShortAnswers(new Array(5).fill(""));
    }
  }, [step]);

  useEffect(() => {
    if (step !== "exam" || questions.length === 0) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        {
          if (prev <= 0) {
            clearInterval(timerRef.current!);
            submitExam();
            return 0;
          }
          if (prev === 300) setShowWarning(true);
          return prev - 1;
        }
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [step, questions]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const handleMCQ = (qIndex: number, optIndex: number) => {
    const newAns = [...answers];
    newAns[qIndex] = optIndex;
    setAnswers(newAns);
  };

  const handleShort = (qIndex: number, value: string) => {
    const newShorts = [...shortAnswers];
    newShorts[qIndex] = value;
    setShortAnswers(newShorts);
  };

  const submitExam = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const mcqQuestions = questions.slice(0, 45) as MCQ[];
      const correctMCQ = mcqQuestions.filter((q, i) => answers[i] === q.correctAnswer).length;

      // NEW: MCQ = 70 marks, Short = 30 marks
      const mcqMarks = Math.round((correctMCQ / 45) * 70);
      let shortMarks = 0;
      const shortResults: ShortAnswerResult[] = [];

      for (let i = 0; i < 5; i++) {
        const q = questions[45 + i] as ShortAnswer;
        const userAnswer = shortAnswers[i] || "";

        let aiScore = 0;
        let feedback = "No answer provided.";

        if (userAnswer.trim()) {
          try {
            const res = await fetch("/api/grade-short", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                question: q.question,
                idealAnswer: q.idealAnswer,
                userAnswer,
              }),
            });
            if (!res.ok) throw new Error("AI error");
            const data = await res.json();
            aiScore = data.score || 0;
            feedback = data.feedback || "Graded by AI.";
          } catch (err) {
            feedback = "AI unavailable — fallback used";
            aiScore = Math.min(10, Math.ceil(userAnswer.trim().length / 12));
          }
        }

        // Each short = max 6 marks
        const scaled = Math.round((aiScore / 10) * 6);
        shortMarks += scaled;

        shortResults.push({
          question: q.question,
          userAnswer,
          aiScore,
          scaledShortScore: scaled,
          feedback,
        });
      }

      const totalScore = mcqMarks + shortMarks;

      // Get real scholarship from your DB codes
      const scholarship = getScholarshipByScore(totalScore);

      const result: ResultData = {
        ...form,
        score: totalScore,
        mcqCorrect: correctMCQ,
        mcqMarks,
        shortMarks,
        scholarship: scholarship.name,
        promoCode: scholarship.code,
        discountPercent: scholarship.discount,
        badgeColor: scholarship.badgeColor,
        message: scholarship.message,
        shortAnswers: shortResults,
        timestamp: new Date().toISOString(),
      };

      // Send to email API
      await fetch("/api/exam-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result),
      });

      setResultData(result);
      setStep("result");
    } catch (error) {
      console.error("Submit error:", error);
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () =>
    form.name.trim() &&
    form.email.includes("@") &&
    form.phone.length >= 10 &&
    form.school;

  return (
    <>
      {/* ==== FORM & EXAM SECTIONS — UNCHANGED (same as before) ==== */}
      {step === "form" && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="min-h-screen bg-gradient-to-br from-primary to-secondary py-20 lg:py-32 flex items-center"
        >
          <div className="mx-auto max-w-2xl w-full px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-8">
                OsTutelage Scholarship Exam
              </h1>

              <div className="space-y-6">
                <input type="text" placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-5 py-4 rounded-xl bg-white/30 backdrop-blur text-white placeholder-white/70 border border-white/40 focus:outline-none focus:ring-2 focus:ring-white/50" />
                />
                <input type="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-5 py-4 rounded-xl bg-white/30 backdrop-blur text-white placeholder-white/70 border border-white/40 focus:outline-none focus:ring-2 focus:ring-white/50" />
                <input type="tel" placeholder="Phone (+91...)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-5 py-4 rounded-xl bg-white/30 backdrop-blur text-white placeholder-white/70 border border-white/40 focus:outline-none focus:ring-2 focus:ring-white/50" />

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-full flex items-center justify-between px-5 py-4 rounded-xl bg-white/30 backdrop-blur text-white placeholder-white/70 border border-white/40 focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <span className={form.school ? "text-white" : "text-white/70"}>
                      {form.school || "Select your School / College"}
                    </span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {dropdownOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute left-0 right-0 mt-2 max-h-60 overflow-y-auto bg-white rounded-xl shadow-xl border border-gray-200 z-10"
                    >
                      {schoolsData.map((school) => (
                        <li
                          key={school.id}
                          onClick={() => {
                            setForm({ ...form, school: school.title });
                            setDropdownOpen(false);
                          }}
                          className="px-5 py-3 hover:bg-primary/10 cursor-pointer text-gray-800"
                        >
                          {school.title}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </div>

                <button
                  onClick={() => setStep("exam")}
                  disabled={!isFormValid()}
                  className="w-full py-4 bg-white text-primary rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Start Exam
                </button>
              </div>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* ==== EXAM SECTION — unchanged (same as before) ==== */}
      {step === "exam" && questions.length > 0 && (
        <section className="min-h-screen bg-gray-50 py-10 px-4">
          {/* ... your full exam UI ... */}
          {/* (kept exactly as before — no changes needed here) */}
        </section>
      )}

      {/* ==== RESULT PAGE — CLEAN & POWERFUL ==== */}
      {step === "result" && resultData && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 py-20 px-4"
        >
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-16 text-center">
                <Trophy className="w-28 h-28 mx-auto mb-8 text-yellow-300" />
                <h1 className="text-6xl font-black mb-4">CONGRATULATIONS {resultData.name.split(" ")[0].toUpperCase()}!</h1>
                <p className="text-2xl opacity-90">You have completed the OsTutelage Scholarship Exam</p>
              </div>

              {/* Score */}
              <div className="text-center py-12 bg-white">
                <div className="inline-block bg-gradient-to-br from-emerald-100 to-teal-100 px-20 py-12 rounded-3xl border-8 border-emerald-300 shadow-2xl">
                  <div className="text-9xl font-black text-emerald-600">{resultData.score}</div>
                  <div className="text-3xl text-gray-700 mt-4">Out of 100 Marks</div>
                </div>
              </div>

              {/* Scholarship Badge */}
              <div className="text-center py-10">
                <div
                  className="inline-block px-16 py-8 rounded-3xl text-white text-5xl font-black shadow-2xl"
                  style={{ backgroundColor: resultData.badgeColor }}
                >
                  {resultData.scholarship}
                </div>
                <p className="text-7xl font-black text-emerald-600 mt-8">
                  {resultData.discountPercent}% Scholarship Won!
                </p>
                <p className="text-2xl text-gray-700 mt-6 max-w-3xl mx-auto leading-relaxed">
                  {resultData.message}
                </p>
              </div>

              {/* PROMO CODE — IMPOSSIBLE TO MISS */}
              <div className="bg-amber-50 border-4 border-amber-400 rounded-3xl mx-16 py-10 my-12 text-center">
                <p className="text-amber-800 font-bold text-xl mb-6">Your Exclusive Scholarship Code</p>
                <div className="bg-amber-500 text-amber-900 text-6xl font-black py-8 px-12 rounded-2xl inline-block tracking-widest shadow-xl">
                  {resultData.promoCode}
                </div>
                <p className="text-amber-900 text-xl mt-8 font-semibold">
                  Use this code at signup → Get <strong>{resultData.discountPercent}% OFF</strong> instantly!
                </p>
              </div>

              {/* Score Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-16 py-10 bg-gray-50">
                <div className="bg-white p-10 rounded-2xl text-center shadow-xl">
                  <p className="text-gray-600 text-lg">MCQ Section</p>
                  <p className="text-5xl font-bold text-emerald-600 mt-4">{resultData.mcqCorrect}/45</p>
                  <p className="text-2xl text-gray-700 mt-2">= {resultData.mcqMarks}/70 marks</p>
                </div>
                <div className="bg-white p-10 rounded-2xl text-center shadow-xl">
                  <p className="text-gray-600 text-lg">Short Answers (AI Graded)</p>
                  <p className="text-5xl font-bold text-purple-600 mt-4">{resultData.shortMarks}/30</p>
                </div>
              </div>

              {/* Email Reminder */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-10 text-center">
                <div className="flex items-center justify-center gap-4 text-2xl text-gray-800 mb-6">
                  <Mail className="w-10 h-10 text-emerald-600" />
                  <span>Check your email <strong>({resultData.email})</strong> for your full result & scholarship code!</span>
                </div>
                <p className="text-lg text-gray-600">We just sent you everything — including your unique promo code</p>
              </div>

              {/* CTA Button */}
              <div className="text-center py-16 bg-gradient-to-r from-emerald-600 to-teal-700">
                <a
                  href={`https://app.ostutelage.tech/portal/signup.php?promo=${resultData.promoCode}&name=${encodeURIComponent(resultData.name)}&email=${encodeURIComponent(resultData.email)}&score=${resultData.score}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-5 px-20 py-7 bg-white text-emerald-700 rounded-3xl text-3xl font-black shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all"
                >
                  Claim My {resultData.discountPercent}% Scholarship Now
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </a>
                <p className="text-white text-xl mt-8 opacity-90">
                  Offer expires in 7 days • Limited seats available
                </p>
              </div>

              <ResultPDF data={resultData} />
            </motion.div>
          </div>
        </motion.section>
      )}
    </>
  );
}