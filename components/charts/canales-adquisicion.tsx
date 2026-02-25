"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatNumber } from "@/lib/formatters";
import { useChartColors } from "@/hooks/useChartColors";

interface CanalesAdquisicionProps {
  data: Record<string, number>;
}

const COLORS: Record<string, string> = {
  FACEBOOK: "#3B82F6",
  INSTAGRAM: "#EC4899",
  TIKTOK: "#9CA3AF",
  BOCA_A_BOCA: "#10B981",
  OTRO: "#F59E0B",
};

export function CanalesAdquisicion({ data }: CanalesAdquisicionProps) {
  const c = useChartColors();

  const chartData = Object.entries(data)
    .filter(([, v]) => v > 0)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const total = chartData.reduce((s, d) => s + d.value, 0);

  return (
    <div className="bg-th-surface border border-th-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h4 className="text-lg font-bold text-th-text">Canales de Adquisición</h4>
          <p className="text-sm text-th-text-muted">Origen de nuevos pacientes</p>
        </div>
        <span className="material-symbols-outlined text-th-text-muted" style={{ fontSize: "1.25rem" }}>
          filter_list
        </span>
      </div>
      <div className="flex items-center gap-4">
        <ResponsiveContainer width={180} height={180}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={COLORS[entry.name] ?? "#6B7280"} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: c.tooltipBg, border: `1px solid ${c.tooltipBorder}`, borderRadius: "8px" }}
              formatter={(value) => [formatNumber(Number(value ?? 0)), "Clientes"]}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="flex-1 space-y-2">
          {chartData.map((entry) => (
            <div key={entry.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: COLORS[entry.name] ?? "#6B7280" }}
                />
                <span className="text-xs text-th-text-secondary">{entry.name}</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-th-text font-medium">
                  {formatNumber(entry.value)}
                </span>
                <span className="text-xs text-th-text-muted ml-1">
                  ({((entry.value / total) * 100).toFixed(0)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
