// src/pages/admin/ItemView.jsx

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from '../Navbar';
import { ViewItem } from './components/ViewItem';

export const ItemView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  // Fallback UI if someone directly enters the URL
  if (!order) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md mx-4">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.18 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Order Data Found</h2>
            <p className="text-gray-600 mb-6">Please access this page via the dashboard to view order details.</p>
            <button
              onClick={() => navigate('/admin/orders')}
              className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors duration-200 font-medium"
            >
              Return to Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Navbar />
      <div className="pt-16">
        <ViewItem order={order} />
      </div>
    </div>
  );
};