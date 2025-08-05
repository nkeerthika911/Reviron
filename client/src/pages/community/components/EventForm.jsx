import React, { useState } from "react";

export const EventForm = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="relative min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-10">
          <form className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl border border-blue-200 relative">
            {/* X Close Button */}
            <button
              type="button"
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
              onClick={() => setShowForm(false)}
              aria-label="Close"
            >
              &times;
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block font-semibold mb-1">Event Name</label>
                <input
                  type="text"
                  placeholder="Enter your eventname"
                  className="w-full border rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Location</label>
                <input
                  type="text"
                  placeholder="Enter your city"
                  className="w-full border rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Date</label>
                <input
                  type="date"
                  placeholder="YYYY-MM-DD"
                  className="w-full border rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Time</label>
                <input
                  type="time"
                  placeholder="HH:MM"
                  className="w-full border rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-1">Description</label>
              <textarea
                placeholder="Enter Description"
                rows={4}
                className="w-full border rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 resize-none"
              />
            </div>

            <div className="mb-6">
              <label className="block font-semibold mb-1">Upload image</label>
              <input
                type="file"
                className="w-full border rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 bg-white"
              />
            </div>

            {/* ✅ Button Row */}
            <div className="flex justify-center gap-4">
              <button
                type="submit"
                className="bg-[#81AD87] text-white font-semibold rounded-full px-10 py-2 shadow hover:bg-[#6e9974] transition"
              >
                Add Events
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-[#81AD87] text-white font-semibold rounded-full px-10 py-2 shadow hover:bg-[#6e9974] transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Add Button */}
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-6 right-6 bg-[#81AD87] text-white text-3xl w-14 h-14 rounded-full shadow-lg flex items-center justify-center z-20 hover:bg-[#6e9974]"
      >
        +
      </button>
    </div>
  );
};