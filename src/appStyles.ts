import { makeStyles } from '@fluentui/react-components';

/**
 * Styles specific to the main App component
 */
export const appStyles = makeStyles({
  header: {
    marginBottom: '1.25rem', 
    display: 'flex', 
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '1rem',
    '& > div:first-child': {
      textAlign: 'center',
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.25rem',
    },
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
      '& > div:first-child': {
        textAlign: 'center',
      },
    },
  },

  tabBarContainer: {
    marginBottom: '1rem',
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
