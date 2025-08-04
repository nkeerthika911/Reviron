import React from 'react';
import { Navbar } from '../Navbar';
import { EventForm } from './components/EventForm';
import { EventCard } from './components/EventCard';
import { Sidebar } from './components/Sidebar';

export const Community = () => {
  return (
    <>
      <Navbar />

      {/* Page Layout */}
      <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
        {/* Fixed Sidebar */}
        <Sidebar />

        {/* Scrollable Content */}
        <div className="ml-[18rem] flex-1 overflow-y-auto bg-gray-100 px-4 pt-6">
          {/* Post Input Box */}
          <div className="p-4 shadow rounded-lg w-full max-w-lg mx-auto bg-white mb-6">
            <div className="flex items-center mb-4">
              <img
                src="/path/to/your/profile-image.jpg"
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <input
                type="text"
                placeholder="Start a post"
                className="ml-4 w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none"
              />
            </div>

            <div className="flex justify-around">
              <div className="flex items-center text-green-600 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 10.5V7c0-1.1-.9-2-2-2H5C3.9 5 3 5.9 3 7v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-3.5l4 4v-11l-4 4z" />
                </svg>
                Video
              </div>
              <div className="flex items-center text-blue-600 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zm-2 0H5V5h14v14zm-4-8l-3 4-2-3-3 4h10z" />
                </svg>
                Photo
              </div>
            </div>
          </div>

          {/* Scrollable Event Cards */}
          <EventCard />

          {/* Optional floating form */}
          <EventForm />
        </div>
      </div>
    </>
  );
};