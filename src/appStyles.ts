import { makeStyles } from '@fluentui/react-components';
import { TAB_OVERFLOW_CONFIG } from './utils/remHelpers';

/**
 * Styles specific to the main App component
 */
export const appStyles = makeStyles({
  header: {
    marginBottom: '1.25rem', 
    textAlign: 'center', 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '0.25rem',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabBarContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1rem',
    gap: '1rem',
    flexWrap: 'nowrap', // Prevent wrapping on desktop
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'stretch',
      gap: '0.5rem',
      flexWrap: 'wrap',
    },
    '@media (max-width: 480px)': {
      gap: '0.25rem',
    },
  },

  // Responsive tab list container - natural tab sizing with overflow menu
  tabListContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    flex: '1 1 auto',
    minWidth: 0, // Allow shrinking below content size
    maxWidth: '100%',
    // TabList should take available space
    '& [role="tablist"]': {
      display: 'flex',
      flexWrap: 'nowrap',
      gap: '0.25rem',
      minWidth: 0,
      flex: '1 1 auto',
    },
    // Let tabs size naturally to their content
    '& [role="tab"]': {
      flex: '0 0 auto', // Don't grow or shrink, use natural size
      whiteSpace: 'nowrap',
      minWidth: 'auto',
      maxWidth: 'none',
    },
    '@media (max-width: 768px)': {
      order: 1,
      width: '100%',
    },
  },

  // More button for overflow tabs
  moreButton: {
    flex: '0 0 auto',
    marginLeft: '0.5rem',
    minWidth: `${TAB_OVERFLOW_CONFIG.moreButtonWidth}rem`, // Ensure consistent width for calculations
  },

  // Theme selector with responsive behavior
  themeSelectorContainer: {
    flex: '0 0 auto',
    '@media (max-width: 768px)': {
      order: 0,
      alignSelf: 'flex-end',
      minWidth: '200px',
    },
  },

  themeSelector: {
    minWidth: '8rem',
    maxWidth: '160px',
    flexGrow: 1,
    '@media (max-width: 768px)': {
      alignSelf: 'flex-end',
      maxWidth: '100%',
    },
  },
});
