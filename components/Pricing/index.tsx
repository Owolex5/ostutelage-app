"use client";

import { schoolsData } from "@/data/schoolsData";
import SectionHeader from "../Common/SectionHeader";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper"; // Correct import for Swiper 11+
import "swiper/css";
import "swiper/css/navigation";

const Pricing = () => {
  return (
    <section className="overflow-hidden pb-20 pt-15 lg:pb-25 xl:pb-30 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto text-center"
        >
          <SectionHeader
            headerInfo={{
              title: `PRICING PLANS`,
              subtitle: `Affordable Learning Paths`,
              description: `Choose a school to unlock specialized courses tailored to your career goals. Flexible pricing and payment plans available.`,
            }}
          />
        </motion.div>
      </div>

      <div className="relative mx-auto mt-15 max-w-[1207px] px-4 md:px-8 xl:mt-20 xl:px-0">
        {/* Background Dotted Image */}
        <div className="absolute -bottom-15 -z-1 h-full w-full">
          <Image
            fill
            src="/images/shape/shape-dotted-light.svg"
            alt="Dotted Background"
            className="dark:hidden"
          />
          <Image
            fill
            src="/images/shape/shape-dotted-dark.svg"
            alt="Dotted Background"
            className="hidden dark:block"
          />
        </div>

        {/* Carousel Container */}
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 2 },
          }}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="relative"
        >
          {schoolsData.map((school, index) => (
            <SwiperSlide key={school.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative mx-2 rounded-2xl border border-gray-200/50 bg-white/80 backdrop-blur-sm p-6 shadow-xl dark:border-gray-700/50 dark:bg-gray-800/80 group hover:shadow-2xl transition-all duration-500"
              >
                {/* Popular Badge for Data Science */}
                {school.id === "data-science" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -right-2 -top-2 z-10 rounded-full bg-gradient-to-r from-primary to-secondary px-3 py-1 text-xs font-semibold text-white shadow-lg"
                  >
                    Popular
                  </motion.div>
                )}

                {/* School Image with Gradient Overlay */}
                <div className="mb-6 flex justify-center">
                  <div className="relative">
                    <Image
                      src={school.image}
                      alt={school.title}
                      width={120}
                      height={120}
                      className="h-28 w-28 rounded-full object-cover border-4 border-white/20 shadow-md"
                    />
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
                  </div>
                </div>

                {/* School Title */}
                <motion.h4
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-3 text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent dark:from-white dark:to-gray-300 text-center"
                >
                  {school.title}
                </motion.h4>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed"
                >
                  {school.description.substring(0, 120)}...
                </motion.p>

                {/* Course List */}
                <div className="mt-6 border-t border-gray-200/50 pt-5 dark:border-gray-700/50">
                  <h5 className="mb-3 text-lg font-semibold text-black dark:text-white flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    Available Courses
                  </h5>
                  <ul className="space-y-2">
                    {school.details.courses.map((course, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300 bg-gray-50/50 dark:bg-gray-700/30 p-2 rounded-lg"
                      >
                        <span className="font-medium">{course.name} ({course.duration})</span>
                        <span className="font-bold text-primary">{course.fee}</span>
                      </motion.li>
                    ))}
                    {school.details.shortCourses.map((course, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (school.details.courses.length + idx) * 0.1 }}
                        className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300 bg-blue-50/50 dark:bg-blue-900/20 p-2 rounded-lg"
                      >
                        <span className="font-medium">{course.name} ({course.duration})</span>
                        <span className="font-bold text-primary">{course.fee}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Why Choose This School */}
                <div className="mt-5 border-t border-gray-200/50 pt-5 dark:border-gray-700/50">
                  <h5 className="mb-3 text-lg font-semibold text-black dark:text-white flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-secondary"
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
                    Why Choose Us
                  </h5>
                  <ul className="space-y-2">
                    {school.details.whyChoose.slice(0, 3).map((item, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                      >
                        <svg
                          className="w-5 h-5 text-primary mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Apply Button */}
                <div className="mt-6">
                  <Link href="https://app.ostutelage.tech/portal/signup.php">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Apply for ${school.title}`}
                      className="group/btn inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 shadow-lg hover:shadow-primary/20"
                    >
                      Apply Now
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 14 14"
                        xmlns="http://www.w3.org/2000/svg"
                        className="group-hover/btn:translate-x-1 transition-transform duration-300"
                      >
                        <path
                          d="M10.4767 6.16701L6.00668 1.69701L7.18501 0.518677L13.6667 7.00034L7.18501 13.482L6.00668 12.3037L10.4767 7.83368H0.333344V6.16701H10.4767Z"
                          fill="currentColor"
                        />
                      </svg>
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between z-10 px-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="swiper-button-prev-custom bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-primary hover:text-white transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="swiper-button-next-custom bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-primary hover:text-white transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* View All CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <Link
          href="/schools"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 shadow-lg"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
          View All Schools
        </Link>
      </motion.div>
    </section>
  );
};

export default Pricing;