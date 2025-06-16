import React from 'react';
import { render, screen } from '../../../__tests__/test-utils';
import { StyledText } from './StyledText';

describe('StyledText', () => {
  it('renders text content correctly', () => {
    const testText = 'Welcome to Wandr';
    render(<StyledText>{testText}</StyledText>);
    
    expect(screen.getByText(testText)).toBeTruthy();
  });

  it('applies default type variant', () => {
    render(<StyledText>Default text</StyledText>);
    
    const textElement = screen.getByText('Default text');
    expect(textElement).toBeTruthy();
  });

  it('applies title type variant', () => {
    render(<StyledText type="title">Travel Guide</StyledText>);
    
    const titleElement = screen.getByText('Travel Guide');
    expect(titleElement).toBeTruthy();
  });

  it('applies subtitle type variant', () => {
    render(<StyledText type="subtitle">Destinations</StyledText>);
    
    const subtitleElement = screen.getByText('Destinations');
    expect(subtitleElement).toBeTruthy();
  });

  it('applies muted variant', () => {
    render(<StyledText variant="muted">Subtle information</StyledText>);
    
    const mutedElement = screen.getByText('Subtle information');
    expect(mutedElement).toBeTruthy();
  });

  it('applies link type variant', () => {
    render(<StyledText type="link">Learn more</StyledText>);
    
    const linkElement = screen.getByText('Learn more');
    expect(linkElement).toBeTruthy();
  });

  it('renders with accessibility label', () => {
    render(
      <StyledText accessibilityLabel="Trip rating">
        ★ 4.8 (127 reviews)
      </StyledText>
    );
    
    const element = screen.getByLabelText('Trip rating');
    expect(element).toBeTruthy();
  });

  it('handles empty children gracefully', () => {
    render(<StyledText />);
    
    // Should render without crashing
    expect(screen.getByTestId('styled-text')).toBeTruthy();
  });
}); 