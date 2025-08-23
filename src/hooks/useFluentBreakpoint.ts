import { useState, useEffect } from 'react';

/**
 * FluentUI-aligned responsive breakpoints
 * Based on Microsoft's Fluent Design System breakpoints
 */
export const FLUENT_BREAKPOINTS = {
  // These align with Microsoft's Fluent Design breakpoints
  small: 480,    // Small mobile
  medium: 640,   // Large mobile / small tablet  
  large: 1024,   // Tablet / small desktop
  xlarge: 1366,  // Desktop
  xxlarge: 1920, // Large desktop
} as const;

export type FluentBreakpoint = keyof typeof FLUENT_BREAKPOINTS;

/**
 * Hook to detect current screen size using FluentUI-aligned breakpoints
 * Returns the current breakpoint name and helper functions
 */
export const useFluentBreakpoint = () => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<FluentBreakpoint>('large');
  const [windowWidth, setWindowWidth] = useState<number>(1024);

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      setWindowWidth(width);

      if (width < FLUENT_BREAKPOINTS.small) {
        setCurrentBreakpoint('small');
      } else if (width < FLUENT_BREAKPOINTS.medium) {
        setCurrentBreakpoint('small');
      } else if (width < FLUENT_BREAKPOINTS.large) {
        setCurrentBreakpoint('medium');
      } else if (width < FLUENT_BREAKPOINTS.xlarge) {
        setCurrentBreakpoint('large');
      } else if (width < FLUENT_BREAKPOINTS.xxlarge) {
        setCurrentBreakpoint('xlarge');
      } else {
        setCurrentBreakpoint('xxlarge');
      }
    };

    // Set initial breakpoint
    updateBreakpoint();

    // Listen for window resize
    window.addEventListener('resize', updateBreakpoint);
    
    return () => {
      window.removeEventListener('resize', updateBreakpoint);
    };
  }, []);

  return {
    currentBreakpoint,
    windowWidth,
    // Helper functions for common breakpoint checks
    isSmall: currentBreakpoint === 'small',
    isMedium: currentBreakpoint === 'medium',
    isLarge: currentBreakpoint === 'large',
    isXLarge: currentBreakpoint === 'xlarge',
    isXXLarge: currentBreakpoint === 'xxlarge',
    // Mobile vs desktop detection
    isMobile: currentBreakpoint === 'small' || currentBreakpoint === 'medium',
    isDesktop: currentBreakpoint === 'large' || currentBreakpoint === 'xlarge' || currentBreakpoint === 'xxlarge',
    // Responsive helpers
    isAtLeast: (breakpoint: FluentBreakpoint) => windowWidth >= FLUENT_BREAKPOINTS[breakpoint],
    isBelow: (breakpoint: FluentBreakpoint) => windowWidth < FLUENT_BREAKPOINTS[breakpoint],
  };
};

/**
 * Media query strings for use in makeStyles
 */
export const fluentMediaQueries = {
  small: `@media (max-width: ${FLUENT_BREAKPOINTS.small - 1}px)`,
  medium: `@media (min-width: ${FLUENT_BREAKPOINTS.small}px) and (max-width: ${FLUENT_BREAKPOINTS.medium - 1}px)`,
  large: `@media (min-width: ${FLUENT_BREAKPOINTS.medium}px) and (max-width: ${FLUENT_BREAKPOINTS.large - 1}px)`,
  xlarge: `@media (min-width: ${FLUENT_BREAKPOINTS.large}px) and (max-width: ${FLUENT_BREAKPOINTS.xlarge - 1}px)`,
  xxlarge: `@media (min-width: ${FLUENT_BREAKPOINTS.xlarge}px)`,
  
  // Convenience queries
  mobile: `@media (max-width: ${FLUENT_BREAKPOINTS.medium - 1}px)`,
  tablet: `@media (min-width: ${FLUENT_BREAKPOINTS.medium}px) and (max-width: ${FLUENT_BREAKPOINTS.large - 1}px)`,
  desktop: `@media (min-width: ${FLUENT_BREAKPOINTS.large}px)`,
  
  // Min-width queries (mobile-first)
  fromSmall: `@media (min-width: ${FLUENT_BREAKPOINTS.small}px)`,
  fromMedium: `@media (min-width: ${FLUENT_BREAKPOINTS.medium}px)`,
  fromLarge: `@media (min-width: ${FLUENT_BREAKPOINTS.large}px)`,
  fromXLarge: `@media (min-width: ${FLUENT_BREAKPOINTS.xlarge}px)`,
  fromXXLarge: `@media (min-width: ${FLUENT_BREAKPOINTS.xxlarge}px)`,
  
  // Max-width queries (desktop-first)
  upToSmall: `@media (max-width: ${FLUENT_BREAKPOINTS.small - 1}px)`,
  upToMedium: `@media (max-width: ${FLUENT_BREAKPOINTS.medium - 1}px)`,
  upToLarge: `@media (max-width: ${FLUENT_BREAKPOINTS.large - 1}px)`,
  upToXLarge: `@media (max-width: ${FLUENT_BREAKPOINTS.xlarge - 1}px)`,
} as const;
