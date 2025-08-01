import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Navbar } from '../Navbar';

export const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
        const data = response.data.data.data;
        setProduct({
          ...data,
          images: data.images || [],
          categories: data.categories || [],
        });
        setSelectedImage((data.images || [])[0] || '');
        setError('');
      } catch (err) {
        setError('Failed to fetch product details. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="h-screen w-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex justify-center items-center flex-1 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6F9674] mx-auto mb-4"></div>
            <p className="text-gray-500">Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="h-screen w-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex justify-center items-center flex-1 py-12">
          <p className="text-red-500 font-medium">{error || 'Product not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex flex-1 p-6 gap-6 overflow-hidden">
        {/* Left: Image and Thumbnails */}
        <div className="w-1/2 flex flex-col rounded shadow-sm p-4">
          {/* Selected Image Container */}
          <div className="flex justify-center items-center mb-4 h-[400px]">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full h-full object-contain rounded shadow"
              />
            ) : (
              <div className="text-gray-500">No image selected</div>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 justify-center pt-2 border-t border-gray-300">
            {product.images.length > 0 ? (
              product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index}`}
                  className={`w-20 h-20 object-cover border-2 rounded cursor-pointer ${
                    selectedImage === img ? 'border-[#81ad87]' : 'border-gray-300'
                  }`}
                  onClick={() => setSelectedImage(img)}
                />
              ))
            ) : (
              <p className="text-sm text-gray-500">No images available</p>
            )}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="w-1/2 flex flex-col gap-4">
          <h1 className="text-4xl font-semibold text-[#2f4734]">{product.name}</h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                product.condition === 'Working' ? 'bg-[#81ad87]' : 'bg-red-500'
              }`}
            >
              {product.condition || "not working"}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium text-black bg-[#ffcf00]">
              {product.brand}
            </span>
            {product.category.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-gray-700">{product.description}</p>

          {/* Price */}
          <div className="text-3xl font-bold text-[#81ad87]">₹{product.price}</div>

          {/* Stock & Quantity */}
          <div className="flex flex-col gap-2 text-sm">
            <p>
              <span className="font-medium">In stock:</span> {product.quantity} items
            </p>
            <div className="flex items-center gap-2">
              <label htmlFor="quantity" className="font-medium">Quantity:</label>
              <input
                type="number"
                id="quantity"
                min={1}
                max={product.quantity}
                value={selectedQuantity}
                onChange={(e) =>
                  setSelectedQuantity(Math.min(product.quantity, Math.max(1, +e.target.value)))
                }
                className="w-20 px-2 py-1 border border-gray-300 rounded"
              />
            </div>
          </div>

          {/* Buttons */}
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
