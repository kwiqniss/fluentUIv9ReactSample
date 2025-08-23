import { makeStyles, tokens } from '@fluentui/react-components';

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
    flex: '1',
  },
  
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    // Use minimum height to ensure we fill screen, but no max height constraint
    minHeight: 'var(--main-container-min-height, 100vh)',
  },
  
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
    paddingRight: `calc(${tokens.spacingHorizontalL} - ${tokens.spacingHorizontalS})`,
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

  titleSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: tokens.spacingVerticalXL,
    flex: '1',
    minWidth: '0',
    paddingTop: tokens.spacingVerticalXXL,
    
    // Prevent text wrapping in H1 until dropdowns are moved down
    '& h1': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      
      '@media (max-width: 32rem)': {
        whiteSpace: 'normal',
        overflow: 'visible',
        textOverflow: 'unset',
      },
    },
  },

  subtitle: {
    flexShrink: 0,
    opacity: 0.8,
  },

  // Controls section for theme and verbosity dropdowns - responsive positioning
  controlsSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
    alignItems: 'flex-end',
    flexShrink: 0,
    
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
    
    '& > *:first-child': {
      width: '10rem',
      maxWidth: '10rem',
      
      '@media (max-width: 32rem)': {
        width: '100%',
        maxWidth: '16rem',
      },
      
      '& .fui-Field': {
        width: '10rem',
        maxWidth: '10rem',
        
        '@media (max-width: 32rem)': {
          width: '100%',
          maxWidth: '16rem',
        },
      },
      
      '& .fui-Dropdown': {
        width: '10rem',
        maxWidth: '10rem',
        minWidth: 'unset',
        
        '@media (max-width: 32rem)': {
          width: '100%',
          maxWidth: '16rem',
        },
      },
      
      '& [role="combobox"]': {
        width: '10rem',
        maxWidth: '10rem',
        minWidth: 'unset',
        fontSize: tokens.fontSizeBase200,
        padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalXS}`,
        boxSizing: 'border-box',
        
        '@media (max-width: 32rem)': {
          width: '100%',
          maxWidth: '16rem',
        },
      },
    },
    
    '& > *:last-child': {
      width: '10rem',
      maxWidth: '10rem',
      
      '@media (max-width: 32rem)': {
        width: '100%',
        maxWidth: '16rem',
      },
      
      '& .fui-Field': {
        width: '10rem',
        maxWidth: '10rem',
        
        '@media (max-width: 32rem)': {
          width: '100%',
          maxWidth: '16rem',
        },
      },
      
      '& .fui-Dropdown': {
        width: '10rem',
        maxWidth: '10rem',
        minWidth: 'unset',
        
        '@media (max-width: 32rem)': {
          width: '100%',
          maxWidth: '16rem',
        },
      },
      
      '& [role="combobox"]': {
        width: '10rem',
        maxWidth: '10rem',
        minWidth: 'unset',
        fontSize: tokens.fontSizeBase200,
        padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalXS}`,
        boxSizing: 'border-box',
        
        '@media (max-width: 32rem)': {
          width: '100%',
          maxWidth: '16rem',
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

  tabContainer: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `${tokens.strokeWidthThick} solid ${tokens.colorNeutralStroke3}`,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL} 0`,
    transition: `box-shadow ${tokens.durationFast} ease`,
    position: 'relative',
    minHeight: `calc(${tokens.spacingVerticalM} + ${tokens.spacingVerticalXL} + ${tokens.spacingVerticalM})`, // Fixed minimum height
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
    minHeight: `calc(${tokens.spacingVerticalM} + ${tokens.spacingVerticalXL} + ${tokens.spacingVerticalM})`, // Fixed minimum height
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
  
  tabBase: {
    borderRadius: `${tokens.borderRadiusMedium} ${tokens.borderRadiusXLarge} 0 0`,
    marginRight: `-${tokens.spacingHorizontalXXS}`, // Negative margin for overlap
    transitionDuration: tokens.durationNormal,
    transitionTimingFunction: tokens.curveEasyEase,
    position: 'relative' as const,
    
    // Create curved bottom-right corner that tucks behind next tab
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: `-${tokens.strokeWidthThin}`,
      right: `-${tokens.spacingHorizontalXXS}`,
      width: tokens.spacingHorizontalS,
      height: tokens.spacingVerticalXXS,
      backgroundColor: 'inherit',
      borderBottomLeftRadius: tokens.borderRadiusXLarge,
      zIndex: -1, // Behind the next tab
    },
  },
  
  tabSelected: {
    backgroundColor: tokens.colorBrandBackground2,
    marginTop: tokens.spacingVerticalXXS,
    paddingTop: tokens.spacingVerticalXS,
    paddingRight: tokens.spacingHorizontalSNudge,
    paddingBottom: tokens.spacingVerticalXS, // Consistent bottom padding
    paddingLeft: tokens.spacingHorizontalSNudge,
    color: tokens.colorBrandForeground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorBrandStroke2}`,
    borderBottom: 'none',
    boxShadow: tokens.shadow16,
    zIndex: 2,
    transform: `translateY(-${tokens.spacingVerticalXXS})`,
    minHeight: tokens.spacingVerticalXL, // Consistent minimum height
    
    // Hide the pseudo-element for selected tabs to prevent weird dots
    '&::after': {
      display: 'none',
    },
    
    '&:hover': {
      // Maintain same styling on hover to prevent pseudo-element issues
      backgroundColor: tokens.colorBrandBackground2,
      transform: `translateY(-${tokens.spacingVerticalXXS})`,
    },
    
    // Ensure pseudo-element stays hidden on hover
    '&:hover::after': {
      display: 'none',
    },
  },
  
  tabUnselected: {
    backgroundColor: tokens.colorNeutralBackground3,
    marginTop: tokens.spacingVerticalXXS,
    paddingTop: tokens.spacingVerticalXS, // Match selected padding
    paddingRight: tokens.spacingHorizontalXS,
    paddingBottom: tokens.spacingVerticalXS, // Consistent bottom padding
    paddingLeft: tokens.spacingHorizontalXS,
    color: tokens.colorNeutralForeground2,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    borderBottom: 'none',
    boxShadow: tokens.shadow2,
    zIndex: 1,
    transform: 'translateY(0)',
    minHeight: tokens.spacingVerticalXL, // Consistent minimum height
    
    '&:hover': {
      marginTop: tokens.spacingVerticalXXS,
      paddingTop: tokens.spacingVerticalXS, // Keep consistent
      paddingRight: tokens.spacingHorizontalXS,
      paddingBottom: tokens.spacingVerticalXS, // Keep consistent 
      paddingLeft: tokens.spacingHorizontalXS,
      transform: `translateY(-${tokens.spacingVerticalXXS})`,
    },
    '&:focus': {
      marginTop: tokens.spacingVerticalXXS,
      paddingTop: tokens.spacingVerticalXS, // Keep consistent
      paddingRight: tokens.spacingHorizontalXS,
      paddingBottom: tokens.spacingVerticalXS, // Keep consistent
      paddingLeft: tokens.spacingHorizontalXS,
      transform: `translateY(-${tokens.spacingVerticalXXS})`
    },
  },
  
  // Tab content container that can be scrolled to top
  tabContentContainer: {
    flex: '1',
    minHeight: 0, // Allow flex child to shrink below content size
    overflowY: 'auto',
    // Reset scroll position when content changes
    scrollBehavior: 'smooth',
  },
});
