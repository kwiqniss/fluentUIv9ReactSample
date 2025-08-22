/**
 * Shared component property constants for consistent styling across the application
 */
export const componentConstants = {
  // Text styling
  text: {
    semibold: 'semibold' as const,
    regular: 'regular' as const,
    size200: 200 as const,
    size300: 300 as const,
    size400: 400 as const,
    size500: 500 as const,
  },
  
  // Button appearances
  button: {
    primary: 'primary' as const,
    secondary: 'secondary' as const,
    outline: 'outline' as const,
    subtle: 'subtle' as const,
    transparent: 'transparent' as const,
  },
  
  // Component sizes
  size: {
    small: 'small' as const,
    medium: 'medium' as const,
    large: 'large' as const,
    size16: 16 as const,
    size24: 24 as const,
    size32: 32 as const,
    size40: 40 as const,
    size48: 48 as const,
    size12: 12 as const,
  },
  
  // Avatar colors and variants
  avatar: {
    colorful: 'colorful' as const,
    neutral: 'neutral' as const,
    brand: 'brand' as const,
  },
  
  // Skeleton shapes
  skeleton: {
    circle: 'circle' as const,
    rectangle: 'rectangle' as const,
    square: 'square' as const,
  },
  
  // Input types
  input: {
    text: 'text' as const,
    email: 'email' as const,
    password: 'password' as const,
    number: 'number' as const,
    tel: 'tel' as const,
    url: 'url' as const,
    search: 'search' as const,
  },
  
  // Badge appearances
  badge: {
    filled: 'filled' as const,
    ghost: 'ghost' as const,
    outline: 'outline' as const,
    tint: 'tint' as const,
  },
  
  // Colors for badges and status indicators
  statusColor: {
    success: 'success' as const,
    warning: 'warning' as const,
    danger: 'danger' as const,
    info: 'info' as const,
    subtle: 'subtle' as const,
    brand: 'brand' as const,
  },
} as const;

// Export individual sections for convenience
export const { text, button, size, avatar, skeleton, input, badge, statusColor } = componentConstants;
