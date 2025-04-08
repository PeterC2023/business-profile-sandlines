"use client";

import React, { ReactNode, useEffect, useRef } from 'react';
import { X } from '@/components/ui/icons/settings';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnClickOutside?: boolean;
  showCloseButton?: boolean;
  variant?: 'default' | 'glass' | 'gradient';
  gradientColors?: string[];
}

/**
 * Reusable Modal component with Sandlines styling
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnClickOutside = true,
  showCloseButton = true,
  variant = 'default',
  gradientColors = ['from-[#5e3b94]', 'to-[#e62e4d]']
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        closeOnClickOutside &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent scrolling on body when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      // Restore scrolling when modal closes
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, closeOnClickOutside]);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Size classes
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4',
  };

  // Variant classes
  const variantClasses = {
    default: 'bg-white dark:bg-gray-800 shadow-xl',
    glass: 'backdrop-blur-md bg-white/80 dark:bg-gray-800/80 shadow-xl border border-white/20 dark:border-gray-700/20',
    gradient: `bg-gradient-to-r ${gradientColors.join(' ')} text-white shadow-xl`,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur effect */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal container */}
      <div
        ref={modalRef}
        className={`relative w-full rounded-xl overflow-hidden animate-scale-in ${sizeClasses[size]} ${variantClasses[variant]}`}
      >
        {/* Modal header */}
        {title && (
          <div 
            className={`
              px-6 py-4 border-b
              ${variant === 'gradient' 
                ? 'border-white/10' 
                : 'border-gray-100 dark:border-gray-700'}
            `}
          >
            <div className="flex items-center justify-between">
              <h3 
                className={`
                  text-lg font-medium 
                  ${variant === 'gradient' ? 'text-white' : 'text-gray-800 dark:text-white'}
                `}
              >
                {title}
              </h3>
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className={`
                    p-1 rounded-full transition-colors
                    ${variant === 'gradient' 
                      ? 'hover:bg-white/10' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
                  `}
                >
                  <X 
                    className={`
                      h-5 w-5 
                      ${variant === 'gradient' ? 'text-white' : 'text-gray-500 dark:text-gray-400'}
                    `} 
                  />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Modal content */}
        <div className="p-6">{children}</div>

        {/* Modal footer */}
        {footer && (
          <div 
            className={`
              px-6 py-4 border-t
              ${variant === 'gradient' 
                ? 'border-white/10 bg-black/10' 
                : 'border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900'}
            `}
          >
            {footer}
          </div>
        )}
      </div>

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scaleIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
