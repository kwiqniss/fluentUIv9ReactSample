import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Title3, Caption1, Text, mergeClasses } from '@fluentui/react-components';
import { 
  ChevronLeftRegular, 
  ChevronRightRegular, 
  DismissRegular,
  AddRegular,
  SubtractRegular,
  ArrowMaximizeRegular
} from '@fluentui/react-icons';
import { sharedLayoutStyles } from '../sharedLayout.styles';
import { photoViewerStyles } from './PhotoViewerTab.styles';
import { useMessageLogger } from '../../hooks/useMessageLogger';
import { MessageType } from '../../types/enums';
import { formatString } from '../../formatString';
import photoViewerStrings from './PhotoViewerTab.resx';

// Stock photos data with various sizes for testing - 37 curated images including massive JWST
const STOCK_PHOTOS = [
  // James Webb Space Telescope - Ultra High Resolution Images (Massive!)
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=4000&h=3000&fit=crop&auto=format',
    alt: 'JWST Carina Nebula - Ultra high resolution star formation',
    width: 4000,
    height: 3000,
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=6000&h=4000&fit=crop&auto=format',
    alt: 'JWST Deep Field - Massive resolution view of distant galaxies',
    width: 6000,
    height: 4000,
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1414609245224-afa02bfb3fda?w=8000&h=6000&fit=crop&auto=format',
    alt: 'JWST Southern Ring Nebula - Ridiculously high resolution dying star',
    width: 8000,
    height: 6000,
  },
  // Additional massive space images
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1446776887592-b5df174dd3f6?w=5000&h=3500&fit=crop&auto=format',
    alt: 'JWST Galaxy Cluster - Massive gravitational lensing effect',
    width: 5000,
    height: 3500,
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=7000&h=4000&fit=crop&auto=format',
    alt: 'JWST Exoplanet Atmosphere - Unprecedented detail of distant world',
    width: 7000,
    height: 4000,
  },
  // Absolutely massive test image
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=12000&h=8000&fit=crop&auto=format',
    alt: 'JWST Ultra Deep Field - Insanely high resolution cosmic vista',
    width: 12000,
    height: 8000,
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format',
    alt: 'Mountain landscape at sunset',
    width: 800,
    height: 600,
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop&auto=format',
    alt: 'Forest path in autumn',
    width: 1200,
    height: 800,
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=900&h=1200&fit=crop&auto=format',
    alt: 'Ocean waves on beach',
    width: 900,
    height: 1200,
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1485470733090-0aae1788d5af?w=1600&h=900&fit=crop&auto=format',
    alt: 'City skyline at night',
    width: 1600,
    height: 900,
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1000&h=600&fit=crop&auto=format',
    alt: 'Alpine lake reflection',
    width: 1000,
    height: 600,
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=700&h=1000&fit=crop&auto=format',
    alt: 'Desert landscape with cacti',
    width: 700,
    height: 1000,
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=1400&h=800&fit=crop&auto=format',
    alt: 'Tropical waterfall',
    width: 1400,
    height: 800,
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=1200&fit=crop&auto=format',
    alt: 'Snowy mountain peaks',
    width: 800,
    height: 1200,
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=1100&h=700&fit=crop&auto=format',
    alt: 'Golden hour landscape',
    width: 1100,
    height: 700,
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1100&h=700&fit=crop&auto=format',
    alt: 'Wildlife deer in meadow',
    width: 1100,
    height: 700,
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?w=900&h=600&fit=crop&auto=format',
    alt: 'Starry night sky',
    width: 900,
    height: 600,
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1520637836862-4d197d17c735?w=1200&h=800&fit=crop&auto=format',
    alt: 'Cherry blossoms in spring',
    width: 1200,
    height: 800,
  },
  {
    id: 13,
    src: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=1200&fit=crop&auto=format',
    alt: 'Misty forest morning',
    width: 800,
    height: 1200,
  },
  {
    id: 14,
    src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&h=900&fit=crop&auto=format',
    alt: 'Rolling green hills',
    width: 1600,
    height: 900,
  },
  {
    id: 15,
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&h=750&fit=crop&auto=format',
    alt: 'Tropical beach paradise',
    width: 1000,
    height: 750,
  },
  {
    id: 16,
    src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=700&h=1000&fit=crop&auto=format',
    alt: 'Lighthouse on rocky coast',
    width: 700,
    height: 1000,
  },
  {
    id: 17,
    src: 'https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?w=1300&h=800&fit=crop&auto=format',
    alt: 'Vintage train in countryside',
    width: 1300,
    height: 800,
  },
  {
    id: 18,
    src: 'https://images.unsplash.com/photo-1473773508845-188df298d2d1?w=850&h=1100&fit=crop&auto=format',
    alt: 'Abstract architecture patterns',
    width: 850,
    height: 1100,
  },
  {
    id: 19,
    src: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1100&h=650&fit=crop&auto=format',
    alt: 'Colorful hot air balloons',
    width: 1100,
    height: 650,
  },
  {
    id: 20,
    src: 'https://images.unsplash.com/photo-1488554378835-f7acf46e6c98?w=900&h=1350&fit=crop&auto=format',
    alt: 'Rustic wooden bridge',
    width: 900,
    height: 1350,
  },
  {
    id: 21,
    src: 'https://images.unsplash.com/photo-1474524955719-b9f87c50ce47?w=1400&h=800&fit=crop&auto=format',
    alt: 'Peaceful lake at dawn',
    width: 1400,
    height: 800,
  },
  {
    id: 22,
    src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=1200&fit=crop&auto=format',
    alt: 'Urban street art mural',
    width: 800,
    height: 1200,
  },
  {
    id: 23,
    src: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&h=700&fit=crop&auto=format',
    alt: 'Sunflower field in summer',
    width: 1200,
    height: 700,
  },
  {
    id: 24,
    src: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=750&h=1000&fit=crop&auto=format',
    alt: 'Ancient castle ruins',
    width: 750,
    height: 1000,
  },
  {
    id: 25,
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1500&h=850&fit=crop&auto=format',
    alt: 'Dramatic storm clouds',
    width: 1500,
    height: 850,
  },
  {
    id: 26,
    src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=900&h=1200&fit=crop&auto=format',
    alt: 'Lone tree in field',
    width: 900,
    height: 1200,
  },
  {
    id: 27,
    src: 'https://images.unsplash.com/photo-1434394354979-a235cd36269d?w=1100&h=600&fit=crop&auto=format',
    alt: 'Mountain river rapids',
    width: 1100,
    height: 600,
  },
  {
    id: 28,
    src: 'https://images.unsplash.com/photo-1520637836862-4d197d17c735?w=800&h=1100&fit=crop&auto=format',
    alt: 'Gothic cathedral interior',
    width: 800,
    height: 1100,
  },
  {
    id: 29,
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1300&h=750&fit=crop&auto=format',
    alt: 'Colorful autumn foliage',
    width: 1300,
    height: 750,
  },
  {
    id: 30,
    src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=700&h=1050&fit=crop&auto=format',
    alt: 'Zen garden with stones',
    width: 700,
    height: 1050,
  },
  {
    id: 31,
    src: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop&auto=format',
    alt: 'Majestic eagle in flight',
    width: 1200,
    height: 800,
  }
];

