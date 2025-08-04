import api from "./api";
import { AUTH_ENDPOINTS, USER_ENDPOINTS } from "../constants/apiEndpoints";

// Authentication endpoints
export const authService = {
  // Login user
  login: async (credentials) => {
    const response = await api.post(AUTH_ENDPOINTS.LOGIN, credentials);
    return response.data;
  },

  // Register new user
  signup: async (userData) => {
    const response = await api.post(AUTH_ENDPOINTS.REGISTER, userData);
    return response.data;
  },

  // Get current user profile
  getProfile: async () => {
    const response = await api.get(USER_ENDPOINTS.PROFILE);
    return response.data;
  },

  // Update user profile
  updateProfile: async (userData) => {
    const response = await api.put(USER_ENDPOINTS.UPDATE_PROFILE, userData);
    return response.data;
  },

  // Forgot password
  forgotPassword: async (email) => {
    const response = await api.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, { email });
    return response.data;
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    const response = await api.post(AUTH_ENDPOINTS.RESET_PASSWORD, {
      token,
      newPassword,
    });
    return response.data;
  },

  // Verify email
  verifyEmail: async (token) => {
    const response = await api.post(AUTH_ENDPOINTS.VERIFY_EMAIL, { token });
    return response.data;
  },

  // Logout (client-side)
  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authState");
  },
};

export default authService;
