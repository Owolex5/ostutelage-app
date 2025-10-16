"use client";
import { motion } from "framer-motion";
import { schoolsData, School } from "@/data/schoolsData";
import Link from "next/link";
import { GraduationCap, Database, Code2, Palette, Briefcase } from "lucide-react";
import { ReactElement } from "react"; // Import ReactElement explicitly

// Derive SchoolId type from schoolsData
type SchoolId = typeof schoolsData[number]["id"];

// Map school IDs to Lucide icons
const schoolIcons: Record<SchoolId, ReactElement> = {
  "software-engineering-frontend-php-laravel": <Code2 className="w-6 h-6 text-white" />,
  "data-science": <Database className="w-6 h-6 text-white" />,
  cybersecurity: <GraduationCap className="w-6 h-6 text-white" />,
  design: <Palette className="w-6 h-6 text-white" />,
  "digital-skills": <Briefcase className="w-6 h-6 text-white" />,
};

// Map school IDs to background gradients
const schoolBackgrounds: Record<SchoolId, string> = {
  "software-engineering-frontend-php-laravel": "from-purple-500 to-purple-600",
  "data-science": "from-green-500 to-green-600",
  cybersecurity: "from-blue-500 to-blue-600",
  design: "from-pink-500 to-pink-600",
  "digital-skills": "from-teal-500 to-teal-600",
};

const Schools = () => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
    hover: {
      y: -5,
      scale: 1.02,
      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
      transition: { duration: 0.3, ease: "easeOut" as const },
    },
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Explore Our Schools
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Choose your path and gain the skills you need to thrive in tech.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {schoolsData.map((school, index) => (
            <motion.div
              key={school.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/schools/${school.id}`} className="block">
                <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                  <div
                    className={`w-14 h-14 mb-4 bg-gradient-to-br ${schoolBackgrounds[school.id] || "from-gray-500 to-gray-600"} rounded-xl flex items-center justify-center`}
                  >
                    {schoolIcons[school.id] || <GraduationCap className="w-6 h-6 text-white" />}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                    {school.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                    {school.description}
                  </p>
                  {/* CTA Indicator */}
                  <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Learn More
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schools;