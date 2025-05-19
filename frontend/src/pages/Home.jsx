import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ModelArchitecture from "../components/ModelArchitecture";

const Home = () => {
  // Scroll to top on component mount
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 pattern-dots-md opacity-10 dark:opacity-5"></div>
        <div className="container px-4 mx-auto relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="text-primary-600 dark:text-primary-400">
                VizWiz
              </span>{" "}
              Visual Question Answering
            </motion.h1>

            <motion.p
              className="text-xl text-gray-700 dark:text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Ask questions about images and get intelligent answers using our
              state-of-the-art vision-language model trained on the VizWiz
              dataset.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Link
                to="/inference"
                className="btn btn-primary px-8 py-3 text-lg"
              >
                Try It Now
              </Link>
              <a
                href="https://github.com/dixisouls/VQA"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary px-8 py-3 text-lg"
              >
                View on GitHub
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container px-4 mx-auto">
          <motion.div
            className="max-w-4xl mx-auto text-center mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2
              className="text-3xl font-bold mb-4 text-gray-900 dark:text-white"
              variants={itemVariants}
            >
              Key Features
            </motion.h2>
            <motion.p
              className="text-xl text-gray-700 dark:text-gray-300"
              variants={itemVariants}
            >
              Our visual question answering system combines computer vision and
              natural language processing to help you extract meaningful
              information from images.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* Feature 1 */}
            <motion.div
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md"
              variants={itemVariants}
            >
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary-600 dark:text-primary-400"
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
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Intelligent Visual Analysis
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Our model can recognize objects, read text, identify colors, and
                understand spatial relationships in images.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md"
              variants={itemVariants}
            >
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary-600 dark:text-primary-400"
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
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Natural Language Understanding
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Ask questions in natural language and receive clear, concise
                answers based on the image content.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md"
              variants={itemVariants}
            >
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary-600 dark:text-primary-400"
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
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Confidence Scores
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Get transparency with confidence scores for each answer and
                learn if a question is answerable from the image.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Model Architecture Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 mx-auto">
          <motion.div
            className="max-w-4xl mx-auto text-center mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2
              className="text-3xl font-bold mb-4 text-gray-900 dark:text-white"
              variants={itemVariants}
            >
              Model Architecture
            </motion.h2>
            <motion.p
              className="text-xl text-gray-700 dark:text-gray-300"
              variants={itemVariants}
            >
              Our visual question answering model combines vision and language
              understanding for accurate and reliable results.
            </motion.p>
          </motion.div>

          <ModelArchitecture />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 dark:bg-primary-900">
        <div className="container px-4 mx-auto">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6 text-white">
              Ready to get started?
            </h2>
            <p className="text-xl mb-8 text-primary-100">
              Upload an image and ask questions to experience the power of
              visual question answering.
            </p>

            <Link
              to="/inference"
              className="inline-block px-8 py-3 text-lg font-medium bg-white text-primary-700 rounded-lg hover:bg-primary-50 transition-colors"
            >
              Try VizWiz Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
