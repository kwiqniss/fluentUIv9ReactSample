// Global error suppression for ResizeObserver
// Place this in public/index.html as a script tag before other scripts

(function() {
  'use strict';

  // Store original ResizeObserver
  const OriginalResizeObserver = window.ResizeObserver;

  // Wrap ResizeObserver to catch and suppress the specific error
  window.ResizeObserver = class extends OriginalResizeObserver {
    constructor(callback) {
      super((entries, observer) => {
        try {
          callback(entries, observer);
        } catch (error) {
          // Only suppress the specific ResizeObserver loop error
          if (error.message && error.message.includes('ResizeObserver loop completed with undelivered notifications')) {
            // Silently ignore this error
            return;
          }
          // Re-throw other errors
          throw error;
        }
      });
    }
  };

  // Also suppress console errors for this specific message
  const originalError = console.error;
  console.error = function(...args) {
    const message = args[0]?.toString() || '';
    if (message.includes('ResizeObserver loop completed with undelivered notifications')) {
      return; // Don't log this specific error
    }
    originalError.apply(console, args);
  };
})();
