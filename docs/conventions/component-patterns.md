# Component Patterns & Conventions

This document outlines the component patterns and conventions used in the Wandr mobile app.

## 📁 Component Organization

### Atomic Design Structure

```
components/
├── atoms/           # Basic building blocks
├── molecules/       # Simple combinations of atoms
├── organisms/       # Complex UI components
├── templates/       # Page-level layouts
└── index.ts        # Barrel exports
```

### File Structure for Each Component

```
ComponentName/
├── index.ts                    # Clean export
├── ComponentName.tsx           # Main component
├── ComponentName.types.ts      # TypeScript interfaces
├── ComponentName.styles.ts     # StyleSheet (when needed)
└── ComponentName.test.tsx      # Tests (future)
```

## 🎯 Component Classification Guide

### Atoms (Basic Elements)
**Purpose**: Fundamental building blocks that cannot be broken down further
**Examples**: Button, Text, Icon, Input, Image

```typescript
// Example: Button atom
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}
```

### Molecules (Simple Combinations)
**Purpose**: Groups of atoms functioning together as a unit
**Examples**: SearchBar (Input + Icon), TabBarItem (Icon + Text), UserAvatar (Image + Badge)

```typescript
// Example: SearchBar molecule
interface SearchBarProps {
  placeholder: string;
  onSearch: (query: string) => void;
  showFilter?: boolean;
}
```

### Organisms (Complex Components)
**Purpose**: Complex UI components composed of molecules and/or atoms
**Examples**: Header, Navigation, TravelCard, ReviewsList

```typescript
// Example: TravelHeader organism
interface TravelHeaderProps {
  destination: string;
  userAvatar: string;
  onMenuPress: () => void;
  onSearchPress: () => void;
}
```

### Templates (Layout Components)
**Purpose**: Page-level layouts and structure
**Examples**: AppLayout, TabLayout, ModalLayout

```typescript
// Example: AppLayout template
interface AppLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showTabBar?: boolean;
}
```

## 🏗️ Component Structure

### Consistent Folder Pattern
All components follow the same folder structure for consistency and predictability:

```
components/
├── atoms/
│   ├── StyledText/
│   │   ├── StyledText.tsx
│   │   ├── StyledText.test.tsx
│   │   └── index.ts
│   ├── StyledButton/
│   │   ├── StyledButton.tsx
│   │   ├── StyledButton.test.tsx
│   │   └── index.ts
│   ├── IconSymbol/
│   │   ├── IconSymbol.tsx
│   │   ├── IconSymbol.ios.tsx      # Platform-specific variant
│   │   ├── IconSymbol.test.tsx     # Tests when added
│   │   └── index.ts
│   └── index.ts                    # Exports all atoms
├── molecules/
│   ├── TravelCard/                 # Future component example
│   │   ├── TravelCard.tsx
│   │   ├── TravelCard.test.tsx
│   │   ├── PriceSection.tsx        # Sub-component
│   │   └── index.ts
│   └── index.ts
├── organisms/
│   ├── TripPlanner/                # Future complex component
│   │   ├── TripPlanner.tsx
│   │   ├── TripPlanner.test.tsx
│   │   ├── components/             # Internal sub-components
│   │   │   ├── DatePicker.tsx
│   │   │   └── DestinationList.tsx
│   │   └── index.ts
│   └── index.ts
└── index.ts                        # Main export point
```

### Component Folder Benefits

**1. Consistency**: Every component follows the same pattern
- New developers always know where to find component files
- No decision fatigue about file organization
- Scalable pattern for any complexity level

**2. Encapsulation**: Each component is fully self-contained
- Component, tests, and exports in one place
- Easy to move or refactor entire components
- Clear ownership boundaries

**3. Discoverability**: Easy navigation and understanding
- IDE folder structures are predictable
- Test files are immediately visible
- Supporting files (future stories, docs) have a clear home

**4. Travel App Alignment**: Supports domain-specific components
- Booking components can include sub-components naturally
- Travel-specific test data stays with travel components
- Feature development is more organized

### File Naming Conventions

**Component Files:**
- `ComponentName.tsx` - Main component file
- `ComponentName.test.tsx` - Component tests  
- `ComponentName.ios.tsx` - iOS-specific variant (when needed)
- `ComponentName.android.tsx` - Android-specific variant (when needed)

**Folder Structure:**
- `ComponentName/` - PascalCase folder name matching component
- `index.ts` - Clean export interface
- `components/` - Sub-components folder (for complex components)

