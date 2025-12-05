"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Lines from "@/components/Lines";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "../globals.css";
import ToasterContext from "../context/ToastContext";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Hide layout elements on certain routes (like /exam)
  const noLayout = !!pathname && (pathname.startsWith("/exam") || pathname.startsWith("/assessment"));

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`dark:bg-black ${inter.className}`}>
        <ThemeProvider
          enableSystem={false}
          attribute="class"
          defaultTheme="light"
          
        >
          <Lines />

          {/* Only show header/footer if not on exam route */}
          {!noLayout && <Header />}
          <ToasterContext />

          {children}

          {!noLayout && <Footer />}
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
  