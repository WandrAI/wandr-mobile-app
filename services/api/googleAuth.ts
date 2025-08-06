import { apiRequest } from './client';
import { User } from '../../stores/authStore';

// Google OAuth request/response types (aligned with backend schemas)
export interface GoogleAuthMobileRequest {
  code: string;
  code_verifier: string;
  state: string;
}

export interface GoogleAuthMobileResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}

export interface GoogleAccountLinkRequest {
  googleToken: string;
}

export interface GoogleAccountLinkResponse {
  message: string;
  linked: boolean;
}

// Google OAuth API functions
export const googleAuthApi = {
  /**
   * Authenticate mobile user with Google OAuth and PKCE
   */
  authenticateWithGoogle: async (authData: GoogleAuthMobileRequest): Promise<GoogleAuthMobileResponse> => {
    return apiRequest<GoogleAuthMobileResponse>({
      method: 'POST',
      url: '/auth/google/mobile',
      data: authData,
    });
  },

  /**
   * Link Google account to existing user account
   */
  linkGoogleAccount: async (linkData: GoogleAccountLinkRequest): Promise<GoogleAccountLinkResponse> => {
    return apiRequest<GoogleAccountLinkResponse>({
      method: 'POST',
      url: '/auth/google/link',
      data: linkData,
    });
  },

  /**
   * Unlink Google account from user account
   */
  unlinkGoogleAccount: async (): Promise<{ message: string }> => {
    return apiRequest<{ message: string }>({
      method: 'DELETE',
      url: '/auth/google/unlink',
    });
  },

  /**
   * Get list of linked authentication providers
   */
  getLinkedProviders: async (): Promise<{ providers: string[] }> => {
    return apiRequest<{ providers: string[] }>({
      method: 'GET',
      url: '/auth/providers',
    });
  },
};