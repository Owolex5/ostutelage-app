"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

export default function PrivacyPolicy() {
  // ✅ Prevent static build errors by using client-side date formatting
  const [formattedDate, setFormattedDate] = React.useState<string>("");

  React.useEffect(() => {
    const date = new Date().toLocaleDateString("en-NG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setFormattedDate(date);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-16"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-8 text-black dark:text-white"
        >
          Privacy Policy
        </motion.h1>

        <div className="prose prose-lg max-w-none dark:prose-invert space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
              Last updated: {formattedDate || "Loading..."}
            </p>
          </motion.div>

          {/* --- SECTION 1 --- */}
          <Section
            delay={0.2}
            title="1. Introduction"
            content={`Welcome to Ostutelage ("we", "our", "us"). We are committed to protecting your privacy and ensuring you have complete control over your personal information. This Privacy Policy explains how we collect, use, and protect your data when you use our platform.`}
          />

          {/* --- SECTION 2 --- */}
          <Section
            delay={0.3}
            title="2. Information We Collect"
            content={`We collect the following types of information:`}
            list={[
              "Personal Information: Name, email address, phone number collected during registration",
              "Educational Data: Academic background, career goals for personalized learning recommendations",
              "Payment Information: Processed securely through third-party payment providers (we don't store card details)",
              "Usage Data: Course progress, interaction patterns to improve learning experience",
              "Technical Data: IP address, browser type, device information for security and analytics",
            ]}
          />

          {/* --- SECTION 3 --- */}
          <Section
            delay={0.4}
            title="3. How We Use Your Information"
            list={[
              "Provide and improve our educational services",
              "Process payments and manage subscriptions",
              "Personalize your learning experience",
              "Communicate important updates and opportunities",
              "Prevent fraud and ensure platform security",
              "Comply with legal obligations",
            ]}
          />

          {/* --- SECTION 4 --- */}
          <Section
            delay={0.5}
            title="4. Data Sharing & Disclosure"
            content="We never sell your personal data. We only share information with:"
            list={[
              "Service Providers: Payment processors, email services, cloud hosting",
              "Legal Requirements: When required by law or to protect our rights",
              "Business Transfers: In case of merger, acquisition, or sale of assets",
            ]}
          />

          {/* --- SECTION 5 --- */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold mb-4">5. Your Rights & Choices</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You have the following rights regarding your data:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Access & Update",
                  text: "View and update your personal information in account settings",
                },
                {
                  title: "Delete Data",
                  text: "Request deletion of your account and data (subject to legal retention)",
                },
                {
                  title: "Marketing Opt-out",
                  text: "Unsubscribe from promotional emails anytime",
                },
                {
                  title: "Data Portability",
                  text: "Request your data in a structured, machine-readable format",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
                >
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* --- SECURITY SECTION --- */}
          <Section
            delay={1.2}
            title="6. Security"
            content="We implement industry-standard security measures including:"
            list={[
              "SSL/TLS encryption for all data transmission",
              "Secure payment processing through PCI-compliant providers",
              "Regular security audits and penetration testing",
              "Access controls and multi-factor authentication where applicable",
              "Regular software updates and security patches",
            ]}
          />

          {/* --- CONTACT SECTION --- */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-700 dark:text-gray-300">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Email: info@ostutelage.tech
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Data Protection Officer
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Monday - Friday: 9AM - 6PM WAT
                  </p>
                </div>
                <a
                  href="mailto:info@ostutelage.tech"
                  className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </motion.section>

          {/* --- FOOTER --- */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.7 }}
            className="text-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Last modified: {formattedDate || "Loading..."}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/** Helper section component to reduce repetition **/
function Section({
  delay,
  title,
  content,
  list,
}: {
  delay?: number;
  title: string;
  content?: string;
  list?: string[];
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="mb-8"
    >
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {content && (
        <p className="text-gray-700 dark:text-gray-300 mb-4">{content}</p>
      )}
      {list && (
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
          {list.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}
    </motion.section>
  );
}
