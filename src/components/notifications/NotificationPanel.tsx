"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { X } from '@/components/ui/icons/settings';
import { Bell, Megaphone } from '@/components/ui/icons/additional';
import { useTheme } from '@/context/ThemeContext';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  const { theme } = useTheme();
  const [panelWidth, setPanelWidth] = useState(320);
  const [isDragging, setIsDragging] = useState(false);
  const resizeRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

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
  
  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    document.body.style.cursor = 'ew-resize';
  };
  
  if (!isOpen) return null;
  
  const notifications = [
    {
      id: 1,
      title: 'Team meeting reminder',
      time: 'Today at 2:00 PM',
      content: 'Don\'t forget about the weekly team meeting!',
      icon: <Bell className="h-4 w-4 text-[#5e3b94]" />,
      iconBg: 'bg-[#5e3b94]/10',
    },
    {
      id: 2,
      title: 'New comment on your post',
      time: '10 minutes ago',
      content: 'Sarah commented on your recent update',
      icon: <Megaphone className="h-4 w-4 text-[#e62e4d]" />,
      iconBg: 'bg-[#e62e4d]/10',
    },
    {
      id: 3,
      title: 'Task deadline approaching',
      time: 'Yesterday',
      content: 'The Website Redesign task is due in 2 days',
      icon: <Bell className="h-4 w-4 text-[#3e5f8a]" />,
      iconBg: 'bg-[#3e5f8a]/10',
    },
  ];
  
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-all duration-300"
        onClick={onClose}
      />
      
      {/* Notification Panel */}
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
        
        <div className={`p-4 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'} bg-gradient-to-r from-[#e62e4d]/10 to-[#5e3b94]/10`}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium bg-gradient-to-r from-[#e62e4d] to-[#5e3b94] inline-block text-transparent bg-clip-text">
              Notifications
            </h2>
            <div className="flex items-center">
              <span className="bg-[#e62e4d] text-white text-xs rounded-full px-2 py-0.5 mr-2">
                {notifications.length} new
              </span>
              <button 
                onClick={onClose}
                className={`p-1 rounded-full ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              >
                <X className="h-5 w-5 text-[#e62e4d] hover:scale-110 transition-transform duration-200" />
              </button>
            </div>
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
          @keyframes slide-in-right {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
          .animate-slide-in-right {
            animation: slide-in-right 0.3s ease-out forwards;
          }
        `}</style>
        
        <div className="max-h-[calc(100vh-70px)] overflow-y-auto">
          {notifications.length > 0 ? (
            <div className="p-4 space-y-3">
              {notifications.map((notification, index) => (
                <div 
                  key={notification.id} 
                  className={`p-4 ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} 
                  border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'} 
                  rounded-lg shadow-sm transition-colors duration-200 animate-fade-in`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3 mt-1">
                      <div className={`w-8 h-8 ${notification.iconBg} rounded-full flex items-center justify-center`}>
                        {notification.icon}
                      </div>
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                        {notification.title}
                      </p>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {notification.time}
                      </p>
                      <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        {notification.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={`p-10 text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              <div className="p-4 mx-auto rounded-full bg-gray-100 w-20 h-20 flex items-center justify-center mb-4">
                <Bell className="h-10 w-10 text-gray-400" />
              </div>
              <p className="font-medium">No new notifications</p>
              <p className="text-sm mt-1">We'll notify you when something arrives</p>
            </div>
          )}
        </div>
        
        <div className={`p-3 ${theme === 'dark' ? 'bg-gray-800 border-t border-gray-700' : 'bg-gray-50 border-t border-gray-100'} text-center`}>
          <Link href="/notifications" className={`text-sm font-medium ${theme === 'dark' ? 'text-[#7d5bb0]' : 'text-[#5e3b94]'} hover:underline`}>
            View all notifications
          </Link>
        </div>
      </div>
    </div>
  );
}
