import React, { useState } from "react";
import { Navbar } from '../pages/Navbar'
import { Eye, Layers, Settings, Pencil, X } from 'lucide-react';

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
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/30 transition-opacity duration-300 animate-fade-in">
          <div className="w-[95vw] max-w-lg bg-white rounded-2xl shadow-2xl p-8 relative transform transition-all duration-300 animate-scale-in">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Basic Info</h2>
                {!isEditing && (
                  <button
                    onClick={handleEditToggle}
                    className="text-green-600 flex items-center gap-1 text-base hover:text-green-800 transition-colors duration-200 ml-6"
                  >
                    <Pencil size={18} />
                    Edit
                  </button>
                )}
              </div>
              <button
                onClick={() => setShowInfo(false)}
                className="text-gray-400 hover:text-red-500 transition-colors duration-200 text-xl"
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-5 text-base">
              {['name', 'gender', 'email', 'contact', 'address'].map((field) => (
                <div key={field}>
                  <p className="text-gray-500 capitalize font-semibold mb-1">{field}</p>
                  {isEditing ? (
                    <input
                      type="text"
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-green-200 transition-all duration-200 shadow-sm"
                      placeholder={`Enter ${field}`}
                    />
                  ) : (
                    <p className="font-medium text-lg text-gray-800">{formData[field] || '—'}</p>
                  )}
                </div>
              ))}
            </div>

            {isEditing && (
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg shadow hover:from-green-600 hover:to-green-800 text-base font-semibold transition-all duration-200"
                >
                  Save
                </button>
              </div>
            )}
          </div>
          <style>{`
            @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
            .animate-fade-in { animation: fade-in 0.3s ease; }
            @keyframes scale-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
            .animate-scale-in { animation: scale-in 0.35s cubic-bezier(0.4,0,0.2,1); }
          `}</style>
        </div>
      )}
    </div>
  );
};
