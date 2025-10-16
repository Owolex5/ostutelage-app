"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Reusable motion variant
const fadeInUp = {
  hidden: { opacity: 0, y: -20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay },
  }),
};

// Stats data
const stats = [
  { id: 1, value: "50+", label: "Worldwide Clients", delay: 0.5 },
  { id: 2, value: "100", label: "Projects Completed", delay: 0.7 },
  { id: 3, value: "165", label: "Projects Supervised", delay: 0.9 },
];

const FunFact = () => {
  return (
    <section className="relative px-4 py-20 md:px-8 lg:py-22.5 2xl:px-0">
      <div className="relative z-10 mx-auto max-w-c-1390 rounded-lg bg-gradient-to-t from-[#F8F9FF] to-[#DEE7FF] py-22.5 dark:bg-blacksection dark:from-transparent dark:to-transparent xl:py-27.5">
        {/* Background shapes */}
        <Image
          width={335}
          height={384}
          src="/images/shape/shape-04.png"
          alt="Decorative shape"
          className="absolute -left-15 -top-25 -z-10 lg:left-0"
        />
        <Image
          width={132}
          height={132}
          src="/images/shape/shape-05.png"
          alt="Decorative doodle"
          className="absolute bottom-0 right-0 -z-10"
        />
        <Image
          fill
          src="/images/shape/shape-dotted-light-02.svg"
          alt="Background dotted pattern"
          className="absolute left-0 top-0 -z-10 dark:hidden"
        />
        <Image
          fill
          src="/images/shape/shape-dotted-dark-02.svg"
          alt="Background dotted pattern dark mode"
          className="absolute left-0 top-0 -z-10 hidden dark:block"
        />

        {/* Heading */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.2}
          className="mx-auto mb-12.5 px-4 text-center md:w-4/5 lg:mb-17.5 lg:w-2/3 xl:w-1/2"
        >
          <h2 className="mb-4 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle3">
            Trusted by Global Companies
          </h2>
          <p className="mx-auto text-lg text-gray-600 dark:text-gray-300 lg:w-11/12">
            We are proud to have earned the trust of businesses and individuals
            around the world. Our products and services are used daily by
            professionals across industries, helping them innovate and grow.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-10 lg:gap-24">
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={stat.delay}
              className="text-center"
            >
              <h3 className="mb-2.5 text-4xl font-bold text-black dark:text-white xl:text-sectiontitle3">
                {stat.value}
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-400 lg:text-para2">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FunFact;
