import { makeStyles, tokens } from '@fluentui/react-components';

/**
 * Styles specific to the AdvancedTab component
 */
export const advancedTabStyles = makeStyles({
  selectedItem: {
    backgroundColor: tokens.colorNeutralBackground3,
    border: `2px solid ${tokens.colorBrandStroke2}`,
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground4,
      border: `2px solid ${tokens.colorBrandStroke1}`,
    },
    '@media (forced-colors: active)': {
      backgroundColor: 'Highlight',
      color: 'HighlightText',
      forcedColorAdjust: 'none',
      '&:hover': {
        backgroundColor: 'Highlight',
      },
    },
  },
});
