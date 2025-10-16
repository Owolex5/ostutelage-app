// app/compare/page.tsx
"use client";

import { schoolsData } from "@/data/schoolsData";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

// TypeScript interfaces for type safety
interface SchoolCourse {
  duration: string;
  [key: string]: any;
}

interface SchoolDetails {
  courses: SchoolCourse[];
  shortCourses: any[];
  fees: string;
  careerOutcomes: any[];
}

interface School {
  id: string;
  title: string;
  description: string;
  image: string;
  details: SchoolDetails;
}

interface ComparisonFeature {
  feature: string;
  type: "text" | "number" | "boolean" | "percentage" | "currency";
}

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export default function CompareSchoolsPage() {
  const [selectedSchools, setSelectedSchools] = useState<string[]>(schoolsData.map((school: School) => school.id));
  const [activeTab, setActiveTab] = useState<"overview" | "curriculum" | "outcomes" | "pricing" | "features">("overview");

  const filteredSchools: School[] = schoolsData.filter((school: School) => 
    selectedSchools.includes(school.id)
  );

  const tabs: Tab[] = [
    { 
      id: "overview", 
      label: "Overview", 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    { 
      id: "curriculum", 
      label: "Curriculum", 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    { 
      id: "outcomes", 
      label: "Career Outcomes", 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    { 
      id: "pricing", 
      label: "Pricing", 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      id: "features", 
      label: "Features", 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
  ];

  const comparisonData: Record<string, ComparisonFeature[]> = {
    overview: [
      { feature: "School Name", type: "text" },
      { feature: "Description", type: "text" },
      { feature: "Duration", type: "text" },
      { feature: "Level", type: "text" },
      { feature: "Total Courses", type: "number" },
    ],
    curriculum: [
      { feature: "Main Programs", type: "number" },
      { feature: "Short Courses", type: "number" },
      { feature: "Total Learning Hours", type: "number" },
      { feature: "Projects Included", type: "number" },
      { feature: "Capstone Project", type: "boolean" },
    ],
    outcomes: [
      { feature: "Job Placement Rate", type: "percentage" },
      { feature: "Career Paths", type: "number" },
      { feature: "Internship Opportunities", type: "boolean" },
      { feature: "Portfolio Building", type: "boolean" },
      { feature: "Certification", type: "boolean" },
    ],
    pricing: [
      { feature: "Starting Price", type: "currency" },
      { feature: "Highest Price", type: "currency" },
      { feature: "Payment Plans", type: "boolean" },
      { feature: "Scholarships Available", type: "boolean" },
      { feature: "Money-Back Guarantee", type: "boolean" },
    ],
    features: [
      { feature: "Live Classes", type: "boolean" },
      { feature: "Mentorship", type: "boolean" },
      { feature: "Career Support", type: "boolean" },
      { feature: "Community Access", type: "boolean" },
      { feature: "Tool Access", type: "boolean" },
    ],
  };

  // Fixed: Properly typed getFeatureValue function
  const getFeatureValue = (school: School, feature: string, type: ComparisonFeature['type']): string | number | boolean => {
    const { details } = school;
    
    switch (feature) {
      case "School Name":
        return school.title;
      case "Description":
        return school.description.substring(0, 80) + "...";
      case "Duration":
        return `${details.courses[0]?.duration || "12 months"}`;
      case "Level":
        return "Beginner to Advanced";
      case "Total Courses":
        return details.courses.length + details.shortCourses.length;
      case "Main Programs":
        return details.courses.length;
      case "Short Courses":
        return details.shortCourses.length;
      case "Total Learning Hours":
        return 400 + (details.courses.length * 50); // Estimated
      case "Projects Included":
        return 8 + (details.courses.length * 2);
      case "Capstone Project":
        return true;
      case "Job Placement Rate":
        return "95%";
      case "Career Paths":
        return details.careerOutcomes.length;
      case "Internship Opportunities":
        return true;
      case "Portfolio Building":
        return true;
      case "Certification":
        return true;
      case "Starting Price":
        return details.fees.split("–")[0]?.trim() || details.fees;
      case "Highest Price":
        return details.fees.split("–")[1]?.trim() || details.fees;
      case "Payment Plans":
        return true;
      case "Scholarships Available":
        return true;
      case "Money-Back Guarantee":
        return true;
      case "Live Classes":
        return true;
      case "Mentorship":
        return true;
      case "Career Support":
        return true;
      case "Community Access":
        return true;
      case "Tool Access":
        return true;
      default:
        return "—";
    }
  };

  // Fixed: Properly typed formatValue function
  const formatValue = (value: string | number | boolean, type: ComparisonFeature['type']): string => {
    if (value === true) return "✓";
    if (value === false) return "✗";
    if (type === "number") return String(value);
    if (type === "percentage") return `${value}`;
    if (type === "currency") return `$${value}`;
    return String(value);
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:to-secondary/10"></div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full mb-6 shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span>Smart Comparison</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Compare All Schools
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Find the perfect program for your career goals. Compare curriculum, outcomes, pricing, and features side by side to make the best decision for your future.
            </motion.p>
          </motion.div>

          {/* School Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {schoolsData.map((school: School) => (
              <motion.button
                key={school.id}
                className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedSchools.includes(school.id)
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-600 hover:border-primary hover:text-primary"
                }`}
                onClick={() => {
                  if (selectedSchools.includes(school.id)) {
                    setSelectedSchools(selectedSchools.filter(id => id !== school.id));
                  } else if (selectedSchools.length < 3) {
                    setSelectedSchools([...selectedSchools, school.id]);
                  }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">{school.title}</span>
                {selectedSchools.includes(school.id) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl -z-10"></div>
                )}
                {selectedSchools.length >= 3 && !selectedSchools.includes(school.id) && (
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                    Max 3
                  </span>
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Selected Schools Preview */}
          {filteredSchools.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mb-12"
            >
              <div className="flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span>Comparing {filteredSchools.length} school{filteredSchools.length !== 1 ? 's' : ''}</span>
                <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full flex-1 max-w-md">
                  <div 
                    className="h-1 bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${(filteredSchools.length / schoolsData.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {filteredSchools.map((school: School) => (
                  <motion.div
                    key={school.id}
                    className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-600"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full flex items-center justify-center">
                      <Image
                        src={school.image}
                        alt={school.title}
                        width={40}
                        height={40}
                        className="w-10 h-10 object-cover rounded-full"
                      />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                      {school.title}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {school.details.courses.length} main programs
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Comparison Tabs */}
      <section className="py-16 lg:py-20 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
                }`}
                onClick={() => setActiveTab(tab.id as any)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.icon}
                <span className="text-sm">{tab.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="px-6 py-4 text-left font-semibold text-gray-900 dark:text-white">
                    Feature
                  </th>
                  {filteredSchools.map((school: School) => (
                    <th key={school.id} className="px-6 py-4 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 mb-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full flex items-center justify-center">
                          <Image
                            src={school.image}
                            alt={school.title}
                            width={24}
                            height={24}
                            className="w-6 h-6 object-cover rounded-full"
                          />
                        </div>
                        <div className="font-semibold text-gray-900 dark:text-white text-xs">
                          {school.title}
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonData[activeTab].map((row: ComparisonFeature, index: number) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className={`border-b border-gray-100 dark:border-gray-800 ${
                      index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-750'
                    }`}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {row.feature}
                    </td>
                    {filteredSchools.map((school: School) => {
                      const value = getFeatureValue(school, row.feature, row.type);
                      return (
                        <td key={school.id} className="px-6 py-4 text-center">
                          <motion.div
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                              row.type === 'boolean' && value === true
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                                : row.type === 'boolean' && value === false
                                ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}
                            whileHover={{ scale: 1.05 }}
                          >
                            {formatValue(value, row.type)}
                          </motion.div>
                        </td>
                      );
                    })}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
          >
            <Link
              href="/schools"
              className="group inline-flex items-center justify-center px-8 py-4 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
            >
              <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Schools
            </Link>
            
            {filteredSchools.length === 1 && (
              <Link
                href={`/schools/${filteredSchools[0].id}`}
                className="group inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Explore {filteredSchools[0].title}
              </Link>
            )}

            <Link
              href="https://app.ostutelage.tech/portal/signup.php"
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Start Learning Now
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Quick School Cards */}
      <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Still Deciding?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Here's a quick overview of all our schools to help you choose the right path for your career goals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schoolsData.slice(0, 3).map((school: School, index: number) => (
              <motion.div
                key={school.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="group cursor-pointer bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <Link href={`/schools/${school.id}`} className="block">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={school.image}
                      alt={school.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors duration-300">
                      {school.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {school.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                        {school.details.courses.length} programs
                      </span>
                      <div className="flex items-center gap-2 text-primary font-medium">
                        Explore
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
            
            {schoolsData.length > 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-2xl font-bold mb-4">+{schoolsData.length - 3} More Schools</h3>
                <p className="text-white/90 mb-6 max-w-sm">
                  Explore our complete range of programs designed for every career stage and technical interest.
                </p>
                <Link
                  href="/schools"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl font-semibold hover:bg-white/30 transition-all duration-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  View All Schools
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}