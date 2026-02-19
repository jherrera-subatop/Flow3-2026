import type { ReactNode, CSSProperties } from 'react';
import './Button.css';

export interface ButtonProps {
  children: ReactNode;
  size?: 'lg' | 'md';
  variant?: 'primary' | 'secondary' | 'ghost';
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
  theme?: { bg?: string; color?: string };
}

export function Button({
  children,
  size = 'lg',
  variant = 'primary',
  href,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  theme = {},
}: ButtonProps) {
  const sizeClass = size === 'lg' ? 'btnLg' : 'btnMd';
  const variantClass = variant === 'primary' ? 'btnPrimary' : variant === 'secondary' ? 'btnSecondary' : 'btnGhost';
  const classNames = `btn ${sizeClass} ${variantClass} ${className}`.trim();
  const style: CSSProperties = {
    ...(theme.bg && { background: theme.bg }),
    ...(theme.color && { color: theme.color }),
  };

  if (href) {
    return (
      <a href={href} className={classNames} style={style}>
        {children}
      </a>
    );
  }
  return (
    <button
      type={type}
      className={classNames}
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
