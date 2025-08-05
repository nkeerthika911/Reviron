import React, { useState } from "react";

export const Sidebar = () => {
  const [active, setActive] = useState("All posts");
  const items = ["All posts", "My posts", "All Events", "My Events", "Others"];

  return (
    <div className="h-full bg-white font-['Poppins'] overflow-y-auto">
      {items.map((item) => (
        <button
          key={item}
          onClick={() => setActive(item)}
                     className={`w-full px-4 py-3 font-medium transition-colors 
            ${active === item
              ? "bg-[#81ad87] text-white"
              : "bg-white-200 hover:bg-white-300 text-white-800 font-medium px-6 py-2  transition"
            }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
};