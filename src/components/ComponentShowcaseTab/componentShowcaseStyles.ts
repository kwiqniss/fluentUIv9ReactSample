import { makeStyles, tokens } from '@fluentui/react-components';

// Re-export shared constants for backwards compatibility
export { componentConstants as componentProps } from '../../styles/componentConstants';

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
    gap: '8px',
    marginBottom: '8px',
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
    minWidth: '280px',
    maxWidth: '400px',
    
    // Ensure Field labels are above inputs
    '& .fui-Field': {
      display: 'flex',
      flexDirection: 'column',
      gap: tokens.spacingVerticalXS,
    },
    
    // Constrain input and button widths
    '& input, & textarea, & [role="combobox"], & [role="listbox"]': {
      maxWidth: '220px',
      width: '100%',
    },
    
    // Make buttons more compact
    '& button': {
      maxWidth: '180px',
      minWidth: '100px',
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
    minHeight: '280px', // Fixed height to accommodate card content
    display: 'flex',
    flexDirection: 'column',
  },

  // Message log with basic styling
  messageLog: {
    maxHeight: '200px',
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
});
