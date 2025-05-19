import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import UploadComponent from "../components/UploadComponent";
import QuestionForm from "../components/QuestionForm";
import ResultVisualization from "../components/ResultVisualization";
import LoadingAnimation from "../components/LoadingAnimation";
import { uploadImage, askQuestion, completeSession } from "../utils/api";

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

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Cleanup effect when component unmounts
  useEffect(() => {
    // Return cleanup function
    return () => {
      if (sessionId) {
        // Try to complete the session when the component unmounts
        completeSession(sessionId).catch(() => {
          // Silent catch - we don't want to crash during unmount
          console.error("Failed to complete session during cleanup");
        });
      }
    };
  }, [sessionId]);

  // Handle image upload
  const handleImageUpload = async (imageFile) => {
    // Clear previous state when a new image is uploaded
    setSessionId(null);
    setQuestion("");
    setResult(null);
    setError("");
    setHistory([]);

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
      const response = await uploadImage(imageFile);
      console.log("Upload successful, session ID:", response.session_id);
      setSessionId(response.session_id);
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
  };

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

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

  return (
    <motion.div
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="container px-4 mx-auto">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Visual Question Answering
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Upload an image and ask questions to get AI-powered answers
            </p>
          </div>

          {/* Main card container */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              {/* Upload section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                  1. Upload Your Image
                </h2>
                <UploadComponent
                  onImageUpload={handleImageUpload}
                  loading={uploadLoading}
                />

                {uploadLoading && (
                  <div className="mt-4 flex justify-center">
                    <LoadingAnimation text="Uploading image..." size="small" />
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 dark:border-gray-700 my-6"></div>

              {/* Question section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                  2. Ask a Question
                </h2>
                <QuestionForm
                  onSubmitQuestion={handleSubmitQuestion}
                  disabled={loading || !sessionId}
                  hasImage={!!sessionId}
                />

                {loading && (
                  <div className="mt-8 flex justify-center">
                    <LoadingAnimation text="Analyzing image and question..." />
                  </div>
                )}
              </div>

              {/* Error message */}
              {error && (
                <div className="mb-8 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg">
                  <p>{error}</p>
                </div>
              )}

              {/* Result section */}
              {result && !loading && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                    3. Results
                  </h2>
                  <ResultVisualization result={result} question={question} />

                  <div className="mt-6 text-center">
                    <button
                      onClick={() => setResult(null)}
                      className="btn btn-secondary mr-4"
                    >
                      Ask Another Question
                    </button>
                    <button onClick={handleReset} className="btn btn-primary">
                      Start Over
                    </button>
                    <button
                      onClick={handleCompletion}
                      className="btn btn-secondary ml-4"
                    >
                      I'm Done (Clean Up)
                    </button>
                  </div>
                </div>
              )}

              {/* Question History */}
              {history.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                    Question History
                  </h2>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    {history.map((item, index) => (
                      <div
                        key={index}
                        className={`p-3 ${
                          index !== history.length - 1
                            ? "border-b border-gray-200 dark:border-gray-600"
                            : ""
                        }`}
                      >
                        <p className="font-medium text-gray-800 dark:text-white">
                          Q: {item.question}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                          A: {item.result.answer}
                          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                            (Confidence:{" "}
                            {(item.result.answer_confidence * 100).toFixed(1)}%)
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Inference;
