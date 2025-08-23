import { makeStyles, tokens } from '@fluentui/react-components';

/**
 * Minimal App component styles
 */
export const appStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'nowrap',
    minWidth: 0,
    overflow: 'visible',
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
  
  // Main container for the entire app
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  
  // H1 heading styling
  h1Heading: {
    margin: 0,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase500,
  },
  
  // Responsive header layout with proper container padding
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: tokens.spacingHorizontalM,
    marginBottom: tokens.spacingVerticalS,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalL}`,
    paddingBottom: tokens.spacingVerticalL,
    paddingRight: `calc(${tokens.spacingHorizontalL} - ${tokens.spacingHorizontalS})`, // Small gap from edge
    width: '100%',
    minHeight: '4rem',
    boxSizing: 'border-box',
    
    // When wrapping occurs, controls go to start of new line
    '& > *:nth-child(2)': {
      order: 2,
    },
    
    // Medium screens: force wrap to keep H1 text from wrapping
    '@media (max-width: 64rem)': {
      '& > *:nth-child(2)': {
        order: 2,
        alignSelf: 'flex-start',
        width: '100%',
        justifyContent: 'flex-start',
      },
    },
    
    // Small screens: same behavior but adjust spacing
    '@media (max-width: 48rem)': {
      gap: tokens.spacingVerticalS,
      '& > *:nth-child(2)': {
        order: 2,
        alignSelf: 'flex-start',
        width: '100%',
        justifyContent: 'flex-start',
      },
    },
  },

  // Centered title section with flex growth
  titleSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: tokens.spacingVerticalXL,
    flex: '1',
    minWidth: '0', // Allow shrinking
    paddingTop: tokens.spacingVerticalXXL,
    
    // Prevent text wrapping in H1 until dropdowns are moved down
    '& h1': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      
      // Allow text wrapping on very small screens where dropdowns are already wrapped
      '@media (max-width: 32rem)': {
        whiteSpace: 'normal',
        overflow: 'visible',
        textOverflow: 'unset',
      },
    },
  },

  // Subtitle styling
  subtitle: {
    flexShrink: 0,
    opacity: 0.8, // Slightly muted to create hierarchy
  },

  // Controls section for theme and verbosity dropdowns - responsive positioning
  controlsSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
    alignItems: 'flex-end',
    flexShrink: 0,
    
    // When wrapped to new line: horizontal layout, left-aligned
    '@media (max-width: 64rem)': {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: tokens.spacingHorizontalM,
      justifyContent: 'flex-start',
    },
    
    // Very small screens: stack vertically again and reduce width
    '@media (max-width: 32rem)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: tokens.spacingVerticalS,
      width: '100%',
    },
    
    // Theme dropdown - reduced width for better balance
    '& > *:first-child': {
      width: '10rem',
      maxWidth: '10rem',
      
      '@media (max-width: 32rem)': {
        width: '100%',
        maxWidth: '16rem', // Cap maximum width on small screens
      },
      
      '& .fui-Field': {
        width: '10rem !important',
        maxWidth: '10rem !important',
        
        '@media (max-width: 32rem)': {
          width: '100% !important',
          maxWidth: '16rem !important',
        },
      },
      
      '& .fui-Dropdown': {
        width: '10rem !important',
        maxWidth: '10rem !important',
        minWidth: 'unset !important',
        
        '@media (max-width: 32rem)': {
          width: '100% !important',
          maxWidth: '16rem !important',
        },
      },
      
      '& [role="combobox"]': {
        width: '10rem !important',
        maxWidth: '10rem !important',
        minWidth: 'unset !important',
        fontSize: tokens.fontSizeBase200,
        padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalXS}`,
        boxSizing: 'border-box',
        
        '@media (max-width: 32rem)': {
          width: '100% !important',
          maxWidth: '16rem !important',
        },
      },
    },
    
    // Verbosity dropdown - reduced width for better balance
    '& > *:last-child': {
      width: '10rem',
      maxWidth: '10rem',
      
      '@media (max-width: 32rem)': {
        width: '100%',
        maxWidth: '16rem', // Cap maximum width on small screens
      },
      
      '& .fui-Field': {
        width: '10rem !important',
        maxWidth: '10rem !important',
        
        '@media (max-width: 32rem)': {
          width: '100% !important',
          maxWidth: '16rem !important',
        },
      },
      
      '& .fui-Dropdown': {
        width: '10rem !important',
        maxWidth: '10rem !important',
        minWidth: 'unset !important',
        
        '@media (max-width: 32rem)': {
          width: '100% !important',
          maxWidth: '16rem !important',
        },
      },
      
      '& [role="combobox"]': {
        width: '10rem !important',
        maxWidth: '10rem !important',
        minWidth: 'unset !important',
        fontSize: tokens.fontSizeBase200,
        padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalXS}`,
        boxSizing: 'border-box',
        
        '@media (max-width: 32rem)': {
          width: '100% !important',
          maxWidth: '16rem !important',
        },
      },
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
    minHeight: tokens.spacingVerticalXXL, // Use design token instead of hardcoded value
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

  // Sticky toolbar container
  stickyToolbar: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
  },

  // Tab container for FluentUI TabList
  tabContainer: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `${tokens.strokeWidthThick} solid ${tokens.colorNeutralStroke3}`,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL} 0`,
    transition: `box-shadow ${tokens.durationFast} ease`,
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: tokens.strokeWidthThin,
      background: `linear-gradient(90deg, ${tokens.colorBrandBackground2}, ${tokens.colorBrandBackground})`,
      opacity: 0.3,
    },
  },
  tabContainerSticky: {
    position: 'fixed',
    top: 0,
    zIndex: 100,
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `${tokens.strokeWidthThick} solid ${tokens.colorNeutralStroke3}`,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL} 0`,
    transition: `all ${tokens.durationNormal} ${tokens.curveEasyEase}`,
    '&::before': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: tokens.strokeWidthThin,
      background: `linear-gradient(90deg, ${tokens.colorBrandBackground2}, ${tokens.colorBrandBackground})`,
      opacity: 0.3,
    },
  },
  tabSpacer: {
    height: 'var(--tabs-height, 0)',
    visibility: 'hidden',
  },
  
  // Base tab styles
  tabBase: {
    borderRadius: `${tokens.borderRadiusMedium} ${tokens.borderRadiusLarge} 0 0`,
    marginRight: tokens.spacingHorizontalXS,
    transitionDuration: tokens.durationNormal,
    transitionTimingFunction: tokens.curveEasyEase,
    position: 'relative' as const,
  },
  
  tabSelected: {
    backgroundColor: tokens.colorBrandBackground2,
    marginTop: '0',
    paddingTop: tokens.spacingVerticalXS,
    paddingRight: tokens.spacingHorizontalSNudge,
    paddingBottom: tokens.spacingVerticalXS, // Consistent with paddingTop
    paddingLeft: tokens.spacingHorizontalSNudge,
    color: tokens.colorBrandForeground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorBrandStroke2}`,
    borderBottom: 'none',
    boxShadow: tokens.shadow16,
    zIndex: 2,
    transform: 'translateY(0)', // Remove vertical movement
  },
  
  tabUnselected: {
    backgroundColor: tokens.colorNeutralBackground3,
    marginTop: '0', // Match selected tab margin
    paddingTop: tokens.spacingVerticalXS, // Match selected tab padding
    paddingRight: tokens.spacingHorizontalXS,
    paddingBottom: tokens.spacingVerticalXS, // Match selected tab padding
    paddingLeft: tokens.spacingHorizontalXS,
    color: tokens.colorNeutralForeground2,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    borderBottom: 'none',
    boxShadow: tokens.shadow2,
    zIndex: 1,
    transform: 'translateY(0)', // Same as selected tab
    
    '&:hover': {
      marginTop: '0',
      paddingTop: tokens.spacingVerticalXS, // Consistent padding
      paddingRight: tokens.spacingHorizontalXS,
      paddingBottom: tokens.spacingVerticalXS, // Consistent padding
      paddingLeft: tokens.spacingHorizontalXS,
      transform: 'translateY(0)', // No vertical movement
    },
    '&:focus': {
      marginTop: '0',
      paddingTop: tokens.spacingVerticalXS, // Consistent padding
      paddingRight: tokens.spacingHorizontalXS,
      paddingBottom: tokens.spacingVerticalXS, // Consistent padding
      paddingLeft: tokens.spacingHorizontalXS,
      transform: 'translateY(0)', // No vertical movement
    },
  },
});
