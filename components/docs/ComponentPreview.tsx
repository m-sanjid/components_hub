'use client';

import React from 'react'
import { ResponsivePreview } from './ResponsivePreview';

export const ComponentPreview = ({ children, showResponsiveView = false }: { children: React.ReactNode, showResponsiveView?: boolean }) => {
  if (showResponsiveView) {
    return (
      <ResponsivePreview initialViewport="desktop">
        <div className="w-full">
          {children}
        </div>
      </ResponsivePreview>
    );
  }
  
  return (
    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
      {children}
    </div>
  );
}