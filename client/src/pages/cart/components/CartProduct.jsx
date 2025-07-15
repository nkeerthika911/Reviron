import React from "react";

export const CartProduct = () => {
  return (
    <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4 w-full">
      <img
        src="https://static.wixstatic.com/media/42a32f_404a78c6517b4affb11f491ede019675~mv2.jpg/v1/fill/w_480,h_466,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/42a32f_404a78c6517b4affb11f491ede019675~mv2.jpg"
        alt="Fan Motor"
        className="w-24 h-24 object-cover rounded"
      />
      <div>
        <h3 className="text-lg font-semibold">Fan motor</h3>
        <p className="text-gray-700">
          ₹150.00 <span className="text-sm text-gray-500">(incl. of GST)</span>
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="bg-purple-100 text-purple-700 text-sm px-2 py-1 rounded">
            Usha
          </span>
          <span className="bg-green-100 text-green-700 text-sm px-2 py-1 rounded">
            Working
          </span>
          <span className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded">
            In stock: 500
          </span>
        </div>
      </div>
    </div>
  );
};
