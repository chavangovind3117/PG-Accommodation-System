// Home.jsx
import React from "react";
import HeroSection from "../components/core/home/HeroSection";
import FeaturedPGs from "../components/core/home/FeaturedPGs";
import HowItWorks from "../components/core/home/HowItWorks";
import Testimonials from "../components/core/home/Testimonials";
import Footer from "../components/common/footer";
import Navbar from "../components/common/Navbar";

const Home = () => {
  return (
    <div className="font-sans text-gray-800">
      <Navbar />
      <HeroSection />
      <FeaturedPGs />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
