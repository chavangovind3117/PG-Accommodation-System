import React from "react";

const FeatureCard = ({ feature }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow duration-300">
      <div
        className={`w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}
      >
        <div className={feature.iconColor}>{feature.icon}</div>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
    </div>
  );
};

export default FeatureCard;
