
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
            label: 'Orders',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m691-150 139-138-42-42-97 95-39-39-42 43 81 81ZM240-600h480v-80H240v80ZM720-40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40ZM120-80v-680q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v267q-19-9-39-15t-41-9v-243H200v562h243q5 31 15.5 59T486-86l-6 6-60-60-60 60-60-60-60 60-60-60-60 60Zm120-200h203q3-21 9-41t15-39H240v80Zm0-160h284q38-37 88.5-58.5T720-520H240v80Zm-40 242v-562 562Z"/></svg>            ),
            selectedIcon: (
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m691-150 139-138-42-42-97 95-39-39-42 43 81 81ZM240-600h480v-80H240v80ZM720-40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40ZM120-80v-680q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v267q-19-9-39-15t-41-9v-243H200v562h243q5 31 15.5 59T486-86l-6 6-60-60-60 60-60-60-60 60-60-60-60 60Zm120-200h203q3-21 9-41t15-39H240v80Zm0-160h284q38-37 88.5-58.5T720-520H240v80Zm-40 242v-562 562Z"/></svg>            ),
            path: '/admin/orders'  // Added leading slash
        },
        {
            label: 'Add Product',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
            ),
            selectedIcon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 4v16m8-8H4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            path: '/admin/product/add'  // Added leading slash
        },
        {
            label: 'Collection Requests',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff">
                    <path d="M240-160q-50 0-85-35t-35-85H40v-440q0-33 23.5-56.5T120-800h560v160h120l120 160v200h-80q0 50-35 85t-85 35q-50 0-85-35t-35-85H360q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T280-280q0-17-11.5-28.5T240-320q-17 0-28.5 11.5T200-280q0 17 11.5 28.5T240-240ZM120-360h32q17-18 39-29t49-11q27 0 49 11t39 29h272v-360H120v360Zm600 120q17 0 28.5-11.5T760-280q0-17-11.5-28.5T720-320q-17 0-28.5 11.5T680-280q0 17 11.5 28.5T720-240Zm-40-200h170l-90-120h-80v120Z" />
                </svg>
            ),
            selectedIcon: (
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff" stroke="#ffffff" strokeWidth="40">
                    <path d="M240-160q-50 0-85-35t-35-85H40v-440q0-33 23.5-56.5T120-800h560v160h120l120 160v200h-80q0 50-35 85t-85 35q-50 0-85-35t-35-85H360q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T280-280q0-17-11.5-28.5T240-320q-17 0-28.5 11.5T200-280q0 17 11.5 28.5T240-240ZM120-360h32q17-18 39-29t49-11q27 0 49 11t39 29h272v-360H120v360Zm600 120q17 0 28.5-11.5T760-280q0-17-11.5-28.5T720-320q-17 0-28.5 11.5T680-280q0 17 11.5 28.5T720-240Zm-40-200h170l-90-120h-80v120Z" />
                </svg>
            ),
            path: '/admin/order'
        }
    ];

    const handleNavClick = (label) => {
        setActivePage(label);
        const item = navItems.find(i => i.label === label);
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
            <div className='hidden lg:block w-[100vw]'>
                <div className='bg-[#81AD87] h-[9vh] shadow-lg border border-white/20 flex'>
                    <div className='flex-1 h-full flex items-center pl-4'>
                        <div className='h-15 w-15 rounded-full flex items-center justify-center'>
                            <img src={logo} alt='Logo' className='text-[#81AD87] font-bold text-xl' />
                        </div>
                    </div>

                    <div className='flex items-center'>
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
                                    <span>
                                        {activePage === item.label || location.pathname === item.path
                                            ? item.selectedIcon
                                            : item.icon}
                                    </span>
                                    <span className={`text-sm whitespace-nowrap ${activePage === item.label || location.pathname === item.path ? 'font-semibold' : 'font-normal'}`}>
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Profile Icon */}
                        <div className='flex items-center pr-4 pl-2'>
                            <div
                                className='relative rounded-full cursor-pointer bg-white/10 hover:bg-white/20 transition-all duration-300 ease-in-out'
                                onClick={() => navigate('/Profile')}
                                title="Profile"
                            >
                                <div className='h-12 w-12 bg-white rounded-full flex items-center justify-center'>
                                    <img src={userIcon} alt='Logo' className='rounded-full' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Header */}
            <div className='lg:hidden sticky top-0 bg-white p-4.5 shadow z-50 w-full'>
                <div className='flex items-center space-x-3'>
                    <div className='flex-1'>
                        <div className='relative'>
                            <svg className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

                    <div
                        className='h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0'
                        onClick={() => navigate('/Profile')}
                        title="Profile"
                    >
                        <img src={userIcon} alt='User Icon' className='rounded-full w-10 h-10 object-cover' />
                    </div>
                </div>
            </div>

            {/* Mobile Footer Navigation (optional, now empty) */}
            {/* You can completely delete this block if not needed */}
        </>
    );
};