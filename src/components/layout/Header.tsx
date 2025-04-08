"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Bell, Settings, User } from '@/components/ui/icons';
import { Megaphone, ChevronDown, LogOut } from '@/components/ui/icons/additional';
import NotificationsPanel from '@/components/notifications/NotificationsPanel';
import SettingsPanel from '@/components/settings/SettingsPanel';

// CSS for animations
const dropdownAnimation = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.2s ease-out forwards;
}
`;

export default function Header() {
  const router = useRouter();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <header className="h-16 bg-gradient-to-r from-[#e62e4d] to-[#5e3b94] border-b border-gray-200 flex items-center justify-between shadow-lg z-20 w-full">
      {/* Logo and Brand */}
      <div className="flex items-center pl-1">
        <div className="font-bold text-xl text-white flex items-center">
          <span className="bg-white text-[#e62e4d] rounded-xl h-8 w-8 flex items-center justify-center mr-2 font-bold shadow-md">S</span>
          <span>Sandlines</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 pr-1">
        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative p-2 text-white hover:text-white rounded-xl hover:bg-white/10 transition-all"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 bg-white text-[#e57983] text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-sm">
              3
            </span>
          </button>
          
          {/* Notifications Panel */}
          <NotificationsPanel 
            isOpen={isNotificationsOpen} 
            onClose={() => setIsNotificationsOpen(false)} 
          />
        </div>
        
        {/* Settings */}
        <div className="relative">
          <button 
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="p-2 text-white hover:text-white rounded-xl hover:bg-white/10 transition-all"
          >
            <Settings className="w-5 h-5" />
          </button>
          
          {/* Settings Panel */}
          <SettingsPanel 
            isOpen={isSettingsOpen} 
            onClose={() => setIsSettingsOpen(false)} 
          />
        </div>
        
        {/* Profile with Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className="flex items-center space-x-2 p-1 rounded-xl hover:bg-white/10 transition-all"
          >
            <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-[#e62e4d] shadow-md">
              <User className="h-5 w-5" />
            </div>
          </button>
          
          {/* Profile Dropdown */}
          {isProfileDropdownOpen && (
            <div
              ref={profileDropdownRef}
              className="absolute right-0 top-12 w-48 bg-white shadow-xl rounded-xl overflow-hidden z-50 animate-fade-in"
            >
              <div className="p-2">
                <button
                  onClick={() => {
                    setIsProfileDropdownOpen(false);
                    router.push('/profile');
                  }}
                  className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <User className="w-4 h-4 mr-2 text-gray-500" />
                  Open Profile
                </button>

                <button
                  onClick={() => {
                    setIsProfileDropdownOpen(false);
                    // Logic for sending invite
                  }}
                  className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Send Invite
                </button>
                
                <button
                  onClick={() => {
                    setIsProfileDropdownOpen(false);
                    router.push('/landing');
                  }}
                  className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <LogOut className="w-4 h-4 mr-2 text-gray-500" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
