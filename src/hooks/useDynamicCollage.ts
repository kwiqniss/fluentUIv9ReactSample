import { useMemo } from 'react';

interface CollageItem {
  gridColumn: string;
  gridRow: string;
  zIndex: number;
}

interface CollageConfig {
  gridColumns: number;
  gridRows: number;
  items: CollageItem[];
}

/**
 * Dynamic collage layout hook that adapts to any number of photos
 * Creates a responsive tessellated grid that fills the available space efficiently
 */
export const useDynamicCollage = (photoCount: number): CollageConfig => {
  return useMemo(() => {
    console.log(`🎯 Generating dynamic collage for ${photoCount} photos`);
    
    // Calculate optimal grid dimensions based on photo count
    const getOptimalGridSize = (count: number): { cols: number; rows: number } => {
      if (count <= 4) return { cols: 4, rows: 2 };
      if (count <= 9) return { cols: 6, rows: 3 };
      if (count <= 16) return { cols: 8, rows: 4 };
      if (count <= 25) return { cols: 10, rows: 5 };
      if (count <= 36) return { cols: 12, rows: 6 };
      
      // For larger counts, calculate dynamically
      const aspectRatio = 2.5; // Prefer wider grids
      const cols = Math.ceil(Math.sqrt(count * aspectRatio));
      const rows = Math.ceil(count / cols);
      return { cols: Math.min(cols, 20), rows: Math.min(rows, 12) };
    };

    const { cols: gridColumns, rows: gridRows } = getOptimalGridSize(photoCount);
    
    // Define shape templates that scale with grid size
    const getShapeTemplates = (gridCols: number, gridRows: number) => {
      const maxCols = Math.min(4, Math.floor(gridCols / 3));
      const maxRows = Math.min(4, Math.floor(gridRows / 3));
      
      return [
        // Large focal shapes (priority for fewer photos)
        { cols: maxCols, rows: maxRows, weight: photoCount <= 12 ? 3 : 1 },
        { cols: Math.max(2, maxCols - 1), rows: Math.max(2, maxRows - 1), weight: 2 },
        { cols: maxCols, rows: Math.max(1, maxRows - 1), weight: 2 },
        { cols: Math.max(1, maxCols - 1), rows: maxRows, weight: 2 },
        
        // Medium variety shapes
        { cols: Math.max(2, Math.floor(maxCols / 2)), rows: Math.max(2, Math.floor(maxRows / 2)), weight: 3 },
        { cols: Math.max(3, Math.floor(maxCols * 0.75)), rows: Math.max(1, Math.floor(maxRows / 2)), weight: 3 },
        { cols: Math.max(1, Math.floor(maxCols / 2)), rows: Math.max(3, Math.floor(maxRows * 0.75)), weight: 3 },
        
        // Small connector shapes
        { cols: 2, rows: 1, weight: 2 },
        { cols: 1, rows: 2, weight: 2 },
        { cols: 2, rows: 2, weight: 3 },
        { cols: 3, rows: 1, weight: photoCount > 20 ? 3 : 1 },
        { cols: 1, rows: 3, weight: photoCount > 20 ? 3 : 1 },
        
        // Tiny fillers (more common for large collections)
        { cols: 1, rows: 1, weight: photoCount > 15 ? 4 : 1 },
      ].filter(shape => shape.cols <= gridCols && shape.rows <= gridRows);
    };

    // Create placement grid
    const grid = Array(gridRows).fill(null).map(() => Array(gridColumns).fill(false));
    const items: CollageItem[] = [];
    const shapes = getShapeTemplates(gridColumns, gridRows);

    // Helper function to check if a shape can be placed at a position
    const canPlace = (row: number, col: number, shape: { cols: number; rows: number }): boolean => {
      if (row + shape.rows > gridRows || col + shape.cols > gridColumns) return false;
      
      for (let r = row; r < row + shape.rows; r++) {
        for (let c = col; c < col + shape.cols; c++) {
          if (grid[r][c]) return false;
        }
      }
      return true;
    };

    // Helper function to place a shape and mark grid cells
    const placeShape = (row: number, col: number, shape: { cols: number; rows: number }): CollageItem => {
      for (let r = row; r < row + shape.rows; r++) {
        for (let c = col; c < col + shape.cols; c++) {
          grid[r][c] = true;
        }
      }
      
      return {
        gridColumn: `${col + 1} / ${col + shape.cols + 1}`,
        gridRow: `${row + 1} / ${row + shape.rows + 1}`,
        zIndex: Math.max(1, 5 - Math.floor((shape.cols + shape.rows) / 2)), // Larger items have lower z-index
      };
    };

    // Place photos using weighted random selection
    for (let photoIndex = 0; photoIndex < photoCount; photoIndex++) {
      let placed = false;
      let attempts = 0;
      const maxAttempts = gridRows * gridColumns;

      while (!placed && attempts < maxAttempts) {
        // Select shape based on weights and placement progress
        const placementProgress = photoIndex / photoCount;
        const availableShapes = shapes.filter(shape => {
          const area = shape.cols * shape.rows;
          const remainingPhotos = photoCount - photoIndex;
          
          // Early placement: prefer larger shapes
          // Later placement: prefer smaller shapes
          if (placementProgress < 0.3) {
            return area >= 4; // Larger shapes early
          } else if (placementProgress < 0.7) {
            return area >= 2 && area <= 9; // Medium shapes in middle
          } else {
            return area <= 6; // Smaller shapes at end
          }
        });

        if (availableShapes.length === 0) break;

        // Weighted random selection
        const totalWeight = availableShapes.reduce((sum, shape) => sum + shape.weight, 0);
        let randomWeight = Math.random() * totalWeight;
        
        let selectedShape = availableShapes[0];
        for (const shape of availableShapes) {
          randomWeight -= shape.weight;
          if (randomWeight <= 0) {
            selectedShape = shape;
            break;
          }
        }

        // Try to place the selected shape
        const positions: Array<{ row: number; col: number; score: number }> = [];
        
        for (let row = 0; row < gridRows; row++) {
          for (let col = 0; col < gridColumns; col++) {
            if (canPlace(row, col, selectedShape)) {
              // Score position based on how well it fills space
              const centerRow = gridRows / 2;
              const centerCol = gridColumns / 2;
              const distanceFromCenter = Math.sqrt(
                Math.pow(row + selectedShape.rows / 2 - centerRow, 2) +
                Math.pow(col + selectedShape.cols / 2 - centerCol, 2)
              );
              
              // Prefer positions that are not too far from center but add some randomness
              const score = Math.random() * 10 + (1 / (distanceFromCenter + 1)) * 5;
              positions.push({ row, col, score });
            }
          }
        }

        if (positions.length > 0) {
          // Sort by score and pick from top candidates
          positions.sort((a, b) => b.score - a.score);
          const topCandidates = positions.slice(0, Math.max(1, Math.floor(positions.length * 0.3)));
          const chosenPosition = topCandidates[Math.floor(Math.random() * topCandidates.length)];
          
          const item = placeShape(chosenPosition.row, chosenPosition.col, selectedShape);
          items.push(item);
          placed = true;
        }

        attempts++;
      }

      // Fallback: place in first available 1x1 spot
      if (!placed) {
        for (let row = 0; row < gridRows && !placed; row++) {
          for (let col = 0; col < gridColumns && !placed; col++) {
            if (!grid[row][col]) {
              const item = placeShape(row, col, { cols: 1, rows: 1 });
              items.push(item);
              placed = true;
            }
          }
        }
      }
    }

    const result = {
      gridColumns,
      gridRows,
      items,
    };
    
    console.log(`✅ Generated dynamic collage: ${gridColumns}×${gridRows} grid with ${items.length} items`);
    console.log('Grid layout items:', items);
    
    return result;
  }, [photoCount]);
};
