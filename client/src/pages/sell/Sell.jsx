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
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex p-4 w-full h-full overflow-x-hidden overflow-y-auto">
        <div className="w-full flex-1 pr-4">
          <div className="p-4">

            {/* Static Sold Product Preview */}
            {!showForm && (
              <div className="min-h-screen flex flex-col items-start px-8 py-10">

      <h2 className="text-xl font-semibold text-gray-800 mb-4 ml-2">Sold product</h2>

      <div className="bg-white w-full max-w-7xl rounded-xl shadow-md flex flex-row p-4 gap-6 items-center">
        {/* Product Image */}
        <div className="w-[200px] h-[150px] rounded-lg overflow-hidden border-2 border-blue-400">
          <img
            src="https://via.placeholder.com/411x298"
            alt="Sold Product"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-2 gap-x-30 gap-y-6 text-sm text-gray-700">
          <div>
            <span className="font-semibold">Request ID:</span> GGA6758
          </div>
          <div>
            <span className="font-semibold">Date:</span> 01/08/25
          </div>
          <div>
            <span className="font-semibold">Status:</span> Collection Initiated
          </div>
          <div>
            <span className="font-semibold">Employee:</span> Harshana
          </div>
          <div>
            <span className="font-semibold">Product Count:</span> 10
          </div>
        </div>
      </div>
    </div>
            )}

            {/* Dynamic Product Cards */}
            <div className="grid grid-cols-1 gap-4 mt-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-md px-4 py-3 w-full flex flex-col md:flex-row gap-4 items-center md:items-start"
                >
                  {/* Left: Image */}
                  <div className="w-[250px] h-[180px] flex-shrink-0 overflow-hidden rounded-md border border-gray-300">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Right: Details */}
                  <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-2 text-sm text-gray-800">
                    <div><b>Request ID:</b> #{product.id}</div>
                    <div><b>Date:</b> {new Date().toLocaleDateString('en-IN')}</div>
                    <div><b>Product Name:</b> {product.name}</div>
                    <div><b>Category:</b> {product.category}</div>
                    <div><b>Status:</b> Collection Initiated</div>
                    <div><b>Condition:</b> {product.condition}</div>
                    <div><b>Description:</b> {product.description}</div>
                    <div><b>Pick-up Location:</b> {product.location}</div>
                  </div>

                  {/* Remove Button */}
                  <div className="mt-4 w-full flex justify-end md:justify-start">
                    <button
                      onClick={() => handleRemove(product.id)}
                      className="text-red-500 text-sm flex items-center gap-2 hover:text-red-700 transition-all duration-300 hover:bg-red-50 p-2 rounded-lg"
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

        {/* Form Sidebar */}
        {showForm && (
          <div className="z-10 bg-white border-l border-gray-300 w-[40vw] h-full p-6 overflow-y-auto transition-all duration-500 ease-out">
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
                className="p-3 rounded border border-gray-300 h-28 resize-none overflow-auto"
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
                  Add
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Floating + Button */}
      {!showForm && (
        <button
          onClick={toggleForm}
          className="fixed bottom-6 right-6 bg-[#73B87C] text-white rounded-full w-14 h-14 text-3xl shadow-lg transition-all duration-300 hover:bg-[#6F9674] transform hover:scale-110 hover:rotate-90"
        >
          +
        </button>
      )}

      {/* Red Icon Styling */}
      <style jsx>{`
        .filter-red {
          filter: invert(16%) sepia(97%) saturate(6380%) hue-rotate(356deg) brightness(91%) contrast(112%);
        }
      `}</style>
    </div>
  );
};
