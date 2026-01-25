import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { LucideIcon, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      type = 'text',
      fullWidth = true,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || `input-${label?.toLowerCase().replace(/\s/g, '-')}`;
    const isPasswordField = type === 'password';

    const inputType = isPasswordField && showPassword ? 'text' : type;

    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            {label}
            {props.required && <span className="text-danger-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {LeftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LeftIcon className="h-5 w-5 text-gray-400" />
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={inputType}
            className={`
              block w-full rounded-lg border-gray-300 shadow-sm
              transition-all duration-200
              focus:border-primary-500 focus:ring-primary-500
              disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
              ${LeftIcon ? 'pl-10' : 'pl-4'}
              ${isPasswordField || RightIcon ? 'pr-10' : 'pr-4'}
              ${error ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-500' : ''}
              ${className}
              py-2.5 text-base
            `.trim().replace(/\s+/g, ' ')}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...props}
          />

          {isPasswordField && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          )}

          {!isPasswordField && RightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <RightIcon className="h-5 w-5 text-gray-400" />
            </div>
          )}

          {error && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <AlertCircle className="h-5 w-5 text-danger-500" />
            </div>
          )}
        </div>

        {error && (
          <p className="mt-1.5 text-sm text-danger-600 flex items-center" id={`${inputId}-error`}>
            <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
            {error}
          </p>
        )}

        {!error && helperText && (
          <p className="mt-1.5 text-sm text-gray-500" id={`${inputId}-helper`}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
