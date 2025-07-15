import React from "react";
import { FaThumbsUp, FaCommentAlt, FaShareAlt } from "react-icons/fa";

// Auto-generate current datetime
const formatDateTime = () => {
  const now = new Date();
  const date = now.toLocaleDateString("en-GB"); // e.g. 15/07/2025
  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }); // e.g. 11:09 AM
  return `${date} ${time}`;
};

const events = [
  {
    id: 1,
    title: "Waves of Change",
    image: "/beach-cleanup.png",
    organizer: "Elisabeth May",
    timeAgo: "6h ago",
    description: `"Waves of Change" is a community-driven beach cleanup event dedicated to restoring our shoreline and inspiring a cleaner, greener future.`,
    joinedCount: 150,
  },
  {
    id: 2,
    title: "EcoClean Movement",
    image: "/ewaste-awareness.png",
    organizer: "Dr Ronald Jackson",
    timeAgo: "8h ago",
    description: `"EcoClean Movement" is a united community initiative focused on cleaning and preserving our environment for a greener, healthier future.`,
    joinedCount: 280,
  },
];

export const EventCard = () => {
  return (
    <div className="flex flex-col items-center gap-6 bg-gray-100 py-10 px-4">
      {events.map((event) => (
        <div
          key={event.id}
          className="relative bg-white rounded-xl shadow-lg flex w-[1000px] min-h-[220px] p-6"
        >
          {/* Left Image */}
          <img
            src={event.image}
            alt={event.title}
            className="w-56 h-60 object-cover rounded-lg mr-6"
          />

          {/* Center Text Section */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold">{event.title}</h2>
              <div className="flex items-center text-gray-600 text-sm my-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
                {event.organizer} &nbsp;·&nbsp; {event.timeAgo}
              </div>
              <p className="text-gray-700 text-base mb-4 leading-relaxed">
                {event.description}
              </p>
            </div>

            <div className="flex items-center gap-6 text-gray-500">
              <FaThumbsUp className="w-5 h-5 cursor-pointer" />
              <FaCommentAlt className="w-5 h-5 cursor-pointer" />
              <FaShareAlt className="w-5 h-5 cursor-pointer" />
            </div>
          </div>

          {/* Right Action Section */}
          <div className="flex flex-col items-end justify-start ml-8 min-w-[120px]">
            <button className="border border-gray-400 px-5 py-1.5 rounded-full hover:bg-green-100 font-medium">
              Join
            </button>
            <div className="flex items-center mt-3">
              <img
                src="/profile-group.png"
                alt="Joined"
                className="w-6 h-6 rounded-full mr-1"
              />
              <span className="text-sm text-gray-600">
                +{event.joinedCount} joined
              </span>
            </div>
          </div>

          {/* Bottom Right Date & Time */}
          <div className="absolute bottom-4 right-6 text-xs text-gray-500 text-right">
            {formatDateTime().split(" ")[0]} <br />
            {formatDateTime().split(" ")[1]}
          </div>
        </div>
      ))}
    </div>
  );
};