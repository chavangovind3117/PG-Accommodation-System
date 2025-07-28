import api from "./api";

export const pgService = {
  // Get all PGs with optional filters
  getAllPGs: async (filters = {}) => {
    const response = await api.get("/pgs", { params: filters });
    return response.data;
  },

  // Get PG by ID
  getPGById: async (id) => {
    const response = await api.get(`/pgs/${id}`);
    return response.data;
  },

  // Create new PG (for owners)
  createPG: async (pgData) => {
    const response = await api.post("/pgs", pgData);
    return response.data;
  },

  // Update PG (for owners)
  updatePG: async (id, pgData) => {
    const response = await api.put(`/pgs/${id}`, pgData);
    return response.data;
  },

  // Delete PG (for owners)
  deletePG: async (id) => {
    const response = await api.delete(`/pgs/${id}`);
    return response.data;
  },

  // Search PGs with advanced filters
  searchPGs: async (searchParams) => {
    const response = await api.get("/pgs/search", { params: searchParams });
    return response.data;
  },

  // Get PGs by owner
  getPGsByOwner: async (ownerId) => {
    const response = await api.get(`/pgs/owner/${ownerId}`);
    return response.data;
  },

  // Get featured PGs
  getFeaturedPGs: async () => {
    const response = await api.get("/pgs/featured");
    return response.data;
  },

  // Upload PG images
  uploadImages: async (pgId, images) => {
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append("images", image);
    });

    const response = await api.post(`/pgs/${pgId}/images`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Add review to PG
  addReview: async (pgId, reviewData) => {
    const response = await api.post(`/pgs/${pgId}/reviews`, reviewData);
    return response.data;
  },

  // Get PG reviews
  getPGReviews: async (pgId) => {
    const response = await api.get(`/pgs/${pgId}/reviews`);
    return response.data;
  },

  // Toggle PG favorite status
  toggleFavorite: async (pgId) => {
    const response = await api.post(`/pgs/${pgId}/favorite`);
    return response.data;
  },

  // Get user's favorite PGs
  getFavoritePGs: async () => {
    const response = await api.get("/pgs/favorites");
    return response.data;
  },
};
