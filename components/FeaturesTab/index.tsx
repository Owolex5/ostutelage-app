"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { schoolsData, School } from "@/data/schoolsData";
import Image from "next/image";
import Link from "next/link";

const FeaturesTab = () => {
  const [currentTab, setCurrentTab] = useState(schoolsData[0].id);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const activeSchool: School | undefined = schoolsData.find((school) => school.id === currentTab);

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  const tabVariants: Variants = {
    active: {
      scale: 1.05,
      y: -2,
      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
      transition: { duration: 0.3, ease: "easeOut" as const },
    },
    inactive: {
      scale: 1,
      y: 0,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3, ease: "easeOut" as const },
    },
  };

  if (!activeSchool) return null;

  return (
    <section className="relative pb-20 pt-18.5 lg:pb-22.5 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent_50%),radial-gradient(circle_at_40%_40%,rgba(120,219,255,0.3),transparent_50%)]"></div>
      </div>

      <div className="relative mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-12"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary font-medium text-sm uppercase tracking-wide rounded-full border border-primary/20"
          >
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span>Explore Our Schools</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl lg:text-4xl font-bold text-black dark:text-white mb-4"
          >
            Discover Your Perfect Program
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Each school offers specialized training with hands-on projects, expert mentorship, and career support. Find the path that aligns with your goals and start building your future today.
          </motion.p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {schoolsData.map((school, index) => (
              <motion.button
                key={school.id}
                variants={tabVariants}
                animate={currentTab === school.id ? "active" : "inactive"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onHoverStart={() => setHoveredTab(school.id)}
                onHoverEnd={() => setHoveredTab(null)}
                onClick={() => setCurrentTab(school.id)}
                className={`relative group px-6 py-3 rounded-xl font-medium transition-all duration-300 overflow-hidden ${
                  currentTab === school.id
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                    : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:text-primary dark:hover:text-primary"
                }`}
              >
                {/* Active Indicator */}
                {currentTab === school.id && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl -z-10"
                    transition={{ duration: 0.3 }}
                  />
                )}

                {/* Badge for hovered state */}
                {hoveredTab === school.id && currentTab !== school.id && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-primary/20 text-primary rounded-full text-xs flex items-center justify-center"
                  >
                    {index + 1}
                  </motion.div>
                )}

                <span className="relative z-10 flex items-center gap-2">
                  {/* School Icon */}
                  <div
                    className={`w-3 h-3 rounded-full ${
                      currentTab === school.id ? "bg-white" : "bg-primary"
                    }`}
                  ></div>
                  <span className="text-sm">{school.title}</span>
                </span>
              </motion.button>
            ))}
          </div>

          {/* Tab Counter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center text-sm text-gray-500 dark:text-gray-400"
          >
            Showing {schoolsData.find((s) => s.id === currentTab)?.title} • {schoolsData.length} total programs available
          </motion.div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, x: currentTab === schoolsData[0].id ? 0 : 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeInOut" as const }}
            className="relative"
          >
            {/* Content Container */}
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center rounded-3xl overflow-hidden shadow-2xl ${
                currentTab === "software-engineering-frontend-php-laravel"
                  ? "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10"
                  : currentTab === "data-science"
                  ? "bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10"
                  : currentTab === "cybersecurity"
                  ? "bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10"
                  : currentTab === "design"
                  ? "bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/10 dark:to-rose-900/10"
                  : "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700"
              }`}
            >
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="p-8 lg:p-12 flex flex-col justify-center"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-6"
                >
                  {/* School Badge */}
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 max-w-max">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>{activeSchool.details.level}</span>
                  </div>

                  {/* Title */}
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight"
                  >
                    {activeSchool.title}
                  </motion.h3>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                  >
                    {activeSchool.description}
                  </motion.p>

                  {/* Quick Stats */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex flex-wrap gap-6 justify-center lg:justify-start"
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {activeSchool.details.courses.length}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Main Programs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {activeSchool.details.tools.length}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Industry Tools</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {activeSchool.details.careerOutcomes.length}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Career Paths</div>
                    </div>
                  </motion.div>

                  {/* CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <Link
                      href={`/schools/${activeSchool.id}`}
                      className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                      <span>Explore Program</span>
                      <svg
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
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
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Right Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative h-[500px] lg:h-[600px]"
              >
                <div className="absolute inset-0 rounded-b-3xl lg:rounded-l-3xl overflow-hidden">
                  <Image
                    src={activeSchool.image}
                    alt={activeSchool.title}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-1000"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />

                  {/* Image Overlay Elements */}
                  <div className="absolute top-8 right-8 w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>

                  <div className="absolute bottom-8 left-8 bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Industry Recognized
                  </div>

                  {/* Floating Stats */}
                  <motion.div
                    className="absolute top-1/2 right-8 transform -translate-y-1/2 bg-white/90 dark:bg-black/70 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-white/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">95%</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">Success Rate</div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Enhanced Scroll Indicator with Compare Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-16 flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8"
            >
              {/* Left Side - Scroll Indicator */}
              <div className="text-center text-sm text-gray-500 dark:text-gray-400 flex items-center gap-3">
                <span>More schools to explore</span>
                <div className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center relative">
                  <motion.div
                    className="w-1 h-3 bg-gray-300 dark:bg-gray-600 rounded-full mt-2 absolute"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
              </div>

              {/* Right Side - Navigation Links */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                {/* View All Programs */}
                <Link
                  href="/schools"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-600 rounded-xl font-medium hover:border-primary hover:text-primary dark:hover:text-primary transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <svg
                    className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span className="hidden sm:inline">View All Programs</span>
                  <span className="sm:hidden">All Schools</span>
                </Link>

                {/* Compare Schools - New Link */}
                <Link
                  href="/compare"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-secondary/10 to-primary/10 text-primary border-2 border-primary/20 dark:border-primary/30 rounded-xl font-medium hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2M8 7v6M12 7v6M16 7v6"
                    />
                  </svg>
                  <span className="hidden sm:inline">Compare Schools</span>
                  <span className="sm:hidden">Compare</span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FeaturesTab;