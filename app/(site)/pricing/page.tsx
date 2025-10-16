// app/pricing/page.tsx
"use client";
import { schoolsData } from "@/data/schoolsData";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function PricingPage() {
  // State to manage which school's modal is open
  const [modalSchool, setModalSchool] = useState<string | null>(null);
  // State to manage active tab in modal (Main Courses or Short Courses)
  const [activeTab, setActiveTab] = useState<"main" | "short">("main");

  // Function to open/close modal
  const toggleModal = (schoolId: string | null) => {
    setModalSchool(schoolId);
    setActiveTab("main"); // Reset to main courses when opening modal
  };

  // Function to format fees (remove "depending on course")
  const formatFees = (fees: string) => {
    return fees.replace(" depending on course", "");
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-secondary dark:from-primary dark:to-secondary py-20 lg:py-32">
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
        <div className="mx-auto max-w-7xl px-4 relative z-10 text-center text-white">
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
              className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium text-sm uppercase tracking-wide border border-white/30"
            >
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span>Transparent Pricing</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              Explore Our Program Fees
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Find the perfect course for your career goals with clear, upfront pricing. Choose a program and start your journey with OsTutelage Academy today.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Link
                href="https://app.ostutelage.tech/portal/signup.php"
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Get Started Now
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 lg:py-24 bg-gray-50/50 dark:bg-gray-900/20">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Program Pricing
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Choose Your Learning Path
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explore our schools and their courses, with transparent pricing for both main and short programs. Select a school to view details and apply.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {schoolsData.map((school, index) => (
              <motion.div
                key={school.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700">
                  {/* School Header */}
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-300">
                      {school.title}
                    </h2>
                    <p className="mb-4 text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                      {school.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                        {formatFees(school.details.fees)}
                      </span>
                      <Link
                        href="https://app.ostutelage.tech/portal/signup.php"
                        className="group/link inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                      >
                        Apply Now
                        <svg
                          className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>

                  {/* Show Courses Button */}
                  <button
                    onClick={() => toggleModal(school.id)}
                    className="w-full px-6 py-3 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary dark:text-white font-semibold text-sm flex items-center justify-between hover:bg-primary/20 transition-all duration-300"
                  >
                    <span>View Courses & Fees</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for Course Details */}
      <AnimatePresence>
        {modalSchool && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => toggleModal(null)}
            />
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-4xl w-full max-h-[80vh] bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-2xl z-50 overflow-y-auto p-6"
            >
              {schoolsData.find((school) => school.id === modalSchool) && (
                <div>
                  {/* Modal Header */}
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {schoolsData.find((school) => school.id === modalSchool)!.title}
                    </h2>
                    <button
                      onClick={() => toggleModal(null)}
                      className="text-gray-500 dark:text-gray-300 hover:text-primary transition-colors duration-300"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Tabs */}
                  <div className="flex gap-4 mb-6 border-b border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => setActiveTab("main")}
                      className={`px-4 py-2 font-semibold text-sm transition-colors duration-300 ${
                        activeTab === "main"
                          ? "text-primary border-b-2 border-primary"
                          : "text-gray-600 dark:text-gray-300 hover:text-primary"
                      }`}
                    >
                      Main Courses
                    </button>
                    <button
                      onClick={() => setActiveTab("short")}
                      className={`px-4 py-2 font-semibold text-sm transition-colors duration-300 ${
                        activeTab === "short"
                          ? "text-primary border-b-2 border-primary"
                          : "text-gray-600 dark:text-gray-300 hover:text-primary"
                      }`}
                    >
                      Short Courses
                    </button>
                  </div>

                  {/* Tab Content */}
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeTab === "main" && (
                      <div>
                        {schoolsData
                          .find((school) => school.id === modalSchool)!
                          .details.courses.length > 0 ? (
                          schoolsData
                            .find((school) => school.id === modalSchool)!
                            .details.courses.map((course, idx) => (
                              <div
                                key={idx}
                                className="mb-4 p-4 bg-gray-50/50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-700"
                              >
                                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                  {course.name}
                                </h4>
                                <p className="text-xs text-gray-600 dark:text-gray-300">
                                  Duration: {course.duration}
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-300">
                                  Outcome: {course.outcome}
                                </p>
                                <p className="text-sm font-semibold text-primary mt-2">
                                  Fee: {course.fee}
                                </p>
                              </div>
                            ))
                        ) : (
                          <p className="text-gray-600 dark:text-gray-300 text-sm">
                            No main courses available.
                          </p>
                        )}
                      </div>
                    )}
                    {activeTab === "short" && (
                      <div>
                        {schoolsData
                          .find((school) => school.id === modalSchool)!
                          .details.shortCourses.length > 0 ? (
                          schoolsData
                            .find((school) => school.id === modalSchool)!
                            .details.shortCourses.map((course, idx) => (
                              <div
                                key={idx}
                                className="mb-4 p-4 bg-gray-50/50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-700"
                              >
                                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                  {course.name}
                                </h4>
                                <p className="text-xs text-gray-600 dark:text-gray-300">
                                  Duration: {course.duration}
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-300">
                                  Outcome: {course.outcome}
                                </p>
                                <p className="text-sm font-semibold text-primary mt-2">
                                  Fee: {course.fee}
                                </p>
                              </div>
                            ))
                        ) : (
                          <p className="text-gray-600 dark:text-gray-300 text-sm">
                            No short courses available.
                          </p>
                        )}
                      </div>
                    )}
                  </motion.div>

                  {/* Modal Footer */}
                  <div className="mt-6 flex justify-end gap-4">
                    <Link
                      href={`/schools/${modalSchool}`}
                      className="group inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold text-sm hover:bg-primary hover:text-white transition-all duration-300"
                    >
                      View School
                      <svg
                        className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                    <Link
                      href="https://app.ostutelage.tech/portal/signup.php"
                      className="group inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                    >
                      Apply Now
                      <svg
                        className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-20 lg:py-24 bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Start Your Learning Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Select a program that fits your goals and join thousands of students transforming their careers with OsTutelage Academy.
            </p>
            <Link
              href="https://app.ostutelage.tech/portal/signup.php"
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Enroll Now
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}