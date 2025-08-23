import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Title3, Caption1, Text, Button, mergeClasses } from '@fluentui/react-components';
import { 
  ChevronLeftRegular, 
  ChevronRightRegular, 
  DismissRegular,
  AddRegular,
  SubtractRegular,
  ArrowMaximizeRegular,
  GridRegular,
  AppsRegular
} from '@fluentui/react-icons';
import { sharedLayoutStyles } from '../sharedLayout.styles';
import { photoViewerStyles } from './PhotoViewerTab.styles';
import { useMessageLogger } from '../../hooks/useMessageLogger';
import { MessageType } from '../../types/enums';
import { formatString } from '../../formatString';
import photoViewerStrings from './PhotoViewerTab.resx';

// Stock photos data with local images for reliability - 17 curated images including massive JWST
const STOCK_PHOTOS = [
  // Small images (for blurred background effect)
  {
    id: 1,
    src: '/images/small-kitten-300x200.jpg',
    thumbnailSrc: '/images/thumbnails/small-kitten-300x200.jpg',
    alt: 'Tiny cute kitten (300×200) - shows blurred background',
    width: 300,
    height: 200,
  },
  {
    id: 2,
    src: '/images/small-dog-400x300.jpg',
    thumbnailSrc: '/images/thumbnails/small-dog-400x300.jpg',
    alt: 'Small golden retriever (400×300) - shows blurred background',
    width: 400,
    height: 300,
  },
  {
    id: 3,
    src: '/images/small-cat-250x350.jpg',
    thumbnailSrc: '/images/thumbnails/small-cat-250x350.jpg',
    alt: 'Tiny portrait of orange cat (250×350) - shows blurred background',
    width: 250,
    height: 350,
  },
  
  // Medium size images
  {
    id: 4,
    src: '/images/lone-tree-600x800.jpg',
    thumbnailSrc: '/images/thumbnails/lone-tree-600x800.jpg',
    alt: 'Lone tree in field (600×800)',
    width: 600,
    height: 800,
  },
  {
    id: 5,
    src: '/images/mountain-sunset-800x600.jpg',
    thumbnailSrc: '/images/thumbnails/mountain-sunset-800x600.jpg',
    alt: 'Mountain landscape at sunset (800×600)',
    width: 800,
    height: 600,
  },
  {
    id: 6,
    src: '/images/ocean-waves-900x1200.jpg',
    thumbnailSrc: '/images/thumbnails/ocean-waves-900x1200.jpg',
    alt: 'Ocean waves on beach (900×1200)',
    width: 900,
    height: 1200,
  },
  {
    id: 7,
    src: '/images/sunflower-field-1000x600.jpg',
    thumbnailSrc: '/images/thumbnails/sunflower-field-1000x600.jpg',
    alt: 'Sunflower field in summer (1000×600)',
    width: 1000,
    height: 600,
  },
  
  // Large images
  {
    id: 8,
    src: '/images/forest-path-1200x800.jpg',
    thumbnailSrc: '/images/thumbnails/forest-path-1200x800.jpg',
    alt: 'Forest path in autumn (1200×800)',
    width: 1200,
    height: 800,
  },
  {
    id: 9,
    src: '/images/mountain-river-1400x900.jpg',
    thumbnailSrc: '/images/thumbnails/mountain-river-1400x900.jpg',
    alt: 'Mountain river rapids (1400×900)',
    width: 1400,
    height: 900,
  },
  {
    id: 10,
    src: '/images/autumn-leaves-1500x1000.jpg',
    thumbnailSrc: '/images/thumbnails/autumn-leaves-1500x1000.jpg',
    alt: 'Colorful autumn foliage (1500×1000)',
    width: 1500,
    height: 1000,
  },
  
  // Extra large images  
  {
    id: 11,
    src: '/images/space-nebula-2000x1500.jpg',
    thumbnailSrc: '/images/thumbnails/space-nebula-2000x1500.jpg',
    alt: 'Space nebula - stellar formation (2000×1500)',
    width: 2000,
    height: 1500,
  },
  {
    id: 12,
    src: '/images/city-skyline-2400x1600.jpg',
    thumbnailSrc: '/images/thumbnails/city-skyline-2400x1600.jpg',
    alt: 'City skyline at night (2400×1600)',
    width: 2400,
    height: 1600,
  },
  {
    id: 13,
    src: '/images/deep-space-3000x2000.jpg',
    thumbnailSrc: '/images/thumbnails/deep-space-3000x2000.jpg',
    alt: 'Deep space field - distant galaxies (3000×2000)',
    width: 3000,
    height: 2000,
  },
  {
    id: 14,
    src: '/images/cosmic-vista-4000x3000.jpg',
    thumbnailSrc: '/images/thumbnails/cosmic-vista-4000x3000.jpg',
    alt: 'Cosmic vista - ultra high resolution (4000×3000)',
    width: 4000,
    height: 3000,
  },
  
  // JWST Ultra High Resolution (8K+)
  {
    id: 15,
    src: '/images/jwst-nebula-8000x6000.jpg',
    thumbnailSrc: '/images/thumbnails/jwst-nebula-8000x6000.jpg',
    alt: 'JWST Nebula - Ultra high resolution 8K (8000×6000)',
    width: 8000,
    height: 6000,
  },
  
  // Demo URL-based images (keep 1-2 as examples)
  {
    id: 16,
    src: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=1600&h=1200&fit=crop&auto=format',
    thumbnailSrc: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=400&h=300&fit=crop&auto=format&q=80&fm=jpg',
    alt: 'URL Demo - Ancient castle ruins (1600×1200)',
    width: 1600,
    height: 1200,
  },
  {
    id: 17,
    src: '/images/ancient-castle-1000x1400.jpg',
    thumbnailSrc: '/images/thumbnails/ancient-castle-1000x1400.jpg',
    alt: 'Local Demo - Ancient castle ruins (1000×1400)',
    width: 1000,
    height: 1400,
  }
];

