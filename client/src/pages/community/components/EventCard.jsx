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
];

export const EventCard = () => {
  return (
    <div className="flex flex-col items-center gap-6 bg-gray-100 py-10 px-4">
      {events.map((event) => (
        <div
        key={event.id}
        className="relative bg-white rounded-xl shadow-lg flex w-full min-h-[220px] p-6"
>

          {/* Left Image */}
          <img
            src={event.image}
            alt={event.title}
            className="w-48 h-60 object-cover rounded-lg mr-4"
          />

          {/* Main Content */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold">{event.title}</h2>
              <div className="flex items-center text-gray-600 text-sm my-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
                {event.organizer} &nbsp;·&nbsp; {event.timeAgo}
              </div>
              <p className="text-gray-700 text-sm mb-3">{event.description}</p>
            </div>

            <div className="flex items-center gap-4 text-gray-500 mb-2">
              <FaThumbsUp className="w-5 h-5 cursor-pointer" />
              <FaCommentAlt className="w-5 h-5 cursor-pointer" />
              <FaShareAlt className="w-5 h-5 cursor-pointer" />
            </div>

            <div className="text-xs text-gray-500">
              <div>{event.datetime.split(" ")[0]}</div>
              <div>{event.datetime.split(" ")[1]}</div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="flex flex-col items-end justify-between ml-6">
            <button className="border border-gray-400 px-5 py-1 rounded-full hover:bg-green-100 whitespace-nowrap">
              Join
            </button>
            <div className="flex items-center mt-2">
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
        </div>
      ))}
    </div>
  );
};