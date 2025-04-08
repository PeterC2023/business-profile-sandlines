"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Bell, User } from '@/components/ui/icons';
import { X, Sun, Moon, Globe, Lock, HelpCircle, Info } from '@/components/ui/icons/settings';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [desktopNotifications, setDesktopNotifications] = useState(true);
  const [compactMode, setCompactMode] = useState(false);
  const [panelWidth, setPanelWidth] = useState(320);
  const [isDragging, setIsDragging] = useState(false);
  const resizeRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  
  // Handle initial theme
  useEffect(() => {
    // Set initial theme based on body class or localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme as 'light' | 'dark');
    
    // Apply the theme to the document
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${savedTheme}-theme`);
    
    // Apply data-theme attribute for component-level theming
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);
  
  // Handle panel resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      // Calculate new width from the right edge of the screen
      const newWidth = window.innerWidth - e.clientX;
      
      // Apply min and max constraints
      if (newWidth >= 280 && newWidth <= 600) {
        setPanelWidth(newWidth);
      }
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.cursor = 'default';
    };
    
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);
  
  // Handle resize cursor
  useEffect(() => {
    if (!isOpen || !resizeRef.current) return;
    
    const resizeHandle = resizeRef.current;
    
    const handleMouseEnter = () => {
      document.body.style.cursor = 'ew-resize';
    };
    
    const handleMouseLeave = () => {
      if (!isDragging) {
        document.body.style.cursor = 'default';
      }
    };
    
    resizeHandle.addEventListener('mouseenter', handleMouseEnter);
    resizeHandle.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      resizeHandle.removeEventListener('mouseenter', handleMouseEnter);
      resizeHandle.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isOpen, isDragging]);
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Apply the theme to the document
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${newTheme}-theme`);
    
    // Apply data-theme attribute for component-level theming
    document.documentElement.setAttribute('data-theme', newTheme);
  };
  
  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    document.body.style.cursor = 'ew-resize';
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop - no blur */}
      <div 
        className="absolute inset-0 bg-black/30 transition-all duration-300"
        onClick={onClose}
      />
      
      {/* Settings Panel */}
      <div 
        ref={panelRef}
        className={`relative h-full ${theme === 'dark' ? 'bg-gray-900/95 text-white' : 'bg-white/95'} shadow-xl overflow-y-auto z-10 animate-slide-in-right transition-all duration-200`}
        style={{ width: `${panelWidth}px` }}
      >
        {/* Resize handle */}
        <div 
          ref={resizeRef}
          className="absolute left-0 top-0 w-4 h-full cursor-ew-resize z-20"
          onMouseDown={handleResizeStart}
        >
          <div className="absolute left-0 top-0 w-1 h-full bg-[#e62e4d] opacity-0 hover:opacity-100 transition-opacity duration-200"></div>
        </div>
        <div className={`p-4 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'}`}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}">Settings</h2>
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="h-5 w-5 text-[#e62e4d] hover:scale-110 transition-transform duration-200" />
            </button>
          </div>
        </div>
        
        <style jsx global>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .settings-item {
            transition: all 0.2s ease;
          }
          .settings-item:hover {
            transform: translateX(2px);
          }
          @keyframes slide-in-right {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
          .animate-slide-in-right {
            animation: slide-in-right 0.3s ease-out forwards;
          }
        `}</style>
        <div className="p-4">
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-4">Display</h3>
            
            {/* Theme Toggle */}
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Theme</span>
                
                <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                  <button
                    onClick={() => theme === 'dark' && toggleTheme()}
                    className={`flex items-center justify-center w-8 h-8 rounded-lg ${theme === 'light' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''} transition-all duration-200`}
                    aria-label="Light Theme"
                  >
                    <Sun className={`h-5 w-5 ${theme === 'light' ? 'text-[#e62e4d]' : 'text-gray-400'}`} />
                    {theme === 'light' && <span className="ml-1 text-sm">Light</span>}
                  </button>
                  
                  <button
                    onClick={() => theme === 'light' && toggleTheme()}
                    className={`flex items-center justify-center w-8 h-8 rounded-lg ${theme === 'dark' ? 'bg-gray-700 dark:bg-gray-600 shadow-sm' : ''} transition-all duration-200`}
                    aria-label="Dark Theme"
                  >
                    <Moon className={`h-5 w-5 ${theme === 'dark' ? 'text-[#5e3b94]' : 'text-gray-400'}`} />
                    {theme === 'dark' && <span className="ml-1 text-sm text-white">Dark</span>}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Compact Mode Toggle */}
            <div className="flex items-center justify-between py-2">
              <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Compact Mode</span>
              <label className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="peer sr-only" 
                  checked={compactMode}
                  onChange={() => setCompactMode(!compactMode)}
                />
                <span className="inline-block h-5 w-5 translate-x-1 transform rounded-full bg-white shadow-md transition-transform peer-checked:translate-x-5 peer-checked:bg-white" />
                <span className="absolute inset-0 rounded-full peer-checked:bg-[#5e3b94]" />
              </label>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-4">Notifications</h3>
            
            {/* Email Notifications Toggle */}
            <div className="flex items-center justify-between py-2">
              <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Email Notifications</span>
              <label className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="peer sr-only" 
                  checked={emailNotifications}
                  onChange={() => setEmailNotifications(!emailNotifications)}
                />
                <span className="inline-block h-5 w-5 translate-x-1 transform rounded-full bg-white shadow-md transition-transform peer-checked:translate-x-5 peer-checked:bg-white" />
                <span className="absolute inset-0 rounded-full peer-checked:bg-[#5e3b94]" />
              </label>
            </div>
            
            {/* Desktop Notifications Toggle */}
            <div className="flex items-center justify-between py-2">
              <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Desktop Notifications</span>
              <label className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="peer sr-only" 
                  checked={desktopNotifications}
                  onChange={() => setDesktopNotifications(!desktopNotifications)}
                />
                <span className="inline-block h-5 w-5 translate-x-1 transform rounded-full bg-white shadow-md transition-transform peer-checked:translate-x-5 peer-checked:bg-white" />
                <span className="absolute inset-0 rounded-full peer-checked:bg-[#5e3b94]" />
              </label>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-4">Account</h3>
            
            {/* Account Settings Options */}
            <div className="space-y-2">
              <button className="flex items-center justify-between w-full py-2 text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200">
                <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Change Password</span>
              </button>
              
              <button className="flex items-center justify-between w-full py-2 text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200">
                <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Profile Settings</span>
              </button>
              
              <button className="flex items-center justify-between w-full py-2 text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200">
                <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Privacy Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
