import React, { useState } from "react";
import { Navbar } from "../Navbar";
import { CartProduct } from "./components/CartProduct";
import OrderSummary from "./components/OrderSummary";

export const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      image:
        "https://static.wixstatic.com/media/42a32f_404a78c6517b4affb11f491ede019675~mv2.jpg",
      title: "Fan motor",
      seller: "Usha",
      quantity: 1,
      price: 150.0,
      stock: 500,
      returnDays: 14,
    },
    {
      id: 2,
      image:
        "https://5.imimg.com/data5/SELLER/Default/2023/10/351588673/ZY/JG/HZ/114333660/fan-motor-500x500.jpeg",
      title: "Mini Fan",
      seller: "Bajaj",
      quantity: 2,
      price: 100.0,
      stock: 100,
      returnDays: 10,
    },
  ]);

  const handleQuantityChange = (id, newQty) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryCharge = 0;
  const discount = subtotal > 500 ? 50 : 10;
  const total = subtotal + deliveryCharge - discount;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex flex-col items-center p-6">
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

        {/* Bottom Info Cards */}
        <div className="flex justify-between gap-4 mt-10 w-full max-w-7xl">
          <div className="flex-1 bg-green-50 p-4 rounded shadow text-center">
            <p className="font-semibold text-sm">Free Shipping</p>
            <p className="text-xs text-gray-500">When you spend ₹500+</p>
          </div>
          <div className="flex-1 bg-green-50 p-4 rounded shadow text-center">
            <p className="font-semibold text-sm">Call Us Anytime</p>
            <p className="text-xs text-gray-500">+91 99999 99999</p>
          </div>
          <div className="flex-1 bg-green-50 p-4 rounded shadow text-center">
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
