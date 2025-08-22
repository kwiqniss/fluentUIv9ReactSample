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
    flex: '1', // Allow content area to grow and push footer down
  },
  // Responsive header layout with proper container padding
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: tokens.spacingHorizontalM,
    marginBottom: tokens.spacingVerticalL,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`,
    paddingRight: `calc(${tokens.spacingHorizontalL} - ${tokens.spacingHorizontalS})`, // Small gap from edge
    width: '100%',
    minHeight: '4rem',
    boxSizing: 'border-box',
    
    '@media (max-width: 60rem)': {
      flexDirection: 'column',
      alignItems: 'center',
      gap: tokens.spacingVerticalS,
      paddingRight: tokens.spacingHorizontalL,
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

  // Subtitle styling
  subtitle: {
    flexShrink: 0,
  },

  // Controls section for theme and verbosity dropdowns - now on the right, stacked vertically
  controlsSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
    alignItems: 'flex-end',
    flexShrink: 0,
    
    // Theme dropdown - standard width
    '& > *:first-child': {
      width: '12rem',
      maxWidth: '12rem',
      
      '& .fui-Field': {
        width: '12rem !important',
        maxWidth: '12rem !important',
      },
      
      '& .fui-Dropdown': {
        width: '12rem !important',
        maxWidth: '12rem !important',
        minWidth: 'unset !important',
      },
      
      '& [role="combobox"]': {
        width: '12rem !important',
        maxWidth: '12rem !important',
        minWidth: 'unset !important',
        fontSize: tokens.fontSizeBase200,
        padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalXS}`,
        boxSizing: 'border-box',
      },
    },
    
    // Verbosity dropdown - wider to fit text on one line
    '& > *:last-child': {
      width: '12rem',
      maxWidth: '12rem',
      
      '& .fui-Field': {
        width: '12rem !important',
        maxWidth: '12rem !important',
      },
      
      '& .fui-Dropdown': {
        width: '12rem !important',
        maxWidth: '12rem !important',
        minWidth: 'unset !important',
      },
      
      '& [role="combobox"]': {
        width: '12rem !important',
        maxWidth: '12rem !important',
        minWidth: 'unset !important',
        fontSize: tokens.fontSizeBase200,
        padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalXS}`,
        boxSizing: 'border-box',
      },
    },
    
    '& label': {
      fontSize: tokens.fontSizeBase200,
      marginBottom: tokens.spacingVerticalXXS,
      whiteSpace: 'nowrap',
    },
    
    '@media (max-width: 60rem)': { // Mobile breakpoint
      gap: tokens.spacingVerticalXS,
      alignItems: 'center',
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
