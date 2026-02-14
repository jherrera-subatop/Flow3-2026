import React from 'react';
import './Sidebar.css';

export interface SidebarNavItem {
  label: string;
  href?: string;
  icon?: string;
  onClick?: () => void;
}

export interface SidebarSupportItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface SidebarProps {
  logoTitle: string;
  logoSub?: string;
  navItems?: SidebarNavItem[];
  supportLabel?: string;
  supportItems?: SidebarSupportItem[];
  className?: string;
  theme?: {
    bg?: string;
    text?: string;
    muted?: string;
    itemHover?: string;
  };
}

export function Sidebar({
  logoTitle,
  logoSub,
  navItems = [],
  supportLabel = 'SOPORTE',
  supportItems = [],
  className = '',
  theme = {},
}: SidebarProps) {
  const rootStyle: React.CSSProperties = {
    ...(theme.bg && { background: theme.bg }),
    ...(theme.text && { color: theme.text }),
    ...(theme.itemHover && { ['--sidebar-item-hover' as string]: theme.itemHover }),
  };
  const subStyle = theme.muted ? { opacity: 0.85, color: theme.muted } : undefined;

  return (
    <aside
      className={`sidebar ${className}`.trim()}
      style={rootStyle}
      aria-label="Navegación principal"
    >
      <div className="sidebarLogo">
        <span className="sidebarLogoTitle">{logoTitle}</span>
        {logoSub && <span className="sidebarLogoSub" style={subStyle}>{logoSub}</span>}
      </div>
      <nav className="sidebarNav">
        {navItems.map((item) => {
          const content = (
            <>
              {item.icon && <span>{item.icon}</span>}
              <span>{item.label}</span>
              <span style={{ marginLeft: 'auto' }}>→</span>
            </>
          );
          if (item.href) {
            return (
              <a key={item.label} href={item.href} className="sidebarNavItem">
                {content}
              </a>
            );
          }
          return (
            <button key={item.label} type="button" className="sidebarNavItem" onClick={item.onClick}>
              {content}
            </button>
          );
        })}
        {supportItems.length > 0 && (
          <>
            <div className="sidebarSectionLabel" style={subStyle}>{supportLabel}</div>
            {supportItems.map((item) =>
              item.href ? (
                <a key={item.label} href={item.href} className="sidebarNavItem">{item.label} →</a>
              ) : (
                <button key={item.label} type="button" className="sidebarNavItem" onClick={item.onClick}>
                  {item.label} →
                </button>
              )
            )}
          </>
        )}
      </nav>
    </aside>
  );
}
