# Tamagui Implementation Guide

This guide provides practical instructions for using Tamagui components in the Wandr travel app, following our atomic design principles and travel-focused design system.

## 📦 Setup and Configuration

### Installation
Tamagui is already installed and configured in the project with the following packages:
- `tamagui` - Core UI library with full component set
- `@tamagui/config` - Pre-built configuration with v4 design tokens
- `@tamagui/babel-plugin` - Compile-time optimizations
- `@tamagui/metro-plugin` - Metro bundler integration

### Configuration Files
- `tamagui.config.ts` - Main configuration using v4 defaults
- `babel.config.js` - Babel plugin setup for optimizations
- `metro.config.js` - Metro plugin for web support and CSS extraction
- `app/_layout.tsx` - TamaguiProvider setup with theme integration

## 🎨 Design System

### Theme Integration
Tamagui automatically integrates with the app's light/dark theme switching:

```typescript
// Automatic theme switching based on system preference
<TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
  {/* Your app components */}
</TamaguiProvider>
```

### Design Tokens
Tamagui provides a comprehensive token system:

```typescript
// Spacing tokens: $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
<StyledView padding="$4" margin="$2" />

// Color tokens: $color, $background, $borderColor, $blue9, etc.
<StyledText color="$blue10">Travel destination</StyledText>

// Size tokens: $1-$10 for consistent sizing
<StyledButton size="$4">Book Trip</StyledButton>
```

## 🧩 Unified Component System

### Architecture Overview
The app uses a unified Tamagui-first approach with React Native as fallback:

1. **Primary**: All UI uses Tamagui components (`StyledText`, `StyledView`, `StyledButton`)
2. **Fallback**: React Native only for complex platform-specific components
3. **Unified**: Library-agnostic naming enables easy future migrations

### StyledText
Replaces ThemedText with enhanced typography variants (library-agnostic naming):

```typescript
import { StyledText } from '@/components';

// Basic usage
<StyledText>Default text</StyledText>

// With type variants
<StyledText type="title">Welcome to Wandr</StyledText>
<StyledText type="subtitle">Explore the world</StyledText>
<StyledText type="caption">Last updated 2 hours ago</StyledText>

// With style variants
<StyledText variant="secondary">Secondary information</StyledText>
<StyledText variant="muted">Subtle text</StyledText>

// Travel-specific usage
<StyledText type="title" color="$blue10">
  Discover Paris
</StyledText>
<StyledText type="caption" variant="muted">
  4.8 ★ (127 reviews)
</StyledText>

// Inline styling (when style prop needed)
<StyledText style={styles.customText}>Custom styled text</StyledText>
```

### StyledView
Replaces ThemedView with enhanced layout capabilities (library-agnostic naming):

```typescript
import { StyledView } from '@/components';

// Basic container
<StyledView flex={1} padding="$4">
  {/* Content */}
</StyledView>

// Card variant for travel items
<StyledView variant="card" margin="$2">
  <StyledText type="subtitle">Hotel Name</StyledText>
  <StyledText variant="muted">$150/night</StyledText>
</StyledView>

// Layout helpers
<StyledView flex="row" gap="$3">
  <StyledView flex={1}>Left content</StyledView>
  <StyledView flex={1}>Right content</StyledView>
</StyledView>

// Surface variant for sections
<StyledView variant="surface" padding="$4" borderRadius="$4">
  <StyledText type="subtitle">Trip Details</StyledText>
</StyledView>
```

### StyledButton
Enhanced button component with travel-appropriate styling (library-agnostic naming):

```typescript
import { StyledButton } from '@/components';

// Basic button
<StyledButton onPress={handleBooking}>
  Book Now
</StyledButton>

// Sized buttons
<StyledButton size="$3" variant="outline">
  Save
</StyledButton>
<StyledButton size="$5" theme="blue">
  Book Trip
</StyledButton>

// Custom styling with chromeless + style prop (recommended for complex styling)
<StyledButton 
  chromeless
  style={styles.customButton}
  pressStyle={{ opacity: 0.8, scale: 0.98 }}
  onPress={handleAction}
>
  <StyledText style={styles.buttonText}>Custom Button</StyledText>
</StyledButton>

// Travel-specific variants
<StyledButton 
  theme="green" 
  size="$4" 
  onPress={handleConfirmBooking}
>
  Confirm Booking
</StyledButton>
```

### Native Tamagui Components
Use Tamagui's built-in components for enhanced functionality:

```typescript
import { Button, Card, ScrollView, XStack, YStack } from 'tamagui';

// Layout stacks (prefer over flexDirection styling)
<YStack space="$4" padding="$4">
  <StyledText type="title">Destinations</StyledText>
  <XStack space="$2">
    <Button flex={1}>Flights</Button>
    <Button flex={1}>Hotels</Button>
  </XStack>
</YStack>

// Cards for travel content
<Card elevate size="$4" margin="$3">
  <Card.Header>
    <StyledText type="subtitle">Rome, Italy</StyledText>
  </Card.Header>
  <Card.Footer>
    <Button theme="blue">View Details</Button>
  </Card.Footer>
</Card>

// ScrollView with Tamagui
<ScrollView contentInsetAdjustmentBehavior="automatic">
  {/* Content */}
</ScrollView>
```

