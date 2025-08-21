import { makeStyles, tokens } from '@fluentui/react-components';

/**
 * Shared styles used across multiple tab components
 * Provides consistent layout and spacing throughout the application
 */
export const useSharedStyles = makeStyles({
  // Horizontal row layout - essential for form layout
  row: {
    display: 'flex',
    gap: '1.25rem',
    flexWrap: 'wrap',
  },
  
  // Standard field width - ensures consistent form layout
  field: {
    width: '18.75rem',
    flexShrink: 0,
  },

  // Message area - key functional styling
  messageScrollArea: {
    maxHeight: '12.5rem',
    overflowY: 'auto',
  },

  // Essential layout container - prevents tab jumping
  tabContentStandardized: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
    minHeight: '25rem',
  },

  // Common layout patterns
  verticalStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },

  verticalStackTight: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },

  verticalStackLoose: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },

  fullWidth: {
    width: '100%',
  },

  messageAreaSpacing: {
    marginTop: '1rem',
  },

  buttonSpacing: {
    marginTop: '0.625rem',
  },

  colorInputSize: {
    width: '3rem',
    height: '2.5rem',
  },
});
