import React, { useState } from "react";
import { motion } from "framer-motion";

const QuestionForm = ({ onSubmitQuestion, disabled, hasImage }) => {
  const [question, setQuestion] = useState("");
  const [error, setError] = useState("");

  // Example questions for users to try
  const exampleQuestions = [
    "What color is this object?",
    "How many people are in this picture?",
    "What time does the clock show?",
    "What is written on this label?",
    "Is there a cat in this image?",
    "What kind of food is this?",
    "What season is depicted in this scene?",
  ];

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate question
    if (!question.trim()) {
      setError("Please enter a question");
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
  };

  // Disable button if no question or no image
  const isButtonDisabled = disabled || !hasImage || !question.trim();

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="question"
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Ask a question about the image
          </label>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <input
              type="text"
              id="question"
              className={`input-field text-gray-800 dark:text-white ${
                error ? "border-red-500 dark:border-red-500" : ""
              }`}
              placeholder="e.g., What is in this image?"
              value={question}
              onChange={handleChange}
              disabled={disabled || !hasImage}
              autoComplete="off"
            />
          </motion.div>

          {error && (
            <motion.p
              className="mt-2 text-sm text-red-600 dark:text-red-400"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.p>
          )}
        </div>

        <motion.button
          type="submit"
          className="w-full btn btn-primary"
          disabled={isButtonDisabled}
          whileHover={{ scale: isButtonDisabled ? 1 : 1.02 }}
          whileTap={{ scale: isButtonDisabled ? 1 : 0.98 }}
        >
          Ask Question
        </motion.button>
      </form>

      {/* Example questions section */}
      {hasImage && (
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Example questions to try:
          </h3>

          <div className="flex flex-wrap gap-2">
            {exampleQuestions.map((exampleQuestion, index) => (
              <motion.button
                key={index}
                onClick={() => selectExampleQuestion(exampleQuestion)}
                className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={disabled}
              >
                {exampleQuestion}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {!hasImage && (
        <motion.p
          className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Upload an image first to ask a question
        </motion.p>
      )}
    </div>
  );
};

export default QuestionForm;
