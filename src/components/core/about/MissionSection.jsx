import React from "react";

const MissionSection = () => {
  const benefits = [
    "Verified property listings",
    "Secure booking process",
    "24/7 customer support",
  ];

  return (
    <section className="mb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column - Image */}
        <div className="order-2 lg:order-1">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
              alt="Students and professionals in a common area"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
          </div>
        </div>

        {/* Right Column - Mission */}
        <div className="order-1 lg:order-2">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Founded in 2023, PGFinder was created to bridge the gap between
              property owners and tenants, providing quality PG accommodations
              that meet the unique needs of students and young professionals. We
              understand the challenges of finding safe, affordable, and
              comfortable living spaces in new cities.
            </p>
            <p>
              Our platform offers verified listings, transparent pricing, and
              secure communication channels to ensure a hassle-free experience
              for both hosts and tenants. We believe everyone deserves a place
              they can call home, regardless of where life takes them.
            </p>
          </div>

          {/* Benefits List */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              What We Offer:
            </h3>
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
