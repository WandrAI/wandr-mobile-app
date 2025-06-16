# Component Folder Structure Guide

This guide explains the consistent component folder structure used throughout the Wandr travel app.

## 📁 Structure Overview

Every component follows the same pattern, regardless of atomic design level:

```
ComponentName/
├── ComponentName.tsx        # Main component file
├── ComponentName.test.tsx   # Component tests
├── index.ts                 # Clean export interface
└── [additional files]       # Platform variants, sub-components, etc.
```

## 🏗️ Implementation Examples

### Atoms (Simple Components)

```
components/atoms/
├── StyledText/
│   ├── StyledText.tsx
│   ├── StyledText.test.tsx
│   └── index.ts
├── StyledButton/
│   ├── StyledButton.tsx
│   ├── StyledButton.test.tsx
│   └── index.ts
├── IconSymbol/
│   ├── IconSymbol.tsx
│   ├── IconSymbol.ios.tsx    # Platform-specific variant
│   ├── IconSymbol.test.tsx
│   └── index.ts
```

### Molecules (Composite Components)

```
components/molecules/
├── TravelCard/
│   ├── TravelCard.tsx
│   ├── TravelCard.test.tsx
│   ├── PriceSection.tsx      # Sub-component
│   ├── ImageGallery.tsx      # Sub-component
│   └── index.ts
├── SearchBar/
│   ├── SearchBar.tsx
│   ├── SearchBar.test.tsx
│   ├── SearchInput.tsx       # Sub-component
│   ├── FilterToggle.tsx      # Sub-component
│   └── index.ts
```

### Organisms (Complex Components)

```
components/organisms/
├── TripPlanner/
│   ├── TripPlanner.tsx
│   ├── TripPlanner.test.tsx
│   ├── components/           # Internal components folder
│   │   ├── DatePicker.tsx
│   │   ├── DestinationList.tsx
│   │   └── BudgetCalculator.tsx
│   └── index.ts
├── BookingFlow/
│   ├── BookingFlow.tsx
│   ├── BookingFlow.test.tsx
│   ├── components/
│   │   ├── PaymentForm.tsx
│   │   ├── ConfirmationStep.tsx
│   │   └── ReviewStep.tsx
│   ├── hooks/               # Internal hooks
│   │   └── useBookingState.ts
│   └── index.ts
```

## 📋 File Conventions

### Naming Rules
- **Folders**: PascalCase matching component name (`StyledText/`)
- **Components**: PascalCase with `.tsx` extension (`StyledText.tsx`)
- **Tests**: Component name + `.test.tsx` (`StyledText.test.tsx`)
- **Exports**: Always `index.ts` (never `index.tsx`)

### Platform Variants
When platform-specific versions are needed:
```
IconSymbol/
├── IconSymbol.tsx           # Default implementation
├── IconSymbol.ios.tsx       # iOS-specific
├── IconSymbol.android.tsx   # Android-specific (if needed)
├── IconSymbol.test.tsx      # Tests for all platforms
└── index.ts
```

### Internal Organization
For complex components with many internal files:
```
TripPlanner/
├── TripPlanner.tsx
├── TripPlanner.test.tsx
├── components/              # Internal components
│   ├── DatePicker.tsx
│   └── DestinationList.tsx
├── hooks/                   # Internal hooks
│   └── useTripPlanner.ts
├── utils/                   # Internal utilities
│   └── formatTripData.ts
├── types/                   # Internal types
│   └── TripPlannerTypes.ts
└── index.ts
```

## 📤 Export Patterns

### Simple Components (index.ts)
```typescript
// components/atoms/StyledText/index.ts
export { StyledText } from './StyledText';
export type { StyledTextProps } from './StyledText';
```

### Complex Components (index.ts)
```typescript
// components/organisms/TripPlanner/index.ts
export { TripPlanner } from './TripPlanner';
export type { TripPlannerProps } from './TripPlanner';

// Optionally export internal components if needed elsewhere
export { DatePicker } from './components/DatePicker';
export type { DatePickerProps } from './components/DatePicker';
```

### Main Level Exports
```typescript
// components/atoms/index.ts
export * from './StyledText';
export * from './StyledButton';
export * from './StyledView';
export * from './IconSymbol';

// components/index.ts
export * from './atoms';
export * from './molecules'; 
export * from './organisms';
```

## 🧪 Testing Integration

### Test File Placement
Tests are always co-located with their components:
```typescript
// components/atoms/StyledText/StyledText.test.tsx
import { render, screen } from '../../../__tests__/test-utils';
import { StyledText } from './StyledText';  // Simple relative import

describe('StyledText', () => {
  // Test cases
});
```

### Test Utils Import
Always use the shared test utilities:
```typescript
// Use the configured render function with providers
import { render, screen } from '../../../__tests__/test-utils';
```

## 🎯 Benefits for Travel App Development

### 1. Consistency
- New developers know exactly where to find files
- No decision fatigue about structure
- Predictable patterns across all component levels

### 2. Scalability
- Same pattern works for simple buttons and complex booking flows
- Easy to add new components following established patterns
- Clear upgrade path from atoms → molecules → organisms

### 3. Domain Alignment
- Travel-specific components naturally group together
- Booking flows can include sub-components cleanly
- Search and filter components stay organized

### 4. Team Collaboration
- Clear ownership boundaries
- Easy code reviews with predictable structure
- Simple onboarding for new team members

## 🚀 Development Workflow

### Creating New Components

1. **Create component folder**: `mkdir components/atoms/NewComponent`
2. **Add component file**: `NewComponent.tsx`
3. **Add test file**: `NewComponent.test.tsx`
4. **Create index file**: `index.ts` with exports
5. **Update parent index**: Add to `components/atoms/index.ts`

### Moving Components
```bash
# Easy to move entire component with all files
mv components/atoms/ComponentName components/molecules/

# Update imports if needed
# Tests and structure remain intact
```

## 📚 References

- [ADR-001: Atomic Design Component Structure](../adr/001-atomic-design-component-structure.md)
- [Component Patterns Documentation](./component-patterns.md)
- [Tamagui Implementation Guide](./tamagui-implementation-guide.md)

---

**Last Updated**: June 2025

This structure supports the Wandr travel app's growth from simple components to complex travel planning features while maintaining consistency and developer experience. 