import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Button, XStack, Text, Spinner } from 'tamagui';
import { useGoogleAuth, getGoogleAuthErrorMessage } from '../../../hooks/auth';

interface GoogleSignInButtonProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'outline' | 'filled';
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
      Alert.alert(
        'Google Sign-In Failed',
        errorMessage,
        [{ text: 'OK' }]
      );
      
      // Call custom error handler
      onError?.(errorMessage);
    },
  });

  const handlePress = () => {
    if (!isReady) {
      Alert.alert(
        'Not Ready',
        'Google Sign-In is not ready yet. Please try again in a moment.',
        [{ text: 'OK' }]
      );
      return;
    }

    signInWithGoogle();
  };

  const getButtonSize = () => {
    switch (size) {
      case 'small':
        return '$4';
      case 'medium':
        return '$5';
      case 'large':
      default:
        return '$6';
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'small':
        return '$3';
      case 'medium':
        return '$4';
      case 'large':
      default:
        return '$5';
    }
  };

  const isDisabled = disabled || isLoading || !isReady;

  return (
    <Button
      size={getButtonSize()}
      backgroundColor={variant === 'filled' ? '$blue10' : 'transparent'}
      borderColor="$borderColor"
      borderWidth={variant === 'outline' ? 1 : 0}
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
          <Spinner size="small" color={variant === 'filled' ? 'white' : '$blue10'} />
        ) : (
          // Google "G" logo placeholder - in production, you'd use the actual Google logo
          <Text 
            fontSize="$6" 
            fontWeight="bold" 
            color={variant === 'filled' ? 'white' : '$blue10'}
          >
            G
          </Text>
        )}
        
        <Text
          fontSize={getFontSize()}
          fontWeight="600"
          color={variant === 'filled' ? 'white' : '$color12'}
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