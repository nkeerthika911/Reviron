import React, { useState } from 'react';
import { Navbar } from '../Navbar';
import { SellForm } from './components/SellForm';
import { UserProductCard } from './components/userProductCard';

export const Sell = () => {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);

  const toggleForm = () => setShowForm(!showForm);

  const handleAddProduct = (productData) => {
    setProducts([...products, { ...productData, id: Date.now() }]);
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
                  <div className="w-full flex space-x-4 px-4 overflow-x-auto max-h-[70vh]">
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

                  {/* Centered Buttons */}
                  <div className="flex justify-center items-center space-x-4 px-4 pt-4">
                    <button
                      onClick={() => setProducts([])}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                    >
                      Clear Products
                    </button>
                    <button
                      onClick={() => alert('Sell Now clicked')}
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
