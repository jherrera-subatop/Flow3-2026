import React from 'react';
import styles from './Button.module.css';

export interface ButtonProps {
  label: string;
  variant?: 'default' | 'primary' | 'secondary' | 'destructive' | 'ghost';
  size?: 's' | 'm' | 'l';
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
}

export function Button({
  label,
  variant = 'default',
  size = 'm',
  disabled = false,
  onClick,
  type = 'button',
  icon,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={disabled ? `${styles.button} ${styles['button--disabled']}` : styles.button}
      disabled={disabled}
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
}
