import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const About = () => {
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container px-4 mx-auto">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white"
            variants={itemVariants}
          >
            About VizWiz Visual QA
          </motion.h1>

          {/* Project Description */}
          <motion.section
            className="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
              Project Overview
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              VizWiz Visual QA is a cutting-edge application designed to answer
              natural language questions about images. Using a powerful
              combination of computer vision and natural language processing
              models, our system can understand both the visual content of
              images and the linguistic nuances of questions.
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              This application was built to demonstrate the capabilities of
              modern vision-language models and to provide a practical tool for
              image understanding. It leverages state-of-the-art deep learning
              architectures including Vision Transformer (ViT) for image
              encoding and BERT for text processing.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              The model has been trained on the VizWiz dataset, which contains
              images taken by visually impaired people along with natural
              questions about these images. This makes our system particularly
              well-suited for assisting with visual understanding tasks.
            </p>
          </motion.section>

          {/* How It Works */}
          <motion.section
            className="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
              How It Works
            </h2>

            <div className="space-y-6">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-16 flex-shrink-0 flex items-center justify-center mb-4 md:mb-0">
                  <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-lg">
                    1
                  </div>
                </div>
                <div className="md:ml-6">
                  <h3 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">
                    Image Processing
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    When you upload an image, it's processed by our Vision
                    Transformer (ViT) model, which extracts rich visual features
                    by analyzing the image as a sequence of patches. These
                    features capture objects, their attributes, spatial
                    relationships, and more.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row">
                <div className="md:w-16 flex-shrink-0 flex items-center justify-center mb-4 md:mb-0">
                  <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-lg">
                    2
                  </div>
                </div>
                <div className="md:ml-6">
                  <h3 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">
                    Question Analysis
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Your question is processed by a BERT language model, which
                    understands the intent and nuances of your query. The model
                    parses the question to identify what information you're
                    looking for in the image.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row">
                <div className="md:w-16 flex-shrink-0 flex items-center justify-center mb-4 md:mb-0">
                  <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-lg">
                    3
                  </div>
                </div>
                <div className="md:ml-6">
                  <h3 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">
                    Multimodal Fusion
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    The system combines the image and question representations
                    through a sophisticated fusion mechanism, creating a joint
                    understanding of both the visual content and the question.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row">
                <div className="md:w-16 flex-shrink-0 flex items-center justify-center mb-4 md:mb-0">
                  <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-lg">
                    4
                  </div>
                </div>
                <div className="md:ml-6">
                  <h3 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">
                    Answer Generation
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Based on the fused understanding, the model generates an
                    answer to your question and determines whether the question
                    can be answered from the image. It also provides confidence
                    scores that indicate how certain the model is about its
                    predictions.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Technical Details */}
          <motion.section
            className="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
              Technical Details
            </h2>

            <div className="mb-6">
              <h3 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">
                Architecture
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>Vision Encoder:</strong> Vision Transformer (ViT) from
                  Google's ViT-Base-Patch16-384 model
                </li>
                <li>
                  <strong>Text Encoder:</strong> BERT (Bidirectional Encoder
                  Representations from Transformers)
                </li>
                <li>
                  <strong>Fusion Mechanism:</strong> Cross-modal attention and
                  concatenation with multi-layer perceptron
                </li>
                <li>
                  <strong>Output Heads:</strong> Two specialized classifiers for
                  answer prediction and answerability determination
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">
                Dataset
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                The model was trained on the VizWiz dataset, which contains:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  Over 20,000 images captured by visually impaired individuals
                </li>
                <li>Natural, conversational questions about these images</li>
                <li>Multiple human-provided answers for each question</li>
                <li>Annotations indicating whether questions are answerable</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">
                Performance
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Our model achieves strong performance on various visual question
                answering benchmarks:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>High accuracy on answerable questions</li>
                <li>Reliable detection of unanswerable questions</li>
                <li>
                  Good generalization to real-world images and natural questions
                </li>
                <li>Fast inference times suitable for interactive use</li>
              </ul>
            </div>
          </motion.section>

          {/* Team */}
          <motion.section
            className="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
              Team
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              This project was developed by{" "}
              <a
                href="https://github.com/dixisouls"
                className="text-primary-600 dark:text-primary-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                dixisouls
              </a>
              , a researcher and developer passionate about AI, computer vision,
              and natural language processing.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              This work builds upon research from the broader visual question
              answering community, including significant contributions from
              academia and industry in vision-language models, multimodal
              fusion, and assistive technologies.
            </p>
          </motion.section>

          {/* Call to Action */}
          <motion.div className="text-center pb-8" variants={itemVariants}>
            <Link to="/inference" className="btn btn-primary px-8 py-3 text-lg">
              Try VizWiz Now
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
