import api from "./api";

export const bookingService = {
  // Create new booking
  createBooking: async (bookingData) => {
    const response = await api.post("/bookings", bookingData);
    return response.data;
  },

  // Get all bookings for a user
  getUserBookings: async () => {
    const response = await api.get("/bookings/user");
    return response.data;
  },

  // Get all bookings for an owner
  getOwnerBookings: async () => {
    const response = await api.get("/bookings/owner");
    return response.data;
  },

  // Get booking by ID
  getBookingById: async (id) => {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },

  // Update booking status
  updateBookingStatus: async (id, status) => {
    const response = await api.put(`/bookings/${id}/status`, { status });
    return response.data;
  },

  // Cancel booking
  cancelBooking: async (id) => {
    const response = await api.put(`/bookings/${id}/cancel`);
    return response.data;
  },

  // Get booking statistics
  getBookingStats: async () => {
    const response = await api.get("/bookings/stats");
    return response.data;
  },

  // Get upcoming bookings
  getUpcomingBookings: async () => {
    const response = await api.get("/bookings/upcoming");
    return response.data;
  },

  // Get completed bookings
  getCompletedBookings: async () => {
    const response = await api.get("/bookings/completed");
    return response.data;
  },

  // Process payment for booking
  processPayment: async (bookingId, paymentData) => {
    const response = await api.post(
      `/bookings/${bookingId}/payment`,
      paymentData
    );
    return response.data;
  },

  // Get payment history
  getPaymentHistory: async (bookingId) => {
    const response = await api.get(`/bookings/${bookingId}/payments`);
    return response.data;
  },
};
