import React, { useEffect, useState } from 'react';

export const ToastPopup = ({ message, color = 'bg-blue-500', duration = 3000, clearToast }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      clearToast?.(); // call parent's clear function
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, clearToast]);

  if (!visible) return null;

  return (
    <div className={`fixed top-5 right-5 ${color} text-white px-4 py-3 rounded shadow-lg z-50`}>
      <p>{message}</p>
    </div>
  );
};
