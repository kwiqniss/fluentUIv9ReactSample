import { useEffect, useRef } from 'react';

/**
 * FluentUI-style event listener hook
 * Automatically manages addEventListener/removeEventListener lifecycle
 */
export function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element?: Element | Window,
  options?: boolean | AddEventListenerOptions
): void;
export function useEventListener<K extends keyof DocumentEventMap>(
  eventName: K,
  handler: (event: DocumentEventMap[K]) => void,
  element: Document,
  options?: boolean | AddEventListenerOptions
): void;
export function useEventListener<K extends keyof HTMLElementEventMap>(
  eventName: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  element: HTMLElement,
  options?: boolean | AddEventListenerOptions
): void;
export function useEventListener(
  eventName: string,
  handler: (event: Event) => void,
  element: Element | Window | Document = window,
  options?: boolean | AddEventListenerOptions
): void {
  // Create a ref that stores handler
  const savedHandler = useRef<(event: Event) => void>();

  // Update ref.current value if handler changes
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    // Make sure element supports addEventListener
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    // Create event listener that calls handler function stored in ref
    const eventListener = (event: Event) => savedHandler.current?.(event);

    // Add event listener
    element.addEventListener(eventName, eventListener, options);

    // Remove event listener on cleanup
    return () => {
      element.removeEventListener(eventName, eventListener, options);
    };
  }, [eventName, element, options]);
}

/**
 * Hook for window resize events with debouncing
 */
export function useWindowResize(
  handler: () => void,
  debounceMs: number = 100
): void {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const debouncedHandler = useRef((event: WindowEventMap['resize']) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(handler, debounceMs);
  });

  useEventListener('resize', debouncedHandler.current);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
}
