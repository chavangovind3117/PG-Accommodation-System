import React from "react";

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
    <section className="py-20 bg-white text-center">
      <h2 className="text-3xl font-semibold mb-6">What Our Users Say</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {testimonials.map((user, index) => (
          <div key={index} className="bg-gray-50 p-6 rounded shadow text-left">
            <div className="flex items-center mb-4">
              <img
                src={user.image}
                alt={user.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h4 className="font-semibold">{user.name}</h4>
                <p className="text-yellow-500 text-sm">★★★★★</p>
              </div>
            </div>
            <p className="text-sm text-gray-700">“{user.review}”</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
