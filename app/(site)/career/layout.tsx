// app/career/layout.tsx
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Careers at OsTutelage Academy",
  description: "Join OsTutelage Academy to shape the future of tech education. Explore opportunities to teach, create content, and innovate in edtech.",
};

export default function CareerLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}