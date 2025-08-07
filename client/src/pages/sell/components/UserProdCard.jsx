import React from 'react';

export const UserProdCard = (
  {
    image = null,
    name = "CD/DVD Drive Units",
    category = "Keyboard",
    condition = "Working",
    quantity = "16",
    priceStart = 0,
    priceEnd = 0
  }
) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-sm mx-auto">
      {/* Product Image */}
      <div className="h-48 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-32 h-12 bg-gradient-to-r from-gray-400 to-gray-500 rounded relative shadow-lg">
            <div className="absolute top-2 left-2 w-16 h-6 bg-gray-800 rounded-sm"></div>
            <div className="absolute top-3 right-3 w-5 h-4 bg-gray-600 rounded-sm"></div>
          </div>
        )}
      </div>
      
      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{name}</h3>
        <p className="text-sm text-gray-500 mb-3">{category}</p>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Condition</span>
            <span className={`text-sm font-semibold ${
              condition.toLowerCase() === 'working' 
                ? 'text-green-600' 
                : 'text-red-600'
            }`}>
              {condition}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Quantity</span>
            <span className="text-sm font-semibold text-gray-900">{quantity}</span>
          </div>
          
          <div className="border-t border-gray-200 pt-3 mt-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Price Range: </span>
              {priceStart === 0 && priceEnd === 0 ? (
                <span className="text-base font-semibold text-yellow-600">Estimation pending</span>
              ) : (
                <span className="text-base font-bold text-blue-600">
                  ₹{priceStart} - ₹{priceEnd}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
