'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

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