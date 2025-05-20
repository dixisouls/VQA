import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QuestionForm = ({ onSubmitQuestion, disabled, hasImage }) => {
  const [question, setQuestion] = useState("");
  const [error, setError] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [animateInput, setAnimateInput] = useState(false);

  // Example questions for users to try
  const exampleQuestions = [
    "What color is the object in this image?",
    "How many people are in the picture?",
    "What time does the clock show?",
    "What is written on this sign?",
    "Is there an animal in this image?",
    "What food item is shown here?",
    "What season is depicted in this scene?",
    "Can you identify the brand logo shown?",
  ];

  // Shuffle and select 4 random example questions
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  useEffect(() => {
    if (hasImage) {
      const shuffled = [...exampleQuestions]
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);
      setShuffledQuestions(shuffled);
    }
  }, [hasImage]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate question
    if (!question.trim()) {
      setError("Please enter a question");
      setAnimateInput(true);
      return;
    }

    // Clear error if valid
    setError("");

    // Submit question to parent component
    onSubmitQuestion(question);
  };

  // Handle input change
  const handleChange = (e) => {
    setQuestion(e.target.value);
    // Clear error when user types
    if (error) setError("");
  };

  // Select an example question
  const selectExampleQuestion = (exampleQuestion) => {
    setQuestion(exampleQuestion);
    setError("");
    setShowSuggestions(false);
  };

  // Handle input focus
  const handleFocus = () => {
    if (hasImage) {
      setShowSuggestions(true);
    }
  };

  // Animation when there's an error
  useEffect(() => {
    if (animateInput) {
      const timer = setTimeout(() => {
        setAnimateInput(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [animateInput]);

  // Disable button if no question or no image
  const isButtonDisabled = disabled || !hasImage || !question.trim();

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="question"
            className="block mb-2 text-sm font-medium text-surface-700 dark:text-surface-300"
          >
            Ask a question about the image
          </label>

          <div className="relative">
            <motion.div
              animate={{
                x: animateInput ? [-4, 4, -4, 4, 0] : 0,
              }}
              transition={{ duration: 0.4 }}
            >
              <input
                type="text"
                id="question"
                className={`form-input pr-10 ${
                  error
                    ? "border-tertiary-500 dark:border-tertiary-600 focus:border-tertiary-500 dark:focus:border-tertiary-600 focus:ring-tertiary-500/20"
                    : ""
                } ${
                  disabled || !hasImage
                    ? "bg-surface-100 dark:bg-surface-800 cursor-not-allowed"
                    : ""
                }`}
                placeholder={
                  hasImage
                    ? "e.g., What is in this image?"
                    : "Upload an image first to ask questions"
                }
                value={question}
                onChange={handleChange}
                onFocus={handleFocus}
                disabled={disabled || !hasImage}
                autoComplete="off"
              />
            </motion.div>

            {/* Animated suggestions indicator */}
            {hasImage && !disabled && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-surface-500 dark:text-surface-400">
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  initial={{ opacity: 0.5 }}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                  />
                </motion.svg>
              </div>
            )}
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="form-error mt-2"
              >
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  {error}
                </span>
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          type="submit"
          className={`w-full btn ${
            isButtonDisabled ? "btn-secondary opacity-70" : "btn-primary"
          }`}
          disabled={isButtonDisabled}
          whileHover={
            isButtonDisabled
              ? {}
              : {
                  scale: 1.02,
                  boxShadow:
                    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                }
          }
          whileTap={isButtonDisabled ? {} : { scale: 0.98 }}
          animate={{ opacity: isButtonDisabled ? 0.8 : 1 }}
        >
          {disabled ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Ask Question
            </span>
          )}
        </motion.button>
      </form>

      {/* Example questions section */}
      <AnimatePresence>
        {hasImage && showSuggestions && !disabled && (
          <motion.div
            className="mt-6 card-glass p-4 rounded-lg border border-surface-200 dark:border-surface-700"
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: 20, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-3 text-surface-700 dark:text-surface-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              <h4 className="text-sm font-medium">Try asking about:</h4>
            </div>

            <div className="space-y-2">
              {shuffledQuestions.map((exampleQuestion, index) => (
                <motion.button
                  key={index}
                  onClick={() => selectExampleQuestion(exampleQuestion)}
                  className="w-full text-left p-2 rounded-lg text-sm bg-surface-100 hover:bg-surface-200 dark:bg-surface-800 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300 transition-colors"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  whileHover={{ x: 5 }}
                >
                  {exampleQuestion}
                </motion.button>
              ))}
            </div>

            <div className="mt-3 pt-2 border-t border-surface-200 dark:border-surface-700">
              <button
                onClick={() => setShowSuggestions(false)}
                className="text-xs text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-300 transition-colors"
              >
                Hide suggestions
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!hasImage && (
        <motion.div
          className="mt-6 text-center p-4 rounded-lg bg-surface-100 dark:bg-surface-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex flex-col items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-surface-400 dark:text-surface-500 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-surface-600 dark:text-surface-400">
              Upload an image first to get started
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default QuestionForm;
