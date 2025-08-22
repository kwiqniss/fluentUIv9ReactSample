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
    borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    padding: `0 ${tokens.spacingHorizontalL}`,
    transition: 'box-shadow 0.2s ease',
  },
  tabContainerSticky: {
    position: 'fixed',
    top: 0,
    zIndex: 100,
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke3}`,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalL}`,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  tabSpacer: {
    height: 'var(--tabs-height, 0px)',
    visibility: 'hidden',
  },
});
