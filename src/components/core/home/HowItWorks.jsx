import React from "react";
import searchIcon from "../../../assets/Home/search-icon.png";
import visitIcon from "../../../assets/Home/eye-icon.png";
import bookIcon from "../../../assets/Home/book-icon.png";

const steps = [
  {
    title: "Search & Filter",
    description: "Browse through verified PG listings with advanced filters",
    icon: searchIcon,
    color: "#DBEAFE",
  },
  {
    title: "Visit & Compare",
    description: "Schedule visits and compare different options easily",
    icon: visitIcon,
    color: "#CFFAFE",
  },
  {
    title: "Book Instantly",
    description: "Secure your spot with instant booking and payment",
    icon: bookIcon,
    color: "#D1FAE5",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gray-50 text-center">
      <h2 className="text-3xl font-semibold mb-6">How It Works</h2>
      <p className="mb-12 text-gray-600">
        Simple steps to find your ideal PG accommodation
      </p>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
        {steps.map((step, index) => (
          <div key={index} className="bg-white rounded shadow p-6">
            <div className="mb-4 flex justify-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: step.color }}
              >
                <img
                  src={step.icon}
                  alt={step.title}
                  width={20}
                  height={28}
                  style={{ width: 20, height: 28 }}
                />
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
            <p className="text-gray-600 text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
