// CartProduct.jsx
import React from "react";

export const CartProduct = () => {
  return (
    <div className="bg-white rounded-lg p-4 flex w-[90%] max-w-3xl shadow-md relative">
      {/* Product Image */}
      <img
        src="https://static.wixstatic.com/media/42a32f_404a78c6517b4affb11f491ede019675~mv2.jpg/v1/fill/w_480,h_466,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/42a32f_404a78c6517b4affb11f491ede019675~mv2.jpg"
        alt="Fan Motor"
        className="w-20 h-20 object-contain mr-4"
      />

      {/* Product Details */}
      <div className="flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-base font-semibold text-gray-900">Fan motor</h3>
          <p className="text-sm text-gray-500 mb-2">Sold by: Usha</p>

          <div className="flex items-center gap-3 mb-1">
            <label className="text-sm font-medium">Qty:</label>
            <select className="border px-2 py-1 rounded text-sm">
              <option>1</option>
              <option>10</option>
              <option>100</option>
            </select>
            <span className="bg-green-100 text-green-700 px-2 py-0.5 text-xs rounded border border-green-300">
              In stock: 500
            </span>
          </div>

          <p className="text-base font-semibold text-gray-900">
            ₹150.00{" "}
            <span className="text-sm text-gray-500">(incl. of GST)</span>
          </p>

          <p className="text-sm text-blue-700 mt-1 flex items-center">
            <span className="mr-1">📦</span>
            <strong className="mr-1">14 days</strong> return available
          </p>
        </div>
      </div>

      {/* Close Button */}
      <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-lg">
        ✕
      </button>
    </div>
  );
};
