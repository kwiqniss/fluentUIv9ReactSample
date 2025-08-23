import { makeStyles, tokens } from '@fluentui/react-components';

// Local constants for input sizing specific to this tab
const SIZES = {
  inputMaxWidth: '21.875rem', // ~350px
  textareaMaxWidth: '28.125rem', // ~450px
  textareaMinHeight: '5rem', // ~80px
  customMessageMaxWidth: '25rem', // ~400px
  popupMinWidth: '18.75rem', // ~300px
} as const;

/**
 * BasicInputsTab specific styles
 */
export const basicInputsTabStyles = makeStyles({
  // Constrain input elements specifically for this tab
  inputConstraints: {
    '& input': {
      maxWidth: SIZES.inputMaxWidth, // ~350px
      width: '100%',
    },
    '& textarea': {
      maxWidth: SIZES.textareaMaxWidth, // ~450px
      width: '100%',
      minHeight: SIZES.textareaMinHeight, // ~80px
    },
  },

  // Custom message section - constrained dropdown and input
  customMessageGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: tokens.spacingVerticalM,
    maxWidth: SIZES.customMessageMaxWidth, // ~400px - narrower than the shared formGrid
    
    // Keep single column even on larger screens for this specific section
    '@media (min-width: 48rem)': {
      gridTemplateColumns: '1fr',
    },
  },

  // Popup form styles
  popupForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
    padding: tokens.spacingHorizontalL,
    minWidth: SIZES.popupMinWidth, // ~300px
  },

  popupButtonContainer: {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
    justifyContent: 'flex-end',
    marginTop: tokens.spacingVerticalS,
  },
});
