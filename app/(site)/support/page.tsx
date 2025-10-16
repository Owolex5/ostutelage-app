import React from "react";
import Contact from "@/components/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - OsTutelage Academy",
  description: "Get in touch with OsTutelage Academy for inquiries about our world-class tech programs, consultations, or partnerships. We're here to help you start your tech journey!",
};

const SupportPage = () => {
  return (
    <div className="pb-20 pt-40">
      <Contact />
    </div>
  );
};

export default SupportPage;
