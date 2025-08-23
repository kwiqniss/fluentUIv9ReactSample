import { makeStyles, tokens } from '@fluentui/react-components';

/**
 * Minimal shared styles - trust FluentUI defaults
 * Only include essential layout that FluentUI doesn't provide
 */
export const sharedStyles = makeStyles({
  // Individual field styling
  field: {
    minWidth: '17.5rem', // ~280px
    maxWidth: '25rem',   // ~400px
    
    // Constrain input elements
    '& input, & textarea': {
      width: '100%',
    },
    
    '& textarea': {
      minHeight: '5rem', // ~80px
    },
  },

  // Common input constraints
  inputConstraints: {
    '& input': {
      width: '100%',
    },
    '& textarea': {
      width: '100%',
      minHeight: '5rem', // ~80px
    },
  },

  // Standard submit button
  submitButton: {
    marginTop: tokens.spacingVerticalL,
    minWidth: '7.5rem', // ~120px
    maxWidth: '12.5rem', // ~200px
  },
});
