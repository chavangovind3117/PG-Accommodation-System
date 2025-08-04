import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authService";

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("authState");
    if (serializedState === null) {
      return {
        user: null,
        isAuthenticated: false,
        userRole: null,
        loading: false,
        error: null,
        token: null,
      };
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Error loading auth state:", error);
    return {
      user: null,
      isAuthenticated: false,
      userRole: null,
      loading: false,
      error: null,
      token: null,
    };
  }
};

const initialState = loadState();

// Async thunks
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      console.log("Backend login response:", response);

      // Store token separately
      if (response.token) {
        localStorage.setItem("authToken", response.token);
      }

      // Include the requested role in the response
      return {
        ...response,
        requestedRole: credentials.role,
      };
    } catch (error) {
      console.error("Login error:", error);
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Login failed"
      );
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.signup(userData);
      console.log("Backend signup response:", response);

      // Store token separately
      if (response.token) {
        localStorage.setItem("authToken", response.token);
      }

      return response;
    } catch (error) {
      console.error("Signup error:", error);
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Signup failed"
      );
    }
  }
);

export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getProfile();
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get profile"
      );
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.updateProfile(userData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.userRole = action.payload.role;
      state.token = action.payload.token;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.userRole = null;
      state.loading = false;
      state.error = null;
      state.token = null;
      // Clear localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("authState");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;

        // Handle different response structures from backend
        const response = action.payload;
        state.user = response.user || response;
        state.token = response.token || response.jwt;

        // Use the requested role from the login form, or get from user object
        state.userRole =
          response.requestedRole ||
          (response.user && response.user.role) ||
          response.role;

        state.error = null;

        console.log("Login successful - User role set to:", state.userRole);
        console.log("Requested role:", response.requestedRole);
        console.log("User object from backend:", state.user);
        console.log("Full action payload:", response);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;

        // Handle different response structures from backend
        const response = action.payload;
        state.user = response.user || response;
        state.token = response.token || response.jwt;
        state.userRole = (response.user && response.user.role) || response.role;
        state.error = null;

        console.log("Signup successful - User role set to:", state.userRole);
        console.log("Signup response:", response);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Profile
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Middleware to save state to localStorage
export const saveStateMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type?.startsWith("auth/")) {
    const stateToSave = store.getState().auth;
    localStorage.setItem("authState", JSON.stringify(stateToSave));
  }
  return result;
};

export const { loginStart, loginSuccess, loginFailure, logout, clearError } =
  authSlice.actions;

export default authSlice.reducer;
