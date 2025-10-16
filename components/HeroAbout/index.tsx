// components/HeroAbout.tsx
"use client";

import React from 'react';
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";

const HeroAbout = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#F8F9FF] via-[#E8F0FF] to-[#DEE7FF] dark:from-[#1a1a2e] dark:via-[#16213e] dark:to-[#0f3460] py-16 lg:py-24">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Geometric Shapes */}
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full opacity-30"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-32 h-32 bg-secondary/10 rounded-lg opacity-20"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary/5 rounded-full opacity-50"
          animate={{
            scale: [1, 1.2, 1],
            x: [-10, 10, -10],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 relative z-10" ref={scrollRef}>
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-primary/10 dark:bg-primary/20 rounded-full text-primary font-medium text-sm uppercase tracking-wide"
            >
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span>Our Story</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-6 leading-tight"
            >
              About{" "}
              <span className="relative inline-block">
                OsTutelage
                <span className="absolute -bottom-2 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary rounded-full -z-10 opacity-80"></span>
              </span>{" "}
              Academy
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl leading-relaxed"
            >
              We are more than a tech school. OsTutelage is a community where
              learners transform into innovators, gaining practical skills in
              Software Engineering, UI/UX, Data Science, and more to shape
              Africa's digital future.
            </motion.p>

            {/* Learning Philosophy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white/60 dark:bg-black/40 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20 dark:border-black/20"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-xl">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Our Learning Philosophy
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                Our learning philosophy is simple: education must be <strong>relevant, practical, and functionally empowering</strong> to achieve desired outcomes. Since 2021, we have remained committed to ensuring every program and learner interaction is <strong>intentional, inclusive, and impactful</strong>.
              </p>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-8 mb-12 justify-center lg:justify-start"
            >
              <div className="text-center lg:text-left">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                  5,000+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Students Trained
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                  4-6
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Month Programs
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                  95%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Job Placement
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <Link
                href="/schools"
                className="group inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto"
                prefetch={false}
              >
                <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Explore Schools
                <svg
                  className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
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
                className="group inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-primary rounded-xl font-semibold text-lg hover:bg-primary hover:text-white transition-all duration-300 w-full sm:w-auto"
                prefetch={false}
              >
                <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Enroll Now
                <svg
                  className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </Link>
            </motion.div>

            {/* Final Call to Action */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-center lg:text-left text-sm text-gray-600 dark:text-gray-400 italic mb-8"
            >
              Take that step; enroll today to see the value you'll gain!
            </motion.p>
          </motion.div>

          {/* Right Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 relative"
          >
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 rounded-3xl -z-10"></div>

            {/* Main Image Container */}
            <div className="relative w-full h-[300px] lg:h-[400px] mx-auto">
              <Image
                src="/images/about/about-l.jfif"
                alt="OsTutelage students collaborating"
                fill
                className="object-cover rounded-3xl shadow-2xl"
                sizes="(max-width: 768px) 100vw, 640px"
              />
              {/* Dark mode image */}
              <Image
                src="/images/about/about-dark.jpeg"
                alt="OsTutelage students collaborating dark"
                fill
                className="hidden dark:block object-cover rounded-3xl shadow-2xl"
                sizes="(max-width: 768px) 100vw, 640px"
              />
              {/* Animated Overlay Elements */}
              <motion.div
                className="absolute top-2 right-2 w-16 h-16 bg-white/80 dark:bg-black/60 rounded-2xl shadow-lg flex items-center justify-center"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </motion.div>
              <motion.div
                className="absolute bottom-2 left-2 w-14 h-14 border-2 border-primary/30 rounded-full flex items-center justify-center bg-white/80 dark:bg-black/60"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </motion.div>
              {/* Learning Highlights Badges */}
              <motion.div
                className="absolute top-2 left-2 bg-gradient-to-r from-primary to-secondary text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg flex items-center gap-1"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                Learn Anywhere
              </motion.div>
              <motion.div
                className="absolute bottom-8 right-2 bg-white/90 dark:bg-black/70 backdrop-blur-sm text-primary text-xs font-semibold px-2 py-1 rounded-lg shadow-lg border border-primary/20 flex items-center gap-1"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                95% Success
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator - Simplified */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 text-center cursor-pointer group"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            window.scrollBy({ top: window.innerHeight / 2, behavior: "smooth" });
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              window.scrollBy({ top: window.innerHeight / 2, behavior: "smooth" });
            }
          }}
          tabIndex={0}
          role="button"
          aria-label="Scroll down half a page"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors duration-300">
            <span className="text-sm font-medium">What are you learning today?</span>
            <div className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 group-hover:border-primary rounded-full flex justify-center relative overflow-hidden">
              <motion.div
                className="w-1 h-3 bg-gray-300 dark:bg-gray-600 group-hover:bg-primary rounded-full mt-2 absolute"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <svg
                className="absolute bottom-1 w-3 h-3 text-gray-400 group-hover:text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Learning Benefits Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          style={{ y }}
          className="mt-12 text-center px-4"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Learn the Profitable Way</h4>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm max-w-3xl mx-auto leading-relaxed">
            We offer various courses that will equip you with the knowledge and skills you need to{" "}
            <span className="font-semibold text-primary">start, switch, or boost your career</span>. 
            We've made the learning process super easy with live classes, functional curriculums, 
            expert tutors, and peer-to-peer training sessions. Learn from the best, anywhere you are.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroAbout;