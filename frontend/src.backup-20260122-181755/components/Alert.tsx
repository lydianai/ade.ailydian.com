import { HTMLAttributes } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  onClose?: () => void;
  isVisible?: boolean;
}

const Alert = ({
  variant = 'info',
  title,
  onClose,
  isVisible = true,
  className = '',
  children,
  ...props
}: AlertProps) => {
  const variants = {
    success: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-800',
      icon: CheckCircle,
      iconColor: 'text-emerald-600',
    },
    error: {
      bg: 'bg-danger-50',
      border: 'border-danger-200',
      text: 'text-danger-800',
      icon: AlertCircle,
      iconColor: 'text-danger-600',
    },
    warning: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-800',
      icon: AlertTriangle,
      iconColor: 'text-amber-600',
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: Info,
      iconColor: 'text-blue-600',
    },
  };

  const config = variants[variant];
  const Icon = config.icon;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={`
            flex items-start gap-3 p-4 rounded-lg border
            ${config.bg}
            ${config.border}
            ${config.text}
            ${className}
          `.trim().replace(/\s+/g, ' ')}
          role="alert"
          {...props}
        >
          <Icon className={`h-5 w-5 flex-shrink-0 mt-0.5 ${config.iconColor}`} />

          <div className="flex-1 min-w-0">
            {title && (
              <h3 className="font-semibold mb-1">{title}</h3>
            )}
            {children && (
              <div className="text-sm">{children}</div>
            )}
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className={`flex-shrink-0 ml-2 p-1 rounded-md hover:bg-black/5 transition-colors ${config.iconColor}`}
              aria-label="Kapat"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Alert;
