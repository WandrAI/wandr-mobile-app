# ADR-002: Tamagui UI Library Integration

## Status
Completed - Unified System Implemented June 2025

## Context
The Wandr travel app initially used custom ThemedText and ThemedView components for theming and UI consistency. While these components provided basic theme switching functionality, they lacked the comprehensive design system, performance optimizations, and cross-platform capabilities needed for a modern travel application.

After evaluating various UI libraries including NativeBase, React Native Elements, and Tamagui, we decided to adopt Tamagui for the following reasons:

### Requirements
- **Cross-platform compatibility**: Native and web support with consistent APIs
- **Performance**: Compile-time optimizations and minimal runtime overhead
- **Design system**: Comprehensive token-based theming with travel-appropriate aesthetics
- **Developer experience**: TypeScript-first with excellent IntelliSense support
- **Atomic design alignment**: Component structure that matches our existing patterns
- **Animation capabilities**: Smooth, performant animations for travel-focused interactions

### Evaluation Results

#### Tamagui Advantages
- ✅ **Universal**: Works seamlessly across React Native and web with Expo Router
- ✅ **Performance**: Compile-time optimizations reduce bundle size and improve runtime
- ✅ **Modern**: Built for React 19 with latest best practices
- ✅ **Design tokens**: Comprehensive theming system with travel-appropriate defaults
- ✅ **TypeScript**: Excellent type safety and developer experience
- ✅ **Atomic design**: Natural fit with our component architecture
- ✅ **Animation**: Built-in animation system with `AnimatePresence`
- ✅ **Active development**: Regular updates and strong community

#### Alternatives Considered
- **React Native Elements**: Good component library but lacks compile-time optimizations
- **NativeBase**: Solid design system but primarily focused on React Native
- **Custom components**: Full control but significant development overhead

## Decision
We will integrate Tamagui v1.126.18+ as our primary UI library while maintaining backward compatibility with existing ThemedText/ThemedView components during the migration period.

### Implementation Approach
1. **Unified system**: Tamagui as primary UI with React Native fallback for complex components only
2. **Atomic design**: Map Tamagui components to our atomic design structure
3. **Theme consistency**: Enhanced theme system with travel-specific semantic colors
4. **Performance**: Leverage Tamagui's compile-time optimizations and design tokens

## Implementation Details

### Core Configuration
```typescript
// tamagui.config.ts
import { defaultConfig } from '@tamagui/config/v4'
import { createTamagui } from 'tamagui'

export const tamaguiConfig = createTamagui(defaultConfig)
```

### Metro Configuration
```javascript
// metro.config.js
const { withTamagui } = require('@tamagui/metro-plugin')

module.exports = withTamagui(config, {
  components: ['tamagui'],
  config: './tamagui.config.ts',
  outputCSS: './tamagui-web.css',
})
```

### Component Architecture
```
components/atoms/
├── StyledText.tsx          # Primary text component (Tamagui-based)
├── StyledView.tsx          # Primary view component (Tamagui-based)  
├── StyledButton.tsx        # Primary button component (Tamagui-based)
├── IconSymbol.tsx          # Icon component (React Native fallback)
├── TabBarBackground.tsx    # Platform-specific component (React Native fallback)
└── index.ts                # Unified exports with library-agnostic naming
```

### Implementation Strategy
1. **Unified system**: All UI components use Tamagui with library-agnostic naming
2. **React Native fallback**: Only for complex components (ImageBackground, StatusBar, gestures)
3. **Enhanced theming**: Travel-specific semantic colors with useTravelTheme hook
4. **Responsive design**: Built-in responsive patterns with useResponsive hook
5. **Performance optimization**: Tamagui compile-time extraction enabled

### Future UI Library Migration
The styled components use library-agnostic naming to enable easy migration:
- `StyledText` can be swapped to use any text component library
- `StyledView` can be swapped to use any view component library
- `StyledButton` can be swapped to use any button component library

This approach allows changing the underlying UI library without updating component usage throughout the app.

### Travel App Specific Benefits
- **Responsive design**: Built-in media queries for tablet/mobile optimization
- **Accessibility**: WCAG-compliant components out of the box
- **Internationalization**: RTL support for global travel app requirements
- **Design tokens**: Easily customizable for travel brand colors and typography
- **Performance**: Critical for travel apps with image-heavy content and maps

## Consequences

### Positive
- **Improved DX**: Better TypeScript support and component composition
- **Performance**: Compile-time optimizations reduce bundle size
- **Consistency**: Design system tokens ensure visual consistency
- **Maintenance**: Less custom code to maintain
- **Future-proof**: Modern architecture aligned with React/React Native evolution
- **Web support**: Seamless web compatibility with Expo Router

### Negative
- **Learning curve**: Team needs to learn Tamagui patterns and conventions
- **Bundle size**: Initial increase during migration period with dual libraries
- **Migration effort**: Time investment to migrate existing components
- **Dependency**: External dependency for core UI functionality

### Risks and Mitigations
- **Breaking changes**: Use specific version ranges and test thoroughly
- **Performance regression**: Monitor bundle size and runtime performance
- **Migration complexity**: Gradual migration with fallback to legacy components

## Implementation Lessons Learned

### Button Styling Patterns
During implementation, we discovered the optimal patterns for custom button styling:

```typescript
// ✅ Recommended: Use chromeless + style prop for complex custom styling
<StyledButton 
  chromeless 
  style={styles.customButton}
  pressStyle={{ opacity: 0.8, scale: 0.98 }}
>
  <StyledText style={styles.buttonText}>Custom Button</StyledText>
</StyledButton>

// ❌ Avoid: Mixing TouchableOpacity with Tamagui components
<TouchableOpacity style={customStyles}>
  <StyledText>Button Text</StyledText>
</TouchableOpacity>
```

### Migration Priority
Actual implementation revealed the most effective migration order:

1. **High Impact, Low Risk**: `View` → `StyledView`, `Text` → `StyledText`
2. **Medium Impact**: `ScrollView` → Tamagui `ScrollView`, `TouchableOpacity` → `StyledButton` (when used as buttons)
3. **Keep React Native**: `ImageBackground`, `StatusBar`, complex gesture handlers

### Development Workflow
- **Gradual migration works well**: Mixed component usage during transition is stable
- **Library-agnostic naming pays off**: Makes future UI library changes feasible
- **Lint compatibility**: All Tamagui components pass existing ESLint rules
- **Type safety**: Excellent TypeScript support with minimal configuration

## Monitoring and Success Metrics
- **Bundle size**: Track JavaScript bundle size before/after migration
- **Runtime performance**: Monitor component render times and animations
- **Developer velocity**: Measure component development and modification speed
- **Design consistency**: Evaluate visual consistency across screens
- **User experience**: Monitor user feedback on app responsiveness and animations

## Related Documents
- [ADR-001: Atomic Design Component Structure](./001-atomic-design-component-structure.md)
- [Component Patterns Documentation](../conventions/component-patterns.md)
- [Tamagui Implementation Guide](../conventions/tamagui-implementation-guide.md)

---
**Last Updated**: June 2025 