import React from 'react';

export const Orders = () => {
  const orders = [
    {
      userPhoto: 'https://via.placeholder.com/100',
      orderId: 'ORD123456',
      totalAmount: '₹5,800',
      employeeName: 'Ravi Kumar',
    },
    {
      userPhoto: 'https://via.placeholder.com/100',
      orderId: 'ORD789012',
      totalAmount: '₹3,200',
      employeeName: 'Anita Sharma',
    },
    {
      userPhoto: 'https://via.placeholder.com/100',
      orderId: 'ORD345678',
      totalAmount: '₹4,500',
      employeeName: 'Sanjay Patel',
    },
    {
      userPhoto: 'https://via.placeholder.com/100',
      orderId: 'ORD901234',
      totalAmount: '₹6,200',
      employeeName: 'Priya Singh',
    },
    {
      userPhoto: 'https://via.placeholder.com/100',
      orderId: 'ORD567890',
      totalAmount: '₹2,800',
      employeeName: 'Vikram Joshi',
    },
    {
      userPhoto: 'https://via.placeholder.com/100',
      orderId: 'ORD123789',
      totalAmount: '₹7,500',
      employeeName: 'Neha Gupta',
    },
    {
      userPhoto: 'https://via.placeholder.com/100',
      orderId: 'ORD456123',
      totalAmount: '₹3,900',
      employeeName: 'Arun Mehta',
    },
    {
      userPhoto: 'https://via.placeholder.com/100',
      orderId: 'ORD789456',
      totalAmount: '₹5,100',
      employeeName: 'Sonia Reddy',
    },
    {
      userPhoto: 'https://via.placeholder.com/100',
      orderId: 'ORD321654',
      totalAmount: '₹4,200',
      employeeName: 'Rajesh Iyer',
    },
  ];

  return (
    <div className="p-6">
      {/* Grid container with 3 columns on large screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order, index) => (
          <div
            key={index}
            className="flex bg-white shadow-md rounded-lg p-6 h-full min-h-[200px] hover:shadow-lg transition-shadow"
          >
            {/* User Photo */}
            <img
              src={order.userPhoto}
              alt="User"
              className="w-20 h-20 rounded-full object-cover mr-4 self-center"
            />

            {/* Order Details and Buttons container */}
            <div className="flex flex-col flex-1">
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Order ID: {order.orderId}</h2>
                <p className="text-gray-600 mt-1">Total Amount: {order.totalAmount}</p>
                <p className="text-gray-600">Assigned Employee: {order.employeeName}</p>
              </div>

              {/* Action Buttons at the bottom */}
              <div className="flex gap-2 mt-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors">
                  View Products
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition-colors">
                  Update Orders
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};