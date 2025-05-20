import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import ModelVisualization from "../components/ModelVisualization";

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const architectureRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: false, amount: 0.5 });
  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.3 });
  const isArchitectureInView = useInView(architectureRef, {
    once: true,
    amount: 0.2,
  });

  // Update mouse position for Hero section parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Animation variants
  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  const featureCardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  // Calculate parallax values for Hero section
  const calculateParallax = (offsetFactor = 1) => {
    if (!heroRef.current) return { x: 0, y: 0 };

    const rect = heroRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const offsetX = ((mousePosition.x - centerX) / 50) * offsetFactor;
    const offsetY = ((mousePosition.y - centerY) / 50) * offsetFactor;

    return { x: offsetX, y: offsetY };
  };

  // Features data
  const features = [
    {
      icon: (
        <svg
          className="w-8 h-8 text-brand-500 dark:text-brand-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
      title: "Advanced Visual Analysis",
      description:
        "Our model identifies objects, text, colors, and spatial relationships in images with high accuracy.",
      color: "from-blue-500 to-cyan-400",
    },
    {
      icon: (
        <svg
          className="w-8 h-8 text-accent-500 dark:text-accent-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Natural Language Understanding",
      description:
        "Ask questions in natural language and receive clear, concise answers about image content.",
      color: "from-violet-500 to-purple-400",
    },
    {
      icon: (
        <svg
          className="w-8 h-8 text-tertiary-500 dark:text-tertiary-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Confidence Metrics",
      description:
        "Get transparency with confidence scores and learn if a question is answerable from the image.",
      color: "from-rose-500 to-pink-400",
    },
    {
      icon: (
        <svg
          className="w-8 h-8 text-emerald-500 dark:text-emerald-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      title: "State-of-the-Art Models",
      description:
        "Leveraging Vision Transformer (ViT) and BERT for cutting-edge performance in multimodal learning.",
      color: "from-emerald-500 to-teal-400",
    },
    {
      icon: (
        <svg
          className="w-8 h-8 text-amber-500 dark:text-amber-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
          />
        </svg>
      ),
      title: "VizWiz Dataset",
      description:
        "Trained on real-world images and questions from visually impaired individuals for practical applications.",
      color: "from-amber-500 to-yellow-400",
    },
    {
      icon: (
        <svg
          className="w-8 h-8 text-orange-500 dark:text-orange-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
      ),
      title: "Interactive Experience",
      description:
        "Ask multiple questions about the same image and track your query history with an intuitive interface.",
      color: "from-orange-500 to-red-400",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center overflow-hidden px-4 py-20 md:py-32"
      >
        {/* Animated background blobs */}
        <div className="absolute inset-0 -z-10">
          <div
            className="blob absolute w-96 h-96 bg-gradient-to-r from-brand-300/20 to-brand-500/20 dark:from-brand-500/20 dark:to-brand-700/20 rounded-full top-1/4 -left-48"
            style={{
              filter: "blur(70px)",
              transform: isHeroInView
                ? "translate(0, 0) scale(1)"
                : "translate(-50px, 50px) scale(0.8)",
            }}
          />
          <div
            className="blob absolute w-96 h-96 bg-gradient-to-r from-accent-300/20 to-accent-500/20 dark:from-accent-500/20 dark:to-accent-700/20 rounded-full bottom-1/4 -right-48"
            style={{
              filter: "blur(70px)",
              transform: isHeroInView
                ? "translate(0, 0) scale(1)"
                : "translate(50px, -50px) scale(0.8)",
            }}
          />
        </div>

        <div className="container mx-auto">
          <motion.div
            className="max-w-4xl mx-auto text-center relative z-10"
            variants={heroVariants}
            initial="hidden"
            animate={isHeroInView ? "visible" : "hidden"}
          >
            <motion.div
              variants={textVariants}
              className="mb-4 inline-block rounded-full px-3 py-1 text-sm font-medium bg-brand-100 text-brand-800 dark:bg-brand-900/30 dark:text-brand-300"
            >
              Visual Question Answering
            </motion.div>
            <motion.h1
              className="text-4xl md:text-6xl xl:text-7xl font-display font-bold mb-6 tracking-tight"
              variants={textVariants}
            >
              <span className="gradient-text">Intelligent</span>{" "}
              <span className="block md:inline">Visual Analysis</span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-surface-600 dark:text-surface-300 mb-8 max-w-3xl mx-auto"
              variants={textVariants}
            >
              Ask natural questions about images and get AI-powered answers
              using our state-of-the-art visual reasoning system.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
              variants={textVariants}
            >
              <Link
                to="/inference"
                className="btn btn-primary text-base md:text-lg px-8 py-3 rounded-xl shadow-lg shadow-brand-500/20 dark:shadow-brand-500/10 hover:shadow-xl hover:shadow-brand-500/30 dark:hover:shadow-brand-500/20 transition-all"
              >
                Try It Now
              </Link>
              <a
                href="https://github.com/dixisouls/vizwiz-vqa-api"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline text-base md:text-lg px-8 py-3 rounded-xl flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                View on GitHub
              </a>
            </motion.div>

            {/* Floating illustration */}
            <motion.div
              className="mt-16 relative w-full"
              variants={textVariants}
              style={{
                transform: `translate(${calculateParallax().x}px, ${
                  calculateParallax().y
                }px)`,
              }}
            >
              <div className="relative max-w-2xl mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-500/20 to-accent-500/20 rounded-xl blur-xl transform -rotate-3 scale-105"></div>
                <div className="card-glass p-6 rounded-xl border border-white/20 dark:border-white/10 backdrop-blur-xl relative">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 overflow-hidden rounded-lg w-1/3">
                      <img
                        src="https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                        alt="Example landscape"
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="p-3 bg-white/80 dark:bg-surface-800/80 rounded-lg backdrop-blur-sm">
                        <span className="font-medium text-surface-800 dark:text-white">
                          Q: What time of day is shown in this image?
                        </span>
                      </div>
                      <div className="p-3 bg-brand-50/80 dark:bg-brand-900/30 rounded-lg backdrop-blur-sm border-l-4 border-brand-500">
                        <span className="font-medium text-brand-800 dark:text-brand-200">
                          A: This appears to be sunset or golden hour.
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-2 text-sm text-surface-500 dark:text-surface-400">
                        <div className="flex items-center">
                          <div className="w-full h-1.5 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-brand-500 to-brand-600 w-4/5 rounded-full"></div>
                          </div>
                          <span className="ml-2">80% confident</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-accent-500/80 dark:bg-accent-600/80 rounded-full blur-lg animate-pulse-subtle"></div>
                <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-brand-500/80 dark:bg-brand-600/80 rounded-full blur-lg animate-pulse-subtle"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={featuresRef}
        className="py-20 bg-gradient-to-b from-white to-surface-50 dark:from-surface-900 dark:to-surface-950 relative overflow-hidden"
      >
        <div className="absolute inset-0 dot-bg opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={
                isFeaturesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6 }}
              className="mb-3 inline-block rounded-full px-3 py-1 text-sm font-medium bg-accent-100 text-accent-800 dark:bg-accent-900/30 dark:text-accent-300"
            >
              Capabilities
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={
                isFeaturesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl font-display font-bold mb-6"
            >
              Advanced Features
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={
                isFeaturesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-surface-600 dark:text-surface-300"
            >
              Our visual question answering system combines computer vision and
              natural language processing to extract meaningful information from
              images.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="card card-hover p-6 relative overflow-hidden group"
                variants={featureCardVariants}
                initial="hidden"
                animate={isFeaturesInView ? "visible" : "hidden"}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 },
                }}
              >
                <div
                  className="absolute inset-0 bg-gradient-to-br dark:opacity-10 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-500 -z-10 rounded-xl"
                  style={{
                    background: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                    "--tw-gradient-from": feature.color
                      .split(" ")[0]
                      .split("-")[1],
                    "--tw-gradient-to": feature.color
                      .split(" ")[1]
                      .split("-")[1],
                  }}
                ></div>

                <div className="relative">
                  <div
                    className="absolute -inset-1 bg-gradient-to-r rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 -z-10"
                    style={{
                      background: `linear-gradient(to right, var(--tw-gradient-stops))`,
                      "--tw-gradient-from": feature.color
                        .split(" ")[0]
                        .split("-")[1],
                      "--tw-gradient-to": feature.color
                        .split(" ")[1]
                        .split("-")[1],
                    }}
                  ></div>
                  <div className="relative p-2 bg-white dark:bg-surface-800 rounded-lg w-14 h-14 flex items-center justify-center">
                    {feature.icon}
                  </div>
                </div>

                <h3 className="mt-5 text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-surface-600 dark:text-surface-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Model Architecture Section */}
      <section
        ref={architectureRef}
        className="py-20 bg-surface-50 dark:bg-surface-900 relative overflow-hidden"
      >
        <div className="absolute inset-0 mesh-bg opacity-40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={
                isArchitectureInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6 }}
              className="mb-3 inline-block rounded-full px-3 py-1 text-sm font-medium bg-brand-100 text-brand-800 dark:bg-brand-900/30 dark:text-brand-300"
            >
              Technology
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={
                isArchitectureInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl font-display font-bold mb-6"
            >
              Model Architecture
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={
                isArchitectureInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-surface-600 dark:text-surface-300"
            >
              Our visual question answering model combines vision and language
              understanding for accurate and reliable results.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={
              isArchitectureInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <ModelVisualization />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-brand-500 to-accent-600 dark:from-brand-600 dark:to-accent-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 dot-bg opacity-10"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.05" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="3"/%3E%3Ccircle cx="13" cy="13" r="3"/%3E%3C/g%3E%3C/svg%3E")',
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg md:text-xl mb-8 text-white/80">
              Upload an image and ask questions to experience the power of
              visual question answering.
            </p>

            <Link
              to="/inference"
              className="inline-block px-8 py-4 text-lg font-medium bg-white text-brand-600 hover:text-brand-700 rounded-xl shadow-xl shadow-brand-700/20 hover:shadow-2xl hover:shadow-brand-700/30 transition-all"
            >
              Try VizWiz Now
            </Link>

            <p className="mt-6 text-sm text-white/60">
              No sign-up required. Completely free to use.
            </p>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
      </section>
    </div>
  );
};

export default Home;
