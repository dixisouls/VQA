import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

const UploadComponent = ({ onImageUpload, loading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

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

    // Update state with selected file
    setFileName(file.name);
    setPreviewImage(URL.createObjectURL(file));

    // Pass the file to parent component
    onImageUpload(file);
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

  return (
    <div className="w-full">
      <div
        className={`relative w-full p-6 border-2 border-dashed rounded-lg transition-all duration-300 ${
          dragActive
            ? "border-primary-600 bg-primary-50 dark:bg-primary-900/20"
            : "border-gray-300 dark:border-gray-700"
        } ${previewImage ? "bg-gray-50 dark:bg-gray-800/50" : ""}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {/* Show either the preview or the upload UI */}
        {previewImage ? (
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-md overflow-hidden rounded-lg shadow-lg">
              <motion.img
                src={previewImage}
                alt="Preview"
                className="w-full h-auto object-contain"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              />

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
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

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {fileName}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6">
            <svg
              className="w-12 h-12 mb-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>

            <p className="mb-2 text-lg font-medium text-gray-700 dark:text-gray-300">
              Drag and drop your image here
            </p>

            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              or click to select a file (PNG, JPG up to 5MB)
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary"
              onClick={onButtonClick}
              disabled={loading}
            >
              Select Image
            </motion.button>
          </div>
        )}

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
  );
};

export default UploadComponent;
