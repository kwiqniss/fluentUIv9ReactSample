import { makeStyles, tokens } from '@fluentui/react-components';

/**
 * Shared layout styles using FluentUI design tokens, percentages, and relative units
 * Simple, consistent layout patterns for all tabs
 */
export const sharedLayoutStyles = makeStyles({
  // Main tab container - uses FluentUI tokens for consistent spacing
  tabContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXL,
    padding: tokens.spacingHorizontalL,
    width: '100%',
    maxWidth: '75rem', // ~1200px max width
    margin: '0 auto',
  },

  // Header section for tab title and description
  headerSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
  },

  // Form grid - responsive 2-column layout using CSS Grid
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: tokens.spacingVerticalL,
    width: '100%',
    
    // 2 columns on medium screens and up
    '@media (min-width: 48rem)': {
      gridTemplateColumns: '1fr 1fr',
      gap: tokens.spacingHorizontalXL,
    },
  },

  // Actions section for buttons
  actionsSection: {
    display: 'flex',
    gap: tokens.spacingHorizontalM,
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: tokens.spacingVerticalL,
  },

  // Section spacing for separating content areas
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL,
  },
});
