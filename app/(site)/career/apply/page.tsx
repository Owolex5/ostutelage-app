"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Briefcase, ArrowRight, Mail, Upload, Phone } from "lucide-react";

// Component that uses useSearchParams
function CareerApplyContent() {
  const searchParams = useSearchParams();
  const roleParam = searchParams?.get("role") || "";
  const [formStatus, setFormStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Map role query param to display name and form defaults
  const roleDisplayNames: { [key: string]: string } = {
    curriculum: "Curriculum Developer",
    coach: "Career Coach",
    product: "Product Manager",
    marketing: "Marketing Specialist",
    support: "Customer Support",
    sales: "Sales Representative",
    operations: "Operations Manager",
    "": "General Application",
  };

  const displayRole = roleDisplayNames[roleParam] || "General Application";
  const defaultRole = displayRole === "General Application" ? "" : displayRole;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setFormStatus(null);

    const formData = new FormData(event.currentTarget);

    // Ensure role is included even if not faculty/writer specific
    if (defaultRole) {
      formData.set("role", defaultRole);
    }

    try {
      const response = await fetch("/api/career/apply", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setFormStatus(
          result.message ||
            `${displayRole} application submitted successfully! We'll review your submission and get back to you within 3-5 business days.`,
        );
        event.currentTarget.reset();
        // Reset role to default if needed
        const roleInput = event.currentTarget.querySelector(
          'input[name="role"]',
        ) as HTMLInputElement;
        if (roleInput) roleInput.value = defaultRole;
      } else {
        setFormStatus(result.message || "Failed to submit application. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormStatus(
        "An error occurred while submitting your application. Please check your connection and try again.",
      );
    }

    setLoading(false);
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10 py-20 lg:py-32">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full opacity-30"
            animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-40 h-40 bg-white/5 rounded-lg opacity-20"
            animate={{ y: [0, 20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </div>
        <div className="mx-auto max-w-7xl px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium text-sm uppercase tracking-wide rounded-full backdrop-blur-sm"
            >
              <Briefcase className="w-4 h-4" />
              <span>Open Position</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
            >
              Apply for{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {displayRole}
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Join our mission to transform tech education. Submit your application to contribute to OsTutelage
              Academy's innovative programs and team.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Link
                href="#application-form"
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <Briefcase className="mr-2 w-5 h-5" />
                Start Application
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="application-form" className="py-20 lg:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{displayRole} Application</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Complete the form below. We'll review your application and respond within 3-5 business days.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
              {/* Hidden role field for backend processing */}
              {defaultRole && <input type="hidden" name="role" value={defaultRole} />}

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Full Name *
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-colors"
                  placeholder="John Doe"
                  aria-required="true"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-colors"
                    placeholder="john.doe@email.com"
                    aria-required="true"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-colors"
                    placeholder="+234 123 456 7890"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="role-display"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Position Applied For
                </label>
                <input
                  id="role-display"
                  type="text"
                  value={defaultRole || ""}
                  readOnly
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 cursor-not-allowed text-gray-500 dark:text-gray-400"
                  aria-readonly="true"
                />
              </div>

              <div>
                <label
                  htmlFor="experience"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Relevant Experience *
                </label>
                <textarea
                  id="experience"
                  name="experience"
                  rows={4}
                  required
                  placeholder={`Tell us about your experience relevant to the ${displayRole} role. Include key achievements, skills, and why you're interested in this position at OsTutelage Academy...`}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-colors resize-vertical"
                  aria-required="true"
                />
              </div>

              <div>
                <label
                  htmlFor="coverLetter"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Cover Letter (Optional)
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  rows={3}
                  placeholder="Share additional information about your background, motivation, or specific skills that make you a great fit..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-colors resize-vertical"
                />
              </div>

              <div>
                <label
                  htmlFor="resume"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Resume/CV *
                  <span className="text-xs text-gray-500 block mt-1">PDF, DOC, or DOCX (max 10MB)</span>
                </label>
                <div className="flex items-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-800 transition-colors">
                  <Upload className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  <input
                    id="resume"
                    type="file"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    required
                    className="flex-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-500 file:text-white hover:file:bg-emerald-600 transition-colors"
                    aria-required="true"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Please upload your resume highlighting relevant experience for the {displayRole} position
                </p>
              </div>

              {formStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl text-center text-sm ${
                    formStatus.includes("successfully") || formStatus.includes("received")
                      ? "bg-green-50 border border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800/50 dark:text-green-300"
                      : "bg-red-50 border border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800/50 dark:text-red-300"
                  }`}
                >
                  {formStatus}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting Application...
                  </>
                ) : (
                  <>
                    Submit {displayRole} Application
                    <Mail className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
              Questions about the {displayRole} position?{" "}
              <Link href="/contact" className="text-emerald-600 hover:underline font-medium">
                Contact our team
              </Link>
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

export default function CareerApply() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10">
          <div className="text-center">
            <div className="w-16 h-16 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading application form...</p>
          </div>
        </div>
      }
    >
      <CareerApplyContent />
    </Suspense>
  );
}