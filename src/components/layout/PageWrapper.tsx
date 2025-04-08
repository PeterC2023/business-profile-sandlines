"use client";

import React, { ReactNode } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface PageWrapperProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  isFullPage?: boolean;
}

/**
 * PageWrapper - A consistent wrapper for all pages that maintains
 * the dashboard layout structure with header and sidebar
 */
export default function PageWrapper({ 
  children, 
  title, 
  subtitle,
  isFullPage = false 
}: PageWrapperProps) {
  return (
    <DashboardLayout>
      <div className={`${isFullPage ? 'h-full' : 'p-6'}`}>
        {(title || subtitle) && !isFullPage && (
          <div className="mb-6">
            {title && <h1 className="text-2xl font-bold mb-1">{title}</h1>}
            {subtitle && <p className="text-gray-600">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </DashboardLayout>
  );
}
