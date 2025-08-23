import { makeStyles, tokens } from '@fluentui/react-components';

/**
 * BasicInputsTab specific styles
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

  // Custom message section - constrained dropdown and input
  customMessageGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: tokens.spacingVerticalM,
    maxWidth: '25rem', // ~400px - narrower than the shared formGrid
    
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
    minWidth: '18.75rem', // ~300px
  },

  popupButtonContainer: {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
    justifyContent: 'flex-end',
    marginTop: tokens.spacingVerticalS,
  },
});
