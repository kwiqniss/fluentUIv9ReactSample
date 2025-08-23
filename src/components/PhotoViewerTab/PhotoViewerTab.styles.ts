import { makeStyles, tokens } from '@fluentui/react-components';

// Local constants for component sizing
const SIZES = {
  gridGap: '1rem',
  gridItemMinWidth: '12rem',
  gridItemMaxWidth: '20rem',
  viewerPadding: '2rem',
  controlButtonSize: '3rem',
  zoomButtonSize: '2.5rem',
  closeButtonSize: '2.5rem',
  maxImageWidth: '90vw',
  maxImageHeight: '90vh',
} as const;

export const photoViewerStyles = makeStyles({
  tabContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXL,
    padding: tokens.spacingHorizontalL,
    width: '100%',
    maxWidth: '75rem',
    margin: '0 auto',
    flex: '1',
  },

  headerSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
  },

  instructionsSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
    marginBottom: tokens.spacingVerticalL,
    padding: tokens.spacingHorizontalM,
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
  },

  // Photo Grid Styles
  photoGrid: {
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fill, minmax(${SIZES.gridItemMinWidth}, 1fr))`,
    gap: SIZES.gridGap,
    width: '100%',
    justifyContent: 'center',
  },

  photoThumbnail: {
    position: 'relative',
    aspectRatio: '4/3',
    borderRadius: tokens.borderRadiusMedium,
    overflow: 'hidden',
    cursor: 'pointer',
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground3,
    transition: `all ${tokens.durationNormal} ${tokens.curveEasyEase}`,
    maxWidth: SIZES.gridItemMaxWidth,

    '&:hover': {
      transform: 'scale(1.02)',
      boxShadow: tokens.shadow8,
      
      '& .thumbnailOverlay': {
        opacity: 1,
      },
    },

    '&:focus': {
      outline: `${tokens.strokeWidthThick} solid ${tokens.colorBrandBackground}`,
      outlineOffset: tokens.spacingHorizontalXXS,
    },
  },

  thumbnailImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },

  thumbnailOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    opacity: 0,
    transition: 'opacity 0.2s ease-in-out',
    pointerEvents: 'none',
  },

  // Photo Viewer Modal Styles
  viewerOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: SIZES.viewerPadding,
    touchAction: 'none', // Prevent all default touch behaviors on the entire overlay
  },

  viewerContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    maxWidth: SIZES.maxImageWidth,
    maxHeight: SIZES.maxImageHeight,
    touchAction: 'auto', // Allow touch actions for our custom pinch handling
  },

  viewerImage: {
    display: 'block',
    transition: `transform ${tokens.durationSlow} ${tokens.curveEasyEase}`,

    '&:active': {
      cursor: 'grabbing',
    },
  },

  // Control Buttons
  closeButton: {
    position: 'absolute',
    top: tokens.spacingVerticalM,
    right: tokens.spacingHorizontalM,
    width: SIZES.closeButtonSize,
    height: SIZES.closeButtonSize,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusCircular,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: tokens.fontSizeBase400,
    color: tokens.colorNeutralForeground1,
    boxShadow: tokens.shadow16,
    transition: `all ${tokens.durationFast} ${tokens.curveEasyEase}`,
    zIndex: 10,

    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      transform: 'scale(1.05)',
      boxShadow: tokens.shadow28,
    },

    '&:focus': {
      outline: `${tokens.strokeWidthThick} solid ${tokens.colorBrandBackground}`,
      outlineOffset: tokens.spacingHorizontalXXS,
    },

    '&:active': {
      backgroundColor: tokens.colorNeutralBackground1Pressed,
      transform: 'scale(0.98)',
    },
  },

  navigationButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: SIZES.controlButtonSize,
    height: SIZES.controlButtonSize,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusCircular,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: tokens.fontSizeBase500,
    color: tokens.colorNeutralForeground1,
    boxShadow: tokens.shadow16,
    transition: `all ${tokens.durationFast} ${tokens.curveEasyEase}`,
    opacity: 0,
    zIndex: 10,

    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      transform: 'translateY(-50%) scale(1.05)',
      boxShadow: tokens.shadow28,
    },

    '&:focus': {
      outline: `${tokens.strokeWidthThick} solid ${tokens.colorBrandBackground}`,
      outlineOffset: tokens.spacingHorizontalXXS,
      opacity: 1,
    },

    '&:active': {
      backgroundColor: tokens.colorNeutralBackground1Pressed,
      transform: 'translateY(-50%) scale(0.98)',
    },
  },

  navigationButtonVisible: {
    opacity: 1,
  },

  previousButton: {
    left: tokens.spacingHorizontalM,
  },

  nextButton: {
    right: tokens.spacingHorizontalM,
  },

  // Zoom Controls
  zoomControls: {
    position: 'absolute',
    bottom: tokens.spacingVerticalM,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: tokens.spacingHorizontalXS,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: tokens.spacingVerticalXS,
    boxShadow: tokens.shadow16,
  },

  zoomButton: {
    width: SIZES.zoomButtonSize,
    height: SIZES.zoomButtonSize,
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: tokens.borderRadiusSmall,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    transition: `all ${tokens.durationFast} ${tokens.curveEasyEase}`,

    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground3,
    },

    '&:focus': {
      outline: `${tokens.strokeWidthThick} solid ${tokens.colorBrandBackground}`,
      outlineOffset: tokens.spacingHorizontalXXS,
    },

    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },

  // Photo Info
  photoInfo: {
    position: 'absolute',
    bottom: tokens.spacingVerticalM,
    right: tokens.spacingHorizontalM,
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalS}`,
    borderRadius: tokens.borderRadiusSmall,
    fontSize: tokens.fontSizeBase200,
    boxShadow: tokens.shadow8,
  },

  // Screen reader only content
  srOnly: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: 0,
  },
});
