import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const UploadComponent = ({ onImageUpload, loading }) => {
  // State
  const [dragActive, setDragActive] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [showPreviewAnimation, setShowPreviewAnimation] = useState(false);

  // Refs
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  // Animation variants
  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const uploadIconVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.2 },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3, repeat: Infinity, repeatType: "reverse" },
    },
  };

  const previewVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3 },
    },
  };

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // Handle file input change
  const handleChange = (e) => {
    e.preventDefault();

    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  // Process the selected file
  const handleFile = (file) => {
    // Reset error state
    setError("");

    // Validate file is an image
    if (!file.type.match("image.*")) {
      setError("Please upload an image file (PNG, JPG, JPEG, etc.)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size should be less than 5MB");
      return;
    }

    // Show the loading animation for preview
    setShowPreviewAnimation(true);

    // Small delay to show the loading animation
    setTimeout(() => {
      // Update state with selected file
      setFileName(file.name);
      setPreviewImage(URL.createObjectURL(file));

      // Pass the file to parent component
      onImageUpload(file);

      // Hide the loading animation
      setShowPreviewAnimation(false);
    }, 600);
  };

  // Handle button click to trigger file input
  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  // Clear selected image
  const clearImage = () => {
    setPreviewImage(null);
    setFileName("");
    setError("");
    // Reset parent component state
    onImageUpload(null);
  };

  // Add glow effect to drop zone on hover
  useEffect(() => {
    const dropZone = dropZoneRef.current;
    if (!dropZone) return;

    const handleMouseMove = (e) => {
      if (previewImage) return; // Don't show glow when preview is shown

      const rect = dropZone.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      dropZone.style.setProperty("--mouse-x", `${x}px`);
      dropZone.style.setProperty("--mouse-y", `${y}px`);
    };

    dropZone.addEventListener("mousemove", handleMouseMove);
    return () => dropZone.removeEventListener("mousemove", handleMouseMove);
  }, [previewImage]);

  return (
    <motion.div
      className="w-full"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div
        ref={dropZoneRef}
        className={`relative w-full p-6 border-2 rounded-xl transition-all duration-300 spotlight ${
          dragActive
            ? "border-brand-500 bg-brand-50/50 dark:bg-brand-900/20"
            : previewImage
            ? "border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800/50"
            : "border-dashed border-surface-300 dark:border-surface-700 hover:border-brand-400 dark:hover:border-brand-600"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {/* Glassmorphism effect for the drop zone */}
        <div className="absolute inset-0 rounded-xl pointer-events-none bg-white/30 dark:bg-surface-800/30 backdrop-blur-xs -z-10"></div>

        {/* Animated blob for the background */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-brand-400/10 dark:bg-brand-600/10 rounded-full filter blur-3xl animate-pulse-subtle -z-20"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-accent-400/10 dark:bg-accent-600/10 rounded-full filter blur-3xl animate-pulse-subtle -z-20"></div>

        {/* Show either the preview or the upload UI */}
        <AnimatePresence mode="wait">
          {showPreviewAnimation ? (
            <motion.div
              key="loading"
              className="flex flex-col items-center justify-center min-h-[200px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="w-16 h-16 relative">
                <div className="absolute inset-0 rounded-full border-4 border-surface-200 dark:border-surface-700"></div>
                <div className="absolute inset-0 rounded-full border-4 border-t-brand-500 border-r-transparent border-b-transparent border-l-transparent animate-spin-slow"></div>
              </div>
              <p className="mt-4 text-surface-600 dark:text-surface-400">
                Processing image...
              </p>
            </motion.div>
          ) : previewImage ? (
            <motion.div
              key="preview"
              className="flex flex-col items-center"
              variants={previewVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="relative w-full max-w-md overflow-hidden rounded-lg">
                <div className="group relative">
                  <motion.img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-auto object-contain max-h-[400px] rounded-lg shadow-md"
                    layoutId="previewImage"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-2 right-2 p-2 bg-surface-900/80 text-white rounded-full shadow-lg backdrop-blur-sm"
                  onClick={clearImage}
                  disabled={loading}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.button>
              </div>

              <motion.p
                className="mt-3 text-sm text-surface-600 dark:text-surface-400 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span className="bg-surface-100 dark:bg-surface-800 px-2 py-1 rounded-md">
                  {fileName}
                </span>
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="upload"
              className="flex flex-col items-center justify-center py-10"
              variants={containerVariants}
            >
              <motion.div
                variants={uploadIconVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className="w-20 h-20 mb-6 text-brand-500 dark:text-brand-400"
              >
                <svg
                  className="w-full h-full"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 16.2091 19.2091 18 17 18H7C4.79086 18 3 16.2091 3 14C3 11.7909 4.79086 10 7 10Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 12V15M12 15L14 13M12 15L10 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>

              <motion.h3
                className="mb-2 text-xl font-medium text-surface-800 dark:text-surface-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Drop your image here
              </motion.h3>

              <motion.p
                className="mb-6 text-center text-surface-600 dark:text-surface-400"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className="block">
                  Drag and drop an image file or click to browse
                </span>
                <span className="text-sm">
                  Supports JPG, PNG, WEBP (max 5MB)
                </span>
              </motion.p>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="btn btn-primary px-6 py-2.5 rounded-lg shadow-md shadow-brand-500/20"
                onClick={onButtonClick}
                disabled={loading}
              >
                Select File
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleChange}
          accept="image/*"
          disabled={loading}
        />
      </div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            className="mt-3 px-4 py-2 bg-tertiary-50 dark:bg-tertiary-900/30 border border-tertiary-200 dark:border-tertiary-800 rounded-lg"
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center text-tertiary-800 dark:text-tertiary-200">
              <svg
                className="w-5 h-5 mr-2 flex-shrink-0"
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
              <p className="text-sm">{error}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default UploadComponent;
