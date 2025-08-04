import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import pgService from "../../services/pgService";

// Async thunks
export const fetchAllPGs = createAsyncThunk(
  "pg/fetchAllPGs",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await pgService.getAllPGs(filters);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch PGs"
      );
    }
  }
);

export const fetchPGById = createAsyncThunk(
  "pg/fetchPGById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await pgService.getPGById(id);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch PG"
      );
    }
  }
);

export const createPG = createAsyncThunk(
  "pg/createPG",
  async ({ pgData, images }, { rejectWithValue }) => {
    try {
      const response = await pgService.createPG(pgData, images);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create PG"
      );
    }
  }
);

export const updatePG = createAsyncThunk(
  "pg/updatePG",
  async ({ id, pgData }, { rejectWithValue }) => {
    try {
      const response = await pgService.updatePG(id, pgData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update PG"
      );
    }
  }
);

export const deletePG = createAsyncThunk(
  "pg/deletePG",
  async (id, { rejectWithValue }) => {
    try {
      await pgService.deletePG(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete PG"
      );
    }
  }
);

export const searchPGs = createAsyncThunk(
  "pg/searchPGs",
  async (searchParams, { rejectWithValue }) => {
    try {
      const response = await pgService.searchPGs(searchParams);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to search PGs"
      );
    }
  }
);

export const fetchFeaturedPGs = createAsyncThunk(
  "pg/fetchFeaturedPGs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await pgService.getFeaturedPGs();
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch featured PGs"
      );
    }
  }
);

const initialState = {
  pgs: [],
  featuredPGs: [],
  currentPG: null,
  loading: false,
  error: null,
  searchResults: [],
  filters: {
    city: "",
    minPrice: "",
    maxPrice: "",
    roomType: "",
    amenities: [],
  },
};

const pgSlice = createSlice({
  name: "pg",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentPG: (state) => {
      state.currentPG = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all PGs
      .addCase(fetchAllPGs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPGs.fulfilled, (state, action) => {
        state.loading = false;
        state.pgs = action.payload;
        state.error = null;
      })
      .addCase(fetchAllPGs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch PG by ID
      .addCase(fetchPGById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPGById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPG = action.payload;
        state.error = null;
      })
      .addCase(fetchPGById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create PG
      .addCase(createPG.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPG.fulfilled, (state, action) => {
        state.loading = false;
        state.pgs.push(action.payload);
        state.error = null;
      })
      .addCase(createPG.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update PG
      .addCase(updatePG.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePG.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.pgs.findIndex((pg) => pg.id === action.payload.id);
        if (index !== -1) {
          state.pgs[index] = action.payload;
        }
        if (state.currentPG && state.currentPG.id === action.payload.id) {
          state.currentPG = action.payload;
        }
        state.error = null;
      })
      .addCase(updatePG.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete PG
      .addCase(deletePG.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePG.fulfilled, (state, action) => {
        state.loading = false;
        state.pgs = state.pgs.filter((pg) => pg.id !== action.payload);
        if (state.currentPG && state.currentPG.id === action.payload) {
          state.currentPG = null;
        }
        state.error = null;
      })
      .addCase(deletePG.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Search PGs
      .addCase(searchPGs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchPGs.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
        state.error = null;
      })
      .addCase(searchPGs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch featured PGs
      .addCase(fetchFeaturedPGs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedPGs.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredPGs = action.payload;
        state.error = null;
      })
      .addCase(fetchFeaturedPGs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  clearCurrentPG,
  setFilters,
  clearFilters,
  clearSearchResults,
} = pgSlice.actions;

export default pgSlice.reducer;
