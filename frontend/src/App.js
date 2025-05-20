import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Inference from "./pages/Inference";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import ParticleBg from "./components/ParticleBg";
import "./App.css";

// Page transition wrapper
const PageTransitionWrapper = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage("fadeOut");
    }
  }, [location, displayLocation]);

  const handleAnimationEnd = () => {
    if (transitionStage === "fadeOut") {
      setTransitionStage("fadeIn");
      setDisplayLocation(location);
    }
  };

  return (
    <div
      className={`page-transition ${transitionStage}`}
      onAnimationEnd={handleAnimationEnd}
    >
      {children}
    </div>
  );
};

function App() {
  // Force dark mode
  useEffect(() => {
    // Always apply dark mode - remove any light mode classes
    document.documentElement.classList.add("dark");
    // Remove this line if you ever want to revert to allowing light mode
    document.documentElement.classList.remove("light");
  }, []);

  return (
    <Router>
      <div className="app min-h-screen flex flex-col dark">
        <Navbar />
        <ParticleBg />
        <main className="flex-1 relative z-10 pt-20">
          <AnimatePresence mode="wait">
            <Routes>
              <Route
                path="/"
                element={
                  <PageTransitionWrapper>
                    <Home />
                  </PageTransitionWrapper>
                }
              />
              <Route
                path="/inference"
                element={
                  <PageTransitionWrapper>
                    <Inference />
                  </PageTransitionWrapper>
                }
              />
              <Route
                path="/about"
                element={
                  <PageTransitionWrapper>
                    <About />
                  </PageTransitionWrapper>
                }
              />
              <Route
                path="*"
                element={
                  <PageTransitionWrapper>
                    <NotFound />
                  </PageTransitionWrapper>
                }
              />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
