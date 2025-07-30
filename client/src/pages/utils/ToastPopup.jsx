import React, { useEffect, useState } from 'react';

export const ToastPopup = ({ message, color = 'bg-blue-500', duration = 3000, clearToast, position = 'top-right' }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      clearToast?.(); // call parent's clear function
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, clearToast]);

  if (!visible) return null;

  let positionClass = 'fixed top-5 right-5';
  if (position === 'bottom-center') {
    positionClass = 'fixed left-1/2 bottom-8 transform -translate-x-1/2';
  }

  return (
    <div
      className={`${positionClass} ${color} text-white px-4 py-3 rounded shadow-lg z-50 transition-opacity duration-300 animate-fade-in-out`}
      style={{ opacity: visible ? 1 : 0 }}
    >
      <p>{message}</p>
      <style>{`
        @keyframes fade-in-out {
          0% { opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; }
        }
        .animate-fade-in-out {
          animation: fade-in-out ${duration}ms both;
        }
      `}</style>
    </div>
  );
};
