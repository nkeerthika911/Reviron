import React, { useState } from "react";

export const Filters = () => {
  const minLimit = 100;
  const maxLimit = 10000;

  const [min, setMin] = useState(minLimit);
  const [max, setMax] = useState(6000);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const categories = ["Battery", "Metal", "PCB", "Chip", "Appliance"];
  const conditions = ["Working", "Not Working"];
  const brands = ["Apple", "Samsung", "Sony", "Nike", "Adidas", "Canon", "Dell", "HP"];

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), max - 100);
    setMin(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), min + 100);
    setMax(value);
  };

  const handleClear = () => {
    setMin(minLimit);
    setMax(maxLimit);
    setSelectedCategory("");
    setSelectedCondition("");
    setSelectedBrand("");
    setSelectedLocation("");
  };

  const minPercent = ((min - minLimit) / (maxLimit - minLimit)) * 100;
  const maxPercent = ((max - minLimit) / (maxLimit - minLimit)) * 100;

  const formatAmount = (amount) => `₹${amount.toLocaleString("en-IN")}`;

  const rangeStyle = {
    position: "absolute",
    top: "50%",
    height: "10px",
    background: "#00ca1bff",
    borderRadius: "6px",
    left: `${minPercent}%`,
    width: `${maxPercent - minPercent}%`,
    zIndex: 2,
    transform: "translateY(-50%)",
  };

  return (
    <>
      <div className="bg-white rounded-md p-5 pt-0 font-['Poppins'] shadow-sm border border-gray-200 w-[20vw] h-full overflow-y-auto">
        <div className="px-5 py-3 -mx-5 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-[#6F9674]">Filters</h2>
            <button
              className="text-xs bg-none border-none text-gray-400 cursor-pointer font-medium hover:text-gray-600"
              onClick={handleClear}
            >
              X CLEAR ALL
            </button>
          </div>
        </div>

        {/* PRICE */}
        <div className="px-5 py-3.5 -mx-5 border-b border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text--[#81AD87]">PRICE</label>
          </div>
          <div className="relative w-full h-9 mb-2 px-1 flex items-center">
            <div className="absolute top-1/2 left-0 right-0 h-2.5 bg-gray-300 rounded-md z-10 -translate-y-1/2"></div>
            <div style={rangeStyle}></div>
            <input type="range" min={minLimit} max={maxLimit} value={min} onChange={handleMinChange} className="z-30" />
            <input type="range" min={minLimit} max={maxLimit} value={max} onChange={handleMaxChange} className="z-40" />
          </div>
          <div className="flex justify-between mt-3 text-sm font-medium text-green-700">
            <span>{formatAmount(minLimit)}</span>
            <span>{formatAmount(maxLimit)}</span>
          </div>
          <div className="flex justify-between items-center gap-2 mt-4">
            <input
              type="text"
              value={formatAmount(min)}
              readOnly
              className="w-2/5 px-2.5 py-1.5 text-sm rounded-md border border-green-700 text-center text-green-700 font-semibold bg-gray-50"
            />
            <span className="text-sm font-medium text-gray-500">to</span>
            <input
              type="text"
              value={formatAmount(max)}
              readOnly
              className="w-2/5 px-2.5 py-1.5 text-sm rounded-md border border-green-700 text-center text-green-700 font-semibold bg-gray-50"
            />
          </div>
        </div>

        {/* CATEGORY */}
        <div className="px-5 py-3.5 -mx-5 border-b border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-green-700">CATEGORY</label>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-green-700 rounded-md bg-gray-50 text-green-700 font-medium focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        {/* BRAND */}
        <div className="px-5 py-3.5 -mx-5 border-b border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-green-700">BRAND</label>
          </div>
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-green-700 rounded-md bg-gray-50 text-green-700 font-medium focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">All Brands</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
        {/* CONDITION */}
        <div className="px-5 py-3.5 -mx-5 border-b border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-green-700">CONDITION</label>
          </div>
          <div className="space-y-2">
            {conditions.map((condition) => (
              <label key={condition} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="condition"
                  value={condition}
                  checked={selectedCondition === condition}
                  onChange={(e) => setSelectedCondition(e.target.value)}
                  className="w-4 h-4 text-green-600 border-green-300 focus:ring-green-500"
                />
                <span className="text-sm font-medium text-green-700">{condition}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
          input[type="range"] {
            -webkit-appearance: none;
            appearance: none;
            width: 100%;
            height: 36px;
            position: absolute;
            background: none;
            margin: 0;
            pointer-events: none;
          }
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            height: 20px;
            width: 20px;
            background: #fff;
            border: 2px solid #6F9674;
            border-radius: 50%;
            cursor: pointer;
            pointer-events: auto;
            margin-top: -5px;
          }
          input[type="range"]::-moz-range-thumb {
            height: 20px;
            width: 20px;
            background: #fff;
            border: 2px solid #6F9674;
            border-radius: 50%;
            cursor: pointer;
            pointer-events: auto;
          }
          input[type="range"]::-moz-range-track {
            height: 10px;
            background: transparent;
          }
        `}
      </style>
    </>
  );
};
