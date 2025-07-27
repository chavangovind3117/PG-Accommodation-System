import React from "react";
import TestimonialCard from "./TestimonialCard";

const testimonials = [
  {
    name: "Priya Sharma",
    review:
      "Found my perfect PG within a week! The platform made it so easy to compare options and book instantly.",
    image: "/src/assets/Home/user1.jpg",
  },
  {
    name: "Rahul Kumar",
    review:
      "Great experience! All listings are verified and the booking process is seamless. Highly recommended.",
    image: "/src/assets/Home/user2.jpg",
  },
  {
    name: "Anita Singh",
    review:
      "As a PG owner, this platform helped me find quality tenants quickly. The management tools are excellent.",
    image: "/src/assets/Home/user3.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        What Our Users Say
      </h2>
      <p className="mb-12 text-gray-600 text-lg">
        Hear from our satisfied users who found their perfect accommodation
      </p>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
