/**
 * SelectionTab component strings
 */

export const selectionStrings = {
  title: 'Selection Controls',
  labels: {
    combobox: 'Combobox (Countries)',
    dropdown: 'Dropdown (Colors)',
    radioGroup: 'Radio Group',
    checkboxes: 'Checkboxes',
    switchControl: 'Switch Control',
  },
  placeholders: {
    combobox: 'Select a country',
    dropdown: 'Select a color',
  },
  options: {
    countries: ['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Japan', 'Australia'],
    colors: ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Pink'],
    radioOptions: ['Option 1', 'Option 2', 'Option 3'],
    checkboxOptions: ['Feature 1', 'Feature 2', 'Feature 3'],
  },
} as const;
