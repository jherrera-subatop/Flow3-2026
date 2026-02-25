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

interface IngresosPorSedeProps {
  data: Record<string, number>;
}

export function IngresosPorSede({ data }: IngresosPorSedeProps) {
  const c = useChartColors();

  const chartData = Object.entries(data)
    .filter(([, v]) => v > 0)
    .map(([sede, ingreso]) => ({ sede, Ingresos: ingreso }))
    .sort((a, b) => b.Ingresos - a.Ingresos);

  return (
    <div className="bg-th-surface border border-th-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h4 className="text-lg font-bold text-th-text">Ingresos por Sede</h4>
          <p className="text-sm text-th-text-muted">Distribución de ventas por local</p>
        </div>
        <span className="material-symbols-outlined text-th-text-muted" style={{ fontSize: "1.25rem" }}>
          more_vert
        </span>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={c.grid} />
          <XAxis dataKey="sede" tick={{ fill: c.tickFill, fontSize: 12 }} axisLine={{ stroke: c.axisLine }} />
          <YAxis
            tick={{ fill: c.tickFill, fontSize: 11 }}
            axisLine={{ stroke: c.axisLine }}
            tickFormatter={(v) => `S/${(v / 1000).toFixed(0)}k`}
            width={55}
          />
          <Tooltip
            contentStyle={{ backgroundColor: c.tooltipBg, border: `1px solid ${c.tooltipBorder}`, borderRadius: "8px" }}
            labelStyle={{ color: c.tooltipLabel }}
            formatter={(value) => [formatCurrency(Number(value ?? 0)), "Ingresos"]}
          />
          <Bar dataKey="Ingresos" fill="#7C3AED" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
