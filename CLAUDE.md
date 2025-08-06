# Wandr Mobile App - Development Context

## 🎯 Project Overview

**Wandr Mobile** is a React Native travel companion app providing:
- Real-time AI-powered travel assistance
- Hyper-localized destination recommendations  
- Group trip planning and collaboration
- Cross-platform support (iOS, Android, Web)

**Status**: Authentication Complete ✅ | Trips Implementation Pending 🔄

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development
npm start

# Platform-specific
npm run ios      # iOS Simulator
npm run android  # Android Emulator  
npm run web      # Web Browser

# Testing & Quality
npm test                # Run tests
npm run test:coverage   # Coverage report
npm run lint           # ESLint check
```

## 🏗️ Architecture

### Tech Stack
- **Framework**: React Native with Expo SDK 53
- **Navigation**: Expo Router (file-based routing)
- **UI Library**: Tamagui (design system)
- **State**: Zustand (client), React Query (server)
- **Forms**: React Hook Form
- **API Client**: Axios with interceptors
- **Language**: TypeScript

### Project Structure
```
app/                    # Expo Router screens
├── (tabs)/            # Tab navigation
├── login.tsx          # Auth screens
└── _layout.tsx        # Root layout

components/            # Atomic Design System
├── atoms/            # Basic UI elements
├── molecules/        # Composite components
└── organisms/        # Complex features

services/api/          # Backend integration
├── client.ts         # Axios configuration
└── auth.ts          # Auth endpoints

stores/               # Zustand stores
└── authStore.ts     # Auth state

hooks/                # Custom React hooks
└── auth/            # Authentication hooks
```

## 🔌 Backend Integration

### API Configuration
- **Development**: `http://localhost:8000/api/v1`
- **Production**: `https://api.wandr.app/api/v1`
- **Auth**: JWT Bearer tokens auto-injected

### Implemented Endpoints
```typescript
// Authentication (✅ Complete)
POST /auth/register    // User registration
POST /auth/login       // Get JWT token
GET  /users/profile    // Get user profile
POST /auth/logout      // Logout user

// Trips (⏳ Not Implemented)
GET    /trips          // List user trips
POST   /trips          // Create trip
GET    /trips/{id}     // Get trip details
PUT    /trips/{id}     // Update trip
DELETE /trips/{id}     // Delete trip
```

## 📊 Current Implementation

### ✅ Completed
- **Authentication Flow**: Register, login, logout with JWT
- **State Management**: Zustand + AsyncStorage persistence
- **API Client**: Axios with auth interceptors
- **Navigation**: Tab-based with auth guards
- **UI Components**: Atomic design structure
- **Error Handling**: Consistent API error management

### 🔄 In Progress
- **Trip Management**: CRUD operations for trips
- **Location Services**: Map integration
- **AI Chat**: Conversational travel assistant

### 📝 Next Priority: Trips Feature

**Required Components**:
1. `services/api/trips.ts` - API endpoints
2. `stores/tripStore.ts` - Trip state management  
3. `hooks/trips/` - Trip-related hooks
4. `app/(tabs)/trips.tsx` - Trips list screen
5. `app/trips/[id].tsx` - Trip detail screen
6. Trip components in `components/organisms/`

## 🛠️ Common Development Tasks

### Add New Screen
```bash
# Create in app/ directory
touch app/new-screen.tsx

# For tab screen
touch app/(tabs)/new-tab.tsx
# Update app/(tabs)/_layout.tsx
```

### Add API Endpoint
```typescript
// 1. Create service: services/api/feature.ts
export const featureApi = {
  list: () => apiRequest<Feature[]>({ 
    method: 'GET', 
    url: '/features' 
  })
};

// 2. Create hook: hooks/features/useFeatures.ts
export const useFeatures = () => {
  return useQuery({
    queryKey: ['features'],
    queryFn: featureApi.list
  });
};

// 3. Use in component
const { data, isLoading } = useFeatures();
```

### Add Zustand Store
```typescript
// stores/featureStore.ts
interface FeatureStore {
  items: Feature[];
  setItems: (items: Feature[]) => void;
}

export const useFeatureStore = create<FeatureStore>()(
  persist(
    (set) => ({
      items: [],
      setItems: (items) => set({ items })
    }),
    { name: 'feature-storage' }
  )
);
```

### Component Creation Pattern
```typescript
// Follow Atomic Design in components/
// atoms/MyButton/
// ├── MyButton.tsx      // Component
// ├── MyButton.test.tsx // Tests
// └── index.ts          // Export
```

## 🧪 Testing

```bash
# Run tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage

# Test specific file
npm test -- MyComponent.test.tsx
```

## 🎯 Implementation Checklist

### Phase 1: Core Features ✅
- [x] Project setup with Expo
- [x] Authentication system
- [x] Navigation structure
- [x] State management
- [x] API integration

### Phase 2: Travel Features 🔄
- [ ] Trip CRUD operations
- [ ] Location integration
- [ ] Group collaboration
- [ ] Expense tracking

### Phase 3: AI Features 📅
- [ ] Chat interface
- [ ] Recommendation engine
- [ ] Real-time assistance

## 🔧 Troubleshooting

### Common Issues
- **Metro bundler**: Clear cache with `npx expo start -c`
- **iOS build**: Ensure XCode and simulators are updated
- **Android build**: Check Android Studio and emulator setup
- **Type errors**: Run `npx tsc --noEmit` to check

### Development Tips
- Use `__DEV__` flag for development-only code
- Check `expo-env.d.ts` for global types
- Run `npx expo doctor` to diagnose issues

---

**Last Updated**: January 2025 | **Backend API**: `wandr-backend-app/`