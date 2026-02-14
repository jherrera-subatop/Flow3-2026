import React from 'react';
import './FilterBar.css';

export interface FilterBarOption {
  id: string;
  label: string;
}

export interface FilterBarProps {
  label?: string;
  options: FilterBarOption[];
  activeId?: string;
  onChange?: (id: string) => void;
  className?: string;
  theme?: {
    labelColor?: string;
    activeBg?: string;
    activeColor?: string;
    inactiveBg?: string;
    inactiveColor?: string;
  };
}

export function FilterBar({
  label = 'FILTRAR POR',
  options,
  activeId,
  onChange,
  className = '',
  theme = {},
}: FilterBarProps) {
  return (
    <div className={`filterBar ${className}`.trim()}>
      {label && (
        <span className="filterBarLabel" style={theme.labelColor ? { color: theme.labelColor } : undefined}>
          {label}
        </span>
      )}
      <div className="filterBarChips">
        {options.map((opt) => {
          const isActive = opt.id === activeId;
          const style: React.CSSProperties = isActive
            ? { background: theme.activeBg, color: theme.activeColor }
            : { background: theme.inactiveBg, color: theme.inactiveColor };
          return (
            <button
              key={opt.id}
              type="button"
              className={`filterBarChip ${isActive ? 'filterBarChipActive' : ''}`.trim()}
              style={style}
              onClick={() => onChange?.(opt.id)}
              aria-pressed={isActive}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
