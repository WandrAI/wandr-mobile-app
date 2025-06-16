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

When moving existing components to atomic design:

1. **Identify the atomic level** based on complexity
2. **Create the new folder structure**
3. **Move component files** to appropriate atomic folder
4. **Update imports** throughout the codebase
5. **Add proper TypeScript interfaces**
6. **Test functionality** remains intact

## 🧪 Testing Patterns

```typescript
// Component test structure
describe('ComponentName', () => {
  it('renders correctly', () => {
    // Render test
  });
  
  it('handles user interactions', () => {
    // Interaction test
  });
  
  it('applies theme correctly', () => {
    // Theme test
  });
});
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