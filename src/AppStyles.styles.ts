import { makeStyles, tokens } from '@fluentui/react-components';

/**
 * Minimal App component styles
 */
export const appStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'nowrap',
    minWidth: 0,
    overflow: 'hidden',
    gap: tokens.spacingVerticalXS,
    alignItems: 'center',
  },
  contentWrapper: {
    maxWidth: '75rem',
    width: '100%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
  },
  // Responsive header layout with proper container padding
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: tokens.spacingHorizontalM,
    marginBottom: tokens.spacingVerticalL,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`, // Increased horizontal padding
    paddingRight: `calc(${tokens.spacingHorizontalL} + ${tokens.spacingHorizontalM})`, // Extra right padding
    width: '100%',
    minHeight: '4rem',
    boxSizing: 'border-box',
    
    '@media (max-width: 50rem)': { // ~800px - when title + theme selector don't fit
      flexDirection: 'column',
      alignItems: 'flex-start', // Changed from 'center' to 'flex-start' for left alignment
      gap: tokens.spacingVerticalS,
      paddingRight: tokens.spacingHorizontalL, // Reset to normal on mobile
      
      // When in column mode, center only the title section
      '& > div:first-child': { // Title section
        alignSelf: 'center',
      },
    },
  },

  // Centered title section with flex growth
  titleSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: tokens.spacingVerticalXS,
    flex: '1',
    minWidth: '0', // Allow shrinking
  },

  // Theme selector with strict width constraints
  themeSection: {
    display: 'flex',
    alignItems: 'flex-end', // Changed from flex-start to flex-end
    flexShrink: 0,
    width: '8rem', // Fixed width for the entire section
    maxWidth: '8rem',
    
    // Target the Field component directly
    '& > *': { // All direct children
      width: '8rem !important',
      maxWidth: '8rem !important',
    },
    
    // Target the Field wrapper specifically
    '& .fui-Field': {
      width: '8rem !important',
      maxWidth: '8rem !important',
    },
    
    // Target the Dropdown component specifically
    '& .fui-Dropdown': {
      width: '8rem !important',
      maxWidth: '8rem !important',
      minWidth: 'unset !important',
    },
    
    // Target the dropdown button/trigger
    '& [role="combobox"]': {
      width: '8rem !important',
      maxWidth: '8rem !important',
      minWidth: 'unset !important',
      fontSize: tokens.fontSizeBase200,
      padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalXS}`,
      boxSizing: 'border-box',
    },
    
    // Target the Field's root element
    '& > div': {
      width: '8rem !important',
      maxWidth: '8rem !important',
    },
    
    '& label': {
      fontSize: tokens.fontSizeBase200,
      marginBottom: tokens.spacingVerticalXXS,
      whiteSpace: 'nowrap',
    },
  },

  // Tab button styles
  tabButton: {
    borderRadius: `${tokens.borderRadiusSmall} ${tokens.borderRadiusSmall} 0 0`,
    minHeight: '2rem', // ~32px
    border: 'none',
    whiteSpace: 'nowrap',
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
  },

  tabButtonActive: {
    borderBottom: `${tokens.strokeWidthThick} solid var(--colorBrandBackground)`,
  },

  tabButtonInactive: {
    borderBottom: `${tokens.strokeWidthThin} solid transparent`,
  },
});
