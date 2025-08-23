import { useEffect, useRef } from 'react';

/**
 * FluentUI-style hook for managing document body styles
 * Automatically restores original styles on cleanup
 */
export function useBodyStyle(styles: Record<string, string>, enabled: boolean = true): void {
  const originalStylesRef = useRef<Record<string, string>>({});

  useEffect(() => {
    if (!enabled) return;

    // Store original styles
    Object.keys(styles).forEach(property => {
      originalStylesRef.current[property] = document.body.style.getPropertyValue(property);
    });

    // Apply new styles
    Object.entries(styles).forEach(([property, value]) => {
      document.body.style.setProperty(property, value);
    });

    // Cleanup: restore original styles
    return () => {
      Object.keys(styles).forEach(property => {
        const originalValue = originalStylesRef.current[property];
        if (originalValue) {
          document.body.style.setProperty(property, originalValue);
        } else {
          document.body.style.removeProperty(property);
        }
      });
    };
  }, [enabled]); // Note: deliberately not including styles to avoid re-applying on every change
}

/**
 * Hook for disabling scroll and touch interactions
 * Common pattern for modals and overlays
 */
export function useDisableScroll(disabled: boolean = true): void {
  useBodyStyle(
    {
      overflow: 'hidden',
      touchAction: 'none',
      userSelect: 'none',
      '-webkit-user-select': 'none',
      '-webkit-touch-callout': 'none',
      '-webkit-tap-highlight-color': 'transparent',
    },
    disabled
  );
}

/**
 * Hook for managing theme-based body background
 * Automatically updates body background color
 */
export function useThemeBodyBackground(backgroundColor: string): void {
  useBodyStyle({ backgroundColor }, true);
}
