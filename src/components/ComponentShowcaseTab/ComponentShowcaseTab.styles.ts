import { makeStyles, tokens } from '@fluentui/react-components';

// Re-export shared constants for backwards compatibility
export { componentConstants as componentProps } from '../componentConstants';

// Local sizing constants for ComponentShowcase
const SIZES = {
  componentMinWidth: '17.5rem', // ~280px
  componentMaxWidth: '25rem',   // ~400px
  inputMaxWidth: '13.75rem',    // ~220px
  buttonMaxWidth: '11.25rem',   // ~180px
  buttonMinWidth: '6.25rem',    // ~100px
  containerMinHeight: '17.5rem', // ~280px
  logMaxHeight: '12.5rem',      // ~200px
} as const;

/**
 * Essential ComponentShowcase styles
 */
export const componentShowcaseStyles = makeStyles({
  // Main container for consistent layout
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXXL,
  },

  // Header section for title and description
  headerSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
    marginBottom: tokens.spacingVerticalS,
  },

  // Grid layout for components - fits 2 side by side on larger screens
  componentGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: tokens.spacingHorizontalL,
    '@media (min-width: 768px)': {
      gridTemplateColumns: '1fr 1fr', // 2 columns on tablets and up
    },
    '@media (min-width: 1200px)': {
      gridTemplateColumns: '1fr 1fr 1fr', // 3 columns on large screens
    },
  },

  // Individual component container with constrained width
  componentItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
    minWidth: SIZES.componentMinWidth, // ~280px
    maxWidth: SIZES.componentMaxWidth, // ~400px
    
    // Ensure Field labels are above inputs
    '& .fui-Field': {
      display: 'flex',
      flexDirection: 'column',
      gap: tokens.spacingVerticalXS,
    },
    
    // Constrain input and button widths
    '& input, & textarea, & [role="combobox"], & [role="listbox"]': {
      maxWidth: SIZES.inputMaxWidth, // ~220px
      width: '100%',
    },
    
    // Make buttons more compact
    '& button': {
      maxWidth: SIZES.buttonMaxWidth, // ~180px
      minWidth: SIZES.buttonMinWidth, // ~100px
    },
    
    // Flex button groups to use space efficiently
    '& > div:has(button)': {
      display: 'flex',
      flexWrap: 'wrap',
      gap: tokens.spacingHorizontalS,
    },
  },

  // Fixed height container for loading demos to prevent layout shift
  stableContainer: {
    minHeight: SIZES.containerMinHeight, // ~280px - Fixed height to accommodate card content
    display: 'flex',
    flexDirection: 'column',
  },

  // Message log with basic styling
  messageLog: {
    maxHeight: SIZES.logMaxHeight, // ~200px
    overflowY: 'auto',
    marginTop: tokens.spacingVerticalL,
    padding: tokens.spacingHorizontalM,
  },

  // Basic section spacing with more room under headers
  sectionHeader: {
    marginBottom: tokens.spacingVerticalL,
    marginTop: tokens.spacingVerticalXXL, // More space between sections
    '&:first-child': {
      marginTop: 0,
    },
  },

  // Add spacing between individual fields/components
  componentSpacing: {
    marginBottom: tokens.spacingVerticalL,
    '&:last-child': {
      marginBottom: 0,
    },
  },

  // Special spacing for section content
  sectionContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL, // Consistent spacing between components in a section
  },

  // Skeleton card styles
  skeletonCardHeader: {
    display: 'flex', 
    alignItems: 'center', 
    gap: tokens.spacingHorizontalM, 
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`,
  },

  skeletonCardHeaderContent: {
    display: 'flex', 
    flexDirection: 'column', 
    gap: tokens.spacingVerticalXS,
  },

  skeletonCardHeaderName: {
    width: '7.5rem',
  },

  skeletonCardHeaderTitle: {
    width: '10rem',
  },

  skeletonCardBody: {
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`,
  },

  skeletonCardBodyFull: {
    width: '100%', 
    marginBottom: tokens.spacingVerticalXS,
  },

  skeletonCardBodyMost: {
    width: '80%', 
    marginBottom: tokens.spacingVerticalXS,
  },

  skeletonCardBodyPartial: {
    width: '60%',
  },

  skeletonCardFooter: {
    display: 'flex', 
    gap: tokens.spacingHorizontalS, 
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`,
    borderTop: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
  },

  skeletonCardFooterButton1: {
    width: '6.25rem',
  },

  skeletonCardFooterButton2: {
    width: '5rem',
  },

  // Button container styles
  buttonContainer: {
    display: 'flex', 
    gap: tokens.spacingHorizontalS, 
    flexWrap: 'wrap',
  },

  // Spacing for buttons and controls
  buttonSpacingTop: {
    marginTop: tokens.spacingVerticalM,
  },
});
