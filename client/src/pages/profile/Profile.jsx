import React, { useState } from "react";
import { Navbar } from "../Navbar";
import { Eye, Layers, Settings, Pencil } from "lucide-react";

export const Profile = () => {
  const [activeSection, setActiveSection] = useState("basic");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Emily",
    gender: "Female",
    email: "emaaa12@gmail.com",
    contact: "9342566775",
    address: "OMR,chennai",
  });

  const activities = [
  { points: 20, text: "Purchase: Wireless Headphones", date: "Friday, Aug 1, 2025, 10:41 AM" },
  { points: 5, text: "Product review: Bluetooth Speaker", date: "Thursday, Jul 31, 2025, 06:27 PM" },
  { points: 10, text: "Referral: Invited a friend", date: "Wednesday, Jul 30, 2025, 09:30 PM" },
  { points: 15, text: "Purchase: Smartwatch", date: "Wednesday, Jul 30, 2025, 02:46 PM" },
  { points: 3, text: "Daily login", date: "Sunday, Jul 27, 2025, 08:33 AM" },
  { points: 5, text: "Product review: Laptop Stand", date: "Sunday, Jul 27, 2025, 08:17 AM" },
  { points: 10, text: "First order completed", date: "Saturday, Jul 26, 2025, 08:27 AM" },
  { points: 5, text: "Used points for discount", date: "Friday, Jul 25, 2025, 01:59 PM" },
  { points: 2, text: "Wishlist item bought", date: "Friday, Jul 25, 2025, 08:46 AM" },
  { points: 4, text: "Shared product on social", date: "Thursday, Jul 24, 2025, 09:03 AM" },
];

  const handleEditToggle = () => setIsEditing(!isEditing);
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saved:", formData);
  };

  return (
    <div className="h-screen w-screen bg-[#e5f0db] overflow-hidden relative">
      <div className="flex flex-col w-full">
        <Navbar />
      </div>

      {/* Sidebar */}
      <div className="absolute top-32 left-10 flex flex-col items-start gap-8 text-xl text-gray-800 z-10">
        <div className="flex flex-col items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY_UP9cSEjFLqwEVNDqWPhu9lUPLkzzaVpJw&s"
            alt="User"
            className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
          />
          <h1 className="text-lg font-bold mt-3">{formData.name}</h1>
          <p className="text-gray-600 text-sm">{formData.email}</p>
        </div>

        <div className="flex flex-col gap-6">
          <div
            className={`flex items-center gap-3 cursor-pointer hover:text-green-600 ${
              activeSection === "basic" ? "text-green-700 font-semibold" : ""
            }`}
            onClick={() => setActiveSection("basic")}
          >
            <Eye className="w-6 h-6" />
            <span>Basic Info</span>
          </div>
          <div
            className={`flex items-center gap-3 cursor-pointer hover:text-green-600 ${
              activeSection === "points" ? "text-green-700 font-semibold" : ""
            }`}
            onClick={() => setActiveSection("points")}
          >
            <Layers className="w-6 h-6" />
            <span>Points</span>
          </div>
          <div
            className={`flex items-center gap-3 cursor-pointer hover:text-green-600 ${
              activeSection === "settings" ? "text-green-700 font-semibold" : ""
            }`}
            onClick={() => setActiveSection("settings")}
          >
            <Settings className="w-6 h-6" />
            <span>Settings</span>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="fixed inset-0 flex items-center justify-center z-20 pointer-events-none">
        <div className="w-[600px] h-[500px] bg-white rounded-2xl shadow-2xl p-8 overflow-auto relative pointer-events-auto">
          {activeSection === "basic" && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Basic Info</h2>
                {!isEditing && (
                  <button
                    onClick={handleEditToggle}
                    className="text-green-600 flex items-center gap-1 text-base hover:text-green-800 transition-colors duration-200"
                  >
                    <Pencil size={18} />
                    Edit
                  </button>
                )}
              </div>
              <div className="space-y-5 text-base">
                {[
                  "name",
                  "gender",
                  "email",
                  "contact",
                  "address",
                ].map((field) => (
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
                      <p className="font-medium text-lg text-gray-800">
                        {formData[field] || "—"}
                      </p>
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
            </>
          )}

          {activeSection === "points" && (
            <div>
              <div className="text-center mb-6">
                <p className="text-green-600 text-2xl font-semibold">You currently have 120 points 🎉</p>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">My Point Activity</h2>
              <ul className="divide-y divide-gray-200">
  {activities.map((activity, index) => (
    <li key={index} className="flex justify-between items-start py-4">
      <div className="flex items-start gap-2">
        <span className="text-yellow-500 text-lg">🌕</span>
        <span>
          <span className="font-medium text-green-600">+{activity.points}</span>{" "}
          {activity.text}
        </span>
      </div>
      <span className="text-sm text-gray-500 whitespace-nowrap">{activity.date}</span>
    </li>
  ))}
</ul>

            </div>
          )}

          {activeSection === "settings" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Settings</h2>
              <ul className="text-base text-gray-700 divide-y divide-gray-200">
      
  {[
    "Permissions",
    "Privacy Policy",
    "Security & Access",
    "Notifications",
    "History",
    "Change Password",
    "App Appearance",
    "Delete Account",
    "Log Out",
  ].map((item, idx) => (
    <li
      key={item}
      className={`py-2 px-1 cursor-pointer hover:text-green-700 transition ${
        item === "Delete Account" || item === "Log Out"
          ? "text-red-600 font-semibold hover:text-red-700"
          : ""
      }`}
    >
      {item}
    </li>
  ))}
</ul>


            </div>
          )}
        </div>
      </div>
    </div>
  );
};
