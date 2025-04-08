"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Clock } from '@/components/ui/icons';
import { Upload, CheckCircle } from '@/components/ui/icons/auth';
import { useRouter } from 'next/navigation';
import VideoPopup from '@/components/ui/VideoPopup';

export default function LandingPage() {
  const router = useRouter();
  const [videoPopup, setVideoPopup] = useState({
    isOpen: false,
    videoSrc: '',
    title: '',
    description: ''
  });

  // Check for feature param in URL to auto-open a video
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const featureParam = urlParams.get('feature');
      
      if (featureParam) {
        // Find matching feature and open its video
        const feature = featureVideos.find(f => 
          f.title.toLowerCase() === decodeURIComponent(featureParam).toLowerCase()
        );
        
        if (feature) {
          setVideoPopup({
            isOpen: true,
            videoSrc: feature.videoSrc,
            title: feature.title,
            description: feature.description
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    // Force the document to be scrollable
    document.body.style.overflowY = 'auto';
    document.body.style.height = 'auto';
    return () => {
      document.body.style.overflowY = '';
      document.body.style.height = '';
    };
  }, []);
  
  // Video data for each feature with concise descriptions
  const featureVideos = [
    {
      id: 'ai-assistant',
      title: 'Meet Your AI Business Partner',
      videoSrc: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Smart decisions in seconds with AI assistance.'
    },
    {
      id: 'financial-management',
      title: 'Financial Management Simplified',
      videoSrc: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Track, forecast, and grow your business.'
    },
    {
      id: 'team-collaboration',
      title: 'Teams Working Better Together',
      videoSrc: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Seamless communication across your organization.'
    },
    {
      id: 'analytics-dashboard',
      title: 'Business Insights at a Glance',
      videoSrc: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Data visualized for immediate action.'
    },
    {
      id: 'smart-scheduling',
      title: 'Never Miss an Appointment Again',
      videoSrc: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Intelligent scheduling that saves time.'
    },
    {
      id: 'payment-processing',
      title: 'Get Paid Faster',
      videoSrc: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Secure transactions in just a few clicks.'
    },
    {
      id: 'compliance-tools',
      title: 'Stay Compliant Without the Hassle',
      videoSrc: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Regulations made simple and automatic.'
    },
    {
      id: 'customer-support',
      title: 'Customer Support That Delights',
      videoSrc: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Building relationships that last.'
    }
  ];
  
  interface Feature {
    id: string;
    title: string;
    videoSrc: string;
    description: string;
  }
  
  const openVideoPopup = (feature: Feature) => {
    setVideoPopup({
      isOpen: true,
      videoSrc: feature.videoSrc,
      title: feature.title,
      description: feature.description
    });
    // Add the feature to the URL without page reload
    const url = new URL(window.location.href);
    url.searchParams.set('feature', feature.title);
    window.history.pushState({}, '', url);
  };
  
  const closeVideoPopup = () => {
    setVideoPopup(prev => ({ ...prev, isOpen: false }));
    // Remove the feature from the URL without page reload
    const url = new URL(window.location.href);
    url.searchParams.delete('feature');
    window.history.pushState({}, '', url);
  };

  const handleStartNow = () => {
    // Create and animate particles before redirecting
    const container = document.createElement('div');
    container.className = 'fixed inset-0 z-50 pointer-events-none';
    document.body.appendChild(container);
    
    // Create a branded gradient background flash
    const flash = document.createElement('div');
    flash.className = 'fixed inset-0 bg-gradient-to-r from-[#e62e4d] to-[#5e3b94] z-40 opacity-0';
    document.body.appendChild(flash);
    
    // Animate the flash
    setTimeout(() => {
      flash.style.transition = 'opacity 0.4s ease-in-out';
      flash.style.opacity = '0.2';
      
      setTimeout(() => {
        flash.style.opacity = '0';
      }, 600);
    }, 100);
    
    // Create and animate particles
    const particleCount = 20;
    const colors = ['#e62e4d', '#5e3b94', '#3e5f8a'];
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 15 + 5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      particle.className = 'absolute rounded-full pointer-events-none';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = color;
      particle.style.opacity = '0';
      
      // Add blur effect for glow
      particle.style.filter = 'blur(2px)';
      
      // Determine starting position - center it around the button
      const buttonRect = document.querySelector('button')?.getBoundingClientRect();
      if (buttonRect) {
        const startX = buttonRect.left + buttonRect.width / 2;
        const startY = buttonRect.top + buttonRect.height / 2;
        
        particle.style.left = `${startX}px`;
        particle.style.top = `${startY}px`;
        
        // Calculate end position - random direction from center
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 300 + 100;
        const endX = startX + Math.cos(angle) * distance;
        const endY = startY + Math.sin(angle) * distance;
        
        // Add to container
        container.appendChild(particle);
        
        // Animate
        setTimeout(() => {
          particle.style.transition = `all ${Math.random() * 0.5 + 0.8}s ease-out`;
          particle.style.opacity = `${Math.random() * 0.7 + 0.3}`;
          particle.style.transform = `translate(${endX - startX}px, ${endY - startY}px) scale(${Math.random() * 0.5 + 0.5})`;
          
          // Fade out
          setTimeout(() => {
            particle.style.opacity = '0';
          }, Math.random() * 500 + 300);
        }, Math.random() * 100);
      }
    }
    
    // Clean up and redirect
    setTimeout(() => {
      document.body.removeChild(container);
      document.body.removeChild(flash);
      router.push('/home');
    }, 1200);
  };

  return (
    <div className="overflow-y-auto min-h-screen flex flex-col relative" style={{ height: 'auto', overflowY: 'visible' }}>
      {/* Beautiful gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#5e3b94]/30 via-white to-[#e62e4d]/30 z-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-[#5e3b94]/50 to-[#e62e4d]/50 rounded-bl-full blur-3xl z-0 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-[#3e5f8a]/50 to-[#5e3b94]/50 rounded-tr-full blur-3xl z-0 animate-pulse" style={{animationDelay: '1.5s', animationDuration: '7s'}}></div>
      <div className="absolute top-1/4 left-1/3 w-24 h-24 bg-gradient-to-r from-[#e62e4d]/40 to-[#5e3b94]/40 rounded-full blur-xl z-0 animate-pulse" style={{animationDuration: '5s'}}></div>
      <div className="absolute bottom-1/3 right-1/3 w-32 h-32 bg-gradient-to-r from-[#3e5f8a]/40 to-[#e62e4d]/40 rounded-full blur-xl z-0 animate-pulse" style={{animationDelay: '0.8s', animationDuration: '6s'}}></div>
      
      {/* Content wrapping relative to place above background */}
      <div className="relative z-10 text-[#333333]">
      {/* Header with logo and buttons */}
      <header className="flex justify-between items-center py-6 px-10 w-full">
        <div className="flex items-center ml-px">
          <div className="mr-3">
            <img src="/images/Logo.jpeg" alt="Sandlines Logo" className="w-10 h-10 rounded-full shadow-sm" />
          </div>
          <span className="text-2xl font-bold text-[#333333]">Sandlines</span>
        </div>
        
        <div className="flex space-x-3 mr-px">
          <Link 
            href="/login" 
            className="px-4 py-2 border border-[#3e5f8a] text-[#3e5f8a] rounded-lg hover:bg-[#3e5f8a]/10 transition-all shadow-sm"
          >
            Log in
          </Link>
          <Link 
            href="/signup" 
            className="px-4 py-2 bg-[#e62e4d] text-white rounded-lg hover:bg-[#e62e4d]/90 transition-all shadow-sm"
          >
            Sign up
          </Link>
        </div>
      </header>

      {/* Hero section with vibrant animated gradients */}
      <div className="container mx-auto px-4 text-center py-16 relative">
        {/* Small decorative elements */}
        <div className="absolute top-10 left-1/4 w-12 h-12 bg-[#e62e4d]/30 rounded-full blur-lg animate-pulse"></div>
        <div className="absolute bottom-10 right-1/4 w-16 h-16 bg-[#5e3b94]/30 rounded-full blur-lg animate-pulse" style={{animationDelay: '1s'}}></div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 relative">
          <span className="bg-gradient-to-r from-[#e62e4d] via-[#5e3b94] to-[#3e5f8a] text-transparent bg-clip-text bg-size-200 animate-gradient-fast">
            Run Your Business
          </span>
          {/* Sparkle effects */}
          <span className="absolute -top-5 right-1/4 text-xl animate-bounce">✨</span>
          <span className="absolute -top-3 left-1/3 text-lg animate-bounce" style={{animationDelay: '0.5s'}}>✨</span>
        </h1>
        <p className="text-xl text-gray-700 mb-10 relative">
          <span className="relative z-10">All in one platform for your business.</span>
          <span className="absolute inset-0 bg-gradient-to-r from-[#e62e4d]/10 via-[#5e3b94]/10 to-[#3e5f8a]/10 rounded-lg blur-sm"></span>
        </p>
        <button
          onClick={handleStartNow}
          className="relative overflow-hidden bg-gradient-to-r from-[#e62e4d] via-[#5e3b94] to-[#3e5f8a] hover:from-[#e62e4d]/90 hover:to-[#5e3b94]/90 text-white px-6 py-3 rounded-lg inline-flex items-center transition-all shadow-md group"
        >
          <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
          <span className="relative">Start Now</span>
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </button>
      </div>

      {/* Steps section */}
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Step 1 */}
        <div className="bg-white p-8 rounded-xl text-center transition-transform hover:transform hover:scale-105 shadow-md border border-gray-100">
          <div className="bg-[#e62e4d]/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <Upload className="w-8 h-8 text-[#e62e4d]" />
          </div>
          <h2 className="text-xl font-bold mb-3 text-[#333333]">1. Set Up Your Profile</h2>
          <p className="text-gray-600">
            Quickly create your business profile with essential information and customize it to your needs
          </p>
          <div className="mt-3 text-xs text-[#5e3b94] font-medium">Integrates with: <span className="text-[#e62e4d]">Google Drive, Dropbox</span></div>
        </div>
        
        {/* Step 2 */}
        <div className="bg-white p-8 rounded-xl text-center transition-transform hover:transform hover:scale-105 shadow-md border border-gray-100">
          <div className="bg-[#3e5f8a]/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <Clock className="w-8 h-8 text-[#3e5f8a]" />
          </div>
          <h2 className="text-xl font-bold mb-3 text-[#333333]">2. Connect Accounts</h2>
          <p className="text-gray-600">
            Our AI integrates with your existing accounts and tools, making setup and management effortless
          </p>
          <div className="mt-3 text-xs text-[#5e3b94] font-medium">Connects with: <span className="text-[#e62e4d]">Google, Microsoft, Shopify, Stripe</span></div>
        </div>
        
        {/* Step 3 */}
        <div className="bg-white p-8 rounded-xl text-center transition-transform hover:transform hover:scale-105 shadow-md border border-gray-100">
          <div className="bg-[#5e3b94]/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-[#5e3b94]" />
          </div>
          <h2 className="text-xl font-bold mb-3 text-[#333333]">3. Continue Running Business</h2>
          <p className="text-gray-600">
            Access finances, compliance tools, task management, AI assistant, team collaboration, and more - all in one platform
          </p>
          <div className="mt-3 text-xs text-[#5e3b94] font-medium">Replaces: <span className="text-[#e62e4d]">Notion, Jira, Salesforce, HubSpot, Mailchimp</span></div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16 text-center" id="features">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 relative inline-block">
          <span className="animate-gradient-x bg-gradient-to-r from-[#e62e4d] via-[#5e3b94] to-[#3e5f8a] text-transparent bg-clip-text bg-size-200">Features</span>
          <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#e62e4d] via-[#5e3b94] to-[#3e5f8a]"></div>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Feature 1 */}
          <div 
            className="feature-card bg-white p-6 rounded-xl shadow-md border border-gray-100 cursor-pointer"
            onClick={() => openVideoPopup(featureVideos[0])}
            role="button"
            aria-label="Watch AI Assistant demo video"
          >
            {/* Sparkle elements for magical effect */}
            <div className="sparkle absolute top-1/4 left-1/4" style={{background: '#e62e4d'}}></div>
            <div className="sparkle absolute top-3/4 right-1/4" style={{background: '#5e3b94'}}></div>
            <div className="sparkle absolute bottom-1/4 right-1/3" style={{background: '#3e5f8a'}}></div>
            
            <div className="feature-icon-wrapper bg-[#e62e4d]/10 rounded-xl p-4 mb-4 h-24 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-[#e62e4d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              </svg>
            </div>
            <h3 className="feature-title text-lg font-bold mb-2 text-[#333333]">AI Assistant</h3>
            <p className="text-gray-600 text-sm">Intelligent support for daily tasks and decisions</p>
            <div className="mt-3 text-xs text-[#5e3b94] font-medium">Replaces: <span className="text-[#e62e4d]">ChatGPT, Notion AI</span></div>
            <div className="mt-4 text-xs text-[#e62e4d] flex items-center justify-center">
              <span className="mr-1">Watch Demo</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          
          {/* Feature 2 */}
          <div 
            className="feature-card bg-white p-6 rounded-xl shadow-md border border-gray-100 cursor-pointer"
            onClick={() => openVideoPopup(featureVideos[1])}
            role="button"
            aria-label="Watch Financial Management demo video"
          >
            {/* Sparkle elements for magical effect */}
            <div className="sparkle absolute top-1/3 right-1/4" style={{background: '#5e3b94'}}></div>
            <div className="sparkle absolute bottom-1/4 left-1/4" style={{background: '#e62e4d'}}></div>
            <div className="sparkle absolute top-1/2 right-1/3" style={{background: '#3e5f8a'}}></div>
            
            <div className="feature-icon-wrapper bg-[#5e3b94]/10 rounded-xl p-4 mb-4 h-24 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-[#5e3b94]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="feature-title text-lg font-bold mb-2 text-[#333333]">Financial Management</h3>
            <p className="text-gray-600 text-sm">Track, forecast, and optimize your business finances</p>
            <div className="mt-3 text-xs text-[#5e3b94] font-medium">Replaces: <span className="text-[#e62e4d]">QuickBooks, Wave, Stripe</span></div>
            <div className="mt-4 text-xs text-[#e62e4d] flex items-center justify-center">
              <span className="mr-1">Watch Demo</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          
          {/* Feature 3 */}
          <div 
            className="feature-card bg-white p-6 rounded-xl shadow-md border border-gray-100 cursor-pointer"
            onClick={() => openVideoPopup(featureVideos[2])}
            role="button"
            aria-label="Watch Team Collaboration demo video"
          >
            {/* Sparkle elements for magical effect */}
            <div className="sparkle absolute top-1/4 right-1/3" style={{background: '#3e5f8a'}}></div>
            <div className="sparkle absolute bottom-1/3 left-1/5" style={{background: '#e62e4d'}}></div>
            <div className="sparkle absolute top-2/3 right-1/4" style={{background: '#5e3b94'}}></div>
            
            <div className="feature-icon-wrapper bg-[#3e5f8a]/10 rounded-xl p-4 mb-4 h-24 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-[#3e5f8a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="feature-title text-lg font-bold mb-2 text-[#333333]">Team Collaboration</h3>
            <p className="text-gray-600 text-sm">Tools to keep your team connected and productive</p>
            <div className="mt-3 text-xs text-[#5e3b94] font-medium">Replaces: <span className="text-[#e62e4d]">Slack, Rippling, Gusto</span></div>
            <div className="mt-4 text-xs text-[#e62e4d] flex items-center justify-center">
              <span className="mr-1">Watch Demo</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          
          {/* Feature 4 */}
          <div 
            className="feature-card bg-white p-6 rounded-xl shadow-md border border-gray-100 cursor-pointer"
            onClick={() => openVideoPopup(featureVideos[3])}
            role="button"
            aria-label="Watch Analytics Dashboard demo video"
          >
            {/* Sparkle elements for magical effect */}
            <div className="sparkle absolute top-1/5 left-1/3" style={{background: '#e62e4d'}}></div>
            <div className="sparkle absolute bottom-1/4 right-1/5" style={{background: '#5e3b94'}}></div>
            <div className="sparkle absolute top-3/4 left-1/4" style={{background: '#3e5f8a'}}></div>
            
            <div className="feature-icon-wrapper bg-[#e62e4d]/10 rounded-xl p-4 mb-4 h-24 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-[#e62e4d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
            </div>
            <h3 className="feature-title text-lg font-bold mb-2 text-[#333333]">Analytics Dashboard</h3>
            <p className="text-gray-600 text-sm">Visualize your business data for better decisions</p>
            <div className="mt-3 text-xs text-[#5e3b94] font-medium">Replaces: <span className="text-[#e62e4d]">Google Analytics, Microsoft Power BI</span></div>
            <div className="mt-4 text-xs text-[#e62e4d] flex items-center justify-center">
              <span className="mr-1">Watch Demo</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Feature 5 */}
          <div 
            className="feature-card bg-white p-6 rounded-xl shadow-md border border-gray-100 cursor-pointer"
            onClick={() => openVideoPopup(featureVideos[4])}
            role="button"
            aria-label="Watch Smart Scheduling demo video"
          >
            {/* Sparkle elements for magical effect */}
            <div className="sparkle absolute top-1/3 left-1/4" style={{background: '#3e5f8a'}}></div>
            <div className="sparkle absolute bottom-1/3 right-1/3" style={{background: '#5e3b94'}}></div>
            <div className="sparkle absolute top-1/2 left-1/3" style={{background: '#e62e4d'}}></div>
            
            <div className="feature-icon-wrapper bg-[#3e5f8a]/10 rounded-xl p-4 mb-4 h-24 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-[#3e5f8a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="feature-title text-lg font-bold mb-2 text-[#333333]">Smart Scheduling</h3>
            <p className="text-gray-600 text-sm">Automated calendar management and reminders</p>
            <div className="mt-3 text-xs text-[#5e3b94] font-medium">Replaces: <span className="text-[#e62e4d]">Google Calendar, Calendly</span></div>
            <div className="mt-4 text-xs text-[#e62e4d] flex items-center justify-center">
              <span className="mr-1">Watch Demo</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          
          {/* Feature 6 */}
          <div 
            className="feature-card bg-white p-6 rounded-xl shadow-md border border-gray-100 cursor-pointer"
            onClick={() => openVideoPopup(featureVideos[5])}
            role="button"
            aria-label="Watch Payment Processing demo video"
          >
            {/* Sparkle elements for magical effect */}
            <div className="sparkle absolute top-2/5 right-1/4" style={{background: '#5e3b94'}}></div>
            <div className="sparkle absolute bottom-1/5 left-1/4" style={{background: '#e62e4d'}}></div>
            <div className="sparkle absolute top-1/3 right-1/3" style={{background: '#3e5f8a'}}></div>
            
            <div className="feature-icon-wrapper bg-[#5e3b94]/10 rounded-xl p-4 mb-4 h-24 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-[#5e3b94]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="feature-title text-lg font-bold mb-2 text-[#333333]">Payment Processing</h3>
            <p className="text-gray-600 text-sm">Secure, fast transactions for your business</p>
            <div className="mt-3 text-xs text-[#5e3b94] font-medium">Replaces: <span className="text-[#e62e4d]">Stripe, PayPal, Square</span></div>
            <div className="mt-4 text-xs text-[#e62e4d] flex items-center justify-center">
              <span className="mr-1">Watch Demo</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          
          {/* Feature 7 */}
          <div 
            className="feature-card bg-white p-6 rounded-xl shadow-md border border-gray-100 cursor-pointer"
            onClick={() => openVideoPopup(featureVideos[6])}
            role="button"
            aria-label="Watch Compliance Tools demo video"
          >
            {/* Sparkle elements for magical effect */}
            <div className="sparkle absolute top-1/4 left-1/4" style={{background: '#e62e4d'}}></div>
            <div className="sparkle absolute bottom-1/3 right-1/4" style={{background: '#5e3b94'}}></div>
            <div className="sparkle absolute top-3/5 left-1/3" style={{background: '#3e5f8a'}}></div>
            
            <div className="feature-icon-wrapper bg-[#e62e4d]/10 rounded-xl p-4 mb-4 h-24 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-[#e62e4d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="feature-title text-lg font-bold mb-2 text-[#333333]">Compliance Tools</h3>
            <p className="text-gray-600 text-sm">Stay updated with regulations for your business</p>
            <div className="mt-3 text-xs text-[#5e3b94] font-medium">Replaces: <span className="text-[#e62e4d]">LegalZoom, Ironclad, Vanta</span></div>
            <div className="mt-4 text-xs text-[#e62e4d] flex items-center justify-center">
              <span className="mr-1">Watch Demo</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          
          {/* Feature 8 */}
          <div 
            className="feature-card bg-white p-6 rounded-xl shadow-md border border-gray-100 cursor-pointer"
            onClick={() => openVideoPopup(featureVideos[7])}
            role="button"
            aria-label="Watch Customer Support demo video"
          >
            {/* Sparkle elements for magical effect */}
            <div className="sparkle absolute top-2/3 left-1/4" style={{background: '#3e5f8a'}}></div>
            <div className="sparkle absolute bottom-1/4 right-1/3" style={{background: '#e62e4d'}}></div>
            <div className="sparkle absolute top-1/4 right-1/4" style={{background: '#5e3b94'}}></div>
            
            <div className="feature-icon-wrapper bg-[#3e5f8a]/10 rounded-xl p-4 mb-4 h-24 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-[#3e5f8a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
            <h3 className="feature-title text-lg font-bold mb-2 text-[#333333]">Customer Support</h3>
            <p className="text-gray-600 text-sm">Integrated tools to manage client relationships</p>
            <div className="mt-3 text-xs text-[#5e3b94] font-medium">Replaces: <span className="text-[#e62e4d]">Intercom, Zendesk, Freshdesk</span></div>
            <div className="mt-4 text-xs text-[#e62e4d] flex items-center justify-center">
              <span className="mr-1">Watch Demo</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-[#e62e4d]/10 via-[#5e3b94]/10 to-[#3e5f8a]/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">Join thousands of businesses using Sandlines to optimize their operations and drive growth.</p>
          <button
            onClick={handleStartNow}
            className="bg-gradient-to-r from-[#e62e4d] to-[#5e3b94] hover:from-[#e62e4d]/90 hover:to-[#5e3b94]/90 text-white px-8 py-4 rounded-lg text-lg font-medium inline-flex items-center transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Get Started for Free
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-500 text-sm relative z-10">
        <p>© 2025 Sandlines Business Profile. All rights reserved.</p>
      </footer>
      </div>
      
      {/* Video Popup Component */}
      <VideoPopup 
        isOpen={videoPopup.isOpen}
        onClose={closeVideoPopup}
        videoSrc={videoPopup.videoSrc}
        title={videoPopup.title}
        description={videoPopup.description}
      />
    </div>
  );
}
