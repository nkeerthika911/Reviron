import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Check if product already in cart (by id or _id)
      const id = product._id || product.id;
      const existing = prevItems.find((item) => (item._id || item.id) === id);
      if (existing) {
        // If already in cart, increase quantity
        return prevItems.map((item) =>
          (item._id || item.id) === id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        // Add new product with quantity 1
        return [
          ...prevItems,
          {
            ...product,
            quantity: 1,
          },
        ];
      }
    });
  };

  const handleQuantityChange = (id, newQty) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        (item._id || item.id) === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => (item._id || item.id) !== id)
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, handleQuantityChange, handleRemove }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext); 