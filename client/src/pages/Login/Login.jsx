import React, { useState } from 'react';
import { LoginForm } from './component/LoginForm';
import { SignupForm } from './component/SignupForm';
import { ToastPopup } from '../utils/ToastPopup';
import logo from '../../assets/RevironLogo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [toast, setToast] = useState(null);

  const handleToggle = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setIsTransitioning(false);
    }, 350);
  };

  const handleLogin = async (formData) => {
    try {
      const response = await axios.post(`${import.meta.env.BASE_URL}/api/auth/login`, formData);
      console.log("hello",response);
      if(response){
        localStorage.setItem("jwt", response.data.data.token);
      }
      setToast({ message: response.data.data.message, color: 'bg-green-500' });
      navigate('/products');
    } catch (err) {
      console.log(err);
      const errorData = err?.response?.data?.data;
      const errorMsg = errorData?.message || 'Something went wrong';
      setToast({ message: errorMsg, color: 'bg-red-500' });
    }
  };
  const handleSignup = async (formData) => {
    try {
      const { fullName, email, password, gender } = formData;

      const response = await axios.post(`${import.meta.env.BASE_URL}api/auth/signup`, {
        fullName,
        email,
        password,
        gender,
      });

      setToast({ message: response.data.data.message, color: 'bg-green-500' });
      navigate('/products');
      // Optionally switch to login screen after successful signup
      // setTimeout(() => {
      //   setIsLogin(true);
      // }, 1000);
    } catch (err) {
      console.error(err);
      const errorData = err?.response?.data?.data;
      const errorMsg = errorData?.message || 'Signup failed. Please try again.';
      setToast({ message: errorMsg, color: 'bg-red-500' });
    }
  };

  return (
    <div className={`w-screen h-screen flex overflow-hidden transition-all duration-700 ease-in-out ${isLogin ? 'flex-row' : 'flex-row-reverse'}`}>
      {/* Left Panel */}
      <div className={`w-3/5 h-full flex items-center justify-center p-10 bg-white transition-all duration-700 ease-in-out ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        <div className={`transition-all duration-500 ease-in-out ${isTransitioning ? 'translate-y-4' : 'translate-y-0'}`}>
          {isLogin ? <LoginForm onLogin={handleLogin} /> : <SignupForm onSignup={handleSignup} />}
        </div>
      </div>

      {/* Right Panel */}
      <div className={`w-2/5 h-full bg-[#81AD87] flex flex-col justify-center items-center transition-all duration-700 ease-in-out ${isLogin ? 'rounded-l-[5rem]' : 'rounded-r-[5rem]'}`}>
        <img
          src={logo}
          className={`w-1/5 h-1/6 object-contain mb-6 transition-all duration-500 ease-in-out ${isTransitioning ? 'scale-90 opacity-80' : 'scale-100 opacity-100'}`}
          alt="Reviron Logo"
        />

        <span className={`text-black/60 text-[3rem] font-bold mb-4 transition-all duration-500 ease-in-out ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
          {isLogin ? 'Welcome Back!' : 'Hello There!'}
        </span>

        <span className={`w-[80%] text-center text-white/60 text-[1.5rem] font-bold mb-8 transition-all duration-500 ease-in-out delay-100 ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
          {isLogin
            ? "Don't trash it, transform it. Every device recycled is a step toward a cleaner planet."
            : "Join us in making a difference. Transform waste into wonder with every device you recycle."
          }
        </span>

        <button
          onClick={handleToggle}
          disabled={isTransitioning}
          className={`bg-black/30 hover:bg-black/40 transition-all duration-300 rounded-[50px] text-white px-10 py-3 cursor-pointer font-medium disabled:cursor-not-allowed ${isTransitioning ? 'scale-95 opacity-80' : 'scale-100 opacity-100'}`}
        >
          {isLogin ? 'Signup' : 'Login'}
        </button>
      </div>
      {toast && (
        <ToastPopup
          message={toast.message}
          color={toast.color}
          duration={3000}
          clearToast={() => setToast(null)}
        />
      )}

    </div>
  );
};
