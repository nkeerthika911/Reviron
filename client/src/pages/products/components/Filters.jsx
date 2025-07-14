import React, { useState } from "react";

export const Filters = () => {
  const minLimit = 100;
  const maxLimit = 10000;

  const [min, setMin] = useState(minLimit);
  const [max, setMax] = useState(6000);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), max - 100);
    setMin(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), min + 100);
    setMax(value);
  };

  const handleClear = () => {
    setMin(minLimit);
    setMax(maxLimit);
  };

  const minPercent = ((min - minLimit) / (maxLimit - minLimit)) * 100;
  const maxPercent = ((max - minLimit) / (maxLimit - minLimit)) * 100;

  const formatAmount = (amount) => `₹${amount.toLocaleString("en-IN")}`;

  const styles = {
    container: {
      background: "#ffffff",
      borderRadius: "6px",
      padding: "0px 20px 20px 20px",
      fontFamily: "'Poppins', sans-serif",
      boxShadow: "0 0 0 1px #dcdcdc",
      maxWidth: "380px",
      width: "100%",
      boxSizing: "border-box",
      marginLeft: "70px",
      marginTop: "60px",
      minHeight: "720px",
    },
    headerBox: {
      padding: "24px 20px 16px 20px",
      marginLeft: "-20px",
      marginRight: "-20px",
      borderBottom: "1px solid #dcdcdc",
      marginBottom: "20px",
    },
    heading: {
      fontSize: "25px",
      fontWeight: "600",
      color: "#6F9674",
    },
    clearBtn: {
      fontSize: "12px",
      background: "none",
      border: "none",
      color: "#999",
      cursor: "pointer",
      fontWeight: "500",
    },
    priceHeaderRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "8px",
    },
    label: {
      fontSize: "14px",
      fontWeight: "500",
      color: "#6F9674",
    },
    sliderWrapper: {
      position: "relative",
      width: "100%",
      height: "36px",
      marginBottom: "8px",
      padding: "0 5px",
      display: "flex",
      alignItems: "center",
    },
    track: {
      position: "absolute",
      top: "50%",
      left: 0,
      right: 0,
      height: "10px",
      background: "#ddd",
      borderRadius: "6px",
      zIndex: 1,
      transform: "translateY(-50%)",
    },
    selectedValues: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "12px",
      fontSize: "14px",
      fontWeight: "500",
      color: "#6F9674",
    },
    priceInputs: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "8px",
      marginTop: "16px",
    },
    inputBox: {
      width: "45%",
      padding: "6px 10px",
      fontSize: "14px",
      borderRadius: "6px",
      border: "1px solid #6F9674",
      textAlign: "center",
      color: "#6F9674",
      fontWeight: "600",
      background: "#f8f8f8",
    },
    toText: {
      fontSize: "14px",
      fontWeight: "500",
      color: "#949494",
    },
  };

  const rangeStyle = {
    position: "absolute",
    top: "50%",
    height: "10px",
    background: "#6F9674",
    borderRadius: "6px",
    left: `${minPercent}%`,
    width: `${maxPercent - minPercent}%`,
    zIndex: 2,
    transform: "translateY(-50%)",
  };

  return (
    <>
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 36px;
          position: absolute;
          background: none;
          margin: 0;
          pointer-events: none;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 20px;
          width: 20px;
          background: #fff;
          border: 2px solid #6F9674;
          border-radius: 50%;
          cursor: pointer;
          pointer-events: auto;
          margin-top: -5px;
        }

        input[type="range"]::-moz-range-thumb {
          height: 20px;
          width: 20px;
          background: #fff;
          border: 2px solid #6F9674;
          border-radius: 50%;
          cursor: pointer;
          pointer-events: auto;
        }

        input[type="range"]::-moz-range-track {
          height: 10px;
          background: transparent;
        }
      `}
      </style>

      <div style={styles.container}>
        <div style={styles.headerBox}>
          <div style={styles.heading}>Filters</div>
        </div>

        <div style={styles.priceHeaderRow}>
          <div style={styles.label}>PRICE</div>
          <button style={styles.clearBtn} onClick={handleClear}>
            X CLEAR
          </button>
        </div>

        <div style={styles.sliderWrapper}>
          <div style={styles.track}></div>
          <div style={rangeStyle}></div>

          <input
            type="range"
            min={minLimit}
            max={maxLimit}
            value={min}
            onChange={handleMinChange}
            style={{ zIndex: 3 }}
          />
          <input
            type="range"
            min={minLimit}
            max={maxLimit}
            value={max}
            onChange={handleMaxChange}
            style={{ zIndex: 4 }}
          />
        </div>

        <div style={styles.selectedValues}>
          <span>{formatAmount(minLimit)}</span>
          <span>{formatAmount(maxLimit)}</span>
        </div>

        <div style={styles.priceInputs}>
          <input type="text" value={formatAmount(min)} readOnly style={styles.inputBox} />
          <span style={styles.toText}>to</span>
          <input type="text" value={formatAmount(max)} readOnly style={styles.inputBox} />
        </div>
      </div>
    </>
  );
};