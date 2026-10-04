import React from 'react';

export type BadgeTone = 'violet' | 'gray' | 'success' | 'warning' | 'error' | 'default' | 'primary' | 'info' | 'outline';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  variant?: BadgeTone;
  size?: 'sm' | 'md';
  dot?: boolean;
}

const toneStyles: Record<string, React.CSSProperties> = {
  violet: {
    background: 'var(--violet-50, #F5F3FF)',
    color: 'var(--violet-700, #5B21B6)',
    border: '1px solid var(--violet-200, #DDD6FE)',
  },
  primary: {
    background: 'var(--violet-50, #F5F3FF)',
    color: 'var(--violet-700, #5B21B6)',
    border: '1px solid var(--violet-200, #DDD6FE)',
  },
  gray: {
    background: '#F4F4F5',
    color: 'var(--text-secondary, #52525B)',
    border: '1px solid #E4E4E7',
  },
  default: {
    background: '#F4F4F5',
    color: 'var(--text-secondary, #52525B)',
    border: '1px solid #E4E4E7',
  },
  success: {
    background: '#ECFDF5',
    color: 'var(--success, #16A34A)',
    border: '1px solid #A7F3D0',
  },
  warning: {
    background: '#FFFBEB',
    color: 'var(--warning, #D97706)',
    border: '1px solid #FDE68A',
  },
  error: {
    background: '#FEF2F2',
    color: 'var(--error, #DC2626)',
    border: '1px solid #FECACA',
  },
  info: {
    background: '#EFF6FF',
    color: '#2563EB',
    border: '1px solid #BFDBFE',
  },
  outline: {
    background: 'transparent',
    color: 'var(--text-secondary, #52525B)',
    border: '1px solid var(--border-soft, #E4E4E7)',
  },
};

export const Badge: React.FC<BadgeProps> = ({
  tone,
  variant,
  size = 'md',
  dot = false,
  children,
  className,
  style,
  ...rest
}) => {
  const activeTone = tone || variant || 'gray';
  const resolvedStyle = toneStyles[activeTone] || toneStyles.gray;

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: size === 'sm' ? '2px 8px' : '3px 10px',
        borderRadius: 'var(--r-pill, 999px)',
        fontSize: size === 'sm' ? '11px' : '12px',
        fontWeight: 600,
        lineHeight: 1.4,
        whiteSpace: 'nowrap',
        ...resolvedStyle,
        ...style,
      }}
      {...rest}
    >
      {dot && (
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: 'currentColor',
          }}
        />
      )}
      {children}
    </span>
  );
};

export default Badge;
