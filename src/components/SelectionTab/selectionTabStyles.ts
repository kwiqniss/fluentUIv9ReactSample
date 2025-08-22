import { makeStyles, tokens } from '@fluentui/react-components';

/**
 * SelectionTab specific styles
 * Combined with shared styles at usage time
 */
export const selectionTabStyles = makeStyles({
  // Table container with proper spacing
  tableContainer: {
    marginTop: tokens.spacingVerticalL,
    marginBottom: tokens.spacingVerticalL,
  },

  // Selected items display
  selectedItemsContainer: {
    marginTop: tokens.spacingVerticalS,
    marginBottom: tokens.spacingVerticalM,
  },

  // Button container for table actions
  tableButtonContainer: {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
    marginTop: tokens.spacingVerticalS,
    flexWrap: 'wrap',
  },

  // Checkbox column styling
  checkboxCell: {
    width: '2.5rem',
  },

  // Table row selection state - with high contrast support
  selectedTableRow: {
    backgroundColor: tokens.colorNeutralBackground1Selected,
    
    '@media (forced-colors: active)': {
      backgroundColor: 'Highlight',
      
      // Ensure all child text elements have proper contrast
      '& *': {
        backgroundColor: 'Window',
        color: 'WindowText',
      },
    },
  },

  // Interactive table row states
  tableRow: {
    cursor: 'pointer',
    transition: 'background-color 0.15s ease-in-out',
    color: tokens.colorNeutralForeground1,
    
    ':hover': {
      backgroundColor: tokens.colorSubtleBackgroundHover, // More distinct hover color
      
      '@media (forced-colors: active)': {
        backgroundColor: 'Highlight'
      },
    },
    
    ':focus-within': {
      backgroundColor: tokens.colorSubtleBackgroundPressed, // More distinct focus color
      outline: `2px solid ${tokens.colorStrokeFocus2}`,
      outlineOffset: '-2px',
      
      '@media (forced-colors: active)': {
        backgroundColor: 'Highlight'
      },
    },
    
    ':active': {
      backgroundColor: tokens.colorSubtleBackgroundPressed, // More distinct active color
      
      '@media (forced-colors: active)': {
        backgroundColor: 'Highlight'
      },
    },
  },

  // Combine selected and interactive states
  selectedTableRowInteractive: {
    backgroundColor: tokens.colorNeutralBackground1Selected,
    color: tokens.colorNeutralForeground1,
    cursor: 'pointer',
    transition: 'background-color 0.15s ease-in-out',
    
    ':hover': {
      backgroundColor: tokens.colorBrandBackgroundSelected, // More distinct selected hover
      
      '@media (forced-colors: active)': {
        backgroundColor: 'Highlight'
      },
    },
    
    ':focus-within': {
      backgroundColor: tokens.colorBrandBackgroundSelected, // More distinct selected focus
      outline: `2px solid ${tokens.colorStrokeFocus2}`,
      outlineOffset: '-2px',
      
      '@media (forced-colors: active)': {
        backgroundColor: 'Highlight',
      },
    },
    
    '@media (forced-colors: active)': {
      backgroundColor: 'Highlight'
    },
  },
});
