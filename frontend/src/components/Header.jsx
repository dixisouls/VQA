import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navigation links
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Inference", path: "/inference" },
    { name: "About", path: "/about" },
  ];

  // Check if a link is active
  const isActive = (path) => location.pathname === path;

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="relative z-10 shadow-md bg-white dark:bg-gray-800">
      <div className="container flex items-center justify-between px-4 py-4 mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 5, 0, -5, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
            className="mr-3 text-2xl font-bold text-primary-600 dark:text-primary-400"
          >
            VizWiz
          </motion.div>
          <span className="text-xl font-semibold text-gray-800 dark:text-white">
            Visual QA
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative px-1 py-2 transition-colors ${
                isActive(link.path)
                  ? "text-primary-600 dark:text-primary-400"
                  : "text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
              }`}
            >
              {link.name}
              {isActive(link.path) && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 dark:bg-primary-400"
                  initial={false}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="p-2 text-gray-700 rounded-md dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: mobileMenuOpen ? "auto" : 0,
          opacity: mobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden md:hidden"
      >
        <nav className="flex flex-col px-4 pt-2 pb-4 space-y-2 bg-white dark:bg-gray-800">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-4 py-2 rounded-md ${
                isActive(link.path)
                  ? "bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </motion.div>
    </header>
  );
};

export default Header;
