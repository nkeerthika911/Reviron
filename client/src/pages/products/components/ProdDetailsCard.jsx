import React from 'react';

export const ProdDetails = () => {
  return (
    <div className="p-4 border rounded shadow flex flex-row max-w-4xl">
      {/* Image */}
      <div className="flex-1">
        <img
          src="src/assets/RevironLogo.png"
          alt="Quant trident shirts"
          className="w-full h-auto object-cover rounded"
        />
      </div>

      {/* Details */}
      <div className="flex-2 flex flex-col px-6">
        <h2 className="text-lg font-semibold mb-2">Quant trident shirts</h2>
        <div className="flex items-center mb-2">
          <span className="text-red-500 text-xl">★★★★★</span>
          <span className="ml-2 text-gray-600">310</span>
        </div>
        <p className="text-gray-700 mb-1">
          100% cotton • Light weight • Best finish
        </p>
        <p className="text-gray-700 mb-1">
          Unique design • For men • Casual
        </p>
        <p className="text-gray-600 text-sm mt-2">
          There are many variations of passages of Lorem Ipsum available, but t...
        </p>
      </div>

      {/* Price & Actions */}
      <div className="flex-1 flex flex-col items-end justify-between">
        <div className="mb-2">
          <h3 className="text-xl font-bold text-gray-800">
            $13.99 <span className="line-through text-red-500 text-base">$20.99</span>
          </h3>
          <p className="text-green-600 font-medium">Free shipping</p>
        </div>
        <div className="flex flex-col gap-2 w-full max-w-[10rem]">
          <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            DETAILS
          </button>
          <button className="border border-blue-600 text-blue-600 py-2 rounded hover:bg-blue-50">
            ADD TO WISHLIST
          </button>
        </div>
      </div>
    </div>
  );
};
