/**
 * Animation presets for consistent animations across the app
 */

// Basic fade animation variants
export const fadeAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

// Slide up animation variants
export const slideUpAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

// Scale animation variants
export const scaleAnimation = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } },
};

// Container with staggered children animation
export const containerAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

// Child item animation for use with containerAnimation
export const itemAnimation = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
  exit: { opacity: 0, y: 10, transition: { duration: 0.3 } },
};

// Hover and tap animations for buttons
export const buttonAnimation = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

// Page transition animation
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

// Bounce animation for attention-grabbing elements
export const bounceAnimation = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: [0.8, 1.1, 1],
    transition: { duration: 0.6, times: [0, 0.7, 1] },
  },
};

// Progress bar animation
export const progressAnimation = (progress) => ({
  initial: { width: 0 },
  animate: {
    width: `${progress}%`,
    transition: { duration: 0.8, ease: "easeOut" },
  },
});

// Pulse animation for loading indicators
export const pulseAnimation = {
  initial: { scale: 1, opacity: 1 },
  animate: {
    scale: [1, 1.1, 1],
    opacity: [1, 0.7, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default {
  fadeAnimation,
  slideUpAnimation,
  scaleAnimation,
  containerAnimation,
  itemAnimation,
  buttonAnimation,
  pageTransition,
  bounceAnimation,
  progressAnimation,
  pulseAnimation,
};
