"use client";

import React, { useState, ReactNode } from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
  content: ReactNode;
  badge?: string | number;
  badgeColor?: string;
}

interface TabPanelProps {
  tabs: Tab[];
  defaultTabId?: string;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'pills' | 'underline' | 'enclosed' | 'soft-rounded' | 'gradient';
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onTabChange?: (tabId: string) => void;
  gradientColors?: string[];
}

/**
 * Reusable TabPanel component for consistent tab navigation
 */
export default function TabPanel({
  tabs,
  defaultTabId,
  orientation = 'horizontal',
  variant = 'underline',
  fullWidth = false,
  size = 'md',
  onTabChange,
  gradientColors = ['from-[#5e3b94]', 'to-[#e62e4d]'],
}: TabPanelProps) {
  const [activeTabId, setActiveTabId] = useState(defaultTabId || tabs[0]?.id);

  const handleTabClick = (tabId: string) => {
    setActiveTabId(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  // Size variations
  const sizeClasses = {
    sm: 'text-sm py-1.5 px-2',
    md: 'text-base py-2 px-3',
    lg: 'text-lg py-2.5 px-4',
  };

  // Tab variants
  const getTabStyles = (tabId: string) => {
    const isActive = tabId === activeTabId;
    
    const baseStyles = `
      flex items-center transition-all duration-200 
      ${sizeClasses[size]} 
      ${fullWidth ? 'flex-1 justify-center' : ''}
    `;

    const variantStyles = {
      pills: `
        rounded-full font-medium
        ${isActive 
          ? 'bg-[#5e3b94] text-white shadow-sm' 
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}
      `,
      underline: `
        border-b-2 font-medium
        ${isActive 
          ? 'border-[#5e3b94] text-[#5e3b94] dark:text-white' 
          : 'border-transparent text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600'}
      `,
      enclosed: `
        border-b font-medium
        ${isActive 
          ? 'border-gray-200 dark:border-gray-700 border-b-0 rounded-t-lg bg-white dark:bg-gray-800' 
          : 'border-transparent text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'}
      `,
      'soft-rounded': `
        rounded-lg font-medium
        ${isActive 
          ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white' 
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'}
      `,
      gradient: `
        font-medium rounded-lg
        ${isActive 
          ? `bg-gradient-to-r ${gradientColors.join(' ')} text-white shadow-sm` 
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}
      `,
    };

    return `${baseStyles} ${variantStyles[variant]}`;
  };

  const containerStyles = `
    flex 
    ${orientation === 'vertical' ? 'flex-col' : 'flex-row'} 
    ${variant === 'enclosed' ? 'border-b border-gray-200 dark:border-gray-700' : ''}
    ${variant === 'underline' ? 'border-b border-gray-200 dark:border-gray-700' : ''}
    ${fullWidth && orientation === 'horizontal' ? 'w-full' : ''}
    gap-1
  `;

  return (
    <div className="w-full">
      {/* Tab list */}
      <div className={containerStyles}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={getTabStyles(tab.id)}
            role="tab"
            aria-selected={activeTabId === tab.id}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge && (
              <span 
                className="ml-2 text-xs px-1.5 py-0.5 rounded-full"
                style={{ 
                  backgroundColor: tab.badgeColor || (variant === 'gradient' && activeTabId === tab.id ? 'rgba(255,255,255,0.2)' : '#e62e4d'),
                  color: variant === 'gradient' && activeTabId === tab.id ? 'white' : (tab.badgeColor ? 'white' : 'white')
                }}
              >
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="mt-4">
        {tabs.find(tab => tab.id === activeTabId)?.content}
      </div>
    </div>
  );
}
