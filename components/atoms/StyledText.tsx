import { Text, styled } from 'tamagui'

// Base styled text component with theme-aware colors
export const StyledText = styled(Text, {
  name: 'StyledText',
  color: '$color',
  fontFamily: '$body',

  variants: {
    type: {
      default: {
        fontSize: '$4',
        lineHeight: '$6',
      },
      title: {
        fontSize: '$10',
        fontWeight: 'bold',
        lineHeight: '$10',
      },
      subtitle: {
        fontSize: '$6',
        fontWeight: 'bold',
        lineHeight: '$6',
      },
      defaultSemiBold: {
        fontSize: '$4',
        fontWeight: '600',
        lineHeight: '$6',
      },
      link: {
        fontSize: '$4',
        lineHeight: '$7',
        color: '$blue10',
        textDecorationLine: 'underline',
      },
      caption: {
        fontSize: '$2',
        opacity: 0.7,
      },
    },
    variant: {
      primary: {
        color: '$color',
      },
      secondary: {
        color: '$color11',
      },
      muted: {
        color: '$color10',
      },
    },
  } as const,

  defaultVariants: {
    type: 'default',
    variant: 'primary',
  },
})

export type StyledTextProps = React.ComponentProps<typeof StyledText> 