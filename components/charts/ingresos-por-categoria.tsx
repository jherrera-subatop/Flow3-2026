"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency } from "@/lib/formatters";
import { useChartColors } from "@/hooks/useChartColors";

interface IngresosPorCategoriaProps {
  data: Record<string, number>;
}

export function IngresosPorCategoria({ data }: IngresosPorCategoriaProps) {
  const c = useChartColors();

  const chartData = Object.entries(data)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([categoria, ingreso]) => ({ categoria, Ingresos: ingreso }));

  return (
    <div className="bg-th-surface border border-th-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h4 className="text-lg font-bold text-th-text">Top Categorías por Ingreso</h4>
          <p className="text-sm text-th-text-muted">Ingresos por categoría de servicio</p>
        </div>
        <span className="material-symbols-outlined text-th-text-muted" style={{ fontSize: "1.25rem" }}>
          more_vert
        </span>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={c.grid} horizontal={false} />
          <XAxis
            type="number"
            tick={{ fill: c.tickFill, fontSize: 11 }}
            axisLine={{ stroke: c.axisLine }}
            tickFormatter={(v) => `S/${(v / 1000).toFixed(0)}k`}
          />
          <YAxis
            type="category"
            dataKey="categoria"
            tick={{ fill: c.tickFill, fontSize: 11 }}
            axisLine={{ stroke: c.axisLine }}
            width={120}
          />
          <Tooltip
            contentStyle={{ backgroundColor: c.tooltipBg, border: `1px solid ${c.tooltipBorder}`, borderRadius: "8px" }}
            labelStyle={{ color: c.tooltipLabel }}
            formatter={(value: number) => [formatCurrency(value), "Ingresos"]}
          />
          <Bar dataKey="Ingresos" fill="#7C3AED" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
