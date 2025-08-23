import { makeStyles, tokens } from '@fluentui/react-components';

// Local constants for consistent sizing
const SIZES = {
  maxContentWidth: '75rem',
  inputMinWidth: '17.5rem',
  inputMaxWidth: '25rem',
  tablet: '48rem',
} as const;

/**
 * Shared layout styles using FluentUI design tokens, percentages, and relative units
 * Simple, consistent layout patterns for all tabs
 */
export const sharedLayoutStyles = makeStyles({
  // Main tab container - uses FluentUI tokens for consistent spacing
  tabContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXL,
    padding: tokens.spacingHorizontalL,
    width: '100%',
    maxWidth: SIZES.maxContentWidth, // ~1200px max width
    margin: '0 auto',
  },

  // Header section for tab title and description
  headerSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
  },

  // Form grid - responsive 2-column layout using CSS Grid
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: tokens.spacingVerticalL,
    width: '100%',
    
    // 2 columns on medium screens and up
    '@media (min-width: 48rem)': {
      gridTemplateColumns: '1fr 1fr',
      gap: tokens.spacingHorizontalXL,
    },
  },

  // Actions section for buttons
  actionsSection: {
    display: 'flex',
    gap: tokens.spacingHorizontalM,
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: tokens.spacingVerticalL,
  },

  // Section spacing for separating content areas
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL,
  },

  // Legacy section container for backward compatibility
  sectionContainer: {
    marginTop: tokens.spacingVerticalL,
    marginBottom: tokens.spacingVerticalL,
  },

  // Standard component item container
  componentItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
    minWidth: SIZES.inputMinWidth, // ~280px
    maxWidth: SIZES.inputMaxWidth, // ~400px
  },

  // Flexible button container
  buttonContainer: {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
    marginTop: tokens.spacingVerticalS,
    flexWrap: 'wrap',
  },

  // H3 heading style
  h3Heading: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase300,
    marginBottom: tokens.spacingVerticalXS,
  },

  // Global webkit date/time picker icon fix for dark theme
  webkitIconFix: {
    // Apply to any date/time input anywhere in the app
    '& input[type="date"]::-webkit-calendar-picker-indicator': {
      '@media (prefers-color-scheme: dark)': {
        filter: 'invert(1) !important',
      },
    },
    '& input[type="time"]::-webkit-time-picker-indicator': {
      '@media (prefers-color-scheme: dark)': {
        filter: 'invert(1) !important',
      },
    },
    '& input[type="datetime-local"]::-webkit-calendar-picker-indicator': {
      '@media (prefers-color-scheme: dark)': {
        filter: 'invert(1) !important',
      },
    },
    '& input[type="month"]::-webkit-calendar-picker-indicator': {
      '@media (prefers-color-scheme: dark)': {
        filter: 'invert(1) !important',
      },
    },
    '& input[type="week"]::-webkit-calendar-picker-indicator': {
      '@media (prefers-color-scheme: dark)': {
        filter: 'invert(1) !important',
      },
    },
  },
});
