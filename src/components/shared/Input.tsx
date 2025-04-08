"use client";

import React, { InputHTMLAttributes, ReactNode, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  variant?: 'default' | 'outlined' | 'filled';
  completed?: boolean;
  highlight?: boolean;
}

/**
 * Reusable Input component with Sandlines styling
 */
const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  helperText,
  error,
  icon,
  iconPosition = 'left',
  fullWidth = true,
  variant = 'default',
  className = '',
  completed = false,
  highlight = false,
  ...props
}, ref) => {
  const baseInputStyles = 'rounded-lg focus:outline-none transition-all duration-200';
  
  // Variant-specific styles
  const variantStyles = {
    default: 'border border-gray-300 dark:border-gray-600 px-4 py-2 focus:border-[#5e3b94] focus:ring-2 focus:ring-[#5e3b94]/30 dark:focus:border-[#5e3b94] dark:bg-gray-800 dark:text-white',
    outlined: 'border-2 border-gray-200 dark:border-gray-700 px-4 py-2 focus:border-[#5e3b94] dark:bg-transparent dark:text-white',
    filled: 'border border-transparent bg-gray-100 dark:bg-gray-700 px-4 py-2 focus:bg-transparent focus:border-[#5e3b94] dark:text-white'
  };
  
  // Width styles
  const widthStyles = fullWidth ? 'w-full' : '';
  
  // Icon positioning
  const iconStyles = icon 
    ? iconPosition === 'left' ? 'pl-10' : 'pr-10'
    : '';
  
  // Special states
  const completedStyles = completed
    ? 'border-[#50c878] bg-[#50c878]/5 ring-2 ring-[#50c878]/30'
    : '';
  
  const highlightStyles = highlight && !completed
    ? 'border-[#e62e4d] ring-2 ring-[#e62e4d]/30 pulse-error'
    : '';
    
  const errorStyles = error
    ? 'border-red-500 ring-2 ring-red-500/30'
    : '';
  
  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && (
        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
            {icon}
          </div>
        )}
        
        <input
          ref={ref}
          className={`
            ${baseInputStyles} 
            ${variantStyles[variant]} 
            ${widthStyles} 
            ${iconStyles} 
            ${error ? errorStyles : completed ? completedStyles : highlight ? highlightStyles : ''}
          `}
          {...props}
        />
        
        {icon && iconPosition === 'right' && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
            {icon}
          </div>
        )}
      </div>
      
      {error ? (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      ) : helperText ? (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
      ) : null}
      
      <style jsx global>{`
        @keyframes pulseError {
          0% { box-shadow: 0 0 0 0 rgba(230, 46, 77, 0.4); }
          70% { box-shadow: 0 0 0 5px rgba(230, 46, 77, 0); }
          100% { box-shadow: 0 0 0 0 rgba(230, 46, 77, 0); }
        }
        
        .pulse-error {
          animation: pulseError 1.5s infinite;
        }
      `}</style>
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
