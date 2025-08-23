import { makeStyles, tokens } from '@fluentui/react-components';

// Local constants for consistent sizing - conservative responsive approach
const SIZES = {
  maxContentWidth: 'min(85vw, 90rem)', // More conservative: 85% viewport width, capped at 1440px
  inputMinWidth: 'clamp(12rem, 15vw, 20rem)', // Slightly less aggressive scaling
  inputMaxWidth: 'clamp(18rem, 25vw, 30rem)', // More conservative max width
  tablet: '48rem', // 768px
  desktop: '75rem', // 1200px  
  wide: '100rem', // 1600px for wide screens
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
    padding: 'clamp(0.5rem, 1.5vw, 2rem)', // Match header and content wrapper padding
    width: '100%',
    maxWidth: SIZES.maxContentWidth,
    margin: '0 auto',
    // Allow tab content to expand to fill available space
    flex: '1',
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
    
    // Conservative responsive: maximum 2 columns to maintain original layout feel
    [`@media (min-width: ${SIZES.tablet})`]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
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

  // H2 heading style
  h2Heading: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase400,
    marginBottom: tokens.spacingVerticalS,
    margin: 0,
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
