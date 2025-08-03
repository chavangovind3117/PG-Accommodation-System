import api from "./api";

// Authentication endpoints
export const authService = {
  // Login user
  login: async (credentials) => {
    const response = await api.post("/users/login", credentials);
    return response.data;
  },

  // Register new user
  signup: async (userData) => {
    const response = await api.post("/users", userData);
    return response.data;
  },

  // Get current user profile
  getProfile: async () => {
    const response = await api.get("/users/profile");
    return response.data;
  },

  // Update user profile
  updateProfile: async (userData) => {
    const response = await api.put("/users/profile", userData);
    return response.data;
  },

  // Forgot password
  forgotPassword: async (email) => {
    const response = await api.post("/users/forgot-password", { email });
    return response.data;
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    const response = await api.post("/users/reset-password", {
      token,
      newPassword,
    });
    return response.data;
  },

  // Verify email
  verifyEmail: async (token) => {
    const response = await api.post("/users/verify-email", { token });
    return response.data;
  },

  // Logout (client-side)
  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authState");
  },
};

export default authService;
