import React, { useState } from 'react';
import { Navbar } from '../Navbar';

const sampleProduct = {
  name: 'Wireless Bluetooth Headphones',
  description: 'High-quality wireless headphones with noise cancellation and 30 hours battery life.',
  price: 1999,
  quantity: 10,
  brand: 'SoundCore',
  condition: 'Working',
  categories: ['Electronics', 'Audio', 'Wireless', 'On Sale'],
  images: [
    '/images/product1.jpg',
    '/images/product2.jpg',
    '/images/product3.jpg',
    '/images/product4.jpg'
  ]
};

export const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState(sampleProduct.images[0]);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  return (
    <div className="h-screen w-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex flex-1 p-6 gap-6 overflow-hidden">
        {/* Left: Image and Thumbnails below */}
        <div className="w-1/2 flex flex-col rounded shadow-sm p-4">
          <div className="flex-1 flex justify-center items-center mb-4">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Selected"
                className="max-h-[85%] max-w-full object-contain rounded shadow"
              />
            ) : (
              <div className="text-gray-500">No image selected</div>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 justify-center pt-2 border-t border-gray-300">
            {sampleProduct.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                className={`w-20 h-20 object-cover border-2 rounded cursor-pointer ${
                  selectedImage === img ? 'border-[#81ad87]' : 'border-gray-300'
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="w-1/2 flex flex-col gap-4">
          {/* Product Name */}
          <h1 className="text-3xl font-semibold text-[#2f4734]">{sampleProduct.name}</h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                sampleProduct.condition === 'Working' ? 'bg-[#81ad87]' : 'bg-red-500'
              }`}
            >
              {sampleProduct.condition}
            </span>
            {sampleProduct.categories.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-gray-700">{sampleProduct.description}</p>

          {/* Price */}
          <div className="text-xl font-bold text-[#81ad87]">₹{sampleProduct.price}</div>

          {/* Stock & Quantity */}
          <div className="flex flex-col gap-2 text-sm">
            <p>
              <span className="font-medium">In stock:</span> {sampleProduct.quantity} items
            </p>
            <div className="flex items-center gap-2">
              <label htmlFor="quantity" className="font-medium">Quantity:</label>
              <input
                type="number"
                id="quantity"
                min={1}
                max={sampleProduct.quantity}
                value={selectedQuantity}
                onChange={(e) => setSelectedQuantity(Math.min(sampleProduct.quantity, Math.max(1, +e.target.value)))}
                className="w-20 px-2 py-1 border border-gray-300 rounded"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-4">
            <button className="bg-[#f5e7aa] hover:bg-[#f1de85] text-black font-medium px-6 py-2 rounded shadow-sm">
              Add to Cart
            </button>
            <button className="bg-[#4f785e] hover:bg-[#3b624b] text-white font-medium px-6 py-2 rounded shadow-sm">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
