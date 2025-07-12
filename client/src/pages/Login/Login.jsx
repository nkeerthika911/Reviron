import React, { useState } from 'react';
import { LoginForm } from './component/LoginForm';
import logo from '../../assets/RevironLogo.png';

// SignupForm component
const SignupForm = () => (
  <div className="w-full max-w-md">
    <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Full Name"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#81AD87] focus:border-transparent"
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#81AD87] focus:border-transparent"
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#81AD87] focus:border-transparent"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#81AD87] focus:border-transparent"
      />
      <button className="w-full bg-[#81AD87] text-white py-3 rounded-lg hover:bg-[#6d9573] transition-colors font-medium">
        Create Account
      </button>
    </div>
  </div>
);

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="w-screen h-screen flex overflow-hidden">
      {/* Left Panel - Form Section */}
      <div 
        className={`w-3/5 h-full flex items-center justify-center p-10 bg-white transition-transform duration-700 ease-in-out ${
          isLogin ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {isLogin ? <LoginForm /> : <SignupForm />}
      </div>

      {/* Right Panel - Welcome Section */}
      <div 
        className={`w-2/5 h-full bg-[#81AD87] flex flex-col justify-center items-center transition-all duration-700 ease-in-out ${
          isLogin 
            ? 'translate-x-0 rounded-l-[5rem]' 
            : '-translate-x-full rounded-r-[5rem]'
        }`}
      >
        <img src={logo} className="w-1/5 h-1/6 object-contain mb-6" alt="Reviron Logo"/>
        
        <span className='text-black/60 text-[3rem] font-bold mb-4'>
          {isLogin ? 'Welcome Back!' : 'Hello There!'}
        </span>
        
        <span className='w-[80%] text-center text-white/60 text-[1.5rem] font-bold mb-8'>
          {isLogin 
            ? "Don't trash it, transform it. Every device recycled is a step toward a cleaner planet."
            : "Join us in making a difference. Transform waste into wonder with every device you recycle."
          }
        </span>
        
        <button 
          onClick={handleToggle}
          className='bg-black/30 hover:bg-black/40 transition-all duration-300 rounded-[50px] text-white px-10 py-3 cursor-pointer font-medium'
        >
          {isLogin ? 'Signup' : 'Login'}
        </button>
      </div>
    </div>
  );
};