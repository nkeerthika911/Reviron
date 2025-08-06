   import React, { useState, useRef } from "react";
import { Navbar } from "../Navbar";
import { EventForm } from "./components/EventForm";
import { EventCard } from "./components/EventCard";
import { Sidebar } from "./components/Sidebar";

export const Community = () => {
  const [postText, setPostText] = useState("");
  const [videoPreview, setVideoPreview] = useState(null);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Waves of Change",
      image: "/beach-cleanup.png",
      organizer: "Elisabeth May",
      timeAgo: "6h ago",
      description:
        '"Waves of Change" is a community-driven beach cleanup event dedicated to restoring our shoreline and inspiring a cleaner, greener future.',
      joinedCount: 150,
      datetime: "12/08/2025 11:09 AM",
    },
    {
      id: 2,
      title: "EcoClean Movement",
      image: "/ewaste-awareness.png",
      organizer: "Dr Ronald Jackson",
      timeAgo: "8h ago",
      description:
        '"EcoClean Movement" is a united community initiative focused on cleaning and preserving our environment for a greener, healthier future.',
      joinedCount: 280,
      datetime: "12/08/2025 1:09 PM",
    },
  ]);

  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const handlePost = () => {
    if (postText.trim() !== "" || videoPreview) {
      console.log("Post submitted:", {
        text: postText,
        video: videoPreview,
      });
      setPostText("");
      setVideoPreview(null);
    }
  };

  const handleImageClick = () => imageInputRef.current.click();
  const handleVideoClick = () => videoInputRef.current.click();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected image:", file);
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const videoURL = URL.createObjectURL(file);
      setVideoPreview(videoURL);
    }
  };

  const handleAddEvent = (newEvent) => {
    setEvents((prevEvents) => [newEvent, ...prevEvents]);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-72 bg-white border-r border-gray-200 overflow-y-auto">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-5 flex flex-col bg-gray-100">
          {/* Static Post Input Box */}
          <div className="px-9 pt-6 pb-4 bg-gray-100">
            <div className="max-w-6xl mx-auto w-full bg-white shadow rounded-xl p-7">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                />
                <input
                  type="text"
                  placeholder="Start a post"
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none"
                />
                <button
                  onClick={handlePost}
                  disabled={postText.trim() === "" && !videoPreview}
                  className={`px-4 py-2 rounded-full text-white font-semibold transition ${
                    postText.trim() !== "" || videoPreview
                      ? " bg-[#81AD87]"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Post
                </button>
              </div>

              {videoPreview && (
                <div className="mt-2">
                  <video
                    src={videoPreview}
                    controls
                    className="w-full max-h-64 rounded-lg border"
                  />
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                ref={imageInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
              <input
                type="file"
                accept="video/*"
                ref={videoInputRef}
                onChange={handleVideoChange}
                className="hidden"
              />

              <div className="flex justify-around mt-4">
                <div
                  className="flex items-center text-green-600 cursor-pointer"
                  onClick={handleVideoClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17 10.5V7c0-1.1-.9-2-2-2H5C3.9 5 3 5.9 3 7v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-3.5l4 4v-11l-4 4z" />
                  </svg>
                  Video
                </div>
                <div
                  className="flex items-center text-blue-600 cursor-pointer"
                  onClick={handleImageClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zm-2 0H5V5h14v14zm-4-8l-3 4-2-3-3 4h10z" />
                  </svg>
                  Photo
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable Event Cards Section */}
          <div className="flex-1 overflow-y-auto px-9">
            <EventCard events={events} />
            
            {/* Floating Event Form */}
            <EventForm onAddEvent={handleAddEvent} />
          </div>
        </div>
      </div>
    </div>
  );
};