import React, { useState } from "react";
import { Navbar } from '../pages/Navbar'
import { Eye, Layers, Settings, Pencil } from 'lucide-react';

export const Profile = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Emily',
    gender: 'Female',
    email: 'emaaa12@gmail.com',
    contact: '9342566775',
    address: 'OMR,chennai',
  });

  const handleEditToggle = () => setIsEditing(!isEditing);
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = () => {
    setIsEditing(false);
    console.log('Saved:', formData);
  };

  return (
    <div className="h-screen w-screen bg-[#e5f0db] overflow-hidden flex relative">
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
            <h1 className="text-3xl font-bold mt-4">{formData.name.toUpperCase()}</h1>
            <p className="text-gray-700 text-lg">{formData.email}</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-6 px-10 py-10 text-xl text-gray-800">
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

      {/* Centered Basic Info Panel */}
      {showInfo && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/20">
          <div className="w-[500px] bg-white rounded-xl shadow-xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Basic Info</h2>
              {!isEditing && (
                <button
                  onClick={handleEditToggle}
                  className="text-blue-500 flex items-center gap-1 text-base"
                >
                  <Pencil size={18} />
                  Edit
                </button>
              )}
            </div>

            <div className="space-y-5 text-base">
              {['name', 'gender', 'email', 'contact', 'address'].map((field) => (
                <div key={field}>
                  <p className="text-gray-600 capitalize font-semibold">{field}</p>
                  {isEditing ? (
                    <input
                      type="text"
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 text-base"
                      placeholder={`Enter ${field}`}
                    />
                  ) : (
                    <p className="font-medium text-lg">{formData[field] || '—'}</p>
                  )}
                </div>
              ))}
            </div>

            {isEditing && (
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleSave}
                  className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-base"
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
