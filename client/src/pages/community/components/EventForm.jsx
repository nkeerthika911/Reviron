import React, { useState } from "react";

export const EventForm = () => {
  const [showForm, setShowForm] = useState(false);

  const styles = {
    pageContainer: {
      position: "relative",
      minHeight: "100vh",
      backgroundColor: "#f3f4f6",
    },
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 10,
    },
    formContainer: {
      background: "#fff",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
      width: "100%",
      maxWidth: "672px", // matches Tailwind's max-w-2xl
    },
    formGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "15px",
    },
    inputField: {
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      width: "100%",
    },
    textareaField: {
      width: "100%",
      padding: "10px",
      marginTop: "15px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      resize: "vertical",
    },
    buttonRow: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "20px",
    },
    cancelBtn: {
      padding: "10px 20px",
      background: "#e53e3e",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
    },
    submitBtn: {
      padding: "10px 20px",
      background: "#38a169",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
    },
    plusButton: {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      backgroundColor: "#38a169",
      color: "#fff",
      fontSize: "32px",
      width: "56px",
      height: "56px",
      border: "none",
      borderRadius: "50%",
      boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
      cursor: "pointer",
      zIndex: 20,
    },
  };

  return (
    <div style={styles.pageContainer}>
      {showForm && (
        <div style={styles.overlay}>
          <div style={styles.formContainer}>
            <div style={styles.formGrid}>
              <input
                type="text"
                placeholder="Product Name"
                style={styles.inputField}
              />
              <input
                type="text"
                placeholder="Category"
                style={styles.inputField}
              />
              <input
                type="number"
                placeholder="Price"
                style={styles.inputField}
              />
              <input type="date" style={styles.inputField} />
            </div>
            <textarea
              placeholder="Description"
              style={styles.textareaField}
              rows="4"
            />
            <input
              type="file"
              style={{ ...styles.inputField, marginTop: "15px" }}
            />
            <div style={styles.buttonRow}>
              <button
                onClick={() => setShowForm(false)}
                style={styles.cancelBtn}
              >
                Cancel
              </button>
              <button style={styles.submitBtn}>Submit Product</button>
            </div>
          </div>
        </div>
      )}

      <button onClick={() => setShowForm(true)} style={styles.plusButton}>
        +
      </button>
    </div>
  );
};
