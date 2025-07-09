import { apiRequest } from './client';
import { User } from '../../stores/authStore';

// Request/Response types
export interface LoginRequest {
  email: string;
  password: string;
}

// Backend Token response schema
export interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

// Backend UserResponse schema  
export interface RegisterResponse {
  id: string;
  email: string;
  username: string;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string | null;
}

// Auth API functions
export const authApi = {
  /**
   * Login user with email and password
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    return apiRequest<LoginResponse>({
      method: 'POST',
      url: '/auth/login',
      data: credentials,
    });
  },

  /**
   * Register new user
   */
  register: async (userData: RegisterRequest): Promise<RegisterResponse> => {
    return apiRequest<RegisterResponse>({
      method: 'POST',
      url: '/auth/register',
      data: userData,
    });
  },

  /**
   * Get current user profile
   */
  getProfile: async (): Promise<User> => {
    return apiRequest<User>({
      method: 'GET',
      url: '/users/me',
    });
  },


  /**
   * Logout user (if backend supports it)
   */
  logout: async (): Promise<void> => {
    return apiRequest<void>({
      method: 'POST',
      url: '/auth/logout',
    });
  },
};