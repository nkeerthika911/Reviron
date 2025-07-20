import React, { useState, useEffect } from "react";

export const Filters = ({ products, onFiltersChange }) => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(10000);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // Extract unique values from products data
  const getUniqueValues = (field) => {
    if (field === 'category') {
      // Handle category as array - flatten all categories
      const allCategories = products.reduce((acc, product) => {
        if (Array.isArray(product.category)) {
          acc.push(...product.category);
        } else if (product.category) {
          acc.push(product.category);
        }
        return acc;
      }, []);
      return [...new Set(allCategories)].sort();
    }
    
    return [...new Set(products.map(product => product[field]).filter(Boolean))].sort();
  };

  const categories = getUniqueValues('category');
  const conditions = getUniqueValues('condition');
  const brands = getUniqueValues('brand');
  const locations = getUniqueValues('location');

  // Calculate price range from actual data
  const prices = products.map(p => p.price || 0).filter(p => p > 0);
  const minLimit = prices.length > 0 ? Math.min(...prices) : 0;
  const maxLimit = prices.length > 0 ? Math.max(...prices) : 10000;

  // Initialize min/max based on actual data
  useEffect(() => {
    if (prices.length > 0) {
      setMin(minLimit);
      setMax(maxLimit);
    }
  }, [products]);

  // Notify parent component whenever filters change
  useEffect(() => {
    const filters = {
      priceMin: min,
      priceMax: max,
      category: selectedCategory,
      condition: selectedCondition,
      brand: selectedBrand,
      location: selectedLocation
    };
    onFiltersChange(filters);
  }, [min, max, selectedCategory, selectedCondition, selectedBrand, selectedLocation, onFiltersChange]);

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

  const minPercent = maxLimit > minLimit ? ((min - minLimit) / (maxLimit - minLimit)) * 100 : 0;
  const maxPercent = maxLimit > minLimit ? ((max - minLimit) / (maxLimit - minLimit)) * 100 : 100;

  const formatAmount = (amount) => `₹${amount.toLocaleString("en-IN")}`;

  const rangeStyle = {
    position: "absolute",
    top: "50%",
    height: "6px",
    background: "linear-gradient(90deg, #81ad87 0%, #95c19b 100%)",
    borderRadius: "3px",
    left: `${minPercent}%`,
    width: `${Math.max(maxPercent - minPercent, 0)}%`,
    zIndex: 2,
    transform: "translateY(-50%)",
    boxShadow: "0 2px 4px rgba(129, 173, 135, 0.3)",
  };

  return (
    <>
      <div className="bg-white rounded-md p-5 pt-0 font-['Poppins'] shadow-sm border border-gray-200 w-[20vw] h-full overflow-y-auto">
        <div className="px-5 py-3 -mx-5 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-[#81ad87]">Filters</h2>
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
            <label className="text-sm font-medium text-[#81ad87]">PRICE</label>
          </div>
          <div className="relative w-full h-12 mb-2 px-1 flex items-center">
            <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-gray-300 rounded-full z-1 -translate-y-1/2"></div>
            <div style={rangeStyle}></div>
            <input 
              type="range" 
              min={minLimit} 
              max={maxLimit} 
              value={min} 
              onChange={handleMinChange} 
              className="range-input range-input-min" 
            />
            <input 
              type="range" 
              min={minLimit} 
              max={maxLimit} 
              value={max} 
              onChange={handleMaxChange} 
              className="range-input range-input-max" 
            />
          </div>
          <div className="flex justify-between mt-3 text-sm font-medium text-[#81ad87]">
            <span>{formatAmount(minLimit)}</span>
            <span>{formatAmount(maxLimit)}</span>
          </div>
          <div className="flex justify-between items-center gap-2 mt-4">
            <input
              type="text"
              value={formatAmount(min)}
              readOnly
              className="w-2/5 px-2.5 py-1.5 text-sm rounded-md border border-[#81ad87] text-center text-[#81ad87] font-semibold bg-gray-50"
            />
            <span className="text-sm font-medium text-gray-500">to</span>
            <input
              type="text"
              value={formatAmount(max)}
              readOnly
              className="w-2/5 px-2.5 py-1.5 text-sm rounded-md border border-[#81ad87] text-center text-[#81ad87] font-semibold bg-gray-50"
            />
          </div>
        </div>

        {/* CATEGORY */}
        <div className="px-5 py-3.5 -mx-5 border-b border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-[#81ad87]">CATEGORY</label>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-[#81ad87] rounded-md bg-gray-50 text-[#81ad87] font-medium focus:outline-none focus:ring-2 focus:ring-[#81ad87]"
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
        {conditions.length > 0 && (
          <div className="px-5 py-3.5 -mx-5 border-b border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-green-700">CONDITION</label>
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="condition"
                  value=""
                  checked={selectedCondition === ""}
                  onChange={(e) => setSelectedCondition(e.target.value)}
                  className="w-4 h-4 text-green-600 border-green-300 focus:ring-green-500"
                />
                <span className="text-sm font-medium text-green-700">All Conditions</span>
              </label>
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
        )}

        {/* LOCATION */}
        {locations.length > 0 && (
          <div className="px-5 py-3.5 -mx-5 border-b border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-green-700">LOCATION</label>
            </div>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-green-700 rounded-md bg-gray-50 text-green-700 font-medium focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
          
          .range-input {
            -webkit-appearance: none;
            appearance: none;
            width: 100%;
            height: 48px;
            position: absolute;
            background: transparent;
            margin: 0;
            pointer-events: none;
            top: 0;
            left: 0;
          }
          
          .range-input::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            height: 22px;
            width: 22px;
            background: #fff;
            border: 3px solid #00ca1b;
            border-radius: 50%;
            cursor: pointer;
            pointer-events: auto;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
            transition: all 0.2s ease;
            position: relative;
            z-index: 10;
          }
          
          .range-input::-webkit-slider-thumb:hover {
            transform: scale(1.1);
            border-color: #22d637;
            box-shadow: 0 4px 12px rgba(0, 202, 27, 0.4);
          }
          
          .range-input::-webkit-slider-thumb:active {
            transform: scale(1.05);
            border-color: #1ea82b;
          }
          
          .range-input::-moz-range-thumb {
            height: 22px;
            width: 22px;
            background: #fff;
            border: 3px solid #00ca1b;
            border-radius: 50%;
            cursor: pointer;
            pointer-events: auto;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
            transition: all 0.2s ease;
          }
          
          .range-input::-moz-range-thumb:hover {
            transform: scale(1.1);
            border-color: #22d637;
          }
          
          .range-input::-moz-range-track {
            height: 6px;
            background: transparent;
            border: none;
          }
          
          .range-input-max {
            z-index: 5;
          }
          
          .range-input-min {
            z-index: 6;
          }
        `}
      </style>
    </>
  );
};