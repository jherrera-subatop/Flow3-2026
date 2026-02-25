"use client";

import { formatCurrency } from "@/lib/formatters";

interface PaymentProgressProps {
  pagado: number;
  total: number;
}

export function PaymentProgress({ pagado, total }: PaymentProgressProps) {
  const pct =
    total > 0 ? Math.min((pagado / total) * 100, 100) : 0;
  const color =
    pct === 100
      ? "bg-emerald-500"
      : pct >= 50
        ? "bg-amber-500"
        : "bg-red-500";

  return (
    <div className="w-full space-y-1">
      <div className="w-full bg-[#2A2A2A] rounded-full h-1.5">
        <div
          className={`${color} h-1.5 rounded-full transition-all`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        <span>{formatCurrency(pagado)} pagado</span>
        <span>{pct.toFixed(0)}%</span>
      </div>
    </div>
  );
}
