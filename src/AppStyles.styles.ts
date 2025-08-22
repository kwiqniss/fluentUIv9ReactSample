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
    gap: tokens.spacingVerticalXS,
    flex: '1',
    minWidth: '0', // Allow shrinking
    
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
  },

  // Controls section for theme and verbosity dropdowns - responsive positioning
  controlsSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
    alignItems: 'flex-end',
    flexShrink: 0,
    
    // When wrapped to new line: horizontal layout, left-aligned
    '@media (max-width: 64rem)': {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: tokens.spacingHorizontalM,
      justifyContent: 'flex-start',
    },
    
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
    paddingBottom: tokens.spacingVerticalS,
    paddingLeft: tokens.spacingHorizontalSNudge,
    color: tokens.colorBrandForeground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorBrandStroke2}`,
    borderBottom: 'none',
    boxShadow: tokens.shadow16,
    zIndex: 2,
    transform: `translateY(-${tokens.spacingVerticalXXS})`,
  },
  
  tabUnselected: {
    backgroundColor: tokens.colorNeutralBackground3,
    marginTop: tokens.spacingVerticalXXS,
    paddingTop: tokens.spacingVerticalXXS,
    paddingRight: tokens.spacingHorizontalXS,
    paddingBottom: tokens.spacingVerticalXXS,
    paddingLeft: tokens.spacingHorizontalXS,
    color: tokens.colorNeutralForeground2,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    borderBottom: 'none',
    boxShadow: tokens.shadow2,
    zIndex: 1,
    transform: 'translateY(0)',
    
    '&:hover': {
      marginTop: '0',
      paddingTop: tokens.spacingVerticalXXS,
      paddingRight: tokens.spacingHorizontalXS,
      paddingBottom: tokens.spacingVerticalXS,
      paddingLeft: tokens.spacingHorizontalXS,
      transform: `translateY(-${tokens.spacingVerticalXXS})`,
    },
    '&:focus': {
      marginTop: '0',
      paddingTop: tokens.spacingVerticalXXS,
      paddingRight: tokens.spacingHorizontalXS,
      paddingBottom: tokens.spacingVerticalXS,
      paddingLeft: tokens.spacingHorizontalXS,
      transform: `translateY(-${tokens.spacingVerticalXXS})`,
    },
  },
});
