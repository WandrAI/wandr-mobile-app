import { useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView, YStack, XStack } from 'tamagui';

import { StyledText, StyledButton, StyledView, StyledInput } from '@/components';
import { useLogin } from '@/hooks/auth';
import { LoginRequest } from '@/services/api/auth';

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginScreen() {
  const router = useRouter();
  const { control, handleSubmit, formState: { isValid } } = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const login = useLogin({
    onError: (error) => {
      Alert.alert(
        'Login Failed',
        error.message || 'Please check your credentials and try again.',
        [{ text: 'OK' }]
      );
    },
  });

  const onSubmit = (data: LoginForm) => {
    const loginRequest: LoginRequest = {
      email: data.email.trim().toLowerCase(),
      password: data.password,
    };
    
    login.mutate(loginRequest);
  };

  const handleBackToWelcome = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="dark" />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <StyledView style={styles.content}>
          {/* Header */}
          <YStack gap="$4" marginBottom="$8">
            <StyledText type="title" style={styles.title}>
              Welcome Back
            </StyledText>
            <StyledText style={styles.subtitle}>
              Sign in to continue your travel journey
            </StyledText>
          </YStack>

          {/* Login Form */}
          <YStack gap="$6" width="100%">
            <YStack gap="$4">
              <StyledInput
                control={control}
                name="email"
                label="Email Address"
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                textContentType="emailAddress"
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter a valid email address',
                  },
                }}
              />

              <StyledInput
                control={control}
                name="password"
                label="Password"
                placeholder="Enter your password"
                secureTextEntry
                autoComplete="current-password"
                textContentType="password"
                rules={{
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                }}
              />
            </YStack>

            {/* Login Button */}
            <StyledButton 
              size="$6"
              theme="blue"
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid || login.isPending}
              opacity={!isValid || login.isPending ? 0.6 : 1}
            >
              {login.isPending ? (
                <StyledText color="white" fontSize="$5" fontWeight="600">
                  Signing In...
                </StyledText>
              ) : (
                <StyledText color="white" fontSize="$5" fontWeight="600">
                  Sign In
                </StyledText>
              )}
            </StyledButton>

            {/* Forgot Password - Future feature */}
            <XStack justifyContent="center" marginTop="$4">
              <StyledButton
                chromeless
                onPress={() => {
                  Alert.alert(
                    'Forgot Password',
                    'This feature will be available soon!',
                    [{ text: 'OK' }]
                  );
                }}
              >
                <StyledText type="link" fontSize="$4">
                  Forgot Password?
                </StyledText>
              </StyledButton>
            </XStack>
          </YStack>

          {/* Back to Welcome */}
          <XStack justifyContent="center" marginTop="$8">
            <StyledButton
              chromeless
              onPress={handleBackToWelcome}
            >
              <StyledText fontSize="$4" color="$color11">
                ← Back to Welcome
              </StyledText>
            </StyledButton>
          </XStack>

          {/* Sign Up Link - Future feature */}
          <XStack justifyContent="center" marginTop="$6">
            <StyledText fontSize="$4" color="$color11">
              Don&apos;t have an account?{' '}
            </StyledText>
            <StyledButton
              chromeless
              onPress={() => {
                Alert.alert(
                  'Sign Up',
                  'Registration will be available soon!',
                  [{ text: 'OK' }]
                );
              }}
            >
              <StyledText type="link" fontSize="$4">
                Sign Up
              </StyledText>
            </StyledButton>
          </XStack>
        </StyledView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 80, // Account for status bar
    paddingBottom: 40,
    justifyContent: 'center',
    minHeight: '100%',
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 24,
  },
});