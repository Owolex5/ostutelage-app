"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative overflow-hidden  py-20 md:py-28 xl:py-32">
      <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12 xl:gap-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 space-y-8"
          >
            {/* Badge */}
         <div className="inline-flex items-center gap-3 px-4 py-2 mt-4 bg-gradient-to-r from-blue-100/60 to-indigo-100/60 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-full border border-blue-200/50 dark:border-blue-800/50">
  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
  <span className="text-sm font-semibold text-blue-800 dark:text-blue-200">
    🎓 OsTutelage Academy
  </span>
</div>


            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-gray-100 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Master In-Demand Skills in{" "}
              <span className="relative text-blue-600 dark:text-blue-400">
                4–6 Months
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-500/40 to-purple-500/40 rounded-full"></span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 max-w-2xl">
              Join our specialized{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                Schools of Excellence
              </span>{" "}
              and transform your career with hands-on programs. Learn from
              industry experts and build real-world projects that get you hired.
            </p>

            {/* CTA */}
            <div>
              <Link
                href="https://app.ostutelage.tech/portal/signup.php"
                className="inline-block rounded-full bg-black px-8 py-3 text-lg font-medium text-white shadow-lg duration-300 hover:bg-gray-800 dark:bg-btndark dark:hover:bg-blackho"
              >
                Enroll Now
              </Link>
            </div>

            {/* Quote */}
            <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400 max-w-xl italic bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4">
              "From zero to job-ready in 4–6 months. Join 500+ students who've
              landed roles at top tech companies."
            </p>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full lg:w-1/2 mt-10 lg:mt-0 flex justify-center"
          >
            <div className="relative w-full max-w-lg">
              <Image
                className="shadow-solid-l dark:hidden"
                src="/images/hero/hero-light.svg"
                alt="Hero illustration"
                width={600}
                height={400}
              />
              <Image
                className="hidden shadow-solid-l dark:block"
                src="/images/hero/hero-dark.svg"
                alt="Hero illustration dark"
                width={600}
                height={400}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
