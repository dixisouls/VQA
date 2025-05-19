import axios from "axios";

// Base URL for API requests
const API_BASE_URL = "/api/vqa";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Upload an image and create a new session
 * @param {File} imageFile - The image file to upload
 * @returns {Promise<Object>} - Promise with session ID
 */
export const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("file", imageFile);

  try {
    // For debugging
    console.log("Uploading image to:", `${API_BASE_URL}/upload`);

    const response = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Upload response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    // For debugging
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
    }
    throw error;
  }
};

/**
 * Ask a question about the uploaded image
 * @param {string} sessionId - The session ID
 * @param {string} question - The question about the image
 * @returns {Promise<Object>} - Promise with answer details
 */
export const askQuestion = async (sessionId, question) => {
  try {
    // For debugging
    console.log("Asking question:", `${API_BASE_URL}/ask`, {
      session_id: sessionId,
      question,
    });

    const response = await api.post("/ask", {
      session_id: sessionId,
      question: question,
    });

    console.log("Question response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error asking question:", error);
    // For debugging
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
    }
    throw error;
  }
};

/**
 * Get session information including question history
 * @param {string} sessionId - The session ID
 * @returns {Promise<Object>} - Promise with session details
 */
export const getSession = async (sessionId) => {
  try {
    const response = await api.get(`/session/${sessionId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting session:", error);
    throw error;
  }
};

/**
 * Mark a session as complete (cleans up server resources)
 * @param {string} sessionId - The session ID
 * @returns {Promise<Object>} - Promise with success message
 */
export const completeSession = async (sessionId) => {
  try {
    const response = await api.post(`/session/${sessionId}/complete`);
    return response.data;
  } catch (error) {
    console.error("Error completing session:", error);
    throw error;
  }
};

/**
 * Reset (delete) a session
 * @param {string} sessionId - The session ID
 * @returns {Promise<Object>} - Promise with success message
 */
export const resetSession = async (sessionId) => {
  try {
    const response = await api.delete(`/session/${sessionId}`);
    return response.data;
  } catch (error) {
    console.error("Error resetting session:", error);
    throw error;
  }
};

/**
 * Check API health status
 * @returns {Promise<Object>} - Promise with health status
 */
export const checkHealth = async () => {
  try {
    const response = await axios.get("/health");
    return response.data;
  } catch (error) {
    console.error("API health check failed:", error);
    throw error;
  }
};

export default {
  uploadImage,
  askQuestion,
  getSession,
  resetSession,
  completeSession,
  checkHealth,
};
