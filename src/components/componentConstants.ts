import { ButtonAppearance, ComponentSize, TextWeight, InputType, BadgeAppearance, StatusColor, AvatarColor, SkeletonShape } from '../types/enums';

/**
 * Shared component property constants for consistent styling across the application
 */
export const componentConstants = {
  // Text styling
  text: {
    semibold: TextWeight.Semibold,
    regular: TextWeight.Regular,
    size200: 200 as const,
    size300: 300 as const,
    size400: 400 as const,
    size500: 500 as const,
  },
  
  // Button appearances
  button: {
    primary: ButtonAppearance.Primary,
    secondary: ButtonAppearance.Secondary,
    outline: ButtonAppearance.Outline,
    subtle: ButtonAppearance.Subtle,
    transparent: ButtonAppearance.Transparent,
  },
  
  // Component sizes
  size: {
    small: ComponentSize.Small,
    medium: ComponentSize.Medium,
    large: ComponentSize.Large,
    size16: 16 as const,
    size24: 24 as const,
    size32: 32 as const,
    size40: 40 as const,
    size48: 48 as const,
    size12: 12 as const,
  },
  
  // Avatar colors and variants
  avatar: {
    colorful: AvatarColor.Colorful,
    neutral: AvatarColor.Neutral,
    brand: AvatarColor.Brand,
  },
  
  // Skeleton shapes
  skeleton: {
    circle: SkeletonShape.Circle,
    rectangle: SkeletonShape.Rectangle,
    square: SkeletonShape.Square,
  },
  
  // Input types
  input: {
    text: InputType.Text,
    email: InputType.Email,
    password: InputType.Password,
    number: InputType.Number,
    tel: InputType.Tel,
    url: InputType.Url,
    search: InputType.Search,
  },
  
  // Badge appearances
  badge: {
    filled: BadgeAppearance.Filled,
    ghost: BadgeAppearance.Ghost,
    outline: BadgeAppearance.Outline,
    tint: BadgeAppearance.Tint,
  },
  
  // Colors for badges and status indicators
  statusColor: {
    success: StatusColor.Success,
    warning: StatusColor.Warning,
    danger: StatusColor.Danger,
    info: StatusColor.Info,
    subtle: StatusColor.Subtle,
    brand: StatusColor.Brand,
  },
} as const;

// Export individual sections for convenience
export const { text, button, size, avatar, skeleton, input, badge, statusColor } = componentConstants;
