/**
 * String utilities for resource file operations
 */

/**
 * Simple string interpolation function
 * Replaces {0}, {1}, etc. with provided arguments
 */
export function formatString(template: string, ...args: (string | number)[]): string {
  return template.replace(/{(\d+)}/g, (match, index) => {
    const argIndex = parseInt(index, 10);
    return args[argIndex] !== undefined ? String(args[argIndex]) : match;
  });
}
