import { makeStyles, tokens } from '@fluentui/react-components';

// Re-export shared constants for backwards compatibility
export { componentConstants as componentProps } from '../../styles/componentConstants';

/**
 * Essential ComponentShowcase styles
 */
export const componentShowcaseStyles = makeStyles({
  // Basic grid layout for components with width constraint
  componentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: tokens.spacingHorizontalL,
    marginBottom: tokens.spacingVerticalL,
    maxWidth: '1200px', // Constrain grid width
    width: '100%',
  },

  // Essential card styling with input constraints
  componentCard: {
    padding: tokens.spacingHorizontalL,
    minHeight: '120px',
    
    // Constrain input widths within component cards
    '& input, & textarea, & [role="combobox"], & [role="listbox"]': {
      maxWidth: '250px',
      width: '100%',
    },
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
    marginTop: tokens.spacingVerticalXL,
    '&:first-child': {
      marginTop: 0,
    },
  },
});
