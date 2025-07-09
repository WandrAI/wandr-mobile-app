import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet } from 'react-native';

import { StyledText, StyledButton, StyledView } from '@/components';

export default function WelcomeScreen() {
    const router = useRouter();

    const handleContinue = () => {
        router.replace('/login');
    };

    return (
        <ImageBackground
            source={require('@/assets/images/welcome.png')}
            style={styles.container}
            resizeMode="cover"
        >
            <StatusBar style="light" />

            {/* Spacer to push content to bottom */}
            <StyledView style={styles.spacer} />

            {/* Bottom content with gradient overlay */}
            <StyledView style={styles.bottomContent}>
                {/* Gradient overlay for text readability */}
                <StyledView style={styles.gradientOverlay} />

                <StyledView style={styles.contentContainer}>
                    {/* Main message - Now using styled components */}
                    <StyledView style={styles.messageSection}>
                        <StyledText type="title" style={styles.welcomeTitle}>
                            Welcome to Wandr
                        </StyledText>
                        <StyledText style={styles.subtitle}>
                            Your AI-powered travel companion for discovering authentic experiences
                        </StyledText>
                    </StyledView>

                    {/* Continue button - Using StyledButton with proper Tamagui styling */}
                    <StyledButton 
                        onPress={handleContinue}
                        chromeless
                        style={styles.continueButton}
                        pressStyle={{
                            opacity: 0.8,
                            scale: 0.98
                        }}
                    >
                        <StyledText style={styles.continueButtonText}>
                            Get Started
                        </StyledText>
                    </StyledButton>
                </StyledView>
            </StyledView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    spacer: {
        flex: 1, // Takes up most of the screen, letting image show
    },
    bottomContent: {
        position: 'relative',
        paddingHorizontal: 32,
        paddingBottom: 50,
        paddingTop: 60,
    },
    gradientOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // Subtle gradient effect using semi-transparent background
        // (React Native doesn't support CSS gradients, so we use a uniform overlay)
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    contentContainer: {
        alignItems: 'center',
        zIndex: 1, // Ensure content is above the overlay
    },
    messageSection: {
        alignItems: 'center',
        marginBottom: 40,
        paddingTop: 8, // Extra padding to prevent text clipping
    },
    welcomeTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 16,
        letterSpacing: -0.5,
        lineHeight: 40, // Explicit line height to prevent clipping
        // Text shadow for better readability
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    subtitle: {
        fontSize: 18,
        color: 'rgba(255, 255, 255, 0.95)',
        textAlign: 'center',
        lineHeight: 26,
        paddingHorizontal: 16,
        fontWeight: '400',
        // Text shadow for better readability
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
    },
    continueButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)', // Semi-transparent white
        paddingVertical: 8,
        paddingHorizontal: 48,
        borderRadius: 16,
        width: '100%',
        alignItems: 'center',
        // Modern button shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
        // Subtle border for definition
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    continueButtonText: {
        color: '#6B46C1', // Purple to match the sunset theme
        fontSize: 18,
        fontWeight: '600',
        letterSpacing: 0.5,
        lineHeight: 24, // Explicit line height to prevent clipping
        textAlignVertical: 'center', // Center text vertically
    },
}); 