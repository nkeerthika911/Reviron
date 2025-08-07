  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { Assign } from "./Assign";
  import { SellingRequests } from "./SellingRequest";

  export const OrderCard = ({ order, type='user' }) => {
    const [showSellingRequests, setShowSellingRequests] = useState(false);
    const [showAssignPopup, setShowAssignPopup] = useState(false);
    const navigate = useNavigate();

    const handleViewItems = () => {
      navigate(`/admin/itemview/${order.id}`, { state: { order } });
    };


    const handleAssignmentSubmit = (rate, employee) => {
      console.log("Submitted assignment with:", rate, employee);
      setShowAssignPopup(false);
    };

    const getStatusColor = (status) => {
      switch (status?.toLowerCase()) {
        case 'completed':
          return 'bg-green-100 text-green-800';
        case 'processing':
          return 'bg-blue-100 text-blue-800';
        case 'pending':
          return 'bg-yellow-100 text-yellow-800';
        case 'cancelled':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };

    const getEmployeeStatusColor = (status) => {
      switch (status?.toLowerCase()) {
        case 'assigned':
          return 'bg-green-100 text-green-800';
        case 'unassigned':
          return 'bg-yellow-100 text-yellow-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };

    return (
      <>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start gap-4">
            {/* Profile Photo (admin only) */}
            {type === 'admin' && (
              <div className="flex-shrink-0">
                <img
                  src={order.profileImage}
                  alt={order.customerName}
                  className="w-16 h-16 rounded-lg object-cover border-2 border-gray-200"
                  onError={(e) => {
                    e.target.src = "https://randomuser.me/api/portraits/lego/1.jpg";
                  }}
                />
              </div>
            )}

            {/* Order Information */}
            <div className="flex-1 min-w-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">Request ID</p>
                  <p className="text-sm text-gray-600 font-mono">{order.requestId}</p>
                </div>

                {/* Customer Name (admin only) */}
                {type === 'admin' && (
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">Customer</p>
                    <p className="text-sm text-gray-600">{order.customerName}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">Created Date</p>
                  <p className="text-sm text-gray-600">{order.date}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">Pickup Date</p>
                  <p className="text-sm text-gray-600">{order.pickupDate}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">Collection Status</p>
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">Employee Status</p>
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getEmployeeStatusColor(order.employeeStatus)}`}>
                    {order.employeeStatus}
                  </span>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">Product Count</p>
                  <p className="text-sm text-gray-600">{order.productCount} items</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">Contact</p>
                  <p className="text-sm text-gray-600">{order.customerPhone}</p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">Email</p>
                  <p className="text-sm text-gray-600">{order.customerEmail}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">Collection Address</p>
                  <p className="text-sm text-gray-600">{order.address}</p>
                </div>
              </div>

              {order.customerAddress !== "N/A" && order.customerAddress !== order.address && (
                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-900 mb-1">Customer Address</p>
                  <p className="text-sm text-gray-600">{order.customerAddress}</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 flex-shrink-0">
              <button
                onClick={handleViewItems}
                className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors duration-200 min-w-[120px]"
              >
                View Items
              </button>

              {type === 'admin' && (
                <button
                  onClick={() => setShowAssignPopup(true)}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 min-w-[120px]"
                >
                  Assign
                </button>
              )}

              {type !== 'admin' && (
                <button
                  onClick={() => setShowSellingRequests(true)}
                  className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors duration-200 min-w-[120px]"
                >
                  Collection Requests
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Assign Popup */}
        {showAssignPopup && (
          <div className="fixed inset-0 backdrop-blur-md bg-black/20 flex items-center justify-center z-50 p-4">
            <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto shadow-2xl border border-gray-100">
              <button
                onClick={() => setShowAssignPopup(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full flex items-center justify-center hover:from-red-600 hover:to-red-700 transition-all duration-200 z-10 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="p-8">
                <Assign onAssignmentSubmit={handleAssignmentSubmit} />
              </div>
            </div>
          </div>
        )}

        {/* Selling Requests Popup (not for admin) */}
        {type !== 'admin' && showSellingRequests && (
          <div className="fixed inset-0 backdrop-blur-md bg-black/20 flex items-center justify-center z-50 p-4">
            <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto shadow-2xl border border-gray-100">
              <button
                onClick={() => setShowSellingRequests(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full flex items-center justify-center hover:from-red-600 hover:to-red-700 transition-all duration-200 z-10 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="p-8">
                <SellingRequests />
              </div>
            </div>
          </div>
        )}
      </>
    );
  };