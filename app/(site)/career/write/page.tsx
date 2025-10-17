"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { FileText, Check, Mail, Phone, Upload, ArrowRight } from "lucide-react";

const WritePage = () => {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const requirements = [
    "Strong writing skills with experience in technical/educational content",
    "Proficiency in coding (e.g., JavaScript, Python) for tech-focused writing",
    "Portfolio of published articles, blogs, or books",
    "Understanding of edtech trends and audience (learners, educators)",
    "Ability to research and adapt content for diverse formats",
  ];

  const responsibilities = [
    "Create engaging blog posts, guides, and tutorials",
    "Develop content for courses, books, and marketing materials",
    "Collaborate with faculty on accurate, industry-relevant resources",
    "Edit and proofread submissions for clarity and quality",
    "Contribute to content strategy for student engagement",
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setFeedback("");

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/career/write", {
        method: "POST",
        body: formData,
      });

      const contentType = res.headers.get("content-type");
      let result;

      // Handle both JSON and non-JSON responses
      if (contentType && contentType.includes("application/json")) {
        result = await res.json();
      } else {
        result = { message: "Unexpected response format" };
      }

      console.log("Writer API Response:", { status: res.status, result }); // Debug log

      if (res.ok) {
        setFeedback(
          result.message || result.success
            ? "Writer application submitted successfully! Check your email for confirmation."
            : "Application received successfully!"
        );
        e.currentTarget.reset();
      } else {
        setFeedback(
          result.message || `Failed to submit writer application (Status: ${res.status}). Please try again.`
        );
      }

      // Auto-clear feedback after 8 seconds
      setTimeout(() => setFeedback(""), 8000);
    } catch (err) {
      console.error("Writer submission error:", err);
      setFeedback(
        "Network error occurred. Please check your connection and try again, or email us directly at info@ostutelage.tech."
      );
    }

    setLoading(false);
  };

  return (
    <main className="py-20 lg:py-24">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium text-sm uppercase tracking-wide rounded-full">
              <FileText className="w-4 h-4" />
              <span>Contribute Your Voice</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Write for OsTutelage Academy
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              Help craft the resources that empower learners. As a contributor, you'll create impactful content for our courses, blogs, and books—blending your writing and coding skills.
            </p>
            <Link
              href="#apply"
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Submit Your Portfolio
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">What We Need</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Talented creators who can simplify complex tech concepts.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Requirements</h3>
              <ul className="space-y-4">
                {requirements.map((req, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{req}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6">Responsibilities</h3>
              <ul className="space-y-4">
                {responsibilities.map((resp, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{resp}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-2xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
              Apply as a Content Writer
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
              Share your writing experience and portfolio. We'll review your samples and get back to you within 3-5 business days.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:bg-gray-800 dark:text-white transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:bg-gray-800 dark:text-white transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:bg-gray-800 dark:text-white transition-colors"
                    placeholder="+234 123 456 7890"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Writing Experience *
                </label>
                <textarea
                  id="experience"
                  name="experience"
                  rows={4}
                  required
                  placeholder="Tell us about your writing background, areas of expertise, coding skills, and any published work..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:bg-gray-800 dark:text-white transition-colors resize-vertical"
                />
              </div>

              <div>
                <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Portfolio/Samples * 
                  <span className="text-xs text-gray-500 block mt-1">
                    PDF, DOC, DOCX, PPTX, JPG, PNG (max 10MB per file)
                  </span>
                </label>
                <div className="flex items-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-800 transition-colors">
                  <Upload className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  <input
                    id="portfolio"
                    type="file"
                    name="portfolio"
                    accept=".pdf,.doc,.docx,.pptx,.jpg,.jpeg,.png,.gif"
                    required
                    className="flex-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-500 file:text-white hover:file:bg-purple-600 transition-colors"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Upload your best writing samples, portfolio, or published articles
                </p>
              </div>

              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl text-center text-sm ${
                    feedback.includes("successfully") || feedback.includes("received")
                      ? "bg-green-50 border border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800/50 dark:text-green-300"
                      : "bg-red-50 border border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800/50 dark:text-red-300"
                  }`}
                >
                  {feedback}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Writer Application
                    <Mail className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>

            <p className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
              Questions about writing for us?{" "}
              <Link href="/contact" className="text-purple-600 hover:underline font-medium">
                Contact our team
              </Link>
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default WritePage;