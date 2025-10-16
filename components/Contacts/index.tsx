"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setFeedback("");

    // Safely access form elements using FormData
    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
      whatsapp: formData.get("whatsapp") ? "Yes" : "No",
      phone: (formData.get("phone") as string) || "Not provided",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (res.ok) {
        setFeedback("Message sent successfully! Check your email for confirmation.");
        form.reset(); // Use form instead of e.target for clarity and correct typing
      } else {
        setFeedback(result.message || "Failed to send message.");
      }
    } catch (err) {
      console.error("Error sending form:", err);
      setFeedback("Error sending message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ===== Contact Start ===== */}
      <section id="support" className="px-4 md:px-8 2xl:px-0">
        <div className="relative mx-auto max-w-c-1390 px-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
          <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-linear-to-t from-transparent to-[#dee7ff47] dark:bg-linear-to-t dark:to-[#252A42]"></div>
          <div className="absolute bottom-[-255px] left-0 -z-1 h-full w-full">
            <Image
              src="./images/shape/shape-dotted-light.svg"
              alt="Dotted"
              className="dark:hidden"
              fill
            />
            <Image
              src="./images/shape/shape-dotted-dark.svg"
              alt="Dotted"
              className="hidden dark:block"
              fill
            />
          </div>

          <div className="flex flex-col-reverse flex-wrap gap-8 md:flex-row md:flex-nowrap md:justify-between xl:gap-20">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top w-full rounded-lg bg-white p-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black md:w-3/5 lg:w-3/4 xl:p-15"
            >
              <h2 className="mb-15 text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
                Have any inquiry or consultation? Send us a message
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-7.5 flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full name"
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-hidden dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-hidden dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
                    required
                  />
                </div>

                <div className="mb-12.5 flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
                  <select
                    name="subject"
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-hidden dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
                    required
                  >
                    <option value="">Select subject</option>
                    <option value="School Programs">School Programs</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Partnership">Partnership</option>
                  </select>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone number"
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-hidden dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
                  />
                </div>

                <div className="mb-11.5 flex">
                  <textarea
                    name="message"
                    placeholder="Message"
                    rows={4}
                    className="w-full border-b border-stroke bg-transparent focus:border-waterloo focus:placeholder:text-black focus-visible:outline-hidden dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white"
                    required
                  ></textarea>
                </div>

                <div className="mb-11.5 flex items-center">
                  <input
                    type="checkbox"
                    name="whatsapp"
                    id="whatsapp"
                    className="mr-2"
                  />
                  <label htmlFor="whatsapp" className="text-gray-600 dark:text-gray-300">
                    Contact me via WhatsApp
                  </label>
                </div>

                <div className="flex flex-wrap gap-4 xl:justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </div>
                {feedback && (
                  <p
                    className={`mt-4 p-3 rounded-lg text-sm ${
                      feedback.includes("successfully")
                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                        : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                    }`}
                  >
                    {feedback}
                  </p>
                )}
              </form>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 2, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top w-full md:w-2/5 md:p-7.5 lg:w-[26%] xl:pt-15"
            >
              <h2 className="mb-12.5 text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
                Find us
              </h2>

              <div className="mb-7">
                <h3 className="mb-4 text-metatitle3 font-medium text-black dark:text-white">
                  Lagos Location
                </h3>
                <p>12 Freedom Way, Victoria Island, Lagos, Nigeria</p>
              </div>

              <div className="mb-7">
                <h3 className="mb-4 text-metatitle3 font-medium text-black dark:text-white">
                  Port Harcourt Location
                </h3>
                <p>45 Rivers Street, Port Harcourt, Rivers State, Nigeria</p>
              </div>

              <div className="mb-7">
                <h3 className="mb-4 text-metatitle3 font-medium text-black dark:text-white">
                  Email Address
                </h3>
                <p>
                  <a href="mailto:info@ostutelage.tech" className="text-primary">
                    info@ostutelage.tech
                  </a>
                </p>
              </div>

              <div>
                <h4 className="mb-4 text-metatitle3 font-medium text-black dark:text-white">
                  WhatsApp
                </h4>
                <p>
                  <a href="https://wa.me/2349036508361" target="_blank" className="text-primary">
                    +234 903 650 8361
                  </a>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* ===== Contact End ===== */}
    </>
  );
};

export default Contact;