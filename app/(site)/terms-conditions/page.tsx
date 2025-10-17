"use client";
import { motion } from "framer-motion"; // Named import
import Link from "next/link";

export default function TermsConditions() {
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
          Terms & Conditions
        </motion.h1>

        <div className="prose prose-lg max-w-none dark:prose-invert space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              By accessing and using Ostutelage (the "Platform"), you agree to be bound
              by these Terms & Conditions. If you do not agree with any part of these
              terms, you must not use our Platform.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold mb-4">2. Application Fee & Payments</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              All new users are required to pay a one-time application processing fee
              of <span className="font-bold text-primary">₦12,500</span> to activate their account and access course materials.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>Payment is processed securely through Flutterwave</li>
              <li>The fee is non-refundable once payment is completed</li>
              <li>Account activation occurs within 24 hours of successful payment</li>
              <li>Course fees are separate and outlined on individual course pages</li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold mb-4">3. Course Access & Usage</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Once your account is activated, you gain access to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>Your selected school's course catalog</li>
              <li>Interactive learning materials and assignments</li>
              <li>Progress tracking and certification</li>
              <li>Community forums and mentorship access</li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold mb-4">4. User Responsibilities</h2>
            <p className="text-gray-700 dark:text-gray-300">
              You agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>Use the Platform only for lawful purposes</li>
              <li>Respect intellectual property rights of course materials</li>
              <li>Maintain confidentiality of your account credentials</li>
              <li>Provide accurate information during registration</li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Ostutelage provides educational content "as is" without warranties. We do
              not guarantee employment outcomes, though we strive to provide industry-relevant
              training that maximizes your career potential.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold mb-4">6. Termination</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We reserve the right to suspend or terminate accounts that violate these
              terms, including but not limited to sharing course materials or engaging
              in fraudulent activities.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold mb-4">7. Governing Law</h2>
            <p className="text-gray-700 dark:text-gray-300">
              These Terms & Conditions are governed by the laws of Nigeria. Any disputes
              will be resolved through arbitration in Lagos, Nigeria.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
            <p className="text-gray-700 dark:text-gray-300">
              If you have any questions about these Terms & Conditions, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Email: info@ostutelage.tech</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Monday - Friday: 9AM - 6PM WAT</p>
                </div>
                <a
                  href="mailto:hello@ostutelage.com"
                  className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                >
                  Get In Touch
                </a>
              </div>
            </div>
          </motion.section>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="text-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Last modified: {new Date().toLocaleDateString('en-NG', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}