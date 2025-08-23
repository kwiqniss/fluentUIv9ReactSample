/**
 * Design system constants for consistent sizing and breakpoints
 * Uses FluentUI-aligned responsive breakpoints and design tokens
 */

import { FLUENT_BREAKPOINTS, fluentMediaQueries } from '../hooks/useFluentBreakpoint';

// Export the FluentUI-aligned breakpoints
export { FLUENT_BREAKPOINTS as BREAKPOINTS };
export { fluentMediaQueries as mediaQueries };

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
// Using FluentUI-aligned breakpoints from the hook
// The main media queries are exported from useFluentBreakpoint
// These are kept for backward compatibility with existing code
export const legacyMediaQueries = {
  mobile: `@media (max-width: 32rem)`,      // 512px
  tablet: `@media (min-width: 48rem)`,      // 768px  
  desktop: `@media (min-width: 64rem)`,     // 1024px
  large: `@media (min-width: 75rem)`,       // 1200px
  
  // Specific breakpoints used in the app
  belowTablet: `@media (max-width: 48rem)`,
  belowDesktop: `@media (max-width: 64rem)`,
  aboveTablet: `@media (min-width: 48rem)`,
  aboveDesktop: `@media (min-width: 64rem)`,
} as const;
