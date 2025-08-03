import api from "./api";

// PG endpoints
export const pgService = {
  // Get all PGs with optional filters
  getAllPGs: async (filters = {}) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach((key) => {
      if (filters[key] !== undefined && filters[key] !== null) {
        params.append(key, filters[key]);
      }
    });

    const response = await api.get(`/pgs?${params.toString()}`);
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

  // Update PG
  updatePG: async (id, pgData) => {
    const response = await api.put(`/pgs/${id}`, pgData);
    return response.data;
  },

  // Partial update PG
  partialUpdatePG: async (id, pgData) => {
    const response = await api.patch(`/pgs/${id}`, pgData);
    return response.data;
  },

  // Delete PG
  deletePG: async (id) => {
    const response = await api.delete(`/pgs/${id}`);
    return response.data;
  },

  // Get PGs by owner
  getPGsByOwner: async (ownerId) => {
    const response = await api.get(`/pgs/owner/${ownerId}`);
    return response.data;
  },

  // Search PGs
  searchPGs: async (searchParams) => {
    const params = new URLSearchParams();
    Object.keys(searchParams).forEach((key) => {
      if (searchParams[key] !== undefined && searchParams[key] !== null) {
        params.append(key, searchParams[key]);
      }
    });

    const response = await api.get(`/pgs/search?${params.toString()}`);
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
    images.forEach((image) => {
      formData.append("images", image);
    });

    const response = await api.post(`/pgs/${pgId}/images`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};

export default pgService;
