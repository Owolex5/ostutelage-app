"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { osTutelageExam, type ExamQuestion, MCQ, ShortAnswer } from "@/data/examData";
import { schoolsData } from "@/data/schoolsData";          // <-- NEW
import ResultPDF from "@/components/ResultPDF";
import { Loader2, Clock, AlertCircle, Trophy, ChevronDown } from "lucide-react";

type Step = "form" | "exam" | "result";

interface FormData {
  name: string;
  email: string;
  phone: string;
  school: string;          // <-- will hold the selected school **title**
}

interface ResultData extends FormData {
  score: number;
  mcqScore: number;
  shortScore: number;
  scholarship: string;
  shortAnswers: any[];
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

  /* -------------------------------------------------
     Load questions (only once when we enter the exam)
  ------------------------------------------------- */
  useEffect(() => {
    if (step === "exam" && questions.length === 0) {
      setQuestions(osTutelageExam.getQuestions());
      setAnswers(new Array(45).fill(null));
      setShortAnswers(new Array(5).fill(""));
    }
  }, [step]);

  /* -------------------------------------------------
     Timer
  ------------------------------------------------- */
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

  /* -------------------------------------------------
     Submit + AI grading
  ------------------------------------------------- */
  const submitExam = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const mcqQuestions = questions.slice(0, 45) as MCQ[];
      const correctMCQ = mcqQuestions.filter((q, i) => answers[i] === q.correctAnswer).length;
      const mcqScore = Math.round((correctMCQ / 45) * 100);

      let shortScore = 0;
      const shortResults: any[] = [];