## 🔄 Component Patterns & Best Practices

### Standard Component Usage
All components use Tamagui with design tokens:

```typescript
import { StyledText, StyledView, StyledButton } from '@/components';
import { useTravelTheme, useResponsive } from '@/hooks';

function TravelScreen() {
  const theme = useTravelTheme();
  const { isTablet, padding } = useResponsive();
  
  return (
    <StyledView padding={padding} backgroundColor={theme.background}>
      <StyledText type="title" color={theme.text}>
        Travel Destination
      </StyledText>
      <StyledButton theme="blue" onPress={handleBooking}>
        Book Now
      </StyledButton>
    </StyledView>
  );
}
```

### Button Migration Patterns

```typescript
// ❌ Avoid: Mixing TouchableOpacity with Tamagui
<TouchableOpacity style={customStyles}>
  <StyledText>Button Text</StyledText>
</TouchableOpacity>

// ✅ Good: Use chromeless StyledButton for custom styling
<StyledButton 
  chromeless 
  style={customStyles}
  pressStyle={{ opacity: 0.8, scale: 0.98 }}
>
  <StyledText style={styles.buttonText}>Button Text</StyledText>
</StyledButton>

// ✅ Good: Use themed buttons for standard cases
<StyledButton theme="blue" size="$4">
  Standard Button
</StyledButton>
```

### Layout Migration

```typescript
// ❌ Old approach
<View style={{ flexDirection: 'row', gap: 12 }}>
  <View style={{ flex: 1 }}>Content 1</View>
  <View style={{ flex: 1 }}>Content 2</View>
</View>

// ✅ New approach with Tamagui stacks
<XStack space="$3" flex={1}>
  <StyledView flex={1}>Content 1</StyledView>
  <StyledView flex={1}>Content 2</StyledView>
</XStack>
```

### Styling Best Practices

```typescript
// ✅ Use design tokens when possible
<StyledView padding="$4" margin="$2" backgroundColor="$background" />

// ✅ Use style prop for custom styling
<StyledView style={styles.customContainer} />

// ✅ Mix approaches when needed
<StyledView 
  padding="$4"  // Design token
  style={styles.customBorder}  // Custom style
/>
```

## 🏗️ Component Patterns

### Travel Card Component
Example of creating a travel-specific component using Tamagui:

```typescript
import { Card, XStack, YStack } from 'tamagui';
import { StyledText } from '@/components';

interface TravelCardProps {
  destination: string;
  price: string;
  rating: number;
  image: string;
  onPress: () => void;
}

export function TravelCard({ destination, price, rating, onPress }: TravelCardProps) {
  return (
    <Card elevate size="$4" margin="$2" onPress={onPress}>
      <Card.Header>
        <YStack space="$2">
          <StyledText type="subtitle">{destination}</StyledText>
          <XStack justifyContent="space-between" alignItems="center">
            <StyledText variant="muted">{rating} ★</StyledText>
            <StyledText type="defaultSemiBold" color="$green10">
              {price}
            </StyledText>
          </XStack>
        </YStack>
      </Card.Header>
    </Card>
  );
}
```

### Responsive Design
Use Tamagui's responsive props for different screen sizes:

```typescript
<TamaguiView
  padding="$3"
  $gtSm={{ padding: "$5" }}
  $gtMd={{ padding: "$6", flexDirection: "row" }}
>
  <TamaguiText
    fontSize="$4"
    $gtSm={{ fontSize: "$5" }}
    $gtMd={{ fontSize: "$6" }}
  >
    Responsive text
  </TamaguiText>
</TamaguiView>
```

## 🎭 Animation and Interactions

### AnimatePresence
Use Tamagui's animation system for smooth transitions:

```typescript
import { AnimatePresence } from 'tamagui';
import { StyledView, StyledText } from '@/components';

<AnimatePresence>
  {showDetails && (
    <StyledView
      key="details"
      animation="bouncy"
      enterStyle={{ opacity: 0, scale: 0.9 }}
      exitStyle={{ opacity: 0, scale: 0.95 }}
    >
      <StyledText>Trip details</StyledText>
    </StyledView>
  )}
</AnimatePresence>
```

### Interactive States
Leverage Tamagui's interaction props:

```typescript
<StyledButton
  pressStyle={{ scale: 0.95 }}
  hoverStyle={{ backgroundColor: '$blue8' }}
  focusStyle={{ borderColor: '$blue10' }}
>
  Interactive Button
</StyledButton>
```

## 📱 Travel App Specific Patterns

