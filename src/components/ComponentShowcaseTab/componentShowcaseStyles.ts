import { makeStyles, tokens } from '@fluentui/react-components';

/**
 * Styles for ComponentShowcaseTab with proper spacing and layout management
 */
export const componentShowcaseStyles = makeStyles({
  // Main container with consistent spacing
  container: {
    padding: '1.5rem',
    maxWidth: '80rem',
    margin: '0 auto',
  },

  // Section headers with consistent spacing
  sectionHeader: {
    marginBottom: '1.5rem',
    marginTop: '2.5rem',
    '&:first-child': {
      marginTop: '0',
    },
  },

  // Component grid layout
  componentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))',
    gap: '2rem',
    marginBottom: '2rem',
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

  // Layout section with proper card spacing
  layoutSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(24rem, 1fr))',
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

  // Status indicators with consistent spacing
  statusIndicators: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))',
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

  // Search area
  searchArea: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
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

  // Table wrapper to prevent horizontal overflow
  tableWrapper: {
    overflowX: 'auto',
    maxWidth: '100%',
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

  // Fixed width elements to prevent layout shifts
  fixedWidth: {
    width: '100%',
    maxWidth: '20rem',
  },
});
