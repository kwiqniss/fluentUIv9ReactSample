import { makeStyles, tokens } from '@fluentui/react-components';

// Local constants for consistent sizing - improved for 4K displays
const SIZES = {
  inputMinWidth: 'clamp(15rem, 20vw, 25rem)', // Responsive input sizing: 240px-400px
  inputMaxWidth: 'clamp(20rem, 30vw, 35rem)', // Responsive max width: 320px-560px  
  textareaMinHeight: 'clamp(4rem, 8vh, 8rem)', // Responsive textarea height
  buttonMinWidth: 'clamp(7rem, 12vw, 15rem)', // Responsive button sizing
  buttonMaxWidth: 'clamp(10rem, 18vw, 20rem)', // Responsive button max width
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
