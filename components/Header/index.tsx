"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

import ThemeToggler from "./ThemeToggler";
import menuData, { Menu } from "./menuData";

const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [stickyMenu, setStickyMenu] = useState(false);

  const pathUrl = usePathname();

  // Sticky menu
  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
    return () => window.removeEventListener("scroll", handleStickyMenu);
  }, []);

  // Close dropdowns and mobile menu on route change
  useEffect(() => {
    setOpenDropdown(null);
    setNavigationOpen(false);
  }, [pathUrl]);

  // Toggle dropdown for a specific menu item
  const toggleDropdown = (id: number) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  // Animation variants for dropdown and mobile menu
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, height: 0 },
    visible: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: { duration: 0.3, ease: "easeOut" as const },
    },
    exit: { opacity: 0, y: -10, height: 0, transition: { duration: 0.2 } },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeOut" as const },
    },
    exit: { opacity: 0, height: 0, transition: { duration: 0.2 } },
  };

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full py-2 ${
        stickyMenu
          ? "bg-white py-1 shadow-sm transition duration-100 dark:bg-gray-900"
          : ""
      }`}
    >
      <div className="relative mx-auto max-w-7xl px-4 md:px-8 xl:flex 2xl:px-0 items-center justify-between">
        {/* Logo and Hamburger */}
        <div className="flex w-full items-center justify-between xl:w-1/4">
          <Link href="/">
            <Image
              src="/images/logo/logo-dark.png"
              alt="OsTutelage logo dark"
              width={100}
              height={25}
              className="hidden w-full dark:block"
            />
            <Image
              src="/images/logo/logo-light.png"
              alt="OsTutelage logo light"
              width={100}
              height={25}
              className="w-full dark:hidden"
            />
          </Link>

          {/* Hamburger Toggle Button */}
          <button
            aria-label="Hamburger Menu Toggler"
            className="block xl:hidden"
            onClick={() => setNavigationOpen(!navigationOpen)}
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="absolute right-0 block h-full w-full">
                {navigationOpen ? (
                  <>
                    <span className="absolute left-1/2 top-1/2 block h-0.5 w-6 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-sm bg-black dark:bg-white transition-all duration-300"></span>
                    <span className="absolute left-1/2 top-1/2 block h-0.5 w-6 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-sm bg-black dark:bg-white transition-all duration-300"></span>
                  </>
                ) : (
                  <>
                    <span className="relative left-0 top-0 my-1 block h-0.5 w-6 rounded-sm bg-black dark:bg-white transition-all duration-200 ease-in-out"></span>
                    <span className="relative left-0 top-0 my-1 block h-0.5 w-6 rounded-sm bg-black dark:bg-white transition-all duration-200 ease-in-out"></span>
                    <span className="relative left-0 top-0 my-1 block h-0.5 w-6 rounded-sm bg-black dark:bg-white transition-all duration-200 ease-in-out"></span>
                  </>
                )}
              </span>
            </span>
          </button>
        </div>

        {/* Nav Menu and Actions */}
        <div
          className={`invisible h-0 w-full items-center justify-between xl:visible xl:flex xl:h-auto xl:w-full ${
            navigationOpen &&
            "navbar visible mt-4 h-auto max-h-[400px] rounded-md bg-white p-7.5 shadow-lg dark:bg-gray-800 xl:p-0 xl:shadow-none xl:dark:bg-transparent"
          }`}
        >
          <nav>
            <ul className="flex flex-col gap-5 xl:flex-row xl:items-center xl:gap-10">
              {menuData.map((menuItem) => (
                <li key={menuItem.id} className="group relative">
                  {menuItem.submenu ? (
                    <>
                      <div className="flex items-center gap-2">
                        <Link
                          href={menuItem.path} // path is required
                          className={`text-gray-700 dark:text-gray-300 hover:text-primary font-medium ${
                            pathUrl === menuItem.path ? "text-primary" : ""
                          }`}
                          onClick={() => {
                            setNavigationOpen(false);
                            setOpenDropdown(null);
                          }}
                        >
                          {menuItem.title}
                        </Link>
                        <button
                          onClick={() => toggleDropdown(menuItem.id)}
                          aria-expanded={openDropdown === menuItem.id}
                          aria-controls={`dropdown-${menuItem.id}`}
                          className="flex items-center"
                        >
                          <ChevronDown
                            className={`h-3 w-3 text-gray-500 dark:text-gray-300 group-hover:text-primary transition-transform duration-300 ${
                              openDropdown === menuItem.id ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>
                      <AnimatePresence>
                        {(openDropdown === menuItem.id || (navigationOpen && openDropdown === menuItem.id)) && (
                          <motion.ul
                            id={`dropdown-${menuItem.id}`}
                            variants={dropdownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="dropdown absolute left-0 mt-2 w-48 rounded-lg bg-white shadow-lg dark:bg-gray-800 xl:z-10 xl:group-hover:flex xl:flex-col"
                          >
                            {menuItem.submenu.map((item) => (
                              <li key={item.id} className="hover:text-primary">
                                <Link
                                  href={item.path} // path is required
                                  className={`block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-primary/10 hover:text-primary transition-colors ${
                                    pathUrl === item.path ? "text-primary" : ""
                                  }`}
                                  onClick={() => {
                                    setNavigationOpen(false);
                                    setOpenDropdown(null);
                                  }}
                                >
                                  {item.title}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={menuItem.path} // path is required
                      className={`text-gray-700 dark:text-gray-300 hover:text-primary font-medium ${
                        pathUrl === menuItem.path ? "text-primary" : ""
                      }`}
                      onClick={() => setNavigationOpen(false)}
                    >
                      {menuItem.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-7 flex items-center gap-6 xl:mt-0">
            <ThemeToggler />
            <Link
              href="https://app.ostutelage.tech/portal/signin.php"
              className="text-regular font-medium text-gray-500 dark:text-gray-300 hover:text-primary"
            >
              Login
            </Link>
            <Link
              href="https://app.ostutelage.tech/portal/signup.php"
              className="flex items-center justify-center rounded-full bg-primary px-7.5 py-2.5 text-regular text-white font-medium hover:bg-primary/90 transition duration-300"
            >
              <svg
                className="mr-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
              Apply
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;