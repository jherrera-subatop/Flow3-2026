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
import type { DeudorRecord } from "@/lib/types";

function truncate(str: string, len: number): string {
  if (str.length <= len) return str;
  return str.slice(0, len) + "...";
}

interface DeudaPorProgramaProps {
  deudores: DeudorRecord[];
}

export function DeudaPorPrograma({ deudores }: DeudaPorProgramaProps) {
  const c = useChartColors();

  const byPrograma = deudores.reduce<Record<string, number>>((acc, d) => {
    const key = d.programa || "(sin programa)";
    acc[key] = (acc[key] ?? 0) + d.deudaPendiente;
    return acc;
  }, {});

  const chartData = Object.entries(byPrograma)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([programa, deuda]) => ({
      programa: truncate(programa, 35),
      Deuda: deuda,
    }));

  return (
    <div className="bg-th-surface border border-th-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h4 className="text-lg font-bold text-th-text">Deuda Pendiente por Programa</h4>
          <p className="text-sm text-th-text-muted">Deuda por programa o servicio</p>
        </div>
        <span className="material-symbols-outlined text-th-text-muted" style={{ fontSize: "1.25rem" }}>
          more_vert
        </span>
      </div>
      <ResponsiveContainer width="100%" height={300}>
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
            dataKey="programa"
            tick={{ fill: c.tickFill, fontSize: 11 }}
            axisLine={{ stroke: c.axisLine }}
            width={150}
          />
          <Tooltip
            contentStyle={{ backgroundColor: c.tooltipBg, border: `1px solid ${c.tooltipBorder}`, borderRadius: "8px" }}
            labelStyle={{ color: c.tooltipLabel }}
            formatter={(value) => [formatCurrency(Number(value ?? 0)), "Deuda"]}
          />
          <Bar dataKey="Deuda" fill="#EF4444" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
