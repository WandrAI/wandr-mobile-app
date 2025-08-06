/**
 * Notification Service
 * Centralized service for handling user notifications and alerts
 */

import { Alert } from 'react-native';

export interface NotificationOptions {
  title: string;
  message: string;
  buttons?: Array<{
    text: string;
    onPress?: () => void;
    style?: 'default' | 'cancel' | 'destructive';
  }>;
}

export interface ToastOptions {
  message: string;
  duration?: number;
  type?: 'success' | 'error' | 'info' | 'warning';
}

export class NotificationService {
  /**
   * Show a native alert dialog
   */
  showAlert(options: NotificationOptions): void {
    const { title, message, buttons = [{ text: 'OK' }] } = options;
    
    Alert.alert(title, message, buttons.map(button => ({
      text: button.text,
      onPress: button.onPress,
      style: button.style,
    })));
  }

  /**
   * Show error alert with predefined styling
   */
  showError(message: string, onDismiss?: () => void): void {
    this.showAlert({
      title: 'Error',
      message,
      buttons: [{ text: 'OK', onPress: onDismiss }],
    });
  }

  /**
   * Show success alert with predefined styling
   */
  showSuccess(message: string, onDismiss?: () => void): void {
    this.showAlert({
      title: 'Success',
      message,
      buttons: [{ text: 'OK', onPress: onDismiss }],
    });
  }

  /**
   * Show confirmation dialog with Yes/No options
   */
  showConfirmation(
    message: string,
    onConfirm: () => void,
    onCancel?: () => void,
    title: string = 'Confirm'
  ): void {
    this.showAlert({
      title,
      message,
      buttons: [
        { text: 'Cancel', onPress: onCancel, style: 'cancel' },
        { text: 'OK', onPress: onConfirm },
      ],
    });
  }

  /**
   * Show authentication-specific error
   */
  showAuthError(message: string, onRetry?: () => void): void {
    const buttons = onRetry 
      ? [
          { text: 'Cancel', style: 'cancel' as const },
          { text: 'Retry', onPress: onRetry },
        ]
      : [{ text: 'OK' }];

    this.showAlert({
      title: 'Authentication Failed',
      message,
      buttons,
    });
  }

  /**
   * Show not ready warning
   */
  showNotReady(service: string = 'Service'): void {
    this.showAlert({
      title: 'Not Ready',
      message: `${service} is not ready yet. Please try again in a moment.`,
      buttons: [{ text: 'OK' }],
    });
  }
}

// Singleton instance
export const notificationService = new NotificationService();