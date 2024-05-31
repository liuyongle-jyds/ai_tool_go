import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-lg border border-input bg-background px-2 text-xs outline-none ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-t3 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 md:h-12 md:px-5 md:text-sm',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
