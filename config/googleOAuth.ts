/**
 * Google OAuth Configuration
 * Centralized configuration for Google OAuth authentication
 */

// Environment detection
const isDevelopment = __DEV__;

// OAuth Configuration Interface
export interface GoogleOAuthConfig {
  clientId: string;
  scopes: string[];
  authorizationEndpoint: string;
  redirectScheme: string;
  redirectPath: string;
}

// Default configuration
const DEFAULT_CONFIG: GoogleOAuthConfig = {
  clientId: '', // Will be set based on environment
  scopes: ['openid', 'profile', 'email'],
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  redirectScheme: 'wandr',
  redirectPath: 'auth',
};

// Environment-specific configurations
const DEVELOPMENT_CONFIG: Partial<GoogleOAuthConfig> = {
  // TODO: Replace with actual development Google Client ID
  // This should come from Google Cloud Console - OAuth 2.0 client IDs
  clientId: 'dev-google-client-id.apps.googleusercontent.com',
};

const PRODUCTION_CONFIG: Partial<GoogleOAuthConfig> = {
  // TODO: Replace with actual production Google Client ID
  // This should come from Google Cloud Console - OAuth 2.0 client IDs
  clientId: 'prod-google-client-id.apps.googleusercontent.com',
};

// Create final configuration
export const GOOGLE_OAUTH_CONFIG: GoogleOAuthConfig = {
  ...DEFAULT_CONFIG,
  ...(isDevelopment ? DEVELOPMENT_CONFIG : PRODUCTION_CONFIG),
};

// Validation
if (!GOOGLE_OAUTH_CONFIG.clientId || GOOGLE_OAUTH_CONFIG.clientId.includes('replace-me')) {
  console.warn(
    '⚠️ Google OAuth Client ID not configured properly. ' +
    'Please update config/googleOAuth.ts with your actual Google Client ID from Google Cloud Console.'
  );
}

// Helper functions
export const getGoogleAuthConfig = (): GoogleOAuthConfig => {
  return GOOGLE_OAUTH_CONFIG;
};

export const getRedirectUri = (): string => {
  const { redirectScheme, redirectPath } = GOOGLE_OAUTH_CONFIG;
  return `${redirectScheme}://${redirectPath}`;
};

// OAuth URLs
export const GOOGLE_OAUTH_URLS = {
  authorization: GOOGLE_OAUTH_CONFIG.authorizationEndpoint,
  token: 'https://oauth2.googleapis.com/token',
  userInfo: 'https://www.googleapis.com/oauth2/v2/userinfo',
  revoke: 'https://oauth2.googleapis.com/revoke',
} as const;

// Additional parameters for OAuth requests
export const OAUTH_ADDITIONAL_PARAMS = {
  access_type: 'offline', // Request refresh token
  prompt: 'select_account', // Always show account picker
  include_granted_scopes: 'true', // Include previously granted scopes
} as const;

// Configuration validation function
export const validateOAuthConfig = (): boolean => {
  const config = getGoogleAuthConfig();
  
  if (!config.clientId) {
    console.error('❌ Google OAuth Client ID is required');
    return false;
  }
  
  if (config.clientId.includes('replace-me') || config.clientId.includes('dev-google-client-id')) {
    console.error('❌ Please configure actual Google OAuth Client ID');
    return false;
  }
  
  if (!config.scopes.length) {
    console.error('❌ OAuth scopes are required');
    return false;
  }
  
  console.log('✅ Google OAuth configuration is valid');
  return true;
};

// Development helper
if (isDevelopment) {
  console.log('🔧 Google OAuth Config (Development):', {
    clientId: GOOGLE_OAUTH_CONFIG.clientId.substring(0, 20) + '...',
    scopes: GOOGLE_OAUTH_CONFIG.scopes,
    redirectUri: getRedirectUri(),
  });
}