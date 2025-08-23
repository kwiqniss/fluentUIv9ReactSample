// Test file to explore FluentUI v9 responsive utilities
import React from 'react';
import { 
  makeStyles, 
  tokens,
  shorthands
} from '@fluentui/react-components';

// FluentUI v9 should provide responsive utilities through tokens or utilities
// Let's check what's available

// Create a test component to see what responsive utilities are available
const testStyles = makeStyles({
  root: {
    // FluentUI v9 typically uses breakpoint values in tokens
    ...shorthands.padding(tokens.spacingVerticalM),
    
    // Common FluentUI breakpoints (these are the standard ones)
    '@media (max-width: 480px)': {
      fontSize: tokens.fontSizeBase200,
    },
    '@media (min-width: 481px) and (max-width: 1024px)': {
      fontSize: tokens.fontSizeBase300,
    },
    '@media (min-width: 1025px)': {
      fontSize: tokens.fontSizeBase400,
    },
  },
});

export default testStyles;
