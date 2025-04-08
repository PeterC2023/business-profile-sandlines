"use client";

import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  footer?: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  variant?: 'default' | 'gradient' | 'glass' | 'outline';
  gradientColors?: string[];
  badge?: {
    text: string;
    color?: string;
  };
}

/**
 * Reusable Card component with multiple variants to use across the application
 */
export default function Card({
  children,
  title,
  subtitle,
  icon,
  footer,
  className = '',
  onClick,
  hoverable = false,
  variant = 'default',
  gradientColors = ['from-[#5e3b94]', 'to-[#e62e4d]'],
  badge
}: CardProps) {
  // Base styles that apply to all variants
  const baseStyles = 'rounded-xl overflow-hidden transition-all duration-300';
  
  // Variant-specific styles
  const variantStyles = {
    default: 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm',
    gradient: `bg-gradient-to-r ${gradientColors.join(' ')} text-white shadow-md`,
    glass: 'backdrop-blur-md bg-white/70 dark:bg-gray-800/70 border border-white/20 dark:border-gray-700/20 shadow-lg',
    outline: 'border-2 border-gray-200 dark:border-gray-700 bg-transparent'
  };
  
  // Hover effect styles
  const hoverStyles = hoverable 
    ? 'cursor-pointer hover:shadow-lg transform hover:-translate-y-1' 
    : '';
  
  return (
    <div 
      className={`${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`}
      onClick={onClick}
    >
      {/* Card Header */}
      {(title || icon) && (
        <div className={`p-4 ${variant === 'gradient' ? '' : 'border-b border-gray-100 dark:border-gray-700'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {icon && <div className="flex-shrink-0">{icon}</div>}
              <div>
                {title && <h3 className={`font-medium ${variant === 'gradient' ? 'text-white' : 'text-gray-800 dark:text-white'}`}>{title}</h3>}
                {subtitle && <p className={`text-sm ${variant === 'gradient' ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>{subtitle}</p>}
              </div>
            </div>
            {badge && (
              <span 
                className="text-xs px-2 py-1 rounded-full" 
                style={{ 
                  backgroundColor: badge.color || '#e62e4d',
                  color: '#fff'
                }}
              >
                {badge.text}
              </span>
            )}
          </div>
        </div>
      )}
      
      {/* Card Content */}
      <div className="p-4">
        {children}
      </div>
      
      {/* Card Footer */}
      {footer && (
        <div className={`p-3 ${variant === 'gradient' ? 'bg-white/10' : 'bg-gray-50 dark:bg-gray-700/30'} border-t ${variant === 'gradient' ? 'border-white/10' : 'border-gray-100 dark:border-gray-700'}`}>
          {footer}
        </div>
      )}
    </div>
  );
}
