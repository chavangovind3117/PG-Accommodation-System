import React, { useState } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/footer";
import { Link } from "react-router-dom";

const pgList = [
  {
    id: 1,
    name: "Comfort PG",
    location: "Koramangala, Bangalore",
    price: 12000,
    status: "Available",
    rating: 4.5,
    reviews: 233,
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    amenities: ["WiFi", "Meals", "AC"],
  },
  {
    id: 2,
    name: "Elite Residency",
    location: "Indiranagar, Bangalore",
    price: 15500,
    status: "2 Left",
    rating: 4.7,
    reviews: 141,
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80",
    amenities: ["WiFi", "Gym", "Laundry"],
  },
  {
    id: 3,
    name: "Student Hub",
    location: "BTM Layout, Bangalore",
    price: 9800,
    status: "Available",
    rating: 4.3,
    reviews: 118,
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    amenities: ["WiFi", "Study Room", "Security"],
  },
];

const FindPG = () => {
  const [filters, setFilters] = useState({
    location: "",
    budget: "",
    roomType: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Add search logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Find PG Accommodations
        </h1>
        {/* Search Filters */}
        <form
          onSubmit={handleSearch}
          className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row gap-4 items-end mb-8"
        >
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={filters.location}
              onChange={handleChange}
              placeholder="Enter city or area"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">Budget</label>
            <input
              type="text"
              name="budget"
              value={filters.budget}
              onChange={handleChange}
              placeholder="e.g. 10000-15000"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">
              Room Type
            </label>
            <input
              type="text"
              name="roomType"
              value={filters.roomType}
              onChange={handleChange}
              placeholder="Single/Double/Triple"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">Gender</label>
            <input
              type="text"
              name="gender"
              value={filters.gender}
              onChange={handleChange}
              placeholder="Male/Female/Unisex"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700 transition-colors w-full md:w-auto"
          >
            Search
          </button>
        </form>

        {/* PG Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pgList.map((pg) => (
            <div
              key={pg.id}
              className="bg-white rounded-lg shadow p-4 flex flex-col"
            >
              <div className="relative h-40 rounded-lg overflow-hidden mb-4">
                <img
                  src={pg.image}
                  alt={pg.name}
                  className="w-full h-full object-cover"
                />
                <span
                  className={`absolute top-2 right-2 px-3 py-1 text-xs font-semibold rounded-full ${
                    pg.status === "Available"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {pg.status}
                </span>
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                {pg.name}
              </h2>
              <p className="text-sm text-gray-500 mb-2">{pg.location}</p>
              <div className="flex items-center mb-2">
                <span className="text-xl font-bold text-gray-900 mr-2">
                  ₹{pg.price.toLocaleString()}/mo
                </span>
                <span className="flex items-center text-yellow-500 text-sm font-medium ml-auto">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
                  </svg>
                  {pg.rating}{" "}
                  <span className="text-gray-400 ml-1">({pg.reviews})</span>
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {pg.amenities.map((am, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                  >
                    {am}
                  </span>
                ))}
              </div>
              <Link
                to={`/pg/${pg.id}`}
                className="mt-auto bg-blue-600 text-white text-center py-2 rounded font-medium hover:bg-blue-700 transition-colors"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FindPG;
