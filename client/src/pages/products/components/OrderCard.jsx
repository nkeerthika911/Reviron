import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Assign } from "./Assign";
import { SellingRequests } from "./SellingRequest";

export const OrderCard = ({ order }) => {
  const [showSellingRequests, setShowSellingRequests] = useState(false);
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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          margin: "20px 0",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Left Section */}
        <div style={{ flexGrow: 1 }}>
          <div style={{ marginBottom: "10px", fontSize: "16px" }}>
            <strong>Request ID:</strong> {order.requestId}
          </div>
          <div style={{ marginBottom: "10px", fontSize: "16px" }}>
            <strong>Date:</strong> {order.date}
          </div>
          <div style={{ marginBottom: "10px", fontSize: "16px" }}>
            <strong>Status:</strong> {order.status}
          </div>
          <div style={{ marginBottom: "10px", fontSize: "16px" }}>
            <strong>Employee:</strong> {order.employee}
          </div>
          <div style={{ marginBottom: "10px", fontSize: "16px" }}>
            <strong>Product Count:</strong> {order.productCount}
          </div>
        </div>

        {/* Right Button Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            alignItems: "flex-end",
          }}
        >
          <button
            onClick={handleViewItems}
            style={{
              backgroundColor: "#81AD87",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            View Items
          </button>

          <button
            onClick={() => setShowAssignPopup(true)}
            style={{
              backgroundColor: "#81AD87",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Assign
          </button>

          <button
            onClick={() => setShowSellingRequests(true)}
            style={{
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Collecting Requests
          </button>
        </div>
      </div>

      {/* Assign Popup */}
      {showAssignPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowAssignPopup(false)}
              style={{
                position: "absolute",
                top: "-20px",
                right: "-20px",
                background: "red",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                cursor: "pointer",
              }}
            >
              ×
            </button>
            <Assign onAssignmentSubmit={handleAssignmentSubmit} />
          </div>
        </div>
      )}

      {/* Selling Requests Popup */}
      {showSellingRequests && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              position: "relative",
              backgroundColor: "#fff",
              borderRadius: "10px",
              padding: "20px",
            }}
          >
            <button
              onClick={() => setShowSellingRequests(false)}
              style={{
                position: "absolute",
                top: "-20px",
                right: "-20px",
                background: "red",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                cursor: "pointer",
              }}
            >
              ×
            </button>
            <SellingRequests />
          </div>
        </div>
      )}
    </>
  );
};
