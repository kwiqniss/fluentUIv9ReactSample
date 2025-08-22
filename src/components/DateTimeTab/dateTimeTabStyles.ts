import { makeStyles, tokens } from '@fluentui/react-components';

/**
 * DateTimeTab specific styles
 * Combined with shared styles at usage time
 * Includes enhanced contrast for date/time picker icons across all themes
 */
export const dateTimeTabStyles = makeStyles({
  // Date/time input with minimal icon contrast fix
  dateTimeInput: {
    marginBottom: tokens.spacingVerticalM,
    width: '100%',
    maxWidth: '300px',
    
    // Minimal picker icon contrast enhancement
    '& input[type="date"]::-webkit-calendar-picker-indicator, & input[type="time"]::-webkit-time-picker-indicator, & input[type="datetime-local"]::-webkit-calendar-picker-indicator, & input[type="month"]::-webkit-calendar-picker-indicator, & input[type="week"]::-webkit-calendar-picker-indicator': {
      cursor: 'pointer',
      filter: 'contrast(1.2) brightness(1.1)',
      
      '@media (prefers-color-scheme: dark)': {
        filter: 'contrast(1.3) brightness(1.2)',
      },
    },
  },
});
