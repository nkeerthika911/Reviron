import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navbar } from "../Navbar";
import { CartProduct } from "./components/CartProduct";
import OrderSummary from "./components/OrderSummary";
import { jwtDecode } from "jwt-decode";

export const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isRemoved, setIsRemoved] = useState(false);
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("jwt");
    if (!token) return null;

    try {
      const decoded = jwtDecode(token);
      return decoded.userId || null;
    } catch (err) {
      console.error("Invalid JWT token", err);
      return null;
    }
  };
  const userId = getUserIdFromToken();; // Replace with actual user ID
  console.log(userId);
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(`https://reviron-1.onrender.com/api/cart/add/${userId}`);
        const formatted = res.data.data.map((item) => ({
          id: item.productId._id,
          name: item.productId.name,
          price: item.productId.price,
          quantity: item.quantity,
          image: item.productId.images?.[0] || "/images/default.jpg",
        }));
        setCartItems(formatted);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    };


    fetchCart();
  }, [userId, isRemoved]);



  const handleQuantityChange = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/cart/delete/${userId}/${id}`);
      console.log(userId, id);
    } catch (err) {
      console.error("Error removing item:", err);
    }
    if (isRemoved) {
      setIsRemoved(false);
    }
    else {
      setIsRemoved(true);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryCharge = 0;
  const discount = subtotal > 500 ? 50 : 10;
  const total = subtotal + deliveryCharge - discount;

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
