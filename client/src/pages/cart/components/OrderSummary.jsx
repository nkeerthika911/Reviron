import React from "react";

export const OrderSummary = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6 w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4 text-center">Order Summary</h2>
      <table className="w-full mb-4">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Item Name</th>
            <th className="py-2">Quantity</th>
            <th className="py-2">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-2">Fan motor</td>
            <td className="py-2">100 Items</td>
            <td className="py-2">₹15000.00</td>
          </tr>
        </tbody>
      </table>

      <div className="text-sm mb-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹13559.32</span>
        </div>
        <div className="flex justify-between">
          <span>GST (10%)</span>
          <span>₹10440.68</span>
        </div>
        <div className="flex justify-between font-semibold text-lg border-t pt-2 mt-2">
          <span>Total</span>
          <span>₹15000.00</span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
        <span className="material-icons">local_shipping</span>
        <span>Estimated Delivery: 3–5 days</span>
      </div>

      <button className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700 transition">
        Check out
      </button>
    </div>
  );
};