### Index File Pattern

Each component folder includes an `index.ts` file for clean imports:

```typescript
// components/atoms/StyledText/index.ts
export { StyledText } from './StyledText';
export type { StyledTextProps } from './StyledText';
```

This enables clean imports throughout the app:
```typescript
// Clean import from any level
import { StyledText } from '@/components/atoms/StyledText';

// Or from main atoms index
import { StyledText } from '@/components/atoms';
```

## 🏗️ Component Creation Guidelines

### 1. Naming Conventions

- **Folders**: PascalCase (`SearchBar`, `TravelCard`)
- **Files**: Match folder name (`SearchBar.tsx`, `SearchBar.types.ts`)
- **Interfaces**: ComponentName + Props (`SearchBarProps`)
- **Exports**: Named exports with barrel exports

### 2. TypeScript Patterns

```typescript
// Always export interfaces
export interface ComponentNameProps {
  // Required props first
  title: string;
  onPress: () => void;
  
  // Optional props second
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  
  // Children and style props last
  children?: React.ReactNode;
  style?: ViewStyle;
}

// Use forwardRef for atoms that need ref access
export const ComponentName = React.forwardRef<ViewRef, ComponentNameProps>(
  ({ title, onPress, ...props }, ref) => {
    // Component implementation
  }
);
```

### 3. Styling Patterns

```typescript
// Use StyleSheet.create for performance
const styles = StyleSheet.create({
  container: {
    // Base styles
  },
  primary: {
    // Variant styles
  },
  secondary: {
    // Variant styles
  },
});

// Support theme integration
const themedStyles = (colors: ColorScheme) => StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderColor: colors.border,
  },
});
```

### 4. Export Patterns

```typescript
// Component file (SearchBar.tsx)
export { SearchBar } from './SearchBar';

// Index file (index.ts)
export { SearchBar } from './SearchBar';
export type { SearchBarProps } from './SearchBar.types';

// Atomic level index (atoms/index.ts)
export * from './Button';
export * from './Text';
export * from './Icon';

// Main components index (components/index.ts)
export * from './atoms';
export * from './molecules';
export * from './organisms';
export * from './templates';
```

## 🎨 Travel-Specific Component Patterns

### Travel Domain Components

When creating travel-specific components, consider these patterns:

```typescript
// Location-based components
interface LocationProps {
  coordinates: { lat: number; lng: number };
  placeName: string;
  countryCode: string;
}

// Travel activity components
interface ActivityProps {
  activityType: 'restaurant' | 'attraction' | 'hotel' | 'transport';
  rating: number;
  priceLevel: 1 | 2 | 3 | 4;
  duration?: string;
}

// Social travel components
interface SocialProps {
  userId: string;
  userName: string;
  isFollowing?: boolean;
  onFollow?: () => void;
}
```

### Responsive Design Patterns

```typescript
import { useWindowDimensions } from 'react-native';

// Consider screen size in component logic
const { width } = useWindowDimensions();
const isTablet = width > 768;
const itemsPerRow = isTablet ? 3 : 2;
```

## 🔄 Migration Patterns

### Atomic Design Migration
When moving existing components to atomic design:

1. **Identify the atomic level** based on complexity
2. **Create the new folder structure**
3. **Move component files** to appropriate atomic folder
4. **Update imports** throughout the codebase
5. **Add proper TypeScript interfaces**
6. **Test functionality** remains intact

### Unified Tamagui System
The project uses Tamagui as the primary UI library with React Native as fallback only for complex components. See [Tamagui Implementation Guide](./tamagui-implementation-guide.md) for detailed usage instructions.

**Component Architecture:**
- **Primary**: Tamagui-based styled components (StyledText, StyledView, StyledButton)
- **Fallback**: React Native only for complex interactions (ImageBackground, StatusBar, gesture handlers)
- **Unified**: Single import source with library-agnostic naming for future flexibility

**Component mapping:**
```typescript
// ✅ Primary Tamagui components
View → StyledView
Text → StyledText  
ScrollView → ScrollView (from 'tamagui')
TouchableOpacity → StyledButton (when used as buttons)
Button → StyledButton

// ✅ React Native fallback (complex components only)
ImageBackground, StatusBar, PanGestureHandler, complex animations

// Unified imports - library-agnostic naming
import { StyledText, StyledView, StyledButton } from '@/components';

// Advanced Tamagui layout components
import { ScrollView, XStack, YStack } from 'tamagui';

// Theme and responsive hooks
import { useTravelTheme, useResponsive } from '@/hooks';
```

