import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/footer";

const PGDetails = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [bookingForm, setBookingForm] = useState({
    roomType: "",
    moveInDate: "",
  });

  // Mock PG data - replace with API call
  const pgData = {
    id: id,
    name: "Comfort Stay PG",
    location: "Sector 18, Noida, Uttar Pradesh",
    rating: 4.2,
    reviewCount: 24,
    price: 8500,
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
    ],
    amenities: [
      { name: "Free WiFi", icon: "📶" },
      { name: "Laundry", icon: "👕" },
      { name: "Common TV", icon: "📺" },
      { name: "AC Rooms", icon: "❄️" },
      { name: "Parking", icon: "🚗" },
      { name: "Housekeeping", icon: "🧹" },
      { name: "Meals included", icon: "🍽️" },
      { name: "24/7 Security", icon: "🛡️" },
      { name: "Gym Access", icon: "💪" },
    ],
    about: `Comfort Stay PG is an ideal home away from home in the heart of Noida, perfect for working professionals and students. Located in the prime Sector 18 area, it offers easy access to metro stations, shopping malls, restaurants, and major IT hubs.

Our rooms are thoughtfully designed with quality furnishing, ample storage space, and excellent ventilation. Common areas provide the perfect space to relax and socialize with fellow residents.

We maintain strict hygiene standards and provide regular housekeeping services. Your safety is our priority with 24/7 security ensuring a secure living environment.`,
    reviews: [
      {
        id: 1,
        name: "Priya Sharma",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "Excellent PG with great facilities. The rooms are clean and spacious, staff is very helpful, and the location is perfect for my office commute. Highly recommended!",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=100&q=80",
      },
      {
        id: 2,
        name: "Rahul Kumar",
        rating: 5,
        date: "1 month ago",
        comment:
          "Good value for money. The food quality is decent and common areas are well-maintained. Would definitely recommend to others looking for a PG in Noida.",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
      },
      {
        id: 3,
        name: "Anjali Gupta",
        rating: 5,
        date: "2 months ago",
        comment:
          "Safe and secure environment for girls. The management is very cooperative and responsive to any issues. Great place to stay!",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
      },
    ],
    contact: {
      name: "Mr. Rajesh Verma",
      phone: "+91 98765 43210",
      email: "info@comfortstay.com",
    },
  };

  const handleBooking = (e) => {
    e.preventDefault();
    console.log("Booking submitted:", bookingForm);
    // Add booking logic here
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm((prev) => ({ ...prev, [name]: value }));
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={i < rating ? "text-yellow-400" : "text-gray-300"}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <span>Home</span>
          <span className="mx-2">/</span>
          <span>Find PG</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{pgData.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2">
            {/* PG Title and Overview */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {pgData.name}
              </h1>
              <div className="flex items-center text-gray-600 mb-3">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{pgData.location}</span>
              </div>
              <div className="flex items-center">
                <div className="flex items-center mr-4">
                  {renderStars(pgData.rating)}
                  <span className="ml-2 text-sm text-gray-600">
                    {pgData.rating} ({pgData.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-4 lg:col-span-3">
                  <img
                    src={pgData.images[selectedImage]}
                    alt={pgData.name}
                    className="w-full h-80 object-cover rounded-lg"
                  />
                </div>
                <div className="col-span-4 lg:col-span-1 space-y-2">
                  {pgData.images.slice(0, 4).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${pgData.name} ${index + 1}`}
                      className={`w-full h-16 object-cover rounded cursor-pointer transition-opacity ${
                        selectedImage === index
                          ? "opacity-100"
                          : "opacity-60 hover:opacity-80"
                      }`}
                      onClick={() => setSelectedImage(index)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {pgData.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-xl mr-3">{amenity.icon}</span>
                    <span className="text-gray-700">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* About This PG */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                About This PG
              </h2>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {pgData.about}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Reviews & Ratings
              </h2>
              <div className="space-y-6">
                {pgData.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-gray-100 pb-6 last:border-b-0"
                  >
                    <div className="flex items-start">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-gray-900">
                            {review.name}
                          </h3>
                          <span className="text-sm text-gray-500">
                            {review.date}
                          </span>
                        </div>
                        <div className="flex items-center mb-2">
                          {renderStars(review.rating)}
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  View All Reviews
                </button>
              </div>
            </div>
          </div>

          {/* Booking Sidebar - Right Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              {/* Price */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="text-2xl font-bold text-blue-600">
                  ₹{pgData.price.toLocaleString()} per month
                </div>
              </div>

              {/* Booking Form */}
              <form onSubmit={handleBooking} className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Type
                  </label>
                  <select
                    name="roomType"
                    value={bookingForm.roomType}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Room Type</option>
                    <option value="single">Single Room</option>
                    <option value="double">Double Sharing</option>
                    <option value="triple">Triple Sharing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Move-in Date
                  </label>
                  <input
                    type="date"
                    name="moveInDate"
                    value={bookingForm.moveInDate}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                  Book Now
                </button>
              </form>

              {/* Call Button */}
              <button className="w-full border border-blue-600 text-blue-600 py-3 px-4 rounded-md font-medium hover:bg-blue-50 transition-colors mb-6">
                <div className="flex items-center justify-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Call Now
                </div>
              </button>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 text-gray-500 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700">{pgData.contact.name}</span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 text-gray-500 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span className="text-gray-700">
                      {pgData.contact.phone}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 text-gray-500 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span className="text-gray-700">
                      {pgData.contact.email}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PGDetails;
