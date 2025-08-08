import React, { useState } from 'react';
import {
  ArrowLeft, ShoppingBag, MapPin,
  CreditCard, Smartphone, Wallet,
  Building, Banknote
} from 'lucide-react';

export const Payment = ({ locationState, onBack }) => {
  const navigationData = locationState || {};
  const orderData = navigationData.orderData || {};

  const items = navigationData.items || orderData.items || [{
    id: 1,
    name: 'Sample Product',
    price: 1899,
    originalPrice: 2999,
    quantity: 1,
    image: 'https://cdn-icons-png.flaticon.com/512/263/263142.png'
  }];

  const address = navigationData.address || orderData.address || {
    name: 'John Doe',
    address: '123 Main Street, Downtown Area',
    mobile: '+1 234-567-8900'
  };

  const subtotalFromNav = navigationData.subtotal || 0;
  const discountFromNav = navigationData.discount || 0;
  const totalAmountFromNav = navigationData.totalAmount || 0;

  const [selectedMode, setSelectedMode] = useState('UPI (Pay via any App)');
  const [selectedOption, setSelectedOption] = useState('');

  const primaryColor = '#81AD87';
  const backgroundColor = '#e1ebe2';
  const borderColor = `${primaryColor}22`;
  const lightPrimary = `${primaryColor}11`;

  const paymentModes = [
    { label: 'Cash On Delivery (Cash/UPI)', icon: <Banknote className="w-5 h-5" />, options: ['Cash', 'UPI on Delivery'] },
    { label: 'UPI (Pay via any App)', icon: <Smartphone className="w-5 h-5" />, options: ['UPI'] },
    { label: 'Credit/Debit Card', icon: <CreditCard className="w-5 h-5" />, options: ['Credit Card', 'Debit Card'] },
    { label: 'Wallets', icon: <Wallet className="w-5 h-5" />, options: ['PhonePe', 'Google Pay', 'Paytm'] },
    { label: 'Net Banking', icon: <Building className="w-5 h-5" />, options: ['SBI', 'HDFC', 'ICICI', 'Other Banks'] },
  ];

  const subtotal = subtotalFromNav || items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = discountFromNav;
  const platformFee = 20;
  const deliveryFee = 0;
  const finalAmount = subtotal + platformFee + deliveryFee;
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handlePayNow = () => {
    const paymentData = {
      amount: finalAmount,
      paymentMethod: selectedOption,
      items,
      address,
      billing: {
        subtotal,
        discount,
        platformFee,
        deliveryFee,
        finalAmount
      }
    };
    alert(`Payment of ₹${finalAmount} initiated with ${selectedOption}!`);
    console.log('Payment Data:', paymentData);
    console.log('Navigation Data Received:', navigationData);
  };

  const qrImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2ZmZiIvPjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2NjYiPlFSIENvZGU8L3RleHQ+PC9zdmc+";

  return (
    <div style={{ background: backgroundColor, minHeight: '100vh', padding: '1rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          background: '#fff',
          padding: '1.5rem 2rem',
          borderRadius: '18px 18px 0 0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          marginBottom: '0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={onBack}
              style={{
                background: 'none',
                border: 'none',
                color: primaryColor,
                cursor: 'pointer',
                padding: '0.5rem',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 style={{ color: primaryColor, fontWeight: 700, fontSize: '1.8rem', margin: 0 }}>
                Secure Payment
              </h1>
              <p style={{ color: '#666', margin: '0.5rem 0 0 0', fontSize: '0.95rem' }}>
                Complete your purchase securely
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {/* Payment Method Area */}
          <div style={{
            flex: '2',
            minWidth: '500px',
            background: '#fff',
            padding: '2rem',
            borderRadius: '0 0 18px 18px',
            boxShadow: '0 6px 32px rgba(34,205,105,0.10), 0 1.5px 6px rgba(0,0,0,0.04)'
          }}>
            {/* Payment Mode Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <CreditCard style={{ color: primaryColor }} className="w-5 h-5" />
              <h3 style={{ color: primaryColor, fontWeight: 700, margin: 0, fontSize: '1.3rem' }}>
                Choose Payment Method
              </h3>
            </div>

            {/* Payment Method Box */}
            <div style={{
              display: 'flex',
              minHeight: '400px',
              border: `1px solid ${borderColor}`,
              borderRadius: '12px',
              overflow: 'hidden'
            }}>
              {/* Sidebar Payment Modes */}
              <div style={{
                minWidth: '280px',
                borderRight: `1px solid ${borderColor}`,
                background: '#fafbfc'
              }}>
                {paymentModes.map(mode => (
                  <div
                    key={mode.label}
                    style={{
                      padding: '1rem 1.25rem',
                      cursor: 'pointer',
                      background: selectedMode === mode.label ? lightPrimary : 'transparent',
                      borderLeft: selectedMode === mode.label ? `4px solid ${primaryColor}` : '4px solid transparent',
                      fontWeight: selectedMode === mode.label ? '600' : '500',
                      color: selectedMode === mode.label ? primaryColor : '#444',
                      borderBottom: `1px solid ${borderColor}`,
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}
                    onClick={() => {
                      setSelectedMode(mode.label);
                      setSelectedOption('');
                    }}
                  >
                    <span style={{ color: selectedMode === mode.label ? primaryColor : '#666' }}>
                      {mode.icon}
                    </span>
                    <span style={{ fontSize: '0.95rem' }}>{mode.label}</span>
                  </div>
                ))}
              </div>

              {/* Dynamic Payment Option Box */}
              <div style={{ flex: 1, padding: '2rem', background: '#fff' }}>
                <div style={{
                  fontWeight: '600',
                  marginBottom: '1.5rem',
                  color: primaryColor,
                  fontSize: '1.1rem'
                }}>
                  {selectedMode}
                </div>

                {/* Render Options Based on Selected Mode */}
                {selectedMode === 'UPI (Pay via any App)' && (
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '1.5rem',
                        padding: '0.75rem',
                        border: `2px solid ${selectedOption === 'UPI' ? primaryColor : '#e0e0e0'}`,
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'border-color 0.2s'
                      }}
                      onClick={() => setSelectedOption('UPI')}
                    >
                      <input
                        type="radio"
                        name="paymentOption"
                        checked={selectedOption === 'UPI'}
                        onChange={() => setSelectedOption('UPI')}
                        style={{
                          marginRight: '12px',
                          accentColor: primaryColor,
                          width: 18,
                          height: 18
                        }}
                      />
                      <span style={{ fontSize: '1rem', color: '#333', fontWeight: '500' }}>
                        Pay with UPI QR Code
                      </span>
                    </div>

                    {selectedOption === 'UPI' && (
                      <div style={{
                        textAlign: 'center',
                        padding: '1.5rem',
                        background: '#f8fffe',
                        border: `1px solid ${borderColor}`,
                        borderRadius: '12px'
                      }}>
                        <img
                          src={qrImage}
                          alt="UPI QR Code"
                          style={{
                            width: '180px',
                            height: '180px',
                            border: `2px solid ${borderColor}`,
                            borderRadius: '8px'
                          }}
                        />
                        <p style={{
                          marginTop: '1rem',
                          color: '#666',
                          fontSize: '0.9rem'
                        }}>
                          Scan with any UPI app to pay ₹{finalAmount}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {selectedMode === 'Cash On Delivery (Cash/UPI)' && (
                  <div>
                    {paymentModes.find(m => m.label === selectedMode)?.options.map(option => (
                      <div
                        key={option}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '1rem',
                          padding: '0.75rem',
                          border: `2px solid ${selectedOption === option ? primaryColor : '#e0e0e0'}`,
                          borderRadius: '8px',
                          cursor: 'pointer',
                          transition: 'border-color 0.2s'
                        }}
                        onClick={() => setSelectedOption(option)}
                      >
                        <input
                          type="radio"
                          name="paymentOption"
                          checked={selectedOption === option}
                          onChange={() => setSelectedOption(option)}
                          style={{
                            marginRight: '12px',
                            accentColor: primaryColor,
                            width: 18,
                            height: 18
                          }}
                        />
                        <span style={{ fontSize: '1rem', color: '#333', fontWeight: '500' }}>
                          {option}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {selectedMode !== 'UPI (Pay via any App)' &&
                  selectedMode !== 'Cash On Delivery (Cash/UPI)' && (
                    <div style={{
                      textAlign: 'center',
                      padding: '3rem 1rem',
                      color: '#888',
                      fontSize: '1rem'
                    }}>
                      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚧</div>
                      <p>This payment method is under development.</p>
                      <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
                        Please choose Cash on Delivery or UPI for now.
                      </p>
                    </div>
                  )}
              </div>
            </div>

            {/* Pay Now Button */}
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <button
                style={{
                  background: selectedOption
                    ? `linear-gradient(135deg, ${primaryColor} 0%, #6b9c73 100%)`
                    : '#ccc',
                  color: '#fff',
                  padding: '1rem 3rem',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: selectedOption ? 'pointer' : 'not-allowed',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                  boxShadow: selectedOption ? `0 4px 16px ${primaryColor}40` : 'none',
                  transition: 'all 0.3s ease',
                  minWidth: '200px'
                }}
                disabled={!selectedOption}
                onClick={handlePayNow}
              >
                Pay ₹{finalAmount}
              </button>
            </div>
          </div>

          {/* Order Summary Area */}
          <OrderSummary
            items={items}
            address={address}
            subtotal={subtotal}
            discount={discount}
            deliveryFee={deliveryFee}
            platformFee={platformFee}
            finalAmount={finalAmount}
            primaryColor={primaryColor}
            borderColor={borderColor}
          />
        </div>
      </div>
    </div>
  );
};

// Consider extracting <OrderSummary /> into a separate component file if large
const OrderSummary = ({ items, address, subtotal, discount, deliveryFee, platformFee, finalAmount, primaryColor, borderColor }) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={{
      flex: '1',
      minWidth: '350px',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      {/* Order Items */}
      <div style={{
        background: '#fff',
        padding: '2rem',
        borderRadius: '18px',
        boxShadow: '0 6px 32px rgba(34,205,105,0.10), 0 1.5px 6px rgba(0,0,0,0.04)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1.5rem'
        }}>
          <ShoppingBag style={{ color: primaryColor }} className="w-5 h-5" />
          <h3 style={{
            color: primaryColor,
            fontWeight: 700,
            margin: 0,
            fontSize: '1.2rem'
          }}>Order Items ({totalItems})</h3>
        </div>

        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
          {items.map(item => (
            <div key={item.id} style={{
              display: 'flex',
              gap: '1rem',
              marginBottom: '1rem',
              padding: '0.75rem',
              background: '#fafbfc',
              borderRadius: '8px'
            }}>
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: '50px',
                  height: '50px',
                  objectFit: 'cover',
                  borderRadius: '6px'
                }}
              />
              <div style={{ flex: 1 }}>
                <h4 style={{
                  margin: '0 0 0.25rem 0',
                  fontSize: '0.9rem',
                  color: '#333'
                }}>{item.name}</h4>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.85rem'
                }}>
                  <span style={{ color: primaryColor, fontWeight: '600' }}>₹{item.price}</span>
                  {item.originalPrice && item.originalPrice > item.price && (
                    <span style={{ color: '#888', textDecoration: 'line-through' }}>₹{item.originalPrice}</span>
                  )}
                  <span style={{ color: '#888' }}>Qty: {item.quantity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Address */}
      <div style={{
        background: '#fff',
        padding: '1.5rem',
        borderRadius: '18px',
        boxShadow: '0 6px 32px rgba(34,205,105,0.10), 0 1.5px 6px rgba(0,0,0,0.04)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <MapPin style={{ color: primaryColor }} className="w-4 h-4" />
          <h4 style={{ color: primaryColor, fontWeight: 600, margin: 0, fontSize: '1rem' }}>Delivery Address</h4>
        </div>
        <p style={{ margin: '0 0 0.5rem 0', fontWeight: '600', color: '#333', fontSize: '0.9rem' }}>{address.name}</p>
        <p style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '0.85rem', lineHeight: '1.4' }}>{address.address}</p>
        <p style={{ margin: 0, color: '#888', fontSize: '0.8rem' }}>{address.mobile}</p>
      </div>

      {/* Price Details */}
      <div style={{
        background: '#fff',
        padding: '2rem',
        borderRadius: '18px',
        boxShadow: '0 6px 32px rgba(34,205,105,0.10), 0 1.5px 6px rgba(0,0,0,0.04)'
      }}>
        <h3 style={{
          color: primaryColor,
          fontWeight: 700,
          marginBottom: '1.5rem',
          fontSize: '1.2rem'
        }}>PRICE DETAILS</h3>

        <div style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Subtotal ({totalItems} items)</span>
            <span style={{ color: primaryColor }}>₹{subtotal}</span>
          </div>

          {discount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Discount</span>
              <span style={{ color: 'green' }}>-₹{discount}</span>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Platform Fee</span>
            <span>₹{platformFee}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span>Delivery Fee</span>
            <span style={{ color: 'green' }}>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
          </div>

          <hr style={{ margin: '1rem 0', border: `1px solid ${borderColor}` }} />

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            color: primaryColor
          }}>
            <span>Total Amount</span>
            <span>₹{finalAmount}</span>
          </div>
        </div>

        {discount > 0 && (
          <div style={{
            marginTop: '1rem',
            padding: '0.75rem',
            background: '#e8f5e8',
            borderRadius: '6px',
            fontSize: '0.85rem',
            color: '#2d5016',
            textAlign: 'center'
          }}>
            🎉 You saved ₹{discount} on this order!
          </div>
        )}
      </div>
    </div>
  );
};
