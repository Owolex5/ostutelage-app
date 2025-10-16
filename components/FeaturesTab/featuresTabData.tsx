"use client";
import { useState } from "react";
import { schoolsData } from "@/data/schoolsData";
import Image from "next/image";
import Link from "next/link";

const FeaturesTab = () => {
  const [currentTab, setCurrentTab] = useState("software-engineering");

  return (
    <section className="relative pb-20 pt-18.5 lg:pb-22.5">
      <div className="relative mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
        
        {/* Tab Buttons */}
        <div className="mb-10 flex flex-wrap justify-center gap-5">
          {schoolsData.map((school) => (
            <button
              key={school.id}
              onClick={() => setCurrentTab(school.id)}
              className={`px-6 py-2 rounded-lg border ${
                currentTab === school.id
                  ? "bg-primary text-white"
                  : "bg-white text-black dark:bg-blacksection dark:text-white"
              }`}
            >
              {school.title}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {schoolsData.map(
          (school) =>
            school.id === currentTab && (
              <div
                key={school.id}
                className="rounded-lg border bg-white p-6 shadow-lg dark:bg-blacksection"
              >
                <Image
                  src={school.image}
                  width={900}
                  height={400}
                  alt={school.title}
                  className="mb-6 rounded-lg"
                />
                <h2 className="text-2xl font-semibold mb-4">{school.title}</h2>
                <p className="mb-4">{school.description}</p>
                <Link
                  href={`/schools/${school.id}`}
                  className="px-4 py-2 rounded bg-primary text-white"
                >
                  Learn More
                </Link>
              </div>
            )
        )}
      </div>
    </section>
  );
};

export default FeaturesTab;
