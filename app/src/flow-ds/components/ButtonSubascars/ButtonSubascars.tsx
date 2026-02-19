import styles from './ButtonSubascars.module.css';

export type ButtonSubascarsVariant = 'primary' | 'plain' | 'tertiary' | 'critical';
export type ButtonSubascarsSize = 'slim' | 'medium' | 'large';

export interface ButtonSubascarsProps {
  label: string;
  variant?: ButtonSubascarsVariant;
  size?: ButtonSubascarsSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export function ButtonSubascars({
  label,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  onClick,
  type = 'button',
}: ButtonSubascarsProps) {
  const classNames = [
    styles.button,
    variant !== 'primary' && styles[`button--${variant}`],
    size !== 'medium' && styles[`button--${size}`],
    fullWidth && styles.buttonFullWidth,
    loading && styles.buttonLoading,
    disabled && styles.buttonDisabled,
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classNames}
      disabled={disabled || loading}
      onClick={onClick}
      aria-busy={loading}
    >
      {icon && !loading && <span className={styles.buttonIcon} aria-hidden>{icon}</span>}
      {label}
    </button>
  );
}
