import React from "react";

const StatsSection = () => {
  return (
    <section className="bg-white rounded-lg shadow-md p-8 mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
        <p className="text-gray-600">
          Trusted by thousands of students and professionals across India
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
          <div className="text-gray-600">Happy Tenants</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
          <div className="text-gray-600">Verified Properties</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
          <div className="text-gray-600">Cities Covered</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">4.8★</div>
          <div className="text-gray-600">Average Rating</div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