interface Photo {
  id: number;
  src: string;
  thumbnailSrc: string;
  alt: string;
  width: number;
  height: number;
}

interface PhotoViewerState {
  isOpen: boolean;
  currentIndex: number;
  scale: number;
  originalFitScale: number; // Store the original fit scale when photo is opened
  translateX: number;
  translateY: number;
  isDragging: boolean;
  showControls: boolean;
}

const PhotoViewerTab: React.FC = () => {
  const [galleryLayout, setGalleryLayout] = useState<'grid' | 'random'>('grid');
  const [viewerState, setViewerState] = useState<PhotoViewerState>({
    isOpen: false,
    currentIndex: 0,
    scale: 1,
    originalFitScale: 1,
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
  
  // Generate tessellated layout that perfectly fills the container
  const generateRandomThumbnailSizes = useCallback(() => {
    const totalPhotos = STOCK_PHOTOS.length;
    const gridWidth = 12; // Fewer columns for larger shapes
    const gridHeight = 12; // Fewer rows for larger shapes
    
    // Create a grid to track occupied cells
    const grid = Array(gridHeight).fill(null).map(() => Array(gridWidth).fill(false));
    
    // Pre-defined shapes optimized for better space filling with larger sizes
    const shapes = [
      { cols: 4, rows: 3, name: 'large_rect', priority: 1 },      // 4×3 large rectangle
      { cols: 3, rows: 4, name: 'large_portrait', priority: 1 },  // 3×4 large portrait
      { cols: 3, rows: 3, name: 'large_square', priority: 2 },    // 3×3 large square
      { cols: 5, rows: 2, name: 'wide_banner', priority: 2 },     // 5×2 wide banner
      { cols: 2, rows: 5, name: 'tall_banner', priority: 2 },     // 2×5 tall banner
      { cols: 4, rows: 2, name: 'medium_wide', priority: 3 },     // 4×2 medium wide
      { cols: 2, rows: 4, name: 'medium_tall', priority: 3 },     // 2×4 medium tall
      { cols: 6, rows: 2, name: 'extra_wide', priority: 1 },      // 6×2 extra wide
      { cols: 2, rows: 6, name: 'extra_tall', priority: 1 },      // 2×6 extra tall
      { cols: 3, rows: 2, name: 'small_wide', priority: 4 },      // 3×2 small wide
      { cols: 2, rows: 3, name: 'small_tall', priority: 4 },      // 2×3 small tall
      { cols: 2, rows: 2, name: 'small_square', priority: 5 },    // 2×2 small square
    ];
    
    const layout = [];
    let totalUsedCells = 0;
    const totalCells = gridWidth * gridHeight;
    
    // Calculate target cells per photo for better distribution
    const targetCellsPerPhoto = Math.max(6, Math.floor(totalCells / totalPhotos));
    
    // Place each photo strategically
    for (let i = 0; i < totalPhotos; i++) {
      let placed = false;
      let bestShape = null;
      let bestPosition = null;
      let bestScore = -1;
      
      // Shuffle shapes to add variety while respecting priorities
      const availableShapes = shapes.filter(shape => {
        const area = shape.cols * shape.rows;
        const remainingPhotos = totalPhotos - i;
        const remainingSpace = totalCells - totalUsedCells;
        const averageSpacePerPhoto = remainingSpace / remainingPhotos;
        
        // Allow larger shapes for early placements, smaller for later
        return area <= Math.max(targetCellsPerPhoto, averageSpacePerPhoto * 1.5);
      });
      
      if (availableShapes.length === 0) {
        availableShapes.push({ cols: 2, rows: 2, name: 'fallback_small', priority: 5 });
      }
      
      // Try each available shape
      for (const shape of availableShapes) {
        if (shape.cols > gridWidth || shape.rows > gridHeight) continue;
        
        // Generate positions with preference for filling edges first
        const positions = [];
        
        // Prioritize corners
        positions.push([0, 0], [0, gridWidth - shape.cols], 
                      [gridHeight - shape.rows, 0], [gridHeight - shape.rows, gridWidth - shape.cols]);
        
        // Add edge positions
        for (let row = 1; row < gridHeight - shape.rows; row++) {
          positions.push([row, 0], [row, gridWidth - shape.cols]);
        }
        for (let col = 1; col < gridWidth - shape.cols; col++) {
          positions.push([0, col], [gridHeight - shape.rows, col]);
        }
        
        // Add interior positions
        for (let row = 1; row <= gridHeight - shape.rows; row++) {
          for (let col = 1; col <= gridWidth - shape.cols; col++) {
            positions.push([row, col]);
          }
        }
        
        // Test each position
        for (const [row, col] of positions) {
          if (row < 0 || col < 0 || row + shape.rows > gridHeight || col + shape.cols > gridWidth) continue;
          
          // Check if position is free
          let canPlace = true;
          for (let r = row; r < row + shape.rows && canPlace; r++) {
            for (let c = col; c < col + shape.cols && canPlace; c++) {
              if (grid[r] && grid[r][c]) {
                canPlace = false;
              }
            }
          }
          
          if (canPlace) {
            // Calculate placement score
            let score = 100 - (shape.priority * 10); // Lower priority number = higher score
            
            // Bonus for corner/edge placement
            if ((row === 0 || row === gridHeight - shape.rows) && 
                (col === 0 || col === gridWidth - shape.cols)) {
              score += 50; // Corner bonus
            } else if (row === 0 || row === gridHeight - shape.rows || 
                      col === 0 || col === gridWidth - shape.cols) {
              score += 30; // Edge bonus
            }
            
            // Bonus for adjacent placement (tessellation)
            let adjacentCount = 0;
            for (let r = Math.max(0, row - 1); r <= Math.min(gridHeight - 1, row + shape.rows); r++) {
              for (let c = Math.max(0, col - 1); c <= Math.min(gridWidth - 1, col + shape.cols); c++) {
                if ((r < row || r >= row + shape.rows || c < col || c >= col + shape.cols) && 
                    grid[r] && grid[r][c]) {
                  adjacentCount++;
                }
              }
            }
            score += adjacentCount * 5;
            
            // Prefer larger shapes early in placement
            score += shape.cols * shape.rows * Math.max(1, (totalPhotos - i) / totalPhotos);
            
            if (score > bestScore) {
              bestScore = score;
              bestShape = shape;
              bestPosition = [row, col];
            }
          }
        }
      }
      
      // Place the best shape found
      if (bestShape && bestPosition) {
        const [row, col] = bestPosition;
        
        // Mark cells as occupied
        for (let r = row; r < row + bestShape.rows; r++) {
          for (let c = col; c < col + bestShape.cols; c++) {
            if (grid[r]) grid[r][c] = true;
          }
        }
        
        layout.push({
          ...bestShape,
          startCol: col,
          startRow: row,
        });
        
        totalUsedCells += bestShape.cols * bestShape.rows;
        placed = true;
      }
      
      // Fallback: find any available space
      if (!placed) {
        outerLoop: for (let size = 4; size >= 1; size--) {
          for (let row = 0; row <= gridHeight - size; row++) {
            for (let col = 0; col <= gridWidth - size; col++) {
              let canPlace = true;
              for (let r = row; r < row + size && canPlace; r++) {
                for (let c = col; c < col + size && canPlace; c++) {
                  if (grid[r] && grid[r][c]) {
                    canPlace = false;
                  }
                }
              }
              
              if (canPlace) {
                // Mark cells as occupied
                for (let r = row; r < row + size; r++) {
                  for (let c = col; c < col + size; c++) {
                    if (grid[r]) grid[r][c] = true;
                  }
                }
                
                layout.push({
                  cols: size,
                  rows: size,
                  name: 'fallback_square',
                  startCol: col,
                  startRow: row,
                });
                
                totalUsedCells += size * size;
                placed = true;
                break outerLoop;
              }
            }
          }
        }
      }
      
      // Last resort: single cell
      if (!placed) {
        for (let row = 0; row < gridHeight; row++) {
          for (let col = 0; col < gridWidth; col++) {
            if (!grid[row] || !grid[row][col]) {
              if (grid[row]) grid[row][col] = true;
              layout.push({
                cols: 1,
                rows: 1,
                name: 'single_cell',
                startCol: col,
                startRow: row,
              });
              totalUsedCells += 1;
              break;
            }
          }
          if (placed) break;
        }
      }
    }
    
    // Log tessellation efficiency
    const fillPercentage = ((totalUsedCells / totalCells) * 100).toFixed(1);
    console.log(`Tessellation efficiency: ${fillPercentage}% (${totalUsedCells}/${totalCells} cells used) - Grid: ${gridWidth}x${gridHeight}`);
    
    return layout;
  }, []);
  
  const [randomLayout] = useState(generateRandomThumbnailSizes);

  // Get style for random thumbnail based on its layout position
  const getRandomThumbnailStyle = (index: number) => {
    const layout = randomLayout[index];
    if (!layout) return { 
      gridColumn: '1 / 4', 
      gridRow: '1 / 4',
      width: '100%',
      height: '100%'
    };
    
    return {
      gridColumn: `${layout.startCol + 1} / ${layout.startCol + 1 + layout.cols}`,
      gridRow: `${layout.startRow + 1} / ${layout.startRow + 1 + layout.rows}`,
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const,
    };
  };
  
  // Touch gesture state for pinch-to-zoom
  const touchStateRef = useRef<{
    initialDistance: number;
    initialScale: number;
    touches: React.Touch[];
  } | null>(null);

  const { addMessage } = useMessageLogger();
  const sharedStyles = sharedLayoutStyles();
  const styles = photoViewerStyles();
  const strings = photoViewerStrings;

  // Helper functions
  const getCurrentPhoto = () => STOCK_PHOTOS[viewerState.currentIndex];

  const getTouchDistance = (touch1: React.Touch, touch2: React.Touch) => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

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
    
    // For small images, the minimum zoom should be their natural size (1.0), not the fit scale
    // For large images, the minimum zoom is the fit scale
    const isNaturallySmallerThanViewport = (photo.width || 0) < containerWidth && (photo.height || 0) < containerHeight;
    const minZoomScale = isNaturallySmallerThanViewport ? 1.0 : fitScale;
    
    // For small images, open at natural size (1.0); for large images, open at fit scale
    const initialScale = isNaturallySmallerThanViewport ? 1.0 : fitScale;
    
    // Log fit scale for debugging
    console.log(`${isNaturallySmallerThanViewport ? 'Small' : 'Large'} image: ${photo.width}x${photo.height}, Container: ${containerWidth}x${containerHeight}, Initial scale: ${initialScale.toFixed(3)}, Min zoom: ${minZoomScale.toFixed(3)}`);
    
    setViewerState({
      isOpen: true,
      currentIndex: index,
      scale: initialScale, // Use natural size for small images, fit scale for large images
      originalFitScale: minZoomScale, // Store the minimum zoom scale (natural size for small images)
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
      
      // For small images, the minimum zoom should be their natural size (1.0), not the fit scale
      const isNaturallySmallerThanViewport = (newPhoto.width || 0) < containerWidth && (newPhoto.height || 0) < containerHeight;
      const minZoomScale = isNaturallySmallerThanViewport ? 1.0 : newFitScale;
      
      // For small images, open at natural size (1.0); for large images, open at fit scale
      const initialScale = isNaturallySmallerThanViewport ? 1.0 : newFitScale;
      
      return {
        ...prev,
        currentIndex: newIndex,
        scale: initialScale, // Use natural size for small images, fit scale for large images
        originalFitScale: minZoomScale, // Update the minimum zoom scale for the new photo
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
    setViewerState(prev => {
      const newScale = prev.scale / 1.5;
      
      // Use the original fit scale stored when the photo was opened
      const targetScale = newScale <= prev.originalFitScale ? prev.originalFitScale : newScale;
      
      return {
        ...prev,
        scale: targetScale,
        // Reset translation when we reach exact fit scale
        translateX: targetScale === prev.originalFitScale ? 0 : prev.translateX,
        translateY: targetScale === prev.originalFitScale ? 0 : prev.translateY,
      };
    });
    addMessage('Zoomed out', MessageType.Info);
  }, [addMessage]);

  const resetZoom = useCallback(() => {
    setViewerState(prev => ({
      ...prev,
      scale: prev.originalFitScale, // Use the stored original fit scale
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
    // Only allow dragging when zoomed beyond original fit scale
    if (viewerState.scale <= viewerState.originalFitScale) return;
    
    e.preventDefault();
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    setViewerState(prev => ({ ...prev, isDragging: true }));
  }, [viewerState.scale, viewerState.originalFitScale]);

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
    // Prevent default browser zoom behavior
    e.preventDefault();
    e.stopPropagation();
    
    const delta = e.deltaY;
    const zoomFactor = 1.1;
    
    if (delta < 0) {
      // Zoom in
      setViewerState(prev => ({
        ...prev,
        scale: Math.min(prev.scale * zoomFactor, 5),
      }));
    } else {
      // Zoom out
      setViewerState(prev => {
        const newScale = prev.scale / zoomFactor;
        
        // Use the stored original fit scale instead of recalculating
        // Use 2% tolerance to handle floating point precision issues
        const targetScale = newScale <= prev.originalFitScale * 1.02 ? prev.originalFitScale : newScale;
        
        return {
          ...prev,
          scale: targetScale,
          // Reset translation if we reach exact fit scale
          translateX: targetScale === prev.originalFitScale ? 0 : prev.translateX,
          translateY: targetScale === prev.originalFitScale ? 0 : prev.translateY,
        };
      });
    }
  }, []);

  // Touch event handlers for pinch-to-zoom using React events
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    console.log('React touch start:', e.touches.length, 'touches');
    
    if (e.touches.length === 2) {
      // Two fingers - start pinch gesture
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = getTouchDistance(touch1, touch2);
      
      touchStateRef.current = {
        initialDistance: distance,
        initialScale: viewerState.scale,
        touches: [touch1, touch2],
      };
      
      console.log('React pinch start - distance:', distance, 'scale:', viewerState.scale);
    }
  }, [viewerState.scale]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2 && touchStateRef.current) {
      // Two fingers - handle pinch gesture
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const currentDistance = getTouchDistance(touch1, touch2);
      
      if (touchStateRef.current.initialDistance > 0) {
        const scaleChange = currentDistance / touchStateRef.current.initialDistance;
        const newScale = touchStateRef.current.initialScale * scaleChange;
        
        console.log('React pinch move - distance:', currentDistance, 'scale change:', scaleChange, 'new scale:', newScale);
        
        setViewerState(prev => {
          // Use the stored original fit scale instead of recalculating
          // Clamp scale with minimum at originalFitScale, maximum at 5
          // If very close to originalFitScale, snap to exact originalFitScale for gestures
          // Use 2% tolerance to handle floating point precision issues
          let clampedScale = Math.max(prev.originalFitScale, Math.min(5, newScale));
          if (clampedScale <= prev.originalFitScale * 1.02) {
            clampedScale = prev.originalFitScale;
          }
          
          return {
            ...prev,
            scale: clampedScale,
            // Reset translation if we reach exact fit scale
            translateX: clampedScale === prev.originalFitScale ? 0 : prev.translateX,
            translateY: clampedScale === prev.originalFitScale ? 0 : prev.translateY,
          };
        });
      }
    }
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    console.log('React touch end:', e.touches.length, 'touches remaining');
    
    if (e.touches.length < 2) {
      // End pinch gesture
      touchStateRef.current = null;
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
      document.body.style.touchAction = 'none'; // Prevent touch actions on body
      document.body.style.userSelect = 'none'; // Prevent text selection
      document.body.style.setProperty('-webkit-user-select', 'none'); // Safari
      document.body.style.setProperty('-webkit-touch-callout', 'none'); // Safari touch callout
      document.body.style.setProperty('-webkit-tap-highlight-color', 'transparent'); // Safari tap highlight
      
      // Add CSS to prevent zoom via style injection
      const style = document.createElement('style');
      style.id = 'photo-viewer-zoom-prevention';
      style.textContent = `
        html, body {
          touch-action: none !important;
          overscroll-behavior: none !important;
          -webkit-overflow-scrolling: auto !important;
          user-select: none !important;
          -webkit-user-select: none !important;
          -webkit-touch-callout: none !important;
          -webkit-tap-highlight-color: transparent !important;
        }
        /* Allow touch actions on our viewer container so our custom handlers work */
        [data-photo-viewer="true"] {
          touch-action: auto !important;
        }
      `;
      document.head.appendChild(style);
      
      // Focus the viewer container for accessibility
      setTimeout(() => viewerRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.body.style.userSelect = '';
      document.body.style.removeProperty('-webkit-user-select');
      document.body.style.removeProperty('-webkit-touch-callout');
      document.body.style.removeProperty('-webkit-tap-highlight-color');
      
      // Remove the injected style
      const existingStyle = document.getElementById('photo-viewer-zoom-prevention');
      if (existingStyle) {
        existingStyle.remove();
      }
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.body.style.userSelect = '';
      document.body.style.removeProperty('-webkit-user-select');
      document.body.style.removeProperty('-webkit-touch-callout');
      document.body.style.removeProperty('-webkit-tap-highlight-color');
      
      // Remove the injected style
      const existingStyle = document.getElementById('photo-viewer-zoom-prevention');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [viewerState.isOpen]);

  // Prevent browser zoom when modal is open
  useEffect(() => {
    if (!viewerState.isOpen) return;

    // Update viewport meta tag to disable user scaling
    const viewportMeta = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
    const originalContent = viewportMeta?.content || '';
    if (viewportMeta) {
      viewportMeta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover';
    }

    // Add native event listeners to the viewer container for more aggressive prevention
    const viewerElement = viewerRef.current;
    
    // Remove the aggressive prevention - we'll handle it differently
    const preventAllTouch = (e: TouchEvent) => {
      // Only prevent browser zoom behavior, not our custom handling
      if (e.touches.length > 1) {
        console.log('Preventing browser zoom on viewer element');
        // Prevent browser zoom but don't stop our custom logic
        e.preventDefault();
      }
    };

    const preventAllGesture = (e: Event) => {
      console.log('Preventing native gesture event:', e.type);
      e.preventDefault();
    };

    const preventZoomWheel = (e: WheelEvent) => {
      console.log('Preventing wheel zoom on viewer');
      e.preventDefault();
    };

    if (viewerElement) {
      // Add native event listeners directly to the viewer element
      viewerElement.addEventListener('touchstart', preventAllTouch, { passive: false });
      viewerElement.addEventListener('touchmove', preventAllTouch, { passive: false });
      viewerElement.addEventListener('touchend', preventAllTouch, { passive: false });
      viewerElement.addEventListener('wheel', preventZoomWheel, { passive: false });
      viewerElement.addEventListener('gesturestart', preventAllGesture, { passive: false });
      viewerElement.addEventListener('gesturechange', preventAllGesture, { passive: false });
      viewerElement.addEventListener('gestureend', preventAllGesture, { passive: false });
    }

    const preventZoom = (e: TouchEvent) => {
      // Only prevent if the touch is NOT on our viewer container
      if (e.touches.length > 1 && viewerElement && !viewerElement.contains(e.target as Node)) {
        console.log('Preventing multi-touch event outside viewer:', e.type);
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    };

    const preventWheel = (e: WheelEvent) => {
      // Only prevent zoom wheel events outside our viewer
      if ((e.ctrlKey || e.metaKey) && viewerElement && !viewerElement.contains(e.target as Node)) {
        console.log('Preventing zoom wheel event outside viewer');
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    };

    const preventGestureStart = (e: Event) => {
      // Only prevent gestures outside our viewer
      if (viewerElement && !viewerElement.contains(e.target as Node)) {
        console.log('Preventing gesture start outside viewer');
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    };

    const preventGestureChange = (e: Event) => {
      // Only prevent gestures outside our viewer
      if (viewerElement && !viewerElement.contains(e.target as Node)) {
        console.log('Preventing gesture change outside viewer');
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    };

    const preventGestureEnd = (e: Event) => {
      // Only prevent gestures outside our viewer
      if (viewerElement && !viewerElement.contains(e.target as Node)) {
        console.log('Preventing gesture end outside viewer');
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    };

    // Add event listeners but only prevent events outside our viewer
    document.addEventListener('touchstart', preventZoom, { passive: false, capture: true });
    document.addEventListener('touchmove', preventZoom, { passive: false, capture: true });
    document.addEventListener('touchend', preventZoom, { passive: false, capture: true });
    document.addEventListener('wheel', preventWheel, { passive: false, capture: true });
    
    // Add gesture event listeners for Safari/Webkit browsers
    document.addEventListener('gesturestart', preventGestureStart, { passive: false, capture: true });
    document.addEventListener('gesturechange', preventGestureChange, { passive: false, capture: true });
    document.addEventListener('gestureend', preventGestureEnd, { passive: false, capture: true });

    // Also disable touch actions via CSS on html/body but not on viewer
    document.documentElement.style.touchAction = 'none';
    document.body.style.touchAction = 'none';

    return () => {
      // Restore original viewport meta tag
      if (viewportMeta && originalContent) {
        viewportMeta.content = originalContent;
      }
      
      // Restore touch actions
      document.documentElement.style.touchAction = '';
      document.body.style.touchAction = '';

      // Remove native event listeners from viewer element
      if (viewerElement) {
        viewerElement.removeEventListener('touchstart', preventAllTouch);
        viewerElement.removeEventListener('touchmove', preventAllTouch);
        viewerElement.removeEventListener('touchend', preventAllTouch);
        viewerElement.removeEventListener('wheel', preventZoomWheel);
        viewerElement.removeEventListener('gesturestart', preventAllGesture);
        viewerElement.removeEventListener('gesturechange', preventAllGesture);
        viewerElement.removeEventListener('gestureend', preventAllGesture);
      }
      
      // Cleanup document event listeners
      document.removeEventListener('touchstart', preventZoom, { capture: true } as any);
      document.removeEventListener('touchmove', preventZoom, { capture: true } as any);
      document.removeEventListener('touchend', preventZoom, { capture: true } as any);
      document.removeEventListener('wheel', preventWheel, { capture: true } as any);
      document.removeEventListener('gesturestart', preventGestureStart, { capture: true } as any);
      document.removeEventListener('gesturechange', preventGestureChange, { capture: true } as any);
      document.removeEventListener('gestureend', preventGestureEnd, { capture: true } as any);
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
  
  // Check if image at natural size (1:1) would be smaller than viewport
  // This is when we want to show the blurred background
  const isNaturallySmallerThanViewport = (photo.width || 0) < containerWidth && (photo.height || 0) < containerHeight;
  
  const imageStyle = {
    transform: imageTransform,
    // For large images at fit scale, don't constrain size - let them fill
    // For small images at fit scale, constrain to prevent growing beyond natural size  
    // For zoomed images (any size), remove constraints to allow pan/zoom
    maxWidth: (isZoomed || isLargeImage) ? 'none' : '100%',
    maxHeight: (isZoomed || isLargeImage) ? 'none' : '100%',
    cursor: isZoomed ? 'grab' : 'default',
  };

  return (
    <div className={styles.tabContainer}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <div className={styles.headerTop}>
          <div>
            <Title3 className={sharedStyles.h3Heading}>{strings.title}</Title3>
            <Caption1>{strings.description}</Caption1>
          </div>
          <div className={styles.layoutToggle}>
            <Button
              appearance={galleryLayout === 'grid' ? 'primary' : 'secondary'}
              icon={<GridRegular />}
              onClick={() => setGalleryLayout('grid')}
              size="small"
              aria-label="Grid layout"
            >
              Grid
            </Button>
            <Button
              appearance={galleryLayout === 'random' ? 'primary' : 'secondary'}
              icon={<AppsRegular />}
              onClick={() => setGalleryLayout('random')}
              size="small"
              aria-label="Random size layout"
            >
              Random
            </Button>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className={styles.instructionsSection}>
        <Text>{strings.photoInstructions}</Text>
        <Text size={300}>{strings.viewerInstructions}</Text>
      </div>

      {/* Photo Grid */}
      <div 
        className={galleryLayout === 'grid' ? styles.photoGrid : styles.photoGridRandom}
        role="grid" 
        aria-label={strings.gridViewLabel}
      >
        {STOCK_PHOTOS.map((photo, index) => {
          const randomStyle = galleryLayout === 'random' ? getRandomThumbnailStyle(index) : {};
          
          return (
            <button
              key={photo.id}
              ref={el => thumbnailRefs.current[index] = el}
              className={galleryLayout === 'grid' ? styles.photoThumbnail : styles.photoThumbnailRandom}
              onClick={() => openViewer(index)}
              role="gridcell"
              aria-label={`${formatString(strings.photoTitle, (index + 1).toString())}: ${photo.alt}`}
              tabIndex={0}
              style={galleryLayout === 'random' ? randomStyle : undefined}
            >
              <img 
                src={photo.thumbnailSrc} 
                alt=""
                role="presentation"
                className={styles.thumbnailImage}
                loading="lazy"
              />
              <div className={mergeClasses(styles.thumbnailOverlay, 'thumbnailOverlay')} />
            </button>
          );
        })}
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
            data-photo-viewer="true"
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
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

            {/* Background blur for small images */}
            {isNaturallySmallerThanViewport && (
              <div
                className={styles.blurredBackground}
                style={{
                  backgroundImage: `url(${getCurrentPhoto().src})`,
                }}
              />
            )}

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
                disabled={viewerState.scale <= viewerState.originalFitScale}
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
