import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import * as Crypto from 'expo-crypto';
import { Platform } from 'react-native';
import { googleAuthApi, GoogleAuthMobileRequest } from '../../services/api/googleAuth';
import { useAuthStore, User } from '../../stores/authStore';
import { 
  getGoogleAuthConfig, 
  getRedirectUri, 
  OAUTH_ADDITIONAL_PARAMS,
  validateOAuthConfig 
} from '../../config/googleOAuth';
import { getGoogleAuthErrorMessage } from '../../services/ErrorMessageService';

// Complete the auth session for better UX
WebBrowser.maybeCompleteAuthSession();

// Get OAuth configuration
const oauthConfig = getGoogleAuthConfig();

interface UseGoogleAuthOptions {
  onSuccess?: (data: { user: User; token: string }) => void;
  onError?: (error: any) => void;
}

export const useGoogleAuth = (options?: UseGoogleAuthOptions) => {
  const queryClient = useQueryClient();
  const { setAuth, setLoading } = useAuthStore();

  // Validate configuration before proceeding
  if (!validateOAuthConfig()) {
    console.error('❌ Google OAuth configuration is invalid');
  }

  // Create OAuth request configuration
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: oauthConfig.clientId,
      scopes: oauthConfig.scopes,
      responseType: AuthSession.ResponseType.Code,
      redirectUri: getRedirectUri(),
      codeChallenge: '', // Will be set dynamically
      codeChallengeMethod: AuthSession.CodeChallengeMethod.S256,
      state: '', // Will be set dynamically for CSRF protection
      additionalParameters: OAUTH_ADDITIONAL_PARAMS,
    },
    {
      authorizationEndpoint: oauthConfig.authorizationEndpoint,
    }
  );

  const mutation = useMutation({
    mutationFn: async () => {
      try {
        // Generate PKCE code verifier and challenge
        const codeVerifier = AuthSession.AuthRequest.createRandomCodeChallenge();
        const codeChallenge = await Crypto.digestStringAsync(
          Crypto.CryptoDigestAlgorithm.SHA256,
          codeVerifier,
          { encoding: Crypto.CryptoEncoding.BASE64URL }
        );

        // Generate random state for CSRF protection
        const state = Crypto.randomUUID();

        // Update the request with PKCE and state
        if (request) {
          request.codeChallenge = codeChallenge;
          request.state = state;
        }

        console.log('Starting Google OAuth flow...');
        console.log('Redirect URI:', request?.redirectUri);

        // Start the OAuth flow
        const result = await promptAsync();
        
        console.log('OAuth result:', result);

        if (result?.type === 'success') {
          const { code, state: returnedState } = result.params;

          // Validate state to prevent CSRF attacks
          if (returnedState !== state) {
            throw new Error('Invalid state parameter - possible CSRF attack');
          }

          if (!code) {
            throw new Error('No authorization code received');
          }

          console.log('Authorization code received, exchanging for token...');

          // Exchange authorization code for JWT token via our backend
          const authData: GoogleAuthMobileRequest = {
            code,
            code_verifier: codeVerifier,
            state,
          };

          const response = await googleAuthApi.authenticateWithGoogle(authData);
          
          console.log('Google authentication successful');

          return {
            user: response.user,
            token: response.access_token,
          };
        } else if (result?.type === 'cancel') {
          throw new Error('Authentication was cancelled');
        } else {
          throw new Error(`Authentication failed: ${result?.type || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Google Auth Error:', error);
        throw error;
      }
    },

    onMutate: () => {
      setLoading(true);
      console.log('Starting Google authentication...');
    },

    onSuccess: (data: { user: User; token: string }) => {
      // Update auth store
      setAuth(data.user, data.token);
      
      // Clear cached data and refetch
      queryClient.clear();
      
      console.log('Google authentication completed successfully');
      
      // Navigate to home
      router.replace('/(tabs)');
      
      // Call custom success handler
      options?.onSuccess?.(data);
    },

    onError: (error) => {
      setLoading(false);
      console.error('Google authentication failed:', error);
      
      // Call custom error handler
      options?.onError?.(error);
    },

    onSettled: () => {
      setLoading(false);
    },
  });

  return {
    signInWithGoogle: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
    isReady: !!request, // OAuth request is ready
  };
};

// Export the error message function for backward compatibility
export { getGoogleAuthErrorMessage };