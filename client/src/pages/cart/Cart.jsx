import React, { useState, useEffect } from "react";
import { Navbar } from "../Navbar";
import { CartProduct } from "./components/CartProduct";
import OrderSummary from "./components/OrderSummary";
import { useCart } from "../../context/CartContext";

export const Cart = () => {
  const { cartItems, handleQuantityChange, handleRemove } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryCharge = 0;
  const discount = subtotal > 500 ? 50 : 10;
  const total = subtotal + deliveryCharge - discount;

  useEffect(() => {
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "auto";
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex flex-col items-center p-6 flex-grow">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Shopping Bag</h2>
        <p className="mb-4 text-sm text-gray-600">
          {cartItems.length} item{cartItems.length !== 1 && "s"} in your bag.
        </p>

        <div className="flex w-full max-w-7xl justify-between items-start gap-6">
          <div className="flex flex-col gap-4 w-[65%]">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartProduct
                  key={item.id}
                  product={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemove}
                />
              ))
            ) : (
              <p className="text-gray-500 text-sm">Your cart is empty.</p>
            )}
          </div>

          <OrderSummary
            subtotal={subtotal}
            discount={discount}
            total={total}
          />
        </div>
      </div>

      {/* Bottom Info Cards */}
      <div className="mt-auto w-full bg-gray-50 flex justify-center">
        <div className="flex justify-between gap-4 mt-10 w-full max-w-7xl px-6 pb-10">
          <div className="flex-1 bg-white-50 p-4 rounded shadow text-center">
            <p className="font-semibold text-sm">Free Shipping</p>
            <p className="text-xs text-gray-500">When you spend ₹500+</p>
          </div>
          <div className="flex-1 bg-red-50 p-4 rounded shadow text-center">
            <p className="font-semibold text-sm">Call Us Anytime</p>
            <p className="text-xs text-gray-500">+91 99999 99999</p>
          </div>
          <div className="flex-1 bg-blue-50 p-4 rounded shadow text-center">
            <p className="font-semibold text-sm">Chat With Us</p>
            <p className="text-xs text-gray-500">We offer 24-hour chat support</p>
          </div>
          <div className="flex-1 bg-green-50 p-4 rounded shadow text-center">
            <p className="font-semibold text-sm">Gift Cards</p>
            <p className="text-xs text-gray-500">For your loved ones, in any amount</p>
          </div>
        </div>
      </div>
    </div>
  );
};
