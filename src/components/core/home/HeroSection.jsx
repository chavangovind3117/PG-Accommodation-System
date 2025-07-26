import React from "react";
import heroBg from "../../../assets/Home/hero-bg.jpg";
import searchIcon from "../../../assets/Home/icons8-search-50.png";

const HeroSection = () => {
  return (
    <section className="relative bg-gray-100">
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <img
          src={heroBg}
          alt="Hero"
          className="w-full h-full object-cover"
          style={{ width: "100%", height: "100%" }}
        />
        <div className="absolute inset-0 bg-opacity-60"></div>
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-32 text-center">
        <h1 className="text-5xl font-bold mb-4">Find Your Perfect PG</h1>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Discover comfortable, affordable, and convenient paying guest
          accommodations near you
        </p>
        <div
          className="flex flex-col md:flex-row justify-center gap-4 border-gray-200 border-1 rounded-lg py-12 px-4"
          style={{ boxShadow: "0 12px 24px 0 rgba(0,0,0,0.2)" }}
        >
          <div className="flex flex-col gap-2">
            <label className="text-gray-500">Location</label>
            <input
              type="text"
              placeholder="Enter city or area"
              className="border px-4 py-2 rounded w-full md:w-64"
              style={{ backgroundColor: "#F9FAFB" }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-500">Price Range</label>
            <input
              type="text"
              placeholder="Enter price range"
              className="border px-4 py-2 rounded w-full md:w-64"
              style={{ backgroundColor: "#F9FAFB" }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-500">Amenities</label>
            <input
              type="text"
              placeholder="Amenities"
              className="border px-4 py-2 rounded w-full md:w-64"
              style={{ backgroundColor: "#F9FAFB" }}
            />
          </div>
          <div className="flex justify-center items-end">
            <button className="bg-blue-600 text-white px-6 py-2 rounded flex items-center justify-center gap-2">
              <img
                src={searchIcon}
                alt="search"
                width={18}
                height={18}
                className="inline-block"
                style={{ width: 18, height: 18 }}
              />
              <span className="text-white transform -translate-y-0.5">
                Search
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
