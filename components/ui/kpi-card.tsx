"use client";

const COLOR_MAP = {
  success: {
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-500",
    borderHover: "hover:border-emerald-500/30",
    trendColor: "text-emerald-500",
  },
  warning: {
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-500",
    borderHover: "hover:border-amber-500/30",
    trendColor: "text-amber-500",
  },
  danger: {
    iconBg: "bg-red-500/10",
    iconColor: "text-red-500",
    borderHover: "hover:border-red-500/30",
    trendColor: "text-red-500",
  },
  primary: {
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    borderHover: "hover:border-primary/30",
    trendColor: "text-primary",
  },
} as const;

type ColorScheme = keyof typeof COLOR_MAP;

export interface KPICardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: string;
  trendPositive?: boolean;
  iconName: string;
  colorScheme: ColorScheme;
}

export function KPICard({
  title,
  value,
  subtitle,
  trend,
  trendPositive = true,
  iconName,
  colorScheme,
}: KPICardProps) {
  const { iconBg, iconColor, borderHover, trendColor } = COLOR_MAP[colorScheme];
  return (
    <div
      className={`bg-th-surface border border-th-border p-6 rounded-xl transition-all group ${borderHover}`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-th-text-secondary text-sm font-medium">{title}</span>
        <div className={`size-10 ${iconBg} rounded-lg flex items-center justify-center ${iconColor}`}>
          <span className="material-symbols-outlined" style={{ fontSize: "1.25rem" }}>
            {iconName}
          </span>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-th-text mb-1">{value}</h3>
      {subtitle && <p className="text-xs text-th-text-muted mb-1">{subtitle}</p>}
      {trend != null && (
        <div className={`flex items-center gap-1 ${trendColor} text-xs font-bold`}>
          <span className="material-symbols-outlined text-sm" style={{ fontSize: "0.875rem" }}>
            {trendPositive ? "trending_up" : "trending_down"}
          </span>
          <span>{trend}</span>
          <span className="text-th-text-muted font-normal ml-1">vs mes anterior</span>
        </div>
      )}
    </div>
  );
}
