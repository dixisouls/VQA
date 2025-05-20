import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const About = () => {
  const [activeTab, setActiveTab] = useState("overview");

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
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  // Tech stack items for display
  const techStack = [
    {
      name: "React",
      icon: (
        <svg
          className="w-10 h-10"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 9.861a2.139 2.139 0 100 4.278 2.139 2.139 0 100-4.278zm-5.992 6.394l-.472-.12C2.018 15.246 0 13.737 0 11.996s2.018-3.25 5.536-4.139l.472-.119.133.468a23.53 23.53 0 001.363 3.578l.101.213-.101.213a23.307 23.307 0 00-1.363 3.578l-.133.467zM5.317 8.95c-2.674.751-4.315 1.9-4.315 3.046 0 1.152 1.641 2.3 4.315 3.046.318-1.02.71-1.976 1.166-2.849-.451-.871-.848-1.83-1.166-2.853v.61zm-.422 8.977c.19.086.384.168.584.244v.38c2.208.889 5.837 1.026 7.152.136l.472-.12.133.469c.57 1.992 1.497 3.848 2.72 5.438l.29.39-.391.29c-1.787 1.327-3.932 2.022-6.101 2.022-2.142-.018-4.256-.702-6-.2l-.391-.29.29-.39a33.834 33.834 0 002.72-5.437l.133-.469.472.12c1.315.89 4.944.753 7.152-.136v-.38a18.875 18.875 0 00-.584-.244c-.543-.196-1.1-.347-1.663-.454-.8-.154-1.662-.34-2.432-.662-.39-.164-.872-.613-.774-1.116.096-.503.48-.629.863-.679.38-.05 1.223-.05 2.344.242.695.182 1.292.454 1.841.75a14.995 14.995 0 00-1.277-3.317c-.543.196-1.032.429-1.584.627-.759.272-1.618.581-2.503.791-.388.092-.895.182-1.202-.099-.307-.281-.308-.778-.197-1.138.112-.36.593-.727 1.307-.942.715-.215 1.59-.357 2.43-.447.836-.09 1.685-.123 2.34-.082.655.042 1.119.224 1.12.227.33-.1.654-.092.975-.09.321.002.6.094.975.09.0-.3.465-.185 1.12-.227.655-.041 1.504-.008 2.34.082.84.09 1.715.232 2.43.447.714.215 1.195.582 1.307.942.111.36.11.857-.197 1.138-.307.28-.814.19-1.202.099-.885-.21-1.744-.52-2.503-.791-.552-.198-1.041-.432-1.584-.627-.414 1.076-.91 2.19-1.277 3.317.549-.296 1.146-.568 1.841-.75 1.12-.292 1.964-.292 2.344-.242.383.05.767.176.863.68.098.502-.384.95-.774 1.115-.77.321-1.632.507-2.432.661-.563.107-1.12.258-1.663.454zm13.031-7.573c.654.89 1.238 1.846 1.641 2.896v-.383c2.674-.751 4.315-1.9 4.315-3.046 0-1.152-1.641-2.3-4.315-3.046-.318 1.02-.78 2.06-1.165 2.853a22.89 22.89 0 011.165 2.849l-.001-.123zm.502-8.381l.472.119C22.982 8.755 25 10.264 25 12.005s-2.018 3.25-5.536 4.139l-.472.12-.134-.469a23.357 23.357 0 00-1.363-3.578l-.101-.213.101-.213a23.42 23.42 0 001.363-3.578l.134-.467zM18.52 11.996c-.45.873-.708 1.827-1.166 2.849 2.674-.75 4.315-1.9 4.315-3.046 0-1.152-1.641-2.3-4.315-3.046a22.923 22.923 0 011.166 2.849l-.001.394v-.4.4z"
            fill="currentColor"
          />
        </svg>
      ),
      description: "Frontend UI library",
      color: "text-blue-500 dark:text-blue-400",
    },
    {
      name: "Framer Motion",
      icon: (
        <svg
          className="w-10 h-10"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4 2h16v6h-8v14l-8-8v-12z" fill="currentColor" />
        </svg>
      ),
      description: "Animation library",
      color: "text-purple-500 dark:text-purple-400",
    },
    {
      name: "TailwindCSS",
      icon: (
        <svg
          className="w-10 h-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 54 33"
        >
          <g clipPath="url(#prefix__clip0)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.515 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.515-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.515-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="prefix__clip0">
              <path fill="#fff" d="M0 0H54V32.4H0z" />
            </clipPath>
          </defs>
        </svg>
      ),
      description: "Utility-first CSS framework",
      color: "text-teal-500 dark:text-teal-400",
    },
    {
      name: "PyTorch",
      icon: (
        <svg
          className="w-10 h-10"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.005 0L4.952 7.053a.94.94 0 000 1.328l.108.108c.361.361.998.361 1.36 0l5.078-5.078v11.164c0 .446.241.882.663 1.118.421.236.902.218 1.302-.05l.108-.071a1.266 1.266 0 00.663-1.111V3.363l5.27 5.27c.361.361.998.361 1.36 0l.108-.108a.94.94 0 000-1.328L12.005 0zm6.772 16.856a5.09 5.09 0 00-.154.423c-.616 1.831-2.392 2.994-4.305 2.994a4.328 4.328 0 01-1.346-.215 3.95 3.95 0 01-.471-.187 4.304 4.304 0 01-.421-.212v-2.355c-.07 1.654-1.513 3.018-3.167 3.018-.113 0-.23-.008-.352-.019a1.4 1.4 0 01-.152-.02 3.147 3.147 0 01-.325-.063c-1.702-.42-2.822-2.066-2.82-3.9 0-.06.01-.115.011-.175.98.138.198.273.305.404l.08.097c.813.881 1.71 1.472 2.563 1.472.075 0 .151-.007.226-.018a2.11 2.11 0 00.208-.039c1.157-.292 1.715-1.602 1.241-2.913-.149-.412-.284-.838-.284-1.268 0-2.244 1.833-4.077 4.077-4.077.188 0 .379.014.572.041a4.03 4.03 0 11.755 5.934 2.427 2.427 0 00-.394.326c-.86.94-.83 2.407.067 3.32.293.299.658.441 1.03.441.696 0 1.456-.455 1.856-1.192a2.137 2.137 0 00.19-.401c.04-.112.073-.225.106-.34l.031-.136z"
            fill="currentColor"
          />
        </svg>
      ),
      description: "Deep learning framework",
      color: "text-orange-500 dark:text-orange-400",
    },
    {
      name: "Transformers",
      icon: (
        <svg
          className="w-10 h-10"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.77 10.03a1.74 1.74 0 0 0-1.21-.72l-6.21-.62a.22.22 0 0 1-.18-.12L11.7 3.1a1.59 1.59 0 0 0-2.22-.44 1.41 1.41 0 0 0-.34.45L7.43 8.05a.23.23 0 0 1-.21.15H2.5a2.42 2.42 0 0 0-2.2 1.43 2 2 0 0 0 0 1.05 2.85 2.85 0 0 0 1.28 1.43l5.2 3.13a.26.26 0 0 1 .09.16l-.36 5.41a2.42 2.42 0 0 0 .83 2.07 1.65 1.65 0 0 0 1.88.06l4.78-3.24a.23.23 0 0 1 .2 0l5.21 3.05a1.89 1.89 0 0 0 2.07 0 1.74 1.74 0 0 0 .58-1.83l-1.69-5.5a.22.22 0 0 1 0-.13l3.07-4.32a1.84 1.84 0 0 0 .33-1.93zM15.78 14.5l1.69 5.5c.05.17.06.3 0 .37s-.33.06-.72-.17L11.53 17a2.26 2.26 0 0 0-2.32.09l-4.77 3.25c-.18.12-.34.22-.46.22s-.1-.11-.09-.33l.32-5.42a2.26 2.26 0 0 0-1.12-1.95l-5.2-3.14a1.25 1.25 0 0 1-.16-.1c.21-.35.53-.46.94-.46h4.72a2.21 2.21 0 0 0 2.06-1.3l1.7-4.94V2.9a.64.64 0 0 1 .19.12l2.49 5.46a2.13 2.13 0 0 0 1.9 1.15l6.22.63s.32 0 .27.09l-3.07 4.31a2.3 2.3 0 0 0-.28 1.84z"
            fill="currentColor"
          />
        </svg>
      ),
      description: "Hugging Face library",
      color: "text-yellow-500 dark:text-yellow-400",
    },
    {
      name: "FastAPI",
      icon: (
        <svg
          className="w-10 h-10"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 0C5.375 0 0 5.375 0 12c0 6.627 5.375 12 12 12 6.626 0 12-5.373 12-12 0-6.625-5.373-12-12-12zm-.624 21.62v-7.528H7.19L13.203 2.38v7.528h4.029L11.376 21.62z"
            fill="currentColor"
          />
        </svg>
      ),
      description: "Backend API framework",
      color: "text-green-500 dark:text-green-400",
    },
  ];

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900 py-12 md:py-16 lg:py-20 relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-brand-400/10 to-brand-600/5 dark:from-brand-400/5 dark:to-brand-600/10 blur-3xl rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-accent-400/10 to-accent-600/5 dark:from-accent-400/5 dark:to-accent-600/10 blur-3xl rounded-full transform -translate-x-1/3 translate-y-1/4"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <motion.div
              className="inline-block rounded-full px-3 py-1 text-sm font-medium bg-brand-100 text-brand-800 dark:bg-brand-900/30 dark:text-brand-300 mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              About the Project
            </motion.div>
            <motion.h1
              className="text-3xl md:text-4xl font-display font-bold mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="gradient-text">VizWiz</span> Visual QA
            </motion.h1>
            <motion.p
              className="text-lg text-surface-600 dark:text-surface-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              An advanced AI-powered system for answering questions about visual
              content
            </motion.p>
          </motion.div>

          {/* Tabs Navigation */}
          <div className="flex flex-wrap justify-center mb-8 border-b border-surface-200 dark:border-surface-700">
            <button
              className={`px-4 py-3 font-medium text-sm transition-colors relative ${
                activeTab === "overview"
                  ? "text-brand-600 dark:text-brand-400"
                  : "text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-surface-200"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
              {activeTab === "overview" && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500 dark:bg-brand-400"
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
            <button
              className={`px-4 py-3 font-medium text-sm transition-colors relative ${
                activeTab === "technical"
                  ? "text-brand-600 dark:text-brand-400"
                  : "text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-surface-200"
              }`}
              onClick={() => setActiveTab("technical")}
            >
              Technical Details
              {activeTab === "technical" && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500 dark:bg-brand-400"
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              <div className="card p-6">
                <h2 className="text-xl font-semibold mb-4 text-surface-800 dark:text-white">
                  Project Overview
                </h2>
                <p className="mb-4 text-surface-600 dark:text-surface-300">
                  VizWiz Visual QA is a cutting-edge application designed to
                  answer natural language questions about images. Using a
                  powerful combination of computer vision and natural language
                  processing models, our system can understand both the visual
                  content of images and the linguistic nuances of questions.
                </p>
                <p className="text-surface-600 dark:text-surface-300">
                  This application was built to demonstrate the capabilities of
                  modern vision-language models and to provide a practical tool
                  for image understanding. It leverages state-of-the-art deep
                  learning architectures including Vision Transformer (ViT) for
                  image encoding and BERT for text processing.
                </p>
              </div>

              <div className="card p-6">
                <h2 className="text-xl font-semibold mb-4 text-surface-800 dark:text-white">
                  How It Works
                </h2>

                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-16 flex-shrink-0 flex items-center justify-center mb-4 md:mb-0">
                      <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400 font-bold text-lg">
                        1
                      </div>
                    </div>
                    <div className="md:ml-6">
                      <h3 className="text-lg font-medium mb-2 text-surface-800 dark:text-white">
                        Image Processing
                      </h3>
                      <p className="text-surface-600 dark:text-surface-300">
                        When you upload an image, it's processed by our Vision
                        Transformer (ViT) model, which extracts rich visual
                        features by analyzing the image as a sequence of
                        patches. These features capture objects, their
                        attributes, spatial relationships, and more.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-16 flex-shrink-0 flex items-center justify-center mb-4 md:mb-0">
                      <div className="w-10 h-10 rounded-full bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center text-accent-600 dark:text-accent-400 font-bold text-lg">
                        2
                      </div>
                    </div>
                    <div className="md:ml-6">
                      <h3 className="text-lg font-medium mb-2 text-surface-800 dark:text-white">
                        Question Analysis
                      </h3>
                      <p className="text-surface-600 dark:text-surface-300">
                        Your question is processed by a BERT language model,
                        which understands the intent and nuances of your query.
                        The model parses the question to identify what
                        information you're looking for in the image.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-16 flex-shrink-0 flex items-center justify-center mb-4 md:mb-0">
                      <div className="w-10 h-10 rounded-full bg-tertiary-100 dark:bg-tertiary-900/30 flex items-center justify-center text-tertiary-600 dark:text-tertiary-400 font-bold text-lg">
                        3
                      </div>
                    </div>
                    <div className="md:ml-6">
                      <h3 className="text-lg font-medium mb-2 text-surface-800 dark:text-white">
                        Multimodal Fusion
                      </h3>
                      <p className="text-surface-600 dark:text-surface-300">
                        The system combines the image and question
                        representations through a sophisticated fusion
                        mechanism, creating a joint understanding of both the
                        visual content and the question.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-16 flex-shrink-0 flex items-center justify-center mb-4 md:mb-0">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-lg">
                        4
                      </div>
                    </div>
                    <div className="md:ml-6">
                      <h3 className="text-lg font-medium mb-2 text-surface-800 dark:text-white">
                        Answer Generation
                      </h3>
                      <p className="text-surface-600 dark:text-surface-300">
                        Based on the fused understanding, the model generates an
                        answer to your question and determines whether the
                        question can be answered from the image. It also
                        provides confidence scores that indicate how certain the
                        model is about its predictions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <h2 className="text-xl font-semibold mb-4 text-surface-800 dark:text-white">
                  Key Features
                </h2>
                <ul className="space-y-3 text-surface-600 dark:text-surface-300">
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 mr-2 flex-shrink-0 text-brand-500 dark:text-brand-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>
                      Natural language question handling with state-of-the-art
                      BERT technology
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 mr-2 flex-shrink-0 text-brand-500 dark:text-brand-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>
                      Advanced image analysis using Vision Transformer
                      architecture
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 mr-2 flex-shrink-0 text-brand-500 dark:text-brand-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>
                      Dual-output architecture that predicts answers and answer
                      confidence
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 mr-2 flex-shrink-0 text-brand-500 dark:text-brand-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>
                      "Answerability" detection to determine when questions
                      can't be answered
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 mr-2 flex-shrink-0 text-brand-500 dark:text-brand-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>
                      Interactive UI with real-time confidence visualization
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "technical" && (
            <div className="space-y-8">
              <div className="card p-6">
                <h2 className="text-xl font-semibold mb-4 text-surface-800 dark:text-white">
                  Architecture
                </h2>
                <p className="mb-4 text-surface-600 dark:text-surface-300">
                  Our system uses a multimodal architecture that processes both
                  images and text queries:
                </p>
                <ul className="space-y-3 text-surface-600 dark:text-surface-300">
                  <li className="flex items-start">
                    <div className="w-3 h-3 mt-1.5 mr-2 rounded-full bg-brand-500 dark:bg-brand-600 flex-shrink-0"></div>
                    <div>
                      <span className="font-medium text-surface-800 dark:text-white">
                        Vision Encoder:
                      </span>{" "}
                      Vision Transformer (ViT) from Google's
                      ViT-Base-Patch16-384 model
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-3 h-3 mt-1.5 mr-2 rounded-full bg-accent-500 dark:bg-accent-600 flex-shrink-0"></div>
                    <div>
                      <span className="font-medium text-surface-800 dark:text-white">
                        Text Encoder:
                      </span>{" "}
                      BERT (Bidirectional Encoder Representations from
                      Transformers)
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-3 h-3 mt-1.5 mr-2 rounded-full bg-amber-500 dark:bg-amber-600 flex-shrink-0"></div>
                    <div>
                      <span className="font-medium text-surface-800 dark:text-white">
                        Fusion Mechanism:
                      </span>{" "}
                      Cross-modal attention and concatenation with multi-layer
                      perceptron
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-3 h-3 mt-1.5 mr-2 rounded-full bg-emerald-500 dark:bg-emerald-600 flex-shrink-0"></div>
                    <div>
                      <span className="font-medium text-surface-800 dark:text-white">
                        Output Heads:
                      </span>{" "}
                      Two specialized classifiers for answer prediction and
                      answerability determination
                    </div>
                  </li>
                </ul>
              </div>

              <div className="card p-6">
                <h2 className="text-xl font-semibold mb-4 text-surface-800 dark:text-white">
                  Dataset
                </h2>
                <p className="mb-4 text-surface-600 dark:text-surface-300">
                  The model was trained on the VizWiz dataset, which contains:
                </p>
                <ul className="space-y-2 text-surface-600 dark:text-surface-300">
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 mr-2 flex-shrink-0 text-brand-500 dark:text-brand-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>
                      Over 20,000 images captured by visually impaired
                      individuals
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 mr-2 flex-shrink-0 text-brand-500 dark:text-brand-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>
                      Natural, conversational questions about these images
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 mr-2 flex-shrink-0 text-brand-500 dark:text-brand-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>
                      Multiple human-provided answers for each question
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 mr-2 flex-shrink-0 text-brand-500 dark:text-brand-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>
                      Annotations indicating whether questions are answerable
                    </span>
                  </li>
                </ul>
              </div>

              <div className="card p-6">
                <h2 className="text-xl font-semibold mb-4 text-surface-800 dark:text-white">
                  Tech Stack
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {techStack.map((tech, index) => (
                    <div
                      key={tech.name}
                      className="flex flex-col items-center text-center p-4 rounded-lg bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
                    >
                      <div className={`mb-3 ${tech.color}`}>{tech.icon}</div>
                      <h3 className="font-medium text-surface-800 dark:text-white mb-1">
                        {tech.name}
                      </h3>
                      <p className="text-xs text-surface-500 dark:text-surface-400">
                        {tech.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card p-6">
                <h2 className="text-xl font-semibold mb-4 text-surface-800 dark:text-white">
                  Performance
                </h2>
                <p className="mb-4 text-surface-600 dark:text-surface-300">
                  Our model achieves strong performance on various visual
                  question answering benchmarks:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800/50">
                    <div className="flex items-center mb-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></div>
                      <h3 className="font-medium text-surface-800 dark:text-white">
                        Answer Accuracy
                      </h3>
                    </div>
                    <p className="text-sm text-surface-600 dark:text-surface-300">
                      High accuracy on answerable questions with excellent
                      classification of common objects and scenes
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800/50">
                    <div className="flex items-center mb-2">
                      <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                      <h3 className="font-medium text-surface-800 dark:text-white">
                        Answerability Detection
                      </h3>
                    </div>
                    <p className="text-sm text-surface-600 dark:text-surface-300">
                      Reliable detection of unanswerable questions to prevent
                      hallucination and incorrect responses
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800/50">
                    <div className="flex items-center mb-2">
                      <div className="w-3 h-3 rounded-full bg-brand-500 mr-2"></div>
                      <h3 className="font-medium text-surface-800 dark:text-white">
                        Real-World Performance
                      </h3>
                    </div>
                    <p className="text-sm text-surface-600 dark:text-surface-300">
                      Good generalization to real-world images and natural
                      questions beyond the training data
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800/50">
                    <div className="flex items-center mb-2">
                      <div className="w-3 h-3 rounded-full bg-accent-500 mr-2"></div>
                      <h3 className="font-medium text-surface-800 dark:text-white">
                        Inference Speed
                      </h3>
                    </div>
                    <p className="text-sm text-surface-600 dark:text-surface-300">
                      Fast inference times suitable for interactive use, with
                      optimized model architecture
                    </p>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <h2 className="text-xl font-semibold mb-4 text-surface-800 dark:text-white">
                  Implementation Details
                </h2>
                <p className="mb-4 text-surface-600 dark:text-surface-300">
                  The system is implemented as a full-stack application with
                  clean separation of concerns:
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-3 h-3 mt-1.5 mr-2 rounded-full bg-blue-500 dark:bg-blue-600 flex-shrink-0"></div>
                    <div>
                      <span className="font-medium text-surface-800 dark:text-white">
                        Backend API:
                      </span>{" "}
                      <p className="text-sm text-surface-600 dark:text-surface-300 mt-1">
                        Built with FastAPI for efficient, type-safe API
                        endpoints that handle image uploading, session
                        management, and inference requests. The model service
                        loads PyTorch models and performs inference
                        asynchronously.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-3 h-3 mt-1.5 mr-2 rounded-full bg-green-500 dark:bg-green-600 flex-shrink-0"></div>
                    <div>
                      <span className="font-medium text-surface-800 dark:text-white">
                        Neural Network:
                      </span>{" "}
                      <p className="text-sm text-surface-600 dark:text-surface-300 mt-1">
                        Implemented in PyTorch with the Hugging Face
                        Transformers library. Model architecture includes
                        pre-trained ViT and BERT models with custom fusion
                        layers and output heads optimized for visual question
                        answering.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-3 h-3 mt-1.5 mr-2 rounded-full bg-purple-500 dark:bg-purple-600 flex-shrink-0"></div>
                    <div>
                      <span className="font-medium text-surface-800 dark:text-white">
                        Frontend Client:
                      </span>{" "}
                      <p className="text-sm text-surface-600 dark:text-surface-300 mt-1">
                        Built with React, TailwindCSS, and Framer Motion for an
                        engaging and responsive user experience. Features
                        include real-time confidence visualization, image upload
                        with preview, and session management.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-3 h-3 mt-1.5 mr-2 rounded-full bg-yellow-500 dark:bg-yellow-600 flex-shrink-0"></div>
                    <div>
                      <span className="font-medium text-surface-800 dark:text-white">
                        Optimization Techniques:
                      </span>{" "}
                      <p className="text-sm text-surface-600 dark:text-surface-300 mt-1">
                        The system uses several performance optimizations
                        including batch processing, model quantization, and
                        caching strategies to ensure efficient inference even on
                        limited hardware resources.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <Link
              to="/inference"
              className="btn btn-primary px-8 py-3 text-lg shadow-lg shadow-brand-500/20 dark:shadow-brand-500/10 hover:shadow-xl hover:shadow-brand-500/30 dark:hover:shadow-brand-500/20"
            >
              Try VizWiz Now
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
