import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { uploadImage, askQuestion, completeSession } from "../utils/api";
import UploadComponent from "../components/UploadComponent";
import QuestionForm from "../components/QuestionForm";
import ResultVisualization from "../components/ResultVisualization";

const Inference = () => {
  // Component state
  const [selectedImage, setSelectedImage] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [cameraEffect, setCameraEffect] = useState(false);

  // Refs
  const resultSectionRef = useRef(null);

  // Animations
  const stepOneControls = useAnimation();
  const stepTwoControls = useAnimation();
  const stepThreeControls = useAnimation();
  const cameraMaskControls = useAnimation();

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Update steps animation states
  useEffect(() => {
    if (currentStep >= 1) {
      stepOneControls.start({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1] },
      });
    } else {
      stepOneControls.start({
        opacity: 0.7,
        scale: 0.98,
        transition: { duration: 0.5 },
      });
    }

    if (currentStep >= 2) {
      stepTwoControls.start({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1] },
      });
    } else {
      stepTwoControls.start({
        opacity: 0.5,
        y: 20,
        scale: 0.98,
        transition: { duration: 0.5 },
      });
    }

    if (currentStep >= 3) {
      stepThreeControls.start({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1] },
      });
    } else {
      stepThreeControls.start({
        opacity: 0.5,
        y: 20,
        scale: 0.98,
        transition: { duration: 0.5 },
      });
    }
  }, [currentStep, stepOneControls, stepTwoControls, stepThreeControls]);

  // Cleanup effect when component unmounts
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Attempt to complete the session when window is closed
      if (sessionId) {
        // Use sendBeacon if available for more reliable sending during page unload
        if (navigator.sendBeacon) {
          const formData = new FormData();
          formData.append("session_id", sessionId);
          navigator.sendBeacon(
            `/api/vqa/session/${sessionId}/complete`,
            formData
          );
        } else {
          // Fallback to synchronous XHR (less reliable but better than nothing)
          const xhr = new XMLHttpRequest();
          xhr.open("POST", `/api/vqa/session/${sessionId}/complete`, false);
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.send(JSON.stringify({ session_id: sessionId }));
        }
      }
    };

    // Add beforeunload event listener
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      // Remove event listener
      window.removeEventListener("beforeunload", handleBeforeUnload);

      // Regular cleanup when component unmounts
      if (sessionId) {
        completeSession(sessionId).catch(() => {
          console.error("Failed to complete session during cleanup");
        });
      }
    };
  }, [sessionId]);

  // Scroll to results when they appear
  useEffect(() => {
    if (result && resultSectionRef.current) {
      // Add a small delay to ensure animations have started
      setTimeout(() => {
        resultSectionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300);
    }
  }, [result]);

  // Handle image upload
  const handleImageUpload = async (imageFile) => {
    // Clear previous state when a new image is uploaded
    setSessionId(null);
    setQuestion("");
    setResult(null);
    setError("");
    setHistory([]);
    setCurrentStep(1);

    // If imageFile is null, the user has cleared the selection
    if (!imageFile) {
      setSelectedImage(null);
      return;
    }

    setSelectedImage(imageFile);
    setUploadLoading(true);

    try {
      // Upload the image to create a new session
      console.log("Uploading image:", imageFile.name);

      // Trigger the camera shutter effect
      setCameraEffect(true);
      await cameraMaskControls.start({
        clipPath: ["circle(0% at center)", "circle(150% at center)"],
        opacity: [1, 0],
        transition: { duration: 0.8, ease: "easeInOut" },
      });
      setCameraEffect(false);

      const response = await uploadImage(imageFile);
      console.log("Upload successful, session ID:", response.session_id);
      setSessionId(response.session_id);

      // Move to step 2 after successful upload
      setCurrentStep(2);
    } catch (err) {
      console.error("Error uploading image:", err);
      setError(
        `Failed to upload image: ${
          err.message || "Unknown error"
        }. Please check if the backend server is running at http://localhost:8000.`
      );
      setSelectedImage(null);
    } finally {
      setUploadLoading(false);
    }
  };

  // Handle question submission
  const handleSubmitQuestion = async (questionText) => {
    if (!sessionId) {
      setError("Please upload an image first");
      return;
    }

    setQuestion(questionText);
    setLoading(true);
    setError("");

    try {
      // Ask the question about the uploaded image
      console.log(
        "Submitting question:",
        questionText,
        "for session:",
        sessionId
      );
      const response = await askQuestion(sessionId, questionText);
      console.log("Question response:", response);
      setResult(response);

      // Add to history
      setHistory((prev) => [
        ...prev,
        {
          question: questionText,
          result: response,
          timestamp: new Date().toISOString(),
        },
      ]);

      // Move to step 3 after getting results
      setCurrentStep(3);
    } catch (err) {
      console.error("Error asking question:", err);
      setError(
        `Failed to process your question: ${
          err.message || "Unknown error"
        }. Please check if the backend server is running properly.`
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle completion - clean up resources but keep UI state
  const handleCompletion = async () => {
    if (sessionId) {
      try {
        await completeSession(sessionId);
        console.log("Session resources cleaned up");
        // We'll keep the session ID and results available for the user
        // but the server has cleaned up the image
      } catch (err) {
        console.error("Error completing session:", err);
      }
    }
  };

  // Reset the form
  const handleReset = () => {
    if (sessionId) {
      handleCompletion();
    }
    setSelectedImage(null);
    setSessionId(null);
    setQuestion("");
    setResult(null);
    setError("");
    setHistory([]);
    setCurrentStep(1);
  };

  // Toggle history visibility
  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  // Ask a new question (clear just the result)
  const askNewQuestion = () => {
    setResult(null);
    setCurrentStep(2);
  };

  // Container animation variants
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

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900 py-12 md:py-16 lg:py-20 relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-brand-400/10 to-brand-600/5 dark:from-brand-400/5 dark:to-brand-600/10 blur-3xl rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-accent-400/10 to-accent-600/5 dark:from-accent-400/5 dark:to-accent-600/10 blur-3xl rounded-full transform translate-x-1/3 translate-y-1/4"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-tertiary-400/5 dark:bg-tertiary-600/5 blur-3xl rounded-full"></div>
      </div>

      {/* Camera shutter effect */}
      <AnimatePresence>
        {cameraEffect && (
          <motion.div
            className="fixed inset-0 bg-black z-50 pointer-events-none"
            initial={{ clipPath: "circle(0% at center)" }}
            animate={cameraMaskControls}
            exit={{ clipPath: "circle(0% at center)", opacity: 0 }}
          />
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center mb-12">
            <motion.h1
              className="text-3xl md:text-4xl font-display font-bold mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="gradient-text">Visual</span> Question Answering
            </motion.h1>
            <motion.p
              className="text-lg text-surface-600 dark:text-surface-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Upload an image and ask questions to get AI-powered answers about
              the visual content
            </motion.p>
          </div>

          {/* Step indicators */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-4">
              <motion.div
                className={`flex items-center justify-center w-10 h-10 rounded-full font-medium ${
                  currentStep >= 1
                    ? "bg-brand-500 text-white"
                    : "bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300"
                }`}
                animate={{
                  scale: currentStep === 1 ? [1, 1.1, 1] : 1,
                  transition: {
                    duration: 0.5,
                    repeat: currentStep === 1 ? Infinity : 0,
                    repeatType: "reverse",
                  },
                }}
              >
                1
              </motion.div>
              <div
                className={`h-1 w-10 rounded ${
                  currentStep >= 2
                    ? "bg-brand-500"
                    : "bg-surface-200 dark:bg-surface-700"
                }`}
              ></div>
              <motion.div
                className={`flex items-center justify-center w-10 h-10 rounded-full font-medium ${
                  currentStep >= 2
                    ? "bg-brand-500 text-white"
                    : "bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300"
                }`}
                animate={{
                  scale: currentStep === 2 ? [1, 1.1, 1] : 1,
                  transition: {
                    duration: 0.5,
                    repeat: currentStep === 2 ? Infinity : 0,
                    repeatType: "reverse",
                  },
                }}
              >
                2
              </motion.div>
              <div
                className={`h-1 w-10 rounded ${
                  currentStep >= 3
                    ? "bg-brand-500"
                    : "bg-surface-200 dark:bg-surface-700"
                }`}
              ></div>
              <motion.div
                className={`flex items-center justify-center w-10 h-10 rounded-full font-medium ${
                  currentStep >= 3
                    ? "bg-brand-500 text-white"
                    : "bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300"
                }`}
                animate={{
                  scale: currentStep === 3 ? [1, 1.1, 1] : 1,
                  transition: {
                    duration: 0.5,
                    repeat: currentStep === 3 ? Infinity : 0,
                    repeatType: "reverse",
                  },
                }}
              >
                3
              </motion.div>
            </div>
          </div>

          {/* Main container - Modified layout */}
          <div className="flex flex-col space-y-8">
            {/* Top row - Upload and Question side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Step 1: Upload Section */}
              <motion.div
                animate={stepOneControls}
                initial={{ opacity: 0, y: 20 }}
                className="card p-6 h-full"
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`mr-3 flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                      currentStep >= 1
                        ? "bg-brand-100 text-brand-800 dark:bg-brand-900/30 dark:text-brand-300"
                        : "bg-surface-100 text-surface-500 dark:bg-surface-800 dark:text-surface-400"
                    }`}
                  >
                    1
                  </div>
                  <h2 className="text-xl font-semibold text-surface-800 dark:text-white">
                    Upload Your Image
                  </h2>
                </div>
                <UploadComponent
                  onImageUpload={handleImageUpload}
                  loading={uploadLoading}
                />
              </motion.div>

              {/* Step 2: Question Section */}
              <motion.div
                animate={stepTwoControls}
                initial={{ opacity: 0.5, y: 20 }}
                className="card p-6 h-full"
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`mr-3 flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                      currentStep >= 2
                        ? "bg-brand-100 text-brand-800 dark:bg-brand-900/30 dark:text-brand-300"
                        : "bg-surface-100 text-surface-500 dark:bg-surface-800 dark:text-surface-400"
                    }`}
                  >
                    2
                  </div>
                  <h2 className="text-xl font-semibold text-surface-800 dark:text-white">
                    Ask a Question
                  </h2>
                </div>
                <QuestionForm
                  onSubmitQuestion={handleSubmitQuestion}
                  disabled={loading || !sessionId}
                  hasImage={!!sessionId}
                />

                {loading && (
                  <div className="mt-8 flex justify-center">
                    <div className="flex flex-col items-center p-6">
                      <div className="relative w-16 h-16">
                        <div className="absolute inset-0 rounded-full border-4 border-t-brand-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-r-accent-500 border-b-transparent border-l-transparent animate-spin-slow"></div>
                      </div>
                      <p className="mt-4 text-surface-600 dark:text-surface-400 font-medium">
                        Analyzing image and question...
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Bottom row - Results Section */}
            <motion.div
              ref={resultSectionRef}
              animate={stepThreeControls}
              initial={{ opacity: 0.5, y: 20 }}
              className="w-full"
            >
              {/* Step 3: Results Section */}
              <div className="mb-4 flex items-center">
                <div
                  className={`mr-3 flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                    currentStep >= 3
                      ? "bg-brand-100 text-brand-800 dark:bg-brand-900/30 dark:text-brand-300"
                      : "bg-surface-100 text-surface-500 dark:bg-surface-800 dark:text-surface-400"
                  }`}
                >
                  3
                </div>
                <h2 className="text-xl font-semibold text-surface-800 dark:text-white">
                  View Results
                </h2>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="mb-6 p-4 bg-tertiary-50 dark:bg-tertiary-900/20 border border-tertiary-200 dark:border-tertiary-800 rounded-lg text-tertiary-700 dark:text-tertiary-300"
                  >
                    <div className="flex">
                      <svg
                        className="h-5 w-5 mr-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p>{error}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {result ? (
                  <ResultVisualization result={result} question={question} />
                ) : !error && currentStep < 3 ? (
                  <motion.div
                    className="card p-8 h-full flex flex-col items-center justify-center text-center min-h-[400px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="w-24 h-24 mb-6 text-surface-300 dark:text-surface-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-surface-600 dark:text-surface-400 mb-2">
                      Your results will appear here
                    </h3>
                    <p className="text-surface-500 dark:text-surface-500 max-w-sm">
                      Upload an image and ask a question about it to see
                      AI-powered visual analysis results
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              {/* Action buttons (only show when there's a result) */}
              <AnimatePresence>
                {result && (
                  <motion.div
                    className="mt-6 flex flex-wrap justify-center space-x-0 space-y-3 sm:space-y-0 sm:space-x-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <motion.button
                      onClick={askNewQuestion}
                      className="w-full sm:w-auto btn btn-primary"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
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
                      Ask Another Question
                    </motion.button>

                    <motion.button
                      onClick={handleReset}
                      className="w-full sm:w-auto btn btn-outline"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
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
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      Start Over
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* History Section (conditionally shown) - Now at the bottom */}
            {history.length > 0 && (
              <motion.div
                className="card p-6"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-surface-800 dark:text-white">
                    Question History
                  </h3>
                  <button
                    onClick={toggleHistory}
                    className="p-1.5 text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      {showHistory ? (
                        <path
                          fillRule="evenodd"
                          d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                          clipRule="evenodd"
                        />
                      ) : (
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      )}
                    </svg>
                  </button>
                </div>

                <AnimatePresence>
                  {showHistory && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3 max-h-64 overflow-y-auto pr-1 custom-scrollbar"
                    >
                      {history.map((item, index) => (
                        <motion.div
                          key={index}
                          className="p-3 rounded-lg bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors cursor-pointer"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => {
                            setQuestion(item.question);
                            setResult(item.result);
                            setCurrentStep(3);
                          }}
                        >
                          <div className="flex items-start">
                            <div className="flex-shrink-0 text-brand-500 dark:text-brand-400 mt-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
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
                            </div>
                            <div className="ml-2">
                              <p className="text-sm font-medium text-surface-800 dark:text-white">
                                {item.question}
                              </p>
                              <p className="text-xs text-surface-600 dark:text-surface-400 mt-1 line-clamp-1">
                                {item.result.answer}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Inference;
