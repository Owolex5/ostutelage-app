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
  loading: () => <p className="text-center py-8 text-gray-400">Generating your result PDF...</p>,
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
  mcqMarks: number;
  shortMarks: number;
  scholarship: string;
  promoCode: string;
  discountPercent: number;
  badgeColor: string;
  message: string;
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

  // Load questions when entering exam
  useEffect(() => {
    if (step === "exam" && questions.length === 0) {
      setQuestions(osTutelageExam.getQuestions());
      setAnswers(new Array(45).fill(null));
      setShortAnswers(new Array(5).fill(""));
    }
  }, [step]);

  // Timer
  useEffect(() => {
    if (step !== "exam" || questions.length === 0) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timerRef.current!);
          submitExam();
          return 0;
        }
        if (prev === 300) setShowWarning(true);
        return prev - 1;
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
      const scholarship = getScholarshipByScore(totalScore);

      const result: ResultData = {
        ...form,
        score: totalScore,
        mcqCorrect,
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
    form.name.trim() && form.email.includes("@") && form.phone.length >= 10 && form.school;

  return (
    <>
      {/* ==== FORM ==== */}
      {step === "form" && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-cyan-900 py-20 lg:py-32 flex items-center"
        >
          <div className="mx-auto max-w-2xl w-full px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-black/40 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-cyan-500/30"
            >
              <h1 className="text-5xl md:text-6xl font-black text-cyan-400 text-center mb-10 tracking-tight">
                OsTutelage Scholarship Exam
              </h1>

              <div className="space-y-8">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-6 py-5 rounded-2xl bg-white/10 border border-cyan-400/50 text-white placeholder-cyan-200 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 text-lg"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-6 py-5 rounded-2xl bg-white/10 border border-cyan-400/50 text-white placeholder-cyan-200 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 text-lg"
                />
                <input
                  type="tel"
                  placeholder="Phone (+91...)"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-6 py-5 rounded-2xl bg-white/10 border border-cyan-400/50 text-white placeholder-cyan-200 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 text-lg"
                />

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-full flex items-center justify-between px-6 py-5 rounded-2xl bg-white/10 border border-cyan-400/50 text-white text-lg"
                  >
                    <span className={form.school ? "text-white" : "text-cyan-200"}>
                      {form.school || "Select your School / College"}
                    </span>
                    <ChevronDown className={`w-6 h-6 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {dropdownOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute left-0 right-0 mt-3 max-h-64 overflow-y-auto bg-gray-900 rounded-2xl shadow-2xl border border-cyan-500/50 z-50"
                    >
                      {schoolsData.map((school) => (
                        <li
                          key={school.id}
                          onClick={() => {
                            setForm({ ...form, school: school.title });
                            setDropdownOpen(false);
                          }}
                          className="px-6 py-4 hover:bg-cyan-900/50 cursor-pointer text-cyan-100 border-b border-cyan-800/50 last:border-0"
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
                  className="w-full py-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-black text-2xl rounded-2xl shadow-2xl hover:shadow-cyan-500/50 transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Start Exam
                </button>
              </div>
            </motion.div>
          </div>
        </motion.section>
      )}
  
      {/* ==== EXAM SECTION ==== */}
      {step === "exam" && questions.length > 0 && (
        <section className="min-h-screen bg-gray-900 text-gray-100 py-10 px-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center mb-10">
            <div className="flex items-center gap-4">
              <Clock className="w-10 h-10 text-red-500" />
              <span className="text-5xl font-black text-red-500">{formatTime(timeLeft)}</span>
            </div>
            <button
              onClick={submitExam}
              disabled={isSubmitting}
              className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold text-xl rounded-2xl shadow-2xl hover:shadow-cyan-500/50 flex items-center gap-3"
            >
              {isSubmitting && <Loader2 className="w-7 h-7 animate-spin" />}
              Submit Exam
            </button>
          </div>

          <div className="max-w-6xl mx-auto mb-12">
            <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-600"
                initial={{ width: 0 }}
                animate={{ width: `${((45 - answers.filter(a => a === null).length) / 45) * 100}%` }}
                transition={{ duration: 0.6 }}
              />
            </div>
            <p className="text-cyan-400 text-center mt-3 text-lg">
              {45 - answers.filter(a => a === null).length}/45 MCQs answered
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-10">
            {questions.map((q, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gray-800/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-cyan-500/30"
              >
                {q.type === "mcq" ? (
                  <>
                    <p className="font-bold text-2xl text-cyan-400 mb-6">{i + 1}. {q.question}</p>
                    <div className="space-y-5">
                      {q.options.map((opt, idx) => (
                        <label
                          key={idx}
                          className={`flex items-center p-6 rounded-2xl border-2 cursor-pointer transition-all text-lg ${
                            answers[i] === idx
                              ? "bg-gradient-to-r from-cyan-600 to-blue-700 border-cyan-400 text-white shadow-lg"
                              : "bg-gray-700/50 border-gray-600 hover:bg-gray-700 hover:border-cyan-500"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`q${i}`}
                            checked={answers[i] === idx}
                            onChange={() => handleMCQ(i, idx)}
                            className="mr-5 w-6 h-6"
                          />
                          <span className="font-medium">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <p className="font-bold text-2xl text-cyan-400 mb-5">{i + 1}. {q.question}</p>
                    <textarea
                      placeholder={q.placeholder || "Your answer..."}
                      value={shortAnswers[i - 45] || ""}
                      onChange={(e) => handleShort(i - 45, e.target.value)}
                      maxLength={q.maxChars}
                      rows={5}
                      className="w-full p-6 rounded-2xl bg-gray-800 border border-cyan-500/50 text-white focus:outline-none focus:ring-4 focus:ring-cyan-500/50 resize-none text-lg"
                    />
                    <p className="text-right text-cyan-400 text-sm mt-2">
                      {(shortAnswers[i - 45]?.length || 0)}/{q.maxChars}
                    </p>
                  </>
                )}
              </motion.div>
            ))}
          </div>

          {/* Warning Modal */}
          {showWarning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="bg-gradient-to-br from-red-900 to-purple-900 rounded-3xl p-12 shadow-2xl text-center max-w-lg border-4 border-red-500"
              >
                <AlertCircle className="w-24 h-24 text-red-400 mx-auto mb-6" />
                <h3 className="text-5xl font-black text-red-400 mb-4">5 Minutes Left!</h3>
                <p className="text-xl text-gray-300">Submit soon to secure your score</p>
                <button
                  onClick={() => setShowWarning(false)}
                  className="mt-10 px-12 py-5 bg-red-600 text-white rounded-2xl font-bold text-xl hover:bg-red-700 transition"
                >
                  Continue Exam
                </button>
              </motion.div>
            </motion.div>
          )}
        </section>
      )}

      {/* ==== RESULT PAGE ==== */}
      {step === "result" && resultData && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 px-4"
        >
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-b from-gray-900 to-black rounded-3xl shadow-2xl overflow-hidden border border-cyan-500/50"
            >
              <div className="bg-gradient-to-r from-cyan-600 via-purple-700 to-pink-700 p-16 text-center">
                <Trophy className="w-32 h-32 mx-auto mb-8 text-yellow-400 drop-shadow-2xl" />
                <h1 className="text-7xl font-black text-white mb-4 drop-shadow-2xl">
                  CONGRATULATIONS {resultData.name.split(" ")[0].toUpperCase()}!
                </h1>
                <p className="text-2xl text-cyan-200">You have conquered the OsTutelage Scholarship Exam</p>
              </div>

              <div className="text-center py-16 bg-black/50">
                <div className="inline-block bg-gradient-to-br from-cyan-900/80 to-purple-900/80 px-24 py-16 rounded-3xl border-8 border-cyan-500 shadow-2xl">
                  <div className="text-9xl font-black text-cyan-400 drop-shadow-2xl">{resultData.score}</div>
                  <div className="text-3xl text-gray-300 mt-4">Out of 100 Marks</div>
                </div>
              </div>

              <div className="text-center py-12">
                <div
                  className="inline-block px-20 py-10 rounded-3xl text-white text-6xl font-black shadow-2xl"
                  style={{ backgroundColor: resultData.badgeColor }}
                >
                  {resultData.scholarship}
                </div>
                <p className="text-8xl font-black text-cyan-400 mt-10">
                  {resultData.discountPercent}% SCHOLARSHIP WON!
                </p>
                <p className="text-2xl text-gray-300 mt-8 max-w-4xl mx-auto">{resultData.message}</p>
              </div>

              <div className="bg-gradient-to-r from-amber-900/50 to-orange-900/50 border-4 border-amber-500 rounded-3xl mx-20 py-12 my-16 text-center">
                <p className="text-amber-400 font-bold text-2xl mb-8">Your Exclusive Scholarship Code</p>
                <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-black text-7xl font-black py-10 px-16 rounded-3xl inline-block tracking-widest shadow-2xl">
                  {resultData.promoCode}
                </div>
                <p className="text-amber-300 text-2xl mt-10 font-bold">
                  Use this code → Get <span className="text-4xl">{resultData.discountPercent}% OFF</span> instantly!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-20 py-12 bg-black/60">
                <div className="bg-gradient-to-br from-cyan-900/50 to-blue-900/50 p-12 rounded-3xl text-center border border-cyan-500/50">
                  <p className="text-cyan-300 text-xl">MCQ Section</p>
                  <p className="text-6xl font-black text-cyan-400 mt-4">{resultData.mcqCorrect}/45</p>
                  <p className="text-3xl text-gray-300 mt-4">= {resultData.mcqMarks}/70 marks</p>
                </div>
                <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 p-12 rounded-3xl text-center border border-purple-500/50">
                  <p className="text-purple-300 text-xl">Short Answers (AI)</p>
                  <p className="text-6xl font-black text-purple-400 mt-4">{resultData.shortMarks}/30</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-900/80 to-purple-900/80 p-12 text-center">
                <div className="flex items-center justify-center gap-5 text-3xl text-cyan-300 mb-6">
                  <Mail className="w-12 h-12" />
                  <span>Check your email <strong className="text-white">({resultData.email})</strong> for full result!</span>
                </div>
                <p className="text-xl text-gray-300">We just sent you your certificate & scholarship details</p>
              </div>

              <div className="text-center py-20 bg-gradient-to-r from-cyan-700 via-purple-700 to-pink-700">
                <a
                  href={`https://app.ostutelage.tech/portal/signup.php?promo=${resultData.promoCode}&name=${encodeURIComponent(resultData.name)}&email=${encodeURIComponent(resultData.email)}&score=${resultData.score}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-6 px-24 py-10 bg-white text-black rounded-3xl text-4xl font-black shadow-2xl hover:shadow-cyan-500/50 transform hover:scale-105 transition-all"
                >
                  Claim My {resultData.discountPercent}% Scholarship Now
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </a>
                <p className="text-white text-2xl mt-10 opacity-90">
                  Offer expires in 7 days • Limited seats
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