interface PhotoViewerState {
  isOpen: boolean;
  currentIndex: number;
  scale: number;
  translateX: number;
  translateY: number;
  isDragging: boolean;
  showControls: boolean;
}

const PhotoViewerTab: React.FC = () => {
  const [viewerState, setViewerState] = useState<PhotoViewerState>({
    isOpen: false,
    currentIndex: 0,
    scale: 1,
    translateX: 0,
    translateY: 0,
    isDragging: false,
    showControls: false,
  });

  const [lastFocusedPhoto, setLastFocusedPhoto] = useState<number | null>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const { addMessage } = useMessageLogger();
  const sharedStyles = sharedLayoutStyles();
  const styles = photoViewerStyles();
  const strings = photoViewerStrings;

  // Helper functions
  const getCurrentPhoto = () => STOCK_PHOTOS[viewerState.currentIndex];

  // Photo viewer actions
  const openViewer = useCallback((index: number) => {
    setLastFocusedPhoto(index);
    
    // Calculate fit scale for the specific photo
    const photo = STOCK_PHOTOS[index];
    const containerWidth = window.innerWidth * 0.9;
    const containerHeight = window.innerHeight * 0.9;
    const scaleX = containerWidth / (photo.width || 1);
    const scaleY = containerHeight / (photo.height || 1);
    
    // For large images, fill the viewport (one dimension touches edges, other may extend)
    // For small images, fit completely within viewport (both dimensions within edges)
    const isLargeImage = (photo.width || 0) > containerWidth || (photo.height || 0) > containerHeight;
    const fitScale = isLargeImage ? Math.max(scaleX, scaleY) : Math.min(scaleX, scaleY);
    
    // Log fit scale for debugging
    if (photo.width > 3000 || photo.height > 2000) {
      console.log(`${isLargeImage ? 'Large' : 'Small'} image: ${photo.width}x${photo.height}, Container: ${containerWidth}x${containerHeight}, Fit scale: ${fitScale.toFixed(3)} (${isLargeImage ? 'FILL' : 'FIT'})`);
    }
    
    setViewerState({
      isOpen: true,
      currentIndex: index,
      scale: fitScale,
      translateX: 0,
      translateY: 0,
      isDragging: false,
      showControls: false,
    });
    addMessage(`Opened photo ${index + 1}: ${STOCK_PHOTOS[index].alt}`, MessageType.Info);
  }, [addMessage]);

  const closeViewer = useCallback(() => {
    setViewerState(prev => ({ ...prev, isOpen: false }));
    addMessage('Closed photo viewer', MessageType.Info);
    
    // Restore focus to the last viewed photo
    setTimeout(() => {
      if (lastFocusedPhoto !== null && thumbnailRefs.current[lastFocusedPhoto]) {
        thumbnailRefs.current[lastFocusedPhoto]?.focus();
      }
    }, 100);
  }, [addMessage, lastFocusedPhoto]);

  const navigatePhoto = useCallback((direction: 'prev' | 'next') => {
    setViewerState(prev => {
      const newIndex = direction === 'next' 
        ? (prev.currentIndex + 1) % STOCK_PHOTOS.length
        : (prev.currentIndex - 1 + STOCK_PHOTOS.length) % STOCK_PHOTOS.length;
      
      // Calculate fit scale for the new photo
      const newPhoto = STOCK_PHOTOS[newIndex];
      const containerWidth = window.innerWidth * 0.9;
      const containerHeight = window.innerHeight * 0.9;
      const scaleX = containerWidth / (newPhoto.width || 1);
      const scaleY = containerHeight / (newPhoto.height || 1);
      
      // For large images, fill the viewport; for small images, fit within viewport
      const isLargeImage = (newPhoto.width || 0) > containerWidth || (newPhoto.height || 0) > containerHeight;
      const newFitScale = isLargeImage ? Math.max(scaleX, scaleY) : Math.min(scaleX, scaleY);
      
      return {
        ...prev,
        currentIndex: newIndex,
        scale: newFitScale,
        translateX: 0,
        translateY: 0,
      };
    });
    
    const newIndex = direction === 'next' 
      ? (viewerState.currentIndex + 1) % STOCK_PHOTOS.length
      : (viewerState.currentIndex - 1 + STOCK_PHOTOS.length) % STOCK_PHOTOS.length;
    
    addMessage(`Navigated to photo ${newIndex + 1}: ${STOCK_PHOTOS[newIndex].alt}`, MessageType.Info);
  }, [addMessage]);

  const zoomIn = useCallback(() => {
    setViewerState(prev => ({
      ...prev,
      scale: Math.min(prev.scale * 1.5, 5), // Max zoom 5x for better detail viewing
    }));
    addMessage('Zoomed in', MessageType.Info);
  }, [addMessage]);

  const zoomOut = useCallback(() => {
    const photo = getCurrentPhoto();
    const containerWidth = window.innerWidth * 0.9;
    const containerHeight = window.innerHeight * 0.9;
    const scaleX = containerWidth / (photo.width || 1);
    const scaleY = containerHeight / (photo.height || 1);
    
    // For large images, fill the viewport; for small images, fit within viewport
    const isLargeImage = (photo.width || 0) > containerWidth || (photo.height || 0) > containerHeight;
    const fitScale = isLargeImage ? Math.max(scaleX, scaleY) : Math.min(scaleX, scaleY);
    
    setViewerState(prev => ({
      ...prev,
      scale: Math.max(prev.scale / 1.5, fitScale),
    }));
    addMessage('Zoomed out', MessageType.Info);
  }, [addMessage]);

  const resetZoom = useCallback(() => {
    const photo = getCurrentPhoto();
    const containerWidth = window.innerWidth * 0.9;
    const containerHeight = window.innerHeight * 0.9;
    const scaleX = containerWidth / (photo.width || 1);
    const scaleY = containerHeight / (photo.height || 1);
    
    // For large images, fill the viewport; for small images, fit within viewport
    const isLargeImage = (photo.width || 0) > containerWidth || (photo.height || 0) > containerHeight;
    const fitScale = isLargeImage ? Math.max(scaleX, scaleY) : Math.min(scaleX, scaleY);
    
    setViewerState(prev => ({
      ...prev,
      scale: fitScale,
      translateX: 0,
      translateY: 0,
    }));
    addMessage('Reset zoom to fit', MessageType.Info);
  }, [addMessage]);

  // Event handlers
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!viewerState.isOpen) return;

    switch (e.key) {
      case 'Escape':
        closeViewer();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        navigatePhoto('prev');
        break;
      case 'ArrowRight':
        e.preventDefault();
        navigatePhoto('next');
        break;
      case '+':
      case '=':
        e.preventDefault();
        zoomIn();
        break;
      case '-':
        e.preventDefault();
        zoomOut();
        break;
      case '0':
        e.preventDefault();
        resetZoom();
        break;
    }
  }, [viewerState.isOpen, closeViewer, navigatePhoto, zoomIn, zoomOut, resetZoom]);

  const handleControlsVisibility = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isNearEdge = x < 100 || x > rect.width - 100;
    
    setViewerState(prev => ({ ...prev, showControls: isNearEdge }));
  }, []);

  const handleMouseLeave = useCallback(() => {
    setViewerState(prev => ({ ...prev, showControls: false }));
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const photo = getCurrentPhoto();
    const containerWidth = window.innerWidth * 0.9;
    const containerHeight = window.innerHeight * 0.9;
    const scaleX = containerWidth / (photo.width || 1);
    const scaleY = containerHeight / (photo.height || 1);
    
    // For large images, fill the viewport; for small images, fit within viewport
    const isLargeImage = (photo.width || 0) > containerWidth || (photo.height || 0) > containerHeight;
    const fitScale = isLargeImage ? Math.max(scaleX, scaleY) : Math.min(scaleX, scaleY);
    
    if (viewerState.scale <= fitScale) return; // Only allow dragging when zoomed beyond fit scale
    
    e.preventDefault();
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    setViewerState(prev => ({ ...prev, isDragging: true }));
  }, [viewerState.scale]);

  const handleMouseMoveForDrag = useCallback((e: React.MouseEvent) => {
    if (!viewerState.isDragging || !dragStartRef.current) return;

    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;

    // Apply basic constraints to prevent panning too far
    const photo = getCurrentPhoto();
    const containerWidth = window.innerWidth * 0.9;
    const containerHeight = window.innerHeight * 0.9;
    
    const scaledWidth = (photo.width || 1) * viewerState.scale;
    const scaledHeight = (photo.height || 1) * viewerState.scale;
    
    // Calculate max allowed translation
    const maxTranslateX = Math.max(0, (scaledWidth - containerWidth) / 2);
    const maxTranslateY = Math.max(0, (scaledHeight - containerHeight) / 2);

    const newTranslateX = Math.max(-maxTranslateX, Math.min(maxTranslateX, viewerState.translateX + deltaX));
    const newTranslateY = Math.max(-maxTranslateY, Math.min(maxTranslateY, viewerState.translateY + deltaY));

    setViewerState(prev => ({
      ...prev,
      translateX: newTranslateX,
      translateY: newTranslateY,
    }));

    dragStartRef.current = { x: e.clientX, y: e.clientY };
  }, [viewerState.isDragging, viewerState.scale, viewerState.translateX, viewerState.translateY]);

  const handleMouseUp = useCallback(() => {
    setViewerState(prev => ({ ...prev, isDragging: false }));
    dragStartRef.current = null;
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY;
    const zoomFactor = 1.1;
    
    const photo = getCurrentPhoto();
    const containerWidth = window.innerWidth * 0.9;
    const containerHeight = window.innerHeight * 0.9;
    const scaleX = containerWidth / (photo.width || 1);
    const scaleY = containerHeight / (photo.height || 1);
    
    // For large images, fill the viewport; for small images, fit within viewport
    const isLargeImage = (photo.width || 0) > containerWidth || (photo.height || 0) > containerHeight;
    const fitScale = isLargeImage ? Math.max(scaleX, scaleY) : Math.min(scaleX, scaleY);
    
    if (delta < 0) {
      // Zoom in
      setViewerState(prev => ({
        ...prev,
        scale: Math.min(prev.scale * zoomFactor, 5),
      }));
    } else {
      // Zoom out
      setViewerState(prev => ({
        ...prev,
        scale: Math.max(prev.scale / zoomFactor, fitScale),
        // Reset translation if we zoom out to fit scale
        translateX: prev.scale / zoomFactor <= fitScale ? 0 : prev.translateX,
        translateY: prev.scale / zoomFactor <= fitScale ? 0 : prev.translateY,
      }));
    }
  }, []);

  // Effects
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (viewerState.isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus the viewer container for accessibility
      setTimeout(() => viewerRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [viewerState.isOpen]);

  // Calculate image transform
  const imageTransform = `scale(${viewerState.scale}) translate(${viewerState.translateX / viewerState.scale}px, ${viewerState.translateY / viewerState.scale}px)`;
  
  // Dynamic image styles based on zoom level
  const photo = getCurrentPhoto();
  const containerWidth = window.innerWidth * 0.9;
  const containerHeight = window.innerHeight * 0.9;
  const scaleX = containerWidth / (photo.width || 1);
  const scaleY = containerHeight / (photo.height || 1);
  
  // For large images, fill the viewport; for small images, fit within viewport
  const isLargeImage = (photo.width || 0) > containerWidth || (photo.height || 0) > containerHeight;
  const fitScale = isLargeImage ? Math.max(scaleX, scaleY) : Math.min(scaleX, scaleY);
  const isZoomed = viewerState.scale > fitScale;
  const imageStyle = {
    transform: imageTransform,
    maxWidth: isZoomed ? 'none' : '100%',
    maxHeight: isZoomed ? 'none' : '100%',
    cursor: isZoomed ? 'grab' : 'default',
  };

  return (
    <div className={styles.tabContainer}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <Title3 className={sharedStyles.h3Heading}>{strings.title}</Title3>
        <Caption1>{strings.description}</Caption1>
      </div>

      {/* Instructions */}
      <div className={styles.instructionsSection}>
        <Text>{strings.photoInstructions}</Text>
        <Text size={300}>{strings.viewerInstructions}</Text>
      </div>

      {/* Photo Grid */}
      <div 
        className={styles.photoGrid}
        role="grid" 
        aria-label={strings.gridViewLabel}
      >
        {STOCK_PHOTOS.map((photo, index) => (
          <button
            key={photo.id}
            ref={el => thumbnailRefs.current[index] = el}
            className={styles.photoThumbnail}
            onClick={() => openViewer(index)}
            role="gridcell"
            aria-label={`${formatString(strings.photoTitle, (index + 1).toString())}: ${photo.alt}`}
            tabIndex={0}
          >
            <img 
              src={photo.src} 
              alt=""
              role="presentation"
              className={styles.thumbnailImage}
              loading="lazy"
            />
            <div className={mergeClasses(styles.thumbnailOverlay, 'thumbnailOverlay')} />
          </button>
        ))}
      </div>

      {/* Photo Viewer Modal */}
      {viewerState.isOpen && (
        <div 
          className={styles.viewerOverlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeViewer();
          }}
          onMouseMove={handleControlsVisibility}
          onMouseLeave={handleMouseLeave}
          role="dialog"
          aria-modal="true"
          aria-labelledby="viewer-title"
          aria-describedby="viewer-instructions"
        >
          <div 
            ref={viewerRef}
            className={styles.viewerContainer}
            tabIndex={-1}
            onWheel={handleWheel}
          >
            {/* Screen reader content */}
            <div id="viewer-title" className={styles.srOnly}>
              {formatString(strings.photoLabel, 
                (viewerState.currentIndex + 1).toString(), 
                STOCK_PHOTOS.length.toString()
              )}
            </div>
            <div id="viewer-instructions" className={styles.srOnly}>
              {strings.viewerInstructions}
            </div>

            {/* Close Button */}
            <button
              className={styles.closeButton}
              onClick={closeViewer}
              aria-label={strings.closeViewer}
              tabIndex={0}
            >
              <DismissRegular />
            </button>

            {/* Navigation Buttons */}
            <button
              className={mergeClasses(
                styles.navigationButton,
                styles.previousButton,
                viewerState.showControls && styles.navigationButtonVisible
              )}
              onClick={() => navigatePhoto('prev')}
              aria-label={strings.previousPhoto}
              tabIndex={0}
            >
              <ChevronLeftRegular />
            </button>

            <button
              className={mergeClasses(
                styles.navigationButton,
                styles.nextButton,
                viewerState.showControls && styles.navigationButtonVisible
              )}
              onClick={() => navigatePhoto('next')}
              aria-label={strings.nextPhoto}
              tabIndex={0}
            >
              <ChevronRightRegular />
            </button>

            {/* Main Image */}
            <img
              ref={imageRef}
              src={getCurrentPhoto().src}
              alt={getCurrentPhoto().alt}
              className={styles.viewerImage}
              style={imageStyle}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMoveForDrag}
              onMouseUp={handleMouseUp}
              draggable={false}
            />

            {/* Zoom Controls */}
            <div className={styles.zoomControls}>
              <button
                className={styles.zoomButton}
                onClick={zoomOut}
                disabled={viewerState.scale <= fitScale}
                aria-label={strings.zoomOut}
                tabIndex={0}
              >
                <SubtractRegular />
              </button>

              <button
                className={styles.zoomButton}
                onClick={resetZoom}
                aria-label={strings.resetZoom}
                tabIndex={0}
              >
                <ArrowMaximizeRegular />
              </button>

              <button
                className={styles.zoomButton}
                onClick={zoomIn}
                disabled={viewerState.scale >= 5}
                aria-label={strings.zoomIn}
                tabIndex={0}
              >
                <AddRegular />
              </button>
            </div>

            {/* Photo Info */}
            <div className={styles.photoInfo}>
              <div>
                {formatString(strings.photoLabel, 
                  (viewerState.currentIndex + 1).toString(), 
                  STOCK_PHOTOS.length.toString()
                )}
              </div>
              <div style={{ fontSize: '11px', opacity: 0.8 }}>
                {getCurrentPhoto().width}×{getCurrentPhoto().height} • Scale: {(viewerState.scale * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoViewerTab;
