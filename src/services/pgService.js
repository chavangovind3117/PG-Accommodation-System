import api from "./api";
import { PG_ENDPOINTS } from "../constants/apiEndpoints";

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

    const response = await api.get(
      `${PG_ENDPOINTS.BASE}${params.toString() ? `?${params.toString()}` : ""}`
    );
    return response.data;
  },

  // Get PG by ID
  getPGById: async (id) => {
    const response = await api.get(PG_ENDPOINTS.BY_ID(id));
    return response.data;
  },

  // Create new PG (for owners)
  createPG: async (pgData, images = []) => {
    const formData = new FormData();

    // Add PG data as JSON string
    formData.append("pgData", JSON.stringify(pgData));

    // Add owner ID separately
    if (pgData.ownerId) {
      formData.append("ownerId", pgData.ownerId);
    }

    // Add images
    images.forEach((image) => {
      formData.append("images", image);
    });

    const response = await api.post(PG_ENDPOINTS.BASE, formData);
    return response.data;
  },

  // Update PG
  updatePG: async (id, pgData) => {
    const response = await api.put(PG_ENDPOINTS.BY_ID(id), pgData);
    return response.data;
  },

  // Partial update PG
  partialUpdatePG: async (id, pgData) => {
    const response = await api.patch(PG_ENDPOINTS.BY_ID(id), pgData);
    return response.data;
  },

  // Delete PG
  deletePG: async (id) => {
    const response = await api.delete(PG_ENDPOINTS.BY_ID(id));
    return response.data;
  },

  // Get PGs by owner
  getPGsByOwner: async (ownerId) => {
    const response = await api.get(PG_ENDPOINTS.BY_OWNER(ownerId));
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

    const response = await api.get(
      `${PG_ENDPOINTS.SEARCH}?${params.toString()}`
    );
    return response.data;
  },

  // Get featured PGs (using active PGs as featured)
  getFeaturedPGs: async () => {
    const response = await api.get(PG_ENDPOINTS.BASE);
    return response.data;
  },

  // Upload PG images
  uploadImages: async (pgId, images) => {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image);
    });

    const response = await api.post(PG_ENDPOINTS.UPLOAD_IMAGES(pgId), formData);
    return response.data;
  },
};

export default pgService;
