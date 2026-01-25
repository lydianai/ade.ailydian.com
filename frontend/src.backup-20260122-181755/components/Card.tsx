import { HTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      hover = false,
      padding = 'md',
      shadow = 'md',
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    const shadows = {
      none: '',
      sm: 'shadow-sm',
      md: 'shadow-card',
      lg: 'shadow-soft',
    };

    const classes = `
      bg-white rounded-xl border border-gray-200
      ${paddings[padding]}
      ${shadows[shadow]}
      ${hover ? 'transition-all duration-200 hover:shadow-hover hover:-translate-y-0.5' : ''}
      ${className}
    `.trim().replace(/\s+/g, ' ');

    if (hover) {
      return (
        <motion.div
          ref={ref}
          className={classes}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          {...props}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
