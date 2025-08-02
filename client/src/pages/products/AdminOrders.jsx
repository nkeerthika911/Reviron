import React from "react";
import { Navbar } from "../Navbar";
import { OrderCard } from "./components/orderCard";

export const AdminOrders = () => {
  // Example dummy order data
  const orders = [
    {
      requestId: "GGA6758",
      date: "01/08/25",
      status: "Collection Initiated",
      employee: "Harshana",
      productCount: 10,
    },
    {
      requestId: "GGA6759",
      date: "02/08/25",
      status: "Packing",
      employee: "Rajesh",
      productCount: 7,
    },
    {
      requestId: "GGA6760",
      date: "02/08/25",
      status: "Dispatched",
      employee: "Anjali",
      productCount: 5,
    },
  ];

  return (
    <div className="h-screen w-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex flex-col p-4 overflow-y-auto">
        {orders.map((order, index) => (
          <OrderCard key={index} order={order} />
        ))}
      </div>
    </div>
  );
};
