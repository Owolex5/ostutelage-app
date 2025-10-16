"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import featuresData from "./featuresData";
import SingleFeature from "./SingleFeature";
import SectionHeader from "../Common/SectionHeader";

const Feature = () => {
  // Animation variants for the section
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

  // Animation variants for individual feature cards
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const }, // Explicitly type ease as a literal
    },
    hover: {
      y: -5,
      scale: 1.02,
      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
      transition: { duration: 0.3, ease: "easeOut" as const }, // Explicitly type ease as a literal
    },
  };

  return (
    <section id="features" className="relative py-20 lg:py-25 xl:py-30 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent_50%),radial-gradient(circle_at_40%_40%,rgba(120,219,255,0.3),transparent_50%)]"></div>
      </div>

      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0 relative">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-12"
        >
          <motion.div
            variants={cardVariants}
            className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary font-medium text-sm uppercase tracking-wide rounded-full border border-primary/20"
          >
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span>Why Choose Us</span>
          </motion.div>
          <motion.h2
            variants={cardVariants}
            className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Why Learn with OsTutelage
          </motion.h2>
          <motion.p
            variants={cardVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            At OsTutelage, we empower you with expert-led training, hands-on projects, and flexible online learning to master tech skills and build your career.
          </motion.p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12.5 grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:mt-15 lg:grid-cols-3 xl:mt-20 xl:gap-12.5"
        >
          {featuresData.map((feature, index) => (
            <motion.div
              key={feature.id || index}
              variants={cardVariants}
              whileHover="hover"
              transition={{ delay: index * 0.1 }}
            >
              <SingleFeature feature={feature} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Feature;