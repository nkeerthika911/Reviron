import React, { useState, useRef } from "react";
import { Navbar } from "../Navbar";
import { EventForm } from "./components/EventForm";
import { EventCard } from "./components/EventCard";
import { Sidebar } from "./components/Sidebar";

export const Community = () => {
  const [postText, setPostText] = useState("");
  const [videoPreview, setVideoPreview] = useState(null);

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

  const handleImageClick = () => {
    imageInputRef.current.click();
  };

  const handleVideoClick = () => {
    videoInputRef.current.click();
  };

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

  return (
    <>
      <Navbar />

      {/* Page Layout */}
      <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
        {/* Fixed Sidebar */}
        <Sidebar />

        {/* Scrollable Content */}
        <div className="ml-[18rem] flex-1 overflow-y-auto bg-gray-100 px-9 pt-6">
          {/* 🌟 Top Post Input Box - centered and narrow */}
          <div className="max-w-2xl mx-auto w-full bg-white shadow rounded-xl p-6 mb-6">
            <div className="flex flex-col gap-3">
              {/* Input Row */}
              <div className="flex items-center">
                <img
                  src="/path/to/your/profile-image.jpg"
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
                <input
                  type="text"
                  placeholder="Start a post"
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  className="ml-4 flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none"
                />
                <button
                  onClick={handlePost}
                  disabled={postText.trim() === "" && !videoPreview}
                  className={`ml-4 px-4 py-2 rounded-full text-white font-semibold transition 
                    ${
                      postText.trim() !== "" || videoPreview
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-gray-400 cursor-not-allowed"
                    }
                  `}
                >
                  Post
                </button>
              </div>

              {/* Video Preview */}
              {videoPreview && (
                <div className="mt-2">
                  <video
                    src={videoPreview}
                    controls
                    className="w-full max-h-64 rounded-lg border"
                  />
                </div>
              )}
            </div>

            {/* Hidden Inputs */}
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

            {/* Action Options */}
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

          {/* Event Cards and Form (Full Width) */}
          <EventCard />
          <EventForm />
        </div>
      </div>
    </>
  );
};
