import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Assign } from "./Assign"; // ✅ adjust path if needed

const OrderCard = () => {
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
        {/* Info Section */}
        <div className="flex-grow flex flex-col space-y-4 text-gray-800 max-w-5xl w-full">
          {/* Request ID & Date in same line with Date shifted right */}
          <div className="flex flex-wrap gap-y-2 text-base font-semibold">
            <div>
              <span className="font-bold">Request ID:</span>{" "}
              <span className="font-normal">GGA6758</span>
            </div>
            <div className="ml-20.5">
              {" "}
              {/* Date shifted with margin-left */}
              <span className="font-bold">Date:</span>{" "}
              <span className="font-normal">01/08/25</span>
            </div>
          </div>

          {/* Status & Employee */}
          <div className="flex flex-wrap gap-x-10 text-base font-semibold">
            <div>
              <span className="font-bold">Status:</span>{" "}
              <span className="font-normal">Collection Initiated</span>
            </div>
            <div>
              <span className="font-bold">Employee:</span>{" "}
              <span className="font-normal">Harshana</span>
            </div>
          </div>

          {/* Product Count */}
          <div className="flex text-base font-semibold">
            <span className="font-bold">Product Count:</span>{" "}
            <span className="ml-2 font-normal">10</span>
          </div>
        </div>

        {/* Buttons */}
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
          </div>
        </div>
      </div>

      {showAssignPopup && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <Assign onAssignmentSubmit={handleAssignmentSubmit} />
            <button
              onClick={() => setShowAssignPopup(false)}
              style={closeBtnStyle}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// Popup styles
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  position: "relative",
  background: "#fff",
  padding: "20px",
  borderRadius: "16px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  maxWidth: "650px",
  width: "90%",
};

const closeBtnStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  background: "transparent",
  border: "none",
  fontSize: "1.5rem",
  cursor: "pointer",
  color: "#333",
};

export default OrderCard;