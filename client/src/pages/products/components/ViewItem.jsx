// src/pages/admin/components/ViewItem.jsx

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';

// Product Card Component
const ProductCard = ({ product }) => (
  <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-gray-200">
    <div className="relative">
      <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        {/* Category-based icon or default image */}
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mb-2">
            {product.category === 'electronics' ? (
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            ) : (
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            )}
          </div>
          <span className="text-xs text-gray-500 capitalize">{product.category}</span>
        </div>
      </div>
      <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-medium text-gray-600 shadow">
        Qty: {product.quantity}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
      <div className="flex items-center justify-between mt-3">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          product.condition === 'Working' 
            ? 'bg-green-100 text-green-800' 
            : product.condition === 'Damaged' 
              ? 'bg-red-100 text-red-800'
              : 'bg-yellow-100 text-yellow-800'
        }`}>
          {product.condition}
        </span>
        <span className="text-xs text-gray-500 capitalize">{product.category}</span>
      </div>
      {product.description && (
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>
      )}
      <div className="mt-3 text-sm">
        {product.startPrice === -1 && product.endPrice === -1 ? (
          <button className="bg-orange-100 hover:bg-orange-200 text-orange-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 w-full">
            Assign Price Range
          </button>
        ) : (
          <>
            <span className="text-gray-500">Price Range: </span>
            <span className="font-medium text-gray-900">
              ₹{product.startPrice} - ₹{product.endPrice}
            </span>
          </>
        )}
      </div>
    </div>
  </div>
);

// ViewItem Component
export const ViewItem = ({ order }) => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const {
    requestId,
    customerName,
    customerPhone,
    customerEmail,
    customerAddress,
    profileImage,
    productCount,
    date,
    pickupDate,
    status,
    employeeStatus,
    address,
  } = order || {
    requestId: "REQ-2024-001",
    customerName: "John Smith",
    customerPhone: "+1 (555) 123-4567",
    customerEmail: "john.smith@email.com",
    customerAddress: "123 Main St, City, State 12345",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
    productCount: 0,
    date: "2024-01-15",
    pickupDate: "2024-01-20",
    status: "Pending",
    employeeStatus: "Assigned",
    address: "456 Collection Center, Business District",
  };

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      if (!orderId) {
        setError("Order ID is required");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/userproduct/${orderId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
          setProducts(result.data || []);
        } else {
          throw new Error(result.message || 'Failed to fetch products');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [orderId]);

  const getStatusColor = (status) => {
    const colors = {
      'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'In Progress': 'bg-blue-100 text-blue-800 border-blue-200',
      'Completed': 'bg-green-100 text-green-800 border-green-200',
      'Assigned': 'bg-purple-100 text-purple-800 border-purple-200',
      'Available': 'bg-gray-100 text-gray-800 border-gray-200',
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  // Calculate actual product count from fetched data
  const actualProductCount = products.reduce((total, product) => total + (product.quantity || 0), 0);

  return (
    <div className="min-h-screen w-full">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200 group"
                title="Go back"
              >
                <svg className="w-6 h-6 text-gray-600 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
                <p className="text-gray-600 text-sm mt-1">Request ID: <span className="font-mono font-medium">{requestId}</span></p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`px-4 py-2 rounded-xl text-sm font-semibold border ${getStatusColor(status)}`}>
                {status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-wrap lg:flex-nowrap gap-6">
          {/* Product Section */}
          <div className="flex-1 min-w-0 bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Items</h2>
              <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold">
                {actualProductCount} {actualProductCount === 1 ? 'item' : 'items'}
              </span>
            </div>
            
            {loading ? (
              <div className="flex flex-col items-center justify-center h-48 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <h3 className="text-lg font-semibold text-gray-700 mb-1">Loading Products...</h3>
                <p className="text-gray-500">Please wait while we fetch the product details.</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center h-48 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-1">Error Loading Products</h3>
                <p className="text-gray-500 mb-4">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-1">No Items Found</h3>
                <p className="text-gray-500">No products are associated with this order.</p>
              </div>
            )}
          </div>

          {/* Order & Customer Info */}
          <div className="w-full lg:w-96 flex-shrink-0 space-y-6">
            {/* Customer Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="relative mb-4">
                  <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg ring-4 ring-gray-100">
                    <img
                      src={profileImage}
                      alt={customerName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://randomuser.me/api/portraits/lego/1.jpg";
                      }}
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{customerName}</h3>
                <p className="text-gray-600 text-sm bg-gray-50 px-3 py-1 rounded-full">{customerEmail}</p>
              </div>

              {/* Contact Information */}
              <div className="border-t border-gray-100 pt-6">
                <h4 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wide flex items-center">
                  <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Information
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                    <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-900 font-medium">{customerPhone}</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                    <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                    <span className="text-gray-900 font-medium text-sm break-all">{customerEmail}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Information Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <svg className="w-5 h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Order Information
              </h4>
              
              <div className="space-y-5">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="text-gray-600 font-medium">Request ID</span>
                  <span className="text-gray-900 font-mono bg-white px-3 py-1 rounded-lg border text-sm">{requestId}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="text-blue-600 text-sm font-medium mb-1">Created</div>
                    <div className="text-gray-900 font-semibold">{date}</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl border border-green-100">
                    <div className="text-green-600 text-sm font-medium mb-1">Pickup</div>
                    <div className="text-gray-900 font-semibold">{pickupDate}</div>
                  </div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-100">
                  <div className="text-purple-600 text-sm font-medium mb-1">Total Items</div>
                  <div className="text-gray-900 font-bold text-xl">{actualProductCount}</div>
                </div>

                <div className="space-y-3 pt-2 border-t border-gray-100">
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-xl">
                    <span className="text-gray-700 font-medium">Collection Status</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(status)}`}>
                      {status}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-xl">
                    <span className="text-gray-700 font-medium">Employee Status</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(employeeStatus)}`}>
                      {employeeStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Information Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <svg className="w-5 h-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Address Information
              </h4>
              
              <div className="space-y-5">
                <div>
                  <div className="flex items-center mb-3">
                    <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 font-semibold text-sm">Collection Address</span>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-xl">
                    <p className="text-gray-900 font-medium leading-relaxed">{address}</p>
                  </div>
                </div>

                {customerAddress !== address && customerAddress !== "N/A" && (
                  <div>
                    <div className="flex items-center mb-3">
                      <svg className="w-4 h-4 text-gray-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700 font-semibold text-sm">Customer Address</span>
                    </div>
                    <div className="bg-gray-50 border-l-4 border-gray-400 p-4 rounded-r-xl">
                      <p className="text-gray-900 font-medium leading-relaxed">{customerAddress}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};