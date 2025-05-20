import React, { createContext, useContext } from "react";

// Create the context with only dark mode
const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {}, // Placeholder function (won't be used)
});

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Fixed theme value - always dark
  const theme = "dark";

  // Dummy toggle function (not functional since we're always in dark mode)
  const toggleTheme = () => {
    console.log("Theme switching disabled - app is in dark-mode only");
  };

  // Provide the theme context to children
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
