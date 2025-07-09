import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { authApi, RegisterRequest, RegisterResponse, LoginRequest, LoginResponse } from '../../services/api/auth';
import { useAuthStore, User } from '../../stores/authStore';

interface UseRegisterOptions {
  onSuccess?: (data: { user: RegisterResponse; token: LoginResponse; profile: User }) => void;
  onError?: (error: any) => void;
}

export const useRegister = (options?: UseRegisterOptions) => {
  const queryClient = useQueryClient();
  const { setAuth, setLoading } = useAuthStore();

  return useMutation({
    mutationFn: async (userData: RegisterRequest) => {
      // Step 1: Register user
      const registerResponse = await authApi.register(userData);
      
      // Step 2: Login with the same credentials to get token
      const loginRequest: LoginRequest = {
        email: userData.email,
        password: userData.password,
      };
      const tokenResponse = await authApi.login(loginRequest);
      
      // Step 3: Get user profile with the token
      // Temporarily store token to make profile request
      const tempAuthStore = useAuthStore.getState();
      tempAuthStore.setAuth({ 
        id: registerResponse.id, 
        email: registerResponse.email, 
        username: registerResponse.username, 
        createdAt: registerResponse.created_at,
        updatedAt: registerResponse.updated_at || ''
      }, tokenResponse.access_token);
      
      try {
        const userProfile = await authApi.getProfile();
        return { user: registerResponse, token: tokenResponse, profile: userProfile };
      } catch (error) {
        // If profile fetch fails, clear the temp auth
        tempAuthStore.logout();
        throw error;
      }
    },
    
    onMutate: () => {
      setLoading(true);
    },
    
    onSuccess: (data: { user: RegisterResponse; token: LoginResponse; profile: User }) => {
      // Update auth store with profile data
      setAuth(data.profile, data.token.access_token);
      
      // Clear any cached data and refetch
      queryClient.clear();
      
      // Navigate to home
      router.replace('/(tabs)');
      
      // Call custom success handler
      options?.onSuccess?.(data);
    },
    
    onError: (error) => {
      setLoading(false);
      console.error('Registration error:', error);
      
      // Call custom error handler
      options?.onError?.(error);
    },
    
    onSettled: () => {
      setLoading(false);
    },
  });
};