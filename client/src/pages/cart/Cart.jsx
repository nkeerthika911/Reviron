// CartPage.jsx
import React from "react";
import { Navbar } from "../Navbar";
import { CartProduct } from "./components/CartProduct";
import  OrderSummary  from "./components/OrderSummary.jsx";

export const Cart = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Cart section */}
      <div className="flex flex-col items-center p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Shopping Bag</h2>
        <p className="mb-4 text-sm text-gray-600">2 items in your bag.</p>

        <div className="flex w-full max-w-7xl justify-between items-start gap-6">
          <div className="flex flex-col gap-4 w-[65%]">
            <CartProduct
              image="https://5.imimg.com/data5/SELLER/Default/2023/10/351588673/ZY/JG/HZ/114333660/fan-motor-500x500.jpeg"
              title="Fan motor"
              seller="Usha"
              quantity={100}
              price={150.0}
              stock={500}
              returnDays={14}
            />
          </div>

          <OrderSummary />
        </div>

        {/* Bottom Info Cards */}
        <div className="flex justify-between gap-4 mt-10 w-full max-w-7xl">
          <div className="flex-1 bg-pink-50 p-4 rounded shadow text-center">
            <p className="font-semibold text-sm">Free Shipping</p>
            <p className="text-xs text-gray-500">When you spend $50+</p>
          </div>
          <div className="flex-1 bg-yellow-50 p-4 rounded shadow text-center">
            <p className="font-semibold text-sm">Call Us Anytime</p>
            <p className="text-xs text-gray-500">+34 555 5555</p>
          </div>
          <div className="flex-1 bg-green-50 p-4 rounded shadow text-center">
            <p className="font-semibold text-sm">Chat With Us</p>
            <p className="text-xs text-gray-500">We offer 24-hour chat support</p>
          </div>
          <div className="flex-1 bg-gray-100 p-4 rounded shadow text-center">
            <p className="font-semibold text-sm">Gift Cards</p>
            <p className="text-xs text-gray-500">For your loved one, in any amount</p>
          </div>
        </div>
      </div>
    </div>
  );
};
