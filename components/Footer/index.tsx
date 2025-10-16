"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="border-t border-stroke bg-white dark:border-strokedark dark:bg-blacksection">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          {/* Footer Top */}
          <div className="py-12 lg:py-16">
            <div className="flex flex-wrap gap-8 lg:justify-between lg:gap-0">
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: -20 },
                  visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
                className="w-full sm:w-1/2 lg:w-1/4"
              >
                <Link href="/" className="relative block">
                  <Image
                    width={110}
                    height={80}
                    src="/images/logo/logo-light.png"
                    alt="Ostutelage"
                    className="dark:hidden transition-all duration-300 hover:scale-105"
                  />
                  <Image
                    width={110}
                    height={80}
                    src="/images/logo/logo-dark.png"
                    alt="Ostutelage"
                    className="hidden dark:block transition-all duration-300 hover:scale-105"
                  />
                </Link>

                <p className="mb-6 mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  Ostutelage transforms lives through world-class education in 
                  Software Engineering, Data Science, Cybersecurity, Design, and 
                  Digital Skills. Join thousands of students building successful 
                  tech careers globally.
                </p>

                <div className="mb-4">
                  <p className="mb-2 text-sm uppercase tracking-[5px] text-primary font-semibold">
                    Contact Us
                  </p>
                  <div className="space-y-2">
                    <Link
                      href="mailto:info@ostutelage.tech"
                      className="group inline-flex items-center gap-2 text-sm font-medium text-black hover:text-primary transition-colors dark:text-white"
                    >
                      <svg className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      info@ostutelage.tech
                    </Link>
                    <Link
                      href="https://wa.me/2349036508361"
                      className="group inline-flex items-center gap-2 text-sm font-medium text-black hover:text-primary transition-colors dark:text-white"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.55 4.208 1.595 6.032L0 24l6.208-1.632A11.905 11.905 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm6.695 18.305c-.305.914-.914 1.524-1.829 1.829-.61.203-1.422.406-2.337-.102-1.016-.61-2.032-1.626-3.048-2.642-1.016-1.016-2.032-2.236-2.236-3.353-.203-1.118.406-2.236 1.118-2.947.305-.305.61-.508.914-.508.203 0 .406.102.61.102.203 0 .508.102.711.508.406.813.813 1.626 1.016 2.236.102.305.102.61 0 .914-.102.305-.305.508-.508.711-.305.305-.508.508-.711.914.406.914 1.016 1.829 1.829 2.642.813.813 1.626 1.422 2.54 1.829.305.102.508.305.711.508.203.203.406.406.508.711.102.305.102.508 0 .813z" />
                      </svg>
                      +234 903 650 8361
                    </Link>
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="flex space-x-4 pt-2">
                  {[
                    { name: "Facebook", href: "#", icon: <path d="M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47 14 5.5 16 5.5H17.5V2.14C17.174 2.097 15.943 2 14.643 2C11.928 2 10 3.657 10 6.7V9.5H7V13.5H10V22H14V13.5Z" /> },
                    { name: "Twitter", href: "#", icon: <path d="M22.162 5.65593C21.3985 5.99362 20.589 6.2154 19.76 6.31393C20.6337 5.79136 21.2877 4.96894 21.6 3.99993C20.78 4.48793 19.881 4.82993 18.944 5.01493C18.3146 4.34151 17.4803 3.89489 16.5709 3.74451C15.6615 3.59413 14.7279 3.74842 13.9153 4.18338C13.1026 4.61834 12.4564 5.30961 12.0771 6.14972C11.6978 6.98983 11.6067 7.93171 11.818 8.82893C10.1551 8.74558 8.52832 8.31345 7.04328 7.56059C5.55823 6.80773 4.24812 5.75098 3.19799 4.45893C2.82628 5.09738 2.63095 5.82315 2.63199 6.56193C2.63199 8.01193 3.36999 9.29293 4.49199 10.0429C3.828 10.022 3.17862 9.84271 2.59799 9.51993V9.57193C2.59819 10.5376 2.93236 11.4735 3.54384 12.221C4.15532 12.9684 5.00647 13.4814 5.95299 13.6729C5.33661 13.84 4.6903 13.8646 4.06299 13.7449C4.32986 14.5762 4.85 15.3031 5.55058 15.824C6.25117 16.345 7.09712 16.6337 7.96999 16.6499C7.10247 17.3313 6.10917 17.8349 5.04687 18.1321C3.98458 18.4293 2.87412 18.5142 1.77899 18.3819C3.69069 19.6114 5.91609 20.2641 8.18899 20.2619C15.882 20.2619 20.089 13.8889 20.089 8.36193C20.089 8.18193 20.084 7.99993 20.076 7.82193C20.8949 7.2301 21.6016 6.49695 22.163 5.65693L22.162 5.65593Z" /> },
                    { name: "LinkedIn", href: "#", icon: <path d="M6.94 5.00002C6.93974 5.53046 6.72877 6.03906 6.35351 6.41394C5.97825 6.78883 5.46944 6.99929 4.939 6.99902C4.40857 6.99876 3.89997 6.78779 3.52508 6.41253C3.1502 6.03727 2.93974 5.52846 2.94 4.99802C2.94027 4.46759 3.15124 3.95899 3.5265 3.5841C3.90176 3.20922 4.41057 2.99876 4.941 2.99902C5.47144 2.99929 5.98004 3.21026 6.35492 3.58552C6.72981 3.96078 6.94027 4.46959 6.94 5.00002ZM7 8.48002H3V21H7V8.48002ZM13.32 8.48002H9.34V21H13.28V14.43C13.28 10.77 18.05 10.43 18.05 14.43V21H22V13.07C22 6.90002 14.94 7.13002 13.28 10.16L13.32 8.48002Z" /> },
                  ].map((social) => (
                    <motion.div
                      key={social.name}
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Link
                        href={social.href}
                        aria-label={social.name}
                        className="group p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <svg
                          className="h-5 w-5 fill-current text-gray-400 transition-colors duration-300 group-hover:text-primary"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {social.icon}
                        </svg>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <div className="flex w-full flex-col gap-8 md:flex-row md:justify-between md:gap-0 lg:w-2/3 xl:w-7/12">
                {/* Quick Links Column */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: -20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="w-full md:w-1/3"
                >
                  <h4 className="mb-6 text-lg font-semibold text-black dark:text-white">
                    Quick Links
                  </h4>
                  <ul className="space-y-3">
                    {[
                      { href: "/", label: "Home", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> },
                      { href: "/careers", label: "Careers", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /> },
                      { href: "/schools", label: "Schools", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /> },
                    ].map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="group inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-all duration-300"
                        >
                          <svg className="h-4 w-4 flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {link.icon}
                          </svg>
                          <span className="group-hover:translate-x-1 transition-transform duration-300">
                            {link.label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Support Column */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: -20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="w-full md:w-1/3"
                >
                  <h4 className="mb-6 text-lg font-semibold text-black dark:text-white">
                    Support
                  </h4>
                  <ul className="space-y-3">
                    {[
                      { href: "/about", label: "Company", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /> },
                      { href: "/contact", label: "Contact", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /> },
                    ].map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="group inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-all duration-300"
                        >
                          <svg className="h-4 w-4 flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {link.icon}
                          </svg>
                          <span className="group-hover:translate-x-1 transition-transform duration-300">
                            {link.label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Newsletter Column */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: -20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="w-full md:w-1/3"
                >
                  <h4 className="mb-4 text-lg font-semibold text-black dark:text-white flex items-center gap-2">
                    <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Stay Updated
                  </h4>
                  <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                    Get the latest updates on new courses, career opportunities, 
                    and exclusive scholarship announcements.
                  </p>

                  <form className="group" onSubmit={(e) => e.preventDefault()}>
                    <div className="relative mb-3">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full pl-10 rounded-lg border border-stroke bg-white/80 backdrop-blur-sm px-4 py-2.5 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-strokedark dark:bg-gray-800/80 dark:focus:border-primary transition-all duration-300 group-invalid:border-red-500"
                        required
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg bg-gradient-to-r from-primary to-secondary px-4 py-1.5 text-sm font-medium text-white transition-all duration-300 hover:from-primary/90 hover:to-secondary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                      >
                        <span className="hidden sm:inline">Subscribe</span>
                        <svg
                          className="mx-auto h-4 w-4 sm:hidden"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </motion.button>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </form>
                </motion.div>
              </div>
            </div>
          </div>
          {/* Footer Top */}

          {/* Footer Bottom */}
          <div className="flex flex-col flex-wrap items-center justify-center gap-4 border-t border-stroke py-6 dark:border-strokedark lg:flex-row lg:justify-between lg:gap-0">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="order-3 lg:order-1"
            >
              <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                © {new Date().getFullYear()} Ostutelage. All rights reserved.
              </p>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
              className="order-2 lg:order-2"
            >
              <ul className="flex flex-wrap items-center justify-center gap-6 text-sm">
                <li>
                  <Link
                    href="#"
                    className="group inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary transition-all duration-300"
                  >
                    <svg className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      Privacy Policy
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="group inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary transition-all duration-300"
                  >
                    <svg className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      Terms & Conditions
                    </span>
                  </Link>
                </li>
              </ul>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
              className="order-1 lg:order-3"
            >
              <ul className="flex items-center justify-center gap-4">
                {[
                  { name: "Facebook", href: "#", icon: <path d="M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47 14 5.5 16 5.5H17.5V2.14C17.174 2.097 15.943 2 14.643 2C11.928 2 10 3.657 10 6.7V9.5H7V13.5H10V22H14V13.5Z" /> },
                  { name: "Twitter", href: "#", icon: <path d="M22.162 5.65593C21.3985 5.99362 20.589 6.2154 19.76 6.31393C20.6337 5.79136 21.2877 4.96894 21.6 3.99993C20.78 4.48793 19.881 4.82993 18.944 5.01493C18.3146 4.34151 17.4803 3.89489 16.5709 3.74451C15.6615 3.59413 14.7279 3.74842 13.9153 4.18338C13.1026 4.61834 12.4564 5.30961 12.0771 6.14972C11.6978 6.98983 11.6067 7.93171 11.818 8.82893C10.1551 8.74558 8.52832 8.31345 7.04328 7.56059C5.55823 6.80773 4.24812 5.75098 3.19799 4.45893C2.82628 5.09738 2.63095 5.82315 2.63199 6.56193C2.63199 8.01193 3.36999 9.29293 4.49199 10.0429C3.828 10.022 3.17862 9.84271 2.59799 9.51993V9.57193C2.59819 10.5376 2.93236 11.4735 3.54384 12.221C4.15532 12.9684 5.00647 13.4814 5.95299 13.6729C5.33661 13.84 4.6903 13.8646 4.06299 13.7449C4.32986 14.5762 4.85 15.3031 5.55058 15.824C6.25117 16.345 7.09712 16.6337 7.96999 16.6499C7.10247 17.3313 6.10917 17.8349 5.04687 18.1321C3.98458 18.4293 2.87412 18.5142 1.77899 18.3819C3.69069 19.6114 5.91609 20.2641 8.18899 20.2619C15.882 20.2619 20.089 13.8889 20.089 8.36193C20.089 8.18193 20.084 7.99993 20.076 7.82193C20.8949 7.2301 21.6016 6.49695 22.163 5.65693L22.162 5.65593Z" /> },
                  { name: "LinkedIn", href: "#", icon: <path d="M6.94 5.00002C6.93974 5.53046 6.72877 6.03906 6.35351 6.41394C5.97825 6.78883 5.46944 6.99929 4.939 6.99902C4.40857 6.99876 3.89997 6.78779 3.52508 6.41253C3.1502 6.03727 2.93974 5.52846 2.94 4.99802C2.94027 4.46759 3.15124 3.95899 3.5265 3.5841C3.90176 3.20922 4.41057 2.99876 4.941 2.99902C5.47144 2.99929 5.98004 3.21026 6.35492 3.58552C6.72981 3.96078 6.94027 4.46959 6.94 5.00002ZM7 8.48002H3V21H7V8.48002ZM13.32 8.48002H9.34V21H13.28V14.43C13.28 10.77 18.05 10.43 18.05 14.43V21H22V13.07C22 6.90002 14.94 7.13002 13.28 10.16L13.32 8.48002Z" /> },
                ].map((social) => (
                  <motion.li
                    key={social.name}
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      href={social.href}
                      aria-label={social.name}
                      className="group p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <svg
                        className="h-5 w-5 fill-current text-gray-400 transition-colors duration-300 group-hover:text-primary"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {social.icon}
                      </svg>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
          {/* Footer Bottom */}
        </div>
      </footer>
    </>
  );
};

export default Footer;