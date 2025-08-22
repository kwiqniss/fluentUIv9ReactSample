import { makeStyles, tokens } from '@fluentui/react-components';

/**
 * Standardized FluentUI layout components using design tokens and relative units
 * Simple, consistent layouts that work across all tabs
 */
export const useStandardLayout = () => makeStyles({
  // Main tab content container - full width, proper spacing
  tabContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXL,
    padding: tokens.spacingHorizontalL,
    width: '100%',
    maxWidth: '75rem', // ~1200px
    margin: '0 auto',
  },

  // Header section for titles and descriptions
  headerSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
  },

  // Standard form grid - responsive 2-column layout
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: tokens.spacingVerticalL,
    width: '100%',
    
    '@media (min-width: 48rem)': {
      gridTemplateColumns: '1fr 1fr',
      gap: tokens.spacingHorizontalXL,
    },
  },

  // Component showcase grid - responsive 3-column layout  
  componentGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: tokens.spacingVerticalL,
    width: '100%',
    
    '@media (min-width: 48rem)': {
      gridTemplateColumns: '1fr 1fr',
      gap: tokens.spacingHorizontalL,
    },
    
    '@media (min-width: 75rem)': {
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: tokens.spacingHorizontalL,
    },
  },

  // Individual field container
  fieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
    minWidth: '17.5rem', // ~280px
    width: '100%',
  },

  // Actions/buttons container
  actionsContainer: {
    display: 'flex',
    gap: tokens.spacingHorizontalM,
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: tokens.spacingVerticalL,
  },

  // Section spacing
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL,
    marginBottom: tokens.spacingVerticalXXL,
    
    '&:last-child': {
      marginBottom: 0,
    },
  },

  // Popover form styles
  popupForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
    padding: tokens.spacingHorizontalL,
    minWidth: '18.75rem', // ~300px
  },

  // Popup button container
  popupButtonContainer: {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
    justifyContent: 'flex-end',
    marginTop: tokens.spacingVerticalS,
  },
});