**Best Practices:**
```typescript
// ✅ Standard component usage
<StyledView padding="$4" backgroundColor="$background">
  <StyledText type="title" color="$color">Travel Destination</StyledText>
  <StyledButton theme="blue" onPress={handleBooking}>
    Book Now
  </StyledButton>
</StyledView>

// ✅ Custom styling with chromeless
<StyledButton 
  chromeless 
  style={styles.customButton}
  pressStyle={{ opacity: 0.8, scale: 0.98 }}
>
  <StyledText style={styles.buttonText}>Custom Button</StyledText>
</StyledButton>

// ✅ Responsive design with hooks
const { isTablet, cardWidth } = useResponsive();
const theme = useTravelTheme();

<StyledView width={cardWidth} backgroundColor={theme.card}>
  <StyledText color={theme.text}>Content</StyledText>
</StyledView>
```

**Future UI Library Migration:**
The styled component naming approach allows easy migration to different UI libraries:
- `StyledText` can wrap any text component library
- `StyledView` can wrap any view component library  
- `StyledButton` can wrap any button component library

This design enables changing the underlying UI library without updating component usage throughout the app.

## 🎨 Testing Patterns

### Testing Setup
The project uses Jest + React Native Testing Library for unit and integration testing:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Structure
Tests are co-located with components using the consistent folder pattern:

```
components/atoms/
├── StyledText/
│   ├── StyledText.tsx
│   ├── StyledText.test.tsx      ← Test file alongside component
│   └── index.ts
├── StyledButton/
│   ├── StyledButton.tsx
│   ├── StyledButton.test.tsx    ← Test file alongside component
│   └── index.ts
```

### Test Utilities
Use the custom render function from `__tests__/test-utils.tsx` to wrap components with necessary providers:

```typescript
import { render, screen } from '../../../__tests__/test-utils';
import { StyledText } from './StyledText';

describe('StyledText', () => {
  it('renders text content correctly', () => {
    const testText = 'Welcome to Wandr';
    render(<StyledText>{testText}</StyledText>);
    
    expect(screen.getByText(testText)).toBeTruthy();
  });
});
```

### Testing Best Practices

1. **Test Component Contract**: Focus on props, variants, and user interactions
2. **Use Travel Context**: Include travel-specific examples in test data
3. **Test Accessibility**: Verify accessibility labels and behavior
4. **Test Variants**: Cover all type and variant combinations
5. **Test Error States**: Include tests for edge cases and error handling
6. **Co-locate Tests**: Keep tests in the same folder as components

### Example Component Test
```typescript
describe('StyledText', () => {
  // Basic rendering
  it('renders text content correctly', () => {
    render(<StyledText>Welcome to Wandr</StyledText>);
    expect(screen.getByText('Welcome to Wandr')).toBeTruthy();
  });

  // Variant testing
  it('applies title type variant', () => {
    render(<StyledText type="title">Travel Guide</StyledText>);
    expect(screen.getByText('Travel Guide')).toBeTruthy();
  });

  // Accessibility testing
  it('renders with accessibility label', () => {
    render(
      <StyledText accessibilityLabel="Trip rating">
        ★ 4.8 (127 reviews)
      </StyledText>
    );
    expect(screen.getByLabelText('Trip rating')).toBeTruthy();
  });
});
```

### Test File Conventions

**Naming**: `ComponentName.test.tsx` alongside `ComponentName.tsx`
**Location**: Same folder as the component being tested
**Imports**: Use relative imports from the same folder

```typescript
// ✅ Good - relative import from same folder
import { StyledText } from './StyledText';

// ❌ Avoid - complex relative paths
import { StyledText } from '../StyledText/StyledText';
```

## 📚 Best Practices

1. **Single Responsibility**: Each component should have one clear purpose
2. **Composition over Inheritance**: Build complex components by composing simpler ones
3. **Props Interface**: Always define clear TypeScript interfaces
4. **Theme Integration**: Support light/dark themes from the start
5. **Accessibility**: Include accessibility props and labels
6. **Performance**: Use React.memo for components that render frequently
7. **Documentation**: Include JSDoc comments for complex components

---

**Remember**: The goal is to create a scalable, maintainable component system that supports the travel app's specific needs while following React Native best practices. 