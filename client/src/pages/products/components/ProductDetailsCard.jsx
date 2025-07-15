import React from 'react';

export const ProductDetailsCard = () => {
  return (
    <div className="flex flex-row p-6 border rounded shadow max-w-5xl">
      {/* Left: Images */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Main Image */}
        <div className="flex-4">
          <img
            src="src/assets/RevironLogo.png"
            alt="Casaliving Sofa"
            className="w-full h-auto object-cover rounded"
          />
        </div>

        {/* Thumbnails */}
        <div className="flex-2 flex flex-row justify-center gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex-1">
              <img
                src="src/assets/RevironLogo.png"
                alt={`Thumbnail ${i}`}
                className="w-full h-auto object-cover rounded border"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right: Product Details */}
      <div className="flex-2 flex flex-col px-8">
        <h3 className="text-xl font-semibold mb-2">
          Casaliving Ella RHS 6 Seater L Shape Sofa Set for Living Room (Green Grey) Premium Fabric Sofa
        </h3>

        <div className="flex items-center mb-2">
          <span className="text-yellow-500 text-lg">★★★★☆</span>
          <span className="ml-2 text-gray-700">4.6</span>
          <span className="ml-2 text-blue-600 underline cursor-pointer">7 ratings</span>
        </div>

        <div className="mb-2">
          <p className="text-green-600 font-semibold">Currently unavailable.</p>
          <p className="text-gray-600 text-sm">
            We don't know when or if this item will be back in stock.
          </p>
        </div>

        <div className="mb-4">
          <p className="font-semibold">Style Name: <span className="font-normal">6 Seater RHS</span></p>
          <div className="flex gap-2 mt-1">
            <button className="px-4 py-2 border rounded hover:bg-gray-100">
              6 Seater LHS
            </button>
            <button className="px-4 py-2 border border-blue-600 rounded hover:bg-gray-100">
              6 Seater RHS
            </button>
          </div>
        </div>

        <div className="mb-4">
          <p className="font-semibold">Pattern Name: <span className="font-normal">Green Grey</span></p>
          <div className="flex gap-2 mt-1 flex-wrap">
            {['Black Grey', 'Blue Grey', 'Brown Grey', 'Green Grey', 'Maroon Grey', 'Yellow Grey'].map(color => (
              <button
                key={color}
                className={`px-4 py-1 border rounded hover:bg-gray-100 ${
                  color === 'Green Grey' ? 'border-blue-600' : ''
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        <div className="text-sm text-gray-700 space-y-1">
          <p><strong>Brand:</strong> Casaliving</p>
          <p><strong>Assembly Required:</strong> No</p>
          <p><strong>Seat Depth:</strong> 86.4 Centimeters</p>
          <p><strong>Seat Height:</strong> 15 Inches</p>
        </div>
      </div>
    </div>
  );
};
