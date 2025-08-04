import api from "./api";
import { BOOKING_ENDPOINTS } from "../constants/apiEndpoints";

// Booking endpoints
export const bookingService = {
  // Get all bookings for current user
  getUserBookings: async () => {
    const response = await api.get(BOOKING_ENDPOINTS.BASE);
    return response.data;
  },

  // Get all bookings for PG owner
  getOwnerBookings: async () => {
    const response = await api.get(BOOKING_ENDPOINTS.BASE);
    return response.data;
  },

  // Get booking by ID
  getBookingById: async (id) => {
    const response = await api.get(BOOKING_ENDPOINTS.BY_ID(id));
    return response.data;
  },

  // Create new booking
  createBooking: async (bookingData) => {
    const response = await api.post(BOOKING_ENDPOINTS.BASE, bookingData);
    return response.data;
  },

  // Update booking
  updateBooking: async (id, bookingData) => {
    const response = await api.put(BOOKING_ENDPOINTS.BY_ID(id), bookingData);
    return response.data;
  },

  // Cancel booking
  cancelBooking: async (id) => {
    const response = await api.patch(BOOKING_ENDPOINTS.CANCEL(id));
    return response.data;
  },

  // Approve booking (for owners)
  approveBooking: async (id) => {
    const response = await api.patch(`${BOOKING_ENDPOINTS.BY_ID(id)}/approve`);
    return response.data;
  },

  // Reject booking (for owners)
  rejectBooking: async (id, reason) => {
    const response = await api.patch(`${BOOKING_ENDPOINTS.BY_ID(id)}/reject`, {
      reason,
    });
    return response.data;
  },

  // Get booking statistics
  getBookingStats: async () => {
    const response = await api.get(`${BOOKING_ENDPOINTS.BASE}/stats`);
    return response.data;
  },

  // Check PG availability
  checkAvailability: async (pgId, checkInDate, checkOutDate) => {
    const response = await api.get(
      `${BOOKING_ENDPOINTS.BASE}/availability/${pgId}`,
      {
        params: { checkInDate, checkOutDate },
      }
    );
    return response.data;
  },
};

export default bookingService;
