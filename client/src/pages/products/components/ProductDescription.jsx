import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const ProductDescription = () => {
  const [quantity, setQuantity] = useState(1)
  const navigate = useNavigate()

  const handleQuantityChange = (e) => {
    const val = parseInt(e.target.value)
    if (val >= 1 && val <= 10) {
      setQuantity(val)
    }
  }

  const handleBuyNow = () => {
    // Create product object with current data
    const product = {
      name: "Laptop Motherboard – Multi-Compatible, DDR4 Support, Micro-ATX Form Factor (Intel/AMD, 1 Unit)",
      price: 1400,
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Computer-motherboard.jpg/640px-Computer-motherboard.jpg",
      quantity: quantity
    }
    navigate('/buypage', { state: { product } })
  }

  const handleAddToCart = () => {
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-xl p-6 shadow-lg flex flex-col md:flex-row gap-10">
        {/* Left: Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Computer-motherboard.jpg/640px-Computer-motherboard.jpg" // Replace with your image path
            alt="Laptop Motherboard"
            className="rounded-lg w-full object-contain"
          />
          {/* Optional: Add thumbnails below */}
        </div>

        {/* Right: Product Info */}
        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Laptop Motherboard – Multi-Compatible, DDR4 Support, Micro-ATX Form Factor (Intel/AMD, 1 Unit)
          </h1>

          {/* Ratings */}
          <div className="flex items-center gap-2 text-yellow-500 text-sm">
            ⭐⭐⭐⭐☆ <span className="text-gray-600 text-xs">(1,240 ratings)</span>
          </div>

          {/* Price */}
          <div className="text-3xl font-semibold text-green-700">₹1,400</div>
          <div className="text-sm text-gray-600">Inclusive of all taxes</div>

          {/* Delivery */}
          <div className="text-sm text-gray-700 mt-2">
            ✅ Free Delivery: <span className="font-medium text-black">Tomorrow</span> by 9 PM
          </div>

          {/* Stock */}
          <div className="text-green-600 font-semibold">In stock</div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-3 mt-2">
            <label htmlFor="quantity" className="text-sm text-gray-600">Qty:</label>
            <input
              type="number"
              id="quantity"
              min="1"
              max="10"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-16 border rounded px-2 py-1 text-center"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button
              className="text-black font-semibold px-6 py-2 rounded-lg transition-colors"
              style={{ backgroundColor: '#81AD87' }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#6E9673')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#81AD87')}
              onClick={handleAddToCart}
            >
              🛒 Add to Cart
            </button>
            <button
              className="text-white font-semibold px-6 py-2 rounded-lg transition-colors"
              style={{ backgroundColor: '#81AD87' }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#6E9673')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#81AD87')}
              onClick={handleBuyNow}
            >
              ⚡ Buy Now
            </button>
          </div>

          {/* Highlights */}
          <ul className="mt-6 space-y-1 text-sm list-disc pl-5 text-gray-700">
            <li>Compatible with latest Intel and AMD processors</li>
            <li>Supports DDR4 RAM with dual-channel architecture</li>
            <li>Features HDMI, USB 3.0, Ethernet, and SATA ports</li>
            <li>Built with durable components and advanced heat dissipation</li>
            <li>Ideal for repairs, upgrades, and custom laptop builds</li>
          </ul>
        </div>
      </div>

      {/* Full Description Below */}
      <div className="max-w-7xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-3">About this item</h2>
        <p className="text-gray-700 leading-relaxed">
          This high-performance laptop motherboard is perfect for upgrading or replacing your existing system.
          It supports the latest Intel/AMD processors with dual-channel DDR4 RAM compatibility.
          Equipped with HDMI, USB 3.0, SATA, and Ethernet ports for seamless connectivity.
          Built with durable components and efficient cooling support for long-lasting performance.
          Ideal for custom laptop builds, repairs, and performance enhancements.
        </p>

      </div>
    </div>
  )
}
