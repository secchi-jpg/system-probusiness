import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth, UserRole } from '../store/authStore';
import { cn } from '../lib/utils';
import { Package, Play } from 'lucide-react';

export default function Login() {
  const { role, login } = useAuth();
  const [email, setEmail] = useState('demo@empresa.com');
  const [password, setPassword] = useState('password');

  if (role === 'admin') return <Navigate to="/admin" replace />;
  if (role === 'employee') return <Navigate to="/employee" replace />;

  const handleLogin = (e: React.FormEvent, selectedRole: UserRole) => {
    e.preventDefault();
    login(selectedRole);
  };

  return (
    <div className="flex min-h-screen w-full bg-white md:bg-gray-50 flex-col md:flex-row items-center justify-center p-0 md:p-6 lg:p-12">
      <div className="flex w-full max-w-5xl flex-col md:flex-row shadow-none md:shadow-2xl rounded-none md:rounded-3xl overflow-hidden bg-white min-h-screen md:min-h-[600px]">
        
        {/* Left Side: Form */}
        <div className="flex w-full flex-col p-8 md:w-1/2 lg:p-16 justify-center">
          <div className="flex items-center gap-2 mb-12">
            <div className="bg-pink-600 text-white p-1.5 rounded-lg">
              <Package size={20} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">LogisticsSuite</h1>
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Welcome Back, Please login<br/>to your account.</h2>
          
          <div className="flex gap-4 mt-8 mb-6">
            <button
              onClick={(e) => handleLogin(e, 'admin')}
              className="flex-1 bg-[#3a4468] text-white py-2.5 rounded text-sm font-medium hover:bg-[#323b5c] transition-colors"
            >
              Admin Access
            </button>
            <button
              onClick={(e) => handleLogin(e, 'employee')}
              className="flex-1 bg-[#155b55] text-white py-2.5 rounded text-sm font-medium hover:bg-[#114b46] transition-colors"
            >
              Employee Access
            </button>
          </div>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-xs tracking-wider text-gray-400 uppercase">- OR -</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          <form className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-b border-gray-300 py-2 text-gray-900 focus:outline-none focus:border-pink-500 transition-colors font-medium"
              />
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-b border-gray-300 py-2 text-gray-900 focus:outline-none focus:border-pink-500 transition-colors font-medium tracking-widest"
              />
            </div>

            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500" />
                <span className="text-sm text-gray-600 font-medium">Remember me</span>
              </label>
              <a href="#" className="text-sm font-semibold text-gray-600 hover:text-pink-600 transition-colors">Forgot password</a>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={(e) => handleLogin(e, 'employee')}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded shadow-lg shadow-pink-500/30 font-semibold hover:from-purple-600 hover:to-pink-600 transition-colors"
              >
                Login
              </button>
              <button className="flex-1 bg-white border border-gray-200 text-gray-700 py-3 rounded font-semibold hover:bg-gray-50 transition-colors text-sm">
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-8 text-xs text-gray-400">
            By signing up, you agree to LogisticsSuite's <br/>
            <a href="#" className="text-gray-500 hover:underline">Terms and Conditions</a> & <a href="#" className="text-gray-500 hover:underline">Privacy Policy</a>
          </p>
        </div>

        {/* Right Side: Visual */}
        <div className="hidden md:flex w-1/2 relative bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 items-center justify-center p-12 overflow-hidden">
          {/* Abstract background shapes matching image */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-sm opacity-70"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-sm opacity-70"></div>
          <div className="absolute top-1/2 right-0 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-sm opacity-70 translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="relative z-10 w-full">
            <h2 className="text-4xl font-bold text-white mb-4">How it works?</h2>
            <p className="text-white/80 text-sm font-medium mb-8 max-w-sm">
              Create your free profile, manage routes, and track your deliveries efficiently.
            </p>
            
            <button className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-pink-500 hover:scale-105 shadow-xl transition-transform">
              <Play fill="currentColor" size={20} className="ml-1" />
            </button>
          </div>
          
          <button className="absolute top-8 right-8 bg-black/20 hover:bg-black/30 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-semibold flex items-center gap-2 transition-colors">
            ✕ Hide
          </button>
        </div>
      </div>
    </div>
  );
}
