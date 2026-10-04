'use client';

import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  icon?: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}

const baseStyles: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  fontWeight: 600,
  borderRadius: '10px',
  cursor: 'pointer',
  border: '1px solid transparent',
  transition: 'all 0.15s ease',
  fontFamily: 'inherit',
  lineHeight: 1,
  whiteSpace: 'nowrap',
};

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: 'var(--violet-600, #6D28D9)',
    color: '#FFFFFF',
  },
  secondary: {
    background: 'var(--violet-50, #F5F3FF)',
    color: 'var(--violet-700, #5B21B6)',
  },
  outline: {
    background: 'transparent',
    color: 'var(--violet-700, #5B21B6)',
    border: '1px solid var(--violet-200, #DDD6FE)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-secondary, #52525B)',
  },
  danger: {
    background: 'var(--error, #DC2626)',
    color: '#FFFFFF',
  },
};

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: { padding: '6px 12px', fontSize: '13px' },
  md: { padding: '10px 16px', fontSize: '14px' },
  lg: { padding: '14px 24px', fontSize: '16px' },
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  icon,
  loading = false,
  fullWidth = false,
  disabled,
  style,
  children,
  className,
  ...rest
}) => {
  const actualLeftIcon = leftIcon || icon;

  return (
    <button
      className={className}
      disabled={disabled || loading}
      style={{
        ...baseStyles,
        ...variantStyles[variant],
        ...sizeStyles[size],
        width: fullWidth ? '100%' : 'auto',
        opacity: (disabled || loading) ? 0.6 : 1,
        pointerEvents: (disabled || loading) ? 'none' : 'auto',
        ...style,
      }}
      onMouseEnter={(e) => {
        if (disabled || loading) return;
        e.currentTarget.style.transform = 'translateY(-1px)';
        if (variant === 'primary') e.currentTarget.style.background = 'var(--violet-700, #5B21B6)';
        if (variant === 'outline' || variant === 'secondary') e.currentTarget.style.background = 'var(--violet-100, #EDE9FE)';
      }}
      onMouseLeave={(e) => {
        if (disabled || loading) return;
        e.currentTarget.style.transform = 'translateY(0)';
        if (variant === 'primary') e.currentTarget.style.background = 'var(--violet-600, #6D28D9)';
        if (variant === 'outline' || variant === 'secondary') {
          e.currentTarget.style.background = variant === 'outline' ? 'transparent' : 'var(--violet-50, #F5F3FF)';
        }
      }}
      {...rest}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : actualLeftIcon}
      {children}
      {rightIcon}
    </button>
  );
};

export default Button;
