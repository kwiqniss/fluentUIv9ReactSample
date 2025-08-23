import { makeStyles, tokens } from '@fluentui/react-components';

// Local constants for consistent sizing
const SIZES = {
  inputMinWidth: '17.5rem',
  inputMaxWidth: '25rem',
  textareaMinHeight: '5rem',
  buttonMinWidth: '7.5rem',
  buttonMaxWidth: '12.5rem',
} as const;

/**
 * Minimal shared styles - trust FluentUI defaults
 * Only include essential layout that FluentUI doesn't provide
 */
export const sharedStyles = makeStyles({
  // Individual field styling
  field: {
    minWidth: SIZES.inputMinWidth, // ~280px
    maxWidth: SIZES.inputMaxWidth, // ~400px
    
    // Constrain input elements
    '& input, & textarea': {
      width: '100%',
    },
    
    '& textarea': {
      minHeight: SIZES.textareaMinHeight, // ~80px
    },
  },

  // Common input constraints
  inputConstraints: {
    '& input': {
      width: '100%',
    },
    '& textarea': {
      width: '100%',
      minHeight: SIZES.textareaMinHeight, // ~80px
    },
  },

  // Standard submit button
  submitButton: {
    marginTop: tokens.spacingVerticalL,
    minWidth: SIZES.buttonMinWidth, // ~120px
    maxWidth: SIZES.buttonMaxWidth, // ~200px
  },
});
