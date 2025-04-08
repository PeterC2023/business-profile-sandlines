"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, FileText } from '@/components/ui/icons/auth';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [platform, setPlatform] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally handle account creation
    // For now, just redirect to dashboard
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#e62e4d] to-[#5e3b94] flex flex-col items-center justify-center p-4">
      {/* Home button */}
      <div className="absolute top-6 left-6">
        <Link href="/landing" className="flex items-center bg-white/20 backdrop-blur-sm rounded-full py-2 px-4 text-white hover:bg-white/30 transition-all shadow-md">
          <div className="bg-white rounded-full p-1 mr-2">
            <div className="text-[#e62e4d] font-bold">S</div>
          </div>
          <span>Home</span>
        </Link>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-center">
          <div className="bg-white rounded-xl p-2 mr-3 shadow-md">
            <div className="text-[#e62e4d] font-bold text-2xl">S</div>
          </div>
          <span className="text-white text-3xl font-bold">Sandlines</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Get Started</h1>
        
        <div className="flex mb-6">
          <Link 
            href="/login" 
            className="flex-1 py-2 text-center text-gray-500 hover:text-[#b22234]"
          >
            Login
          </Link>
          <button 
            className="flex-1 py-2 bg-[#e62e4d] text-white rounded-lg"
            onClick={() => {}}
          >
            Sign Up
          </button>
        </div>
        
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 rounded-sm" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e62e4d]/50 shadow-sm"
                required
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="platform" className="block text-gray-700 mb-2">Business Type</label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 rounded-sm" />
              <select
                id="platform"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#e62e4d]/50 shadow-sm"
                required
              >
                <option value="" disabled>Select your business type</option>
                <option value="retail">Retail</option>
                <option value="service">Service</option>
                <option value="restaurant">Restaurant</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="technology">Technology</option>
                <option value="other">Other</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="mb-4 mt-2 text-center">
            <span className="inline-flex items-center text-[#5e3b94] bg-[#5e3b94]/10 px-3 py-1 rounded-full text-sm font-medium">
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 5L2 12.5L9 13.5M21 5L18.5 20L9 13.5M21 5L9 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Try 1-month for free, no card required
            </span>
          </div>
          
          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#e62e4d] hover:bg-[#e62e4d]/90 text-white font-medium rounded-lg transition-all shadow-md"
          >
            Create Account
          </button>
          
          <p className="text-center text-xs text-gray-500 mt-4">
            By signing up, you agree to our{' '}
            <Link href="/terms" className="text-[#6478AA]">Terms of Service</Link> and{' '}
            <Link href="/privacy" className="text-[#6478AA]">Privacy Policy</Link>
          </p>
        </form>
      </div>
      
      <footer className="mt-8 text-white/70 text-sm">
        © 2025 Sandlines. All rights reserved.
      </footer>
    </div>
  );
}
