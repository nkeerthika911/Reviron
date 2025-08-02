    import React from 'react'
    import { useState, useEffect } from 'react';
    import { useNavigate, useLocation } from 'react-router-dom';
    import logo from "../assets/RevironLogo.png";
    import userIcon from "../assets/user-icon.jpg";
    import axios from 'axios';
    import { jwtDecode } from "jwt-decode";
    import { Profile } from './profile/Profile'

    export const Navbar = ({ favourite = false, setFavourite = () => { } }) => {
        const [activePage, setActivePage] = useState();
        const [searchQuery, setSearchQuery] = useState('');
        const navigate = useNavigate();
        const location = useLocation();
        const [user, setUser] = useState(null);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);
        const [showProfile, setShowProfile] = useState(false);

        const getUserIdFromToken = () => {
            const token = localStorage.getItem("jwt");
            if (!token) return null;

            try {
                const decoded = jwtDecode(token);
                return decoded.userId || null;
            } catch (err) {
                console.error("Invalid JWT token", err);
                return null;
            }
        };
        const userId = getUserIdFromToken();; // Replace with actual user ID
        console.log(userId);
        const navItems = [
            {
                label: 'Products',
                icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 48 48">
                        <g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="4">
                            <path d="M6 12.6V41a2 2 0 0 0 2 2h32a2 2 0 0 0 2-2V12.6z" />
                            <path stroke-linecap="round" d="M42 12.6L36.333 5H11.667L6 12.6v0m25.555 6.6c0 4.198-3.382 7.6-7.555 7.6s-7.556-3.402-7.556-7.6" />
                        </g>
                    </svg>
                ),
                selectedIcon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 48 48"><defs><mask id="ipSMallBag0"><g fill="none" stroke-linejoin="round" stroke-width="4"><path fill="#fff" stroke="#fff" d="M6 12.6V41a2 2 0 0 0 2 2h32a2 2 0 0 0 2-2V12.6z" /><path stroke="#fff" stroke-linecap="round" d="M42 12.6L36.333 5H11.667L6 12.6v0" /><path stroke="#000" stroke-linecap="round" d="M31.555 19.2c0 4.198-3.382 7.6-7.555 7.6s-7.556-3.402-7.556-7.6" /></g></mask></defs><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSMallBag0)" /></svg>
                ),
                path: '/products'
            },
            {
                label: 'Sell',
                icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m21.4 14.25l-7.15 7.15q-.3.3-.675.45t-.75.15t-.75-.15t-.675-.45l-8.825-8.825q-.275-.275-.425-.637T2 11.175V4q0-.825.588-1.412T4 2h7.175q.4 0 .775.163t.65.437l8.8 8.825q.3.3.438.675t.137.75t-.137.738t-.438.662M12.825 20l7.15-7.15L11.15 4H4v7.15zM6.5 8q.625 0 1.063-.437T8 6.5t-.437-1.062T6.5 5t-1.062.438T5 6.5t.438 1.063T6.5 8m5.5 4" /></svg>
                ),
                selectedIcon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m21.4 14.25l-7.15 7.15q-.3.3-.675.45t-.75.15t-.75-.15t-.675-.45l-8.825-8.825q-.275-.275-.425-.637T2 11.175V4q0-.825.588-1.412T4 2h7.175q.4 0 .775.163t.65.437l8.8 8.825q.3.3.438.675t.137.75t-.137.738t-.438.662M6.5 8q.625 0 1.063-.437T8 6.5t-.437-1.062T6.5 5t-1.062.438T5 6.5t.438 1.063T6.5 8" /></svg>
                ),
                path: '/sell'
            },
            {
                label: 'Community',
                icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16.67 13.13C18.04 14.06 19 15.32 19 17v3h4v-3c0-2.18-3.57-3.47-6.33-3.87M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4c-.47 0-.91.1-1.33.24a5.98 5.98 0 0 1 0 7.52c.42.14.86.24 1.33.24m-6 0c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m0-6c1.1 0 2 .9 2 2s-.9 2-2 2s-2-.9-2-2s.9-2 2-2m0 7c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4m6 5H3v-.99C3.2 16.29 6.3 15 9 15s5.8 1.29 6 2z" /></svg>
                ),
                selectedIcon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M16.67 13.13C18.04 14.06 19 15.32 19 17v3h3c.55 0 1-.45 1-1v-2c0-2.18-3.57-3.47-6.33-3.87" /><circle cx="9" cy="8" r="4" fill="currentColor" fill-rule="evenodd" /><path fill="currentColor" fill-rule="evenodd" d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4c-.47 0-.91.1-1.33.24a5.98 5.98 0 0 1 0 7.52c.42.14.86.24 1.33.24m-6 1c-2.67 0-8 1.34-8 4v2c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-2c0-2.66-5.33-4-8-4" /></svg>
                ),
                path: '/community'
            },
            {
                label: 'Contact Us',
                icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 14 14"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M3 7V4.37A3.93 3.93 0 0 1 7 .5a3.93 3.93 0 0 1 4 3.87V7M1.5 5.5h1A.5.5 0 0 1 3 6v3a.5.5 0 0 1-.5.5h-1a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1m11 4h-1A.5.5 0 0 1 11 9V6a.5.5 0 0 1 .5-.5h1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1M9 12.25a2 2 0 0 0 2-2V8m-2 4.25a1.25 1.25 0 0 1-1.25 1.25h-1.5a1.25 1.25 0 0 1 0-2.5h1.5A1.25 1.25 0 0 1 9 12.25" stroke-width="1" /></svg>
                ),
                selectedIcon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 14 14"><path fill="currentColor" fill-rule="evenodd" d="M6.987 1.5A3.18 3.18 0 0 0 3.75 4.628V9a1 1 0 0 1-1 1H1.5A1.5 1.5 0 0 1 0 8.5v-2A1.5 1.5 0 0 1 1.5 5h.75v-.39A4.68 4.68 0 0 1 7 0a4.68 4.68 0 0 1 4.75 4.61V5h.75A1.5 1.5 0 0 1 14 6.5v2a1.5 1.5 0 0 1-1.5 1.5h-.75v.5a2.75 2.75 0 0 1-2.44 2.733A1.5 1.5 0 0 1 8 14H6.5a1.5 1.5 0 0 1 0-3H8c.542 0 1.017.287 1.28.718a1.25 1.25 0 0 0 .97-1.218V4.627A3.18 3.18 0 0 0 6.987 1.5" clip-rule="evenodd" /></svg>
                ),
                path: '/contactus'
            }
        ];

        const actionItems = [
            {
                label: 'Favorites',
                icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 20.325q-.35 0-.712-.125t-.638-.4l-1.725-1.575q-2.65-2.425-4.788-4.812T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.325 0 2.5.562t2 1.538q.825-.975 2-1.537t2.5-.563q2.35 0 3.925 1.575T22 8.15q0 2.875-2.125 5.275T15.05 18.25l-1.7 1.55q-.275.275-.637.4t-.713.125M11.05 6.75q-.725-1.025-1.55-1.563t-2-.537q-1.5 0-2.5 1t-1 2.5q0 1.3.925 2.763t2.213 2.837t2.65 2.575T12 18.3q.85-.775 2.213-1.975t2.65-2.575t2.212-2.837T20 8.15q0-1.5-1-2.5t-2.5-1q-1.175 0-2 .538T12.95 6.75q-.175.25-.425.375T12 7.25t-.525-.125t-.425-.375m.95 4.725" />
                    </svg>
                ),
                selectedIcon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 20.325q-.35 0-.712-.125t-.638-.4l-1.725-1.575q-2.65-2.425-4.788-4.812T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.325 0 2.5.562t2 1.538q.825-.975 2-1.537t2.5-.563q2.35 0 3.925 1.575T22 8.15q0 2.875-2.125 5.275T15.05 18.25l-1.7 1.55q-.275.275-.637.4t-.713.125" />
                    </svg>
                ),
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

        useEffect(() => {
            const fetchUserDetails = async () => {
                try {
                    setLoading(true);
                    const response = await axios.get(`http://localhost:5000/api/user/details/${userId}`);

                    if (response.data.success) {
                        const userData = response.data.data.data;
                        console.log("User data: ", response.data.data.data);
                        setUser(userData);
                        console.log("Fetched user:", userData);
                    } else {
                        setError("Failed to fetch user details");
                    }
                } catch (err) {
                    console.error("Error fetching user details:", err);
                    setError("Something went wrong while fetching user details");
                } finally {
                    setLoading(false);
                }
            };

            fetchUserDetails();
        }, []);


        const handleNavClick = (label) => {
            if (label === 'Favorites') {
                console.log('Favorites clicked! Current path:', location.pathname);
                console.log('Current favourite state:', favourite);

                // Check if we're currently on the products page
                if (location.pathname === '/products') {
                    // If on products page, just toggle favorites
                    console.log('On products page - toggling favorites');
                    setFavourite(prev => {
                        console.log('Toggling from', prev, 'to', !prev);
                        return !prev;
                    });
                } else {
                    // If not on products page (community, sell, contact, cart, etc.), 
                    // navigate to products page and apply favorites filter
                    console.log('Not on products page - navigating to products with favorites ON');
                    console.log('Navigating from:', location.pathname, 'to: /products');

                    // First set favorites to true
                    setFavourite(true);
                    console.log('Set favourite to true');

                    // Then navigate to products page
                    navigate('/products');
                    console.log('Navigated to /products');

                    // Set active page to Products
                    setActivePage('Products');
                    console.log('Set active page to Products');
                }
                return; // Don't continue with regular navigation logic
            }

            // Handle other navigation items
            console.log('Navigating to:', label);
            setActivePage(label);
            const item = [...navItems, ...actionItems].find(i => i.label === label);
            if (item?.path) {
                console.log('Navigating to path:', item.path);
                navigate(item.path);
            }
        };

        const handleSearchSubmit = (e) => {
            e.preventDefault();
            // Handle search functionality here
            console.log('Search query:', searchQuery);
        };

        return (
            <>
                {/* Desktop Layout */}
                <div className='hidden lg:block w-[100vw]'>
                    <div className='bg-[#81AD87] h-[9vh] shadow-lg border border-white/20 flex'>
                        <div className='flex-1 h-full flex items-center pl-4'>
                            <div className='h-15 w-15 rounded-full flex items-center justify-center '>
                                <img src={logo} alt='Logo' className='text-[#81AD87] font-bold text-xl' />
                            </div>
                        </div>

                        <div className='flex items-center'>
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
                                            <span className="transition-all duration-300">
                                                {(activePage === item.label || location.pathname === item.path)
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
                                                {(item.label === 'Favorites' && favourite) ||
                                                    (item.label !== 'Favorites' && activePage === item.label)
                                                    ? item.selectedIcon
                                                    : item.icon}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className='flex items-center pr-4 pl-2'>
                                <div
                                    className='
                                        relative rounded-full cursor-pointer
                                        bg-white/10 hover:bg-white/20
                                        transition-all duration-300 ease-in-out
                                    '
                                    onClick={() => navigate("/Profile")}
                                    title="Profile"
                                >
                                    <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center overflow-hidden">
                                        <img
                                            src={user?.profilePhoto || userIcon}
                                            alt="User"
                                            className="h-full w-full object-cover rounded-full"
                                        />
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

                        <div
                            className='h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0'
                            onClick={() => navigate('/Profile')}
                            title="Profile"
                        >
                            <img src={userIcon} alt='User Icon' className='rounded-full w-10 h-10 object-cover' />
                        </div>
                    </div>
                </div>

                {/* Mobile Footer */}
                <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#81AD87] shadow-lg border-t border-white/20 z-50 rounded-t-[1rem]">
                    <div className="flex items-center justify-around py-3 px-2">
                        {[...navItems.filter(item =>
                            ['Products', 'Sell', 'Community'].includes(item.label)
                        ), ...actionItems].map(({ label, icon, selectedIcon }) => (
                            <div
                                key={label}
                                onClick={() => handleNavClick(label)}
                                className={`
                                    flex flex-col items-center space-y-1 cursor-pointer transition-all duration-300
                                    ${(label === 'Favorites' && favourite) ||
                                        (label !== 'Favorites' && (activePage === label ||
                                            (label === 'Products' && location.pathname === '/products')))
                                        ? 'text-white font-semibold'
                                        : 'text-white/70'
                                    }
                                `}
                            >
                                {(label === 'Favorites' && favourite) ||
                                    (label !== 'Favorites' && (activePage === label ||
                                        (label === 'Products' && location.pathname === '/products')))
                                    ? selectedIcon
                                    : icon}
                                <span className="text-xs">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        );
    };