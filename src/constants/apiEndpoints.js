// API Base URL
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api";

// Auth endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  LOGOUT: "/auth/logout",
  REFRESH_TOKEN: "/auth/refresh",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",
  VERIFY_EMAIL: "/auth/verify-email",
};

// PG endpoints
export const PG_ENDPOINTS = {
  BASE: "/pgs",
  BY_ID: (id) => `/pgs/${id}`,
  BY_OWNER: (ownerId) => `/pgs/owner/${ownerId}`,
  SEARCH: "/pgs/search",
  TEST: "/pgs/test",
  UPLOAD_IMAGES: (id) => `/pgs/${id}/images`,
};

// Booking endpoints
export const BOOKING_ENDPOINTS = {
  BASE: "/bookings",
  BY_ID: (id) => `/bookings/${id}`,
  BY_USER: (userId) => `/bookings/user/${userId}`,
  BY_PG: (pgId) => `/bookings/pg/${pgId}`,
  CANCEL: (id) => `/bookings/${id}/cancel`,
};

// User endpoints
export const USER_ENDPOINTS = {
  BASE: "/users",
  PROFILE: "/users/profile",
  UPDATE_PROFILE: "/users/profile",
  CHANGE_PASSWORD: "/users/change-password",
};

// HTTP Methods
export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

// Response Status
export const RESPONSE_STATUS = {
  SUCCESS: "success",
  ERROR: "error",
  LOADING: "loading",
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  UNAUTHORIZED: "You are not authorized to perform this action.",
  NOT_FOUND: "The requested resource was not found.",
  SERVER_ERROR: "Server error. Please try again later.",
  VALIDATION_ERROR: "Please check your input and try again.",
};
