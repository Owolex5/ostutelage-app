"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";

// Define the Feature interface to match the feature prop structure
interface Feature {
  id?: string; // Optional, as seen in Features/index.tsx where feature.id is used with a fallback
  title: string;
  description: string;
  image?: string; // Optional, as it has a fallback to "/images/placeholder-icon.png"
  path?: string; // Optional, as it’s conditionally used for Link
  icon?: ReactNode; // Optional, as it’s conditionally rendered
}

const SingleFeature = ({ feature }: { feature: Feature }) => {
  return (
    <div className="group relative">
      {feature.path ? (
        <Link href={feature.path} className="block">
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300">
            {/* Icon */}
            <div className="w-14 h-14 mb-4 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              {feature.icon ? (
                feature.icon
              ) : (
                <Image
                  src={feature.image || "/images/placeholder-icon.png"}
                  alt={feature.title}
                  width={24}
                  height={24}
                  className="object-contain"
                />
              )}
            </div>
            {/* Title */}
            <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">
              {feature.title}
            </h3>
            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
              {feature.description}
            </p>
            {/* CTA Indicator */}
            {feature.path && (
              <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Learn More
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            )}
          </div>
        </Link>
      ) : (
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300">
          <div className="w-14 h-14 mb-4 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
            {feature.icon ? (
              feature.icon
            ) : (
              <Image
                src={feature.image || "/images/placeholder-icon.png"}
                alt={feature.title}
                width={24}
                height={24}
                className="object-contain"
              />
            )}
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">
            {feature.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
            {feature.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default SingleFeature;