import * as React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-12 w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-[15px] font-medium text-gray-900 placeholder:text-gray-400 placeholder:font-normal transition-all duration-200',
          'hover:border-gray-300',
          'focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 focus:shadow-lg focus:shadow-teal-500/5',
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
