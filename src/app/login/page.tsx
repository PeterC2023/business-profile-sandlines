"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff } from '@/components/ui/icons/auth';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally handle authentication
    // For now, just redirect to home page
    router.push('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#e62e4d] to-[#5e3b94] flex flex-col items-center justify-center p-4">
      <div className="mb-8">
        <Link href="/landing" className="flex items-center">
          <div className="bg-white rounded-xl p-2 mr-3 shadow-md">
            <div className="text-[#e62e4d] font-bold text-2xl">S</div>
          </div>
          <span className="text-white text-3xl font-bold">Sandlines</span>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>
        
        <div className="flex mb-6">
          <button 
            className={`flex-1 py-2 rounded-lg ${email || password ? '' : 'bg-[#e62e4d] text-white'}`}
            onClick={() => {}}
          >
            Login
          </button>
          <Link 
            href="/signup" 
            className="flex-1 py-2 text-center text-gray-500 hover:text-[#b22234]"
          >
            Sign Up
          </Link>
        </div>
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 rounded-sm" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e62e4d]/50 shadow-sm"
                required
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 rounded-sm" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e62e4d]/50 shadow-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 border-gray-300 rounded text-[#e62e4d] focus:ring-[#e62e4d]"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            
            <Link 
              href="/forgot-password"
              className="text-[#6478AA] hover:text-[#6478AA]/90 text-sm"
            >
              Forgot your password?
            </Link>
          </div>
          
          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#e62e4d] hover:bg-[#e62e4d]/90 text-white font-medium rounded-lg transition-all shadow-md"
          >
            Login
          </button>
        </form>
        
        <div className="text-center mt-6">
          <p className="text-gray-600">
            No account? <Link href="/signup" className="text-[#6478AA] hover:text-[#6478AA]/90">Sign up here</Link>
          </p>
        </div>
      </div>
      
      <footer className="mt-8 text-white/70 text-sm">
        © 2025 Sandlines. All rights reserved.
      </footer>
    </div>
  );
}
