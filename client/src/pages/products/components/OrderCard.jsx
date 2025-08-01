import React, { useState } from "react";
import { LuTruck } from "react-icons/lu";
import { BadgeCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrderCard = () => {
  const [driverAssigned, setDriverAssigned] = useState(false);
  const navigate = useNavigate();

  const handleViewItems = () => {
    navigate("/ViewItems");
  };

  const handleAssignClick = () => {
    setDriverAssigned(!driverAssigned);
    console.log("Driver assignment toggled:", !driverAssigned);
  };

  return (
   <div className="flex flex-wrap md:flex-nowrap items-center justify-between bg-white rounded-xl shadow-md p-6 max-w-7xl
 w-full mx-auto mb-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.01] overflow-x-hidden">

      {/* Image */}
      <div className="flex-shrink-0 mb-4 md:mb-0">
        <img
          src="https://www.genevaenvironmentnetwork.org/wp-content/uploads/2020/09/ewaste-aspect-ratio-2000-1200-1024x614.jpg"
          alt="E-waste"
          className="w-70 h-40 object-cover rounded-xl"
        />
      </div>

      {/* Info Section */}
      <div className="flex-grow max-w-[320px] flex flex-col space-y-2 px-4">
        <div className="flex text-lg font-bold text-gray-800">
          <span>Slot ID:</span>
          <span className="ml-2">XXX1</span>
        </div>
        <div className="flex text-md font-semibold text-gray-600">
          <span>Customer:</span>
          <span className="ml-2">Raju</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div
            className={`w-3 h-3 rounded-full ${
              driverAssigned ? "bg-green-500 animate-pulse" : "bg-red-500"
            }`}
          />
          <span
            className={`text-sm font-medium ${
              driverAssigned ? "text-green-600" : "text-red-600"
            }`}
          >
            {driverAssigned ? "Driver Assigned" : "Driver Not Assigned"}
          </span>
        </div>
      </div>

      {/* Button + Dates */}
      <div className="flex flex-col justify-center items-end space-y-3 ml-4">
        <div className="flex space-x-4 mb-2">
          
          
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleViewItems}
            className="bg-[#81AD87] hover:bg-[#72997A] text-white text-sm font-semibold px-5 py-2 rounded-xl shadow-md transition hover:scale-105"
          >
            View Items
          </button>
          <button
            onClick={handleAssignClick}
            className={`text-white text-sm font-semibold px-5 py-2 rounded-xl shadow-md transition hover:scale-105 ${
              driverAssigned
                ? "bg-red-500 hover:bg-red-600"
                : "bg-[#81AD87] hover:bg-[#72997A]"
            }`}
          >
            {driverAssigned ? "Unassign" : "Assign"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
