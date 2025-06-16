import { useMedia } from 'tamagui';

/**
 * Hook for responsive design using Tamagui media queries
 * Provides breakpoint-aware values for travel app layouts
 * 
 * @example
 * const { isTablet, isMobile, columns } = useResponsive();
 * 
 * // Use in components
 * <XStack flexDirection={isTablet ? 'row' : 'column'}>
 */
export function useResponsive() {
  const media = useMedia();
  
  return {
    // Device type detection
    isMobile: !media.sm,
    isTablet: media.sm && !media.lg,
    isDesktop: media.lg,
    
    // Breakpoint access
    xs: media.xs,  // Extra small screens
    sm: media.sm,  // Small tablets
    md: media.md,  // Medium tablets
    lg: media.lg,  // Large screens/desktop
    xl: media.xl,  // Extra large screens
    
    // Travel app specific responsive values
    columns: media.lg ? 4 : media.sm ? 3 : 2,  // Grid columns for travel cards
    itemsPerRow: media.lg ? 3 : 2,             // Items per row for listings
    maxWidth: media.lg ? 1200 : '100%',        // Max content width
    padding: media.sm ? '$6' : '$4',           // Responsive padding
    fontSize: media.sm ? '$6' : '$4',          // Responsive text size
    
    // Navigation specific
    showSidebar: media.lg,                     // Show sidebar on large screens
    useBottomTabs: !media.lg,                  // Use bottom tabs on mobile/tablet
    
    // Travel card sizing
    cardWidth: media.lg ? '300px' : media.sm ? '250px' : '100%',
    imageHeight: media.sm ? 200 : 150,
  } as const;
}

/**
 * Hook for responsive spacing using Tamagui tokens
 * Provides consistent spacing across different screen sizes
 */
export function useResponsiveSpacing() {
  const media = useMedia();
  
  return {
    // Container spacing
    containerPadding: media.sm ? '$6' : '$4',
    sectionSpacing: media.sm ? '$8' : '$6',
    itemSpacing: media.sm ? '$4' : '$3',
    
    // Component spacing
    buttonSpacing: media.sm ? '$3' : '$2',
    cardPadding: media.sm ? '$5' : '$4',
    headerHeight: media.sm ? 80 : 60,
    
    // Text spacing
    titleSpacing: media.sm ? '$6' : '$4',
    paragraphSpacing: media.sm ? '$4' : '$3',
  } as const;
} 