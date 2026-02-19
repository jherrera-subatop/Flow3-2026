import styles from './Button.module.css';

export interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'destructive' | 'ghost';
  size?: 'l' | 'm' | 's';
  disabled?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  label,
  variant = 'primary',
  size = 'm',
  disabled = false,
  icon,
  onClick,
  type = 'button',
}: ButtonProps) {
  const classNames = [
    styles.button,
    variant !== 'primary' && styles[`button--${variant}`],
    (size === 'l' || size === 's') && styles[`button--${size}`],
    disabled && styles['button--disabled'],
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classNames}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && <span className={styles.buttonIcon} aria-hidden>{icon}</span>}
      {label}
    </button>
  );
}
