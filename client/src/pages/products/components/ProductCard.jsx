import React, { useState } from 'react';
import { useCart } from '../../../context/CartContext';
import { ToastPopup } from '../../utils/ToastPopup';
import { useNavigate } from 'react-router-dom';

// ProductCard component
export const ProductCard = ({ product }) => {
  const [liked, setLiked] = useState(false);
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    // Prevent navigation if a button inside the card is clicked
    if (
      e.target.closest('button')
    ) return;
    navigate(`/product/${product._id}`);
  };

  const handleAddToCart = () => {
    addToCart(product);
    setShowToast(true);
  };

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden bg-white shadow-lg flex flex-col cursor-pointer" onClick={handleCardClick}>
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-full h-[170px] object-cover"
      />
      <div className="flex flex-col p-4 flex-1">
        <div className="flex justify-between items-center">
          <h3 className="text-[16px] font-semibold text-[#6F9674] m-0">
            {product.name}
          </h3>
          <div
            onClick={() => setLiked(!liked)}
            className={`cursor-pointer transition-colors duration-200 ${
              liked ? 'text-red-500' : 'text-[#6F9674]'
            }`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={liked ? 'red' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
        </div>

        <p className="text-[14px] font-semibold text-[#333] mt-2 mb-1">
          ₹{product.price ? product.price.toLocaleString("en-IN") : '0'} 
          <span className="text-[11px] font-normal text-[#777]"> (incl. of GST)</span>
        </p>


        <div className="flex gap-1.5 mt-2 justify-between flex-nowrap">
          <div className="text-[9.5px] px-2 py-1 bg-[#EDF4ED] text-[#6F9674] rounded-full flex items-center gap-1 flex-1 whitespace-nowrap">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-truck" viewBox="0 0 16 16">
              <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
            </svg>
            Free delivery
          </div>
          <div className="text-[9.5px] px-2 py-1 bg-[#EDF4ED] text-[#6F9674] rounded-full flex items-center gap-1 flex-1 whitespace-nowrap">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-box-seam" viewBox="0 0 16 16">
              <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2zm3.564 1.426L5.596 5 8 5.961 14.154 3.5zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z"/>
            </svg>
            Stock: {product.quantity || 0}
          </div>
        </div>

        <div className="w-full h-[35px] flex gap-2.5 mt-4">
          <button
            className="flex-1 bg-[#6F9674] text-white text-[12px] font-medium rounded-full"
            onClick={() => navigate('/buypage', { state: { product } })}
          >
            Buy now
          </button>
          <button
            className="w-[35px] h-[35px] bg-[#6F9674] text-white rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-[#4e6e54] focus:outline-none focus:ring-2 focus:ring-[#81AD87]"
            onClick={handleAddToCart}
            title="Add to Cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#ffffff"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <path d="M10 20c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm8-1c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM7.16 14.26l.01.01c.26.26.61.4.98.4h7.72c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.3.12-.47 0-.55-.45-1-1-1H6.21l-.94-2H1v2h2l3.6 7.59-.94 1.72C5.23 17.37 6.15 19 7.5 19H19v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.96-1.75z" />
            </svg>
          </button>
          {showToast && (
            <ToastPopup message="Added to cart!" color="bg-green-600" duration={1500} clearToast={() => setShowToast(false)} position="bottom-center" />
          )}
        </div>
      </div>
    </div>
  );
};