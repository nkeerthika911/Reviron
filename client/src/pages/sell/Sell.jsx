import React,{useState} from 'react'
import { Navbar } from '../Navbar'
import { ProductCard } from '../products/components/ProductCard';
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
export const Sell = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => setShowForm(!showForm);

  return (
    <div className="h-screen w-screen bg-gray-50 flex flex-col relative ">
      <Navbar />
      <div className="flex p-4 w-full h-full overflow-hidden">
        <div className="w-full h-full flex-1 overflow-y-auto">
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {/* Popular Products Header */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">POPULAR PRODUCTS</h2>
              </div>

              {/* Products Grid */}
              <div className={`grid grid-cols-1 md:grid-cols-2 ${showForm?'lg:grid-cols-3':'lg:grid-cols-4'} gap-6`}>
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Second Section (Form) */}
        {showForm && (
          <div className="bg-white border-l border-gray-300 w-[40vw] h-full p-6 overflow-y-auto relative">
            <button
              onClick={toggleForm}
              className="absolute top-4 right-4 text-xl font-bold text-gray-600 hover:text-red-500"
            >
              ×
            </button>
            <h2 className="text-lg font-semibold mb-4">Add New Product</h2>
            <form className="flex flex-col space-y-4">
              <input type="text" placeholder="Enter product name" className="p-3 rounded-[10px] bg-white shadow-[0_2px_8px_rgba(1,0,0,0.3)] focus:outline-none" />
              <input type="text" placeholder="Enter your location" className="p-3 rounded-[10px] bg-white shadow-[0_2px_8px_rgba(1,0,0,0.3)] focus:outline-none" />
              <input type="text" placeholder="Category" className="p-3 rounded-[10px] bg-white shadow-[0_2px_8px_rgba(1,0,0,0.3)] focus:outline-none" />
              <select className="p-3 rounded-[10px] bg-white shadow-[0_2px_8px_rgba(1,0,0,0.3)] focus:outline-none">
                <option value="">Select condition</option>
                <option value="new">New</option>
                <option value="second">Second</option>
              </select>
              <select className="p-3 rounded-[10px] bg-white shadow-[0_2px_8px_rgba(1,0,0,0.3)] focus:outline-none">
                <option value="">Working or Not</option>
                <option value="working">Working</option>
                <option value="not-working">Not Working</option>
              </select>
              <textarea placeholder="Description" className="p-3 rounded-[10px] bg-white shadow-[0_2px_8px_rgba(1,0,0,0.3)] focus:outline-none" />
              <input type="file" className="border p-2 rounded" />
              <button type="submit" className="bg-[#6F9674] text-white py-2 rounded hover:bg-[#73B87C]">
                Add Product
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Floating "+" Button */}
      {!showForm && (
        <button
          onClick={toggleForm}
          className="fixed bottom-6 right-6 bg-[#73B87C] text-white rounded-full w-14 h-14 text-3xl shadow-lg transition-colors delay-500 hover:bg-[#6F9674]"
        >
          +
        </button>
      )}
    </div>
  );
};