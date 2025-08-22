import { makeStyles, tokens } from '@fluentui/react-components';

/**
 * BasicInputsTab specific styles with input constraints
 */
export const basicInputsTabStyles = makeStyles({
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
