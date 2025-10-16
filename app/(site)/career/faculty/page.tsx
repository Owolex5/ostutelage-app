// app/(site)/career/page.tsx (or wherever your faculty page is located)
"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { GraduationCap, Check, Mail, Phone, Upload, ArrowRight } from "lucide-react";

const FacultyPage = () => {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const qualifications = [
    "Master's, PhD, Diploma or Degree in relevant field (e.g., Computer Science, Data Science, Cybersecurity)",
    "2+ years of industry experience in tech",
    "Proven teaching or mentoring experience",
    "Strong communication and presentation skills",
    "Passion for edtech and student success",
  ];

  const responsibilities = [
    "Design and deliver engaging live/online classes",
    "Mentor students on real-world projects",
    "Update curriculum based on industry trends",
    "Provide career guidance and feedback",
    "Collaborate with our team on program innovation",
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setFeedback("");

    const formData = new FormData(e.currentTarget);
    
    try {
      const res = await fetch("/api/career/apply", {
        method: "POST",
        body: formData, // Send FormData directly (includes files)
      });

      const result = await res.json();

      if (res.ok) {
        setFeedback(
          result.message || 
          "Faculty application submitted successfully! We'll review your resume and respond within 3-5 business days."
        );
        e.currentTarget.reset();
      } else {
        setFeedback(result.message || "Failed to submit faculty application. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting faculty application:", err);
      setFeedback("An error occurred while submitting your application. Please check your connection and try again.");
    }

    setLoading(false);
  };

  return (
    <main className="py-20 lg:py-24">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium text-sm uppercase tracking-wide rounded-full">
              <GraduationCap className="w-4 h-4" />
              <span>Join Our Faculty</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Become an Instructor at OsTutelage
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              Share your expertise and inspire future tech leaders. As a faculty member, you'll teach cutting-edge programs and mentor students toward successful careers.
            </p>
            <Link
              href="#apply"
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Apply to Teach
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Qualifications */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Who We're Looking For</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Passionate educators with real-world tech experience.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Qualifications</h3>
              <ul className="space-y-4">
                {qualifications.map((qual, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{qual}</span>
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
              Faculty Application
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
              Share your teaching experience and credentials. Include your resume/CV and details about your industry background.
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
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white transition-colors"
                  placeholder="Dr. Jane Smith"
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
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white transition-colors"
                    placeholder="jane.smith@university.edu"
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
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white transition-colors"
                    placeholder="+234 123 456 7890"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Teaching Area/Role
                </label>
                <input
                  id="role"
                  type="text"
                  name="role"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white transition-colors"
                  placeholder="e.g., Data Science Instructor, Cybersecurity Lecturer"
                />
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Professional Experience *
                </label>
                <textarea
                  id="experience"
                  name="experience"
                  rows={4}
                  required
                  placeholder="Describe your teaching experience, industry background, certifications, and areas of expertise. Include any relevant courses you've taught or projects you've led..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white transition-colors resize-vertical"
                />
              </div>

              <div>
                <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cover Letter (Optional)
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  rows={3}
                  placeholder="Tell us why you'd like to teach at OsTutelage and what unique value you bring to our students..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white transition-colors resize-vertical"
                />
              </div>

              <div>
                <label htmlFor="resume" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Resume/CV * 
                  <span className="text-xs text-gray-500 block mt-1">
                    PDF or Word document (max 10MB)
                  </span>
                </label>
                <div className="flex items-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-800 transition-colors">
                  <Upload className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  <input
                    id="resume"
                    type="file"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    required
                    className="flex-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 transition-colors"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Please upload your most recent resume or CV highlighting your teaching and industry experience
                </p>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting Application...
                  </>
                ) : (
                  <>
                    Submit Faculty Application
                    <Mail className="w-5 h-5" />
                  </>
                )}
              </motion.button>

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
            </form>

            <p className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
              Questions about joining our faculty?{" "}
              <Link href="/contact" className="text-blue-600 hover:underline font-medium">
                Contact our team
              </Link>
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default FacultyPage;