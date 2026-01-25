import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-base font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-600 text-white shadow-lg shadow-teal-500/30 hover:from-teal-700 hover:via-teal-600 hover:to-cyan-700 hover:shadow-xl hover:shadow-teal-500/50 hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-teal-500/50',
        destructive:
          'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/20 hover:from-red-700 hover:to-red-600 hover:shadow-xl hover:shadow-red-500/40 hover:scale-[1.02] active:scale-[0.98]',
        outline:
          'border-2 border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 shadow-sm hover:shadow-md active:scale-[0.98]',
        secondary:
          'bg-gray-100 text-gray-900 hover:bg-gray-200 shadow-sm hover:shadow-md',
        ghost: 'hover:bg-gray-100 active:bg-gray-200',
        link: 'text-teal-600 underline-offset-4 hover:underline hover:text-teal-700',
      },
      size: {
        default: 'h-12 px-6 py-3',
        sm: 'h-10 rounded-lg px-4 text-sm',
        lg: 'h-14 rounded-xl px-8 text-lg',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
