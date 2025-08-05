import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  searchPGs,
  clearError,
  clearSearchResults,
} from "../features/pg/pgSlice";
import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/footer";

const FindPG = () => {
  const dispatch = useDispatch();
  const { searchResults, loading, error } = useSelector((state) => state.pg);
  const { userRole } = useSelector((state) => state.auth);

  const [filters, setFilters] = useState({
    city: "",
    minPrice: "",
    maxPrice: "",
    amenities: [],
  });

  const [showFilters, setShowFilters] = useState(false);

  // Available amenities for filter
  const availableAmenities = [
    "Free WiFi",
    "AC Rooms",
    "Parking",
    "Laundry",
    "Meals",
    "Security",
    "CCTV",
    "Power Backup",
    "Study Room",
    "Gym",
    "Garden",
    "Balcony",
    "Attached Bathroom",
    "Furnished Rooms",
    "Hot Water",
    "Lift",
    "24/7 Water Supply",
  ];

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmenityToggle = (amenity) => {
    setFilters((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    // Prepare search parameters
    const searchParams = {};

    if (filters.city) searchParams.city = filters.city;
    if (filters.minPrice) searchParams.minPrice = filters.minPrice;
    if (filters.maxPrice) searchParams.maxPrice = filters.maxPrice;

    // Handle amenities - try different formats
    if (filters.amenities.length > 0) {
      // Try comma-separated string first
      searchParams.amenities = filters.amenities.join(",");

      // Also try as individual parameters for each amenity
      filters.amenities.forEach((amenity, index) => {
        searchParams[`amenity${index}`] = amenity;
      });
    }

    console.log("Search parameters:", searchParams);

    try {
      const result = await dispatch(searchPGs(searchParams)).unwrap();

      // If we have amenities filter and backend might not support it, do client-side filtering
      if (filters.amenities.length > 0) {
        const filteredResults = filterPGsByAmenities(result, filters.amenities);

        // Update the search results with filtered data
        dispatch({ type: "pg/searchPGs/fulfilled", payload: filteredResults });
      }
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  const handleClearFilters = () => {
    setFilters({
      city: "",
      minPrice: "",
      maxPrice: "",
      amenities: [],
    });
    dispatch(clearSearchResults());
  };

  // Client-side filtering function for amenities
  const filterPGsByAmenities = (pgs, selectedAmenities) => {
    if (!selectedAmenities || selectedAmenities.length === 0) {
      return pgs;
    }

    return pgs.filter((pg) => {
      if (!pg.amenities || pg.amenities.length === 0) {
        return false;
      }

      // Check if PG has ALL the selected amenities (AND logic)
      return selectedAmenities.every((selectedAmenity) =>
        pg.amenities.some(
          (pgAmenity) =>
            pgAmenity.toLowerCase().includes(selectedAmenity.toLowerCase()) ||
            selectedAmenity.toLowerCase().includes(pgAmenity.toLowerCase())
        )
      );
    });
  };

  const formatImageSource = (image) => {
    if (!image) return null;

    // If it's already a complete URL, return as is
    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }

    // If it's a relative path, assume it's from the backend
    if (image.startsWith("/")) {
      return `${
        import.meta.env.VITE_API_URL || "http://localhost:8080"
      }${image}`;
    }

    // Default: assume it's a base64 string
    return `data:image/jpeg;base64,${image}`;
  };

  const renderPGCard = (pg) => {
    const imageSrc =
      pg.images && pg.images.length > 0
        ? formatImageSource(pg.images[0])
        : "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80";

    return (
      <div
        key={pg.id}
        className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      >
        <div className="relative h-48">
          <img
            src={imageSrc}
            alt={pg.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80";
            }}
          />
          <div className="absolute top-3 right-3">
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              {pg.status || "Available"}
            </span>
          </div>
          {pg.rating > 0 && (
            <div className="absolute bottom-3 left-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
              ⭐ {pg.rating} ({pg.reviewCount} reviews)
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
            {pg.name}
          </h3>
          <p className="text-sm text-gray-600 mb-2 flex items-center">
            📍 {pg.location}
          </p>
          <p className="text-sm text-gray-500 mb-3">
            {pg.city}, {pg.state}
          </p>

          <div className="flex items-center justify-between mb-3">
            <span className="text-xl font-bold text-blue-600">
              ₹{pg.price?.toLocaleString()}/mo
            </span>
            <span className="text-sm text-gray-500">
              {pg.amenities?.length || 0} amenities
            </span>
          </div>

          {pg.amenities && pg.amenities.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {pg.amenities.slice(0, 3).map((amenity, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                >
                  {amenity}
                </span>
              ))}
              {pg.amenities.length > 3 && (
                <span className="text-gray-500 text-xs px-2 py-1">
                  +{pg.amenities.length - 3} more
                </span>
              )}
            </div>
          )}

          <Link
            to={`/pg-details/${pg.id}`}
            className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            {userRole?.toLowerCase() === "owner" ? "Manage PG" : "View Details"}
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Find PG Accommodations
          </h1>
          <p className="text-gray-600">
            Search for the perfect PG accommodation that fits your needs and
            budget.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={filters.city}
                  onChange={handleChange}
                  placeholder="e.g. Noida, Bangalore"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Min Price (₹)
                </label>
                <input
                  type="number"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleChange}
                  placeholder="e.g. 5000"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Price (₹)
                </label>
                <input
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleChange}
                  placeholder="e.g. 15000"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Searching..." : "Search"}
                </button>
              </div>
            </div>

            {/* Advanced Filters Toggle */}
            <div className="border-t pt-4">
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center"
              >
                {showFilters ? "Hide" : "Show"} Advanced Filters
                <svg
                  className={`w-4 h-4 ml-1 transition-transform ${
                    showFilters ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="border-t pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Amenities
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {availableAmenities.map((amenity) => (
                    <label
                      key={amenity}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={filters.amenities.includes(amenity)}
                        onChange={() => handleAmenityToggle(amenity)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-4 border-t">
              <button
                type="button"
                onClick={handleClearFilters}
                className="text-gray-600 hover:text-gray-800 font-medium"
              >
                Clear Filters
              </button>

              {filters.amenities.length > 0 && (
                <span className="text-sm text-gray-500">
                  {filters.amenities.length} amenity selected
                </span>
              )}
            </div>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Results Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Search Results
            </h2>
            {searchResults.length > 0 && (
              <span className="text-gray-600">
                {searchResults.length} PG{searchResults.length !== 1 ? "s" : ""}{" "}
                found
              </span>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* No Results */}
        {!loading && searchResults.length === 0 && !error && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🏠</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No PGs found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or browse all available PGs.
            </p>
            <button
              onClick={() => dispatch(searchPGs({}))}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Browse All PGs
            </button>
          </div>
        )}

        {/* PG Cards Grid */}
        {!loading && searchResults.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResults.map(renderPGCard)}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default FindPG;
