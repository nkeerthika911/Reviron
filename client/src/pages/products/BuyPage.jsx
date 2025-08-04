import React from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '../Navbar';
import { Buynow } from './components/Buynow';

export const BuyPage = () => {
  const location = useLocation();
  const product = location.state?.product;

  return (
    <div className="min-h-screen bg-[#f6faf5] flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-start justify-center py-8 animate-fade-in-smooth">
        <Buynow product={product} />
      </div>
      <style>{`
        @keyframes fade-in-smooth {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-smooth {
          animation: fade-in-smooth 0.6s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </div>
  );
};
