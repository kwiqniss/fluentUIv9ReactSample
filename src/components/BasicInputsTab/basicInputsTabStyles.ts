import { makeStyles, tokens } from '@fluentui/react-components';

/**
 * BasicInputsTab specific styles with input constraints
 */
export const basicInputsTabStyles = makeStyles({
  // Container layout
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },

  // Form grid layout
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(18.75rem, 1fr))',
    maxWidth: '100%',
    gap: '1rem',
    '@media (min-width: 48rem)': {
      gridTemplateColumns: '1fr 1fr',
    },
  },

  // Message section spacing
  messageSection: {
    marginTop: '1rem',
  },

  // Constrain input elements specifically for this tab
  inputConstraints: {
    '& input': {
      maxWidth: '21.875rem', // ~350px
      width: '100%',
    },
    '& textarea': {
      maxWidth: '28.125rem', // ~450px
      width: '100%',
      minHeight: '5rem', // ~80px
    },
  },

  // Button with proper spacing
  submitButton: {
    marginTop: tokens.spacingVerticalL,
    maxWidth: '9.375rem', // ~150px
  },
});
