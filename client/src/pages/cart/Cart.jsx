import React, { useState, useEffect } from "react";
import { Navbar } from "../Navbar";
import { CartProduct } from "./components/CartProduct";
import OrderSummary from "./components/OrderSummary";

export const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      price: 150,
      quantity: 2,
      image: "/images/headphones.jpg",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 300,
      quantity: 1,
      image: "/images/watch.jpg",
    },
  ]);

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
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
            cartItems={cartItems}
          />

        </div>
      </div>
    </div>
  );
};
