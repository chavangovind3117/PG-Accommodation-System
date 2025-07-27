import React from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/footer";
import HeroSection from "../components/core/about/HeroSection";
import MissionSection from "../components/core/about/MissionSection";
import FeaturesSection from "../components/core/about/FeaturesSection";
import StatsSection from "../components/core/about/StatsSection";
import CTASection from "../components/core/about/CTASection";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <HeroSection />
        <MissionSection />
        <FeaturesSection />
        <StatsSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default About;
