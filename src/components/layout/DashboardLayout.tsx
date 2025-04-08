"use client";

import React, { useEffect, useState, useRef } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  // Fixed sidebar width - no longer changes based on selected row
  const [sidebarWidth, setSidebarWidth] = useState(256); // Default fixed width (64*4=256px)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  const minWidth = 64; // Collapsed state
  const maxWidth = 280; // Maximum expanded state (slightly reduced to prevent overflow issues)

  // Apply light theme by default
  useEffect(() => {
    document.body.classList.add('light-theme');
    return () => {
      document.body.classList.remove('light-theme');
    };
  }, []);
  
  // Load saved sidebar width from localStorage if available
  useEffect(() => {
    const savedWidth = localStorage.getItem('sidebarWidth');
    if (savedWidth) {
      const width = parseInt(savedWidth, 10);
      setSidebarWidth(width);
      setIsSidebarCollapsed(width <= minWidth + 30);
    }
  }, []);

  // Handle mouse events for drag functionality
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      // Calculate new width based on mouse position
      const newWidth = e.clientX;
      
      // Constrain to min/max bounds
      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setSidebarWidth(newWidth);
        setIsSidebarCollapsed(newWidth <= minWidth + 30);
        
        // Save sidebar width to localStorage
        localStorage.setItem('sidebarWidth', newWidth.toString());
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'ew-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="layout-container min-h-screen bg-[#f8f8ff] flex flex-col">
      {/* Header - separate layer */}
      <div className="h-16 w-full">
        <Header />
      </div>
      
      {/* Main content flex container */}
      <div className="flex flex-grow w-full h-[calc(100vh-64px)]">
        {/* Sidebar as a column with dynamic width */}
        <div 
          className="h-full hidden md:block relative transition-all duration-300 ease-in-out" 
          style={{ width: `${sidebarWidth}px` }}
        >
          <Sidebar collapsed={sidebarWidth <= minWidth + 30} />
          
          {/* Draggable resize handle */}
          <div 
            ref={dragRef}
            className="absolute top-0 right-0 w-4 h-full cursor-ew-resize z-10 flex items-center justify-center"
            onMouseDown={() => setIsDragging(true)}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Visible indicator only on hover or while dragging */}
            <div 
              className={`transition-opacity duration-200 w-1 h-full ${isHovering || isDragging ? 'opacity-100' : 'opacity-0'}`}
            >
              <div className="w-1 h-full bg-[#e62e4d] rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="flex-grow h-full overflow-hidden">
          <div className="h-full overflow-y-auto px-4 py-6"> 
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
