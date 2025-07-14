import React from 'react'
import { useState } from 'react';
import logo from "../assets/RevironLogo.png";
import userIcon from "../assets/user-icon.jpg";

export const Navbar = () => {
    const [activePage, setActivePage] = useState('Products');
    const [searchQuery, setSearchQuery] = useState('');

    const navItems = [
        {
            label: 'Products',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
            ),
            path: '/products'
        },
        {
            label: 'Sell',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 -960 960 960" fill="currentColor">
                    <path d="M843-399 562-117q-11 11-24 16t-27 5q-14 0-27-5t-24-16L116.7-460.3Q106-471 101-483.89T96-511v-281q0-29.7 21.15-50.85Q138.3-864 168-864h281q13.91 0 26.96 5 13.04 5 23.77 15.7L843-500q11 11 16 23.5t5 26.5q0 14-5.02 27.09Q853.96-409.83 843-399ZM511-168l281-281-343-343H168v281l343 343ZM264-636q25 0 42.5-17.5T324-696q0-25-17.5-42.5T264-756q-25 0-42.5 17.5T204-696q0 25 17.5 42.5T264-636Z" />
                </svg>
            ),
            path: '/sell'
        },
        {
            label: 'Community',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            ),
            path: '/community'
        },
        {
            label: 'Contact Us',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
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
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
            ),
            path: '/favorites'
        },
        {
            label: 'Cart',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
            ),
            path: '/cart'
        }
    ];

    const handleNavClick = (label) => {
        setActivePage(label);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Handle search functionality here
        console.log('Search query:', searchQuery);
    };

    return (
        <>
            {/* Desktop Layout */}
            <div className='hidden lg:block sticky top-[1rem] mx-auto w-[calc(100vw-2rem)] lg:w-[calc(100vw-4rem)] mb-5'>
                <div className='bg-[#81AD87] rounded-[50px] h-[9vh] shadow-lg border border-white/20 flex'>
                    {/* Logo Section */}
                    <div className='flex-1 h-full flex items-center pl-4'>
                        <div className='h-12 w-12 bg-white rounded-full flex items-center justify-center'>
                            <img src={logo} alt='Logo' className='text-[#81AD87] font-bold text-xl' />
                        </div>
                    </div>

                    {/* Navigation and Actions Container */}
                    <div className='flex items-center'>
                        {/* Main Navigation */}
                        <div className='flex items-center space-x-8 px-4'>
                            {navItems.map((item) => (
                                <div
                                    key={item.label}
                                    onClick={() => handleNavClick(item.label)}
                                    className={`
                                        relative flex items-center space-x-2 px-4 py-2 rounded-full cursor-pointer
                                        transition-all duration-300 ease-in-out
                                        ${activePage === item.label
                                            ? 'bg-white text-[#81AD87] shadow-lg border border-white/30 transform scale-105'
                                            : 'text-white/90 hover:bg-white/10 hover:text-white'
                                        }
                                        hover:scale-105 active:scale-95
                                    `}
                                >
                                    <span className={`transition-all duration-300 ${activePage === item.label ? 'text-[#81AD87]' : ''}`}>
                                        {item.icon}
                                    </span>
                                    <span className={`font-semibold text-sm whitespace-nowrap transition-all duration-300 ${activePage === item.label ? 'text-[#81AD87] font-bold' : ''}`}>
                                        {item.label}
                                    </span>

                                    {activePage === item.label && (
                                        <>
                                            <div className="absolute inset-0 rounded-full bg-white/20 blur-md"></div>
                                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white rounded-full shadow-md"></div>
                                            <div className="absolute inset-0 rounded-full bg-white/10 animate-pulse"></div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Action Items */}
                        <div className='flex items-center space-x-6 px-4'>
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

                                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                        {item.label}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Profile Section */}
                        <div className='flex items-center pr-4 pl-2'>
                            <div className='
                                relative rounded-full cursor-pointer
                                bg-white/10 hover:bg-white/20
                                transition-all duration-300 ease-in-out
                                hover:scale-110 active:scale-95
                                group
                            '>
                                <div className='h-10 w-10 bg-white rounded-full flex items-center justify-center'>
                                    <span className='text-[#81AD87] font-bold text-lg'>U</span>
                                </div>

                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                    Profile
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile/Tablet Layout - Clean White Header */}
            <div className='lg:hidden sticky top-0 bg-white p-4.5 shadow z-50 w-full'>
                <div className='flex items-center space-x-3'>
                    {/* Search Bar */}
                    <div className='flex-1'>
                        <div className='relative'>
                            <svg
                                className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400'
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit(e)}
                                placeholder="Search..."
                                className='w-full pl-9 pr-4 py-2.5 bg-gray-50 text-gray-700 rounded-full border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#81AD87] focus:border-[#81AD87] placeholder-gray-500 text-sm'
                            />
                        </div>
                    </div>

                    {/* Profile */}
                    <div className='h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0'>
                        <img src={userIcon} alt='User Icon' className='rounded-full w-10 h-10 object-cover' />
                    </div>
                </div>
            </div>

            {/* Mobile Footer - Only visible on mobile/tablet */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#81AD87] shadow-lg border-t border-white/20 z-50 rounded-t-[1rem]">
                <div className="flex items-center justify-around py-3 px-2">
                    {[
                        // pick only these from navItems
                        ...navItems.filter(item =>
                            ['Products', 'Sell', 'Community'].includes(item.label)
                        ),
                        // pick these from actionItems
                        ...actionItems // already only Favorites + Cart
                    ].map(({ label, icon, path }) => (
                        <div
                            key={label}
                            onClick={() => handleNavClick(label)}
                            className={`
          flex flex-col items-center space-y-1 cursor-pointer transition-all duration-300
          ${activePage === label ? 'text-white' : 'text-white/70'}
        `}
                        >
                            {icon}
                            <span className="text-xs">{label}</span>
                        </div>
                    ))}
                </div>
            </div>

        </>
    );
};