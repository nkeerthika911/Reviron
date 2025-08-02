import React from 'react';
import { Navbar } from '../Navbar';
import { EventForm } from './components/EventForm';
import { EventCard } from './components/EventCard';
import { Sidebar } from './components/Sidebar';

export const Community = () => {
  return (
    <>
      <Navbar />

      <div className="flex min-h-screen">
        {/* Fixed Sidebar */}
        <Sidebar />

        {/* Main content pushed to the right of sidebar */}
        <div className="flex flex-col flex-1 ml-[18rem] items-center pt-8 bg-gray-100">
          {/* Post input box */}
          <div className="p-4 shadow rounded-lg w-full max-w-lg bg-white">
            <div className="flex flex-row items-center mb-4">
              <div className="flex-1">
                <img
                  src="/path/to/your/profile-image.jpg"
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="flex-5">
                <input
                  type="text"
                  placeholder="Start a post"
                  className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-row justify-around">
              <div className="flex items-center text-green-600 cursor-pointer">
                {/* Video icon */}
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
              <div className="flex items-center text-blue-600 cursor-pointer">
                {/* Photo icon */}
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

          {/* Events list */}
          <EventCard />

          {/* Floating form */}
          <EventForm />
        </div>
      </div>
    </>
  );
};
