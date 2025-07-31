import React, { useState } from 'react';

export const AddProduct = () => {
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
    // You can handle the submit logic here (e.g., send to API)
    console.log('Submitting product:', product);
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <h2 className="text-3xl font-semibold text-[#2f4734] mb-6">Add New Product</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded px-4 py-2 focus:outline-[#81ad87]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Brand</label>
          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded px-4 py-2 focus:outline-[#81ad87]"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            rows="4"
            className="mt-1 block w-full border border-gray-300 rounded px-4 py-2 focus:outline-[#81ad87]"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded px-4 py-2 focus:outline-[#81ad87]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity (In Stock)</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded px-4 py-2 focus:outline-[#81ad87]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Condition</label>
          <select
            name="condition"
            value={product.condition}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded px-4 py-2 focus:outline-[#81ad87]"
          >
            <option value="Working">Working</option>
            <option value="Not Working">Not Working</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Categories (comma separated)</label>
          <input
            type="text"
            name="categories"
            value={product.categories}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded px-4 py-2 focus:outline-[#81ad87]"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Product Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-500"
          />
        </div>

        <div className="md:col-span-2 flex justify-end gap-4">
          <button
            type="reset"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-6 py-2 rounded shadow-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#4f785e] hover:bg-[#3b624b] text-white font-medium px-6 py-2 rounded shadow-sm"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};
