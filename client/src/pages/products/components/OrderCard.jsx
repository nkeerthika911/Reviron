import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Assign } from "./Assign"; // ✅ adjust path if needed

const OrderCard = () => {
  const [driverAssigned, setDriverAssigned] = useState(false);
  const [showAssignPopup, setShowAssignPopup] = useState(false);
  const navigate = useNavigate();

  const handleViewItems = () => {
    navigate("/ViewItems");
  };

  const handleAssignmentSubmit = (rate, employee) => {
    console.log("Submitted assignment with:", rate, employee);
    setDriverAssigned(true);
    setShowAssignPopup(false);
  };

  return (
    <>
      {/* Card UI */}
      <div className="flex flex-wrap md:flex-nowrap items-center justify-between bg-white rounded-xl shadow-md p-6 max-w-7xl w-full mx-auto mb-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.01] overflow-x-hidden">
        {/* Image */}
        <div className="flex-shrink-0 mb-4 md:mb-0">
          <img
            src="https://www.genevaenvironmentnetwork.org/wp-content/uploads/2020/09/ewaste-aspect-ratio-2000-1200-1024x614.jpg"
            alt="E-waste"
            className="w-70 h-40 object-cover rounded-xl"
          />
        </div>

        {/* Info */}
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

        {/* Buttons */}
        <div className="flex flex-col justify-center items-end space-y-3 ml-4">
          <div className="flex space-x-3">
            <button
              onClick={handleViewItems}
              className="bg-[#81AD87] hover:bg-[#72997A] text-white text-sm font-semibold px-5 py-2 rounded-xl shadow-md transition hover:scale-105"
            >
              View Items
            </button>
            <button
              onClick={() => setShowAssignPopup(true)}
              className="bg-[#81AD87] hover:bg-[#72997A] text-white text-sm font-semibold px-5 py-2 rounded-xl shadow-md transition hover:scale-105"
            >
              Assign
            </button>
          </div>
        </div>
      </div>

      {/* Popup */}
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

// Same popup styles
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
