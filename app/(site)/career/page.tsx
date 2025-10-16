// app/career/page.tsx
"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Users, BookOpen, Briefcase, GraduationCap, FileText } from "lucide-react";

export default function CareerPage() {
  const opportunities = [
    {
      id: "faculty",
      title: "Become a Faculty",
      description: "Join our team of expert instructors and shape the next generation of tech professionals through hands-on teaching in software engineering, data science, and more.",
      icon: <GraduationCap className="w-8 h-8 text-white" />,
      bg: "from-blue-500 to-blue-600",
      link: "/career/faculty",
      stats: "2+ years experience",
      linkText: "Learn More",
    },
    {
      id: "write",
      title: "Write for OsTutelage",
      description: "Contribute to our educational content, including blog posts, textbooks, and coding guides. Ideal for skilled writers with coding expertise.",
      icon: <FileText className="w-8 h-8 text-white" />,
      bg: "from-purple-500 to-purple-600",
      link: "/career/write",
      stats: "Freelance & Full-time",
      linkText: "Learn More",
    },
    {
      id: "curriculum",
      title: "Curriculum Developer",
      description: "Design and update our industry-aligned courses, incorporating real-world projects and emerging tech trends.",
      icon: <BookOpen className="w-8 h-8 text-white" />,
      bg: "from-green-500 to-green-600",
      link: "/career/apply?role=curriculum",
      stats: "Collaborative Role",
      linkText: "Apply for This Role",
    },
    {
      id: "coach",
      title: "Career Coach",
      description: "Guide students through job placement, resume building, and interview prep to launch their tech careers.",
      icon: <Briefcase className="w-8 h-8 text-white" />,
      bg: "from-orange-500 to-orange-600",
      link: "/career/apply?role=coach",
      stats: "Mentorship Focus",
      linkText: "Apply for This Role",
    },
    {
      id: "product",
      title: "Product Manager",
      description: "Drive the development of our learning platform, from features to user experience in edtech tools.",
      icon: <Users className="w-8 h-8 text-white" />,
      bg: "from-pink-500 to-pink-600",
      link: "/career/apply?role=product",
      stats: "Strategic Impact",
      linkText: "Apply for This Role",
    },
    {
      id: "marketing",
      title: "Marketing Specialist",
      description: "Promote our programs through digital campaigns, content strategy, and partnerships to reach aspiring tech learners.",
      icon: <ArrowRight className="w-8 h-8 text-white" />,
      bg: "from-indigo-500 to-indigo-600",
      link: "/career/apply?role=marketing",
      stats: "Creative Outreach",
      linkText: "Apply for This Role",
    },
  ];

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
              <span>Join Our Mission</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              Shape the Future of{" "}
              <span className="relative inline-block">
                Tech Education
                <span className="absolute -bottom-2 left-0 w-full h-2 bg-gradient-to-r from-white/30 to-transparent rounded-full -z-10"></span>
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              At OsTutelage Academy, we're building a world-class team to empower the next generation of tech leaders. Explore exciting opportunities to teach, create content, and innovate in edtech.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="#opportunities"
                className="group inline-flex items-center justify-center px-8 py-4 bg-white text-primary rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
              >
                <Users className="mr-2 w-5 h-5" />
                Explore Opportunities
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                href="/career/apply"
                className="group inline-flex items-center justify-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-semibold text-lg hover:bg-white/30 transition-all duration-300 w-full sm:w-auto"
              >
                <Briefcase className="mr-2 w-5 h-5" />
                Apply Now
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Opportunities Section */}
      <section id="opportunities" className="py-20 lg:py-24 bg-gray-50 dark:bg-gray-900/20">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
              <Users className="w-4 h-4" />
              <span>Career Opportunities</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Join Our Growing Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From inspiring the next wave of developers to crafting innovative curricula, your expertise can make a real impact at OsTutelage. We're a mission-driven edtech startup committed to practical, career-focused education.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {opportunities.map((opportunity, index) => (
              <motion.div
                key={opportunity.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
              >
                <Link href={opportunity.link} className="block">
                  <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                    <div className={`relative h-48 overflow-hidden`}>
                      <div className={`w-full h-full bg-gradient-to-br ${opportunity.bg} flex items-center justify-center`}>
                        {opportunity.icon}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-300">
                        {opportunity.title}
                      </h3>
                      <p className="mb-4 text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                        {opportunity.description}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                          {opportunity.stats}
                        </span>
                        <div className="group/link inline-flex items-center gap-1 text-primary font-medium hover:text-primary/80 transition-colors duration-300">
                          {opportunity.linkText}
                          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
              Ready to Build the Future with Us?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Whether you're an industry veteran or an emerging talent, OsTutelage offers a collaborative environment to grow your career while transforming lives through education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/career/apply"
                className="group inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto"
              >
                <Briefcase className="mr-2 w-5 h-5" />
                Apply Today
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-primary rounded-xl font-semibold text-lg hover:bg-primary hover:text-white transition-all duration-300 w-full sm:w-auto"
              >
                <FileText className="mr-2 w-5 h-5" />
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}