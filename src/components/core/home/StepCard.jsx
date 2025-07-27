import React from "react";

const StepCard = ({ step }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow duration-300">
      <div className="mb-4 flex justify-center">
        <div
          className={`w-18 h-18 ${step.bgColor} rounded-full flex items-center justify-center`}
        >
          <img
            src={step.icon}
            alt={step.title}
            width={22}
            height={28}
            style={{ width: 22, height: 28 }}
          />
        </div>
      </div>
      <h3 className="font-semibold text-lg text-gray-900 mb-2">{step.title}</h3>
      <p className="text-gray-600 text-sm">{step.description}</p>
    </div>
  );
};

export default StepCard;
