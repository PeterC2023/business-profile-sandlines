"use client";

import React, { useState, useEffect, ReactNode } from 'react';
import { X } from '@/components/ui/icons/settings';
import { Bell, CheckSquare, AlertTriangle, Info } from '@/components/ui/icons';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertToastProps {
  type?: AlertType;
  title: string;
  message?: string;
  duration?: number;
  onClose?: () => void;
  isOpen: boolean;
  action?: ReactNode;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

/**
 * Reusable AlertToast component for consistent notifications
 */
export default function AlertToast({
  type = 'info',
  title,
  message,
  duration = 5000,
  onClose,
  isOpen,
  action,
  position = 'top-right'
}: AlertToastProps) {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isVisible, duration]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      // Small delay to allow animation to complete
      setTimeout(onClose, 300);
    }
  };

  if (!isVisible) return null;

  // Alert type styles and icons
  const alertStyles = {
    success: {
      bgColor: 'bg-gradient-to-r from-green-500 to-emerald-600',
      icon: <CheckSquare className="w-5 h-5 text-white" />
    },
    error: {
      bgColor: 'bg-gradient-to-r from-[#e62e4d] to-red-600',
      icon: <X className="w-5 h-5 text-white" />
    },
    warning: {
      bgColor: 'bg-gradient-to-r from-amber-500 to-orange-600',
      icon: <AlertTriangle className="w-5 h-5 text-white" />
    },
    info: {
      bgColor: 'bg-gradient-to-r from-[#5e3b94] to-[#3e5f8a]',
      icon: <Info className="w-5 h-5 text-white" />
    }
  };

  // Position styles
  const positionStyles = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2'
  };

  return (
    <div 
      className={`fixed ${positionStyles[position]} z-50 max-w-sm w-full animate-slide-in-toast`}
      role="alert"
    >
      <div className={`${alertStyles[type].bgColor} rounded-lg shadow-lg overflow-hidden`}>
        <div className="p-4 text-white">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {alertStyles[type].icon}
            </div>
            <div className="ml-3 w-0 flex-1">
              <p className="font-medium">{title}</p>
              {message && <p className="mt-1 text-sm opacity-90">{message}</p>}
              {action && <div className="mt-3">{action}</div>}
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                className="inline-flex text-white focus:outline-none focus:ring-2 focus:ring-white"
                onClick={handleClose}
              >
                <span className="sr-only">Close</span>
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Progress bar */}
        {duration > 0 && (
          <div className="bg-black/10 h-1">
            <div 
              className="bg-white h-1 animate-shrink"
              style={{ animationDuration: `${duration}ms` }}
            ></div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes slideInToast {
          from {
            opacity: 0;
            transform: translateY(-1rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
        
        .animate-slide-in-toast {
          animation: slideInToast 0.3s ease-out forwards;
        }
        
        .animate-shrink {
          animation-name: shrink;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }
      `}</style>
    </div>
  );
}
