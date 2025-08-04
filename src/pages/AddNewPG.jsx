import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPG, clearError } from "../features/pg/pgSlice";

const AddNewPG = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.pg);
  const { user } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    location: "",
    description: "",
    price: "",
    address: "",
    city: "",
    state: "",
    amenities: [],
    rating: 0.0,
    reviewCount: 0,
    status: "ACTIVE",
  });
  const [submitted, setSubmitted] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [photoError, setPhotoError] = useState("");
  const [amenityInput, setAmenityInput] = useState("");

  // Predefined amenities for easy selection
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const totalFiles = photos.length + newFiles.length;

    if (totalFiles > 10) {
      setPhotoError(
        "You can upload up to 10 photos only. You currently have " +
          photos.length +
          " photos."
      );
      return;
    }

    setPhotos((prevPhotos) => [...prevPhotos, ...newFiles]);
    setPhotoError("");
  };

  const handleAmenityToggle = (amenity) => {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleAddCustomAmenity = () => {
    if (amenityInput.trim() && !form.amenities.includes(amenityInput.trim())) {
      setForm((prev) => ({
        ...prev,
        amenities: [...prev.amenities, amenityInput.trim()],
      }));
      setAmenityInput("");
    }
  };

  const handleRemoveAmenity = (amenity) => {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((a) => a !== amenity),
    }));
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove)
    );
  };

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setPhotoError("");

    // Validate photos
    if (photos.length < 3) {
      setPhotoError("Please upload at least 3 photos of your PG.");
      return;
    }

    // Validate amenities
    if (form.amenities.length === 0) {
      alert("Please select at least one amenity.");
      return;
    }

    // Validate price
    if (!form.price || parseFloat(form.price) <= 0) {
      alert("Please enter a valid price greater than 0.");
      return;
    }

    try {
      // Validate required fields
      if (
        !form.name ||
        !form.location ||
        !form.price ||
        !form.address ||
        !form.city ||
        !form.state
      ) {
        alert("Please fill in all required fields.");
        return;
      }

      if (!user?.id) {
        alert("User not authenticated. Please login again.");
        return;
      }

      // Prepare the PG data according to backend structure
      const pgData = {
        name: form.name,
        location: form.location,
        description: form.description,
        price: parseFloat(form.price),
        address: form.address,
        city: form.city,
        state: form.state,
        amenities: form.amenities,
        rating: 0.0,
        reviewCount: 0,
        status: "ACTIVE",
        ownerId: user?.id, // Include ownerId in pgData
      };

      console.log("Sending PG data:", pgData);
      console.log("User ID:", user?.id);
      console.log("Number of photos:", photos.length);
      console.log("Full request payload:", { ...pgData, images: photos });

      // Dispatch the createPG action
      const result = await dispatch(
        createPG({ pgData, images: photos })
      ).unwrap();

      console.log("PG created successfully:", result);

      setSubmitted(true);

      // Show success message and redirect
      setTimeout(() => {
        setSubmitted(false);
        navigate("/owner-properties"); // Redirect to owner's properties page
      }, 2000);

      // Reset form
      setForm({
        name: "",
        location: "",
        description: "",
        price: "",
        address: "",
        city: "",
        state: "",
        amenities: [],
        rating: 0.0,
        reviewCount: 0,
        status: "ACTIVE",
      });
      setPhotos([]);
      setPhotoError("");
      setAmenityInput("");
    } catch (error) {
      console.error("Failed to create PG:", error);
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText,
      });

      // Show user-friendly error message
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to create PG. Please try again.";
      alert(`Error: ${errorMessage}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New PG</h1>
        <p className="text-gray-600">
          Fill in the details below to add a new PG property to your account.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        {/* Progress Indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Form Progress
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(
                (((form.name ? 1 : 0) +
                  (form.location ? 1 : 0) +
                  (form.price ? 1 : 0) +
                  (form.address ? 1 : 0) +
                  (form.city ? 1 : 0) +
                  (form.state ? 1 : 0) +
                  (form.description ? 1 : 0) +
                  (form.amenities.length > 0 ? 1 : 0) +
                  (photos.length >= 3 ? 1 : 0)) /
                  9) *
                  100
              )}
              %
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  (((form.name ? 1 : 0) +
                    (form.location ? 1 : 0) +
                    (form.price ? 1 : 0) +
                    (form.address ? 1 : 0) +
                    (form.city ? 1 : 0) +
                    (form.state ? 1 : 0) +
                    (form.description ? 1 : 0) +
                    (form.amenities.length > 0 ? 1 : 0) +
                    (photos.length >= 3 ? 1 : 0)) /
                    9) *
                  100
                }%`,
              }}
            ></div>
          </div>
        </div>

        {submitted && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            PG added successfully! Redirecting to your properties...
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PG Name *
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  form.name ? "border-green-300" : "border-gray-300"
                }`}
                placeholder="e.g. Comfort Stay PG"
              />
              {form.name && (
                <p className="text-xs text-green-600 mt-1">✓ PG name is set</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                required
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  form.location ? "border-green-300" : "border-gray-300"
                }`}
                placeholder="e.g. Sector 18, Noida"
              />
              {form.location && (
                <p className="text-xs text-green-600 mt-1">✓ Location is set</p>
              )}
            </div>
          </div>

          {/* Address Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address *
              </label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Full address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City *
              </label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. Noida"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State *
              </label>
              <input
                type="text"
                name="state"
                value={form.state}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. Uttar Pradesh"
              />
            </div>
          </div>

          {/* Pricing */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Rent (₹) *
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. 8500.00"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe your PG property, facilities, and what makes it special"
              required
            ></textarea>
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amenities *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
              {availableAmenities.map((amenity) => (
                <label key={amenity} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={form.amenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{amenity}</span>
                </label>
              ))}
            </div>

            {/* Custom Amenity Input */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={amenityInput}
                onChange={(e) => setAmenityInput(e.target.value)}
                placeholder="Add custom amenity"
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={handleAddCustomAmenity}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Add
              </button>
            </div>

            {/* Selected Amenities Display */}
            {form.amenities.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {form.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                  >
                    {amenity}
                    <button
                      type="button"
                      onClick={() => handleRemoveAmenity(amenity)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              PG Photos (at least 3) *
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {photoError && (
              <p className="text-red-600 text-xs mt-2">{photoError}</p>
            )}
            {photos.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">
                  Selected photos: {photos.length}/10
                </p>
                <div className="flex flex-wrap gap-4">
                  {photos.map((file, idx) => (
                    <div
                      key={idx}
                      className="relative w-24 h-24 rounded overflow-hidden border border-gray-200 bg-gray-100"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`PG Photo ${idx + 1}`}
                        className="object-cover w-full h-full"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(idx)}
                        className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <p className="text-xs text-gray-400 mt-2">
              You can upload up to 10 photos. Only images are allowed.
            </p>
          </div>

          {/* Summary Section */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p>
                  <strong>PG Name:</strong> {form.name || "Not set"}
                </p>
                <p>
                  <strong>Location:</strong> {form.location || "Not set"}
                </p>
                <p>
                  <strong>Price:</strong>{" "}
                  {form.price ? `₹${form.price}` : "Not set"}
                </p>
                <p>
                  <strong>City:</strong> {form.city || "Not set"}
                </p>
                <p>
                  <strong>State:</strong> {form.state || "Not set"}
                </p>
              </div>
              <div>
                <p>
                  <strong>Amenities:</strong> {form.amenities.length} selected
                </p>
                <p>
                  <strong>Photos:</strong> {photos.length} uploaded
                </p>
                <p>
                  <strong>Status:</strong> Active
                </p>
                <p>
                  <strong>Owner:</strong> {user?.name || "Not set"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Adding PG...
                </div>
              ) : (
                "Add PG"
              )}
            </button>

            {loading && (
              <div className="ml-4 text-sm text-gray-600">
                Please wait while we process your request...
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewPG;
