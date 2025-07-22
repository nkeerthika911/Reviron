import React from "react";

export const CartProduct = ({ product, onQuantityChange, onRemove }) => {
  return (
    <div className="bg-white rounded-lg p-4 flex w-[90%] max-w-3xl shadow-md">
      <img
        src={product.image}
        alt={product.title}
        className="w-20 h-20 object-contain mr-4"
      />

      <div className="flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-base font-semibold text-gray-900">{product.title}</h3>
          <p className="text-sm text-gray-500 mb-2">Sold by: {product.seller}</p>

          <div className="flex items-center gap-3 mb-1">
            <label className="text-sm font-medium">Qty:</label>
            <select
              className="border px-2 py-1 rounded text-sm"
              value={product.quantity}
              onChange={(e) => onQuantityChange(product.id, parseInt(e.target.value))}
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <span className="bg-green-100 text-green-700 px-2 py-0.5 text-xs rounded border border-green-300">
              In stock: {product.stock}
            </span>
          </div>

          <p className="text-base font-semibold text-gray-900">
            ₹{(product.price * product.quantity).toFixed(2)}{" "}
            <span className="text-sm text-gray-500">(incl. of GST)</span>
          </p>

          <p className="text-sm text-blue-700 mt-1 flex items-center">
            <span className="mr-1">📦</span>
            <strong className="mr-1">{product.returnDays} days</strong> return available
          </p>

          {/* 🧹 Delete Button */}
          <button
            onClick={() => onRemove(product.id)}
            className="mt-3 text-red-500 text-sm font-medium hover:underline"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
