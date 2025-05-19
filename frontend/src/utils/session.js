/**
 * Session storage utilities for managing VizWiz sessions
 */

const SESSION_KEY = "vizwiz_session";
const HISTORY_KEY = "vizwiz_history";

/**
 * Save session ID to local storage
 * @param {string} sessionId - Session ID from the backend
 */
export const saveSession = (sessionId) => {
  localStorage.setItem(SESSION_KEY, sessionId);
};

/**
 * Get session ID from local storage
 * @returns {string|null} - Session ID or null if not found
 */
export const getSession = () => {
  return localStorage.getItem(SESSION_KEY);
};

/**
 * Clear session from local storage
 */
export const clearSession = () => {
  localStorage.removeItem(SESSION_KEY);
};

/**
 * Save question history to local storage
 * @param {Array} history - Array of question-answer pairs
 */
export const saveHistory = (history) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
};

/**
 * Get question history from local storage
 * @returns {Array} - Array of question-answer pairs
 */
export const getHistory = () => {
  const history = localStorage.getItem(HISTORY_KEY);
  return history ? JSON.parse(history) : [];
};

/**
 * Add a new question-answer pair to history
 * @param {string} question - The question asked
 * @param {Object} result - The answer result from the API
 * @returns {Array} - Updated history array
 */
export const addToHistory = (question, result) => {
  const history = getHistory();
  const updatedHistory = [
    ...history,
    {
      question,
      result,
      timestamp: new Date().toISOString(),
    },
  ];

  // Limit history to last 20 items
  if (updatedHistory.length > 20) {
    updatedHistory.splice(0, updatedHistory.length - 20);
  }

  saveHistory(updatedHistory);
  return updatedHistory;
};

/**
 * Clear question history from local storage
 */
export const clearHistory = () => {
  localStorage.removeItem(HISTORY_KEY);
};

/**
 * Check if there's an active session
 * @returns {boolean} - True if session exists
 */
export const hasActiveSession = () => {
  return !!getSession();
};

export default {
  saveSession,
  getSession,
  clearSession,
  saveHistory,
  getHistory,
  addToHistory,
  clearHistory,
  hasActiveSession,
};
