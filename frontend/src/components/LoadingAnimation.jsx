import React from "react";
import { motion } from "framer-motion";

const LoadingAnimation = ({ text = "Processing", size = "medium" }) => {
  // Size configurations
  const sizes = {
    small: {
      containerSize: "w-6 h-6",
      textClass: "text-sm mt-2",
      circleSize: 3,
    },
    medium: {
      containerSize: "w-12 h-12",
      textClass: "text-base mt-3",
      circleSize: 5,
    },
    large: {
      containerSize: "w-16 h-16",
      textClass: "text-lg mt-4",
      circleSize: 7,
    },
  };

  const currentSize = sizes[size] || sizes.medium;

  // Circle variants for animation
  const circleVariants = {
    initial: { opacity: 0, y: 0 },
    animate: (i) => ({
      opacity: [0.5, 1, 0.5],
      y: [0, -10, 0],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        delay: i * 0.2,
      },
    }),
  };

  // Brain pulse animation for VQA concept
  const brainVariants = {
    initial: { scale: 1, opacity: 0.7 },
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Text animation
  const textVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.5,
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        {/* Brain icon (represents visual reasoning) */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          variants={brainVariants}
          initial="initial"
          animate="animate"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${currentSize.containerSize} text-primary-600 dark:text-primary-400`}
          >
            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
            <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
          </svg>
        </motion.div>

        {/* Three circle indicators showing activity */}
        <div
          className={`flex items-center justify-center space-x-2 ${currentSize.containerSize}`}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              custom={i}
              variants={circleVariants}
              initial="initial"
              animate="animate"
              className={`w-${currentSize.circleSize} h-${currentSize.circleSize} bg-primary-600 dark:bg-primary-400 rounded-full`}
            />
          ))}
        </div>
      </div>

      {/* Loading text */}
      <motion.div
        variants={textVariants}
        initial="initial"
        animate="animate"
        className={`${currentSize.textClass} text-gray-700 dark:text-gray-300`}
      >
        {text}
      </motion.div>
    </div>
  );
};

export default LoadingAnimation;
