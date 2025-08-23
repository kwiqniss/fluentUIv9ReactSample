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
  tabContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXL,
    padding: tokens.spacingHorizontalL,
    width: '100%',
    maxWidth: SIZES.maxContentWidth,
    margin: '0 auto',
  },

  headerSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
  },

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

  sectionContainer: {
    marginTop: tokens.spacingVerticalL,
    marginBottom: tokens.spacingVerticalL,
  },

  componentItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
    minWidth: SIZES.inputMinWidth,
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

  // Standardized tab content container
  tabContentStandardized: {
    padding: tokens.spacingHorizontalL,
    maxWidth: SIZES.maxContentWidth,
    margin: '0 auto',
    width: '100%',
  },

  // Global webkit date/time picker icon fix for dark theme
  webkitIconFix: {
    // Apply to any date/time input anywhere in the app
    '& input[type="date"]::-webkit-calendar-picker-indicator': {
      '@media (prefers-color-scheme: dark)': {
        filter: 'invert(1)',
      },
    },
    '& input[type="time"]::-webkit-time-picker-indicator': {
      '@media (prefers-color-scheme: dark)': {
        filter: 'invert(1)',
      },
    },
    '& input[type="datetime-local"]::-webkit-calendar-picker-indicator': {
      '@media (prefers-color-scheme: dark)': {
        filter: 'invert(1)',
      },
    },
    '& input[type="month"]::-webkit-calendar-picker-indicator': {
      '@media (prefers-color-scheme: dark)': {
        filter: 'invert(1)',
      },
    },
    '& input[type="week"]::-webkit-calendar-picker-indicator': {
      '@media (prefers-color-scheme: dark)': {
        filter: 'invert(1)',
      },
    },
  },
});
