import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotFound = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  // Generate random stars for the space background
  const stars = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    opacity: Math.random() * 0.7 + 0.3,
    animationDuration: Math.random() * 3 + 2,
  }));

  return (
    <div className="min-h-screen bg-surface-900 dark:bg-surface-950 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Star background */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${star.x}%`,
              top: `${star.y}%`,
              opacity: star.opacity,
            }}
            animate={{
              opacity: [star.opacity, star.opacity * 1.5, star.opacity],
            }}
            transition={{
              duration: star.animationDuration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Floating gradients */}
      <div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-brand-500/20 dark:bg-brand-600/10 blur-3xl"
        style={{
          animation: "float 15s ease-in-out infinite alternate",
        }}
      ></div>
      <div
        className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-accent-500/20 dark:bg-accent-600/10 blur-3xl"
        style={{
          animation: "float 20s ease-in-out infinite alternate-reverse",
        }}
      ></div>

      <motion.div
        className="max-w-xl w-full relative z-10 bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <div className="text-9xl font-bold text-white opacity-10">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-32 h-32 text-brand-500"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.9 19.2L3.5 12.8C2.8 12.1 2.8 11 3.5 10.3L10.3 3.5C11 2.8 12.1 2.8 12.8 3.5L19.6 10.3C20.3 11 20.3 12.1 19.6 12.8L13.2 19.2C12.1 20.3 11 20.3 9.9 19.2Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.4999 10.5H13.5099"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.4999 10.5H10.5099"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.99 16C11.99 16 13.5 14.5 13.5 13.5C13.5 12.5 12.99 12 11.99 12C10.99 12 10.49 12.5 10.49 13.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl font-display font-bold mb-4 text-center text-white"
        >
          Page Not Found
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl mb-8 text-center text-surface-200"
        >
          The page you're looking for has been lost in the digital void.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <Link
            to="/"
            className="btn btn-primary px-8 py-3 w-full sm:w-auto text-center"
          >
            Return Home
          </Link>

          <Link
            to="/inference"
            className="btn btn-outline text-white border-white/20 hover:bg-white/10 w-full sm:w-auto text-center"
          >
            Try Visual QA
          </Link>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-12 text-center">
          <div className="text-surface-400 text-sm">
            Need help? Try one of these links:
          </div>
          <div className="flex justify-center space-x-8 mt-3">
            <Link
              to="/"
              className="text-brand-400 hover:text-brand-300 transition-colors text-sm"
            >
              Home
            </Link>
            <Link
              to="/inference"
              className="text-brand-400 hover:text-brand-300 transition-colors text-sm"
            >
              Inference
            </Link>
            <Link
              to="/about"
              className="text-brand-400 hover:text-brand-300 transition-colors text-sm"
            >
              About
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating elements */}
      <motion.div
        className="absolute w-6 h-6 rounded-full bg-brand-500/50 dark:bg-brand-400/30 blur-sm"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -30, 20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{ top: "30%", right: "20%" }}
      />
      <motion.div
        className="absolute w-4 h-4 rounded-full bg-accent-500/50 dark:bg-accent-400/30 blur-sm"
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 40, -20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{ bottom: "25%", left: "15%" }}
      />
      <motion.div
        className="absolute w-10 h-10 rounded-full bg-tertiary-500/30 dark:bg-tertiary-400/20 blur-sm"
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -50, 30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{ top: "60%", left: "30%" }}
      />
    </div>
  );
};

export default NotFound;
