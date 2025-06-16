import { useTheme } from 'tamagui';

/**
 * Hook to access Tamagui theme tokens
 * Replaces the legacy useThemeColor with Tamagui's comprehensive design system
 * 
 * @example
 * const theme = useTamaguiTheme();
 * const backgroundColor = theme.background.val;
 * const primaryColor = theme.blue10.val;
 */
export function useTamaguiTheme() {
  return useTheme();
}

/**
 * Hook to get semantic colors for travel app
 * Provides travel-specific color mappings using Tamagui tokens
 */
export function useTravelTheme() {
  const theme = useTheme();
  
  return {
    // Primary travel colors
    primary: theme.blue10,
    secondary: theme.green10,
    accent: theme.orange10,
    
    // Status colors
    success: theme.green9,
    warning: theme.yellow9,
    error: theme.red9,
    info: theme.blue9,
    
    // Background colors
    background: theme.background,
    surface: theme.background025,
    card: theme.background050,
    
    // Text colors
    text: theme.color,
    textSecondary: theme.color11,
    textMuted: theme.color10,
    
    // Border colors
    border: theme.borderColor,
    borderLight: theme.borderColorFocus,
    
    // Travel-specific semantic colors
    booking: theme.green10,     // For booking buttons
    exploration: theme.blue10,  // For exploration features
    social: theme.purple10,     // For social features
    transport: theme.orange10,  // For transportation
    accommodation: theme.teal10, // For hotels/stays
  } as const;
} 