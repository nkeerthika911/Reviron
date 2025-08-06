import React, { useState } from "react";
import { FaThumbsUp, FaCommentAlt, FaShareAlt } from "react-icons/fa";

const initialEvents = [
  {
    id: 1,
    title: "Waves of Change",
    image: "/beach-cleanup.png",
    organizer: "Elisabeth May",
    organizerPic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
    timeAgo: "6h ago",
    description:
      '"Waves of Change" is a community-driven beach cleanup event dedicated to restoring our shoreline and inspiring a cleaner, greener future.',
    joinedCount: 150,
    datetime: "12/08/2025 11:09 AM",
    likes: 24,
    likedByUser: false,
    comments: [
      { user: "John Doe", text: "Great initiative! Count me in." },
      { user: "Jane Smith", text: "This is exactly what our community needs." }
    ],
    showComments: false,
  },
  {
    id: 2,
    title: "EcoClean Movement",
    image: "/ewaste-awareness.png",
    organizer: "Dr Ronald Jackson",
    organizerPic: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces",
    timeAgo: "8h ago",
    description:
      '"EcoClean Movement" is a united community initiative focused on cleaning and preserving our environment for a greener, healthier future.',
    joinedCount: 280,
    datetime: "12/08/2025 1:09 PM",
    likes: 45,
    likedByUser: false,
    comments: [
      { user: "Mike Johnson", text: "Amazing work! Let's make this happen." }
    ],
    showComments: false,
  },
];

export const EventCard = () => {
  const [events, setEvents] = useState(initialEvents);
  const [commentInputs, setCommentInputs] = useState({});

  const handleLike = (eventId) => {
    setEvents(events =>
      events.map(event =>
        event.id === eventId
          ? {
              ...event,
              likes: event.likedByUser ? event.likes - 1 : event.likes + 1,
              likedByUser: !event.likedByUser,
            }
          : event
      )
    );
  };

  const toggleComments = (eventId) => {
    setEvents(events =>
      events.map(event =>
        event.id === eventId
          ? { ...event, showComments: !event.showComments }
          : event
      )
    );
  };

  const handleCommentInput = (eventId, value) => {
    setCommentInputs(inputs => ({ ...inputs, [eventId]: value }));
  };

  const addComment = (eventId) => {
    const text = (commentInputs[eventId] || '').trim();
    if (!text) return;
    setEvents(events =>
      events.map(event =>
        event.id === eventId
          ? {
              ...event,
              comments: [...event.comments, { user: "You", text }],
            }
          : event
      )
    );
    setCommentInputs(inputs => ({ ...inputs, [eventId]: '' }));
  };

  return (
    <div className="flex flex-col gap-6 py-6">
      {events.map((event) => (
        <div
          key={event.id}
          className="bg-white rounded-xl shadow-lg flex w-full min-h-[240px] p-6 items-stretch"
        >
          {/* Left Image */}
          <img
            src="https://kanpurploggers.org/wp-content/uploads/2025/01/post2.jpg"
            alt={event.title}
            className="w-48 h-full object-cover rounded-lg mr-4"
          />

          {/* Main Content */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold">{event.title}</h2>
              <div className="flex items-center text-gray-600 text-sm my-2">
                <img
                  src={event.organizerPic || "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=150&h=150&fit=crop&crop=faces"}
                  alt={event.organizer}
                  className="w-8 h-8 rounded-full mr-2 object-cover border border-gray-200"
                />
                {event.organizer} &nbsp;·&nbsp; {event.timeAgo}
              </div>
              <p className="text-gray-700 text-sm mb-3">{event.description}</p>
            </div>

            {/* Interaction Icons with Hover Effects */}
            <div className="flex items-center gap-6 text-gray-500 mb-2">
              <div
                className={`flex items-center gap-2 cursor-pointer group select-none`}
                onClick={() => handleLike(event.id)}
              >
                <FaThumbsUp
                  className={`w-5 h-5 transition-transform duration-150 group-hover:scale-110 ${
                    event.likedByUser ? 'text-blue-500' : 'group-hover:text-[#81AD87]'
                  }`}
                />
                <span className={`text-sm ${event.likedByUser ? 'text-blue-500' : 'group-hover:text-[#81AD87]'}`}>{event.likes}</span>
              </div>
              <div
                className="flex items-center gap-2 cursor-pointer group select-none"
                onClick={() => toggleComments(event.id)}
              >
                <FaCommentAlt className="w-5 h-5 transition-transform duration-150 group-hover:scale-110 group-hover:text-[#81AD87]" />
                <span className="text-sm group-hover:text-[#81AD87]">{event.comments.length}</span>
              </div>
              <div
                className="flex items-center gap-2 cursor-pointer group select-none"
                onClick={() => window.alert('Share functionality coming soon!')}
              >
                <FaShareAlt className="w-5 h-5 transition-transform duration-150 group-hover:scale-110 group-hover:text-[#81AD87]" />
                <span className="text-sm group-hover:text-[#81AD87]">Share</span>
              </div>
            </div>

            {/* Comments Section */}
            {event.showComments && (
              <div className="border-t border-gray-200 pt-3 mt-2">
                <div className="space-y-3 mb-3">
                  {event.comments.map((comment, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm text-gray-800">{comment.user}</span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.text}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    value={commentInputs[event.id] || ''}
                    onChange={e => handleCommentInput(event.id, e.target.value)}
                    className="flex-1 border border-gray-300 rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    onKeyDown={e => e.key === 'Enter' && addComment(event.id)}
                  />
                  <button
                    onClick={() => addComment(event.id)}
                    disabled={!(commentInputs[event.id] && commentInputs[event.id].trim())}
                    className={`px-4 py-2 rounded-full text-white text-sm font-medium transition ${
                      commentInputs[event.id] && commentInputs[event.id].trim()
                        ? 'bg-green-500 hover:bg-[#81AD87]'
                        : 'bg-gray-300 cursor-not-allowed'
                    }`}
                  >
                    Post
                  </button>
                </div>
              </div>
            )}

            <div className="text-xs text-gray-500">
              <div>{event.datetime.split(" ")[0]}</div>
              <div>{event.datetime.split(" ")[1]}</div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="flex flex-col justify-between items-end ml-6">
            <button className="border border-gray-400 px-5 py-1 rounded-full hover:bg-[#81AD87] text-gray-800 whitespace-nowrap transition-colors duration-200">

              Join
            </button>
            <div className="flex items-center mt-2">
                
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