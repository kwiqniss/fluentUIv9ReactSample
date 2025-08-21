import { makeStyles } from '@fluentui/react-components';

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
    alignItems: 'center',
    marginBottom: '1rem',
    gap: '1rem',
    flexWrap: 'wrap',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'stretch',
      gap: '0.5rem',
    },
  },

  themeSelector: {
    minWidth: '160px',
    '@media (max-width: 768px)': {
      alignSelf: 'flex-end',
    },
  },
});
