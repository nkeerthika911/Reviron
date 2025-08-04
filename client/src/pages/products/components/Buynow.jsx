import React, { useState } from 'react';
import {
  ShoppingCart,
  Plus,
  Minus,
  MapPin,
  Phone,
  Edit2,
  Trash2,
  CreditCard
} from 'lucide-react';

export function Buynow({ product }) {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'John Doe',
      type: 'HOME',
      address: '123 Main Street, Apartment 4B, Downtown Area',
      mobile: '+1 234-567-8900',
      isDefault: true
    }
  ]);

  const [selectedAddress, setSelectedAddress] = useState(1);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addressForm, setAddressForm] = useState({
    name: '',
    type: 'HOME',
    address: '',
    mobile: '',
    isDefault: false
  });
  const [editIndex, setEditIndex] = useState(null);

  const [cartItems, setCartItems] = useState(() => {
    if (!product) return [];
    return [
      {
        id: product.id || Date.now(),
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice || product.price,
        image: product.image,
        quantity: product.quantity || 1,
        inStock: product.inStock ?? true
      }
    ];
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalDiscount = cartItems.reduce(
    (sum, item) => sum + (item.originalPrice - item.price) * item.quantity,
    0
  );
  const totalAmount = subtotal;

  const updateQuantity = (id, change) => {
    setCartItems(items =>
      items.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeItem = id => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const handleAddOrEditAddress = () => {
    if (!addressForm.name.trim() || !addressForm.address.trim() || !addressForm.mobile.trim()) {
      alert('Please fill in all required fields.');
      return;
    }

    if (editIndex !== null) {
      setAddresses(addresses.map((addr, i) => (i === editIndex ? { ...addressForm, id: addr.id } : addr)));
    } else {
      const newAddress = {
        ...addressForm,
        id: Date.now()
      };
      setAddresses([...addresses, newAddress]);
    }

    resetAddressForm();
  };

  const resetAddressForm = () => {
    setAddressForm({ name: '', type: 'HOME', address: '', mobile: '', isDefault: false });
    setShowAddressModal(false);
    setEditIndex(null);
  };

  const handleEditAddress = index => {
    setEditIndex(index);
    setAddressForm(addresses[index]);
    setShowAddressModal(true);
  };

  const handleRemoveAddress = index => {
    const addressToRemove = addresses[index];
    setAddresses(addresses.filter((_, i) => i !== index));

    if (addressToRemove.id === selectedAddress && addresses.length > 1) {
      setSelectedAddress(addresses.find((_, i) => i !== index)?.id || addresses[0]?.id);
    }
  };

  const handleContinueToPayment = () => {
    if (!selectedAddress) {
      alert('Please select a delivery address.');
      return;
    }

    const orderData = {
      items: cartItems,
      address: addresses.find(addr => addr.id === selectedAddress),
      billing: {
        subtotal,
        discount: totalDiscount,
        total: totalAmount
      }
    };

    console.log('Proceeding to payment with:', orderData);
    alert('Proceeding to payment...');
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center text-gray-500 py-16">
        No product selected. Please go back and choose a product to buy.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Review your order and complete your purchase</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: Address + Items */}
          <div className="lg:col-span-2 space-y-8">
            {/* Address Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  Delivery Address
                </h2>
                <button
                  onClick={() => {
                    setShowAddressModal(true);
                    setEditIndex(null);
                    setAddressForm({ name: '', type: 'HOME', address: '', mobile: '', isDefault: false });
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                >
                  Add New Address
                </button>
              </div>

              <div className="space-y-4">
                {addresses.map((address, index) => (
                  <div
                    key={address.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedAddress === address.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedAddress(address.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <input
                            type="radio"
                            checked={selectedAddress === address.id}
                            onChange={() => setSelectedAddress(address.id)}
                            className="text-blue-600"
                          />
                          <span className="font-semibold text-gray-900">{address.name}</span>
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                            {address.type}
                          </span>
                          {address.isDefault && (
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-1">{address.address}</p>
                        <p className="text-gray-500 text-sm flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {address.mobile}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            handleEditAddress(index);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            handleRemoveAddress(index);
                          }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-green-600" />
                Order Items ({cartItems.length})
              </h2>

              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl font-bold text-gray-900">₹{item.price}</span>
                        <span className="text-gray-500 line-through text-sm">₹{item.originalPrice}</span>
                        <span className="text-green-600 text-sm font-medium">
                          {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% off
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-600">Quantity:</span>
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-2 hover:bg-gray-100"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-2 hover:bg-gray-100"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-purple-600" />
                Order Summary
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₹{totalDiscount}</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total Amount</span>
                  <span>₹{totalAmount}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-green-800 text-sm font-medium">
                    You saved ₹{totalDiscount} on this order!
                  </p>
                </div>

                <button
                  onClick={handleContinueToPayment}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Continue to Payment
                </button>

                <div className="text-center">
                  <p className="text-xs text-gray-500">
                    Secure checkout powered by 256-bit SSL encryption
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {editIndex !== null ? 'Edit Address' : 'Add New Address'}
              </h3>

              {/* Address Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={addressForm.name}
                    onChange={e => setAddressForm({ ...addressForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address Type *</label>
                  <select
                    value={addressForm.type}
                    onChange={e => setAddressForm({ ...addressForm, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="HOME">Home</option>
                    <option value="WORK">Work</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Complete Address *</label>
                  <textarea
                    value={addressForm.address}
                    onChange={e => setAddressForm({ ...addressForm, address: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:outline-none"
                    placeholder="House/Flat no, Building, Street, City, State, PIN"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label>
                  <input
                    type="tel"
                    value={addressForm.mobile}
                    onChange={e => setAddressForm({ ...addressForm, mobile: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:outline-none"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isDefault"
                    checked={addressForm.isDefault}
                    onChange={e => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                    className="w-4 h-4 text-blue-600"
                  />
                  <label htmlFor="isDefault" className="ml-2 text-sm text-gray-700">
                    Make this my default address
                  </label>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={resetAddressForm}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddOrEditAddress}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  {editIndex !== null ? 'Update Address' : 'Add Address'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
