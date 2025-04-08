"use client";

import React, { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  gradientColors?: string[];
}

/**
 * Reusable Button component with Sandlines brand styling
 * Primary: Purple (#5e3b94)
 * Secondary: Red (#e62e4d)
 * Tertiary: Blue (#3e5f8a)
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  loading = false,
  gradientColors = ['from-[#5e3b94]', 'to-[#e62e4d]'],
  className = '',
  ...props
}: ButtonProps) {
  // Base button styles
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Size styles
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-[#5e3b94] hover:bg-[#5e3b94]/90 text-white focus:ring-[#5e3b94]/50',
    secondary: 'bg-[#e62e4d] hover:bg-[#e62e4d]/90 text-white focus:ring-[#e62e4d]/50',
    tertiary: 'bg-[#3e5f8a] hover:bg-[#3e5f8a]/90 text-white focus:ring-[#3e5f8a]/50',
    outline: 'border border-gray-300 dark:border-gray-600 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 focus:ring-gray-500/50',
    ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 focus:ring-gray-500/50',
    gradient: `bg-gradient-to-r ${gradientColors.join(' ')} hover:opacity-90 text-white focus:ring-[#5e3b94]/50`
  };
  
  // Width styles
  const widthStyles = fullWidth ? 'w-full' : '';
  
  // Disabled styles
  const disabledStyles = props.disabled ? 'opacity-60 cursor-not-allowed' : '';
  
  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyles} ${disabledStyles} ${className}`}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {icon && iconPosition === 'left' && !loading && (
        <span className="mr-2">{icon}</span>
      )}
      
      {children}
      
      {icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
}
