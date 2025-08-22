// Suppress ResizeObserver errors that are common with FluentUI components
// This must be imported early in the application lifecycle

// Store original implementations
const originalResizeObserver = window.ResizeObserver;
const originalConsoleError = console.error;
const originalWindowError = window.onerror;

// Patch ResizeObserver to catch errors at the source
window.ResizeObserver = class extends originalResizeObserver {
  constructor(callback: ResizeObserverCallback) {
    super((entries, observer) => {
      window.requestAnimationFrame(() => {
        try {
          callback(entries, observer);
        } catch (error) {
          // Only suppress the specific ResizeObserver loop error
          const errorMessage = error instanceof Error ? error.message : String(error);
          if (!errorMessage.includes('ResizeObserver loop completed with undelivered notifications')) {
            throw error;
          }
        }
      });
    });
  }
};

// Suppress console errors
console.error = (...args: any[]) => {
  const message = args[0]?.toString() || '';
  if (message.includes('ResizeObserver loop completed with undelivered notifications')) {
    return; // Suppress this specific error
  }
  originalConsoleError.apply(console, args);
};

// Global error handler
window.onerror = (message, source, lineno, colno, error) => {
  const messageStr = String(message || '');
  if (messageStr.includes('ResizeObserver loop completed with undelivered notifications')) {
    return true; // Prevent default browser error handling
  }
  if (originalWindowError) {
    return originalWindowError(message, source, lineno, colno, error);
  }
  return false;
};

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  const reason = String(event.reason || '');
  if (reason.includes('ResizeObserver loop completed with undelivered notifications')) {
    event.preventDefault();
    return;
  }
});

// Handle general error events
window.addEventListener('error', (event) => {
  const message = String(event.message || '');
  if (message.includes('ResizeObserver loop completed with undelivered notifications')) {
    event.preventDefault();
    event.stopPropagation();
    return;
  }
}, true);

export {}; // Make this a module
