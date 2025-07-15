import React from "react";

export const CartProduct = () => {
  const productContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    marginBottom: "20px",
    backgroundColor: "#fff",
  };

  const imageStyle = {
    width: "100px",
    height: "100px",
    borderRadius: "8px",
    objectFit: "cover",
  };

  const tagStyle = {
    padding: "3px 8px",
    fontSize: "12px",
    borderRadius: "12px",
    backgroundColor: "#e0e0e0",
    marginRight: "6px",
  };

  return (
    <div style={productContainerStyle}>
      <img
        src="https://via.placeholder.com/100" // Replace with actual image
        alt="Fan motor"
        style={imageStyle}
      />
      <div>
        <h3 style={{ margin: "0 0 10px", color: "#2e7d32" }}>Fan motor</h3>
        <p style={{ margin: "0 0 10px", fontWeight: "bold" }}>
          ₹150.00{" "}
          <span style={{ fontWeight: "normal", fontSize: "12px" }}>
            (Incl. of GST)
          </span>
        </p>
        <div>
          <span style={{ ...tagStyle, backgroundColor: "#f3e5f5" }}>
            🧾 Usha
          </span>
          <span style={{ ...tagStyle, backgroundColor: "#e8f5e9" }}>
            ✅ Working
          </span>
          <span style={{ ...tagStyle, backgroundColor: "#e3f2fd" }}>
            📦 In stock: 500
          </span>
        </div>
      </div>
    </div>
  );
};
