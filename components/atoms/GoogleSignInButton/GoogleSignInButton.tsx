import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, XStack, Text, Spinner } from 'tamagui';
import { useGoogleAuth, getGoogleAuthErrorMessage } from '../../../hooks/auth';
import { notificationService } from '../../../services/NotificationService';
import { getButtonConfig, ButtonSize, ButtonVariant } from '../../../utils/ButtonConfigFactory';

interface GoogleSignInButtonProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  disabled?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

export const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  onSuccess,
  onError,
  disabled = false,
  size = 'large',
  variant = 'outline',
}) => {
  const { signInWithGoogle, isLoading, isReady } = useGoogleAuth({
    onSuccess: () => {
      onSuccess?.();
    },
    onError: (error) => {
      const errorMessage = getGoogleAuthErrorMessage(error);
      
      // Show alert to user
      notificationService.showAuthError(errorMessage);
      
      // Call custom error handler
      onError?.(errorMessage);
    },
  });

  const handlePress = () => {
    if (!isReady) {
      notificationService.showNotReady('Google Sign-In');
      return;
    }

    signInWithGoogle();
  };

  const config = getButtonConfig(size, variant);
  const isDisabled = disabled || isLoading || !isReady;

  return (
    <Button
      size={config.size}
      backgroundColor={config.backgroundColor}
      borderColor="$borderColor"
      borderWidth={config.borderWidth}
      onPress={handlePress}
      disabled={isDisabled}
      opacity={isDisabled ? 0.6 : 1}
      pressStyle={{
        opacity: 0.8,
        scale: 0.98,
      }}
      animation="quick"
      style={styles.button}
    >
      <XStack alignItems="center" gap="$3">
        {isLoading ? (
          <Spinner size="small" color={config.iconColor} />
        ) : (
          // Google "G" logo placeholder - in production, you'd use the actual Google logo
          <Text 
            fontSize="$6" 
            fontWeight="bold" 
            color={config.iconColor}
          >
            G
          </Text>
        )}
        
        <Text
          fontSize={config.fontSize}
          fontWeight="600"
          color={config.textColor}
        >
          {isLoading ? 'Signing In...' : 'Continue with Google'}
        </Text>
      </XStack>
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
  },
});