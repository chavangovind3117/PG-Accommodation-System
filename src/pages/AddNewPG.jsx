import React, { useState } from "react";

const AddNewPG = () => {
  const [form, setForm] = useState({
    name: "",
    location: "",
    totalRooms: "",
    amenities: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [photoError, setPhotoError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 10) {
      setPhotoError("You can upload up to 10 photos only.");
      return;
    }
    setPhotos(files);
    setPhotoError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (photos.length < 5) {
      setPhotoError("Please upload at least 5 photos of your PG.");
      return;
    }
    // Here you would send form data and photos to the backend
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({
      name: "",
      location: "",
      totalRooms: "",
      amenities: "",
      description: "",
    });
    setPhotos([]);
    setPhotoError("");
  };

  return (
    <div className="max-w-2xl mx-auto ">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New PG</h1>
        <p className="text-gray-600">
          Fill in the details below to add a new PG property to your account.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        {submitted && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            PG added successfully!
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              PG Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter PG name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter location"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Rooms
            </label>
            <input
              type="number"
              name="totalRooms"
              value={form.totalRooms}
              onChange={handleChange}
              required
              min={1}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter total number of rooms"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amenities
            </label>
            <input
              type="text"
              name="amenities"
              value={form.amenities}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. WiFi, Laundry, Meals, Parking"
            />
            <p className="text-xs text-gray-400 mt-1">
              Separate amenities with commas
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe your PG property"
              required
            ></textarea>
          </div>
          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              PG Photos (at least 5)
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
              <div className="flex flex-wrap gap-4 mt-4">
                {photos.map((file, idx) => (
                  <div
                    key={idx}
                    className="w-24 h-24 rounded overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`PG Photo ${idx + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            )}
            <p className="text-xs text-gray-400 mt-2">
              You can upload up to 10 photos. Only images are allowed.
            </p>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            Add PG
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewPG;
