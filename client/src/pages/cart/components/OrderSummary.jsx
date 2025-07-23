import React from "react";

export default function OrderSummary({ subtotal, discount, total }) {
  const deliveryCharge = 0;

  return (
    <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow-md space-y-6">
      {/* Shipping Address Section */}
      {/* Cart Total Section */}
      <div className="bg-[#e1ebe2] p-4 rounded-xl">
        <h2 className="text-lg font-semibold mb-4">Cart Summary</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Cart Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Charges</span>
            <span>{deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span className="text-red-600">- ₹{discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-base">
            <span>Total Amount</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>

        <button className="w-full mt-4 py-2 rounded-full bg-[#81AD87] text-white font-semibold hover:bg-[#6C9973] transition">
          Apply
        </button>
      </div>
    </div>
  );
}
