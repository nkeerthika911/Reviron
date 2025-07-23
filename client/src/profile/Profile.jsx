import React, { useState } from 'react';
import { Navbar } from '../pages/Navbar';
import { Eye, Layers, Settings, Pencil } from 'lucide-react';

export const Profile = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Ashwin',
    gender: 'Male',
    email: 'ashwin12@gmail.com',
    contact: '9342566775',
    address: '',
  });

  const handleEditToggle = () => setIsEditing(!isEditing);
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = () => {
    setIsEditing(false);
    // Add save logic here (API call etc.)
    console.log('Saved:', formData);
  };

  return (
    <div className="h-screen w-screen bg-[#e5f0db] overflow-hidden flex">
      {/* Navbar */}
      <div className="flex flex-col w-full">
        <Navbar />

        {/* Header */}
        <div className="bg-[#c7e5b1] flex items-start px-10 py-10">
          <div className="flex flex-col items-start">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY_UP9cSEjFLqwEVNDqWPhu9lUPLkzzaVpJw&s"
              alt="User"
              className="w-32 h-32 rounded-full border-4 border-white shadow-md"
            />
            <h1 className="text-2xl font-bold mt-4">{formData.name.toUpperCase()}</h1>
            <p className="text-gray-700">{formData.email}</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-6 px-10 py-10 text-lg text-gray-800">
          <div
            className="flex items-center gap-3 cursor-pointer hover:text-green-600"
            onClick={() => setShowInfo(true)}
          >
            <Eye className="w-6 h-6" />
            <span>Basic Info</span>
          </div>

          <div className="flex items-center gap-3 cursor-pointer hover:text-green-600">
            <Layers className="w-6 h-6" />
            <span>Points</span>
          </div>

          <div className="flex items-center gap-3 cursor-pointer hover:text-green-600">
            <Settings className="w-6 h-6" />
            <span>Settings</span>
          </div>
        </div>
      </div>

      {/* Side Panel */}
      {showInfo && (
        <div className="fixed top-0 right-0 w-[350px] h-full bg-white shadow-lg p-6 overflow-y-auto z-50 transition-transform duration-300 ease-in-out">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Basic Info</h2>
            {!isEditing && (
              <button
                onClick={handleEditToggle}
                className="text-blue-500 flex items-center gap-1"
              >
                <Pencil size={16} />
                Edit
              </button>
            )}
          </div>

          <div className="space-y-4 text-sm">
            {/* Form Fields */}
            {['name', 'gender', 'email', 'contact', 'address'].map((field) => (
              <div key={field}>
                <p className="text-gray-500 capitalize">{field}</p>
                {isEditing ? (
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full border rounded px-2 py-1"
                    placeholder={`Enter ${field}`}
                  />
                ) : (
                  <p className="font-medium">{formData[field] || '—'}</p>
                )}
              </div>
            ))}
          </div>

          {isEditing && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};