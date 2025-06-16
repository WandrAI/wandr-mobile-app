// Mock Expo modules that might not be available in test environment
jest.mock('expo-font');
jest.mock('expo-asset');
jest.mock('expo-constants', () => ({
  default: {
    expoConfig: {
      name: 'mobile-app',
    },
  },
}));

// Global test setup
global.__DEV__ = true;

// Mock console.warn to reduce noise in tests
console.warn = jest.fn(); 