### Destination List Item
```typescript
import { Card, XStack, YStack } from 'tamagui';
import { StyledText } from '@/components';

<Card elevate padding="$3" margin="$2">
  <XStack space="$3" alignItems="center">
    <YStack flex={1} space="$1">
      <StyledText type="subtitle">Barcelona, Spain</StyledText>
      <StyledText variant="muted" size="$2">
        4 days • 3 nights
      </StyledText>
      <XStack space="$2" alignItems="center">
        <StyledText color="$yellow10">★ 4.8</StyledText>
        <StyledText variant="muted">(234 reviews)</StyledText>
      </XStack>
    </YStack>
    <YStack alignItems="flex-end">
      <StyledText type="defaultSemiBold" color="$green10">
        $1,299
      </StyledText>
      <StyledText variant="muted" size="$1">
        per person
      </StyledText>
    </YStack>
  </XStack>
</Card>
```

### Search Bar
```typescript
import { Input, Button } from 'tamagui';

<XStack space="$2" padding="$3">
  <Input
    flex={1}
    placeholder="Where to next?"
    size="$4"
    borderRadius="$3"
  />
  <Button size="$4" theme="blue">
    Search
  </Button>
</XStack>
```

### Price Display
```typescript
import { YStack } from 'tamagui';
import { StyledText } from '@/components';

<YStack alignItems="center" space="$1">
  <StyledText variant="muted" size="$1">
    Starting from
  </StyledText>
  <StyledText type="title" color="$green10">
    $599
  </StyledText>
  <StyledText variant="muted" size="$2">
    per person
  </StyledText>
</YStack>
```

## 🔧 Component Guidelines

### Unified System
1. **Primary components**: All UI uses StyledText, StyledView, StyledButton
2. **Fallback components**: React Native only for complex platform-specific needs
3. **Design tokens**: Always prefer Tamagui tokens over hardcoded values
4. **Responsive design**: Use useResponsive hook for breakpoint-aware layouts

### Component Usage
```typescript
// Standard pattern - library-agnostic naming
import { StyledText, StyledView, StyledButton } from '@/components';

// Advanced Tamagui components for complex layouts
import { XStack, YStack, Card, ScrollView } from 'tamagui';

// Theme and responsive hooks
import { useTravelTheme, useResponsive } from '@/hooks';
```

### Text Rendering Best Practices
To prevent text clipping issues, always include explicit `lineHeight` for icon fonts and custom typography:

```typescript
// ✅ Good: Explicit line height prevents clipping
<StyledText 
  fontSize={24} 
  lineHeight={30}  // Slightly larger than fontSize
>
  🗺️ Icon
</StyledText>

// ❌ Avoid: Missing lineHeight can cause clipping
<StyledText fontSize={24}>🗺️ Icon</StyledText>
```

### Future UI Library Migration
The library-agnostic naming makes future migrations seamless:

```typescript
// Today: StyledText uses Tamagui Text internally
import { StyledText } from '@/components';

// Future: Same component name, different library under the hood
// Could be React Native Elements, NativeBase, or any other library
import { StyledText } from '@/components'; // No import changes needed!
```

### Performance Optimization
For production builds, Tamagui's babel plugin will optimize components:
- Dead code elimination
- Compile-time style resolution
- Reduced bundle size
- Improved runtime performance

## 📚 Best Practices

### 1. Use Design Tokens
Always prefer design tokens over hardcoded values:
```typescript
// ✅ Good
<StyledView padding="$4" background="$background" />

// ❌ Avoid
<StyledView padding={16} backgroundColor="#fff" />
```

### 2. Leverage Component Variants
Use built-in variants instead of custom styles:
```typescript
// ✅ Good
<StyledText variant="muted">Subtitle</StyledText>

// ❌ Avoid
<StyledText style={{ opacity: 0.7 }}>Subtitle</StyledText>
```

### 3. Responsive Design
Use responsive props for different screen sizes:
```typescript
<StyledView 
  flexDirection="column"
  $gtMd={{ flexDirection: "row" }}
>
  {/* Content adapts to screen size */}
</StyledView>
```

### 4. Accessibility
Tamagui components include accessibility props by default:
```typescript
<StyledButton accessibilityLabel="Book flight to Paris">
  Book Flight
</StyledButton>
```

## 🎯 Travel-Specific Guidelines

### Color Usage
- **Primary actions**: Use `$blue9` for booking, searching
- **Success states**: Use `$green10` for confirmations, prices
- **Warning states**: Use `$orange9` for alerts, notifications
- **Secondary text**: Use `variant="muted"` for subtle information

### Typography Hierarchy
- **Page titles**: `type="title"`
- **Section headers**: `type="subtitle"`
- **Body text**: Default (no type prop)
- **Captions/metadata**: `type="caption"`
- **Links**: `type="link"`

### Spacing Consistency
- **Page padding**: `$4` or `$5`
- **Card padding**: `$3` or `$4`
- **Element spacing**: `$2` or `$3`
- **Section spacing**: `$5` or `$6`

---

**Last Updated**: December 2024

For more detailed information, refer to the [official Tamagui documentation](https://tamagui.dev/docs) and our [ADR-002: Tamagui UI Library Integration](../adr/002-tamagui-ui-library-integration.md). 