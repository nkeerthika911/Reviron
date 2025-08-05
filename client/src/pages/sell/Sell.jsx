import React, { useRef, useState } from 'react';
import { Navbar } from '../Navbar';
import { SellForm } from './components/SellForm';
import { UserProductCard } from './components/userProductCard';

export const Sell = () => {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const scrollRef = useRef(null);

  const toggleForm = () => setShowForm(!showForm);

  const handleAddProduct = (productData) => {
    setProducts([...products, { ...productData, id: Date.now() }]);
  };

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleSellNow = () => {
    if (!address.trim() || !phone.trim()) {
      alert('Please fill in both address and phone number before selling.');
      return;
    }

    // Replace this with your submit logic
    console.log('Sell Now clicked with:', { products, address, phone });
    alert('Products submitted!');
  };

  return (
    <div className="h-screen w-screen bg-gray-50 flex flex-col relative">
      <Navbar />

      <div className="flex p-4 w-full h-full overflow-hidden">
        {showForm && (
          <>
            {/* Left: Sell Form */}
            <div className="w-1/2 pr-2">
              <SellForm
                onCancel={toggleForm}
                onSubmit={handleAddProduct}
              />
            </div>

            {/* Right: Product Preview Panel */}
            <div className="w-1/2 pl-2 bg-white rounded shadow-md flex flex-col justify-between py-4">
              {products.length === 0 ? (
                <p className="text-gray-500 text-center px-4 my-auto">
                  No product added, add at least one product to sell
                </p>
              ) : (
                <>
                  {/* Scrollable Product Cards with Arrows */}
                  <div className="relative px-4">
                    <button
                      onClick={() => handleScroll('left')}
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded shadow z-10"
                    >
                      &lt;
                    </button>
                    <div
                      ref={scrollRef}
                      className="w-full flex space-x-4 overflow-x-auto max-h-[70vh] scrollbar-hide"
                    >
                      {products.map((product) => (
                        <UserProductCard
                          key={product.id}
                          name={product.name}
                          category={product.category}
                          condition={product.condition}
                          quantity={product.quantity}
                          priceStart={product.priceStart}
                          priceEnd={product.priceEnd}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => handleScroll('right')}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded shadow z-10"
                    >
                      &gt;
                    </button>
                  </div>

                  {/* Address & Phone Inputs */}
                  <div className="px-4 pt-4">
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Address"
                      className="w-full h-20 mb-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-center items-center space-x-4 px-4 pt-4">
                    <button
                      onClick={() => setProducts([])}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                    >
                      Clear Products
                    </button>
                    <button
                      onClick={handleSellNow}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                    >
                      Sell Now
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>

      {!showForm && (
        <button
          onClick={toggleForm}
          className="fixed bottom-6 right-6 bg-[#73B87C] text-white rounded-full w-14 h-14 text-3xl shadow-lg transition-all duration-300 hover:bg-[#6F9674] transform hover:scale-110 hover:rotate-90"
        >
          +
        </button>
      )}
    </div>
  );
};
