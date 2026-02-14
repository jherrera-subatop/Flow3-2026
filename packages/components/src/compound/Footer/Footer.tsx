import React from 'react';
import './Footer.css';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterProps {
  brandTitle: string;
  brandSub?: string;
  brandDescription?: string;
  columns?: FooterColumn[];
  copyright?: string;
  bottomLinks?: FooterLink[];
  className?: string;
  theme?: { bg?: string; text?: string; muted?: string };
}

export function Footer({
  brandTitle,
  brandSub,
  brandDescription,
  columns = [],
  copyright: copyrightText,
  bottomLinks = [],
  className = '',
  theme = {},
}: FooterProps) {
  const rootStyle: React.CSSProperties = {
    ...(theme.bg && { background: theme.bg }),
    ...(theme.text && { color: theme.text }),
  };

  return (
    <footer className={`footer ${className}`.trim()} style={rootStyle} role="contentinfo">
      <div className="footerGrid">
        <div className="footerBrand">
          <strong>{brandTitle}</strong>
          {brandSub && <p>{brandSub}</p>}
          {brandDescription && <p>{brandDescription}</p>}
        </div>
        {columns.map((col) => (
          <div key={col.title} className="footerColumn">
            <h4>{col.title}</h4>
            {col.links.map((link) => (
              <a key={link.label} href={link.href}>{link.label}</a>
            ))}
          </div>
        ))}
      </div>
      <div className="footerBottom">
        {copyrightText && <p>{copyrightText}</p>}
        {bottomLinks.length > 0 && (
          <div className="footerBottomLinks">
            {bottomLinks.map((link) => (
              <a key={link.label} href={link.href}>{link.label}</a>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}
