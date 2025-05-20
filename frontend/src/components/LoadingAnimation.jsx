import React from "react";
import { motion } from "framer-motion";

const LoadingAnimation = ({
  size = "medium",
  text = "Loading",
  theme = "brand",
}) => {
  // Size configurations
  const sizes = {
    small: {
      outer: "w-16 h-16",
      inner: "w-10 h-10",
      text: "text-sm mt-2",
      stroke: 1.5,
    },
    medium: {
      outer: "w-24 h-24",
      inner: "w-16 h-16",
      text: "text-base mt-3",
      stroke: 2,
    },
    large: {
      outer: "w-32 h-32",
      inner: "w-20 h-20",
      text: "text-lg mt-4",
      stroke: 2.5,
    },
  };

  // Theme configurations
  const themes = {
    brand: {
      outer: "text-brand-500 dark:text-brand-400",
      inner: "text-brand-400 dark:text-brand-500",
      text: "text-brand-600 dark:text-brand-400",
      gradient: "from-brand-400 to-brand-600",
    },
    accent: {
      outer: "text-accent-500 dark:text-accent-400",
      inner: "text-accent-400 dark:text-accent-500",
      text: "text-accent-600 dark:text-accent-400",
      gradient: "from-accent-400 to-accent-600",
    },
    tertiary: {
      outer: "text-tertiary-500 dark:text-tertiary-400",
      inner: "text-tertiary-400 dark:text-tertiary-500",
      text: "text-tertiary-600 dark:text-tertiary-400",
      gradient: "from-tertiary-400 to-tertiary-600",
    },
    neutral: {
      outer: "text-surface-500 dark:text-surface-400",
      inner: "text-surface-400 dark:text-surface-500",
      text: "text-surface-600 dark:text-surface-400",
      gradient: "from-surface-400 to-surface-600",
    },
  };

  const sizeConfig = sizes[size] || sizes.medium;
  const themeConfig = themes[theme] || themes.brand;

  return (
    <div className="flex flex-col items-center justify-center">
      {/* AI-themed loading animation - resembles a processing brain */}
      <div className="relative">
        {/* Animated background glow */}
        <motion.div
          className={`absolute inset-0 rounded-full bg-gradient-to-r ${themeConfig.gradient} blur-xl opacity-20`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Outer rotating circle */}
        <div className={`relative ${sizeConfig.outer}`}>
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Circular track */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth={sizeConfig.stroke}
              strokeOpacity="0.1"
              strokeDasharray="1,3"
              strokeLinecap="round"
            />

            {/* Rotating segment */}
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth={sizeConfig.stroke}
              strokeLinecap="round"
              strokeDasharray="60 200"
              initial={{ rotate: 0, strokeDashoffset: 0 }}
              animate={{
                rotate: 360,
                strokeDashoffset: [0, 100, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ transformOrigin: "center" }}
              className={themeConfig.outer}
            />

            {/* Counter-rotating segment */}
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth={sizeConfig.stroke}
              strokeLinecap="round"
              strokeDasharray="40 220"
              initial={{ rotate: 0 }}
              animate={{ rotate: -360 }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ transformOrigin: "center" }}
              className={themeConfig.outer}
            />
          </svg>

          {/* Inner neural network visualization */}
          <div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${sizeConfig.inner}`}
          >
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Central node */}
              <motion.circle
                cx="50"
                cy="50"
                r="8"
                fill="currentColor"
                animate={{
                  r: [8, 10, 8],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className={themeConfig.inner}
              />

              {/* Neural connections */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                const x2 = 50 + 35 * Math.cos((angle * Math.PI) / 180);
                const y2 = 50 + 35 * Math.sin((angle * Math.PI) / 180);
                return (
                  <React.Fragment key={i}>
                    {/* Connection line */}
                    <motion.line
                      x1="50"
                      y1="50"
                      x2={x2}
                      y2={y2}
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeOpacity="0.5"
                      animate={{
                        strokeOpacity: [0.2, 0.8, 0.2],
                      }}
                      transition={{
                        duration: 1.5 + i * 0.2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                      className={themeConfig.inner}
                    />

                    {/* Outer node */}
                    <motion.circle
                      cx={x2}
                      cy={y2}
                      r="3"
                      fill="currentColor"
                      animate={{
                        r: [3, 4, 3],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1 + i * 0.15,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: i * 0.05,
                      }}
                      className={themeConfig.inner}
                    />
                  </React.Fragment>
                );
              })}

              {/* Data pulse animation */}
              {[0, 90, 180, 270].map((angle, i) => {
                const path = `M 50 50 L ${
                  50 + 35 * Math.cos((angle * Math.PI) / 180)
                } ${50 + 35 * Math.sin((angle * Math.PI) / 180)}`;
                return (
                  <motion.circle
                    key={`pulse-${i}`}
                    cx="50"
                    cy="50"
                    r="2"
                    fill="currentColor"
                    className={themeConfig.inner}
                    animate={{
                      cx: [50, 50 + 35 * Math.cos((angle * Math.PI) / 180)],
                      cy: [50, 50 + 35 * Math.sin((angle * Math.PI) / 180)],
                      opacity: [1, 0],
                      r: [2, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.75,
                      ease: "easeOut",
                    }}
                  />
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* Text */}
      {text && (
        <motion.div
          className={`${sizeConfig.text} font-medium ${themeConfig.text}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center">
            <span>{text}</span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="ml-1"
            >
              .
            </motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              className="ml-0.5"
            >
              .
            </motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
              className="ml-0.5"
            >
              .
            </motion.span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default LoadingAnimation;
