import { makeStyles, tokens } from '@fluentui/react-components';

/**
 * DateTimeTab specific styles
 * Combined with shared styles at usage time
 * Includes enhanced contrast for date/time picker icons across all themes
 */
export const dateTimeTabStyles = makeStyles({
  // Date/time input with FluentUI Input component icon fixes
  dateTimeInput: {
    marginBottom: tokens.spacingVerticalM,
    width: '100%',
    maxWidth: '18.75rem', // ~300px
    
    // Target FluentUI Input component and its internal input
    '& .fui-Input': {
      // Dark theme icon fix for FluentUI Input
      '@media (prefers-color-scheme: dark)': {
        '& input::-webkit-calendar-picker-indicator, & input::-webkit-time-picker-indicator': {
          filter: 'invert(1)',
        },
      },
      
      // High contrast support
      '@media (forced-colors: active)': {
        '& input::-webkit-calendar-picker-indicator, & input::-webkit-time-picker-indicator': {
          filter: 'none',
          background: 'ButtonText',
          color: 'ButtonFace',
        },
      },
    },
    
    // Fallback: target any input within this container
    '& input[type="date"]::-webkit-calendar-picker-indicator, & input[type="time"]::-webkit-time-picker-indicator, & input[type="datetime-local"]::-webkit-calendar-picker-indicator, & input[type="month"]::-webkit-calendar-picker-indicator, & input[type="week"]::-webkit-calendar-picker-indicator': {
      cursor: 'pointer',
      
      // Dark theme - invert black icons to white
      '@media (prefers-color-scheme: dark)': {
        filter: 'invert(1)',
      },
      
      // High contrast mode
      '@media (forced-colors: active)': {
        filter: 'none',
        background: 'ButtonText',
        color: 'ButtonFace',
      },
    },
    
    // Additional approach: style the entire input container for better context
    '& input[type="date"], & input[type="time"], & input[type="datetime-local"], & input[type="month"], & input[type="week"]': {
      backgroundColor: tokens.colorNeutralBackground1,
      'border-color': tokens.colorNeutralStroke1,
      color: tokens.colorNeutralForeground1,
      
      ':focus': {
        'border-color': tokens.colorBrandStroke1,
        outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
      },
      
      '@media (prefers-color-scheme: dark)': {
        backgroundColor: tokens.colorNeutralBackground2,
        'border-color': tokens.colorNeutralStroke2,
      },
    },
  },
});
