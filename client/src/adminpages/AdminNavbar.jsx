import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from "../assets/RevironLogo.png";
import userIcon from "../assets/user-icon.jpg";

export const AdminNavbar = () => {
    const [activePage, setActivePage] = useState();
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        {
            label: 'Add Product',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
            ),
            selectedIcon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 4v16m8-8H4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            ),
            path: '/add-product'
        },
        {
            label: 'Requests',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8a9 9 0 110-18 9 9 0 010 18z" />
                </svg>
            ),
            selectedIcon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 8h10M7 12h4m1 8a9 9 0 110-18 9 9 0 010 18z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            ),
            path: '/requests'
        }
    ];

    const actionItems = [
        {
            label: 'Favorites',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 20.325q-.35 0-.712-.125t-.638-.4l-1.725-1.575q-2.65-2.425-4.788-4.812T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.325 0 2.5.562t2 1.538q.825-.975 2-1.537t2.5-.563q2.35 0 3.925 1.575T22 8.15q0 2.875-2.125 5.275T15.05 18.25l-1.7 1.55q-.275.275-.637.4t-.713.125M11.05 6.75q-.725-1.025-1.55-1.563t-2-.537q-1.5 0-2.5 1t-1 2.5q0 1.3.925 2.763t2.213 2.837t2.65 2.575T12 18.3q.85-.775 2.213-1.975t2.65-2.575t2.212-2.837T20 8.15q0-1.5-1-2.5t-2.5-1q-1.175 0-2 .538T12.95 6.75q-.175.25-.425.375T12 7.25t-.525-.125t-.425-.375m.95 4.725" /></svg>
            ),
            selectedIcon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 20.325q-.35 0-.712-.125t-.638-.4l-1.725-1.575q-2.65-2.425-4.788-4.812T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.325 0 2.5.562t2 1.538q.825-.975 2-1.537t2.5-.563q2.35 0 3.925 1.575T22 8.15q0 2.875-2.125 5.275T15.05 18.25l-1.7 1.55q-.275.275-.637.4t-.713.125" /></svg>
            ),
            path: '/favorites'
        },
        {
            label: 'Cart',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M17 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2M1 2h3.27l.94 2H20a1 1 0 0 1 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1l-.9 1.63l-.03.12a.25.25 0 0 0 .25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96l1.36-2.45L3 4H1zm6 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2m9-7l2.78-5H6.14l2.36 5z" /></svg>
            ),
            selectedIcon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M17 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2M1 2v2h2l3.6 7.59l-1.36 2.45c-.15.28-.24.61-.24.96a2 2 0 0 0 2 2h12v-2H7.42a.25.25 0 0 1-.25-.25q0-.075.03-.12L8.1 13h7.45c.75 0 1.41-.42 1.75-1.03l3.58-6.47c.07-.16.12-.33.12-.5a1 1 0 0 0-1-1H5.21l-.94-2M7 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2" /></svg>
            ),
            path: '/cart'
        }
    ];

    const handleNavClick = (label) => {
        setActivePage(label);
        const item = [...navItems, ...actionItems].find(i => i.label === label);
        if (item?.path) {
            navigate(item.path);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log('Search query:', searchQuery);
    };

    return (
        <>
            {/* Desktop Layout */}
            <div className='hidden lg:block  w-[100vw]'>
                <div className='bg-[#81AD87] h-[9vh] shadow-lg border border-white/20 flex'>
                    {/* Logo Section */}
                    <div className='flex-1 h-full flex items-center pl-4'>
                        <div className='h-15 w-15 rounded-full flex items-center justify-center '>
                            <img src={logo} alt='Logo' className='text-[#81AD87] font-bold text-xl' />
                        </div>
                    </div>

                    {/* Navigation and Actions Container */}
                    <div className='flex items-center'>
                        {/* Main Navigation */}
                        <div className='flex items-center'>
                            {/* Main Navigation */}
                            <div className='flex items-center space-x-8 px-4'>
                                {navItems.map((item) => (
                                    <div
                                        key={item.label}
                                        onClick={() => handleNavClick(item.label)}
                                        className={`
      flex items-center space-x-2 px-4 py-2 rounded-full cursor-pointer
      transition-all duration-300 ease-in-out
      text-white/90 hover:bg-white/10 hover:text-white
      hover:scale-105 active:scale-95
    `}
                                    >
                                        <span className="transition-all duration-300">
                                            {activePage === item.label || location.pathname === item.path
                                                ? item.selectedIcon
                                                : item.icon}
                                        </span>
                                        <span
                                            className={`text-sm whitespace-nowrap transition-all duration-300 ${activePage === item.label || location.pathname === item.path
                                                ? 'font-semibold'
                                                : 'font-normal'
                                                }`}
                                        >
                                            {item.label}
                                        </span>
                                    </div>
                                ))}

                            </div>

                            {/* Action Items */}
                            <div className='flex items-center space-x-6 px-4'>
                                {actionItems.map((item) => (
                                    <div
                                        key={item.label}
                                        onClick={() => handleNavClick(item.label)}
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
                                            {activePage === item.label ? item.selectedIcon : item.icon}
                                        </span>

                                        {/* <div className="absolute -top-8 left-1/2 transform translate-y-1/4 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                            {item.label}
                                        </div> */}
                                    </div>
                                ))}
                            </div>
                        </div>


                        {/* Profile Section */}
                        <div className='flex items-center pr-4 pl-2'>
                            <div
                                className='
                                relative rounded-full cursor-pointer
                                bg-white/10 hover:bg-white/20
                                transition-all duration-300 ease-in-out
                            '
                                onClick={() => navigate('/Profile')}
                                title="Profile"
                            >
                                <div className='h-12 w-12 bg-white rounded-full flex items-center justify-center'>
                                    <img src={userIcon} alt='Logo' className='text-[#81AD87] font-bold text-xl rounded-full' />
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
                    <div
                        className='h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0'
                        onClick={() => navigate('/Profile')}
                        title="Profile"
                    >
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
                    ].map(({ label, icon, selectedIcon }) => (
                        <div
                            key={label}
                            onClick={() => handleNavClick(label)}
                            className={`
                    flex flex-col items-center space-y-1 cursor-pointer transition-all duration-300
                    ${activePage === label ? 'text-white font-semibold' : 'text-white/70'}
                `}
                        >
                            {activePage === label ? selectedIcon : icon}
                            <span className="text-xs">{label}</span>
                        </div>
                    ))}
                </div>
            </div>


        </>
    );
};