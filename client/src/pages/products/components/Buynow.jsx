import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Buynow = () => {
  const [addresses, setAddresses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', type: '', address: '', mobile: '' });
  const [editIndex, setEditIndex] = useState(null);

  // Sample cart data
  const [cart] = useState({
    name: 'Sample Product',
    price: 1899,
    discount: 1178,
    fee: 20,
    image: 'https://cdn-icons-png.flaticon.com/512/263/263142.png',
  });

  const [showCartModal, setShowCartModal] = useState(false);

  const navigate = useNavigate();

  // Remove address by index
  const handleRemove = idx => {
    setAddresses(addresses.filter((_, i) => i !== idx));
  };

  // Open modal for editing
  const handleEdit = idx => {
    setEditIndex(idx);
    setForm(addresses[idx]);
    setShowModal(true);
  };

  // Add or update address
  const handleAddOrEditAddress = () => {
    if (editIndex !== null) {
      const updated = addresses.map((addr, i) => (i === editIndex ? form : addr));
      setAddresses(updated);
    } else {
      setAddresses([...addresses, form]);
    }
    setForm({ name: '', type: '', address: '', mobile: '' });
    setShowModal(false);
    setEditIndex(null);
  };

  // Navigate to payment page
  const handleContinue = () => {
    navigate('/payment');
  };

  return (
    <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8">
      {/* Address Section */}
      <div className="flex-1 bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Select Delivery Address</h2>
        <div className="space-y-4">
          {addresses.map((addr, idx) => (
            <div key={idx} className="border border-gray-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2 bg-gray-50">
              <div>
                <div className="font-semibold text-lg text-gray-800">{addr.name}
                  <span className="ml-2 bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">{addr.type}</span>
                </div>
                <div className="text-gray-600 text-sm">{addr.address}</div>
                <div className="text-gray-500 text-sm">Mobile: <span className="font-semibold">{addr.mobile}</span></div>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <button className="px-3 py-1 rounded bg-red-100 text-red-600 hover:bg-red-200 transition" onClick={() => handleRemove(idx)}>Remove</button>
                <button className="px-3 py-1 rounded bg-blue-100 text-blue-600 hover:bg-blue-200 transition" onClick={() => handleEdit(idx)}>Edit</button>
              </div>
            </div>
          ))}
        </div>
        <button
          className="mt-6 bg-[#e1ebe2] text-[#2d4739] font-semibold rounded-lg px-4 py-2 shadow hover:bg-[#d0e0d2] focus:outline-none transition"
          onClick={() => { setShowModal(true); setEditIndex(null); setForm({ name: '', type: '', address: '', mobile: '' }); }}
        >
          + Add New Address
        </button>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 animate-fade-in">
            <div className="bg-white p-8 rounded-2xl shadow-2xl min-w-[320px] w-full max-w-md relative animate-scale-in">
              <h3 className="text-xl font-bold mb-4 text-gray-800">{editIndex !== null ? 'Edit Address' : 'Add New Address'}</h3>
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full mb-3 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 transition"
              />
              <input
                type="text"
                placeholder="Type (HOME/WORK)"
                value={form.type}
                onChange={e => setForm({ ...form, type: e.target.value })}
                className="w-full mb-3 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 transition"
              />
              <textarea
                placeholder="Address"
                value={form.address}
                onChange={e => setForm({ ...form, address: e.target.value })}
                className="w-full mb-3 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 transition"
              />
              <input
                type="text"
                placeholder="Mobile"
                value={form.mobile}
                onChange={e => setForm({ ...form, mobile: e.target.value })}
                className="w-full mb-3 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 transition"
              />
              <div className="flex justify-end gap-3 mt-4">
                <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition" onClick={() => { setShowModal(false); setEditIndex(null); }}>Cancel</button>
                <button onClick={handleAddOrEditAddress} className="px-4 py-2 rounded-lg bg-[#81AD87] text-white hover:bg-[#6E9673] transition font-semibold">
                  {editIndex !== null ? 'Update' : 'Add'}
                </button>
              </div>
              <style>{`
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fade-in 0.3s ease; }
                @keyframes scale-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
                .animate-scale-in { animation: scale-in 0.35s cubic-bezier(0.4,0,0.2,1); }
              `}</style>
            </div>
          </div>
        )}
      </div>

      {/* Cart & Payment Section */}
      <div className="flex-1 max-w-md bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Price Details (1 Item)</h3>
        <img src={cart.image} alt="Cart" className="w-20 h-20 object-contain mb-4" />
        <div className="font-semibold text-lg text-gray-800 mb-2">{cart.name}</div>
        <div className="w-full space-y-1 text-gray-700">
          <div className="flex justify-between"><span>Total MRP:</span> <span>₹{cart.price}</span></div>
          <div className="flex justify-between"><span>Discount on MRP:</span> <span className="text-green-600">-₹{cart.discount}</span></div>
          <div className="flex justify-between"><span>Platform Fee:</span> <span>₹{cart.fee}</span></div>
        </div>
        <hr className="my-4 w-full border-gray-200" />
        <div className="flex justify-between w-full text-lg font-bold text-gray-900 mb-4">
          <span>Total Amount:</span>
          <span>₹{cart.price - cart.discount + cart.fee}</span>
        </div>
        <button
          className="mt-2 w-full py-3 rounded-lg bg-[#81AD87] text-white font-semibold text-base hover:bg-[#6E9673] transition-all duration-200 shadow"
          onClick={handleContinue}
        >
          CONTINUE
        </button>
        {showCartModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 animate-fade-in">
            <div className="bg-white p-8 rounded-2xl shadow-2xl min-w-[320px] w-full max-w-md text-center animate-scale-in">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Cart Details</h3>
              <img src={cart.image} alt="Cart" className="w-28 h-28 object-contain mb-4 mx-auto" />
              <div className="font-semibold text-lg text-gray-800 mb-2">{cart.name}</div>
              <div className="w-full space-y-1 text-gray-700 mb-2">
                <div className="flex justify-between"><span>Total MRP:</span> <span>₹{cart.price}</span></div>
                <div className="flex justify-between"><span>Discount:</span> <span>₹{cart.discount}</span></div>
                <div className="flex justify-between"><span>Platform Fee:</span> <span>₹{cart.fee}</span></div>
              </div>
              <div className="flex justify-between w-full text-lg font-bold text-gray-900 mb-4">
                <span>Total:</span>
                <span>₹{cart.price - cart.discount + cart.fee}</span>
              </div>
              <button className="mt-2 w-full py-2 rounded-lg bg-[#81AD87] text-white font-semibold text-base hover:bg-[#6E9673] transition-all duration-200 shadow" onClick={() => setShowCartModal(false)}>
                Close
              </button>
              <style>{`
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fade-in 0.3s ease; }
                @keyframes scale-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
                .animate-scale-in { animation: scale-in 0.35s cubic-bezier(0.4,0,0.2,1); }
              `}</style>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};