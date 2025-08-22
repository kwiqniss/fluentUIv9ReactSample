/**
 * Utility functions for rem-based calculations
 * Handles conversion between rem units (developer-friendly) and px units (DOM measurements)
 */

/**
 * Get the current root font size in pixels
 * This respects user preferences and browser settings
 */
const getRootFontSize = (): number => {
  if (typeof window !== 'undefined') {
    const rootElement = document.documentElement;
    const computedStyle = window.getComputedStyle(rootElement);
    return parseFloat(computedStyle.fontSize) || 16; // Fallback to 16px
  }
  return 16; // Default fallback for SSR
};

/**
 * Convert rem values to pixels based on current root font size
 * @param remValue - The value in rem units
 * @returns The equivalent value in pixels
 */
export const remToPx = (remValue: number): number => {
  return remValue * getRootFontSize();
};

/**
 * Convert pixels to rem values based on current root font size
 * @param pxValue - The value in pixels
 * @returns The equivalent value in rem units
 */
export const pxToRem = (pxValue: number): number => {
  return pxValue / getRootFontSize();
};

/**
 * Tab overflow calculation constants in rem
 * These are the values developers should configure
 */
export const TAB_OVERFLOW_CONFIG = {
  /** Width reserved for the More button */
  moreButtonWidth: 7.5, // rem
  
  /** Buffer space when deciding to show More button */
  showThreshold: 2, // rem
  
  /** Buffer space around More button */
  buffer: 1, // rem
  
  /** Generous buffer for expanding back to all tabs */
  generousBuffer: 4, // rem
} as const;

/**
 * Get tab overflow configuration values converted to pixels
 * This handles the conversion automatically
 */
export const getTabOverflowConfigPx = () => ({
  moreButtonWidthPx: remToPx(TAB_OVERFLOW_CONFIG.moreButtonWidth),
  showThresholdPx: remToPx(TAB_OVERFLOW_CONFIG.showThreshold),
  bufferPx: remToPx(TAB_OVERFLOW_CONFIG.buffer),
  generousBufferPx: remToPx(TAB_OVERFLOW_CONFIG.generousBuffer),
});
