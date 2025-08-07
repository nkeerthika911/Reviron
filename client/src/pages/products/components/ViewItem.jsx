// src/pages/admin/components/ViewItem.jsx

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

// Product Card Component
const ProductCard = ({ product, onAssignPrice }) => (
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
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.condition === 'Working'
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
          <button
            onClick={() => onAssignPrice(product)}
            className="bg-orange-100 hover:bg-orange-200 text-orange-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 w-full"
          >
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
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [startPrice, setStartPrice] = useState("");
  const [endPrice, setEndPrice] = useState("");
  const [submittingPrice, setSubmittingPrice] = useState(false);
  const [priceError, setPriceError] = useState("");

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

        const response = await axios.get(`https://reviron-1.onrender.com/api/userproduct/${orderId}`);

        if (response.data.success) {
          setProducts(response.data.data || []);
        } else {
          throw new Error(response.data.message || 'Failed to fetch products');
        }

      } catch (err) {
        console.error('Error fetching products:', err);

        // Handle different types of axios errors
        if (err.response) {
          // Server responded with error status
          setError(`Server error: ${err.response.status} - ${err.response.data?.message || err.message}`);
        } else if (err.request) {
          // Request was made but no response received
          setError('Network error: No response from server');
        } else {
          // Something else happened
          setError(err.message || 'Failed to fetch products');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [orderId]);

  // Handle price assignment
  const handleAssignPrice = async () => {
    // Reset previous errors
    setPriceError("");

    // Validation
    if (!startPrice || !endPrice) {
      setPriceError("Both start price and end price are required");
      return;
    }

    const startPriceNum = parseFloat(startPrice);
    const endPriceNum = parseFloat(endPrice);

    if (isNaN(startPriceNum) || isNaN(endPriceNum)) {
      setPriceError("Please enter valid numbers for prices");
      return;
    }

    if (startPriceNum < 0 || endPriceNum < 0) {
      setPriceError("Prices cannot be negative");
      return;
    }

    if (startPriceNum >= endPriceNum) {
      setPriceError("Start price must be less than end price");
      return;
    }

    try {
      setSubmittingPrice(true);

      const response = await axios.patch(
        `https://reviron-1.onrender.com/api/userproduct/assignprice`,
        {
          productId: selectedProduct._id,
          startPrice: startPriceNum,
          endPrice: endPriceNum,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        // Update the products list with the new price
        setProducts(prevProducts =>
          prevProducts.map(product =>
            product._id === selectedProduct._id
              ? { ...product, startPrice: startPriceNum, endPrice: endPriceNum }
              : product
          )
        );

        // Close modal and reset form
        setShowPriceModal(false);
        setSelectedProduct(null);
        setStartPrice("");
        setEndPrice("");

        // Optional: Show success message
        console.log('Price assigned successfully:', response.data.data);
      } else {
        throw new Error(response.data.message || 'Failed to assign price');
      }

    } catch (err) {
      console.error('Error assigning price:', err);

      // Handle different types of axios errors
      if (err.response) {
        // Server responded with error status
        setPriceError(`Server error: ${err.response.status} - ${err.response.data?.message || 'Failed to assign price'}`);
      } else if (err.request) {
        // Request was made but no response received
        setPriceError('Network error: Unable to connect to server');
      } else {
        // Something else happened
        setPriceError(err.message || 'Failed to assign price. Please try again.');
      }
    } finally {
      setSubmittingPrice(false);
    }
  };

  // Calculate actual product count from fetched data
  const actualProductCount = products.reduce((total, product) => total + (product.quantity || 0), 0);

  return (
    <div className="min-h-screen w-full">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-wrap lg:flex-nowrap gap-6">
          {/* Product Section */}
          <div className="flex-1 min-w-0 bg-white rounded-2xl shadow-lg border border-gray-100 p-8 max-h-[600px] overflow-y-auto" style={{ maxHeight: '600px', overflowY: 'auto' }}>
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
                  <ProductCard
                    key={product._id}
                    product={product}
                    onAssignPrice={handleOpenPriceModal}
                  />
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
          <div className="w-full lg:w-96 flex-shrink-0 space-y-6 max-h-[600px] overflow-y-auto" style={{ maxHeight: '600px', overflowY: 'auto' }}>
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

      {/* Price Modal */}
      {showPriceModal && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative">
            <button
              onClick={handleClosePriceModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              disabled={submittingPrice}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Assign Price Range</h3>

            {priceError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{priceError}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Product Name</label>
                <div className="bg-gray-50 p-3 rounded-lg text-gray-900 font-semibold">{selectedProduct.name}</div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Start Price (₹)</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={startPrice}
                  onChange={(e) => setStartPrice(e.target.value)}
                  placeholder="Enter start price"
                  disabled={submittingPrice}
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">End Price (₹)</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={endPrice}
                  onChange={(e) => setEndPrice(e.target.value)}
                  placeholder="Enter end price"
                  disabled={submittingPrice}
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleClosePriceModal}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                  disabled={submittingPrice}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAssignPrice}
                  disabled={submittingPrice}
                  className="flex-1 bg-[#2E8B57] hover:bg-[#3CB371] disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
                >
                  {submittingPrice ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Submit'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};