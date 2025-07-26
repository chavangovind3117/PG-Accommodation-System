import React from "react";

const PGCard = ({ name, location, price, rating, image }) => {
  return (
    <div className="bg-white shadow rounded overflow-hidden">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4 text-left">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-sm text-gray-600">{location}</p>
        <div className="flex flex-row justify-between">
          <p className="font-bold text-blue-600 mt-2">{price}</p>
          <p className="text-yellow-500 mt-1">⭐ {rating}</p>
        </div>
      </div>
    </div>
  );
};

export default PGCard;
