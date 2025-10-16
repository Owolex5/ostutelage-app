// ❌ Don't put "use client" here
import HeroAbout from "@/components/HeroAbout";
import Brands from "@/components/Brands";
import About from "@/components/About";
import Integration from "@/components/Integration";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About Us - OsTutelage Academy",
  description:
    "Learn more about OsTutelage Academy — our mission, vision, and how we’re shaping the next generation of tech leaders.",
};

export default function AboutPage() {
  return (
    <main>
      <HeroAbout />
      <Brands />
      <About />
      
      {/* mission / vision section */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div>
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p>
              To empower students with practical tech skills to succeed in
              the digital economy.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p>
              To be the leading digital skills academy across Nigeria,
              delivering high-quality education and career growth.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Our Core Values</h3>
            <p>
              Innovation, Collaboration, Excellence, and a Commitment to
              Lifelong Learning.
            </p>
          </div>
        </div>
      </section>
      <Integration />
      <CTA />
     
    </main>
  );
}