      for (let i = 0; i < 5; i++) {
        const qIdx = 45 + i;
        const q = questions[qIdx] as ShortAnswer;
        const userAnswer = shortAnswers[i] || "";

        let aiScore = 0;
        let feedback = "No answer.";

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
            const data = await res.json();
            aiScore = data.score || 0;
            feedback = data.feedback || "Graded.";
          } catch (err) {
            feedback = "AI error.";
          }
        }

        shortScore += aiScore;
        shortResults.push({ question: q.question, userAnswer, aiScore, feedback });
      }

      const avgShort = shortScore / 5;
      const finalShortPercent = (avgShort / 10) * 100;
      const totalScore = Math.round((mcqScore * 0.5) + (finalShortPercent * 0.5));

      let scholarship = "";
      if (totalScore >= 92) scholarship = "100% Scholarship";
      else if (totalScore >= 85) scholarship = "60% Scholarship";
      else if (totalScore >= 75) scholarship = "40% Scholarship";
      else if (totalScore >= 65) scholarship = "25% Scholarship";
      else scholarship = "Try Again";

      const result: ResultData = {
        ...form,
        score: totalScore,
        mcqScore: correctMCQ,
        shortScore,
        scholarship,
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
      alert("Failed to submit. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () =>
    form.name && form.email.includes("@") && form.phone.length >= 10 && form.school;

  /* -------------------------------------------------
     Render
  ------------------------------------------------- */
  return (
    <>
      {/* ==== FORM ==== */}
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
                {/* Name */}
                <input
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl bg-white/30 backdrop-blur text-white placeholder-white/70 border border-white/40 focus:outline-none focus:ring-2 focus:ring-white/50"
                />

                {/* Email */}
                <input
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl bg-white/30 backdrop-blur text-white placeholder-white/70 border border-white/40 focus:outline-none focus:ring-2 focus:ring-white/50"
                />

                {/* Phone */}
                <input
                  type="tel"
                  placeholder="Phone (+91...)"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl bg-white/30 backdrop-blur text-white placeholder-white/70 border border-white/40 focus:outline-none focus:ring-2 focus:ring-white/50"
                />

                {/* SCHOOL DROPDOWN */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setDropdownOpen((o) => !o)}
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
                      exit={{ opacity: 0, y: -8 }}
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

                {/* Start button */}
                <button
                  onClick={() => setStep("exam")}
                  disabled={!isFormValid()}
                  className="w-full py-4 bg-white text-primary rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Start Exam
                </button>
              </div>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* ==== EXAM ==== */}
      {step === "exam" && questions.length > 0 && (
        <section className="min-h-screen bg-gray-50 py-10 px-4">
          {/* Timer + Submit */}
          <div className="max-w-6xl mx-auto flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <Clock className="w-7 h-7 text-red-600" />
              <span className="text-3xl font-bold text-red-600">{formatTime(timeLeft)}</span>
            </div>
            <button
              onClick={submitExam}
              disabled={isSubmitting}
              className="px-8 py-3 bg-primary text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center gap-2"
            >
              {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
              Submit Exam
            </button>
          </div>

          {/* Progress */}
          <div className="max-w-6xl mx-auto mb-8">
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{
                  width: `${((45 - answers.filter((a) => a === null).length) / 45) * 100}%`,
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2 text-center">
              {45 - answers.filter((a) => a === null).length}/45 MCQs answered
            </p>
          </div>

          {/* Questions */}
          <div className="max-w-6xl mx-auto space-y-10">
            {questions.map((q, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100"
              >
                {q.type === "mcq" ? (
                  <>
                    <p className="font-bold text-lg mb-4">{i + 1}. {q.question}</p>
                    <div className="space-y-3">
                      {q.options.map((opt, idx) => (
                        <label
                          key={idx}
                          className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            answers[i] === idx
                              ? "bg-primary text-white border-primary"
                              : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`q${i}`}
                            checked={answers[i] === idx}
                            onChange={() => handleMCQ(i, idx)}
                            className="mr-3 w-5 h-5"
                          />
                          <span className="font-medium">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <p className="font-bold text-lg mb-3">{i + 1}. {q.question}</p>
                    <textarea
                      placeholder={q.placeholder || "Your answer..."}
                      value={shortAnswers[i - 45] || ""}
                      onChange={(e) => handleShort(i - 45, e.target.value)}
                      maxLength={q.maxChars}
                      rows={4}
                      className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    />
                    <p className="text-xs text-gray-500 text-right mt-1">
                      {(shortAnswers[i - 45]?.length || 0)}/{q.maxChars}
                    </p>
                  </>
                )}
              </motion.div>
            ))}
          </div>

          {/* Warning modal */}
          {showWarning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-md"
              >
                <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-red-600 mb-2">5 Minutes Left!</h3>
                <p className="text-gray-600">Submit soon to avoid auto-submit.</p>
                <button
                  onClick={() => setShowWarning(false)}
                  className="mt-6 px-8 py-3 bg-primary text-white rounded-xl font-semibold"
                >
                  Continue
                </button>
              </motion.div>
            </motion.div>
          )}
        </section>
      )}

      {/* ==== RESULT ==== */}
      {step === "result" && resultData && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 py-20 px-4"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-3xl p-10 shadow-2xl text-center"
            >
              <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
              <h1 className="text-4xl font-bold mb-4">Exam Complete!</h1>
              <div className="text-8xl font-bold text-primary mb-2">{resultData.score}%</div>
              <p className="text-2xl text-gray-700 mb-8">Total Score</p>

              <div
                className={`inline-block px-8 py-4 rounded-full text-2xl font-bold mb-8 ${
                  resultData.score >= 75 ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                }`}
              >
                {resultData.scholarship}
              </div>

              <div className="grid grid-cols-2 gap-6 mb-10 text-left">
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <p className="text-sm text-gray-600">MCQ Score</p>
                  <p className="text-3xl font-bold">{resultData.mcqScore}/45</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <p className="text-sm text-gray-600">Short Answer (AI)</p>
                  <p className="text-3xl font-bold">{resultData.shortScore}/50</p>
                </div>
              </div>

              <ResultPDF data={resultData} />

              <a
                href="https://app.ostutelage.tech/portal/signup.php"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 mt-10 px-10 py-4 bg-primary text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
              >
                Apply with Scholarship
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </motion.div>
          </div>
        </motion.section>
      )}
    </>
  );
}