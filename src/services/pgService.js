import api from "./api";
import { PG_ENDPOINTS } from "../constants/apiEndpoints";

// Utility function to convert file to base64
const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Remove the data:image/jpeg;base64, prefix
      const base64String = reader.result.split(",")[1];
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
  });
};

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
    // Convert images to base64 strings
    const base64Images = [];
    for (const image of images) {
      const base64 = await convertFileToBase64(image);
      base64Images.push(base64);
    }

    // Extract ownerId from pgData and remove it to avoid duplication
    const { ownerId, ...pgDataWithoutOwnerId } = pgData;

    // Send everything as a single JSON object
    const requestData = {
      pgData: pgDataWithoutOwnerId, // Send pgData without ownerId
      ownerId: ownerId, // Send ownerId separately
      images: base64Images,
    };

    const response = await api.post(PG_ENDPOINTS.BASE, requestData);
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
    // Convert images to base64 strings
    const base64Images = [];
    for (const image of images) {
      const base64 = await convertFileToBase64(image);
      base64Images.push(base64);
    }

    // Send images as JSON array
    const response = await api.post(PG_ENDPOINTS.UPLOAD_IMAGES(pgId), {
      images: base64Images,
    });
    return response.data;
  },
};

export default pgService;
