import React, { useState } from 'react';
import axios from 'axios';
import { AdminNavbar } from './products/components/AdminNavbar';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const categoryArray = product.categories
        .split(',')
        .map((cat) => cat.trim())
        .filter((cat) => cat !== '');

      const payload = {
        name: product.name,
        description: product.description,
        price: parseFloat(product.price),
        quantity: parseInt(product.quantity),
        brand: product.brand,
        condition: product.condition,
        category: categoryArray
      };

      const res = await axios.post('http://localhost:5000/api/products/post', payload);
      const productId = res.data.data.data._id;

      const formData = new FormData();
      product.images.forEach((image) => {
        formData.append('productPhotos', image);
      });

      await axios.post(
        `http://localhost:5000/api/products/uploadphotos/${productId}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );

      alert('Product and images added successfully!');

      setProduct({
        name: '',
        description: '',
        price: '',
        quantity: '',
        brand: '',
        condition: 'Working',
        categories: '',
        images: []
      });
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <AdminNavbar />

      <div className="flex-1 overflow-y-auto py-10 flex justify-center items-start">
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 p-8 rounded shadow-sm w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <h2 className="md:col-span-2 text-2xl font-semibold text-green-700 text-center mb-2">
            Admin - Add New Product
          </h2>

          <div>
            <label className="block mb-1 font-medium">Product Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
              placeholder="Enter product name"
              className="w-full p-2 border border-green-200 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Brand</label>
            <input
              type="text"
              name="brand"
              value={product.brand}
              onChange={handleChange}
              placeholder="Enter brand name"
              className="w-full p-2 border border-green-200 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Enter product description"
              className="w-full h-28 resize-none p-2 border border-green-200 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 font-medium">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="w-full p-2 border border-green-200 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Quantity (In Stock)</label>
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              placeholder="Enter quantity"
              className="w-full p-2 border border-green-200 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Condition</label>
            <select
              name="condition"
              value={product.condition}
              onChange={handleChange}
              className="w-full p-2 border border-green-200 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="Working">Working</option>
              <option value="Not Working">Not Working</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Categories (comma separated)</label>
            <input
              type="text"
              name="categories"
              value={product.categories}
              onChange={handleChange}
              placeholder="Eg: Electronics, Mobile"
              className="w-full p-2 border border-green-200 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">Product Images</label>
            <input
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.gif,.webp"
              onChange={handleImageChange}
              className="block w-full p-2 border border-green-200 rounded bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="md:col-span-2 flex justify-end gap-4">
            <button
              type="reset"
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-5 py-2 rounded shadow-sm transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#81AD87] hover:bg-[#92BE98] text-white font-medium px-5 py-2 rounded shadow-sm transition"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
