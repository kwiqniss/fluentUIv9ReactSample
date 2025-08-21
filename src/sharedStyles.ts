import { makeStyles, tokens } from '@fluentui/react-components';

/**
 * Shared styles used across multiple components
 * Provides consistent layout and spacing throughout the application
 */
export const sharedStyles = makeStyles({
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

  // Layout containers
  mainContainer: {
    padding: '1.25rem',
    maxWidth: '75rem',
    margin: '0 auto',
  },

  cardContainer: {
    marginTop: '1.25rem',
    padding: '1.25rem',
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
  },

  summaryCard: {
    padding: '0.75rem',
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
    marginBottom: '1rem',
  },

  // Form layouts
  horizontalFormRow: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'flex-end',
    marginBottom: '1rem',
    flexWrap: 'wrap',
  },

  // List patterns
  scrollableList: {
    maxHeight: '25rem',
    overflowY: 'auto',
    border: `2px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
  },

  listItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.75rem',
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground2,
    },
    '&:last-child': {
      borderBottom: 'none',
    },
  },

  // Icon patterns
  circularIcon: {
    width: '2rem',
    height: '2rem',
    borderRadius: tokens.borderRadiusCircular,
    marginRight: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Input patterns
  formInput: {
    padding: '0.5rem', 
    borderRadius: '0.25rem', 
    border: `1px solid ${tokens.colorNeutralStroke1}`,
  },

  // Utility patterns
  flexOne: {
    flex: 1,
  },
});
