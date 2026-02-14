import React from 'react';
import './HelpBanner.css';

export interface HelpBannerProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  className?: string;
  theme?: { bg?: string; ctaBg?: string; ctaColor?: string };
}

export function HelpBanner({
  icon,
  title,
  description,
  ctaLabel = 'IR AL CENTRO DE AYUDA',
  onCtaClick,
  className = '',
  theme = {},
}: HelpBannerProps) {
  const rootStyle = theme.bg ? { background: theme.bg } : undefined;
  const ctaStyle =
    theme.ctaBg || theme.ctaColor
      ? { background: theme.ctaBg, color: theme.ctaColor }
      : undefined;

  return (
    <section className={`helpBanner ${className}`.trim()} style={rootStyle}>
      {icon != null && <div className="helpBannerIcon" aria-hidden>{icon}</div>}
      <div>
        <h3 className="helpBannerTitle">{title}</h3>
        <p className="helpBannerDescription">{description}</p>
        <button type="button" className="helpBannerCta" style={ctaStyle} onClick={onCtaClick}>
          {ctaLabel} →
        </button>
      </div>
    </section>
  );
}
