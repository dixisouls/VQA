import React from "react";
import { motion } from "framer-motion";

const ResultVisualization = ({ result, question }) => {
  // Early return if no result
  if (!result) return null;

  const { answer, answer_confidence, is_answerable, answerable_confidence } =
    result;

  // Confidence color based on score
  const getConfidenceColor = (score) => {
    if (score >= 0.7) return "bg-green-500 dark:bg-green-600";
    if (score >= 0.4) return "bg-yellow-500 dark:bg-yellow-600";
    return "bg-red-500 dark:bg-red-600";
  };

  // Confidence rating text
  const getConfidenceText = (score) => {
    if (score >= 0.7) return "High Confidence";
    if (score >= 0.4) return "Medium Confidence";
    return "Low Confidence";
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
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

  return (
    <motion.div
      className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Result Header */}
      <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white">
          Results
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Question: {question}
        </p>
      </div>

      {/* Answer Section */}
      <div className="p-4">
        <motion.div variants={itemVariants} className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-md font-medium text-gray-700 dark:text-gray-300">
              Answer
            </h4>
            <span
              className={`px-2 py-1 text-xs rounded-full text-white ${getConfidenceColor(
                answer_confidence
              )}`}
            >
              {getConfidenceText(answer_confidence)}
            </span>
          </div>

          <div className="p-3 bg-gray-100 dark:bg-gray-900 rounded-lg">
            <p className="text-xl font-semibold text-gray-800 dark:text-white break-words">
              {answer}
            </p>
          </div>
        </motion.div>

        {/* Answer Confidence Bar */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Answer Confidence
            </h4>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {(answer_confidence * 100).toFixed(1)}%
            </span>
          </div>

          <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${getConfidenceColor(answer_confidence)}`}
              initial={{ width: 0 }}
              animate={{ width: `${answer_confidence * 100}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        {/* Answerable Section */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-md font-medium text-gray-700 dark:text-gray-300">
              Is the question answerable?
            </h4>
            <span
              className={`px-2 py-1 text-xs rounded-full text-white ${
                is_answerable
                  ? "bg-green-500 dark:bg-green-600"
                  : "bg-red-500 dark:bg-red-600"
              }`}
            >
              {is_answerable ? "Yes" : "No"}
            </span>
          </div>

          <div className="p-3 bg-gray-100 dark:bg-gray-900 rounded-lg">
            <p className="text-gray-800 dark:text-white">
              {is_answerable
                ? "The model believes this question can be answered based on the image."
                : "The model believes this question cannot be answered based on the image."}
            </p>
          </div>
        </motion.div>

        {/* Answerable Confidence Bar */}
        <motion.div variants={itemVariants}>
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {is_answerable
                ? "Answerable Confidence"
                : "Unanswerable Confidence"}
            </h4>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {(answerable_confidence * 100).toFixed(1)}%
            </span>
          </div>

          <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${getConfidenceColor(answerable_confidence)}`}
              initial={{ width: 0 }}
              animate={{ width: `${answerable_confidence * 100}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ResultVisualization;
