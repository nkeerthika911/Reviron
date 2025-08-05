import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Assign } from "./Assign"; 

export const OrderCard = ({ order }) => {
  const [showAssignPopup, setShowAssignPopup] = useState(false);
  const navigate = useNavigate();

  const handleViewItems = () => {
    navigate("/itemview");
  };

  const handleAssignmentSubmit = (rate, employee) => {
    console.log("Submitted assignment with:", rate, employee);
    setShowAssignPopup(false);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-start justify-between bg-white rounded-xl shadow-md p-6 max-w-7xl w-full mx-auto mb-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.01] overflow-x-hidden">
        <div className="flex-grow flex flex-col space-y-4 text-gray-800 max-w-5xl w-full">
          <div className="flex flex-wrap gap-y-2 text-base font-semibold">
            <div>
              <span className="font-bold">Request ID:</span>{" "}
              <span className="font-normal">{order.requestId}</span>
            </div>
            <div className="ml-20.5">
              <span className="font-bold">Date:</span>{" "}
              <span className="font-normal">{order.date}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-10 text-base font-semibold">
            <div>
              <span className="font-bold">Status:</span>{" "}
              <span className="font-normal">{order.status}</span>
            </div>
            <div>
              <span className="font-bold">Employee:</span>{" "}
              <span className="font-normal">{order.employee}</span>
            </div>
          </div>

          <div className="flex text-base font-semibold">
            <span className="font-bold">Product Count:</span>{" "}
            <span className="ml-2 font-normal">{order.productCount}</span>
          </div>
        </div>

        <div className="flex flex-col justify-center items-end space-y-3 mt-4 md:mt-7 ml-0 md:ml-4 w-full md:w-auto">
          <div className="flex space-x-3 w-full md:w-auto justify-end">
            <button
              onClick={handleViewItems}
              className="w-30 h-9 bg-[#81AD87] hover:bg-[#72997A] text-white text-sm font-semibold px-5 py-2 rounded-xl shadow-md transition hover:scale-105"
            >
              View Items
            </button>
            <button
              onClick={() => setShowAssignPopup(true)}
              className="w-30 h-9 bg-[#81AD87] hover:bg-[#72997A] text-white text-sm font-semibold px-5 py-2 rounded-xl shadow-md transition hover:scale-105"
            >
              Assign
            </button>
            <button
              className="w-30 h-14 bg-[#81AD87] hover:bg-[#72997A] text-white text-sm font-semibold px-5 py-2 rounded-xl shadow-md transition hover:scale-105"
            >
              Collecting Request
            </button>
          </div>
        </div>
      </div>

      {showAssignPopup && (
        <div >
          <div >
            <button
              onClick={() => setShowAssignPopup(false)}
            >
              ✕
            </button>
            <Assign onAssignmentSubmit={handleAssignmentSubmit} />
            
          </div>
        </div>
      )}
    </>
  );
};
