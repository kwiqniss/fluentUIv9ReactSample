import { makeStyles, tokens } from '@fluentui/react-components';

/**
 * Minimal shared styles - trust FluentUI defaults
 * Only include essential layout that FluentUI doesn't provide
 */
export const sharedStyles = makeStyles({
  // Use FluentUI-style grid layout for inputs
  inputGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(17.5rem, 1fr))', // ~280px
    gap: tokens.spacingHorizontalL,
    marginBottom: tokens.spacingVerticalL,
    '@media (min-width: 48rem)': { // ~768px
      gridTemplateColumns: '1fr 1fr', // Exactly 2 columns on larger screens
    },
  },
  
  // Individual field styling
  field: {
    minWidth: '17.5rem', // ~280px
    maxWidth: '25rem',   // ~400px
    
    // Constrain input elements
    '& input, & textarea': {
      width: '100%',
    },
    
    '& textarea': {
      minHeight: '5rem', // ~80px
    },
  },

  // Main tab content with proper spacing
  tabContentStandardized: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXL,
    padding: tokens.spacingHorizontalL,
    maxWidth: '75rem', // ~1200px
    width: '100%',
  },

  // Section headers with proper spacing
  sectionTitle: {
    marginBottom: tokens.spacingVerticalL,
    marginTop: tokens.spacingVerticalXL,
    '&:first-child': {
      marginTop: 0,
    },
  },

  // Minimal container
  mainContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    padding: tokens.spacingHorizontalM,
  },

  cardContainer: {
    flex: '1',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },

  // Message areas
  messageScrollArea: {
    maxHeight: '12.5rem', // ~200px
    overflowY: 'auto',
    marginTop: tokens.spacingVerticalL,
    padding: tokens.spacingHorizontalM,
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
  },

  // Common container patterns
  sectionContainer: {
    marginTop: tokens.spacingVerticalL,
    marginBottom: tokens.spacingVerticalL,
  },

  // Flexible button container
  buttonContainer: {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
    marginTop: tokens.spacingVerticalS,
    flexWrap: 'wrap',
  },

  // Standard component item container
  componentItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
    minWidth: '17.5rem', // ~280px
    maxWidth: '25rem',   // ~400px
  },

  // Common input constraints
  inputConstraints: {
    '& input': {
      width: '100%',
    },
    '& textarea': {
      width: '100%',
      minHeight: '5rem', // ~80px
    },
  },

  // Standard submit button
  submitButton: {
    marginTop: tokens.spacingVerticalL,
    minWidth: '7.5rem', // ~120px
    maxWidth: '12.5rem', // ~200px
  },

  // Button styling
  actionButton: {
    marginTop: tokens.spacingVerticalL,
    minWidth: '7.5rem', // ~120px
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

  // Heading hierarchy styles
  // H1 - Largest and boldest (page title)
  h1Heading: {
    fontSize: tokens.fontSizeHero900,
    fontWeight: tokens.fontWeightBold,
    lineHeight: tokens.lineHeightHero900,
    marginBottom: tokens.spacingVerticalM,
  },

  // H2 - Large and bold (main tab headings)
  h2Heading: {
    fontSize: tokens.fontSizeHero700,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightHero700,
    marginBottom: tokens.spacingVerticalS,
  },

  // H3 - Medium heading (section headings)
  h3Heading: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase300,
    marginBottom: tokens.spacingVerticalXS,
  },
});
