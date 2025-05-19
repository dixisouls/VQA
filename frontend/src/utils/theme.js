/**
 * Theme utility functions for handling dark/light mode
 */

/**
 * Initialize theme based on user preferences or saved theme
 * @returns {boolean} True if dark mode is active
 */
export const initializeTheme = () => {
  // Check for saved theme preference
  const savedTheme = localStorage.getItem("vizwiz-theme");

  // If no saved preference, use system preference
  if (!savedTheme) {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setTheme(prefersDark ? "dark" : "light");
    return prefersDark;
  }

  // Apply saved theme
  const isDark = savedTheme === "dark";
  setTheme(isDark ? "dark" : "light");
  return isDark;
};

/**
 * Toggle theme between dark and light mode
 * @param {boolean} isDark - Current theme state
 * @returns {boolean} New theme state
 */
export const toggleTheme = (isDark) => {
  const newTheme = isDark ? "light" : "dark";
  setTheme(newTheme);
  return !isDark;
};

/**
 * Set theme in both localStorage and HTML element
 * @param {string} theme - 'dark' or 'light'
 */
const setTheme = (theme) => {
  // Save to localStorage
  localStorage.setItem("vizwiz-theme", theme);

  // Apply to HTML element
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

/**
 * Listen for system theme changes
 * @param {Function} callback - Function to call when system theme changes
 * @returns {Function} Cleanup function
 */
export const listenForThemeChanges = (callback) => {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  // Newer browsers
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener("change", callback);
    return () => mediaQuery.removeEventListener("change", callback);
  }

  // Older browsers
  mediaQuery.addListener(callback);
  return () => mediaQuery.removeListener(callback);
};

export default {
  initializeTheme,
  toggleTheme,
  listenForThemeChanges,
};
