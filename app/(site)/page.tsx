import { Metadata } from "next";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import Feature from "@/components/Features";
import About from "@/components/About";
import FeaturesTab from "@/components/FeaturesTab";
import FunFact from "@/components/FunFact";
import Integration from "@/components/Integration";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Pricing from "@/components/Pricing";
import Contacts from "@/components/Contacts";
import Blog from "@/components/Blog";
import Testimonial from "@/components/Testimonial";

// ✅ add this import
import Schools from "@/components/Schools";

export const metadata: Metadata = {
  title: "OsTutelage - Home",
  description: "Lauchpad for tech learners and professional"
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Brands />
      {/* 👇 Add the schools section here */}
     
      <Feature />
      <About />
      <FeaturesTab />
      <FunFact />
      <Integration />
      <CTA />
      <FAQ />
      <Testimonial />
      <Pricing />
      <Contacts />
      {/* <Blog /> */}
    </main>
  );
}
