import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookingService from "../../services/bookingService";

// Async thunks
export const fetchUserBookings = createAsyncThunk(
  "booking/fetchUserBookings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await bookingService.getUserBookings();
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user bookings"
      );
    }
  }
);

export const fetchOwnerBookings = createAsyncThunk(
  "booking/fetchOwnerBookings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await bookingService.getOwnerBookings();
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch owner bookings"
      );
    }
  }
);

export const fetchBookingById = createAsyncThunk(
  "booking/fetchBookingById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await bookingService.getBookingById(id);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch booking"
      );
    }
  }
);

export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await bookingService.createBooking(bookingData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create booking"
      );
    }
  }
);

export const updateBooking = createAsyncThunk(
  "booking/updateBooking",
  async ({ id, bookingData }, { rejectWithValue }) => {
    try {
      const response = await bookingService.updateBooking(id, bookingData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update booking"
      );
    }
  }
);

export const cancelBooking = createAsyncThunk(
  "booking/cancelBooking",
  async (id, { rejectWithValue }) => {
    try {
      const response = await bookingService.cancelBooking(id);
      return { id, ...response };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to cancel booking"
      );
    }
  }
);

export const approveBooking = createAsyncThunk(
  "booking/approveBooking",
  async (id, { rejectWithValue }) => {
    try {
      const response = await bookingService.approveBooking(id);
      return { id, ...response };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to approve booking"
      );
    }
  }
);

export const rejectBooking = createAsyncThunk(
  "booking/rejectBooking",
  async ({ id, reason }, { rejectWithValue }) => {
    try {
      const response = await bookingService.rejectBooking(id, reason);
      return { id, reason, ...response };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to reject booking"
      );
    }
  }
);

export const fetchBookingStats = createAsyncThunk(
  "booking/fetchBookingStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await bookingService.getBookingStats();
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch booking stats"
      );
    }
  }
);

export const checkAvailability = createAsyncThunk(
  "booking/checkAvailability",
  async ({ pgId, checkInDate, checkOutDate }, { rejectWithValue }) => {
    try {
      const response = await bookingService.checkAvailability(
        pgId,
        checkInDate,
        checkOutDate
      );
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to check availability"
      );
    }
  }
);

const initialState = {
  userBookings: [],
  ownerBookings: [],
  currentBooking: null,
  bookingStats: null,
  availability: null,
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
    },
    clearAvailability: (state) => {
      state.availability = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch user bookings
      .addCase(fetchUserBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.userBookings = action.payload;
        state.error = null;
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch owner bookings
      .addCase(fetchOwnerBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOwnerBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.ownerBookings = action.payload;
        state.error = null;
      })
      .addCase(fetchOwnerBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch booking by ID
      .addCase(fetchBookingById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBooking = action.payload;
        state.error = null;
      })
      .addCase(fetchBookingById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create booking
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.userBookings.push(action.payload);
        state.error = null;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update booking
      .addCase(updateBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        state.loading = false;
        // Update in userBookings
        const userIndex = state.userBookings.findIndex(
          (booking) => booking.id === action.payload.id
        );
        if (userIndex !== -1) {
          state.userBookings[userIndex] = action.payload;
        }
        // Update in ownerBookings
        const ownerIndex = state.ownerBookings.findIndex(
          (booking) => booking.id === action.payload.id
        );
        if (ownerIndex !== -1) {
          state.ownerBookings[ownerIndex] = action.payload;
        }
        // Update currentBooking
        if (
          state.currentBooking &&
          state.currentBooking.id === action.payload.id
        ) {
          state.currentBooking = action.payload;
        }
        state.error = null;
      })
      .addCase(updateBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Cancel booking
      .addCase(cancelBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.loading = false;
        // Update booking status in both arrays
        const updateBookingStatus = (bookings) => {
          const index = bookings.findIndex(
            (booking) => booking.id === action.payload.id
          );
          if (index !== -1) {
            bookings[index] = { ...bookings[index], status: "CANCELLED" };
          }
        };
        updateBookingStatus(state.userBookings);
        updateBookingStatus(state.ownerBookings);
        if (
          state.currentBooking &&
          state.currentBooking.id === action.payload.id
        ) {
          state.currentBooking = {
            ...state.currentBooking,
            status: "CANCELLED",
          };
        }
        state.error = null;
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Approve booking
      .addCase(approveBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveBooking.fulfilled, (state, action) => {
        state.loading = false;
        // Update booking status in ownerBookings
        const index = state.ownerBookings.findIndex(
          (booking) => booking.id === action.payload.id
        );
        if (index !== -1) {
          state.ownerBookings[index] = {
            ...state.ownerBookings[index],
            status: "APPROVED",
          };
        }
        if (
          state.currentBooking &&
          state.currentBooking.id === action.payload.id
        ) {
          state.currentBooking = {
            ...state.currentBooking,
            status: "APPROVED",
          };
        }
        state.error = null;
      })
      .addCase(approveBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Reject booking
      .addCase(rejectBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectBooking.fulfilled, (state, action) => {
        state.loading = false;
        // Update booking status in ownerBookings
        const index = state.ownerBookings.findIndex(
          (booking) => booking.id === action.payload.id
        );
        if (index !== -1) {
          state.ownerBookings[index] = {
            ...state.ownerBookings[index],
            status: "REJECTED",
            rejectionReason: action.payload.reason,
          };
        }
        if (
          state.currentBooking &&
          state.currentBooking.id === action.payload.id
        ) {
          state.currentBooking = {
            ...state.currentBooking,
            status: "REJECTED",
            rejectionReason: action.payload.reason,
          };
        }
        state.error = null;
      })
      .addCase(rejectBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch booking stats
      .addCase(fetchBookingStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingStats.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingStats = action.payload;
        state.error = null;
      })
      .addCase(fetchBookingStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Check availability
      .addCase(checkAvailability.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAvailability.fulfilled, (state, action) => {
        state.loading = false;
        state.availability = action.payload;
        state.error = null;
      })
      .addCase(checkAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearCurrentBooking, clearAvailability } =
  bookingSlice.actions;

export default bookingSlice.reducer;
