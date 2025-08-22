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

  // Table row selection state
  selectedTableRow: {
    backgroundColor: tokens.colorNeutralBackground1Selected,
  },
});
