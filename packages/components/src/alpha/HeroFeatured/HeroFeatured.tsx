import React from 'react';
import './HeroFeatured.css';

export interface HeroFeaturedProps {
  imageUrl: string;
  imageAlt?: string;
  badge?: string;
  title?: string;
  model: string;
  specs?: string[];
  priceLabel?: string;
  price: string;
  priceUnit?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  className?: string;
  /** Brand/theme: background and text colors (e.g. VMC) */
  theme?: {
    detailsBg?: string;
    badgeBg?: string;
    badgeColor?: string;
    titleColor?: string;
    priceColor?: string;
    ctaBg?: string;
    ctaColor?: string;
  };
}

export function HeroFeatured({
  imageUrl,
  imageAlt = '',
  badge,
  title,
  model,
  specs = [],
  priceLabel = 'PRECIO BASE',
  price,
  priceUnit = 'USD',
  ctaLabel = 'PARTICIPAR AHORA',
  onCtaClick,
  className = '',
  theme = {},
}: HeroFeaturedProps) {
  const detailsStyle = theme.detailsBg ? { background: theme.detailsBg } : undefined;
  const badgeStyle =
    theme.badgeBg || theme.badgeColor
      ? { background: theme.badgeBg, color: theme.badgeColor }
      : undefined;
  const titleStyle = theme.titleColor ? { color: theme.titleColor } : undefined;
  const priceStyle = theme.priceColor ? { color: theme.priceColor } : undefined;
  const ctaStyle =
    theme.ctaBg || theme.ctaColor
      ? { background: theme.ctaBg, color: theme.ctaColor }
      : undefined;

  return (
    <section className={`hero ${className}`.trim()} aria-label="Subasta destacada">
      <img src={imageUrl} alt={imageAlt} className="heroImage" />
      <div className="heroDetails" style={detailsStyle}>
        {badge && (
          <span className="heroBadge" style={badgeStyle}>
            {badge}
          </span>
        )}
        {title && <p className="heroTitle" style={titleStyle}>{title}</p>}
        <h2 className="heroModel" style={titleStyle}>{model}</h2>
        {specs.length > 0 && (
          <div className="heroSpecs" style={titleStyle}>
            {specs.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        )}
        <div>
          <p className="heroPriceLabel" style={titleStyle}>{priceLabel}</p>
          <p className="heroPrice" style={priceStyle}>
            {price} <small style={{ fontSize: 'var(--flow-text-sm)' }}>{priceUnit}</small>
          </p>
        </div>
        <button
          type="button"
          className="heroCta"
          style={ctaStyle}
          onClick={onCtaClick}
        >
          {ctaLabel} →
        </button>
      </div>
    </section>
  );
}
