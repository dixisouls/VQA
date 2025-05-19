import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <motion.div
        className="max-w-lg w-full text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <svg
            className="w-32 h-32 mx-auto text-primary-600 dark:text-primary-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl font-bold mb-4 text-gray-900 dark:text-white"
        >
          404 - Page Not Found
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl mb-8 text-gray-700 dark:text-gray-300"
        >
          Oops! We couldn't find the page you're looking for.
        </motion.p>

        <motion.div variants={itemVariants} className="space-y-4">
          <Link to="/" className="inline-block btn btn-primary px-8 py-3">
            Return Home
          </Link>

          <p className="text-gray-600 dark:text-gray-400">
            or try the{" "}
            <Link
              to="/inference"
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              Inference Page
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
