import React, { useState } from 'react';

export const Payment = () => {
  const [selectedMode, setSelectedMode] = useState('Recommended');
  const [selectedOption, setSelectedOption] = useState('');

  // Theme colors
  const primaryColor = '#92e092';
  const accentColor = '#92e092';
  const backgroundColor = '#f5f7fa';
  const greenBg = '#f0fdf4';
  const greenText = '#15803d';
  const borderColor = `${primaryColor}22`;
  const lightPrimary = `${primaryColor}11`;

  const paymentModes = [
    { label: 'Recommended', options: ['Scan & Pay'] },
    { label: 'Cash On Delivery (Cash/UPI)', options: ['Cash', 'UPI'] },
    { label: 'UPI (Pay via any App)', options: ['UPI'] },
    { label: 'Credit/Debit Card', options: ['Credit Card', 'Debit Card'] },
    { label: 'Pay Later', options: ['Pay Later'] },
    { label: 'Wallets', options: ['Wallet'] },
    { label: 'EMI', options: ['EMI'] },
    { label: 'Net Banking', options: ['Net Banking'] },
  ];

  const priceDetails = {
    totalMRP: 1899,
    discount: 1178,
    fee: 20,
  };
  const totalAmount = priceDetails.totalMRP - priceDetails.discount + priceDetails.fee;

  const handlePayNow = () => {
    alert(`Payment successful with ${selectedOption}!`);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '2rem',
      marginTop: '2rem',
      background: backgroundColor,
      minHeight: '100vh',
      padding: '2rem 0'
    }}>
      {/* Payment Modes & Options */}
      <div style={{
        flex: 2,
        background: '#fff',
        padding: '2.5rem 2rem',
        borderRadius: '18px',
        boxShadow: '0 6px 32px rgba(34,205,105,0.10), 0 1.5px 6px rgba(0,0,0,0.04)',
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        maxWidth: 600
      }}>
        {/* Offer Section */}
        <div style={{
          marginBottom: '1.5rem',
          background: greenBg,
          border: `1px solid ${borderColor}`,
          borderRadius: '10px',
          padding: '1.2rem 1rem',
          boxShadow: '0 2px 8px #e0fbe6'
        }}>
          <strong style={{ color: greenText, fontSize: '1.1rem' }}>Bank Offer</strong>
          <div style={{ fontSize: '15px', marginTop: '6px', color: '#166534' }}>
            10% Instant Discount on Canara Bank Credit Card on a min spend of ₹3,500. TCA
          </div>
          <button style={{
            color: accentColor,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            marginTop: '6px',
            fontWeight: 'bold'
          }}>
            Show More
          </button>
        </div>

        <h3 style={{
          color: primaryColor,
          fontWeight: 700,
          marginBottom: '1rem',
          fontSize: '1.2rem'
        }}>Choose Payment Mode</h3>

        <div style={{ display: 'flex', minHeight: 320 }}>
          {/* Payment Mode List */}
          <div style={{
            minWidth: '220px',
            borderRight: `1px solid ${borderColor}`,
            paddingRight: '1rem'
          }}>
            {paymentModes.map(mode => (
              <div
                key={mode.label}
                style={{
                  padding: '14px 12px',
                  cursor: 'pointer',
                  background: selectedMode === mode.label ? lightPrimary : '#fff',
                  borderLeft: selectedMode === mode.label ? `3px solid ${primaryColor}` : '3px solid transparent',
                  fontWeight: selectedMode === mode.label ? 'bold' : 'normal',
                  color: selectedMode === mode.label ? primaryColor : '#333',
                  borderRadius: '6px 0 0 6px',
                  marginBottom: '2px',
                  transition: 'background 0.2s'
                }}
                onClick={() => {
                  setSelectedMode(mode.label);
                  setSelectedOption('');
                }}
              >
                {mode.label}
              </div>
            ))}
          </div>

          {/* Payment Options */}
          <div style={{
            flex: 1,
            padding: '18px 24px',
            background: '#fafbfc',
            borderRadius: '0 10px 10px 0',
            minHeight: 320
          }}>
            <div style={{
              fontWeight: 'bold',
              marginBottom: '16px',
              color: primaryColor,
              fontSize: '1.1rem'
            }}>
              {selectedMode} Payment Options
            </div>

            {paymentModes.find(m => m.label === selectedMode)?.options.map(option => (
              <div key={option} style={{ marginBottom: '18px', display: 'flex', alignItems: 'center' }}>
                <input
                  type="radio"
                  name="paymentOption"
                  checked={selectedOption === option}
                  onChange={() => setSelectedOption(option)}
                  style={{
                    marginRight: '10px',
                    accentColor: primaryColor,
                    width: 18,
                    height: 18
                  }}
                />
                <span style={{ color: '#333', fontSize: '1rem' }}>{option}</span>
                {option === 'Scan & Pay' && (
                  <span style={{ marginLeft: '18px' }}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
                      alt="QR"
                      width={32}
                    />
                  </span>
                )}
              </div>
            ))}

            <button
              style={{
                marginTop: '32px',
                background: selectedOption ? primaryColor : '#ccc',
                color: '#fff',
                padding: '12px 32px',
                border: 'none',
                borderRadius: '6px',
                cursor: selectedOption ? 'pointer' : 'not-allowed',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                boxShadow: selectedOption ? '0 2px 8px #e0fbe6' : 'none',
                transition: 'background 0.2s'
              }}
              disabled={!selectedOption}
              onClick={handlePayNow}
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>

      {/* Price Details */}
      <div style={{
        flex: 1,
        background: '#fff',
        padding: '2.5rem 2rem',
        borderRadius: '18px',
        boxShadow: '0 6px 32px rgba(34,205,105,0.10), 0 1.5px 6px rgba(0,0,0,0.04)',
        minWidth: '320px',
        height: 'fit-content',
        alignSelf: 'flex-start'
      }}>
        <h3 style={{
          color: primaryColor,
          fontWeight: 700,
          marginBottom: '1.2rem'
        }}>PRICE DETAILS (1 Item)</h3>
        <div style={{ marginBottom: '10px' }}>
          Total MRP: <span style={{ color: primaryColor }}>₹{priceDetails.totalMRP}</span>
        </div>
        <div style={{ marginBottom: '10px' }}>
          Discount on MRP: <span style={{ color: 'green' }}>-₹{priceDetails.discount}</span>
        </div>
        <div style={{ marginBottom: '10px' }}>
          Platform Fee: <span style={{ color: accentColor, cursor: 'pointer' }}>Know More</span> ₹{priceDetails.fee}
        </div>
        <hr style={{ margin: '18px 0' }} />
        <div>
          <strong style={{ color: primaryColor, fontSize: '1.1rem' }}>Total Amount: ₹{totalAmount}</strong>
        </div>
      </div>
    </div>
  );
};