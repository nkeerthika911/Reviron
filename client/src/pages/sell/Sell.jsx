import React, { useState } from 'react';
import { Navbar } from '../Navbar';
import { SellForm } from './components/SellForm';

export const Sell = () => {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);

  const toggleForm = () => setShowForm(!showForm);

  const handleAddProduct = (productData) => {
    setProducts([...products, { ...productData, id: Date.now() }]);
    setShowForm(false);
  };

  const handleRemove = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div className="h-screen w-screen bg-gray-50 flex flex-col relative">
      <Navbar />

      <div className="flex p-4 w-full h-full overflow-hidden">
        {showForm && (
          <SellForm
            onCancel={toggleForm}
            onSubmit={handleAddProduct}
          />
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
