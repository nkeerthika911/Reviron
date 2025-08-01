import React from "react";

// Product Card Component
const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
      </div>
    </div>
  );
};

// Products Data
const products = [
  {
    id: 1,
    name: "Fan motor - Working",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
  },
  {
    id: 2,
    name: "Fan motor - Working",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
  },
  {
    id: 3,
    name: "Fan motor - Working",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
  },
  {
    id: 4,
    name: "Fan motor - Working",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
  },
  {
    id: 5,
    name: "Fan motor - Working",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
  },
  {
    id: 6,
    name: "Fan motor - Working",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
  },
];

// ViewItem Component
export const ViewItem = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col p-6 overflow-x-hidden">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">View Items Page</h2>

      <div className="flex flex-wrap gap-6 overflow-hidden">
        {/* Product Grid Section */}
        <div className="flex-1 bg-white rounded-xl shadow-lg p-6 overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Profile Section */}
        <div className="w-80 max-h-full bg-[#EDF4ED] rounded-xl shadow-lg p-6 flex flex-col items-center overflow-x-hidden overflow-y-auto border border-[#b6d2b8]">
          {/* Profile Picture */}
          <div className="w-28 h-28 rounded-full overflow-hidden mb-4 border-4 border-[#b6d2b8] shadow">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Name */}
          <h2 className="text-3xl font-bold text-[#6F9674] mb-2">Ajith S</h2>
          <span className="text-base text-[#6F9674] mb-6 bg-white px-3 py-1 rounded-full shadow">Seller</span>

          {/* Contact Information */}
          <div className="w-full space-y-6 text-[#6F9674] text-lg">
            <div className="flex items-center">
              <span className="font-semibold">Contact:</span>
              <span className="ml-2 text-xl">9889753247</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold">Email:</span>
              <span className="ml-2 text-xl">ajith@gmail.com</span>
            </div>
            <div className="flex items-start">
              <span className="font-semibold">Address:</span>
              <span className="ml-2 text-xl leading-snug">
                143/7 Anna Nagar, Sholinganallur, Chennai – 600119
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
