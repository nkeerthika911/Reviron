import React from 'react';

export const CollectionRequestCard = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex items-center justify-between bg-white rounded-2xl shadow-md p-4 w-[650px] transition transform duration-300 hover:scale-105 hover:shadow-lg">
        {/* Left: Image */}
        <div className="w-32 h-32 rounded-xl overflow-hidden">
          <img
            src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg"
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Center: Details */}
        <div className="flex flex-col justify-start mt-4 ml-4 space-y-1 text-sm text-gray-700">
          <div className="flex gap-1">
            <p className="font-bold text-gray-800">Requested ID:</p>
            <p className="text-gray-500">XXX1</p>
          </div>
          <div className="flex gap-1">
            <p className="font-bold text-gray-800">Customer Email:</p>
            <p className="text-gray-500">raju@email.com</p>
          </div>
          <div className="flex gap-1">
            <p className="font-bold text-gray-800">No. of Products:</p>
            <p className="text-gray-500">42</p>
          </div>
          <div className="flex gap-1">
            <p className="font-bold text-gray-800">Estimated Price:</p>
            <p className="text-gray-500">₹3,500 – ₹5,000</p>
          </div>
        </div>

        {/* Right: Button (Vertically Centered) */}
        <div className="flex items-center justify-center ml-auto">
          <button className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full shadow-md">
            Processing
          </button>
        </div>
      </div>
    </div>
  );
};
