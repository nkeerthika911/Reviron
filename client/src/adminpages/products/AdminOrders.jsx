import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "../../pages/Navbar";
import { OrderCard } from "./components/OrderCard";

export const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/collection/all");
        
        if (response.data.success && response.data.data?.data) {
          const rawOrders = response.data.data.data;
          
          const formattedOrders = rawOrders.map((order) => ({
            id: order._id,
            requestId: order._id.slice(-6).toUpperCase(),
            date: new Date(order.createdAt).toLocaleDateString("en-GB"),
            pickupDate: new Date(order.pickupBy).toLocaleDateString("en-GB"),
            status: order.collectionStatus || "Pending",
            employeeStatus: order.employeeStatus || "Unassigned",
            employee: order.employeeName || order.employeeStatus === "unassigned" ? "Unassigned" : "Assigned",
            employeeId: order.employeeId || null,
            productCount: order.productSize || 0,
            customerName: order.userId?.fullName || "N/A",
            customerPhone: order.phone || "N/A",
            customerEmail: order.userId?.email || "N/A",
            customerGender: order.userId?.gender || "N/A",
            customerPoints: order.userId?.points || 0,
            customerAddress: order.userId?.Address || order.address || "N/A",
            address: order.address || "N/A",
            profileImage: order.userId?.gender === "f" 
              ? "https://randomuser.me/api/portraits/women/44.jpg"
              : "https://randomuser.me/api/portraits/men/32.jpg"
          }));

          setOrders(formattedOrders);
        } else {
          setError("No orders found");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading orders...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 text-xl mb-2">⚠️</div>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Collection Orders</h1>
            <p className="text-gray-600">Manage and track all collection requests</p>
          </div>
          
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📦</div>
              <p className="text-gray-600">No orders found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};