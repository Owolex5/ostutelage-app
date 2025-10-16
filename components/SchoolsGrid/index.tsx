// components/SchoolsGrid.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const schoolsData = [
  {
    id: "software-engineering",
    title: "Software Engineering School",
    subtitle: "Build & Deploy Full-Stack Applications",
    description: "Master modern web development with JavaScript, React, Node.js, and cloud deployment. Create production-ready applications from scratch.",
    duration: "6 months",
    level: "Beginner to Advanced",
    price: "$2,400",
    features: ["Full-Stack Development", "Cloud Deployment", "API Design", "Database Management"],
    color: "from-blue-500 to-cyan-500",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    image: "/images/schools/software-engineering.jpg",
    stats: { projects: 12, hours: 480, mentors: 8 },
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design School",
    subtitle: "Create User-Centered Digital Experiences",
    description: "Learn design thinking, user research, and modern UI/UX principles. Build beautiful, accessible interfaces that solve real user problems.",
    duration: "4 months",
    level: "Beginner to Intermediate",
    price: "$1,800",
    features: ["Figma Mastery", "User Research", "Prototyping", "Design Systems"],
    color: "from-pink-500 to-rose-500",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
      </svg>
    ),
    image: "/images/schools/ui-ux-design.jpg",
    stats: { projects: 8, hours: 320, mentors: 6 },
  },
  {
    id: "data-science",
    title: "Data Science School",
    subtitle: "Unlock Insights from Data",
    description: "Transform raw data into actionable insights with Python, machine learning, and data visualization. Solve complex business problems with data.",
    duration: "6 months",
    level: "Beginner to Advanced",
    price: "$2,600",
    features: ["Python & R", "Machine Learning", "Data Visualization", "Big Data"],
    color: "from-purple-500 to-indigo-500",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    image: "/images/schools/data-science.jpg",
    stats: { projects: 15, hours: 500, mentors: 10 },
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity School",
    subtitle: "Protect Digital Assets",
    description: "Learn to defend against cyber threats with ethical hacking, network security, and incident response. Become a cybersecurity professional.",
    duration: "5 months",
    level: "Intermediate to Advanced",
    price: "$2,200",
    features: ["Ethical Hacking", "Network Security", "Incident Response", "Cloud Security"],
    color: "from-red-500 to-orange-500",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    image: "/images/schools/cybersecurity.jpg",
    stats: { projects: 10, hours: 400, mentors: 7 },
  },
];

const SchoolsGrid = () => {
  return (
    <div id="schools" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
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
          <Link href={`/schools/${school.id}`} className="block">
            <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={school.image}
                  alt={school.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                {/* School Icon */}
                <motion.div
                  className="absolute top-6 left-6 bg-white/90 dark:bg-black/70 backdrop-blur-sm rounded-2xl p-3 shadow-lg"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${school.color} flex items-center justify-center`}>
                    {school.icon}
                  </div>
                </motion.div>
              </div>

              {/* Content Section */}
              <div className="p-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                    {school.duration}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium rounded-full">
                    {school.level}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors duration-300">
                  {school.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {school.subtitle}
                </p>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-6">
                    {Object.entries(school.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">{value}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-2xl font-bold text-primary">
                    {school.price}
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {school.features.slice(0, 3).map((feature, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </span>
                  ))}
                  {school.features.length > 3 && (
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs rounded-full">
                      +{school.features.length - 3} more
                    </span>
                  )}
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {school.description.length > 100 ? `${school.description.substring(0, 100)}...` : school.description}
                  </span>
                  <Link
                    href={`/schools/${school.id}`}
                    className="group inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors duration-300"
                  >
                    Learn More
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default SchoolsGrid;