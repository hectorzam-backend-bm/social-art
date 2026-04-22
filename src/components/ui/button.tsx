import * as React from 'react'
import { cva } from 'class-variance-authority'
import { Slot } from 'radix-ui'

import type { VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors duration-150 disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[1.5px] focus-visible:ring-gilt focus-visible:ring-offset-2 focus-visible:ring-offset-paper aria-invalid:ring-destructive/30 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-oxblood text-[color:var(--primary-foreground)] hover:bg-oxblood-soft tracking-[0.01em]',
        destructive:
          'bg-destructive text-[color:var(--destructive-foreground)] hover:opacity-90',
        outline:
          'border border-rule-strong bg-transparent text-ink hover:bg-paper-inset',
        secondary:
          'bg-paper-inset text-ink border border-rule hover:bg-paper-sunk',
        ghost: 'text-ink-soft hover:text-ink hover:bg-paper-inset',
        link: 'text-oxblood underline-offset-[6px] decoration-rule-strong hover:decoration-oxblood hover:underline p-0 h-auto',
      },
      size: {
        default: 'h-10 px-5 has-[>svg]:px-4 rounded-[2px]',
        xs: "h-6 gap-1 rounded-[1px] px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: 'h-8 rounded-[2px] gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-11 rounded-[2px] px-7 has-[>svg]:px-5 text-[0.95rem]',
        icon: 'size-10 rounded-[2px]',
        'icon-xs':
          "size-6 rounded-[1px] [&_svg:not([class*='size-'])]:size-3",
        'icon-sm': 'size-8 rounded-[2px]',
        'icon-lg': 'size-11 rounded-[2px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : 'button'

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
