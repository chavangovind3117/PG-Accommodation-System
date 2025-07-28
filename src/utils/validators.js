import { VALIDATION_RULES } from "./constants";

// Email validation
export const validateEmail = (email) => {
  if (!email) return "Email is required";

  const emailRegex = VALIDATION_RULES.EMAIL_REGEX;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }

  return "";
};

// Password validation
export const validatePassword = (password) => {
  if (!password) return "Password is required";

  if (password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) {
    return `Password must be at least ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} characters long`;
  }

  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter";
  }

  // Check for at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter";
  }

  // Check for at least one number
  if (!/\d/.test(password)) {
    return "Password must contain at least one number";
  }

  return "";
};

// Phone number validation
export const validatePhone = (phone) => {
  if (!phone) return "Phone number is required";

  const phoneRegex = VALIDATION_RULES.PHONE_REGEX;
  if (!phoneRegex.test(phone)) {
    return "Please enter a valid 10-digit phone number";
  }

  return "";
};

// Name validation
export const validateName = (name) => {
  if (!name) return "Name is required";

  if (name.length < VALIDATION_RULES.NAME_MIN_LENGTH) {
    return `Name must be at least ${VALIDATION_RULES.NAME_MIN_LENGTH} characters long`;
  }

  if (name.length > VALIDATION_RULES.NAME_MAX_LENGTH) {
    return `Name must be less than ${VALIDATION_RULES.NAME_MAX_LENGTH} characters`;
  }

  // Check for only letters and spaces
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    return "Name can only contain letters and spaces";
  }

  return "";
};

// Required field validation
export const validateRequired = (value, fieldName) => {
  if (!value || (typeof value === "string" && value.trim() === "")) {
    return `${fieldName} is required`;
  }

  return "";
};

// Price validation
export const validatePrice = (price) => {
  if (!price) return "Price is required";

  const numPrice = Number(price);
  if (isNaN(numPrice)) {
    return "Please enter a valid price";
  }

  if (numPrice < 0) {
    return "Price cannot be negative";
  }

  if (numPrice > 100000) {
    return "Price seems too high. Please check and try again";
  }

  return "";
};

// Date validation
export const validateDate = (date) => {
  if (!date) return "Date is required";

  const selectedDate = new Date(date);
  const today = new Date();

  if (isNaN(selectedDate.getTime())) {
    return "Please enter a valid date";
  }

  if (selectedDate < today) {
    return "Date cannot be in the past";
  }

  return "";
};

// File validation
export const validateFile = (file, options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ["image/jpeg", "image/png", "image/webp"],
    required = false,
  } = options;

  if (!file && required) {
    return "File is required";
  }

  if (!file) return "";

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return `File type not supported. Please upload ${allowedTypes.join(", ")}`;
  }

  // Check file size
  if (file.size > maxSize) {
    return `File size must be less than ${formatFileSize(maxSize)}`;
  }

  return "";
};

// Multiple files validation
export const validateFiles = (files, options = {}) => {
  const {
    maxFiles = 10,
    minFiles = 1,
    maxSize = 5 * 1024 * 1024,
    allowedTypes = ["image/jpeg", "image/png", "image/webp"],
  } = options;

  if (!files || files.length === 0) {
    return minFiles > 0 ? `At least ${minFiles} file(s) required` : "";
  }

  if (files.length < minFiles) {
    return `At least ${minFiles} file(s) required`;
  }

  if (files.length > maxFiles) {
    return `Maximum ${maxFiles} files allowed`;
  }

  for (let i = 0; i < files.length; i++) {
    const error = validateFile(files[i], { maxSize, allowedTypes });
    if (error) {
      return `File ${i + 1}: ${error}`;
    }
  }

  return "";
};

// Form validation helper
export const validateForm = (formData, validationRules) => {
  const errors = {};

  Object.keys(validationRules).forEach((field) => {
    const value = formData[field];
    const rule = validationRules[field];

    if (rule.required && !value) {
      errors[field] = `${field} is required`;
      return;
    }

    if (value && rule.validator) {
      const error = rule.validator(value);
      if (error) {
        errors[field] = error;
      }
    }
  });

  return errors;
};

// Helper function for file size formatting (used in validateFile)
const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
