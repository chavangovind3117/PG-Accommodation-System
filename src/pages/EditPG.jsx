import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPGById, updatePG, clearError } from "../features/pg/pgSlice";

const EditPG = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentPG, loading, error } = useSelector((state) => state.pg);
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
    status: "ACTIVE",
  });
  const [submitted, setSubmitted] = useState(false);
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

  // Load PG data on component mount
  useEffect(() => {
    if (id) {
      dispatch(fetchPGById(id));
    }
    return () => {
      dispatch(clearError());
    };
  }, [dispatch, id]);

  // Populate form when PG data is loaded
  useEffect(() => {
    if (currentPG) {
      setForm({
        name: currentPG.name || "",
        location: currentPG.location || "",
        description: currentPG.description || "",
        price: currentPG.price || "",
        address: currentPG.address || "",
        city: currentPG.city || "",
        state: currentPG.state || "",
        amenities: currentPG.amenities || [],
        status: currentPG.status || "ACTIVE",
      });
    }
  }, [currentPG]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      const updateData = {
        ...form,
        price: parseFloat(form.price),
        ownerId: user?.id, // Include the owner ID
      };

      console.log("Updating PG with data:", updateData);

      // Dispatch the updatePG action
      const result = await dispatch(
        updatePG({ id: currentPG.id, pgData: updateData })
      ).unwrap();

      console.log("PG updated successfully:", result);

      setSubmitted(true);

      // Show success message and redirect
      setTimeout(() => {
        setSubmitted(false);
        navigate("/owner-properties");
      }, 2000);
    } catch (error) {
      console.error("Failed to update PG:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update PG. Please try again.";
      alert(`Error: ${errorMessage}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading PG details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-4">{error}</div>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!currentPG) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-600 mb-4">PG not found</div>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit PG</h1>
        <p className="text-gray-600">Update the details of your PG property.</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        {submitted && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            PG updated successfully! Redirecting to your properties...
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
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. Comfort Stay PG"
              />
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
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. Sector 18, Noida"
              />
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

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="MAINTENANCE">Under Maintenance</option>
            </select>
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

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-gray-600 text-white py-3 px-4 rounded-md font-medium hover:bg-gray-700 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? "Updating..." : "Update PG"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPG;
