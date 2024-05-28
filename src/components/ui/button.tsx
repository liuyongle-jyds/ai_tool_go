import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { debounce } from '@/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-primary text-primary-foreground hover:bg-gradient-primary-weak rounded-full',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-full',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-full',
        secondary:
          'bg-secondary text-sm text-t3 hover:bg-secondary/80 rounded-full',
        primary:
          'bg-primary text-primary-foreground hover:bg-primary/80 rounded',
        link: 'text-t3 underline-offset-4 hover:underline rounded-full',
      },
      size: {
        default: 'h-10 px-5',
        icon: 'h-10 w-10 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  delay?: number
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, delay = 400, asChild = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'
    const debounceFn = props.onClick
      ? debounce(props.onClick, delay, true)
      : undefined
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        onClick={debounceFn}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
