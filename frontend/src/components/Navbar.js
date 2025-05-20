import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme(); // We'll still get theme but won't toggle it
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Navigation links
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Inference", path: "/inference" },
    { name: "About", path: "/about" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface-900/90 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-2xl font-display font-bold gradient-text">
                VizWiz
              </span>
              <span className="ml-2 text-xl text-surface-300">Visual QA</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  location.pathname === link.path
                    ? "text-brand-400"
                    : "text-surface-300 hover:text-brand-400 hover:bg-surface-800"
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-400 mx-3"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="block md:hidden p-2 text-surface-300"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <motion.span
                className="w-full h-0.5 bg-current rounded-full"
                animate={{
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 8 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-full h-0.5 bg-current rounded-full"
                animate={{
                  opacity: isOpen ? 0 : 1,
                  x: isOpen ? -10 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-full h-0.5 bg-current rounded-full"
                animate={{
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? -8 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-4 py-3 mt-3 bg-surface-900/90 backdrop-blur-md">
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-2 rounded-lg ${
                      location.pathname === link.path
                        ? "bg-brand-900/40 text-brand-400"
                        : "text-surface-300 hover:bg-surface-800"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
