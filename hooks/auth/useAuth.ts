import { useQuery } from '@tanstack/react-query';
import { authApi } from '../../services/api/auth';
import { useAuthStore } from '../../stores/authStore';

export const useAuthProfile = () => {
  const { token, isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['auth', 'profile'],
    queryFn: authApi.getProfile,
    enabled: isAuthenticated && !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};

export const useLogout = () => {
  const { logout } = useAuthStore();

  return () => {
    logout();
    // Note: Could also call authApi.logout() here if backend supports it
  };
};

// Re-export the auth store hook for convenience
export { useAuth } from '../../stores/authStore';