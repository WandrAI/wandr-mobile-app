import { forwardRef } from 'react';
import { Input, styled, YStack } from 'tamagui';
import { Controller, Control } from 'react-hook-form';

import { StyledText } from '../StyledText';

// Base styled input component with theme-aware styling
const BaseInput = styled(Input, {
  name: 'StyledInput',
  background: '$background',
  borderColor: '$borderColor',
  borderWidth: 1,
  fontSize: '$4',
  paddingHorizontal: '$4',
  paddingVertical: '$3',
  color: '$color',
  placeholderTextColor: '$placeholderColor',
  
  variants: {
    variant: {
      default: {
        borderColor: '$borderColor',
        focusStyle: {
          borderColor: '$blue8',
          outlineColor: '$blue8',
        },
      },
      error: {
        borderColor: '$red8',
        focusStyle: {
          borderColor: '$red8',
          outlineColor: '$red8',
        },
      },
    },
    size: {
      default: {
        height: 48,
        fontSize: '$4',
      },
      large: {
        height: 56,
        fontSize: '$5',
      },
    },
  } as const,

  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface StyledInputProps extends React.ComponentProps<typeof BaseInput> {
  label?: string;
  error?: string;
  helperText?: string;
  // React Hook Form integration
  control?: Control<any>;
  name?: string;
  rules?: any;
}

export const StyledInput = forwardRef<
  React.ElementRef<typeof BaseInput>,
  StyledInputProps
>(({ label, error, helperText, control, name, rules, variant, ...props }, ref) => {
  const inputVariant = error ? 'error' : variant || 'default';

  // If using React Hook Form
  if (control && name) {
    return (
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value }, fieldState: { error: fieldError } }) => (
          <YStack gap="$2">
            {label && (
              <StyledText variant="secondary" fontSize="$3" fontWeight="600">
                {label}
              </StyledText>
            )}
            <BaseInput
              ref={ref}
              variant={fieldError ? 'error' : inputVariant}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              {...props}
            />
            {fieldError && (
              <StyledText variant="secondary" fontSize="$2" color="$red10">
                {fieldError.message}
              </StyledText>
            )}
            {helperText && !fieldError && (
              <StyledText variant="secondary" fontSize="$2" opacity={0.7}>
                {helperText}
              </StyledText>
            )}
          </YStack>
        )}
      />
    );
  }

  // Standalone input without React Hook Form
  return (
    <YStack gap="$2">
      {label && (
        <StyledText variant="secondary" fontSize="$3" fontWeight="600">
          {label}
        </StyledText>
      )}
      <BaseInput
        ref={ref}
        variant={inputVariant}
        {...props}
      />
      {error && (
        <StyledText variant="secondary" fontSize="$2" color="$red10">
          {error}
        </StyledText>
      )}
      {helperText && !error && (
        <StyledText variant="secondary" fontSize="$2" opacity={0.7}>
          {helperText}
        </StyledText>
      )}
    </YStack>
  );
});

StyledInput.displayName = 'StyledInput';

export type StyledInputRef = React.ElementRef<typeof BaseInput>;