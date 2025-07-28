import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CTASection = () => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(null);
  const { isAuthenticated, userRole } = useSelector((state) => state.auth);

  const handleBrowsePGs = () => {
    setActiveButton("browse");
    navigate("/search");
  };

  const handleListProperty = () => {
    setActiveButton("list");
    if (isAuthenticated && userRole === "owner") {
      navigate("/add-new-pg");
    } else if (!isAuthenticated) {
      alert("Please log in as a PG owner to list your property.");
      navigate("/login");
    } else {
      alert("Only PG owners can list a property. Please log in as an owner.");
    }
  };

  return (
    <section className="text-center">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 md:p-12">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Find Your Perfect PG?
        </h2>
        <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied users who have found their ideal
          accommodation through our platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleBrowsePGs}
            className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform ${
              activeButton === "browse"
                ? "bg-blue-800 text-white scale-105 shadow-lg"
                : "bg-white text-blue-600 hover:bg-gray-100 hover:scale-105"
            }`}
          >
            Browse PGs
          </button>
          <button
            onClick={handleListProperty}
            className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform ${
              activeButton === "list"
                ? "bg-white text-blue-600 scale-105 shadow-lg"
                : "border-2 border-white text-white hover:bg-white hover:text-blue-600 hover:scale-105"
            }`}
          >
            List Your Property
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
