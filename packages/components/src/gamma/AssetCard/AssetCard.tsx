import './AssetCard.css';

export interface AssetCardProps {
  imageUrl: string;
  imageAlt?: string;
  title: string;
  meta?: string;
  offerLabel?: string;
  price: string;
  onActionClick?: () => void;
  actionAriaLabel?: string;
  className?: string;
  theme?: {
    cardBg?: string;
    titleColor?: string;
    metaColor?: string;
    priceColor?: string;
    actionBg?: string;
    actionColor?: string;
  };
}

export function AssetCard({
  imageUrl,
  imageAlt = '',
  title,
  meta,
  offerLabel = 'OFERTA INICIAL',
  price,
  onActionClick,
  actionAriaLabel = 'Ver detalle',
  className = '',
  theme = {},
}: AssetCardProps) {
  const cardStyle = theme.cardBg ? { background: theme.cardBg } : undefined;
  const titleStyle = theme.titleColor ? { color: theme.titleColor } : undefined;
  const metaStyle = theme.metaColor ? { color: theme.metaColor } : undefined;
  const priceStyle = theme.priceColor ? { color: theme.priceColor } : undefined;
  const actionStyle =
    theme.actionBg || theme.actionColor
      ? { background: theme.actionBg, color: theme.actionColor }
      : undefined;

  return (
    <div className={`assetCardWrap ${className}`.trim()}>
      <article className="assetCard" style={cardStyle}>
        <img src={imageUrl} alt={imageAlt} className="assetCardImage" />
        <div className="assetCardBody">
          <h3 className="assetCardTitle" style={titleStyle}>{title}</h3>
          {meta && <p className="assetCardMeta" style={metaStyle}>{meta}</p>}
          <p className="assetCardOfferLabel" style={metaStyle}>{offerLabel}</p>
          <p className="assetCardPrice" style={priceStyle}>{price}</p>
        </div>
      </article>
      <button
        type="button"
        className="assetCardAction"
        style={actionStyle}
        onClick={onActionClick}
        aria-label={actionAriaLabel}
      >
        →
      </button>
    </div>
  );
}
