// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    SIGNUP: "/auth/signup",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
    PROFILE: "/auth/profile",
    CHANGE_PASSWORD: "/auth/change-password",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    VERIFY_EMAIL: "/auth/verify-email",
  },
  PGS: {
    BASE: "/pgs",
    SEARCH: "/pgs/search",
    FEATURED: "/pgs/featured",
    FAVORITES: "/pgs/favorites",
    BY_OWNER: "/pgs/owner",
    IMAGES: "/pgs/images",
    REVIEWS: "/pgs/reviews",
  },
  BOOKINGS: {
    BASE: "/bookings",
    USER: "/bookings/user",
    OWNER: "/bookings/owner",
    STATS: "/bookings/stats",
    UPCOMING: "/bookings/upcoming",
    COMPLETED: "/bookings/completed",
    PAYMENT: "/bookings/payment",
  },
};

// User Roles
export const USER_ROLES = {
  USER: "user",
  OWNER: "owner",
  ADMIN: "admin",
};

// Booking Status
export const BOOKING_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  CANCELLED: "cancelled",
  COMPLETED: "completed",
  ACTIVE: "active",
  UPCOMING: "upcoming",
};

// Room Types
export const ROOM_TYPES = {
  SINGLE: "single",
  DOUBLE: "double",
  TRIPLE: "triple",
  SHARING: "sharing",
};

// Payment Methods
export const PAYMENT_METHODS = {
  CARD: "card",
  UPI: "upi",
  BANK: "bank",
  CASH: "cash",
};

// Amenities
export const AMENITIES = [
  "WiFi",
  "AC",
  "Food",
  "Laundry",
  "Parking",
  "Security",
  "Gym",
  "TV",
  "Housekeeping",
  "Medical",
];

// Cities for PG search
export const CITIES = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Noida",
  "Gurgaon",
  "Faridabad",
  "Ghaziabad",
];

// Price Ranges
export const PRICE_RANGES = [
  { label: "Under ₹5,000", value: "0-5000" },
  { label: "₹5,000 - ₹8,000", value: "5000-8000" },
  { label: "₹8,000 - ₹12,000", value: "8000-12000" },
  { label: "₹12,000 - ₹15,000", value: "12000-15000" },
  { label: "Above ₹15,000", value: "15000-999999" },
];

// File Upload Limits
export const UPLOAD_LIMITS = {
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_IMAGES_PER_PG: 10,
  MIN_IMAGES_PER_PG: 5,
  ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/webp"],
};

// Validation Rules
export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 8,
  PHONE_REGEX: /^[6-9]\d{9}$/,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: "token",
  USER: "user",
  THEME: "theme",
  LANGUAGE: "language",
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 50,
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  UNAUTHORIZED: "You are not authorized to perform this action.",
  NOT_FOUND: "The requested resource was not found.",
  VALIDATION_ERROR: "Please check your input and try again.",
  SERVER_ERROR: "Something went wrong. Please try again later.",
};
