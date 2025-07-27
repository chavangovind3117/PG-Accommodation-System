import React from "react";
import StepCard from "./StepCard";
import searchIcon from "../../../assets/Home/search-icon.png";
import visitIcon from "../../../assets/Home/eye-icon.png";
import bookIcon from "../../../assets/Home/book-icon.png";

const steps = [
  {
    title: "Search & Filter",
    description: "Browse through verified PG listings with advanced filters",
    icon: searchIcon,
    bgColor: "bg-blue-100",
  },
  {
    title: "Visit & Compare",
    description: "Schedule visits and compare different options easily",
    icon: visitIcon,
    bgColor: "bg-cyan-100",
  },
  {
    title: "Book Instantly",
    description: "Secure your spot with instant booking and payment",
    icon: bookIcon,
    bgColor: "bg-green-100",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">How It Works</h2>
      <p className="mb-12 text-gray-600 text-lg">
        Simple steps to find your ideal PG accommodation
      </p>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {steps.map((step, index) => (
          <StepCard key={index} step={step} />
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
