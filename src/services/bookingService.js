import api from "./api";

// Booking endpoints
export const bookingService = {
  // Get all bookings for current user
  getUserBookings: async () => {
    const response = await api.get("/bookings/user");
    return response.data;
  },

  // Get all bookings for PG owner
  getOwnerBookings: async () => {
    const response = await api.get("/bookings/owner");
    return response.data;
  },

  // Get booking by ID
  getBookingById: async (id) => {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },

  // Create new booking
  createBooking: async (bookingData) => {
    const response = await api.post("/bookings", bookingData);
    return response.data;
  },

  // Update booking
  updateBooking: async (id, bookingData) => {
    const response = await api.put(`/bookings/${id}`, bookingData);
    return response.data;
  },

  // Cancel booking
  cancelBooking: async (id) => {
    const response = await api.patch(`/bookings/${id}/cancel`);
    return response.data;
  },

  // Approve booking (for owners)
  approveBooking: async (id) => {
    const response = await api.patch(`/bookings/${id}/approve`);
    return response.data;
  },

  // Reject booking (for owners)
  rejectBooking: async (id, reason) => {
    const response = await api.patch(`/bookings/${id}/reject`, { reason });
    return response.data;
  },

  // Get booking statistics
  getBookingStats: async () => {
    const response = await api.get("/bookings/stats");
    return response.data;
  },

  // Check PG availability
  checkAvailability: async (pgId, checkInDate, checkOutDate) => {
    const response = await api.get(`/bookings/availability/${pgId}`, {
      params: { checkInDate, checkOutDate },
    });
    return response.data;
  },
};

export default bookingService;
