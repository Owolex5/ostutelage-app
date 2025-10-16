"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { schoolsData } from "@/data/schoolsData";

// Define types for user and school data
interface User {
  firstName: string;
  lastName: string;
}

interface Course {
  name: string;
  duration: string;
  outcome: string;
  fee: string;
}

interface School {
  id: string;
  title: string;
  description: string;
  image: string;
  details: {
    overview: string;
    careerOutcomes: string[];
    tools: string[];
    learningStyle: string[];
    courses: Course[];
    shortCourses: Course[];
    fees: string;
    whyChoose: string[];
  };
}

// Component that uses useSearchParams and useRouter
function WelcomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [school, setSchool] = useState<School | null>(null);

  // Safely access search params with type narrowing
  const userId = searchParams ? searchParams.get("userId") : null;
  const schoolId = searchParams ? searchParams.get("school") : null;

  useEffect(() => {
    const init = async () => {
      if (userId && schoolId) {
        try {
          // Fetch user data
          const userResponse = await fetch(`/api/users/${userId}`);
          if (!userResponse.ok) {
            throw new Error("Failed to fetch user data");
          }
          const userData: User = await userResponse.json();
          setUser(userData);

          // Get school data
          const schoolData = schoolsData.find((s) => s.id === schoolId);
          if (!schoolData) {
            throw new Error("School not found");
          }
          setSchool(schoolData);
        } catch (error) {
          console.error("Failed to fetch data:", error);
          // Optional: Redirect to error page
          // router.push("/error");
        } finally {
          setLoading(false);
        }
      } else {
        router.push("https://app.ostutelage.tech/portal/signin.php");
      }
    };

    init();
  }, [userId, schoolId, router]);

  const handlePayment = async () => {
    if (!userId || !schoolId) return;

    try {
      setLoading(true);
      const response = await fetch("/api/payments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          amount: 12500, // Application fee in kobo
          school: schoolId,
          metadata: { type: "application_fee" },
        }),
      });

      if (!response.ok) {
        throw new Error("Payment initiation failed");
      }

      const { paymentLink } = await response.json();
      window.location.href = paymentLink;
    } catch (error) {
      console.error("Payment initiation failed:", error);
      alert("Payment initiation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Setting up your account...</p>
        </div>
      </div>
    );
  }

  if (!user || !school) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-4">Something went wrong with your registration.</p>
          <Link
            href="https://app.ostutelage.tech/portal/signup.php"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </Link>
        </div>
      </div>
    );
  }

  const schoolFees = school.details.fees;
  const applicationFee = "₦12,500";

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Welcome Header with School Branding */}
          <div className="relative overflow-hidden bg-gradient-to-r from-primary via-blue-600 to-indigo-700 text-white p-8">
            <Image
              src={school.image}
              alt={school.title}
              width={1200}
              height={400}
              className="absolute inset-0 object-cover opacity-10 mix-blend-overlay"
            />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                  <Image
                    src={school.image}
                    alt={school.title}
                    width={40}
                    height={40}
                    className="rounded-lg object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium opacity-90">Welcome to</h3>
                  <h1 className="text-2xl font-bold">{school.title}</h1>
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  Welcome, {user.firstName} {user.lastName}!
                </h2>
                <p className="text-blue-100 text-lg">
                  Your journey to becoming a {school.details.careerOutcomes[0]?.toLowerCase() || "professional"} begins now
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-8 lg:p-12">
            {/* Success Confirmation */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Account Created Successfully!</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                To activate your account and unlock access to {school.title}'s comprehensive curriculum, please complete the
                one-time application processing fee.
              </p>
            </div>

            {/* Fee Breakdown */}
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-yellow-800 mb-2">Application Processing Fee</h4>
                    <p className="text-yellow-700 text-sm mb-3">
                      One-time fee to activate your account and access course materials
                    </p>
                    <ul className="text-xs text-yellow-600 space-y-1">
                      <li>• Account activation & verification</li>
                      <li>• Access to learning platform</li>
                      <li>• Career services enrollment</li>
                      <li>• Community membership</li>
                    </ul>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-yellow-800 mb-1">{applicationFee}</div>
                    <p className="text-sm text-yellow-600">Non-refundable</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-blue-800 mb-3">Next Steps After Payment</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-blue-700">Account activated within 24 hours</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-blue-700">Access to {school.title} dashboard</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-blue-700">Course catalog & enrollment</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-blue-700">Personalized learning path</span>
                  </div>
                </div>
              </div>
            </div>

            {/* School Preview */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Image src={school.image} alt={school.title} width={32} height={32} className="rounded" />
                About {school.title}
              </h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-gray-700 mb-2">What You'll Learn</h5>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {school.details.overview?.substring(0, 200) || "Comprehensive curriculum to boost your career"}...
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-gray-700 mb-3">Career Outcomes</h5>
                  <div className="space-y-1">
                    {(school.details.careerOutcomes || []).slice(0, 3).map((outcome, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        {outcome}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment CTA */}
            <div className="text-center mb-8">
              <motion.button
                onClick={handlePayment}
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-primary to-blue-600 text-white px-10 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                    Pay Application Fee Now - {applicationFee}
                  </>
                )}
                <span className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-300"></span>
              </motion.button>
            </div>

            {/* Footer Info */}
            <div className="pt-8 border-t border-gray-200 text-center">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Ready to Transform Your Career?</h4>
              <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
                Once your payment is confirmed, you'll gain immediate access to {school.title}'s comprehensive learning
                platform, expert mentorship, and a global community of learners and professionals.
              </p>
              <div className="flex justify-center items-center gap-6 text-sm text-gray-500">
                <span>Secure payment via</span>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L19 8l-8 8z" />
                  </svg>
                  <span>Flutterwave</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function WelcomePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Setting up your account...</p>
          </div>
        </div>
      }
    >
      <WelcomeContent />
    </Suspense>
  );
}