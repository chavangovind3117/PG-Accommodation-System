import { STORAGE_KEYS } from "./constants";

// Local Storage helpers
export const localStorage = {
  // Set item in localStorage
  set: (key, value) => {
    try {
      const serializedValue = JSON.stringify(value);
      window.localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  },

  // Get item from localStorage
  get: (key, defaultValue = null) => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return defaultValue;
    }
  },

  // Remove item from localStorage
  remove: (key) => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  },

  // Clear all localStorage
  clear: () => {
    try {
      window.localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  },

  // Check if key exists in localStorage
  has: (key) => {
    try {
      return window.localStorage.getItem(key) !== null;
    } catch (error) {
      console.error("Error checking localStorage:", error);
      return false;
    }
  },
};

// Session Storage helpers
export const sessionStorage = {
  // Set item in sessionStorage
  set: (key, value) => {
    try {
      const serializedValue = JSON.stringify(value);
      window.sessionStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error("Error saving to sessionStorage:", error);
    }
  },

  // Get item from sessionStorage
  get: (key, defaultValue = null) => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error("Error reading from sessionStorage:", error);
      return defaultValue;
    }
  },

  // Remove item from sessionStorage
  remove: (key) => {
    try {
      window.sessionStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from sessionStorage:", error);
    }
  },

  // Clear all sessionStorage
  clear: () => {
    try {
      window.sessionStorage.clear();
    } catch (error) {
      console.error("Error clearing sessionStorage:", error);
    }
  },

  // Check if key exists in sessionStorage
  has: (key) => {
    try {
      return window.sessionStorage.getItem(key) !== null;
    } catch (error) {
      console.error("Error checking sessionStorage:", error);
      return false;
    }
  },
};

// Auth storage helpers
export const authStorage = {
  // Set auth token
  setToken: (token) => {
    localStorage.set(STORAGE_KEYS.TOKEN, token);
  },

  // Get auth token
  getToken: () => {
    return localStorage.get(STORAGE_KEYS.TOKEN);
  },

  // Remove auth token
  removeToken: () => {
    localStorage.remove(STORAGE_KEYS.TOKEN);
  },

  // Set user data
  setUser: (user) => {
    localStorage.set(STORAGE_KEYS.USER, user);
  },

  // Get user data
  getUser: () => {
    return localStorage.get(STORAGE_KEYS.USER);
  },

  // Remove user data
  removeUser: () => {
    localStorage.remove(STORAGE_KEYS.USER);
  },

  // Clear all auth data
  clearAuth: () => {
    localStorage.remove(STORAGE_KEYS.TOKEN);
    localStorage.remove(STORAGE_KEYS.USER);
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!authStorage.getToken();
  },
};

// Theme storage helpers
export const themeStorage = {
  // Set theme
  setTheme: (theme) => {
    localStorage.set(STORAGE_KEYS.THEME, theme);
  },

  // Get theme
  getTheme: () => {
    return localStorage.get(STORAGE_KEYS.THEME, "light");
  },

  // Toggle theme
  toggleTheme: () => {
    const currentTheme = themeStorage.getTheme();
    const newTheme = currentTheme === "light" ? "dark" : "light";
    themeStorage.setTheme(newTheme);
    return newTheme;
  },
};

// Language storage helpers
export const languageStorage = {
  // Set language
  setLanguage: (language) => {
    localStorage.set(STORAGE_KEYS.LANGUAGE, language);
  },

  // Get language
  getLanguage: () => {
    return localStorage.get(STORAGE_KEYS.LANGUAGE, "en");
  },
};

// Cache helpers
export const cacheStorage = {
  // Set cache item with expiration
  set: (key, value, expirationMinutes = 60) => {
    const item = {
      value,
      timestamp: Date.now(),
      expirationMinutes,
    };
    localStorage.set(`cache_${key}`, item);
  },

  // Get cache item
  get: (key) => {
    const item = localStorage.get(`cache_${key}`);
    if (!item) return null;

    const now = Date.now();
    const expirationTime = item.timestamp + item.expirationMinutes * 60 * 1000;

    if (now > expirationTime) {
      // Cache expired, remove it
      localStorage.remove(`cache_${key}`);
      return null;
    }

    return item.value;
  },

  // Remove cache item
  remove: (key) => {
    localStorage.remove(`cache_${key}`);
  },

  // Clear all cache
  clear: () => {
    const keys = Object.keys(window.localStorage);
    keys.forEach((key) => {
      if (key.startsWith("cache_")) {
        localStorage.remove(key);
      }
    });
  },
};
