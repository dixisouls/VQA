import axios from "axios";

// Base URL for API requests
const API_BASE_URL = "/api/vqa";

/**
 * Create a configured Axios instance with error handling
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Enhance error information
    const enhancedError = {
      ...error,
      isNetworkError: !error.response,
      statusCode: error.response ? error.response.status : null,
      message: getErrorMessage(error),
    };

    // Log error details to console for debugging
    if (process.env.NODE_ENV !== "production") {
      console.error("API Error:", enhancedError);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
      }
    }

    return Promise.reject(enhancedError);
  }
);

/**
 * Helper to get a user-friendly error message
 */
const getErrorMessage = (error) => {
  if (!error.response) {
    return "Network error. Please check your internet connection.";
  }

  const status = error.response.status;
  const responseData = error.response.data;

  // Handle specific status codes
  switch (status) {
    case 400:
      return responseData.detail || "Invalid request. Please check your input.";
    case 401:
      return "Authentication required. Please log in.";
    case 403:
      return "You do not have permission to access this resource.";
    case 404:
      return "The requested resource was not found.";
    case 500:
      return "Server error. Please try again later.";
    default:
      return responseData.detail || "An unexpected error occurred.";
  }
};

/**
 * Upload an image and create a new session
 * @param {File} imageFile - The image file to upload
 * @returns {Promise<Object>} - Promise with session ID
 */
export const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("file", imageFile);

  try {
    const response = await apiClient.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
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
    const response = await apiClient.post("/ask", {
      session_id: sessionId,
      question: question,
    });
    return response.data;
  } catch (error) {
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
    const response = await apiClient.get(`/session/${sessionId}`);
    return response.data;
  } catch (error) {
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
    const response = await apiClient.post(`/session/${sessionId}/complete`);
    return response.data;
  } catch (error) {
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
    const response = await apiClient.delete(`/session/${sessionId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Check API health status
 * @returns {Promise<Object>} - Promise with health status
 */
export const checkHealth = async () => {
  try {
    // Use axios directly as this endpoint is outside the API_BASE_URL
    const response = await axios.get("/health");
    return response.data;
  } catch (error) {
    throw {
      ...error,
      isNetworkError: !error.response,
      statusCode: error.response ? error.response.status : null,
      message: getErrorMessage(error),
    };
  }
};

// Export all API functions
export default {
  uploadImage,
  askQuestion,
  getSession,
  resetSession,
  completeSession,
  checkHealth,
};
