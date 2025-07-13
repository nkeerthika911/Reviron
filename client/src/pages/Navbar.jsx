import React from 'react'
import {useState} from 'react';
import logo from "../assets/RevironLogo.png";
import userIcon from "../assets/user-icon.jpg";

export const Navbar = () => {
  const [activePage, setActivePage] = useState('Home');
  

  const navItems = [
    {
      label: 'Home',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9,22 9,12 15,12 15,22"/>
        </svg>
      ),
      path: '/home'
    },
    {
      label: 'Products',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
      ),
      path: '/products'
    },
    {
      label: 'Sell',
      icon: (
<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#ffffff"><path d="M843-399 562-117q-11 11-24 16t-27 5q-14 0-27-5t-24-16L116.7-460.3Q106-471 101-483.89T96-511v-281q0-29.7 21.15-50.85Q138.3-864 168-864h281q13.91 0 26.96 5 13.04 5 23.77 15.7L843-500q11 11 16 23.5t5 26.5q0 14-5.02 27.09Q853.96-409.83 843-399ZM511-168l281-281-343-343H168v281l343 343ZM264-636q25 0 42.5-17.5T324-696q0-25-17.5-42.5T264-756q-25 0-42.5 17.5T204-696q0 25 17.5 42.5T264-636Zm216 156Z"/></svg>
      ),
      path: '/sell'
    },
    {
      label: 'Community',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      path: '/community'
    },
    {
      label: 'Contact Us',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      path: '/contact'
    }
  ];

  const actionItems = [
    {
      label: 'Favorites',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      ),
      path: '/favorites'
    },
    {
      label: 'Cart',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="21" r="1"/>
          <circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
      ),
      path: '/cart'
    }
  ];

  const handleNavClick = (label) => {
    setActivePage(label);
  };

  return (
    <div className='sticky top-[1rem] flex bg-[#81AD87] rounded-[50px] w-[calc(100vw-4rem)] h-[9vh] mx-auto shadow-lg border border-white/20 mb-5'>
      {/* Logo Section */}
      <div className='flex-1 h-full flex items-center'>
        <img 
          src={logo} 
          alt="Logo" 
          className='h-[100%] w-auto transition-transform duration-300 cursor-pointer'
        />
      </div>
      
      {/* Navigation and Actions Container */}
      <div className='flex items-center'>
        {/* Main Navigation */}
        <div className='flex items-center space-x-12 px-4'>
          {navItems.map((item) => (
            <div 
              key={item.label}
              onClick={() => handleNavClick(item.label)}
              className={`
                relative flex items-center space-x-2 px-4 py-2 rounded-full cursor-pointer
                transition-all duration-300 ease-in-out
                ${activePage === item.label 
                  ? 'bg-white/20 text-white shadow-md' 
                  : 'text-white/90 hover:bg-white/10 hover:text-white'
                }
                hover:scale-105 active:scale-95
              `}
            >
              <span className="transition-transform duration-300 group-hover:rotate-12">
                {item.icon}
              </span>
              <span className="font-medium text-sm whitespace-nowrap">
                {item.label}
              </span>
              
              {/* Active indicator */}
              {activePage === item.label && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
              )}
            </div>
          ))}
        </div>

        {/* Action Items */}
        <div className='flex items-center space-x-8 px-4'>
          {actionItems.map((item) => (
            <div 
              key={item.label}
              className='
                relative p-2 rounded-full cursor-pointer
                text-white/90 hover:text-white hover:bg-white/10
                transition-all duration-300 ease-in-out
                hover:scale-110 active:scale-95
                group
              '
              title={item.label}
            >
              <span className="transition-transform duration-300 group-hover:rotate-12">
                {item.icon}
              </span>
              
              {/* Tooltip */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Profile Section */}
        <div className='flex items-center pr-2 pl-3'>
          <div className='
            relative rounded-full cursor-pointer
            bg-white/10 hover:bg-white/20
            transition-all duration-300 ease-in-out
            hover:scale-110 active:scale-95
            group
          '>
            <img 
              src={userIcon} 
              alt="Profile" 
              className='h-[100%] w-[3vw] rounded-full transition-transform duration-300 group-hover:rotate-12'
            />
                        
            {/* Tooltip */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Profile
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
