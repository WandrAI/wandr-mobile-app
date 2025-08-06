/**
 * Button Configuration Factory
 * Factory pattern to eliminate duplicate switch logic for button configurations
 */

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonVariant = 'outline' | 'filled';

export interface ButtonConfig {
  size: string;
  fontSize: string;
}

export interface StyleConfig {
  backgroundColor: string;
  borderWidth: number;
  textColor: string;
  iconColor: string;
}

class ButtonConfigFactory {
  private sizeConfigMap = new Map<ButtonSize, ButtonConfig>([
    ['small', { size: '$4', fontSize: '$3' }],
    ['medium', { size: '$5', fontSize: '$4' }],
    ['large', { size: '$6', fontSize: '$5' }],
  ]);

  private variantConfigMap = new Map<ButtonVariant, Partial<StyleConfig>>([
    ['outline', {
      backgroundColor: 'transparent',
      borderWidth: 1,
      textColor: '$color12',
      iconColor: '$blue10',
    }],
    ['filled', {
      backgroundColor: '$blue10',
      borderWidth: 0,
      textColor: 'white',
      iconColor: 'white',
    }],
  ]);

  /**
   * Get button size configuration
   */
  getSizeConfig(size: ButtonSize): ButtonConfig {
    const config = this.sizeConfigMap.get(size);
    if (!config) {
      console.warn(`Unknown button size: ${size}, falling back to 'large'`);
      return this.sizeConfigMap.get('large')!;
    }
    return config;
  }

  /**
   * Get button variant configuration
   */
  getVariantConfig(variant: ButtonVariant): Partial<StyleConfig> {
    const config = this.variantConfigMap.get(variant);
    if (!config) {
      console.warn(`Unknown button variant: ${variant}, falling back to 'outline'`);
      return this.variantConfigMap.get('outline')!;
    }
    return config;
  }

  /**
   * Get complete button configuration
   */
  getButtonConfig(size: ButtonSize, variant: ButtonVariant) {
    return {
      ...this.getSizeConfig(size),
      ...this.getVariantConfig(variant),
    };
  }

  /**
   * Check if size is valid
   */
  isValidSize(size: string): size is ButtonSize {
    return this.sizeConfigMap.has(size as ButtonSize);
  }

  /**
   * Check if variant is valid
   */
  isValidVariant(variant: string): variant is ButtonVariant {
    return this.variantConfigMap.has(variant as ButtonVariant);
  }

  /**
   * Get all available sizes
   */
  getAvailableSizes(): ButtonSize[] {
    return Array.from(this.sizeConfigMap.keys());
  }

  /**
   * Get all available variants
   */
  getAvailableVariants(): ButtonVariant[] {
    return Array.from(this.variantConfigMap.keys());
  }
}

// Singleton instance
export const buttonConfigFactory = new ButtonConfigFactory();

// Helper functions for backward compatibility
export const getButtonSize = (size: ButtonSize): string => {
  return buttonConfigFactory.getSizeConfig(size).size;
};

export const getFontSize = (size: ButtonSize): string => {
  return buttonConfigFactory.getSizeConfig(size).fontSize;
};

export const getButtonConfig = (size: ButtonSize, variant: ButtonVariant) => {
  return buttonConfigFactory.getButtonConfig(size, variant);
};