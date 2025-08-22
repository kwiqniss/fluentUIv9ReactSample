import { makeStyles, tokens } from '@fluentui/react-components';

/**
 * Minimal App component styles
 */
export const appStyles = makeStyles({
  // Clean header layout
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: tokens.spacingVerticalL,
    padding: tokens.spacingHorizontalM,
    width: '100%',
  },

  // Centered title section
  titleSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: tokens.spacingVerticalXS,
  },

  // Theme selector positioned absolutely to the right
  themeSection: {
    position: 'absolute',
    right: tokens.spacingHorizontalM,
    
    // Make the dropdown smaller
    '& > div': { // Target the Field
      minWidth: '140px',
    },
    
    '& [role="combobox"]': { // Target the Dropdown
      minWidth: '140px',
      fontSize: tokens.fontSizeBase200,
    },
    
    '@media (max-width: 768px)': {
      position: 'static',
      marginTop: tokens.spacingVerticalS,
    },
  },
});
