import { Button } from 'tamagui'

// Re-export the base Button with consistent naming for future UI library migrations
export const StyledButton = Button

export type StyledButtonProps = React.ComponentProps<typeof Button> 