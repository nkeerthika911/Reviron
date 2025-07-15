import React from "react";

export const OrderSummary = () => {
  const containerStyle = {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "20px",
    width: "100%",
    backgroundColor: "#fff",
  };

  const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  };

  const headerStyle = {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "18px",
  };

  const checkOutBtnStyle = {
    width: "100%",
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "20px",
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>Order Summary</div>
      <div style={{ ...rowStyle, fontWeight: "bold" }}>
        <span>Item Name</span>
        <span>Quantity</span>
        <span>Price</span>
      </div>
      <div style={rowStyle}>
        <span>Fan motor</span>
        <span>100 Items</span>
        <span>₹15000.00</span>
      </div>
      <hr />
      <div style={rowStyle}>
        <span>Subtotal</span>
        <span>₹13,559.32</span>
      </div>
      <div style={rowStyle}>
        <span>GST (10%)</span>
        <span>₹1,440.68</span>
      </div>
      <div style={{ ...rowStyle, fontWeight: "bold" }}>
        <span>Total</span>
        <span>₹15,000.00</span>
      </div>
      <hr />
      <p
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "10px",
          fontSize: "14px",
        }}
      >
        🚚 Estimated Delivery: 3–5 days
      </p>
      <button style={checkOutBtnStyle}>Check out</button>
    </div>
  );
};
