import { ERROR_MESSAGES } from "../constants/apiEndpoints";

// Error handling utility
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;

    switch (status) {
      case 400:
        return data?.message || ERROR_MESSAGES.VALIDATION_ERROR;
      case 401:
        return ERROR_MESSAGES.UNAUTHORIZED;
      case 404:
        return ERROR_MESSAGES.NOT_FOUND;
      case 500:
        return ERROR_MESSAGES.SERVER_ERROR;
      default:
        return data?.message || ERROR_MESSAGES.SERVER_ERROR;
    }
  } else if (error.request) {
    // Network error
    return ERROR_MESSAGES.NETWORK_ERROR;
  } else {
    // Other error
    return error.message || ERROR_MESSAGES.SERVER_ERROR;
  }
};

// Response formatting utility
export const formatApiResponse = (response) => {
  return {
    data: response.data,
    status: response.status,
    success: response.status >= 200 && response.status < 300,
  };
};

// Data validation utility
export const validateRequiredFields = (data, requiredFields) => {
  const missingFields = [];

  requiredFields.forEach((field) => {
    if (
      !data[field] ||
      (typeof data[field] === "string" && data[field].trim() === "")
    ) {
      missingFields.push(field);
    }
  });

  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
  }

  return true;
};

// File validation utility
export const validateFile = (file, options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ["image/jpeg", "image/png", "image/webp"],
    maxFiles = 10,
  } = options;

  if (!file) {
    throw new Error("No file provided");
  }

  if (file.size > maxSize) {
    throw new Error(`File size must be less than ${maxSize / (1024 * 1024)}MB`);
  }

  if (!allowedTypes.includes(file.type)) {
    throw new Error(`File type must be one of: ${allowedTypes.join(", ")}`);
  }

  return true;
};

// URL parameter builder
export const buildQueryParams = (params) => {
  const queryParams = new URLSearchParams();

  Object.keys(params).forEach((key) => {
    if (
      params[key] !== undefined &&
      params[key] !== null &&
      params[key] !== ""
    ) {
      if (Array.isArray(params[key])) {
        params[key].forEach((value) => {
          queryParams.append(key, value);
        });
      } else {
        queryParams.append(key, params[key]);
      }
    }
  });

  return queryParams.toString();
};

// Date formatting utility
export const formatDate = (date) => {
  if (!date) return "";

  const d = new Date(date);
  return d.toISOString().split("T")[0];
};

// Price formatting utility
export const formatPrice = (price) => {
  if (!price) return "₹0";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// Local storage utilities
export const storageUtils = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  },

  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return defaultValue;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  },

  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  },
};
