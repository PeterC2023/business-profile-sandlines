"use client";

import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { X } from '@/components/ui/icons/settings';

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  titleGradient?: boolean;
  badgeText?: string;
  badgeColor?: string;
  initialWidth?: number;
  minWidth?: number;
  maxWidth?: number;
  position?: 'left' | 'right';
  headerGradient?: string;
}

/**
 * Reusable SidePanel component that can be used for Settings, Notifications, etc.
 */
export default function SidePanel({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  titleGradient = true,
  badgeText,
  badgeColor = '#e62e4d',
  initialWidth = 320,
  minWidth = 280,
  maxWidth = 600,
  position = 'right',
  headerGradient = 'from-[#e62e4d]/10 to-[#5e3b94]/10'
}: SidePanelProps) {
  const [panelWidth, setPanelWidth] = useState(initialWidth);
  const [isDragging, setIsDragging] = useState(false);
  const resizeRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  
  // Handle panel resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      // Calculate new width based on position
      let newWidth;
      if (position === 'right') {
        newWidth = window.innerWidth - e.clientX;
      } else {
        newWidth = e.clientX;
      }
      
      // Apply min and max constraints
      if (newWidth >= minWidth && newWidth <= maxWidth) {
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
  }, [isDragging, minWidth, maxWidth, position]);
  
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
  
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop - removed blur effect */}
      <div 
        className="absolute inset-0 bg-black/10 transition-all duration-300"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div 
        ref={panelRef}
        className={`relative h-full bg-white/95 dark:bg-gray-900/95 dark:text-white shadow-xl overflow-y-auto z-10 animate-slide-in-${position} transition-all duration-200`}
        style={{ 
          width: `${panelWidth}px`,
          [position]: 0 
        }}
      >
        {/* Resize handle */}
        <div 
          ref={resizeRef}
          className={`absolute ${position === 'right' ? 'left-0' : 'right-0'} top-0 w-4 h-full cursor-ew-resize z-20`}
          onMouseDown={handleResizeStart}
        >
          <div className={`absolute ${position === 'right' ? 'left-0' : 'right-0'} top-0 w-1 h-full bg-[#e62e4d] opacity-0 hover:opacity-100 transition-opacity duration-200`}></div>
        </div>
        
        {/* Header */}
        <div className={`p-4 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r ${headerGradient}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h2 className={titleGradient 
                ? "text-lg font-medium bg-gradient-to-r from-[#5e3b94] to-[#e62e4d] inline-block text-transparent bg-clip-text" 
                : "text-lg font-medium"
              }>
                {title}
              </h2>
              {badgeText && (
                <span className="ml-2 bg-[#e62e4d] text-white text-xs px-2 py-0.5 rounded-full">
                  {badgeText}
                </span>
              )}
            </div>
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="h-5 w-5 text-[#e62e4d] hover:scale-110 transition-transform duration-200" />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="h-[calc(100%-60px)] overflow-auto">
          {children}
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out forwards;
        }
        
        @keyframes slide-in-left {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
