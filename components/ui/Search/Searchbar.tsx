'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export function SearchKeyboardHelp() {
  return (
    <div className="border-t px-4 py-2 text-xs text-gray-500 flex justify-between items-center">
      <div className="flex space-x-4">
        <div className="flex items-center">
          <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-800 mr-1">↑</kbd>
          <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-800 mr-1">↓</kbd>
          <span>Navigate</span>
        </div>
        <div className="flex items-center">
          <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-800 mr-1">Enter</kbd>
          <span>Select</span>
        </div>
        <div className="flex items-center">
          <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-800 mr-1">Esc</kbd>
          <span>Close</span>
        </div>
      </div>
      <div className="text-gray-400">
        Press <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-800">⌘</kbd>+<kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-800">K</kbd> to search
      </div>
    </div>
  );
}
export function Portal({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const [mounted, setMounted] = useState(false);
  const portalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create the portal container
    const portalContainer = document.createElement('div');
    portalContainer.setAttribute('data-portal-root', 'true');
    document.body.appendChild(portalContainer);
    portalRef.current = portalContainer;
    setMounted(true);

    // Clean up
    return () => {
      if (portalContainer && document.body.contains(portalContainer)) {
        document.body.removeChild(portalContainer);
      }
    };
  }, []);

  if (!mounted) {
    return null;
  }

  // Use React's createPortal to render children into the portal container
  return createPortal(children, portalRef.current!);
}