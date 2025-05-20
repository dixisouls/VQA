import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ResultVisualization = ({ result, question }) => {
  // State for animation control
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("answer");

  // Refs for DOM measurements
  const confBarsRef = useRef(null);

  // Early return if no result
  if (!result) return null;

  const { answer, answer_confidence, is_answerable, answerable_confidence } =
    result;

  // Confidence color based on score
  const getConfidenceColor = (score, type = "all") => {
    // Color classes for different components
    if (type === "bg") {
      if (score >= 0.7) return "bg-emerald-500 dark:bg-emerald-600";
      if (score >= 0.4) return "bg-amber-500 dark:bg-amber-600";
      return "bg-tertiary-500 dark:bg-tertiary-600";
    }

    if (type === "text") {
      if (score >= 0.7) return "text-emerald-600 dark:text-emerald-400";
      if (score >= 0.4) return "text-amber-600 dark:text-amber-400";
      return "text-tertiary-600 dark:text-tertiary-400";
    }

    if (type === "border") {
      if (score >= 0.7) return "border-emerald-500 dark:border-emerald-600";
      if (score >= 0.4) return "border-amber-500 dark:border-amber-600";
      return "border-tertiary-500 dark:border-tertiary-600";
    }

    if (type === "badge") {
      if (score >= 0.7)
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300";
      if (score >= 0.4)
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      return "bg-tertiary-100 text-tertiary-800 dark:bg-tertiary-900/30 dark:text-tertiary-300";
    }

    // For gradient
    if (type === "gradient") {
      if (score >= 0.7)
        return "from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700";
      if (score >= 0.4)
        return "from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700";
      return "from-tertiary-500 to-tertiary-600 dark:from-tertiary-600 dark:to-tertiary-700";
    }
  };

  // Confidence rating text
  const getConfidenceText = (score) => {
    if (score >= 0.9) return "Very High";
    if (score >= 0.7) return "High";
    if (score >= 0.4) return "Medium";
    if (score >= 0.2) return "Low";
    return "Very Low";
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1],
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // Card expand animation variants
  const cardVariants = {
    collapsed: {
      height: "auto",
    },
    expanded: {
      height: "auto",
    },
    exit: {
      height: "auto",
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      className="w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      layoutId="resultContainer"
    >
      {/* Main Result Card */}
      <motion.div
        className="card overflow-hidden"
        variants={cardVariants}
        animate={isExpanded ? "expanded" : "collapsed"}
        exit="exit"
        layoutId="resultCard"
      >
        {/* Header */}
        <div className="px-5 py-4 bg-surface-50 dark:bg-surface-800/50 border-b border-surface-200 dark:border-surface-700">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-surface-800 dark:text-white">
              Analysis Results
            </h3>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transition-transform duration-300 ${
                  isExpanded ? "transform rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
          <p className="text-sm text-surface-600 dark:text-surface-400 mt-1">
            Question: {question}
          </p>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Tabs */}
          <div className="mb-4 border-b border-surface-200 dark:border-surface-700">
            <div className="flex space-x-2">
              <button
                className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "answer"
                    ? "border-brand-500 text-brand-600 dark:text-brand-400"
                    : "border-transparent text-surface-600 hover:text-surface-800 dark:text-surface-400 dark:hover:text-surface-300"
                }`}
                onClick={() => setActiveTab("answer")}
              >
                Answer
              </button>
              <button
                className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "metrics"
                    ? "border-brand-500 text-brand-600 dark:text-brand-400"
                    : "border-transparent text-surface-600 hover:text-surface-800 dark:text-surface-400 dark:hover:text-surface-300"
                }`}
                onClick={() => setActiveTab("metrics")}
              >
                Confidence Metrics
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[200px]">
            {activeTab === "answer" ? (
              <div>
                <motion.div
                  variants={itemVariants}
                  className="mb-6"
                  layoutId="answerSection"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-md font-medium text-surface-700 dark:text-surface-300">
                      Answer
                    </h4>
                    <span
                      className={`badge ${getConfidenceColor(
                        answer_confidence,
                        "badge"
                      )}`}
                    >
                      {getConfidenceText(answer_confidence)} Confidence
                    </span>
                  </div>

                  <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700">
                    <p className="text-2xl font-semibold text-surface-800 dark:text-white break-words">
                      {answer}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="mb-6"
                  layoutId="answerableSection"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-md font-medium text-surface-700 dark:text-surface-300">
                      Is the question answerable?
                    </h4>
                    <span
                      className={`badge ${
                        is_answerable
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                          : "bg-tertiary-100 text-tertiary-800 dark:bg-tertiary-900/30 dark:text-tertiary-300"
                      }`}
                    >
                      {is_answerable ? "Yes" : "No"}
                    </span>
                  </div>

                  <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700">
                    <p className="text-surface-700 dark:text-surface-300">
                      {is_answerable
                        ? "The model is confident that this question can be answered based on the image content."
                        : "The model believes this question cannot be answered based on the image content."}
                    </p>
                  </div>
                </motion.div>
              </div>
            ) : (
              <div ref={confBarsRef}>
                {/* Confidence Metrics View */}
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="p-4 bg-surface-50 dark:bg-surface-800/50 rounded-lg border border-surface-200 dark:border-surface-700"
                  >
                    <div className="flex items-center mb-3">
                      <div
                        className={`w-3 h-3 rounded-full ${getConfidenceColor(
                          answer_confidence,
                          "bg"
                        )} mr-2`}
                      ></div>
                      <h3 className="text-surface-800 dark:text-white font-medium">
                        Answer Confidence:{" "}
                        {(answer_confidence * 100).toFixed(1)}%
                      </h3>
                    </div>

                    <p className="text-sm text-surface-600 dark:text-surface-400 mb-3">
                      This score indicates how confident the model is about the
                      provided answer.
                      {answer_confidence >= 0.7
                        ? " The high confidence suggests strong evidence in the image supporting this answer."
                        : answer_confidence >= 0.4
                        ? " The moderate confidence indicates reasonable evidence, but there may be some uncertainty."
                        : " The low confidence suggests limited evidence or multiple possible interpretations."}
                    </p>

                    <div className="relative mt-4">
                      <div className="h-3 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full bg-gradient-to-r ${getConfidenceColor(
                            answer_confidence,
                            "gradient"
                          )}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${answer_confidence * 100}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>

                      <div className="w-full flex justify-between mt-1 text-xs text-surface-500 dark:text-surface-400">
                        <span>Low Confidence</span>
                        <span>High Confidence</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="p-4 bg-surface-50 dark:bg-surface-800/50 rounded-lg border border-surface-200 dark:border-surface-700"
                  >
                    <div className="flex items-center mb-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          is_answerable
                            ? "bg-emerald-500 dark:bg-emerald-600"
                            : "bg-tertiary-500 dark:bg-tertiary-600"
                        } mr-2`}
                      ></div>
                      <h3 className="text-surface-800 dark:text-white font-medium">
                        {is_answerable ? "Answerable" : "Unanswerable"}{" "}
                        Confidence: {(answerable_confidence * 100).toFixed(1)}%
                      </h3>
                    </div>

                    <p className="text-sm text-surface-600 dark:text-surface-400 mb-3">
                      This score reflects how confident the model is about
                      whether the question can be answered from the image.
                      {is_answerable
                        ? " The model believes the necessary information is present in the image."
                        : " The model believes the necessary information is not present in the image."}
                    </p>

                    <div className="relative mt-4">
                      <div className="h-3 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full bg-gradient-to-r ${
                            is_answerable
                              ? "from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700"
                              : "from-tertiary-500 to-tertiary-600 dark:from-tertiary-600 dark:to-tertiary-700"
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${answerable_confidence * 100}%` }}
                          transition={{
                            duration: 1,
                            ease: "easeOut",
                            delay: 0.3,
                          }}
                        />
                      </div>

                      <div className="w-full flex justify-between mt-1 text-xs text-surface-500 dark:text-surface-400">
                        <span>Low Confidence</span>
                        <span>High Confidence</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="p-4 bg-surface-50 dark:bg-surface-800/50 rounded-lg border border-surface-200 dark:border-surface-700"
                  >
                    <h3 className="text-surface-800 dark:text-white font-medium mb-3">
                      Understanding Confidence Scores
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-800">
                        <div className="flex items-center mb-1">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                          <span className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                            High (70-100%)
                          </span>
                        </div>
                        <p className="text-xs text-emerald-700 dark:text-emerald-400">
                          Strong evidence supports the answer with high
                          certainty
                        </p>
                      </div>

                      <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-800">
                        <div className="flex items-center mb-1">
                          <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                          <span className="text-sm font-medium text-amber-800 dark:text-amber-300">
                            Medium (40-70%)
                          </span>
                        </div>
                        <p className="text-xs text-amber-700 dark:text-amber-400">
                          Reasonable evidence exists, but with some uncertainty
                        </p>
                      </div>

                      <div className="p-3 bg-tertiary-50 dark:bg-tertiary-900/20 rounded-lg border border-tertiary-100 dark:border-tertiary-800">
                        <div className="flex items-center mb-1">
                          <div className="w-2 h-2 rounded-full bg-tertiary-500 mr-2"></div>
                          <span className="text-sm font-medium text-tertiary-800 dark:text-tertiary-300">
                            Low (0-40%)
                          </span>
                        </div>
                        <p className="text-xs text-tertiary-700 dark:text-tertiary-400">
                          Limited evidence or multiple possible interpretations
                          exist
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResultVisualization;
