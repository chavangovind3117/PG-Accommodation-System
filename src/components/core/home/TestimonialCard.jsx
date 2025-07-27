import React from "react";

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 text-left hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center mb-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
          <p className="text-yellow-500 text-sm">★★★★★</p>
        </div>
      </div>
      <p className="text-sm text-gray-700">"{testimonial.review}"</p>
    </div>
  );
};

export default TestimonialCard;
