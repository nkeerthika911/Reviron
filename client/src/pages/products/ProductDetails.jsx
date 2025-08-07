  import React, { useState, useEffect } from 'react';
  import { useParams, useNavigate } from 'react-router-dom';
  import axios from 'axios';
  import { Navbar } from '../Navbar';

  export const ProductDetails = () => {
    const { productId } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/products/${productId}`);
        const data = res.data.data.data;
        setProduct({
          ...data,
          images: data.images || [],
          categories: data.categories || [],
        });
        setSelectedImage((data.images || [])[0] || '');
        setError('');
      } catch (err) {
        setError('Failed to fetch product details');
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
        <div className="flex justify-center items-center flex-1">
          <p className="text-gray-500">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="h-screen w-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex justify-center items-center flex-1">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error || 'Product not found'}</p>
            <button
              onClick={() => navigate(-1)}
              className="bg-[#4f785e] hover:bg-[#3b624b] text-white px-6 py-2 rounded"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-white flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex flex-1 p-6 gap-8 overflow-hidden">
        {/* Image & Thumbnails */}
        <div className="flex-[1] flex flex-col gap-4 relative">
          <div className="relative bg-gray-50 rounded-lg overflow-hidden flex-1">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Product"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.src =
                    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+';
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No image available
              </div>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 overflow-x-auto">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`thumb-${i}`}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 object-cover rounded-lg border cursor-pointer ${
                  selectedImage === img
                    ? 'border-[#4f785e] ring-2 ring-[#4f785e]'
                    : 'border-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-[1] flex flex-col overflow-y-auto pr-2">
          <h1 className="text-3xl font-semibold text-[#2f4734]">{product.name}</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            <span
              className={`text-xs px-3 py-1 rounded-full text-white ${
                product.condition === 'Working' ? 'bg-green-600' : 'bg-red-600'
              }`}
            >
              {product.condition}
            </span>
            {product.brand && (
              <span className="text-xs px-3 py-1 rounded-full bg-yellow-300 text-black">
                {product.brand}
              </span>
            )}
            {product.category?.map((cat, i) => (
              <span key={i} className="text-xs px-3 py-1 rounded-full bg-gray-200">
                {cat}
              </span>
            ))}
          </div>

          <div className="text-4xl font-bold text-[#81ad87] mt-4">
            ₹{product.price?.toLocaleString()}
          </div>

          {/* Description */}
          {product.description && (
            <div className="mt-6 p-4 bg-gray-50 border rounded">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>
          )}

          {/* Stock & Quantity */}
          <div className="mt-6 p-4 border rounded">
            <p className="mb-2 font-medium text-gray-800">
              {product.quantity > 0 ? `${product.quantity} in stock` : 'Out of stock'}
            </p>
            {product.quantity > 0 && (
              <div className="flex items-center gap-3">
                <label className="text-gray-800">Qty:</label>
                <input
                  type="number"
                  min={1}
                  max={product.quantity}
                  value={selectedQuantity}
                  onChange={(e) =>
                    setSelectedQuantity(
                      Math.min(product.quantity, Math.max(1, parseInt(e.target.value)))
                    )
                  }
                  className="w-16 text-center border rounded px-2 py-1"
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              className="flex-1 bg-yellow-300 hover:bg-yellow-400 text-black py-3 rounded font-semibold disabled:opacity-50"
              disabled={product.quantity === 0}
              onClick={() => alert('Added to cart!')}
            >
              Add to Cart
            </button>
            <button
              className="flex-1 bg-[#4f785e] hover:bg-[#3b624b] text-white py-3 rounded font-semibold disabled:opacity-50"
              disabled={product.quantity === 0}
              onClick={() =>
                navigate('/buy', {
                  state: {
                    product: {
                      ...product,
                      quantity: selectedQuantity,
                    },
                  },
                })
              }
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
