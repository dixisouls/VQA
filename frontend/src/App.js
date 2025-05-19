import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Inference from "./pages/Inference";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { initializeTheme, listenForThemeChanges } from "./utils/theme";
import "./App.css";

function App() {
  // State for dark mode toggle
  const [darkMode, setDarkMode] = useState(false);

  // Initialize theme on component mount
  useEffect(() => {
    const isDark = initializeTheme();
    setDarkMode(isDark);

    // Listen for system theme changes
    const cleanup = listenForThemeChanges((e) => {
      if (!localStorage.getItem("vizwiz-theme")) {
        setDarkMode(e.matches);
        document.documentElement.classList.toggle("dark", e.matches);
      }
    });

    return cleanup;
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);

    // Apply theme
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("vizwiz-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("vizwiz-theme", "light");
    }
  };

  return (
    <Router>
      <div className={`min-h-screen flex flex-col ${darkMode ? "dark" : ""}`}>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/inference" element={<Inference />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
