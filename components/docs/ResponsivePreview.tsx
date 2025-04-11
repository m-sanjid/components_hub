'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/lib/theme-context';
import {
  IconDeviceMobile,
  IconDeviceTablet,
  IconDeviceDesktop,
  IconRotate,
  IconRuler,
  IconMaximize,
  IconMinimize,
  IconDeviceLaptop,
  IconDownload
} from '@tabler/icons-react';

interface ResponsivePreviewProps {
  children: React.ReactNode;
  initialViewport?: string;
  showDimensions?: boolean;
  allowCustomSize?: boolean;
  showDownloadOption?: boolean;
}

interface Viewport {
  name: string;
  width: string;
  height?: string;
  icon: React.ReactNode;
}

export function ResponsivePreview({
  children,
  initialViewport = 'desktop',
  showDimensions = true,
  allowCustomSize = true,
  showDownloadOption = true
}: ResponsivePreviewProps) {
  const [viewport, setViewport] = useState(initialViewport);
  const [isRotated, setIsRotated] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [customWidth, setCustomWidth] = useState("800");
  const [customHeight, setCustomHeight] = useState("600");
  const [isCustomSize, setIsCustomSize] = useState(false);
  const [scale, setScale] = useState('scale(1)');
  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const viewports: Record<string, Viewport> = {
    mobile: {
      name: 'Mobile',
      width: '375px',
      height: '667px',
      icon: <IconDeviceMobile className="w-4 h-4" />
    },
    tablet: {
      name: 'Tablet',
      width: '768px',
      height: '1024px',
      icon: <IconDeviceTablet className="w-4 h-4" />
    },
    laptop: {
      name: 'Laptop',
      width: '1024px',
      height: '768px',
      icon: <IconDeviceLaptop className="w-4 h-4" />
    },
    desktop: {
      name: 'Desktop',
      width: '100%',
      height: 'auto',
      icon: <IconDeviceDesktop className="w-4 h-4" />
    }
  };

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullScreen) {
        setIsFullScreen(false);
      }
    };
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isFullScreen]);

  const toggleFullscreen = () => setIsFullScreen(!isFullScreen);
  const toggleOrientation = () => {
    if (viewport === 'desktop') return;
    setIsRotated(!isRotated);
  };

  const getCurrentDimensions = () => {
    if (isCustomSize) {
      return isRotated
        ? `${customHeight}px × ${customWidth}px`
        : `${customWidth}px × ${customHeight}px`;
    }
    const current = viewports[viewport];
    if (current.width === '100%') return 'Responsive';
    return isRotated && current.height
      ? `${current.height} × ${current.width}`
      : `${current.width} × ${current.height}`;
  };

  const handleDownload = () => {
    alert('Download functionality would capture the current preview as an image');
  };

  const getContentStyle = () => {
    if (isCustomSize) {
      return {
        width: isRotated ? customHeight + 'px' : customWidth + 'px',
        height: isRotated ? customWidth + 'px' : customHeight + 'px',
        maxWidth: '100%',
        transition: 'width 0.3s ease, height 0.3s ease',
        overflow: 'auto',
        position: 'relative'
      };
    }
    const { width, height } = viewports[viewport];
    if (width === '100%') {
      return {
        width: '100%',
        maxWidth: '100%',
        transition: 'width 0.3s ease',
      };
    }
    return {
      width: isRotated && height ? height : width,
      height: isRotated ? width : height,
      maxWidth: '100%',
      transition: 'width 0.3s ease, height 0.3s ease',
      overflow: 'auto',
      position: 'relative'
    };
  };

  const calculateScale = () => {
    if (typeof window === 'undefined') return 'scale(1)';
    if (viewport === 'desktop' && !isCustomSize) return 'scale(1)';
    const targetWidth = isCustomSize
      ? (isRotated ? parseInt(customHeight) : parseInt(customWidth))
      : (isRotated && viewports[viewport].height
          ? parseInt(viewports[viewport].height!)
          : parseInt(viewports[viewport].width));
    const padding = 32;
    const maxAvailable = window.innerWidth - padding;
    const scale = Math.min(1, maxAvailable / targetWidth);
    return `scale(${scale})`;
  };

  useEffect(() => {
    setScale(calculateScale());
    const handleResize = () => setScale(calculateScale());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [viewport, isCustomSize, customWidth, customHeight, isRotated]);

  // --- DRAG TO RESIZE ---
  const isDraggingRef = useRef(false);

  const onDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const rect = previewRef.current?.getBoundingClientRect();
    if (!rect) return;

    const newWidth = clientX - rect.left;
    const newHeight = clientY - rect.top;

    if (!isRotated) {
      setCustomWidth(String(Math.max(200, Math.round(newWidth))));
      setCustomHeight(String(Math.max(200, Math.round(newHeight))));
    } else {
      setCustomHeight(String(Math.max(200, Math.round(newWidth))));
      setCustomWidth(String(Math.max(200, Math.round(newHeight))));
    }
  };

  const startDrag = () => {
    isDraggingRef.current = true;
    window.addEventListener('mousemove', onDrag as any);
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('touchmove', onDrag as any);
    window.addEventListener('touchend', stopDrag);
  };

  const stopDrag = () => {
    isDraggingRef.current = false;
    window.removeEventListener('mousemove', onDrag as any);
    window.removeEventListener('mouseup', stopDrag);
    window.removeEventListener('touchmove', onDrag as any);
    window.removeEventListener('touchend', stopDrag);
  };

  return (
    <div
      className={`my-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden ${
        isFullScreen ? 'fixed inset-0 z-50 my-0 rounded-none' : ''
      }`}
      ref={containerRef}
    >
      <div className="p-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex flex-wrap md:flex-nowrap justify-between items-center gap-2">
        <div className="flex gap-2">
          {Object.entries(viewports).map(([key, { name, icon }]) => (
            <button
              key={key}
              onClick={() => {
                setViewport(key);
                setIsCustomSize(false);
              }}
              className={`flex items-center px-2 py-1 rounded text-sm ${
                viewport === key && !isCustomSize
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
              title={name}
            >
              {icon}
              <span className="ml-1 hidden sm:inline">{name}</span>
            </button>
          ))}
          {allowCustomSize && (
            <button
              onClick={() => setIsCustomSize(!isCustomSize)}
              className={`flex items-center px-2 py-1 rounded text-sm ${
                isCustomSize
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
              title="Custom Size"
            >
              <IconRuler className="w-4 h-4" />
              <span className="ml-1 hidden sm:inline">Custom</span>
            </button>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {isCustomSize && (
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={customWidth}
                onChange={(e) => setCustomWidth(e.target.value)}
                className="w-16 px-2 py-1 text-xs rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                aria-label="Width"
              />
              <span className="text-gray-500 dark:text-gray-400">×</span>
              <input
                type="number"
                value={customHeight}
                onChange={(e) => setCustomHeight(e.target.value)}
                className="w-16 px-2 py-1 text-xs rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                aria-label="Height"
              />
            </div>
          )}

          {viewport !== 'desktop' && (
            <button
              onClick={toggleOrientation}
              className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              title="Rotate device"
            >
              <IconRotate className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={toggleFullscreen}
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            title={isFullScreen ? "Exit fullscreen" : "Fullscreen"}
          >
            {isFullScreen ? <IconMinimize className="w-4 h-4" /> : <IconMaximize className="w-4 h-4" />}
          </button>

          {showDownloadOption && (
            <button
              onClick={handleDownload}
              className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              title="Download as image"
            >
              <IconDownload className="w-4 h-4" />
            </button>
          )}

          {showDimensions && (
            <div className="text-xs text-gray-500 dark:text-gray-400 ml-2 hidden sm:block">
              {getCurrentDimensions()}
            </div>
          )}
        </div>
      </div>

      <div
        className={`overflow-auto ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} p-4 ${
          isFullScreen ? 'h-[calc(100vh-60px)]' : ''
        }`}
      >
        <div className="flex justify-center">
          <div
            className="relative inline-block"
            style={{
              transform: scale,
              transformOrigin: 'top left',
            }}
          >
            <div
              ref={previewRef}
              style={getContentStyle()}
              className="border border-gray-200 dark:border-gray-700 rounded shadow-sm"
            >
              {children}
              {isCustomSize && (
                <div
                  onMouseDown={startDrag}
                  onTouchStart={startDrag}
                  className="absolute right-0 bottom-0 w-4 h-4 cursor-se-resize bg-gray-400 dark:bg-gray-600 z-10"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
