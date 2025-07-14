import React from 'react'
import { Navbar } from '../Navbar'
import { ProductCard } from './components/ProductCard'
import { Filters } from './components/Filters'
import { Search } from 'lucide-react'


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
  // Sample product data based on the image
  const products = [
    {
      id: 1,
      name: "Fan motor - Working",
      price: "150.00",
      rating: "live at cart",
      views: "122",
      interested: "22",
      availability: "AVAILABLE NOW",
      condition: "SECOND",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
      isFavorite: false
    },
    {
      id: 2,
      name: "Fan motor - Working",
      price: "150.00",
      rating: "live at cart",
      views: "122",
      interested: "22",
      availability: "AVAILABLE NOW",
      condition: "SECOND",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
      isFavorite: true
    },
    {
      id: 3,
      name: "Fan motor - Working",
      price: "150.00",
      rating: "live at cart",
      views: "122",
      interested: "22",
      availability: "AVAILABLE NOW",
      condition: "SECOND",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
      isFavorite: false
    },
    {
      id: 4,
      name: "Fan motor - Working",
      price: "150.00",
      rating: "live at cart",
      views: "122",
      interested: "22",
      availability: "AVAILABLE NOW",
      condition: "SECOND",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
      isFavorite: false
    },
    {
      id: 5,
      name: "Fan motor - Working",
      price: "150.00",
      rating: "live at cart",
      views: "122",
      interested: "22",
      availability: "AVAILABLE NOW",
      condition: "SECOND",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
      isFavorite: false
    },
    {
      id: 6,
      name: "Fan motor - Working",
      price: "150.00",
      rating: "live at cart",
      views: "122",
      interested: "22",
      availability: "AVAILABLE NOW",
      condition: "SECOND",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
      isFavorite: false
    }
  ];

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Left side - Filters */}
        <div className="w-90   flex-shrink-0">
          <Filters />
        </div>
        
        {/* Right side - Search and Products */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Search Bar - Fixed */}
          <div className="flex-shrink-0 p-6 pb-4 bg-white border-b border-gray-200">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          
          {/* Products Section - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {/* Popular Products Header */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">POPULAR PRODUCTS</h2>
              </div>
              
              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
