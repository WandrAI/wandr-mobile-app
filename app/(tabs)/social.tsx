import React from 'react';
import { StyledView, StyledText } from '@/components';

export default function SocialScreen() {
  return (
    <StyledView flex={1} padding="$4" backgroundColor="$background">
      <StyledView flex={1} justifyContent="center" alignItems="center">
        <StyledText type="title" textAlign="center" marginBottom="$4">
          Social Travel
        </StyledText>
        <StyledText type="body" textAlign="center" color="$color11">
          Plan trips with friends and family.{'\n'}
          Share experiences, collaborate on itineraries, and travel together.
        </StyledText>
        <StyledView 
          marginTop="$6" 
          padding="$4" 
          backgroundColor="$green3" 
          borderRadius="$4"
          width="100%"
        >
          <StyledText type="caption" textAlign="center" color="$green11">
            Coming in Phase 3 • Group planning & collaboration
          </StyledText>
        </StyledView>
      </StyledView>
    </StyledView>
  );
} 