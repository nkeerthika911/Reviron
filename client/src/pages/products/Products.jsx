import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar } from '../Navbar';
import { ProductCard } from './components/ProductCard';
import { Filters } from './components/Filters';
import { Search } from 'lucide-react';

// Import Poppins font
const style = document.createElement('style');
style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
  * {
    font-family: 'Poppins', sans-serif;
  }
`;
document.head.appendChild(style);

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/products');
        if (response.data.success) {
          setProducts(response.data.data.data); // accessing nested "data"
        } else {
          setError('Failed to fetch products');
        }
      } catch (err) {
        setError('Something went wrong while fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="h-screen w-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex p-4 overflow-hidden">
        <Filters />
        <div className="flex flex-1">
          <div className="flex-1 flex flex-col">
            {/* Search Bar - Fixed */}
            <div className="flex-shrink-0 p-6 pb-4 pt-2">
                <div className="mb-3">
                  <h2 className="text-xl font-semibold text-[#6F9674]">POPULAR PRODUCTS</h2>
                </div>
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#81AD87] w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#81AD87] focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                {loading ? (
                  <p className="text-gray-500 text-center">Loading products...</p>
                ) : error ? (
                  <p className="text-red-500 text-center">{error}</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
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
