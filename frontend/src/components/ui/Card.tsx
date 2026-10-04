'use client';

import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  border?: boolean;
}

const paddingMap = {
  none: '0',
  sm: '12px',
  md: '16px',
  lg: '24px',
};

export const Card: React.FC<CardProps> = ({
  children,
  hoverable = false,
  hover = false,
  padding = 'md',
  border = true,
  className,
  style,
  ...rest
}) => {
  const isHoverable = hoverable || hover;

  return (
    <div
      className={className}
      style={{
        background: 'var(--bg-card, #FFFFFF)',
        border: border ? '1px solid var(--border-soft, #E4E4E7)' : 'none',
        borderRadius: 'var(--r-lg, 16px)',
        boxShadow: 'var(--shadow-xs, 0 1px 2px rgba(16,16,24,0.04))',
        padding: paddingMap[padding] ?? '16px',
        transition: 'box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease',
        ...style,
      }}
      onMouseEnter={(e) => {
        if (isHoverable) {
          e.currentTarget.style.boxShadow = 'var(--shadow-md, 0 6px 20px rgba(16,16,24,0.08))';
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.borderColor = 'var(--violet-200, #DDD6FE)';
        }
      }}
      onMouseLeave={(e) => {
        if (isHoverable) {
          e.currentTarget.style.boxShadow = 'var(--shadow-xs, 0 1px 2px rgba(16,16,24,0.04))';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.borderColor = border ? 'var(--border-soft, #E4E4E7)' : 'transparent';
        }
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;
