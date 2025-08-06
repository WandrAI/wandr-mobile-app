/**
 * Error Message Service
 * Strategy pattern implementation for handling error message mapping
 */

interface ErrorStrategy {
  canHandle(error: any): boolean;
  getMessage(error: any): string;
}

class StatusCodeStrategy implements ErrorStrategy {
  private statusMappings = new Map<number, string>([
    [400, 'Request failed. Please check your information and try again.'],
    [401, 'Authentication failed. Please try signing in again.'],
    [403, 'Access denied. Please check your account permissions.'],
    [429, 'Too many sign-in attempts. Please wait a moment and try again.'],
    [500, 'Server temporarily unavailable. Please try again in a moment.'],
    [502, 'Server temporarily unavailable. Please try again in a moment.'],
    [503, 'Server temporarily unavailable. Please try again in a moment.'],
    [504, 'Server temporarily unavailable. Please try again in a moment.'],
  ]);

  private specificErrorMappings = new Map<string, string>([
    ['invalid_grant', 'Authentication expired. Please try signing in again.'],
    ['authorization_code', 'Authentication expired. Please try signing in again.'],
    ['invalid_request', 'Invalid request. Please try again.'],
  ]);

  canHandle(error: any): boolean {
    const status = this.getStatus(error);
    return status > 0 && this.statusMappings.has(status);
  }

  getMessage(error: any): string {
    const status = this.getStatus(error);
    const message = this.getErrorMessage(error);

    // Check for specific error patterns first
    for (const [pattern, errorMessage] of this.specificErrorMappings.entries()) {
      if (message.includes(pattern)) {
        return errorMessage;
      }
    }

    // Fall back to status code mapping
    return this.statusMappings.get(status) || 'Request failed. Please try again.';
  }

  private getStatus(error: any): number {
    return error.status || error.response?.status || 0;
  }

  private getErrorMessage(error: any): string {
    return error.message || error.toString();
  }
}

class MessagePatternStrategy implements ErrorStrategy {
  private patternMappings = new Map<string, string>([
    ['cancelled', 'Sign-in was cancelled'],
    ['network', 'Please check your internet connection and try again'],
    ['Network', 'Please check your internet connection and try again'],
    ['Invalid state', 'Security error occurred, please try again'],
    ['Invalid token', 'Authentication failed, please try again'],
    ['unauthorized', 'Authentication failed, please try again'],
    ['rate limit', 'Too many attempts. Please wait a moment and try again.'],
    ['too many', 'Too many attempts. Please wait a moment and try again.'],
    ['invalid_client', 'App configuration error. Please contact support.'],
    ['invalid_scope', 'Permission error. Please contact support.'],
  ]);

  canHandle(error: any): boolean {
    const message = this.getErrorMessage(error);
    return Array.from(this.patternMappings.keys()).some(pattern => 
      message.includes(pattern)
    );
  }

  getMessage(error: any): string {
    const message = this.getErrorMessage(error);
    
    for (const [pattern, errorMessage] of this.patternMappings.entries()) {
      if (message.includes(pattern)) {
        return errorMessage;
      }
    }

    return 'Google sign-in failed. Please try again.';
  }

  private getErrorMessage(error: any): string {
    return error.message || error.toString();
  }
}

class DefaultStrategy implements ErrorStrategy {
  canHandle(error: any): boolean {
    return true; // Always can handle as fallback
  }

  getMessage(error: any): string {
    return 'Google sign-in failed. Please try again.';
  }
}

export class ErrorMessageService {
  private strategies: ErrorStrategy[] = [
    new StatusCodeStrategy(),
    new MessagePatternStrategy(),
    new DefaultStrategy(),
  ];

  getErrorMessage(error: any): string {
    if (!error) return 'An unknown error occurred';

    for (const strategy of this.strategies) {
      if (strategy.canHandle(error)) {
        return strategy.getMessage(error);
      }
    }

    return 'An unknown error occurred';
  }
}

// Singleton instance
export const errorMessageService = new ErrorMessageService();

// Helper function for backward compatibility
export const getGoogleAuthErrorMessage = (error: any): string => {
  return errorMessageService.getErrorMessage(error);
};