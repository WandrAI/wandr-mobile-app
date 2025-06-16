import { View, styled } from 'tamagui'

// Base styled view component with theme-aware colors and layout utilities
export const StyledView = styled(View, {
  name: 'StyledView',
  background: '$background',

  variants: {
    variant: {
      default: {
        background: '$background',
      },
      card: {
        background: '$background',
        borderRadius: '$4',
        padding: '$4',
        borderWidth: 1,
        borderColor: '$borderColor',
      },
      surface: {
        background: '$background025',
        borderRadius: '$3',
      },
      transparent: {
        background: 'transparent',
      },
    },
    padding: {
      none: { padding: 0 },
      xs: { padding: '$1' },
      sm: { padding: '$2' },
      md: { padding: '$4' },
      lg: { padding: '$6' },
      xl: { padding: '$8' },
    },
    margin: {
      none: { margin: 0 },
      xs: { margin: '$1' },
      sm: { margin: '$2' },
      md: { margin: '$4' },
      lg: { margin: '$6' },
      xl: { margin: '$8' },
    },
    flex: {
      1: { flex: 1 },
      center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      column: {
        flexDirection: 'column',
      },
    },
  } as const,

  defaultVariants: {
    variant: 'default',
  },
})

export type StyledViewProps = React.ComponentProps<typeof StyledView> 