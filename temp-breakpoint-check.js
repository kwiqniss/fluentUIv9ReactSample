// Temporary file to check what FluentUI v9 provides
import { 
  makeStyles, 
  tokens,
  useScrollbarWidth,
  mergeClasses
} from '@fluentui/react-components';

// Let's see what's available in tokens
console.log('Available tokens:', Object.keys(tokens));

// Check for any responsive or breakpoint related items
const responsiveKeys = Object.keys(tokens).filter(key => 
  key.toLowerCase().includes('breakpoint') || 
  key.toLowerCase().includes('responsive') || 
  key.toLowerCase().includes('media') ||
  key.toLowerCase().includes('screen')
);

console.log('Responsive-related tokens:', responsiveKeys);
