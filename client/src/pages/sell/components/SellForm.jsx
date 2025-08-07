import React, { useState, useRef } from 'react';

export const SellForm = ({ onSubmit, onCancel }) => {
    const [form, setForm] = useState({
        name: '',
        category: '',
        condition: '',
        quantity: '',
        description: '',
    });

    const fileInputRef = useRef(null);
    const [images, setImages] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const remainingSlots = 4 - images.length;

        if (files.length > remainingSlots) {
            alert(`You can only upload up to 4 images. You have ${images.length} already selected.`);
            return;
        }

        const newImages = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        setImages((prev) => [...prev, ...newImages]);
    };

    const handleRemoveImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, category, condition, quantity, description } = form;

        if (!name || !category || !condition || !quantity || !description || images.length === 0) {
            alert('Please fill out all fields and upload at least one image.');
            return;
        }

        const formattedCondition = condition === 'new' ? 'Working' : 'Not Working';

        const formattedData = {
            name,
            category,
            condition: formattedCondition,
            quantity,
            description,
            images: images.map((img) => img.file),
        };

        onSubmit(formattedData);

        // Reset form
        setForm({
            name: '',
            category: '',
            condition: '',
            quantity: '',
            description: '',
        });
        setImages([]);
        fileInputRef.current.value = null;
    };

    return (
        <div className="bg-white p-6 w-full h-full rounded shadow overflow-y-auto relative transition-all duration-500 ease-out">
            <h2 className="text-lg font-semibold mb-4">Add Product</h2>
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
                        className="p-3 rounded border border-gray-300 w-1/3"
                    />

                    <select
                        name="condition"
                        value={form.condition}
                        onChange={handleChange}
                        required
                        className="p-3 rounded border border-gray-300 w-1/3"
                    >
                        <option value="" disabled>Condition</option>
                        <option value="new">Working</option>
                        <option value="second">Not Working</option>
                    </select>

                    <input
                        type="number"
                        name="quantity"
                        value={form.quantity}
                        onChange={handleChange}
                        placeholder="Quantity"
                        required
                        step="1"
                        min="1"
                        className="p-3 rounded border border-gray-300 w-1/3"
                    />
                </div>
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                    className="p-3 rounded border border-gray-300 h-20 resize-none overflow-auto"
                />

                <input
                    ref={fileInputRef}
                    type="file"
                    name="images"
                    accept=".jpg,.jpeg,.png,.gif,.webp"
                    multiple
                    onChange={handleImageChange}
                    disabled={images.length >= 4}
                    className="p-3 rounded border border-gray-300"
                />

                <p className="text-sm text-gray-600 -mt-2 ml-1">
                    You can upload a maximum of 4 images.
                </p>

                {images.length > 0 && (
                    <p className="text-sm text-gray-600">
                        {images.length} image{images.length > 1 ? 's' : ''} selected
                    </p>
                )}

                <div className="flex flex-wrap gap-3">
                    {images.map((img, index) => (
                        <div key={index} className="relative w-20 h-20">
                            <img
                                src={img.preview}
                                alt={`preview-${index}`}
                                className="w-full h-full object-cover rounded"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-[-8px] right-[-8px] bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                title="Remove"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>

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
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
};
