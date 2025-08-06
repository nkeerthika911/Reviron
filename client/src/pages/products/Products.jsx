import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Navbar } from '../Navbar';
import { ProductCard } from './components/ProductCard';
import { Filters } from './components/Filters';
import { Search } from 'lucide-react';
import { useSearchParams, useLocation } from 'react-router-dom';

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
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  
  // Initialize favourite state from URL params
  const [favourite, setFavourite] = useState(() => {
    return searchParams.get('favorites') === 'true';
  });
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(() => {
    return searchParams.get('favorites') === 'true';
  });
  
  const [filters, setFilters] = useState({
    priceMin: 0,
    priceMax: 10000,
    category: '',
    condition: '',
    brand: '',
    location: ''
  });

  // Update URL when favourite state changes
  useEffect(() => {
    if (favourite) {
      setSearchParams({ favorites: 'true' }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  }, [favourite, setSearchParams]);

  // Update favourite state when URL params change
  useEffect(() => {
    const favoritesParam = searchParams.get('favorites');
    const newFavouriteState = favoritesParam === 'true';
    setFavourite(newFavouriteState);
    setShowFavoritesOnly(newFavouriteState);
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/products');
        if (response.data.success) {
          setProducts(response.data.data.data);
          setFilteredProducts(response.data.data.data);
          console.log('Fetched products:', response.data.data.data);
        } else {
          setError('Failed to fetch products');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Something went wrong while fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Watch for changes in favourite state from Navbar
  useEffect(() => {
    setShowFavoritesOnly(favourite);
  }, [favourite]);

  // Apply filters whenever filters, searchTerm, or showFavoritesOnly changes
  useEffect(() => {
    let filtered = [...products]; // Create a copy to avoid mutating original array

    // Apply favorites filter first if enabled
    if (showFavoritesOnly) {
      // Filter products based on product.favorite property
      filtered = filtered.filter(product => product.favorite === true);
    }

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(product => {
        // Search in name
        if (product.name?.toLowerCase().includes(searchLower)) return true;
        
        // Search in description
        if (product.description?.toLowerCase().includes(searchLower)) return true;
        
        // Search in brand
        if (product.brand?.toLowerCase().includes(searchLower)) return true;
        
        // Search in categories (handle array of categories)
        if (Array.isArray(product.category)) {
          return product.category.some(cat => cat.toLowerCase().includes(searchLower));
        } else if (product.category?.toLowerCase().includes(searchLower)) {
          return true;
        }
        
        return false;
      });
    }

    // Apply price filter
    filtered = filtered.filter(product => {
      const price = product.price || 0;
      return price >= filters.priceMin && price <= filters.priceMax;
    });

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(product => {
        if (Array.isArray(product.category)) {
          return product.category.includes(filters.category);
        }
        return product.category === filters.category;
      });
    }

    // Apply condition filter
    if (filters.condition) {
      filtered = filtered.filter(product => product.condition === filters.condition);
    }

    // Apply brand filter
    if (filters.brand) {
      filtered = filtered.filter(product => product.brand === filters.brand);
    }

    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter(product => product.location === filters.location);
    }

    console.log('Applied filters:', filters);
    console.log('Show favorites only:', showFavoritesOnly);
    console.log('Filtered products count:', filtered.length);
    setFilteredProducts(filtered);
  }, [products, filters, searchTerm, showFavoritesOnly]);

  // Use useCallback to memoize the handler function
  const handleFiltersChange = useCallback((newFilters) => {
    console.log('Filters changed:', newFilters);
    setFilters(newFilters);
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleClearAll = useCallback(() => {
    handleClearSearch();
    // Reset filters by calling with default values
    const prices = products.map(p => p.price || 0).filter(p => p > 0);
    const minLimit = prices.length > 0 ? Math.min(...prices) : 0;
    const maxLimit = prices.length > 0 ? Math.max(...prices) : 10000;
    setFilters({
      priceMin: minLimit,
      priceMax: maxLimit,
      category: '',
      condition: '',
      brand: '',
      location: ''
    });
    // Also reset favorites filter
    setFavourite(false);
  }, [products]);

  return (
    <div className="h-screen w-screen bg-gray-50 flex flex-col">
      <Navbar favourite={favourite} setFavourite={setFavourite} />

      <div className="flex flex-1 p-4 gap-4 overflow-hidden">
        {/* Filters Sidebar */}
        <div className="flex-shrink-0">
          <Filters products={products} onFiltersChange={handleFiltersChange} />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col bg-white rounded-lg shadow-sm">
          {/* Search Bar - Fixed Header */}
          <div className="flex-shrink-0 p-6 pb-4 border-b border-gray-200">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-[#6F9674]">
                {showFavoritesOnly ? 'FAVORITE PRODUCTS' : 'POPULAR PRODUCTS'}
              </h2>
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <span>Showing {filteredProducts.length} of {products.length} products</span>
                {(searchTerm || showFavoritesOnly || Object.values(filters).some(f => f && f !== 0 && f !== 10000)) && (
                  <button
                    onClick={handleClearAll}
                    className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-600"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>
            
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#81AD87] w-5 h-5" />
              <input
                type="text"
                placeholder="Search products by name, brand, category..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-10 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#81AD87] focus:border-transparent transition-all duration-200"
              />
              {searchTerm && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 w-5 h-5 flex items-center justify-center"
                >
                  ✕
                </button>
              )}
            </div>
            
            {/* Active Filters Display */}
            {(searchTerm || showFavoritesOnly || Object.entries(filters).some(([key, value]) => 
              value && value !== '' && !(key === 'priceMin' && value === 0) && !(key === 'priceMax' && value === 10000)
            )) && (
              <div className="mt-3 flex flex-wrap gap-2">
                {searchTerm && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[#EDF4ED] text-[#6F9674]">
                    Search: "{searchTerm}"
                    <button onClick={handleClearSearch} className="ml-1 hover:text-red-600">✕</button>
                  </span>
                )}
                {showFavoritesOnly && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[#FFF0F0] text-[#DC2626]">
                    ❤️ Favorites Only
                    <button onClick={() => setFavourite(false)} className="ml-1 hover:text-red-600">✕</button>
                  </span>
                )}
                {filters.category && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[#EDF4ED] text-[#6F9674]">
                    Category: {filters.category}
                  </span>
                )}
                {filters.brand && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[#EDF4ED] text-[#6F9674]">
                    Brand: {filters.brand}
                  </span>
                )}
                {filters.condition && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[#EDF4ED] text-[#6F9674]">
                    Condition: {filters.condition}
                  </span>
                )}
                {filters.location && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[#EDF4ED] text-[#6F9674]">
                    Location: {filters.location}
                  </span>
                )}
                {(filters.priceMin > 0 || filters.priceMax < 10000) && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[#EDF4ED] text-[#6F9674]">
                    Price: ₹{filters.priceMin.toLocaleString("en-IN")} - ₹{filters.priceMax.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Products Grid - Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6F9674] mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading products...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <div className="text-red-500 text-lg mb-2">⚠️ Error</div>
                  <p className="text-red-500">{error}</p>
                  <button 
                    onClick={() => window.location.reload()} 
                    className="mt-4 px-4 py-2 bg-[#6F9674] text-white rounded-lg hover:bg-[#5a7a5f]"
                  >
                    Retry
                  </button>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">
                    {showFavoritesOnly ? '💔' : '🔍'}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    {showFavoritesOnly ? 'No favorite products found' : 'No products found'}
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {showFavoritesOnly ? 
                      'You haven\'t added any products to your favorites yet' :
                      searchTerm ? 
                        `No products match "${searchTerm}" with current filters` : 
                        'No products match your current filters'
                    }
                  </p>
                  <div className="text-gray-400 text-sm">
                    <p>Try:</p>
                    <ul className="mt-2 space-y-1">
                      {showFavoritesOnly ? (
                        <>
                          <li>• Browse products and add some to favorites</li>
                          <li>• Check out our popular products</li>
                        </>
                      ) : (
                        <>
                          <li>• Adjusting your price range</li>
                          <li>• Selecting different categories or brands</li>
                          <li>• Using different search terms</li>
                          <li>• Clearing all filters</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <div key={product._id} className="h-full">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};