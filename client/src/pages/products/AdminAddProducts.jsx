import React, { useState } from 'react';
import { AdminNavbar } from './components/AdminNavbar';

export const AdminAddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    brand: '',
    condition: 'Working',
    categories: '',
    images: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProduct((prev) => ({
      ...prev,
      images: files
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting product:', product);
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      <AdminNavbar />

      {/* Scrollable Content Below Navbar */}
      <div className="flex-1 overflow-y-auto pt-8 pb-8 flex justify-center items-start">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <h2 className="md:col-span-2 text-2xl font-bold mb-2 text-green-700">
            Admin - Add New Product
          </h2>

          <div>
            <label className="block mb-2 font-medium">Product Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
              placeholder="Enter product name"
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Brand</label>
            <input
              type="text"
              name="brand"
              value={product.brand}
              onChange={handleChange}
              placeholder="Enter brand name"
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              rows="4"
              placeholder="Enter product description"
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
          </div>

          <div>
            <label className="block mb-2 font-medium">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Quantity (In Stock)</label>
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              placeholder="Enter quantity"
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Condition</label>
            <select
              name="condition"
              value={product.condition}
              onChange={handleChange}
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="Working">Working</option>
              <option value="Not Working">Not Working</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">Categories (comma separated)</label>
            <input
              type="text"
              name="categories"
              value={product.categories}
              onChange={handleChange}
              placeholder="Eg: Electronics, Mobile"
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">Product Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full p-2 border border-green-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="md:col-span-2 flex justify-end gap-4">
            <button
              type="reset"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-6 py-2 rounded-lg shadow-sm transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#81AD87] hover:bg-[#92BE98] shadow-sm transition text-white font-medium px-6 py-2 rounded-lg shadow-sm transition"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
