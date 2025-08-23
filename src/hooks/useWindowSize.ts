import { useState, useEffect } from 'react';
import { useEventListener } from './useEventListener';

interface WindowSize {
  width: number;
  height: number;
}

/**
 * FluentUI-style hook to track window dimensions
 * Provides reactive window size with automatic updates
 */
export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>(() => {
    // Initialize with current window size if available
    if (typeof window !== 'undefined') {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    }
    // Fallback for SSR
    return { width: 0, height: 0 };
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  // Use our custom event listener hook
  useEventListener('resize', handleResize);

  // Set initial size on mount (handles SSR case)
  useEffect(() => {
    handleResize();
  }, []);

  return windowSize;
}

/**
 * Hook for getting viewport-relative dimensions
 * Useful for modals, overlays, and photo viewers
 */
export function useViewportDimensions(percentage: number = 0.9) {
  const { width, height } = useWindowSize();
  
  return {
    width: width * percentage,
    height: height * percentage,
    fullWidth: width,
    fullHeight: height,
  };
}
