import React from 'react';
import { BadgeCheck } from "lucide-react";
import { LuCog, LuTruck } from 'react-icons/lu'; // outlined icons

export const OrderCard = () => {
  return (
    <div className="flex items-center justify-between bg-white rounded-xl shadow-md p-4 w-376 h-48">
      
      {/* Thumbnail */}
      <div className="flex-shrink-0">
        <img
          src="https://www.genevaenvironmentnetwork.org/wp-content/uploads/2020/09/ewaste-aspect-ratio-2000-1200-1024x614.jpg"
          alt="E-waste"
          className="w-72 h-48 object-cover rounded-xl"
        />
      </div>

      {/* Middle section */}
     <div className="flex-grow max-w-[320px] flex flex-col space-y-3">
  <div className="flex text-sm text-lg font-bold text-gray-800">
    <span className="text-black text-lg ml-2">Slot ID:</span>
    <span className="text-black text-lg ml-2">XXX1</span>
  </div>
  <div className="flex text-sm text-lg font-bold text-gray-400">
    <span className=" text-lg ml-2">Customer:</span>
    <span className=" text-lg ml-2">Raju</span>
  </div>
  <div className="flex text-sm text-lg font-bold text-gray-400">
    <span className=" text-lg ml-2">Employee:</span>
    <span className=" text-lg ml-2">Praveen</span>
  </div>
</div>

      {/* Date section */}
      
      <div className="flex flex-col items-start space-y-3 text-sm text-gray-700">
  <div className="flex items-center">
    <BadgeCheck className="w-10 h-10 text-black mr-2" />
    <span className=" text-lg ml-2">10 June 2025</span>
  </div>
  <div className="flex items-center">
    <LuTruck className="w-10 h-10 text-black mr-2" />
    <span className=" text-lg ml-2">12 June 2025</span>
  </div>
</div>

      {/* Button */}
     <div className="flex-grow-0">
  <button className="bg-[#81AD87] hover:bg-[#72997A] text-white text-base font-semibold px-6 py-3 rounded-xl shadow-lg transition duration-300">
    View Items
  </button>
</div>
    </div>
  );
};
