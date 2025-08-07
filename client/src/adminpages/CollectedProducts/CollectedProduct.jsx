import React from 'react';

export const CollectedProduct = () => {
  const products = [
    {
      image: 'https://via.placeholder.com/300x200.png?text=Laptop',
      name: 'Old Laptop',
      rate: '₹2,500',
      employee: 'Ravi Kumar',
      status: 'Being Tested',
    },
    {
      image: 'https://via.placeholder.com/300x200.png?text=Smartphone',
      name: 'Used Smartphone',
      rate: '₹5,000',
      employee: 'Priya Sharma',
      status: 'Tested',
    },
    {
      image: 'https://via.placeholder.com/300x200.png?text=Monitor',
      name: '24" Monitor',
      rate: '₹3,200',
      employee: 'Amit Patel',
      status: 'Being Tested',
    },
    {
      image: 'https://via.placeholder.com/300x200.png?text=Keyboard',
      name: 'Mechanical Keyboard',
      rate: '₹1,800',
      employee: 'Neha Gupta',
      status: 'Tested',
    },
    {
      image: 'https://via.placeholder.com/300x200.png?text=Headphones',
      name: 'Wireless Headphones',
      rate: '₹2,300',
      employee: 'Sanjay Verma',
      status: 'Being Tested',
    },
    {
      image: 'https://via.placeholder.com/300x200.png?text=Tablet',
      name: 'Android Tablet',
      rate: '₹4,500',
      employee: 'Anjali Singh',
      status: 'Tested',
    },
    {
      image: 'https://via.placeholder.com/300x200.png?text=Printer',
      name: 'Laser Printer',
      rate: '₹3,800',
      employee: 'Vikram Joshi',
      status: 'Being Tested',
    },
    {
      image: 'https://via.placeholder.com/300x200.png?text=Mouse',
      name: 'Wireless Mouse',
      rate: '₹800',
      employee: 'Deepika Nair',
      status: 'Tested',
    },
    {
      image: 'https://via.placeholder.com/300x200.png?text=Speaker',
      name: 'Bluetooth Speaker',
      rate: '₹1,500',
      employee: 'Rahul Mehta',
      status: 'Being Tested',
    },
    {
      image: 'https://via.placeholder.com/300x200.png?text=Hard+Drive',
      name: '1TB HDD',
      rate: '₹2,200',
      employee: 'Sonia Reddy',
      status: 'Tested',
    },
    {
      image: 'https://via.placeholder.com/300x200.png?text=Router',
      name: 'WiFi Router',
      rate: '₹1,700',
      employee: 'Arjun Kapoor',
      status: 'Being Tested',
    },
    {
      image: 'https://via.placeholder.com/300x200.png?text=Webcam',
      name: 'HD Webcam',
      rate: '₹1,200',
      employee: 'Meena Iyer',
      status: 'Tested',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Collected Products</h1>
        
        {/* Product Cards Grid - 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-cover rounded-t-lg"
              />

              <div className="p-3 space-y-1">
                <h2 className="text-md font-semibold text-gray-800 truncate">{product.name}</h2>

                <div className="text-gray-600 text-xs space-y-1">
                  <p className="truncate"><span className="font-medium">Rate:</span> {product.rate}</p>
                  <p className="truncate"><span className="font-medium">Employee:</span> {product.employee}</p>
                  <p className="flex items-center">
                    <span className="font-medium mr-1">Status:</span>
                    <span
                      className={`px-1.5 py-0.5 rounded ${
                        product.status === 'Being Tested'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {product.status}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};