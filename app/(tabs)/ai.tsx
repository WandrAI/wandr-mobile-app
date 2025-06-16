import React from 'react';
import { StyledView, StyledText } from '@/components';

export default function AiScreen() {
  return (
    <StyledView flex={1} padding="$4" backgroundColor="$background">
      <StyledView flex={1} justifyContent="center" alignItems="center">
        <StyledText type="title" textAlign="center" marginBottom="$4">
          AI Travel Assistant
        </StyledText>
        <StyledText type="body" textAlign="center" color="$color11">
          Your personal travel companion powered by AI.{'\n'}
          Get instant help with planning, recommendations, and travel decisions.
        </StyledText>
        <StyledView 
          marginTop="$6" 
          padding="$4" 
          backgroundColor="$blue3" 
          borderRadius="$4"
          width="100%"
        >
          <StyledText type="caption" textAlign="center" color="$blue11">
            Coming in Phase 2 • Real-time conversational assistance
          </StyledText>
        </StyledView>
      </StyledView>
    </StyledView>
  );
} 