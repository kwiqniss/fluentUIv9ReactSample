import { makeStyles } from '@fluentui/react-components';

/**
 * Shared styles used across multiple tab components
 * Provides consistent layout and spacing throughout the application
 */
export const useSharedStyles = makeStyles({
  // Main container for tab content
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  
  // Horizontal row layout with flex wrapping
  row: {
    display: 'flex',
    gap: '1.25rem',
    flexWrap: 'wrap',
  },
  
  // Standard field styling with consistent width
  field: {
    width: '18.75rem',
    flexShrink: 0,
  },
  
  // Message area for displaying user interaction feedback
  messageArea: {
    marginTop: '1.25rem',
    padding: '1rem',
    backgroundColor: '#f0f0f0',
    borderRadius: '0.5rem',
    minHeight: '7.5rem',
  },

  // Scrollable message content area
  messageScrollArea: {
    maxHeight: '12.5rem', // 200px converted to rem
    overflowY: 'auto',
  },

  // Vertical flex layout with small gap (for grouped controls)
  verticalGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },

  // Vertical flex layout with medium gap (for form sections)
  verticalSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.625rem',
  },

  // Full width input styling
  fullWidthInput: {
    width: '100%',
  },

  // Color picker specific styling
  colorInput: {
    width: '100%',
    height: '2.5rem',
  },

  // Dialog/modal content layout
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    minWidth: '25rem',
  },

  // Standardized tab content layout (ensures all tabs have same dimensions)
  tabContentStandardized: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
    minHeight: '25rem', // Fixed height to prevent layout shifts between tabs
  },
});
