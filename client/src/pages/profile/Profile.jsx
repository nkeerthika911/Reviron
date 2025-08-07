import React, { useState, useEffect } from "react";
import { Navbar } from "../Navbar";
import { Info, Wallet, Settings, Pencil, ShoppingBag } from "lucide-react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const Profile = () => {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState("basic");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    email: "",
    contact: "",
    address: "",
  });

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("jwt");
    if (!token) return null;

    try {
      const decoded = jwtDecode(token);
      return decoded.userId || null;
    } catch (err) {
      console.error("Invalid JWT token", err);
      return null;
    }
  };
  const userId = getUserIdFromToken();;

  const activities = [
    { points: 20, text: "Purchase: Wireless Headphones", date: "Friday, Aug 1, 2025, 10:41 AM" },
    { points: 5, text: "Product review: Bluetooth Speaker", date: "Thursday, Jul 31, 2025, 06:27 PM" },
    { points: 10, text: "Referral: Invited a friend", date: "Wednesday, Jul 30, 2025, 09:30 PM" },
    { points: 15, text: "Purchase: Smartwatch", date: "Wednesday, Jul 30, 2025, 02:46 PM" },
    { points: 3, text: "Daily login", date: "Sunday, Jul 27, 2025, 08:33 AM" },
  ];

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/details/${userId}`);
        const fetchedUser = res.data.data.data;
        setUser(fetchedUser);
        setFormData({
          name: fetchedUser.fullName || "",
          gender: (fetchedUser.gender === 'f' ? ('Female') : ('Male')) || "",
          email: fetchedUser.email || "",
          contact: fetchedUser.phone || "",
          address: fetchedUser.Address || "",
        });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleEditToggle = () => setIsEditing(!isEditing);
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async () => {
    setIsEditing(false);
    console.log("Saved:", formData);

    const editProfile = {
      phone: formData.phone,
      address: formData.address
    };

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/api/user/editprofile/${user._id}`,
        editProfile,
        { withCredentials: true }
      );
      console.log("Profile updated:", res.data);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      // Handle upload logic
    }
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#e8f5e1]">
      <Navbar />
      <div className="flex gap-8 p-8 pt-6 h-[90vh]">
        {/* Sidebar */}
        <div className="w-72 bg-white rounded-2xl shadow-lg p-6 h-full">
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-4 w-20 h-20">
              <img
                src={user.profilePhoto}
                alt="User"
                className="w-full h-full rounded-full object-cover"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                id="imageUpload"
                className="hidden"
              />
              <label
                htmlFor="imageUpload"
                className="absolute bottom-0 right-0 w-6 h-6 bg-[#81AD87] text-white rounded-full flex items-center justify-center text-xs cursor-pointer border-2 border-white"
                title="Upload new image"
              >
                +
              </label>
            </div>

            <h2 className="text-lg font-bold text-gray-800 mb-1">{formData.name}</h2>
            <p className="text-sm text-gray-600">{formData.email}</p>
          </div>

          <div className="space-y-2">
            {[
              { id: "basic", label: "Basic Info", icon: <Info size={18} /> },
              { id: "orders", label: "My Orders", icon: <ShoppingBag size={18} /> },
              { id: "points", label: "Points", icon: <Wallet size={18} /> },
              { id: "settings", label: "Settings", icon: <Settings size={18} /> },
            ].map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${activeSection === item.id
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg p-8 overflow-auto">
          {activeSection === "basic" && (
            <>
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Basic Info</h1>
                {!isEditing && (
                  <button
                    onClick={handleEditToggle}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                  >
                    <Pencil size={18} />
                    <span>Edit</span>
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {[
                  { label: "Name", name: "name" },
                  { label: "Gender", name: "gender" },
                  { label: "Email", name: "email", type: "email" },
                  { label: "Phone", name: "contact", type: "tel" },
                ].map(({ label, name, type = "text" }) => (
                  <div key={name} className="flex items-center">
                    <div className="w-24 text-gray-700 font-medium">{label}</div>
                    {isEditing ? (
                      <input
                        type={type}
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        className="flex-1 ml-16 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                      />
                    ) : (
                      <div className="ml-16 text-gray-800">{formData[name]}</div>
                    )}
                  </div>
                ))}

                {/* Address */}
                <div className="flex items-start">
                  <div className="w-24 text-gray-700 font-medium pt-2">Address</div>
                  {isEditing ? (
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows="3"
                      className="flex-1 ml-16 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 resize-none"
                      placeholder="Enter your address"
                    />
                  ) : (
                    <div className="ml-16 text-gray-800 pt-2">{formData.address || "—"}</div>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
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
                  You currently have {user.points} points 🎉
                </p>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-6">My Point Activity</h1>
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={index} className="flex justify-between py-4 border-b border-gray-100">
                    <div className="flex gap-3">
                      <span className="text-yellow-500 text-lg">🌕</span>
                      <div>
                        <span className="font-medium text-green-600">+{activity.points}</span>{" "}
                        <span className="text-gray-800">{activity.text}</span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{activity.date}</span>
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
                ].map((item) => (
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
