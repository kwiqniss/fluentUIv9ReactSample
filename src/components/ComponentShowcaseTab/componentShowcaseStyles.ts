import { makeStyles, tokens } from '@fluentui/react-components';

// Re-export shared constants for backwards compatibility
export { componentConstants as componentProps } from '../../styles/componentConstants';

/**
 * Styles for ComponentShowcaseTab with proper spacing and layout management
 */
export const componentShowcaseStyles = makeStyles({
  // Main container with responsive width
  container: {
    padding: '1.5rem',
    maxWidth: '100%',
    width: '100%',
    margin: '0 auto',
    boxSizing: 'border-box',
    overflowX: 'hidden', // Prevent horizontal overflow
    '@media (max-width: 600px)': {
      padding: '1rem',
    },
    '@media (max-width: 400px)': {
      padding: '0.75rem',
    },
  },

  // Responsive wrapper for all content
  responsiveWrapper: {
    width: '100%',
    maxWidth: '100vw',
    overflowX: 'hidden',
    boxSizing: 'border-box',
  },

  // Section headers with consistent spacing
  sectionHeader: {
    marginBottom: '1.5rem',
    marginTop: '2.5rem',
    '&:first-child': {
      marginTop: '0',
    },
  },

  // Component grid layout - responsive for high zoom
  componentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(16rem, 100%), 1fr))',
    gap: '2rem',
    marginBottom: '2rem',
    '@media (max-width: 600px)': {
      gap: '1.5rem',
      gridTemplateColumns: '1fr', // Single column at very high zoom
    },
    '@media (max-width: 400px)': {
      gap: '1rem',
    },
  },

  // Individual component card
  componentCard: {
    padding: '1.5rem',
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusLarge,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    minHeight: '8rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },

  // Component demo area - prevents layout shifts
  componentDemo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    alignItems: 'flex-start',
    minHeight: '3rem',
  },

  // Horizontal layout for related components
  horizontalGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem',
    alignItems: 'center',
  },

  // Vertical layout for stacked components
  verticalGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    width: '100%',
  },

  // Navigation components section
  navigationSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },

  // Breadcrumb container
  breadcrumbContainer: {
    padding: '1rem',
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
  },

  // Menu demo area
  menuContainer: {
    position: 'relative',
    display: 'inline-block',
  },

  // Layout section with responsive columns
  layoutSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(18rem, 100%), 1fr))',
    gap: '2rem',
    marginBottom: '2rem',
  },

  // Accordion container with fixed height to prevent jumping
  accordionContainer: {
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    overflow: 'hidden',
  },

  // Communication components area
  communicationArea: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },

  // Badge demo area
  badgeDemo: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  // Avatar section
  avatarSection: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: '1rem',
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
  },

  // Status indicators with responsive grid
  statusIndicators: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(14rem, 100%), 1fr))',
    gap: '1.5rem',
  },

  // Spinner demo with fixed dimensions
  spinnerDemo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    minHeight: '3rem',
    padding: '1rem',
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
  },

  // Skeleton container
  skeletonContainer: {
    padding: '1rem',
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
  },

  // Skeleton profile layout
  skeletonProfile: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'flex-start',
  },

  // Skeleton text content
  skeletonText: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },

  // Toast demo area
  toastDemo: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap',
  },

  // Interactive components section
  interactiveSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },

  // Toolbar container with proper spacing
  toolbarContainer: {
    padding: '1rem',
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
  },

  // Search area - responsive width
  searchArea: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '100%',
    maxWidth: '24rem',
  },

  // Search results with fixed height
  searchResults: {
    minHeight: '4rem',
    padding: '0.75rem',
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
  },

  // Data visualization section
  dataSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },

  // Table container with proper overflow handling
  tableContainer: {
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    overflow: 'hidden',
    backgroundColor: tokens.colorNeutralBackground1,
  },

  // Table wrapper to prevent horizontal overflow - critical for WCAG reflow
  tableWrapper: {
    overflowX: 'auto',
    maxWidth: '100%',
    width: '100%',
    '@media (max-width: 900px)': {
      // At high zoom, allow table to scroll horizontally as last resort
      // but ensure it doesn't break out of container
      overflowX: 'auto',
      WebkitOverflowScrolling: 'touch',
    },
  },

  // Message log with consistent styling
  messageLog: {
    backgroundColor: tokens.colorNeutralBackground2,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: '1rem',
    maxHeight: '12rem',
    overflowY: 'auto',
    marginTop: '2rem',
  },

  // Message item styling
  messageItem: {
    display: 'block',
    padding: '0.25rem 0',
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200,
  },

  // Utility classes for consistent spacing
  marginBottom: {
    marginBottom: '1rem',
  },

  marginTop: {
    marginTop: '1rem',
  },

  // Responsive width elements to prevent layout shifts
  fixedWidth: {
    width: '100%',
    maxWidth: '20rem',
    minWidth: 'min(12rem, 100%)',
  },
});
