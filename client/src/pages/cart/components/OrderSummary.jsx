import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";

export default function OrderSummary({ subtotal, discount, total }) {
  const deliveryCharge = 0;
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const handleBuyNow = () => {
    // Pass all cart items to the Buynow page
    navigate('/buypage', { state: { cartItems } });
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg space-y-6">
      {/* Cart Total Section */}
      <div className="bg-[#e1ebe2] p-6 rounded-2xl">
        <h2 className="text-xl font-semibold mb-6">Cart Summary</h2>
        <div className="space-y-4 text-base">
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
          <div className="flex justify-between font-semibold text-lg">
            <span>Total Amount</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>

        <button 
          className="w-full mt-6 py-3 rounded-full bg-[#81AD87] text-white text-base font-semibold hover:bg-[#6C9973] transition"
          onClick={handleBuyNow}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
