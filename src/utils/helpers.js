// Generate random ID
export const generateId = (length = 8) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function
export const throttle = (func, limit) => {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Deep clone object
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map((item) => deepClone(item));
  if (typeof obj === "object") {
    const clonedObj = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
};

// Check if object is empty
export const isEmpty = (obj) => {
  if (obj == null) return true;
  if (Array.isArray(obj) || typeof obj === "string") return obj.length === 0;
  if (obj instanceof Map || obj instanceof Set) return obj.size === 0;
  if (typeof obj === "object") return Object.keys(obj).length === 0;
  return false;
};

// Get nested object property safely
export const getNestedValue = (obj, path, defaultValue = undefined) => {
  const keys = path.split(".");
  let result = obj;

  for (const key of keys) {
    if (result == null || typeof result !== "object") {
      return defaultValue;
    }
    result = result[key];
  }

  return result !== undefined ? result : defaultValue;
};

// Set nested object property safely
export const setNestedValue = (obj, path, value) => {
  const keys = path.split(".");
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current) || typeof current[key] !== "object") {
      current[key] = {};
    }
    current = current[key];
  }

  current[keys[keys.length - 1]] = value;
  return obj;
};

// Capitalize first letter
export const capitalize = (str) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Convert string to title case
export const toTitleCase = (str) => {
  if (!str) return str;
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Convert camelCase to kebab-case
export const camelToKebab = (str) => {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
};

// Convert kebab-case to camelCase
export const kebabToCamel = (str) => {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
};

// Format number with commas
export const formatNumber = (num) => {
  if (num == null) return "0";
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Calculate percentage
export const calculatePercentage = (value, total) => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};

// Check if value is between two numbers
export const isBetween = (value, min, max) => {
  return value >= min && value <= max;
};

// Round to specified decimal places
export const roundTo = (num, decimals = 2) => {
  return (
    Math.round((num + Number.EPSILON) * Math.pow(10, decimals)) /
    Math.pow(10, decimals)
  );
};

// Sleep function (for async operations)
export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Retry function with exponential backoff
export const retry = async (fn, maxAttempts = 3, delay = 1000) => {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxAttempts) throw error;
      await sleep(delay * Math.pow(2, attempt - 1));
    }
  }
};

// Check if device is mobile
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

// Check if device is iOS
export const isIOS = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

// Check if device is Android
export const isAndroid = () => {
  return /Android/.test(navigator.userAgent);
};

// Get browser name
export const getBrowser = () => {
  const userAgent = navigator.userAgent;
  if (userAgent.includes("Chrome")) return "Chrome";
  if (userAgent.includes("Firefox")) return "Firefox";
  if (userAgent.includes("Safari")) return "Safari";
  if (userAgent.includes("Edge")) return "Edge";
  if (userAgent.includes("Opera")) return "Opera";
  return "Unknown";
};

// Copy text to clipboard
export const copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      return true;
    }
  } catch (error) {
    console.error("Failed to copy text:", error);
    return false;
  }
};

// Download file
export const downloadFile = (url, filename) => {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Get file extension
export const getFileExtension = (filename) => {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
};

// Check if file is image
export const isImageFile = (file) => {
  const imageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  return imageTypes.includes(file.type);
};

// Get initials from name
export const getInitials = (name) => {
  if (!name) return "";
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// API Response Helpers
export const handleApiResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  throw new Error(`HTTP error! status: ${response.status}`);
};

export const handleApiError = (error) => {
  console.error("API Error:", error);
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  return error.message || "An unexpected error occurred";
};

// Date Helpers
export const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatDateTime = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Price Helpers
export const formatPrice = (price) => {
  if (!price) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(price);
};

// Validation Helpers
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

// Storage Helpers
export const getStoredToken = () => {
  return localStorage.getItem("authToken");
};

export const setStoredToken = (token) => {
  localStorage.setItem("authToken", token);
};

export const removeStoredToken = () => {
  localStorage.removeItem("authToken");
};

// Status Helpers
export const getStatusColor = (status) => {
  switch (status?.toUpperCase()) {
    case "ACTIVE":
    case "APPROVED":
      return "green";
    case "PENDING":
      return "yellow";
    case "CANCELLED":
    case "REJECTED":
      return "red";
    case "COMPLETED":
      return "blue";
    default:
      return "gray";
  }
};

export const getStatusText = (status) => {
  switch (status?.toUpperCase()) {
    case "ACTIVE":
      return "Active";
    case "PENDING":
      return "Pending";
    case "APPROVED":
      return "Approved";
    case "CANCELLED":
      return "Cancelled";
    case "REJECTED":
      return "Rejected";
    case "COMPLETED":
      return "Completed";
    default:
      return status || "Unknown";
  }
};

// File Helpers
export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const validateImageFile = (file) => {
  const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    return "Please select a valid image file (JPEG, PNG, or WebP)";
  }

  if (file.size > maxSize) {
    return "Image size should be less than 5MB";
  }

  return null;
};
