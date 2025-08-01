import React, { useState } from "react";
import { Navbar } from "../Navbar";
import { Eye, Wallet, Settings, Pencil, ShoppingBag } from "lucide-react";
import userIcon from "../../assets/user-icon.jpg"

export const Profile = ({ user }) => {
  const [activeSection, setActiveSection] = useState("basic");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Ashwin",
    gender: "Male",
    email: "ashwin12@gmail.com",
    contact: "9342566775",
    address: "",
  });

  const activities = [
    { points: 20, text: "Purchase: Wireless Headphones", date: "Friday, Aug 1, 2025, 10:41 AM" },
    { points: 5, text: "Product review: Bluetooth Speaker", date: "Thursday, Jul 31, 2025, 06:27 PM" },
    { points: 10, text: "Referral: Invited a friend", date: "Wednesday, Jul 30, 2025, 09:30 PM" },
    { points: 15, text: "Purchase: Smartwatch", date: "Wednesday, Jul 30, 2025, 02:46 PM" },
    { points: 3, text: "Daily login", date: "Sunday, Jul 27, 2025, 08:33 AM" },
  ];

  const handleEditToggle = () => setIsEditing(!isEditing);
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSave = () => {
    setIsEditing(false);
    console.log("Saved:", formData);
  };

  const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    console.log("Selected file:", file);
    // Upload logic goes here
  }
};

  return (
    <div className="min-h-screen bg-[#e8f5e1]">
      {/* Navbar */}
      <Navbar />

      <div className="flex gap-8 p-8 pt-6 h-[90vh]">
        {/* Left Sidebar */}
        <div className="w-72 bg-white rounded-2xl shadow-lg p-6 h-full">
          {/* Profile Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-4 w-20 h-20">
              <img
                src={userIcon}
                alt="User"
                className="w-full h-full rounded-full object-cover"
              />

              {/* Hidden file input */}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e)}
                id="imageUpload"
                className="hidden"
              />

              {/* Plus Button */}
              <label
                htmlFor="imageUpload"
                className="absolute bottom-0 right-0 w-6 h-6 bg-[#81AD87] text-white rounded-full flex items-center justify-center text-xs cursor-pointer border-2 border-white"
                title="Upload new image"
              >
                +
              </label>
            </div>

            <h2 className="text-lg font-bold text-gray-800 mb-1">ASHWIN</h2>
            <p className="text-sm text-gray-600">{formData.email}</p>
          </div>

          {/* Navigation Menu */}
          <div className="space-y-2">
            <div
              onClick={() => setActiveSection("basic")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${activeSection === "basic"
                ? "bg-gray-900 text-white"
                : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <Eye size={18} />
              <span>Basic Info</span>
            </div>
            <div
              onClick={() => setActiveSection("orders")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${activeSection === "orders"
                ? "bg-gray-900 text-white"
                : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <ShoppingBag size={18} />
              <span>My Orders</span>
            </div>

            <div
              onClick={() => setActiveSection("points")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${activeSection === "points"
                ? "bg-gray-900 text-white"
                : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <Wallet size={18} />
              <span>Points</span>
            </div>
            <div
              onClick={() => setActiveSection("settings")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${activeSection === "settings"
                ? "bg-gray-900 text-white"
                : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <Settings size={18} />
              <span>Settings</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg p-8">
          {activeSection === "basic" && (
            <>
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Basic Info</h1>
                {!isEditing && (
                  <button
                    onClick={handleEditToggle}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <Pencil size={18} />
                    <span>Edit</span>
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {/* Name */}
                <div className="flex items-center">
                  <div className="w-24 text-gray-700 font-medium">Name</div>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="flex-1 ml-16 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="ml-16 text-gray-800">{formData.name}</div>
                  )}
                </div>

                {/* Gender */}
                <div className="flex items-center">
                  <div className="w-24 text-gray-700 font-medium">Gender</div>
                  {isEditing ? (
                    <input
                      type="text"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="flex-1 ml-16 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="ml-16 text-gray-800">{formData.gender}</div>
                  )}
                </div>

                {/* Email */}
                <div className="flex items-center">
                  <div className="w-24 text-gray-700 font-medium">E-mail</div>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="flex-1 ml-16 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="ml-16 text-gray-800">{formData.email}</div>
                  )}
                </div>

                {/* Contact */}
                <div className="flex items-center">
                  <div className="w-24 text-gray-700 font-medium">Contact</div>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      className="flex-1 ml-16 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="ml-16 text-gray-800">{formData.contact}</div>
                  )}
                </div>

                {/* Address */}
                <div className="flex items-start">
                  <div className="w-24 text-gray-700 font-medium pt-2">Address</div>
                  {isEditing ? (
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows="3"
                      className="flex-1 ml-16 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                      placeholder="Enter your address"
                    />
                  ) : (
                    <div className="ml-16 text-gray-800 pt-2">
                      {formData.address || "—"}
                    </div>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    Save
                  </button>
                </div>
              )}
            </>
          )}

          {activeSection === "points" && (
            <div>
              <div className="text-center mb-8">
                <p className="text-green-600 text-2xl font-semibold">
                  You currently have 120 points 🎉
                </p>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-6">My Point Activity</h1>
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={index} className="flex justify-between items-start py-4 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-500 text-lg">🌕</span>
                      <div>
                        <span className="font-medium text-green-600">
                          +{activity.points}
                        </span>{" "}
                        <span className="text-gray-800">{activity.text}</span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                      {activity.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "settings" && (
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>
              <div className="space-y-4">
                {[
                  "Permissions",
                  "Privacy Policy",
                  "Security & Access",
                  "Notifications",
                  "Change Password",
                  "App Appearance",
                  "Delete Account",
                  "Log Out",
                ].map((item, idx) => (
                  <div
                    key={item}
                    className={`py-3 px-2 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors ${item === "Delete Account" || item === "Log Out"
                      ? "text-red-600 font-medium hover:bg-red-50"
                      : "text-gray-700"
                      }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};