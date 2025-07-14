import React, { useState } from 'react';
import { LoginForm } from './component/LoginForm';
import logo from '../../assets/RevironLogo.png';
import { SignupForm } from './component/SignupForm';

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className={`w-screen h-screen flex overflow-hidden ${isLogin?'flex-row':'flex-row-reverse'}`}>
      {/* Left Panel - Form Section */}
      <div
        className={`w-3/5 h-full flex items-center justify-center p-10 bg-white transition-transform duration-700 ease-in-out`}
      >
        {isLogin ? <LoginForm /> : <SignupForm />}
      </div>

      {/* Right Panel - Welcome Section */}
      <div
        className={`w-2/5 h-full bg-[#81AD87] flex flex-col justify-center items-center transition-all duration-700 ease-in-out ${isLogin?'rounded-l-[5rem]':'rounded-r-[5rem]'}`}
      >
        <img src={logo} className="w-1/5 h-1/6 object-contain mb-6" alt="Reviron Logo" />

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