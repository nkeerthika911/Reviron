import { useState, useEffect, useRef } from "react";

export const SellingRequests = () => {
  const [assignRate, setAssignRate] = useState("");
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [resendVisible, setResendVisible] = useState(false);
  const otpRefs = useRef([]);
  const videoRef = useRef(null);

  const handleStartCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch((err) => {
        console.error("Error accessing camera:", err);
      });
  };

  useEffect(() => {
    let interval;
    if (showOtpModal && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      setResendVisible(true);
    }
    return () => clearInterval(interval);
  }, [showOtpModal, timer]);

  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 3) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleResendOtp = () => {
    setOtp(["", "", "", ""]);
    setTimer(60);
    setResendVisible(false);
  };

  const handleSubmitOtp = () => {
    alert(`OTP Submitted: ${otp.join("")}`);
    setShowOtpModal(false);
  };

  return (
    <div style={styles.card}>
      {/* Right Content Only - Image removed */}
      <div style={{ ...styles.content, alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, justifyContent: 'center' }}>
          <label style={{ ...styles.title, marginBottom: 0, textAlign: 'center', fontSize: '1.5rem' }}>Total Amount :</label>
          <input
            type="number"
            value={assignRate}
            onChange={(e) => setAssignRate(e.target.value)}
            placeholder="0.00"
            style={{
              ...styles.input,
              width: '120px',
              fontSize: '1.1rem',
              fontWeight: 600,
              textAlign: 'center',
              border: '1.5px solid #d1d5db',
              borderRadius: 8,
              padding: '8px 0',
              background: '#f9fafb',
            }}
          />
        </div>
        {/* Buttons */}
        <div style={{ display: "flex", gap: "20px", justifyContent: 'center', width: '100%' }}>
          <button
            style={styles.onlineBtn}
            onClick={() => {
              setShowOtpModal(true);
              setTimer(60);
              setResendVisible(false);
              setOtp(["", "", "", ""]);
            }}
          >
            Accept
          </button>
          <button
            style={styles.cashBtn}
            // Decline button has no functionality
          >
            Decline
          </button>
        </div>
      </div>

      {/* Camera Modal */}
      {showCameraModal && (
        <div style={styles.overlay} onClick={() => setShowCameraModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3>Scan Employee QR</h3>
            <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
              Click below to start your camera and scan the employee's QR code
              to receive cash payment.
            </p>
            <button onClick={handleStartCamera} style={styles.startCameraBtn}>
              Start Camera
            </button>
            <video
              ref={videoRef}
              width="100%"
              height="200"
              style={{ borderRadius: "8px", marginTop: "10px" }}
            />
          </div>
        </div>
      )}

      {/* OTP Modal */}
      {showOtpModal && (
        <div style={styles.overlay} onClick={() => setShowOtpModal(false)}>
          <div style={styles.otpModal} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginBottom: "8px" }}>Mobile Phone Verification</h2>
            <p
              style={{
                color: "#6b7280",
                fontSize: "0.9rem",
                marginBottom: "16px",
              }}
            >
              Enter the 4-digit verification code sent to your phone.
            </p>

            <div style={styles.otpInputs}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(e, i)}
                  ref={(el) => (otpRefs.current[i] = el)}
                  style={styles.otpInput}
                />
              ))}
            </div>

            <button style={styles.verifyBtn} onClick={handleSubmitOtp}>
              Verify Account
            </button>

            <div
              style={{
                fontSize: "0.85rem",
                color: "#6b7280",
                marginTop: "12px",
              }}
            >
              {timer > 0 ? (
                <span>
                  Resend in <b>{timer}s</b>
                </span>
              ) : (
                <button onClick={handleResendOtp} style={styles.resendBtn}>
                  Resend
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
const styles = {
  card: {
    width: "100%",
    maxWidth: "600px",
    minHeight: "160px",
    display: "flex",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  imageContainer: {
    width: "200px",
    height: "160px",
    flexShrink: 0,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderTopLeftRadius: "12px",
    borderBottomLeftRadius: "12px",
  },
  content: {
    flex: 1,
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: 600,
    fontSize: "1.1rem",
    marginBottom: 10,
    color: "#1f2937",
  },
  inputGroup: {
    marginBottom: 12,
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  label: {
    fontWeight: 500,
    fontSize: "0.9rem",
    color: "#374151",
  },
  priceInputBox: {
    display: "flex",
    alignItems: "center",
    border: "2px solid #d1d5db",
    borderRadius: "8px",
    padding: "6px 10px",
    background: "#f9fafb",
  },
  currency: {
    fontSize: "0.9rem",
    color: "#64748b",
    fontWeight: 500,
  },
  input: {
    border: "none",
    background: "transparent",
    outline: "none",
    fontSize: "0.9rem",
    width: "80px",
    marginLeft: "8px",
    fontWeight: 500,
    color: "black",
  },
  cashBtn: {
    backgroundColor: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    padding: "8px 16px",
    fontWeight: "600",
    fontSize: "0.9rem",
    cursor: "pointer",
  },
  onlineBtn: {
    backgroundColor: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    padding: "8px 16px",
    fontWeight: "600",
    fontSize: "0.9rem",
    cursor: "pointer",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  modal: {
    background: "#fff",
    padding: 20,
    borderRadius: "12px",
    width: "90%",
    maxWidth: "400px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
  },
  otpModal: {
    background: "#fff",
    padding: "30px 24px",
    borderRadius: "16px",
    width: "90%",
    maxWidth: "400px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
  },
  otpInputs: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    marginBottom: "20px",
  },
  otpInput: {
    width: "50px",
    height: "50px",
    textAlign: "center",
    fontSize: "1.5rem",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    outline: "none",
    background: "#f9fafb",
    color: "black", // Black text for OTP input
  },
  verifyBtn: {
    backgroundColor: "#6366f1",
    color: "#fff",
    fontWeight: "600",
    fontSize: "1rem",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    width: "100%",
    cursor: "pointer",
    marginBottom: "12px",
  },
  resendBtn: {
    color: "#4f46e5",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontWeight: "500",
  },
  startCameraBtn: {
    margin: "16px 0",
    padding: "10px 20px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
