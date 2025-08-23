import { makeStyles, tokens } from '@fluentui/react-components';

// Local constants for component sizing
const SIZES = {
  gridGap: '1rem',
  gridItemMinWidth: '12rem',
  gridItemMaxWidth: '20rem',
  viewerPadding: '2rem',
  controlButtonSize: '3rem',
  zoomButtonSize: '3rem', // Increased from 2.5rem for better touch targets
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

  headerTop: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: tokens.spacingHorizontalL,
  },

  layoutToggle: {
    display: 'flex',
    gap: tokens.spacingHorizontalXS,
    alignItems: 'center',
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

    // Hide focus outline on gallery container - focus is shown on selected photo
    '&:focus': {
      outline: 'none',
    },
  },

  // Random Size Grid Layout - Full container fill with precise tessellation
  photoGridRandom: {
    display: 'grid',
    gridTemplateColumns: 'repeat(16, 1fr)', // 16 columns for accommodating bigger shapes
    gridTemplateRows: 'repeat(16, 1fr)',     // 16 equal rows for larger shape variety
    gap: '2px', // Slightly larger gap for better visual separation
    width: '100%',
    height: '80vh', // Fixed viewport height for consistent sizing
    backgroundColor: 'transparent',
    justifyContent: 'stretch',
    alignContent: 'stretch',
    justifyItems: 'stretch',
    alignItems: 'stretch',
    overflow: 'hidden',
    padding: '4px',
    boxSizing: 'border-box',

    // Hide focus outline on gallery container - focus is shown on selected photo
    '&:focus': {
      outline: 'none',
    },
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

    '&[aria-selected="true"]': {
      outline: `${tokens.strokeWidthThicker} solid ${tokens.colorBrandBackground}`,
      outlineOffset: tokens.spacingHorizontalXXS,
      boxShadow: tokens.shadow8,
      zIndex: 12,
    },
  },

  photoThumbnailRandom: {
    position: 'relative',
    borderRadius: '2px', // Minimal radius for tight tessellation
    overflow: 'hidden',
    cursor: 'pointer',
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    backgroundColor: tokens.colorNeutralBackground3,
    transition: `all ${tokens.durationFast} ${tokens.curveEasyEase}`,
    width: '100%', // Fill grid area completely
    height: '100%', // Fill grid area completely
    minHeight: '0', // Allow shrinking
    
    '&:hover': {
      transform: 'scale(1.005)', // Very subtle scale to avoid overlap
      boxShadow: tokens.shadow4,
      zIndex: 10,
      
      '& .thumbnailOverlay': {
        opacity: 1,
      },
    },

    '&:focus': {
      outline: `${tokens.strokeWidthThick} solid ${tokens.colorBrandBackground}`,
      outlineOffset: '1px',
      zIndex: 11,
    },

    '&[aria-selected="true"]': {
      outline: `${tokens.strokeWidthThicker} solid ${tokens.colorBrandBackground}`,
      outlineOffset: '1px',
      boxShadow: tokens.shadow8,
      zIndex: 12,
      transform: 'scale(1.01)', // Slightly more prominent when selected
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

  blurredBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    filter: 'blur(25px) brightness(0.6)', // More blur, slightly less vibrant
    opacity: 0.7, // Less opaque for subtlety
    zIndex: -1,
    transform: 'scale(1.1)', // Scale up slightly to avoid blur edge artifacts
  },

  viewerImage: {
    display: 'block',
    transition: `transform ${tokens.durationSlow} ${tokens.curveEasyEase}`,
    position: 'relative',
    zIndex: 1,

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
    gap: tokens.spacingHorizontalS, // Increased gap for better separation
    backgroundColor: tokens.colorNeutralBackground1, // Strong white background
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`, // Subtle border
    borderRadius: tokens.borderRadiusLarge, // Larger radius for modern look
    padding: tokens.spacingVerticalS, // Increased padding for better touch targets
    boxShadow: tokens.shadow28, // Strong shadow for better contrast against photos
    backdropFilter: 'blur(12px)', // Enhanced backdrop blur for better contrast
  },

  zoomButton: {
    width: SIZES.zoomButtonSize,
    height: SIZES.zoomButtonSize,
    backgroundColor: tokens.colorNeutralBackground1, // Clean white background
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`, // Subtle border instead of thick dark one
    borderRadius: tokens.borderRadiusSmall,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: tokens.fontSizeBase500, // Large icons
    color: tokens.colorNeutralForeground1, // Bright dark icons for maximum contrast
    fontWeight: tokens.fontWeightBold, // Bold icons for better visibility
    transition: `all ${tokens.durationFast} ${tokens.curveEasyEase}`,
    position: 'relative',
    boxShadow: tokens.shadow4,

    '&:hover:not(:disabled)': {
      backgroundColor: tokens.colorBrandBackground,
      color: tokens.colorNeutralForegroundOnBrand, // Bright white on brand
      transform: 'scale(1.08)',
      border: `${tokens.strokeWidthThin} solid ${tokens.colorBrandBackground}`,
      boxShadow: tokens.shadow16,
    },

    '&:focus': {
      outline: `${tokens.strokeWidthThick} solid ${tokens.colorBrandBackground}`,
      outlineOffset: tokens.spacingHorizontalXXS,
    },

    '&:active:not(:disabled)': {
      backgroundColor: tokens.colorBrandBackgroundPressed,
      color: tokens.colorNeutralForegroundOnBrand,
      transform: 'scale(0.95)',
    },

    '&:disabled': {
      opacity: 0.5, // Lower opacity for reduced contrast
      cursor: 'not-allowed',
      color: tokens.colorNeutralForegroundDisabled, // Muted grey for icons
      backgroundColor: tokens.colorNeutralBackgroundDisabled, // Grey background
      border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStrokeDisabled}`, // Subtle grey border
      fontWeight: 'normal', // Normal weight for disabled state
      boxShadow: 'none', // No shadow when disabled
      
      '&:hover': {
        transform: 'none', // No hover effects when disabled
        opacity: 0.5, // Maintain low contrast on hover
        color: tokens.colorNeutralForegroundDisabled, // Keep muted color on hover
      },
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
