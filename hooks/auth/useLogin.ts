import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { authApi, LoginRequest, LoginResponse } from '../../services/api/auth';
import { useAuthStore, User } from '../../stores/authStore';

interface UseLoginOptions {
  onSuccess?: (data: { token: LoginResponse; user: User }) => void;
  onError?: (error: any) => void;
}

export const useLogin = (options?: UseLoginOptions) => {
  const queryClient = useQueryClient();
  const { setAuth, setLoading } = useAuthStore();

  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      // Step 1: Login to get token
      const tokenResponse = await authApi.login(credentials);
      
      // Step 2: Get user profile with the token
      // We need to temporarily store the token to make the profile request
      const tempAuthStore = useAuthStore.getState();
      tempAuthStore.setAuth({ id: '', email: '', username: '', createdAt: '', updatedAt: '' }, tokenResponse.access_token);
      
      try {
        const userProfile = await authApi.getProfile();
        return { token: tokenResponse, user: userProfile };
      } catch (error) {
        // If profile fetch fails, clear the temp auth
        tempAuthStore.logout();
        throw error;
      }
    },
    
    onMutate: () => {
      setLoading(true);
    },
    
    onSuccess: (data: { token: LoginResponse; user: User }) => {
      // Update auth store with real user data
      setAuth(data.user, data.token.access_token);
      
      // Clear any cached data and refetch
      queryClient.clear();
      
      // Navigate to home
      router.replace('/(tabs)');
      
      // Call custom success handler
      options?.onSuccess?.(data);
    },
    
    onError: (error) => {
      setLoading(false);
      console.error('Login error:', error);
      
      // Call custom error handler
      options?.onError?.(error);
    },
    
    onSettled: () => {
      setLoading(false);
    },
  });
};