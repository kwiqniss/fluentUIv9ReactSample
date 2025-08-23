/**
 * Design system constants for consistent sizing and breakpoints
 * These values work well with FluentUI design tokens
 */

// Media query breakpoints (using rem for consistency with tokens)
export const BREAKPOINTS = {
  // Small mobile devices
  mobile: '32rem',   // 512px at 16px root
  
  // Tablet and small desktop
  tablet: '48rem',   // 768px at 16px root
  
  // Medium desktop
  desktop: '64rem',  // 1024px at 16px root
  
  // Large desktop
  large: '75rem',    // 1200px at 16px root
  
  // Extra large desktop
  extraLarge: '80rem', // 1280px at 16px root
} as const;

// Common sizing values that don't have direct token equivalents
export const SIZES = {
  // Container widths
  maxContentWidth: '75rem',     // ~1200px
  
  // Component sizing
  colorInputWidth: '3rem',      // ~48px
  colorInputHeight: '2.5rem',   // ~40px
  
  // Form constraints
  inputMinWidth: '17.5rem',     // ~280px
  inputMaxWidth: '25rem',       // ~400px
  textareaMinHeight: '5rem',    // ~80px
  
  // Message container heights
  messagesMinHeight: '3rem',    // ~48px
  messagesMaxHeight: '10rem',   // ~160px
  
  // Button and control widths
  dropdownWidth: '12rem',       // ~192px
  buttonMinWidth: '7.5rem',     // ~120px
  buttonMaxWidth: '12.5rem',    // ~200px
} as const;

// Helper function to create media queries
export const mediaQueries = {
  mobile: `@media (max-width: ${BREAKPOINTS.mobile})`,
  tablet: `@media (min-width: ${BREAKPOINTS.tablet})`,
  desktop: `@media (min-width: ${BREAKPOINTS.desktop})`,
  large: `@media (min-width: ${BREAKPOINTS.large})`,
  
  // Specific breakpoints used in the app
  belowTablet: `@media (max-width: ${BREAKPOINTS.tablet})`,
  belowDesktop: `@media (max-width: ${BREAKPOINTS.desktop})`,
  aboveTablet: `@media (min-width: ${BREAKPOINTS.tablet})`,
  aboveDesktop: `@media (min-width: ${BREAKPOINTS.desktop})`,
} as const;
