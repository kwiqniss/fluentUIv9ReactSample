import { makeStyles, tokens } from '@fluentui/react-components';

/**
 * DateTimeTab specific styles
 * Combined with shared styles at usage time
 * Includes enhanced contrast for date/time picker icons across all themes
 */
export const dateTimeTabStyles = makeStyles({
  // Enhanced date/time input styling for better icon contrast
  dateTimeInput: {
    '& input[type="date"], & input[type="time"], & input[type="datetime-local"], & input[type="month"], & input[type="week"]': {
      // Enhance contrast for date/time picker icons
      filter: 'contrast(1.2) brightness(1.1)',
      
      // Dark theme adjustments
      '@media (prefers-color-scheme: dark)': {
        filter: 'contrast(1.4) brightness(1.3) invert(0.1)',
      },
      
      // High contrast theme support
      '@media (forced-colors: active)': {
        filter: 'none', // Let high contrast mode handle the styling
        forcedColorAdjust: 'auto',
      },
      
      // Focus state improvements
      '&:focus': {
        filter: 'contrast(1.3) brightness(1.2)',
        '@media (prefers-color-scheme: dark)': {
          filter: 'contrast(1.5) brightness(1.4) invert(0.1)',
        },
      },
      
      // Hover state improvements
      '&:hover': {
        filter: 'contrast(1.25) brightness(1.15)',
        '@media (prefers-color-scheme: dark)': {
          filter: 'contrast(1.45) brightness(1.35) invert(0.1)',
        },
      },
    },
    
    // Webkit specific enhancements (Chrome, Safari, Edge)
    '& input[type="date"]::-webkit-calendar-picker-indicator, & input[type="time"]::-webkit-time-picker-indicator, & input[type="datetime-local"]::-webkit-calendar-picker-indicator, & input[type="month"]::-webkit-calendar-picker-indicator, & input[type="week"]::-webkit-calendar-picker-indicator': {
      filter: `contrast(1.3) brightness(1.2)`,
      opacity: '0.8',
      cursor: 'pointer',
      
      // Dark theme specific
      '@media (prefers-color-scheme: dark)': {
        filter: 'contrast(1.5) brightness(1.4) invert(0.85)',
        opacity: '0.9',
      },
      
      // High contrast support
      '@media (forced-colors: active)': {
        filter: 'none',
        opacity: '1',
        forcedColorAdjust: 'auto',
      },
      
      // Hover state for picker indicators
      '&:hover': {
        filter: 'contrast(1.4) brightness(1.3)',
        opacity: '1',
        '@media (prefers-color-scheme: dark)': {
          filter: 'contrast(1.6) brightness(1.5) invert(0.85)',
        },
      },
    },

    // Additional specific styling for time input indicators
    '& input[type="time"]::-webkit-time-picker-indicator': {
      filter: `contrast(1.5) brightness(1.3) saturate(1.1)`,
      opacity: '0.85',
      
      // Enhanced dark theme support for time inputs
      '@media (prefers-color-scheme: dark)': {
        filter: 'contrast(1.7) brightness(1.6) invert(0.9) saturate(1.2)',
        opacity: '0.95',
      },
      
      '&:hover': {
        filter: 'contrast(1.6) brightness(1.4) saturate(1.2)',
        opacity: '1',
        '@media (prefers-color-scheme: dark)': {
          filter: 'contrast(1.8) brightness(1.7) invert(0.9) saturate(1.3)',
        },
      },
    },
  },
  
  // FluentUI theme-aware styling
  dateTimeInputFluentAware: {
    '& input[type="date"], & input[type="time"], & input[type="datetime-local"], & input[type="month"], & input[type="week"]': {
      backgroundColor: tokens.colorNeutralBackground1,
      color: tokens.colorNeutralForeground1,
      border: `1px solid ${tokens.colorNeutralStroke1}`,
      borderRadius: tokens.borderRadiusSmall,
      
      '&:focus': {
        backgroundColor: tokens.colorNeutralBackground1,
        boxShadow: `0 0 0 2px ${tokens.colorCompoundBrandBackground}`,
      },
      
      '&:hover': {
        backgroundColor: tokens.colorNeutralBackground1Hover,
      },
    },
  },
});
