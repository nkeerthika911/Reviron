import React, { useState } from 'react';

export const SellForm = ({ onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    name: '',
    location: '',
    category: '',
    condition: '',
    description: '',
    image: null,
    imageUrl: ''
  });

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

    onSubmit(form); // Pass data to parent
    setForm({
      name: '',
      location: '',
      category: '',
      condition: '',
      description: '',
      image: null,
      imageUrl: ''
    });
  };

  return (
    <div className="bg-white border border-gray-300 w-[40vw] h-full p-6 overflow-y-auto relative transition-all duration-500 ease-out">
      <h2 className="text-lg font-semibold mb-4">Sell Product</h2>
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
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="p-3 rounded border border-gray-300 w-1/2"
          >
            <option value="" disabled>Category</option>
            <option value="monitor">Monitor</option>
            <option value="cpu">CPU</option>
            <option value="keyboard">Keyboard</option>
            <option value="mouse">Mouse</option>
            <option value="wires">Wire</option>
            <option value="phone">Phone</option>
            <option value="charger">Charger</option>
          </select>
          <select
            name="condition"
            value={form.condition}
            onChange={handleChange}
            required
            className="p-3 rounded border border-gray-300 w-1/2"
          >
            <option value="" disabled>Condition</option>
            <option value="new">Working</option>
            <option value="second">Not Working</option>
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
          accept=".jpg,.jpeg,.png,.gif,.webp"
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
            onClick={onCancel}
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
  );
};
