import React, { useState } from "react";

export const CartProduct = ({ product, onQuantityChange, onRemove }) => {
  const [removing, setRemoving] = useState(false);

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => onRemove(product.id || product._id), 250); // match animation duration
  };

  return (
    <div
      className={`bg-white rounded-lg p-6 flex w-[95%] max-w-6xl shadow-md transition hover:shadow-lg items-center gap-6 transition-opacity duration-250 ${removing ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="w-60 h-60 flex-shrink-0 border border-gray-200 rounded overflow-hidden">
        <img
          src={product.image}
          alt={product.title || product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/80?text=No+Image";
          }}
        />
      </div>

      <div className="flex flex-row justify-between items-start w-full">
        <div className="flex flex-col space-y-5 w-2/3">
          <h3 className="text-xl font-semibold text-gray-900">{product.title || product.name}</h3>
          <p className="text-sm text-gray-500">Sold by: {product.seller}</p>

          <div className="flex items-center gap-4">
            <label className="text-base font-medium">Qty:</label>
            <select
              className="border px-3 py-2 rounded text-base hover:border-gray-500 focus:outline-none focus:ring focus:ring-green-200"
              value={product.quantity}
              onChange={(e) => onQuantityChange(product.id || product._id, parseInt(e.target.value))}
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <span className="bg-green-100 text-green-700 px-3 py-1 text-sm rounded border border-green-300">
              ✅ In stock: {product.stock}
            </span>
          </div>

          <div className="text-base text-blue-700 flex items-center">
            <span className="mr-1">🔁</span>
            <strong className="mr-1">{product.returnDays} days</strong> return available
          </div>
        </div>

        <div className="flex flex-col justify-between items-end w-1/3 h-full">
          <div className="text-xl font-bold text-green-800 text-right">
            ₹{(product.price * product.quantity).toFixed(2)}
            <div className="text-base text-gray-500 font-normal">(incl. of GST)</div>
          </div>
          <button
            onClick={handleRemove}
            className="text-red-500 text-base font-medium hover:underline mt-6"
            disabled={removing}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};