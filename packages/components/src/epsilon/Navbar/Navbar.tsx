import type { ReactNode, CSSProperties } from 'react';
import './Navbar.css';

export interface NavbarProps {
  children?: ReactNode;
  className?: string;
  theme?: { bg?: string; border?: string };
}

export function Navbar({ children, className = '', theme = {} }: NavbarProps) {
  const style: CSSProperties = {
    ...(theme.bg && { background: theme.bg }),
    ...(theme.border && { ['--navbar-border' as string]: theme.border }),
  };
  return (
    <header className={`navbar ${className}`.trim()} style={style} role="banner">
      <div className="navbarContent">{children}</div>
    </header>
  );
}
