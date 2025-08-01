import React, { useState } from "react";

export const Sidebar = () => {
    const [active, setActive] = useState("All posts");

    const items = ["All posts", "My posts", "All Events", "My Events", "Others"];

    return (
        <div className="flex flex-col w-[18rem] border-r border-gray-200 font-['Poppins']">
            {items.map((item) => (
                <button
                    key={item}
                    onClick={() => setActive(item)}
                    className={`w-full px-4 py-3 font-medium transition-colors
                        ${active === item
                            ? "bg-[#d1d6de] text-white"
                            : "text-[#81ad87] hover:bg-[#d1d6de] hover:text-white"
                        }
                         pl-1 pt-6 pb-6
                          `}
                >
                    {item}
                </button>

            ))}
        </div>
    );
};
