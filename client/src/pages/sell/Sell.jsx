import React, { useState } from 'react';
import { Navbar } from '../Navbar';

export const Sell = () => {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    location: '',
    category: '',
    condition: '',
    description: '',
    image: null,
    imageUrl: ''
  });

  const toggleForm = () => setShowForm(!showForm);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files && files[0]) {
      setForm({
        ...form,
        image: files[0],
        imageUrl: URL.createObjectURL(files[0])
      });
    } else {
      setForm({
        ...form,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, location, category, condition, description, imageUrl } = form;
    if (!name || !location || !category || !condition || !description || !imageUrl) {
      alert("Please fill out all fields.");
      return;
    }

    setProducts([
      ...products,
      { ...form, id: Date.now() }
    ]);
    setForm({
      name: '',
      location: '',
      category: '',
      condition: '',
      description: '',
      image: null,
      imageUrl: ''
    });
    setShowForm(false);
  };

  const handleRemove = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div className="h-screen w-screen bg-gray-50 flex flex-col relative">
      <Navbar />
      <div className="flex p-4 w-full h-full overflow-hidden">
        <div className="w-full h-full flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden transform transition-all duration-700 ease-out hover:scale-105 hover:shadow-xl group"
                  style={{
                    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                    animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  {product.imageUrl && (
                    <div className="relative overflow-hidden">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="font-bold text-lg text-[#6F9674] mb-1 group-hover:text-[#73B87C] transition-colors duration-300">
                      {product.name}
                    </div>
                    <div className="text-gray-600 text-sm mb-1">
                      <b>Location:</b> {product.location}
                    </div>
                    <div className="text-gray-700 text-sm mb-2 max-h-20 overflow-auto">
                      {product.description}
                    </div>
                    <button
                      onClick={() => handleRemove(product.id)}
                      className="text-red-500 text-sm flex items-center gap-2 hover:text-red-700 transition-all duration-300 hover:bg-red-50 p-2 rounded-lg -ml-2"
                    >
                      <img
                        src="https://www.iconpacks.net/icons/1/free-trash-icon-347-thumb.png"
                        alt="Delete"
                        className="w-5 h-5 filter-red"
                      />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {showForm && (
          <div className="flex justify-center w-full">
            <div className="bg-white border border-gray-300 w-[40vw] h-full p-6 overflow-y-auto relative transition-all duration-500 ease-out">
              <h2 className="text-lg font-semibold mb-4">Add New Product</h2>
              <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Product name"
                  required
                  className="p-3 rounded border border-gray-300"
                />
                <div className="flex space-x-4">
                  <input
                    type="text"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="Category"
                    required
                    className="p-3 rounded border border-gray-300 w-1/2"
                  />
                  <select
                    name="condition"
                    value={form.condition}
                    onChange={handleChange}
                    required
                    className="p-3 rounded border border-gray-300 w-1/2"
                  >
                    <option value="" disabled>Condition</option>
                    <option value="new">New</option>
                    <option value="second">Second</option>
                  </select>
                </div>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Description"
                  required
                  className="p-3 rounded border border-gray-300 h-32 resize-none overflow-auto"
                />

                <textarea
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Pick up Location"
                  required
                  className="p-3 rounded border border-gray-300 h-20 resize-none overflow-auto"
                />

                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  required
                  className="p-3 rounded border border-gray-300"
                />
                {form.imageUrl && (
                  <img
                    src={form.imageUrl}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                )}
                <div className="flex justify-center gap-4 mt-6">
                  <button
                    type="button"
                    onClick={toggleForm}
                    className="bg-[#9E9B9B] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#B0ADAD] shadow-sm transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#81AD87] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#92BE98] shadow-sm transition"
                  >
                    Sell
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {!showForm && (
        <button
          onClick={toggleForm}
          className="fixed bottom-6 right-[110px] bg-[#73B87C] text-white rounded-full px-6 py-3 shadow-lg hover:bg-[#6F9674] transition-all duration-300 transform hover:scale-105"
        >
          Start Selling
        </button>
      )}

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .filter-red {
          filter: invert(16%) sepia(97%) saturate(6380%) hue-rotate(356deg) brightness(91%) contrast(112%);
        }
      `}</style>
    </div>
  );
};
