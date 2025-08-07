import React, { useRef, useState, useEffect } from 'react';
import { Navbar } from '../Navbar';
import { SellForm } from './components/SellForm';
import { OrderCard } from '../../adminpages/products/components/OrderCard';
import { UserProdCard } from './components/UserProdCard';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

export const Sell = () => {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  
  // Static data for orders
  const [orders] = useState([
    {
      id: '1',
      requestId: 'REQ-2023-001',
      customerName: 'John Doe',
      date: '2023-05-15',
      pickupDate: '2023-05-20',
      status: 'Processing',
      employeeStatus: 'Assigned',
      productCount: 3,
      customerPhone: '+1 555-123-4567',
      customerEmail: 'john.doe@example.com',
      address: '123 Main St, Anytown, USA',
      customerAddress: '123 Main St, Anytown, USA',
      profileImage: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      id: '2',
      requestId: 'REQ-2023-002',
      customerName: 'Jane Smith',
      date: '2023-05-18',
      pickupDate: '2023-05-23',
      status: 'Pending',
      employeeStatus: 'Unassigned',
      productCount: 5,
      customerPhone: '+1 555-987-6543',
      customerEmail: 'jane.smith@example.com',
      address: '456 Oak Ave, Somewhere, USA',
      customerAddress: '456 Oak Ave, Somewhere, USA',
      profileImage: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    {
      id: '3',
      requestId: 'REQ-2023-003',
      customerName: 'Robert Johnson',
      date: '2023-05-20',
      pickupDate: '2023-05-25',
      status: 'Completed',
      employeeStatus: 'Assigned',
      productCount: 2,
      customerPhone: '+1 555-456-7890',
      customerEmail: 'robert.j@example.com',
      address: '789 Pine Rd, Nowhere, USA',
      customerAddress: '789 Pine Rd, Nowhere, USA',
      profileImage: 'https://randomuser.me/api/portraits/men/3.jpg'
    }
  ]);

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("jwt");
    if (!token) return null;

    try {
      const decoded = jwtDecode(token);
      return decoded.userId || null;
    } catch (err) {
      console.error("Invalid JWT token", err);
      return null;
    }
  };

  const userId = getUserIdFromToken();
  console.log(userId);

  const toggleForm = () => setShowForm(!showForm);

  const handleAddProduct = (productData) => {
    setProducts([...products, { ...productData, id: Date.now() }]);
  };

  // Check if arrows should be visible
  const checkArrowVisibility = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Check arrow visibility on mount and when products change
  useEffect(() => {
    checkArrowVisibility();
    const handleResize = () => checkArrowVisibility();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [products]);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });

      // Check arrow visibility after scroll
      setTimeout(() => checkArrowVisibility(), 150);
    }
  };

  const handleSellNow = async () => {
    if (!address.trim() || !phone.trim()) {
      alert('Please fill in both address and phone number before selling.');
      return;
    }

    try {
      // Step 1: Create Collection Request
      const collectionPayload = {
        userId: userId,
        productSize: products.length,
        address,
        phone,
        pickupBy: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/collection/addrequest`,
        collectionPayload
      );

      const collectionId = response.data.data.data._id;
      console.log("Collection ID:", collectionId);

      for (const product of products) {
        const productPayload = {
          requestId: collectionId,
          name: product.name,
          category: product.category,
          condition: product.condition,
          quantity: product.quantity,
          description: product.description,
        };

        // Step 1: Upload product data
        const productResponse = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/userproduct/add`,
          productPayload
        );

        console.log(productResponse);
        const productId = productResponse.data.data.data._id;
        console.log('Product uploaded:', productId);

        // Step 2: Upload product images (if any)
        if (product.images && product.images.length > 0) {
          const formData = new FormData();
          product.images.forEach((image) => {
            formData.append('userProductPhotos', image);
          });

          try {
            await axios.post(
              `${import.meta.env.VITE_BASE_URL}/api/userproduct/uploadphotos/${productId}`,
              formData,
              {
                headers: { 'Content-Type': 'multipart/form-data' },
              }
            );
            console.log(`Images uploaded for product ${productId}`);
          } catch (err) {
            console.error(`Failed to upload images for product ${productId}`, err);
          }
        }
      }

      // Step 3: Done
      alert('Collection and all products uploaded successfully!');
      setProducts([]);
      setShowForm(false);

    } catch (err) {
      console.error(err);
      alert('Failed to create collection or upload products. Please try again.');
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-50 flex flex-col relative">
      <Navbar />

      <div className="flex p-4 w-full h-full overflow-hidden">
        {showForm ? (
          <>
            {/* Left: Sell Form */}
            <div className="flex-1 mr-2">
              <SellForm
                onCancel={toggleForm}
                onSubmit={handleAddProduct}
              />
            </div>

            {/* Right: Product Preview Panel */}
            <div className="flex-2 pl-2 rounded shadow-md flex flex-col justify-between py-4">
              {products.length === 0 ? (
                <p className="text-gray-500 text-center px-4 my-auto">
                  No product added, add at least one product to sell
                </p>
              ) : (
                <>
                  {/* Improved Scrollable Product Cards with Conditional Arrows */}
                  <div className="relative">
                    {/* Left Arrow */}
                    {showLeftArrow && (
                      <button
                        onClick={() => handleScroll('left')}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-700 w-8 h-8 rounded-full shadow-md border border-gray-200 flex items-center justify-center z-20 transition-all duration-200 hover:scale-110"
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M7.5 9L4.5 6L7.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    )}

                    {/* Right Arrow */}
                    {showRightArrow && (
                      <button
                        onClick={() => handleScroll('right')}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-700 w-8 h-8 rounded-full shadow-md border border-gray-200 flex items-center justify-center z-20 transition-all duration-200 hover:scale-110"
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    )}

                    {/* Scrollable Container */}
                    <div
                      ref={scrollRef}
                      onScroll={checkArrowVisibility}
                      className="flex space-x-4 overflow-x-auto overflow-y-hidden max-h-[65vh] px-4 py-2 scroll-smooth justify-center"
                      style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                      }}
                    >
                      {products.map((product) => (
                        <div key={product.id} className="flex-shrink-0">
                          <UserProdCard
                            name={product.name}
                            category={product.category}
                            condition={product.condition}
                            quantity={product.quantity}
                            priceStart={product.priceStart}
                            priceEnd={product.priceEnd}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Fade effect for scroll indication */}
                    {showLeftArrow && (
                      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white via-white to-transparent pointer-events-none z-10" />
                    )}
                    {showRightArrow && (
                      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white via-white to-transparent pointer-events-none z-10" />
                    )}
                  </div>

                  {/* Address, Phone Inputs & Action Buttons */}
                  <div className="m-2 space-y-1">
                    {/* Address & Phone Inputs */}
                    <div className="space-y-1">
                      <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter your full address..."
                        className="w-full h-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                      />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => setProducts([])}
                        className="flex-1 bg-red-500 text-white px-4 py-2.5 rounded-md hover:bg-red-600 transition duration-200 font-medium"
                      >
                        Clear Products
                      </button>
                      <button
                        onClick={handleSellNow}
                        className="flex-1 bg-green-600 text-white px-4 py-2.5 rounded-md hover:bg-green-700 transition duration-200 font-medium"
                      >
                        Sell Now
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <div className="w-full h-full overflow-y-auto p-4">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Collection Requests</h1>
              <div className="space-y-4">
                {orders.map((order) => (
                  <OrderCard 
                    key={order.id} 
                    order={order} 
                    type="user" 
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {!showForm && (
        <button
          onClick={toggleForm}
          className="fixed bottom-6 right-6 bg-[#73B87C] text-white rounded-full w-14 h-14 text-3xl shadow-lg transition-all duration-300 hover:bg-[#6F9674] transform hover:scale-110 hover:rotate-90"
        >
          +
        </button>
      )}

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};